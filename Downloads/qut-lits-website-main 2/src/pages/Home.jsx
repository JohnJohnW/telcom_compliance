import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Users, Calendar, Award, BookOpen, Briefcase, Globe, Zap, Network, Scale, Cpu, Database, Brain, Code, Rocket, Search, GitBranch, Layers, Sparkles, Target, TrendingUp, Shield, Eye, Lock, Instagram, Facebook, Linkedin, Mail } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { useSwipe } from "../hooks/useSwipe";
import { Tiltable, TiltableButton, TiltableAnchor, TiltableLink } from "../components/Tiltable";

// Hero section data
const HERO_DATA = {
  title: "Welcome to the Law, Innovation and Technology Society",
  subtitle: "Immersing students in the disruptive world of law and technology",
  description: "Established in 2023, our society is dedicated to connecting students with the people, tools and processes that are shaping the future. As the only student society in Australia focused on law and technology, we are fostering bold conversations and empowering the next generation of legal innovators.",
  cta: "Join Our Community",
  ctaLink: "https://campus.hellorubric.com/?tab=memberships&s=6719",
  stats: [
    { number: "500+", label: "Active Members", icon: Users },
    { number: "50+", label: "Industry Partners", icon: Network },
    { number: "100+", label: "Workshops Hosted", icon: Calendar }
  ]
};

// Banner slideshow data
const BANNER_SLIDES = [
  {
    id: 1,
    title: "Welcome to Law, Innovation and Technology Society",
    subtitle: "Where Law Meets Innovation",
    description: "Join the premier society bridging legal education with cutting-edge technology. Learn from industry experts, build real-world projects, and launch your career in legal tech and tech law.",
    image: "/lits-slideshow-5.jpg",
    cta: "Discover More",
    link: "/about",
    techIcons: [Scale, Cpu, Database]
  },
  {
    id: 2,
    title: "AI & Legal Innovation",
    subtitle: "Hands-On Workshop",
    description: "Master AI-powered legal research, contract analysis, and case management tools. Explore the legal implications of AI and how to navigate emerging regulatory frameworks.",
    image: "/lits-slideshow-4.jpg",
    cta: "Register Now",
    link: "/",
    techIcons: [Brain, Code, Rocket]
  },
  {
    id: 3,
    title: "Tech Law & Innovation",
    subtitle: "Connect with Industry Leaders",
    description: "Build your professional network with legal tech startups, law firms, and technology companies. Discover opportunities in tech law, regulatory compliance, and innovation policy.",
    image: "/lits-slideshow-6.jpg",
    cta: "Connect Now",
    link: "/",
    techIcons: [Network, Globe, Briefcase]
  },
  {
    id: 4,
    title: "Legal Technology Excellence",
    subtitle: "Innovation in Practice",
    description: "Explore cutting-edge legal technology solutions and their impact on the legal profession.",
    image: "/lits-slideshow-7.jpg",
    cta: "Learn More",
    link: "/about",
    techIcons: [Code, Database, Brain]
  },
  {
    id: 5,
    title: "Future of Legal Tech",
    subtitle: "Shaping Tomorrow",
    description: "Join us in shaping the future of legal technology and innovation.",
    image: "/lits-slideshow-8.jpg",
    cta: "Join Us",
    link: "/",
    techIcons: [Rocket, Target, TrendingUp]
  },
  {
    id: 6,
    title: "Legal Innovation Community",
    subtitle: "Connect & Grow",
    description: "Be part of a vibrant community of legal tech enthusiasts and innovators.",
    image: "/lits-slideshow-9.jpeg",
    cta: "Get Involved",
    link: "/contact",
    techIcons: [Network, Users, Globe]
  },
  {
    id: 7,
    title: "Law Meets Technology",
    subtitle: "Bridging the Gap",
    description: "Discover how technology is transforming the legal landscape.",
    image: "/lits-slideshow-1.jpeg",
    cta: "Explore",
    link: "/about",
    techIcons: [Scale, Cpu, Database]
  },
  {
    id: 8,
    title: "Tech Law Excellence",
    subtitle: "Industry Leadership",
    description: "Connect with leaders in technology law and legal innovation.",
    image: "/lits-slideshow-3.jpeg",
    cta: "Connect",
    link: "/contact",
    techIcons: [Network, Globe, Briefcase]
  }
];

// Key benefits data
const BENEFITS = [
  {
    icon: Brain,
    title: "Explore the Impact of Technology",
    description: "Engage in bold discussions surrounding the disruptive impact of emerging technology",
    color: "primary",
    features: ["Machine Learning", "Contract Analysis", "Legal Research AI"],
    techElements: [Cpu, Database, Search]
  },
  {
    icon: Target,
    title: "Connect with Industry Leaders",
    description: "Attend premiere events with the the companies that are championing legal innovation",
    color: "primary",
    features: ["Regulatory Compliance", "Tech Policy", "Innovation Law"],
    techElements: [GitBranch, Layers, Cpu]
  },
  {
    icon: Rocket,
    title: "Discover Altnerative Pathways to Success",
    description: "Learn about the wide variety of opportunities available in this rapidly evolving space",
    color: "primary",
    features: ["Prototyping", "Startup Support", "Innovation"],
    techElements: [Zap, Sparkles, Target]
  },
  {
    icon: Code,
    title: "Stand Out from the Crowd",
    description: "Access exclusive opportunities and build your skills with the tools shaping the industry",
    color: "primary",
    features: ["Industry Insights", "Mentorship", "Job Placement"],
    techElements: [TrendingUp, Briefcase, Network]
  }
];




function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length);
  };

  const swipeRef = useSwipe({
    onSwipeLeft: nextSlide,
    onSwipeRight: prevSlide,
    threshold: 50
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section 
      ref={swipeRef}
      className="relative h-[70vh] min-h-[600px] overflow-hidden z-10"
      aria-label="Featured slideshow"
      role="region"
      tabIndex={0}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          aria-label={`Slide ${currentSlide + 1} of ${BANNER_SLIDES.length}: ${BANNER_SLIDES[currentSlide].title}`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img 
              src={BANNER_SLIDES[currentSlide].image} 
              alt={BANNER_SLIDES[currentSlide].title}
              className="w-full h-full object-cover"
              loading={currentSlide === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={currentSlide === 0 ? "high" : "low"}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-rubik text-white/90">QUT's Premier Society for Law and Technology</span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 font-tomorrow leading-tight">
                {HERO_DATA.title}
              </h1>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {BANNER_SLIDES.map((_, index) => (
          <TiltableButton
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
            }`}
            tiltOptions={{ maxTilt: 2, scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <p className="text-lg md:text-xl mb-8 text-white/90 font-montserrat max-w-3xl mx-auto leading-relaxed">
          {HERO_DATA.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <TiltableAnchor
            href={HERO_DATA.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/10 font-rubik overflow-hidden"
            tiltOptions={{ maxTilt: 4, scale: 1.02 }}
          >
            <span className="relative z-10">{HERO_DATA.cta}</span>
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </TiltableAnchor>
          
          <TiltableLink
            to="/about"
            className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
            tiltOptions={{ maxTilt: 4, scale: 1.02 }}
          >
            Learn More
            <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </TiltableLink>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">
            Why Join Us?
          </h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Discover the unique advantages of being part of our community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {BENEFITS.map((benefit, index) => (
            <Tiltable
              key={benefit.title}
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
              className="h-full"
            >
              <div className="group text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:bg-white/10 h-full flex flex-col">
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-${benefit.color}/20 to-${benefit.color}/10 border border-${benefit.color}/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-10 w-10 text-${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 font-rubik">{benefit.title}</h3>
                <p className="text-white/80 font-montserrat leading-relaxed">{benefit.description}</p>
              </div>
            </Tiltable>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative" aria-label="Call to action section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
          <div className="liquid-glass-strong rounded-3xl p-16 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Join us today and become part of a community that's driving innovation 
            at the intersection of law and technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <TiltableAnchor
              href="https://campus.hellorubric.com/?tab=memberships&s=6719"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <span className="relative z-10">Join Now</span>
            </TiltableAnchor>
            <TiltableLink
              to="/about"
              className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              Learn More
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </TiltableLink>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-6 pt-6 border-t border-white/10">
            <TiltableAnchor
              href="https://www.facebook.com/lawinnovationandtechsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Facebook"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Facebook className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.instagram.com/qutlitsociety/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Instagram"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Instagram className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="https://www.linkedin.com/company/law-innovation-and-technology-society/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="LinkedIn"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Linkedin className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
            <TiltableAnchor
              href="mailto:litsociety@qut.edu.au"
              className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300"
              aria-label="Email"
              tiltOptions={{ maxTilt: 5, scale: 1.03 }}
            >
              <Mail className="h-5 w-5 text-white/70 group-hover:text-primary transition-colors duration-300" />
            </TiltableAnchor>
          </div>
          </div>
        </Tiltable>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <BannerSlideshow />
        <HeroSection />
        <BenefitsSection />
        <CTASection />
      </main>
    </div>
  );
}

export default Home;
