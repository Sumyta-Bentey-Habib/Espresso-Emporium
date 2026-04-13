import { API_URL } from "./utils";


export const getConversationId = (email1, email2) => {
  return [email1, email2].sort().join("_");
};


export const sendMessageViaSocket = (socket, sender, receiver, text) => {
  if (!socket) return;

  const senderId = sender.email;
  const receiverId = receiver.email || receiver.uid; 
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
