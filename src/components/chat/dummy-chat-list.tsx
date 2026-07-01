import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { DummyChatWindow } from './dummy-chat-window';
import { useDummyConversations } from '../../hooks/use-dummy-messages';
import { getCurrentUser } from '../../lib/store/user-store';

export function DummyChatList() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const currentUser = getCurrentUser();
  const conversations = useDummyConversations(currentUser.id);

  return (
    <div className="h-full flex">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
          <p className="text-sm text-gray-600">Logged in as: {currentUser.name}</p>
        </div>
        <div className="overflow-y-auto">
          {conversations.map(({ propertyId, propertyTitle, messages }) => {
            const lastMessage = messages[messages.length - 1];
            return (
              <button
                key={propertyId}
                onClick={() => setSelectedChat(propertyId)}
                className={`w-full p-4 text-left hover:bg-gray-50 border-b ${
                  selectedChat === propertyId ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{propertyTitle}</p>
                    <p className="text-sm text-gray-600">
                      {lastMessage.content.substring(0, 50)}
                      {lastMessage.content.length > 50 ? '...' : ''}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="flex-1">
        {selectedChat ? (
          <DummyChatWindow 
            propertyId={selectedChat}
            onClose={() => setSelectedChat(null)}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </div>
  );
}