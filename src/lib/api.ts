// Configuração centralizada da API
// Suporta tanto VITE_API_URL quanto VITE_API_BASE_URL para compatibilidade com Vercel
// VITE_API_URL pode ser a URL completa (com /tato/v2/auth) ou apenas a base
// VITE_API_BASE_URL é sempre apenas a base (sem caminho)
const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const defaultBase = "https://tatodb.vercel.app";
  
  // Se VITE_API_URL está definida e contém o caminho completo, usa ela diretamente
  if (apiUrl && apiUrl.includes('/tato/v2')) {
    // Remove o caminho para obter apenas a base
    try {
      const url = new URL(apiUrl);
      return url.origin;
    } catch {
      // Se não for uma URL válida, assume que é apenas a base
      return apiUrl.replace(/\/tato\/v2.*$/, '') || defaultBase;
    }
  }
  
  // Se VITE_API_URL é apenas a base (sem caminho), usa ela
  if (apiUrl && !apiUrl.includes('/tato/v2')) {
    return apiUrl;
  }
  
  // Usa VITE_API_BASE_URL se disponível
  if (apiBaseUrl) {
    return apiBaseUrl;
  }
  
  // Fallback para default
  return defaultBase;
};

const API_BASE_URL = getApiBaseUrl();

// Log para debug em desenvolvimento
if (import.meta.env.DEV) {
  console.log("API Base URL:", API_BASE_URL);
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
}

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

// Log dos endpoints em desenvolvimento
if (import.meta.env.DEV) {
  console.log("API Endpoints:", API_ENDPOINTS);
}

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



