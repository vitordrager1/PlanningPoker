import { useAuth } from "../../app/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  children: React.ReactNode;
}

const withAuth = (Component: React.ComponentType) => {
  return function AuthenticatedComponent(props: WithAuthProps) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        alert("Você precisa estar logado para acessar esta página.");
        router.push("/"); // Redireciona para a página de login
      }
    }, [user, router]);

    if (!user) return null; // Evita renderizar o componente antes da autenticação

    return <Component />;
  };
};

export default withAuth;
