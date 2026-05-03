import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SURAHS } from "@/lib/content";
import { BookOpen, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "Quran — Masjid-E-Maraj" },
      { name: "description", content: "Read the Holy Quran with Arabic, Roman Urdu and English translations." },
    ],
  }),
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

function Page() {
  return (
    <div className="px-5 pt-8">
      <header className="text-center mb-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-gradient-brown grid place-items-center text-brown-foreground shadow-card mb-2">
          <BookOpen className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-primary">The Holy Quran</h1>
        <p className="font-arabic text-lg text-muted-foreground">ٱلْقُرْآنُ ٱلْكَرِيم</p>
      </header>

      <Link to="/basics" className="block mb-5 bg-gradient-coral text-coral-foreground rounded-2xl px-5 py-4 shadow-coral">
        <p className="text-xs uppercase tracking-wider opacity-90">Islamic Basics</p>
        <p className="font-semibold">Namaz · Wudu · Kalimas</p>
      </Link>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Surahs</h2>
      <ul className="space-y-2">
        {SURAHS.map((s) => (
          <li key={s.n}>
            <Link
              to="/quran/$surah"
              params={{ surah: String(s.n) }}
              className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft border border-border/50 hover:shadow-card transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-brown text-brown-foreground grid place-items-center font-bold text-sm">
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.meaning} · {s.verses} verses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-arabic text-lg text-primary">{s.arabic}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
