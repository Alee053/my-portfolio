<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import BackButton from "../components/subcomponents/BackButton.svelte";
    import {optimizeCloudinaryImage} from "../lib/cloudinary.js";


    onMount(() => {
        gsap.set("#about-me", { visibility: 'visible' });
        gsap.from('.about-container', {
            delay: 0.3,
            duration: 1.2,
            opacity: 0,
            y: 60,
            ease: 'power3.out'
        });
        gsap.from('.profile-img', {
            duration: 1,
            opacity: 0,
            scale: 0.7,
            delay: 0.5,
            ease: 'power3.inOut'
        });
        gsap.from('.about-text', {
            duration: 1,
            opacity: 0,
            x: 40,
            delay: 0.8,
            ease: 'power2.out'
        });
    });
</script>
<section id="about-me" class="invisible w-full h-screen shadow-inner bg-radial from-black/0  from-65% to-black relative overflow-hidden grid place-items-center">
    <BackButton/>
    <div class="about-container w-[80vw] xl:w-[60vw] border-primary border-2  rounded-2xl bg-black/30 backdrop-blur-lg p-6 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12 overflow-hidden">
        <img alt="" src={optimizeCloudinaryImage("https://res.cloudinary.com/dwhzvvrmu/image/upload/v1758082045/profile_pabqul.jpg")} class="profile-img w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-primary flex-shrink-0"/>
        <div class="about-text text-white text-center lg:text-left space-y-4">
            <h2 class="text-3xl font-bold">About Me</h2>
            <p class="text:md xl:text-lg leading-relaxed">
                I'm a Software Engineering student with a passion for technology, innovation, and sports. I've had the opportunity to represent my country in international competitions and have excelled academically throughout my school years. I am constantly seeking challenges that allow me to grow professionally and contribute to technological development. I am interested in collaborating on innovative projects that drive change and progress.
            </p>
        </div>
    </div>
</section>
