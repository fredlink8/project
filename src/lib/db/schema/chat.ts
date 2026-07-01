export const chatSchema = `
  CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    property_id TEXT NOT NULL,
    sender_id TEXT NOT NULL,
    recipient_id TEXT NOT NULL,
    content TEXT NOT NULL,
    read_at INTEGER,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (sender_id) REFERENCES users (id),
    FOREIGN KEY (recipient_id) REFERENCES users (id)
  );

  CREATE INDEX IF NOT EXISTS idx_chat_property ON chat_messages (property_id);
  CREATE INDEX IF NOT EXISTS idx_chat_participants ON chat_messages (sender_id, recipient_id);
  CREATE INDEX IF NOT EXISTS idx_chat_created_at ON chat_messages (created_at);
`;