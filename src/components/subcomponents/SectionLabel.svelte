<script>
    export let label;
    export let number = "";
</script>

<div class="section-label mb-5 flex items-center gap-3 font-mono select-none" data-purpose="section-label">
    <span class="section-label__rule" aria-hidden="true"></span>
    <span>[{number ? `SEC ${number} // ${label}` : label}]</span>
</div>

<style>
    .section-label {
        color: var(--ink-muted);
        font-size: 0.625rem;
        letter-spacing: 0.14em;
        line-height: 1.4;
        opacity: 0.78;
    }

    .section-label__rule {
        width: 2.25rem;
        height: 1px;
        flex: none;
        background: linear-gradient(90deg, var(--ink-accent), transparent);
        opacity: 0.8;
    }
</style>
