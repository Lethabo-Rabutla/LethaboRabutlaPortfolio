import { useEffect, useRef, useState } from 'react';
import { Download, Users, Briefcase, Calendar, Zap } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = "/documents/RabutlaL_CV.pdf";
    link.download = "RabutlaL_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stats = [
    { icon: Calendar, value: '12+', label: 'Months Experience' },
    { icon: Briefcase, value: '4+', label: 'Projects Completed' },
    { icon: Users, value: '4+', label: 'Certifications' },
    { icon: Zap, value: '40%', label: 'Optimization' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Decorative Frame */}
              <div
                className="absolute -inset-4 border border-red-500/30 rounded-lg transition-all duration-600"
                style={{
                  transform: isVisible
                    ? "rotate(-2deg)"
                    : "rotate(-6deg) scale(0.95)",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              />
              <div
                className="absolute -inset-8 border border-white/10 rounded-lg transition-all duration-600 delay-100"
                style={{
                  transform: isVisible
                    ? "rotate(2deg)"
                    : "rotate(6deg) scale(0.95)",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              />

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 to-black">
                <img
                  src="/images/portrait.jpeg"
                  alt="John Doe"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: "3/4" }}
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div
                className={`absolute -bottom-6 -right-6 bg-red-600 text-white px-6 py-4 rounded-lg shadow-xl transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: "600ms",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                <p className="text-3xl font-bold font-serif">12+</p>
                <p className="text-sm text-white/80">Months Exp.</p>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div>
            {/* Section Label */}
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-600 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: "300ms",
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
            >
              <div className="h-px w-12 bg-red-500" />
              <span className="text-red-500 text-sm font-medium uppercase tracking-wider">
                About Me
              </span>
            </div>

            {/* Title */}
            <h2
              className={`text-4xl md:text-5xl font-serif font-bold text-white mb-8 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "400ms",
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
            >
              The Story Behind
              <br />
              <span className="text-gradient">The Work</span>
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-4 mb-10">
              <p
                className={`text-gray-400 leading-relaxed transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: "700ms",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                My journey in technology began at the Tshwane University of
                Technology, where I developed a deep interest in how data and
                software intersect to solve real-world problems. This curiosity
                led to my final-year project—a Face Recognition ATM system—which
                combined complex security logic with seamless user interaction
              </p>
              <p
                className={`text-gray-400 leading-relaxed transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: "800ms",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                Currently, I focus on building scalable ETL pipelines, secure
                Node.js APIs, and React Native applications. My approach bridges
                the gap between raw data and functional software. Whether I am
                optimizing SQL queries to reduce response times by 40% or
                deploying cloud-based solutions, I prioritize performance and
                reliability.
              </p>
              <p
                className={`text-gray-400 leading-relaxed transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: "900ms",
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                When I'm not engineering new features, I’m expanding my
                expertise in the cloud. As a certified AWS Cloud Practitioner, I
                am constantly exploring the potential of Generative AI and data
                engineering to automate tasks and create more intelligent
                digital experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center p-4 rounded-lg bg-white/5 border border-white/10 transition-all duration-600 hover:bg-white/10 hover:border-red-500/30 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${1000 + index * 100}ms`,
                    transitionTimingFunction: "var(--ease-expo-out)",
                  }}
                >
                  <stat.icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold font-serif text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleDownloadResume}
              className={`flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:glow-red-sm ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{
                transitionDelay: "1500ms",
                transitionTimingFunction: "var(--ease-elastic)",
              }}
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
