import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CATEGORY_COLORS, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200">
      {/* Screenshot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
        )}
        {!errored ? (
          <img
            src={`${import.meta.env.BASE_URL}screenshots/${project.slug}.jpg`}
            alt={`${project.name} screenshot`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            Preview unavailable
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold leading-snug text-gray-900 truncate">
              {project.name}
            </h3>
            <p className="mt-1 text-[13px] text-gray-500 truncate">{project.student}</p>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ring-1 ring-inset ${CATEGORY_COLORS[project.category]}`}
          >
            {project.category}
          </span>
        </div>

        {/* Button */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-indigo-600 active:scale-[0.98]"
        >
          Visit Project
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
