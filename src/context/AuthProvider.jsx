import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  onAuthStateChanged, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend (MongoDB)
  const fetchUserFromDB = async (uid, email) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${uid}`); 
      if (!res.ok) {
        // fallback: try email
        const res2 = await fetch(`http://localhost:3000/users/${email}`);
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
        setUser({ ...currentUser, ...dbUser }); // merge Firebase + DB
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

    // fetch DB user after Google login
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

export const useAuth = () => useContext(AuthContext);
