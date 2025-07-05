import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminCustomersTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { customers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [wilayaFilter, setWilayaFilter] = useState('all');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWilaya = wilayaFilter === 'all' || customer.wilaya === wilayaFilter;
    
    return matchesSearch && matchesWilaya;
  });

  const uniqueWilayas = [...new Set(customers.map(c => c.wilaya))];

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900">
              {isRTL ? 'إدارة العملاء' : 'Gestion des Clients'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isRTL ? `${customers.length} عميل مسجل` : `${customers.length} clients enregistrés`}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={isRTL ? 'البحث في العملاء...' : 'Rechercher des clients...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
              />
            </div>

            {/* Wilaya Filter */}
            <select
              value={wilayaFilter}
              onChange={(e) => setWilayaFilter(e.target.value)}
              className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            >
              <option value="all">{isRTL ? 'جميع الولايات' : 'Toutes les wilayas'}</option>
              {uniqueWilayas.map(wilaya => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-3 text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isRTL ? 'لا توجد نتائج' : 'Aucun résultat'}
            </h3>
            <p className="text-gray-500">
              {isRTL ? 'لم يتم العثور على عملاء مطابقين لبحثك' : 'Aucun client ne correspond à votre recherche'}
            </p>
          </div>
        ) : (
          filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {customer.name.charAt(0)}
                </div>
                <div className={`${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    customer.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.isActive ? (isRTL ? 'نشط' : 'Actif') : (isRTL ? 'غير نشط' : 'Inactif')}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-sm">{customer.email}</span>
                </div>
                
                <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-sm">{customer.phone}</span>
                </div>
                
                <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-sm">{customer.wilaya}</span>
                </div>
                
                <div className={`flex items-center text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-sm">
                    {isRTL ? 'آخر حجز:' : 'Dernière réservation:'} {new Date(customer.lastBooking).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <p className="text-sm font-medium text-gray-900">{customer.totalBookings}</p>
                    <p className="text-xs text-gray-500">{isRTL ? 'حجز' : 'réservations'}</p>
                  </div>
                  <div className={isRTL ? 'text-left' : 'text-right'}>
                    <p className="text-sm font-medium text-gray-900">{customer.totalSpent.toLocaleString()} {isRTL ? 'د.ج' : 'DA'}</p>
                    <p className="text-xs text-gray-500">{isRTL ? 'إجمالي الإنفاق' : 'Total dépensé'}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className={`flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {isRTL ? 'إرسال رسالة' : 'Envoyer message'}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};