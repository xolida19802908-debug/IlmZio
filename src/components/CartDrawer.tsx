import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CartItem } from '../types';
import { CourseImage } from './CourseImage';
import { formatUzbekCurrency } from '../utils/storage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (courseId: string, delta: number) => void;
  onRemoveItem: (courseId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0
  );

  const discountAmount = Math.round(subtotal * appliedDiscount);
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'ILM2026' || code === 'STUDENT10') {
      setAppliedDiscount(0.1); // 10% discount
      setPromoMessage({ text: '10% chegirma muvaffaqiyatli qo\'llandi!', isError: false });
    } else if (code === 'VIP20') {
      setAppliedDiscount(0.2); // 20% discount
      setPromoMessage({ text: '20% maxsus chegirma qo\'llandi!', isError: false });
    } else {
      setPromoMessage({ text: 'Noto\'g\'ri promo-kod! Masalan: ILM2026', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#05050b] text-slate-900 dark:text-slate-100 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sizning savatingiz
              </h3>
              <p className="text-xs text-slate-500">
                {items.length > 0 ? `${items.length} ta kurs tanlangan` : 'Savat hozircha bo\'sh'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body (Items List) */}
        <div className="p-5 flex-grow overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                Savatingiz bo'sh
              </h4>
              <p className="text-xs text-slate-500 mb-6 max-w-xs">
                O'zingizga ma'qul kursni tanlang va savatga qo'shing.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all cursor-pointer"
              >
                Kurslarni ko'rish
              </button>
            </div>
          ) : (
            items.map(({ course, quantity }) => (
              <div
                key={course.id}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex gap-3.5 items-center relative group"
              >
                {/* Thumbnail */}
                <div className="w-18 h-18 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 shrink-0">
                  <CourseImage
                    src={course.imageUrl}
                    alt={course.title}
                    category={course.category}
                  />
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {course.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {course.title}
                  </h4>
                  <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
                    {formatUzbekCurrency(course.price)}
                  </div>

                  {/* Quantity & Remove controls */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(course.id, -1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer"
                        title="Kamaytirish"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(course.id, 1)}
                        className="text-slate-500 hover:text-slate-900 dark:hover:text-white p-0.5 cursor-pointer"
                        title="Ko'paytirish"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(course.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#05050b] space-y-4 shrink-0">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo-kod (masalan: ILM2026)"
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white cursor-pointer"
                >
                  Qo'llash
                </button>
              </div>
              {promoMessage && (
                <p
                  className={`text-[11px] font-medium flex items-center gap-1 ${
                    promoMessage.isError ? 'text-rose-500' : 'text-emerald-500'
                  }`}
                >
                  {!promoMessage.isError && <Check className="w-3 h-3" />}
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Kurslar narxi:</span>
                <span className="tabular-nums">{formatUzbekCurrency(subtotal)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Chegirma ({(appliedDiscount * 100).toFixed(0)}%):</span>
                  <span className="tabular-nums">-{formatUzbekCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Jami to'lov:</span>
                <span className="text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {formatUzbekCurrency(totalAmount)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>To'lov qilish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Xavfsiz va kafolatlangan to'lov</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
