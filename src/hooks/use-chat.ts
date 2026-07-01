import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { sendMessage, getMessages } from '../lib/api/chat';

export function useChat(propertyId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const data = await getMessages(propertyId);
        setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load messages'));
      } finally {
        setLoading(false);
      }
    }

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat:${propertyId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `property_id=eq.${propertyId}`
      }, (payload) => {
        setMessages(current => [...current, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [propertyId]);

  const send = async (content: string, senderId: string, recipientId: string) => {
    try {
      const message = await sendMessage({
        property_id: propertyId,
        sender_id: senderId,
        recipient_id: recipientId,
        content
      });
      return message;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send message'));
      throw err;
    }
  };

  return { messages, loading, error, send };
}