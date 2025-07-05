import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const LoginPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate login
      setTimeout(() => {
        navigate('/');
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/10 via-gray-50 to-[#1A0000]/5">
      <Navbar />
      <div className="pt-20 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isRTL ? 'تسجيل الدخول' : 'Connexion'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isRTL ? 'ليس لديك حساب؟' : 'Pas de compte?'}{' '}
              <Link to="/register" className="font-medium text-[#1A0000] hover:text-[#2A0000] transition-colors">
                {isRTL ? 'إنشاء حساب جديد' : 'Créer un compte'}
              </Link>
            </p>
          </div>

          <form className="mt-6 sm:mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
              {error && (
                <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Mail className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'your.email@example.com' : 'votre.email@exemple.com'}
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Lock className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'كلمة المرور' : 'Mot de passe'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'pl-10 sm:pl-12 pr-3 sm:pr-4' : 'pr-10 sm:pr-12 pl-3 sm:pl-4'}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${isRTL ? 'right-3' : 'left-3'}`}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1A0000] to-[#2A0000] hover:from-[#2A0000] hover:to-[#1A0000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <LogIn className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'تسجيل الدخول' : 'Se connecter'}
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#1A0000] hover:text-[#2A0000] transition-colors"
                >
                  {isRTL ? 'نسيت كلمة المرور؟' : 'Mot de passe oublié?'}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};