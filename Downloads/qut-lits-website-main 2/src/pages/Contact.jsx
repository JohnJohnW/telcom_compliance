import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Send, MessageCircle } from "lucide-react";
import Navigation from "../components/Navigation";
import AnimatedBackground from "../components/AnimatedBackground";
import { useTilt } from "../hooks/useTilt";
import { Tiltable, TiltableAnchor, TiltableButton } from "../components/Tiltable";

function EmailButton() {
  return (
    <TiltableAnchor
      href="mailto:litsociety@qut.edu.au"
      className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-purple text-white px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-lg hover:shadow-primary/10 font-rubik"
      tiltOptions={{ maxTilt: 4, scale: 1.02 }}
    >
      <Send className="h-5 w-5" />
      litsociety@qut.edu.au
    </TiltableAnchor>
  );
}

function SubmitButton({ isSubmitting = false }) {
  return (
    <TiltableButton
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-gradient-to-r from-primary to-purple text-white px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-purple/90 transition-all duration-300 shadow-lg hover:shadow-primary/10 font-rubik flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
      tiltOptions={{ maxTilt: 4, scale: 1.01 }}
      aria-busy={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Send className="h-5 w-5" />
          Send Message
        </>
      )}
    </TiltableButton>
  );
}

function FAQBox() {
  return (
    <Tiltable tiltOptions={{ maxTilt: 3, scale: 1.01 }}>
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
      <h3 className="text-2xl font-bold text-white mb-6 font-rubik">Frequently Asked Questions</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold font-rubik mb-2">How do I become a Member?</h4>
          <p className="text-white/70 font-montserrat text-sm">Follow the button that says "Join Now" and purchase your membership today. We welcome all QUT students and non-QUT students to become a member.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold font-rubik mb-2">Do I need technical knowledge to join?</h4>
          <p className="text-white/70 font-montserrat text-sm">Not at all! We welcome everyone who is interested in learning more about law and technology. Our events are beginner-friendly so you can get immersed from the get-go.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold font-rubik mb-2">What events do you host?</h4>
          <p className="text-white/70 font-montserrat text-sm">We host a wide variety of events from industry nights to workshops to social events. Follow us on the social media below to stay up to date with everything we have coming up.</p>
        </div>
      </div>
      </div>
    </Tiltable>
  );
}

// Contact form component
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    // You can add actual form submission logic here
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
    >
      <h3 className="text-2xl font-bold text-white mb-6 font-rubik">Send us a Message</h3>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-white/80 font-rubik mb-2">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-colors duration-300"
            placeholder="Your full name"
            aria-required="true"
            aria-describedby="name-error"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-white/80 font-rubik mb-2">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-colors duration-300"
            placeholder="your.email@example.com"
            aria-required="true"
            aria-describedby="email-error"
            inputMode="email"
            autoComplete="email"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-white/80 font-rubik mb-2">Subject *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-colors duration-300"
            placeholder="What's this about?"
            aria-required="true"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-white/80 font-rubik mb-2">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 transition-colors duration-300 resize-none"
          placeholder="Tell us more about your inquiry..."
          aria-required="true"
        />
      </div>
      
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}

function Contact() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <a href="#main-content" className="skip-to-main focus:top-0">
        Skip to main content
      </a>
      <AnimatedBackground />
      <Navigation />
      <main id="main-content">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden" aria-label="Contact section">
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-6">
              <MessageCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-rubik text-white/90">Get in Touch</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-tomorrow leading-tight">
            Contact Us
          </h1>
          
          <p className="text-xl text-white/80 font-montserrat max-w-3xl mx-auto leading-relaxed">
            Have questions about QUT LITS? Want to get involved? We'd love to hear from you. Reach out and let's start a conversation.
          </p>
        </div>
      </section>
      
      {/* Contact Information*/}
      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">
          {/* Contact Form and Additional Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* <ContactForm /> */}
            <div className="flex justify-center items-center pb-16">
              <EmailButton />
            </div>
            
            <div className="space-y-8">
              <FAQBox />
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}

export default Contact;
