import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

// Import pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { CreateStorePage } from './pages/store/CreateStorePage';
import { StoreSetupPage } from './pages/store/StoreSetupPage';
import { StoreDashboard } from './pages/store/StoreDashboard';
import { StoresPage } from './pages/StoresPage';
import { StorePage } from './pages/StorePage';

// Import admin pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Import components
import { LocationPopup } from './components/LocationPopup';
import { FloatingActionButtons } from './components/FloatingActionButtons';

// Protected Admin Route Component
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <NotificationProvider>
          <AdminProvider>
            <Router>
              <LocationPopup />
              <FloatingActionButtons />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/stores" element={<StoresPage />} />
                <Route path="/store/:storeId" element={<StorePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Store Routes */}
                <Route path="/create-store" element={<CreateStorePage />} />
                <Route path="/create-store/setup" element={<StoreSetupPage />} />
                <Route path="/store/dashboard" element={<StoreDashboard />} />
                
                {/* Admin Routes */}
                <Route path="/admin-login" element={<AdminLoginPage />} />
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  } 
                />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </AdminProvider>
        </NotificationProvider>
      </LocationProvider>
    </LanguageProvider>
  );
}

export default App;