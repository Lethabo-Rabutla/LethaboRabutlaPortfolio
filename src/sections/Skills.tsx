import { useEffect, useRef, useState } from "react";
import {
  Code2,
  Zap,
  Database,
  Smartphone,
  Coffee,
  Terminal,
  Server,
  Atom,
  Webhook,
  RefreshCw,
  Cloud,
  Cpu,
  BrainCircuit,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages & Core development",
      skills: [
        { name: "Java", level: 90, icon: Coffee },
        { name: "Python", level: 85, icon: Terminal },
        { name: "Javascript / C#", level: 80, icon: Code2 },
        { name: "Node.js", level: 88, icon: Server },
      ],
    },
    {
      title: "Frameworks & Mobile",
      skills: [
        { name: "React Native / React", level: 75, icon: Atom },
        { name: "REST APIs", level: 95, icon: Webhook },
        { name: "Mobile Development", level: 80, icon: Smartphone },
      ],
    },
    {
      title: "Data Engineering & Databases",
      skills: [
        { name: "ETL Pipelines", level: 60, icon: RefreshCw },
        { name: "SQL(PostgreSQL/MySQL)", level: 80, icon: Database },
        { name: "Data Transformation", level: 68, icon: Zap },
      ],
    },
    {
      title: "Cloud & Specialization Tech",
      skills: [
        { name: "AWS(Certified Cloud Practioner)", level: 70, icon: Cloud },
        { name: "Generative AI", level: 65, icon: Cpu },
        { name: "Machine Learning Basics", level: 67, icon: BrainCircuit },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Label */}
          <div
            className={`flex items-center justify-center gap-4 mb-6 transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
          >
            <div className="h-px w-12 bg-red-500" />
            <span className="text-red-500 text-sm font-medium uppercase tracking-wider">
              Expertise
            </span>
            <div className="h-px w-12 bg-red-500" />
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
            Skills &<span className="text-gradient"> Technologies</span>
          </h2>

          {/* Description */}
          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: "400ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            Tools and technologies I use to bring ideas to life, from concept to
            deployment.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`p-8 rounded-2xl bg-white/[0.02] border border-white/10 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: `${500 + categoryIndex * 150}ms`,
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
            >
              {/* Category Title */}
              <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                </span>
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <skill.icon
                          className={`w-4 h-4 transition-colors duration-300 ${
                            hoveredSkill === skill.name
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            hoveredSkill === skill.name
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm transition-all duration-300 ${
                          hoveredSkill === skill.name
                            ? "text-red-500 scale-110"
                            : "text-gray-500"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000 relative"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${
                            700 + categoryIndex * 150 + skillIndex * 100
                          }ms`,
                          transitionTimingFunction: "var(--ease-expo-out)",
                        }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div
          className={`mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "1200ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <p className="text-center text-gray-500 text-sm mb-4">
            Also experienced with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Redis",
              "Next.js",
              "WordPress",
              "Linux",
              "Vite",
              "Git",
              "CI/CD",
            ].map((skill, index) => (
              <span
                key={skill}
                className="px-4 py-2 text-sm text-gray-400 bg-white/5 rounded-full border border-white/10 hover:border-red-500/30 hover:text-white hover:bg-white/10 transition-all duration-300"
                style={{
                  animationDelay: `${1300 + index * 50}ms`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
