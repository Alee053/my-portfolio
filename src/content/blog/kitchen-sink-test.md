---
title: "Kitchen Sink Test"
description: "Temporary post exercising every markdown feature for renderer verification."
date: 2026-07-08
tags:
  - test
---

## Heading Level 2

Paragraph with **bold**, *italic*, `inline code`, ~~strikethrough~~, and a [link](https://example.com). A footnote reference[^1].

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

## Code Blocks

```python
def search(state, depth):
    # deliberately long line to test horizontal scrolling behavior inside the code block container itself
    if depth == 0 or state.is_terminal():
        return evaluate(state)
    best = float("-inf")
    for move in state.legal_moves():
        value = -search(state.apply(move), depth - 1)
        if value > best:
            best = value
    return best
```

## Wide Table

| Algorithm | Depth | Nodes Expanded | Time (ms) | Memory (MB) | Win Rate | Avg Score | Max Tile | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Expectimax | 4 | 1,204,932 | 512 | 84 | 97% | 112,400 | 4096 | baseline configuration |
| MCTS | - | 800,112 | 1,020 | 121 | 91% | 98,300 | 2048 | 500 rollouts per move |

## Math

Inline math $e^{i\pi} + 1 = 0$ and display math:

$$
V(s) = \max_a \sum_{s'} P(s' \mid s, a) \left[ R(s, a, s') + \gamma V(s') \right]
$$

## Images

![Cloudinary sample routed through Astro assets](https://res.cloudinary.com/demo/image/upload/sample.jpg "Figure 1: authorized-domain image")

![External image probed by the rehype plugin](https://picsum.photos/id/237/800/450)

## Blockquote

> System output: search completed in 512ms with 1.2M nodes expanded.

## Task List

- [x] Fix code block background
- [x] Wrap tables
- [ ] Ship the refactor

## Lists

1. First ordered item
2. Second ordered item
   1. Nested ordered item
   - Nested unordered item

---

[^1]: This is the footnote text with a [link](https://example.com).
