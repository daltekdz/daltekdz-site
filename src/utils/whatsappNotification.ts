/**
 * WhatsApp Notification Service
 * 
 * This utility handles sending WhatsApp notifications to store owners
 * when new bookings are made.
 */

import { BookingDetails } from '../types/booking';

interface WhatsAppNotificationOptions {
  token?: string;
  instance?: string;
}

export class WhatsAppNotification {
  private token: string;
  private instance: string;

  constructor(options: WhatsAppNotificationOptions = {}) {
    this.token = options.token || '';
    this.instance = options.instance || '';
  }

  /**
   * Formats a booking notification message
   */
  formatBookingMessage(booking: BookingDetails, storeName: string): string {
    const { customer, service, staff, date, time } = booking;
    
    return `🎉 *حجز جديد - ${storeName}*

👤 *العميل:* ${customer.name}
📞 *الهاتف:* ${customer.phone}
📧 *البريد الإلكتروني:* ${customer.email}

💇‍♀️ *الخدمة:* ${service?.name}
💰 *السعر:* ${service?.price} د.ج
⏱️ *المدة:* ${service?.duration} دقيقة

📅 *التاريخ:* ${date}
⏰ *الوقت:* ${time}

${staff ? `👨‍💼 *المختص:* ${staff.name}` : ''}

${customer.notes ? `📝 *ملاحظات العميل:* ${customer.notes}` : ''}

---
✨ تم إرسال هذا الإشعار تلقائياً من منصة دالتكدز
🌐 www.daltekdz.com`;
  }

  /**
   * Fallback to open WhatsApp Web with pre-filled message
   */
  openWhatsAppWeb(phoneNumber: string, message: string): boolean {
    try {
      // Clean phone number
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
      
      // Format phone number for WhatsApp
      const formattedPhone = cleanPhone.startsWith('213') ? cleanPhone : `213${cleanPhone}`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Generate WhatsApp web URL
      const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
      
      // Open in new tab
      window.open(whatsappUrl, '_blank');
      
      console.log('WhatsApp Web opened with message');
      return true;
    } catch (error) {
      console.error('Error opening WhatsApp Web:', error);
      return false;
    }
  }

  /**
   * Send booking notification with fallback
   */
  async sendBookingNotification(phoneNumber: string, booking: BookingDetails, storeName: string): Promise<boolean> {
    const message = this.formatBookingMessage(booking, storeName);
    
    // Use WhatsApp Web as fallback
    return this.openWhatsAppWeb(phoneNumber, message);
  }
}

// Export singleton instance
export const whatsappNotification = new WhatsAppNotification();