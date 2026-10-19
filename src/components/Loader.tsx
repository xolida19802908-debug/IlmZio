import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';

interface LoaderProps {
  onLoaded: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(15);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(55), 200);
    const timer2 = setTimeout(() => setProgress(90), 500);
    const timer3 = setTimeout(() => setProgress(100), 800);
    const timer4 = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onLoaded, 350);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 p-0.5 animate-pulse">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      <h2 className="text-xl font-black tracking-tight mb-2 flex items-center gap-1.5">
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-400 bg-clip-text text-transparent">
          IlmZiyo
        </span>
      </h2>
      <p className="text-xs text-slate-400 mb-6 font-medium">
        Ta'lim platformasi yuklanmoqda...
      </p>

      {/* Progress bar line */}
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
