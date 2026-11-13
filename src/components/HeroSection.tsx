import { ArrowUpRight, Github, Linkedin, Mail, Presentation } from 'lucide-react';
import type { ProfileLinks } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  profile: ProfileLinks;
  metrics: Array<{ value: string; label: string }>;
  onLaunchPresentation: () => void;
}

export function HeroSection({
  profile,
  metrics,
  onLaunchPresentation,
}: HeroSectionProps) {
  return (
    <section
      id="top"
      className="max-w-6xl mx-auto px-6 pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#d8dfe9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        {/* Left Column: Typographic Hierarchy & Primary Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between py-1">
          <div>
            <p className="text-sm font-semibold text-[#1e40af] tracking-wide mb-4">
              {profile.locationOrProgram}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#0b1324] leading-[1.08] text-balance mb-6">
              {profile.fullName}: Engineering Reliable Machine Learning Systems.
            </h1>

            <p className="text-base sm:text-lg text-[#3f4b5e] leading-relaxed max-w-[62ch] mb-8">
              {profile.headline} Focused on reproducible model architectures,
              empirical ablations, and production-grade latency budgets from
              laboratory research to edge hardware.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#0b1324] rounded-lg hover:bg-[#16223b] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
              >
                Explore ML Projects
              </a>

              <button
                type="button"
                onClick={onLaunchPresentation}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-[#0b1324] bg-white border border-[#d8dfe9] rounded-lg hover:bg-[#e9edf4] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e40af]"
              >
                <Presentation className="w-4 h-4 text-[#1e40af]" aria-hidden="true" />
                <span>Class Presentation Mode</span>
              </button>
            </div>
          </div>

          {/* Direct Profile Links (Clean unboxed typography with separators) */}
          <div className="pt-6 border-t border-[#d8dfe9] flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#3f4b5e]">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[#0b1324] hover:text-[#1e40af] transition-colors duration-150 whitespace-nowrap"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#647185]" aria-hidden="true" />
            </a>

            <span aria-hidden="true" className="text-[#c5cfde]">
              /
            </span>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[#0b1324] hover:text-[#1e40af] transition-colors duration-150 whitespace-nowrap"
            >
              <Linkedin className="w-4 h-4 text-[#1e40af]" aria-hidden="true" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#647185]" aria-hidden="true" />
            </a>

            <span aria-hidden="true" className="hidden sm:inline text-[#c5cfde]">
              /
            </span>

            <a
              href={`mailto:${profile.email}`}
              className="w-full sm:w-auto inline-flex items-center gap-1.5 font-medium text-[#0b1324] hover:text-[#1e40af] transition-colors duration-150"
            >
              <Mail className="w-4 h-4 shrink-0 text-[#1e40af]" aria-hidden="true" />
              <span className="truncate">{profile.email}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Matching-height Framed Portrait */}
        <div className="lg:col-span-5">
          <div className="relative h-full min-h-[360px] lg:min-h-[440px] rounded-2xl overflow-hidden border border-[#d8dfe9] bg-[#e9edf4]">
            <ResilientImage
              src={profile.photoUrl}
              alt="Portrait of Ch. Thrimurthi, AI and Machine Learning Engineer, wearing a tailored dark blazer and collared shirt"
              className="w-full h-full object-cover object-top"
              fallbackLabel={profile.fullName}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080d1a]/88 via-[#080d1a]/45 to-transparent p-6 pt-16">
              <p className="font-display text-lg font-semibold text-white">
                {profile.fullName}
              </p>
              <p className="text-xs text-slate-200 mt-0.5">
                AI Engineer · Applied Vision, Retrieval &amp; Quantized Edge ML
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Quantitative Strip Directly Below Split */}
      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 border border-[#1f2e4d] bg-[#0b1324] text-white rounded-xl divide-y lg:divide-y-0 lg:divide-x divide-[#1f2e4d]">
        {metrics.map((metric) => (
          <div key={metric.label} className="p-6">
            <p className="font-mono text-2xl sm:text-3xl font-semibold text-white tabular-nums tracking-tight">
              {metric.value}
            </p>
            <p className="text-sm text-slate-300 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
