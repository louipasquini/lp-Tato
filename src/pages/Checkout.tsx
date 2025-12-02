import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext"; // Caminho relativo

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dashboardData, isLoading, isAuthenticated, refreshDashboard } = useAuth();
  const [error, setError] = useState("");
  
  const plan = searchParams.get("plan") || "profissional";
  const checkoutUrl = "https://buy.stripe.com/";

  useEffect(() => {
    // 1. Se ainda está carregando, aguarda
    if (isLoading) return;

    // 2. Se não está autenticado, redireciona
    if (!isAuthenticated) {
      sessionStorage.setItem("redirect_after_login", `/checkout?plan=${plan}`);
      navigate("/login");
      return;
    }

    // 3. Se autenticado mas sem dados, tenta buscar novamente
    if (!dashboardData) {
        refreshDashboard();
        return;
    }

    // 4. Se temos os dados, prossegue para o redirecionamento
    const userId = dashboardData.account?.id;

    if (userId) {
      let productCode = "";

      // Defina aqui seus códigos de produto REAIS do Stripe
      if (plan === "essencial") {
        productCode = "14A3cobt3gs32Cb4kgew802"; 
      } else {
        productCode = "7sY5kw40BejV5On5okew801"; // Profissional
      }

      // Monta URL com ID do usuário para o Webhook identificar
      const finalLink = `${checkoutUrl}${productCode}?client_reference_id=${userId}`;
      
      // Redireciona
      window.location.href = finalLink;
    } else {
        setError("Não foi possível identificar sua conta. Tente fazer login novamente.");
    }

  }, [plan, dashboardData, isLoading, isAuthenticated, navigate, refreshDashboard]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md mx-auto">
        
        {error ? (
            <div className="flex flex-col items-center gap-4">
                <AlertCircle className="h-10 w-10 text-destructive" />
                <p className="text-destructive font-medium">{error}</p>
                <button 
                    onClick={() => navigate("/login")}
                    className="text-primary hover:underline"
                >
                    Voltar para Login
                </button>
            </div>
        ) : (
            <>
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                <h2 className="text-xl font-semibold">Preparando seu pagamento...</h2>
                <p className="text-muted-foreground text-sm">
                  Você será redirecionado para o ambiente seguro do Stripe em instantes.
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                    Plano selecionado: <span className="font-bold capitalize">{plan}</span>
                </p>
            </>
        )}
      </div>
    </div>
  );
};

export default Checkout;