export interface StaffMember {
  id: string;
  name: string;
  image: string;
  specialties: string[];
  description: string;
  services: string[]; // IDs of services they provide
  rating: number;
  totalReviews: number;
  isActive: boolean;
  storeId: string;
  createdAt: string;
}

export interface StaffReview {
  id: string;
  staffId: string;
  customerId: string;
  customerName: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface StaffLimits {
  silver: number;
  gold: number;
  platinum: number;
}

export const STAFF_LIMITS: StaffLimits = {
  silver: 2,
  gold: 4,
  platinum: 8
};