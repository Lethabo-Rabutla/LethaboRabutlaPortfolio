import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";

interface NavigationProps {
  scrolled: boolean;
}

const Navigation = ({ scrolled }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrance animation
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Documents", href: "#documents" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleDownloadCV = () => {
    // Trigger CV download
    const link = document.createElement("a");
    link.href = "/documents/RabutlaL_CV.pdf";
    link.download = "RabutlaL_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass h-16 border-b border-white/10"
            : "bg-transparent h-20"
        }`}
        style={{
          transitionTimingFunction: "var(--ease-expo-out)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className={`font-serif text-2xl font-bold tracking-tight transition-all duration-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            } ${scrolled ? "scale-90" : "scale-100"}`}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
          >
            <span className="text-white">LT</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm text-gray-300 hover:text-white transition-all duration-300 link-underline py-1 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }`}
                style={{
                  transitionDelay: `${200 + index * 80}ms`,
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleDownloadCV}
            className={`hidden md:flex items-center gap-2 px-5 py-2.5 border border-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:glow-red-sm ${
              visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              transitionDelay: "500ms",
              transitionTimingFunction: "var(--ease-elastic)",
            }}
          >
            <Download className="w-4 h-4" />
            <span>Download CV</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/98 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-2xl font-serif text-white hover:text-red-500 transition-all duration-300 ${
                mobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: mobileMenuOpen ? `${index * 100}ms` : "0ms",
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={handleDownloadCV}
            className={`mt-4 flex items-center gap-2 px-6 py-3 bg-red-600 rounded-full text-white transition-all duration-300 ${
              mobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: mobileMenuOpen ? "500ms" : "0ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            <Download className="w-5 h-5" />
            <span>Download CV</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
