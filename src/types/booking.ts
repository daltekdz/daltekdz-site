export interface Service {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  description: string;
  image: string;
}

export interface Staff {
  id: string;
  name: string;
  specialties: string[];
  image: string;
  rating: number;
  experience: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingDetails {
  service: Service | null;
  staff: Staff | null;
  date: string;
  time: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  };
}

export interface BookingStep {
  id: number;
  title: string;
  completed: boolean;
  active: boolean;
}