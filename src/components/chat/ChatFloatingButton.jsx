import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { useAuth } from "../../context/AuthProvider";
import { useConversations } from "../../hooks/useChat";

const ChatFloatingButton = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const { conversations } = useConversations(user?.uid);
  
  useEffect(() => {
    const handleOpenChat = (e) => {
      const otherUser = e.detail.otherUser;
      setActiveChat(otherUser);
      setIsOpen(true);
    };

    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, []);

  const totalUnread = conversations.reduce((acc, conv) => {
    return acc + (conv.unreadCount?.[user?.uid] || 0);
  }, 0);

  if (!user) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <div className="relative">
        {}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isOpen ? "bg-amber-900 rotate-90" : "bg-amber-800 hover:bg-amber-900"
          } text-white`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          
          {!isOpen && totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
        </button>

        {}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[550px] max-h-[calc(100vh-120px)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
            {activeChat ? (
              <ChatBox 
                currentUser={user} 
                otherUser={activeChat} 
                onClose={() => setActiveChat(null)} 
              />
            ) : (
              <ChatList 
                currentUser={user} 
                onSelectConversation={setActiveChat} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatFloatingButton;
