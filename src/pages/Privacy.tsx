import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Política de <span className="text-primary">Privacidade</span>
          </h1>
          
          <div className="glass-card p-8 rounded-[--radius] space-y-8">
            
            <p className="text-muted-foreground leading-relaxed">
              A sua privacidade é fundamental para nós. Esta Política de Privacidade explica como a extensão <strong>TATO</strong>, 
              desenvolvida pelo estúdio <strong>PunkLab - cAos CriativO</strong>, coleta, usa e protege as informações dos usuários ao utilizar nossos serviços.
            </p>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">1. Informações que Coletamos</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Para fornecer nossos serviços, coletamos e processamos os seguintes tipos de dados:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Informações de Conta:</strong> E-mail, nome e ID de usuário para autenticação e gestão de assinatura.</li>
                <li><strong>Conteúdo de Texto (Temporário):</strong> O texto digitado no WhatsApp Web é capturado <span className="text-foreground font-semibold">apenas quando você solicita uma análise</span>.</li>
                <li><strong>Dados de Uso:</strong> Métricas anônimas para controle de limites do plano (Trial/Pro).</li>
                <li><strong>Configurações Locais:</strong> Preferências salvas no navegador (ex: modo de análise e blacklist).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">2. Como Usamos Suas Informações</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Utilizamos seus dados exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Processar as mensagens em tempo real via Inteligência Artificial.</li>
                <li>Validar seu plano de acesso e processar pagamentos.</li>
                <li>Melhorar continuamente os algoritmos de análise.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">3. Compartilhamento e Processamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <span className="text-foreground font-semibold">Não vendemos seus dados</span>. Compartilhamos apenas com provedores essenciais:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>OpenAI:</strong> Processador de IA para análise de texto.</li>
                <li><strong>Vercel & Neon:</strong> Infraestrutura segura de API e Banco de Dados.</li>
                <li><strong>Stripe:</strong> Processamento seguro de pagamentos.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">4. Armazenamento e Segurança</h2>
              <p className="text-muted-foreground leading-relaxed">
                O conteúdo das suas mensagens <span className="text-foreground font-semibold">não é armazenado permanentemente</span> em nossos bancos de dados. 
                Ele é processado em tempo real e descartado. Utilizamos criptografia SSL/TLS em todas as comunicações.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">5. Seus Direitos</h2>
              <ul className="list-disc list-inside mt-3 space-y-2 text-muted-foreground">
                <li>Acessar as informações pessoais que mantemos.</li>
                <li>Solicitar a exclusão da sua conta e dados.</li>
                <li>Cancelar sua assinatura a qualquer momento.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-primary">6. Contato do Desenvolvedor</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou tirar dúvidas, entre em contato com o <strong>PunkLab</strong>:
                <br />
                <a href="mailto:loui@punklab.com.br" className="text-primary font-semibold hover:underline mt-2 inline-block">
                  loui@punklab.com.br
                </a>
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Última atualização: 02 de Dezembro de 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="text-3xl font-bold mb-2">TATO</div>
          <p className="text-muted-foreground mb-6">Sua melhor versão, em texto.</p>
          <p className="text-sm text-muted-foreground">
            Desenvolvido com caos e código pela <span className="text-primary font-semibold">PunkLab - cAos CriativO</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;