import React from 'react';
import { Hero } from '../Hero';

interface HeroSectionProps {
  onStartBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartBooking }) => {
  return <Hero onStartBooking={onStartBooking} />;
};