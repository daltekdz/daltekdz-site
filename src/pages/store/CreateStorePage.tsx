import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Star, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const CreateStorePage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const plans = [
    {
      id: 'silver',
      name: 'Silver',
      icon: '🥈',
      price: isRTL ? '2,500 د.ج/شهر' : '2,500 DA/mois',
      features: [
        isRTL ? 'حتى 5 خدمات' : 'Jusqu\'à 5 services',
        isRTL ? 'لا توجد إعلانات' : 'Pas de publicités',
        isRTL ? 'دعم فني أساسي' : 'Support technique de base',
        isRTL ? 'صفحة متجر بسيطة' : 'Page salon simple'
      ],
      limitations: [
        isRTL ? 'لا توجد تقارير' : 'Pas de rapports',
        isRTL ? 'لا توجد إحصائيات متقدمة' : 'Pas de statistiques avancées'
      ],
      color: 'from-gray-400 to-gray-500',
      popular: false
    },
    {
      id: 'gold',
      name: 'Gold',
      icon: '🥇',
      price: isRTL ? '4,500 د.ج/شهر' : '4,500 DA/mois',
      features: [
        isRTL ? 'حتى 15 خدمة' : 'Jusqu\'à 15 services',
        isRTL ? 'صفحة متجر خاصة' : 'Page salon personnalisée',
        isRTL ? 'إمكانية تقييم العملاء' : 'Évaluations clients',
        isRTL ? 'دعم فني متقدم' : 'Support technique avancé',
        isRTL ? 'إدارة المواعيد' : 'Gestion des rendez-vous',
        isRTL ? 'تقارير أساسية' : 'Rapports de base'
      ],
      limitations: [],
      color: 'from-[#C8860D] to-[#D4941A]',
      popular: true
    },
    {
      id: 'platinum',
      name: 'Platinum',
      icon: '💎',
      price: isRTL ? '7,500 د.ج/شهر' : '7,500 DA/mois',
      features: [
        isRTL ? 'عدد خدمات غير محدود' : 'Services illimités',
        isRTL ? 'تقارير وتحليلات متقدمة' : 'Rapports et analyses avancés',
        isRTL ? 'إمكانية الإعلانات الممولة' : 'Publicités sponsorisées',
        isRTL ? 'صفحة احترافية مخصصة' : 'Page professionnelle personnalisée',
        isRTL ? 'دعم فني مخصص 24/7' : 'Support dédié 24/7',
        isRTL ? 'تكامل مع وسائل التواصل' : 'Intégration réseaux sociaux',
        isRTL ? 'إحصائيات مفصلة' : 'Statistiques détaillées',
        isRTL ? 'أولوية في نتائج البحث' : 'Priorité dans les résultats'
      ],
      limitations: [],
      color: 'from-[#1A0000] to-[#2A0000]',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/10 via-gray-50 to-[#1A0000]/5">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-center mb-8 sm:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            {isRTL ? 'اختر الباقة المناسبة' : 'Choisissez le forfait adapté'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A0000] to-[#C8860D]">
              {' '}{isRTL ? 'لمتجرك' : 'pour votre salon'}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL ? 'ابدأ رحلتك معنا واختر الباقة التي تناسب احتياجات عملك. يمكنك الترقية في أي وقت لاحقاً.' : 'Commencez votre parcours avec nous et choisissez le forfait qui correspond aux besoins de votre entreprise. Vous pouvez mettre à niveau à tout moment.'}
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                plan.popular ? 'border-[#C8860D] ring-4 ring-[#C8860D]/20' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {isRTL ? 'الأكثر شعبية' : 'Le plus populaire'}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Plan Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{plan.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{plan.name}</h3>
                  <div className={`text-xl sm:text-3xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    {plan.price}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Check className={`h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`} />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className={`flex items-center opacity-60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 flex items-center justify-center ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                        <div className="h-0.5 w-3 bg-gray-400"></div>
                      </div>
                      <span className="text-sm sm:text-base text-gray-500 line-through">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={`/create-store/setup?plan=${plan.id}`}
                  className={`w-full block text-center py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white hover:from-[#D4941A] hover:to-[#C8860D] shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.popular ? (isRTL ? 'ابدأ الآن' : 'Commencer maintenant') : (isRTL ? 'اختيار هذه الباقة' : 'Choisir ce forfait')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'مقارنة الميزات' : 'Comparaison des fonctionnalités'}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                {isRTL ? 'إدارة العملاء' : 'Gestion clients'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'تتبع بيانات العملاء وتاريخ الزيارات' : 'Suivi des données clients et historique des visites'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                {isRTL ? 'التقارير والإحصائيات' : 'Rapports et statistiques'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'تحليلات مفصلة لأداء متجرك' : 'Analyses détaillées des performances de votre salon'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                {isRTL ? 'نظام التقييمات' : 'Système d\'évaluations'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'تقييمات العملاء وبناء السمعة' : 'Évaluations clients et construction de réputation'}
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">
                {isRTL ? 'التسويق والإعلانات' : 'Marketing et publicité'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'أدوات تسويقية متقدمة لنمو عملك' : 'Outils marketing avancés pour développer votre activité'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'الأسئلة الشائعة' : 'Questions fréquentes'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {isRTL ? 'هل يمكنني تغيير الباقة لاحقاً؟' : 'Puis-je changer de forfait plus tard?'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'نعم، يمكنك الترقية أو التراجع في أي وقت من لوحة التحكم.' : 'Oui, vous pouvez mettre à niveau ou rétrograder à tout moment depuis le tableau de bord.'}
              </p>
            </div>
            
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {isRTL ? 'هل توجد رسوم إضافية؟' : 'Y a-t-il des frais supplémentaires?'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'لا توجد رسوم خفية. السعر المعروض شامل جميع الميزات.' : 'Aucun frais caché. Le prix affiché inclut toutes les fonctionnalités.'}
              </p>
            </div>
            
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {isRTL ? 'كيف يتم الدفع؟' : 'Comment se fait le paiement?'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'يمكنك الدفع شهرياً أو سنوياً مع خصم 20% للدفع السنوي.' : 'Vous pouvez payer mensuellement ou annuellement avec 20% de réduction pour le paiement annuel.'}
              </p>
            </div>
            
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                {isRTL ? 'هل يوجد دعم فني؟' : 'Y a-t-il un support technique?'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isRTL ? 'نعم، نوفر دعم فني متخصص لجميع الباقات.' : 'Oui, nous fournissons un support technique spécialisé pour tous les forfaits.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};