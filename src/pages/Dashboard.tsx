import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// Ajuste nos imports para ./ assumindo que os arquivos estão na mesma pasta na visualização
import { useAuth } from "../contexts/AuthContext";
import { deleteAccount, cancelSubscription, API_ENDPOINTS, fetchWithAuth } from "../lib/api";
import { 
  LogOut, 
  User, 
  CreditCard, 
  BarChart3, 
  Settings, 
  AlertCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  Loader2,
  Trash2,
  X,
  ExternalLink,
  Ban
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const { user, token, logout, dashboardData, isLoading, refreshDashboard } = useAuth();
  const navigate = useNavigate();
  
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPlanSelector, setShowPlanSelector] = useState(false);
  
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Estado para controle do cancelamento de assinatura
  const [isCanceling, setIsCanceling] = useState(false);
  
  const DELETE_CONFIRMATION_TEXT = "DELETAR MINHA CONTA";

  useEffect(() => {
    refreshDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mapeamento seguro dos dados da API para o Layout
  const subscriptionData = {
    plan: dashboardData?.subscription?.planName || "Carregando...",
    status: dashboardData?.subscription?.status || "...",
    nextBilling: dashboardData?.subscription?.nextBillingDate 
        ? new Date(dashboardData.subscription.nextBillingDate).toLocaleDateString('pt-BR') 
        : "N/A",
    price: dashboardData?.subscription?.value || "R$ 0,00",
    
    messagesUsed: dashboardData?.usage?.used || 0,
    messagesLimit: dashboardData?.usage?.limit || 1, 
  };

  const isFreeOrTrial = subscriptionData.plan.includes('Teste') || subscriptionData.plan.includes('Grátis') || subscriptionData.status === 'Inativo';

  // Nova função para cancelar assinatura diretamente
  const handleCancelSubscription = async () => {
    setIsCanceling(true);
    try {
      await cancelSubscription();
      await refreshDashboard(); // Atualiza os dados na tela para refletir o cancelamento
      alert("Sua assinatura foi cancelada com sucesso.");
      setShowCancelDialog(false);
    } catch (error: any) {
      console.error("Erro ao cancelar assinatura:", error);
      alert(error.message || "Erro ao cancelar assinatura. Tente novamente.");
    } finally {
      setIsCanceling(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== DELETE_CONFIRMATION_TEXT) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteAccount();
      logout();
      navigate("/");
      alert("Sua conta foi deletada com sucesso.");
    } catch (error: any) {
      console.error("Erro ao deletar conta:", error);
      alert(error.message || "Erro ao deletar conta. Tente novamente.");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setDeleteConfirmation("");
    }
  };

  const usagePercentage = subscriptionData.messagesLimit > 0 
    ? (subscriptionData.messagesUsed / subscriptionData.messagesLimit) * 100 
    : 0;

  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      
      {/* Modal de Seleção de Plano (Custom Overlay) */}
      {showPlanSelector && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowPlanSelector(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Alterar Plano</h2>
              <p className="text-muted-foreground text-sm">Escolha o plano que melhor se adapta às suas necessidades.</p>
            </div>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className={`w-full justify-between h-auto py-4 px-4 border-2 ${subscriptionData.plan.includes('Essencial') ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                onClick={() => navigate("/checkout?plan=essencial")}
              >
                <div className="text-left">
                  <div className="font-bold text-base">Plano Essencial</div>
                  <div className="text-xs text-muted-foreground">Ideal para uso pessoal</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">R$ 19,90</div>
                  <div className="text-[10px] text-muted-foreground">/mês</div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className={`w-full justify-between h-auto py-4 px-4 border-2 ${subscriptionData.plan.includes('Profissional') ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}`}
                onClick={() => navigate("/checkout?plan=profissional")}
              >
                <div className="text-left">
                  <div className="font-bold text-base">Plano Profissional</div>
                  <div className="text-xs text-muted-foreground">Para uso intenso</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">R$ 39,90</div>
                  <div className="text-[10px] text-muted-foreground">/mês</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <img src="/icon.png" alt="Tato logo" className="w-8 h-8 object-contain" />
            TATO
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
                {user?.email || dashboardData?.account?.email}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Gerencie sua conta e acompanhe seu uso do Tato
            </p>
          </div>

          {/* Loading State */}
          {isLoading && !dashboardData ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando suas informações...</p>
            </div>
          ) : (
            <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card de Status da Assinatura */}
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Assinatura
                </CardTitle>
                <CardDescription>Status do seu plano</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Plano</span>
                    <span className="font-semibold">{subscriptionData.plan}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className={`h-4 w-4 ${subscriptionData.status === 'Ativo' ? 'text-success' : 'text-muted-foreground'}`} />
                      <span className={`font-semibold capitalize ${subscriptionData.status === 'Ativo' ? 'text-success' : 'text-muted-foreground'}`}>{subscriptionData.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Valor</span>
                    <span className="font-semibold">{subscriptionData.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Próxima cobrança</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{subscriptionData.nextBilling}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card de Uso */}
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Uso de Mensagens
                </CardTitle>
                <CardDescription>Mensagens processadas este mês</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Utilizadas</span>
                    <span className="font-semibold">
                      {subscriptionData.messagesUsed.toLocaleString()} / {subscriptionData.messagesLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(usagePercentage)}% do limite utilizado
                  </p>
                </div>
                {usagePercentage > 80 && (
                  <div className="flex items-center gap-2 p-2 rounded-md bg-warning/10 border border-warning/30">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    <span className="text-xs text-warning">Você está próximo do limite</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Card de Conta */}
            <Card className="glass-card border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Conta
                </CardTitle>
                <CardDescription>Informações da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Nome</span>
                    <span className="font-semibold text-sm truncate max-w-[150px]">
                        {dashboardData?.account?.name || "Usuário"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">E-mail</span>
                    <span className="font-semibold text-sm truncate max-w-[150px]" title={dashboardData?.account?.email}>
                        {dashboardData?.account?.email || user?.email}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-primary/50 hover:bg-primary/10 hover:border-primary"
                  onClick={() => setShowPlanSelector(true)}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Alterar Plano
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seção de Cancelamento - Modificada para API direta */}
          {!isFreeOrTrial && (
            <Card className="glass-card border-destructive/30 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Settings className="h-5 w-5" />
                  Gerenciar Assinatura
                </CardTitle>
                <CardDescription>
                  Cancele sua assinatura atual se desejar parar as cobranças.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ao cancelar, sua assinatura será encerrada imediatamente e você não será cobrado no próximo ciclo.
                </p>
                <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive"
                      className="w-full sm:w-auto"
                    >
                      Cancelar Assinatura
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancelar Assinatura?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja cancelar sua assinatura do plano {subscriptionData.plan}? 
                        Você perderá os benefícios exclusivos e voltará para o plano gratuito.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isCanceling}>Voltar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.preventDefault();
                          handleCancelSubscription();
                        }}
                        disabled={isCanceling}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isCanceling ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Cancelando...
                          </>
                        ) : (
                          <>
                            <Ban className="mr-2 h-4 w-4" />
                            Sim, Cancelar
                          </>
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          )}

          {/* Seção de Deletar Conta */}
          <Card className="glass-card border-destructive/50 mt-6 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription className="text-destructive/80">
                Deletar conta permanentemente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-destructive">
                      Atenção: Esta ação é irreversível!
                    </p>
                    <ul className="text-xs text-destructive/90 space-y-1 list-disc list-inside">
                      <li>Você perderá o acesso imediatamente à sua conta</li>
                      <li>Não haverá reembolso do período pago</li>
                      <li>Todos os seus dados serão permanentemente deletados</li>
                      <li>Esta ação não pode ser desfeita</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive"
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Deletar Minha Conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-destructive text-xl">
                      Deletar Conta Permanentemente?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3 pt-2">
                      <p className="font-semibold text-foreground">
                        Esta ação não pode ser desfeita!
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="text-destructive font-medium">
                          ⚠️ Você perderá o acesso imediatamente à sua conta
                        </p>
                        <p className="text-destructive font-medium">
                          💰 Não haverá reembolso do período pago
                        </p>
                        <p className="text-destructive font-medium">
                          🗑️ Todos os seus dados serão permanentemente deletados
                        </p>
                      </div>
                      <div className="pt-4 space-y-2">
                        <Label htmlFor="delete-confirmation" className="text-foreground font-semibold">
                          Para confirmar, digite: <span className="font-mono text-destructive">{DELETE_CONFIRMATION_TEXT}</span>
                        </Label>
                        <Input
                          id="delete-confirmation"
                          type="text"
                          placeholder={DELETE_CONFIRMATION_TEXT}
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          className="bg-background border-destructive/50 focus:border-destructive"
                          autoComplete="off"
                        />
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel 
                      onClick={() => setDeleteConfirmation("")}
                      disabled={isDeleting}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== DELETE_CONFIRMATION_TEXT || isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deletando...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sim, Deletar Conta
                        </>
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Link para voltar */}
          <div className="text-center mt-8">
            <Button variant="ghost" asChild>
              <Link to="/">
                Voltar para a página inicial
              </Link>
            </Button>
          </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;