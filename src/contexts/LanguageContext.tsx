import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  fr: {
    // Header
    'header.home': 'Accueil',
    'header.services': 'Services',
    'header.salons': 'Salons',
    'header.about': 'À propos',
    'header.login': 'Connexion',
    'header.register': 'S\'inscrire',
    'header.createStore': 'Créer mon salon',
    'header.phone': '+213 555 123 456',
    'header.location': 'Algérie',

    // Hero Section
    'hero.title': 'Réservez vos services beauté',
    'hero.subtitle': 'facilement et sans attente',
    'hero.description': 'Découvrez les meilleurs salons et cliniques esthétiques en Algérie et réservez votre rendez-vous en un clic',
    'hero.searchService': 'Rechercher un service...',
    'hero.selectWilaya': 'Choisir la wilaya',
    'hero.startSearch': 'Commencer la recherche',
    'hero.stats.salons': 'salons et cliniques',
    'hero.stats.customers': 'clients satisfaits',
    'hero.stats.rating': 'note de la plateforme',

    // Popular Services
    'services.title': 'Services',
    'services.subtitle': 'les plus demandés',
    'services.description': 'Découvrez les services les plus réservés sur notre plateforme et prenez votre rendez-vous maintenant',
    'services.bookNow': 'Réserver maintenant',
    'services.viewAll': 'Voir tous les services',
    'services.duration': 'Durée',
    'services.price': 'Prix',
    'services.bookings': 'réservations',

    // Filter Section
    'filter.title': 'Trouvez',
    'filter.subtitle': 'l\'endroit parfait',
    'filter.description': 'Utilisez les filtres avancés pour trouver les meilleurs salons et cliniques dans votre région',
    'filter.searchService': 'Rechercher un service (coiffure, maquillage, soin du visage...)',
    'filter.location': 'Localisation',
    'filter.allWilayas': 'Toutes les wilayas',
    'filter.category': 'Catégorie',
    'filter.all': 'Tous',
    'filter.men': '👨‍🦱 Hommes',
    'filter.women': '👩‍🦰 Femmes',
    'filter.search': 'Rechercher',
    'filter.quickFilters': 'Filtres rapides:',
    'filter.availableNow': 'Disponible maintenant',
    'filter.topRated': 'Mieux notés',
    'filter.nearest': 'Plus proches',
    'filter.cheapest': 'Moins chers',
    'filter.results': 'Résultats disponibles',
    'filter.resultsCount': 'salons et cliniques disponibles',
    'filter.sortBy': 'Trier par: Mieux notés',
    'filter.openNow': 'Ouvert maintenant',
    'filter.verified': '✓ Vérifié',
    'filter.loadMore': 'Afficher plus de résultats',

    // Why Choose Us
    'whyUs.title': 'Pourquoi choisir',
    'whyUs.subtitle': 'Daltekdz?',
    'whyUs.description': 'Nous offrons une expérience de réservation exceptionnelle avec les meilleurs services et standards en Algérie',
    'whyUs.instantBooking': 'Réservation instantanée',
    'whyUs.instantBookingDesc': 'Réservez votre rendez-vous en quelques secondes',
    'whyUs.guaranteedSafety': 'Sécurité garantie',
    'whyUs.guaranteedSafetyDesc': 'Tous les salons sont certifiés et agréés',
    'whyUs.realReviews': 'Avis authentiques',
    'whyUs.realReviewsDesc': 'Évaluations de vrais clients',
    'whyUs.nearestToYou': 'Plus proche de vous',
    'whyUs.nearestToYouDesc': 'Trouvez le salon le plus proche dans votre région',
    'whyUs.professionalExperts': 'Experts professionnels',
    'whyUs.professionalExpertsDesc': 'Spécialistes hautement expérimentés',
    'whyUs.easeOfUse': 'Facilité d\'utilisation',
    'whyUs.easeOfUseDesc': 'Application simple et facile à utiliser',
    'whyUs.howItWorks': 'Comment fonctionne Daltekdz?',
    'whyUs.step1': 'Rechercher',
    'whyUs.step1Desc': 'Recherchez le service et l\'emplacement appropriés',
    'whyUs.step2': 'Choisir',
    'whyUs.step2Desc': 'Choisissez le salon et l\'heure qui vous conviennent',
    'whyUs.step3': 'Réserver',
    'whyUs.step3Desc': 'Complétez la réservation en quelques clics',
    'whyUs.step4': 'Profiter',
    'whyUs.step4Desc': 'Profitez d\'un service de haute qualité',
    'whyUs.readyToExperience': 'Prêt à découvrir la différence?',
    'whyUs.joinThousands': 'Rejoignez des milliers de clients satisfaits et réservez votre premier rendez-vous aujourd\'hui avec les meilleurs salons d\'Algérie',
    'whyUs.bookNow': 'Réservez maintenant',
    'whyUs.browseSalons': 'Parcourir les salons',

    // Service Categories
    'category.hair': 'Cheveux',
    'category.skincare': 'Soins du visage',
    'category.nails': 'Ongles',
    'category.wellness': 'Bien-être',
    'category.makeup': 'Maquillage',

    // Wilayas
    'wilaya.algiers': 'Alger',
    'wilaya.oran': 'Oran',
    'wilaya.constantine': 'Constantine',
    'wilaya.annaba': 'Annaba',
    'wilaya.blida': 'Blida',
    'wilaya.batna': 'Batna',
    'wilaya.jijel': 'Jijel',
    'wilaya.setif': 'Sétif',

    // Common
    'common.from': 'À partir de',
    'common.da': 'DA',
    'common.minutes': 'minutes',
    'common.reviews': 'avis',
    'common.rating': 'note',
    'common.available': 'Disponible',
    'common.unavailable': 'Indisponible',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.confirm': 'Confirmer',
    'common.cancel': 'Annuler',
  },
  ar: {
    // Header
    'header.home': 'الرئيسية',
    'header.services': 'الخدمات',
    'header.salons': 'الصالونات',
    'header.about': 'من نحن',
    'header.login': 'تسجيل الدخول',
    'header.register': 'إنشاء حساب',
    'header.createStore': 'إنشاء متجري',
    'header.phone': '+213 555 123 456',
    'header.location': 'الجزائر',

    // Hero Section
    'hero.title': 'احجز خدمتك الجمالية',
    'hero.subtitle': 'بسهولة ودون انتظار',
    'hero.description': 'اكتشف أفضل الصالونات وعيادات التجميل في الجزائر واحجز موعدك بضغطة واحدة',
    'hero.searchService': 'ابحث عن خدمة...',
    'hero.selectWilaya':  'اختر الولاية',
    'hero.startSearch': 'ابدأ البحث',
    'hero.stats.salons': 'صالون وعيادة',
    'hero.stats.customers': 'عميل راضي',
    'hero.stats.rating': 'تقييم المنصة',

    // Popular Services
    'services.title': 'الخدمات',
    'services.subtitle': 'الأكثر طلباً',
    'services.description': 'اكتشف أشهر الخدمات المحجوزة على منصتنا واحجز موعدك الآن',
    'services.bookNow': 'احجز الآن',
    'services.viewAll': 'عرض جميع الخدمات',
    'services.duration': 'المدة',
    'services.price': 'السعر',
    'services.bookings': 'حجز',

    // Filter Section
    'filter.title': 'اعثر على',
    'filter.subtitle': 'المكان المثالي',
    'filter.description': 'استخدم الفلاتر المتقدمة للعثور على أفضل الصالونات والعيادات في منطقتك',
    'filter.searchService': 'ابحث عن خدمة (حلاقة، مكياج، تنظيف بشرة...)',
    'filter.location': 'الموقع',
    'filter.allWilayas': 'جميع الولايات',
    'filter.category': 'الفئة',
    'filter.all': 'الكل',
    'filter.men': '👨‍🦱 رجال',
    'filter.women': '👩‍🦰 نساء',
    'filter.search': 'بحث',
    'filter.quickFilters': 'فلاتر سريعة:',
    'filter.availableNow': 'متاح الآن',
    'filter.topRated': 'أعلى تقييم',
    'filter.nearest': 'الأقرب إليك',
    'filter.cheapest': 'الأرخص سعراً',
    'filter.results': 'النتائج المتاحة',
    'filter.resultsCount': 'صالون وعيادة متاحة',
    'filter.sortBy': 'ترتيب حسب: الأعلى تقييماً',
    'filter.openNow': 'مفتوح الآن',
    'filter.verified': '✓ معتمد',
    'filter.loadMore': 'عرض المزيد من النتائج',

    // Why Choose Us
    'whyUs.title': 'لماذا تختار',
    'whyUs.subtitle': 'Daltekdz؟',
    'whyUs.description': 'نحن نقدم تجربة حجز استثنائية مع أفضل الخدمات والمعايير في الجزائر',
    'whyUs.instantBooking': 'حجز فوري',
    'whyUs.instantBookingDesc': 'احجز موعدك في ثوانٍ معدودة',
    'whyUs.guaranteedSafety': 'أمان مضمون',
    'whyUs.guaranteedSafetyDesc': 'جميع الصالونات معتمدة ومرخصة',
    'whyUs.realReviews': 'تقييمات حقيقية',
    'whyUs.realReviewsDesc': 'تقييمات من عملاء حقيقيين',
    'whyUs.nearestToYou': 'أقرب إليك',
    'whyUs.nearestToYouDesc': 'اعثر على أقرب صالون في منطقتك',
    'whyUs.professionalExperts': 'خبراء محترفون',
    'whyUs.professionalExpertsDesc': 'مختصون ذوو خبرة عالية',
    'whyUs.easeOfUse': 'سهولة الاستخدام',
    'whyUs.easeOfUseDesc': 'تطبيق بسيط وسهل الاستخدام',
    'whyUs.howItWorks': 'كيف يعمل Daltekdz؟',
    'whyUs.step1': 'ابحث',
    'whyUs.step1Desc': 'ابحث عن الخدمة والموقع المناسب',
    'whyUs.step2': 'اختر',
    'whyUs.step2Desc': 'اختر الصالون والوقت المناسب',
    'whyUs.step3': 'احجز',
    'whyUs.step3Desc': 'أكمل الحجز بضغطات قليلة',
    'whyUs.step4': 'استمتع',
    'whyUs.step4Desc': 'استمتع بخدمة عالية الجودة',
    'whyUs.readyToExperience': 'جاهز لتجربة الفرق؟',
    'whyUs.joinThousands': 'انضم إلى آلاف العملاء الراضين واحجز موعدك الأول اليوم مع أفضل الصالونات في الجزائر',
    'whyUs.bookNow': 'احجز موعدك الآن',
    'whyUs.browseSalons': 'تصفح الصالونات',

    // Service Categories
    'category.hair': 'الشعر',
    'category.skincare': 'العناية بالبشرة',
    'category.nails': 'الأظافر',
    'category.wellness': 'الاسترخاء',
    'category.makeup': 'المكياج',

    // Wilayas
    'wilaya.algiers': 'الجزائر',
    'wilaya.oran': 'وهران',
    'wilaya.constantine': 'قسنطينة',
    'wilaya.annaba': 'عنابة',
    'wilaya.blida': 'بليدة',
    'wilaya.batna': 'باتنة',
    'wilaya.jijel': 'جيجل',
    'wilaya.setif': 'سطيف',

    // Common
    'common.from': 'من',
    'common.da': 'د.ج',
    'common.minutes': 'دقيقة',
    'common.reviews': 'تقييم',
    'common.rating': 'تقييم',
    'common.available': 'متاح',
    'common.unavailable': 'غير متاح',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.confirm': 'تأكيد',
    'common.cancel': 'إلغاء',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // تغيير اللغة الافتراضية إلى العربية
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};