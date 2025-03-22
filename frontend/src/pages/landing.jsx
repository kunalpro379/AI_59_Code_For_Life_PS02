import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/landing-page/hero-section';
import { FeatureSection } from '../components/landing-page/feature-section';
import { DashboardPreview } from '../components/landing-page/dashboard-preview';
import { IntegrationSection } from '../components/landing-page/integration-section';
import { TestimonialSection } from '../components/landing-page/testimonial-section';
import { CTASection } from '../components/landing-page/cta-section';
import { Footer } from '../components/landing-page/footer';
import Navigation from '../components/landing-page/floating-nav';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navigation />

      <HeroSection />
      <FeatureSection />
      <DashboardPreview />
      <IntegrationSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;