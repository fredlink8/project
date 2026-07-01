export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          id: string
          property_id: string
          sender_id: string
          recipient_id: string
          content: string
          created_at: string
          read_at: string | null
        }
        Insert: {
          id?: string
          property_id: string
          sender_id: string
          recipient_id: string
          content: string
          created_at?: string
          read_at?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          sender_id?: string
          recipient_id?: string
          content?: string
          created_at?: string
          read_at?: string | null
        }
      }
    }
  }
}