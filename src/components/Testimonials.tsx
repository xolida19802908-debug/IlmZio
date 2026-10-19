import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../data/initialData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Muvaffaqiyat tarixi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
            O'quvchilarimiz biz haqimizda nima deydi?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Platformamiz orqali bilim olib, orzusidagi kasbga ega bo'lgan bitiruvchilarimizning samimiy fikrlari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {INITIAL_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-6 sm:p-7 rounded-3xl bg-white/80 dark:bg-[#070712] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-2xl dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1.5"
            >
              <div>
                {/* Quote Icon */}
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <Quote className="w-5 h-5" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic">
                  "{test.text}"
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <img
                  src={test.avatarUrl}
                  alt={test.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to initials if image fails
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {test.name}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate">
                    {test.role}
                  </p>
                  <span className="text-[11px] text-slate-400 block truncate">
                    Kurs: {test.courseTitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
