import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Linkedin, Users, Target, Lightbulb, Award, Building, Globe, BookOpen, ArrowRight, Instagram, Facebook } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { Tiltable, TiltableAnchor, TiltableLink } from "../components/Tiltable";

const EXECUTIVE_TEAM = [
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  },
  {
    name: "placeholder",
    role: "placeholder",
    image: "/headshot.png",
    bio: "placeholder",
    email: "placeholder@qutlits.edu.au",
    linkedin: "#",
    github: "#"
  }
];

const SOCIETY_VALUES = [
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive network of students passionate about law and technology"
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Exploring cutting-edge legal technology and emerging industry trends"
  },
  {
    icon: Lightbulb,
    title: "Learning",
    description: "Providing opportunities for skill development and knowledge sharing"
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in all our activities and initiatives"
  }
];

const STATS = [
  { number: "150+", label: "Active Members", icon: Users },
  { number: "25+", label: "Industry Partners", icon: Building },
  { number: "12+", label: "Annual Workshops", icon: BookOpen },
  { number: "95%", label: "Member Satisfaction", icon: Award }
];



function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden" aria-label="About section">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-montserrat leading-relaxed">
            We are Queensland University of Technology's premier society for students 
            interested in the intersection of law, innovation, and technology.
          </p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <Tiltable key={stat.label} tiltOptions={{ maxTilt: 10, scale: 1.05 }}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple/20 border border-primary/30 flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-tomorrow">{stat.number}</div>
                <div className="text-white/80 font-montserrat">{stat.label}</div>
              </div>
            </Tiltable>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="pt-16 pb-16 relative" aria-label="Mission and vision section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-tomorrow">
              Our Mission & Vision
            </h2>
            <div className="space-y-6 text-white/80 font-montserrat">
              <p className="text-lg leading-relaxed">
                QUT LITS exists to bridge the gap between legal education and technological innovation. 
                We believe that the future of law lies in understanding and leveraging technology to 
                create more efficient, accessible, and just legal systems.
              </p>
              <p className="text-lg leading-relaxed">
                Through workshops, networking events, and industry partnerships, we prepare our members 
                for the evolving landscape of legal technology and innovation.
              </p>
            </div>
          </div>
          
          <Tiltable tiltOptions={{ maxTilt: 1, scale: 1.002 }}>
            <div>
              <div className="liquid-glass-strong rounded-3xl p-10 border border-white/20 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 font-tomorrow text-center">Our Values</h3>
                <div className="grid grid-cols-2 gap-6">
                  {SOCIETY_VALUES.map((value, index) => (
                    <Tiltable key={value.title} tiltOptions={{ maxTilt: 4, scale: 1.02 }}>
                      <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-white mb-2 font-rubik">{value.title}</h4>
                        <p className="text-sm text-white/70 font-montserrat">{value.description}</p>
                      </div>
                    </Tiltable>
                  ))}
                </div>
              </div>
            </div>
          </Tiltable>
        </div>
      </div>
    </section>
  );
}

function ExecutiveTeamSection() {
  return (
    <section className="py-24 relative" aria-label="Executive team section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-tomorrow">Executive Team</h2>
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto">
            Meet the dedicated students leading QUT LITS and driving our mission forward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EXECUTIVE_TEAM.map((member, index) => (
            <Tiltable key={member.name} tiltOptions={{ maxTilt: 10, scale: 1.05 }}>
              <div className="group bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:bg-white/10">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary to-purple border border-primary/30">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 font-rubik">{member.name}</h3>
                  <p className="text-primary font-semibold font-montserrat">{member.role}</p>
                </div>
                
                <p className="text-white/80 text-center mb-6 font-montserrat leading-relaxed">{member.bio}</p>
                
                <div className="flex justify-center gap-3">
                  <TiltableAnchor
                    href={member.linkedin}
                    className="p-3 rounded-xl bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-300"
                    title="LinkedIn"
                    tiltOptions={{ maxTilt: 5, scale: 1.03 }}
                  >
                    <Linkedin className="h-4 w-4" />
                  </TiltableAnchor>
                </div>
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
    <section className="pt-16 pb-24 relative" aria-label="Call to action section">
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
              to="/contact"
              className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              Contact Us
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

function About() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <MissionSection />
        {/* <ExecutiveTeamSection /> */}
        <CTASection />
      </main>
    </div>
  );
}

export default About;
