import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star, 
  Plus, 
  Settings, 
  LogOut,
  BarChart3,
  Bell,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Tag
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { StaffManagement } from '../../components/StaffManagement';
import { StaffMember } from '../../types/staff';
import { Link } from 'react-router-dom';
import { StoreServiceManager } from '../../components/StoreServiceManager';
import { StoreService } from '../../types/store';
import { StoreImageUploader } from '../../components/StoreImageUploader';
import { StoreImage } from '../../types/store';
import { StoreAdManager } from '../../components/StoreAdManager';
import { StoreAd } from '../../types/store';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const StoreDashboard: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { notifications, unreadCount, sendWhatsAppNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'services' | 'staff' | 'images' | 'ads' | 'reviews' | 'settings'>('overview');

  // Mock data
  const storeInfo = {
    name: isRTL ? 'صالون الجمال الراقي' : 'Salon Beauté Élégante',
    type: isRTL ? 'صالون نسائي' : 'Salon féminin',
    plan: 'gold' as 'silver' | 'gold' | 'platinum',
    rating: 4.8,
    totalReviews: 127,
    address: isRTL ? 'حي السلام، الجزائر العاصمة' : 'Quartier Salam, Alger',
    phone: '+213 555 123 456'
  };

  const stats = {
    todayBookings: 12,
    weeklyRevenue: 45000,
    totalCustomers: 234,
    averageRating: 4.8
  };

  const recentBookings = [
    { id: 1, customer: isRTL ? 'فاطمة أحمد' : 'Fatima Ahmed', service: isRTL ? 'قص وتصفيف' : 'Coupe et coiffage', time: '10:00', status: isRTL ? 'مؤكد' : 'Confirmé' },
    { id: 2, customer: isRTL ? 'زينب محمد' : 'Zeineb Mohamed', service: isRTL ? 'صبغ الشعر' : 'Coloration', time: '11:30', status: isRTL ? 'في الانتظار' : 'En attente' },
    { id: 3, customer: isRTL ? 'أمينة علي' : 'Amina Ali', service: isRTL ? 'مانيكير' : 'Manucure', time: '14:00', status: isRTL ? 'مؤكد' : 'Confirmé' },
    { id: 4, customer: isRTL ? 'خديجة حسن' : 'Khadija Hassan', service: isRTL ? 'تنظيف البشرة' : 'Nettoyage visage', time: '15:30', status: isRTL ? 'مؤكد' : 'Confirmé' }
  ];

  // Mock services data
  const [services, setServices] = useState<StoreService[]>([
    {
      id: '1',
      storeId: 'store1',
      name: isRTL ? 'قص وتصفيف الشعر' : 'Coupe et coiffage',
      description: isRTL ? 'قص شعر احترافي مع تصفيف وتشطيب نهائي' : 'Coupe professionnelle avec finition',
      price: 2500,
      duration: 60,
      category: isRTL ? 'تصفيف نسائي' : 'Coiffure femme',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      storeId: 'store1',
      name: isRTL ? 'صبغ الشعر' : 'Coloration',
      description: isRTL ? 'صبغ شعر فاخر مع هايلايت احترافي' : 'Coloration luxueuse avec mèches professionnelles',
      price: 4500,
      duration: 120,
      category: isRTL ? 'تصفيف نسائي' : 'Coiffure femme',
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      storeId: 'store1',
      name: isRTL ? 'تنظيف البشرة' : 'Nettoyage visage',
      description: isRTL ? 'تنظيف عميق للبشرة مع ماسك مرطب' : 'Nettoyage profond avec masque hydratant',
      price: 3200,
      duration: 75,
      category: isRTL ? 'عناية بالبشرة' : 'Soins visage',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  // Mock staff data
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: isRTL ? 'أمينة بن علي' : 'Amina Ben Ali',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: [isRTL ? 'تصفيف الشعر' : 'Coiffure', isRTL ? 'صبغ الشعر' : 'Coloration'],
      description: isRTL ? 'خبيرة تصفيف مع 8 سنوات خبرة' : 'Experte coiffure avec 8 ans d\'expérience',
      services: ['1', '2'],
      rating: 4.9,
      totalReviews: 45,
      isActive: true,
      storeId: 'store1',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: isRTL ? 'فاطمة زروالي' : 'Fatima Zeroual',
      image: 'https://images.pexels.com/photos/3757956/pexels-photo-3757956.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: [isRTL ? 'العناية بالبشرة' : 'Soins visage', isRTL ? 'تنظيف البشرة' : 'Nettoyage'],
      description: isRTL ? 'متخصصة في العناية بالبشرة' : 'Spécialiste en soins du visage',
      services: ['4'],
      rating: 4.8,
      totalReviews: 32,
      isActive: true,
      storeId: 'store1',
      createdAt: '2024-01-01'
    }
  ]);

  // Mock store images
  const [storeImages, setStoreImages] = useState<StoreImage[]>([
    {
      id: '1',
      storeId: 'store1',
      url: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=800',
      isMain: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      storeId: 'store1',
      url: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=800',
      isMain: false,
      createdAt: '2024-01-01'
    }
  ]);

  // Mock ads data
  const [ads, setAds] = useState<StoreAd[]>([
    {
      id: '1',
      storeId: 'store1',
      title: isRTL ? 'عرض خاص على صبغ الشعر' : 'Offre spéciale coloration',
      description: isRTL ? 'خصم 20% على جميع خدمات صبغ الشعر هذا الأسبوع' : '20% de réduction sur toutes les colorations cette semaine',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
      targetWilaya: isRTL ? 'الجزائر' : 'Alger',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      isActive: true,
      views: 245,
      clicks: 32,
      createdAt: '2024-06-01'
    }
  ]);

  // Filter booking notifications
  const bookingNotifications = notifications.filter(n => n.type === 'booking');

  const handleAddStaff = (newStaff: Omit<StaffMember, 'id' | 'createdAt'>) => {
    const staff: StaffMember = {
      ...newStaff,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setStaff(prev => [...prev, staff]);
  };

  const handleUpdateStaff = (id: string, updates: Partial<StaffMember>) => {
    setStaff(prev => prev.map(member => 
      member.id === id ? { ...member, ...updates } : member
    ));
  };

  const handleDeleteStaff = (id: string) => {
    setStaff(prev => prev.filter(member => member.id !== id));
  };

  const handleAddService = (newService: Omit<StoreService, 'id' | 'createdAt'>) => {
    const service: StoreService = {
      ...newService,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setServices(prev => [...prev, service]);
  };

  const handleUpdateService = (id: string, updates: Partial<StoreService>) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const handleDeleteService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleImagesChange = (images: StoreImage[]) => {
    setStoreImages(images);
  };

  const handleAddAd = (newAd: Omit<StoreAd, 'id' | 'createdAt' | 'views' | 'clicks'>) => {
    const ad: StoreAd = {
      ...newAd,
      id: Math.random().toString(36).substr(2, 9),
      views: 0,
      clicks: 0,
      createdAt: new Date().toISOString()
    };
    setAds(prev => [...prev, ad]);
  };

  const handleUpdateAd = (id: string, updates: Partial<StoreAd>) => {
    setAds(prev => prev.map(ad => 
      ad.id === id ? { ...ad, ...updates } : ad
    ));
  };

  const handleDeleteAd = (id: string) => {
    setAds(prev => prev.filter(ad => ad.id !== id));
  };

  // Test WhatsApp notification
  const testWhatsAppNotification = async () => {
    if (storeInfo.phone) {
      const testBooking = {
        service: services[0],
        staff: staff[0],
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        customer: {
          name: 'عميل تجريبي',
          email: 'test@example.com',
          phone: '+213555123456',
          notes: 'هذا اختبار لنظام الإشعارات'
        }
      };
      
      const success = await sendWhatsAppNotification(storeInfo.phone, testBooking, storeInfo.name);
      
      if (success) {
        alert(isRTL ? 'تم إرسال إشعار واتساب تجريبي بنجاح!' : 'Notification WhatsApp de test envoyée avec succès !');
      } else {
        alert(isRTL ? 'فشل إرسال إشعار واتساب التجريبي' : 'Échec de l\'envoi de la notification WhatsApp de test');
      }
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className={isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}>
              <p className="text-sm font-medium text-gray-600">
                {isRTL ? 'مواعيد اليوم' : 'RDV aujourd\'hui'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayBookings}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-amber-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
            <div className={isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}>
              <p className="text-sm font-medium text-gray-600">
                {isRTL ? 'إيرادات الأسبوع' : 'Revenus semaine'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.weeklyRevenue.toLocaleString()} {isRTL ? 'د.ج' : 'DA'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className={isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}>
              <p className="text-sm font-medium text-gray-600">
                {isRTL ? 'إجمالي العملاء' : 'Total clients'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div className={isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}>
              <p className="text-sm font-medium text-gray-600">
                {isRTL ? 'متوسط التقييم' : 'Note moyenne'}
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'مواعيد اليوم' : 'Rendez-vous d\'aujourd\'hui'}
            </h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} {isRTL ? 'جديد' : 'nouveau'}
              </span>
            )}
          </div>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-3' : 'space-x-3'}`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="font-medium text-gray-900">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                  </div>
                </div>
                <div className={isRTL ? 'text-left' : 'text-right'}>
                  <p className="font-medium text-gray-900">{booking.time}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === (isRTL ? 'مؤكد' : 'Confirmé')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Booking Notifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'إشعارات الحجز الجديدة' : 'Nouvelles notifications de réservation'}
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {bookingNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">{isRTL ? 'لا توجد إشعارات جديدة' : 'Aucune nouvelle notification'}</p>
              </div>
            ) : (
              bookingNotifications.slice(0, 5).map(notification => (
                <div key={notification.id} className={`p-4 border border-gray-200 rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                  <div className={`flex items-start justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {notification.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {notification.bookingData && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>{isRTL ? 'العميل:' : 'Client:'}</strong> {notification.bookingData.customerName}</p>
                      <p><strong>{isRTL ? 'الخدمة:' : 'Service:'}</strong> {notification.bookingData.serviceName}</p>
                      <p><strong>{isRTL ? 'الموعد:' : 'RDV:'}</strong> {notification.bookingData.date} - {notification.bookingData.time}</p>
                      {notification.bookingData.phone && (
                        <p><strong>{isRTL ? 'الهاتف:' : 'Tél:'}</strong> 
                          <a href={`tel:${notification.bookingData.phone}`} className="text-blue-600 hover:text-blue-700 ml-1">
                            {notification.bookingData.phone}
                          </a>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Notification Test */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {isRTL ? 'اختبار إشعارات واتساب' : 'Test des notifications WhatsApp'}
            </h3>
            <p className="text-gray-600 text-sm">
              {isRTL ? 'اختبر نظام إشعارات واتساب للتأكد من عمله بشكل صحيح' : 'Testez le système de notifications WhatsApp pour vérifier son bon fonctionnement'}
            </p>
          </div>
          <button
            onClick={testWhatsAppNotification}
            className={`px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Bell className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'اختبار الإشعارات' : 'Tester les notifications'}
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderServices = () => (
    <StoreServiceManager
      storeId="store1"
      storePlan={storeInfo.plan}
      services={services}
      onAddService={handleAddService}
      onUpdateService={handleUpdateService}
      onDeleteService={handleDeleteService}
    />
  );

  const renderStoreImages = () => (
    <StoreImageUploader
      storeId="store1"
      existingImages={storeImages}
      onImagesChange={handleImagesChange}
      maxImages={5}
    />
  );

  const renderAds = () => (
    <StoreAdManager
      storeId="store1"
      ads={ads}
      onAddAd={handleAddAd}
      onUpdateAd={handleUpdateAd}
      onDeleteAd={handleDeleteAd}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/10 via-gray-50 to-[#1A0000]/5">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <Link to="/" className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1A0000] to-[#2A0000] rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <span className="text-white font-bold text-xl">ص</span>
                </div>
              </Link>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <h1 className="text-2xl font-bold text-gray-900">{storeInfo.name}</h1>
                <div className={`flex items-center text-sm text-gray-600 ${isRTL ? 'space-x-reverse space-x-4 flex-row-reverse' : 'space-x-4'}`}>
                  <span>{storeInfo.type}</span>
                  <span>•</span>
                  <span>{isRTL ? 'باقة' : 'Forfait'} {storeInfo.plan}</span>
                  <span>•</span>
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span>{storeInfo.rating} ({storeInfo.totalReviews} {isRTL ? 'تقييم' : 'avis'})</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative">
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Settings className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'الإعدادات' : 'Paramètres'}
              </button>
              <Link to="/" className={`flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LogOut className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'تسجيل الخروج' : 'Déconnexion'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className={`flex ${isRTL ? 'space-x-reverse space-x-4 sm:space-x-8' : 'space-x-4 sm:space-x-8'}`}>
            {[
              { id: 'overview', label: isRTL ? 'نظرة عامة' : 'Vue d\'ensemble', icon: TrendingUp },
              { id: 'bookings', label: isRTL ? 'الحجوزات' : 'Réservations', icon: Calendar },
              { id: 'services', label: isRTL ? 'الخدمات' : 'Services', icon: Tag },
              { id: 'staff', label: isRTL ? 'الموظفين' : 'Personnel', icon: Users },
              { id: 'images', label: isRTL ? 'الصور' : 'Images', icon: ImageIcon },
              { id: 'ads', label: isRTL ? 'الإعلانات' : 'Publicités', icon: Bell },
              { id: 'reviews', label: isRTL ? 'التقييمات' : 'Évaluations', icon: Star },
              { id: 'settings', label: isRTL ? 'إعدادات المتجر' : 'Paramètres salon', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 flex items-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#1A0000] text-[#1A0000]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <tab.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'services' && renderServices()}
        {activeTab === 'staff' && (
          <StaffManagement
            storeId="store1"
            storePlan={storeInfo.plan}
            staff={staff}
            services={services}
            onAddStaff={handleAddStaff}
            onUpdateStaff={handleUpdateStaff}
            onDeleteStaff={handleDeleteStaff}
          />
        )}
        {activeTab === 'images' && renderStoreImages()}
        {activeTab === 'ads' && renderAds()}
        {activeTab === 'bookings' && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isRTL ? 'إدارة الحجوزات' : 'Gestion des réservations'}
            </h3>
            <p className="text-gray-500">
              {isRTL ? 'قريباً - ستتمكن من إدارة جميع حجوزاتك من هنا' : 'Bientôt - vous pourrez gérer toutes vos réservations ici'}
            </p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'تقييمات العملاء' : 'Évaluations clients'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Reviews will be displayed here */}
              <div className="text-center py-12 col-span-3">
                <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isRTL ? 'لا توجد تقييمات بعد' : 'Pas encore d\'évaluations'}
                </h3>
                <p className="text-gray-500">
                  {isRTL ? 'ستظهر تقييمات العملاء هنا بعد اكتمال الحجوزات' : 'Les évaluations des clients apparaîtront ici après les réservations complétées'}
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'إعدادات المتجر' : 'Paramètres du salon'}
            </h2>
            
            {/* WhatsApp Settings */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'إعدادات واتساب' : 'Paramètres WhatsApp'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'رقم واتساب المتجر' : 'Numéro WhatsApp du salon'}
                  </label>
                  <input
                    type="tel"
                    defaultValue={storeInfo.phone}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder="+213 555 123 456"
                  />
                  <p className={`text-sm text-gray-500 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'سيتم إرسال إشعارات الحجز الجديدة على هذا الرقم' : 'Les notifications de nouvelles réservations seront envoyées à ce numéro'}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium text-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'تفعيل إشعارات واتساب' : 'Activer les notifications WhatsApp'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};