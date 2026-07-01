/*
  # Add Payment Methods Support

  This migration adds support for payment methods including crypto payments.

  1. Changes
    - Add payment_methods column to profiles table
    - Add crypto_wallet_addresses column to profiles table
    - Add validation constraint for payment methods
    - Add crypto address validation function
*/

-- Add new payment method columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'payment_methods'
  ) THEN
    ALTER TABLE profiles
    ADD COLUMN payment_methods jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'crypto_wallet_addresses'
  ) THEN
    ALTER TABLE profiles
    ADD COLUMN crypto_wallet_addresses jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Add payment methods constraint if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_payment_methods'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT valid_payment_methods CHECK (
      payment_methods @> '[]'::jsonb AND
      (payment_methods -> 'crypto' IS NULL OR payment_methods -> 'crypto' @> '[]'::jsonb)
    );
  END IF;
END $$;

-- Create or replace function for crypto address validation
CREATE OR REPLACE FUNCTION validate_crypto_address(address text, crypto_type text)
RETURNS boolean AS $$
BEGIN
  RETURN CASE crypto_type
    WHEN 'usdt' THEN 
      address ~ '^(0x[a-fA-F0-9]{40}|T[A-Za-z1-9]{33})$'
    WHEN 'chippercash' THEN
      address ~ '^[A-Za-z0-9]{3,50}$'
    ELSE false
  END;
END;
$$ LANGUAGE plpgsql;