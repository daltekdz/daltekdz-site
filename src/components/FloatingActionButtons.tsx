import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, UserPlus, Store, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FloatingActionButtons: React.FC = () => {
  const { isRTL } = useLanguage();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const location = useLocation();

  // Only show on home page
  const isHomePage = location.pathname === '/';
  if (!isHomePage) return null;

  const buttons = [
    {
      id: 'login',
      icon: LogIn,
      label: isRTL ? 'تسجيل الدخول' : 'Se connecter',
      href: '/login',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700'
    },
    {
      id: 'register',
      icon: UserPlus,
      label: isRTL ? 'إنشاء حساب' : 'Créer un compte',
      href: '/register',
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700'
    },
    {
      id: 'store',
      icon: Store,
      label: isRTL ? 'إنشاء متجر' : 'Créer un salon',
      href: '/create-store',
      color: 'from-[#C8860D] to-[#D4941A]',
      hoverColor: 'from-[#D4941A] to-[#C8860D]'
    },
    {
      id: 'admin',
      icon: Shield,
      label: isRTL ? 'دخول أدمن' : 'Admin Login',
      href: '/admin-login',
      color: 'from-red-600 to-red-700',
      hoverColor: 'from-red-700 to-red-800'
    }
  ];

  return (
    <div className={`fixed top-[60%] z-40 ${isRTL ? 'left-4' : 'right-4'} transform -translate-y-1/2`}>
      <div className="flex flex-col space-y-3">
        {buttons.map((button, index) => {
          const Icon = button.icon;
          const isHovered = hoveredButton === button.id;

          return (
            <motion.div
              key={button.id}
              initial={{ opacity: 0, x: isRTL ? -50 : 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
              onMouseEnter={() => setHoveredButton(button.id)}
              onMouseLeave={() => setHoveredButton(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: isRTL ? 20 : -20 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-1/2 transform -translate-y-1/2 
                      ${isRTL ? 'left-full ml-3' : 'right-full mr-3'} 
                      bg-gray-900 text-white px-3 py-1 rounded-lg text-xs font-medium 
                      whitespace-nowrap shadow-lg z-50`}
                  >
                    {button.label}
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 
                        ${isRTL ? 'right-[-4px]' : 'left-[-4px]'}`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <Link to={button.href}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${
                    isHovered ? button.hoverColor : button.color
                  } text-white shadow-lg hover:shadow-xl transition-all duration-300 
                  flex items-center justify-center group relative overflow-hidden`}
                >
                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${button.color} 
                      opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`}
                    animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  </motion.div>

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
