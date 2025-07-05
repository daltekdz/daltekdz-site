import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, DollarSign, ArrowUp, ArrowDown, Plus, Edit, Trash2, Eye, CheckCircle, X, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { Store } from 'lucide-react';

// Define the featured store type
interface FeaturedStore {
  id: string;
  storeId: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export const AdminFeaturedStoresTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { stores, sendNotification } = useAdmin();
  const { addNotification } = useNotifications();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [featuredStores, setFeaturedStores] = useState<FeaturedStore[]>([]);
  const [showReorderMode, setShowReorderMode] = useState(false);
  const [showFeaturedModal, setShowFeaturedModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [featuredDuration, setFeaturedDuration] = useState('7');
  const [showRemoveModal, setShowRemoveModal] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);

  // Load featured stores from localStorage on component mount
  useEffect(() => {
    const savedFeaturedStores = localStorage.getItem('featuredStores');
    if (savedFeaturedStores) {
      setFeaturedStores(JSON.parse(savedFeaturedStores));
    }
  }, []);

  // Save featured stores to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('featuredStores', JSON.stringify(featuredStores));
  }, [featuredStores]);

  // Check for expired featured stores
  useEffect(() => {
    const checkExpiredStores = () => {
      const now = new Date();
      const expiredStores = featuredStores.filter(fs => 
        fs.isActive && new Date(fs.endDate) < now
      );
      
      if (expiredStores.length > 0) {
        // Deactivate expired stores
        const updatedStores = featuredStores.map(fs => 
          expiredStores.some(es => es.id === fs.id) 
            ? { ...fs, isActive: false } 
            : fs
        );
        
        setFeaturedStores(updatedStores);
        
        // Send notifications for expired stores
        expiredStores.forEach(store => {
          const storeData = stores.find(s => s.id === store.storeId);
          if (storeData) {
            // Add notification for admin
            addNotification({
              type: 'info',
              title: isRTL ? 'انتهت مدة الإعلان' : 'Promotion expirée',
              message: isRTL 
                ? `انتهت مدة الإعلان للمتجر "${storeData.name}"`
                : `La période de promotion pour "${storeData.name}" est terminée`
            });
            
            // Send notification to store owner (would connect to WhatsApp API in production)
            console.log(`Notification sent to store owner: ${storeData.ownerName} about expired promotion`);
          }
        });
      }
    };
    
    // Check on component mount and set interval
    checkExpiredStores();
    const interval = setInterval(checkExpiredStores, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [featuredStores, stores, addNotification, isRTL]);

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.id.substring(0, 6).includes(searchTerm);
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

  const handleAddFeaturedStore = () => {
    if (!selectedStore || !featuredDuration) return;
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + parseInt(featuredDuration));
    
    const newFeaturedStore: FeaturedStore = {
      id: Math.random().toString(36).substring(2, 15),
      storeId: selectedStore,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    setFeaturedStores(prev => [...prev, newFeaturedStore]);
    
    // Send notification
    const store = stores.find(s => s.id === selectedStore);
    if (store) {
      addNotification({
        type: 'success',
        title: isRTL ? 'تمت إضافة متجر مميز' : 'Magasin en vedette ajouté',
        message: isRTL 
          ? `تمت إضافة "${store.name}" إلى المتاجر المميزة لمدة ${featuredDuration} يوم`
          : `"${store.name}" a été ajouté aux magasins en vedette pour ${featuredDuration} jours`
      });
      
      // In a real app, this would send a WhatsApp notification to the store owner
      console.log(`WhatsApp notification sent to ${store.ownerName} about featured store promotion`);
    }
    
    setShowFeaturedModal(false);
    setSelectedStore(null);
    setFeaturedDuration('7');
  };

  const handleRemoveFeaturedStore = (id: string) => {
    const featuredStore = featuredStores.find(fs => fs.id === id);
    if (!featuredStore) return;
    
    setFeaturedStores(prev => prev.filter(fs => fs.id !== id));
    
    // Send notification
    const store = stores.find(s => s.id === featuredStore.storeId);
    if (store) {
      addNotification({
        type: 'info',
        title: isRTL ? 'تمت إزالة متجر مميز' : 'Magasin en vedette retiré',
        message: isRTL 
          ? `تمت إزالة "${store.name}" من المتاجر المميزة`
          : `"${store.name}" a été retiré des magasins en vedette`
      });
    }
    
    setShowRemoveModal(null);
  };

  const handleUpdateFeaturedStore = (id: string) => {
    if (!featuredDuration) return;
    
    const featuredStore = featuredStores.find(fs => fs.id === id);
    if (!featuredStore) return;
    
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + parseInt(featuredDuration));
    
    const updatedFeaturedStores = featuredStores.map(fs => 
      fs.id === id 
        ? {
            ...fs,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            isActive: true
          }
        : fs
    );
    
    setFeaturedStores(updatedFeaturedStores);
    
    // Send notification
    const store = stores.find(s => s.id === featuredStore.storeId);
    if (store) {
      addNotification({
        type: 'success',
        title: isRTL ? 'تم تحديث متجر مميز' : 'Magasin en vedette mis à jour',
        message: isRTL 
          ? `تم تحديث مدة الإعلان لـ "${store.name}" لـ ${featuredDuration} يوم إضافي`
          : `La période de promotion pour "${store.name}" a été mise à jour pour ${featuredDuration} jours supplémentaires`
      });
    }
    
    setShowEditModal(null);
    setFeaturedDuration('7');
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const moveStoreUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...featuredStores];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    setFeaturedStores(newOrder);
  };

  const moveStoreDown = (index: number) => {
    if (index === featuredStores.length - 1) return;
    const newOrder = [...featuredStores];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setFeaturedStores(newOrder);
  };

  const activeFeaturedStores = featuredStores.filter(fs => fs.isActive);

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900">
              {isRTL ? 'المتاجر المميزة' : 'Magasins en vedette'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isRTL 
                ? `${activeFeaturedStores.length} متجر مميز نشط من أصل ${stores.length} متجر` 
                : `${activeFeaturedStores.length} magasins en vedette actifs sur ${stores.length} magasins`}
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

      {/* Featured Stores Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? 'المتاجر المميزة الحالية' : 'Magasins actuellement en vedette'}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowReorderMode(!showReorderMode)}
              className={`px-4 py-2 ${
                showReorderMode 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-blue-600 text-white'
              } rounded-lg transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {showReorderMode 
                ? (isRTL ? 'إلغاء الترتيب' : 'Annuler le tri') 
                : (isRTL ? 'ترتيب المتاجر' : 'Trier les magasins')}
            </button>
          </div>
        </div>

        {activeFeaturedStores.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isRTL ? 'لا توجد متاجر مميزة نشطة' : 'Aucun magasin en vedette actif'}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {isRTL 
                ? 'اختر المتاجر التي تريد عرضها في الصفحة الرئيسية من القائمة أدناه'
                : 'Sélectionnez les magasins que vous souhaitez afficher sur la page d\'accueil dans la liste ci-dessous'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {showReorderMode && (
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {isRTL ? 'ترتيب' : 'Ordre'}
                    </th>
                  )}
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'المتجر' : 'Magasin'}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'تاريخ البدء' : 'Date de début'}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'تاريخ الانتهاء' : 'Date de fin'}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الأيام المتبقية' : 'Jours restants'}
                  </th>
                  <th className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeFeaturedStores.map((featuredStore, index) => {
                  const store = stores.find(s => s.id === featuredStore.storeId);
                  if (!store) return null;
                  
                  const daysRemaining = getDaysRemaining(featuredStore.endDate);
                  const isExpiringSoon = daysRemaining <= 3 && daysRemaining > 0;
                  
                  return (
                    <tr key={featuredStore.id} className="hover:bg-gray-50">
                      {showReorderMode && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <button 
                              onClick={() => moveStoreUp(index)}
                              disabled={index === 0}
                              className={`p-1 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => moveStoreDown(index)}
                              disabled={index === activeFeaturedStores.length - 1}
                              className={`p-1 ${index === activeFeaturedStores.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{store.name}</div>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Star className="h-3 w-3 mr-1" />
                              {isRTL ? 'مميز' : 'En vedette'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">#{store.id.substring(0, 6)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(featuredStore.startDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(featuredStore.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          isExpiringSoon 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {daysRemaining} {isRTL ? 'يوم' : 'jours'}
                          {isExpiringSoon && (
                            <span className="ml-1">
                              {isRTL ? '(ينتهي قريبًا)' : '(expire bientôt)'}
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setShowEditModal(featuredStore.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title={isRTL ? 'تمديد المدة' : 'Prolonger la durée'}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setShowRemoveModal(featuredStore.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title={isRTL ? 'إزالة من المميزة' : 'Retirer des favoris'}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Stores Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className={`text-lg font-semibold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? 'جميع المتاجر' : 'Tous les magasins'}
          </h3>
        </div>
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
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">
                      {isRTL ? 'لا توجد متاجر مطابقة للبحث' : 'Aucun magasin correspondant à la recherche'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => {
                  const isFeatured = activeFeaturedStores.some(fs => fs.storeId === store.id);
                  
                  return (
                    <tr key={store.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{store.name}</div>
                            {isFeatured && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <Star className="h-3 w-3 mr-1" />
                                {isRTL ? 'مميز' : 'En vedette'}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">#{store.id.substring(0, 6)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                          <div className="text-sm font-medium text-gray-900">{store.ownerName}</div>
                          <div className="text-sm text-gray-500">{store.ownerEmail}</div>
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Star className={`h-4 w-4 text-yellow-400 fill-current ${isRTL ? 'ml-1' : 'mr-1'}`} />
                          <span className="text-sm font-medium text-gray-900">{store.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedStore(store.id);
                              setShowFeaturedModal(true);
                            }}
                            className={`p-1 rounded ${
                              isFeatured
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'text-gray-400 hover:text-yellow-600'
                            }`}
                            title={
                              isFeatured
                                ? (isRTL ? 'متجر مميز بالفعل' : 'Déjà en vedette')
                                : (isRTL ? 'إضافة للمتاجر المميزة' : 'Ajouter aux magasins en vedette')
                            }
                            disabled={isFeatured}
                          >
                            <Star className="h-5 w-5" fill={isFeatured ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title={isRTL ? 'عرض المتجر' : 'Voir le magasin'}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Featured Store Modal */}
      <AnimatePresence>
        {showFeaturedModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFeaturedModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isRTL ? 'إضافة متجر مميز' : 'Ajouter un magasin en vedette'}
                  </h3>
                  <button
                    onClick={() => setShowFeaturedModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'المتجر' : 'Magasin'}
                    </label>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      {selectedStore && (() => {
                        const store = stores.find(s => s.id === selectedStore);
                        return store ? (
                          <div className={isRTL ? 'text-right' : 'text-left'}>
                            <p className="font-medium text-gray-900">{store.name}</p>
                            <p className="text-sm text-gray-600">#{store.id.substring(0, 6)}</p>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'مدة الظهور في الصفحة الرئيسية' : 'Durée d\'affichage sur la page d\'accueil'}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['7', '15', '30'].map(days => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setFeaturedDuration(days)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            featuredDuration === days
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="text-lg font-bold mb-1">{days}</div>
                          <div className="text-sm">{isRTL ? 'يوم' : 'jours'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setShowFeaturedModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {isRTL ? 'إلغاء' : 'Annuler'}
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFeaturedStore}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {isRTL ? 'تأكيد' : 'Confirmer'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove Featured Store Modal */}
      <AnimatePresence>
        {showRemoveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRemoveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className={`text-xl font-semibold text-gray-900 ${isRTL ? 'mr-3' : 'ml-3'}`}>
                    {isRTL ? 'تأكيد الإزالة' : 'Confirmer la suppression'}
                  </h3>
                </div>

                <p className={`text-gray-600 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL 
                    ? 'هل أنت متأكد من إزالة هذا المتجر من المتاجر المميزة؟ سيتم إزالته من الصفحة الرئيسية.'
                    : 'Êtes-vous sûr de vouloir retirer ce magasin des magasins en vedette? Il sera retiré de la page d\'accueil.'}
                </p>

                <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setShowRemoveModal(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isRTL ? 'إلغاء' : 'Annuler'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeaturedStore(showRemoveModal)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    {isRTL ? 'تأكيد الإزالة' : 'Confirmer la suppression'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Featured Store Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {isRTL ? 'تمديد مدة الإعلان' : 'Prolonger la durée de promotion'}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(null)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'مدة الظهور الجديدة' : 'Nouvelle durée d\'affichage'}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['7', '15', '30'].map(days => (
                        <button
                          key={days}
                          type="button"
                          onClick={() => setFeaturedDuration(days)}
                          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                            featuredDuration === days
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="text-lg font-bold mb-1">{days}</div>
                          <div className="text-sm">{isRTL ? 'يوم' : 'jours'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      type="button"
                      onClick={() => setShowEditModal(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {isRTL ? 'إلغاء' : 'Annuler'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateFeaturedStore(showEditModal)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      {isRTL ? 'تأكيد التمديد' : 'Confirmer la prolongation'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFeaturedStoresTab;