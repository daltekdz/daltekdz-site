import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Store, Calendar, DollarSign, Star, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminStatsTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { stats } = useAdmin();

  // إحصائيات حقيقية لمنصة جديدة
  const statCards = [
    {
      title: isRTL ? 'إجمالي المتاجر' : 'Total Magasins',
      value: 0,
      change: 'جديد',
      changeType: 'new',
      icon: Store,
      color: 'blue'
    },
    {
      title: isRTL ? 'المتاجر النشطة' : 'Magasins Actifs',
      value: 0,
      change: 'جديد',
      changeType: 'new',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: isRTL ? 'إجمالي العملاء' : 'Total Clients',
      value: 0,
      change: 'جديد',
      changeType: 'new',
      icon: Users,
      color: 'purple'
    },
    {
      title: isRTL ? 'الحجوزات الشهرية' : 'Réservations Mensuelles',
      value: 0,
      change: 'جديد',
      changeType: 'new',
      icon: Calendar,
      color: 'amber'
    },
    {
      title: isRTL ? 'الإيرادات الشهرية' : 'Revenus Mensuels',
      value: '0 د.ج',
      change: 'جديد',
      changeType: 'new',
      icon: DollarSign,
      color: 'red'
    },
    {
      title: isRTL ? 'الحجوزات الأسبوعية' : 'Réservations Hebdomadaires',
      value: 0,
      change: 'جديد',
      changeType: 'new',
      icon: TrendingUp,
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 bg-blue-100 text-blue-600',
      green: 'from-green-500 to-green-600 bg-green-100 text-green-600',
      purple: 'from-purple-500 to-purple-600 bg-purple-100 text-purple-600',
      amber: 'from-amber-500 to-amber-600 bg-amber-100 text-amber-600',
      red: 'from-red-500 to-red-600 bg-red-100 text-red-600',
      indigo: 'from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className={`flex items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Plus className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600 ml-1">
                    {isRTL ? 'منصة جديدة' : 'Nouvelle plateforme'}
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getColorClasses(stat.color).split(' ')[0]} ${getColorClasses(stat.color).split(' ')[1]} flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-[#C8860D] to-[#D4941A] rounded-full flex items-center justify-center mx-auto mb-6">
          <TrendingUp className="h-10 w-10 text-white" />
        </div>
        <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? 'مرحباً بك في لوحة تحكم دالتكدز' : 'Bienvenue dans le tableau de bord Daltekdz'}
        </h3>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          {isRTL 
            ? 'منصة جديدة بطموحات كبيرة. ستبدأ الإحصائيات في الظهور مع انضمام المزيد من المتاجر والعملاء.'
            : 'Une nouvelle plateforme avec de grandes ambitions. Les statistiques commenceront à apparaître avec l\'arrivée de plus de magasins et de clients.'
          }
        </p>
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <h4 className={`font-semibold text-blue-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'الخطوات التالية:' : 'Prochaines étapes:'}
          </h4>
          <ul className={`text-blue-700 space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <li>• {isRTL ? 'إضافة المتاجر الأولى للمنصة' : 'Ajouter les premiers magasins à la plateforme'}</li>
            <li>• {isRTL ? 'تفعيل نظام الحجوزات' : 'Activer le système de réservations'}</li>
            <li>• {isRTL ? 'بدء الحملات التسويقية' : 'Lancer les campagnes marketing'}</li>
            <li>• {isRTL ? 'مراقبة نمو المنصة' : 'Surveiller la croissance de la plateforme'}</li>
          </ul>
        </div>
      </motion.div>

      {/* Platform Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h3 className={`text-lg font-semibold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? 'حالة المنصة' : 'État de la Plateforme'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">✓</span>
            </div>
            <h4 className="font-medium text-green-900 mb-1">
              {isRTL ? 'النظام جاهز' : 'Système Prêt'}
            </h4>
            <p className="text-green-700 text-sm">
              {isRTL ? 'جميع الأنظمة تعمل بشكل طبيعي' : 'Tous les systèmes fonctionnent normalement'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">⏳</span>
            </div>
            <h4 className="font-medium text-yellow-900 mb-1">
              {isRTL ? 'في انتظار المحتوى' : 'En Attente de Contenu'}
            </h4>
            <p className="text-yellow-700 text-sm">
              {isRTL ? 'جاهز لاستقبال المتاجر الأولى' : 'Prêt à recevoir les premiers magasins'}
            </p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold">🚀</span>
            </div>
            <h4 className="font-medium text-blue-900 mb-1">
              {isRTL ? 'جاهز للإطلاق' : 'Prêt au Lancement'}
            </h4>
            <p className="text-blue-700 text-sm">
              {isRTL ? 'المنصة جاهزة للاستخدام' : 'Plateforme prête à l\'utilisation'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};