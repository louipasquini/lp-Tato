// Helper para evitar erros em ambientes onde import.meta.env pode ser undefined
const getEnv = () => {
  try {
    // @ts-ignore
    return import.meta.env || {};
  } catch {
    return {};
  }
};

const getApiBaseUrl = () => {
  const env = getEnv();
  const apiUrl = env.VITE_API_URL;
  const apiBaseUrl = env.VITE_API_BASE_URL;
  const defaultBase = "https://tatodb.vercel.app";
  
  // Se VITE_API_URL está definida e contém o caminho completo
  if (apiUrl && apiUrl.includes('/tato/v2')) {
    try {
      const url = new URL(apiUrl);
      return url.origin;
    } catch {
      return apiUrl.replace(/\/tato\/v2.*$/, '') || defaultBase;
    }
  }
  
  // Se VITE_API_URL é apenas a base
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
  PAYMENT: {
    PORTAL: `${API_BASE_URL}/tato/v2/payment/customer-portal`,
  }
};

// Função auxiliar para fazer requisições autenticadas
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("tato_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  } as HeadersInit;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Erro desconhecido" }));
    throw new Error(error.error || `Erro na requisição: ${response.status}`);
  }

  // Para DELETE ou respostas vazias
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return true;
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