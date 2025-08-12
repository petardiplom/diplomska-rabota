import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/apiHooks/useUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  const { data: dbUser, isLoading, isError } = useCurrentUser(user);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    queryClient.clear();
  };

  const allLoading = authLoading || isLoading;

  return (
    <AuthContext.Provider
      value={{ user, dbUser, logout, authLoading: allLoading, error: isError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
