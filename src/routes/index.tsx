import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  Headphones,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import ebookCoverAsset from "@/assets/ebook-cover.png.asset.json";

const ebookCover = ebookCoverAsset.url;
const CHECKOUT_URL = "https://pay.kursinha.com/c/6a8d8d3cfd7f330eb49b1db6";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Cabra da Minha Mãe — O Segredo da Riqueza | Ricardo Kaniama" },
      {
        name: "description",
        content:
          "Educação financeira para futuros ricos. Aprenda a fazer pequenas reservas do seu salário e construir riqueza real, sem depender de grandes rendimentos. Por Ricardo Kaniama, criador do PAIFI.",
      },
      { property: "og:title", content: "A Cabra da Minha Mãe — O Segredo da Riqueza" },
      {
        property: "og:description",
        content:
          "Educação Financeira para Futuros Ricos. O que a escola não ensina sobre guardar dinheiro e construir património em Angola.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <HeroSection />
        <AuthoritySection />
        <LearnSection />
        <OfferSection />
        <GuaranteeSection />
        <FinalCTASection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">
            Ricardo Kaniama
          </span>
        </div>
        <a
          href={CHECKOUT_URL}
          className="inline-flex items-center justify-center rounded-full bg-cta px-4 py-2 text-xs font-bold uppercase tracking-wide text-cta-foreground shadow-sm transition hover:bg-cta-hover sm:text-sm"
        >
          Quero o meu exemplar
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="bg-pattern-dots absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-cta-foreground">
            <span className="h-2 w-2 rounded-full bg-cta" />
            Ebook já disponível — leitura imediata
          </p>
          <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Trabalha o mês todo… e no fim o salário some sem deixar rasto?
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            <strong className="text-foreground">A Cabra da Minha Mãe — O Segredo da Riqueza</strong> mostra-te
            como guardares uma parte do que ganhas hoje, mesmo que o salário seja curto, para construíres
            património amanhã. Educação financeira direta, sem enrolação.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-6 py-4 text-base font-bold uppercase tracking-wide text-cta-foreground shadow-lg shadow-cta/25 transition hover:bg-cta-hover hover:shadow-cta/40"
            >
              <Wallet className="h-5 w-5" />
              Quero sair do salário-a-salário
            </a>
            <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-cta" />
              Garantia de 7 dias
            </span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Por apenas <span className="font-bold text-foreground">1.500 Kz</span>. Leitura no telemóvel,
            tablet ou computador.
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-cta/20 to-primary/5 blur-2xl" />
            <img
              src={ebookCover}
              alt="Capa do ebook A Cabra da Minha Mãe — O Segredo da Riqueza, de Ricardo Kaniama"
              width={512}
              height={512}
              className="relative z-10 w-full animate-float rounded-2xl shadow-2xl"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthoritySection() {
  return (
    <section className="border-y border-border bg-blue-soft/40 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Quem te ensina já passou por isto
        </h2>
        <p className="mt-4 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          <strong className="text-foreground">Ricardo Kaniama</strong> é especialista em educação financeira e
          criador do <strong className="text-foreground">PAIFI</strong> — Programa de Apoio à Independência
          Financeira. Há anos ensina angolanos e africanos lusófonos a transformarem pequenos hábitos em
          riqueza real, sem promessas vazias e sem depender de grandes salários.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-2xl font-black text-primary sm:text-3xl">PAIFI</p>
            <p className="text-xs text-muted-foreground sm:text-sm">Programa de Apoio à Independência Financeira</p>
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-2xl font-black text-primary sm:text-3xl">+Anos</p>
            <p className="text-xs text-muted-foreground sm:text-sm">A ensinar finanças simples e aplicáveis</p>
          </div>
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <p className="text-2xl font-black text-primary sm:text-3xl">Angola</p>
            <p className="text-xs text-muted-foreground sm:text-sm">Realidade do dia a dia do kwanza</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearnSection() {
  const lessons = [
    {
      icon: <PiggyBank className="h-6 w-6" />,
      title: "O método da pequena reserva",
      desc: "Como guardar uma parte do que ganhas, mesmo quando o salário parece não chegar.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Fazer o dinheiro trabalhar por ti",
      desc: "Entender o que é investir de verdade — sem especulação, sem promessas de ficar rico da noite para o dia.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Protegeres o que construíste",
      desc: "Evitar armadilhas financeiras comuns em Angola e manteres o teu património longe de riscos desnecessários.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Disciplina a longo prazo",
      desc: "Transformar a poupança num hábito automático, para nunca mais viveres com o coração na mão antes do próximo salário.",
    },
  ];

  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            O que vais aprender neste ebook
          </h2>
          <p className="mt-3 text-muted-foreground">
            Quatro lições práticas para quem quer deixar de ver o dinheiro desaparecer.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {lessons.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-card-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="bg-primary px-4 py-14 text-primary-foreground sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Resultados reais de quem aplicou o método
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-primary-foreground/80">
          Estes leitores começaram com pouco e mudaram a forma como tratam o dinheiro.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur-sm"
            >
              <p className="text-sm italic text-primary-foreground/90">
                “[DEPOIMENTO {n}: inserir aqui o testemunho real de um leitor que aplicou o método e
                conseguiu criar reservas ou melhorar a sua vida financeira.]”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-foreground font-bold">
                  {String.fromCharCode(64 + n)}
                </div>
                <div>
                  <p className="font-semibold text-primary-foreground">[Nome do leitor]</p>
                  <p className="text-xs text-primary-foreground/70">[Localidade / Profissão]</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-primary-foreground/90">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comunidade de leitores PAIFI
          </span>
          <span className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Baseado no método validado no mercado angolano
          </span>
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section id="oferta" className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border-2 border-cta/30 bg-card shadow-xl">
          <div className="bg-cta px-6 py-4 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-cta-foreground">
              Oferta de lançamento — vagas limitadas
            </p>
          </div>

          <div className="p-6 sm:p-10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Investimento único</p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="text-2xl font-semibold text-muted-foreground line-through decoration-2">
                  4.500 Kz
                </span>
                <span className="text-5xl font-black text-foreground sm:text-6xl">1.500 Kz</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Menos do que o gastas num jantar fora. Mas com retorno para a tua vida toda.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-blue-soft/30 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-bold text-card-foreground">Bónus 1</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Checklist prático <strong>“Primeira Reserva em 7 Dias”</strong> — um passo a passo para
                  começares já esta semana.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-blue-soft/30 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-foreground">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-bold text-card-foreground">Bónus 2</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Acesso ao <strong>mini-áudio / resumo em áudio</strong> do livro — ouve enquanto andas no
                  trânsito ou descansas.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-destructive/5 p-5 text-center">
              <p className="font-bold text-destructive">O custo de não agir agora</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Se adiares mais um ano, continuarás a perder 12 meses de juros compostos e reservas possíveis.
                Cada kwanza que não guardas hoje é um kwanza que não trabalha por ti amanhã. A diferença entre
                quem fica rico e quem fica preso ao salário não é o salário — é a decisão de começar.
              </p>
            </div>

            <div className="mt-8 text-center">
              <a
                href={CHECKOUT_URL}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-lg font-black uppercase tracking-wide text-cta-foreground shadow-xl shadow-cta/25 transition hover:bg-cta-hover hover:shadow-cta/40 sm:w-auto"
              >
                <Wallet className="h-5 w-5" />
                Garantir o meu acesso por 1.500 Kz
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Vagas limitadas para esta turma de lançamento. Após o fecho, o valor volta ao preço normal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="bg-blue-soft/40 px-4 py-12 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-lg">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Garantia de 7 dias
          </h2>
          <p className="mt-2 text-muted-foreground">
            Compra o ebook, lê durante uma semana e aplica o que aprendeste. Se achares que não valeu o
            investimento, devolvemos-te os 1.500 Kz. Sem perguntas, sem burocracia. O risco é nosso.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-blue-deep p-8 text-center text-white shadow-2xl sm:p-12">
        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
          Daqui a 1 ano, vais desejar ter começado hoje
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          A riqueza não nasce de um grande salário. Nasce de uma decisão pequena, repetida com disciplina.
          Este ebook é o teu ponto de partida.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-lg font-black uppercase tracking-wide text-cta-foreground shadow-xl shadow-black/20 transition hover:bg-cta-hover sm:w-auto"
        >
          <TrendingUp className="h-5 w-5" />
          Começar a construir o meu património
        </a>
        <p className="mt-4 text-sm text-white/70">
          Acesso imediato + 2 bónus + garantia de 7 dias.
        </p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "1.500 Kz não é muito caro para um ebook?",
      answer:
        "O preço normal é 4.500 Kz. Hoje levas o ebook + checklist prático + áudio-resumo por menos de metade. Mais barato do que um jantar fora, mas com o potencial de mudar a tua relação com o dinheiro para sempre.",
    },
    {
      question: "Não tenho tempo para ler. Vou conseguir aproveitar?",
      answer:
        "O ebook é direto, sem enrolação. E ainda levas o resumo em áudio para ouvires no carro, no transporte ou enquanto descansas. O método foi feito para quem tem pouco tempo.",
    },
    {
      question: "Isto funciona mesmo para quem ganha pouco?",
      answer:
        "Foi exactamente para quem ganha pouco que Ricardo Kaniama escreveu este livro. O segredo não é ganhar muito — é guardar uma parte do que entra e fazer essa parte crescer. Se consegues poupar 500 Kz, consegues começar.",
    },
  ];

  return (
    <section className="border-t border-border bg-background px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Ainda tens dúvidas?
        </h2>
        <p className="mt-3 text-center text-muted-foreground">Respostas curtas para as objeções mais comuns.</p>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-card-foreground">
                {faq.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-black uppercase tracking-wide text-cta-foreground shadow-lg shadow-cta/25 transition hover:bg-cta-hover"
          >
            <Wallet className="h-5 w-5" />
            Quero o ebook agora — 1.500 Kz
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ricardo Kaniama. Todos os direitos reservados.
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        A Cabra da Minha Mãe — O Segredo da Riqueza. Educação Financeira para Futuros Ricos.
      </p>
    </footer>
  );
}
