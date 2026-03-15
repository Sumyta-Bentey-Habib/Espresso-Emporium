import React, { useState, useEffect, useContext } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { API_URL } from "../utils/utils";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUserFromDB = async (uid, email) => {
    try {
      const res = await fetch(`${API_URL}/users/${uid}`); 
      if (!res.ok) {
        
        const res2 = await fetch(`${API_URL}/users/${email}`);
        if (!res2.ok) return null;
        return await res2.json();
      }
      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const dbUser = await fetchUserFromDB(currentUser.uid, currentUser.email);
        setUser({ ...currentUser, ...dbUser }); 
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logOut = () => signOut(auth);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    
    const dbUser = await fetchUserFromDB(result.user.uid, result.user.email);
    setUser({ ...result.user, ...dbUser });

    return result;
  };

  return (
    <AuthContext.Provider value={{ user, logOut, googleLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
