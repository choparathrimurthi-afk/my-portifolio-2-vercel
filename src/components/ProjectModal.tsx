import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react';
import type { MLProject } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: MLProject | null;
  githubBaseUrl: string;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export function ProjectModal({
  project,
  githubBaseUrl,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onNavigate('prev');
      } else if (event.key === 'ArrowRight') {
        onNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onNavigate]);

  if (!project) return null;

  const normalizedBase = githubBaseUrl.replace(/\/+$/, '');
  const repoHref = `${normalizedBase}/${project.repoPath}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 bg-[#080d1a]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#d8dfe9] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d8dfe9] bg-[#f2f4f7] shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#3f4b5e]">
            <span className="font-semibold text-[#1e40af]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.role}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('prev')}
              aria-label="Previous project case study"
              className="p-2 rounded-lg border border-[#d8dfe9] bg-white text-[#3f4b5e] hover:bg-[#e9edf4] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('next')}
              aria-label="Next project case study"
              className="p-2 rounded-lg border border-[#d8dfe9] bg-white text-[#3f4b5e] hover:bg-[#e9edf4] cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="p-2 rounded-lg border border-[#d8dfe9] bg-white text-[#3f4b5e] hover:bg-[#e9edf4] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable Case Study Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7">
              <h2
                id="case-study-title"
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0b1324] mb-2.5"
              >
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[#3f4b5e] leading-relaxed mb-3">
                {project.summary}
              </p>
              <p className="text-xs text-[#647185]">
                Stack: {project.stack.join(' · ')}
              </p>
            </div>

            <div className="md:col-span-5 aspect-[16/10] rounded-xl overflow-hidden border border-[#d8dfe9] bg-[#e9edf4]">
              <ResilientImage
                src={project.imageUrl}
                alt={project.imageAlt}
                className="w-full h-full object-cover"
                fallbackLabel={project.title}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-[#d8dfe9]">
            <div>
              <h3 className="font-display text-base font-semibold text-[#0b1324] mb-1.5">
                Problem Formulation
              </h3>
              <p className="text-sm text-[#3f4b5e] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold text-[#0b1324] mb-1.5">
                System Architecture
              </h3>
              <p className="text-sm text-[#3f4b5e] leading-relaxed">
                {project.architectureSummary}
              </p>
            </div>
          </div>

          {/* Empirical Benchmark Comparison Table */}
          <div className="pt-5 border-t border-[#d8dfe9]">
            <h3 className="font-display text-base font-semibold text-[#0b1324] mb-3">
              Empirical Benchmark Evaluation
            </h3>
            <div className="overflow-x-auto border border-[#d8dfe9] rounded-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#f2f4f7] border-b border-[#d8dfe9] text-xs font-medium text-[#647185]">
                    <th className="py-2.5 px-4">Model Configuration</th>
                    <th className="py-2.5 px-4">Evaluation Set</th>
                    <th className="py-2.5 px-4">Metric</th>
                    <th className="py-2.5 px-4 text-right">Score</th>
                    <th className="py-2.5 px-4 text-right">Latency / Footprint</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d8dfe9]">
                  {project.benchmarks.map((row) => (
                    <tr
                      key={row.model}
                      className={row.isOurs ? 'bg-[#e9edf4] font-semibold' : 'bg-white'}
                    >
                      <td className="py-2.5 px-4 text-[#0b1324]">{row.model}</td>
                      <td className="py-2.5 px-4 text-[#3f4b5e]">{row.dataset}</td>
                      <td className="py-2.5 px-4 text-[#3f4b5e]">
                        {row.primaryMetricLabel}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#0b1324]">
                        {row.primaryMetricValue}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#3f4b5e]">
                        {row.latencyOrSize}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="pt-5 border-t border-[#d8dfe9]">
            <h3 className="font-display text-base font-semibold text-[#0b1324] mb-3">
              Key Engineering Takeaways
            </h3>
            <ul className="space-y-2.5 text-sm text-[#3f4b5e]">
              {project.takeaways.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1e40af] shrink-0"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#d8dfe9] bg-[#f2f4f7] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-[#647185]">
            Keyboard shortcuts: Left / Right arrows to cycle projects · Esc to close
          </span>
          <a
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#0b1324] rounded-lg hover:bg-[#16223b] transition-colors"
          >
            <span>View Repository on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
