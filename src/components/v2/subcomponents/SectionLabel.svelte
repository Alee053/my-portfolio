<script>
    export let label;
    export let number = "";
</script>

<div class="mb-4 text-[10px] font-mono text-brutalist-line" data-purpose="section-label">
    [{number ? `SEC ${number} // ${label}` : label}]
</div>