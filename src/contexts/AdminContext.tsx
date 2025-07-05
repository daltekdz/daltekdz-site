import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AdminStore, AdminCustomer, AdminStats, SupportMessage, AdminNotification } from '../types/admin';

interface AdminContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  stores: AdminStore[];
  customers: AdminCustomer[];
  stats: AdminStats;
  supportMessages: SupportMessage[];
  notifications: AdminNotification[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateStoreStatus: (storeId: string, status: string) => Promise<void>;
  updateStorePlan: (storeId: string, plan: string) => Promise<void>;
  deleteStore: (storeId: string) => Promise<void>;
  sendNotification: (notification: Omit<AdminNotification, 'id' | 'createdAt'>) => Promise<void>;
  respondToMessage: (messageId: string, response: string) => Promise<void>;
  updateMessageStatus: (messageId: string, status: string) => Promise<void>;
  getFeaturedStores: () => AdminStore[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock stores data with store IDs
  const [stores, setStores] = useState<AdminStore[]>([
    {
      id: 'store-1',
      name: 'صالون الأناقة للرجال',
      ownerName: 'أحمد محمد',
      ownerEmail: 'ahmed@example.com',
      type: 'صالون رجالي',
      plan: 'gold',
      status: 'active',
      subscriptionStart: '2024-01-01',
      subscriptionEnd: '2024-12-31',
      totalBookings: 156,
      rating: 4.8,
      totalReviews: 42,
      createdAt: '2024-01-01',
      address: 'شارع العربي بن مهيدي، وسط المدينة',
      phone: '+213 555 123 456'
    },
    {
      id: 'store-2',
      name: 'صالون لمسات الجمال',
      ownerName: 'فاطمة أحمد',
      ownerEmail: 'fatima@example.com',
      type: 'صالون نسائي',
      plan: 'silver',
      status: 'active',
      subscriptionStart: '2024-02-15',
      subscriptionEnd: '2024-08-15',
      totalBookings: 89,
      rating: 4.6,
      totalReviews: 28,
      createdAt: '2024-02-15',
      address: 'شارع ديدوش مراد، الجزائر العاصمة',
      phone: '+213 555 456 789'
    },
    {
      id: 'store-3',
      name: 'عيادة سبا الفاخرة',
      ownerName: 'سمير علي',
      ownerEmail: 'samir@example.com',
      type: 'عيادة تجميل',
      plan: 'platinum',
      status: 'active',
      subscriptionStart: '2024-03-10',
      subscriptionEnd: '2025-03-10',
      totalBookings: 210,
      rating: 4.9,
      totalReviews: 65,
      createdAt: '2024-03-10',
      address: 'حي بن عكنون، الجزائر العاصمة',
      phone: '+213 555 987 654'
    },
    {
      id: 'store-4',
      name: 'باربر شوب الملكي',
      ownerName: 'كريم حسن',
      ownerEmail: 'karim@example.com',
      type: 'صالون رجالي',
      plan: 'gold',
      status: 'active',
      subscriptionStart: '2024-04-05',
      subscriptionEnd: '2025-04-05',
      totalBookings: 124,
      rating: 4.7,
      totalReviews: 36,
      createdAt: '2024-04-05',
      address: 'حي حيدرة، الجزائر العاصمة',
      phone: '+213 555 789 123'
    },
    {
      id: 'store-5',
      name: 'مركز الجمال الشامل',
      ownerName: 'ليلى محمد',
      ownerEmail: 'leila@example.com',
      type: 'مركز تجميل',
      plan: 'platinum',
      status: 'pending',
      subscriptionStart: '2024-06-01',
      subscriptionEnd: '2025-06-01',
      totalBookings: 0,
      rating: 0,
      totalReviews: 0,
      createdAt: '2024-06-01',
      address: 'وهران، الجزائر',
      phone: '+213 555 321 654'
    }
  ]);

  const [customers, setCustomers] = useState<AdminCustomer[]>([]);

  // إحصائيات حقيقية لمنصة جديدة
  const [stats] = useState<AdminStats>({
    totalStores: 5,
    activeStores: 4,
    totalCustomers: 120,
    totalBookings: 579,
    weeklyBookings: 45,
    monthlyRevenue: 125000,
    topStores: [
      { id: 'store-3', name: 'عيادة سبا الفاخرة', rating: 4.9, bookings: 210 },
      { id: 'store-1', name: 'صالون الأناقة للرجال', rating: 4.8, bookings: 156 },
      { id: 'store-4', name: 'باربر شوب الملكي', rating: 4.7, bookings: 124 }
    ]
  });

  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([]);

  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (email === 'admindz' && password === '12345') {
        const admin: AdminUser = {
          id: 'admin1',
          email: 'admindz',
          role: 'super_admin',
          name: 'مدير النظام الرئيسي',
          createdAt: '2024-01-01'
        };
        setAdminUser(admin);
        setIsAuthenticated(true);
        localStorage.setItem('adminToken', 'daltekdz-admin-token');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setAdminUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  const updateStoreStatus = async (storeId: string, status: string) => {
    setStores(prev => prev.map(store => 
      store.id === storeId ? { ...store, status: status as any } : store
    ));
  };

  const updateStorePlan = async (storeId: string, plan: string) => {
    setStores(prev => prev.map(store => 
      store.id === storeId ? { ...store, plan: plan as any } : store
    ));
  };

  const deleteStore = async (storeId: string) => {
    setStores(prev => prev.filter(store => store.id !== storeId));
  };

  const sendNotification = async (notification: Omit<AdminNotification, 'id' | 'createdAt'>) => {
    const newNotification: AdminNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const respondToMessage = async (messageId: string, response: string) => {
    setSupportMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? {
            ...msg,
            responses: [...msg.responses, {
              id: Math.random().toString(36).substr(2, 9),
              message: response,
              isAdmin: true,
              createdAt: new Date().toISOString()
            }]
          }
        : msg
    ));
  };

  const updateMessageStatus = async (messageId: string, status: string) => {
    setSupportMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, status: status as any } : msg
    ));
  };

  // Get featured stores from localStorage
  const getFeaturedStores = (): AdminStore[] => {
    try {
      const featuredStoresData = localStorage.getItem('featuredStores');
      if (!featuredStoresData) return [];
      
      const featuredStores = JSON.parse(featuredStoresData);
      const now = new Date();
      
      // Filter active featured stores
      const activeIds = featuredStores
        .filter((fs: any) => fs.isActive && new Date(fs.endDate) > now)
        .map((fs: any) => fs.storeId);
      
      // Return the actual store objects
      return stores.filter(store => activeIds.includes(store.id));
    } catch (error) {
      console.error('Error getting featured stores:', error);
      return [];
    }
  };

  // التحقق من وجود token عند تحميل الصفحة
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'daltekdz-admin-token') {
      setAdminUser({
        id: 'admin1',
        email: 'admindz',
        role: 'super_admin',
        name: 'مدير النظام الرئيسي',
        createdAt: '2024-01-01'
      });
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    adminUser,
    isAuthenticated,
    stores,
    customers,
    stats,
    supportMessages,
    notifications,
    loading,
    signIn,
    signOut,
    updateStoreStatus,
    updateStorePlan,
    deleteStore,
    sendNotification,
    respondToMessage,
    updateMessageStatus,
    getFeaturedStores
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};