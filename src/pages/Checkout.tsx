import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
// Correção: Uso de caminho relativo para garantir a resolução do módulo
import { useAuth } from "../contexts/AuthContext";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Acessamos o contexto para pegar o ID do usuário
  // O ID geralmente está em dashboardData.account.id conforme nossa API /dashboard
  const { dashboardData, isLoading, isAuthenticated } = useAuth();
  
  const plan = searchParams.get("plan") || "profissional";
  const checkoutUrl = "https://buy.stripe.com/";

  useEffect(() => {
    // 1. Se ainda está carregando os dados do usuário, aguarda.
    if (isLoading) return;

    // 2. Se não está autenticado, manda pro login
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // 3. Tenta recuperar o ID do usuário
    // A rota /dashboard que criamos retorna: account: { id, email, name }
    const userId = dashboardData?.account?.id;

    if (userId) {
      let productCode = "";

      // Definição dos códigos dos produtos (Links de Pagamento do Stripe)
      if (plan === "essencial") {
        productCode = "14A3cobt3gs32Cb4kgew802"; 
      } else {
        // Default para profissional
        productCode = "7sY5kw40BejV5On5okew801"; 
      }

      // 4. Monta a URL final com o ID do usuário
      // O 'client_reference_id' é o segredo para o Webhook funcionar
      const finalLink = `${checkoutUrl}${productCode}?client_reference_id=${userId}`;
      
      // 5. Redireciona
      window.location.href = finalLink;
    } else {
        // Se estiver autenticado mas sem dados (ex: refresh falhou), 
        // talvez seja bom tentar dar um refresh ou mandar pro dashboard
        console.warn("Aguardando identificação do usuário...");
    }

  }, [checkoutUrl, plan, userId, isLoading, isAuthenticated, navigate, dashboardData]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-semibold">Preparando seu checkout...</h2>
        <p className="text-muted-foreground text-sm max-w-md">
          Estamos conectando sua conta ao sistema de pagamento seguro do Stripe.
        </p>
      </div>
    </div>
  );
};

export default Checkout;