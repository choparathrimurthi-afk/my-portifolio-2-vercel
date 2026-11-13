import type {
  MLProject,
  PresentationSlide,
  ProfileLinks,
  ProjectCategory,
  ResearchPaper,
  SkillGroup,
} from '../types/portfolio';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All Work',
  'Computer Vision',
  'NLP & LLMs',
  'Time Series & Edge',
];

export function filterProjects(
  projects: MLProject[],
  category: ProjectCategory,
  searchQuery: string
): MLProject[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'All Work' || project.category === category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      project.title,
      project.category,
      project.summary,
      project.headlineMetric,
      ...project.stack,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getCategoryCounts(
  projects: MLProject[]
): Record<ProjectCategory, number> {
  const counts: Record<ProjectCategory, number> = {
    'All Work': projects.length,
    'Computer Vision': 0,
    'NLP & LLMs': 0,
    'Time Series & Edge': 0,
  };

  for (const project of projects) {
    counts[project.category] += 1;
  }

  return counts;
}

export function formatBibtexCitation(paper: ResearchPaper): string {
  const cleanTitle = paper.title.replace(/[{}]/g, '');
  return [
    `@inproceedings{${paper.bibtexKey},`,
    `  title     = {${cleanTitle}},`,
    `  author    = {${paper.authors}},`,
    `  booktitle = {${paper.venue}},`,
    `  year      = {${paper.year}},`,
    `  note      = {${paper.track}}`,
    `}`,
  ].join('\n');
}

export function buildPresentationSlides(
  profile: ProfileLinks,
  projects: MLProject[],
  papers: ResearchPaper[],
  skillGroups: SkillGroup[]
): PresentationSlide[] {
  const slides: PresentationSlide[] = [
    {
      kind: 'intro',
      title: `${profile.fullName} — Applied AI & Machine Learning`,
      subtitle: profile.headline,
      highlights: [
        { value: String(projects.length), label: 'Production-Ready ML Systems' },
        { value: String(papers.length), label: 'Research Contributions' },
        { value: '94.2%', label: 'Peak Defect Detection F1' },
        { value: '3.1%', label: 'Grounded RAG Hallucination' },
      ],
    },
  ];

  for (const project of projects) {
    slides.push({
      kind: 'project',
      project,
    });
  }

  slides.push({
    kind: 'research',
    papers,
  });

  slides.push({
    kind: 'closing',
    title: 'Engineering Stack & Discussion',
    subtitle: `Questions & live walkthroughs · ${profile.email}`,
    skillGroups,
  });

  return slides;
}

export function validateProfileUrl(
  rawUrl: string,
  platform: 'github' | 'linkedin'
): { valid: boolean; normalized: string; error?: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return {
      valid: false,
      normalized: '',
      error: `Please enter a valid ${platform === 'github' ? 'GitHub' : 'LinkedIn'} URL.`,
    };
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    const host = parsed.hostname.toLowerCase();

    if (platform === 'github' && !host.includes('github.com')) {
      return {
        valid: false,
        normalized: trimmed,
        error: 'URL must point to github.com.',
      };
    }

    if (platform === 'linkedin' && !host.includes('linkedin.com')) {
      return {
        valid: false,
        normalized: trimmed,
        error: 'URL must point to linkedin.com.',
      };
    }

    return {
      valid: true,
      normalized: parsed.toString(),
    };
  } catch {
    return {
      valid: false,
      normalized: trimmed,
      error: 'Enter a properly formatted web URL.',
    };
  }
}
