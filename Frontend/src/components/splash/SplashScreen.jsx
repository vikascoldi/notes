import { Component, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


const BRAND_NAME = "Notes";
const INTRO_MS = 2000;
const HOLD_MS = 160;
const EXIT_MS = 650;
const REDUCED_INTRO_MS = 700;
const FAILSAFE_MS = 5000;
const SHOW_ONCE_PER_SESSION = false;
const SESSION_KEY = "notes-splash-seen";

const MESSAGES = [
  { at: 0, text: "Initializing Experience..." },
  { at: 0.27, text: "Preparing Your Workspace..." },
  { at: 0.54, text: "Optimizing Interface..." },
  { at: 0.8, text: "Almost Ready..." },
];

const messageIndexFor = (t) => {
  let index = 0;
  for (let i = 0; i < MESSAGES.length; i += 1) {
    if (t >= MESSAGES[i].at) index = i;
  }
  return index;
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const PARTICLE_COLORS = ["#a855f7", "#3b82f6", "#22d3ee", "#c4b5fd"];

function makeParticles(count) {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      "--x": `${(rand() * 100).toFixed(1)}%`,
      "--y": `${(rand() * 100).toFixed(1)}%`,
      "--s": `${(2 + rand() * 2.8).toFixed(1)}px`,
      "--o": (0.55 + rand() * 0.45).toFixed(2),
      "--d": `${(1.6 + rand() * 1.8).toFixed(2)}s`,
      "--delay": `${(-rand() * 2).toFixed(2)}s`,
      "--dx": `${((rand() - 0.5) * 80).toFixed(0)}px`,
      "--dy": `${(-30 - rand() * 90).toFixed(0)}px`,
      "--c": PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    },
  }));
}

const PARTICLES = makeParticles(28);

function LogoMark() {
  return (
    <svg
      className="relative block h-full w-full overflow-visible"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="splash-grad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="splash-grad-rev" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
        <filter id="splash-glow" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="splash-ring splash-ring-outer">
        <path d="M100 14 L174.5 57 V143 L100 186 L25.5 143 V57 Z" stroke="url(#splash-grad)" strokeWidth="1.5" strokeDasharray="6 8" strokeLinejoin="round" opacity="0.85" />
      </g>
      <g className="splash-ring splash-ring-middle">
        <circle cx="100" cy="100" r="66" stroke="url(#splash-grad-rev)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" opacity="0.9" />
        <circle cx="166" cy="100" r="2.6" fill="#67e8f9" />
        <circle cx="67" cy="157.2" r="2.6" fill="#c084fc" />
        <circle cx="67" cy="42.8" r="2.6" fill="#60a5fa" />
      </g>
      <g className="splash-ring splash-ring-arc">
        <circle cx="100" cy="100" r="76" stroke="url(#splash-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="110 368" />
      </g>
      <g className="splash-logo-core" filter="url(#splash-glow)">
        <path className="splash-draw splash-page" pathLength="100" d="M80 58 H112 L132 78 V130 A12 12 0 0 1 120 142 H80 A12 12 0 0 1 68 130 V70 A12 12 0 0 1 80 58 Z" stroke="url(#splash-grad)" strokeWidth="3" strokeLinejoin="round" />
        <path className="splash-draw splash-fold" pathLength="100" d="M112 58 V72 A6 6 0 0 0 118 78 H132" stroke="url(#splash-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path className="splash-draw splash-line-1" pathLength="100" d="M82 96 H118" stroke="url(#splash-grad)" strokeWidth="3" strokeLinecap="round" />
        <path className="splash-draw splash-line-2" pathLength="100" d="M82 110 H118" stroke="url(#splash-grad)" strokeWidth="3" strokeLinecap="round" />
        <path className="splash-draw splash-line-3" pathLength="100" d="M82 124 H102" stroke="url(#splash-grad)" strokeWidth="3" strokeLinecap="round" />
        <circle className="splash-spark" cx="109" cy="124" r="3.2" fill="#67e8f9" />
      </g>
    </svg>
  );
}

class SplashBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("[SplashScreen] disabled because of an error:", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function shouldShowSplash() {
  if (typeof window === "undefined") return false;
  if (!SHOW_ONCE_PER_SESSION) return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

function SplashOverlay({ onDone }) {
  const [phase, setPhase] = useState("loading");
  const [messageIndex, setMessageIndex] = useState(0);
  const fillRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    const introMs = reduceMotion ? REDUCED_INTRO_MS : INTRO_MS;
    const exitMs = reduceMotion ? 0 : EXIT_MS;
    const appRoot = document.getElementById("root");
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousInert = appRoot?.inert ?? false;

    let raf = 0;
    let holdTimer = 0;
    let exitTimer = 0;
    let failsafeTimer = 0;
    let finished = false;
    let lastPercent = -1;
    let lastMessage = 0;

    const unlockApp = () => {
      body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previousInert;
    };

    const cleanup = () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(failsafeTimer);
      unlockApp();
    };

    const paint = (value, t) => {
      const percent = Math.min(100, Math.round(value));
      if (fillRef.current) {
        fillRef.current.style.transform = `translate3d(${value - 100}%, 0, 0)`;
      }
      const nextMessage = messageIndexFor(t);
      if (nextMessage !== lastMessage) {
        lastMessage = nextMessage;
        setMessageIndex(nextMessage);
      }
      if (percent === lastPercent) return;
      lastPercent = percent;
      if (countRef.current) countRef.current.textContent = String(percent);
    };

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(failsafeTimer);
      unlockApp();
      if (exitMs > 0) {
        setPhase("exiting");
        exitTimer = setTimeout(onDone, exitMs + 50);
      } else {
        onDone();
      }
      try {
        paint(100, 1);
      } catch {
        // Ignore errors while the splash is being removed.
      }
    };

    try {
      body.style.overflow = "hidden";
      if (appRoot) appRoot.inert = true;

      if (SHOW_ONCE_PER_SESSION) {
        try {
          window.sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // Ignore blocked storage.
        }
      }

      failsafeTimer = setTimeout(finish, FAILSAFE_MS);
      const start = performance.now();

      const tick = (now) => {
        try {
          const t = Math.min(Math.max((now - start) / introMs, 0), 1);
          paint(easeInOutCubic(t) * 100, t);
          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            holdTimer = setTimeout(finish, reduceMotion ? 0 : HOLD_MS);
          }
        } catch {
          finish();
        }
      };

      raf = requestAnimationFrame(tick);
    } catch {
      cleanup();
      onDone();
    }

    return cleanup;
  }, [onDone]);

  return createPortal(
    <div
      className="group fixed inset-0 z-[10000] grid place-items-center overflow-hidden bg-[#05060f] text-[#e6ebff] antialiased transition-opacity duration-[650ms] ease-out data-[phase=exiting]:pointer-events-none data-[phase=exiting]:opacity-0"
      data-phase={phase}
      role="status"
      style={{ "--splash-exit": `${EXIT_MS}ms`, fontFamily: 'var(--font-sans, "Space Grotesk"), ui-sans-serif, system-ui, sans-serif' }}
    >
      <span className="absolute m-[-1px] h-px w-px overflow-hidden whitespace-nowrap [clip:rect(0,0,0,0)]">
        Loading {BRAND_NAME}, please wait…
      </span>

      <div className="splash-bg absolute inset-0 transition-transform duration-[650ms] ease-in-out group-data-[phase=exiting]:scale-[1.12]" aria-hidden="true">
        <div className="splash-aurora splash-aurora-a pointer-events-none absolute rounded-full" />
        <div className="splash-aurora splash-aurora-b pointer-events-none absolute rounded-full" />
        <div className="splash-aurora splash-aurora-c pointer-events-none absolute rounded-full" />
        <div className="splash-grid-mask absolute inset-0">
          <div className="splash-grid absolute inset-[-48px]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {PARTICLES.map((particle) => (
          <span
            key={particle.id}
            className="splash-particle absolute rounded-full"
            style={particle.style}
          />
        ))}
      </div>

      <span className="splash-corner splash-corner-tl absolute" aria-hidden="true" />
      <span className="splash-corner splash-corner-tr absolute" aria-hidden="true" />
      <span className="splash-corner splash-corner-bl absolute" aria-hidden="true" />
      <span className="splash-corner splash-corner-br absolute" aria-hidden="true" />

      <div className="relative z-[2] flex w-full max-w-[440px] flex-col items-center px-6 py-6 text-center transition-[transform,opacity] duration-[650ms] data-[phase=exiting]:scale-[1.8] data-[phase=exiting]:opacity-0" data-phase={phase}>
        <div className="relative mb-[clamp(16px,3.5vmin,28px)] aspect-square w-[clamp(150px,32vmin,232px)]">
          <div className="splash-halo absolute inset-[-30%] rounded-full" />
          <LogoMark />
        </div>

        <div className="mb-[clamp(10px,2vmin,16px)] animate-[splash-rise_.8s_ease-out_.35s_backwards] bg-gradient-to-b from-white to-indigo-200 bg-clip-text text-[clamp(1.25rem,3vmin+0.6rem,1.75rem)] font-semibold uppercase leading-tight tracking-[0.38em] text-transparent">
          {BRAND_NAME}
        </div>

        <div key={messageIndex} className="min-h-[1.5em] animate-[splash-rise_.35s_ease-out_backwards] text-center text-[clamp(.8rem,1.6vmin+.4rem,1rem)] leading-relaxed tracking-[0.06em] text-indigo-100/80">
          {MESSAGES[messageIndex].text}
        </div>

        <div className="mt-[clamp(16px,3.2vmin,26px)] w-full max-w-[340px] animate-[splash-rise_.8s_ease-out_.5s_backwards]">
          <div className="relative h-1 overflow-visible rounded-full bg-indigo-300/15 [clip-path:inset(-16px_-16px_-16px_0)]">
            <div ref={fillRef} className="splash-progress-fill absolute inset-0 rounded-full" />
          </div>
          <div className="mt-3.5 flex items-baseline justify-center gap-[3px] text-[clamp(1.5rem,4vmin+.5rem,2rem)] font-medium leading-none tracking-[-0.02em] tabular-nums">
            <span ref={countRef} className="min-w-[3ch] text-right text-indigo-50 [text-shadow:0_0_18px_rgba(129,140,248,.6)]">0</span>
            <span className="text-[.55em] font-semibold text-cyan-200/90">%</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(shouldShowSplash);
  const handleDone = useCallback(() => setVisible(false), []);

  if (!visible) return null;

  return (
    <SplashBoundary>
      <SplashOverlay onDone={handleDone} />
    </SplashBoundary>
  );
}
