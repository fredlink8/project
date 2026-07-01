import { db } from '../client';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['host', 'guest']),
  name: z.string(),
  created_at: z.number()
});

export type User = z.infer<typeof UserSchema>;

export async function createUser(data: Omit<User, 'id' | 'created_at'>) {
  const id = nanoid();
  
  await db.execute({
    sql: `
      INSERT INTO users (id, email, role, name)
      VALUES (?, ?, ?, ?)
    `,
    args: [id, data.email, data.role, data.name]
  });
  
  return getUserById(id);
}

export async function getUserById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE id = ?',
    args: [id]
  });
  
  return result.rows[0] ? UserSchema.parse(result.rows[0]) : null;
}

export async function getUserByEmail(email: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: [email]
  });
  
  return result.rows[0] ? UserSchema.parse(result.rows[0]) : null;
}