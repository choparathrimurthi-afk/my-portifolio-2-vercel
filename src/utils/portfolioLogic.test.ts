import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPresentationSlides,
  filterProjects,
  formatBibtexCitation,
  getCategoryCounts,
  validateProfileUrl,
} from './portfolioLogic';
import type {
  MLProject,
  ProfileLinks,
  ResearchPaper,
  SkillGroup,
} from '../types/portfolio';

const sampleProjects: MLProject[] = [
  {
    id: 'p1',
    title: 'VisionDefect ViT',
    category: 'Computer Vision',
    year: '2026',
    role: 'Lead ML Engineer',
    headlineMetric: '94.2% Macro-F1',
    headlineContext: '18.4 ms inference',
    summary: 'Wafer defect detection with Swin Transformer.',
    problemStatement: 'Detect subtle defects.',
    architectureSummary: 'Swin + TensorRT',
    stack: ['PyTorch', 'TensorRT'],
    imageUrl: '/img1.jpg',
    imageAlt: 'Wafer inspection',
    repoPath: 'vision-defect-vit',
    benchmarks: [],
    takeaways: [],
  },
  {
    id: 'p2',
    title: 'CiteGraph RAG',
    category: 'NLP & LLMs',
    year: '2026',
    role: 'Architect',
    headlineMetric: '3.1% Hallucination',
    headlineContext: 'Multi-hop QA',
    summary: 'Hybrid dense and knowledge graph retrieval.',
    problemStatement: 'Reduce unsupported claims.',
    architectureSummary: 'FAISS + Graph',
    stack: ['FAISS', 'FastAPI'],
    imageUrl: '/img2.jpg',
    imageAlt: 'Graph RAG',
    repoPath: 'citegraph-rag',
    benchmarks: [],
    takeaways: [],
  },
  {
    id: 'p3',
    title: 'EdgeQuant INT4',
    category: 'Time Series & Edge',
    year: '2025',
    role: 'Researcher',
    headlineMetric: '3.6x Smaller',
    headlineContext: 'Mixed-precision PTQ',
    summary: 'Sensitivity-aware INT4 quantization.',
    problemStatement: 'Compress ViTs for Jetson.',
    architectureSummary: 'Hessian PTQ',
    stack: ['PyTorch', 'CUDA'],
    imageUrl: '/img3.jpg',
    imageAlt: 'Edge module',
    repoPath: 'edgequant-int4',
    benchmarks: [],
    takeaways: [],
  },
];

const samplePapers: ResearchPaper[] = [
  {
    id: 'r1',
    title: 'Adaptive {INT4} Calibration',
    authors: 'Ch. Thrimurthi, R. Venkatesh',
    venue: 'AI Edge Workshop',
    year: '2026',
    track: 'Quantization',
    role: 'First Author',
    keyFinding: 'Recovers +4.9% accuracy.',
    abstract: 'Abstract text here.',
    bibtexKey: 'thrimurthi2026adaptive',
    doiOrCode: 'arXiv Preprint',
  },
];

const sampleProfile: ProfileLinks = {
  name: 'Thrimurthi',
  fullName: 'Ch. Thrimurthi',
  headline: 'AI & ML Engineer',
  email: 'choparathrimurthi@gmail.com',
  githubUrl: 'https://github.com/thrimurthi-chopara',
  linkedinUrl: 'https://www.linkedin.com/in/thrimurthi-chopara',
  photoUrl: '/assets/aistudio/ti_2c620bad.jpeg',
  locationOrProgram: 'Applied AI',
};

const sampleSkills: SkillGroup[] = [
  {
    title: 'Core ML',
    description: 'Deep learning foundations.',
    items: ['PyTorch'],
  },
];

test('filterProjects filters by category and search query accurately', () => {
  assert.equal(filterProjects(sampleProjects, 'All Work', '').length, 3);
  assert.equal(
    filterProjects(sampleProjects, 'Computer Vision', '').length,
    1
  );
  assert.equal(
    filterProjects(sampleProjects, 'NLP & LLMs', 'faiss')[0]?.id,
    'p2'
  );
  assert.equal(
    filterProjects(sampleProjects, 'Computer Vision', 'faiss').length,
    0
  );
});

test('getCategoryCounts computes exact totals per category', () => {
  const counts = getCategoryCounts(sampleProjects);
  assert.deepEqual(counts, {
    'All Work': 3,
    'Computer Vision': 1,
    'NLP & LLMs': 1,
    'Time Series & Edge': 1,
  });
});

test('formatBibtexCitation produces clean BibTeX block without stray braces', () => {
  const bib = formatBibtexCitation(samplePapers[0]);
  assert.match(bib, /^@inproceedings\{thrimurthi2026adaptive,/);
  assert.match(bib, /title\s+=\s+\{Adaptive INT4 Calibration\}/);
  assert.match(bib, /author\s+=\s+\{Ch\. Thrimurthi, R\. Venkatesh\}/);
});

test('buildPresentationSlides creates ordered deck covering intro, projects, research, and closing', () => {
  const slides = buildPresentationSlides(
    sampleProfile,
    sampleProjects,
    samplePapers,
    sampleSkills
  );
  assert.equal(slides.length, 6);
  assert.equal(slides[0].kind, 'intro');
  assert.equal(slides[1].kind, 'project');
  assert.equal(slides[4].kind, 'research');
  assert.equal(slides[5].kind, 'closing');
});

test('validateProfileUrl validates and normalizes GitHub and LinkedIn URLs', () => {
  const validGh = validateProfileUrl('github.com/thrimurthi', 'github');
  assert.equal(validGh.valid, true);
  assert.equal(validGh.normalized, 'https://github.com/thrimurthi');

  const wrongHost = validateProfileUrl('https://gitlab.com/user', 'github');
  assert.equal(wrongHost.valid, false);
  assert.ok(wrongHost.error);

  const validLi = validateProfileUrl(
    'https://www.linkedin.com/in/thrimurthi',
    'linkedin'
  );
  assert.equal(validLi.valid, true);
});
