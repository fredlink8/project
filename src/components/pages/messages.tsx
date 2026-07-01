import { DummyChatList } from '../chat/dummy-chat-list';

export function MessagesPage() {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <DummyChatList />
    </div>
  );
}