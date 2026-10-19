import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  TrendingUp,
  BookOpen,
  ShoppingBag,
  MessageSquare,
  LogOut,
  AlertTriangle,
  RotateCcw,
  BarChart3,
  Calendar,
  Phone,
  DollarSign,
  User,
  Check
} from 'lucide-react';
import { Course, Order, ContactMessage } from '../types';
import { StorageService, formatUzbekCurrency } from '../utils/storage';
import { CourseImage } from './CourseImage';
import { CATEGORIES } from '../data/initialData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ilmziyo_admin_session') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'courses' | 'orders' | 'messages' | 'analytics'>('courses');

  // Local mirror state for fast updates
  const [courses, setCourses] = useState<Course[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Course Modal state (Add / Edit)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: 'Dasturlash',
    instructor: '',
    instructorRole: 'Katta mutaxassis',
    duration: '4 oy (haftada 3 kun)',
    price: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    level: 'Barchaga' as Course['level'],
  });

  // Delete confirmation modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'course' | 'order' | 'message';
    id: string;
    title: string;
  } | null>(null);

  const loadData = () => {
    setCourses(StorageService.getCourses());
    setOrders(StorageService.getOrders());
    setMessages(StorageService.getMessages());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setPasswordError(false);
      setPasswordInput('');
      sessionStorage.setItem('ilmziyo_admin_session', 'true');
      loadData();
    } else {
      setPasswordError(true);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ilmziyo_admin_session');
  };

  // Calculations
  const totalRevenue = orders
    .filter((o) => o.status === 'To\'langan')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // Open Add Course
  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      title: '',
      description: '',
      category: 'Dasturlash',
      instructor: '',
      instructorRole: 'Katta mutaxassis',
      duration: '4 oy (haftada 3 kun)',
      price: 450000,
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      level: 'Barchaga',
    });
    setIsCourseModalOpen(true);
  };

  // Open Edit Course
  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      instructor: course.instructor,
      instructorRole: course.instructorRole || 'Ustoz',
      duration: course.duration,
      price: course.price,
      imageUrl: course.imageUrl,
      level: course.level || 'Barchaga',
    });
    setIsCourseModalOpen(true);
  };

  // Save Course
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title.trim()) return;

    if (editingCourse) {
      // Update
      const updated: Course = {
        ...editingCourse,
        ...courseFormData,
      };
      StorageService.updateCourse(updated);
    } else {
      // Add
      StorageService.addCourse({
        title: courseFormData.title.trim(),
        description: courseFormData.description.trim(),
        category: courseFormData.category,
        instructor: courseFormData.instructor.trim() || 'Professional Mentor',
        instructorRole: courseFormData.instructorRole.trim(),
        duration: courseFormData.duration.trim(),
        price: Number(courseFormData.price) || 0,
        imageUrl: courseFormData.imageUrl.trim(),
        level: courseFormData.level,
      });
    }

    setIsCourseModalOpen(false);
    loadData();
    onDataChanged();
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'course') {
      StorageService.deleteCourse(deleteTarget.id);
    } else if (deleteTarget.type === 'order') {
      StorageService.deleteOrder(deleteTarget.id);
    } else if (deleteTarget.type === 'message') {
      StorageService.deleteMessage(deleteTarget.id);
    }

    setDeleteTarget(null);
    loadData();
    onDataChanged();
  };

  // Toggle order status
  const handleToggleOrderStatus = (order: Order) => {
    const newStatus = order.status === 'To\'langan' ? 'Kutilmoqda' : 'To\'langan';
    StorageService.updateOrderStatus(order.id, newStatus);
    loadData();
    onDataChanged();
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('Barcha ma\'lumotlar (kurslar, buyurtmalar, xabarlar) dastlabki holatga qaytarilsinmi?')) {
      StorageService.resetAllData();
      loadData();
      onDataChanged();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* 1. PASSWORD AUTH SCREEN */}
      {!isAuthenticated ? (
        <div className="relative w-full max-w-md bg-white dark:bg-[#05050c] rounded-3xl border border-slate-200/90 dark:border-white/10 p-8 shadow-2xl text-center">
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
            Admin boshqaruv paneli
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Ushbu bo'lim faqat ma'murlar uchun. Iltimos, tizim parolini kiriting.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (passwordError) setPasswordError(false);
                }}
                placeholder="Parolni kiriting (parol: admin123)"
                className="w-full px-4 py-3 rounded-xl text-sm bg-slate-50 dark:bg-[#0a0a16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center font-mono tracking-wider"
                autoFocus
              />
              {passwordError && (
                <div className="mt-2.5 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center gap-1.5 animate-shake">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Parol xato! Iltimos, qaytadan urinib ko'ring.</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-md cursor-pointer transition-all"
            >
              Kirish
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] text-slate-400">
            Sinov uchun standart parol: <code className="bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-bold">admin123</code>
          </div>
        </div>
      ) : (
        /* 2. AUTHENTICATED ADMIN DASHBOARD */
        <div className="relative w-full max-w-6xl bg-white dark:bg-[#05050d] text-slate-900 dark:text-white rounded-3xl border border-slate-200/90 dark:border-white/10 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-4">
          {/* Admin Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/50 dark:bg-[#070714] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    IlmZiyo Boshqaruv Markazi
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Avtorizatsiyalangan
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kurslar, buyurtmalar, foydalanuvchi xabarlari va moliyaviy hisobotlar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleResetData}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Barcha ma'lumotlarni dastlabki holatga qaytarish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Qayta tiklash</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Chiqish</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Yopish"
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Admin Navigation Tabs */}
          <div className="px-6 pt-3 border-b border-slate-200 dark:border-white/10 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'courses'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Kurslar ({courses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buyurtmalar ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'messages'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Xabarlar ({messages.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'analytics'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Grafik va Analitika</span>
            </button>
          </div>

          {/* Admin Scrollable Content */}
          <div className="p-6 overflow-y-auto flex-grow space-y-6">
            {/* Top 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
                  <span className="text-xs font-bold uppercase">Kurslar soni</span>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {courses.length}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Faol ta'lim yo'nalishlari</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60">
                <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
                  <span className="text-xs font-bold uppercase">Buyurtmalar</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {orders.length}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {orders.filter((o) => o.status === 'To\'langan').length} tasi to'langan
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
                  <span className="text-xs font-bold uppercase">Jami daromad</span>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums truncate">
                  {formatUzbekCurrency(totalRevenue)}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Tasdiqlangan to'lovlardan</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/60">
                <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
                  <span className="text-xs font-bold uppercase">Yangi xabarlar</span>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                  {messages.length}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Aloqa formasidan kelgan</p>
              </div>
            </div>

            {/* TAB 1: KURSLAR BOSHQARUVI */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Barcha mavjud kurslar ro'yxati
                  </h4>
                  <button
                    type="button"
                    onClick={handleOpenAddCourse}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi kurs qo'shish</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 flex gap-4 items-center justify-between shadow-xs"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                        <CourseImage
                          src={course.imageUrl}
                          alt={course.title}
                          category={course.category}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">
                          {course.category}
                        </span>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {course.title}
                        </h5>
                        <p className="text-xs text-slate-500 truncate">
                          {course.instructor} · {course.duration}
                        </p>
                        <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                          {formatUzbekCurrency(course.price)}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEditCourse(course)}
                          className="p-2 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              type: 'course',
                              id: course.id,
                              title: course.title,
                            })
                          }
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: BUYURTMALAR BOSHQARUVI */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Barcha kelib tushgan buyurtmalar
                  </h4>
                  <span className="text-xs text-slate-500">
                    Jami to'langan summa: <strong className="text-indigo-600 font-bold tabular-nums">{formatUzbekCurrency(totalRevenue)}</strong>
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    Hozircha buyurtmalar yo'q.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="p-3">ID / Sana</th>
                          <th className="p-3">Mijoz</th>
                          <th className="p-3">Kurslar</th>
                          <th className="p-3">Summa</th>
                          <th className="p-3">To'lov turi</th>
                          <th className="p-3">Holati</th>
                          <th className="p-3 text-right">Amal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                        {orders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="p-3 whitespace-nowrap">
                              <span className="font-bold text-slate-900 dark:text-white block">
                                #{ord.orderNumber}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {new Date(ord.createdAt).toLocaleDateString('uz-UZ', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </td>

                            <td className="p-3">
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {ord.customerName}
                              </div>
                              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400" />
                                {ord.customerPhone}
                              </div>
                            </td>

                            <td className="p-3 max-w-xs">
                              {ord.courses.map((c, i) => (
                                <div key={i} className="truncate text-slate-700 dark:text-slate-300">
                                  • {c.title}
                                </div>
                              ))}
                            </td>

                            <td className="p-3 font-bold text-slate-900 dark:text-white tabular-nums whitespace-nowrap">
                              {formatUzbekCurrency(ord.totalAmount)}
                            </td>

                            <td className="p-3 uppercase font-medium text-slate-500">
                              {ord.paymentMethod}
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleToggleOrderStatus(ord)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                                  ord.status === 'To\'langan'
                                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200'
                                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-200'
                                }`}
                                title="Holatni almashtirish uchun bosing"
                              >
                                {ord.status === 'To\'langan' ? '✓ To\'langan' : '⏳ Kutilmoqda'}
                              </button>
                            </td>

                            <td className="p-3 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteTarget({
                                    type: 'order',
                                    id: ord.id,
                                    title: `#${ord.orderNumber} - ${ord.customerName}`,
                                  })
                                }
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                title="Buyurtmani o'chirish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ALOQA FORMASIDAN KELGAN XABARLAR */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Aloqa formasidan kelgan murojaatlar
                  </h4>
                  <span className="text-xs text-slate-500">
                    Jami: {messages.length} ta xabar
                  </span>
                </div>

                {messages.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    Yangi xabarlar mavjud emas.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {msg.name}
                            </span>
                            <span className="text-xs text-indigo-600 font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                              {msg.courseInterest}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-400">
                              {new Date(msg.createdAt).toLocaleDateString('uz-UZ', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  type: 'message',
                                  id: msg.id,
                                  title: `${msg.name} xabari`,
                                })
                              }
                              className="p-1 rounded text-slate-400 hover:text-rose-600 cursor-pointer"
                              title="Xabarni o'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500">
                          Aloqa: <strong className="text-slate-800 dark:text-slate-200">{msg.contact}</strong>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                          {msg.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: ODDIY USTUNLI GRAFIK (BAR CHART) */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Kurslar bo'yicha daromad tahlili
                  </h4>
                  <p className="text-xs text-slate-500">
                    Qaysi kurs eng ko'p talab qilinayotgani va tushum ko'rsatkichlari
                  </p>
                </div>

                {/* SVG / CSS Bar Chart */}
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 space-y-4">
                  <div className="space-y-3">
                    {courses.map((course) => {
                      // Calculate orders for this course
                      const courseOrders = orders.filter((o) =>
                        o.courses.some((c) => c.title === course.title)
                      );
                      const courseRev = courseOrders.reduce(
                        (sum, o) => sum + course.price,
                        0
                      );
                      const maxRef = Math.max(1500000, totalRevenue || 1);
                      const percentage = Math.min(100, Math.round((courseRev / maxRef) * 100));

                      return (
                        <div key={course.id} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
                              {course.title}
                            </span>
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                              {formatUzbekCurrency(courseRev)} ({courseOrders.length} ta buyurtma)
                            </span>
                          </div>

                          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                            <div
                              style={{ width: `${Math.max(percentage, 4)}%` }}
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                            >
                              {percentage > 10 ? `${percentage}%` : ''}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
            <div className="fixed inset-0 z-60 bg-slate-950/70 flex items-center justify-center p-4">
              <div className="w-full max-w-sm glass-card rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  O'chirishni tasdiqlaysizmi?
                </h4>
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-800 dark:text-slate-200 block truncate">"{deleteTarget.title}"</strong>
                  ni o'chirib tashlamoqchimisiz? Ushbu amalni qaytarib bo'lmaydi.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
                  >
                    Ha, o'chirilsin
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Course Add / Edit Modal */}
          {isCourseModalOpen && (
            <div className="fixed inset-0 z-60 bg-slate-950/70 flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-lg glass-card rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl my-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCourse} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Kurs nomi *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseFormData.title}
                      onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                      placeholder="Masalan: Frontend React va Next.js"
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Kategoriya
                      </label>
                      <select
                        value={courseFormData.category}
                        onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        {CATEGORIES.filter((c) => c !== 'Barchasi').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Narxi (so'mda) *
                      </label>
                      <input
                        type="number"
                        required
                        value={courseFormData.price}
                        onChange={(e) => setCourseFormData({ ...courseFormData, price: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Ustoz ismi *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseFormData.instructor}
                        onChange={(e) => setCourseFormData({ ...courseFormData, instructor: e.target.value })}
                        placeholder="Masalan: Sardor Alimov"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Davomiyligi *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseFormData.duration}
                        onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                        placeholder="Masalan: 4 oy (haftada 3 kun)"
                        className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Rasm havolasi (URL)
                    </label>
                    <input
                      type="url"
                      value={courseFormData.imageUrl}
                      onChange={(e) => setCourseFormData({ ...courseFormData, imageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Qisqa tavsif *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={courseFormData.description}
                      onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                      placeholder="Kurs kimlar uchun va nimalar o'rgatiladi?.."
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white resize-none"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCourseModalOpen(false)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md cursor-pointer"
                    >
                      {editingCourse ? 'Saqlash' : 'Qo\'shish'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
