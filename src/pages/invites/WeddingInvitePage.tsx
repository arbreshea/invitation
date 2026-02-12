import { useEffect, useState } from "react";
import MobileShell from "../../components/layout/MobileShell";
import InviteRsvpFormBachelorette from "../../components/invite/InviteRsvpFormBachelorette";

export default function WeddingInvitePage() {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("http://localhost:5050/pending?type=wedding");
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data: Array<{ name: string }> = await res.json();
        if (!cancelled) setNames(data.map((x) => x.name));
      } catch (e) {
        console.error(e);
        if (!cancelled) setNames([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <MobileShell>
      <div className="min-h-dvh p-6 text-white">
        <InviteRsvpFormBachelorette
          eventType="wedding"
          names={names}
          onSubmit={async (payload) => {
            const name = payload.name;
            const answer = payload.response;

            await fetch("http://localhost:5050/respond", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                inviteType: "wedding",
                accepted: answer === "YES",
              }),
            });
          }}
        />
        {loading && <p className="mt-4 text-sm text-white/70">Loading…</p>}
      </div>
    </MobileShell>
  );
}
