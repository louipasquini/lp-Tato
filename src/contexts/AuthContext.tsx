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
    id: string; // <--- ADICIONADO: Campo essencial para o Checkout
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
  login: (token: string) => Promise<void>;
  logout: () => void;
  user: User | null;
  token: string | null;
  dashboardData: DashboardData | null;
  isLoading: boolean;
  refreshDashboard: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Inicia como true para evitar flash de conteúdo

  const refreshDashboard = useCallback(async () => {
    const currentToken = localStorage.getItem("tato_token");
    if (!currentToken) {
        setIsLoading(false);
        return;
    }

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
        
        if (data.account) {
            setUser({ 
                email: data.account.email, 
                name: data.account.name 
            });
        }
      } else {
        if (response.status === 401) {
            logout();
        }
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem("tato_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    await refreshDashboard();
  };

  const logout = () => {
    localStorage.removeItem("tato_token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setDashboardData(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("tato_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      refreshDashboard();
    } else {
      setIsLoading(false);
    }
  }, [refreshDashboard]);

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