import { gsap } from 'gsap';

/**
 * Returns true if the user has requested reduced motion.
 * SSR-safe: returns false on the server.
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Runs a GSAP timeline, or sets the final state immediately if reduced motion is requested.
 *
 * @param build  Function that builds and returns a GSAP timeline. Only called if motion is allowed.
 * @param final  Object of final property values to set if motion is reduced.
 * @param target The element(s) to apply the final state to when motion is reduced.
 */
export function timelineOrSet<T extends gsap.TweenTarget>(
    build: () => gsap.core.Timeline,
    final: gsap.TweenVars,
    target: T
): gsap.core.Timeline | null {
    if (prefersReducedMotion()) {
        gsap.set(target, final);
        return null;
    }
    return build();
}

/**
 * Animates a number from 0 to `value` over `duration` ms, updating the textContent of `el`.
 * If reduced motion is preferred, sets the final value immediately.
 */
export function countUp(el: HTMLElement, value: number, duration = 800): gsap.core.Tween | null {
    if (prefersReducedMotion()) {
        el.textContent = String(value);
        return null;
    }
    const proxy = { v: 0 };
    return gsap.to(proxy, {
        v: value,
        duration: duration / 1000,
        ease: 'power1.out',
        onUpdate: () => {
            el.textContent = String(Math.round(proxy.v));
        },
    });
}

/**
 * Creates a focus trap inside the given root element.
 * - Saves the currently focused element on activation
 * - Cycles Tab/Shift+Tab within the root
 * - Calls onEscape when Escape is pressed
 * - Restores focus on deactivation
 */
export function createFocusTrap(rootEl: HTMLElement, onEscape?: () => void) {
    let previouslyFocused: HTMLElement | null = null;

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    function getFocusable(): HTMLElement[] {
        return Array.from(rootEl.querySelectorAll<HTMLElement>(focusableSelector)).filter(
            (el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null
        );
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            onEscape?.();
            return;
        }
        if (e.key !== 'Tab') return;
        const focusable = getFocusable();
        if (focusable.length === 0) {
            e.preventDefault();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
            if (active === first || !rootEl.contains(active)) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (active === last || !rootEl.contains(active)) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    return {
        activate() {
            previouslyFocused = document.activeElement as HTMLElement | null;
            document.addEventListener('keydown', handleKeydown);
            const focusable = getFocusable();
            if (focusable.length > 0) {
                focusable[0].focus();
            } else {
                rootEl.setAttribute('tabindex', '-1');
                rootEl.focus();
            }
        },
        deactivate() {
            document.removeEventListener('keydown', handleKeydown);
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        },
    };
}
