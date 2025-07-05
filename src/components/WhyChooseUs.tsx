import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, Star, MapPin, Users, Heart, Zap, Award, CheckCircle, Smartphone, Calendar, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: isRTL ? 'حجز فوري' : 'Réservation instantanée',
      description: isRTL ? 'احجز موعدك في ثوانٍ معدودة' : 'Réservez votre rendez-vous en quelques secondes',
      color: 'from-[#C8860D] to-[#D4941A]'
    },
    {
      icon: Shield,
      title: isRTL ? 'أمان مضمون' : 'Sécurité garantie',
      description: isRTL ? 'جميع الصالونات معتمدة ومرخصة' : 'Tous les salons sont certifiés et agréés',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: isRTL ? 'تقييمات حقيقية' : 'Avis authentiques',
      description: isRTL ? 'تقييمات من عملاء حقيقيين' : 'Évaluations de vrais clients',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: isRTL ? 'أقرب إليك' : 'Plus proche de vous',
      description: isRTL ? 'اعثر على أقرب صالون في منطقتك' : 'Trouvez le salon le plus proche dans votre région',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: isRTL ? 'خبراء محترفون' : 'Experts professionnels',
      description: isRTL ? 'مختصون ذوو خبرة عالية' : 'Spécialistes hautement expérimentés',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Smartphone,
      title: isRTL ? 'سهولة الاستخدام' : 'Facilité d\'utilisation',
      description: isRTL ? 'تطبيق بسيط وسهل الاستخدام' : 'Application simple et facile à utiliser',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const stats = [
    { number: '500+', label: isRTL ? 'صالون وعيادة' : 'Salons & Cliniques', icon: Users },
    { number: '10K+', label: isRTL ? 'عميل راضي' : 'Clients Satisfaits', icon: Heart },
    { number: '50K+', label: isRTL ? 'حجز مكتمل' : 'Réservations Complétées', icon: Calendar },
    { number: '4.9', label: isRTL ? 'تقييم المنصة' : 'Note Moyenne', isRating: true, icon: Star }
  ];

  const steps = [
    { 
      step: '1', 
      title: isRTL ? 'ابحث' : 'Recherchez', 
      description: isRTL ? 'ابحث عن الخدمة والموقع المناسب' : 'Recherchez le service et l\'emplacement appropriés',
      icon: MapPin
    },
    { 
      step: '2', 
      title: isRTL ? 'اختر' : 'Choisissez', 
      description: isRTL ? 'اختر الصالون والوقت المناسب' : 'Choisissez le salon et l\'heure qui vous conviennent',
      icon: Calendar
    },
    { 
      step: '3', 
      title: isRTL ? 'احجز' : 'Réservez', 
      description: isRTL ? 'أكمل الحجز بضغطات قليلة' : 'Complétez la réservation en quelques clics',
      icon: CheckCircle
    },
    { 
      step: '4', 
      title: isRTL ? 'استمتع' : 'Profitez', 
      description: isRTL ? 'استمتع بخدمة عالية الجودة' : 'Profitez d\'un service de haute qualité',
      icon: Star
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {isRTL ? 'لماذا تختار' : 'Pourquoi choisir'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {' '}Daltekdz{isRTL ? '؟' : '?'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'نحن نقدم تجربة حجز استثنائية مع أفضل الخدمات والمعايير في الجزائر'
              : 'Nous offrons une expérience de réservation exceptionnelle avec les meilleurs services et standards en Algérie'
            }
          </p>
        </motion.div>

        {/* Stats Section - مثل Booksy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#C8860D] to-[#D4941A] flex items-center justify-center shadow-lg">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className={`flex items-center justify-center mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  {stat.number}
                </span>
                {stat.isRating && (
                  <Star className={`h-8 w-8 text-[#C8860D] fill-current ${isRTL ? 'mr-2' : 'ml-2'}`} />
                )}
              </div>
              <p className="text-gray-600 font-medium text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid - مثل Booksy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#C8860D] transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                {feature.title}
              </h3>
              
              <p className={`text-gray-600 leading-relaxed text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* How It Works Section - مثل Booksy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-16 shadow-xl mb-20 border border-gray-100"
        >
          <h3 className={`text-4xl font-bold text-gray-900 text-center mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'كيف يعمل Daltekdz؟' : 'Comment fonctionne Daltekdz?'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {steps.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center ${isRTL ? 'text-right' : 'text-left'} group`}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-[#C8860D] to-[#D4941A] opacity-30"></div>
                  )}
                </div>
                <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-[#C8860D]/10 group-hover:to-[#D4941A]/10 transition-all duration-300">
                  <item.icon className="h-8 w-8 text-gray-600 group-hover:text-[#C8860D] transition-colors duration-300" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#C8860D] transition-colors duration-300">{item.title}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action - مثل Booksy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#C8860D] via-[#D4941A] to-[#C8860D] rounded-3xl p-16 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-20 translate-y-20"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            </div>
            
            <div className={`relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                {isRTL ? 'جاهز لتجربة الفرق؟' : 'Prêt à découvrir la différence?'}
              </h3>
              <p className="text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                {isRTL 
                  ? 'انضم إلى آلاف العملاء الراضين واحجز موعدك الأول اليوم مع أفضل الصالونات في الجزائر'
                  : 'Rejoignez des milliers de clients satisfaits et réservez votre premier rendez-vous aujourd\'hui avec les meilleurs salons d\'Algérie'
                }
              </p>
              <div className={`flex flex-col sm:flex-row gap-6 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button className={`bg-white text-[#C8860D] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className={`h-6 w-6 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {isRTL ? 'احجز موعدك الآن' : 'Réserver maintenant'}
                </button>
                <button className={`border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-[#C8860D] transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className={`h-6 w-6 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  {isRTL ? 'اتصل بنا' : 'Nous contacter'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};