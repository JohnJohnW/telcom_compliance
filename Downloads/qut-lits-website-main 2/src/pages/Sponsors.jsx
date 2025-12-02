import React from "react";
import { motion } from "framer-motion";
import { Award, Gem, Heart, Instagram, Facebook, Linkedin, Mail, Download } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { Tiltable, TiltableAnchor } from "../components/Tiltable";

// Sponsor data organized by tier
const SPONSOR_TIERS = [
  {
    name: "Ruby",
    color: "ruby",
    icon: Gem,
    description: "Strategic partners supporting our mission",
    sponsors: [
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Empowering the next generation of legal professionals"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Advancing legal tech education"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Building the future of law"
      // }
    ]
  },
  {
    name: "Sapphire",
    color: "sapphire",
    icon: Gem,
    description: "Valued partners in our journey",
    sponsors: [
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Supporting student innovation"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Fostering tech law excellence"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Championing legal innovation"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Investing in tomorrow's leaders"
      // }
    ]
  },
  {
    name: "Emerald",
    color: "emerald",
    icon: Gem,
    description: "Our premium partners driving innovation",
    sponsors: [
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Leading the future of legal technology"
      // },
      // {
      //   name: "Sponsor Name",
      //   logo: "/headshot.png",
      //   description: "Innovating at the intersection of law and tech"
      // }
    ]
  }
];

function HeroSection() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32" aria-label="Sponsors section">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-rubik text-white/90">Gratitude & Partnership            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-tomorrow leading-tight">
          Thank You to Our Sponsors
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 font-montserrat max-w-3xl mx-auto leading-relaxed">
          We are grateful for the generous support of our sponsors who make our mission possible. 
          Together, we're shaping the future of law and technology.
        </p>
      </div>
    </section>
  );
}

function SponsorsSection() {
  return (
    <section className="py-24 relative" aria-label="Sponsors section">
      <div className="max-w-7xl mx-auto px-6">
        {SPONSOR_TIERS.map((tier, tierIndex) => (
          <Tiltable key={tier.name} tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
            <div className="mb-20 last:mb-0">
            {/* Tier Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <tier.icon 
                  className="h-8 w-8"
                  style={{ color: tier.color === 'emerald' ? '#50C878' : tier.color === 'ruby' ? '#E0115F' : '#0F52BA' }}
                />
                <h2 
                  className="text-4xl md:text-5xl font-bold font-tomorrow"
                  style={{ color: tier.color === 'emerald' ? '#50C878' : tier.color === 'ruby' ? '#E0115F' : '#0F52BA' }}
                >
                  {tier.name} Tier
                </h2>
              </div>
              <p className="text-lg text-white/80 font-montserrat">
                {tier.description}
              </p>
            </div>

            {/* Sponsors Grid */}
            <div className="text-center">
              <p className="text-white/60 font-montserrat italic text-lg">
                2026 sponsors to come
              </p>
            </div>
            </div>
          </Tiltable>
        ))}
      </div>
    </section>
  );
}

function BecomeASponsorSection() {
  return (
    <section className="py-24 relative" aria-label="Become a sponsor section">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
          <div className="liquid-glass-strong rounded-3xl p-16 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 font-tomorrow">
            Become a Sponsor
          </h2>
          <p className="text-xl text-white/80 mb-10 font-montserrat max-w-2xl mx-auto leading-relaxed">
            Partner with us to empower the next generation of legal tech innovators. 
            Your support helps students bridge the gap between law and technology.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <TiltableAnchor
              href="/LITS 2026 Prospectus.pdf"
              download="LITS 2026 Prospectus.pdf"
              className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/20 hover:border-primary/50 font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <span>Download Prospectus</span>
            </TiltableAnchor>
            <TiltableAnchor
              href="/contact"
              className="group relative inline-flex items-center bg-gradient-to-r from-primary to-purple text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/25 font-rubik overflow-hidden"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <span className="relative z-10">Get in Touch</span>
            </TiltableAnchor>
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

function Sponsors() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <SponsorsSection />
        <BecomeASponsorSection />
      </main>
    </div>
  );
}

export default Sponsors;

