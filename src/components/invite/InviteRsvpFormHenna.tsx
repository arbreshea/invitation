import { useEffect, useMemo, useRef, useState } from "react";

type InviteRsvpFormProps = {
  eventType: "bachelorette" | "wedding" | "henna";
  names: string[];
  onSubmit?: (payload: {
    eventType: string;
    name: string;
    response: "YES" | "NO";
  }) => void;
};

export default function InviteRsvpForm({
  eventType,
  names,
  onSubmit,
}: InviteRsvpFormProps) {
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState<"YES" | "NO" | "">("");
  const [submittedMsg, setSubmittedMsg] = useState<string>("");

  const comboRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      const el = comboRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsOpen(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return names;
    return names.filter((n) => n.toLowerCase().includes(q));
  }, [query, names]);

  function pickName(name: string) {
    setSelectedName(name);
    setQuery(name);
    setIsOpen(false);
  }

  function handleSubmit() {
    if (!selectedName || !response) return;

    const msg =
      response === "YES"
        ? `${selectedName} konfirmoi pjesëmarrjen.`
        : `${selectedName} nuk mund të vijë.`;

    setSubmittedMsg(msg);

    onSubmit?.({
      eventType,
      name: selectedName,
      response: response as "YES" | "NO",
    });

    setSelectedName("");
    setQuery("");
    setResponse("");
    setIsOpen(false);
  }

  const canSubmit = !!selectedName && !!response;

  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-130 rounded-[28px] border border-[#7a1f2b]/20 bg-white/75 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <div className="px-6 pt-7 pb-5 text-center">
          <h2 className="mt-1 font-playfair text-[#7a1f2b] text-[22px] italic">
            Konfirmo pjesëmarrjen
          </h2>
          <p className="mt-2 text-[13px] text-[#7a1f2b]/70 leading-relaxed">
            Zgjidh emrin dhe na trego nëse vjen.
          </p>
        </div>

        {/* Body */}
        <div className="px-6 pb-7">
          {/* Name combobox */}
          <div className="mt-2">
            <label className="text-[12px] tracking-[0.18em] uppercase text-[#7a1f2b]/70">
              Emri
            </label>

            <div ref={comboRef} className="relative mt-2">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedName("");
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="Kërko emrin…"
                className="w-full rounded-2xl border border-[#7a1f2b]/20 bg-white/80 px-4 py-3 text-[14px] text-[#7a1f2b] shadow-sm outline-none placeholder:text-[#7a1f2b]/40 focus:border-[#7a1f2b]/35 focus:ring-4 focus:ring-[#ffc5d3]/35"
              />

              {isOpen && filtered.length > 0 && (
                <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-[#7a1f2b]/15 bg-white/95 p-1 shadow-xl backdrop-blur">
                  {filtered.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => pickName(n)}
                      className="w-full rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold text-[#7a1f2b] hover:bg-[#ffc5d3]/25"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}

              {isOpen && filtered.length === 0 && (
                <div className="absolute z-20 mt-2 w-full rounded-2xl border border-[#7a1f2b]/15 bg-white/95 p-3 text-[13px] text-[#7a1f2b]/65 shadow-xl backdrop-blur">
                  Asnjë rezultat.
                </div>
              )}
            </div>
          </div>

          {/* Yes / No */}
          <div className="mt-6">
            <label className="text-[12px] tracking-[0.18em] uppercase text-[#7a1f2b]/70">
              A vjen?
            </label>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setResponse("YES")}
                className={[
                  "rounded-2xl px-4 py-3 border transition text-[16px] font-playfair",
                  response === "YES"
                    ? "border-[#7a1f2b]/35 bg-[#ffc5d3]/55 text-[#7a1f2b] shadow-sm"
                    : "border-[#7a1f2b]/20 bg-white/60 text-[#7a1f2b] hover:border-[#7a1f2b]/35 hover:bg-[#ffc5d3]/30",
                ].join(" ")}
              >
                Po
              </button>

              <button
                type="button"
                onClick={() => setResponse("NO")}
                className={[
                  "rounded-2xl px-4 py-3 border transition text-[16px] font-playfair",
                  response === "NO"
                    ? "border-[#7a1f2b]/35 bg-[#ffc5d3]/55 text-[#7a1f2b] shadow-sm"
                    : "border-[#7a1f2b]/20 bg-white/60 text-[#7a1f2b] hover:border-[#7a1f2b]/35 hover:bg-[#ffc5d3]/30",
                ].join(" ")}
              >
                Jo
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={[
              "mt-6 w-full rounded-2xl px-4 py-3.5 text-[14px] tracking-[0.18em] uppercase transition",
              "shadow-sm",
              canSubmit
                ? "bg-[#7a1f2b] text-white hover:bg-[#661621]"
                : "bg-[#7a1f2b]/35 text-white/90 cursor-not-allowed",
            ].join(" ")}
          >
            Dërgo
          </button>

          {/* Success msg */}
          {submittedMsg && (
            <p className="mt-4 rounded-2xl border border-[#7a1f2b]/15 bg-white/75 p-3 text-[13px] font-semibold text-[#7a1f2b] shadow-sm">
              {submittedMsg}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
