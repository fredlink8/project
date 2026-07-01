import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { DummyChatWindow } from './dummy-chat-window';
import { useUserStore, getCurrentUser } from '../../lib/store/user-store';

interface ChatButtonProps {
  propertyId: string;
}

export function ChatButton({ propertyId }: ChatButtonProps) {
  const [showChat, setShowChat] = useState(false);
  const currentRole = useUserStore((state) => state.currentRole);

  // Don't show chat button if user is the host
  if (currentRole === 'host') return null;

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => setShowChat(true)}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Message Host
      </Button>

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg h-[600px]">
            <DummyChatWindow
              propertyId={propertyId}
              onClose={() => setShowChat(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}