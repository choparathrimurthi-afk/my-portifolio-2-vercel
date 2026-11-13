import type { SkillGroup } from '../types/portfolio';

interface CapabilitiesSectionProps {
  skillGroups: SkillGroup[];
}

export function CapabilitiesSection({ skillGroups }: CapabilitiesSectionProps) {
  return (
    <section
      id="capabilities"
      className="max-w-6xl mx-auto px-6 py-16 lg:py-20 border-b border-[#d8dfe9]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-[#1e40af] mb-2">
            03. Technical Stack &amp; Methodology
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1324] text-balance">
            Engineering Capabilities Across the ML Lifecycle
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-[#3f4b5e] leading-relaxed">
            From dataset curation and contrastive pretraining to INT4
            quantization and FastAPI deployment — built around reproducible
            ablation workflows and measurable evaluation harnesses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group, idx) => (
          <div
            key={group.title}
            className="bg-white border border-[#d8dfe9] rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs font-medium text-[#1e40af] tabular-nums mb-2">
                0{idx + 1}
              </p>
              <h3 className="font-display text-lg font-semibold text-[#0b1324] mb-2">
                {group.title}
              </h3>
              <p className="text-xs text-[#647185] leading-relaxed mb-5">
                {group.description}
              </p>
            </div>

            <ul className="space-y-2.5 pt-4 border-t border-[#e9edf4] text-sm text-[#0b1324]">
              {group.items.map((item) => (
                <li key={item} className="font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
