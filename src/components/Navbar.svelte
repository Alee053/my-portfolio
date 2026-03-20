<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import LiveTimestamp from './LiveTimestamp.svelte';
    
    let sidebarOpen = false;
    let sidebarElement;
    let backdropElement;
    
    onMount(() => {
        if (sidebarElement) {
            gsap.set(sidebarElement, { x: '100%' });
        }
        if (backdropElement) {
            gsap.set(backdropElement, { opacity: 0, pointerEvents: 'none' });
        }
    });
    
    onDestroy(() => {
        if (sidebarElement) gsap.killTweensOf(sidebarElement);
        if (backdropElement) gsap.killTweensOf(backdropElement);
    });
    
    function handleAboutClick() {
        if (typeof window !== 'undefined' && window.toggleAboutModal) {
            window.toggleAboutModal();
        }
        closeSidebar();
    }
    
    function handleContactClick() {
        if (typeof window !== 'undefined' && window.toggleContactModal) {
            window.toggleContactModal();
        }
        closeSidebar();
    }
    
    function toggleSidebar() {
        if (sidebarOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
    
    function openSidebar() {
        sidebarOpen = true;
        document.body.style.overflow = 'hidden';
        
        if (backdropElement) {
            gsap.to(backdropElement, {
                opacity: 1,
                duration: 0.3,
                onStart: () => {
                    backdropElement.style.pointerEvents = 'auto';
                }
            });
        }
        
        if (sidebarElement) {
            gsap.to(sidebarElement, {
                x: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    }
    
    function closeSidebar() {
        document.body.style.overflow = '';
        
        if (backdropElement) {
            gsap.to(backdropElement, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    backdropElement.style.pointerEvents = 'none';
                }
            });
        }
        
        if (sidebarElement) {
            gsap.to(sidebarElement, {
                x: '100%',
                duration: 0.3,
                ease: 'power2.in'
            });
        }
        
        setTimeout(() => {
            sidebarOpen = false;
        }, 300);
    }
    
    function handleKeydown(event) {
        if (event.key === 'Escape' && sidebarOpen) {
            closeSidebar();
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Backdrop - always in DOM but hidden -->
<div 
    bind:this={backdropElement} 
    class="fixed inset-0 bg-black/50 z-40"
    on:click={closeSidebar}
></div>

<!-- Mobile Sidebar - always in DOM but hidden off-screen -->
<aside 
    bind:this={sidebarElement} 
    class="fixed top-0 right-0 h-full w-full md:hidden bg-brutalist-bg border-l border-brutalist-line z-50 overflow-y-auto"
>
    <div class="flex flex-col h-full">
        <div class="flex justify-between items-center p-4 border-b border-brutalist-line">
            <div class="text-[10px] font-mono tracking-widest uppercase">
                [REF: AC-2026-MINIMAL]<br/>
                <LiveTimestamp />
            </div>
            <button 
                on:click={closeSidebar} 
                class="hover:text-brutalist-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" 
                aria-label="Close navigation menu"
            >
                <span class="font-mono text-2xl">×</span>
            </button>
        </div>
        
        <nav class="flex flex-col p-4 gap-2">
            <a 
                class="hover:text-brutalist-accent transition-colors font-mono text-sm p-3 min-h-[44px] flex items-center"
                href="/" 
                on:click={closeSidebar}
            >
                [HOME]
            </a>
            <button 
                class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-3 text-left min-h-[44px] flex items-center w-full"
                on:click={handleAboutClick}
            >
                [ABOUT ME]
            </button>
            <a 
                class="hover:text-brutalist-accent transition-colors font-mono text-sm p-3 min-h-[44px] flex items-center"
                href="/projects" 
                on:click={closeSidebar}
            >
                [PROJECTS]
            </a>
            <a 
                class="hover:text-brutalist-accent transition-colors font-mono text-sm p-3 min-h-[44px] flex items-center"
                href="/blogs" 
                on:click={closeSidebar}
            >
                [BLOGS]
            </a>
            <button 
                class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-3 border-b border-brutalist-line text-left min-h-[44px] flex items-center w-full" 
                on:click={handleContactClick}
            >
                [CONTACT]
            </button>
        </nav>
    </div>
</aside>

<header class="sticky top-0 z-40 flex justify-between h-20 border-b px-4 md:px-8 items-center border-brutalist-line bg-brutalist-bg/80 backdrop-blur-sm">
    <div class="text-[10px] font-mono tracking-widest uppercase" data-purpose="technical-annotation">
        [REF: AC-2026-MINIMAL] <br/>
        <LiveTimestamp />
    </div>
    
    <button 
        class="md:hidden hover:text-brutalist-accent transition-colors p-2 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center gap-1" 
        on:click={toggleSidebar} 
        aria-label="Open navigation menu" 
        aria-expanded={sidebarOpen}
    >
        <span class="block w-6 h-0.5 bg-current transition-all"></span>
        <span class="block w-6 h-0.5 bg-current transition-all"></span>
        <span class="block w-6 h-0.5 bg-current transition-all"></span>
    </button>
    
    <nav class="hidden md:flex gap-6 font-mono text-sm">
        <a class="hover:text-brutalist-accent transition-colors" href="/">[HOME]</a>
        <button class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleAboutClick}>[ABOUT ME]</button>
        <a class="hover:text-brutalist-accent transition-colors" href="/projects">[PROJECTS]</a>
        <a class="hover:text-brutalist-accent transition-colors" href="/blogs">[BLOGS]</a>
        <button class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleContactClick}>[CONTACT]</button>
    </nav>
</header>