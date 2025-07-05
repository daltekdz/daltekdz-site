import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, CheckCheck, Calendar, Clock, User, Phone, MessageCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

export const NotificationPanel: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const { isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40 bg-black/20" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full mt-2 w-80 sm:w-96 max-w-[90vw] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden ${
                isRTL ? 'right-0' : 'left-0'
              }`}
            >
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900">
                    {isRTL ? 'الإشعارات' : 'Notifications'}
                  </h3>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 flex items-center"
                      >
                        <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {isRTL ? 'قراءة الكل' : 'Tout lire'}
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 sm:p-8 text-center text-gray-500">
                    <Bell className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                    <p>{isRTL ? 'لا توجد إشعارات' : 'Aucune notification'}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 sm:p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {/* Icon */}
                          <div className={`flex-shrink-0 ${isRTL ? 'ml-2 sm:ml-3' : 'mr-2 sm:mr-3'}`}>
                            {notification.type === 'booking' ? (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500 ml-2">
                                {formatTime(notification.timestamp)}
                              </span>
                            </div>
                            
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>

                            {/* Booking Details */}
                            {notification.type === 'booking' && notification.bookingData && (
                              <div className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                <div className="space-y-1 sm:space-y-2 text-xs">
                                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <User className={`h-3 w-3 text-gray-500 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                                    <span className="text-gray-700">{notification.bookingData.customerName}</span>
                                  </div>
                                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Calendar className={`h-3 w-3 text-gray-500 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                                    <span className="text-gray-700">{notification.bookingData.serviceName}</span>
                                  </div>
                                  <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Clock className={`h-3 w-3 text-gray-500 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                                    <span className="text-gray-700">
                                      {notification.bookingData.date} - {notification.bookingData.time}
                                    </span>
                                  </div>
                                  {notification.bookingData.phone && (
                                    <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                                      <Phone className={`h-3 w-3 text-gray-500 ${isRTL ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'}`} />
                                      <a 
                                        href={`tel:${notification.bookingData.phone}`}
                                        className="text-blue-600 hover:text-blue-700"
                                      >
                                        {notification.bookingData.phone}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className={`flex items-center justify-between mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className="text-xs text-gray-400">
                                {formatDate(notification.timestamp)}
                              </span>
                              
                              <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    className="text-blue-600 hover:text-blue-700 text-xs"
                                  >
                                    <Check className="h-3 w-3" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="text-red-600 hover:text-red-700 text-xs"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};