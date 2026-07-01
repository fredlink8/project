import { db } from './client';
import { schema } from './schema';

export async function initializeDatabase() {
  try {
    // Create tables
    for (const [table, query] of Object.entries(schema)) {
      await db.execute(query);
    }
    
    // Create indexes
    await db.execute(`
      CREATE INDEX IF NOT EXISTS idx_messages_property ON messages (property_id);
      CREATE INDEX IF NOT EXISTS idx_messages_participants ON messages (sender_id, recipient_id);
      CREATE INDEX IF NOT EXISTS idx_messages_created ON messages (created_at);
      CREATE INDEX IF NOT EXISTS idx_properties_location ON properties (latitude, longitude);
    `);
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}