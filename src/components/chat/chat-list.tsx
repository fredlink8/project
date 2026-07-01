import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatWindow } from './chat-window';
import { useConversations } from '../../hooks/use-messages';

export function ChatList() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { conversations, loading, error } = useConversations();

  if (loading) {
    return <div className="p-4 text-center">Loading conversations...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error.message}</div>;
  }

  // Group conversations by property
  const groupedConversations = conversations.reduce((acc, message) => {
    if (!acc[message.property_id]) {
      acc[message.property_id] = {
        property: message.properties,
        messages: []
      };
    }
    acc[message.property_id].messages.push(message);
    return acc;
  }, {});

  return (
    <div className="h-full flex">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="overflow-y-auto">
          {Object.entries(groupedConversations).map(([propertyId, data]) => {
            const lastMessage = data.messages[data.messages.length - 1];
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
                    <p className="font-medium">{data.property.title}</p>
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
          <ChatWindow 
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