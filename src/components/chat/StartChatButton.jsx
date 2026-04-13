import React from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const StartChatButton = ({ targetUser, className = "", buttonText = "Chat Now", autoMessage = "" }) => {
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
      if (autoMessage) {
        const result = await Swal.fire({
          title: 'Say Hi?',
          text: `Send a quick greeting to ${targetUser.name}: "${autoMessage}"`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Send',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#92400e',
          background: 'rgba(255, 255, 255, 0.95)',
          customClass: {
            title: 'font-outfit font-black text-amber-950',
            popup: 'rounded-[2rem] p-8 shadow-2xl border border-amber-900/10'
          }
        });
        if (!result.isConfirmed) return;
      }

      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'success',
        title: `Say hello to ${targetUser.name}!`,
        text: autoMessage ? 'Your greeting is being sent...' : 'Check the chat bubble below.',
      });
      
      window.dispatchEvent(new CustomEvent('openChat', { 
        detail: { 
          otherUser: targetUser,
          autoMessage: autoMessage
        } 
      }));
      
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
      <span>{buttonText}</span>
    </button>
  );
};

export default StartChatButton;
