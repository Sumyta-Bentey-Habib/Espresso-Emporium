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
  const [autoMessage, setAutoMessage] = useState("");
  const { conversations } = useConversations(user?.uid);
  
  useEffect(() => {
    const handleOpenChat = (e) => {
      const otherUser = e.detail.otherUser;
      const initialMessage = e.detail.autoMessage || "";
      setActiveChat(otherUser);
      setAutoMessage(initialMessage);
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
    <div className="fixed bottom-6 right-6 z-[100] chat-container">
      <div className="relative">
        {}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 ease-in-out transform hover:scale-110 flex items-center justify-center ${
            isOpen 
              ? "bg-amber-950 rotate-[360deg] shadow-amber-900/20" 
              : "bg-gradient-to-tr from-amber-800 to-amber-700 hover:shadow-amber-900/40"
          } text-white group`}
        >
          {isOpen ? (
            <X size={24} className="animate-in fade-in zoom-in duration-300" />
          ) : (
            <div className="relative">
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping opacity-75"></div>
            </div>
          )}
          
          {!isOpen && totalUnread > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce">
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          )}
        </button>

        {}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] md:w-[400px] h-[600px] max-h-[calc(100vh-140px)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 zoom-in-95 origin-bottom-right">
            <div className="h-full w-full rounded-2xl shadow-2xl overflow-hidden border border-amber-900/10 ring-1 ring-black/5">
              {activeChat ? (
                <ChatBox 
                  currentUser={user} 
                  otherUser={activeChat} 
                  onClose={() => setActiveChat(null)} 
                  autoMessage={autoMessage}
                  clearAutoMessage={() => setAutoMessage("")}
                />
              ) : (
                <ChatList 
                  currentUser={user} 
                  onSelectConversation={setActiveChat} 
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatFloatingButton;
