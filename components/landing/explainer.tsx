"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ease } from "@/components/app/ui";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** The explainer video, with a cover that hands off to native controls on play. */
export function Explainer() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    video.current?.play();
  };

  return (
    <figure className="relative overflow-hidden rounded-[22px] border border-white/10 bg-bg-2 shadow-[0_2px_4px_rgba(0,0,0,0.3),0_30px_80px_-30px_rgba(46,107,255,0.45)]">
      <video
        ref={video}
        className="block aspect-[852/480] w-full bg-black"
        poster={`${base}/video/pinpoint-explainer-poster.webp`}
        preload="metadata"
        playsInline
        controls={started}
        onPlay={() => setStarted(true)}
        aria-label="Pinpoint explainer video"
      >
        <source src={`${base}/video/pinpoint-explainer.mp4`} type="video/mp4" />
        <source src={`${base}/video/pinpoint-explainer.webm`} type="video/webm" />
      </video>
      <AnimatePresence>
        {!started && (
          <motion.button
            type="button"
            onClick={play}
            initial={false}
            exit={{ opacity: 0, transition: { duration: 0.16, ease } }}
            whileTap={{ scale: 0.97 }}
            className="group absolute inset-0 grid place-items-center bg-[linear-gradient(180deg,rgba(5,6,13,0)_40%,rgba(5,6,13,0.75))]"
            aria-label="Play the Pinpoint explainer video, 2 minutes 25 seconds"
          >
            <span className="grid size-[72px] place-items-center rounded-full bg-white/90 text-bg shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l10.5-6.5z" />
              </svg>
            </span>
            <span className="absolute bottom-4 left-5 text-left">
              <span className="block text-[15px] font-medium text-white">Watch the Explainer</span>
              <span className="block text-[13px] tabular-nums text-white/70">2:25</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </figure>
  );
}
