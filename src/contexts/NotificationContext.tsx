import React, { createContext, useContext, useState, useCallback } from 'react';
import { BookingDetails } from '../types/booking';
import { whatsappNotification } from '../utils/whatsappNotification';

interface Notification {
  id: string;
  type: 'booking' | 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  bookingData?: {
    customerName: string;
    serviceName: string;
    date: string;
    time: string;
    phone?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  sendBookingNotification: (bookingData: BookingDetails) => void;
  sendWhatsAppNotification: (storePhone: string, bookingData: BookingDetails, storeName: string) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Auto-remove notification after 10 seconds for non-booking notifications
    if (notification.type !== 'booking') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 10000);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const sendBookingNotification = useCallback((bookingData: BookingDetails) => {
    const notification = {
      type: 'booking' as const,
      title: 'حجز جديد! 🎉',
      message: `تم حجز موعد جديد من طرف ${bookingData.customer.name} في ${bookingData.date} الساعة ${bookingData.time} للخدمة: ${bookingData.service?.name}`,
      bookingData: {
        customerName: bookingData.customer.name,
        serviceName: bookingData.service?.name || 'خدمة غير محددة',
        date: bookingData.date,
        time: bookingData.time,
        phone: bookingData.customer.phone
      }
    };
    
    addNotification(notification);
    
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification('حجز جديد - Daltekdz', {
        body: notification.message,
        icon: '/ChatGPT Image 16 juin 2025, 19_09_23.png',
        badge: '/ChatGPT Image 16 juin 2025, 19_09_23.png'
      });
    }
  }, [addNotification]);

  const sendWhatsAppNotification = useCallback(async (storePhone: string, bookingData: BookingDetails, storeName: string): Promise<boolean> => {
    try {
      return await whatsappNotification.sendBookingNotification(storePhone, bookingData, storeName);
    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
      return false;
    }
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    sendBookingNotification,
    sendWhatsAppNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};