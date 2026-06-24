import type { Action } from 'svelte/action';

export type RevealVariant = 'fade' | 'rise' | 'stagger';

/**
 * Svelte action that observes the element and adds `is-revealed` once it enters the viewport.
 *
 * Usage:
 *   <div use:reveal={{ variant: 'rise' }}>...</div>
 *   <ul use:reveal={{ variant: 'stagger' }}>...</ul>
 */
export const reveal: Action<HTMLElement, { variant?: RevealVariant; threshold?: number } | undefined> = (
    node,
    options = {}
) => {
    const { variant = 'rise', threshold = 0.2 } = options ?? {};

    function applyClass() {
        if (variant === 'stagger') {
            node.classList.add('is-revealed', 'reveal-stagger');
        } else if (variant === 'fade') {
            node.classList.add('is-revealed', 'reveal-fade');
        } else {
            node.classList.add('is-revealed', 'reveal-rise');
        }
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        applyClass();
        return {};
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyClass();
        node.classList.add('reveal-no-motion');
        return {};
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    applyClass();
                    observer.unobserve(node);
                }
            }
        },
        { threshold }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
};
