import React, { useEffect } from 'react';
import { BookingDetails } from '../types/booking';
import { CheckCircle, Calendar, Clock, User, MapPin, Phone, Mail } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingConfirmationProps {
  booking: BookingDetails;
  onNewBooking: () => void;
  storeName?: string;
  storePhone?: string;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onNewBooking,
  storeName = 'Daltekdz',
  storePhone = '+213555123456' // This would come from store settings
}) => {
  const { sendBookingNotification, sendWhatsAppNotification } = useNotifications();
  const { isRTL } = useLanguage();

  // Send notifications when booking is confirmed
  useEffect(() => {
    if (booking.service && booking.customer.name) {
      // Send in-app notification
      sendBookingNotification(booking);

      // Send WhatsApp notification
      sendWhatsAppNotification(storePhone, booking, storeName);

      // Request browser notification permission if not granted
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, [booking, sendBookingNotification, sendWhatsAppNotification, storePhone, storeName]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{isRTL ? 'تم تأكيد الحجز!' : 'Réservation confirmée !'}</h2>
        <p className="text-gray-600">{isRTL ? 'تم جدولة موعدك بنجاح وإرسال إشعار للمتجر' : 'Votre rendez-vous a été programmé avec succès et une notification a été envoyée au magasin'}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'تفاصيل الموعد' : 'Détails du rendez-vous'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Calendar className={`h-5 w-5 text-amber-500 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div>
                  <p className="font-medium text-gray-900">{isRTL ? 'التاريخ' : 'Date'}</p>
                  <p className="text-gray-600">{formatDate(booking.date)}</p>
                </div>
              </div>
              
              <div className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Clock className={`h-5 w-5 text-amber-500 mt-1 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <div>
                  <p className="font-medium text-gray-900">{isRTL ? 'الوقت' : 'Heure'}</p>
                  <p className="text-gray-600">{booking.time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'معلومات الخدمة' : 'Informations sur le service'}
            </h3>
            
            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
              <img
                src={booking.service?.image}
                alt={booking.service?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className={`flex-1 ${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                <h4 className="font-medium text-gray-900">{booking.service?.name}</h4>
                <p className="text-gray-600 text-sm">{booking.service?.description}</p>
                <div className={`flex items-center mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className={`text-sm text-gray-500 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    {isRTL ? 'المدة:' : 'Durée:'} {booking.service?.duration} {isRTL ? 'دقيقة' : 'minutes'}
                  </span>
                  <span className="text-sm text-amber-600 font-semibold">
                    {isRTL ? 'السعر:' : 'Prix:'} {booking.service?.price} {isRTL ? 'د.ج' : 'DA'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'المختص' : 'Spécialiste'}
            </h3>
            
            <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
              <img
                src={booking.staff?.image}
                alt={booking.staff?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className={`flex-1 ${isRTL ? 'mr-4 text-right' : 'ml-4 text-left'}`}>
                <h4 className="font-medium text-gray-900">{booking.staff?.name}</h4>
                <p className="text-gray-600 text-sm">{booking.staff?.experience}</p>
                <div className={`flex flex-wrap gap-2 mt-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  {booking.staff?.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'معلومات الاتصال' : 'Informations de contact'}
            </h3>
            
            <div className="space-y-3">
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <User className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-900">{booking.customer.name}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Phone className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-900">{booking.customer.phone}</span>
              </div>
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Mail className={`h-5 w-5 text-amber-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                <span className="text-gray-900">{booking.customer.email}</span>
              </div>
              {booking.customer.notes && (
                <div className={`mt-4 p-4 bg-gray-50 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm text-gray-600">
                    <strong>{isRTL ? 'طلبات خاصة:' : 'Demandes spéciales:'}</strong> {booking.customer.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Status */}
      <div className="bg-green-50 rounded-xl p-6 mb-6 border border-green-100">
        <h3 className={`font-semibold text-green-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          ✅ {isRTL ? 'تم إرسال الإشعارات' : 'Notifications envoyées'}
        </h3>
        <ul className={`text-sm text-green-700 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <li>• {isRTL ? 'تم إشعار المتجر بالحجز الجديد' : 'Le magasin a été notifié de la nouvelle réservation'}</li>
          <li>• {isRTL ? 'تم إرسال رسالة واتساب للمتجر' : 'Un message WhatsApp a été envoyé au magasin'}</li>
          <li>• {isRTL ? 'سيتم التواصل معك قريباً لتأكيد الموعد' : 'Vous serez contacté prochainement pour confirmer le rendez-vous'}</li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-100">
        <h3 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? 'ملاحظات مهمة' : 'Remarques importantes'}
        </h3>
        <ul className={`text-sm text-gray-600 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <li>• {isRTL ? 'يرجى الحضور قبل 10 دقائق من موعدك' : 'Veuillez arriver 10 minutes avant votre rendez-vous'}</li>
          <li>• {isRTL ? 'أحضر هوية صالحة للتحقق' : 'Apportez une pièce d\'identité valide pour vérification'}</li>
          <li>• {isRTL ? 'يجب إلغاء الحجز قبل 24 ساعة' : 'L\'annulation doit être effectuée 24h à l\'avance'}</li>
          <li>• {isRTL ? 'سيتم إرسال رسالة تأكيد على هاتفك' : 'Un message de confirmation sera envoyé sur votre téléphone'}</li>
        </ul>
      </div>

      <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
        <button
          onClick={onNewBooking}
          className={`flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {isRTL ? 'حجز موعد آخر' : 'Réserver un autre rendez-vous'}
        </button>
        <button className={`flex-1 border-2 border-amber-400 text-amber-700 px-6 py-3 rounded-lg font-semibold hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {isRTL ? 'تحميل الإيصال' : 'Télécharger le reçu'}
        </button>
      </div>
    </div>
  );
};