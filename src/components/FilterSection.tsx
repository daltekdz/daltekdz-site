import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Filter, Search, Star, Users, Clock, ArrowRight, Heart, Calendar, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { wilayas, getWilayasSorted } from '../data/wilayas';

export const FilterSection: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const { userLocation, calculateDistance } = useLocation();
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const sortedWilayas = getWilayasSorted(language);

  const serviceCategories = {
    men: ['Coiffure', 'Taille barbe', 'Coloration masculine', 'Séance vapeur'],
    women: ['Nettoyage visage', 'Maquillage', 'Coloration féminine', 'Manucure', 'Pédicure', 'Laser']
  };

  // إزالة البيانات الوهمية - سيتم جلب البيانات الحقيقية من قاعدة البيانات
  const mockSalons: any[] = [];

  const filteredSalons = mockSalons.filter(salon => {
    if (selectedGender !== 'all' && salon.type !== selectedGender) return false;
    return true;
  });

  const sortedSalons = userLocation 
    ? [...filteredSalons].sort((a, b) => {
        const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      })
    : filteredSalons;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isRTL ? 'اعثر على' : 'Trouvez'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {' '}{isRTL ? 'المكان المثالي' : 'l\'endroit parfait'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL 
              ? 'استخدم الفلاتر المتقدمة للعثور على أفضل الصالونات والعيادات في منطقتك'
              : 'Utilisez les filtres avancés pour trouver les meilleurs salons et cliniques dans votre région'
            }
          </p>
        </motion.div>

        {/* Enhanced Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Service Type */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'ابحث عن خدمة' : 'Rechercher un service'}
              </label>
              <div className="relative">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  placeholder={isRTL ? 'حلاقة، مكياج، تنظيف بشرة...' : 'Coiffure, maquillage, soins...'}
                  className={`w-full py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8860D] focus:border-transparent text-base ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'الموقع' : 'Localisation'}
              </label>
              <div className="relative">
                <MapPin className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                <select
                  value={selectedWilaya}
                  onChange={(e) => setSelectedWilaya(e.target.value)}
                  className={`w-full py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8860D] focus:border-transparent text-base appearance-none bg-white ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                >
                  <option value="">{isRTL ? 'جميع الولايات' : 'Toutes les wilayas'}</option>
                  {sortedWilayas.map(wilaya => (
                    <option key={wilaya.id} value={wilaya.id}>
                      {isRTL ? wilaya.nameAr : wilaya.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'التاريخ' : 'Date'}
              </label>
              <div className="relative">
                <Calendar className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${isRTL ? 'right-4' : 'left-4'}`} />
                <input
                  type="date"
                  className={`w-full py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#C8860D] focus:border-transparent text-base ${isRTL ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className={`w-full bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white py-4 px-6 rounded-xl font-semibold text-base hover:from-[#D4941A] hover:to-[#C8860D] transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Search className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'بحث' : 'Rechercher'}
              </button>
            </div>
          </div>

          {/* Gender Filter */}
          <div className={`mt-6 pt-6 border-t border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm font-medium text-gray-700 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                {isRTL ? 'الفئة:' : 'Catégorie:'}
              </span>
              <div className="grid grid-cols-3 gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setSelectedGender('all')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedGender === 'all'
                      ? 'bg-white text-[#C8860D] shadow-sm'
                      : 'text-gray-600 hover:text-[#C8860D]'
                  }`}
                >
                  {isRTL ? 'الكل' : 'Tous'}
                </button>
                <button
                  onClick={() => setSelectedGender('men')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedGender === 'men'
                      ? 'bg-white text-[#C8860D] shadow-sm'
                      : 'text-gray-600 hover:text-[#C8860D]'
                  }`}
                >
                  👨‍🦱 {isRTL ? 'رجال' : 'Hommes'}
                </button>
                <button
                  onClick={() => setSelectedGender('women')}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedGender === 'women'
                      ? 'bg-white text-[#C8860D] shadow-sm'
                      : 'text-gray-600 hover:text-[#C8860D]'
                  }`}
                >
                  👩‍🦰 {isRTL ? 'نساء' : 'Femmes'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-2xl font-bold text-gray-900">{isRTL ? 'النتائج المتاحة' : 'Résultats disponibles'}</h3>
            <p className="text-gray-600">
              {sortedSalons.length} {isRTL ? 'صالون وعيادة متاحة' : 'salons et cliniques disponibles'}
              {userLocation && (
                <span className="text-[#C8860D] ml-2">
                  {isRTL ? '(مرتبة حسب القرب منك)' : '(triés par proximité)'}
                </span>
              )}
            </p>
          </div>
        </motion.div>

        {/* No Results Message */}
        {sortedSalons.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? 'لا توجد نتائج حالياً' : 'Aucun résultat pour le moment'}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isRTL 
                ? 'نعمل على إضافة المزيد من الصالونات والعيادات إلى منصتنا. تابعونا قريباً!'
                : 'Nous travaillons à ajouter plus de salons et cliniques à notre plateforme. Restez à l\'écoute!'
              }
            </p>
            <button className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#D4941A] hover:to-[#C8860D] transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
              {isRTL ? 'إشعرني عند التوفر' : 'M\'avertir quand disponible'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};