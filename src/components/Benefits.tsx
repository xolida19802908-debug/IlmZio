import React from 'react';
import { ShieldCheck, Video, Laptop, Trophy, Users, Clock } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <Laptop className="w-6 h-6 text-indigo-500" />,
      title: '100% Amaliy ta\'lim',
      description: 'Quruq nazariyadan xoli, faqat real loyihalar va amaliy keyslarga asoslangan darslar.'
    },
    {
      icon: <Video className="w-6 h-6 text-purple-500" />,
      title: 'Doimiy dars yozuvlari',
      description: 'Har bir jonli dars sifati yuqori formatda yozib olinadi va sizning shaxsiy kabinetingizda saqlanadi.'
    },
    {
      icon: <Users className="w-6 h-6 text-amber-500" />,
      title: 'Shaxsiy mentor ko\'magi',
      description: 'Uyga vazifalarni tekshiradigan va barcha savollaringizga tezkor javob beradigan tajribali ustozlar.'
    },
    {
      icon: <Trophy className="w-6 h-6 text-emerald-500" />,
      title: 'Rasmiy sertifikat',
      description: 'Kursni muvaffaqiyatli bitirgan har bir o\'quvchiga tasdiqlangan maxsus sertifikat taqdim etiladi.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-rose-500" />,
      title: 'Sifat kafolati',
      description: 'Agar birinchi haftada darslar sizga ma\'qul kelmasa, to\'lovni to\'liq qaytarib beramiz.'
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-500" />,
      title: 'Moslashuvchan grafik',
      description: 'Darslarni o\'zingizga qulay vaqtda, ish yoki o\'qishdan ajralmagan holda kuzatib boring.'
    }
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Nega aynan IlmZiyo?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2 mb-3">
            Samarali ta'lim uchun yaratilgan imkoniyatlar
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Biz shunchaki dars o'tmaymiz, balki sizni kasbiy muvaffaqiyatga erishishingizga yordam beramiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-white/80 dark:bg-[#070712] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
