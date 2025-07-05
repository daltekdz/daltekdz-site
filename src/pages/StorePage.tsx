import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Calendar, Clock, Users, Heart, Share, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { StoreStaffDisplay } from '../components/StoreStaffDisplay';
import { getStoreById, getStoreImagesById, getStoreServicesById, getStoreStaffById, getStaffReviewsById } from '../data/sampleStores';
import { ServiceSelection } from '../components/ServiceSelection';
import { StaffSelection } from '../components/StaffSelection';
import { DateTimeSelection } from '../components/DateTimeSelection';
import { CustomerForm } from '../components/CustomerForm';
import { BookingConfirmation } from '../components/BookingConfirmation';
import { BookingDetails, BookingStep } from '../types/booking';

export const StorePage: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { isRTL, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'services' | 'staff' | 'reviews' | 'info'>('services');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Booking flow state
  const [showBooking, setShowBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [booking, setBooking] = useState<BookingDetails>({
    service: null,
    staff: null,
    date: '',
    time: '',
    customer: {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  });
  
  const [steps, setSteps] = useState<BookingStep[]>([
    { id: 1, title: 'الخدمة', completed: false, active: true },
    { id: 2, title: 'المختص', completed: false, active: false },
    { id: 3, title: 'التاريخ والوقت', completed: false, active: false },
    { id: 4, title: 'بياناتك', completed: false, active: false },
    { id: 5, title: 'التأكيد', completed: false, active: false }
  ]);
  
  const store = storeId ? getStoreById(storeId) : null;
  const storeImages = storeId ? getStoreImagesById(storeId) : [];
  const storeServices = storeId ? getStoreServicesById(storeId) : [];
  const storeStaff = storeId ? getStoreStaffById(storeId) : [];
  
  const mainImage = storeImages.find(img => img.isMain)?.url || storeImages[0]?.url || '';
  
  useEffect(() => {
    if (mainImage) {
      setSelectedImage(mainImage);
    }
  }, [mainImage]);
  
  const staffReviews = storeStaff.flatMap(staff => getStaffReviewsById(staff.id));
  
  const updateSteps = (stepIndex: number) => {
    const newSteps = steps.map((step, index) => ({
      ...step,
      completed: index < stepIndex,
      active: index === stepIndex
    }));
    setSteps(newSteps);
  };

  // Auto-progress to next step when a selection is made
  useEffect(() => {
    if (currentStep === 0 && booking.service) {
      setTimeout(() => {
        handleNext();
      }, 300); // Small delay for better UX
    } else if (currentStep === 1 && booking.staff) {
      setTimeout(() => {
        handleNext();
      }, 300);
    } else if (currentStep === 2 && booking.date && booking.time) {
      setTimeout(() => {
        handleNext();
      }, 300);
    } else if (currentStep === 3 && 
               booking.customer.name && 
               booking.customer.email && 
               booking.customer.phone) {
      setTimeout(() => {
        handleNext();
      }, 300);
    }
  }, [booking, currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateSteps(nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateSteps(prevStep);
    }
  };

  const handleStartBooking = () => {
    setShowBooking(true);
    setCurrentStep(0);
    updateSteps(0);
    window.scrollTo(0, 0);
  };

  const handleNewBooking = () => {
    setShowBooking(false);
    setCurrentStep(0);
    setBooking({
      service: null,
      staff: null,
      date: '',
      time: '',
      customer: {
        name: '',
        email: '',
        phone: '',
        notes: ''
      }
    });
    updateSteps(0);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return booking.service !== null;
      case 1:
        return booking.staff !== null;
      case 2:
        return booking.date !== '' && booking.time !== '';
      case 3:
        return booking.customer.name !== '' && 
               booking.customer.email !== '' && 
               booking.customer.phone !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ServiceSelection
            selectedService={booking.service}
            onServiceSelect={(service) => setBooking({ ...booking, service })}
          />
        );
      case 1:
        return (
          <StaffSelection
            selectedStaff={booking.staff}
            onStaffSelect={(staff) => setBooking({ ...booking, staff })}
            serviceId={booking.service?.id}
            storeStaff={storeStaff}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            selectedDate={booking.date}
            selectedTime={booking.time}
            onDateSelect={(date) => setBooking({ ...booking, date })}
            onTimeSelect={(time) => setBooking({ ...booking, time })}
          />
        );
      case 3:
        return (
          <CustomerForm
            customerInfo={booking.customer}
            onCustomerInfoChange={(customer) => setBooking({ ...booking, customer })}
          />
        );
      case 4:
        return (
          <BookingConfirmation
            booking={booking}
            onNewBooking={handleNewBooking}
            storeName={store?.name}
            storePhone={store?.phone}
          />
        );
      default:
        return null;
    }
  };
  
  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isRTL ? 'المتجر غير موجود' : 'Salon non trouvé'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isRTL ? 'لم نتمكن من العثور على المتجر المطلوب' : 'Nous n\'avons pas pu trouver le salon demandé'}
          </p>
          <Link
            to="/stores"
            className="bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200"
          >
            {isRTL ? 'العودة إلى المتاجر' : 'Retour aux salons'}
          </Link>
        </div>
      </div>
    );
  }
  
  const displayName = language === 'ar' ? store.name : (store.nameFr || store.name);
  const displayDescription = language === 'ar' ? store.description : (store.descriptionFr || store.description);
  const displayAddress = language === 'ar' ? store.address : (store.addressFr || store.address);
  const displayWilaya = language === 'ar' ? store.wilaya : (store.wilayaFr || store.wilaya);

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/5 via-gray-50 to-[#1A0000]/10">
        <Navbar />
        
        {/* Progress Bar */}
        <div className="pt-20 bg-white border-b border-gray-200 py-3 sm:py-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center min-w-max">
                  <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                    step.completed 
                      ? 'bg-green-500 text-white' 
                      : step.active 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="h-3 w-3 sm:h-5 sm:w-5" />
                    ) : (
                      <span className="text-xs sm:text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <span className={`mr-1 sm:mr-2 text-xs sm:text-sm ${
                    step.active ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-4 sm:w-8 h-0.5 mx-2 sm:mx-4 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className={`h-5 w-5 mr-2 ${isRTL ? 'rotate-180' : ''}`} />
            {isRTL ? 'السابق' : 'Précédent'}
          </button>
        </div>
        
        {/* Booking Content */}
        <div className="py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/5 via-gray-50 to-[#1A0000]/10">
      <Navbar />
      
      <div className="pt-20">
        {/* Store Header */}
        <div className="relative h-64 sm:h-80 md:h-96">
          <img
            src={selectedImage || mainImage}
            alt={displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto">
              <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{displayName}</h1>
                  <div className={`flex items-center text-white/90 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span className="text-sm sm:text-base">{displayWilaya} - {displayAddress}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center mb-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                    <span className="text-white font-bold">{store.rating}</span>
                    <span className="text-white/80 text-sm ml-1">({store.totalReviews})</span>
                  </div>
                  <button
                    onClick={handleStartBooking}
                    className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-4 py-2 rounded-lg font-medium hover:from-[#D4941A] hover:to-[#C8860D] transition-all duration-200 text-sm sm:text-base"
                  >
                    {isRTL ? 'احجز الآن' : 'Réserver maintenant'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {storeImages.map((image) => (
              <div
                key={image.id}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedImage === image.url ? 'border-[#C8860D] scale-105' : 'border-transparent hover:border-gray-300'
                }`}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className={`flex space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              {[
                { id: 'services', label: isRTL ? 'الخدمات' : 'Services' },
                { id: 'staff', label: isRTL ? 'الموظفين' : 'Personnel' },
                { id: 'reviews', label: isRTL ? 'التقييمات' : 'Avis' },
                { id: 'info', label: isRTL ? 'معلومات' : 'Informations' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-[#C8860D] text-[#C8860D]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'الخدمات المتاحة' : 'Services disponibles'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    
                    <div className={`p-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {service.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <span className="text-sm">{service.duration} {isRTL ? 'دقيقة' : 'min'}</span>
                        </div>
                        <div className="text-lg font-bold text-[#C8860D]">
                          {service.price} {isRTL ? 'د.ج' : 'DA'}
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleStartBooking}
                        className={`w-full py-3 px-4 bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white rounded-lg font-medium hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        {isRTL ? 'حجز هذه الخدمة' : 'Réserver ce service'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <StoreStaffDisplay
              staff={storeStaff}
              reviews={staffReviews}
              onBookWithStaff={handleStartBooking}
            />
          )}
          
          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'تقييمات العملاء' : 'Avis des clients'}
                </h2>
                <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                  <span className="font-bold text-lg">{store.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({store.totalReviews})</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staffReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                    <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 bg-gradient-to-r from-[#1A0000] to-[#2A0000] rounded-full flex items-center justify-center text-white font-bold">
                          {review.customerName.charAt(0)}
                        </div>
                        <div className={isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}>
                          <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                          <p className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {review.comment && (
                      <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{review.comment}</p>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {staffReviews.length === 0 && (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {isRTL ? 'لا توجد تقييمات بعد' : 'Pas encore d\'avis'}
                  </h3>
                  <p className="text-gray-500">
                    {isRTL ? 'كن أول من يقيم هذا المتجر' : 'Soyez le premier à évaluer ce salon'}
                  </p>
                </div>
              )}
            </div>
          )}
          
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="space-y-8">
              <h2 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'معلومات المتجر' : 'Informations du salon'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'معلومات الاتصال' : 'Coordonnées'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className={`h-5 w-5 text-[#C8860D] mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="font-medium text-gray-900">{isRTL ? 'العنوان' : 'Adresse'}</p>
                        <p className="text-gray-600">{displayWilaya} - {displayAddress}</p>
                      </div>
                    </div>
                    
                    <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone className={`h-5 w-5 text-[#C8860D] mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="font-medium text-gray-900">{isRTL ? 'الهاتف' : 'Téléphone'}</p>
                        <p className="text-gray-600">{store.phone}</p>
                      </div>
                    </div>
                    
                    {store.email && (
                      <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Mail className={`h-5 w-5 text-[#C8860D] mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <p className="font-medium text-gray-900">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                          <p className="text-gray-600">{store.email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'وصف المتجر' : 'Description du salon'}
                  </h3>
                  
                  <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {displayDescription}
                  </p>
                  
                  <div className={`mt-6 pt-6 border-t border-gray-200 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isRTL ? 'إحصائيات' : 'Statistiques'}
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-[#C8860D] mx-auto mb-1" />
                        <p className="text-sm font-medium text-gray-900">{store.totalBookings}+</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'حجز' : 'Réservations'}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Star className="h-5 w-5 text-[#C8860D] mx-auto mb-1" />
                        <p className="text-sm font-medium text-gray-900">{store.rating}</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'تقييم' : 'Note'}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Users className="h-5 w-5 text-[#C8860D] mx-auto mb-1" />
                        <p className="text-sm font-medium text-gray-900">{storeStaff.length}</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'موظف' : 'Employés'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Booking CTA */}
        <div className="bg-gradient-to-r from-[#1A0000] to-[#2A0000] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {isRTL ? 'احجز موعدك الآن' : 'Réservez votre rendez-vous maintenant'}
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
              {isRTL 
                ? 'استمتع بتجربة فريدة مع أفضل المختصين في مجال الجمال والعناية الشخصية'
                : 'Profitez d\'une expérience unique avec les meilleurs spécialistes en beauté et soins personnels'
              }
            </p>
            <button
              onClick={handleStartBooking}
              className="bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#D4941A] hover:to-[#C8860D] transition-all duration-200 inline-flex items-center"
            >
              {isRTL ? 'احجز الآن' : 'Réserver maintenant'}
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};