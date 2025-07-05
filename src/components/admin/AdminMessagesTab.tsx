import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Clock, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminMessagesTab: React.FC = () => {
  const { isRTL } = useLanguage();
  const { supportMessages, respondToMessage, updateMessageStatus } = useAdmin();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMessages = supportMessages.filter(message => 
    statusFilter === 'all' || message.status === statusFilter
  );

  const selectedMessageData = supportMessages.find(m => m.id === selectedMessage);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      new: isRTL ? 'جديد' : 'Nouveau',
      in_progress: isRTL ? 'قيد المعالجة' : 'En cours',
      resolved: isRTL ? 'محلول' : 'Résolu'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getPriorityText = (priority: string) => {
    const priorityMap = {
      high: isRTL ? 'عالية' : 'Haute',
      medium: isRTL ? 'متوسطة' : 'Moyenne',
      low: isRTL ? 'منخفضة' : 'Basse'
    };
    return priorityMap[priority as keyof typeof priorityMap] || priority;
  };

  const handleSendResponse = async () => {
    if (!selectedMessage || !responseText.trim()) return;
    
    await respondToMessage(selectedMessage, responseText);
    await updateMessageStatus(selectedMessage, 'in_progress');
    setResponseText('');
  };

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    await updateMessageStatus(messageId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-semibold text-gray-900">
              {isRTL ? 'مركز الرسائل' : 'Centre de Messages'}
            </h2>
            <p className="text-gray-600 mt-1">
              {isRTL ? `${supportMessages.length} رسالة دعم` : `${supportMessages.length} messages de support`}
            </p>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
          >
            <option value="all">{isRTL ? 'جميع الرسائل' : 'Tous les messages'}</option>
            <option value="new">{isRTL ? 'جديد' : 'Nouveau'}</option>
            <option value="in_progress">{isRTL ? 'قيد المعالجة' : 'En cours'}</option>
            <option value="resolved">{isRTL ? 'محلول' : 'Résolu'}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isRTL ? 'لا توجد رسائل' : 'Aucun message'}
              </h3>
              <p className="text-gray-500">
                {isRTL ? 'ستظهر رسائل الدعم هنا عند استلامها' : 'Les messages de support apparaîtront ici lorsqu\'ils seront reçus'}
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                  selectedMessage === message.id ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedMessage(message.id)}
              >
                <div className={`flex items-start justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="font-semibold text-gray-900 text-sm">{message.subject}</h3>
                    <p className="text-gray-600 text-xs">{message.senderName}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                      {getStatusText(message.status)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(message.priority)}`}>
                      {getPriorityText(message.priority)}
                    </span>
                  </div>
                </div>
                
                <p className={`text-gray-600 text-sm line-clamp-2 mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {message.message}
                </p>
                
                <div className={`flex items-center justify-between text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MessageSquare className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>{message.responses.length}</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessageData ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Message Header */}
              <div className={`flex items-start justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedMessageData.subject}</h2>
                  <p className="text-gray-600 mt-1">
                    {isRTL ? 'من:' : 'De:'} {selectedMessageData.senderName} ({selectedMessageData.senderEmail})
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(selectedMessageData.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedMessageData.status}
                    onChange={(e) => handleStatusChange(selectedMessageData.id, e.target.value)}
                    className={`px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : ''}`}
                  >
                    <option value="new">{isRTL ? 'جديد' : 'Nouveau'}</option>
                    <option value="in_progress">{isRTL ? 'قيد المعالجة' : 'En cours'}</option>
                    <option value="resolved">{isRTL ? 'محلول' : 'Résolu'}</option>
                  </select>
                  
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Original Message */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className={`text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {selectedMessageData.message}
                </p>
              </div>

              {/* Responses */}
              <div className="space-y-4 mb-6">
                {selectedMessageData.responses.map((response) => (
                  <div
                    key={response.id}
                    className={`flex ${response.isAdmin ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      response.isAdmin 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className={`text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                        {response.message}
                      </p>
                      <p className={`text-xs mt-1 opacity-75 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {new Date(response.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Form */}
              <div className="border-t border-gray-200 pt-6">
                <div className="space-y-4">
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    rows={4}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'اكتب ردك هنا...' : 'Tapez votre réponse ici...'}
                  />
                  
                  <div className={`flex justify-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button
                      onClick={handleSendResponse}
                      disabled={!responseText.trim()}
                      className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'إرسال الرد' : 'Envoyer la réponse'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isRTL ? 'اختر رسالة' : 'Sélectionner un message'}
              </h3>
              <p className="text-gray-500">
                {isRTL ? 'اختر رسالة من القائمة لعرض التفاصيل والرد عليها' : 'Choisissez un message dans la liste pour voir les détails et répondre'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};