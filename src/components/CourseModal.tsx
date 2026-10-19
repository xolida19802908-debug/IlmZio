import React from 'react';
import {
  X,
  Clock,
  User,
  Star,
  CheckCircle2,
  BookOpen,
  Award,
  ShoppingCart,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Course } from '../types';
import { CourseImage } from './CourseImage';
import { formatUzbekCurrency } from '../utils/storage';

interface CourseModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (course: Course) => void;
  onDirectCheckout: (course: Course) => void;
  isInCart: boolean;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  isOpen,
  onClose,
  onAddToCart,
  onDirectCheckout,
  isInCart,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#06060e] text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Media */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0">
          <CourseImage
            src={course.imageUrl}
            alt={course.title}
            category={course.category}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-3 text-xs mb-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-600 font-semibold uppercase tracking-wider">
                {course.category}
              </span>
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {course.rating.toFixed(1)} ({course.studentsCount} o'quvchi)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {course.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow space-y-6">
          {/* Metadata bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Davomiyligi</span>
                <span className="font-semibold">{course.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Darslar soni</span>
                <span className="font-semibold">{course.lessonsCount} ta dars</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Daraja</span>
                <span className="font-semibold">{course.level}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[11px]">Sertifikat</span>
                <span className="font-semibold">Mavjud</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Kurs haqida qisqacha
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Instructor Card */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block">
                Kurs o'qituvchisi
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {course.instructor}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {course.instructorRole}
              </p>
            </div>
          </div>

          {/* Key Features */}
          {course.features && course.features.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Kurs afzalliklari va imkoniyatlari
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {course.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Syllabus / Dars dasturi */}
          {course.syllabus && course.syllabus.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                O'quv dasturi (Syllabus)
              </h3>
              <div className="space-y-3">
                {course.syllabus.map((mod, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40"
                  >
                    <h5 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                      {mod.module}
                    </h5>
                    <ul className="space-y-1.5 pl-4 list-disc list-outside text-xs text-slate-600 dark:text-slate-400">
                      {mod.topics.map((top, tIdx) => (
                        <li key={tIdx}>{top}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#06060e] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-slate-400 block font-medium">To'liq kurs narxi</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                {formatUzbekCurrency(course.price)}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  {formatUzbekCurrency(course.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onAddToCart(course);
              }}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                isInCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isInCart ? 'Savatda mavjud' : 'Savatga qo\'shish'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onDirectCheckout(course);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Hozir xarid qilish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
