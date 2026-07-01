import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { getConversations, getMessagesByProperty } from '../lib/api/messages';

export function useConversations() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    async function loadConversations() {
      try {
        const data = await getConversations(user.id);
        setConversations(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load conversations'));
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, [user]);

  return { conversations, loading, error };
}

export function usePropertyMessages(propertyId: string) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user || !propertyId) return;

    async function loadMessages() {
      try {
        const data = await getMessagesByProperty(propertyId, user.id);
        setMessages(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load messages'));
      } finally {
        setLoading(false);
      }
    }

    loadMessages();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`messages:${propertyId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `property_id=eq.${propertyId}`
      }, payload => {
        if (payload.new) {
          setMessages(current => [...current, payload.new]);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [propertyId, user]);

  return { messages, loading, error };
}