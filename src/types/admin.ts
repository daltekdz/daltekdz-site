export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
  createdAt: string;
}

export interface AdminStore {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  type: string;
  plan: 'silver' | 'gold' | 'platinum';
  status: 'active' | 'pending' | 'suspended' | 'cancelled';
  subscriptionStart: string;
  subscriptionEnd: string;
  totalBookings: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  address: string;
  phone: string;
}

export interface FeaturedStore {
  id: string;
  storeId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  wilaya: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  createdAt: string;
  isActive: boolean;
}

export interface AdminBooking {
  id: string;
  customerName: string;
  storeName: string;
  serviceName: string;
  date: string;
  time: string;
  status: string;
  amount: number;
  createdAt: string;
}

export interface AdminStats {
  totalStores: number;
  activeStores: number;
  totalCustomers: number;
  totalBookings: number;
  weeklyBookings: number;
  monthlyRevenue: number;
  topStores: Array<{
    id: string;
    name: string;
    rating: number;
    bookings: number;
  }>;
}

export interface SupportMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  responses: Array<{
    id: string;
    message: string;
    isAdmin: boolean;
    createdAt: string;
  }>;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all_stores' | 'specific_stores' | 'customers';
  targetIds?: string[];
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
}