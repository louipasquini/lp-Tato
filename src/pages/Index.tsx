import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Lightbulb, Check, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold icondisplay flex items-center gap-2">
            <img src="/icon.png" alt="Tato logo" className="w-8 h-8 object-contain" />
            TATO
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary">
              Instalar no Chrome
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 text-destructive text-sm font-medium animate-fade-in">
            🔴 Evite um crime contra sua própria reputação.
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in animation-delay-200">
            Você digita. O Tato refina.{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              O mundo entende.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-400">
            Sua inteligência social artificial para o WhatsApp Web. O Tato analisa o tom das suas mensagens em tempo real e garante que você nunca mais seja mal interpretado.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in animation-delay-600">
          <Button
  size="lg"
  onClick={() => {
    document.querySelector("#free-test")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  }}
  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:scale-105"
>
  <Sparkles className="mr-2 h-5 w-5" />
  TESTAR TATO GRÁTIS
</Button>
            <span className="text-sm text-muted-foreground">7 dias de acesso total</span>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground animate-fade-in animation-delay-600">
            <span className="flex items-center gap-2">🔒 Privacidade Blindada</span>
            <span className="flex items-center gap-2">⚡ Instalação em 2 cliques</span>
            <span className="flex items-center gap-2">🇧🇷 Feito na PunkLab</span>
          </div>
        </div>
      </section>

      {/* Seção A Dor */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              "Eu não quis dizer isso..."
            </h2>
            <p className="text-xl text-muted-foreground">A frase mais triste da internet.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-[--radius] hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">😬</div>
              <h3 className="text-xl font-semibold mb-2">O Grosso sem querer</h3>
              <p className="text-muted-foreground">Foi direto demais e pareceu rude.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[--radius] hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">😅</div>
              <h3 className="text-xl font-semibold mb-2">O Vendedor "Mole"</h3>
              <p className="text-muted-foreground">Foi educado demais e perdeu a venda.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[--radius] hover:border-primary/50 transition-all">
              <div className="text-3xl mb-4">🤯</div>
              <h3 className="text-xl font-semibold mb-2">Bloqueio Criativo</h3>
              <p className="text-muted-foreground">Travou na hora de responder uma mensagem difícil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Os Modos */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Escolha sua <span className="text-primary">máscara ideal.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8 rounded-[--radius] border-primary/70 glow-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs font-semibold text-center">
                O favorito dos usuários
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Modo DIPLOMATA</h3>
              <p className="text-muted-foreground">Transforma grosseria em educação. Ideal para conflitos e chefes.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[--radius] hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Modo FECHADOR</h3>
              <p className="text-muted-foreground">Usa gatilhos mentais e Spin Selling. Ideal para SDRs e Vendas.</p>
            </div>
            
            <div className="glass-card p-8 rounded-[--radius] hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Modo CLAREZA</h3>
              <p className="text-muted-foreground">Remove ironias e metáforas. Ideal para comunicação técnica e direta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Como funciona?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instale a extensão</h3>
              <p className="text-muted-foreground">2 cliques no Chrome e pronto. Funciona direto no WhatsApp Web.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Digite naturalmente</h3>
              <p className="text-muted-foreground">Escreva como sempre faz. O Tato analisa em tempo real o tom da sua mensagem.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Refine e envie</h3>
              <p className="text-muted-foreground">Escolha o modo ideal e envie a mensagem perfeita. Sem mal-entendidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 7 Dias Grátis */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/5 to-background" id="free-test">
  <div className="container mx-auto max-w-4xl">
    <div className="glass-card p-8 rounded-[--radius] border-primary/50 glow-primary text-center overflow-hidden">
            <div className="inline-block mb-6 px-6 py-3 rounded-full bg-primary/20 border border-primary/50 text-primary text-lg font-bold">
              🎁 OFERTA ESPECIAL
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-primary">7 dias</span> para testar tudo
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Teste todos os modos, envie mensagens ilimitadas e descubra como o Tato transforma sua comunicação. 
              <span className="text-foreground font-semibold"> Sem compromisso. Cancele quando quiser.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Acesso completo</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">0 dias</div>
                <div className="text-sm text-muted-foreground">Para decidir</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-1">R$ 0</div>
                <div className="text-sm text-muted-foreground">Investimento inicial</div>
              </div>
            </div>
            
            <a href="/login" rel="noopener noreferrer"><Button
  size="lg"
  className="mt-8 text-lg px-6 py-10 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:scale-105 max-w-full whitespace-normal break-normal leading-[1.3]"
>
  <Sparkles className="mr-2 h-5 w-5" />
  COMEÇAR MEUS 7 DIAS GRÁTIS
</Button></a>





    </div>
  </div>
</section>

      {/* Seção Preços */}
      <section className="py-20 px-4 bg-gradient-to-b from-card/30 to-background">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Quanto vale a sua <span className="text-primary">paz de espírito?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Essencial */}
            <div className="glass-card p-8 rounded-[--radius] flex flex-col">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold w-fit">
                🎁 7 dias grátis
              </div>
              <h3 className="text-2xl font-semibold mb-2">ESSENCIAL</h3>
              <p className="text-muted-foreground mb-6">Para uso pessoal</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold">R$ 19,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>2.000 mensagens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Modo Diplomata</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Modo Clareza</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Atalho Ctrl+Enter</span>
                </li>
              </ul>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary"
                asChild
              >
                <Link to="/login?plan=essencial">QUERO TER TATO</Link>
              </Button>
            </div>
            
            {/* Plano Profissional */}
            <div className="glass-card p-8 rounded-[--radius] border-primary/70 glow-primary flex flex-col">
              <div className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/50 text-primary text-xs font-semibold w-fit">
                🎁 7 dias grátis
              </div>
              <h3 className="text-2xl font-semibold mb-2">PROFISSIONAL</h3>
              <p className="text-muted-foreground mb-6">Para quem fatura no WhatsApp</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-success">R$ 39,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="font-semibold">6000 MENSAGENS</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Todos os Modos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Modo Fechador <span className="text-success">(Exclusivo)</span></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Atalho Ctrl+Enter</span>
                </li>
              </ul>
              
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-all hover:scale-105"
                asChild
              >
                <Link to="/login?plan=profissional">QUERO VENDER MAIS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
  <div className="container mx-auto max-w-5xl text-center space-y-4">
    {/* Logo + site */}
    <a href="#free-test" rel="noopener noreferrer" className="inline-block text-3xl font-bold mb-2 iconbottom">
      <img src="/icon.png" alt="PunkLab logo" className="w-8 h-8 inline-block mr-2 object-contain" />
      TATO
    </a>

    <p className="text-muted-foreground mb-2">Sua melhor versão, em texto.</p>

    {/* Redes sociais */}
    <div className="flex justify-center gap-6 text-muted-foreground">
      <a href="https://instagram.com/punklabcc" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        <img src="instagram.svg" alt="Instagram" className="w-6 h-6" />
      </a>
      <a href="https://www.linkedin.com/company/punklab/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        <img src="linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
      </a>
      <a href="https://behance.net/louipasquini" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        <img src="behance.svg" alt="Behance" className="w-6 h-6" />
      </a>
      <a href="https://github.com/louipasquini" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
        <img src="github.svg" alt="GitHub" className="w-6 h-6" />
      </a>
    </div>
    <p className="">
      Desenvolvido com caos e código pela <a href="https://punklab.com.br" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">PunkLab - cAos CriativO</a>
    </p>
  </div>
</footer>

    </div>
  );
};

export default Index;
