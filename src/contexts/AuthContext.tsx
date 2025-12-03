import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { fetchDashboardData } from "../lib/api";

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
    id: string;
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
  const [isLoading, setIsLoading] = useState(true);

  const refreshDashboard = useCallback(async () => {
    const currentToken = localStorage.getItem("tato_token") || sessionStorage.getItem("tato_token");
    if (!currentToken) {
      setIsLoading(false);
      return;
    }

    // Apenas define loading se não tiver dados ainda, para evitar "piscar" em atualizações
    if (!dashboardData) setIsLoading(true);

    try {
      const data = await fetchDashboardData();
      setDashboardData(data);

      if (data.account) {
        setUser({
          email: data.account.email,
          name: data.account.name
        });
      }
    } catch (error: any) {
      console.error("Erro ao buscar dashboard:", error);
      if (error.message && (error.message.includes('401') || error.message.includes('403'))) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (newToken: string) => {
    // Se não estiver em nenhum storage (ex: chamada direta), salva no local por padrão
    if (!localStorage.getItem("tato_token") && !sessionStorage.getItem("tato_token")) {
      localStorage.setItem("tato_token", newToken);
    }
    setToken(newToken);
    setIsAuthenticated(true);
    await refreshDashboard();
  };

  const logout = () => {
    localStorage.removeItem("tato_token");
    sessionStorage.removeItem("tato_token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
    setDashboardData(null);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("tato_token") || sessionStorage.getItem("tato_token");
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