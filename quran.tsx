import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { BookOpen, ChevronRight, Loader2, RefreshCw } from "lucide-react";
import { fetchSurahList, type SurahMeta } from "@/lib/quranApi";

export const Route = createFileRoute("/quran")({
  head: () => ({
    meta: [
      { title: "Quran - Masjid-E-Maraj" },
      { name: "description", content: "Read the Holy Quran - all 114 Surahs with Urdu translation." },
    ],
  }),
  component: () => (
    <AppShell>
      <QuranRouteContent />
    </AppShell>
  ),
});

function QuranRouteContent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPath !== "/quran") {
    return <Outlet />;
  }

  return <Page />;
}

function Page() {
  const [surahs, setSurahs] = useState<SurahMeta[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchSurahList()
      .then(setSurahs)
      .catch(() => {
        setSurahs(null);
        setError("Unable to load Quran, please try again");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="px-5 pt-8 animate-fade-in">
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

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
        Surahs {surahs && `(${surahs.length})`}
      </h2>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">Loading Quran...</p>
        </div>
      )}

      {error && (
        <div className="bg-card rounded-2xl p-6 text-center border border-border/50">
          <p className="text-sm text-foreground mb-3">{error}</p>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 bg-gradient-coral text-coral-foreground rounded-full px-4 py-2 text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      )}

      {surahs && (
        <ul className="space-y-2 pb-6">
          {surahs.map((s) => (
            <li key={s.number}>
              <Link
                to="/quran/$surah"
                params={{ surah: String(s.number) }}
                className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft border border-border/50 hover:shadow-card transition active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-brown text-brown-foreground grid place-items-center font-bold text-sm">
                    {s.number}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{s.englishName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {s.englishNameTranslation} · {s.numberOfAyahs} verses
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-arabic text-lg text-primary">{s.name}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
