import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { Benefits } from './components/Benefits';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { ScrollTop } from './components/ScrollTop';
import { Loader } from './components/Loader';
import { FloatingCanvas } from './components/FloatingCanvas';
import { Course, CartItem, Order, ThemeMode } from './types';
import { StorageService } from './utils/storage';
import { Sound } from './utils/audio';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  // 1. Initial Page Loading state
  const [isLoading, setIsLoading] = useState(true);

  // 2. Theme State (Dark / Light)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ilmziyo_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Start in ultra-impressive pitch-black dark mode by default!
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    localStorage.setItem('ilmziyo_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. Courses State from Storage
  const [courses, setCourses] = useState<Course[]>(() => StorageService.getCourses());

  const refreshCourses = useCallback(() => {
    setCourses(StorageService.getCourses());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      refreshCourses();
    };
    window.addEventListener('ilmziyo_storage_change', handleStorageChange);
    return () => window.removeEventListener('ilmziyo_storage_change', handleStorageChange);
  }, [refreshCourses]);

  // 4. Cart State (persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ilmziyo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartBumping, setIsCartBumping] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ilmziyo_cart', JSON.stringify(cartItems));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cartItems]);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add Course to Cart
  const handleAddToCart = (course: Course) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.course.id === course.id);
      if (existing) {
        return prev.map((item) =>
          item.course.id === course.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { course, quantity: 1 }];
    });

    setIsCartBumping(true);
    setTimeout(() => setIsCartBumping(false), 400);
    showToast(`"${course.title}" savatga muvaffaqiyatli qo'shildi!`);
  };

  // Update Cart Quantity
  const handleUpdateQuantity = (courseId: string, delta: number) => {
    Sound.playClick();
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.course.id === courseId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove Course from Cart
  const handleRemoveFromCart = (courseId: string) => {
    Sound.playClick();
    setCartItems((prev) => prev.filter((item) => item.course.id !== courseId));
  };

  // 5. Modals State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Open Course Details Modal
  const handleOpenCourseDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  // Direct Checkout from Course Modal
  const handleDirectCheckout = (course: Course) => {
    if (!cartItems.some((i) => i.course.id === course.id)) {
      setCartItems((prev) => [...prev, { course, quantity: 1 }]);
    }
    setIsCheckoutOpen(true);
  };

  // Order Success callback
  const handleOrderSuccess = (order: Order) => {
    setCartItems([]);
    showToast(`To'lov muvaffaqiyatli qabul qilindi! Buyurtma #${order.orderNumber}`);
  };

  // Compute set of course ids currently in cart
  const cartCourseIds = new Set(cartItems.map((i) => i.course.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030306] text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-500 relative">
      {/* 0. Ambient Floating Particle Canvas Background */}
      <FloatingCanvas isDark={theme === 'dark'} />

      {/* 1. Initial Page Loader */}
      {isLoading && <Loader onLoaded={() => setIsLoading(false)} />}

      {/* 2. Floating Toast Notification with glowing aura */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900/95 dark:bg-[#0c0c1c]/95 text-white text-xs sm:text-sm font-bold shadow-2xl shadow-indigo-500/25 flex items-center gap-2.5 border border-indigo-500/40 backdrop-blur-xl animate-slideUp">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
          <span>{toastMessage}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
        </div>
      )}

      {/* 3. Top Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openAdmin={() => setIsAdminOpen(true)}
        isCartBumping={isCartBumping}
      />

      {/* 4. Main Page Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Courses Catalog Section */}
        <CoursesSection
          courses={courses}
          cartCourseIds={cartCourseIds}
          onAddToCart={handleAddToCart}
          onOpenDetails={handleOpenCourseDetails}
        />

        {/* Benefits Section */}
        <Benefits />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Contact Form Section */}
        <ContactForm />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* 6. Floating Back to Top Button */}
      <ScrollTop />

      {/* 7. Course Details Modal */}
      <CourseModal
        course={selectedCourse}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
        isInCart={selectedCourse ? cartCourseIds.has(selectedCourse.id) : false}
      />

      {/* 8. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* 9. Checkout Demo Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* 10. Admin Dashboard Panel */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataChanged={refreshCourses}
      />
    </div>
  );
}
