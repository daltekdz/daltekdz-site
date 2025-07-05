import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useLocation } from '../contexts/LocationContext';

interface StoreCardProps {
  id: string;
  name: string;
  nameFr?: string;
  type: string;
  description: string;
  descriptionFr?: string;
  address: string;
  addressFr?: string;
  wilaya: string;
  wilayaFr?: string;
  rating: number;
  totalReviews: number;
  totalBookings: number;
  mainImage: string;
  latitude?: number;
  longitude?: number;
  index?: number;
}

export const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  nameFr,
  type,
  description,
  descriptionFr,
  address,
  addressFr,
  wilaya,
  wilayaFr,
  rating,
  totalReviews,
  totalBookings,
  mainImage,
  latitude,
  longitude,
  index = 0
}) => {
  const { isRTL, language } = useLanguage();
  const { userLocation, calculateDistance } = useLocation();
  
  const displayName = language === 'ar' ? name : (nameFr || name);
  const displayDescription = language === 'ar' ? description : (descriptionFr || description);
  const displayAddress = language === 'ar' ? address : (addressFr || address);
  const displayWilaya = language === 'ar' ? wilaya : (wilayaFr || wilaya);
  
  // Calculate distance if user location and store location are available
  const distance = userLocation && latitude && longitude
    ? calculateDistance(userLocation.latitude, userLocation.longitude, latitude, longitude)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
    >
      <div className="relative overflow-hidden h-48 sm:h-56">
        <img
          src={mainImage}
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Rating Badge */}
        <div className={`absolute bottom-3 sm:bottom-4 ${isRTL ? 'right-3 sm:right-4' : 'left-3 sm:left-4'}`}>
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-2 flex items-center">
            <Star className="h-3 sm:h-4 w-3 sm:w-4 text-[#C8860D] fill-current" />
            <span className={`text-xs sm:text-sm font-bold text-gray-900 ${isRTL ? 'mr-1' : 'ml-1'}`}>{rating}</span>
            <span className="text-xs text-gray-600">({totalReviews})</span>
          </div>
        </div>

        {/* Store Type Badge */}
        <div className={`absolute top-3 sm:top-4 ${isRTL ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {type}
          </span>
        </div>
      </div>
      
      <div className={`p-5 sm:p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-[#C8860D] transition-colors">
          {displayName}
        </h3>
        
        <div className={`flex items-center text-gray-600 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <MapPin className={`h-4 w-4 text-[#C8860D] ${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span className="text-sm">{displayWilaya} - {displayAddress}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{displayDescription}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`flex items-center text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
            <span className="text-xs">{totalBookings} {isRTL ? 'حجز' : 'réservations'}</span>
          </div>
          
          {distance !== null && (
            <div className={`flex items-center text-gray-500 justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
              <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
              <span className="text-xs">{distance.toFixed(1)} {isRTL ? 'كم' : 'km'}</span>
            </div>
          )}
        </div>
        
        <Link 
          to={`/store/${id}`}
          className={`w-full py-3 px-4 bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white rounded-lg font-medium hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isRTL ? 'عرض المتجر' : 'Voir le salon'}
        </Link>
      </div>
    </motion.div>
  );
};