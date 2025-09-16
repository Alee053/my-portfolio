<script>
    import GithubIcon from 'virtual:icons/fa6-brands/github';
    import LinkedinIcon from 'virtual:icons/fa6-brands/linkedin';
    import EnvelopeIcon from 'virtual:icons/fa6-solid/envelope';
    import { fade } from 'svelte/transition';

    const contacts = [
        { name: `GitHub`, url: `https://github.com/Alee053`, icon: GithubIcon },
        { name: `LinkedIn`, url: `https://www.linkedin.com/in/alejandrocastroalvarez/`, icon: LinkedinIcon },
        { name: `Email`, url: `mailto:alejandro.castro.0520@email.com`, icon: EnvelopeIcon },
    ];
</script>

<button transition:fade  id="contact" class="absolute flex flex-wrap  gap-6 justify-center items-center w-full h-full ">
    {#each contacts as contact}
        <a
                class="flex items-center gap-2 text-white text-xl xl:text-3xl border-b-2 border-transparent hover:border-primary hover:text-primary focus:border-primary focus:text-primary transition-colors"
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
        >
            <span><contact.icon style="font-size:1.5em" /></span>
            <span>{contact.name}</span>
        </a>
    {/each}
</button>