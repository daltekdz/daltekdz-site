import { StoreImage, StoreService, StoreAd } from '../types/store';
import { StaffMember, StaffReview } from '../types/staff';

// Sample Men's Stores
export const menStores = [
  {
    id: 'men-store-1',
    name: 'صالون الأناقة للرجال',
    nameFr: 'Salon Élégance Homme',
    type: 'mens_salon',
    plan: 'gold' as 'silver' | 'gold' | 'platinum',
    description: 'صالون متخصص في الحلاقة الرجالية العصرية وتصفيف الشعر والعناية باللحية بأحدث التقنيات',
    descriptionFr: 'Salon spécialisé dans la coiffure masculine moderne, le stylisme et les soins de barbe avec les dernières techniques',
    address: 'شارع العربي بن مهيدي، وسط المدينة، الجزائر العاصمة',
    addressFr: 'Rue Larbi Ben M\'hidi, Centre-ville, Alger',
    wilaya: 'الجزائر',
    wilayaFr: 'Alger',
    phone: '+213 555 123 456',
    email: 'elegance@example.com',
    rating: 4.8,
    totalReviews: 124,
    totalBookings: 1250,
    mainImage: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latitude: 36.7762,
    longitude: 3.0594
  },
  {
    id: 'men-store-2',
    name: 'باربر شوب الملكي',
    nameFr: 'Barber Shop Royal',
    type: 'mens_salon',
    plan: 'platinum' as 'silver' | 'gold' | 'platinum',
    description: 'صالون حلاقة رجالي فاخر يقدم خدمات متكاملة من قص الشعر وتهذيب اللحية والعناية بالبشرة في أجواء كلاسيكية',
    descriptionFr: 'Salon de coiffure masculin de luxe offrant des services complets de coupe de cheveux, de taille de barbe et de soins de la peau dans une ambiance classique',
    address: 'حي حيدرة، الجزائر العاصمة',
    addressFr: 'Quartier Hydra, Alger',
    wilaya: 'الجزائر',
    wilayaFr: 'Alger',
    phone: '+213 555 789 123',
    email: 'royal@example.com',
    rating: 4.9,
    totalReviews: 215,
    totalBookings: 1890,
    mainImage: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latitude: 36.7539,
    longitude: 3.0375
  }
];

// Sample Women's Stores
export const womenStores = [
  {
    id: 'women-store-1',
    name: 'صالون لمسات الجمال',
    nameFr: 'Salon Touches de Beauté',
    type: 'womens_salon',
    plan: 'gold' as 'silver' | 'gold' | 'platinum',
    description: 'صالون نسائي متكامل يقدم خدمات تصفيف الشعر، المكياج، العناية بالبشرة والأظافر في أجواء راقية',
    descriptionFr: 'Salon féminin complet offrant des services de coiffure, maquillage, soins de la peau et des ongles dans une ambiance élégante',
    address: 'شارع ديدوش مراد، الجزائر العاصمة',
    addressFr: 'Rue Didouche Mourad, Alger',
    wilaya: 'الجزائر',
    wilayaFr: 'Alger',
    phone: '+213 555 456 789',
    email: 'beauty@example.com',
    rating: 4.7,
    totalReviews: 178,
    totalBookings: 1560,
    mainImage: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latitude: 36.7721,
    longitude: 3.0586
  },
  {
    id: 'women-store-2',
    name: 'عيادة سبا الفاخرة',
    nameFr: 'Clinique Spa de Luxe',
    type: 'beauty_clinic',
    plan: 'platinum' as 'silver' | 'gold' | 'platinum',
    description: 'مركز تجميل وسبا متكامل يقدم أحدث تقنيات العناية بالبشرة والجسم والشعر مع خدمات المساج والاسترخاء',
    descriptionFr: 'Centre de beauté et spa complet offrant les dernières techniques de soins de la peau, du corps et des cheveux avec services de massage et de relaxation',
    address: 'حي بن عكنون، الجزائر العاصمة',
    addressFr: 'Quartier Ben Aknoun, Alger',
    wilaya: 'الجزائر',
    wilayaFr: 'Alger',
    phone: '+213 555 987 654',
    email: 'luxespa@example.com',
    rating: 4.9,
    totalReviews: 245,
    totalBookings: 2100,
    mainImage: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    latitude: 36.7662,
    longitude: 3.0186
  }
];

// Sample Store Images
export const storeImages: Record<string, StoreImage[]> = {
  'men-store-1': [
    {
      id: 'img-men-1-1',
      storeId: 'men-store-1',
      url: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-men-1-2',
      storeId: 'men-store-1',
      url: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-men-1-3',
      storeId: 'men-store-1',
      url: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    }
  ],
  'men-store-2': [
    {
      id: 'img-men-2-1',
      storeId: 'men-store-2',
      url: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-men-2-2',
      storeId: 'men-store-2',
      url: 'https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-men-2-3',
      storeId: 'men-store-2',
      url: 'https://images.pexels.com/photos/1684820/pexels-photo-1684820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    }
  ],
  'women-store-1': [
    {
      id: 'img-women-1-1',
      storeId: 'women-store-1',
      url: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-women-1-2',
      storeId: 'women-store-1',
      url: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-women-1-3',
      storeId: 'women-store-1',
      url: 'https://images.pexels.com/photos/3993308/pexels-photo-3993308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    }
  ],
  'women-store-2': [
    {
      id: 'img-women-2-1',
      storeId: 'women-store-2',
      url: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-women-2-2',
      storeId: 'women-store-2',
      url: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    },
    {
      id: 'img-women-2-3',
      storeId: 'women-store-2',
      url: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isMain: false,
      createdAt: '2024-01-01'
    }
  ]
};

// Sample Store Services
export const storeServices: Record<string, StoreService[]> = {
  'men-store-1': [
    {
      id: 'service-men-1-1',
      storeId: 'men-store-1',
      name: 'قص شعر كلاسيكي',
      description: 'قص شعر رجالي كلاسيكي مع تشطيب وتصفيف',
      price: 800,
      duration: 30,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-men-1-2',
      storeId: 'men-store-1',
      name: 'حلاقة ذقن',
      description: 'حلاقة وتهذيب الذقن مع مستحضرات مرطبة',
      price: 500,
      duration: 20,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-men-1-3',
      storeId: 'men-store-1',
      name: 'قص وحلاقة ذقن',
      description: 'باقة متكاملة تشمل قص الشعر وحلاقة الذقن',
      price: 1200,
      duration: 45,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ],
  'men-store-2': [
    {
      id: 'service-men-2-1',
      storeId: 'men-store-2',
      name: 'قص شعر فاخر',
      description: 'قص شعر رجالي فاخر مع تدليك فروة الرأس',
      price: 1500,
      duration: 45,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1684820/pexels-photo-1684820.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-men-2-2',
      storeId: 'men-store-2',
      name: 'حلاقة ذقن بالمشرط',
      description: 'حلاقة ذقن تقليدية باستخدام المشرط مع كمادات ساخنة',
      price: 1000,
      duration: 30,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-men-2-3',
      storeId: 'men-store-2',
      name: 'باقة العناية الملكية',
      description: 'باقة شاملة تتضمن قص الشعر، حلاقة الذقن، تنظيف البشرة، وتدليك الوجه',
      price: 3000,
      duration: 90,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-men-2-4',
      storeId: 'men-store-2',
      name: 'صبغ الشعر',
      description: 'صبغ الشعر باستخدام أفضل المنتجات العالمية',
      price: 2500,
      duration: 60,
      category: 'حلاقة رجالية',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ],
  'women-store-1': [
    {
      id: 'service-women-1-1',
      storeId: 'women-store-1',
      name: 'قص وتصفيف الشعر',
      description: 'قص وتصفيف الشعر حسب أحدث صيحات الموضة',
      price: 2500,
      duration: 60,
      category: 'تصفيف نسائي',
      image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-1-2',
      storeId: 'women-store-1',
      name: 'صبغ الشعر',
      description: 'صبغ الشعر باستخدام أفضل المنتجات العالمية',
      price: 4500,
      duration: 120,
      category: 'تصفيف نسائي',
      image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-1-3',
      storeId: 'women-store-1',
      name: 'مانيكير وباديكير',
      description: 'عناية كاملة بالأظافر مع طلاء جل طويل الأمد',
      price: 3000,
      duration: 90,
      category: 'أظافر',
      image: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-1-4',
      storeId: 'women-store-1',
      name: 'مكياج مناسبات',
      description: 'مكياج احترافي للمناسبات والحفلات',
      price: 3500,
      duration: 60,
      category: 'مكياج',
      image: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ],
  'women-store-2': [
    {
      id: 'service-women-2-1',
      storeId: 'women-store-2',
      name: 'تنظيف البشرة العميق',
      description: 'تنظيف عميق للبشرة مع ماسكات مرطبة ومغذية',
      price: 4000,
      duration: 75,
      category: 'عناية بالبشرة',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-2-2',
      storeId: 'women-store-2',
      name: 'مساج استرخاء',
      description: 'جلسة مساج استرخاء للجسم كامل مع زيوت عطرية',
      price: 5000,
      duration: 90,
      category: 'مساج',
      image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-2-3',
      storeId: 'women-store-2',
      name: 'علاج مكافحة الشيخوخة',
      description: 'علاج متقدم لمكافحة علامات التقدم في السن وتجديد البشرة',
      price: 6000,
      duration: 90,
      category: 'عناية بالبشرة',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: 'service-women-2-4',
      storeId: 'women-store-2',
      name: 'باقة سبا كاملة',
      description: 'باقة متكاملة تشمل تنظيف البشرة، مساج الجسم، مانيكير وباديكير',
      price: 10000,
      duration: 180,
      category: 'سبا',
      image: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=400',
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]
};

// Sample Store Staff
export const storeStaff: Record<string, StaffMember[]> = {
  'men-store-1': [
    {
      id: 'staff-men-1-1',
      name: 'أحمد محمد',
      image: 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'حلاقة الذقن'],
      description: 'حلاق محترف مع خبرة 8 سنوات في مجال الحلاقة الرجالية',
      services: ['service-men-1-1', 'service-men-1-2', 'service-men-1-3'],
      rating: 4.8,
      totalReviews: 56,
      isActive: true,
      storeId: 'men-store-1',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-men-1-2',
      name: 'كريم علي',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'تصفيف الشعر'],
      description: 'متخصص في قصات الشعر العصرية مع خبرة 5 سنوات',
      services: ['service-men-1-1', 'service-men-1-3'],
      rating: 4.7,
      totalReviews: 42,
      isActive: true,
      storeId: 'men-store-1',
      createdAt: '2024-01-01'
    }
  ],
  'men-store-2': [
    {
      id: 'staff-men-2-1',
      name: 'محمد أمين',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'حلاقة الذقن بالمشرط', 'صبغ الشعر'],
      description: 'حلاق محترف مع خبرة 12 سنة في مجال الحلاقة الرجالية الفاخرة',
      services: ['service-men-2-1', 'service-men-2-2', 'service-men-2-3', 'service-men-2-4'],
      rating: 4.9,
      totalReviews: 87,
      isActive: true,
      storeId: 'men-store-2',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-men-2-2',
      name: 'رياض حسين',
      image: 'https://images.pexels.com/photos/1205033/pexels-photo-1205033.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['حلاقة الذقن', 'العناية بالبشرة'],
      description: 'متخصص في العناية بالذقن والبشرة الرجالية مع خبرة 7 سنوات',
      services: ['service-men-2-2', 'service-men-2-3'],
      rating: 4.8,
      totalReviews: 65,
      isActive: true,
      storeId: 'men-store-2',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-men-2-3',
      name: 'سمير عبد الله',
      image: 'https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'صبغ الشعر'],
      description: 'متخصص في قصات الشعر العصرية وتقنيات الصبغ الحديثة',
      services: ['service-men-2-1', 'service-men-2-4'],
      rating: 4.7,
      totalReviews: 52,
      isActive: true,
      storeId: 'men-store-2',
      createdAt: '2024-01-01'
    }
  ],
  'women-store-1': [
    {
      id: 'staff-women-1-1',
      name: 'سارة أحمد',
      image: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'تصفيف الشعر', 'صبغ الشعر'],
      description: 'مصففة شعر محترفة مع خبرة 10 سنوات في مجال تصفيف الشعر النسائي',
      services: ['service-women-1-1', 'service-women-1-2'],
      rating: 4.9,
      totalReviews: 78,
      isActive: true,
      storeId: 'women-store-1',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-women-1-2',
      name: 'ليلى محمد',
      image: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['مكياج', 'العناية بالأظافر'],
      description: 'خبيرة مكياج ومتخصصة في العناية بالأظافر مع خبرة 8 سنوات',
      services: ['service-women-1-3', 'service-women-1-4'],
      rating: 4.8,
      totalReviews: 65,
      isActive: true,
      storeId: 'women-store-1',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-women-1-3',
      name: 'نور الهدى',
      image: 'https://images.pexels.com/photos/3993308/pexels-photo-3993308.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['قص الشعر', 'مكياج'],
      description: 'متخصصة في قصات الشعر العصرية والمكياج للمناسبات',
      services: ['service-women-1-1', 'service-women-1-4'],
      rating: 4.7,
      totalReviews: 52,
      isActive: true,
      storeId: 'women-store-1',
      createdAt: '2024-01-01'
    }
  ],
  'women-store-2': [
    {
      id: 'staff-women-2-1',
      name: 'فاطمة الزهراء',
      image: 'https://images.pexels.com/photos/3757956/pexels-photo-3757956.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['العناية بالبشرة', 'تنظيف البشرة'],
      description: 'أخصائية بشرة مع شهادات عالمية وخبرة 12 سنة في مجال العناية بالبشرة',
      services: ['service-women-2-1', 'service-women-2-3'],
      rating: 4.9,
      totalReviews: 92,
      isActive: true,
      storeId: 'women-store-2',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-women-2-2',
      name: 'أمينة سعيد',
      image: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['مساج', 'سبا'],
      description: 'معالجة مساج محترفة مع خبرة 9 سنوات في تقنيات المساج المختلفة',
      services: ['service-women-2-2', 'service-women-2-4'],
      rating: 4.8,
      totalReviews: 78,
      isActive: true,
      storeId: 'women-store-2',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-women-2-3',
      name: 'سلمى رشيد',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['العناية بالبشرة', 'مكافحة الشيخوخة'],
      description: 'متخصصة في علاجات مكافحة الشيخوخة وتجديد البشرة',
      services: ['service-women-2-1', 'service-women-2-3', 'service-women-2-4'],
      rating: 4.9,
      totalReviews: 85,
      isActive: true,
      storeId: 'women-store-2',
      createdAt: '2024-01-01'
    },
    {
      id: 'staff-women-2-4',
      name: 'ياسمين علي',
      image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialties: ['مساج', 'العناية بالبشرة', 'سبا'],
      description: 'خبيرة سبا شاملة مع تدريب دولي وخبرة 10 سنوات',
      services: ['service-women-2-2', 'service-women-2-3', 'service-women-2-4'],
      rating: 4.8,
      totalReviews: 72,
      isActive: true,
      storeId: 'women-store-2',
      createdAt: '2024-01-01'
    }
  ]
};

// Sample Store Ads
export const storeAds: Record<string, StoreAd[]> = {
  'men-store-1': [
    {
      id: 'ad-men-1-1',
      storeId: 'men-store-1',
      title: 'خصم 20% على جميع خدمات قص الشعر',
      description: 'استمتع بخصم 20% على جميع خدمات قص الشعر خلال شهر رمضان',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
      targetWilaya: 'الجزائر',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      isActive: true,
      views: 245,
      clicks: 32,
      createdAt: '2024-06-01'
    }
  ],
  'men-store-2': [
    {
      id: 'ad-men-2-1',
      storeId: 'men-store-2',
      title: 'باقة العناية الملكية الكاملة',
      description: 'جرب باقة العناية الملكية الكاملة بخصم 15% لفترة محدودة',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800',
      targetWilaya: 'الجزائر',
      targetCommune: 'حيدرة',
      startDate: '2024-06-15',
      endDate: '2024-07-15',
      isActive: true,
      views: 320,
      clicks: 45,
      createdAt: '2024-06-15'
    }
  ],
  'women-store-1': [
    {
      id: 'ad-women-1-1',
      storeId: 'women-store-1',
      title: 'عرض خاص للعرائس',
      description: 'باقة كاملة للعرائس تشمل المكياج، تصفيف الشعر، والمانيكير بسعر خاص',
      image: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=800',
      targetWilaya: 'الجزائر',
      startDate: '2024-06-10',
      endDate: '2024-07-10',
      isActive: true,
      views: 410,
      clicks: 65,
      createdAt: '2024-06-10'
    }
  ],
  'women-store-2': [
    {
      id: 'ad-women-2-1',
      storeId: 'women-store-2',
      title: 'يوم سبا كامل بخصم 30%',
      description: 'استمتعي بيوم كامل من الدلال مع باقة سبا شاملة بخصم 30%',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
      targetWilaya: 'الجزائر',
      targetCommune: 'بن عكنون',
      startDate: '2024-06-20',
      endDate: '2024-07-20',
      isActive: true,
      views: 380,
      clicks: 58,
      createdAt: '2024-06-20'
    }
  ]
};

// Sample Staff Reviews
export const staffReviews: Record<string, StaffReview[]> = {
  'staff-men-1-1': [
    {
      id: 'review-staff-men-1-1-1',
      staffId: 'staff-men-1-1',
      customerId: 'customer-1',
      customerName: 'عبد الرحمن محمد',
      bookingId: 'booking-1',
      rating: 5,
      comment: 'خدمة ممتازة وقصة شعر رائعة، سأعود مرة أخرى بالتأكيد',
      createdAt: '2024-05-15'
    },
    {
      id: 'review-staff-men-1-1-2',
      staffId: 'staff-men-1-1',
      customerId: 'customer-2',
      customerName: 'محمد علي',
      bookingId: 'booking-2',
      rating: 4,
      comment: 'تجربة جيدة جداً، أحمد محترف في عمله',
      createdAt: '2024-05-20'
    }
  ],
  'staff-women-2-1': [
    {
      id: 'review-staff-women-2-1-1',
      staffId: 'staff-women-2-1',
      customerId: 'customer-3',
      customerName: 'سارة أحمد',
      bookingId: 'booking-3',
      rating: 5,
      comment: 'فاطمة خبيرة رائعة، بشرتي أصبحت أفضل بكثير بعد جلسة العناية',
      createdAt: '2024-05-18'
    },
    {
      id: 'review-staff-women-2-1-2',
      staffId: 'staff-women-2-1',
      customerId: 'customer-4',
      customerName: 'ليلى محمد',
      bookingId: 'booking-4',
      rating: 5,
      comment: 'أفضل أخصائية بشرة في الجزائر، نتائج مذهلة من أول جلسة',
      createdAt: '2024-05-25'
    }
  ]
};

// Get all stores
export const getAllStores = () => {
  return [...menStores, ...womenStores];
};

// Get store by ID
export const getStoreById = (storeId: string) => {
  return getAllStores().find(store => store.id === storeId);
};

// Get store images
export const getStoreImagesById = (storeId: string) => {
  return storeImages[storeId] || [];
};

// Get store services
export const getStoreServicesById = (storeId: string) => {
  return storeServices[storeId] || [];
};

// Get store staff
export const getStoreStaffById = (storeId: string) => {
  return storeStaff[storeId] || [];
};

// Get store ads
export const getStoreAdsById = (storeId: string) => {
  return storeAds[storeId] || [];
};

// Get staff reviews
export const getStaffReviewsById = (staffId: string) => {
  return staffReviews[staffId] || [];
};