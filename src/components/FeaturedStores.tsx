import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAdmin } from '../contexts/AdminContext';

export const FeaturedStores: React.FC = () => {
  const { isRTL } = useLanguage();
  const { getFeaturedStores } = useAdmin();
  
  const featuredStores = getFeaturedStores();
  
  if (featuredStores.length === 0) {
    return null; // Don't render the section if there are no featured stores
  }

  return (
    <section className="py-12 bg-gradient-to-br from-[#1A0000]/5 to-[#C8860D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {isRTL ? '⭐ المتاجر المميزة' : '⭐ Magasins en vedette'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL 
              ? 'اكتشف أفضل المتاجر والصالونات المميزة في منصتنا'
              : 'Découvrez les meilleurs magasins et salons en vedette sur notre plateforme'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative"
            >
              {/* Featured Badge */}
              <div className="absolute top-3 right-3 z-10">
                <div className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {isRTL ? 'متجر مميز' : 'En vedette'}
                </div>
              </div>

              <div className="relative overflow-hidden h-48 sm:h-56">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A0000]/80 to-[#C8860D]/50 opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                <img
                  src={`https://images.pexels.com/photos/${1813272 + index * 100}/pexels-photo-${1813272 + index * 100}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className={`absolute bottom-3 ${isRTL ? 'right-3' : 'left-3'}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-[#C8860D] fill-current" />
                    <span className={`text-xs font-bold text-gray-900 ${isRTL ? 'mr-1' : 'ml-1'}`}>{store.rating}</span>
                    <span className="text-xs text-gray-600">({store.totalReviews})</span>
                  </div>
                </div>
              </div>
              
              <div className={`p-5 ${isRTL ? 'text-right' : 'text-left'}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#C8860D] transition-colors">
                  {store.name}
                </h3>
                
                <div className={`flex items-center text-gray-600 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className={`h-4 w-4 text-[#C8860D] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  <span className="text-sm">{store.address}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className={`flex items-center text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span className="text-xs">{store.totalBookings} {isRTL ? 'حجز' : 'réservations'}</span>
                  </div>
                  
                  <div className={`flex items-center text-gray-500 justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Phone className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span className="text-xs">{store.phone}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/store/${store.id}`}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white rounded-lg font-medium hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isRTL ? 'عرض المتجر' : 'Voir le salon'}
                  <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};