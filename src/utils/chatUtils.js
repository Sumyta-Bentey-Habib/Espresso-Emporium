import { API_URL } from "./utils";

/**
 * Generates a consistent conversation ID based on two emails.
 * Sorts them alphabetically to ensure the same ID is generated for both parties.
 */
export const getConversationId = (email1, email2) => {
  return [email1, email2].sort().join("_");
};

/**
 * Emits a message via socket. 
 * The persistence is handled on the backend upon receiving the 'send_message' event.
 */
export const sendMessageViaSocket = (socket, sender, receiver, text) => {
  if (!socket) return;

  const senderId = sender.email;
  const receiverId = receiver.uid || receiver.email; // Support both patterns
  const conversationId = getConversationId(senderId, receiverId);

  const messageData = {
    conversationId,
    senderId,
    receiverId,
    text,
    senderDetails: {
      name: sender.displayName || sender.name || "User",
      photo: sender.photoURL || sender.photo || "",
      role: sender.role || "user",
    },
    receiverDetails: {
      name: receiver.name || "User",
      photo: receiver.photo || "",
      role: receiver.role || "user",
    }
  };

  socket.emit("send_message", messageData);
};

/**
 * Marks messages as read via API.
 */
export const markAsRead = async (conversationId, email) => {
  try {
    await fetch(`${API_URL}/chat/mark-as-read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, email }),
    });
  } catch (error) {
    console.error("Failed to mark as read:", error);
  }
};
