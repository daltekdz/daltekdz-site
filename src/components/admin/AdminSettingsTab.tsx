import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, Shield, Bell, Database, Globe, Users, DollarSign } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminSettingsTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const [settings, setSettings] = useState({
    siteName: 'Daltekdz',
    siteDescription: 'منصة حجز خدمات الجمال في الجزائر',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    commissionRate: 5,
    minBookingAmount: 500,
    maxBookingAmount: 50000,
    supportEmail: 'support@daltekdz.com',
    supportPhone: '+213 555 123 456',
    defaultLanguage: 'ar',
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif'],
    maxFileSize: 5, // MB
    backupFrequency: 'daily',
    sessionTimeout: 30 // minutes
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  const settingSections = [
    {
      title: isRTL ? 'الإعدادات العامة' : 'Paramètres Généraux',
      icon: Settings,
      fields: [
        {
          key: 'siteName',
          label: isRTL ? 'اسم الموقع' : 'Nom du site',
          type: 'text'
        },
        {
          key: 'siteDescription',
          label: isRTL ? 'وصف الموقع' : 'Description du site',
          type: 'textarea'
        },
        {
          key: 'defaultLanguage',
          label: isRTL ? 'اللغة الافتراضية' : 'Langue par défaut',
          type: 'select',
          options: [
            { value: 'ar', label: isRTL ? 'العربية' : 'Arabe' },
            { value: 'fr', label: isRTL ? 'الفرنسية' : 'Français' }
          ]
        }
      ]
    },
    {
      title: isRTL ? 'الأمان والصلاحيات' : 'Sécurité et Permissions',
      icon: Shield,
      fields: [
        {
          key: 'maintenanceMode',
          label: isRTL ? 'وضع الصيانة' : 'Mode maintenance',
          type: 'toggle'
        },
        {
          key: 'registrationEnabled',
          label: isRTL ? 'السماح بالتسجيل' : 'Autoriser l\'inscription',
          type: 'toggle'
        },
        {
          key: 'sessionTimeout',
          label: isRTL ? 'انتهاء الجلسة (دقيقة)' : 'Expiration de session (min)',
          type: 'number'
        }
      ]
    },
    {
      title: isRTL ? 'الإشعارات' : 'Notifications',
      icon: Bell,
      fields: [
        {
          key: 'emailNotifications',
          label: isRTL ? 'إشعارات البريد الإلكتروني' : 'Notifications email',
          type: 'toggle'
        },
        {
          key: 'smsNotifications',
          label: isRTL ? 'إشعارات الرسائل النصية' : 'Notifications SMS',
          type: 'toggle'
        },
        {
          key: 'supportEmail',
          label: isRTL ? 'بريد الدعم' : 'Email de support',
          type: 'email'
        },
        {
          key: 'supportPhone',
          label: isRTL ? 'هاتف الدعم' : 'Téléphone de support',
          type: 'tel'
        }
      ]
    },
    {
      title: isRTL ? 'الإعدادات المالية' : 'Paramètres Financiers',
      icon: DollarSign,
      fields: [
        {
          key: 'commissionRate',
          label: isRTL ? 'نسبة العمولة (%)' : 'Taux de commission (%)',
          type: 'number'
        },
        {
          key: 'minBookingAmount',
          label: isRTL ? 'أقل مبلغ حجز (د.ج)' : 'Montant min. réservation (DA)',
          type: 'number'
        },
        {
          key: 'maxBookingAmount',
          label: isRTL ? 'أعلى مبلغ حجز (د.ج)' : 'Montant max. réservation (DA)',
          type: 'number'
        }
      ]
    },
    {
      title: isRTL ? 'إعدادات النظام' : 'Paramètres Système',
      icon: Database,
      fields: [
        {
          key: 'maxFileSize',
          label: isRTL ? 'حجم الملف الأقصى (MB)' : 'Taille max. fichier (MB)',
          type: 'number'
        },
        {
          key: 'backupFrequency',
          label: isRTL ? 'تكرار النسخ الاحتياطي' : 'Fréquence de sauvegarde',
          type: 'select',
          options: [
            { value: 'daily', label: isRTL ? 'يومي' : 'Quotidien' },
            { value: 'weekly', label: isRTL ? 'أسبوعي' : 'Hebdomadaire' },
            { value: 'monthly', label: isRTL ? 'شهري' : 'Mensuel' }
          ]
        }
      ]
    }
  ];

  const renderField = (field: any) => {
    const value = settings[field.key as keyof typeof settings];

    switch (field.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.checked }))}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        );

      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value as string}
            onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
            rows={3}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
          />
        );

      default:
        return (
          <input
            type={field.type}
            value={value as string | number}
            onChange={(e) => setSettings(prev => ({ 
              ...prev, 
              [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value 
            }))}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      {settingSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <section.icon className="h-5 w-5 text-red-600" />
            </div>
            <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
              {section.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={`flex justify-end ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <button
          onClick={handleSave}
          className={`px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <Save className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'حفظ الإعدادات' : 'Sauvegarder les paramètres'}
        </button>
      </motion.div>
    </div>
  );
};