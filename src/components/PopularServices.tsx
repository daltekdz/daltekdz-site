import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Palette, Sparkles, Heart, Clock, Star, ArrowRight, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const PopularServices: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: isRTL ? 'حلاقة رجالية كلاسيكية' : 'Coupe masculine classique',
      description: isRTL ? 'قص شعر احترافي مع تشطيب نهائي' : 'Coupe professionnelle avec finition',
      price: '800',
      duration: '30',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Scissors,
      rating: 4.8,
      bookings: 1250,
      color: 'from-blue-500 to-blue-600',
      category: isRTL ? 'رجالي' : 'Homme',
      trending: true
    },
    {
      id: 2,
      name: isRTL ? 'تنظيف البشرة العميق' : 'Nettoyage facial profond',
      description: isRTL ? 'تنظيف عميق وتقشير للبشرة' : 'Nettoyage en profondeur et exfoliation',
      price: '3500',
      duration: '75',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Sparkles,
      rating: 4.9,
      bookings: 890,
      color: 'from-[#C8860D] to-[#D4941A]',
      category: isRTL ? 'عناية بالبشرة' : 'Soins visage',
      trending: false
    },
    {
      id: 3,
      name: isRTL ? 'صبغة وهايلايت' : 'Coloration et mèches',
      description: isRTL ? 'صبغ الشعر مع هايلايت احترافي' : 'Coloration avec mèches professionnelles',
      price: '4500',
      duration: '120',
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Palette,
      rating: 4.7,
      bookings: 670,
      color: 'from-purple-500 to-pink-500',
      category: isRTL ? 'نسائي' : 'Femme',
      trending: true
    },
    {
      id: 4,
      name: isRTL ? 'مانيكير وباديكير' : 'Manucure et pédicure',
      description: isRTL ? 'عناية كاملة بالأظافر' : 'Soin complet des ongles',
      price: '2000',
      duration: '60',
      image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Heart,
      rating: 4.8,
      bookings: 1100,
      color: 'from-pink-500 to-rose-500',
      category: isRTL ? 'أظافر' : 'Ongles',
      trending: false
    },
    {
      id: 5,
      name: isRTL ? 'ترتيب اللحية' : 'Taille de barbe',
      description: isRTL ? 'تهذيب وتشكيل اللحية بشكل احترافي' : 'Taille et modelage professionnel',
      price: '500',
      duration: '20',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Scissors,
      rating: 4.6,
      bookings: 980,
      color: 'from-gray-600 to-gray-700',
      category: isRTL ? 'رجالي' : 'Homme',
      trending: false
    },
    {
      id: 6,
      name: isRTL ? 'مكياج مناسبات' : 'Maquillage événements',
      description: isRTL ? 'مكياج احترافي للمناسبات الخاصة' : 'Maquillage professionnel pour occasions spéciales',
      price: '4000',
      duration: '90',
      image: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: Palette,
      rating: 4.9,
      bookings: 560,
      color: 'from-red-500 to-pink-500',
      category: isRTL ? 'مكياج' : 'Maquillage',
      trending: true
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 sm:mb-16 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            {isRTL ? 'الخدمات' : 'Services'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {' '}{isRTL ? 'الأكثر طلباً' : 'les plus demandés'}
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            {isRTL 
              ? 'اكتشف أشهر الخدمات المحجوزة على منصتنا واحجز موعدك الآن'
              : 'Découvrez les services les plus réservés sur notre plateforme et prenez votre rendez-vous maintenant'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
            >
              {service.trending && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {isRTL ? 'رائج' : 'Tendance'}
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    {service.category}
                  </span>
                </div>

                <div className={`absolute bottom-3 sm:bottom-4 ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-2 flex items-center">
                    <Star className="h-3 sm:h-4 w-3 sm:w-4 text-[#C8860D] fill-current" />
                    <span className={`text-xs sm:text-sm font-bold text-gray-900 ${isRTL ? 'mr-1' : 'ml-1'}`}>{service.rating}</span>
                  </div>
                </div>

                <div className={`absolute bottom-3 sm:bottom-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'} bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow`}>
                  <service.icon className="h-4 sm:h-5 w-4 sm:w-5 text-gray-700" />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-4">{service.description}</p>

                <div className="flex items-center justify-between text-sm sm:text-base text-gray-700 font-medium">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{service.duration} {isRTL ? 'د' : 'min'}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{service.price} DA</span>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => navigate('/salons')}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white text-sm sm:text-base font-semibold rounded-full hover:opacity-90 transition-all duration-300"
                  >
                    {isRTL ? 'احجز الآن' : 'Réserver'}
                    <ArrowRight className="h-4 w-4 ml-2 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
