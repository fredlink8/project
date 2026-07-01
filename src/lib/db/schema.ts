export const schema = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT CHECK (role IN ('host', 'guest')) NOT NULL,
      created_at INTEGER DEFAULT (unixepoch())
    )
  `,
  
  properties: `
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      host_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      address TEXT NOT NULL,
      price_per_day DECIMAL NOT NULL,
      capacity INTEGER NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      images TEXT,
      created_at INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (host_id) REFERENCES users (id)
    )
  `,
  
  messages: `
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      property_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      recipient_id TEXT NOT NULL,
      content TEXT NOT NULL,
      read_at INTEGER,
      created_at INTEGER DEFAULT (unixepoch()),
      FOREIGN KEY (property_id) REFERENCES properties (id),
      FOREIGN KEY (sender_id) REFERENCES users (id),
      FOREIGN KEY (recipient_id) REFERENCES users (id)
    )
  `
};