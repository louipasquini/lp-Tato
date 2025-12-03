import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Sparkles, User, Loader2, AlertCircle } from "lucide-react";
// Importação corrigida para caminho relativo
import { useAuth } from "../contexts/AuthContext";
import { API_ENDPOINTS } from "@/lib/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Função simples para gerar um fingerprint sem bibliotecas externas
const getSimpleFingerprint = async () => {
  const str = [
    navigator.userAgent,
    navigator.language,
    window.screen.width,
    window.screen.height,
    new Date().getTimezoneOffset()
  ].join('|');

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "fp_" + Math.abs(hash).toString(16);
};

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login: authLogin } = useAuth();

  // Pega o plano da URL se existir
  const planParam = searchParams.get("plan");

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para armazenar o ID do dispositivo
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const result = await getSimpleFingerprint();
        setFingerprint(result);
        setFingerprint(result);
      } catch (e) {
        console.error("Falha ao gerar fingerprint", e);
      }
    };
    loadFingerprint();
  }, []);

  const handleAuthSuccess = async (token: string, warning?: string) => {
    if (keepSignedIn) {
      localStorage.setItem("tato_token", token);
    } else {
      sessionStorage.setItem("tato_token", token);
    }

    // Se a API retornou um aviso (ex: abuso de trial), mostramos um alerta antes de redirecionar
    if (warning) {
      alert(warning);
    }

    if (authLogin) {
      await authLogin(token);
    } else {
      if (keepSignedIn) {
        localStorage.setItem("tato_token", token);
      } else {
        sessionStorage.setItem("tato_token", token);
      }
    }

    // Se há um plano na URL, redireciona para checkout, senão vai para dashboard
    if (planParam) {
      navigate(`/checkout?plan=${planParam}`);
    } else {
      navigate("/dashboard");
    }
  };

  // Inicializa o Google Sign-In
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error("VITE_GOOGLE_CLIENT_ID não está configurada");
      setError("Configuração do Google Sign-In não encontrada. Por favor, recarregue a página.");
      return;
    }

    /* global google */
    // @ts-ignore
    const initializeGoogle = () => {
      // @ts-ignore
      if (!window.google || !window.google.accounts) {
        console.warn("Google Sign-In script ainda não carregou completamente");
        // Tenta novamente após um delay
        setTimeout(() => {
          // @ts-ignore
          if (window.google && window.google.accounts) {
            initializeGoogle();
          }
        }, 500);
        return;
      }

      const googleBtn = document.getElementById("googleBtn");
      if (!googleBtn) {
        console.warn("Elemento googleBtn não encontrado, tentando novamente...");
        // Tenta novamente após o componente renderizar
        setTimeout(initializeGoogle, 200);
        return;
      }

      try {
        // Limpa o elemento antes de renderizar novamente
        googleBtn.innerHTML = '';

        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        // @ts-ignore
        window.google.accounts.id.renderButton(googleBtn, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: isLogin ? "signin_with" : "signup_with",
          width: "400"
        });
      } catch (e) {
        console.error("Erro ao inicializar botão Google:", e);
        setError("Erro ao carregar botão do Google. Por favor, recarregue a página.");
      }
    };

    // @ts-ignore
    if (typeof window !== 'undefined' && window.google && window.google.accounts) {
      // Google já está carregado
      setTimeout(initializeGoogle, 100);
    } else {
      // Verifica se o script já existe
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        // Script já existe, aguarda carregar
        existingScript.addEventListener('load', () => {
          setTimeout(initializeGoogle, 100);
        });
        // @ts-ignore
        if (window.google) {
          setTimeout(initializeGoogle, 100);
        }
      } else {
        // Carrega o script do Google
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          // Aguarda um pouco para garantir que o Google está totalmente inicializado
          setTimeout(initializeGoogle, 200);
        };
        script.onerror = () => {
          console.error("Erro ao carregar script do Google Sign-In");
          setError("Não foi possível carregar o Google Sign-In. Verifique sua conexão.");
        };
        document.head.appendChild(script);
      }
    }

    // Cleanup
    return () => {
      const googleBtn = document.getElementById("googleBtn");
      if (googleBtn) {
        googleBtn.innerHTML = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // @ts-ignore
  const handleGoogleCallback = async (response) => {
    setIsLoading(true);
    setError("");
    try {
      const googleEndpoint = API_ENDPOINTS.AUTH.GOOGLE;

      const res = await fetch(googleEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          googleToken: response.credential,
          fingerprint: fingerprint
        })
      });



      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          console.error("❌ Endpoint não encontrado (404):", googleEndpoint);
          throw new Error("Endpoint da API não encontrado. Verifique a configuração da URL da API.");
        }
        if (res.status === 401) throw new Error("Acesso negado pelo Google.");
        throw new Error(data.error || "Falha no login com Google");
      }

      // Passa o token e o possível warning (caso o trial tenha sido removido)
      handleAuthSuccess(data.token, data.warning);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const endpoint = isLogin ? API_ENDPOINTS.AUTH.LOGIN : API_ENDPOINTS.AUTH.REGISTER;
      const payload = isLogin
        ? { email, password }
        : { email, password, name, fingerprint: fingerprint };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocorreu um erro ao conectar.");
      }

      if (data.token) {
        handleAuthSuccess(data.token, data.warning);
      } else if (!isLogin) {
        // Fallback para login automático após registro sem token direto
        const loginRes = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        if (loginData.token) {
          handleAuthSuccess(loginData.token, data.warning);
        } else {
          setIsLogin(true);
          // @ts-ignore
          alert("Conta criada! Faça login.");
        }
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src="/icon.png" alt="Tato logo" className="w-8 h-8 object-contain" />
            TATO
          </Link>
          <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-4 flex items-center justify-center min-h-screen">
        <div className="container mx-auto max-w-md">
          <div className="glass-card p-8 rounded-[--radius] border-primary/30 shadow-lg">

            {/* Header */}
            <div className="text-center mb-8">
              {!isLogin && (
                <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium animate-pulse">
                  🎁 7 dias grátis inclusos
                </div>
              )}
              <h1 className="text-3xl font-bold mb-2">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Entre para acessar seu dashboard"
                  : "Teste grátis e melhore sua comunicação"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Google Button */}
            <div className="relative w-full mb-6 group">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full border-border bg-background transition-all duration-300 pointer-events-none group-hover:scale-[1.02] group-hover:shadow-md group-hover:border-primary/50 group-hover:bg-muted/50"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar com Google
              </Button>
              <div
                id="googleBtn"
                className="absolute inset-0 opacity-0 z-10 overflow-hidden cursor-pointer"
                style={{ transform: 'scale(1.05)' }}
              />
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou continue com email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-background/50 border-border focus:border-primary"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/50 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background/50 border-border focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keepSignedIn"
                    checked={keepSignedIn}
                    onCheckedChange={(checked) => setKeepSignedIn(checked as boolean)}
                  />
                  <label
                    htmlFor="keepSignedIn"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                  >
                    Manter-me conectado
                  </label>
                </div>
              )}


              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs text-primary hover:underline">
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:scale-105"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5" />
                )}
                {isLogin ? "ENTRAR" : "CRIAR CONTA GRÁTIS"}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                {isLogin ? "Ainda não tem conta?" : "Já tem uma conta?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError("");
                  }}
                  className="ml-2 text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Criar conta" : "Entrar"}
                </button>
              </p>
            </div>
            {!isLogin && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Ao criar sua conta, você terá acesso a:
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span> 7 dias grátis
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span> Todos os modos
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span> Sem compromisso
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">✓</span> Cancele fácil
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            Ao continuar, você concorda com nossa{" "}
            <Link to="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;