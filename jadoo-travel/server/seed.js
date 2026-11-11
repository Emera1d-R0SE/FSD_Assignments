/**
 * Seed script — run with: node seed.js
 * Populates the DB with sample destinations and an admin user.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const User = require('./models/User');

const destinations = [
  {
    name: 'Rome', country: 'Italy', price: 5420, duration: '10 Days Trip',
    rating: 4.8, featured: true,
    description: 'Experience the eternal city with its Colosseum, Vatican, and incredible cuisine.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&auto=format&fit=crop',
  },
  {
    name: 'London', country: 'UK', price: 4200, duration: '12 Days Trip',
    rating: 4.6, featured: true,
    description: 'Discover the iconic Big Ben, Buckingham Palace, and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop',
  },
  {
    name: 'Full Europe', country: 'Europe', price: 15000, duration: '28 Days Trip',
    rating: 4.9, featured: true,
    description: 'An epic 28-day journey across Paris, Amsterdam, Prague and more.',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop',
  },
  {
    name: 'Santorini', country: 'Greece', price: 3800, duration: '7 Days Trip',
    rating: 4.9, featured: false,
    description: 'White-washed buildings and stunning sunsets over the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&auto=format&fit=crop',
  },
  {
    name: 'Bali', country: 'Indonesia', price: 2900, duration: '9 Days Trip',
    rating: 4.7, featured: false,
    description: 'Tropical paradise with lush rice terraces, temples and crystal waters.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop',
  },
  {
    name: 'Tokyo', country: 'Japan', price: 6100, duration: '14 Days Trip',
    rating: 4.8, featured: false,
    description: 'Where ancient tradition meets futuristic innovation.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Destination.deleteMany({});
  await Destination.insertMany(destinations);
  console.log(`✅ Seeded ${destinations.length} destinations`);

  const existing = await User.findOne({ email: 'admin@jadoo.co' });
  if (!existing) {
    await User.create({ name: 'Admin', email: 'admin@jadoo.co', password: 'admin123', role: 'admin' });
    console.log('✅ Admin user created → admin@jadoo.co / admin123');
  }

  await mongoose.disconnect();
  console.log('Done!');
}

seed().catch((err) => { console.error(err); process.exit(1); });
