import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { PresentationSlide, ProfileLinks } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface PresentationDeckModalProps {
  isOpen: boolean;
  slides: PresentationSlide[];
  profile: ProfileLinks;
  onClose: () => void;
}

export function PresentationDeckModal({
  isOpen,
  slides,
  profile,
  onClose,
}: PresentationDeckModalProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSlideIndex(0);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault();
        setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen || slides.length === 0) return null;

  const currentSlide = slides[slideIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Class Presentation Deck"
      className="fixed inset-0 z-50 bg-[#080d1a] text-slate-100 flex flex-col"
    >
      {/* Top Presentation Bar */}
      <div className="px-6 py-4 border-b border-[#1f2e4d] flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-display font-semibold text-white">
            {profile.fullName}
          </span>
          <span aria-hidden="true" className="text-slate-600">
            /
          </span>
          <span className="text-slate-400">Class Presentation Deck</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            Slide {slideIndex + 1} of {slides.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Exit presentation mode"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#0b1324] border border-[#243559] rounded-lg hover:bg-[#131e36] cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-5xl">
          {currentSlide.kind === 'intro' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p className="text-sm font-medium text-blue-300 mb-3">
                  AI &amp; Machine Learning Portfolio Walkthrough
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance mb-5">
                  {currentSlide.title}
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  {currentSlide.subtitle}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {currentSlide.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl bg-[#0b1324] border border-[#1f2e4d]"
                    >
                      <p className="font-mono text-2xl font-semibold text-white tabular-nums">
                        {item.value}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-[#1f2e4d] bg-[#0b1324]">
                <ResilientImage
                  src={profile.photoUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover object-top"
                  fallbackLabel={profile.fullName}
                />
              </div>
            </div>
          )}

          {currentSlide.kind === 'project' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-blue-300 font-medium">
                    {currentSlide.project.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {currentSlide.project.year}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{currentSlide.project.role}</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  {currentSlide.project.title}
                </h2>

                <p className="text-base text-slate-300 leading-relaxed">
                  {currentSlide.project.architectureSummary}
                </p>

                <div className="p-4 rounded-xl bg-[#0b1324] border border-[#1f2e4d]">
                  <p className="font-mono text-2xl font-semibold text-blue-300 tabular-nums whitespace-nowrap">
                    {currentSlide.project.headlineMetric}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentSlide.project.headlineContext}
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-slate-300">
                  {currentSlide.project.takeaways.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-300 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden border border-[#1f2e4d] bg-[#0b1324]">
                <ResilientImage
                  src={currentSlide.project.imageUrl}
                  alt={currentSlide.project.imageAlt}
                  className="w-full h-full object-cover"
                  fallbackLabel={currentSlide.project.title}
                />
              </div>
            </div>
          )}

          {currentSlide.kind === 'research' && (
            <div>
              <p className="text-sm font-medium text-blue-300 mb-2">
                Research Contributions
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-8">
                Manuscripts &amp; Empirical Findings
              </h2>
              <div className="space-y-4">
                {currentSlide.papers.map((paper, idx) => (
                  <div
                    key={paper.id}
                    className="p-6 rounded-xl bg-[#0b1324] border border-[#1f2e4d]"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                      <span className="font-mono tabular-nums">0{idx + 1}.</span>
                      <span className="text-blue-300 font-medium">
                        {paper.role}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{paper.venue}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{paper.year}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-white mb-2">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {paper.keyFinding}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentSlide.kind === 'closing' && (
            <div>
              <p className="text-sm font-medium text-blue-300 mb-2">
                Summary &amp; Q&amp;A
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
                {currentSlide.title}
              </h2>
              <p className="text-base text-slate-400 mb-8">
                {currentSlide.subtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {currentSlide.skillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="p-5 rounded-xl bg-[#0b1324] border border-[#1f2e4d]"
                  >
                    <h3 className="font-display text-base font-semibold text-white mb-3">
                      {group.title}
                    </h3>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-[#0b1324] border border-[#1f2e4d] flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
                <span>Email: {profile.email}</span>
                <span>GitHub: {profile.githubUrl}</span>
                <span>LinkedIn: {profile.linkedinUrl}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Slide Controls */}
      <div className="px-6 py-4 border-t border-[#1f2e4d] flex items-center justify-between shrink-0">
        <span className="text-xs text-slate-400">
          Use Left / Right arrow keys or Spacebar to advance slides
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={slideIndex === 0}
            onClick={() => setSlideIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border border-[#243559] bg-[#0b1324] text-white hover:bg-[#131e36] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={slideIndex === slides.length - 1}
            onClick={() =>
              setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#1e40af] text-white hover:bg-[#1d4ed8] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>Next Slide</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
