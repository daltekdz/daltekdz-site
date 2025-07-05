import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  gender: 'ذكر' | 'أنثى';
  wilaya: string;
  commune: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (userData: Omit<User, 'id'>) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
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
  const [loading, setLoading] = useState(false);

  const signUp = async (userData: Omit<User, 'id'>): Promise<User> => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData
    };
    setUser(newUser);
    return newUser;
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    // Mock sign in
    const mockUser: User = {
      id: '1',
      full_name: 'أحمد محمد',
      email,
      phone_number: '+213 555 123 456',
      gender: 'ذكر',
      wilaya: 'الجزائر',
      commune: 'الجزائر الوسطى'
    };
    setUser(mockUser);
    return mockUser;
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
  };

  const updateUser = async (updates: Partial<User>): Promise<void> => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};