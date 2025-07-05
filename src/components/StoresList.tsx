import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { StoreCard } from './StoreCard';
import { getAllStores } from '../data/sampleStores';

export const StoresList: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const { userLocation, sortByDistance } = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'bookings'>('rating');
  
  const allStores = getAllStores();
  
  // Filter stores based on search, wilaya, and type
  const filteredStores = allStores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (store.nameFr && store.nameFr.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesWilaya = !selectedWilaya || store.wilaya === selectedWilaya || store.wilayaFr === selectedWilaya;
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'men' && store.type.includes('men')) ||
                       (selectedType === 'women' && (store.type.includes('women') || store.type.includes('beauty')));
    
    return matchesSearch && matchesWilaya && matchesType;
  });
  
  // Sort stores based on selected criteria
  const sortedStores = [...filteredStores].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'bookings') {
      return b.totalBookings - a.totalBookings;
    } else if (sortBy === 'distance' && userLocation && a.latitude && a.longitude && b.latitude && b.longitude) {
      const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distanceA - distanceB;
    }
    return 0;
  });
  
  // Calculate distance between two points
  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {isRTL ? 'اكتشف أفضل' : 'Découvrez les meilleurs'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A0000] to-[#C8860D]">
              {' '}{isRTL ? 'الصالونات والعيادات' : 'salons et cliniques'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL 
              ? 'تصفح مجموعة متنوعة من أفضل صالونات الحلاقة وعيادات التجميل في الجزائر'
              : 'Parcourez une variété des meilleurs salons de coiffure et cliniques esthétiques en Algérie'
            }
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={isRTL ? 'ابحث عن صالون أو عيادة...' : 'Rechercher un salon ou une clinique...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
              />
            </div>

            {/* Wilaya Filter */}
            <div className="relative">
              <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <select
                value={selectedWilaya}
                onChange={(e) => setSelectedWilaya(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent appearance-none bg-white ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
              >
                <option value="">{isRTL ? 'جميع الولايات' : 'Toutes les wilayas'}</option>
                <option value="الجزائر">{isRTL ? 'الجزائر' : 'Alger'}</option>
                <option value="وهران">{isRTL ? 'وهران' : 'Oran'}</option>
                <option value="قسنطينة">{isRTL ? 'قسنطينة' : 'Constantine'}</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                  selectedType === 'all'
                    ? 'bg-[#1A0000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isRTL ? 'الكل' : 'Tous'}
              </button>
              <button
                onClick={() => setSelectedType('men')}
                className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                  selectedType === 'men'
                    ? 'bg-[#1A0000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isRTL ? 'رجالي' : 'Homme'}
              </button>
              <button
                onClick={() => setSelectedType('women')}
                className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                  selectedType === 'women'
                    ? 'bg-[#1A0000] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isRTL ? 'نسائي' : 'Femme'}
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className={`mt-4 flex items-center ${isRTL ? 'justify-end' : 'justify-start'}`}>
            <span className="text-sm text-gray-600 mr-2">{isRTL ? 'ترتيب حسب:' : 'Trier par:'}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy('rating')}
                className={`flex items-center px-3 py-1 rounded-full text-xs ${
                  sortBy === 'rating'
                    ? 'bg-[#C8860D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star className="h-3 w-3 mr-1" />
                {isRTL ? 'التقييم' : 'Note'}
              </button>
              {userLocation && (
                <button
                  onClick={() => setSortBy('distance')}
                  className={`flex items-center px-3 py-1 rounded-full text-xs ${
                    sortBy === 'distance'
                      ? 'bg-[#C8860D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  {isRTL ? 'المسافة' : 'Distance'}
                </button>
              )}
              <button
                onClick={() => setSortBy('bookings')}
                className={`flex items-center px-3 py-1 rounded-full text-xs ${
                  sortBy === 'bookings'
                    ? 'bg-[#C8860D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                {isRTL ? 'الشعبية' : 'Popularité'}
              </button>
            </div>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStores.map((store, index) => (
            <StoreCard
              key={store.id}
              id={store.id}
              name={store.name}
              nameFr={store.nameFr}
              type={store.type}
              description={store.description}
              descriptionFr={store.descriptionFr}
              address={store.address}
              addressFr={store.addressFr}
              wilaya={store.wilaya}
              wilayaFr={store.wilayaFr}
              rating={store.rating}
              totalReviews={store.totalReviews}
              totalBookings={store.totalBookings}
              mainImage={store.mainImage}
              latitude={store.latitude}
              longitude={store.longitude}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {sortedStores.length === 0 && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isRTL ? 'لا توجد نتائج' : 'Aucun résultat'}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {isRTL 
                ? 'لم نتمكن من العثور على متاجر تطابق معايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.'
                : 'Nous n\'avons pas pu trouver de magasins correspondant à vos critères de recherche. Veuillez essayer des critères différents.'
              }
            </p>
          </div>
        )}
      </div>
    </section>
  );
};