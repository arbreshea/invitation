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
        ? `${selectedName} accepted the invitation.`
        : `${selectedName} declined the invitation.`;

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

  return (
    <div className="bg-linear-to-b from-amber-50 to-rose-50 py-6 px-3 text-[#264788]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-200/35 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-rose-200/25 blur-2xl" />

      <div className="relative">
        <h2 className="font-pacifico text-xl text-[#264788]">
          Confirm attendance
        </h2>

        <p className="mt-1 text-sm text-[#264788]/80">
          Choose your name and let us know if you’re coming.
        </p>

        {/* Name combobox */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-[#264788]">
            Name <span className="text-[#264788]">*</span>
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
              placeholder="Search name..."
              className="w-full rounded-2xl border border-[#264788]/15 bg-white/80 px-4 py-3 text-base text-[#264788] shadow-sm outline-none placeholder:text-[#264788]/45 focus:border-[#264788]/35 focus:ring-4 focus:ring-amber-200/35"
            />

            {isOpen && filtered.length > 0 && (
              <div className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-[#264788]/15 bg-white/95 p-1 shadow-xl backdrop-blur">
                {filtered.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => pickName(n)}
                    className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#264788] hover:bg-amber-50"
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}

            {isOpen && filtered.length === 0 && (
              <div className="absolute z-20 mt-2 w-full rounded-2xl border border-[#264788]/15 bg-white/95 p-3 text-sm text-[#264788]/70 shadow-xl backdrop-blur">
                No results.
              </div>
            )}
          </div>
        </div>

        {/* Yes / No */}
        <div className="mt-5">
          <label className="text-sm font-semibold text-[#264788]">
            Will you come? <span className="text-[#264788]">*</span>
          </label>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setResponse("YES")}
              className={[
                "font-pacifico rounded-2xl px-4 py-3 text-lg border transition",
                response === "YES"
                  ? "border-amber-300 bg-amber-200 text-[#264788] shadow-sm"
                  : "border-[#264788]/15 bg-amber-100/70 text-[#264788] hover:border-amber-300 hover:bg-amber-100",
              ].join(" ")}
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => setResponse("NO")}
              className={[
                "font-pacifico rounded-2xl px-4 py-3 text-lg border transition",
                response === "NO"
                  ? "border-amber-300 bg-amber-200 text-[#264788] shadow-sm"
                  : "border-[#264788]/15 bg-amber-100/70 text-[#264788] hover:border-amber-300 hover:bg-amber-100",
              ].join(" ")}
            >
              No
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedName || !response}
          className="mt-6 w-full rounded-2xl bg-[#264788] px-4 py-3.5 text-base font-extrabold text-white shadow-sm transition disabled:opacity-40 disabled:shadow-none"
        >
          Submit
        </button>

        {submittedMsg && (
          <p className="mt-4 rounded-2xl border border-[#264788]/15 bg-white/75 p-3 text-sm font-semibold text-[#264788] shadow-sm">
            {submittedMsg}
          </p>
        )}
      </div>
    </div>
  );
}
