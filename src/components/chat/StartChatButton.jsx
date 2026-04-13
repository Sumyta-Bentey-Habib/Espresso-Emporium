import React from "react";
import { MessageCircle } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import Button from "../ui/Button";

const StartChatButton = ({ targetUser, className = "", buttonText = "Chat Now", autoMessage = "" }) => {
  const { user } = useAuth();

  const handleStartChat = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to chat with others.',
        confirmButtonColor: '#451a03',
        customClass: {
          popup: 'rounded-[2rem] border-amber-900/10'
        }
      });
      return;
    }

    if (user.email === targetUser.email || user.uid === targetUser.uid) {
      Swal.fire({
        icon: 'info',
        title: 'Note',
        text: 'You cannot chat with yourself.',
        confirmButtonColor: '#451a03',
        customClass: {
          popup: 'rounded-[2rem] border-amber-900/10'
        }
      });
      return;
    }

    try {
      if (autoMessage) {
        const result = await Swal.fire({
          title: 'Say Hi?',
          text: `Send a quick greeting to ${targetUser.name || 'Artisan'}: "${autoMessage}"`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Send Greeting',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#451a03',
          background: 'rgba(255, 255, 255, 0.98)',
          customClass: {
            title: 'font-outfit font-black text-amber-950',
            popup: 'rounded-[2.5rem] p-10 shadow-2xl border border-amber-900/10'
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
        title: `Connecting with ${targetUser.name || 'Artisan'}!`,
        text: autoMessage ? 'Your greeting is being sent...' : 'Check the chat bubble below.',
        background: '#451a03',
        color: '#fff',
        iconColor: '#fbbf24'
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
    <Button
      onClick={handleStartChat}
      variant="primary"
      icon={MessageCircle}
      className={className}
    >
      {buttonText}
    </Button>
  );
};

export default StartChatButton;
