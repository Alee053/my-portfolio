export type SkillCategory = 'Languages' | 'AI/ML' | 'Tools' | 'Research';
export type SkillLevel = 'core' | 'familiar';

export interface Skill {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
}

export const skills: Skill[] = [
    { name: 'Python', category: 'Languages', level: 'core' },
    { name: 'C++', category: 'Languages', level: 'core' },
    { name: 'TypeScript', category: 'Languages', level: 'familiar' },
    { name: 'JavaScript', category: 'Languages', level: 'familiar' },

    { name: 'PyTorch', category: 'AI/ML', level: 'core' },
    { name: 'Reinforcement Learning', category: 'AI/ML', level: 'core' },
    { name: 'Search-Based Planning', category: 'AI/ML', level: 'core' },
    { name: 'Bayesian Optimization', category: 'AI/ML', level: 'familiar' },
    { name: 'Uncertainty Quantification', category: 'AI/ML', level: 'familiar' },

    { name: 'Git', category: 'Tools', level: 'core' },
    { name: 'Astro', category: 'Tools', level: 'familiar' },
    { name: 'Svelte', category: 'Tools', level: 'familiar' },
    { name: 'Tailwind CSS', category: 'Tools', level: 'familiar' },
    { name: 'p5.js', category: 'Tools', level: 'familiar' },

    { name: 'Algorithms', category: 'Research', level: 'core' },
    { name: 'Sequential Decision Making', category: 'Research', level: 'core' },
    { name: 'International Olympiad in Informatics', category: 'Research', level: 'familiar' },
];

export const skillsByCategory: Record<SkillCategory, Skill[]> = {
    Languages: skills.filter((s) => s.category === 'Languages'),
    'AI/ML': skills.filter((s) => s.category === 'AI/ML'),
    Tools: skills.filter((s) => s.category === 'Tools'),
    Research: skills.filter((s) => s.category === 'Research'),
};
