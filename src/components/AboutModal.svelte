<script>
    import BaseModal from './BaseModal.svelte';

    let baseModal;

    const name = "Alejandro Castro";
    const role = "AI Researcher & Systems Engineering Student";
    const education = "UCB San Pablo — Systems Engineering";
    const gpa = "GPA: 3.8/4.0 (Full Scholarship)";
    const location = "Cochabamba, Bolivia";
    const focus = "Reinforcement Learning, Algorithms, Search-Based Planning";
    const interests = "Sequential Decision Making, Bayesian Optimization, Uncertainty";
</script>

<BaseModal bind:this={baseModal} title="About" eventName="toggle-about-modal">
    <p class="modal-intro">
        <span class="modal-kicker">Identity</span>
        Computer Science undergraduate focused on reinforcement learning and algorithms.
    </p>

    <div class="modal-list modal-list--facts">
        <div class="info-block info-block--accent">
            <div class="modal-kicker">Name</div>
            <div class="info-block__value">{name}</div>
        </div>

        <div class="info-block">
            <div class="modal-kicker">Role</div>
            <div class="info-block__value">{role}</div>
        </div>

        <div class="info-block">
            <div class="modal-kicker">Education</div>
            <div class="info-block__value">{education}</div>
            <div class="info-block__note">{gpa}</div>
        </div>

        <div class="info-block">
            <div class="modal-kicker">Location</div>
            <div class="info-block__value">{location}</div>
        </div>

        <div class="info-block">
            <div class="modal-kicker">Focus</div>
            <div class="info-block__value">{focus}</div>
        </div>
    </div>

    <section class="modal-section">
        <h3 class="modal-kicker modal-section__heading">Awards</h3>
        <div class="modal-list">
            <div class="award-item">
                <span class="award-item__marker" aria-hidden="true">&gt;</span>
                <div>
                    <div class="award-item__title">IOI 2022 Representative</div>
                    <div class="award-item__note">Bolivia — International Olympiad in Informatics</div>
                </div>
            </div>
            <div class="award-item">
                <span class="award-item__marker" aria-hidden="true">&gt;</span>
                <div>
                    <div class="award-item__title">Conecta Mentora Fellow</div>
                    <div class="award-item__note">U.S. Embassy — Top 6% Selection</div>
                </div>
            </div>
            <div class="award-item">
                <span class="award-item__marker" aria-hidden="true">&gt;</span>
                <div>
                    <div class="award-item__title">Valedictorian</div>
                    <div class="award-item__note">Colegio San Agustín — Rank 1/145</div>
                </div>
            </div>
        </div>
    </section>

    <section class="modal-section">
        <h3 class="modal-kicker modal-section__heading">Research interests</h3>
        <div class="research-list">
            <p>&gt; {interests}</p>
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
        gap: 1rem;
    }

    .modal-list--facts {
        margin-top: 2rem;
        gap: 0.75rem;
    }

    .info-block {
        border-left: 2px solid var(--ink-line);
        padding: 0.75rem 0 0.75rem 1rem;
    }

    .info-block--accent {
        border-color: var(--ink-accent);
    }

    .info-block__value {
        color: var(--ink-text);
    }

    .info-block__note,
    .award-item__note,
    .research-list {
        color: var(--ink-muted);
        font-size: 0.75rem;
    }

    .modal-section {
        margin-top: 2.5rem;
    }

    .modal-section__heading {
        margin-bottom: 1rem;
    }

    .award-item {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
    }

    .award-item__marker {
        color: var(--ink-accent);
        line-height: 1.7;
    }

    .award-item__title {
        color: var(--ink-text);
    }

    .research-list p {
        margin: 0;
    }
</style>
