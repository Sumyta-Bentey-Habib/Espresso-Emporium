import React, { useState, useEffect, useRef } from "react";
import { Send, X, User } from "lucide-react";
import { sendMessageViaSocket, markAsRead } from "../../utils/chatUtils";
import { useMessages } from "../../hooks/useChat";
import { useSocket } from "../../context/SocketProvider";

const ChatBox = ({ currentUser, otherUser, onClose }) => {
  const [inputText, setInputText] = useState("");
  const socket = useSocket();
  
  const conversationId = [currentUser.email, otherUser.uid || otherUser.email].sort().join("_");
  const { messages, loading } = useMessages(conversationId);
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  
    if (messages.length > 0) {
      markAsRead(conversationId, currentUser.email);
    }
  }, [messages, conversationId, currentUser.email]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessageViaSocket(socket, currentUser, otherUser, inputText);
    setInputText("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl overflow-hidden border border-amber-200">
      {}
      <div className="bg-amber-800 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            {otherUser.photo ? (
              <img src={otherUser.photo} alt={otherUser.name} className="w-10 h-10 rounded-full object-cover border-2 border-amber-400" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center border-2 border-amber-400">
                <User size={20} />
              </div>
            )}
            {otherUser.lastActive && (new Date() - new Date(otherUser.lastActive)) < 7 * 60 * 1000 && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-amber-800 rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">{otherUser.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-200 capitalize">{otherUser.role}</span>
              {otherUser.lastActive && (
                <>
                  <span className="text-[10px] text-amber-400/50">•</span>
                  <span className="text-[10px] text-amber-400 font-medium">
                    {(new Date() - new Date(otherUser.lastActive)) < 7 * 60 * 1000
                      ? "Online Now"
                      : `Active ${new Date(otherUser.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-amber-700 p-1 rounded-full transition-colors">
          <X size={20} />
        </button>
      </div>

      {}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/30 custom-scrollbar"
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner text-amber-800"></span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-amber-900/40">
            <User size={48} className="mb-2 opacity-20" />
            <p className="text-sm">Start a conversation with {otherUser.name}</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === currentUser.email;
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    isMe
                      ? "bg-amber-800 text-white rounded-br-none"
                      : "bg-white text-amber-950 shadow-sm border border-amber-100 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${isMe ? "text-amber-200" : "text-amber-900/40"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>


      <form onSubmit={handleSend} className="p-4 border-t border-amber-100 bg-white">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="w-full pl-4 pr-12 py-3 bg-amber-50 rounded-full border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition-colors disabled:bg-amber-200"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
