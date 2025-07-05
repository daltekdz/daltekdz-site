export interface Wilaya {
  id: string;
  code: string;
  name: string;
  nameAr: string;
}

export const wilayas: Wilaya[] = [
  { id: 'adrar', code: '01', name: 'Adrar', nameAr: 'أدرار' },
  { id: 'chlef', code: '02', name: 'Chlef', nameAr: 'الشلف' },
  { id: 'laghouat', code: '03', name: 'Laghouat', nameAr: 'الأغواط' },
  { id: 'oum-el-bouaghi', code: '04', name: 'Oum El Bouaghi', nameAr: 'أم البواقي' },
  { id: 'batna', code: '05', name: 'Batna', nameAr: 'باتنة' },
  { id: 'bejaia', code: '06', name: 'Béjaïa', nameAr: 'بجاية' },
  { id: 'biskra', code: '07', name: 'Biskra', nameAr: 'بسكرة' },
  { id: 'bechar', code: '08', name: 'Béchar', nameAr: 'بشار' },
  { id: 'blida', code: '09', name: 'Blida', nameAr: 'البليدة' },
  { id: 'bouira', code: '10', name: 'Bouira', nameAr: 'البويرة' },
  { id: 'tamanrasset', code: '11', name: 'Tamanrasset', nameAr: 'تمنراست' },
  { id: 'tebessa', code: '12', name: 'Tébessa', nameAr: 'تبسة' },
  { id: 'tlemcen', code: '13', name: 'Tlemcen', nameAr: 'تلمسان' },
  { id: 'tiaret', code: '14', name: 'Tiaret', nameAr: 'تيارت' },
  { id: 'tizi-ouzou', code: '15', name: 'Tizi Ouzou', nameAr: 'تيزي وزو' },
  { id: 'algiers', code: '16', name: 'Alger', nameAr: 'الجزائر' },
  { id: 'djelfa', code: '17', name: 'Djelfa', nameAr: 'الجلفة' },
  { id: 'jijel', code: '18', name: 'Jijel', nameAr: 'جيجل' },
  { id: 'setif', code: '19', name: 'Sétif', nameAr: 'سطيف' },
  { id: 'saida', code: '20', name: 'Saïda', nameAr: 'سعيدة' },
  { id: 'skikda', code: '21', name: 'Skikda', nameAr: 'سكيكدة' },
  { id: 'sidi-bel-abbes', code: '22', name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس' },
  { id: 'annaba', code: '23', name: 'Annaba', nameAr: 'عنابة' },
  { id: 'guelma', code: '24', name: 'Guelma', nameAr: 'قالمة' },
  { id: 'constantine', code: '25', name: 'Constantine', nameAr: 'قسنطينة' },
  { id: 'medea', code: '26', name: 'Médéa', nameAr: 'المدية' },
  { id: 'mostaganem', code: '27', name: 'Mostaganem', nameAr: 'مستغانم' },
  { id: 'msila', code: '28', name: 'M\'Sila', nameAr: 'المسيلة' },
  { id: 'mascara', code: '29', name: 'Mascara', nameAr: 'معسكر' },
  { id: 'ouargla', code: '30', name: 'Ouargla', nameAr: 'ورقلة' },
  { id: 'oran', code: '31', name: 'Oran', nameAr: 'وهران' },
  { id: 'el-bayadh', code: '32', name: 'El Bayadh', nameAr: 'البيض' },
  { id: 'illizi', code: '33', name: 'Illizi', nameAr: 'إليزي' },
  { id: 'bordj-bou-arreridj', code: '34', name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج' },
  { id: 'boumerdes', code: '35', name: 'Boumerdès', nameAr: 'بومرداس' },
  { id: 'el-tarf', code: '36', name: 'El Tarf', nameAr: 'الطارف' },
  { id: 'tindouf', code: '37', name: 'Tindouf', nameAr: 'تندوف' },
  { id: 'tissemsilt', code: '38', name: 'Tissemsilt', nameAr: 'تيسمسيلت' },
  { id: 'el-oued', code: '39', name: 'El Oued', nameAr: 'الوادي' },
  { id: 'khenchela', code: '40', name: 'Khenchela', nameAr: 'خنشلة' },
  { id: 'souk-ahras', code: '41', name: 'Souk Ahras', nameAr: 'سوق أهراس' },
  { id: 'tipaza', code: '42', name: 'Tipaza', nameAr: 'تيبازة' },
  { id: 'mila', code: '43', name: 'Mila', nameAr: 'ميلة' },
  { id: 'ain-defla', code: '44', name: 'Aïn Defla', nameAr: 'عين الدفلى' },
  { id: 'naama', code: '45', name: 'Naâma', nameAr: 'النعامة' },
  { id: 'ain-temouchent', code: '46', name: 'Aïn Témouchent', nameAr: 'عين تموشنت' },
  { id: 'ghardaia', code: '47', name: 'Ghardaïa', nameAr: 'غرداية' },
  { id: 'relizane', code: '48', name: 'Relizane', nameAr: 'غليزان' }
];

// Helper function to get wilaya by code
export const getWilayaByCode = (code: string): Wilaya | undefined => {
  return wilayas.find(wilaya => wilaya.code === code);
};

// Helper function to get wilaya by id
export const getWilayaById = (id: string): Wilaya | undefined => {
  return wilayas.find(wilaya => wilaya.id === id);
};

// Helper function to get wilayas sorted by name
export const getWilayasSorted = (language: 'fr' | 'ar' = 'fr'): Wilaya[] => {
  return [...wilayas].sort((a, b) => {
    if (language === 'ar') {
      return a.nameAr.localeCompare(b.nameAr, 'ar');
    }
    return a.name.localeCompare(b.name, 'fr');
  });
};