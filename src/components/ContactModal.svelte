<script>
    import BaseModal from './BaseModal.svelte';

    export let githubUrl = 'https://github.com/alejandrocastrodev';
    export let linkedInUrl = 'https://linkedin.com/in/alejandrocastrodev';
    export let email = 'alejandro.castro.0520@gmail.com';

    let baseModal;
</script>

<BaseModal bind:this={baseModal} title="Contact" eventName="toggle-contact-modal">
    <p class="modal-intro">
        <span class="modal-kicker">Connect</span>
        Get in touch through any of these channels.
    </p>

    <div class="modal-list contact-list">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="contact-link focus-ring">
            <div class="contact-link__row">
                <span class="contact-link__label">GitHub</span>
                <span class="contact-link__rule" aria-hidden="true"></span>
                <span class="contact-link__action">Open ↗</span>
            </div>
        </a>

        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" class="contact-link focus-ring">
            <div class="contact-link__row">
                <span class="contact-link__label">LinkedIn</span>
                <span class="contact-link__rule" aria-hidden="true"></span>
                <span class="contact-link__action">Open ↗</span>
            </div>
        </a>

        <a href="mailto:{email}" class="contact-link focus-ring">
            <div class="contact-link__row">
                <span class="contact-link__label">Email</span>
                <span class="contact-link__rule" aria-hidden="true"></span>
                <span class="contact-link__action">Send ↗</span>
            </div>
        </a>
    </div>

    <section class="modal-section">
        <h3 class="modal-kicker modal-section__heading">System status</h3>
        <div class="status-list">
            <p>&gt; Connection ready...</p>
            <p>&gt; Channels verified</p>
            <p>&gt; Awaiting transmission</p>
        </div>
    </section>
</BaseModal>

<style>
    .modal-intro {
        margin: 0;
        color: var(--ink-muted);
    }

    .modal-kicker {
        display: block;
        margin-bottom: 0.3rem;
        color: var(--ink-cyan);
        font-size: 0.625rem;
        letter-spacing: 0.12em;
        line-height: 1.4;
        text-transform: uppercase;
    }

    .modal-list {
        display: grid;
        gap: 0.75rem;
    }

    .contact-list {
        margin-top: 2rem;
    }

    .contact-link {
        display: block;
        border: 1px solid var(--ink-line);
        border-radius: 0.875rem;
        background: #061114;
        color: var(--ink-muted);
        padding: 1rem;
        text-decoration: none;
        transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
    }

    .contact-link:hover {
        border-color: var(--ink-accent);
        background: #102d31;
        color: var(--ink-text);
    }

    .contact-link__row {
        display: flex;
        min-height: 1.5rem;
        align-items: center;
        gap: 0.75rem;
    }

    .contact-link__label {
        color: var(--ink-text);
        font-size: 0.875rem;
    }

    .contact-link__rule {
        flex: 1;
        border-bottom: 1px dashed var(--ink-line);
    }

    .contact-link__action {
        color: inherit;
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .modal-section {
        margin-top: 2.5rem;
    }

    .modal-section__heading {
        margin-bottom: 1rem;
    }

    .status-list {
        color: var(--ink-muted);
        font-size: 0.6875rem;
        line-height: 1.8;
    }

    .status-list p {
        margin: 0;
    }

    @media (prefers-reduced-motion: reduce) {
        .contact-link {
            transition: none;
        }
    }

    @supports (backdrop-filter: blur(1px)) {
        .contact-link {
            background: rgba(6, 17, 20, 0.52);
            backdrop-filter: blur(10px);
        }

        .contact-link:hover {
            background: rgba(101, 231, 189, 0.08);
        }
    }
</style>
