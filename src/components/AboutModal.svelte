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

<BaseModal bind:this={baseModal} title="[MODAL: ABOUT]" eventName="toggle-about-modal">
    <p class="mb-6">
        <span class="text-brutalist-line mr-2">// IDENTITY:</span>
        Computer Science undergraduate focused on reinforcement learning and algorithms.
    </p>

    <div class="space-y-6 mt-8">
        <div class="border-l-2 border-brutalist-accent pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[NAME]</div>
            <div class="text-white">{name}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[ROLE]</div>
            <div class="text-brutalist-text">{role}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[EDUCATION]</div>
            <div class="text-brutalist-text">{education}</div>
            <div class="text-[10px] text-zinc-500 mt-1">{gpa}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[LOCATION]</div>
            <div class="text-brutalist-text">{location}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[FOCUS]</div>
            <div class="text-brutalist-text">{focus}</div>
        </div>
    </div>

    <div class="mt-10">
        <div class="text-[10px] text-brutalist-line mb-4">[AWARDS]</div>
        <div class="text-[10px] font-mono space-y-3">
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">IOI 2022 Representative</div>
                    <div class="text-zinc-600">Bolivia — International Olympiad in Informatics</div>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">Conecta Mentora Fellow</div>
                    <div class="text-zinc-600">U.S. Embassy — Top 6% Selection</div>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">Valedictorian</div>
                    <div class="text-zinc-600">Colegio San Agustín — Rank 1/145</div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-10">
        <div class="text-[10px] text-brutalist-line mb-4">[RESEARCH INTERESTS]</div>
        <div class="text-[10px] font-mono text-zinc-600 space-y-1">
            <p>&gt; {interests}</p>
        </div>
    </div>
</BaseModal>