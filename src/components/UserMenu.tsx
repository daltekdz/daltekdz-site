import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, ShoppingBag, Calendar, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const UserMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const menuItems = [
    {
      icon: User,
      label: isRTL ? 'الملف الشخصي' : 'Profil',
      href: '/profile'
    },
    {
      icon: Calendar,
      label: isRTL ? 'حجوزاتي' : 'Mes réservations',
      href: '/my-bookings'
    },
    {
      icon: Settings,
      label: isRTL ? 'الإعدادات' : 'Paramètres',
      href: '/settings'
    }
  ];

  // Add store-specific menu items for store owners
  if (user.role === 'store_owner') {
    menuItems.splice(1, 0, {
      icon: ShoppingBag,
      label: isRTL ? 'لوحة المتجر' : 'Tableau de bord',
      href: '/store/dashboard'
    });
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${isRTL ? 'space-x-reverse flex-row-reverse' : ''}`}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-[#1A0000] to-[#2A0000] flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-sm font-bold">
              {user.name.charAt(0)}
            </span>
          )}
        </div>
        <div className={`hidden sm:block ${isRTL ? 'text-right' : 'text-left'}`}>
          <p className="text-sm font-medium text-gray-900 truncate max-w-24">
            {user.name}
          </p>
          <p className="text-xs text-gray-500 truncate max-w-24">
            {user.role === 'store_owner' ? (isRTL ? 'صاحب متجر' : 'Propriétaire') : 
             user.role === 'admin' ? (isRTL ? 'مدير' : 'Admin') : 
             (isRTL ? 'عميل' : 'Client')}
          </p>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 ${isRTL ? 'right-0' : 'left-0'}`}
          >
            {/* User Info Header */}
            <div className={`px-4 py-3 border-b border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <item.icon className={`h-4 w-4 text-gray-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Sign Out */}
            <div className="border-t border-gray-100 py-1">
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <LogOut className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                {isRTL ? 'تسجيل الخروج' : 'Se déconnecter'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};