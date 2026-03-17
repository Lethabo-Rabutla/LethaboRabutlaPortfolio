import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  restricted?: boolean;
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Face Recognition ATM System (School Project)",
      category: "Web Development",
      description:
        "Source code is restricted as it is institutional property. I can, however, explain the full system design, technologies used, and how the solution was implemented.",
      tech: ["Python", "Flask", "JavaScipt", "ML"],
      image: "/images/FaceRecognition.jpg",
      githubUrl: "null",
      restricted: true,
    },
    {
      id: 2,
      title: "Automated ETL Pipeline (CSV/File-based)",
      category: "DATA",
      description:
        "Developed a custom Python-based ETL pipeline designed to ingest, clean, and transform raw CSV datasets. This system automates the normalization of incosistens data, ensuring it is business-ready for analytics and reporting. ",
      tech: ["Python", "Pandas", "SQL", "Data cleaning"],
      image: "/images/DataCSV.jpg",
      githubUrl: "https://github.com/Lethabo-Rabutla/softwork-etl-pipeline",
    },
    {
      id: 3,
      title: "Live Weather Data Pipeline",
      category: "LIVE DATA",
      description:
        "Built a real-time data integration project that extracts live weather information via REST APIs. The pipeline handles data ingestion and transform JSON responses into structured formats for storage and visualization",
      tech: ["Python", "REST APIs", "JSON", "Airflow"],
      image: "/images/LiveData.webp",
      githubUrl: "https://github.com/Lethabo-Rabutla/Weather_ETL",
    },
    {
      id: 4,
      title: "JobMatchUp  (School Project)",
      category: "Web Development",
      description:
        "Helped developed a Java-based platform designed to bridge the gap between job seekers and employers. The focuses on matching the algorithms to connect candidates with relevant opportunities based on their skill sets and professional profiles.",
      tech: ["Java", "JavaScript", "Css", "PostgreSQL"],
      image: "/images/WebDev.jpg",
      githubUrl: "https://github.com/NkgopolengGift/JobMatchup",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 md:py-32 bg-black"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-red-500/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          {/* Label */}
          <div
            className={`flex items-center gap-4 mb-6 transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
          >
            <div className="h-px w-12 bg-red-500" />
            <span className="text-red-500 text-sm font-medium uppercase tracking-wider">
              Selected Work
            </span>
          </div>

          {/* Title */}
          <h2
            className={`text-4xl md:text-5xl font-serif font-bold text-white mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "200ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            Projects That
            <span className="text-gradient"> Define Me</span>
          </h2>

          {/* Description */}
          <p
            className={`text-gray-400 text-lg max-w-2xl transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "400ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            Showcase of my work in full-stack development and data engineering,
            leveraging cloud infrastructure to solve real-world problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div
                className={`relative overflow-hidden rounded-xl bg-gray-900 border border-white/10 transition-all duration-500 ${
                  hoveredProject === project.id
                    ? "border-red-500/30 shadow-2xl shadow-red-500/10"
                    : ""
                }`}
                style={{
                  transform:
                    hoveredProject === project.id
                      ? "translateY(-8px)"
                      : "translateY(0)",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                      hoveredProject === project.id
                        ? "opacity-90"
                        : "opacity-60"
                    }`}
                  />

                  {/* Hover Content */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
                      hoveredProject === project.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
                  >
                    <p
                      className={`text-gray-300 text-sm mb-2 transition-all duration-500 ${
                        expandedProject === project.id
                          ? "max-h-40"
                          : "max-h-12 overflow-hidden"
                      }`}
                    >
                      {project.description}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedProject(
                          expandedProject === project.id ? null : project.id,
                        )
                      }
                      className="text-red-400 text-xs hover:underline"
                    >
                      {expandedProject === project.id
                        ? "Read less"
                        : "Read more"}
                    </button>
                    <div className="flex gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white hover:bg-red-600 transition-colors duration-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.restricted ? (
                        <div className="px-4 py-2 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                          Code not publicly available
                        </div>
                      ) : (
                        project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white hover:bg-white/20 transition-colors duration-300"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-red-500 text-xs font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-2 mb-3 group-hover:text-red-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs text-gray-400 bg-white/5 rounded-full border border-white/10 hover:border-red-500/30 hover:text-white transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        {/* <div
          className={`mt-12 text-center transition-all duration-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "1000ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40">
            <span>View All Projects</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Projects;
