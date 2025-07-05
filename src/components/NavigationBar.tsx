import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const { isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { slug: 'barbershop', name: isRTL ? 'حلاقة رجالية' : 'Barbershop' },
    { slug: 'hair-salon', name: isRTL ? 'تصفيف نسائي' : 'Hair Salon' },
    { slug: 'nail-salon', name: isRTL ? 'مانيكير وباديكير' : 'Nail Salon' },
    { slug: 'day-spa', name: isRTL ? 'سبا وتجهيز الجسم' : 'Day Spa' },
    { slug: 'massage', name: isRTL ? 'مساج' : 'Massage' },
    { slug: 'esthetician', name: isRTL ? 'عناية بالبشرة' : 'Esthetician' },
    { slug: 'med-spa', name: isRTL ? 'مركز تجميل طبي' : 'Med Spa' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 sm:h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Link to="/" className="flex items-center space-x-3 z-10 group">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2 sm:space-x-3' : 'space-x-2 sm:space-x-3'}`}>
              <div className="relative">
                <img 
                  src="/ChatGPT Image 16 juin 2025, 19_09_23.png" 
                  alt="Daltekdz Logo" 
                  className={`h-10 w-10 sm:h-14 sm:w-14 object-contain rounded-lg sm:rounded-xl p-2 group-hover:scale-105 transition-transform duration-200 ${
                    isScrolled 
                      ? 'bg-gradient-to-br from-[#1A0000]/10 to-[#C8860D]/10' 
                      : 'bg-white/20 backdrop-blur-sm'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A0000]/20 to-[#C8860D]/20 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <div>
                <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#1A0000] to-[#C8860D] bg-clip-text ${
                  isScrolled ? 'text-transparent' : 'text-white'
                }`}>
                  Daltekdz
                </span>
                <p className={`text-xs font-medium leading-none hidden sm:block ${
                  isScrolled ? 'text-gray-600' : 'text-gray-200'
                }`}>
                  No Wait. Just Beauty.
                </p>
              </div>
            </div>
          </Link>

          <div className="flex items-center">
            <div className={`rounded-lg ${
              isScrolled ? 'bg-gray-100/70' : 'bg-white/20 backdrop-blur-sm'
            } mr-2 sm:mr-0`}>
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Services Dropdown */}
      <div className="hidden sm:flex justify-center mt-2">
        <div className="relative group">
          <button className="py-2 px-4 hover:text-[#C8860D]">{isRTL ? 'خدماتنا' : 'Services'}</button>
          <div className="absolute bg-white shadow rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {services.map(service => (
              <Link
                key={service.slug}
                to={`/stores?service=${service.slug}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100 py-4">
          <div className="px-4 space-y-3">
            <Link to="/" className="block py-2 text-base font-medium text-gray-900 hover:text-[#C8860D]" onClick={() => setMobileMenuOpen(false)}>
              {isRTL ? 'الرئيسية' : 'Accueil'}
            </Link>
            <Link to="/stores" className="block py-2 text-base font-medium text-gray-900 hover:text-[#C8860D]" onClick={() => setMobileMenuOpen(false)}>
              {isRTL ? 'الصالونات' : 'Salons'}
            </Link>
            <div className="border-t pt-2">
              <p className="text-sm font-semibold text-gray-700">{isRTL ? 'الخدمات' : 'Services'}</p>
              {services.map(service => (
                <Link
                  key={service.slug}
                  to={`/stores?service=${service.slug}`}
                  className="block px-2 py-1 text-sm text-gray-800 hover:text-[#C8860D]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link to="/login" className="block py-2 text-base font-medium text-gray-900 hover:text-[#C8860D]" onClick={() => setMobileMenuOpen(false)}>
              {isRTL ? 'تسجيل الدخول' : 'Connexion'}
            </Link>
            <Link to="/register" className="block py-2 text-base font-medium text-gray-900 hover:text-[#C8860D]" onClick={() => setMobileMenuOpen(false)}>
              {isRTL ? 'إنشاء حساب' : 'Créer un compte'}
            </Link>
            <Link to="/create-store" className="block py-2 text-base font-medium text-gray-900 hover:text-[#C8860D]" onClick={() => setMobileMenuOpen(false)}>
              {isRTL ? 'إنشاء متجر' : 'Créer un salon'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
