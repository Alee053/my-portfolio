<script lang="ts">
    export let label: string;
    export let command = '';
</script>

<div class="section-label">
    {#if command}
        <span class="section-label__prompt" aria-hidden="true">$</span>
        <span aria-hidden="true">{command}</span>
        <span class="sr-only">{label}</span>
    {:else}<span>{label}</span>{/if}
</div>

<style>
    .section-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
        line-height: 1.5;
    }
    .section-label__prompt {
        color: var(--ink-accent);
    }
</style>
