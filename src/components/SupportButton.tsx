import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { useLocation } from "react-router-dom";

const SupportButton = () => {
    const location = useLocation();
    const whatsappNumber = "5513988540316";
    const message = encodeURIComponent("Olá! Preciso de ajuda com o TATO.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

    if (location.pathname === '/presentation') return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        asChild
                        size="icon"
                        className="h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#128C7E] text-white border-none transition-all duration-300 hover:scale-110"
                    >
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Falar com suporte no WhatsApp"
                        >
                            <MessageCircle className="h-10 w-10" />
                        </a>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-card text-foreground border-border">
                    <p>Preciso de ajuda?</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
};

export default SupportButton;
