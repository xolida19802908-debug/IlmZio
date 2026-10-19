import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface CourseImageProps {
  src: string;
  alt: string;
  category?: string;
  className?: string;
}

export const CourseImage: React.FC<CourseImageProps> = ({
  src,
  alt,
  category = 'Kurs',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  // Category based fallback gradients
  const getGradientByCategory = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'dasturlash':
        return 'from-indigo-600 via-purple-600 to-blue-700';
      case 'dizayn':
        return 'from-rose-500 via-pink-600 to-amber-500';
      case 'tillar':
        return 'from-emerald-600 via-teal-600 to-cyan-700';
      case 'fan va aniqlik':
        return 'from-amber-600 via-orange-600 to-indigo-700';
      case 'marketing':
        return 'from-violet-600 via-fuchsia-600 to-pink-600';
      default:
        return 'from-indigo-700 via-slate-800 to-purple-800';
    }
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br ${getGradientByCategory(
          category
        )} ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
          {category}
        </span>
        <h4 className="text-sm font-bold text-center mt-1 line-clamp-2 px-2">
          {alt}
        </h4>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
    />
  );
};
