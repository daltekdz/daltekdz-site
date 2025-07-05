import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Store, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  TrendingUp,
  DollarSign,
  Star,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { AdminStoresTab } from '../../components/admin/AdminStoresTab';
import { AdminCustomersTab } from '../../components/admin/AdminCustomersTab';
import { AdminStatsTab } from '../../components/admin/AdminStatsTab';
import { AdminMessagesTab } from '../../components/admin/AdminMessagesTab';
import { AdminNotificationsTab } from '../../components/admin/AdminNotificationsTab';
import { AdminSettingsTab } from '../../components/admin/AdminSettingsTab';
import { AdminFeaturedStoresTab } from '../../components/admin/AdminFeaturedStoresTab';

export const AdminDashboard: React.FC = () => {
  const { isRTL } = useLanguage();
  const { adminUser, signOut, stats } = useAdmin();
  const [activeTab, setActiveTab] = useState('stats');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'stats', label: isRTL ? 'الإحصائيات' : 'Statistiques', icon: BarChart3 },
    { id: 'stores', label: isRTL ? 'المتاجر' : 'Magasins', icon: Store },
    { id: 'featured', label: isRTL ? 'المتاجر المميزة' : 'Magasins en vedette', icon: Star },
    { id: 'customers', label: isRTL ? 'العملاء' : 'Clients', icon: Users },
    { id: 'messages', label: isRTL ? 'الرسائل' : 'Messages', icon: MessageSquare },
    { id: 'notifications', label: isRTL ? 'الإشعارات' : 'Notifications', icon: Bell },
    { id: 'settings', label: isRTL ? 'الإعدادات' : 'Paramètres', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <AdminStatsTab />;
      case 'stores':
        return <AdminStoresTab />;
      case 'featured':
        return <AdminFeaturedStoresTab />;
      case 'customers':
        return <AdminCustomersTab />;
      case 'messages':
        return <AdminMessagesTab />;
      case 'notifications':
        return <AdminNotificationsTab />;
      case 'settings':
        return <AdminSettingsTab />;
      default:
        return <AdminStatsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Hidden on mobile, shown with overlay */}
      <div className={`${sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'} fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-gray-900/50 border-b border-gray-700">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h1 className="text-white font-bold text-base sm:text-lg">Daltekdz</h1>
              <p className="text-gray-400 text-xs">{isRTL ? 'لوحة المسؤول' : 'Admin Panel'}</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 sm:mt-8 px-4">
          <div className="space-y-1 sm:space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <item.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {adminUser?.name.charAt(0)}
              </span>
            </div>
            <div className={`${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
              <p className="text-white text-xs sm:text-sm font-medium">{adminUser?.name}</p>
              <p className="text-gray-400 text-xs">{adminUser?.role}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className={`w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <LogOut className={`h-3 w-3 sm:h-4 sm:w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'تسجيل الخروج' : 'Déconnexion'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
              <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 ${isRTL ? 'mr-3 sm:mr-4' : 'ml-3 sm:ml-4'}`}>
                {menuItems.find(item => item.id === activeTab)?.label}
              </h2>
            </div>

            {/* Quick Stats - Hidden on small screens */}
            <div className={`hidden md:flex items-center space-x-4 sm:space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Store className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
                <div className={`${isRTL ? 'mr-2 text-right' : 'ml-2 text-left'}`}>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{stats.activeStores}</p>
                  <p className="text-xs text-gray-500">{isRTL ? 'متجر نشط' : 'Magasins actifs'}</p>
                </div>
              </div>
              
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
                <div className={`${isRTL ? 'mr-2 text-right' : 'ml-2 text-left'}`}>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{stats.totalCustomers}</p>
                  <p className="text-xs text-gray-500">{isRTL ? 'عميل' : 'Clients'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};