import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { SURAHS, SURAH_CONTENT } from "@/lib/content";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/quran/$surah")({
  head: ({ params }) => {
    const s = SURAHS.find((x) => String(x.n) === params.surah);
    return {
      meta: [
        { title: s ? `Surah ${s.name} — Masjid-E-Maraj` : "Surah — Masjid-E-Maraj" },
        { name: "description", content: s ? `Read Surah ${s.name} (${s.meaning}) with translations.` : "Read Surah." },
      ],
    };
  },
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

function Page() {
  const { surah } = Route.useParams();
  const s = SURAHS.find((x) => String(x.n) === surah);
  const verses = SURAH_CONTENT[Number(surah)];

  if (!s) return <div className="p-6">Surah not found.</div>;

  return (
    <div className="px-5 pt-6">
      <Link to="/quran" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="bg-gradient-brown text-brown-foreground rounded-3xl p-6 text-center shadow-card mb-5">
        <p className="text-xs opacity-80 uppercase tracking-wider">Surah {s.n}</p>
        <h1 className="text-2xl font-bold">{s.name}</h1>
        <p className="font-arabic text-3xl mt-2">{s.arabic}</p>
        <p className="text-xs opacity-80 mt-2">{s.meaning} · {s.verses} verses</p>
      </div>

      {verses ? (
        <div className="space-y-3">
          {verses.map((v, i) => (
            <div key={i} className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="h-7 w-7 rounded-full bg-gradient-coral text-coral-foreground text-xs font-bold grid place-items-center">{i + 1}</span>
              </div>
              <p className="font-arabic text-2xl leading-loose text-right text-primary mb-3">{v.arabic}</p>
              <p className="text-sm italic text-muted-foreground">{v.roman}</p>
              <p className="text-sm text-foreground mt-1">{v.english}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl p-6 text-center text-sm text-muted-foreground border border-border/50">
          Full text for this Surah will be available soon, in shaa Allah.
        </div>
      )}
    </div>
  );
}
