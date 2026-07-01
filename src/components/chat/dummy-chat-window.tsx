import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { formatDistanceToNow } from 'date-fns';
import { getCurrentUser, getPropertyHost } from '../../lib/store/user-store';
import { useDummyMessages } from '../../hooks/use-dummy-messages';

interface DummyChatWindowProps {
  propertyId: string;
  onClose: () => void;
}

export function DummyChatWindow({ propertyId, onClose }: DummyChatWindowProps) {
  const { messages, sendMessage } = useDummyMessages(propertyId);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = getCurrentUser();
  const host = getPropertyHost();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await sendMessage({
      propertyId,
      propertyTitle: messages[0]?.propertyTitle || 'Property',
      senderId: currentUser.id,
      senderName: currentUser.name,
      recipientId: host.id,
      recipientName: host.name,
      content: newMessage.trim()
    });
    
    setNewMessage('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat with {host.name}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.senderId === currentUser.id ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.senderId === currentUser.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p className="text-sm font-medium mb-1">
                {message.senderId === currentUser.id ? 'You' : message.senderName}
              </p>
              <p>{message.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}