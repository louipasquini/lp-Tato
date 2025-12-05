import React, { useState, useEffect } from 'react';
import {
    Shield,
    Zap,
    ChevronLeft,
    ChevronRight,
    FileText,
    MessageCircle,
    Users,
    Cpu,
    Target,
    TrendingUp,
    CreditCard,
    Map,
    Rocket,
    Globe,
    Briefcase,
    MessageSquare,
    Check
} from 'lucide-react';
import { Button } from "@/components/ui/button";

// --- Data Structure ---

const slidesData = [
    {
        id: 1,
        title: "TATO",
        subtitle: "Social AI",
        content: {
            type: "cover",
            tagline: "Sua comunicação, elevada."
        },
        notes: "Bom dia. Vivemos em um mundo onde 90% da nossa comunicação é texto, mas perdemos 100% da linguagem corporal. O resultado? Ansiedade, mal-entendidos e perda de negócios. Nós somos o TATO, e viemos resolver a crise do tom."
    },
    {
        id: 2,
        title: "O Problema",
        subtitle: "A Crise do Tom Digital",
        content: {
            type: "problem",
            points: [
                { title: "Invisibilidade", desc: "A intenção se perde sem voz ou rosto.", icon: "eye-off" },
                { title: "Ansiedade", desc: "O medo de ser mal interpretado trava o envio.", icon: "alert-circle" },
                { title: "Ineficiência", desc: "Tempo perdido reescrevendo mensagens simples.", icon: "clock" }
            ]
        },
        notes: "Quantas vezes você escreveu, apagou, reescreveu e, mesmo assim, foi mal interpretado? A falta de tom no texto gera conflitos desnecessários e nos faz perder oportunidades. O problema não é o que dizemos, é como isso soa na tela do outro."
    },
    {
        id: 3,
        title: "A Solução",
        subtitle: "A Máscara Social Inteligente",
        content: {
            type: "solution",
            points: [
                { title: "Refino em Tempo Real", desc: "Sugere alternativas de tom antes do envio." },
                { title: "Foco na Intenção", desc: "Você define o objetivo; TATO ajusta a forma." },
                { title: "Não Intrusivo", desc: "Extensão leve no background." }
            ]
        },
        notes: "O TATO é o seu filtro social em tempo real. Pense nisso como ter um Art Director de Comunicação no seu ombro. A solução não é mais um corretor ortográfico. A solução é o TATO. Você digita, e antes que o dedo aperte 'Enviar', o TATO oferece a versão otimizada."
    },
    {
        id: 4,
        title: "Modos de Poder",
        subtitle: "Superpoderes Sociais",
        content: {
            type: "modes",
            points: [
                { title: "Diplomata", desc: "Transforma grosseria em educação. Ideal para conflitos.", color: "border-primary" },
                { title: "Fechador", desc: "Usa gatilhos mentais e Spin Selling. Ideal para Vendas.", color: "border-success" },
                { title: "Clareza", desc: "Remove ironias e metáforas. Ideal para comunicação técnica.", color: "border-primary" }
            ]
        },
        notes: "Nossos usuários não querem apenas correção. Eles querem superpoderes. O 'Fechador' é o nosso maior motor de conversão. O TATO é moldado pelo feedback dos usuários. 'Não preciso de um robô; preciso de um assistente para cenários específicos.'"
    },
    {
        id: 5,
        title: "Tração",
        subtitle: "Validação de Mercado",
        content: {
            type: "traction",
            metrics: [
                { value: "15k+", label: "Usuários Ativos (MAU)", color: "text-primary" },
                { value: "1.2M", label: "Mensagens Refinadas", color: "text-success" },
                { value: "48%", label: "Retenção D30", color: "text-primary" }
            ]
        },
        notes: "Estes dados que você vê na tela não são estáticos. Eles são puxados em tempo real da nossa base de dados. Isso prova que o TATO é um produto vivo, com tração real e uso constante."
    },
    {
        id: 6,
        title: "Modelo de Negócios",
        subtitle: "Precificação Atual (SaaS)",
        content: {
            type: "business",
            tiers: [
                { name: "Trial", price: "Grátis", features: ["7 dias de acesso total", "Degustação completa"] },
                { name: "Essencial", price: "R$ 19,90", features: ["2.000 mensagens/mês", "Modo Diplomata", "Modo Clareza"] },
                { name: "Profissional", price: "R$ 39,90", features: ["6.000 mensagens/mês", "Todos os Modos", "Modo Fechador"], highlight: true }
            ]
        },
        notes: "Nossa estratégia atual foca na conversão direta. Oferecemos um Trial de 7 dias para viciar o usuário na facilidade. O plano Essencial atende o usuário casual, mas nosso foco é o 'Profissional' a R$ 39,90, onde liberamos o Modo Fechador e limites maiores para power users."
    },
    {
        id: 7,
        title: "Projeção & Mercado",
        subtitle: "Visão de Expansão",
        content: {
            type: "market",
            points: [
                "Hoje: Monetização B2C Direta (SaaS)",
                "Amanhã: Planos Enterprise & Team",
                "Roadmap de Receita: Contratos B2B Corporativos",
                "Visão: Camada de Inteligência Social"
            ]
        },
        notes: "Embora nossa receita atual venha do SaaS individual, nossa projeção de longo prazo mira o mercado Enterprise. Imagine empresas contratando o TATO para padronizar o tom de voz de toda a equipe de vendas ou suporte. Estamos validando no B2C para escalar no B2B."
    },
    {
        id: 8,
        title: "Privacidade e Segurança",
        subtitle: "Arquitetura Segura",
        content: {
            type: "privacy",
            points: [
                { label: "Transmissão Segura", value: "Processamento via API Criptografada" },
                { label: "Zero Retenção", value: "Dados processados e descartados" },
                { label: "Compliance", value: "Foco total na intenção, não no dado" }
            ]
        },
        notes: "A privacidade é inegociável. Diferente de soluções que treinam modelos com seus dados, o TATO usa uma API segura para processamento em tempo real. A mensagem vai, é refinada e retorna. Nada fica salvo em nossos servidores. Privacidade é um recurso, não uma promessa."
    },
    {
        id: 9,
        title: "A Equipe",
        subtitle: "PunkLab: cAos CriativO",
        content: {
            type: "team",
            members: [
                { role: "PunkLab", desc: "Design + Engenharia. Desafiando o status quo." }
            ]
        },
        notes: "Somos um coletivo de engenheiros e designers. O TATO é onde a tecnologia punk encontra a precisão laboratorial. Acreditamos que as melhores soluções vêm de um 'cAos CriativO'."
    },
    {
        id: 10,
        title: "O Pedido",
        subtitle: "Acelerando o Roadmap",
        content: {
            type: "ask",
            amount: "R$ 2.5M",
            allocation: [
                { area: "Engenharia & IA", pct: "50%" },
                { area: "Crescimento & Mkt", pct: "30%" },
                { area: "Operações", pct: "20%" }
            ]
        },
        notes: "Estamos levantando uma rodada Seed. Este capital não é para sobreviver, é para dominar. 50% será alocado diretamente em engenharia para consolidar nossa liderança e lançar as novas features de IA."
    },
    {
        id: 11,
        title: "Roadmap de Produto",
        subtitle: "Novas Features & Expansão",
        content: {
            type: "roadmap",
            steps: [
                { icon: MessageCircle, title: "Integrações", desc: "Telegram e Instagram DM" },
                { icon: MessageSquare, title: "Modo Justificativa", desc: "IA explica o porquê da mudança, auxiliando na compreensão calma em momentos de conflito." },
                { icon: Globe, title: "Modo Tradutor", desc: "Escreva em PT, envie em qualquer idioma." },
                { icon: Briefcase, title: "Modo Entrevista", desc: "Para candidatos: tom perfeito para recrutadores." }
            ]
        },
        notes: "Nosso roadmap é focado em utilidade real. Vamos expandir para onde a conversa acontece (Telegram, Insta). E vamos lançar modos educativos: o Modo Justificativa não só corrige, mas ensina comunicação e acalma os ânimos em conflitos. O Modo Tradutor quebra barreiras globais e o Entrevista ataca uma dor latente do mercado de trabalho."
    },
    {
        id: 12,
        title: "TATO",
        subtitle: "O Futuro da Comunicação",
        content: {
            type: "closing"
        },
        notes: "O TATO não é apenas sobre evitar erros. É sobre desbloquear a eficácia máxima em cada interação digital. O capital que pedimos não é para sobreviver, é para dominar. Junte-se ao PunkLab. Investimos no impacto. Obrigado."
    }
];

// --- Components ---

const TransformationVisual = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-2 mb-4">
            <div className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden shadow-2xl">
                {/* Chat Header */}
                <div className="bg-card/80 border-b border-border p-2 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-foreground">João da Silva</span>
                        <span className="text-[10px] text-muted-foreground">Online</span>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="p-4 space-y-4 bg-background/50 min-h-[150px]">

                    {/* User Typing (Bad State) */}
                    <div className="flex flex-col items-end gap-2 opacity-50">
                        <div className="bg-destructive/20 border border-destructive/30 text-destructive-foreground p-2 rounded-2xl rounded-tr-none max-w-[80%] text-xs relative">
                            "Tá errado isso aí."
                            <div className="absolute -right-2 -top-2 bg-destructive text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                                ANTES
                            </div>
                        </div>
                    </div>

                    {/* AI Processing */}
                    <div className="flex justify-center my-1">
                        <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] animate-pulse">
                            <Zap size={10} />
                            <span>Tato Refinando...</span>
                        </div>
                    </div>

                    {/* AI Suggestion (Good State) */}
                    <div className="flex flex-col items-end gap-2">
                        <div className="bg-primary text-primary-foreground p-2 rounded-2xl rounded-tr-none max-w-[80%] text-xs shadow-glow relative">
                            "Podemos revisar esse ponto para garantir precisão?"
                            <div className="absolute -right-2 -top-2 bg-success text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold">
                                DEPOIS
                            </div>
                        </div>
                        <span className="text-[8px] text-muted-foreground flex items-center gap-1">
                            <Check size={8} /> Enviado
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};

const SlideContent = ({ data, metrics }: { data: any, metrics?: MetricsResponse }) => {
    switch (data.content.type) {
        case "cover":
            return (
                <div className="flex flex-col items-center justify-center h-full text-center mt-8">
                    <div className="w-40 h-40 flex items-center justify-center mb-8 animate-bounce">
                        <img src="/icon.png" alt="Tato Logo" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light text-primary/80 tracking-wider mb-2">PUNKLAB APRESENTA</h2>
                    <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tighter drop-shadow-lg">TATO</h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-success to-transparent mb-6"></div>
                    <p className="text-xl text-muted-foreground italic">"{data.content.tagline}"</p>
                </div>
            );
        case "problem":
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {data.content.points.map((pt, idx) => (
                        <div key={idx} className="bg-destructive/10 border border-destructive/20 p-6 rounded-xl flex flex-col items-center text-center">
                            <div className="mb-4 text-destructive">
                                {idx === 0 && <span className="text-4xl">😶‍🌫️</span>}
                                {idx === 1 && <span className="text-4xl">😰</span>}
                                {idx === 2 && <span className="text-4xl">⏳</span>}
                            </div>
                            <h3 className="text-xl font-bold text-destructive-foreground mb-2">{pt.title}</h3>
                            <p className="text-muted-foreground text-sm">{pt.desc}</p>
                        </div>
                    ))}
                </div>
            );
        case "solution":
            return (
                <div className="flex flex-col items-center">
                    <TransformationVisual />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 w-full">
                        {data.content.points.map((pt, idx) => (
                            <div key={idx} className="glass-card p-4 rounded-xl h-full">
                                <h3 className="text-base font-bold text-foreground mb-1">{pt.title}</h3>
                                <p className="text-muted-foreground text-xs">{pt.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "modes":
            return (
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                        {data.content.points.map((mode, idx) => (
                            <div key={idx} className={`glass-card p-8 rounded-2xl hover:scale-105 transition-transform cursor-default group border ${mode.color}`}>
                                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center border ${mode.color} bg-background/50`}>
                                    <div className={`w-4 h-4 rounded-full ${mode.color.replace('border', 'bg')}`}></div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
                                <p className="text-muted-foreground">{mode.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "traction":
            const maxUsers = metrics?.growth ? Math.max(...metrics.growth.map(g => g.users)) : 100;

            return (
                <div className="flex flex-col items-center justify-center h-full mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl relative overflow-hidden">
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl`}></div>
                            <h3 className={`text-5xl font-bold mb-2 text-primary`}>
                                {metrics ? (metrics.mau >= 1000000 ? `${(metrics.mau / 1000000).toFixed(1)}M` : metrics.mau >= 1000 ? `${(metrics.mau / 1000).toFixed(1)}k+` : metrics.mau) : '...'}
                            </h3>
                            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Usuários Ativos (MAU)</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl relative overflow-hidden">
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-success/10 rounded-full blur-xl`}></div>
                            <h3 className={`text-5xl font-bold mb-2 text-success`}>
                                {metrics ? (metrics.totalMessagesRefined >= 1000000 ? `${(metrics.totalMessagesRefined / 1000000).toFixed(1)}M` : metrics.totalMessagesRefined >= 1000 ? `${(metrics.totalMessagesRefined / 1000).toFixed(1)}k+` : metrics.totalMessagesRefined) : '...'}
                            </h3>
                            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Mensagens Refinadas</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl relative overflow-hidden">
                            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl`}></div>
                            <h3 className={`text-5xl font-bold mb-2 text-primary`}>{metrics ? `${metrics.retentionD30}%` : '...'}</h3>
                            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Retenção D30</p>
                        </div>
                    </div>
                    <div className="mt-8 w-full h-32 bg-card/50 rounded-xl border border-border flex items-end p-4 gap-2">
                        {metrics?.growth ? metrics.growth.map((g, i) => (
                            <div key={i} className="flex-1 bg-primary/30 hover:bg-primary/60 transition-colors rounded-t-sm relative group" style={{ height: `${(g.users / maxUsers) * 100}%` }}>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {g.month}: {g.users}
                                </div>
                            </div>
                        )) : (
                            // Loading State or Fallback
                            [20, 35, 45, 30, 50, 65, 55, 70, 85, 80, 95, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-primary/10 animate-pulse rounded-t-sm" style={{ height: `${h}%` }}></div>
                            ))
                        )}
                    </div>
                </div>
            );
        case "business":
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 items-end">
                    {data.content.tiers.map((tier, idx) => (
                        <div key={idx} className={`relative p-6 rounded-2xl border ${tier.highlight ? 'glass-card border-primary transform scale-105 z-10 shadow-glow' : 'bg-card/40 border-border'}`}>
                            {tier.highlight && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>}
                            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                            <div className="text-3xl font-light mb-6">{tier.price}<span className="text-sm text-muted-foreground">{tier.price !== 'Grátis' ? '/mês' : ''}</span></div>
                            <ul className="space-y-3">
                                {tier.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${tier.highlight ? 'bg-success' : 'bg-muted-foreground'}`}></div> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            );
        case "market":
            return (
                <div className="relative w-full h-64 md:h-80 mt-8 bg-card/30 rounded-2xl border border-border overflow-hidden flex items-center justify-center p-8">
                    {/* Abstract Map/Network Background */}
                    <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%">
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        <div className="space-y-4">
                            <h3 className="text-primary font-bold uppercase tracking-widest text-sm">O Hoje</h3>
                            <p className="text-2xl font-light">Monetização <span className="text-foreground font-bold">B2C SaaS</span></p>
                            <p className="text-muted-foreground text-sm">Foco em tração e conversão de usuários profissionais.</p>
                        </div>
                        <div className="space-y-4 md:border-l md:border-primary/30 md:pl-8">
                            <h3 className="text-success font-bold uppercase tracking-widest text-sm">O Amanhã</h3>
                            <p className="text-2xl font-light">Contratos <span className="text-foreground font-bold">B2B & Enterprise</span></p>
                            <p className="text-muted-foreground text-sm">Padronização de tom para equipes inteiras.</p>
                        </div>
                    </div>
                </div>
            );
        case "privacy":
            return (
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-8">
                    <div className="relative animate-bounce">
                        <div className="absolute -inset-4 bg-success/20 rounded-full blur-xl"></div>
                        <Shield size={64} className="text-success" />
                    </div>
                    <div className="flex flex-col gap-4 w-full md:w-1/2">
                        {data.content.points.map((pt, idx) => (
                            <div key={idx} className="flex justify-between items-center border-b border-border pb-4">
                                <span className="text-muted-foreground">{pt.label}</span>
                                <span className="text-success font-bold text-right text-sm md:text-base">{pt.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "team":
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {data.content.members.map((member, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col items-center text-center group">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-card to-background border-2 border-primary/50 mb-4 flex items-center justify-center group-hover:border-primary transition-colors">
                                <Zap className="text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground text-lg">{member.role}</h3>
                            <p className="text-primary text-sm mb-2">{member.desc.split('.')[0]}</p>
                            <p className="text-muted-foreground text-xs">{member.desc.split('.')[1]}</p>
                        </div>
                    ))}
                </div>
            );
        case "ask":
            return (
                <div className="flex flex-col items-center mt-8 w-full max-w-4xl mx-auto">
                    <div className="relative mb-8 group cursor-default">
                        <div className="text-7xl font-bold text-foreground tracking-tighter drop-shadow-lg blur-md select-none opacity-50 transition duration-500">
                            {data.content.amount}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                            <div className="bg-background/80 backdrop-blur-md border border-primary/30 p-6 rounded-2xl shadow-2xl text-center transform transition-all duration-300 hover:scale-105">
                                <h3 className="text-lg font-bold text-foreground mb-3">Tem interesse em investir?</h3>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold" onClick={() => window.open('https://wa.me/5513988540316?text=Eai%2C%20Loui!%20Vi%20a%20apresenta%C3%A7%C3%A3o%20do%20TATO%20e%20quero%20mais%20informa%C3%A7%C3%B5es%20de%20como%20investir%20no%20projeto.', '_blank')}>
                                    Entrar em Contato
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full h-8 rounded-full overflow-hidden mb-6">
                        <div className="bg-primary h-full" style={{ width: '50%' }}></div>
                        <div className="bg-success h-full" style={{ width: '30%' }}></div>
                        <div className="bg-blue-500 h-full" style={{ width: '20%' }}></div>
                    </div>
                    <div className="flex justify-between w-full text-sm font-mono">
                        {data.content.allocation.map((alloc, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <span className={idx === 0 ? "text-primary" : idx === 1 ? "text-success" : "text-blue-400"}>
                                    {alloc.pct}
                                </span>
                                <span className="text-muted-foreground">{alloc.area}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "roadmap":
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full max-w-4xl mx-auto">
                    {data.content.steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card/40 border border-border hover:bg-card/60 transition group">
                                <div className="p-3 rounded-lg bg-primary/20 text-primary group-hover:text-success transition">
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-tight">{step.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        case "closing":
            return (
                <div className="flex flex-col items-center justify-center h-full text-center mt-12">
                    <div className="relative mb-8">
                        <div className="absolute -inset-8 bg-primary/30 rounded-full blur-3xl"></div>
                        <h1 className="relative text-7xl md:text-9xl font-extrabold tracking-tighter text-foreground">TATO</h1>
                    </div>
                    <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl">
                        "Você digita. O Tato refina. O mundo entende."
                    </p>
                    <Button
                        className="mt-12 px-8 py-6 text-lg rounded-full font-bold glow-primary"
                        onClick={() => window.open('https://wa.me/5513988540316?text=Eai%2C%20Loui!%20Vi%20a%20apresenta%C3%A7%C3%A3o%20do%20TATO%20e%20quero%20mais%20informa%C3%A7%C3%B5es%20de%20como%20investir%20no%20projeto.', '_blank')}
                    >
                        Invista no Futuro
                    </Button>
                    <a href="https://tato.punklab.com.br" target="_blank" rel="noopener noreferrer" className="mt-8 text-muted-foreground text-sm hover:text-primary transition-colors">
                        tato.punklab.com.br
                    </a>
                </div>
            );
        default:
            return null;
    }
};

import { motion, AnimatePresence } from "framer-motion";

import { useQuery } from "@tanstack/react-query";

// --- Types ---
interface GrowthData {
    month: string;
    users: number;
}

interface MetricsResponse {
    mau: number;
    totalMessagesRefined: number;
    retentionD30: number;
    growth: GrowthData[];
}

export default function Presentation() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showNotes, setShowNotes] = useState(false);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const totalSlides = slidesData.length;

    // Fetch Metrics
    const { data: metrics } = useQuery<MetricsResponse>({
        queryKey: ['metrics'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tato/v2/admin/metrics`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setDirection(1);
            setCurrentSlide(curr => curr + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setDirection(-1);
            setCurrentSlide(curr => curr - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSlide]);

    const slide = slidesData[currentSlide];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 overflow-hidden relative selection:bg-primary selection:text-primary-foreground">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-success/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Main Container */}
            <main className="relative z-10 w-full max-w-6xl aspect-[16/9] flex flex-col">

                {/* Slide Content Wrapper */}
                <div className="flex-1 flex flex-col justify-center p-8 md:p-12 relative overflow-hidden">

                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentSlide}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="w-full h-full flex flex-col"
                        >
                            {/* Header */}
                            {slide.content.type !== 'closing' && slide.content.type !== 'cover' && (
                                <header className="mb-8 border-l-4 border-primary pl-6">
                                    <h2 className="text-sm uppercase tracking-[0.2em] text-primary mb-1">Slide {slide.id < 10 ? `0${slide.id}` : slide.id}</h2>
                                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{slide.title}</h1>
                                    <p className="text-xl text-muted-foreground font-light">{slide.subtitle}</p>
                                </header>
                            )}

                            {/* Dynamic Content */}
                            <div className="flex-1">
                                <SlideContent data={slide} metrics={metrics} />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </main>

            {/* Controls & UI Overlay */}
            <div className="fixed bottom-0 left-0 w-full p-6 z-50 flex justify-between items-end pointer-events-none">

                {/* Notes Toggle (Left) */}
                <div className="pointer-events-auto">
                    <Button
                        variant="outline"
                        onClick={() => setShowNotes(!showNotes)}
                        className={`flex items-center gap-2 ${showNotes ? 'bg-primary/10 border-primary text-primary' : 'text-muted-foreground'}`}
                    >
                        <FileText size={18} />
                        <span className="hidden md:inline">Roteiro de Fala</span>
                    </Button>

                    {/* Notes Popover */}
                    {showNotes && (
                        <div className="absolute bottom-16 left-6 w-80 md:w-96 bg-popover/95 backdrop-blur-xl border border-border p-6 rounded-xl shadow-2xl text-left">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Notas do Apresentador</h4>
                            <p className="text-sm leading-relaxed text-popover-foreground font-light">
                                {slide.notes}
                            </p>
                        </div>
                    )}
                </div>

                {/* Navigation (Right) */}
                <div className="flex items-center gap-4 pointer-events-auto">
                    <span className="text-muted-foreground text-sm font-mono mr-4">
                        {currentSlide + 1} / {totalSlides}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="rounded-full"
                    >
                        <ChevronLeft size={20} />
                    </Button>
                    <Button
                        variant="default"
                        size="icon"
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="rounded-full"
                    >
                        <ChevronRight size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}