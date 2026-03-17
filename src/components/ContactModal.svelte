<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    
    export let githubUrl = 'https://github.com/alejandrocastrodev';
    export let linkedInUrl = 'https://linkedin.com/in/alejandrocastrodev';
    export let email = 'alex@example.com';
    
    let modal;
    let isOpen = false;
    
    function handleToggleEvent() {
        toggle();
    }
    
    export function toggle() {
        if (!isOpen) {
            open();
        } else {
            close();
        }
    }
    
    export function open() {
        if (!modal) return;
        
        gsap.to(modal, {
            x: '0%',
            duration: 0.5,
            ease: 'power3.out'
        });
        isOpen = true;
    }
    
    export function close() {
        if (!modal) return;
        
        gsap.to(modal, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in'
        });
        isOpen = false;
    }
    
    onMount(() => {
        if (modal) {
            gsap.set(modal, { x: '100%' });
        }
        document.addEventListener('toggle-contact-modal', handleToggleEvent);
    });
    
    onDestroy(() => {
        document.removeEventListener('toggle-contact-modal', handleToggleEvent);
    });
</script>

<aside bind:this={modal} class="fixed top-0 right-0 w-full md:w-1/3 h-full bg-brutalist-bg border-l border-brutalist-line z-50 p-10 flex flex-col shadow-2xl" style="transform: translateX(100%);">
    <div class="flex justify-between items-center mb-10">
        <div class="text-[10px] font-mono">[MODAL: CONTACT]</div>
        <button class="text-sm hover:text-white cursor-pointer font-mono" on:click={close}>[X]</button>
    </div>
    
    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
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
    </div>
</aside>
