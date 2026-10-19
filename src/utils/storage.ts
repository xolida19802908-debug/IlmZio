import { Course, Order, ContactMessage } from '../types';
import { INITIAL_COURSES, INITIAL_ORDERS, INITIAL_MESSAGES } from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'ilmziyo_courses',
  ORDERS: 'ilmziyo_orders',
  MESSAGES: 'ilmziyo_messages',
  CART: 'ilmziyo_cart',
  THEME: 'ilmziyo_theme',
  ADMIN_AUTH: 'ilmziyo_admin_auth',
};

// Safe JSON parser
function safeGet<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event('ilmziyo_storage_change'));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

export const StorageService = {
  getCourses(): Course[] {
    const data = safeGet<Course[]>(STORAGE_KEYS.COURSES, []);
    if (!data || data.length === 0) {
      safeSet(STORAGE_KEYS.COURSES, INITIAL_COURSES);
      return INITIAL_COURSES;
    }
    return data;
  },

  saveCourses(courses: Course[]): void {
    safeSet(STORAGE_KEYS.COURSES, courses);
  },

  addCourse(course: Omit<Course, 'id' | 'rating' | 'studentsCount' | 'lessonsCount' | 'features'>): Course {
    const courses = this.getCourses();
    const newCourse: Course = {
      ...course,
      id: `course-${Date.now()}`,
      rating: 5.0,
      studentsCount: 1,
      lessonsCount: 40,
      features: [
        'Interaktiv amaliy darslar',
        'Ustozdan doimiy fikr-mulohazalar',
        'Maxsus sertifikat beriladi'
      ]
    };
    const updated = [newCourse, ...courses];
    this.saveCourses(updated);
    return newCourse;
  },

  updateCourse(updatedCourse: Course): void {
    const courses = this.getCourses();
    const index = courses.findIndex(c => c.id === updatedCourse.id);
    if (index !== -1) {
      courses[index] = updatedCourse;
      this.saveCourses(courses);
    }
  },

  deleteCourse(courseId: string): void {
    const courses = this.getCourses().filter(c => c.id !== courseId);
    this.saveCourses(courses);
  },

  getOrders(): Order[] {
    const data = safeGet<Order[]>(STORAGE_KEYS.ORDERS, []);
    if (!data || data.length === 0) {
      safeSet(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return data;
  },

  saveOrders(orders: Order[]): void {
    safeSet(STORAGE_KEYS.ORDERS, orders);
  },

  addOrder(order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const orders = this.getOrders();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...order,
      id: `ord-${Date.now()}`,
      orderNumber: `UZ-${randomSuffix}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newOrder, ...orders];
    this.saveOrders(updated);
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: 'To\'langan' | 'Kutilmoqda'): void {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      this.saveOrders(orders);
    }
  },

  deleteOrder(orderId: string): void {
    const orders = this.getOrders().filter(o => o.id !== orderId);
    this.saveOrders(orders);
  },

  getMessages(): ContactMessage[] {
    const data = safeGet<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
    if (!data || data.length === 0) {
      safeSet(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
      return INITIAL_MESSAGES;
    }
    return data;
  },

  saveMessages(messages: ContactMessage[]): void {
    safeSet(STORAGE_KEYS.MESSAGES, messages);
  },

  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    this.saveMessages(updated);
    return newMsg;
  },

  deleteMessage(messageId: string): void {
    const messages = this.getMessages().filter(m => m.id !== messageId);
    this.saveMessages(messages);
  },

  resetAllData(): void {
    safeSet(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    safeSet(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    safeSet(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  }
};

export function formatUzbekCurrency(amount: number): string {
  return new Intl.NumberFormat('uz-UZ').format(amount) + ' so\'m';
}
