// Configuração centralizada da API
// Suporta tanto VITE_API_URL quanto VITE_API_BASE_URL para compatibilidade com Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "https://tatodb.vercel.app";

// Endpoints da API
export const API_ENDPOINTS = {
  AUTH: {
    BASE: `${API_BASE_URL}/tato/v2/auth`,
    LOGIN: `${API_BASE_URL}/tato/v2/auth/login`,
    REGISTER: `${API_BASE_URL}/tato/v2/auth/register`,
    GOOGLE: `${API_BASE_URL}/tato/v2/auth/google`,
  },
  USER: {
    DASHBOARD: `${API_BASE_URL}/tato/v2/user/dashboard`,
    DELETE: `${API_BASE_URL}/tato/v2/user/delete`,
  },
};

// Função auxiliar para fazer requisições autenticadas
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("tato_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(error.error || `Erro na requisição: ${response.status}`);
  }

  // Para DELETE, pode não ter corpo de resposta
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return null;
};

// Função para buscar dados do dashboard
export const fetchDashboardData = async () => {
  return fetchWithAuth(API_ENDPOINTS.USER.DASHBOARD);
};

// Função para deletar conta
export const deleteAccount = async () => {
  return fetchWithAuth(API_ENDPOINTS.USER.DELETE, {
    method: "DELETE",
  });
};



