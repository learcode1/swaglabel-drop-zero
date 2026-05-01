import { useEffect, useState } from "react";

interface PreloaderProps {
  progress: number;
  done: boolean;
}

export function Preloader({ progress, done }: PreloaderProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setHide(true), 600);
      return () => clearTimeout(t);
    }
  }, [done]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500 grain ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8 px-6 w-full max-w-md">
        {/* Logo placeholder */}
        <div className="font-tag text-2xl md:text-3xl tracking-[0.3em] text-white skew-tag">
          SWAGLABEL
        </div>

        <div className="w-full">
          <div className="flex justify-between items-end mb-3 font-marker text-white/80">
            <span className="text-xs tracking-widest">LOADING DROP</span>
            <span className="text-3xl font-street tabular-nums">
              {Math.floor(progress)}%
            </span>
          </div>
          <div className="h-[2px] w-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-[10px] tracking-[0.3em] text-white/40 font-marker">
            YOU ARE NOT ALONE — 102 FRAMES
          </div>
        </div>
      </div>
    </div>
  );
}
