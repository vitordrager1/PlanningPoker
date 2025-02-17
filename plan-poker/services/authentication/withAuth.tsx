import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  children: React.ReactNode;
}

const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: WithAuthProps) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);

        if (!storedToken) {
          console.log("Token não encontrado, redirecionando...");
          alert("Você precisa estar logado para acessar esta página.");
          router.push("/"); // Redireciona para a página de login
        }
      }
    }, [router]); // 🚀 Agora rodamos apenas uma vez, sem depender de "token"

    if (!token) return null; // Evita renderizar o componente antes da autenticação

    // return <Component {...props} />;
    return <Component />;
  };
};

export default withAuth;
