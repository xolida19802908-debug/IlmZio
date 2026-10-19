import React, { useState, useRef } from 'react';
import { Clock, User, Star, Plus, Check, Info, Sparkles } from 'lucide-react';
import { Course } from '../types';
import { CourseImage } from './CourseImage';
import { formatUzbekCurrency } from '../utils/storage';
import { Sound } from '../utils/audio';

interface CourseCardProps {
  course: Course;
  isInCart: boolean;
  onAddToCart: (course: Course) => void;
  onOpenDetails: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isInCart,
  onAddToCart,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // 3D tilt calculation + specular spotlight coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setShinePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    Sound.playChime();
    onAddToCart(course);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(course)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? 'translateY(-6px) scale(1.015)' : 'translateY(0px) scale(1)'
        }`,
        transition: isHovered
          ? 'transform 0.12s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease-out, border-color 0.4s ease-out',
      }}
      className="group relative rounded-3xl border border-slate-200/90 dark:border-white/10 overflow-hidden cursor-pointer flex flex-col h-full bg-white dark:bg-[#07070f] dark:text-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 card-glow-hover transition-all"
    >
      {/* Dynamic Specular Spotlight / Glare Shine layer */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 350px at ${shinePos.x}% ${shinePos.y}%, rgba(99, 102, 241, 0.15), transparent 70%)`,
        }}
      />

      {/* Course Image Container */}
      <div className="relative h-50 w-full overflow-hidden bg-slate-100 dark:bg-[#0f0f1c] shrink-0">
        <CourseImage
          src={course.imageUrl}
          alt={course.title}
          category={course.category}
          className="group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Category Pill Tag */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-wide border border-white/15 shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{course.category}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-black flex items-center gap-1.5 border border-white/15 shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{course.rating.toFixed(1)}</span>
        </div>

        {/* Instructor banner over bottom of image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-2 text-white/95 text-xs">
          <div className="w-6 h-6 rounded-full bg-indigo-600/90 backdrop-blur-md flex items-center justify-center font-bold text-white shrink-0 text-[11px] shadow-sm">
            <User className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold truncate drop-shadow-sm">{course.instructor}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5 font-medium">
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{course.lessonsCount} ta dars</span>
            <span aria-hidden="true" className="text-slate-400">·</span>
            <span>{course.level}</span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2 leading-snug">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Card Footer: Price & Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="block text-[11px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
              Kurs narxi
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                {formatUzbekCurrency(course.price)}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through tabular-nums hidden sm:inline">
                  {formatUzbekCurrency(course.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Details modal launcher */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                Sound.playClick();
                onOpenDetails(course);
              }}
              title="Dars dasturi va batafsil"
              className="p-2.5 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Add to Cart button with bouncing feedback */}
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer shadow-md ${
                isInCart || justAdded
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                  : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white active:scale-95 shadow-indigo-600/30 hover:shadow-indigo-600/50'
              } ${justAdded ? 'animate-bounce' : ''}`}
            >
              {isInCart || justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Savatda</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Savatga</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
