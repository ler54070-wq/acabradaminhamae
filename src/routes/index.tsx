import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileSpreadsheet,
  Headphones,
  PiggyBank,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import ebookCoverAsset from "@/assets/ebook-cover.jpg.asset.json";
import bonusDebtAsset from "@/assets/bonus-sair-das-dividas.jpg.asset.json";
import bonusSpreadsheetAsset from "@/assets/bonus-planilha.jpg.asset.json";
import bonusSaveAsset from "@/assets/bonus-guardar-mes.jpg.asset.json";

const ebookCover = ebookCoverAsset.url;
const bonusDebt = bonusDebtAsset.url;
const bonusSpreadsheet = bonusSpreadsheetAsset.url;
const bonusSave = bonusSaveAsset.url;
const CHECKOUT_URL = "https://pay.kursinha.com/c/6a8d8d3cfd7f330eb49b1db6";
const COUNTDOWN_SECONDS = 10 * 60;

const BUYERS = [
  { name: "Pedro Nkanga", city: "Luanda" },
  { name: "Ana Kiala", city: "Benguela" },
  { name: "João Cassule", city: "Huambo" },
  { name: "Marta Domingos", city: "Lubango" },
  { name: "Adilson Neto", city: "Cabinda" },
  { name: "Teresa Muanda", city: "Luanda" },
  { name: "Osvaldo Mbala", city: "Malanje" },
  { name: "Isabel Cardoso", city: "Namibe" },
];


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
        <BonusSection />
        <OfferSection />
        <GuaranteeSection />
        <FinalCTASection />
        <FAQSection />
      </main>

      <Footer />
      <PurchaseNotifications />
    </div>
  );
}

function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mt-3 flex flex-col items-center gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-white/80">
        Este preço expira em
      </p>
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-white/15 px-3 py-2 text-2xl font-black tabular-nums text-white">
          {minutes}
        </span>
        <span className="text-2xl font-black text-white/70">:</span>
        <span className="rounded-lg bg-white/15 px-3 py-2 text-2xl font-black tabular-nums text-white">
          {seconds}
        </span>
      </div>
    </div>
  );
}

function PurchaseNotifications() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      setVisible(true);
      hideTimer = setTimeout(() => {
        setVisible(false);
        setIndex((i) => (i + 1) % BUYERS.length);
      }, 5000);
    };
    const first = setTimeout(show, 6000);
    const loop = setInterval(show, 14000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideTimer);
      clearInterval(loop);
    };
  }, []);

  const buyer = BUYERS[index]!;

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-3 left-3 right-3 z-50 mx-auto w-auto max-w-[19rem] transition-all duration-500 sm:left-4 sm:right-auto sm:bottom-4 sm:mx-0 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-card-foreground">
            {buyer.name} acabou de comprar
          </p>
          <p className="text-xs text-muted-foreground">
            {buyer.city} · há poucos instantes
          </p>
        </div>
      </div>
    </div>
  );
}


function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="truncate text-sm font-bold tracking-tight text-primary sm:text-base">
            Ricardo Kaniama
          </span>
        </div>
        <a
          href={CHECKOUT_URL}
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-primary-foreground shadow-sm shadow-primary/25 transition hover:bg-primary/90 animate-pulse-float sm:px-4 sm:text-sm"
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
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-cta-foreground">
          <span className="h-2 w-2 rounded-full bg-cta" />
          Ebook já disponível — leitura imediata
        </p>
        <h1 className="text-balance text-[1.7rem] font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Trabalha o mês todo… e no fim o salário some sem deixar rasto?
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-xl">
          <strong className="text-foreground">A Cabra da Minha Mãe — O Segredo da Riqueza</strong> mostra-te
          como guardares uma parte do que ganhas hoje, mesmo que o salário seja curto, para construíres
          património amanhã. Educação financeira direta, sem enrolação.
        </p>

        <div className="relative mx-auto mt-8 w-full max-w-md sm:max-w-2xl md:max-w-3xl">
          <div className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-br from-primary/20 via-cta/20 to-primary/5 blur-2xl" />
          <img
            src={ebookCover}
            alt="Mockup do livro A Cabra da Minha Mãe — O Segredo da Riqueza"
            width={1536}
            height={1024}
            className="relative z-10 mx-auto h-auto w-full max-w-full object-contain animate-float drop-shadow-2xl"
            loading="eager"
          />


        </div>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-center text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 animate-pulse-float sm:w-auto sm:px-6 sm:text-base"
          >
            <Wallet className="h-5 w-5" />
            Quero sair do salário-a-salário
          </a>
          <span className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Garantia de 7 dias
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Por apenas <span className="font-bold text-foreground">2.500 Kz</span>. Leitura no telemóvel,
          tablet ou computador.
        </p>
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
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-6">
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

function BonusSection() {
  const bonuses = [
    {
      image: bonusDebt,
      alt: "Ilustração 3D: libertar-se das dívidas",
      title: "Como sair das dívidas",
      desc: "Um passo a passo simples para parar de perder dinheiro com juros e recuperar o controlo das tuas finanças.",
    },
    {
      image: bonusSpreadsheet,
      alt: "Ilustração 3D: planilha de controlo financeiro no computador e telemóvel",
      title: "Planilha de controlo financeiro",
      desc: "A mesma planilha que uso no PAIFI para saberes, de forma clara, para onde vai o teu dinheiro todos os meses.",
    },
    {
      image: bonusSave,
      alt: "Ilustração 3D: poupar dinheiro todos os meses",
      title: "Quanto guardar por mês mesmo ganhando pouco",
      desc: "Descobre o valor real que podes reservar hoje — sem mentiras, sem promessas, apenas matemática aplicada ao teu salário.",
    },
  ];

  return (
    <section className="border-y border-border bg-blue-soft/40 px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Além do ebook, levas estes 3 bónus
          </h2>
          <p className="mt-3 text-muted-foreground">
            Ferramentas práticas para começares ainda esta semana.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {bonuses.map((item) => (
            <div
              key={item.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-primary/30 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-primary/5">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-card-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function OfferSection() {
  return (
    <section id="oferta" className="bg-primary px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border-2 sm:rounded-3xl border-primary/30 bg-card shadow-xl">
          <div className="bg-blue-deep px-4 py-4 text-center sm:px-6">
            <p className="text-sm font-bold uppercase tracking-wide text-white sm:tracking-widest">
              Oferta de lançamento — vagas limitadas
            </p>
            <CountdownTimer />
          </div>


          <div className="p-5 sm:p-10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Investimento único</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <span className="text-xl font-semibold text-muted-foreground line-through decoration-2 sm:text-2xl">
                  6.500 Kz
                </span>
                <span className="text-4xl font-black text-foreground sm:text-6xl">2.500 Kz</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Menos do que o gastas num jantar fora. Mas com retorno para a tua vida toda.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-blue-soft/30 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-bold text-card-foreground">Bónus 1</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Checklist prático <strong>“Primeira Reserva em 7 Dias”</strong> — um passo a passo para
                  começares já esta semana.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-blue-soft/30 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-base font-black sm:px-8 sm:text-lg uppercase tracking-wide text-primary-foreground shadow-xl shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 animate-pulse-float sm:w-auto"
              >
                <Wallet className="h-5 w-5" />
                Garantir o meu acesso por 2.500 Kz
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
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <ShieldCheck className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Garantia de 7 dias
          </h2>
          <p className="mt-2 text-muted-foreground">
            Compra o ebook, lê durante uma semana e aplica o que aprendeste. Se achares que não valeu o
            investimento, devolvemos-te os 2.500 Kz. Sem perguntas, sem burocracia. O risco é nosso.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="px-4 py-14 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl bg-blue-deep p-6 text-center text-white shadow-2xl sm:p-12">
        <h2 className="text-balance text-xl font-bold leading-tight tracking-tight sm:text-4xl">
          Daqui a 1 ano, vais desejar ter começado hoje
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
          A riqueza não nasce de um grande salário. Nasce de uma decisão pequena, repetida com disciplina.
          Este ebook é o teu ponto de partida.
        </p>
        <a
          href={CHECKOUT_URL}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-black uppercase tracking-wide text-primary-foreground shadow-xl shadow-black/20 transition hover:bg-primary/90 animate-pulse-float sm:w-auto"
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
      question: "2.500 Kz não é muito caro para um ebook?",
      answer:
        "O preço normal é 6.500 Kz. Hoje levas o ebook + checklist prático + áudio-resumo por menos de metade. Mais barato do que um jantar fora, mas com o potencial de mudar a tua relação com o dinheiro para sempre.",
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
                <span className="pr-3 text-sm sm:text-base">{faq.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={CHECKOUT_URL}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-black sm:w-auto sm:px-8 sm:text-base uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90 animate-pulse-float"
          >
            <Wallet className="h-5 w-5" />
            Quero o ebook agora — 2.500 Kz
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
