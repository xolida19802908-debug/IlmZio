import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { StorageService } from '../utils/storage';
import { CATEGORIES } from '../data/initialData';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    courseInterest: 'Dasturlash',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Iltimos, to\'liq ism-sharifingizni kiriting (kamida 2 ta belgi)';
    }

    const contactVal = formData.contact.trim();
    const phoneRegex = /^(\+?998)?[0-9\s\-()]{9,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactVal) {
      errs.contact = 'Telefon raqam yoki emailingizni kiriting';
    } else if (!phoneRegex.test(contactVal) && !emailRegex.test(contactVal)) {
      errs.contact = 'To\'g\'ri telefon raqam (masalan: +998 90 123 45 67) yoki email kiriting';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Xabar matni kamida 10 ta belgidan iborat bo\'lishi kerak';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      StorageService.addMessage({
        name: formData.name.trim(),
        contact: formData.contact.trim(),
        courseInterest: formData.courseInterest,
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        contact: '',
        courseInterest: 'Dasturlash',
        message: '',
      });
      setErrors({});

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 700);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info and map/contacts */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Bog'lanish
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2 mb-4">
                Savollaringiz bormi? Mutaxassisdan bepul maslahat oling
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Kurs tanlashda qiynalyapsizmi yoki boshlanish vaqtlari haqida bilmoqchimisiz?
                Ma'lumotlaringizni qoldiring, 15 daqiqa ichida siz bilan bog'lanamiz.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase">
                    Telefon raqam
                  </h4>
                  <a
                    href="tel:+998712004545"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors"
                  >
                    +998 (71) 200-45-45
                  </a>
                  <p className="text-xs text-slate-500">Dush - Shan: 09:00 dan 20:00 gacha</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase">
                    Elektron pochta
                  </h4>
                  <a
                    href="mailto:info@ilmziyo.uz"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors"
                  >
                    info@ilmziyo.uz
                  </a>
                  <p className="text-xs text-slate-500">Har qanday savol va takliflar uchun</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase">
                    Bosh ofis manzili
                  </h4>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Toshkent shahar, Chilonzor tumani, Bunyodkor shoh ko'chasi, 28-uy
                  </p>
                  <p className="text-xs text-slate-500">Mo'ljal: Mirzo Ulug'bek metrosi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/95 dark:bg-[#06060e] p-6 sm:p-9 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl relative">
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                      Xabaringiz muvaffaqiyatli qabul qilindi!
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                      Katta rahmat! Mutaxassisimiz tez orada siz bilan ko'rsatilgan raqam orqali bog'lanadi.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Ism field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Ism va familiyangiz <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Masalan: Sardor Rahimov"
                    className={`w-full px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-[#0c0c18] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 dark:border-white/10 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Telefon / Email field */}
                <div>
                  <label
                    htmlFor="contact-detail"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Telefon raqamingiz yoki Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-detail"
                    type="text"
                    value={formData.contact}
                    onChange={(e) => {
                      setFormData({ ...formData, contact: e.target.value });
                      if (errors.contact) setErrors({ ...errors, contact: '' });
                    }}
                    placeholder="+998 90 123 45 67 yoki email@domain.com"
                    className={`w-full px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-[#0c0c18] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.contact
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 dark:border-white/10 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.contact && (
                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* Course Interest */}
                <div>
                  <label
                    htmlFor="contact-course"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Qiziqtirgan yo'nalish
                  </label>
                  <select
                    id="contact-course"
                    value={formData.courseInterest}
                    onChange={(e) => setFormData({ ...formData, courseInterest: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-[#0c0c18] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c !== 'Barchasi').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat} yo'nalishi
                      </option>
                    ))}
                    <option value="Boshqa savol">Boshqa maslahat kerak</option>
                  </select>
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-msg"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Xabaringiz yoki savolingiz <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Qanday maqsad bilan o'rganmoqchisiz va sizni nimalar qiziqtiradi?.."
                    className={`w-full px-4 py-3 rounded-2xl text-sm bg-slate-50 dark:bg-[#0c0c18] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-400'
                        : 'border-slate-200 dark:border-white/10 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-70 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Xabarni yuborish</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
