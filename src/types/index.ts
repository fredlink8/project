export type UserRole = 'host' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  created_at: string;
}

export interface Asset {
  id: string;
  host_id: string;
  type: 'accommodation' | 'vehicle' | 'bicycle' | 'quad_bike';
  title: string;
  description: string;
  capacity: number;
  price_per_day: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  available: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  guest_id: string;
  asset_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  created_at: string;
}