import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Edit, Trash2, Eye, MoreVertical, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminStoresTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { stores, updateStoreStatus, updateStorePlan, deleteStore } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
    const matchesPlan = planFilter === 'all' || store.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-amber-100 text-amber-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      active: isRTL ? 'نشط' : 'Actif',
      pending: isRTL ? 'في الانتظار' : 'En attente',
      suspended: isRTL ? 'معلق' : 'Suspendu',
      cancelled: isRTL ? 'ملغي' : 'Annulé'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const handleStatusChange = async (storeId: string, newStatus: string) => {
    await updateStoreStatus(storeId, newStatus);
    setSelectedStore(null);
  };

  const handlePlanChange = async (storeId: string, newPlan: string) => {
    await updateStorePlan(storeId, newPlan);
    setSelectedStore(null);
  };

  const handleDeleteStore = async (storeId: string) => {
    await deleteStore(storeId);
    setShowDeleteModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900">
              {isRTL ? 'إدارة المتاجر' : 'Gestion des Magasins'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isRTL ? `${stores.length} متجر مسجل` : `${stores.length} magasins enregistrés`}
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={isRTL ? 'البحث في المتاجر...' : 'Rechercher des magasins...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right pr-10 pl-4' : ''}`}
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            >
              <option value="all">{isRTL ? 'جميع الحالات' : 'Tous les statuts'}</option>
              <option value="active">{isRTL ? 'نشط' : 'Actif'}</option>
              <option value="pending">{isRTL ? 'في الانتظار' : 'En attente'}</option>
              <option value="suspended">{isRTL ? 'معلق' : 'Suspendu'}</option>
              <option value="cancelled">{isRTL ? 'ملغي' : 'Annulé'}</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
            >
              <option value="all">{isRTL ? 'جميع الباقات' : 'Tous les forfaits'}</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stores Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'المتجر' : 'Magasin'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'المالك' : 'Propriétaire'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الباقة' : 'Forfait'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الحالة' : 'Statut'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الحجوزات' : 'Réservations'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'التقييم' : 'Note'}
                </th>
                <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      {isRTL ? 'لا توجد متاجر مسجلة بعد' : 'Aucun magasin enregistré pour le moment'}
                    </p>
                    <p className="text-gray-400 mt-2">
                      {isRTL ? 'ستظهر المتاجر هنا عند تسجيلها' : 'Les magasins apparaîtront ici lors de leur enregistrement'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => (
                  <motion.tr
                    key={store.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="text-sm font-medium text-gray-900">{store.name}</div>
                        <div className="text-sm text-gray-500">{store.type}</div>
                        <div className="text-sm text-gray-500">{store.address}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <div className="text-sm font-medium text-gray-900">{store.ownerName}</div>
                        <div className="text-sm text-gray-500">{store.ownerEmail}</div>
                        <div className="text-sm text-gray-500">{store.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(store.plan)}`}>
                        {store.plan.charAt(0).toUpperCase() + store.plan.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(store.status)}`}>
                        {getStatusText(store.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {store.totalBookings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-sm font-medium text-gray-900">{store.rating.toFixed(1)}</span>
                        <span className={`text-sm text-gray-500 ${isRTL ? 'mr-1' : 'ml-1'}`}>({store.totalReviews})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="relative">
                        <button
                          onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        
                        <AnimatePresence>
                          {selectedStore === store.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className={`absolute top-8 ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200`}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => handleStatusChange(store.id, store.status === 'active' ? 'suspended' : 'active')}
                                  className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}
                                >
                                  {store.status === 'active' 
                                    ? (isRTL ? 'تعليق المتجر' : 'Suspendre')
                                    : (isRTL ? 'تفعيل المتجر' : 'Activer')
                                  }
                                </button>
                                
                                <div className="border-t border-gray-100">
                                  <div className={`px-4 py-2 text-xs font-medium text-gray-500 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    {isRTL ? 'تغيير الباقة' : 'Changer forfait'}
                                  </div>
                                  {['silver', 'gold', 'platinum'].map(plan => (
                                    <button
                                      key={plan}
                                      onClick={() => handlePlanChange(store.id, plan)}
                                      className={`block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'} ${store.plan === plan ? 'bg-gray-50 font-medium' : ''}`}
                                    >
                                      {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                    </button>
                                  ))}
                                </div>
                                
                                <div className="border-t border-gray-100">
                                  <button
                                    onClick={() => setShowDeleteModal(store.id)}
                                    className={`block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 ${isRTL ? 'text-right' : 'text-left'}`}
                                  >
                                    {isRTL ? 'حذف المتجر' : 'Supprimer'}
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
                  {isRTL ? 'تأكيد الحذف' : 'Confirmer la suppression'}
                </h3>
              </div>
              
              <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? 'هل أنت متأكد من حذف هذا المتجر؟ هذا الإجراء لا يمكن التراجع عنه.'
                  : 'Êtes-vous sûr de vouloir supprimer ce magasin? Cette action ne peut pas être annulée.'
                }
              </p>
              
              <div className={`flex gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isRTL ? 'إلغاء' : 'Annuler'}
                </button>
                <button
                  onClick={() => handleDeleteStore(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {isRTL ? 'حذف' : 'Supprimer'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};