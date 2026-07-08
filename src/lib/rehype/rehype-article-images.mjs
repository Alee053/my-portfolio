import { visit } from 'unist-util-visit';
import probe from 'probe-image-size';

// Persists across pages within a single build, so repeated images probe once
const dimensionCache = new Map();

/**
 * Article image processing:
 * - loading="lazy" + decoding="async" on every image
 * - probes remote images at build time for width/height (prevents CLS);
 *   degrades silently if the probe fails — never breaks the build
 * - a paragraph containing only an image with a title becomes
 *   <figure><img/><figcaption>title</figcaption></figure>
 */
export default function rehypeArticleImages() {
    return async (tree) => {
        const images = [];

        visit(tree, 'element', (node) => {
            if (node.tagName === 'img') {
                images.push(node);
            }
        });

        await Promise.all(images.map(async (node) => {
            node.properties.loading = 'lazy';
            node.properties.decoding = 'async';

            const src = node.properties.src;
            if (typeof src !== 'string' || !/^https?:\/\//.test(src)) return;
            if (node.properties.width && node.properties.height) return;

            try {
                let dims = dimensionCache.get(src);
                if (!dims) {
                    dims = await probe(src);
                    dimensionCache.set(src, dims);
                }
                node.properties.width = dims.width;
                node.properties.height = dims.height;
            } catch (err) {
                console.warn(`[rehype-article-images] could not probe ${src}: ${err.message}`);
            }
        }));

        // Paragraphs whose only content is a titled image become figures
        visit(tree, 'element', (node) => {
            if (node.tagName !== 'p') return;
            const significant = node.children.filter(
                (child) => !(child.type === 'text' && !child.value.trim())
            );
            if (significant.length !== 1) return;
            const [img] = significant;
            if (img.type !== 'element' || img.tagName !== 'img' || !img.properties?.title) return;

            const caption = img.properties.title;
            delete img.properties.title;
            node.tagName = 'figure';
            node.children = [
                img,
                {
                    type: 'element',
                    tagName: 'figcaption',
                    properties: {},
                    children: [{ type: 'text', value: caption }],
                },
            ];
        });
    };
}
