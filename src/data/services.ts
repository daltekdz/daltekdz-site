import { Service } from '../types/booking';

export const services: Service[] = [
  {
    id: '1',
    name: 'قص وتصفيف الشعر الاحترافي',
    category: 'Hair',
    duration: 60,
    price: 2500,
    description: 'قص شعر احترافي مع تصفيف وتشطيب نهائي',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'صبغ وهايلايت الشعر',
    category: 'Hair',
    duration: 120,
    price: 4500,
    description: 'صبغ شعر فاخر مع هايلايت احترافي',
    image: 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'تنظيف البشرة العميق',
    category: 'Skincare',
    duration: 75,
    price: 3200,
    description: 'علاج مكثف لتنظيف البشرة وتجديدها',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'علاج مكافحة الشيخوخة',
    category: 'Skincare',
    duration: 90,
    price: 4800,
    description: 'علاج متقدم لمكافحة علامات التقدم في السن',
    image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '5',
    name: 'مانيكير جل',
    category: 'Nails',
    duration: 45,
    price: 1800,
    description: 'مانيكير طويل المدى مع فن الأظافر الاحترافي',
    image: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    name: 'باديكير وسبا القدمين',
    category: 'Nails',
    duration: 60,
    price: 2200,
    description: 'باديكير مريح مع علاج سبا فاخر للقدمين',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '7',
    name: 'مساج كامل للجسم',
    category: 'Wellness',
    duration: 90,
    price: 3800,
    description: 'مساج علاجي كامل للجسم للاسترخاء التام',
    image: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    name: 'باقة مكياج العروس',
    category: 'Makeup',
    duration: 120,
    price: 6500,
    description: 'مكياج عروس كامل مع جلسة تجريبية ولمسات أخيرة',
    image: 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const serviceCategories = [
  { id: 'all', name: 'جميع الخدمات', icon: '✨' },
  { id: 'Hair', name: 'الشعر', icon: '💇‍♀️' },
  { id: 'Skincare', name: 'العناية بالبشرة', icon: '🧴' },
  { id: 'Nails', name: 'الأظافر', icon: '💅' },
  { id: 'Wellness', name: 'الاسترخاء', icon: '🧘‍♀️' },
  { id: 'Makeup', name: 'المكياج', icon: '💄' }
];