<script>
    import { onMount, onDestroy } from 'svelte';
    
    let timestamp = '';
    let intervalId;
    
    function formatTimestamp(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}.${month}.${day}_${hours}:${minutes}:${seconds}`;
    }
    
    function updateTimestamp() {
        timestamp = formatTimestamp(new Date());
    }
    
    onMount(() => {
        updateTimestamp();
        intervalId = setInterval(updateTimestamp, 1000);
    });
    
    onDestroy(() => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });
</script>

<span class="font-mono text-[10px] tracking-widest">TS: {timestamp}</span>
