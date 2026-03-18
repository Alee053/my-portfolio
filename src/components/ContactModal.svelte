<script>
    import BaseModal from './BaseModal.svelte';

    export let githubUrl = 'https://github.com/alejandrocastrodev';
    export let linkedInUrl = 'https://linkedin.com/in/alejandrocastrodev';
    export let email = 'alejandro.castro.0520@gmail.com';

    let baseModal;
</script>

<BaseModal bind:this={baseModal} title="[MODAL: CONTACT]" eventName="toggle-contact-modal">
    <p class="mb-6">
        <span class="text-brutalist-line mr-2">// CONNECT:</span>
        Get in touch through any of these channels.
    </p>

    <div class="space-y-3 mt-8">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" 
           class="block p-4 border border-brutalist-line hover:border-brutalist-accent bg-brutalist-bg hover:bg-opacity-90 transition-all duration-150 group">
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-brutalist-accent transition-colors">[GITHUB]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-brutalist-accent transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-brutalist-accent transition-colors">OPEN ↗</span>
            </div>
        </a>

        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" 
           class="block p-4 border border-brutalist-line hover:border-brutalist-accent bg-brutalist-bg hover:bg-opacity-90 transition-all duration-150 group">
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-brutalist-accent transition-colors">[LINKEDIN]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-brutalist-accent transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-brutalist-accent transition-colors">OPEN ↗</span>
            </div>
        </a>

        <a href="mailto:{email}" 
           class="block p-4 border border-brutalist-line hover:border-brutalist-accent bg-brutalist-bg hover:bg-opacity-90 transition-all duration-150 group">
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-brutalist-accent transition-colors">[EMAIL]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-brutalist-accent transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-brutalist-accent transition-colors">SEND ↗</span>
            </div>
        </a>
    </div>

    <div class="mt-20">
        <div class="text-[10px] text-brutalist-line mb-4">[SYSTEM_STATUS]</div>
        <div class="text-[10px] font-mono text-zinc-600 space-y-1">
            <p>&gt; Connection ready...</p>
            <p>&gt; Channels verified</p>
            <p>&gt; Awaiting transmission</p>
        </div>
    </div>
</BaseModal>