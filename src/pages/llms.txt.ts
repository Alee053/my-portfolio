import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export const prerender = true;

const cleanText = (value: string) => value.replace(/\s+/g, ' ').trim();
const escapeLinkLabel = (value: string) => cleanText(value).replace(/[\[\]]/g, '\\$&');

export const GET: APIRoute = async () => {
    const [projects, blogs] = await Promise.all([
        getCollection('projects'),
        getCollection('blog'),
    ]);

    const projectsUrl = new URL('/projects/', SITE.url).toString();
    const blogsUrl = new URL('/blogs/', SITE.url).toString();
    const sortedProjects = projects.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
    const sortedBlogs = blogs.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

    const lines = [
        `# ${SITE.name}`,
        '',
        `> ${SITE.description}`,
        '',
        'This is the canonical portfolio and writing site for Alejandro Castro, Software Engineer and CTO at Devs Haus. Use the linked pages, live products, and public repositories as the source of truth for his work and technical writing.',
        '',
        '## Profile',
        `- [Homepage](${SITE.url}): Software engineering, technical leadership at Devs Haus, selected projects, recent writing, and public contact links.`,
        `- [Projects](${projectsUrl}): SaaS products, custom business software, and personal projects in AI, algorithms, robotics, and simulation.`,
        `- [Blogs](${blogsUrl}): Technical articles about software engineering, algorithms, applied AI, and learning and search systems.`,
        '',
        '## Devs Haus',
        `- [${SITE.company}](${SITE.companyUrl}): Alejandro is CTO at Devs Haus, building SaaS products and custom software with the team. Deployed work includes Webby and JM Repuestos Automotores.`,
        '',
        '## Projects',
        ...sortedProjects.map((project) => {
            const projectUrl = project.data.demo_url || project.data.repo_url || projectsUrl;
            const details = `${project.data.year} project. ${cleanText(project.data.subtitle)} Tags: ${project.data.tags.join(', ')}.`;
            const links = project.data.links.map((link) => `[${escapeLinkLabel(link.label)}](${link.url})`).join(', ');
            return `- [${escapeLinkLabel(project.data.name)}](${projectUrl}): ${cleanText(details)}${links ? ` Links: ${links}.` : ''}`;
        }),
        '',
        '## Writing',
        ...sortedBlogs.map((blog) => {
            const articleUrl = new URL(`/blog/${blog.slug}/`, SITE.url).toString();
            const details = `${cleanText(blog.data.description)} Topics: ${blog.data.tags.join(', ')}.`;
            return `- [${escapeLinkLabel(blog.data.title)}](${articleUrl}): ${cleanText(details)}`;
        }),
        '',
        '## External Profiles',
        `- [GitHub](${SITE.github}): Alejandro Castro's public source-code repositories and project implementations.`,
        `- [LinkedIn](${SITE.linkedin}): Alejandro Castro's professional profile.`,
    ];

    return new Response(`${lines.join('\n')}\n`, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
        },
    });
};
