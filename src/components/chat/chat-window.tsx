import { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../hooks/use-auth';
import { sendMessage } from '../../lib/api/messages';

interface ChatWindowProps {
  propertyId: string;
  hostId: string;
  onClose: () => void;
}

export function ChatWindow({ propertyId, hostId, onClose }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await sendMessage({
        propertyId,
        content: newMessage.trim()
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* ... rest of the component ... */}
    </div>
  );
}