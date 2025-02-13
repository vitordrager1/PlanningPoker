"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  reload,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  signInAnonymous: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Finaliza o carregamento quando o estado do auth é resolvido
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const token = await result.user.getIdToken(); // Obtém o JWT do Firebase
      localStorage.setItem("token", token); // Armazena no navegador
      console.log("Token JWT salvo:", token);
      window.location.reload();
    }
  };

  const signInAnonymous = async () => {
    //const provider = new GoogleAuthProvider();
    const result = await signInAnonymously(auth);

    if (result.user) {
      const token = await result.user.getIdToken(); // Obtém o JWT do Firebase
      localStorage.setItem("token", token); // Armazena no navegador
      console.log("Token JWT salvo:", token);
      window.location.reload();
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth); // Faz logout no Firebase
      localStorage.removeItem("token"); // Remove o token do localStorage
      window.location.reload(); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, logOut, signInAnonymous }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
