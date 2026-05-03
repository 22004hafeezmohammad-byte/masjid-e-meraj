import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ayahOfDay, AYAHS } from "@/lib/content";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/ayah")({
  head: () => ({
    meta: [
      { title: "Ayah of the Day — Masjid-E-Maraj" },
      { name: "description", content: "Daily Ayah with Arabic, Roman Urdu and English translation." },
    ],
  }),
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

function Page() {
  const today = ayahOfDay();
  return (
    <div className="px-5 pt-8">
      <header className="text-center mb-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-gradient-coral grid place-items-center text-coral-foreground shadow-coral mb-2">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-primary">Ayah of the Day</h1>
        <p className="text-xs text-muted-foreground">Refreshes daily</p>
      </header>

      <article className="bg-gradient-brown text-brown-foreground rounded-3xl p-6 shadow-card mb-6">
        <p className="font-arabic text-3xl leading-loose text-center mb-4">{today.arabic}</p>
        <div className="bg-white/10 rounded-2xl p-4 space-y-3">
          <div>
            <p className="text-[10px] uppercase opacity-70 tracking-wider">Roman Urdu</p>
            <p className="italic">{today.roman}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase opacity-70 tracking-wider">English</p>
            <p>{today.english}</p>
          </div>
          <p className="text-xs text-right opacity-80 pt-1">— {today.ref}</p>
        </div>
      </article>

      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">More Ayahs</h2>
      <div className="space-y-3">
        {AYAHS.filter(a => a.ref !== today.ref).map(a => (
          <div key={a.ref} className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
            <p className="font-arabic text-xl text-right text-primary mb-2">{a.arabic}</p>
            <p className="text-sm text-foreground">{a.english}</p>
            <p className="text-xs text-muted-foreground mt-1">{a.ref}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
