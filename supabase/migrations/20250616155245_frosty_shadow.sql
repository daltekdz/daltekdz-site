/*
  # نظام إنشاء المتاجر - دالتكدز

  1. الجداول الجديدة
    - `store_plans` - باقات المتاجر
    - `stores` - بيانات المتاجر
    - `store_services` - خدمات المتاجر
    - `store_bookings` - حجوزات المتاجر
    - `store_reviews` - تقييمات المتاجر

  2. الأمان
    - تفعيل RLS على جميع الجداول
    - إضافة سياسات الأمان المناسبة

  3. البيانات الأولية
    - إدراج باقات المتاجر الثلاث
    - إدراج أنواع المتاجر المختلفة
*/

-- إنشاء enum لأنواع المتاجر
CREATE TYPE store_type AS ENUM (
  'mens_salon',
  'womens_salon', 
  'beauty_clinic',
  'kids_salon',
  'spa_center',
  'nail_salon'
);

-- إنشاء enum لباقات المتاجر
CREATE TYPE plan_type AS ENUM ('silver', 'gold', 'platinum');

-- إنشاء enum لحالة المتجر
CREATE TYPE store_status AS ENUM ('active', 'pending', 'suspended', 'cancelled');

-- جدول باقات المتاجر
CREATE TABLE IF NOT EXISTS store_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type plan_type NOT NULL UNIQUE,
  price_monthly numeric(10,2) NOT NULL,
  price_yearly numeric(10,2) NOT NULL,
  max_services integer,
  features jsonb DEFAULT '[]',
  limitations jsonb DEFAULT '[]',
  is_popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول المتاجر
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type store_type NOT NULL,
  plan_id uuid REFERENCES store_plans(id),
  description text,
  address text NOT NULL,
  wilaya text NOT NULL,
  commune text NOT NULL,
  phone text NOT NULL,
  email text,
  logo_url text,
  cover_image_url text,
  working_hours jsonb DEFAULT '{}',
  location point,
  rating numeric(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  total_bookings integer DEFAULT 0,
  status store_status DEFAULT 'pending',
  subscription_start timestamptz,
  subscription_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول خدمات المتاجر
CREATE TABLE IF NOT EXISTS store_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  duration integer NOT NULL, -- بالدقائق
  category text NOT NULL,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول حجوزات المتاجر
CREATE TABLE IF NOT EXISTS store_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  service_id uuid REFERENCES store_services(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  duration integer NOT NULL,
  total_price numeric(10,2) NOT NULL,
  status booking_status DEFAULT 'معلق',
  customer_notes text,
  store_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- جدول تقييمات المتاجر
CREATE TABLE IF NOT EXISTS store_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES store_bookings(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images text[],
  created_at timestamptz DEFAULT now()
);

-- تفعيل RLS على جميع الجداول
ALTER TABLE store_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_reviews ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لباقات المتاجر
CREATE POLICY "Anyone can view store plans" ON store_plans
  FOR SELECT USING (true);

-- سياسات الأمان للمتاجر
CREATE POLICY "Anyone can view active stores" ON stores
  FOR SELECT USING (status = 'active');

CREATE POLICY "Store owners can manage their stores" ON stores
  FOR ALL USING (owner_id::text = auth.uid()::text);

CREATE POLICY "Users can create stores" ON stores
  FOR INSERT WITH CHECK (owner_id::text = auth.uid()::text);

-- سياسات الأمان لخدمات المتاجر
CREATE POLICY "Anyone can view active store services" ON store_services
  FOR SELECT USING (
    is_active = true AND 
    EXISTS (SELECT 1 FROM stores WHERE id = store_services.store_id AND status = 'active')
  );

CREATE POLICY "Store owners can manage their services" ON store_services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM stores 
      WHERE id = store_services.store_id AND owner_id::text = auth.uid()::text
    )
  );

-- سياسات الأمان لحجوزات المتاجر
CREATE POLICY "Users can view own bookings" ON store_bookings
  FOR SELECT USING (
    customer_id::text = auth.uid()::text OR 
    EXISTS (
      SELECT 1 FROM stores 
      WHERE id = store_bookings.store_id AND owner_id::text = auth.uid()::text
    )
  );

CREATE POLICY "Customers can create bookings" ON store_bookings
  FOR INSERT WITH CHECK (customer_id::text = auth.uid()::text);

CREATE POLICY "Authorized users can update bookings" ON store_bookings
  FOR UPDATE USING (
    customer_id::text = auth.uid()::text OR 
    EXISTS (
      SELECT 1 FROM stores 
      WHERE id = store_bookings.store_id AND owner_id::text = auth.uid()::text
    )
  );

-- سياسات الأمان لتقييمات المتاجر
CREATE POLICY "Anyone can view store reviews" ON store_reviews
  FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their bookings" ON store_reviews
  FOR INSERT WITH CHECK (
    customer_id::text = auth.uid()::text AND
    EXISTS (
      SELECT 1 FROM store_bookings 
      WHERE id = store_reviews.booking_id 
      AND customer_id::text = auth.uid()::text 
      AND status = 'مكتمل'
    )
  );

-- إنشاء الفهارس لتحسين الأداء
CREATE INDEX idx_stores_owner ON stores(owner_id);
CREATE INDEX idx_stores_wilaya ON stores(wilaya);
CREATE INDEX idx_stores_type ON stores(type);
CREATE INDEX idx_stores_status ON stores(status);
CREATE INDEX idx_store_services_store ON store_services(store_id);
CREATE INDEX idx_store_bookings_store ON store_bookings(store_id);
CREATE INDEX idx_store_bookings_customer ON store_bookings(customer_id);
CREATE INDEX idx_store_bookings_date ON store_bookings(booking_date);
CREATE INDEX idx_store_reviews_store ON store_reviews(store_id);

-- إدراج باقات المتاجر
INSERT INTO store_plans (name, type, price_monthly, price_yearly, max_services, features, limitations, is_popular) VALUES
(
  'Silver',
  'silver',
  2500,
  25000,
  5,
  '["حتى 5 خدمات", "لا توجد إعلانات", "دعم فني أساسي", "صفحة متجر بسيطة"]',
  '["لا توجد تقارير", "لا توجد إحصائيات متقدمة"]',
  false
),
(
  'Gold',
  'gold',
  4500,
  45000,
  15,
  '["حتى 15 خدمة", "صفحة متجر خاصة", "إمكانية تقييم العملاء", "دعم فني متقدم", "إدارة المواعيد", "تقارير أساسية"]',
  '[]',
  true
),
(
  'Platinum',
  'platinum',
  7500,
  75000,
  -1,
  '["عدد خدمات غير محدود", "تقارير وتحليلات متقدمة", "إمكانية الإعلانات الممولة", "صفحة احترافية مخصصة", "دعم فني مخصص 24/7", "تكامل مع وسائل التواصل", "إحصائيات مفصلة", "أولوية في نتائج البحث"]',
  '[]',
  false
);

-- إنشاء دالة لتحديث تقييم المتجر
CREATE OR REPLACE FUNCTION update_store_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stores 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM store_reviews 
      WHERE store_id = NEW.store_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM store_reviews 
      WHERE store_id = NEW.store_id
    )
  WHERE id = NEW.store_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء trigger لتحديث التقييم عند إضافة مراجعة جديدة
CREATE TRIGGER trigger_update_store_rating
  AFTER INSERT ON store_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_store_rating();

-- إنشاء دالة لتحديث عدد الحجوزات
CREATE OR REPLACE FUNCTION update_store_bookings_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE stores 
  SET total_bookings = (
    SELECT COUNT(*) 
    FROM store_bookings 
    WHERE store_id = NEW.store_id
  )
  WHERE id = NEW.store_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء trigger لتحديث عدد الحجوزات
CREATE TRIGGER trigger_update_store_bookings_count
  AFTER INSERT ON store_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_store_bookings_count();