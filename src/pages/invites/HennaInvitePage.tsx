import { useEffect, useMemo, useState } from "react";
import MobileShell from "../../components/layout/MobileShell";
import GoogleMapEmbed from "../../components/map/Location";
import MainSection from "../../assets/henna/mainSection.svg";
import InviteDetails from "../../assets/henna/inviteDetails.svg";
import InviteRsvpFormHenna from "../../components/invite/InviteRsvpFormHenna";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function getCountdownParts(target: Date): CountdownParts {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: false };
}

function Countdown({ target }: { target: Date }) {
  const [parts, setParts] = useState<CountdownParts>(() =>
    getCountdownParts(target),
  );

  useEffect(() => {
    const t = window.setInterval(() => {
      setParts(getCountdownParts(target));
    }, 1000);

    return () => window.clearInterval(t);
  }, [target]);

  const pad2 = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full px-5 py-8">
      <div className="mx-auto max-w-130 rounded-[28px] border border-[#7a1f2b]/25 bg-white/75 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="px-6 pt-6 pb-4 text-center">
          <p className="text-[#7a1f2b]/80 tracking-[0.22em] uppercase text-[11px]">
            Koha
          </p>
          <p className="mt-1 text-[#7a1f2b] text-[18px] font-playfair italic">
            Deri me 29 Gusht 2026
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-2xl border border-[#7a1f2b]/20 bg-white/80 px-3 py-4 text-center">
              <div className="text-[#7a1f2b] font-playfair text-[28px] leading-none">
                {parts.days}
              </div>
              <div className="mt-2 text-[#7a1f2b]/75 text-[11px] tracking-[0.22em] uppercase">
                DITË
              </div>
            </div>

            <div className="rounded-2xl border border-[#7a1f2b]/20 bg-white/80 px-3 py-4 text-center">
              <div className="text-[#7a1f2b] font-playfair text-[28px] leading-none">
                {pad2(parts.hours)}
              </div>
              <div className="mt-2 text-[#7a1f2b]/75 text-[11px] tracking-[0.22em] uppercase">
                ORË
              </div>
            </div>

            <div className="rounded-2xl border border-[#7a1f2b]/20 bg-white/80 px-3 py-4 text-center">
              <div className="text-[#7a1f2b] font-playfair text-[28px] leading-none">
                {pad2(parts.minutes)}
              </div>
              <div className="mt-2 text-[#7a1f2b]/75 text-[11px] tracking-[0.22em] uppercase">
                MIN
              </div>
            </div>

            <div className="rounded-2xl border border-[#7a1f2b]/20 bg-white/80 px-3 py-4 text-center">
              <div className="text-[#7a1f2b] font-playfair text-[28px] leading-none">
                {pad2(parts.seconds)}
              </div>
              <div className="mt-2 text-[#7a1f2b]/75 text-[11px] tracking-[0.22em] uppercase">
                SEK
              </div>
            </div>
          </div>

          {parts.done && (
            <p className="mt-4 text-center text-[#7a1f2b]/75 text-sm">
              Është koha! ❤️
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** ✅ preload helper */
function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export default function HennaInvitePage() {
  const [names, setNames] = useState<string[]>([]);
  const [loadingNames, setLoadingNames] = useState(true);

  const [assetsReady, setAssetsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadNames() {
      try {
        const res = await fetch("/.netlify/functions/pending?type=henna");
        if (!res.ok) throw new Error(`Failed: ${res.status}`);

        const data: { names: string[] } = await res.json();
        if (!cancelled) setNames(data.names);
      } catch (e) {
        console.error(e);
        if (!cancelled) setNames([]);
      } finally {
        if (!cancelled) setLoadingNames(false);
      }
    }

    loadNames();
    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ preload the SVG images before rendering the page
  useEffect(() => {
    let cancelled = false;

    async function preloadAssets() {
      try {
        await Promise.all([
          preloadImage(MainSection),
          preloadImage(InviteDetails),
        ]);
      } catch (e) {
        // even if preload fails, don't block forever
        console.error(e);
      } finally {
        if (!cancelled) setAssetsReady(true);
      }
    }

    preloadAssets();
    return () => {
      cancelled = true;
    };
  }, []);

  // 29 Aug 2026 @ 19:00 (local)
  const targetDate = useMemo(() => new Date(2026, 7, 29, 19, 0, 0), []);

  const pageReady = assetsReady; // (you can also require !loadingNames if you want)

  return (
    <MobileShell className="bg-white">
      {!pageReady ? (
        <div className="min-h-dvh flex items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 rounded-full border-2 border-[#7a1f2b]/30 border-t-[#7a1f2b] animate-spin" />
            <p className="mt-4 text-[#7a1f2b]/80 font-playfair">
              Duke u ngarkuar…
            </p>
          </div>
        </div>
      ) : (
        <div className="min-h-dvh text-white font-playfair">
          <div className="relative w-full">
            <img
              src={MainSection}
              alt="Henna invitation"
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />

            <a
              href="#details"
              aria-label="Kliko per detaje"
              className="absolute"
              style={{
                left: "56%",
                top: "68%",
                width: "40%",
                height: "14%",
                borderRadius: "9999px",
              }}
            />
            <a
              href="#rsvp"
              aria-label="Konfirmo pjesemarrjen"
              className="absolute"
              style={{
                left: "12%",
                top: "82%",
                width: "55%",
                height: "12%",
              }}
            />
          </div>

          <div id="details">
            <img
              src={InviteDetails}
              alt="Henna invitation details"
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
            />
          </div>

          <Countdown target={targetDate} />

          <div>
            <GoogleMapEmbed
              borderColor="#ffc5d3"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2941.9335666100487!2d21.515630675374126!3d42.4929649711808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1354edee8b39e28d%3A0xf7956dbfdca5b9fc!2sGaja%20Venue!5e0!3m2!1sen!2s!4v1770796890289!5m2!1sen!2s"
              title="Restaurant Location"
            />
          </div>

          <div id="rsvp">
            <InviteRsvpFormHenna
              eventType="henna"
              names={names}
              onSubmit={async (payload) => {
                await fetch("/.netlify/functions/respond", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: payload.name,
                    inviteType: "henna",
                    accepted: payload.response === "YES",
                  }),
                });
              }}
            />

            {loadingNames && (
              <p className="mt-4 text-sm text-white/70">Loading…</p>
            )}
          </div>
        </div>
      )}
    </MobileShell>
  );
}
