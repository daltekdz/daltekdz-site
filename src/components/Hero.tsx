import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBooking }) => {
  const { isRTL } = useLanguage();

  const handleBrowseSalons = () => {
    window.location.href = '/stores';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
          alt="Beauty Salon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#C8860D] to-[#D4941A] rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-12 sm:w-24 h-12 sm:h-24 bg-gradient-to-br from-pink-400 to-red-400 rounded-full blur-xl sm:blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Content */}
      <div className={`relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          {/* Main Heading */}
          <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight text-white ${isRTL ? 'font-cairo' : ''}`}>
            <span className="block">
              {isRTL ? 'احجز موعدك' : 'Réservez votre'}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] via-[#D4941A] to-[#C8860D] animate-pulse">
              {isRTL ? 'بسهولة ودون انتظار' : 'rendez-vous beauté'}
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-gray-200 leading-relaxed max-w-4xl mx-auto font-light px-4 ${isRTL ? 'font-tajawal' : ''}`}
          >
            {isRTL 
              ? 'اكتشف أفضل الصالونات وعيادات التجميل في الجزائر واحجز موعدك بضغطة واحدة'
              : 'Découvrez les meilleurs salons et cliniques esthétiques en Algérie et réservez en un clic'
            }
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <button 
              onClick={handleBrowseSalons}
              className={`border-2 border-white text-white bg-white/10 backdrop-blur-sm px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl hover:bg-white hover:text-gray-900 transition-all duration-200 transform hover:scale-105 shadow-lg ${isRTL ? 'font-cairo' : ''}`}
            >
              {isRTL ? 'تصفح الصالونات' : 'Parcourir les salons'}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};