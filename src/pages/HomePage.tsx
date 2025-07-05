import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { HeroSection } from '../components/sections/HeroSection';
import { GallerySection } from '../components/sections/GallerySection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { FilterSectionComponent } from '../components/sections/FilterSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { StatsSection } from '../components/sections/StatsSection';
import { Footer } from '../components/layout/Footer';
import { FeaturedStores } from '../components/FeaturedStores';
import { ContactSectionComponent } from '../components/sections/ContactSection';

interface HomePageProps {
  onStartBooking?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartBooking = () => {} }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/5 via-white to-[#1A0000]/10">
      <Navbar />
      <HeroSection onStartBooking={onStartBooking} />
      <GallerySection />
      <FeaturedStores />
      <ServicesSection />
      <FilterSectionComponent />
      <WhyChooseUsSection />
      <StatsSection />
      <ContactSectionComponent />
      <Footer />
    </div>
  );
};