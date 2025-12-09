import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Pin, LogIn, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ThankYou = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 15
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            y: -5,
            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-background text-foreground overflow-x-hidden">
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
                    </div>
                </div>
            </nav>

            {/* Content */}
            <section className="pt-32 pb-20 px-4">
                <motion.div
                    className="container mx-auto max-w-4xl"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div className="text-center mb-12" variants={itemVariants}>
                        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-success/10 border border-success/30 text-success text-sm font-medium">
                            <CheckCircle className="w-4 h-4 inline-block mr-2" />
                            Assinatura confirmada com sucesso!
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Bem-vindo ao <span className="text-primary">Tato.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Siga os passos abaixo para começar a transformar sua comunicação no WhatsApp Web.
                        </p>
                    </motion.div>

                    <motion.div className="grid gap-8 max-w-3xl mx-auto" variants={containerVariants}>
                        {/* Passo 1 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">1</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Instale a extensão</h3>
                                <p className="text-muted-foreground mb-4">
                                    O Tato funciona como uma extensão do Chrome. Clique no botão para instalar.
                                </p>
                                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary" asChild>
                                    <a href="https://chromewebstore.google.com/detail/tato-sua-melhor-vers%C3%A3o-em/jkeflcjglbnapakmmhcabdgokdjbgpgh" target="_blank" rel="noopener noreferrer">
                                        <Download className="mr-2 h-5 w-5" />
                                        Baixar Extensão
                                    </a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Passo 2 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">2</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Fixe no navegador</h3>
                                <p className="text-muted-foreground mb-4">
                                    Clique no ícone de quebra-cabeça <span className="inline-block align-middle"><img src="https://lh3.googleusercontent.com/KeepMySignedIn" alt="" className="w-4 h-4 opacity-0" />🧩</span> no topo do Chrome e depois no "alfinete" <Pin className="w-4 h-4 inline-block" /> ao lado do Tato.
                                </p>
                                <div className="bg-background/50 p-4 rounded-md border border-border inline-block">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>🧩 Extensões</span>
                                        <span>→</span>
                                        <span className="font-bold text-foreground">Tato</span>
                                        <span>→</span>
                                        <Pin className="w-4 h-4 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Passo 3 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">3</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Faça seu login</h3>
                                <p className="text-muted-foreground mb-4">
                                    Abra o WhatsApp Web, clique no ícone do Tato e faça login com sua conta.
                                </p>
                                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 hover:border-primary" asChild>
                                    <Link to="/login">
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Ir para Login
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Passo 4 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">4</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Escolha o modelo</h3>
                                <p className="text-muted-foreground">
                                    Selecione o modelo ideal (Diplomata, Fechador ou Clareza) para cada situação.
                                </p>
                            </div>
                        </motion.div>

                        {/* Passo 5 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">5</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Escreva e envie</h3>
                                <p className="text-muted-foreground">
                                    Escreva seu rascunho e deixe o Tato polir suas palavras antes de enviar.
                                </p>
                            </div>
                        </motion.div>

                        {/* Passo 6 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">6</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Controle total</h3>
                                <p className="text-muted-foreground">
                                    Você tem total controle para habilitar ou desabilitar o Tato quando preferir.
                                </p>
                            </div>
                        </motion.div>

                        {/* Passo 7 */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-primary/30 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl font-bold text-primary">7</span>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">Gestão por contato</h3>
                                <p className="text-muted-foreground">
                                    Desative o Tato em conversas específicas (como com a família) e mantenha-o ativo para o trabalho.
                                </p>
                            </div>
                        </motion.div>

                        {/* Passo 4 - Aviso */}
                        <motion.div
                            className="glass-card p-8 rounded-[--radius] border-destructive/30 bg-destructive/5 flex flex-col md:flex-row gap-6 items-center"
                            variants={itemVariants}
                            whileHover="hover"
                        >
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-8 h-8 text-destructive" />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2 text-destructive">Use com cautela</h3>
                                <p className="text-muted-foreground">
                                    O Tato é um assistente em fase Beta, não um educador. Ele pode cometer erros, então revise sempre antes de enviar.
                                    <br /><strong>Evite o uso para mensagens ofensivas ou prejudiciais.</strong> 😉
                                </p>
                            </div>
                        </motion.div>

                    </motion.div>
                </motion.div>
            </section>

            {/* Seção FAQ */}
            <section className="py-20 px-4">
                <motion.div
                    className="container mx-auto max-w-3xl"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-12" variants={itemVariants}>
                        Perguntas <span className="text-primary">Frequentes</span>
                    </motion.h2>

                    <motion.div className="space-y-4" variants={containerVariants}>
                        <motion.div
                            className="glass-card p-6 rounded-[--radius] border-primary/30"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        >
                            <h3 className="text-xl font-semibold mb-2">Onde o Tato funciona?</h3>
                            <p className="text-muted-foreground">
                                O Tato funciona exclusivamente no <strong>WhatsApp Web</strong> acessado através do navegador <strong>Google Chrome</strong>.
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card p-6 rounded-[--radius] border-primary/30"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        >
                            <h3 className="text-xl font-semibold mb-2">O que o Tato analisa?</h3>
                            <p className="text-muted-foreground">
                                A extensão analisa <strong>apenas mensagens de texto</strong> que você digita. Áudios, imagens e vídeos não são processados.
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card p-6 rounded-[--radius] border-primary/30"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        >
                            <h3 className="text-xl font-semibold mb-2">É seguro usar a versão Beta?</h3>
                            <p className="text-muted-foreground">
                                Sim, mas como é uma versão <strong>Beta</strong>, podem ocorrer pequenos bugs. Estamos constantemente melhorando a estabilidade.
                            </p>
                        </motion.div>

                        <motion.div
                            className="glass-card p-6 rounded-[--radius] border-primary/30"
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        >
                            <h3 className="text-xl font-semibold mb-2">Dica de uso</h3>
                            <p className="text-muted-foreground">
                                Recomendamos <strong>fixar a extensão</strong> na barra do seu navegador para ter acesso rápido às configurações e status.
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-border/50">
                <div className="container mx-auto max-w-5xl text-center space-y-4">
                    <Link to="/" className="inline-block text-3xl font-bold mb-2 iconbottom">
                        <img src="/icon.png" alt="PunkLab logo" className="w-8 h-8 inline-block mr-2 object-contain" />
                        TATO
                    </Link>
                    <p className="text-muted-foreground mb-2">Sua melhor versão, em texto.</p>
                    <p className="">
                        Desenvolvido com caos e código pela <a href="https://punklab.com.br" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">PunkLab - cAos CriativO</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ThankYou;

