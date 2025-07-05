import { TimeSlot } from '../types/booking';

export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  return slots.map((time, index) => ({
    id: `${date}-${time}`,
    time,
    available: Math.random() > 0.3 // Simulate availability
  }));
};