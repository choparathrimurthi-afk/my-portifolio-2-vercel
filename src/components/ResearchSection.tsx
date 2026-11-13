import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import type { ResearchPaper } from '../types/portfolio';
import { formatBibtexCitation } from '../utils/portfolioLogic';

interface ResearchSectionProps {
  papers: ResearchPaper[];
}

export function ResearchSection({ papers }: ResearchSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(papers[0]?.id ?? null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = async (paper: ResearchPaper) => {
    const bibtex = formatBibtexCitation(paper);
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopiedId(paper.id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === paper.id ? null : prev));
      }, 2000);
    } catch {
      setCopiedId(paper.id);
    }
  };

  return (
    <section
      id="research"
      className="max-w-6xl mx-auto px-6 py-16 lg:py-20 border-b border-[#d8dfe9]"
    >
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-semibold text-[#1e40af] mb-2">
          02. Research Contributions
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1324] text-balance mb-3">
          Applied Manuscripts &amp; Technical Reports
        </h2>
        <p className="text-base text-[#3f4b5e] leading-relaxed">
          Investigations into mixed-precision transformer quantization,
          verifiable multi-hop retrieval, and distribution-free uncertainty
          quantification.
        </p>
      </div>

      <div className="divide-y divide-[#d8dfe9] border border-[#d8dfe9] bg-white rounded-2xl">
        {papers.map((paper, index) => {
          const isExpanded = expandedId === paper.id;
          const isCopied = copiedId === paper.id;
          const bibtex = formatBibtexCitation(paper);

          return (
            <article key={paper.id} className="p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="max-w-3xl">
                  {/* Unboxed editorial metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#647185] mb-2.5">
                    <span className="font-mono text-[#647185] tabular-nums">
                      0{index + 1}.
                    </span>
                    <span className="font-semibold text-[#1e40af]">{paper.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.venue}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{paper.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.track}</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#0b1324] mb-2">
                    {paper.title}
                  </h3>

                  <p className="text-sm text-[#647185] mb-4">{paper.authors}</p>

                  <p className="text-sm sm:text-base text-[#3f4b5e] leading-relaxed">
                    {paper.keyFinding}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedId(isExpanded ? null : paper.id)
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-[#0b1324] bg-[#f2f4f7] border border-[#d8dfe9] rounded-lg hover:bg-[#e9edf4] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{isExpanded ? 'Hide Abstract' : 'View Abstract & BibTeX'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-6 pt-6 border-t border-[#e9edf4] grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7">
                    <h4 className="text-xs font-semibold tracking-wide text-[#647185] mb-2">
                      Abstract
                    </h4>
                    <p className="text-sm text-[#3f4b5e] leading-relaxed">
                      {paper.abstract}
                    </p>
                    <p className="text-xs text-[#647185] mt-3">
                      {paper.doiOrCode}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold tracking-wide text-[#647185]">
                        BibTeX Citation
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleCopyBibtex(paper)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e40af] hover:text-[#1e3a8a] cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copied BibTeX</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Copy BibTeX</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 rounded-xl bg-[#0b1324] text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-[#1f2e4d]">
                      {bibtex}
                    </pre>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
