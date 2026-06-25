<script>
    import { onMount, tick } from 'svelte';
    import BaseModal from './BaseModal.svelte';
    import { skillsByCategory } from '../lib/skills';
    import { countUp } from '../lib/motion-utils';

    const name = 'Alejandro Castro';
    const role = 'AI Researcher & Systems Engineering Student';
    const education = 'UCB San Pablo — Systems Engineering';
    const gpa = 'GPA: 3.8/4.0 (Full Scholarship)';
    const location = 'Cochabamba, Bolivia';
    const focus = 'Reinforcement Learning, Algorithms, Search-Based Planning';
    const interests = 'Sequential Decision Making, Bayesian Optimization, Uncertainty';

    let baseModal;
    let pctEl;
    let rankEl;
    let totalEl;
    let hasRunCountup = false;

    async function startCountups() {
        if (hasRunCountup) return;
        hasRunCountup = true;
        await tick();
        if (pctEl) countUp(pctEl, 6, 800);
        if (rankEl) countUp(rankEl, 1, 800);
        if (totalEl) countUp(totalEl, 145, 800);
    }

    $: skillCategories = Object.keys(skillsByCategory);
</script>

<BaseModal
    bind:this={baseModal}
    title="[MODAL: ABOUT]"
    eventName="toggle-about-modal"
    on:open={startCountups}
>
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
        <div class="text-brutalist-line mb-4">[SKILLS]</div>
        <div class="space-y-3">
            {#each skillCategories as category}
                <div>
                    <div class="text-[10px] font-mono text-brutalist-line/80 uppercase tracking-widest mb-1">[{category}]</div>
                    <div class="flex flex-wrap gap-1">
                        {#each skillsByCategory[category] as skill}
                            <span class="px-2 py-0.5 text-[10px] font-mono border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                                [{skill.name.toUpperCase()}]
                            </span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="mt-10">
        <div class="text-brutalist-line mb-4">[AWARDS]</div>
        <div class="font-mono space-y-3">
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
                    <div class="text-zinc-600">U.S. Embassy — Top <span bind:this={pctEl}>0</span>% Selection</div>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">Valedictorian</div>
                    <div class="text-zinc-600">Colegio San Agustín — Rank <span bind:this={rankEl}>0</span>/<span bind:this={totalEl}>0</span></div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-10">
        <div class="text-brutalist-line mb-4">[RESEARCH INTERESTS]</div>
        <div class="font-mono text-zinc-500 space-y-1">
            <p>&gt; {interests}</p>
        </div>
    </div>
</BaseModal>
