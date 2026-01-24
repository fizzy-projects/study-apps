// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./supabase-client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [_,setRefreshToggle]=useState(false);
  const [hadithPassword,setHadithPassword]=useState("");

  useEffect(() => {
    // 1️⃣ Get current session on app load
    supabase.auth.getSession().then(({ data }) => {
      console.log("Initial get session. Session data below:");
      console.log(data);
      setUser(data.session?.user ?? null);
      console.log("setUser input below:");
      console.log(user);
      setLoading(false);
    });

    // 2️⃣ Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("authListener event. Session data:");
      console.log(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const {error:signOutError} = await supabase.auth.signOut();
    // user will update automatically from the listener
    if (signOutError){
      console.error(signOutError);
    }
    setRefreshToggle(prev => !prev)
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, signOut, hadithPassword, setHadithPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
