import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Menu, Settings as SettingsIcon, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MosqueIcon } from "@/components/MosqueIcon";
import { storage } from "@/lib/storage";
import { PRAYERS, FAST, getCurrentAndNext, formatHijri } from "@/lib/prayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masjid-E-Maraj — Prayer Times Siddipet" },
      { name: "description", content: "Daily prayer times, Ayah, Quran and Tasbeeh for Masjid-E-Maraj, Siddipet." },
    ],
  }),
  component: () => (
    <AppShell>
      <Home />
    </AppShell>
  ),
});

function Home() {
  const [now, setNow] = useState(new Date());
  const [name, setName] = useState("");

  useEffect(() => {
    setName(storage.get("user_name", "Friend"));
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const { currentIdx, nextIdx, next, minutesUntilNext } = getCurrentAndNext(now);
  const hours = Math.floor(minutesUntilNext / 60);
  const mins = minutesUntilNext % 60;
  const countdown = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

  return (
    <div className="px-5 pt-6">
      {/* Top bar */}
      <header className="flex items-center justify-between mb-6">
        <button className="h-10 w-10 rounded-full bg-card shadow-soft grid place-items-center text-foreground" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          <button className="h-10 w-10 rounded-full bg-card shadow-soft grid place-items-center text-foreground" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <Link to="/settings" className="h-10 w-10 rounded-full bg-card shadow-soft grid place-items-center text-foreground">
            <SettingsIcon className="h-5 w-5" />
          </Link>
        </div>
      </header>

      {/* Mosque header */}
      <section className="text-center mb-6">
        <div className="mx-auto inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-brown text-brown-foreground shadow-card mb-3">
          <MosqueIcon className="h-10 w-10" />
        </div>
        <h1 className="text-xl font-bold tracking-wide text-primary">MASJID-E-MARAJ</h1>
        <p className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="h-3 w-3" /> Kallakunta Colony, Siddipet
        </p>
        <p className="mt-3 text-sm font-medium text-foreground">
          {now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
        <p className="text-xs text-muted-foreground">{formatHijri(now)}</p>
      </section>

      {/* Greeting */}
      <div className="mb-4 px-1">
        <p className="font-arabic text-base text-primary">السلام عليكم</p>
        <p className="text-sm text-foreground">Assalamu Alaikum, <span className="font-semibold">{name}</span></p>
      </div>

      {/* Next prayer hero */}
      <section className="rounded-3xl bg-gradient-coral text-coral-foreground p-5 shadow-coral mb-5">
        <p className="text-xs uppercase tracking-widest opacity-90">Next Salah</p>
        <div className="flex items-end justify-between mt-1">
          <div>
            <h2 className="text-3xl font-bold">{next.name}</h2>
            <p className="text-sm opacity-90">at {next.time}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{countdown}</p>
            <p className="text-xs opacity-90">remaining</p>
          </div>
        </div>
      </section>

      {/* Fast section */}
      <section className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
          <p className="text-xs text-muted-foreground">Fast Begins</p>
          <p className="text-lg font-bold text-foreground mt-1">{FAST.begins}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
          <p className="text-xs text-muted-foreground">Fast Ends</p>
          <p className="text-lg font-bold text-foreground mt-1">{FAST.ends}</p>
        </div>
      </section>

      {/* Prayer times card */}
      <section className="rounded-3xl bg-gradient-brown text-brown-foreground p-2 shadow-card mb-5 overflow-hidden">
        <div className="flex justify-between px-4 py-2 text-xs uppercase tracking-wider opacity-80">
          <span>Prayer</span>
          <span>Time</span>
        </div>
        <ul className="bg-card/5 rounded-2xl divide-y divide-white/10">
          {PRAYERS.map((p, i) => {
            const active = i === currentIdx;
            const upcoming = i === nextIdx;
            return (
              <li
                key={p.name}
                className={`flex items-center justify-between px-4 py-3 ${
                  active ? "bg-white/15" : upcoming ? "bg-white/8" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{p.icon}</span>
                  <span className="font-semibold">{p.name}</span>
                  {active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-coral text-coral-foreground">NOW</span>}
                  {upcoming && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20">NEXT</span>}
                </div>
                <span className="font-mono text-sm">{p.time}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Jamaat + Donation */}
      <section className="flex items-center justify-between bg-card rounded-3xl p-5 shadow-soft border border-border/50 mb-6">
        <div>
          <p className="text-xs text-muted-foreground">Dhuhr Jamaat</p>
          <p className="text-2xl font-bold text-primary">1:45 PM</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-coral text-coral-foreground px-4 py-3 rounded-2xl font-semibold shadow-coral">
          <Heart className="h-4 w-4 fill-current" /> Donate
        </button>
      </section>
    </div>
  );
}
