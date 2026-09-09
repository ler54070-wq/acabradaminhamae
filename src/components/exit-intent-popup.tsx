import { useCallback, useEffect, useRef, useState } from "react";
import { X, Wallet } from "lucide-react";

const EXIT_CHECKOUT_URL = "https://pay.kursinha.com/c/6aa15abe3ac1fbe79af3ee59";

const SHOWN_KEY = "exit_offer_shown";
const ACCEPTED_KEY = "exit_offer_accepted";
const CHECKOUT_CLICK_KEY = "has_clicked_checkout";
const PURCHASE_KEY = "purchase_completed";

/** Reuse the tracking already installed on the page (Meta Pixel / dataLayer). No new install. */
function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  try {
    w.fbq?.("trackCustom", event, params ?? {});
    w.dataLayer?.push({ event, ...(params ?? {}) });
  } catch {
    /* tracking must never break the page */
  }
}

function sessionFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function setSessionFlag(key: string) {
  try {
    sessionStorage.setItem(key, "true");
  } catch {
    /* storage may be blocked */
  }
}

export function ExitIntentPopup({ checkoutUrl }: { checkoutUrl: string }) {
  const [open, setOpen] = useState(false);
  const blockedRef = useRef(false);

  // Any click on a normal-checkout link/button disables the popup for the session.
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("a,button");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      if (href.startsWith(checkoutUrl)) {
        blockedRef.current = true;
        setSessionFlag(CHECKOUT_CLICK_KEY);
        track("checkout_click", { value: 3000, currency: "AOA" });
      }
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [checkoutUrl]);

  const show = useCallback(() => {
    if (blockedRef.current) return;
    if (
      sessionFlag(SHOWN_KEY) ||
      sessionFlag(ACCEPTED_KEY) ||
      sessionFlag(PURCHASE_KEY) ||
      sessionFlag(CHECKOUT_CLICK_KEY)
    )
      return;
    blockedRef.current = true;
    setSessionFlag(SHOWN_KEY);
    setOpen(true);
    track("exit_offer_view", { value: 2000, currency: "AOA" });
  }, []);

  // Exit-intent detection
  useEffect(() => {
    if (
      sessionFlag(SHOWN_KEY) ||
      sessionFlag(ACCEPTED_KEY) ||
      sessionFlag(CHECKOUT_CLICK_KEY)
    ) {
      blockedRef.current = true;
      return;
    }

    track("page_view_lp");

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;

    const cleanups: Array<() => void> = [];
    const armTimer = window.setTimeout(() => {
      if (!isTouch) {
        // Desktop: pointer leaves through the top of the viewport
        const onMouseOut = (e: MouseEvent) => {
          if (e.clientY <= 0 && !e.relatedTarget) show();
        };
        document.addEventListener("mouseout", onMouseOut);
        cleanups.push(() => document.removeEventListener("mouseout", onMouseOut));
      } else {
        // Mobile fallback: needs real interaction (scroll) + abandonment signals
        let interacted = false;
        let lastY = window.scrollY;
        let idleId = 0;

        const onScroll = () => {
          const y = window.scrollY;
          if (y > 300) interacted = true;
          // fast upward scroll towards the top bar = leaving intent
          if (interacted && y < lastY - 90 && y < 400) show();
          lastY = y;
          window.clearTimeout(idleId);
          idleId = window.setTimeout(() => {
            if (interacted) show();
          }, 45000);
        };
        const onVisibility = () => {
          if (document.visibilityState === "hidden" && interacted) show();
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("visibilitychange", onVisibility);
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          document.removeEventListener("visibilitychange", onVisibility);
          window.clearTimeout(idleId);
        });
      }
    }, isTouch ? 20000 : 8000);

    return () => {
      window.clearTimeout(armTimer);
      cleanups.forEach((fn) => fn());
    };
  }, [show]);

  const close = useCallback(() => {
    setOpen(false);
    track("exit_offer_close");
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const accept = () => {
    setSessionFlag(ACCEPTED_KEY);
    track("exit_offer_accept", { value: 2000, currency: "AOA" });
    setOpen(false);
    window.location.href = EXIT_CHECKOUT_URL;
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Condição especial antes de sair"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md max-h-[92dvh] overflow-y-auto rounded-3xl border border-border bg-card p-6 text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 sm:p-8"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-balance pr-6 text-lg font-black uppercase leading-tight tracking-tight text-card-foreground sm:text-2xl">
          🚨 Espera! Antes de sair...
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Talvez ainda estejas a pensar se vale a pena. Por isso, libertámos uma condição
          especial para aproveitares agora:
        </p>

        <div className="mt-5 rounded-2xl bg-blue-soft p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            De <span className="line-through">Kz 3.000</span>
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
            Por apenas
          </p>
          <p className="mt-1 text-4xl font-black leading-none tracking-tight text-primary sm:text-5xl">
            Kz 2.000
          </p>
          <p className="mt-3 inline-block rounded-full bg-cta px-3 py-1 text-xs font-bold uppercase tracking-wide text-cta-foreground">
            Economizas 1.000 Kz
          </p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Aproveita esta condição especial antes de saíres desta página.
        </p>

        <button
          type="button"
          onClick={accept}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-4 text-sm font-black uppercase tracking-wide text-primary-foreground shadow-xl shadow-primary/25 transition hover:bg-primary/90 active:scale-[0.98] sm:text-base"
        >
          <Wallet className="h-5 w-5 shrink-0" />
          Quero aproveitar por 2.000 Kz
        </button>

        <p className="mt-2 text-[11px] text-muted-foreground">
          Condição especial disponível nesta página.
        </p>

        <button
          type="button"
          onClick={close}
          className="mt-4 text-xs font-medium text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
        >
          Não, obrigado. Quero sair.
        </button>
      </div>
    </div>
  );
}
