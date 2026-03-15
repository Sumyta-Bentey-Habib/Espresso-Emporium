import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";
import { API_URL } from "../utils/utils";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user?.email) {
      
      const newSocket = io(API_URL.replace("/api", ""), {
        query: { email: user.email }
      });

      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user?.email]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
