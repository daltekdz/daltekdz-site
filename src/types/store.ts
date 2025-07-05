export interface StoreImage {
  id: string;
  storeId: string;
  url: string;
  isMain: boolean;
  createdAt: string;
}

export interface StoreService {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

export interface StoreAd {
  id: string;
  storeId: string;
  title: string;
  description: string;
  image: string;
  targetWilaya: string;
  targetCommune?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  views: number;
  clicks: number;
  createdAt: string;
}

export interface StoreReview {
  id: string;
  storeId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StoreStats {
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  averageRating: number;
  totalReviews: number;
}

export interface StoreSettings {
  allowNotifications: boolean;
  allowSmsNotifications: boolean;
  allowEmailNotifications: boolean;
  allowWhatsAppNotifications: boolean;
  whatsappNumber: string;
  emailForNotifications: string;
  autoConfirmBookings: boolean;
  cancellationPolicy: string;
}