import { supabase } from '../supabase';
import type { Database } from '../supabase-types';

type Message = Database['public']['Tables']['chat_messages']['Row'];

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      id,
      property_id,
      sender_id,
      recipient_id,
      content,
      created_at,
      read_at,
      properties:assets!inner(
        title,
        host_id
      )
    `)
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMessagesByProperty(propertyId: string, userId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('property_id', propertyId)
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function sendMessage(message: {
  property_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
}) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert(message)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markMessagesAsRead(propertyId: string, userId: string) {
  const { error } = await supabase
    .from('chat_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('property_id', propertyId)
    .eq('recipient_id', userId)
    .is('read_at', null);

  if (error) throw error;
}