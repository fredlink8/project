import { db } from './client';
import { schema } from './schema';

export async function initializeDatabase() {
  try {
    // Create tables in order due to foreign key constraints
    await db.execute(schema.users);
    await db.execute(schema.assets);
    await db.execute(schema.bookings);
    await db.execute(schema.reviews);
    
    // Create indexes for better query performance
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_assets_location ON assets (latitude, longitude);
      CREATE INDEX IF NOT EXISTS idx_assets_type ON assets (type);
      CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings (start_date, end_date);
      CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews (rating);
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}