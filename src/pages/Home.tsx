import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { FAQ } from '../components/home/FAQ';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <FloatingWhatsApp />
    </div>
  );
};