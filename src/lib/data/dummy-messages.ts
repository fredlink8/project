// Dummy data structure for messages
export interface DummyMessage {
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

// Initial dummy messages
export const initialMessages: DummyMessage[] = [
  {
    id: '1',
    propertyId: '1',
    propertyTitle: 'Luxury Villa with Ocean View',
    senderId: 'host1',
    senderName: 'John Host',
    recipientId: 'guest1',
    recipientName: 'Alice Guest',
    content: 'Hello! Thanks for your interest in the villa. Let me know if you have any questions.',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    propertyId: '1',
    propertyTitle: 'Luxury Villa with Ocean View',
    senderId: 'guest1',
    senderName: 'Alice Guest',
    recipientId: 'host1',
    recipientName: 'John Host',
    content: 'Hi! Is the pool heated? And do you offer airport transfers?',
    createdAt: new Date().toISOString()
  }
];

// Helper functions for managing messages in localStorage
const STORAGE_KEY = 'dummy_messages';

export function getStoredMessages(): DummyMessage[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessages));
    return initialMessages;
  }
  return JSON.parse(stored);
}

export function addMessage(message: Omit<DummyMessage, 'id' | 'createdAt'>) {
  const messages = getStoredMessages();
  const newMessage = {
    ...message,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  
  messages.push(newMessage);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  return newMessage;
}

export function getMessagesByProperty(propertyId: string): DummyMessage[] {
  return getStoredMessages().filter(m => m.propertyId === propertyId);
}

export function getConversations(userId: string) {
  const messages = getStoredMessages();
  const conversations = new Map<string, DummyMessage[]>();
  
  messages.forEach(message => {
    if (message.senderId === userId || message.recipientId === userId) {
      if (!conversations.has(message.propertyId)) {
        conversations.set(message.propertyId, []);
      }
      conversations.get(message.propertyId)!.push(message);
    }
  });
  
  return Array.from(conversations.entries()).map(([propertyId, messages]) => ({
    propertyId,
    propertyTitle: messages[0].propertyTitle,
    messages: messages.sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  }));
}