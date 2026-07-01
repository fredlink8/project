import { db } from '../client';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const AssetSchema = z.object({
  id: z.string(),
  host_id: z.string(),
  type: z.enum(['accommodation', 'vehicle', 'bicycle', 'quad_bike']),
  title: z.string(),
  description: z.string().optional(),
  capacity: z.number(),
  price_per_day: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string(),
  images: z.string().transform(str => str.split(',').filter(Boolean)),
  available: z.number().transform(Boolean),
  created_at: z.number()
});

export type Asset = z.infer<typeof AssetSchema>;

export async function createAsset(data: Omit<Asset, 'id' | 'created_at' | 'available'>) {
  const id = nanoid();
  
  await db.execute({
    sql: `
      INSERT INTO assets (
        id, host_id, type, title, description, capacity,
        price_per_day, latitude, longitude, address, images
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      id,
      data.host_id,
      data.type,
      data.title,
      data.description || '',
      data.capacity,
      data.price_per_day,
      data.latitude,
      data.longitude,
      data.address,
      data.images.join(',')
    ]
  });
  
  return getAssetById(id);
}

export async function getAssetById(id: string) {
  const result = await db.execute({
    sql: 'SELECT * FROM assets WHERE id = ?',
    args: [id]
  });
  
  return result.rows[0] ? AssetSchema.parse(result.rows[0]) : null;
}

export async function searchAssets({
  type,
  lat,
  lng,
  radius = 10, // km
  limit = 20,
  offset = 0
}: {
  type?: Asset['type'],
  lat?: number,
  lng?: number,
  radius?: number,
  limit?: number,
  offset?: number
}) {
  let sql = 'SELECT * FROM assets WHERE available = 1';
  const args: any[] = [];
  
  if (type) {
    sql += ' AND type = ?';
    args.push(type);
  }
  
  if (lat && lng) {
    // Haversine formula for distance calculation
    sql += `
      AND (
        6371 * acos(
          cos(radians(?)) *
          cos(radians(latitude)) *
          cos(radians(longitude) - radians(?)) +
          sin(radians(?)) *
          sin(radians(latitude))
        )
      ) <= ?
    `;
    args.push(lat, lng, lat, radius);
  }
  
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  args.push(limit, offset);
  
  const result = await db.execute({ sql, args });
  return result.rows.map(row => AssetSchema.parse(row));
}