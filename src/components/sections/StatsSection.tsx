import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, Heart, Calendar, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const StatsSection: React.FC = () => {
  const { isRTL } = useLanguage();

  // أرقام حقيقية ومنطقية لمنصة جديدة
  const stats = [
    { 
      icon: Users, 
      number: '15+', 
      label: isRTL ? 'صالون وعيادة' : 'Salons & Cliniques',
      color: 'from-blue-500 to-blue-600',
      description: isRTL ? 'في الجزائر العاصمة' : 'À Alger'
    },
    { 
      icon: Heart, 
      number: '200+', 
      label: isRTL ? 'عميل راضي' : 'Clients Satisfaits',
      color: 'from-[#C8860D] to-[#D4941A]',
      description: isRTL ? 'تجربة مميزة' : 'Expérience exceptionnelle'
    },
    { 
      icon: Calendar, 
      number: '500+', 
      label: isRTL ? 'حجز مكتمل' : 'Réservations Complétées',
      color: 'from-green-500 to-green-600',
      description: isRTL ? 'بنجاح تام' : 'Avec succès'
    },
    { 
      icon: Star, 
      number: '4.8', 
      label: isRTL ? 'تقييم المنصة' : 'Note Moyenne',
      color: 'from-yellow-500 to-orange-500',
      description: isRTL ? 'من أصل 5 نجوم' : 'Sur 5 étoiles',
      isRating: true
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isRTL ? 'أرقام تتحدث' : 'Des chiffres qui parlent'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {' '}{isRTL ? 'عن بدايتنا' : 'd\'eux-mêmes'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isRTL 
              ? 'بداية قوية لمنصة دالتكدز مع نمو مستمر وثقة متزايدة من عملائنا'
              : 'Un début solide pour Daltekdz avec une croissance continue et une confiance croissante de nos clients'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center bg-white rounded-3xl p-10 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              
              <div className={`flex items-center justify-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-5xl md:text-6xl font-bold text-gray-900 group-hover:text-[#C8860D] transition-colors duration-300">
                  {stat.number}
                </span>
                {stat.isRating && (
                  <Star className={`h-8 w-8 text-[#C8860D] fill-current ${isRTL ? 'mr-2' : 'ml-2'}`} />
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#C8860D] transition-colors duration-300">
                {stat.label}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Decorative element */}
              <div className={`mt-6 h-1 w-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#C8860D]/10 to-[#D4941A]/10 rounded-3xl p-8 border border-[#C8860D]/20">
            <div className={`flex items-center justify-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <TrendingUp className={`h-8 w-8 text-[#C8860D] ${isRTL ? 'ml-3' : 'mr-3'}`} />
              <h3 className="text-2xl font-bold text-gray-900">
                {isRTL ? 'نمو مستمر' : 'Croissance continue'}
              </h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto">
              {isRTL 
                ? 'منصة جديدة بطموحات كبيرة - ننمو يومياً مع انضمام المزيد من الصالونات والعملاء إلى عائلة دالتكدز'
                : 'Une nouvelle plateforme avec de grandes ambitions - nous grandissons chaque jour avec de nouveaux salons et clients qui rejoignent la famille Daltekdz'
              }
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};