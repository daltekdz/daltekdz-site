import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Navbar } from '../../components/layout/Navbar';

export const AdminLoginPage: React.FC = () => {
  const { isRTL } = useLanguage();
  const { signIn, loading } = useAdmin();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await signIn(formData.email, formData.password);
    if (success) {
      navigate('/admin-dashboard');
    } else {
      setError(isRTL ? 'بيانات تسجيل الدخول غير صحيحة' : 'Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navbar />
      <div className="pt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center mb-6 shadow-2xl"
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-2">
              {isRTL ? 'لوحة تحكم المسؤول' : 'Admin Dashboard'}
            </h2>
            <p className="text-gray-400">
              {isRTL ? 'دالتكدز - نظام إدارة المنصة' : 'Daltekdz - Platform Management'}
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <AlertCircle className={`h-5 w-5 text-red-400 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-red-300 text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'اسم المستخدم' : 'Nom d\'utilisateur'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                  placeholder={isRTL ? 'admindz' : 'admindz'}
                  dir="ltr"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-300 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'كلمة المرور' : 'Mot de passe'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 ${isRTL ? 'pl-12 pr-4' : 'pr-12 pl-4'}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors ${isRTL ? 'right-3' : 'left-3'}`}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'تسجيل الدخول' : 'Se connecter'}
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <h4 className={`text-blue-300 font-medium mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'بيانات الدخول:' : 'Identifiants de connexion:'}
              </h4>
              <div className={`text-sm text-blue-200 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                <p><strong>{isRTL ? 'اسم المستخدم:' : 'Nom d\'utilisateur:'}</strong> admindz</p>
                <p><strong>{isRTL ? 'كلمة المرور:' : 'Mot de passe:'}</strong> 12345</p>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Daltekdz. {isRTL ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};