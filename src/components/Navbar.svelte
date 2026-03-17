<script>
    import LiveTimestamp from './LiveTimestamp.svelte';
    
    export let currentPath = '/';
    
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
    
    function handleProjectsClick() {
        if (currentPath === '/') {
            const element = document.getElementById('projects-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = '/projects';
        }
    }
    
    function handleBlogsClick() {
        if (currentPath === '/') {
            const element = document.getElementById('blogs-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = '/blogs';
        }
    }
</script>

<header class="sticky top-0 z-20 flex justify-between items-start p-8 border-b border-brutalist-line bg-brutalist-bg/80 backdrop-blur-sm">
    <div class="text-[10px] font-mono tracking-widest uppercase" data-purpose="technical-annotation">
        [REF: AC-2026-BRUTALIST] <br/>
        <LiveTimestamp />
    </div>
    <nav class="flex gap-6 font-mono text-sm">
        <a class="hover:text-white transition-colors" href="/">[HOME]</a>
        <button class="hover:text-white transition-colors underline decoration-brutalist-accent cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleAboutClick}>[ABOUT ME]</button>
        <button class="hover:text-white transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleProjectsClick}>[PROJECTS]</button>
        <button class="hover:text-white transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleBlogsClick}>[BLOGS]</button>
        <button class="hover:text-white transition-colors cursor-pointer bg-transparent border-none font-mono text-sm p-0" on:click={handleContactClick}>[CONTACT]</button>
    </nav>
</header>
