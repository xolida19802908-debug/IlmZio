import React, { useState } from 'react';
import {
  X,
  CreditCard,
  Banknote,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Lock,
  ArrowRight,
  Phone,
  User,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';
import { StorageService, formatUzbekCurrency } from '../utils/storage';
import { Sound } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'payme' | 'click' | 'uzumbank' | 'naqd'>('payme');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0
  );

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errs.name = 'Iltimos, to\'liq ismingizni kiriting';
    }

    const phoneClean = customerPhone.trim();
    if (!phoneClean) {
      errs.phone = 'Telefon raqamingizni kiriting';
    } else if (phoneClean.replace(/[^0-9]/g, '').length < 9) {
      errs.phone = 'To\'liq telefon raqam kiriting (masalan: +998 90 123 45 67)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const fireFireworks = () => {
    // Multi-stage fireworks display
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#4F46E5', '#7C3AED', '#F59E0B', '#10B981', '#EC4899', '#38BDF8'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    Sound.playClick();
    setIsProcessing(true);
    setProcessStep('Bank shlyuzi bilan xavfsiz ulanish o\'rnatilmoqda...');

    setTimeout(() => {
      setProcessStep('Demo to\'lov tekshirilmoqda va tasdiqlanmoqda...');
    }, 1000);

    // 2-second processing simulation
    setTimeout(() => {
      const orderCourses = items.map((i) => ({
        id: i.course.id,
        title: i.course.title,
        price: i.course.price * i.quantity,
      }));

      const newOrder = StorageService.addOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        paymentMethod,
        courses: orderCourses,
        totalAmount,
        status: 'To\'langan',
      });

      setIsProcessing(false);
      setCompletedOrder(newOrder);
      onOrderSuccess(newOrder);

      // Play victory sound & fireworks
      Sound.playCelebration();
      fireFireworks();
    }, 2000);
  };

  const handleFinish = () => {
    Sound.playClick();
    setCompletedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white dark:bg-[#06060e] text-slate-900 dark:text-white rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {completedOrder ? 'To\'lov muvaffaqiyatli!' : 'Buyurtmani rasmiylashtirish'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {completedOrder
                  ? `Buyurtma raqami: #${completedOrder.orderNumber}`
                  : `${items.length} ta kurs uchun xavfsiz to'lov`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={completedOrder ? handleFinish : onClose}
            aria-label="Yopish"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing State Animation */}
        {isProcessing && (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5">
            <div className="relative w-18 h-18">
              <div className="w-18 h-18 border-4 border-indigo-200 dark:border-indigo-950 border-t-indigo-600 rounded-full animate-spin" />
              <Lock className="w-7 h-7 text-indigo-500 absolute inset-0 m-auto" />
            </div>
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              To'lov amalga oshirilmoqda...
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs animate-pulse font-medium">
              {processStep}
            </p>
            <div className="w-52 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        {/* Success State */}
        {!isProcessing && completedOrder && (
          <div className="p-6 sm:p-8 text-center space-y-5 animate-slideUp">
            <div className="w-18 h-18 rounded-3xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                To'lov tasdiqlandi
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                To'lov muvaffaqiyatli amalga oshirildi!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Buyurtma raqami: <strong className="text-indigo-600 dark:text-indigo-400">#{completedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0e0e1c] border border-slate-200 dark:border-white/10 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Mijoz:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {completedOrder.customerName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Telefon:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {completedOrder.customerPhone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">To'lov usuli:</span>
                <span className="font-black uppercase text-indigo-600 dark:text-indigo-400">
                  {completedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/10 font-black text-sm">
                <span>To'langan summa:</span>
                <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {formatUzbekCurrency(completedOrder.totalAmount)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Ushbu buyurtma admin panelida muvaffaqiyatli saqlandi. Kurs materiallariga kirish havolasi ko'rsatilgan raqamga yuborildi.
            </p>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all"
            >
              Tushunarli, darslarga o'tish
            </button>
          </div>
        )}

        {/* Checkout Form */}
        {!isProcessing && !completedOrder && (
          <form onSubmit={handleConfirmPayment} className="p-6 sm:p-7 space-y-5">
            {/* Required prominent notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-2.5">
              <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-200">
                <strong className="font-bold block">Demo rejim: haqiqiy pul yechilmaydi</strong>
                Xarid jarayonini sinab ko'rishingiz mumkin. Karta raqami talab etilmaydi.
              </div>
            </div>

            {/* Courses summary inside checkout */}
            <div className="max-h-32 overflow-y-auto space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#0c0c1a] border border-slate-100 dark:border-white/10 text-xs">
              {items.map(({ course, quantity }) => (
                <div key={course.id} className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="truncate pr-2 font-medium">{course.title} (x{quantity})</span>
                  <span className="font-bold shrink-0 tabular-nums">{formatUzbekCurrency(course.price * quantity)}</span>
                </div>
              ))}
            </div>

            {/* Customer Name */}
            <div>
              <label
                htmlFor="checkout-name"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Ismingiz va Familiyangiz <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="checkout-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="Masalan: Sardor Aliyev"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0a0a16] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 dark:border-white/10 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Customer Phone */}
            <div>
              <label
                htmlFor="checkout-phone"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Telefon raqamingiz <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="checkout-phone"
                  type="text"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="+998 90 123 45 67"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0a0a16] border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-rose-400'
                      : 'border-slate-200 dark:border-white/10 focus:ring-indigo-500'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                To'lov usuli
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    Sound.playClick();
                    setPaymentMethod('payme');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'payme'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-cyan-500" />
                  <span>Payme</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    Sound.playClick();
                    setPaymentMethod('click');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'click'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span>Click Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    Sound.playClick();
                    setPaymentMethod('uzumbank');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'uzumbank'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  <span>Uzum Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    Sound.playClick();
                    setPaymentMethod('naqd');
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'naqd'
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-500" />
                  <span>Naqd / Ofisda</span>
                </button>
              </div>
            </div>

            {/* Total display & Submit */}
            <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-slate-500 dark:text-slate-400">Jami to'lov:</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {formatUzbekCurrency(totalAmount)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl font-black text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>To'lovni tasdiqlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL himoyalangan 256-bit xavfsiz shlyuz</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
