import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Star, TrendingUp, Users, Clock, Calendar, Phone } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';
import { useAdmin } from '../contexts/AdminContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import { getAllStores } from '../data/sampleStores';

export const StoresPage: React.FC = () => {
  const { isRTL, language } = useLanguage();
  const { userLocation, calculateDistance } = useLocation();
  const { getFeaturedStores } = useAdmin();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'distance' | 'bookings'>('featured');
  
  // Get all stores and featured stores
  const allStores = getAllStores();
  const featuredStores = getFeaturedStores();
  const featuredStoreIds = featuredStores.map(store => store.id);
  
  // Get unique wilayas and communes for filters
  const uniqueWilayas = [...new Set(allStores.map(store => 
    language === 'ar' ? store.wilaya : (store.wilayaFr || store.wilaya)
  ))];
  
  const uniqueCommunes = selectedWilaya 
    ? [...new Set(allStores
        .filter(store => 
          language === 'ar' 
            ? store.wilaya === selectedWilaya 
            : (store.wilayaFr || store.wilaya) === selectedWilaya
        )
        .map(store => store.address.split('،')[0])
      )]
    : [];
  
  // Filter stores based on search, wilaya, commune, and type
  const filteredStores = allStores.filter(store => {
    const matchesSearch = (store.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (store.nameFr && store.nameFr.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesWilaya = !selectedWilaya || 
                         (language === 'ar' 
                           ? store.wilaya === selectedWilaya 
                           : (store.wilayaFr || store.wilaya) === selectedWilaya);
    
    const matchesCommune = !selectedCommune || store.address.includes(selectedCommune);
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'men' && store.type.includes('men')) ||
                       (selectedType === 'women' && (store.type.includes('women') || store.type.includes('beauty')));
    
    return matchesSearch && matchesWilaya && matchesCommune && matchesType;
  });
  
  // Sort stores based on selected criteria
  const sortedStores = [...filteredStores].sort((a, b) => {
    // Always put featured stores first
    const aIsFeatured = featuredStoreIds.includes(a.id);
    const bIsFeatured = featuredStoreIds.includes(b.id);
    
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    
    // Then sort by the selected criteria
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'bookings') {
      return b.totalBookings - a.totalBookings;
    } else if (sortBy === 'distance' && userLocation && a.latitude && a.longitude && b.latitude && b.longitude) {
      const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distanceA - distanceB;
    }
    
    // Default sorting (by featured status)
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/5 via-gray-50 to-[#1A0000]/10">
      <Navbar />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A0000] to-[#2A0000] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {isRTL ? 'استكشف المتاجر' : 'Explorez les magasins'}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto"
            >
              {isRTL 
                ? 'اكتشف أفضل صالونات الحلاقة وعيادات التجميل في الجزائر'
                : 'Découvrez les meilleurs salons de coiffure et cliniques esthétiques en Algérie'
              }
            </motion.p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  onChange={(e) => {
                    setSelectedWilaya(e.target.value);
                    setSelectedCommune('');
                  }}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent appearance-none bg-white ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
                >
                  <option value="">{isRTL ? 'جميع الولايات' : 'Toutes les wilayas'}</option>
                  {uniqueWilayas.map((wilaya, index) => (
                    <option key={index} value={wilaya}>{wilaya}</option>
                  ))}
                </select>
              </div>

              {/* Commune Filter */}
              <div className="relative">
                <MapPin className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <select
                  value={selectedCommune}
                  onChange={(e) => setSelectedCommune(e.target.value)}
                  disabled={!selectedWilaya}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent appearance-none bg-white ${
                    !selectedWilaya ? 'opacity-50 cursor-not-allowed' : ''
                  } ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
                >
                  <option value="">{isRTL ? 'جميع المدن' : 'Toutes les communes'}</option>
                  {uniqueCommunes.map((commune, index) => (
                    <option key={index} value={commune}>{commune}</option>
                  ))}
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
                  onClick={() => setSortBy('featured')}
                  className={`flex items-center px-3 py-1 rounded-full text-xs ${
                    sortBy === 'featured'
                      ? 'bg-[#C8860D] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="h-3 w-3 mr-1" />
                  {isRTL ? 'المميزة' : 'En vedette'}
                </button>
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
          </motion.div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`flex items-center justify-between mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-bold text-gray-900">{isRTL ? 'نتائج البحث' : 'Résultats de recherche'}</h2>
              <p className="text-gray-600">
                {sortedStores.length} {isRTL ? 'متجر متاح' : 'magasins disponibles'}
                {userLocation && sortBy === 'distance' && (
                  <span className="text-[#C8860D] ml-2">
                    {isRTL ? '(مرتبة حسب المسافة)' : '(triés par distance)'}
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Stores Grid */}
          {sortedStores.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center py-16"
            >
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {isRTL ? 'لا توجد نتائج مطابقة' : 'Aucun résultat correspondant'}
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {isRTL 
                  ? 'لم نتمكن من العثور على متاجر تطابق معايير البحث الخاصة بك. يرجى تجربة معايير مختلفة.'
                  : 'Nous n\'avons pas pu trouver de magasins correspondant à vos critères de recherche. Veuillez essayer des critères différents.'
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStores.map((store, index) => {
                const isFeatured = featuredStoreIds.includes(store.id);
                const displayName = language === 'ar' ? store.name : (store.nameFr || store.name);
                const displayWilaya = language === 'ar' ? store.wilaya : (store.wilayaFr || store.wilaya);
                
                return (
                  <motion.div
                    key={store.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
                  >
                    {/* Featured Badge */}
                    {isFeatured && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {isRTL ? 'متجر مميز' : 'En vedette'}
                        </div>
                      </div>
                    )}

                    <div className="relative overflow-hidden h-48 sm:h-56">
                      <img
                        src={store.mainImage}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Store ID Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                          #{store.id.substring(0, 6)}
                        </span>
                      </div>
                      
                      {/* Rating Badge */}
                      <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                          <Star className="h-3 w-3 text-[#C8860D] fill-current" />
                          <span className={`text-xs font-bold text-gray-900 ${isRTL ? 'mr-1' : 'ml-1'}`}>{store.rating}</span>
                          <span className="text-xs text-gray-600">({store.totalReviews})</span>
                        </div>
                      </div>

                      {/* Store Type Badge */}
                      <div className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'}`}>
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          {store.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#C8860D] transition-colors">
                        {displayName}
                      </h3>
                      
                      <div className={`flex items-center text-gray-600 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin className={`h-4 w-4 text-[#C8860D] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        <span className="text-sm">{displayWilaya} - {store.address}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className={`flex items-center text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <span className="text-xs">{store.totalBookings} {isRTL ? 'حجز' : 'réservations'}</span>
                        </div>
                        
                        {userLocation && store.latitude && store.longitude && (
                          <div className={`flex items-center text-gray-500 justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                            <span className="text-xs">
                              {calculateDistance(
                                userLocation.latitude, 
                                userLocation.longitude, 
                                store.latitude, 
                                store.longitude
                              ).toFixed(1)} {isRTL ? 'كم' : 'km'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Link 
                        to={`/store/${store.id}`}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white rounded-lg font-medium hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {isRTL ? 'عرض المتجر' : 'Voir le salon'}
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoresPage;