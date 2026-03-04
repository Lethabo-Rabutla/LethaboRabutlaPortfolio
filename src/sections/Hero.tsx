import { useState, useEffect, useRef } from "react";
import { ArrowDown, Download, Mail } from "lucide-react";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Subtle mouse parallax effect (CSS custom properties)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/documents/RabutlaL_CV.pdf";
    link.download = "RabutlaL_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Generate floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(255, 0, 0, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(255, 0, 0, 0.1) 0%, transparent 40%)",
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute inset-0 animate-gradient"
          style={{
            background:
              "linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #111111 50%, #0a0a0a 75%, #000000 100%)",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-red-500/40"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Greeting */}
        <p
          className={`text-gray-400 text-lg md:text-xl mb-4 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "500ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          Hello, I&apos;m
        </p>

        {/* Name */}
        <h1 className="mb-6">
          {"Lethabo Rabutla".split("").map((char, index) => (
            <span
              key={index}
              className={`inline-block text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white transition-all duration-600 ${
                visible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-8 rotate-x-90"
              }`}
              style={{
                transitionDelay: `${800 + index * 80}ms`,
                transitionTimingFunction: "var(--ease-expo-out)",
                transform: visible
                  ? `translateY(${mousePosition.y * 0.1 * (index % 2 === 0 ? 1 : -1)}px)`
                  : undefined,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Title */}
        <h2
          className={`text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-light transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "1400ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          Software & Data Engineer
        </h2>

        {/* Description */}
        <p
          className={`text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-600 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "1600ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          I am a Computer Science graduate specializing in building scalable
          software and robust data achitectures. With hands-on experience in
          developing ETL pipelines and deploying cloud-based solution on GCP, I
          focus on transforming complex data into actionable and efficient
          applications.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "1800ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-8 py-4 bg-red-600 rounded-full text-white font-medium transition-all duration-300 hover:bg-red-700 hover:glow-red"
          >
            <span>View My Work</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </button>
          <button
            onClick={scrollToContact}
            className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-full text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40"
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </button>
        </div>

        {/* Quick Download CV */}
        <div
          className={`mt-8 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "2000ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors duration-300"
          >
            <Download className="w-4 h-4" />
            <span className="link-underline">Download CV</span>
          </button>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
