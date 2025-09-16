<script>
</script>

<button id="back-btn" class="scale-0 opacity-0 xl:scale-100 xl:opacity-100 fixed top-0 left-0 h-screen w-[20vw] lg:w-[10vw] grid place-items-center hover:bg-gradient-to-r from-black/30 to-black/0 text-white z-20 border-primary rounded-none transition duration-300 ease-in-out" aria-label="Go back" on:click={() => history.back()}>
    <svg class="stroke-primary fill-primary transition-transform duration-500" style="transform: rotate(90deg);" width="5vw" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
        <defs>
            <linearGradient id="btnGradient" x1="0" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00f" stop-opacity="0" />
                <stop stop-color="#00f" stop-opacity="1" />
            </linearGradient>
        </defs>
    </svg>
</button>
<button id="back-btn-mobile" class="xl:scale-0 xl:opacity-0 fixed top-4 left-4 w-15 h-15 flex items-center justify-center bg-black/40 rounded-xl text-white z-20 border-primary border-2 transition duration-300 ease-in-out" aria-label="Go back" on:click={() => history.back()}>
    <svg class="stroke-primary fill-primary" width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(90deg);">
        <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" />
    </svg>
</button>