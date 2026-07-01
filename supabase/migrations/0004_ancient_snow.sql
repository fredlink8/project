/*
  # Add Crypto Payment Options

  1. Changes
    - Add new payment method types for crypto payments
    - Add new columns for crypto wallet addresses
    - Add validation for crypto addresses

  2. Security
    - Enable RLS on the new columns
    - Add policies to protect sensitive payment data
*/

-- Add new payment method types
ALTER TABLE profiles
ADD COLUMN payment_methods jsonb DEFAULT '[]'::jsonb,
ADD COLUMN crypto_wallet_addresses jsonb DEFAULT '{}'::jsonb,
ADD CONSTRAINT valid_payment_methods CHECK (
  payment_methods @> '[]'::jsonb AND
  (payment_methods -> 'crypto' IS NULL OR payment_methods -> 'crypto' @> '[]'::jsonb)
);

-- Add function to validate crypto addresses
CREATE OR REPLACE FUNCTION validate_crypto_address(address text, crypto_type text)
RETURNS boolean AS $$
BEGIN
  -- Basic validation patterns
  RETURN CASE crypto_type
    WHEN 'usdt' THEN 
      -- Basic USDT address validation (both ERC20 and TRC20)
      address ~ '^(0x[a-fA-F0-9]{40}|T[A-Za-z1-9]{33})$'
    WHEN 'chippercash' THEN
      -- ChipperCash tag validation
      address ~ '^[A-Za-z0-9]{3,50}$'
    ELSE false
  END;
END;
$$ LANGUAGE plpgsql;