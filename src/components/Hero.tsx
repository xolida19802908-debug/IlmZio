import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Users, Award, BookOpen, CheckCircle2, Zap } from 'lucide-react';
import { Sound } from '../utils/audio';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix = '', duration = 1800 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span className="tabular-nums font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white drop-shadow-sm">
      {count.toLocaleString('uz-UZ')}
      {suffix}
    </span>
  );
};

export const Hero: React.FC = () => {
  const scrollToCourses = () => {
    Sound.playClick();
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    Sound.playClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-44 sm:pb-32 overflow-hidden">
      {/* Background Floating Blurred Ambient Orbs - Luminous Cosmos in Dark Mode */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 sm:w-[480px] sm:h-[480px] bg-indigo-600/25 dark:bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-float-orb-1" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 sm:w-[480px] sm:h-[480px] bg-amber-500/25 dark:bg-amber-600/18 rounded-full blur-[100px] pointer-events-none animate-float-orb-2" />
      <div className="absolute -bottom-10 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 dark:bg-purple-600/15 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Glowing announcement kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/90 dark:bg-[#0c0c1e] border border-indigo-200/90 dark:border-indigo-500/30 text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-300 mb-7 shadow-lg shadow-indigo-500/10 hover:border-indigo-500 transition-all cursor-default">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span>2026-yilgi yangi amaliy ta'lim va kasb dasturlari</span>
          </div>

          {/* Main Title with animated multi-stop glowing gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-balance">
            Kelajak kasblarini{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 bg-clip-text text-transparent animate-gradient-text drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              professional ustozlar
            </span>{' '}
            bilan o'rganing
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
            Dasturlash, zamonaviy dizayn, xorijiy tillar va raqamli marketingni amaliy
            keyslar orqali o'rganing. Shaxsiy portfolio to'plang, sertifikat oling va
            o'z sohangizning eng kuchli mutaxassisiga aylaning!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              type="button"
              onClick={scrollToCourses}
              className="relative group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_45px_rgba(79,70,229,0.7)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Kurslarni ko'rish</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            <button
              type="button"
              onClick={scrollToContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-[#070712] border border-slate-200 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg"
            >
              <span>Bepul maslahat olish</span>
            </button>
          </div>
        </div>

        {/* Counter Stats Section (Raqamlar sanalib chiqadi) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-2xl dark:hover:border-indigo-500/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-13 h-13 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <Users className="w-6 h-6" />
            </div>
            <AnimatedCounter end={12500} suffix="+" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
              Faol o'quvchilar
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-2xl dark:hover:border-purple-500/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-13 h-13 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <AnimatedCounter end={45} suffix="+" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
              Zamonaviy kurslar
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-2xl dark:hover:border-amber-500/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-13 h-13 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <AnimatedCounter end={30} suffix="+" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
              Professional ustozlar
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#080814] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-2xl dark:hover:border-emerald-500/50 flex flex-col items-center text-center hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <AnimatedCounter end={96} suffix="%" />
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 mt-1">
              Ishga joylashish natijasi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
