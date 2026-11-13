import { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import type { MLProject, ProjectCategory } from '../types/portfolio';
import {
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryCounts,
} from '../utils/portfolioLogic';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  projects: MLProject[];
  onSelectProject: (project: MLProject) => void;
}

export function ProjectsSection({
  projects,
  onSelectProject,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('All Work');
  const [searchQuery, setSearchQuery] = useState('');

  const counts = getCategoryCounts(projects);
  const visibleProjects = filterProjects(projects, selectedCategory, searchQuery);

  return (
    <section
      id="projects"
      className="max-w-6xl mx-auto px-6 py-16 lg:py-20 border-b border-[#d8dfe9]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-sm font-semibold text-[#1e40af] mb-2">
            01. Selected Engineering Work
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0b1324] text-balance">
            Machine Learning Projects &amp; Benchmarks
          </h2>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <label htmlFor="project-search" className="sr-only">
            Filter projects by keyword or framework
          </label>
          <Search
            className="w-4 h-4 text-[#647185] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="project-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by model, PyTorch, RAG..."
            className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-[#d8dfe9] rounded-lg text-[#0b1324] placeholder:text-[#647185] focus:outline-none focus:border-[#1e40af] focus:ring-2 focus:ring-[#1e40af]/15"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear project search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#647185] hover:text-[#0b1324] cursor-pointer"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Segmented Filter Tabs */}
      <div
        role="tablist"
        aria-label="Filter machine learning projects by domain"
        className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#e9edf4] border border-[#d8dfe9] rounded-lg mb-10"
      >
        {PROJECT_CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1e40af] ${
                isActive
                  ? 'bg-[#0b1324] text-white shadow-xs'
                  : 'text-[#3f4b5e] hover:text-[#0b1324]'
              }`}
            >
              <span>{category}</span>
              <span
                className={`ml-1.5 font-mono text-xs tabular-nums ${
                  isActive ? 'text-slate-300' : 'text-[#647185]'
                }`}
              >
                {counts[category]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {visibleProjects.length === 0 ? (
        <div className="bg-white border border-[#d8dfe9] rounded-2xl p-12 text-center">
          <p className="font-display text-lg font-semibold text-[#0b1324] mb-2">
            No matching ML systems found
          </p>
          <p className="text-sm text-[#3f4b5e] mb-6">
            Try clearing your keyword filter or switching back to all domains.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Work');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-[#0b1324] rounded-lg hover:bg-[#16223b] transition-colors cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div
          data-testid="projects-grid"
          className="space-y-8"
        >
          {(() => {
            const showFeaturedSplit =
              selectedCategory === 'All Work' &&
              !searchQuery &&
              visibleProjects.length === 4 &&
              visibleProjects[0]?.featured;

            const featuredProject = showFeaturedSplit ? visibleProjects[0] : null;
            const gridProjects = showFeaturedSplit
              ? visibleProjects.slice(1)
              : visibleProjects;

            return (
              <>
                {featuredProject && (
                  <article className="group bg-white border border-[#d8dfe9] rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors duration-150 hover:border-[#b9c5d8]">
                    <div className="relative overflow-hidden bg-[#e9edf4] lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-full">
                      <ResilientImage
                        src={featuredProject.imageUrl}
                        alt={featuredProject.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        fallbackLabel={featuredProject.title}
                      />
                    </div>

                    <div className="p-6 sm:p-8 flex flex-col justify-between lg:col-span-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#647185] mb-3">
                          <span className="font-semibold text-[#1e40af]">
                            {featuredProject.category}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">
                            {featuredProject.year}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredProject.role}</span>
                        </div>

                        <h3 className="font-display text-2xl font-bold tracking-tight text-[#0b1324] mb-3">
                          {featuredProject.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#3f4b5e] leading-relaxed mb-6">
                          {featuredProject.summary}
                        </p>
                      </div>

                      <div>
                        <div className="py-4 border-t border-b border-[#e9edf4] mb-5">
                          <p className="font-mono text-xl font-semibold text-[#0b1324] tabular-nums whitespace-nowrap">
                            {featuredProject.headlineMetric}
                          </p>
                          <p className="text-xs text-[#647185] mt-1">
                            {featuredProject.headlineContext}
                          </p>
                        </div>

                        <p className="text-xs text-[#647185] mb-6 leading-relaxed">
                          {featuredProject.stack.join(' · ')}
                        </p>

                        <button
                          type="button"
                          onClick={() => onSelectProject(featuredProject)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] hover:text-[#1e3a8a] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
                        >
                          <span>Inspect Architecture &amp; Benchmarks</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                )}

                <div
                  className={`grid grid-cols-1 gap-8 ${
                    gridProjects.length === 3
                      ? 'md:grid-cols-2 lg:grid-cols-3'
                      : gridProjects.length === 2
                        ? 'lg:grid-cols-2'
                        : 'max-w-2xl'
                  }`}
                >
                  {gridProjects.map((project) => (
                    <article
                      key={project.id}
                      className="group bg-white border border-[#d8dfe9] rounded-2xl overflow-hidden flex flex-col transition-colors duration-150 hover:border-[#b9c5d8]"
                    >
                      <div className="relative overflow-hidden bg-[#e9edf4] aspect-[4/3]">
                        <ResilientImage
                          src={project.imageUrl}
                          alt={project.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          fallbackLabel={project.title}
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#647185] mb-3">
                            <span className="font-semibold text-[#1e40af]">
                              {project.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">
                              {project.year}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{project.role}</span>
                          </div>

                          <h3 className="font-display text-xl font-bold tracking-tight text-[#0b1324] mb-2.5">
                            {project.title}
                          </h3>

                          <p className="text-sm text-[#3f4b5e] leading-relaxed mb-5">
                            {project.summary}
                          </p>
                        </div>

                        <div>
                          <div className="py-3.5 border-t border-b border-[#e9edf4] mb-4">
                            <p className="font-mono text-lg font-semibold text-[#0b1324] tabular-nums whitespace-nowrap">
                              {project.headlineMetric}
                            </p>
                            <p className="text-xs text-[#647185] mt-0.5 leading-snug">
                              {project.headlineContext}
                            </p>
                          </div>

                          <p className="text-xs text-[#647185] mb-5 leading-relaxed">
                            {project.stack.join(' · ')}
                          </p>

                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1e40af] hover:text-[#1e3a8a] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e40af]"
                          >
                            <span>Inspect Architecture &amp; Benchmarks</span>
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </section>
  );
}
