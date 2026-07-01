import { db } from '../client';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const ChatMessageSchema = z.object({
  id: z.string(),
  property_id: z.string(),
  sender_id: z.string(),
  recipient_id: z.string(),
  content: z.string(),
  read_at: z.number().nullable(),
  created_at: z.number(),
  sender: z.object({
    name: z.string()
  })
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export async function createMessage(data: Omit<ChatMessage, 'id' | 'created_at' | 'read_at' | 'sender'>) {
  const id = nanoid();
  
  await db.execute({
    sql: `
      INSERT INTO chat_messages (id, property_id, sender_id, recipient_id, content)
      VALUES (?, ?, ?, ?, ?)
    `,
    args: [id, data.property_id, data.sender_id, data.recipient_id, data.content]
  });
  
  return getMessageById(id);
}

export async function getMessageById(id: string) {
  const result = await db.execute({
    sql: `
      SELECT m.*, json_object('name', u.name) as sender
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `,
    args: [id]
  });
  
  return result.rows[0] ? ChatMessageSchema.parse(result.rows[0]) : null;
}

export async function getMessagesByProperty(propertyId: string) {
  const result = await db.execute({
    sql: `
      SELECT m.*, json_object('name', u.name) as sender
      FROM chat_messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.property_id = ?
      ORDER BY m.created_at ASC
    `,
    args: [propertyId]
  });
  
  return result.rows.map(row => ChatMessageSchema.parse(row));
}

export async function markMessagesAsRead(recipientId: string, propertyId: string) {
  await db.execute({
    sql: `
      UPDATE chat_messages
      SET read_at = unixepoch()
      WHERE recipient_id = ?
      AND property_id = ?
      AND read_at IS NULL
    `,
    args: [recipientId, propertyId]
  });
}