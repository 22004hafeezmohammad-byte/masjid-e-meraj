import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ChevronLeft, Loader2, RefreshCw } from "lucide-react";
import { fetchSurah, type AyahFull, type SurahMeta } from "@/lib/quranApi";

export const Route = createFileRoute("/quran/$surah")({
  head: ({ params }) => ({
    meta: [
      { title: `Surah ${params.surah} — Masjid-E-Maraj` },
      { name: "description", content: "Read Surah with Urdu translation." },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { surah } = Route.useParams();
  return (
    <AppShell>
      <Page key={surah} />
    </AppShell>
  );
}

function Page() {
  const { surah } = Route.useParams();
  const n = Number(surah);
  const [meta, setMeta] = useState<SurahMeta | null>(null);
  const [ayahs, setAyahs] = useState<AyahFull[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchSurah(n)
      .then(({ meta, ayahs }) => {
        setMeta(meta);
        setAyahs(ayahs);
      })
      .catch(() => setError("Unable to load Quran, please try again"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  if (!n || isNaN(n)) return <div className="p-6">Surah not found.</div>;

  return (
    <div className="px-5 pt-6 animate-fade-in">
      <Link to="/quran" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      {meta && (
        <div className="bg-gradient-brown text-brown-foreground rounded-3xl p-6 text-center shadow-card mb-5">
          <p className="text-xs opacity-80 uppercase tracking-wider">Surah {meta.number}</p>
          <h1 className="text-2xl font-bold">{meta.englishName}</h1>
          <p className="font-arabic text-3xl mt-2">{meta.name}</p>
          <p className="text-xs opacity-80 mt-2">
            {meta.englishNameTranslation} · {meta.numberOfAyahs} verses
          </p>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <p className="text-sm">Loading Surah...</p>
        </div>
      )}

      {error && (
        <div className="bg-card rounded-2xl p-6 text-center border border-border/50">
          <p className="text-sm text-foreground mb-3">Unable to load Surah, please try again</p>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 bg-gradient-coral text-coral-foreground rounded-full px-4 py-2 text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      )}

      {ayahs && (
        <div className="space-y-3 pb-6">
          {ayahs.map((v) => (
            <div
              key={v.number}
              className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="h-7 w-7 rounded-full bg-gradient-coral text-coral-foreground text-xs font-bold grid place-items-center">
                  {v.numberInSurah}
                </span>
              </div>
              <p className="font-arabic text-2xl leading-loose text-right text-primary mb-4">
                {v.arabic}
              </p>
              <p
                dir="rtl"
                lang="ur"
                className="font-arabic text-xl leading-loose text-right text-foreground mb-2"
              >
                {v.urdu}
              </p>
              <p className="text-sm italic text-muted-foreground">
                {v.romanUrdu ?? "Roman Urdu translation coming soon"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
