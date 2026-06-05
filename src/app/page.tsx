"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { resumeData } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ExternalLink,
  Github,
  Linkedin,
  ChevronDown,
  Trophy,
  Terminal,
  Layers,
  Cpu,
  Cloud,
  MessageSquare,
  Sparkles,
  Send,
  Activity,
  Shield,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={`py-16 md:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div variants={fadeUp} custom={0} className="mb-12 text-center">
      <div className="inline-flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-emerald-500" />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      <Separator className="mt-6 max-w-xs mx-auto bg-emerald-500/30" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-sm"
          : "bg-transparent"
        }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-lg font-bold tracking-tight hover:text-emerald-500 transition-colors"
        >
          <span className="text-emerald-500">{"<"}</span>
          JS
          <span className="text-emerald-500">{" />"}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              {l.label}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect
                y="3"
                width="20"
                height="2"
                rx="1"
                fill="currentColor"
                className="transition-transform origin-center"
                style={{
                  transform: mobileOpen
                    ? "rotate(45deg) translate(4px, 4px)"
                    : "none",
                }}
              />
              <rect
                y="9"
                width="20"
                height="2"
                rx="1"
                fill="currentColor"
                className="transition-opacity"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <rect
                y="15"
                width="20"
                height="2"
                rx="1"
                fill="currentColor"
                className="transition-transform origin-center"
                style={{
                  transform: mobileOpen
                    ? "rotate(-45deg) translate(4px, -4px)"
                    : "none",
                }}
              />
            </svg>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm rounded-md hover:bg-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const fullTitle = resumeData.title;
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [heroCopied, setHeroCopied] = useState(false);

  const handleHeroCopy = useCallback(() => {
    navigator.clipboard.writeText(resumeData.email).then(() => {
      setHeroCopied(true);
      setTimeout(() => setHeroCopied(false), 2000);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullTitle.slice(0, i + 1));
      i++;
      if (i >= fullTitle.length) clearInterval(interval);
    }, 45);
    return () => clearInterval(interval);
  }, [started]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Badge
            variant="secondary"
            className="px-4 py-1.5 text-sm font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Available for Opportunities
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            {resumeData.name.split(" ").slice(0, 2).join(" ")}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <p className="text-xl md:text-2xl text-muted-foreground font-mono">
            {typed}
            <span className="inline-block w-0.5 h-6 bg-emerald-500 ml-0.5 animate-pulse" />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {resumeData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
            asChild
          >
            <a href="#contact">
              <Send className="mr-2 h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          <Button size="lg" variant="outline" className="px-8" asChild>
            <a href="#projects">
              View Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-border hover:border-emerald-500/50 hover:bg-accent transition-all"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-border hover:border-emerald-500/50 hover:bg-accent transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <button
            onClick={handleHeroCopy}
            className="relative p-2.5 rounded-full border border-border hover:border-emerald-500/50 hover:bg-accent transition-all"
            aria-label="Copy Email"
            title={heroCopied ? "Copied!" : "Copy email"}
          >
            {heroCopied ? <Check className="h-5 w-5 text-emerald-500" /> : <Mail className="h-5 w-5" />}
            {heroCopied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
function AboutSection() {
  return (
    <SectionWrapper id="about" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Brain}
          title="About Me"
          subtitle="A glimpse into my professional journey and passion for AI"
        />
        <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                {resumeData.summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 border-emerald-500/30"
                >
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  {resumeData.location}
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 border-emerald-500/30"
                >
                  <Mail className="h-3.5 w-3.5 mr-1.5" />
                  {resumeData.email}
                </Badge>
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 border-emerald-500/30"
                >
                  <Phone className="h-3.5 w-3.5 mr-1.5" />
                  {resumeData.phone}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience                                                         */
/* ------------------------------------------------------------------ */
function ExperienceSection() {
  return (
    <SectionWrapper id="experience" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Briefcase}
          title="Experience"
          subtitle="My professional journey building AI systems and ML solutions"
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

          <div className="space-y-8">
            {resumeData.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                custom={idx + 1}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-background" />

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors group">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <CardTitle className="text-lg group-hover:text-emerald-500 transition-colors">
                        {exp.role}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="w-fit text-xs font-normal"
                      >
                        {exp.period}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <span className="font-medium text-foreground/80">
                        {exp.company}
                      </span>
                      <span className="text-muted-foreground">
                        &bull; {exp.type}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500/60 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
function ProjectsSection() {
  return (
    <SectionWrapper id="projects" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Code2}
          title="Projects"
          subtitle="Showcase of my work in AI, machine learning, and computer vision"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.projects.map((proj, idx) => (
            <motion.div key={idx} variants={fadeUp} custom={idx + 1}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all group flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                      {proj.icon === "hand" && (
                        <Sparkles className="h-5 w-5" />
                      )}
                      {proj.icon === "layout" && (
                        <Layers className="h-5 w-5" />
                      )}
                      {proj.icon === "leaf" && (
                        <Cpu className="h-5 w-5" />
                      )}
                      {proj.icon === "activity" && (
                        <Activity className="h-5 w-5" />
                      )}
                      {proj.icon === "shield" && (
                        <Shield className="h-5 w-5" />
                      )}
                    </div>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-emerald-500 transition-colors"
                      aria-label={`View ${proj.title} on GitHub`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardTitle className="text-lg mt-3 group-hover:text-emerald-500 transition-colors">
                    {proj.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */
function SkillsSection() {
  const skillGroups = [
    {
      title: "Programming & Databases",
      icon: Terminal,
      items: resumeData.skills.programming,
    },
    {
      title: "AI / Machine Learning",
      icon: Brain,
      items: resumeData.skills.aiMl,
    },
    {
      title: "Data Engineering & Analytics",
      icon: Layers,
      items: resumeData.skills.dataEngineering,
    },
    {
      title: "Backend & DevOps",
      icon: Code2,
      items: resumeData.skills.backendDevops,
    },
    {
      title: "Cloud Platforms",
      icon: Cloud,
      items: resumeData.skills.cloud,
    },
    {
      title: "Soft Skills",
      icon: MessageSquare,
      items: [
        ...resumeData.skills.softSkills,
        ...resumeData.skills.languages.map((l) => `${l}`),
      ],
    },
  ];

  return (
    <SectionWrapper id="skills" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Cpu}
          title="Skills"
          subtitle="Technologies and tools I work with across the AI/ML stack"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, idx) => (
            <motion.div key={group.title} variants={fadeUp} custom={idx + 1}>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <group.icon className="h-4 w-4 text-emerald-500" />
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs font-normal border-border/60 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-colors cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Education                                                          */
/* ------------------------------------------------------------------ */
function EducationSection() {
  return (
    <SectionWrapper id="education" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={GraduationCap}
          title="Education"
          subtitle="My academic background and foundation in AI & ML"
        />
        <div className="max-w-3xl mx-auto grid gap-6">
          {resumeData.education.map((edu, idx) => (
            <motion.div key={idx} variants={fadeUp} custom={idx + 1}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="font-medium text-foreground/80">
                      {edu.institution}, {edu.location}
                    </span>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {edu.period}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  >
                    <GraduationCap className="h-3.5 w-3.5 mr-1" />
                    {edu.score}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Achievements                                                       */
/* ------------------------------------------------------------------ */
function AchievementsSection() {
  return (
    <SectionWrapper id="achievements" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Trophy}
          title="Achievements"
          subtitle="Hackathons and competitive milestones"
        />
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {resumeData.achievements.map((ach, idx) => (
            <motion.div key={idx} variants={fadeUp} custom={idx + 1}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-amber-500/30 transition-colors group h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {ach.award}
                    </Badge>
                  </div>
                  <CardTitle className="text-base mt-2 group-hover:text-amber-500 transition-colors">
                    {ach.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {ach.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(resumeData.email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    });
  }, []);

  const handleCopyPhone = useCallback(() => {
    navigator.clipboard.writeText(resumeData.phone).then(() => {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2500);
    });
  }, []);

  return (
    <SectionWrapper id="contact" className="px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          icon={Mail}
          title="Let's Connect"
          subtitle="Interested in collaboration or have an exciting opportunity? Reach out!"
        />
        <motion.div variants={fadeUp} custom={1} className="max-w-2xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid gap-6">
                {/* Email — click to copy */}
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group w-full text-left relative overflow-hidden"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                    {emailCopied ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {emailCopied ? "Copied to clipboard!" : "Email"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {resumeData.email}
                    </p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-emerald-500 transition-colors">
                    {emailCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </div>
                  {emailCopied && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
                    />
                  )}
                </button>

                {/* Phone — click to copy, or tap call */}
                <div className="flex items-stretch gap-2">
                  <button
                    onClick={handleCopyPhone}
                    className="flex flex-1 items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group text-left relative overflow-hidden"
                  >
                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                      {phoneCopied ? <Check className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {phoneCopied ? "Copied!" : "Phone"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {resumeData.phone}
                      </p>
                    </div>
                    <div className="text-muted-foreground group-hover:text-emerald-500 transition-colors">
                      {phoneCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </div>
                    {phoneCopied && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 origin-left"
                      />
                    )}
                  </button>
                  <a
                    href={`tel:${resumeData.phone}`}
                    className="flex items-center justify-center px-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-emerald-500 text-xs font-medium"
                    title="Call directly"
                  >
                    Call
                  </a>
                </div>

                <a
                  href={resumeData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      View my repositories
                    </p>
                  </div>
                </a>

                <a
                  href={resumeData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with me
                    </p>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  const [footerCopied, setFooterCopied] = useState(false);

  const handleFooterCopy = useCallback(() => {
    navigator.clipboard.writeText(resumeData.email).then(() => {
      setFooterCopied(true);
      setTimeout(() => setFooterCopied(false), 2000);
    });
  }, []);

  return (
    <footer className="border-t py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Jyothi Swaroop Akasamu. Built with
          Next.js & Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <button
            onClick={handleFooterCopy}
            className="relative text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy Email"
            title={footerCopied ? "Copied!" : "Copy email"}
          >
            {footerCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Mail className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Separator className="bg-border/30" />
        </div>
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
