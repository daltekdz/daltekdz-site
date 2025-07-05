import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Star, Calendar, Users, Award } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const quickLinks = [
    { name: isRTL ? 'الرئيسية' : 'Accueil', href: '/' },
    { name: isRTL ? 'الخدمات' : 'Services', href: '/services' },
    { name: isRTL ? 'الصالونات' : 'Salons', href: '/salons' },
    { name: isRTL ? 'من نحن' : 'À propos', href: '/about' },
    { name: isRTL ? 'اتصل بنا' : 'Contact', href: '/contact' }
  ];

  const services = [
    { name: isRTL ? 'حلاقة رجالية' : 'Coiffure masculine', href: '/services/men' },
    { name: isRTL ? 'تصفيف نسائي' : 'Coiffure féminine', href: '/services/women' },
    { name: isRTL ? 'عناية بالبشرة' : 'Soins du visage', href: '/services/skincare' },
    { name: isRTL ? 'مانيكير وباديكير' : 'Manucure & Pédicure', href: '/services/nails' },
    { name: isRTL ? 'إزالة الشعر بالليزر' : 'Épilation laser', href: '/services/laser' }
  ];

  const stats = [
    { icon: Users, number: '15+', label: isRTL ? 'صالون' : 'Salons' },
    { icon: Calendar, number: '500+', label: isRTL ? 'حجز' : 'Réservations' },
    { icon: Star, number: '4.8', label: isRTL ? 'تقييم' : 'Note' },
    { icon: Award, number: '98%', label: isRTL ? 'رضا' : 'Satisfaction' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Stats Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-[#C8860D] to-[#D4941A] flex items-center justify-center">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className={`col-span-1 md:col-span-1 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center mb-4 sm:mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link to="/">
                <img 
                  src="/ChatGPT Image 16 juin 2025, 19_09_23.png" 
                  alt="Daltekdz Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-lg bg-white/10 p-1"
                />
              </Link>
              <div className={isRTL ? 'mr-2 sm:mr-3' : 'ml-2 sm:ml-3'}>
                <Link to="/" className="block">
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#C8860D] to-[#D4941A] bg-clip-text text-transparent">
                    Daltekdz
                  </h3>
                  <p className="text-[#C8860D] text-xs sm:text-sm">No Wait. Just Beauty.</p>
                </Link>
              </div>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              {isRTL 
                ? 'منصة دالتكدز هي الحل الأمثل لحجز خدمات الجمال في الجزائر. نربط بين العملاء وأفضل الصالونات والعيادات التجميلية.'
                : 'Daltekdz est la solution idéale pour réserver des services beauté en Algérie. Nous connectons les clients avec les meilleurs salons et cliniques esthétiques.'
              }
            </p>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-3 sm:space-x-4' : 'space-x-3 sm:space-x-4'}`}>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-[#C8860D] rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-[#C8860D] rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 hover:bg-[#C8860D] rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              {isRTL ? 'روابط سريعة' : 'Liens rapides'}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-[#C8860D] transition-colors duration-200 flex items-center group text-sm sm:text-base"
                  >
                    <span className={`w-1 h-1 bg-[#C8860D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isRTL ? 'ml-2' : 'mr-2'}`}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">
              {isRTL ? 'خدماتنا' : 'Nos services'}
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="text-gray-300 hover:text-[#C8860D] transition-colors duration-200 flex items-center group text-sm sm:text-base"
                  >
                    <span className={`w-1 h-1 bg-[#C8860D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isRTL ? 'ml-2' : 'mr-2'}`}></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className={`flex flex-col sm:flex-row justify-between items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-0">
              © 2024 Daltekdz. {isRTL ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
            </p>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4 sm:space-x-6' : 'space-x-4 sm:space-x-6'}`}>
              <a href="#" className="text-gray-400 hover:text-[#C8860D] text-xs sm:text-sm transition-colors">
                {isRTL ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C8860D] text-xs sm:text-sm transition-colors">
                {isRTL ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
              </a>
              <a href="#" className="text-gray-400 hover:text-[#C8860D] text-xs sm:text-sm transition-colors">
                {isRTL ? 'ملفات تعريف الارتباط' : 'Cookies'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
