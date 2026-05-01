import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, useMotionValueEvent, motion } from "framer-motion";
import { Preloader } from "./Preloader";

const FRAME_COUNT = 102;
const FRAME_URL = (i: number) =>
  `https://raw.githubusercontent.com/learcode1/framesswag/main/frame_${i
    .toString()
    .padStart(3, "0")}.webp`;

const COLOR_FLIP_FRAME = 52;

type FrameSource = ImageBitmap | HTMLImageElement;

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<(FrameSource | null)[]>(new Array(FRAME_COUNT).fill(null));
  const targetFrameRef = useRef<number>(0);
  const drawnFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);

  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [textWhite, setTextWhite] = useState(false);
  const [frameLabel, setFrameLabel] = useState(1);

  // ---------- Preload (decode + ImageBitmap) ----------
  useEffect(() => {
    let cancelled = false;
    let count = 0;
    const supportsBitmap = typeof createImageBitmap === "function";

    const loadOne = async (i: number) => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.decoding = "async";
        img.src = FRAME_URL(i);

        if (typeof img.decode === "function") {
          await img.decode();
        } else {
          await new Promise<void>((res, rej) => {
            img.onload = () => res();
            img.onerror = () => rej(new Error("img load fail"));
          });
        }

        let source: FrameSource = img;
        if (supportsBitmap) {
          try {
            source = await createImageBitmap(img);
          } catch {
            source = img;
          }
        }

        if (cancelled) {
          if (source instanceof ImageBitmap) source.close();
          return;
        }
        framesRef.current[i] = source;
      } catch {
        // skip broken frame
      } finally {
        if (!cancelled) {
          count++;
          setLoaded(count);
          if (count === FRAME_COUNT) setReady(true);
        }
      }
    };

    const CONCURRENCY = 8;
    let nextIdx = 0;
    const workers = Array.from({ length: CONCURRENCY }).map(async () => {
      while (!cancelled) {
        const i = nextIdx++;
        if (i >= FRAME_COUNT) return;
        await loadOne(i);
      }
    });
    void Promise.all(workers);

    return () => {
      cancelled = true;
      framesRef.current.forEach((f) => {
        if (f && f instanceof ImageBitmap) f.close();
      });
      framesRef.current = new Array(FRAME_COUNT).fill(null);
    };
  }, []);

  // ---------- Single resize listener ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const applySize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Always full DPR — quality first, no dynamic downscaling.
      const effDpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { w, h };

      canvas.width = Math.max(1, Math.floor(w * effDpr));
      canvas.height = Math.max(1, Math.floor(h * effDpr));
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.setTransform(effDpr, 0, 0, effDpr, 0, 0);
      }
      drawnFrameRef.current = -1;
    };

    applySize();
    window.addEventListener("resize", applySize);
    return () => window.removeEventListener("resize", applySize);
  }, []);

  // ---------- rAF render loop ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrameInternal = (idx: number) => {
      const i = Math.max(0, Math.min(FRAME_COUNT - 1, idx | 0));
      let src = framesRef.current[i];
      if (!src) {
        for (let off = 1; off < FRAME_COUNT; off++) {
          src = framesRef.current[i - off] ?? framesRef.current[i + off] ?? null;
          if (src) break;
        }
        if (!src) return;
      }

      const { w: cw, h: ch } = sizeRef.current;
      const iw = (src as ImageBitmap).width || (src as HTMLImageElement).naturalWidth;
      const ih = (src as ImageBitmap).height || (src as HTMLImageElement).naturalHeight;
      if (!iw || !ih || !cw || !ch) return;

      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(src as CanvasImageSource, dx, dy, dw, dh);
      drawnFrameRef.current = i;
    };

    const tick = () => {
      const target = targetFrameRef.current;
      if ((target | 0) !== drawnFrameRef.current) {
        drawFrameInternal(target);
        const lbl = (target | 0) + 1;
        setFrameLabel((prev) => (prev !== lbl ? lbl : prev));
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ---------- Scroll → spring ----------
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrame = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const smoothFrame = useSpring(rawFrame, {
    damping: 60,
    stiffness: 90,
    mass: 0.45,
    restDelta: 0.01,
  });

  useMotionValueEvent(smoothFrame, "change", (v) => {
    targetFrameRef.current = v;
    const shouldWhite = v >= COLOR_FLIP_FRAME;
    setTextWhite((prev) => (prev !== shouldWhite ? shouldWhite : prev));
  });

  return (
    <>
      <Preloader progress={(loaded / FRAME_COUNT) * 100} done={ready} />

      <section
        ref={containerRef}
        className="relative w-full"
        style={{ height: "500vh" }}
        aria-label="YOU ARE NOT ALONE"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
              display: "block",
              willChange: "contents",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          />

          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
          <div className="absolute inset-0 pointer-events-none grain" />

          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 md:px-10 py-5">
            <div
              className={`font-tag text-base md:text-lg tracking-[0.3em] skew-tag transition-colors duration-700 ${
                textWhite ? "text-white" : "text-black"
              }`}
            >
              SWAGLABEL
            </div>
            <div
              className={`font-marker text-[10px] md:text-xs tracking-[0.3em] transition-colors duration-700 ${
                textWhite ? "text-white/70" : "text-black/70"
              }`}
            >
              DROP / 01.04.2026
            </div>
          </div>

          <div className="absolute inset-0 z-10 flex items-end md:items-center">
            <h1
              className={`px-5 md:px-12 pb-24 md:pb-0 font-sans font-black leading-[0.85] tracking-tight transition-colors duration-700 select-none ${
                textWhite ? "text-white" : "text-black"
              }`}
              style={{ fontSize: "clamp(1.5rem, 8vw, 6rem)" }}
            >
              <span className="block -rotate-1">YOU</span>
              <span className="block translate-x-2 md:translate-x-6 rotate-1">ARE NOT</span>
              <span className="block font-sans font-black -rotate-2">ALONE</span>
            </h1>
          </div>

          <motion.div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-marker text-[10px] tracking-[0.4em] transition-colors duration-700 ${
              textWhite ? "text-white/60" : "text-black/60"
            }`}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            ↓ ROLE ↓
          </motion.div>

          <div
            className={`absolute bottom-5 right-5 z-20 font-marker text-[10px] tracking-widest transition-colors duration-700 ${
              textWhite ? "text-white/40" : "text-black/40"
            }`}
          >
            FRAME {String(frameLabel).padStart(3, "0")} / 102
          </div>
        </div>
      </section>
    </>
  );
}
