import React, { useState, useEffect, useRef } from "react";
import { Send, X, User, ChevronLeft, Trash2 } from "lucide-react";
import { sendMessageViaSocket, markAsRead } from "../../utils/chatUtils";
import { useMessages } from "../../hooks/useChat";
import { useSocket } from "../../context/SocketProvider";
import Swal from "sweetalert2";
import { API_URL } from "../../utils/utils";

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

  const handleDeleteChat = async () => {
    const result = await Swal.fire({
      title: 'Delete Conversation?',
      text: "This will permanently remove all messages in this chat history.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#78350f', // amber-800
      cancelButtonColor: '#ef4444', // red-500
      confirmButtonText: 'Yes, delete it!',
      background: '#fff',
      customClass: {
        title: 'font-bold text-amber-950',
        popup: 'rounded-3xl border-2 border-amber-100',
        confirmButton: 'rounded-xl px-6 py-3 font-bold uppercase tracking-widest text-xs',
        cancelButton: 'rounded-xl px-6 py-3 font-bold uppercase tracking-widest text-xs'
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/chat/conversation/${conversationId}`, {
          method: "DELETE"
        });
        
        if (res.ok) {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your conversation has been wiped clean.',
            icon: 'success',
            confirmButtonColor: '#78350f',
            timer: 2000
          });
          onClose(); // Go back to list
        } else {
          throw new Error("Failed to delete chat");
        }
      } catch (error) {
        console.error("Delete failed:", error);
        Swal.fire('Error', 'We couldn\'t delete this chat. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-xl overflow-hidden chat-container animate-in fade-in zoom-in-95 duration-300">
      {}
      <div className="chat-glass-dark p-4 flex items-center justify-between text-white shrink-0 z-10 shadow-lg">
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 mr-1 flex items-center gap-1 group"
            title="Back to Messages"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Back</span>
          </button>
          
          <div className="w-[1px] h-8 bg-white/10 mx-1 hidden md:block"></div>

          <div className="relative group ml-1">
            {otherUser.photo ? (
              <img src={otherUser.photo} alt={otherUser.name} className="w-11 h-11 rounded-2xl object-cover border-2 border-amber-400/30 group-hover:border-amber-400 transition-all duration-300 shadow-md" />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 flex items-center justify-center border-2 border-amber-400/30 shadow-md">
                <User size={22} className="text-amber-100" />
              </div>
            )}
            {otherUser.lastActive && (new Date() - new Date(otherUser.lastActive)) < 7 * 60 * 1000 && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-amber-900 rounded-full shadow-sm"></span>
            )}
          </div>
          <div className="flex flex-col ml-1">
            <h3 className="font-extrabold text-sm tracking-tight leading-none mb-1">{otherUser.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-200 uppercase tracking-widest px-1.5 py-0.5 bg-amber-800/50 rounded-md border border-amber-700/50">{otherUser.role}</span>
              {otherUser.lastActive && (
                <span className="text-[10px] font-medium text-amber-300/80">
                  {(new Date() - new Date(otherUser.lastActive)) < 7 * 60 * 1000
                    ? "• Online"
                    : `• Active ${new Date(otherUser.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleDeleteChat}
            className="p-2.5 text-amber-200/50 hover:text-red-400 hover:bg-white/10 rounded-xl transition-all duration-300 group"
            title="Delete Chat"
          >
            <Trash2 size={18} className="group-hover:scale-110" />
          </button>
        </div>
      </div>

      {}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 space-y-6 bg-amber-50/20 custom-scrollbar scroll-smooth"
      >
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin"></div>
            <p className="text-xs font-bold text-amber-900/40 uppercase tracking-widest">Grinding beans...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-10 opacity-40">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <User size={40} className="text-amber-900" />
            </div>
            <p className="text-sm font-bold text-amber-900 mb-1">No messages yet</p>
            <p className="text-xs text-amber-900/60 leading-relaxed">Start a fresh conversation with {otherUser.name}</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUser.email;
            const showAvatar = idx === 0 || messages[idx - 1].senderId !== msg.senderId;
            
            return (
              <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 animate-in slide-in-from-bottom-2 duration-300`}>
                {!isMe && (
                  <div className="w-6 h-6 shrink-0">
                    {showAvatar && (
                      <img src={otherUser.photo} alt="" className="w-6 h-6 rounded-lg object-cover" />
                    )}
                  </div>
                )}
                <div
                  className={`max-w-[75%] group relative ${
                    isMe
                      ? "bg-gradient-to-br from-amber-800 to-amber-950 text-white rounded-2xl rounded-br-none shadow-md shadow-amber-900/20"
                      : "bg-white text-amber-950 shadow-sm border border-amber-100 rounded-2xl rounded-bl-none"
                  } p-3.5`}
                >
                  <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMe ? "justify-end" : "justify-start"}`}>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${isMe ? "text-amber-200/60" : "text-amber-900/30"}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  {}
                  <span className={`text-[9px] absolute -bottom-4 ${isMe ? "right-0 text-amber-900/30" : "left-0 text-amber-900/30"} font-medium md:hidden group-hover:block`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>


      {}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-amber-900/5 mt-auto">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="w-full pl-4 pr-12 py-3 bg-amber-50/50 rounded-2xl border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 focus:bg-white transition-all text-sm placeholder:text-amber-900/30"
            />
            {inputText.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                <div className="h-4 w-[1px] bg-amber-100 mr-2"></div>
                <button
                  type="submit"
                  className="p-1.5 bg-amber-800 text-white rounded-xl hover:bg-amber-900 transition-all shadow-md shadow-amber-900/20 active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
            )}
          </div>
          {!inputText.trim() && (
            <button
              type="button"
              disabled
              className="p-3 bg-amber-50 text-amber-200 rounded-2xl border border-amber-100 transition-colors"
            >
              <Send size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
