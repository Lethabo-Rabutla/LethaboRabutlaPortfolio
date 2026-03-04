import { useEffect, useRef, useState } from "react";
import {
  Download,
  FileText,
  FileCode,
  FileImage,
  FileArchive,
  ExternalLink,
  Check,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  description: string;
  filename: string;
  size: string;
  type: "pdf" | "doc" | "image" | "archive" | "code";
  category: string;
}

const Documents = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<string[]>([]);

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

  const documents: Document[] = [
    {
      id: "cv",
      name: "Curriculum Vitae",
      description: "My complete professional resume and work history",
      filename: "RabutlaL_CV.pdf",
      size: "45.5 KB",
      type: "pdf",
      category: "Resume",
    },
    {
      id: "certifications",
      name: "Certifications",
      description: "Professional certifications and course completions",
      filename: "My_Certificates.pdf",
      size: "2 MB",
      type: "pdf",
      category: "Certificates",
    },
    {
      id: "recommendations",
      name: "Recommendation Letters",
      description: "Letters of recommendation from previous employers",
      filename: "Letter_of_Recommendation.pdf",
      size: "155 KB",
      type: "pdf",
      category: "References",
    },
    {
      id: "qualification",
      name: "My Qualification",
      description:
        "Qualification document from Tshwane University of Technology",
      filename: "Diploma_Computer_Sciences.pdf",
      size: "298.6 kb",
      type: "pdf",
      category: "Qualification",
    },
  ];

  const getFileIcon = (type: Document["type"]) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "doc":
        return FileText;
      case "image":
        return FileImage;
      case "archive":
        return FileArchive;
      case "code":
        return FileCode;
      default:
        return FileText;
    }
  };

  const handleDownload = async (doc: Document) => {
    setDownloading(doc.id);

    // Simulate download delay for UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create download link
    const link = document.createElement("a");
    link.href = `/documents/${doc.filename}`;
    link.download = doc.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloading(null);
    setDownloaded((prev) => [...prev, doc.id]);

    // Reset downloaded state after 3 seconds
    setTimeout(() => {
      setDownloaded((prev) => prev.filter((id) => id !== doc.id));
    }, 3000);
  };

  const handleDownloadAll = async () => {
    // Download all documents sequentially
    for (const doc of documents) {
      await handleDownload(doc);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  return (
    <section
      ref={sectionRef}
      id="documents"
      className="relative py-24 md:py-32 bg-black"
    >
      {/* Background Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              Documents
            </span>
          </div>

          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
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
                Download My
                <span className="text-gradient"> Documents</span>
              </h2>
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
                Access my resume, certifications, and other professional
                documents. All files are available for immediate download.
              </p>
            </div>

            {/* Download All Button */}
            <button
              onClick={handleDownloadAll}
              className={`flex items-center gap-3 px-6 py-3 bg-red-600 rounded-full text-white font-medium transition-all duration-300 hover:bg-red-700 hover:glow-red whitespace-nowrap ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: "500ms",
                transitionTimingFunction: "var(--ease-expo-out)",
              }}
            >
              <Download className="w-5 h-5" />
              <span>Download All</span>
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc, index) => {
            const Icon = getFileIcon(doc.type);
            const isDownloading = downloading === doc.id;
            const isDownloaded = downloaded.includes(doc.id);

            return (
              <div
                key={doc.id}
                className={`group relative p-6 rounded-xl bg-white/[0.02] border border-white/10 transition-all duration-700 hover:border-red-500/30 hover:bg-white/[0.04] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: `${600 + index * 100}ms`,
                  transitionTimingFunction: "var(--ease-expo-out)",
                }}
              >
                {/* Category Badge */}
                <span className="absolute top-4 right-4 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                  {doc.category}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {doc.description}
                </p>

                {/* File Info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">{doc.filename}</span>
                  <span className="text-xs text-gray-500">{doc.size}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={isDownloading}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isDownloaded
                      ? "bg-green-500/20 text-green-500 border border-green-500/30"
                      : "bg-white/5 text-white border border-white/10 hover:bg-red-600 hover:border-red-600"
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : isDownloaded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div
          className={`mt-12 p-6 rounded-xl bg-white/[0.02] border border-white/10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: "1200ms",
            transitionTimingFunction: "var(--ease-expo-out)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-white font-medium mb-1">
                Need something specific?
              </h4>
              <p className="text-sm text-gray-400">
                If you need additional documents or have specific requirements,
                feel free to reach out.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40 whitespace-nowrap"
            >
              <span>Contact Me</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documents;
