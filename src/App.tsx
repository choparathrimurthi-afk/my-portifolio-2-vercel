import { useMemo, useState } from 'react';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PresentationDeckModal } from './components/PresentationDeckModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import {
  DEFAULT_PROFILE,
  HERO_METRICS,
  ML_PROJECTS,
  RESEARCH_PAPERS,
  SKILL_GROUPS,
} from './data/portfolioData';
import type { MLProject, ProfileLinks } from './types/portfolio';
import { buildPresentationSlides } from './utils/portfolioLogic';

const STORAGE_KEY_LINKS = 'thrimurthi_portfolio_links_v1';

function loadInitialProfile(): ProfileLinks {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_LINKS);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw) as Partial<ProfileLinks>;
    return {
      ...DEFAULT_PROFILE,
      githubUrl: parsed.githubUrl || DEFAULT_PROFILE.githubUrl,
      linkedinUrl: parsed.linkedinUrl || DEFAULT_PROFILE.linkedinUrl,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export default function App() {
  const [profile, setProfile] = useState<ProfileLinks>(loadInitialProfile);
  const [activeProject, setActiveProject] = useState<MLProject | null>(null);
  const [presentationOpen, setPresentationOpen] = useState(false);

  const slides = useMemo(
    () =>
      buildPresentationSlides(
        profile,
        ML_PROJECTS,
        RESEARCH_PAPERS,
        SKILL_GROUPS
      ),
    [profile]
  );

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!activeProject) return;
    const currentIndex = ML_PROJECTS.findIndex(
      (item) => item.id === activeProject.id
    );
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % ML_PROJECTS.length
        : (currentIndex - 1 + ML_PROJECTS.length) % ML_PROJECTS.length;
    setActiveProject(ML_PROJECTS[nextIndex]);
  };

  const handleUpdateSocialLinks = (githubUrl: string, linkedinUrl: string) => {
    setProfile((prev) => {
      const next = { ...prev, githubUrl, linkedinUrl };
      try {
        window.localStorage.setItem(
          STORAGE_KEY_LINKS,
          JSON.stringify({ githubUrl, linkedinUrl })
        );
      } catch {
        // Ignore storage quota errors
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-[#0b1324] flex flex-col">
      <Navbar
        brandName={profile.name}
        onContactClick={handleScrollToContact}
      />

      <main className="flex-1">
        <HeroSection
          profile={profile}
          metrics={HERO_METRICS}
          onLaunchPresentation={() => setPresentationOpen(true)}
        />

        <ProjectsSection
          projects={ML_PROJECTS}
          onSelectProject={(project) => setActiveProject(project)}
        />

        <ResearchSection papers={RESEARCH_PAPERS} />

        <CapabilitiesSection skillGroups={SKILL_GROUPS} />

        <ContactSection
          profile={profile}
          onUpdateSocialLinks={handleUpdateSocialLinks}
        />
      </main>

      <footer className="border-t border-[#1f2e4d] bg-[#0b1324] text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} {profile.fullName} · AI &amp; Machine
            Learning Engineer
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="hover:text-white transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        githubBaseUrl={profile.githubUrl}
        onClose={() => setActiveProject(null)}
        onNavigate={handleNavigateProject}
      />

      <PresentationDeckModal
        isOpen={presentationOpen}
        slides={slides}
        profile={profile}
        onClose={() => setPresentationOpen(false)}
      />
    </div>
  );
}
