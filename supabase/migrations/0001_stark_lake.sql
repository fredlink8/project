/*
  # Initial Schema Setup for SAMAAS

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to Supabase auth users
      - Includes role (host/guest) and verification status
    
    - `assets`
      - Stores all mobility and accommodation assets
      - Includes location data, pricing, and availability
    
    - `bookings`
      - Manages reservations and rentals
      - Tracks status and payment information
    
    - `reviews`
      - Stores user reviews and ratings
      - Links to both assets and users

  2. Security
    - Enable RLS on all tables
    - Add policies for data access based on user roles
    - Ensure users can only access appropriate data

  3. Indexes
    - Add indexes for frequently queried columns
    - Optimize location-based queries
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('host', 'guest')),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create assets table
CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES profiles(id) NOT NULL,
  type text NOT NULL CHECK (type IN ('accommodation', 'vehicle', 'bicycle', 'quad_bike')),
  title text NOT NULL,
  description text,
  capacity integer NOT NULL,
  price_per_day decimal NOT NULL,
  location jsonb NOT NULL,
  images text[] DEFAULT '{}',
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_id uuid REFERENCES profiles(id) NOT NULL,
  asset_id uuid REFERENCES assets(id) NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price decimal NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Assets policies
CREATE POLICY "Assets are viewable by everyone"
  ON assets FOR SELECT
  USING (true);

CREATE POLICY "Hosts can insert assets"
  ON assets FOR INSERT
  WITH CHECK (
    auth.uid() = host_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'host'
    )
  );

CREATE POLICY "Hosts can update own assets"
  ON assets FOR UPDATE
  USING (auth.uid() = host_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = guest_id OR auth.uid() IN (
    SELECT host_id FROM assets WHERE id = asset_id
  ));

CREATE POLICY "Guests can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (
    auth.uid() = guest_id AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'guest'
    )
  );

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can create reviews for completed bookings"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM bookings
      WHERE id = booking_id AND status = 'completed'
      AND (guest_id = auth.uid() OR auth.uid() IN (
        SELECT host_id FROM assets WHERE id = asset_id
      ))
    )
  );

-- Create indexes
CREATE INDEX assets_location_idx ON assets USING GIN (location);
CREATE INDEX assets_type_idx ON assets (type);
CREATE INDEX bookings_dates_idx ON bookings (start_date, end_date);
CREATE INDEX reviews_rating_idx ON reviews (rating);