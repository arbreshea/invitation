import { useEffect, useState } from "react";
import MobileShell from "../../components/layout/MobileShell";
import EnvelopeHero from "../../components/bachelorette/EnvelopeHero";
import BacheloretteTripOverviewSection from "../../components/bachelorette/BacheloretteTripOverviewSection";
import BacheloretteArrivalSection from "../../components/bachelorette/BacheloretteArrivalSection";
import ScrollReveal from "../../components/common/ScrollReveal";
import BacheloretteNightOneWear from "../../components/bachelorette/BacheloretteNightOneWear";
import BacheloretteNightTwoWear from "../../components/bachelorette/BacheloretteNightTwoWear";
import BacheloretteNightOneActivity from "../../components/bachelorette/BacheloretteNightOneActivity";
import BacheloretteDayTwo from "../../components/bachelorette/BacheloretteDayTwo";
import BacheloretteDayTwoActivity from "../../components/bachelorette/BacheloretteDayTwoActivity";
import BacheloretteNightTwoDsp from "../../components/bachelorette/BacheloretteNightTwoDsp";
import BacheloretteNightOneDinner from "../../components/bachelorette/BacheloretteNightOneDinner";
import BacheloretteNightOneDsp from "../../components/bachelorette/BacheloretteNightOneDsp";
import BacheloretteNightTwoDinner from "../../components/bachelorette/BacheloretteNightTwoDinner";
import GoogleMapEmbed from "../../components/map/Location";
import BacheloretteDayThree from "../../components/bachelorette/BacheloretteDayThree";
import InviteRsvpFormBachelorette from "../../components/invite/InviteRsvpFormBachelorette";

export default function BacheloretteInvitePage() {
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          "/.netlify/functions/pending?type=bachelorette",
        );

        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data: { names: string[] } = await res.json();
        if (!cancelled) setNames(data.names);
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
    <MobileShell className="bg-rose-50">
      <div className="min-h-dvh text-white font-playfair">
        <EnvelopeHero />
        <ScrollReveal>
          <BacheloretteTripOverviewSection />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteArrivalSection />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightOneDsp />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightOneWear />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightOneDinner />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightOneActivity />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteDayTwo />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteDayTwoActivity />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightTwoDsp />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightTwoWear />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteNightTwoDinner />
        </ScrollReveal>

        <ScrollReveal delayMs={150}>
          <BacheloretteDayThree />
        </ScrollReveal>

        <GoogleMapEmbed
          borderColor="#264788"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.371081785577!2d19.666745875235787!3d40.267506371464016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135ad7ca6463359d%3A0xb806c4130fd66d6b!2sVilla%20Si%20Era!5e0!3m2!1sen!2s!4v1770125056877!5m2!1sen!2s"
          title="Villa Location"
        />

        <div className="">
          <InviteRsvpFormBachelorette
            eventType="bachelorette"
            names={names}
            onSubmit={async (payload) => {
              const name = payload.name;
              const answer = payload.response;

              await fetch("/.netlify/functions/respond", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  inviteType: "bachelorette",
                  accepted: answer === "YES",
                }),
              });
            }}
          />

          {loading && <p className="mt-4 text-sm text-white/70">Loading…</p>}
        </div>
      </div>
    </MobileShell>
  );
}
