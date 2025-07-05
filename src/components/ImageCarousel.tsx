import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

export const ImageCarousel: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // تعريف navigate

  const images = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Salon de coiffure masculin',
      titleAr: 'صالون حلاقة رجالي',
      category: 'Coiffure masculine',
      categoryAr: 'حلاقة رجالية'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Soins du visage professionnels',
      titleAr: 'عناية احترافية بالوجه',
      category: 'Soins esthétiques',
      categoryAr: 'عناية تجميلية'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Coiffure et coloration féminine',
      titleAr: 'تصفيف وصبغ الشعر النسائي',
      category: 'Coiffure féminine',
      categoryAr: 'تصفيف نسائي'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Maquillage professionnel',
      titleAr: 'مكياج احترافي',
      category: 'Maquillage',
      categoryAr: 'مكياج'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Soins des ongles',
      titleAr: 'عناية بالأظافر',
      category: 'Manucure & Pédicure',
      categoryAr: 'مانيكير وباديكير'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Barbier traditionnel',
      titleAr: 'حلاق تقليدي',
      category: 'Barbier',
      categoryAr: 'حلاقة تقليدية'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isRTL ? 'خدماتنا' : 'Nos'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A0000] to-[#C8860D]">
              {' '}{isRTL ? 'المميزة' : 'Services Premium'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL ? 'اكتشف تميز خدمات الجمال لدينا من خلال معرضنا' : 'Découvrez l\'excellence de nos services beauté à travers notre galerie'}
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Carousel Container */}
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={images[currentIndex].url}
                  alt={isRTL ? images[currentIndex].titleAr : images[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Content Overlay */}
                <div className={`absolute bottom-0 left-0 right-0 p-8 text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="inline-block px-4 py-2 bg-[#C8860D] text-white text-sm font-medium rounded-full mb-4">
                      {isRTL ? images[currentIndex].categoryAr : images[currentIndex].category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {isRTL ? images[currentIndex].titleAr : images[currentIndex].title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className={`absolute top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 ${isRTL ? 'right-4' : 'left-4'}`}
            >
              <ChevronLeft className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
            
            <button
              onClick={goToNext}
              className={`absolute top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 ${isRTL ? 'left-4' : 'right-4'}`}
            >
              <ChevronRight className={`h-6 w-6 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className={`flex justify-center mt-8 ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#1A0000] scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Service Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
                onClick={() => navigate(`/stores?service=${encodeURIComponent(image.category)}`)} // تم إضافة التنقل هنا
              >
                <div className="relative mb-4 mx-auto w-20 h-20 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                  <img
                    src={image.url}
                    alt={isRTL ? image.categoryAr : image.category}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0000]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className={`font-semibold text-gray-900 text-sm group-hover:text-[#1A0000] transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? image.categoryAr : image.category}
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
