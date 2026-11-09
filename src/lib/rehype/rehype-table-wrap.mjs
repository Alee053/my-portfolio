import { visit, SKIP } from 'unist-util-visit';

/**
 * Keeps wide tables in named, keyboard-focusable scroll regions.
 */
export default function rehypeTableWrap() {
    return (tree) => {
        let tableIndex = 0;
        visit(tree, 'element', (node, index, parent) => {
            if (
                node.tagName !== 'table' ||
                !parent ||
                typeof index !== 'number'
            )
                return;
            tableIndex += 1;

            parent.children[index] = {
                type: 'element',
                tagName: 'div',
                properties: {
                    className: ['table-wrap'],
                    tabIndex: 0,
                    role: 'region',
                    ariaLabel: `Data table ${tableIndex}`,
                },
                children: [node],
            };
            return SKIP;
        });
    };
}
