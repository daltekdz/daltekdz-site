import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Plus, Send, X, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminNotificationsTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { notifications, sendNotification } = useAdmin();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'error',
    targetAudience: 'all_stores' as 'all_stores' | 'specific_stores' | 'customers',
    expiresAt: ''
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeText = (type: string) => {
    const typeMap = {
      info: isRTL ? 'معلومات' : 'Information',
      warning: isRTL ? 'تحذير' : 'Avertissement',
      success: isRTL ? 'نجاح' : 'Succès',
      error: isRTL ? 'خطأ' : 'Erreur'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  const getAudienceText = (audience: string) => {
    const audienceMap = {
      all_stores: isRTL ? 'جميع المتاجر' : 'Tous les magasins',
      specific_stores: isRTL ? 'متاجر محددة' : 'Magasins spécifiques',
      customers: isRTL ? 'العملاء' : 'Clients'
    };
    return audienceMap[audience as keyof typeof audienceMap] || audience;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await sendNotification({
      ...formData,
      isActive: true,
      expiresAt: formData.expiresAt || undefined
    });
    
    setFormData({
      title: '',
      message: '',
      type: 'info',
      targetAudience: 'all_stores',
      expiresAt: ''
    });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900">
              {isRTL ? 'إدارة الإشعارات' : 'Gestion des Notifications'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isRTL ? 'إرسال إشعارات للمتاجر والعملاء' : 'Envoyer des notifications aux magasins et clients'}
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <Plus className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {isRTL ? 'إشعار جديد' : 'Nouvelle notification'}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isRTL ? 'لا توجد إشعارات' : 'Aucune notification'}
            </h3>
            <p className="text-gray-500">
              {isRTL ? 'ستظهر الإشعارات هنا عند إنشائها' : 'Les notifications apparaîtront ici lorsqu\'elles seront créées'}
            </p>
          </div>
        ) : (
          notifications.map((notification, index) => {
            const TypeIcon = getTypeIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${getTypeColor(notification.type)}`}
              >
                <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)} ${isRTL ? 'ml-4' : 'mr-4'}`}>
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h3 className="font-semibold text-gray-900 mb-1">{notification.title}</h3>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>
                          {isRTL ? 'النوع:' : 'Type:'} {getTypeText(notification.type)}
                        </span>
                        <span>
                          {isRTL ? 'الجمهور:' : 'Audience:'} {getAudienceText(notification.targetAudience)}
                        </span>
                        <span>
                          {isRTL ? 'تاريخ الإنشاء:' : 'Créé le:'} {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                        {notification.expiresAt && (
                          <span>
                            {isRTL ? 'ينتهي في:' : 'Expire le:'} {new Date(notification.expiresAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    notification.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {notification.isActive ? (isRTL ? 'نشط' : 'Actif') : (isRTL ? 'غير نشط' : 'Inactif')}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create Notification Modal */}
      <AnimatePresence>
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCreateForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isRTL ? 'إنشاء إشعار جديد' : 'Créer une nouvelle notification'}
                  </h3>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'العنوان *' : 'Titre *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'عنوان الإشعار' : 'Titre de la notification'}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'الرسالة *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={isRTL ? 'محتوى الإشعار...' : 'Contenu de la notification...'}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? 'نوع الإشعار' : 'Type de notification'}
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <option value="info">{isRTL ? 'معلومات' : 'Information'}</option>
                        <option value="warning">{isRTL ? 'تحذير' : 'Avertissement'}</option>
                        <option value="success">{isRTL ? 'نجاح' : 'Succès'}</option>
                        <option value="error">{isRTL ? 'خطأ' : 'Erreur'}</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {isRTL ? 'الجمهور المستهدف' : 'Audience cible'}
                      </label>
                      <select
                        value={formData.targetAudience}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value as any }))}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <option value="all_stores">{isRTL ? 'جميع المتاجر' : 'Tous les magasins'}</option>
                        <option value="specific_stores">{isRTL ? 'متاجر محددة' : 'Magasins spécifiques'}</option>
                        <option value="customers">{isRTL ? 'العملاء' : 'Clients'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'تاريخ الانتهاء (اختياري)' : 'Date d\'expiration (optionnel)'}
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.expiresAt}
                      onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {isRTL ? 'إلغاء' : 'Annuler'}
                    </button>
                    <button
                      type="submit"
                      className={`flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'إرسال الإشعار' : 'Envoyer la notification'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};