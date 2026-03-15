import React from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const StartChatButton = ({ targetUser, className = "" }) => {
  const { user } = useAuth();

  const handleStartChat = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to chat with others.',
        confirmButtonColor: '#92400e',
      });
      return;
    }

    if (user.email === targetUser.email || user.uid === targetUser.uid) {
      Swal.fire({
        icon: 'info',
        title: 'Note',
        text: 'You cannot chat with yourself.',
        confirmButtonColor: '#92400e',
      });
      return;
    }

    // Optional: Send initial greeting or just open the chat
    // For now, we'll just trigger the chat overlay by a custom event 
    // or by letting the user know to check the chat bubble
    
    try {
      // Just check if conversation exists/create it with a ping if desired
      // But we'll keep it simple: just tell the user chat is active
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: `Say hello to ${targetUser.name}!`,
        text: 'Check the chat bubble below.',
      });
      
      // We could use a global state or custom event to open the chat bubble automatically
      window.dispatchEvent(new CustomEvent('openChat', { detail: { otherUser: targetUser } }));
      
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  return (
    <button
      onClick={handleStartChat}
      className={`flex items-center gap-2 bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 shadow-md ${className}`}
    >
      <MessageCircle size={18} />
      <span>Chat Now</span>
    </button>
  );
};

export default StartChatButton;
