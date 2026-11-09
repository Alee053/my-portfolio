<script lang="ts">
    import BaseModal from './BaseModal.svelte';
    import { SITE } from '../lib/site';

    export let githubUrl: string = SITE.github;
    export let linkedInUrl: string = SITE.linkedin;
    export let email: string = SITE.email;
</script>

<BaseModal
    title="Contact"
    filename="contact.md"
    eventName="toggle-contact-modal"
>
    <p class="contact-intro">Email me about a project or find my work below.</p>
    <a href={`mailto:${email}`} class="contact-email"
        >{email} <span aria-hidden="true">↗</span></a
    >
    <div class="contact-links">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer"
            ><span>GitHub<small>Code & experiments</small></span><span
                aria-hidden="true">↗</span
            ></a
        >
        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer"
            ><span>LinkedIn<small>Work & experience</small></span><span
                aria-hidden="true">↗</span
            ></a
        >
    </div>
    <p class="contact-location">Cochabamba, Bolivia · UTC−4</p>
</BaseModal>

<style>
    .contact-intro {
        max-width: 42ch;
        margin: 0 0 1.5rem;
        color: var(--ink-muted);
    }
    .contact-email {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-bottom: 2.5rem;
        color: var(--ink-accent);
        font-size: clamp(0.75rem, 3vw, 1rem);
        text-decoration: none;
        overflow-wrap: anywhere;
    }
    .contact-email:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
    }
    .contact-links {
        border-top: 1px solid var(--ink-line);
    }
    .contact-links a {
        display: flex;
        min-height: 5rem;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        border-bottom: 1px solid var(--ink-line);
        padding-block: 1rem;
        text-decoration: none;
    }
    .contact-links a:hover {
        color: var(--ink-accent);
    }
    .contact-links small {
        display: block;
        margin-top: 0.375rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
    }
    .contact-location {
        margin-top: 2.5rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
    }
</style>
