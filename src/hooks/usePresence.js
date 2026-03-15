import { useEffect } from "react";
import { API_URL } from "../utils/utils";

export const usePresence = (email) => {
  useEffect(() => {
    if (!email) return;

    const syncPresence = async () => {
      try {
        await fetch(`${API_URL}/chat/sync-presence`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (error) {
        console.error("Failed to sync presence:", error);
      }
    };

    syncPresence();

    const interval = setInterval(syncPresence, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [email]);
};
