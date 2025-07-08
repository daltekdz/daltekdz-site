import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'store_owner' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: any) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('daltekdz_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('daltekdz_user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.includes('admin') ? 'مدير النظام' : 'أحمد محمد',
        email: email,
        role: email.includes('admin') ? 'admin' : email.includes('store') ? 'store_owner' : 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.includes('admin') ? 'مدير النظام' : 'أحمد محمد')}&background=1A0000&color=fff`
      };

      setUser(mockUser);
      localStorage.setItem('daltekdz_user', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
      return false;
    }
  };

  const signUp = async (userData: any): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.full_name,
        email: userData.email,
        role: 'customer',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name)}&background=1A0000&color=fff`
      };

      setUser(newUser);
      localStorage.setItem('daltekdz_user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('daltekdz_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};