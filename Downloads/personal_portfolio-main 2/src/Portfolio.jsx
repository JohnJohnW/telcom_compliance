import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Rocket, Sparkles, ChevronRight, Folder, Cpu, Wand2, Phone, PlaySquare, Youtube } from "lucide-react";

/* Personal portfolio — GH Pages + Web3Forms */

const DATA = {
  name: "John Wynter",
  role: "Law | IT",
  blurb: "",
  location: "Brisbane | Qld | Aus",
  avatar: "/personal_portfolio/headshot.png",
  socials: [
    { icon: Github, label: "GitHub", href: "https://github.com/JohnJohnW" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/john-wynter/" },
    { icon: Mail, label: "Email", href: "mailto:johnwynter55893@outlook.com" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@john_wynter" },
  ],
  projects: [
    {
      title: "Evidencia",
      tag: "2025",
      desc: "Desktop eDiscovery software for managing litigation claims and their related documents. Features automatic date extraction from PDF, DOCX, EML, and MSG files, email chain separation with attachment processing, relationship tracking between documents and claims, and native file preservation with metadata intact.",
      links: [],
      stack: ["Python", "SQLite", "eDiscovery", "LegalTech"],
    },
    {
      title: "PawOrNaw",
      tag: "2025",
      desc: "Tanda GenAI Hackathon project: Tinder-style dog matching app for breeding. Features swipe-based matching, real-time chat, and AI-powered profile creation to help dog owners find compatible breeding partners.",
      links: [
        { href: "https://paw-or-naw.vercel.app", label: "Live" },
        { href: "https://github.com/mrjwei/paw-or-naw", label: "Repo" },
      ],
      stack: ["Next.js", "TypeScript", "ElevenLabs Agents", "ByteDance Seedream 4"],
    },
    {
      title: "LegalEase",
      tag: "2025",
      desc: "GovHack prototype (Brisbane, QLD): Legal-tech/GovTech tool that simplifies navigating regulations with citation provenance and layered jurisdictions to keep context and source traceability front-and-centre.",
      links: [
        { href: "https://johnjohnw.github.io/LegalEase/", label: "Live" },
        { href: "https://github.com/JohnJohnW/LegalEase", label: "Repo" },
        { href: "https://hackerspace.govhack.org/projects/legalease_3023", label: "GovHack" },
      ],
      stack: ["React", "GovTech", "LegalTech", "Citations", "Jurisdiction Layering"],
    },
    {
      title: "The Sixth Man",
      tag: "2025",
      desc: "TAK Hack 2025 project: ATAK plugin using Raspberry Pi with camera and 3D printed casing for helmet/firearm attachment. Captures snapshots every 5 seconds, processes with local AI to identify people, hazards, and automatically places markers on ATAK map with HQ notifications.",
      links: [],
      stack: ["Python", "Raspberry Pi", "Computer Vision", "AI", "3D Printing", "ATAK", "Military Tech"],
    },
    {
      title: "ecoSure",
      tag: "2025",
      desc: "Solo hackathon project for University of Queensland Sustainable Innovators Hackathon 2025: AI-powered environmental compliance tool for biodiversity and conservation projects. Cross-references project details against Queensland legislation and TERN datasets using RAG to flag compliance risks and biodiversity concerns.",
      links: [
        { href: "https://lnkd.in/g2yZh_Xv", label: "Demo" },
        { href: "https://lnkd.in/gzXZ6GGr", label: "Repo" },
        { href: "https://lnkd.in/gTkHcPJZ", label: "Video" },
      ],
      stack: ["AI", "RAG", "Python", "Environmental Law", "Compliance"],
    },
    {
      title: "Cache to the Future",
      tag: "2025",
      desc: "Team solution for QUT Code Network Winter Hackathon 2025: a digital time capsule that encrypts messages and provides time-based decryption keys, plus an on-site decryption tool for downloaded files.",
      links: [
        { href: "https://github.com/mrjwei/cache-to-the-future", label: "Repo" },
      ],
      stack: ["React"],
    },
    {
      title: "Federal Court Judgement Analysis",
      tag: "2025",
      desc: "Automated daily workflows involving analysis of the Federal Court judgements RSS feed using n8n and AI-agent integrations.",
      links: [],
      stack: ["n8n", "AI agents"],
    },
    {
      title: "QITC Contract Automation",
      tag: "2025",
      desc: "Automated the document generation process for QITC comprehensive contracts using VBA and Doxsera templates.",
      links: [],
      stack: ["VBA", "Word / Doxsera"],
    },
    {
      title: "MIT WIL Project Leadership (QUT)",
      tag: "2024",
      desc: "Organised and managed a WIL project for Masters IT students (Dundas Lawyers × QUT) involving an automated ERD program for forensic legal investigations using Python.",
      links: [],
      stack: [],
    },
    {
      title: "Forensic Investigation Automation",
      tag: "2024",
      desc: "Developed a Python program to track availability/activity statuses of businesses during forensic legal investigations to inform legitimacy insights.",
      links: [],
      stack: ["Python"],
    },
    {
      title: "Telcom Compliance",
      tag: "2025",
      desc: "Static microsite with telecom compliance references. Lightweight demo resource and quick lookup tool.",
      links: [
        { href: "https://johnjohnw.github.io/telcom_compliance/", label: "Live" },
        { href: "https://github.com/JohnJohnW/telcom_compliance", label: "Repo" },
      ],
      stack: ["React"],
    },
    {
      title: "Contract Clause Library",
      tag: "2025",
      desc: "Responsive online library of reusable contract clauses for quick reference and drafting by legal teams.",
      links: [
        { href: "https://johnjohnw.github.io/contract_clause_library/", label: "Live" },
        { href: "https://github.com/JohnJohnW/contract_clause_library", label: "Repo" },
      ],
      stack: ["React"],
    },
  ].sort((a, b) => {
    // Sort by year (descending - newest first)
    const yearA = parseInt(a.tag);
    const yearB = parseInt(b.tag);
    return yearB - yearA;
  }),
};

// Cross-bundler base path (works with Vite, CRA, GH Pages)
const BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL)
    ? import.meta.env.BASE_URL
    : (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/' : '/');

// Helper: convert channelId UC... -> uploads playlist UU...
const uploadsPlaylist = (channelId) =>
  channelId && channelId.startsWith("UC") ? `UU${channelId.slice(2)}` : "";

function useTheme() {
  // Force dark theme always
  useEffect(() => {
    const root = document.documentElement;
    // Remove any existing theme classes
    root.classList.remove("light");
    root.classList.remove("auto");
    // Force dark theme
    root.classList.add("dark");
    
    // Also set data attribute to ensure dark mode
    root.setAttribute("data-theme", "dark");
    
    // Prevent any theme switching
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const classes = root.classList;
          if (classes.contains('light') || !classes.contains('dark')) {
            root.classList.remove('light');
            root.classList.add('dark');
          }
        }
      });
    });
    
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    
    return () => {
      observer.disconnect();
      root.classList.remove("dark");
    };
  }, []);
  
  return { dark: true };
}

function cn(...xs) { return xs.filter(Boolean).join(" "); }

function Spotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const move = (e) => {
      const x = e.clientX; const y = e.clientY;
      root.style.setProperty("--spot-x", x + "px");
      root.style.setProperty("--spot-y", y + "px");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{ background:
    "radial-gradient(600px at var(--spot-x, 50%) var(--spot-y, 50%), rgba(99,102,241,0.25), transparent 60%)"}}/>;
}

function LiquidBlobs() {
  return (
    <div className="fixed -z-10 inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-16 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-fuchsia-500/40 via-indigo-500/30 to-blue-500/30 blur-3xl opacity-70 mix-blend-screen animate-pulse" />
      <div className="absolute -bottom-24 -right-16 h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-cyan-400/30 via-sky-500/30 to-indigo-600/30 blur-3xl opacity-70 mix-blend-screen animate-pulse" />
    </div>
  );
}

function Dock({ items }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl px-3 py-2 flex gap-2">
        {items.map((it, i) => (
          <button key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} onClick={it.onClick}
            className="relative grid place-items-center aspect-square h-11 rounded-xl transition-all"
            style={{ transform: hovered === i ? "scale(1.15)" : "scale(1)" }} aria-label={it.label} title={it.label}>
            <it.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Tilt({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px); y.set(py);
    };
    const onLeave = () => { x.set(0.5); y.set(0.5); };
    onLeave();
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); };
  }, [x, y]);
  return <motion.div ref={ref} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>{children}</motion.div>;
}

function Section({ id, title, icon: Icon, children, subtitle, className = "" }) {
  return (
    <section id={id} className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${className}`}>
      <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
        className="flex items-center gap-3 text-2xl sm:text-3xl font-semibold tracking-tight">
        {Icon && <Icon className="h-6 w-6" />} {title}
      </motion.h2>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }}
          className="mt-2 text-sm/6 text-neutral-300">{subtitle}</motion.p>
      )}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function Portfolio() {
  useTheme();
  const [active, setActive] = useState("home");
  const [toast, setToast] = useState(null);

  const scrollTo = (id) => () => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  // Web3Forms submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      const payload = new URLSearchParams();
      payload.append("access_key", "e3f86196-c795-4d77-b6a4-b03183583b4d");
      payload.append("name", fd.get("name") || "");
      payload.append("email", fd.get("email") || "");
      payload.append("message", fd.get("message") || "");
      payload.append("budget", fd.get("budget") || "Undecided");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString()
      });
      if (!res.ok) throw new Error("web3forms failed");
      setToast("Thanks! I’ll reply soon.");
    } catch (err) {
      setToast("Couldn’t send right now—try email?");
    } finally {
      setTimeout(() => setToast(null), 2600);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(59,130,246,.2),transparent),radial-gradient(1200px_800px_at_80%_110%,rgba(236,72,153,.15),transparent)] text-neutral-100 selection:bg-indigo-500/30">
      <LiquidBlobs />
      <Spotlight />

      <header className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
        <div className="backdrop-blur-xl bg-black/20 border border-white/10 shadow-lg rounded-2xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <img src={`${BASE}apple-touch-icon.png`} alt="Site icon" className="h-8 w-8 rounded-xl object-cover" />
              <span className="font-semibold tracking-tight">{DATA.name}</span>
            </div>
            <nav className="hidden sm:flex items-center gap-1">
              {[
                { id: "home", label: "Home" },
                { id: "projects", label: "Projects" },
                { id: "videos", label: "Videos" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
              ].map((t) => (
                <button key={t.id} onClick={scrollTo(t.id)}
                  className={cn("px-3 py-2 rounded-xl text-sm hover:bg-white/10 transition",
                    active === t.id && "bg-white/10")}
                >
                  {t.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href="#contact" onClick={scrollTo("contact")} className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition">
                <Sparkles className="h-4 w-4" /> Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="md:order-1">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              {DATA.name}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-sky-400">{DATA.role}</span>
            </motion.h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" onClick={scrollTo("projects")} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl hover:bg-white/10 transition">
                <Rocket className="h-4 w-4" /> Explore projects
              </a>
              <a href="#contact" onClick={scrollTo("contact")} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-sky-500 px-4 py-2 text-white shadow-lg hover:opacity-90 transition">
                <Mail className="h-4 w-4" /> Contact
              </a>
            </div>
          </div>
          <div className="relative md:order-2">
            <Tilt>
              <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
                className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl p-6 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-sky-500">
                    <img src={DATA.avatar} alt="John Wynter headshot" className="h-full w-full object-cover"
                      onError={(e)=>{ e.currentTarget.style.display='none'; }} />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-400">Hi, I’m</p>
                    <p className="text-xl font-semibold">{DATA.name}</p>
                  </div>
                </div>

                {/* Location row */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div className="text-sm text-neutral-400">{DATA.location}</div>
                  <a href="#contact" onClick={scrollTo("contact")} className="inline-flex items-center gap-2 text-sm">
                    Get in touch <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </Tilt>
          </div>
        </div>
      </section>

      <Section id="projects" title="Projects" icon={Folder} className="!pt-4 !pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA.projects.map((p, i) => (
            <motion.article key={p.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.03 }}
              className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-white/20 hover:shadow-xl transition">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="text-xs text-neutral-400">{p.tag}</span>
              </div>
              <p className="mt-2 text-sm/6 text-neutral-200/90">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs rounded-lg border border-white/10 bg-white/5 px-2 py-1">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {p.links.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-1 hover:underline">
                    {l.label} <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition" style={{ background: "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,.25), rgba(236,72,153,.25), rgba(14,165,233,.25), rgba(99,102,241,.25))" }} />
            </motion.article>
          ))}
        </div>
      </Section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-sky-500/20 backdrop-blur-xl p-6">
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
               style={{ background: "url('data:image/svg+xml;utf8, %3Csvg width=\\\"60\\\" height=\\\"60\\\" viewBox=\\\"0 0 60 60\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"%3E%3Cg fill=\\\"none\\\" stroke=\\\"white\\\" stroke-opacity=\\\"0.06\\\"%3E%3Cpath d=\\\"M0 30h60M30 0v60\\\"/%3E%3C/g%3E%3C/svg%3E')"}} />
          <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold">Let's build something great.</h3>
            </div>
            <div className="flex md:justify-end gap-3">
              <a href="#contact" onClick={scrollTo("contact")} className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-neutral-900 px-4 py-2 hover:bg-white">
                <Wand2 className="h-4 w-4"/> Contact me
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <Section id="videos" title="Videos" icon={PlaySquare} className="!pt-4">
        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed?listType=playlist&list=${uploadsPlaylist("UCPjlP0gPZNv9C1R3koFaePw")}`}
              title="YouTube playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <a href="https://www.youtube.com/@john_wynter" target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl hover:bg-white/10">
            <Youtube className="h-4 w-4"/> View channel <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </Section>

      <Section id="experience" title="Experience" icon={Cpu} className="!pt-4">
        <div className="relative pl-8 overflow-visible">
          {/* Gradient timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-[6.75px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/80 via-fuchsia-500/50 to-sky-500/20" 
          />
          <ul className="space-y-4">
            {/* Active roles */}
            {[
              { role: "Software Engineer Intern", org: "Tanda", when: "Dec 2025 — Present", active: true },
              { role: "General Executive", org: "QUT Cyber Security Club", when: "Oct 2025 — Present", active: true },
            ].map((item, i) => (
              <li key={i} className="relative pl-0 group">
                {/* Dot - always visible */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-[-31.5px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-sky-400 z-10 transition-transform duration-200" 
                />
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-white/[0.15]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-3xl pointer-events-none" />
                  <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white/95">{item.role}</p>
                      <p className="text-sm text-white/50">{item.org}</p>
                    </div>
                    <span className="text-xs font-medium text-indigo-300 bg-indigo-500/[0.15] px-3 py-1.5 rounded-full w-fit border border-indigo-400/20">{item.when}</span>
                  </div>
                </div>
              </li>
            ))}

            {/* Grouped roles - QUT Law, Innovation & Technology Society */}
            <li className="relative pl-0 group">
              {/* Dot - vertically centered */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                whileHover={{ scale: 1.2 }}
                className="absolute left-[-31.5px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-sky-400 z-10 transition-transform duration-200" 
              />
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-white/[0.15]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-3xl pointer-events-none" />
                <p className="relative font-semibold text-white/95 mb-4">QUT Law, Innovation & Technology Society</p>
                <div className="relative ml-2 pl-5 space-y-3">
                  {/* Inner timeline */}
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    style={{ originY: 0 }}
                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-gradient-to-b from-indigo-500/70 to-indigo-500/10 rounded-full" 
                  />
                  {/* Secretary - Active */}
                  <div className="relative group">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      whileHover={{ scale: 1.3 }}
                      className="absolute -left-[0.35rem] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 transition-transform duration-200" 
                    />
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="text-sm font-medium text-white/90">Secretary</p>
                        <span className="text-xs text-indigo-300 bg-indigo-500/[0.15] px-2.5 py-1 rounded-full w-fit border border-indigo-400/20">Oct 2025 — Present</span>
                      </div>
                    </div>
                  </div>
                  {/* Industry Coordinator - Past */}
                  <div className="relative group">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      whileHover={{ scale: 1.3 }}
                      className="absolute -left-[0.35rem] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-neutral-500 to-neutral-600 transition-transform duration-200" 
                    />
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <p className="text-sm font-medium text-white/50">Industry Coordinator</p>
                        <span className="text-xs text-white/40 bg-white/[0.06] px-2.5 py-1 rounded-full w-fit border border-white/10">Jul 2025 — Oct 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Active role - Administrative Assistant */}
            <li className="relative pl-0 group">
              {/* Dot */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{ scale: 1.2 }}
                className="absolute left-[-31.5px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-400 via-fuchsia-500 to-sky-400 z-10 transition-transform duration-200" 
              />
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-white/[0.15]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-3xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white/95">Administrative Assistant</p>
                    <p className="text-sm text-white/50">Dundas Lawyers</p>
                  </div>
                  <span className="text-xs font-medium text-indigo-300 bg-indigo-500/[0.15] px-3 py-1.5 rounded-full w-fit border border-indigo-400/20">Mar 2024 — Present</span>
                </div>
              </div>
            </li>

            {/* Past role - Marketing Officer */}
            <li className="relative pl-0 group">
              {/* Dot */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.2 }}
                className="absolute left-[-31.5px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-neutral-500 to-neutral-600 z-10 transition-transform duration-200" 
              />
              {/* Card */}
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-white/[0.01] backdrop-blur-xl p-5 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-white/[0.1]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent rounded-3xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="font-semibold text-white/70">Marketing Officer</p>
                    <p className="text-sm text-white/40">QUT AI & ML Society</p>
                  </div>
                  <span className="text-xs font-medium text-white/40 bg-white/[0.06] px-3 py-1.5 rounded-full w-fit border border-white/10">Aug 2025 — Oct 2025</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Section>

      <Section id="education" title="Education" icon={Wand2} className="!pt-4">
        <div className="relative pl-8 overflow-visible">
          {/* Gradient timeline line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ originY: 0 }}
            className="absolute left-[6.75px] top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-sky-500/80 via-indigo-500/50 to-fuchsia-500/20" 
          />
          <ul className="space-y-4">
            {[
              {
                degree: "Bachelor of Information Technology (Information Systems)",
                uni: "Queensland University of Technology",
                when: "Expected 2026",
              },
              {
                degree: "Bachelor of Laws (Honours)",
                uni: "Queensland University of Technology",
                when: "Expected 2028",
              },
            ].map((e, i) => (
              <li key={i} className="relative pl-0 group">
                {/* Dot - always visible, vertically centered */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  className="absolute left-[-31.5px] top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-400 z-10 transition-transform duration-200" 
                />
                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl p-5 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-white/[0.15]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent rounded-3xl pointer-events-none" />
                  <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <p className="font-semibold text-white/95">{e.degree}</p>
                      <p className="text-sm text-white/50 mt-1">{e.uni}</p>
                    </div>
                    <span className="text-xs font-medium text-sky-300 bg-sky-500/[0.15] px-3 py-1.5 rounded-full w-fit whitespace-nowrap border border-sky-400/20">{e.when}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="contact" title="Contact" icon={Phone} className="!pt-4">
        <motion.form initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <label className="text-sm font-medium">Name
                <input name="name" required className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </label>
            </div>
            
            <div className="grid gap-3">
              <label className="text-sm font-medium">Email
                <input name="email" type="email" required className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </label>
            </div>
            
            <div className="grid gap-3">
              <label className="text-sm font-medium">Message
                <textarea name="message" rows={6} className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="Your message..." />
              </label>
            </div>
            
            <div className="flex justify-end pt-2">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-sky-500 px-6 py-3 text-white shadow-lg hover:opacity-90 transition-all">
                <Rocket className="h-4 w-4"/> Send Message
              </button>
            </div>
          </div>
        </motion.form>
      </Section>

      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl px-4 py-2 shadow-xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-sm text-neutral-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</span>
          <div className="flex items-center gap-3">
            {DATA.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label={s.label}>
                <s.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <Dock items={[
        { icon: Sparkles, label: "Home", onClick: scrollTo("home") },
        { icon: Folder, label: "Projects", onClick: scrollTo("projects") },
        { icon: PlaySquare, label: "Videos", onClick: scrollTo("videos") },
        { icon: Cpu, label: "Experience", onClick: scrollTo("experience") },
        { icon: Wand2, label: "Education", onClick: scrollTo("education") },
        { icon: Phone, label: "Contact", onClick: scrollTo("contact") },
      ]} />
    </div>
  );
}
