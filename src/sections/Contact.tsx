import { useEffect, useRef, useState } from "react";
import {
  Send,
  MapPin,
  CheckCircle,
  Loader2,
  Github,
  Linkedin,
  Briefcase,
} from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const response = await fetch("https://formspree.io/f/xeelyrrv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message.");
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, url: "https://github.com/Lethabo-Rabutla" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/lethabo-rabutla-74b527288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-red-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-red-500/5 to-transparent" />
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
              Get In Touch
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
            Let&apos;s Work
            <span className="text-gradient"> Together</span>
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
            I’m actively seeking opportunities where I can grow and contribute.
            If you think I’d be a great fit for your team, I’d love to connect.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div
            className={`lg:col-span-2 space-y-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{
              transitionDelay: "500ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-gray-400 text-sm">
                      Johannesburg, South Africa
                      <br />
                      Open to remote / relocation
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Open to:</h4>
                    <p className="text-gray-400 text-sm">
                      Full-time opportunities
                      <br />
                      Internships / Graduate roles
                      <br />
                      Contract roles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-medium mb-4">Connect With Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: `${800 + index * 100}ms`,
                      transitionTimingFunction: "var(--ease-expo-out)",
                    }}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">
                <strong>Note:</strong> I typically respond within 24 hours.
                Thank you for your interest. I look forward to connecting!
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
            style={{
              transitionDelay: "600ms",
              transitionTimingFunction: "var(--ease-expo-out)",
            }}
          >
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
              {isSubmitted ? (
                /* Success Message */
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. I&apos;ll get back to you within
                    24 hours.
                  </p>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === "name"
                            ? "text-red-500"
                            : "text-gray-300"
                        }`}
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        placeholder="Your name"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                          focusedField === "email"
                            ? "text-red-500"
                            : "text-gray-300"
                        }`}
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        focusedField === "subject"
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      placeholder="Role / Opportunity"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        focusedField === "message"
                          ? "text-red-500"
                          : "text-gray-300"
                      }`}
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 resize-none"
                      placeholder="Tell me about the position or opportunity…"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-red-600 rounded-lg text-white font-medium transition-all duration-300 hover:bg-red-700 hover:glow-red disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Privacy Note */}
                  <p className="text-center text-xs text-gray-500">
                    Your information is secure and will never be shared with
                    third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
