import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { API_URL } from "../utils/utils";


export const useConversations = (email) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (!email) return;

    
    const fetchConversations = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/conversations/${email}`);
        if (res.ok) {
          const data = await res.json();
          setConversations(data);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();

    if (!socket) return;

    
    const handleNewMessage = (message) => {
      setConversations(prev => {
        const index = prev.findIndex(c => c.id === message.conversationId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            lastMessage: message.text,
            lastMessageAt: message.createdAt
          };
          
          const conv = updated.splice(index, 1)[0];
          return [conv, ...updated];
        }
        return prev;
      });
    };

    socket.on("receive_message", handleNewMessage);
    return () => socket.off("receive_message", handleNewMessage);
  }, [email, socket]);

  return { conversations, loading };
};


export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (!conversationId) return;

    
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/chat/history/${conversationId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    if (!socket) return;

    
    socket.emit("join_room", conversationId);

    
    const handleNewMessage = (message) => {
      if (message.conversationId === conversationId) {
        setMessages(prev => [...prev, message]);
      }
    };

    socket.on("receive_message", handleNewMessage);
    return () => socket.off("receive_message", handleNewMessage);
  }, [conversationId, socket]);

  return { messages, loading };
};
