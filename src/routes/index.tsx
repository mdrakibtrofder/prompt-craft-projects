import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { CATEGORIES, PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

const HERO_SLIDES = [
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
  "/hero/hero-5.jpg",
  "/hero/hero-6.jpg",
  "/hero/hero-7.jpg",
];

export const Route = createFileRoute("/")({
  component: Index,
});

const AI_TOOLS: { name: string; url: string }[] = [
  { name: "Claude", url: "https://claude.ai" },
  { name: "Gemini", url: "https://gemini.google.com" },
  { name: "ChatGPT", url: "https://chatgpt.com" },
  { name: "Lovable", url: "https://lovable.dev" },
];

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return p.name.toLowerCase().includes(q) || p.student.toLowerCase().includes(q);
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-white font-[Inter,system-ui,sans-serif] text-gray-900 antialiased">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-gray-100">
        {/* Sliding background images */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => (
            <div
              key={src}
              className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
              style={{
                opacity: i === slide ? 1 : 0,
                backgroundImage: `url(${src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: i === slide ? "scale(1.05)" : "scale(1)",
                transition: "opacity 1800ms ease-in-out, transform 7000ms ease-out",
              }}
            />
          ))}
          {/* Readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/95" />
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/60 via-transparent to-rose-50/40" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Classroom Showcase
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm sm:text-5xl md:text-6xl">
              AI-Powered Projects Creation
              <span className="block text-indigo-600">Classwork on Ethics Course</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-gray-700 sm:text-lg">
              Built with Claude · Gemini · ChatGPT · Lovable
              <span className="mt-2 block text-gray-600">This is what learning looks like with AI.</span>
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {AI_TOOLS.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-indigo-700 underline decoration-indigo-400 decoration-1 underline-offset-4 shadow-sm backdrop-blur transition-all hover:border-indigo-300 hover:bg-white hover:text-indigo-800 hover:decoration-indigo-600"
                >
                  {tool.name}
                </a>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="mt-10 flex justify-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === slide ? "w-8 bg-indigo-600" : "w-4 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Search + Filter */}
      <section className="sticky top-0 z-20 border-b border-gray-100 bg-white/85 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by project or student name…"
              className="w-full rounded-xl border border-gray-200 bg-[#f9f9f9] py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-indigo-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-indigo-200 hover:text-indigo-600"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-[#f9f9f9] py-20 text-center">
            <p className="text-sm text-gray-500">No projects match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-[#f9f9f9]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-gray-500" />
      </footer>
    </div>
  );
}
