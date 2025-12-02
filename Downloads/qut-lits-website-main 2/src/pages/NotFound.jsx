import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search, ArrowLeft, HelpCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { TiltableLink, TiltableButton } from "../components/Tiltable";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
        <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-rubik text-white/90">Page Not Found</span>
            </div>
          </div>

          <h1 className="text-8xl md:text-9xl font-bold text-white mb-6 font-tomorrow leading-tight">
            404
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-tomorrow">
            Oops! Page Not Found
          </h2>
          
          <p className="text-xl text-white/80 font-montserrat max-w-2xl mx-auto leading-relaxed mb-12">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <TiltableLink
              to="/"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-2xl hover:shadow-primary/10 font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <Home className="h-5 w-5" />
              Go Home
            </TiltableLink>
            
            <TiltableButton
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm font-rubik"
              tiltOptions={{ maxTilt: 4, scale: 1.02 }}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </TiltableButton>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 font-rubik">Popular Pages</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TiltableLink
                to="/"
                className="text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 font-rubik text-sm"
                tiltOptions={{ maxTilt: 3, scale: 1.02 }}
              >
                Home
              </TiltableLink>
              <TiltableLink
                to="/about"
                className="text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 font-rubik text-sm"
                tiltOptions={{ maxTilt: 3, scale: 1.02 }}
              >
                About
              </TiltableLink>
              <TiltableLink
                to="/sponsors"
                className="text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 font-rubik text-sm"
                tiltOptions={{ maxTilt: 3, scale: 1.02 }}
              >
                Sponsors
              </TiltableLink>
              <TiltableLink
                to="/contact"
                className="text-white/80 hover:text-white hover:bg-white/10 p-3 rounded-xl transition-all duration-300 font-rubik text-sm"
                tiltOptions={{ maxTilt: 3, scale: 1.02 }}
              >
                Contact
              </TiltableLink>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

export default NotFound;

