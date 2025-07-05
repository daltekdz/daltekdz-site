import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactSection: React.FC = () => {
  const { isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-[#1A0000]/5 to-[#C8860D]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {isRTL ? 'تواصل' : 'Contactez'}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8860D] to-[#D4941A]">
              {' '}{isRTL ? 'معنا' : 'Nous'}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isRTL 
              ? 'نحن هنا للإجابة على جميع استفساراتك. لا تتردد في التواصل معنا'
              : 'Nous sommes là pour répondre à toutes vos questions. N\'hésitez pas à nous contacter'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className={`text-xl font-bold text-gray-900 mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? 'أرسل لنا رسالة' : 'Envoyez-nous un message'}
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {isRTL ? 'تم إرسال رسالتك بنجاح' : 'Message envoyé avec succès'}
                </h4>
                <p className="text-gray-600 text-center">
                  {isRTL 
                    ? 'شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن'
                    : 'Merci de nous avoir contactés. Nous vous répondrons dès que possible'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الاسم الكامل *' : 'Nom complet *'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8860D] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'البريد الإلكتروني *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8860D] focus:border-transparent text-left"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? 'رقم الهاتف *' : 'Téléphone *'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8860D] focus:border-transparent text-left"
                      placeholder="+213 555 123 456"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'رسالتك *' : 'Votre message *'}
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8860D] focus:border-transparent ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={isRTL ? 'اكتب رسالتك هنا...' : 'Écrivez votre message ici...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#C8860D] to-[#D4941A] text-white rounded-lg font-semibold hover:from-[#D4941A] hover:to-[#C8860D] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'إرسال الرسالة' : 'Envoyer le message'}
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#C8860D]/10 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-[#C8860D]" />
                </div>
                <h4 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'اتصل بنا' : 'Appelez-nous'}
                </h4>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  +213 555 123 456
                </p>
                <p className={`text-gray-500 text-sm mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'متاح 24/7' : 'Disponible 24/7'}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#C8860D]/10 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-[#C8860D]" />
                </div>
                <h4 className={`font-semibold text-gray-900 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'راسلنا' : 'Écrivez-nous'}
                </h4>
                <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                  contact@daltekdz.com
                </p>
                <p className={`text-gray-500 text-sm mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? 'نرد خلال 24 ساعة' : 'Réponse sous 24h'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
