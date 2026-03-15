import { useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { API_URL } from "../utils/utils";

/**
 * Hook to listen for all conversations involving the current user.
 */
export const useConversations = (email) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (!email) return;

    // Fetch initial conversations from backend
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

    // Listen for real-time updates (e.g., new messages in any conversation)
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
          // Move to top
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

/**
 * Hook to listen for messages in a specific conversation.
 */
export const useMessages = (conversationId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  useEffect(() => {
    if (!conversationId) return;

    // Fetch message history from backend
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

    // Join room for real-time messages
    socket.emit("join_room", conversationId);

    // Listen for new messages
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
