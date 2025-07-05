import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface User {
  id: string;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  gender: 'ذكر' | 'أنثى';
  wilaya: string;
  commune: string;
  created_at: string;
  updated_at: string;
}

export interface Vendor {
  id: string;
  store_name: string;
  type: 'صالون رجالي' | 'صالون نسائي' | 'عيادة تجميل' | 'مركز تجميل';
  description?: string;
  address: string;
  wilaya: string;
  commune: string;
  location?: { x: number; y: number };
  cover_image?: string;
  user_id: string;
  rating: number;
  total_reviews: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  gender_target: 'ذكر' | 'أنثى' | 'الجميع';
  category: string;
  vendor_id: string;
  description?: string;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  customer_id: string;
  service_id: string;
  vendor_id: string;
  booking_date: string;
  time_slot: string;
  status: 'معلق' | 'مؤكد' | 'مكتمل' | 'ملغى';
  customer_notes?: string;
  vendor_notes?: string;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  customer_id: string;
  vendor_id: string;
  rating: number;
  comment?: string;
  review_date: string;
  created_at: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: string;
  name_ar: string;
}

// Helper functions for database operations
export const dbHelpers = {
  // Users
  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;
    return data;
  },

  // ✅ Vendors
  async createVendor(vendorData: Omit<Vendor, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('vendors')
      .insert(vendorData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVendorsByWilaya(wilaya: string) {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .eq('wilaya', wilaya)
      .eq('is_active', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getVendorServices(vendorId: string) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('vendor_id', vendorId)
      .eq('is_active', true);

    if (error) throw error;
    return data;
  },

  // Bookings
  async createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserBookings(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services (name, category, duration),
        vendors (store_name, address, cover_image)
      `)
      .eq('customer_id', userId)
      .order('booking_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getVendorBookings(vendorId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        users (full_name, phone_number),
        services (name, duration)
      `)
      .eq('vendor_id', vendorId)
      .order('booking_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Reviews
  async createReview(reviewData: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVendorReviews(vendorId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users (full_name)
      `)
      .eq('vendor_id', vendorId)
      .order('review_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Wilayas
  async getAllWilayas() {
    const { data, error } = await supabase
      .from('wilayas')
      .select('*')
      .order('name_ar');

    if (error) throw error;
    return data;
  }
};
