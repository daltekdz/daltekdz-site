/*
  # إنشاء قاعدة بيانات دالتكدز - المخطط الجديد

  1. الجداول الجديدة
    - `users` - بيانات الزبائن
    - `vendors` - أصحاب المتاجر والصالونات
    - `services` - الخدمات المتاحة
    - `bookings` - الحجوزات
    - `reviews` - التقييمات والمراجعات

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الأمان المناسبة

  3. الفهارس
    - إضافة فهارس للبحث السريع والأداء المحسن
*/

-- إنشاء enum للجنس
CREATE TYPE gender_type AS ENUM ('ذكر', 'أنثى');

-- إنشاء enum لنوع المتجر
CREATE TYPE vendor_type AS ENUM ('صالون رجالي', 'صالون نسائي', 'عيادة تجميل', 'مركز تجميل');

-- إنشاء enum لحالة الحجز
CREATE TYPE booking_status AS ENUM ('معلق', 'مؤكد', 'مكتمل', 'ملغى');

-- إنشاء enum للفئات المستهدفة
CREATE TYPE target_gender AS ENUM ('ذكر', 'أنثى', 'الجميع');

-- جدول المستخدمين (الزبائن)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  phone_number text NOT NULL,
  gender gender_type NOT NULL,
  wilaya text NOT NULL,
  commune text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول أصحاب المتاجر
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name text NOT NULL,
  type vendor_type NOT NULL,
  description text,
  address text NOT NULL,
  wilaya text NOT NULL,
  commune text NOT NULL,
  location point, -- للموقع الجغرافي
  cover_image text,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) NOT NULL,
  duration integer NOT NULL, -- بالدقائق
  gender_target target_gender NOT NULL,
  category text NOT NULL,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  description text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول الحجوزات
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE RESTRICT,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  time_slot time NOT NULL,
  status booking_status DEFAULT 'معلق',
  customer_notes text,
  vendor_notes text,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول التقييمات
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  review_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Enable insert for new users" ON users
  FOR INSERT WITH CHECK (true);

-- سياسات الأمان للمتاجر
CREATE POLICY "Anyone can view active vendors" ON vendors
  FOR SELECT USING (is_active = true);

CREATE POLICY "Vendors can manage their own store" ON vendors
  FOR ALL USING (auth.uid()::text = user_id::text);

-- سياسات الأمان للخدمات
CREATE POLICY "Anyone can view active services" ON services
  FOR SELECT USING (is_active = true);

CREATE POLICY "Vendors can manage their services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE id = services.vendor_id AND user_id::text = auth.uid()::text
    )
  );

-- سياسات الأمان للحجوزات
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    auth.uid()::text = customer_id::text OR 
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE id = bookings.vendor_id AND user_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Customers can create bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid()::text = customer_id::text);

CREATE POLICY "Authorized users can update bookings" ON bookings
  FOR UPDATE USING (
    auth.uid()::text = customer_id::text OR 
    EXISTS (
      SELECT 1 FROM vendors 
      WHERE id = bookings.vendor_id AND user_id::text = auth.uid()::text
    )
  );

-- سياسات الأمان للتقييمات
CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews" ON reviews
  FOR INSERT WITH CHECK (
    auth.uid()::text = customer_id::text AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE customer_id = reviews.customer_id 
      AND vendor_id = reviews.vendor_id 
      AND status = 'مكتمل'
    )
  );

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wilaya ON users(wilaya);
CREATE INDEX idx_vendors_wilaya ON vendors(wilaya);
CREATE INDEX idx_vendors_type ON vendors(type);
CREATE INDEX idx_vendors_active ON vendors(is_active);
CREATE INDEX idx_services_vendor ON services(vendor_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- إدراج بيانات تجريبية للولايات الجزائرية
CREATE TABLE IF NOT EXISTS wilayas (
  id serial PRIMARY KEY,
  code text NOT NULL,
  name text NOT NULL,
  name_ar text NOT NULL
);

INSERT INTO wilayas (code, name, name_ar) VALUES
('01', 'Adrar', 'أدرار'),
('02', 'Chlef', 'الشلف'),
('03', 'Laghouat', 'الأغواط'),
('04', 'Oum El Bouaghi', 'أم البواقي'),
('05', 'Batna', 'باتنة'),
('06', 'Béjaïa', 'بجاية'),
('07', 'Biskra', 'بسكرة'),
('08', 'Béchar', 'بشار'),
('09', 'Blida', 'البليدة'),
('10', 'Bouira', 'البويرة'),
('11', 'Tamanrasset', 'تمنراست'),
('12', 'Tébessa', 'تبسة'),
('13', 'Tlemcen', 'تلمسان'),
('14', 'Tiaret', 'تيارت'),
('15', 'Tizi Ouzou', 'تيزي وزو'),
('16', 'Algiers', 'الجزائر'),
('17', 'Djelfa', 'الجلفة'),
('18', 'Jijel', 'جيجل'),
('19', 'Sétif', 'سطيف'),
('20', 'Saïda', 'سعيدة'),
('21', 'Skikda', 'سكيكدة'),
('22', 'Sidi Bel Abbès', 'سيدي بلعباس'),
('23', 'Annaba', 'عنابة'),
('24', 'Guelma', 'قالمة'),
('25', 'Constantine', 'قسنطينة'),
('26', 'Médéa', 'المدية'),
('27', 'Mostaganem', 'مستغانم'),
('28', 'MSila', 'المسيلة'),
('29', 'Mascara', 'معسكر'),
('30', 'Ouargla', 'ورقلة'),
('31', 'Oran', 'وهران'),
('32', 'El Bayadh', 'البيض'),
('33', 'Illizi', 'إليزي'),
('34', 'Bordj Bou Arréridj', 'برج بوعريريج'),
('35', 'Boumerdès', 'بومرداس'),
('36', 'El Tarf', 'الطارف'),
('37', 'Tindouf', 'تندوف'),
('38', 'Tissemsilt', 'تيسمسيلت'),
('39', 'El Oued', 'الوادي'),
('40', 'Khenchela', 'خنشلة'),
('41', 'Souk Ahras', 'سوق أهراس'),
('42', 'Tipaza', 'تيبازة'),
('43', 'Mila', 'ميلة'),
('44', 'Aïn Defla', 'عين الدفلى'),
('45', 'Naâma', 'النعامة'),
('46', 'Aïn Témouchent', 'عين تموشنت'),
('47', 'Ghardaïa', 'غرداية'),
('48', 'Relizane', 'غليزان');

-- إدراج بيانات تجريبية للخدمات الشائعة
INSERT INTO services (name, price, duration, gender_target, category, vendor_id, description) VALUES
('قص شعر رجالي', 800, 30, 'ذكر', 'قص الشعر', (SELECT id FROM vendors LIMIT 1), 'قص شعر احترافي للرجال'),
('حلاقة ذقن', 500, 20, 'ذكر', 'العناية بالذقن', (SELECT id FROM vendors LIMIT 1), 'حلاقة وتهذيب الذقن'),
('قص وتصفيف نسائي', 2500, 60, 'أنثى', 'قص الشعر', (SELECT id FROM vendors LIMIT 1), 'قص وتصفيف شعر احترافي للسيدات'),
('صبغ الشعر', 4000, 120, 'أنثى', 'صبغ الشعر', (SELECT id FROM vendors LIMIT 1), 'صبغ شعر بألوان متنوعة'),
('مانيكير', 1500, 45, 'أنثى', 'العناية بالأظافر', (SELECT id FROM vendors LIMIT 1), 'عناية كاملة بالأظافر'),
('باديكير', 2000, 60, 'أنثى', 'العناية بالأقدام', (SELECT id FROM vendors LIMIT 1), 'عناية كاملة بأظافر القدمين'),
('تنظيف البشرة', 3500, 75, 'الجميع', 'العناية بالبشرة', (SELECT id FROM vendors LIMIT 1), 'تنظيف عميق للبشرة'),
('مساج استرخاء', 4500, 90, 'الجميع', 'المساج والاسترخاء', (SELECT id FROM vendors LIMIT 1), 'جلسة مساج للاسترخاء التام');

-- إنشاء دالة لتحديث التقييم التلقائي
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE vendors 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM reviews 
      WHERE vendor_id = NEW.vendor_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE vendor_id = NEW.vendor_id
    )
  WHERE id = NEW.vendor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء trigger لتحديث التقييم عند إضافة مراجعة جديدة
CREATE TRIGGER trigger_update_vendor_rating
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_vendor_rating();