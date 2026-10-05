/**
 * Curated Categories Data for MV Finds
 */
export const CATEGORIES = [
  {
    id: 'home',
    slug: 'home-finds',
    route: '/home-finds',
    name: 'Home Finds',
    eyebrow: 'Living & Comfort',
    shortDescription: 'Small upgrades that make your space feel better.',
    longDescription: 'Simple, intentional products that make your room feel more comfortable, organized, and quietly beautiful without unnecessary clutter.',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'We prioritize natural textures, gentle lighting, and clever storage solutions that actually fit smaller spaces.',
    types: ['Lighting', 'Storage', 'Decor', 'Organization', 'Relaxation']
  },
  {
    id: 'style',
    slug: 'style-finds',
    route: '/style-finds',
    name: 'Style Finds',
    eyebrow: 'Everyday Wear & Essentials',
    shortDescription: 'Everyday pieces that make getting ready easier.',
    longDescription: 'Thoughtful everyday accessories, durable bags, and timeless essentials that balance comfort, simplicity, and clean aesthetic appeal.',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Focusing on versatile staples and functional daily carriers rather than fast-fading micro-trends.',
    types: ['Bags', 'Accessories', 'Organization', 'Daily Essentials']
  },
  {
    id: 'tech',
    slug: 'tech-finds',
    route: '/tech-finds',
    name: 'Tech Finds',
    eyebrow: 'Productivity & Gadgets',
    shortDescription: 'Useful tech without unnecessary complexity.',
    longDescription: 'Practical workspace peripherals, reliable charging solutions, and ergonomic tech accessories that quietly solve daily friction.',
    heroImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'We test for build quality, cable efficiency, and clean desk setups—no gimmicky RGB overload.',
    types: ['Peripherals', 'Cable Care', 'Power', 'Stands', 'Audio']
  },
  {
    id: 'study-desk',
    slug: 'study-desk-finds',
    route: '/study-desk-finds',
    name: 'Study & Desk Finds',
    eyebrow: 'Focus & Organization',
    shortDescription: 'Better tools for better study sessions.',
    longDescription: 'Stationery, desk organization, and ergonomic tools designed to eliminate visual noise and help you stay in a deep focus state.',
    heroImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Every study find is evaluated for tactile feel, durability, and practical utility on compact desks.',
    types: ['Desk Organization', 'Stationery', 'Desk Lighting', 'Planners', 'Ergonomics']
  },
  {
    id: 'gifts',
    slug: 'gift-ideas',
    route: '/gift-ideas',
    name: 'Gift Ideas',
    eyebrow: 'Thoughtful Gifting',
    shortDescription: 'Thoughtful finds for every kind of person.',
    longDescription: 'Curated gifts that feel personal, useful, and delightful without breaking the bank or gathering dust in a drawer.',
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
    curatorNote: 'Items people genuinely appreciate receiving because they make everyday rituals just a little more special.',
    types: ['Under ₹1000', 'Desk Gifts', 'Home Accents', 'Everyday Care', 'Creative']
  }
];

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}
