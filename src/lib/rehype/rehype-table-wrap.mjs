import { visit, SKIP } from 'unist-util-visit';

/**
 * Wraps every table in <div class="table-wrap"> so wide tables scroll
 * inside their own container instead of the whole article column.
 */
export default function rehypeTableWrap() {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            if (node.tagName !== 'table' || !parent || typeof index !== 'number') return;

            parent.children[index] = {
                type: 'element',
                tagName: 'div',
                properties: { className: ['table-wrap'] },
                children: [node],
            };
            return SKIP;
        });
    };
}
