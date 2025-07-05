/*
  # إنشاء قاعدة البيانات الأساسية لنظام دالتكدز

  1. الجداول الجديدة
    - `profiles` - ملفات المستخدمين الشخصية
    - `salons` - بيانات الصالونات
    - `services` - الخدمات المتاحة
    - `staff` - الموظفين والمختصين
    - `bookings` - الحجوزات
    - `reviews` - التقييمات والمراجعات
    - `notifications` - الإشعارات
    - `salon_services` - ربط الصالونات بالخدمات
    - `staff_services` - ربط الموظفين بالخدمات

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الأمان المناسبة لكل دور

  3. الفهارس
    - إضافة فهارس للبحث السريع
    - تحسين الأداء للاستعلامات المتكررة
*/

-- إنشاء enum للأدوار
CREATE TYPE user_role AS ENUM ('customer', 'salon_owner', 'staff', 'admin');

-- إنشاء enum لحالة الحجز
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- إنشاء enum لحالة الصالون
CREATE TYPE salon_status AS ENUM ('active', 'pending', 'suspended');

-- جدول الملفات الشخصية
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  role user_role DEFAULT 'customer',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول الصالونات
CREATE TABLE IF NOT EXISTS salons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  phone text NOT NULL,
  email text,
  website text,
  logo_url text,
  cover_image_url text,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  status salon_status DEFAULT 'pending',
  working_hours jsonb DEFAULT '{}',
  amenities text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  duration integer NOT NULL, -- بالدقائق
  base_price numeric(10,2) NOT NULL,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول الموظفين
CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  specialties text[],
  experience_years integer DEFAULT 0,
  bio text,
  image_url text,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  is_active boolean DEFAULT true,
  working_schedule jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول ربط الصالونات بالخدمات
CREATE TABLE IF NOT EXISTS salon_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  price numeric(10,2) NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  UNIQUE(salon_id, service_id)
);

-- جدول ربط الموظفين بالخدمات
CREATE TABLE IF NOT EXISTS staff_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(staff_id, service_id)
);

-- جدول الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  service_id uuid REFERENCES services(id) ON DELETE RESTRICT,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration integer NOT NULL,
  total_price numeric(10,2) NOT NULL,
  status booking_status DEFAULT 'pending',
  customer_notes text,
  staff_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول التقييمات
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  staff_id uuid REFERENCES staff(id) ON DELETE SET NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images text[],
  created_at timestamptz DEFAULT now()
);

-- جدول الإشعارات
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  is_read boolean DEFAULT false,
  data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE salon_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للملفات الشخصية
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- سياسات الأمان للصالونات
CREATE POLICY "Anyone can view active salons" ON salons
  FOR SELECT USING (status = 'active');

CREATE POLICY "Salon owners can manage their salons" ON salons
  FOR ALL USING (owner_id = auth.uid());

-- سياسات الأمان للخدمات
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- سياسات الأمان للموظفين
CREATE POLICY "Anyone can view active staff" ON staff
  FOR SELECT USING (is_active = true);

CREATE POLICY "Staff can update own profile" ON staff
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Salon owners can manage their staff" ON staff
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM salons 
      WHERE id = staff.salon_id AND owner_id = auth.uid()
    )
  );

-- سياسات الأمان للحجوزات
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    customer_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM staff 
      WHERE id = bookings.staff_id AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM salons 
      WHERE id = bookings.salon_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Customers can create bookings" ON bookings
  FOR INSERT WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Authorized users can update bookings" ON bookings
  FOR UPDATE USING (
    customer_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM staff 
      WHERE id = bookings.staff_id AND user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM salons 
      WHERE id = bookings.salon_id AND owner_id = auth.uid()
    )
  );

-- سياسات الأمان للتقييمات
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their bookings" ON reviews
  FOR INSERT WITH CHECK (
    customer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = reviews.booking_id AND customer_id = auth.uid() AND status = 'completed'
    )
  );

-- سياسات الأمان للإشعارات
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_salons_city ON salons(city);
CREATE INDEX idx_salons_status ON salons(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_salon ON bookings(salon_id);
CREATE INDEX idx_reviews_salon ON reviews(salon_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);

-- إدراج بيانات تجريبية للخدمات
INSERT INTO services (name, category, description, duration, base_price, image_url) VALUES
('قص وتصفيف الشعر', 'Hair', 'قص احترافي مع تصفيف وتشطيب نهائي', 60, 2500, 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400'),
('صبغ وهايلايت الشعر', 'Hair', 'صبغ شعر فاخر مع هايلايت احترافي', 120, 4500, 'https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=400'),
('تنظيف البشرة العميق', 'Skincare', 'علاج مكثف لتنظيف البشرة وتجديدها', 75, 3200, 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400'),
('علاج مكافحة الشيخوخة', 'Skincare', 'علاج متقدم لمكافحة علامات التقدم في السن', 90, 4800, 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400'),
('مانيكير جل', 'Nails', 'مانيكير طويل المدى مع فن الأظافر الاحترافي', 45, 1800, 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg?auto=compress&cs=tinysrgb&w=400'),
('باديكير وسبا القدمين', 'Nails', 'باديكير مريح مع علاج سبا فاخر للقدمين', 60, 2200, 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400'),
('مساج كامل للجسم', 'Wellness', 'مساج علاجي كامل للجسم للاسترخاء التام', 90, 3800, 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=400'),
('باقة مكياج العروس', 'Makeup', 'مكياج عروس كامل مع جلسة تجريبية ولمسات أخيرة', 120, 6500, 'https://images.pexels.com/photos/3997378/pexels-photo-3997378.jpeg?auto=compress&cs=tinysrgb&w=400');