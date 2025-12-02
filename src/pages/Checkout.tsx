import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "profissional";
  
  // URL do checkout externo a partir da variável de ambiente
  const checkoutUrl = import.meta.env.VITE_CHECKOUT_URL;

  useEffect(() => {
    if (checkoutUrl) {
      // Redireciona para o checkout externo, passando o plano como parâmetro se necessário
      const url = new URL(checkoutUrl);
      if (plan) {
        url.searchParams.set("plan", plan);
      }
      window.location.href = url.toString();
    } else {
      console.error("VITE_CHECKOUT_URL não está configurada");
    }
  }, [checkoutUrl, plan]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecionando para o checkout...</p>
      </div>
    </div>
  );
};

export default Checkout;
