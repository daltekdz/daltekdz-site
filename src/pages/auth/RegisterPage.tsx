import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { wilayas, getWilayasSorted } from '../../data/wilayas';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export const RegisterPage: React.FC = () => {
  const { t, isRTL, language } = useLanguage();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    gender: 'ذكر' as 'ذكر' | 'أنثى',
    wilaya: '',
    commune: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const sortedWilayas = getWilayasSorted(language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(isRTL ? 'كلمات المرور غير متطابقة' : 'Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const success = await signUp(formData);
      if (success) {
        navigate('/');
      } else {
        setError(isRTL ? 'حدث خطأ أثناء إنشاء الحساب' : 'Erreur lors de la création du compte');
      }
    } catch (err: any) {
      setError(err.message || (isRTL ? 'حدث خطأ أثناء إنشاء الحساب' : 'Erreur lors de la création du compte'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A0000]/10 via-gray-50 to-[#1A0000]/5">
      <Navbar />
      <div className="pt-20 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
          <div className={`text-center ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isRTL ? 'إنشاء حساب جديد' : 'Créer un compte'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isRTL ? 'لديك حساب بالفعل؟' : 'Déjà un compte?'}{' '}
              <Link to="/login" className="font-medium text-[#1A0000] hover:text-[#2A0000] transition-colors">
                {isRTL ? 'تسجيل الدخول' : 'Se connecter'}
              </Link>
            </p>
          </div>

          <form className="mt-6 sm:mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="md:col-span-2">
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <User className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'الاسم الكامل' : 'Nom complet'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet'}
                  />
                </div>

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Mail className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-left text-sm sm:text-base"
                    placeholder="your.email@example.com"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Phone className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'رقم الهاتف' : 'Téléphone'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-left text-sm sm:text-base"
                    placeholder="0555 123 456"
                    dir="ltr"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`text-sm font-medium text-gray-700 mb-2 block ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الجنس' : 'Genre'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('gender', 'ذكر')}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                        formData.gender === 'ذكر'
                          ? 'border-[#1A0000] bg-[#1A0000]/10 text-[#1A0000]'
                          : 'border-gray-200 hover:border-[#1A0000]/50'
                      }`}
                    >
                      <div className="font-medium">{isRTL ? 'ذكر' : 'Homme'}</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInputChange('gender', 'أنثى')}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
                        formData.gender === 'أنثى'
                          ? 'border-[#1A0000] bg-[#1A0000]/10 text-[#1A0000]'
                          : 'border-gray-200 hover:border-[#1A0000]/50'
                      }`}
                    >
                      <div className="font-medium">{isRTL ? 'أنثى' : 'Femme'}</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'الولاية' : 'Wilaya'}
                  </label>
                  <select
                    required
                    value={formData.wilaya}
                    onChange={(e) => handleInputChange('wilaya', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    <option value="">{isRTL ? 'اختر الولاية' : 'Choisir la wilaya'}</option>
                    {sortedWilayas.map(wilaya => (
                      <option key={wilaya.id} value={wilaya.id}>
                        {isRTL ? wilaya.nameAr : wilaya.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin className={`h-4 w-4 text-[#C8860D] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'البلدية' : 'Commune'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.commune}
                    onChange={(e) => handleInputChange('commune', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'أدخل اسم البلدية' : 'Entrez le nom de la commune'}
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
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
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

                <div>
                  <label className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Lock className={`h-4 w-4 text-[#1A0000] ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {isRTL ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A0000] focus:border-transparent transition-all duration-200 text-sm sm:text-base ${isRTL ? 'pl-10 sm:pl-12 pr-3 sm:pr-4' : 'pr-10 sm:pr-12 pl-3 sm:pl-4'}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${isRTL ? 'right-3' : 'left-3'}`}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex items-center justify-center px-4 py-2 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1A0000] to-[#2A0000] hover:from-[#2A0000] hover:to-[#1A0000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <UserPlus className={`h-4 w-4 sm:h-5 sm:w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'إنشاء الحساب' : 'Créer le compte'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};