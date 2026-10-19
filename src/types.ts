export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorRole: string;
  duration: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  level: 'Boshlang\'ich' | 'O\'rta' | 'Mukammal' | 'Barchaga';
  features: string[];
  syllabus?: { module: string; topics: string[] }[];
}

export interface CartItem {
  course: Course;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  paymentMethod: 'payme' | 'click' | 'uzumbank' | 'naqd';
  courses: {
    id: string;
    title: string;
    price: number;
  }[];
  totalAmount: number;
  status: 'To\'langan' | 'Kutilmoqda';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  contact: string; // phone or email
  courseInterest: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  courseTitle: string;
  avatarUrl: string;
  rating: number;
  text: string;
}

export type ThemeMode = 'light' | 'dark';
