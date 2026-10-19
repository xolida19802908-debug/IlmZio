import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, BookOpen, RotateCcw } from 'lucide-react';
import { Course } from '../types';
import { CourseCard } from './CourseCard';
import { CATEGORIES } from '../data/initialData';

interface CoursesSectionProps {
  courses: Course[];
  cartCourseIds: Set<string>;
  onAddToCart: (course: Course) => void;
  onOpenDetails: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  cartCourseIds,
  onAddToCart,
  onOpenDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesCategory =
          selectedCategory === 'Barchasi' ||
          course.category.toLowerCase() === selectedCategory.toLowerCase();
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default 'popular' -> by studentsCount
        return b.studentsCount - a.studentsCount;
      });
  }, [courses, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Barchasi');
    setSearchQuery('');
    setSortBy('popular');
  };

  return (
    <section id="courses" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eng mashhur o'quv yo'nalishlari</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Kelajagingiz uchun to'g'ri kursni tanlang
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Barcha kurslarimiz xalqaro standartlar va zamonaviy bozor talablari asosida
            tayyorlangan. O'zingizga qulay formatda o'rganing.
          </p>
        </div>

        {/* Search, Filter Bar and Sorting */}
        <div className="bg-white/90 dark:bg-[#06060e] p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurs nomi, ustoz yoki kalit so'z bo'yicha qidiring..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm bg-slate-50 dark:bg-[#0c0c18] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Tozalash
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline whitespace-nowrap font-medium">
                Saralash:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 rounded-2xl text-xs sm:text-sm bg-slate-50 dark:bg-[#0c0c18] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="popular">Eng ommabop</option>
                <option value="rating">Yuqori reytingli</option>
                <option value="price-asc">Narx: arzonroq</option>
                <option value="price-desc">Narx: qimmatroq</option>
              </select>
            </div>
          </div>

          {/* Interactive Category Filter Segmented Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100/90 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count Info */}
        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Topilgan kurslar: <strong className="text-slate-900 dark:text-white tabular-nums">{filteredCourses.length}</strong> ta
          </span>
          {(searchQuery || selectedCategory !== 'Barchasi') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Barcha filtrlarni bekor qilish
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isInCart={cartCourseIds.has(course.id)}
                onAddToCart={onAddToCart}
                onOpenDetails={onOpenDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 glass-card rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Hech qanday kurs topilmadi
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Qidiruv so'rovingizga mos kurs topilmadi. Boshqa so'z bilan qidirib ko'ring yoki filtrlarni tozalang.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Filtrlarni tozalash
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
