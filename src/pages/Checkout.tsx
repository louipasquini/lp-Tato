import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "profissional";
  const checkoutUrl = "https://buy.stripe.com/";

  useEffect(() => {
    if (checkoutUrl) {
      if (plan=="essencial") {
        let productCode = "14A3cobt3gs32Cb4kgew802";
        window.location.href = checkoutUrl + productCode;
      } else if (plan=="profissional") {
        let productCode = "7sY5kw40BejV5On5okew801";
        window.location.href = checkoutUrl + productCode;
      }
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
