import React from 'react';
import { GraduationCap, Sparkles, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/initialData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
                IlmZiyo
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              O'zbekistonda zamonaviy ta'lim va kasb-hunar o'rgatish bo'yicha yetakchi onlayn platforma.
            </p>
            <div className="text-[11px] text-slate-400">
              © {currentYear} IlmZiyo. Barcha huquqlar himoyalangan.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Sahifalar
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#home')}
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#courses')}
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Kurslar katalogi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#benefits')}
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Afzalliklar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#testimonials')}
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  O'quvchilar fikri
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScroll('#contact')}
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Aloqa va maslahat
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Yo'nalishlar
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              {CATEGORIES.filter((c) => c !== 'Barchasi').map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => handleScroll('#courses')}
                    className="hover:text-indigo-600 cursor-pointer"
                  >
                    {cat} kurslari
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Bog'lanish
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko'chasi, 28
            </p>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-1">
              +998 (71) 200-45-45
            </p>
            <p className="text-slate-500 mb-3">info@ilmziyo.uz</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3" />
              Doimiy qabul ochiq
            </span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            O'zbek tilidagi mukammal sifatli o'quv platformasi
          </div>
          <div className="flex items-center gap-1">
            <span>Sevgi va mahorat bilan yaratildi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
