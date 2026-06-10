import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { CATEGORIES, PROJECTS } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI-Powered Projects · Ethics Course Classwork" },
      {
        name: "description",
        content:
          "Student projects built in a single class session with Claude, Gemini, ChatGPT, and Lovable. This is what learning looks like with AI.",
      },
      { property: "og:title", content: "AI-Powered Projects · Ethics Course Classwork" },
      {
        property: "og:description",
        content: "Student projects built with Claude, Gemini, ChatGPT, and Lovable in one class session.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

const AI_TOOLS = ["Claude", "Gemini", "ChatGPT", "Lovable"];

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

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
      <header className="border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              <Sparkles className="h-3.5 w-3.5" />
              Classroom Showcase
            </div>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              AI-Powered Projects Creation
              <span className="block text-indigo-600">Classwork on Ethics Course</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base text-gray-600 sm:text-lg">
              Built with Claude · Gemini · ChatGPT · Lovable
              <span className="mt-2 block text-gray-500">This is what learning looks like with AI.</span>
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {AI_TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
                >
                  {tool}
                </span>
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
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-gray-500">
          A classroom experiment in AI-powered learning · 35 student projects built in one session
        </div>
      </footer>
    </div>
  );
}
