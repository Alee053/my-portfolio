<script>
    import LiveTimestamp from './LiveTimestamp.svelte';
    
    function handleAboutClick() {
        // @ts-ignore
        if (window.toggleAboutModal) {
            // @ts-ignore
            window.toggleAboutModal();
        }
    }
    
    function handleContactClick() {
        // @ts-ignore
        if (window.toggleContactModal) {
            // @ts-ignore
            window.toggleContactModal();
        }
    }
</script>

<header class="sticky top-0 z-40 flex justify-between h-20 border-b px-8 items-center border-brutalist-line bg-brutalist-bg/80 backdrop-blur-sm">
    <div class="text-[10px] font-mono tracking-widest uppercase" data-purpose="technical-annotation">
        [REF: AC-2026-MINIMAL] <br/>
        <LiveTimestamp />
    </div>
    <nav class="flex gap-6 font-mono text-sm">
        <a class="hover:text-brutalist-accent transition-colors" href="/">[HOME]</a>
        <button class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleAboutClick}>[ABOUT ME]</button>
        <a class="hover:text-brutalist-accent transition-colors" href="/projects">[PROJECTS]</a>
        <a class="hover:text-brutalist-accent transition-colors" href="/blogs">[BLOGS]</a>
        <button class="hover:text-brutalist-accent transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleContactClick}>[CONTACT]</button>
    </nav>
</header>
