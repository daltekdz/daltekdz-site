import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useLanguage } from '../contexts/LanguageContext';

export const LocationPopup: React.FC = () => {
  const { showLocationPopup, locationPermission, requestLocation, dismissLocationPopup } = useLocation();
  const { isRTL, language } = useLanguage();

  // Get text based on language
  const getText = () => {
    switch (language) {
      case 'ar':
        return {
          message: 'يرجى تفعيل الموقع الجغرافي لعرض الخدمات القريبة منك.',
          button: 'موافق'
        };
      case 'fr':
        return {
          message: 'Veuillez activer la localisation pour afficher les services à proximité.',
          button: 'D\'accord'
        };
      case 'en':
      default:
        return {
          message: 'Please enable location to show services near you.',
          button: 'OK'
        };
    }
  };

  const text = getText();

  return (
    <AnimatePresence>
      {showLocationPopup && (
        <>
          {/* Backdrop with dark transparent overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={dismissLocationPopup}
          />
          
          {/* Popup centered with flexbox */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-[300px] sm:max-w-[350px]">
              {/* Header with GPS icon */}
              <div className="bg-gradient-to-r from-[#1A0000] to-[#2A0000] p-4 sm:p-6 text-white relative">
                <button
                  onClick={dismissLocationPopup}
                  className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} p-1 hover:bg-white/20 rounded-full transition-colors`}
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h2 className="text-base sm:text-lg font-bold">
                    📍 GPS
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className={`p-4 sm:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {text.message}
                </p>

                {/* OK Button */}
                <button
                  onClick={requestLocation}
                  disabled={locationPermission === 'loading'}
                  className="w-full bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {locationPermission === 'loading' ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      {language === 'ar' ? 'جاري التحديد...' : language === 'fr' ? 'En cours...' : 'Loading...'}
                    </div>
                  ) : (
                    text.button
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};