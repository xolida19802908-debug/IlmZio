import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ShoppingCart,
  Lock,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { ThemeMode } from '../types';
import { Sound } from '../utils/audio';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  cartCount: number;
  openCart: () => void;
  openAdmin: () => void;
  isCartBumping: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  cartCount,
  openCart,
  openAdmin,
  isCartBumping,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(Sound.enabled);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = Sound.toggleSound();
    setSoundEnabled(newState);
  };

  const navLinks = [
    { name: 'Bosh sahifa', href: '#home' },
    { name: 'Kurslar', href: '#courses' },
    { name: 'Afzalliklar', href: '#benefits' },
    { name: 'Fikrlar', href: '#testimonials' },
    { name: 'Aloqa', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    Sound.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top glowing scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-150 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#030306]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg dark:shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 text-xl font-black tracking-tight text-slate-900 dark:text-white group shrink-0"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-amber-500 opacity-40 blur-xs group-hover:opacity-80 transition-opacity pointer-events-none" />
              </div>
              <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-500 to-amber-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-amber-400">
                IlmZiyo
                <Sparkles className="w-4 h-4 ml-1 text-amber-400 inline animate-spin" style={{ animationDuration: '6s' }} />
              </span>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-700 dark:text-slate-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Sound, Theme, Cart, Admin, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Sound effects toggle */}
              <button
                type="button"
                onClick={handleToggleSound}
                aria-label="Ovoz effektlarini yoqish/o'chirish"
                className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer"
                title={soundEnabled ? 'Ovoz effektlarini o\'chirish' : 'Ovoz effektlarini yoqish'}
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {/* Dark/Light mode toggle */}
              <button
                type="button"
                onClick={() => {
                  Sound.playClick();
                  toggleTheme();
                }}
                aria-label="Rejimni o'zgartirish"
                className="relative p-2.5 rounded-2xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-all duration-300 cursor-pointer overflow-hidden group shadow-xs"
                title={theme === 'dark' ? 'Yorug\' rejimga o\'tish' : 'Qorong\'i (Ultra Dark) rejimga o\'tish'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4.5 h-4.5 text-amber-400 group-hover:rotate-90 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-indigo-700 group-hover:-rotate-45 transition-transform duration-500" />
                )}
              </button>

              {/* Cart Button with glowing jump badge */}
              <button
                type="button"
                onClick={() => {
                  Sound.playClick();
                  openCart();
                }}
                aria-label="Savat"
                className={`relative p-2.5 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-all cursor-pointer ${
                  isCartBumping ? 'scale-120 text-indigo-500' : ''
                }`}
                title="Savatni ochish"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black flex items-center justify-center shadow-lg shadow-amber-500/50 ${
                      isCartBumping ? 'animate-bounce scale-125' : ''
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Lock Button */}
              <button
                type="button"
                onClick={() => {
                  Sound.playClick();
                  openAdmin();
                }}
                aria-label="Admin panel"
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 shadow-xs cursor-pointer"
                title="Admin boshqaruv paneli (Parol: admin123)"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>

              {/* Mobile menu burger */}
              <button
                type="button"
                onClick={() => {
                  Sound.playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label="Menyu"
                className="md:hidden p-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-[#030306]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 mt-2 px-6 py-5 shadow-2xl transition-all duration-300 animate-slideUp">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2.5 rounded-xl text-base font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  <ShoppingCart className="w-4.5 h-4.5 text-indigo-500" />
                  Savat ({cartCount})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdmin();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Admin panel
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
