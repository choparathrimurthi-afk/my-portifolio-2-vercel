import { useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  SlidersHorizontal,
} from 'lucide-react';
import type { ProfileLinks } from '../types/portfolio';
import { validateProfileUrl } from '../utils/portfolioLogic';

interface ContactSectionProps {
  profile: ProfileLinks;
  onUpdateSocialLinks: (githubUrl: string, linkedinUrl: string) => void;
}

export function ContactSection({
  profile,
  onUpdateSocialLinks,
}: ContactSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [editingLinks, setEditingLinks] = useState(false);
  const [githubInput, setGithubInput] = useState(profile.githubUrl);
  const [linkedinInput, setLinkedinInput] = useState(profile.linkedinUrl);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [linksSaved, setLinksSaved] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
    }
  };

  const handleSaveLinks = (e: FormEvent) => {
    e.preventDefault();
    const gh = validateProfileUrl(githubInput, 'github');
    if (!gh.valid) {
      setLinkError(gh.error ?? 'Invalid GitHub URL.');
      return;
    }

    const li = validateProfileUrl(linkedinInput, 'linkedin');
    if (!li.valid) {
      setLinkError(li.error ?? 'Invalid LinkedIn URL.');
      return;
    }

    setLinkError(null);
    onUpdateSocialLinks(gh.normalized, li.normalized);
    setGithubInput(gh.normalized);
    setLinkedinInput(li.normalized);
    setEditingLinks(false);
    setLinksSaved(true);
    window.setTimeout(() => setLinksSaved(false), 2500);
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
      <div className="bg-[#0b1324] text-white border border-[#1f2e4d] rounded-2xl p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-blue-300 mb-2">
              04. Direct Contact &amp; Profiles
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance mb-4">
              Let&apos;s Discuss Applied AI &amp; ML Engineering
            </h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-[56ch] mb-8">
              Available for machine learning engineering roles, applied AI
              research collaborations, and technical walkthroughs of any project
              presented above.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#0b1324] bg-white rounded-lg hover:bg-slate-100 transition-colors duration-150 whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-[#1e40af]" aria-hidden="true" />
                <span>Email {profile.email}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#131e36] border border-[#243559] rounded-lg hover:bg-[#1a2947] transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-blue-300" aria-hidden="true" />
                    <span>Copied {profile.email}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl border border-[#243559] bg-[#131e36] hover:bg-[#182642] hover:border-blue-400/50 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#0b1324] border border-[#243559] flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5 text-blue-300" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold text-white">
                    LinkedIn Profile
                  </p>
                  <p className="text-xs text-slate-300 truncate">
                    {profile.linkedinUrl}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-slate-400 group-hover:text-blue-300 shrink-0"
                aria-hidden="true"
              />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl border border-[#243559] bg-[#131e36] hover:bg-[#182642] hover:border-blue-400/50 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#0b1324] border border-[#243559] flex items-center justify-center shrink-0">
                  <Github className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold text-white">
                    GitHub Repositories
                  </p>
                  <p className="text-xs text-slate-300 truncate">
                    {profile.githubUrl}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-slate-400 group-hover:text-blue-300 shrink-0"
                aria-hidden="true"
              />
            </a>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                aria-expanded={editingLinks}
                onClick={() => {
                  setGithubInput(profile.githubUrl);
                  setLinkedinInput(profile.linkedinUrl);
                  setLinkError(null);
                  setEditingLinks((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {editingLinks ? 'Cancel link edit' : 'Update GitHub / LinkedIn URLs'}
                </span>
              </button>

              {linksSaved && (
                <span className="text-xs font-medium text-blue-300">
                  Profile links updated
                </span>
              )}
            </div>
          </div>
        </div>

        {editingLinks && (
          <form
            onSubmit={handleSaveLinks}
            className="mt-8 pt-6 border-t border-[#1f2e4d] grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-5">
              <label
                htmlFor="linkedin-url-input"
                className="block text-xs font-medium text-slate-200 mb-1.5"
              >
                LinkedIn URL
              </label>
              <input
                id="linkedin-url-input"
                type="text"
                value={linkedinInput}
                onChange={(e) => setLinkedinInput(e.target.value)}
                placeholder="https://www.linkedin.com/in/your-handle"
                className="w-full px-3.5 py-2 text-sm bg-[#131e36] text-white border border-[#2c3f66] rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="md:col-span-5">
              <label
                htmlFor="github-url-input"
                className="block text-xs font-medium text-slate-200 mb-1.5"
              >
                GitHub URL
              </label>
              <input
                id="github-url-input"
                type="text"
                value={githubInput}
                onChange={(e) => setGithubInput(e.target.value)}
                placeholder="https://github.com/your-handle"
                className="w-full px-3.5 py-2 text-sm bg-[#131e36] text-white border border-[#2c3f66] rounded-lg placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-[#0b1324] bg-white rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Save URLs
              </button>
            </div>

            {linkError && (
              <p role="alert" className="md:col-span-12 text-xs text-red-300">
                {linkError}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
