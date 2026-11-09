<script lang="ts">
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import { SITE } from '../lib/site';
</script>

<section id="hero-section" class="hero" aria-labelledby="hero-title">
    <SectionLabel command="cat ~/readme.md" label="About me" />
    <div class="hero-layout">
        <div class="hero-copy">
            <h1 id="hero-title">
                Alejandro<br />Castro<span
                    class="hero-cursor"
                    aria-hidden="true">_</span
                >
            </h1>
            <p class="hero-role">
                Software engineer & CTO<span class="hero-role__company"
                    >at <a
                        href={SITE.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer">Devs Haus ↗</a
                    ></span
                >
            </p>
            <p class="hero-description">
                I lead engineering at Devs Haus. We build SaaS products and
                custom software, from the first idea to production.
            </p>
            <div class="hero-actions">
                <a href="#projects-section" class="hero-primary"
                    >Explore my work <span aria-hidden="true">↓</span></a
                >
                <a href={`mailto:${SITE.email}`} class="hero-email"
                    >Get in touch <span aria-hidden="true">↗</span></a
                >
            </div>
        </div>
        <aside class="profile" aria-label="Profile at a glance">
            <div class="profile-heading">
                <span aria-hidden="true">~/profile</span><span
                    class="profile-mark"
                    aria-hidden="true">↳</span
                >
            </div>
            <dl>
                <div>
                    <dt>Based in</dt>
                    <dd>Cochabamba, Bolivia</dd>
                </div>
                <div>
                    <dt>Building</dt>
                    <dd>SaaS & business software</dd>
                </div>
                <div>
                    <dt>Studying</dt>
                    <dd>Systems Engineering at UCB San Pablo</dd>
                </div>
            </dl>
            <p class="profile-note">
                Also exploring applied AI,<br />algorithms & developer tools.
            </p>
        </aside>
    </div>
    <div class="hero-bottom">
        <span>Represented Bolivia at IOI 2022.</span><span aria-hidden="true"
            >Scroll to explore ↓</span
        >
    </div>
</section>

<style>
    .hero {
        padding-top: 0.25rem;
    }
    .hero-layout {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(11rem, 0.8fr);
        align-items: end;
        gap: 2rem;
    }
    .hero-copy {
        min-width: 0;
    }
    h1 {
        margin: 0 0 1.75rem;
        font-family: var(--font-display);
        font-size: clamp(2.75rem, 6.5vw, 6.25rem);
        font-weight: 500;
        letter-spacing: -0.08em;
        line-height: 1.08;
    }
    .hero-cursor {
        color: var(--ink-accent);
    }
    .hero-role {
        margin: 0 0 1.25rem;
        font-size: clamp(0.875rem, 1.4vw, 1rem);
        line-height: 1.7;
    }
    .hero-role__company {
        display: block;
        color: var(--ink-muted);
    }
    .hero-role a {
        color: var(--ink-accent);
        text-decoration: none;
    }
    .hero-role a:hover {
        text-decoration: underline;
        text-underline-offset: 4px;
    }
    .hero-description {
        max-width: 44ch;
        margin: 0;
        color: var(--ink-muted);
        font-size: 0.8125rem;
        line-height: 1.9;
    }
    .hero-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem 1.5rem;
        margin-top: 2rem;
    }
    .hero-actions a {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: space-between;
        gap: 1.25rem;
        font-size: 0.75rem;
        text-decoration: none;
    }
    .hero-primary {
        border: 1px solid var(--ink-accent);
        background: var(--ink-accent);
        padding: 0.625rem 1rem;
        color: #000;
    }
    .hero-primary:hover {
        background: #d1edbf;
    }
    .hero-email {
        color: var(--ink-muted);
    }
    .hero-email:hover {
        color: var(--ink-accent);
    }
    .profile {
        margin-bottom: 0.25rem;
        border-left: 1px solid var(--ink-line);
        padding-left: 1.5rem;
    }
    .profile-heading {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 1.75rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
    }
    .profile-mark {
        color: var(--ink-accent);
    }
    dl {
        display: grid;
        gap: 1.5rem;
        margin: 0;
    }
    dt {
        margin-bottom: 0.375rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    dd {
        margin: 0;
        font-size: 0.75rem;
        line-height: 1.8;
    }
    .profile-note {
        margin: 1.75rem 0 0;
        border-top: 1px solid var(--ink-line);
        padding-top: 1.25rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
        line-height: 1.9;
    }
    .hero-bottom {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 0.75rem;
        margin-top: 3.5rem;
        border-top: 1px solid var(--ink-line);
        padding-top: 1rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    @media (max-width: 68rem) {
        .hero-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 2.5rem;
        }
        h1 {
            font-size: clamp(2.75rem, 8.5vw, 5.5rem);
        }
        .profile {
            border-top: 1px solid var(--ink-line);
            border-left: 0;
            padding: 1.25rem 0 0;
        }
        .profile-heading {
            margin-bottom: 1.25rem;
        }
        dl {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
        }
        .profile-note {
            display: none;
        }
    }
    @media (max-width: 30rem) {
        h1 {
            font-size: clamp(2.75rem, 11.8vw, 4rem);
        }
        dl {
            grid-template-columns: minmax(0, 1fr);
            gap: 1rem;
        }
        dl > div {
            display: grid;
            grid-template-columns: 5.5rem minmax(0, 1fr);
            gap: 1rem;
        }
        dt {
            padding-top: 0.125rem;
        }
        .hero-bottom {
            margin-top: 2rem;
        }
        .hero-bottom > :last-child {
            display: none;
        }
    }
    @media (prefers-reduced-motion: no-preference) {
        .hero-cursor {
            animation: cursor-blink 1.1s step-end 4;
        }
        @keyframes cursor-blink {
            50% {
                opacity: 0;
            }
        }
    }
</style>
