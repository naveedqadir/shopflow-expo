import type { Product, Category, User, Order } from '@/src/types';

// ─── Categories ──────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'LayoutGrid', productCount: 12 },
  { id: 'audio', name: 'Audio', icon: 'Headphones', productCount: 3 },
  { id: 'wearables', name: 'Wearables', icon: 'Watch', productCount: 3 },
  { id: 'accessories', name: 'Accessories', icon: 'Smartphone', productCount: 3 },
  { id: 'cameras', name: 'Cameras', icon: 'Camera', productCount: 3 },
];

// ─── Products ────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AirPods Pro Max',
    description:
      'Premium over-ear headphones with adaptive noise cancellation, spatial audio, and a breathable knit mesh canopy. The H2 chip delivers computational audio for an unparalleled listening experience.',
    price: 549,
    originalPrice: 599,
    image: 'https://picsum.photos/seed/headphones1/800/800',
    category: 'audio',
    rating: 4.8,
    reviewCount: 2341,
    inStock: true,
    colors: ['#2D2D2D', '#C0C0C0', '#1A3A5C'],
    features: [
      'Active Noise Cancellation',
      'Spatial Audio with head tracking',
      '20-hour battery life',
      'USB-C charging',
    ],
  },
  {
    id: '2',
    name: 'SoundWave Buds',
    description:
      'True wireless earbuds with crystal-clear audio, deep bass, and up to 30 hours of total battery life. IP67 water resistance for any adventure.',
    price: 179,
    originalPrice: 229,
    image: 'https://picsum.photos/seed/earbuds1/800/800',
    category: 'audio',
    rating: 4.6,
    reviewCount: 1892,
    inStock: true,
    colors: ['#FFFFFF', '#1A1A1A', '#E8D5B7'],
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      '30hr total battery',
      'IP67 water resistant',
    ],
  },
  {
    id: '3',
    name: 'BassDrop Speaker',
    description:
      'Portable Bluetooth speaker with 360° sound, deep bass radiator, and 24-hour battery. Built tough with IP68 waterproofing.',
    price: 299,
    image: 'https://picsum.photos/seed/speaker1/800/800',
    category: 'audio',
    rating: 4.5,
    reviewCount: 987,
    inStock: true,
    colors: ['#1A1A1A', '#3D5A80'],
    features: [
      '360° immersive sound',
      '24-hour battery',
      'IP68 waterproof',
      'Multi-speaker pairing',
    ],
  },
  {
    id: '4',
    name: 'Pulse Ultra Watch',
    description:
      'Advanced smartwatch with AMOLED display, health monitoring suite, GPS, and 7-day battery life. Track 100+ workout types.',
    price: 399,
    originalPrice: 449,
    image: 'https://picsum.photos/seed/watch1/800/800',
    category: 'wearables',
    rating: 4.7,
    reviewCount: 3456,
    inStock: true,
    colors: ['#2D2D2D', '#E8D5B7', '#3D5A80'],
    features: [
      'AMOLED always-on display',
      'Heart rate + SpO2 + ECG',
      '7-day battery life',
      'Built-in GPS',
    ],
  },
  {
    id: '5',
    name: 'FitBand Pro',
    description:
      'Slim fitness tracker with OLED display, continuous heart rate monitoring, sleep tracking, and 14-day battery life.',
    price: 129,
    image: 'https://picsum.photos/seed/fitband1/800/800',
    category: 'wearables',
    rating: 4.3,
    reviewCount: 2109,
    inStock: true,
    colors: ['#1A1A1A', '#C0392B', '#2ECC71'],
    features: [
      'Continuous heart rate',
      'Sleep quality scoring',
      '14-day battery',
      'Water resistant 50m',
    ],
  },
  {
    id: '6',
    name: 'SmartRing Aura',
    description:
      'Titanium smart ring with health tracking, NFC payments, and gesture control. Barely noticeable, endlessly useful.',
    price: 349,
    image: 'https://picsum.photos/seed/ring1/800/800',
    category: 'wearables',
    rating: 4.4,
    reviewCount: 654,
    inStock: false,
    colors: ['#C0C0C0', '#2D2D2D', '#FFD700'],
    features: [
      'Titanium construction',
      'NFC payments',
      'Sleep + activity tracking',
      '5-day battery',
    ],
  },
  {
    id: '7',
    name: 'MagSafe PowerPack',
    description:
      'Magnetic wireless power bank with 10,000mAh capacity, MagSafe alignment, and pass-through charging. Charges 2 devices simultaneously.',
    price: 79,
    originalPrice: 99,
    image: 'https://picsum.photos/seed/powerbank1/800/800',
    category: 'accessories',
    rating: 4.5,
    reviewCount: 1567,
    inStock: true,
    colors: ['#FFFFFF', '#1A1A1A'],
    features: [
      '10,000mAh capacity',
      'MagSafe compatible',
      'Pass-through charging',
      'USB-C + wireless',
    ],
  },
  {
    id: '8',
    name: 'FlexMount Pro',
    description:
      'Articulating phone mount with MagSafe, 360° rotation, and universal clamp. Perfect for desk, car, or content creation.',
    price: 49,
    image: 'https://picsum.photos/seed/mount1/800/800',
    category: 'accessories',
    rating: 4.2,
    reviewCount: 890,
    inStock: true,
    features: [
      '360° rotation',
      'MagSafe alignment',
      'Universal clamp',
      'Cable management',
    ],
  },
  {
    id: '9',
    name: 'KeyCraft Keyboard',
    description:
      'Mechanical wireless keyboard with hot-swappable switches, RGB backlighting, aluminum frame, and triple-mode connectivity.',
    price: 189,
    originalPrice: 219,
    image: 'https://picsum.photos/seed/keyboard1/800/800',
    category: 'accessories',
    rating: 4.7,
    reviewCount: 1234,
    inStock: true,
    colors: ['#2D2D2D', '#F5F5DC'],
    features: [
      'Hot-swappable switches',
      'Per-key RGB',
      'Bluetooth + 2.4G + USB',
      'Aluminum frame',
    ],
  },
  {
    id: '10',
    name: 'LensX Mirrorless',
    description:
      'Full-frame mirrorless camera with 45MP sensor, 8K video, in-body stabilization, and dual card slots. The ultimate creative tool.',
    price: 2499,
    originalPrice: 2799,
    image: 'https://picsum.photos/seed/camera1/800/800',
    category: 'cameras',
    rating: 4.9,
    reviewCount: 876,
    inStock: true,
    colors: ['#1A1A1A'],
    features: [
      '45MP full-frame sensor',
      '8K 30fps video',
      '5-axis IBIS',
      'Dual CFexpress slots',
    ],
  },
  {
    id: '11',
    name: 'ActionCam 360',
    description:
      'Dual-lens action camera with 5.7K 360° capture, invisible selfie stick, AI editing, and rugged waterproof design.',
    price: 449,
    image: 'https://picsum.photos/seed/actioncam1/800/800',
    category: 'cameras',
    rating: 4.6,
    reviewCount: 1023,
    inStock: true,
    colors: ['#1A1A1A'],
    features: [
      '5.7K 360° video',
      'Invisible selfie stick',
      'AI auto-edit',
      'Waterproof 10m',
    ],
  },
  {
    id: '12',
    name: 'DroneVista X4',
    description:
      'Compact folding drone with 4K camera, 3-axis gimbal, 45-min flight time, and obstacle avoidance. Fits in your pocket.',
    price: 799,
    originalPrice: 899,
    image: 'https://picsum.photos/seed/drone1/800/800',
    category: 'cameras',
    rating: 4.7,
    reviewCount: 567,
    inStock: true,
    colors: ['#2D2D2D'],
    features: [
      '4K 60fps camera',
      '3-axis gimbal',
      '45-min flight time',
      'Omnidirectional sensing',
    ],
  },
];

// ─── Sample Users ────────────────────────────────────────────────
export const SAMPLE_USER: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://picsum.photos/seed/avatar1/400/400',
  joinedAt: '2025-03-15',
};

// ─── Sample Orders ───────────────────────────────────────────────
export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    items: [
      {
        productId: '1',
        productName: 'AirPods Pro Max',
        productImage: 'https://picsum.photos/seed/headphones1/800/800',
        price: 549,
        quantity: 1,
      },
      {
        productId: '7',
        productName: 'MagSafe PowerPack',
        productImage: 'https://picsum.photos/seed/powerbank1/800/800',
        price: 79,
        quantity: 2,
      },
    ],
    total: 707,
    status: 'delivered',
    createdAt: '2026-08-10',
    estimatedDelivery: '2026-08-15',
  },
  {
    id: 'ORD-002',
    items: [
      {
        productId: '4',
        productName: 'Pulse Ultra Watch',
        productImage: 'https://picsum.photos/seed/watch1/800/800',
        price: 399,
        quantity: 1,
      },
    ],
    total: 399,
    status: 'shipped',
    createdAt: '2026-08-20',
    estimatedDelivery: '2026-08-27',
  },
];
