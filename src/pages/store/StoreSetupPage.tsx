import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, MapPin, Phone, Mail, Store, FileText, Camera, Navigation, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { wilayas, getWilayasSorted } from '../../data/wilayas';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const StoreSetupPage: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedPlan = searchParams.get('plan') || 'gold';

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    storeName: '',
    storeType: '',
    wilaya: '',
    commune: '',
    phone: '',
    email: '',
    description: '',
    logo: null as File | null,
    address: '',
    latitude: null as number | null,
    longitude: null as number | null,
    workingHours: {
      sunday: { open: '09:00', close: '18:00', closed: false },
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '14:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '18:00', closed: true }
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [locationError, setLocationError] = useState('');
  const totalSteps = 3;

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  const sortedWilayas = getWilayasSorted(language);

  const storeTypes = [
    { id: 'mens_salon', name: isRTL ? 'صالون رجالي' : 'Salon masculin', icon: '👨‍🦲' },
    { id: 'womens_salon', name: isRTL ? 'صالون نسائي' : 'Salon féminin', icon: '👩‍🦳' },
    { id: 'beauty_clinic', name: isRTL ? 'عيادة تجميل' : 'Clinique esthétique', icon: '💉' },
    { id: 'kids_salon', name: isRTL ? 'حلاقة أطفال' : 'Salon enfants', icon: '👶' },
    { id: 'spa_center', name: isRTL ? 'مركز سبا' : 'Centre spa', icon: '🧘‍♀️' },
    { id: 'nail_salon', name: isRTL ? 'صالون أظافر' : 'Salon d\'ongles', icon: '💅' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const getCurrentLocation = () => {
    setLocationStatus('loading');
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationError(isRTL ? 'المتصفح لا يدعم تحديد الموقع الجغرافي' : 'Le navigateur ne supporte pas la géolocalisation');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          latitude,
          longitude
        }));
        setLocationStatus('success');
      },
      (error) => {
        setLocationStatus('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(isRTL ? 'تم رفض الإذن للوصول إلى الموقع' : 'Permission d\'accès à la localisation refusée');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(isRTL ? 'معلومات الموقع غير متاحة' : 'Informations de localisation non disponibles');
            break;
          case error.TIMEOUT:
            setLocationError(isRTL ? 'انتهت مهلة طلب تحديد الموقع' : 'Délai de demande de localisation expiré');
            break;
          default:
            setLocationError(isRTL ? 'حدث خطأ غير معروف' : 'Erreur inconnue');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    console.log('Creating store with data:', { ...formData, plan: selectedPlan });
    
    // Redirect to store dashboard
    navigate('/store/dashboard');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'معلومات المتجر الأساسية' : 'Informations de base du salon'}
            </h2>
            
            <div>
              <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Store className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'اسم المتجر *' : 'Nom du salon *'}
              </label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={isRTL ? 'أدخل اسم متجرك' : 'Entrez le nom de votre salon'}
              />
            </div>

            <div>
              <label className={`text-sm font-medium text-gray-700 mb-3 block ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'نوع المتجر *' : 'Type de salon *'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {storeTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInputChange('storeType', type.id)}
                    className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 ${
                      formData.storeType === type.id
                        ? 'border-[#1A0000] bg-[#1A0000]/10 text-[#1A0000]'
                        : 'border-gray-200 hover:border-[#1A0000]/50 hover:bg-[#1A0000]/5'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{type.icon}</div>
                    <div className="text-xs sm:text-sm font-medium">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'رقم الهاتف *' : 'Téléphone *'}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-left text-sm sm:text-base"
                  placeholder="+213 555 123 456"
                  dir="ltr"
                />
              </div>

              <div>
                <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-left text-sm sm:text-base"
                  placeholder="salon@example.com"
                  dir="ltr"
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'الموقع والعنوان' : 'Localisation et adresse'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'الولاية *' : 'Wilaya *'}
                </label>
                <select
                  required
                  value={formData.wilaya}
                  onChange={(e) => handleInputChange('wilaya', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <option value="">{isRTL ? 'اختر الولاية' : 'Choisir la wilaya'}</option>
                  {sortedWilayas.map(wilaya => (
                    <option key={wilaya.id} value={wilaya.id}>
                      {isRTL ? wilaya.nameAr : wilaya.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className={`h-4 w-4 text-[#C8860D] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'البلدية *' : 'Commune *'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.commune}
                  onChange={(e) => handleInputChange('commune', e.target.value)}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={isRTL ? 'أدخل اسم البلدية' : 'Entrez le nom de la commune'}
                />
              </div>
            </div>

            <div>
              <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className={`h-4 w-4 text-green-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'العنوان التفصيلي *' : 'Adresse détaillée *'}
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={isRTL ? 'أدخل العنوان التفصيلي للمتجر' : 'Entrez l\'adresse détaillée du salon'}
              />
            </div>

            {/* GPS Location Section */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
              <h3 className={`text-base sm:text-lg font-semibold text-blue-900 mb-3 sm:mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'تحديد الموقع الجغرافي' : 'Localisation GPS'}
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationStatus === 'loading'}
                  className={`w-full flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    locationStatus === 'loading'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : locationStatus === 'success'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {locationStatus === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      {isRTL ? 'جاري تحديد الموقع...' : 'Localisation en cours...'}
                    </>
                  ) : locationStatus === 'success' ? (
                    <>
                      <CheckCircle className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'تم تحديد الموقع بنجاح ✅' : 'Localisation réussie ✅'}
                    </>
                  ) : (
                    <>
                      <Navigation className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? '📍 تحديد موقعي عبر GPS' : '📍 Localiser via GPS'}
                    </>
                  )}
                </button>

                {locationStatus === 'error' && (
                  <div className={`flex items-center p-3 bg-red-50 border border-red-200 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className={`h-4 w-4 sm:h-5 sm:w-5 text-red-500 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    <span className="text-red-700 text-xs sm:text-sm">{locationError}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <FileText className={`h-4 w-4 text-purple-600 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'وصف المتجر' : 'Description du salon'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                placeholder={isRTL ? 'اكتب وصفاً مختصراً عن متجرك وخدماتك...' : 'Écrivez une description courte de votre salon et de vos services...'}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'اللمسات الأخيرة' : 'Touches finales'}
            </h2>
            
            <div>
              <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Camera className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {isRTL ? 'شعار المتجر' : 'Logo du salon'}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-[#1A0000]/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">
                    {isRTL ? 'اضغط لرفع شعار المتجر' : 'Cliquez pour télécharger le logo'}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">PNG, JPG {isRTL ? 'حتى 5MB' : 'jusqu\'à 5MB'}</p>
                </label>
                {formData.logo && (
                  <p className="text-green-600 mt-2 text-sm">
                    {isRTL ? 'تم رفع الملف:' : 'Fichier téléchargé:'} {formData.logo.name}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-200">
              <h3 className={`font-semibold text-blue-900 mb-2 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'ملخص الباقة المختارة' : 'Résumé du forfait choisi'}
              </h3>
              <div className={`text-blue-700 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                <p className="font-medium">
                  {isRTL ? 'باقة' : 'Forfait'} {selectedPlan === 'silver' ? 'Silver 🥈' : selectedPlan === 'gold' ? 'Gold 🥇' : 'Platinum 💎'}
                </p>
                <p className="text-xs sm:text-sm mt-1">
                  {selectedPlan === 'silver' && (isRTL ? 'حتى 5 خدمات - 2,500 د.ج/شهر' : 'Jusqu\'à 5 services - 2,500 DA/mois')}
                  {selectedPlan === 'gold' && (isRTL ? 'حتى 15 خدمة - 4,500 د.ج/شهر' : 'Jusqu\'à 15 services - 4,500 DA/mois')}
                  {selectedPlan === 'platinum' && (isRTL ? 'خدمات غير محدودة - 7,500 د.ج/شهر' : 'Services illimités - 7,500 DA/mois')}
                </p>
              </div>
            </div>

            {/* Location Summary */}
            {formData.latitude && formData.longitude && (
              <div className="bg-green-50 rounded-lg p-4 sm:p-6 border border-green-200">
                <h3 className={`font-semibold text-green-900 mb-2 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الموقع الجغرافي' : 'Localisation GPS'}
                </h3>
                <div className={`text-green-700 text-xs sm:text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p>{isRTL ? 'خط العرض:' : 'Latitude:'} {formData.latitude.toFixed(6)}</p>
                  <p>{isRTL ? 'خط الطول:' : 'Longitude:'} {formData.longitude.toFixed(6)}</p>
                  <p className="mt-2 text-xs text-green-600">
                    ✅ {isRTL ? 'سيتم استخدام هذا الموقع لعرض متجرك للعملاء القريبين' : 'Cette localisation sera utilisée pour afficher votre salon aux clients proches'}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/10 via-gray-50 to-[#1A0000]/5">
      <Navbar />

      {/* Progress Bar */}
      <div className="pt-16 bg-white/80 backdrop-blur-sm border-b border-gray-200 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                  step <= currentStep 
                    ? 'bg-[#1A0000] text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <span className="text-xs sm:text-sm font-medium">{step}</span>
                </div>
                <span className={`text-xs sm:text-sm ${
                  step <= currentStep ? 'text-[#1A0000] font-medium' : 'text-gray-500'
                } ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`}>
                  {step === 1 && (isRTL ? 'المعلومات الأساسية' : 'Informations de base')}
                  {step === 2 && (isRTL ? 'الموقع والعنوان' : 'Localisation')}
                  {step === 3 && (isRTL ? 'اللمسات الأخيرة' : 'Touches finales')}
                </span>
                {step < totalSteps && (
                  <div className={`w-4 sm:w-8 h-0.5 mx-2 sm:mx-4 ${
                    step < currentStep ? 'bg-[#1A0000]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <form onSubmit={handleSubmit}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className={`flex items-center justify-between mt-6 sm:mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ArrowLeft className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} />
              {isRTL ? 'السابق' : 'Précédent'}
            </button>
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className={`flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#1A0000] to-[#2A0000] text-white rounded-lg font-medium hover:from-[#2A0000] hover:to-[#1A0000] transition-all duration-200 text-sm sm:text-base ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {isRTL ? 'التالي' : 'Suivant'}
                <ArrowLeft className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'mr-2' : 'ml-2 rotate-180'}`} />
              </button>
            ) : (
              <button
                type="submit"
                className={`flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 text-sm sm:text-base ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {isRTL ? 'إنشاء المتجر' : 'Créer le salon'}
                <Store className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'mr-2' : 'ml-2'}`} />
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};