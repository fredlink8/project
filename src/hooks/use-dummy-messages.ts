import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dummy_messages';

interface DummyMessage {
  id: string;
  propertyId: string;
  propertyTitle: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  content: string;
  createdAt: string;
}

// Helper function to get messages from localStorage
function getStoredMessages(): DummyMessage[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Helper function to save messages to localStorage
function saveMessages(messages: DummyMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

export function useDummyMessages(propertyId: string) {
  const [messages, setMessages] = useState<DummyMessage[]>(() => 
    getStoredMessages().filter(m => m.propertyId === propertyId)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(getStoredMessages().filter(m => m.propertyId === propertyId));
    }, 1000);

    return () => clearInterval(interval);
  }, [propertyId]);

  const sendMessage = async (message: Omit<DummyMessage, 'id' | 'createdAt'>) => {
    const newMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    const allMessages = getStoredMessages();
    saveMessages([...allMessages, newMessage]);
    setMessages(prev => [...prev, newMessage]);
    
    return newMessage;
  };

  return { messages, sendMessage };
}

export function useDummyConversations(userId: string) {
  const [conversations, setConversations] = useState<{
    propertyId: string;
    propertyTitle: string;
    messages: DummyMessage[];
  }[]>(() => {
    const messages = getStoredMessages();
    const conversationMap = new Map();
    
    messages.forEach(message => {
      if (message.senderId === userId || message.recipientId === userId) {
        if (!conversationMap.has(message.propertyId)) {
          conversationMap.set(message.propertyId, {
            propertyId: message.propertyId,
            propertyTitle: message.propertyTitle,
            messages: []
          });
        }
        conversationMap.get(message.propertyId).messages.push(message);
      }
    });
    
    return Array.from(conversationMap.values());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = getStoredMessages();
      const conversationMap = new Map();
      
      messages.forEach(message => {
        if (message.senderId === userId || message.recipientId === userId) {
          if (!conversationMap.has(message.propertyId)) {
            conversationMap.set(message.propertyId, {
              propertyId: message.propertyId,
              propertyTitle: message.propertyTitle,
              messages: []
            });
          }
          conversationMap.get(message.propertyId).messages.push(message);
        }
      });
      
      setConversations(Array.from(conversationMap.values()));
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  return conversations;
}