import { supabase } from '../supabase';

export async function sendMessage(data: {
  property_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
}) {
  const { data: message, error } = await supabase
    .from('chat_messages')
    .insert(data)
    .select('*')
    .single();

  if (error) throw error;
  return message;
}

export async function getMessages(propertyId: string) {
  const { data: messages, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      sender:profiles!sender_id(name),
      recipient:profiles!recipient_id(name)
    `)
    .eq('property_id', propertyId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return messages;
}