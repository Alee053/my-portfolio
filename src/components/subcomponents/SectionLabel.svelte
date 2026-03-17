<script>
    export let label;
    export let number = "";
</script>

<div class="mb-4 text-[10px] font-mono text-brutalist-line opacity-50 select-none" data-purpose="section-label">
    [{number ? `SEC ${number} // ${label}` : label}]
</div>