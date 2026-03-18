<script>
    import BaseModal from './BaseModal.svelte';

    let baseModal;

    export const name = "Alejandro Castro";
    export const role = "AI Researcher & System Architect";
    export const location = "Remote / Worldwide";
    export const focus = "Neural Symbolic Reasoning, Autonomous Agent Topologies";
</script>

<BaseModal bind:this={baseModal} title="[MODAL: ABOUT]" eventName="toggle-about-modal">
    <p class="mb-6">
        <span class="text-brutalist-line mr-2">// IDENTITY:</span>
        Personal information and background.
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
            <div class="text-[10px] text-brutalist-line mb-1">[LOCATION]</div>
            <div class="text-brutalist-text">{location}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[FOCUS]</div>
            <div class="text-brutalist-text">{focus}</div>
        </div>
    </div>

    <div class="mt-20">
        <div class="text-[10px] text-brutalist-line mb-4">[BACKGROUND]</div>
        <div class="text-[10px] font-mono text-zinc-600 space-y-1">
            <p>&gt; Building intelligent systems...</p>
            <p>&gt; Exploring AI architectures</p>
            <p>&gt; Creating autonomous solutions</p>
        </div>
    </div>
</BaseModal>