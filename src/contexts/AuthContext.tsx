import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

// URL Base da API
const API_BASE = "https://tatodb.vercel.app/tato/v2";

// Tipagem dos dados que vêm da API do Dashboard
interface DashboardData {
  subscription: {
    planName: string;
    status: string;
    value: string;
    nextBillingDate: string;
  };
  usage: {
    used: number;
    limit: number;
    percentage: number;
  };
  account: {
    email: string;
    name: string | null;
  };
}

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: User | null;
  token: string | null;
  // Novos campos para o Dashboard
  dashboardData: DashboardData | null;
  isLoading: boolean;
  refreshDashboard: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Estado para dados do Dashboard
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar dados atualizados do servidor
  const refreshDashboard = useCallback(async () => {
    const currentToken = localStorage.getItem("tato_token");
    if (!currentToken) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/user/dashboard`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        
        // Atualiza info básica do usuário também
        if (data.account) {
            setUser({ 
                email: data.account.email, 
                name: data.account.name 
            });
        }
      } else {
        console.error("Erro ao buscar dashboard:", response.status);
        if (response.status === 401) {
            logout(); // Token expirou
        }
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("tato_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    // Ao logar, já tentamos buscar os dados do usuário
    setTimeout(refreshDashboard, 100); 
  };

  const logout = () => {
    localStorage.removeItem("tato_token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setDashboardData(null);
  };

  // Verifica token ao carregar a página
  useEffect(() => {
    const storedToken = localStorage.getItem("tato_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // Opcional: buscar dados ao recarregar a página
      // refreshDashboard(); 
    }
  }, []); // Removemos refreshDashboard da dependência para evitar loop se não usar useCallback corretamente fora

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated, 
        login, 
        logout, 
        user, 
        token,
        dashboardData,
        isLoading,
        refreshDashboard
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};