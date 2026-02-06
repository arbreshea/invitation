import { useState } from "react";

import bacheloretteClosedEnvelope from "../../assets/bachelorette/bacheloretteClosedEnvelope.png";
import bacheloretteOpenedEnvelope from "../../assets/bachelorette/bacheloretteOpenedEnvelope.png";
import backgroundPool from "../../assets/bachelorette/backgroundPool.png";

export default function EnvelopeHero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative flex min-h-dvh  overflow-hidden px-6 pt-60 "
      style={{
        backgroundImage: `url(${backgroundPool})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* soft overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      {/* Center container */}
      <div className="relative w-full max-w-md -translate-y-10">
        <div className="relative w-full">
          {/* keep aspect ratio so no layout jump */}
          <div className="relative w-full pb-[95%]" />

          {/* CLOSED ENVELOPE */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            disabled={isOpen}
            className={[
              "absolute inset-0 w-full",
              "transition-all duration-1400 ease-in-out",
              isOpen
                ? "pointer-events-none translate-y-2 scale-[0.98] opacity-0"
                : "translate-y-0 scale-100 opacity-100 hover:scale-[1.01]",
            ].join(" ")}
            aria-label="Open invitation"
          >
            <img
              src={bacheloretteClosedEnvelope}
              alt="Bachelorette invite envelope (closed)"
              className=" select-none object-contain"
              draggable={false}
            />
          </button>

          {/* OPENED ENVELOPE (slides from below into same position) */}
          <div
            className={[
              "absolute inset-0 w-full",
              "transition-all duration-1400 ease-in-out",
              isOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none translate-y-8 scale-[0.98] opacity-0",
            ].join(" ")}
          >
            <img
              src={bacheloretteOpenedEnvelope}
              alt="Bachelorette invite envelope (opened)"
              className=" select-none object-contain"
              draggable={false}
            />
          </div>
        </div>

        {!isOpen && (
          <p className="mt-20 text-center text-sm font-medium">
            <span className="inline-block  px-3 py-1 text-slate-900  backdrop-blur-sm">
              Tap the envelope to open
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
