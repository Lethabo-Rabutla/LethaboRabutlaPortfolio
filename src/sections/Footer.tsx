import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, ArrowUp, Heart } from "lucide-react";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Documents", href: "#documents" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/Lethabo-Rabutla" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/lethabo-rabutla-74b527288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 bg-black border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="inline-block text-3xl font-serif font-bold text-white mb-4 hover:text-red-500 transition-colors duration-300"
            >
              LT
            </a>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Creating digital experiences that matter. Passionate about design,
              development, and the intersection of art and technology.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                  style={{
                    transitionDelay: `${200 + index * 100}ms`,
                    transitionTimingFunction: "var(--ease-elastic)",
                  }}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "200ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li
                  key={link.name}
                  className={`transition-all duration-500 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{
                    transitionDelay: `${300 + index * 80}ms`,
                    transitionTimingFunction: "var(--ease-expo-out)",
                  }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <span className="w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-2" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{
              transitionDelay: "400ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            <h4 className="text-white font-medium mb-4">Get In Touch</h4>
            <div className="space-y-3 text-gray-400">
              <p className="text-sm">
                <span className="text-gray-500">Location:</span>
                <br />
                Gauteng, SouthAfrica
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Open to:</span>
                <br />
                Internships, Graduate, full-time, contract roles
              </p>
              <button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors duration-300 mt-2"
              >
                <span>Send a message</span>
                <ArrowUp className="w-4 h-4 rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "600ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <p className="text-gray-500 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} Lethabo Edward Rabutla. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            All rights reserved.
          </p>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300"
          >
            <span className="text-sm">Back to top</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
