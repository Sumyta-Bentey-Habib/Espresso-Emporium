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

    
    
    
    
    try {
      
      
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
