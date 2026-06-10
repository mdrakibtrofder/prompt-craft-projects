import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CATEGORY_COLORS, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(99,102,241,0.25)] hover:border-indigo-200"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f9f9f9]">
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        {!errored ? (
          <img
            src={`/screenshots/${project.slug}.jpg`}
            alt={`${project.name} screenshot`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            Preview unavailable
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-gray-900">{project.name}</h3>
            <p className="mt-0.5 truncate text-[13px] text-gray-500">{project.student}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${CATEGORY_COLORS[project.category]}`}
          >
            {project.category}
          </span>
        </div>

        <div className="mt-auto flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 transition-colors group-hover:text-indigo-700">
          Visit Project
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </a>
  );
}
