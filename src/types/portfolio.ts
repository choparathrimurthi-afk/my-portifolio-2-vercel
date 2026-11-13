export type ProjectCategory =
  | 'All Work'
  | 'Computer Vision'
  | 'NLP & LLMs'
  | 'Time Series & Edge';

export interface BenchmarkRow {
  model: string;
  dataset: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  latencyOrSize: string;
  isOurs?: boolean;
}

export interface MLProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Work'>;
  year: string;
  role: string;
  headlineMetric: string;
  headlineContext: string;
  summary: string;
  problemStatement: string;
  architectureSummary: string;
  stack: string[];
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  repoPath: string;
  benchmarks: BenchmarkRow[];
  takeaways: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  track: string;
  role: string;
  keyFinding: string;
  abstract: string;
  bibtexKey: string;
  doiOrCode: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  items: string[];
}

export interface ProfileLinks {
  name: string;
  fullName: string;
  headline: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  photoUrl: string;
  locationOrProgram: string;
}

export type PresentationSlide =
  | {
      kind: 'intro';
      title: string;
      subtitle: string;
      highlights: Array<{ value: string; label: string }>;
    }
  | {
      kind: 'project';
      project: MLProject;
    }
  | {
      kind: 'research';
      papers: ResearchPaper[];
    }
  | {
      kind: 'closing';
      title: string;
      subtitle: string;
      skillGroups: SkillGroup[];
    };
