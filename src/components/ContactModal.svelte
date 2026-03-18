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

    <div class="space-y-6 mt-8">
        <a href={githubUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 text-brutalist-text hover:text-white transition-colors group">
            <span class="text-brutalist-line">[GITHUB]</span>
            <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-white transition-colors"></span>
            <span class="text-xs">OPEN ↗</span>
        </a>

        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" class="flex items-center gap-4 text-brutalist-text hover:text-white transition-colors group">
            <span class="text-brutalist-line">[LINKEDIN]</span>
            <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-white transition-colors"></span>
            <span class="text-xs">OPEN ↗</span>
        </a>

        <a href="mailto:{email}" class="flex items-center gap-4 text-brutalist-text hover:text-white transition-colors group">
            <span class="text-brutalist-line">[EMAIL]</span>
            <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-white transition-colors"></span>
            <span class="text-xs">SEND ↗</span>
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