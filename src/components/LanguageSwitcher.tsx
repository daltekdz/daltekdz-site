import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'FR', flag: '🇫🇷', fullName: 'Français' },
    { code: 'ar', name: 'ع', flag: '🇩🇿', fullName: 'العربية' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (langCode: 'fr' | 'ar') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center bg-gray-100/70 hover:bg-gray-200/70 backdrop-blur-lg rounded-md px-2 py-1 transition-all duration-200 border border-gray-300/50 hover:border-gray-400/50 min-w-[50px] ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span className="text-xs">{currentLanguage?.flag}</span>
        <span className="text-xs font-bold text-gray-700 mx-1">
          {currentLanguage?.name}
        </span>
        <ChevronDown className={`h-2 w-2 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] z-20 ${isRTL ? 'right-0' : 'left-0'}`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code as 'fr' | 'ar')}
                  className={`w-full flex items-center px-2 py-1.5 text-xs hover:bg-gray-50 transition-colors duration-150 ${
                    language === lang.code ? 'bg-gray-50 text-[#C8860D]' : 'text-gray-700'
                  } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <span className={`text-xs ${isRTL ? 'ml-1' : 'mr-1'}`}>{lang.flag}</span>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="font-medium text-xs">{lang.fullName}</div>
                  </div>
                  {language === lang.code && (
                    <div className={`w-1 h-1 bg-[#C8860D] rounded-full ${isRTL ? 'mr-1' : 'ml-1'}`} />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};