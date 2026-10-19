import { Course, Testimonial, Order, ContactMessage } from '../types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Zamonaviy Ingliz tili (A1 - C1)',
    description: 'Noldan erkin muloqot va xalqaro IELTS darajasiga qadar. Grammatika, intensiv speaking club va interaktiv metodika orqali tezkor o\'rganish.',
    category: 'Tillar',
    instructor: 'Malika Rahimova',
    instructorRole: 'IELTS 8.5 sohibasi, 7 yillik tajribali ustoz',
    duration: '6 oy (haftada 3 kun)',
    price: 420000,
    originalPrice: 550000,
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    studentsCount: 342,
    lessonsCount: 72,
    level: 'Barchaga',
    features: [
      'Speaking club haftasiga 2 marta',
      'Xalqaro sertifikat beriladi',
      'Dars yozuvlari va audio materiallar',
      'Shaxsiy kurator nazorati'
    ],
    syllabus: [
      { module: '1-modul: Boshlang\'ich grammatika va fonetika', topics: ['Alifbo va to\'g\'ri talaffuz', 'Asosiy zamon shakllari', 'Kundalik lug\'at boyligi'] },
      { module: '2-modul: Intermediate va amaliy muloqot', topics: ['Murakkab gap qurilmalari', 'Idiomalar va frazeologizmlar', 'Jonli suhbat amaliyoti'] },
      { module: '3-modul: IELTS tayyorgarligi va akademik ingliz tili', topics: ['Listening & Reading strategiyalari', 'Writing Task 1 & 2 tahlili', 'Speaking imtihon simulyatsiyasi'] }
    ]
  },
  {
    id: 'course-2',
    title: 'Python dasturlash va Sun\'iy intellekt',
    description: 'Python sintaksisi, algoritmlar, Django freymvorki, ma\'lumotlar tahlili va eng so\'nggi sun\'iy intellekt (LLM, OpenAI API) integratsiyalari bilan real loyihalar yaratish.',
    category: 'Dasturlash',
    instructor: 'Sardorbek Alimov',
    instructorRole: 'Senior AI Engineer, IT Park rezidenti',
    duration: '5 oy (amaliy loyihalar)',
    price: 550000,
    originalPrice: 700000,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    studentsCount: 420,
    lessonsCount: 65,
    level: 'Boshlang\'ich',
    features: [
      'Real 5 ta yirik portfolio loyihasi',
      'Telegram bot va API ishlab chiqish',
      'AI modellarini loyihalarga ulash',
      'Texnik suhbatlarga tayyorgarlik'
    ],
    syllabus: [
      { module: '1-modul: Python asoslari va OOP', topics: ['O\'zgaruvchilar, sikllar va funksiyalar', 'Obyektga yo\'naltirilgan dasturlash', 'Algoritmlar va ma\'lumotlar tuzilmasi'] },
      { module: '2-modul: Backend va Telegram botlar', topics: ['Aiogram bilan botlar tuzish', 'PostgreSQL bilan ishlash', 'Django / FastAPI asoslari'] },
      { module: '3-modul: Data Science va Sun\'iy Intellekt', topics: ['Pandas, NumPy bilan tahlil', 'Machine Learning asoslari', 'LLM va API integratsiyalari'] }
    ]
  },
  {
    id: 'course-3',
    title: 'Professional Grafik dizayn (UI/UX & Figma)',
    description: 'Figma, Adobe Photoshop va Illustrator yordamida zamonaviy veb-saytlar va mobil ilovalar dizaynini yaratish, foydalanuvchi tajribasini (UX) chuqur o\'rganish.',
    category: 'Dizayn',
    instructor: 'Nodira Karimova',
    instructorRole: 'Lead UI/UX Designer, Behance Top Creator',
    duration: '4 oy (portfolio asosida)',
    price: 480000,
    originalPrice: 620000,
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    studentsCount: 285,
    lessonsCount: 52,
    level: 'Barchaga',
    features: [
      'Behance va Dribbble uchun 6 ta keys',
      'Figma interaktiv prototiplar',
      'Ranglar va tipografiya psixologiyasi',
      'Xalqaro frilans birjalarida ishlash'
    ],
    syllabus: [
      { module: '1-modul: Grafik dizayn fundamental asoslari', topics: ['Kompozitsiya va ranglar uyg\'unligi', 'Photoshop va Illustrator amaliyoti', 'Brending va vektor grafika'] },
      { module: '2-modul: Figma va UI dizayn', topics: ['Auto-layout va komponentlar tizimi', 'Veb-sayt dizayni yaratish', 'Mobil ilova interfeysi (iOS & Android)'] },
      { module: '3-modul: UX tadqiqotlar va prototiplash', topics: ['User Persona va User Flow', 'Interaktiv animatsiyalar', 'Mijozga loyihani taqdim etish'] }
    ]
  },
  {
    id: 'course-4',
    title: 'Oliy va amaliy Matematika',
    description: 'Mantiqiy fikrlash, oliy matematika, chiziqli algebra, ehtimollar nazariyasi va dasturlash uchun zarur amaliy matematik apparatni oson uslubda o\'rganing.',
    category: 'Fan va Aniqlik',
    instructor: 'Prof. Jamshid To\'rayev',
    instructorRole: 'Matematika fanlari nomzodi, 15 yillik dotsent',
    duration: '3 oy (intensiv kurs)',
    price: 350000,
    originalPrice: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    studentsCount: 198,
    lessonsCount: 40,
    level: 'O\'rta',
    features: [
      'Amaliy masalalar yechish metodikasi',
      'IT va algoritmlar uchun matematika',
      'Magistratura va xalqaro imtihonlarga tayyorlov',
      'Har bir mavzu bo\'yicha test tahlili'
    ],
    syllabus: [
      { module: '1-modul: Matematik analiz va hosilalar', topics: ['Funksiya turlari va chegaralar', 'Hosilalar va ularning tatbiqi', 'Integrallar va maydon hisoblash'] },
      { module: '2-modul: Chiziqli algebra va matritsalar', topics: ['Matritsalar ustida amallar', 'Determinant va vektorlar', 'Tenglamalar sistemasi'] },
      { module: '3-modul: Ehtimollar nazariyasi va diskret matematika', topics: ['Kombinatorika elementlari', 'Tasodifiy miqdorlar va taqsimotlar', 'Algoritmik murakkablik hisobi'] }
    ]
  },
  {
    id: 'course-5',
    title: 'Zamonaviy Veb-sayt yaratish (Full-Stack)',
    description: 'HTML5, CSS3, Tailwind CSS, JavaScript ES6+, React, Node.js va zamonaviy ma\'lumotlar bazalari orqali noldan to\'liq ishlaydigan veb-saytlar va ilovalar yasash.',
    category: 'Dasturlash',
    instructor: 'Azizbek Qodirov',
    instructorRole: 'Full-Stack Software Architect, 8 yillik tajriba',
    duration: '6 oy (amaliyot bilan)',
    price: 590000,
    originalPrice: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    studentsCount: 510,
    lessonsCount: 84,
    level: 'Barchaga',
    features: [
      'To\'liq mustaqil 4 ta yirik veb-loyiha',
      'Frontend (React) va Backend (Node.js)',
      'Git, GitHub va serverlarga deploy qilish',
      'Ishga joylashish kafolatlangan amaliyot'
    ],
    syllabus: [
      { module: '1-modul: Frontend asoslari va responsivlik', topics: ['HTML5 semantik teglari va zamonaviy CSS3', 'Tailwind CSS bilan tezkor versta', 'Flexbox va CSS Grid mukammal darajada'] },
      { module: '2-modul: JavaScript va React ekotizimi', topics: ['JavaScript ES6+, DOM manipulyatsiyasi', 'React.js komponentlar va hooks', 'State boshqaruvi va API integratsiyasi'] },
      { module: '3-modul: Backend va to\'liq Full-Stack loyiha', topics: ['Node.js va Express server qurish', 'RESTful API va autentifikatsiya', 'Loyihani real internetga joylash (Vercel, Render)'] }
    ]
  },
  {
    id: 'course-6',
    title: 'SMM va Raqamli Marketing',
    description: 'Instagram, Telegram, TikTok algoritmlari, targeted reklama (Meta Ads), sifatli kopirayting, brend rivojlantirish va savdoni bir necha barobarga oshirish sirlari.',
    category: 'Marketing',
    instructor: 'Gulnoza Yusupova',
    instructorRole: 'Top brendlar SMM strategi, 60+ keyslar muallifi',
    duration: '3 oy (keyslar tahlili)',
    price: 390000,
    originalPrice: 500000,
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    studentsCount: 312,
    lessonsCount: 38,
    level: 'Boshlang\'ich',
    features: [
      'Meta Business Suite va Target sozlamalari',
      'Reels va virusli kontent formulasi',
      'Kopirayting va savdo matnlari sirlari',
      'Mijoz bilan shartnoma tuzish va hisobot berish'
    ],
    syllabus: [
      { module: '1-modul: SMM strategiya va maqsadli auditoriya', topics: ['Bozor tahlili va raqobatchilarni o\'rganish', 'Target auditoriya portretini chizish', 'Kontent-reja va vizual uslub yaratish'] },
      { module: '2-modul: Reels, TikTok va virusli kontent', topics: ['Ssenariy yozish va trendlar tahlili', 'Mobil montaj ilovalari (CapCut)', 'Sahifa obunachilarini tabiiy ko\'paytirish'] },
      { module: '3-modul: Target reklama va analitika', topics: ['Facebook Ads Manager to\'liq sozlamalari', 'Byudjet optimallashtirish va A/B test', 'ROI va konversiya ko\'rsatkichlarini hisoblash'] }
    ]
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Jasur Bekmurodov',
    role: 'Frontend Dasturchi',
    courseTitle: 'Zamonaviy Veb-sayt yaratish',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    text: 'Kurs tufayli 3 oylik qattiq mehnatdan so\'ng birinchi xalqaro frilans loyihamni muvaffaqiyatli topshirdim. Ustoz har bir kodimni alohida ko\'rib chiqib, to\'g\'ri yo\'nalish berdi. Materiallar juda tushunarli va dolzarb!'
  },
  {
    id: 'test-2',
    name: 'Zarina Oripova',
    role: 'Kichik UI/UX Dizayner',
    courseTitle: 'Professional Grafik dizayn',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    text: 'Figma va zamonaviy UX tadqiqot qoidalarini amaliyotda o\'rganish juda qulay bo\'ldi. Portfoliomdagi keyslar tufayli Toshkentdagi IT kompaniyaga ishga qabul qilindim. Barchaga chin dildan tavsiya qilaman!'
  },
  {
    id: 'test-3',
    name: 'Bekzod Saidov',
    role: 'Junior Python Dasturchi',
    courseTitle: 'Python dasturlash va Sun\'iy intellekt',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    rating: 5,
    text: 'Murakkab algoritmlar va sun\'iy intellekt tushunchalari o\'zbek tilida juda aniq va sodda tushuntirilgan. Telegram bot va ChatGPT integratsiyasini o\'rganib, hozirda real korxonaga avtomatlashtirish tizimini qurmoqdaman.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'UZ-89140',
    customerName: 'Akmal Zokirov',
    customerPhone: '+998 90 123 45 67',
    paymentMethod: 'click',
    courses: [
      { id: 'course-2', title: 'Python dasturlash va Sun\'iy intellekt', price: 550000 }
    ],
    totalAmount: 550000,
    status: 'To\'langan',
    createdAt: '2026-10-18T10:15:00.000Z'
  },
  {
    id: 'ord-2',
    orderNumber: 'UZ-89141',
    customerName: 'Dilnoza Karimova',
    customerPhone: '+998 93 543 21 00',
    paymentMethod: 'payme',
    courses: [
      { id: 'course-3', title: 'Professional Grafik dizayn (UI/UX & Figma)', price: 480000 }
    ],
    totalAmount: 480000,
    status: 'To\'langan',
    createdAt: '2026-10-18T14:30:00.000Z'
  },
  {
    id: 'ord-3',
    orderNumber: 'UZ-89142',
    customerName: 'Otabek Soliyev',
    customerPhone: '+998 97 888 77 66',
    paymentMethod: 'uzumbank',
    courses: [
      { id: 'course-5', title: 'Zamonaviy Veb-sayt yaratish (Full-Stack)', price: 590000 },
      { id: 'course-1', title: 'Zamonaviy Ingliz tili (A1 - C1)', price: 420000 }
    ],
    totalAmount: 1010000,
    status: 'Kutilmoqda',
    createdAt: '2026-10-18T18:45:00.000Z'
  }
];

export const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sanjar Ergashev',
    contact: '+998 91 999 00 11',
    courseInterest: 'Dasturlash (Python va Veb)',
    message: 'Assalomu alaykum! Kurslar boshlanish sanasi va darslar vaqti haqida batafsil ma\'lumot bera olasizmi?',
    createdAt: '2026-10-18T16:20:00.000Z'
  },
  {
    id: 'msg-2',
    name: 'Shahlo Qosimova',
    contact: 'shahlo_q@gmail.com',
    courseInterest: 'Grafik dizayn',
    message: 'Noutbukim qanday parametrda bo\'lishi kerak? Noldan o\'rgata olasizlarmi?',
    createdAt: '2026-10-18T19:05:00.000Z'
  }
];

export const CATEGORIES = [
  'Barchasi',
  'Dasturlash',
  'Dizayn',
  'Tillar',
  'Fan va Aniqlik',
  'Marketing'
];
