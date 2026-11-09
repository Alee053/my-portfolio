<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte';

    export let title = 'Details';
    export let eventName = 'toggle-modal';
    export let filename = 'details.md';

    let modal: HTMLDialogElement;
    let closeButton: HTMLButtonElement;
    let isOpen = false;
    let previousOverflow = '';
    const dispatch = createEventDispatcher();

    function finishClose() {
        // A queued close event may arrive after the same dialog reopens.
        if (!isOpen || modal.open) return;
        isOpen = false;
        document.body.style.overflow = previousOverflow;
        dispatch('close');
    }

    export function open() {
        if (!modal || isOpen) return;
        previousOverflow = document.body.style.overflow;
        modal.showModal();
        isOpen = true;
        document.body.style.overflow = 'hidden';
        closeButton.focus();
        dispatch('open');
    }

    export function close() {
        if (!modal || !isOpen) return;
        modal.close();
        finishClose();
    }

    export function toggle() {
        if (isOpen) close();
        else open();
    }

    function handleBackdrop(event: MouseEvent) {
        if (event.target !== modal) return;
        const rect = modal.getBoundingClientRect();
        if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        )
            close();
    }

    onMount(() => {
        document.addEventListener(eventName, toggle);
        document.addEventListener(`close-${eventName}`, close);
        document.addEventListener('astro:before-swap', close);
        return () => {
            document.removeEventListener(eventName, toggle);
            document.removeEventListener(`close-${eventName}`, close);
            document.removeEventListener('astro:before-swap', close);
            close();
        };
    });
</script>

<dialog
    bind:this={modal}
    class="modal-panel"
    aria-labelledby={`modal-title-${eventName}`}
    onclick={handleBackdrop}
    oncancel={(event) => {
        event.preventDefault();
        close();
    }}
    onclose={finishClose}
>
    <div class="modal-filebar">
        <span aria-hidden="true">~/{filename}</span><span aria-hidden="true"
            >↳</span
        >
    </div>
    <div class="modal-header">
        <h2 id={`modal-title-${eventName}`} class="modal-title">{title}</h2>
        <button
            bind:this={closeButton}
            aria-label={`Close ${title}`}
            class="modal-close"
            onclick={close}
            type="button">Close <span aria-hidden="true">[esc]</span></button
        >
    </div>
    <div class="modal-content"><slot /></div>
</dialog>

<style>
    .modal-panel {
        position: fixed;
        inset: 0 0 0 auto;
        width: min(100%, 38rem);
        max-width: 100%;
        height: 100%;
        max-height: 100%;
        margin: 0;
        border: 0;
        border-left: 1px solid var(--ink-line);
        background: #000;
        padding: 0;
        color: var(--ink-text);
    }
    .modal-panel[open] {
        display: flex;
        flex-direction: column;
    }
    .modal-panel::backdrop {
        background: rgb(0 0 0 / 78%);
    }
    .modal-filebar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid var(--ink-line);
        padding: 1rem 1.5rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
    }
    .modal-filebar span:last-child {
        color: var(--ink-accent);
    }
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1.5rem 1.5rem 0;
    }
    .modal-title {
        margin: 0;
        font-family: var(--font-display);
        font-size: 1.75rem;
        font-weight: 500;
        letter-spacing: -0.05em;
    }
    .modal-close {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.75rem;
        border: 1px solid var(--ink-control-line);
        background: #000;
        padding: 0.5rem 0.75rem;
        color: var(--ink-text);
        font-size: 0.6875rem;
    }
    .modal-close span {
        color: var(--ink-muted);
    }
    .modal-close:hover {
        border-color: var(--ink-accent);
        color: var(--ink-accent);
    }
    .modal-content {
        min-height: 0;
        flex: 1;
        overflow-y: auto;
        overscroll-behavior: contain;
        padding: 1.5rem;
        font-size: 0.8125rem;
        line-height: 1.9;
    }
</style>
