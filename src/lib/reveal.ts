import { prefersReducedMotion } from './motion';

/**
 * Reveals [data-reveal] elements as they scroll into view.
 * Idempotent: safe to call again after client-side navigations.
 */
export function initReveal(): void {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-revealed)');
    if (elements.length === 0) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            }
        },
        // threshold 0 so sections taller than the viewport still trigger
        { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
}
