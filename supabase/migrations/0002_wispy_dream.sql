/*
  # Add chat system

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key)
      - `property_id` (uuid, references properties)
      - `sender_id` (uuid, references profiles)
      - `recipient_id` (uuid, references profiles)
      - `content` (text)
      - `created_at` (timestamp)
      - `read_at` (timestamp, nullable)

  2. Security
    - Enable RLS on chat_messages table
    - Add policies for sending and reading messages
*/

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES assets(id) NOT NULL,
  sender_id uuid REFERENCES profiles(id) NOT NULL,
  recipient_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chat messages
CREATE POLICY "Users can read messages they sent or received"
  ON chat_messages FOR SELECT
  USING (
    auth.uid() = sender_id OR
    auth.uid() = recipient_id
  );

CREATE POLICY "Users can send messages"
  ON chat_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid()
    )
  );

-- Create index for better query performance
CREATE INDEX chat_messages_property_id_idx ON chat_messages(property_id);
CREATE INDEX chat_messages_participants_idx ON chat_messages(sender_id, recipient_id);
CREATE INDEX chat_messages_created_at_idx ON chat_messages(created_at);