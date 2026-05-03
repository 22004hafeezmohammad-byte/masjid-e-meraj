import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { KALIMAS, NAMAZ_STEPS, WUDU_STEPS } from "@/lib/content";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/basics")({
  head: () => ({
    meta: [
      { title: "Islamic Basics — Masjid-E-Maraj" },
      { name: "description", content: "Learn Namaz, Wudu and the Kalimas." },
    ],
  }),
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card rounded-3xl p-5 shadow-soft border border-border/50">
      <h2 className="text-lg font-bold text-primary mb-3">{title}</h2>
      {children}
    </section>
  );
}

function Page() {
  return (
    <div className="px-5 pt-6 space-y-4">
      <Link to="/quran" className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="text-2xl font-bold text-primary">Islamic Basics</h1>

      <Section title="How to Pray (Namaz)">
        <ol className="space-y-2 list-decimal list-inside text-sm text-foreground">
          {NAMAZ_STEPS.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </Section>

      <Section title="Wudu (Ablution)">
        <ol className="space-y-2 list-decimal list-inside text-sm text-foreground">
          {WUDU_STEPS.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </Section>

      <Section title="Kalimas">
        <div className="space-y-4">
          {KALIMAS.map((k) => (
            <div key={k.n} className="bg-secondary/50 rounded-2xl p-4">
              <p className="text-xs text-muted-foreground">{k.n}. {k.name}</p>
              <p className="font-arabic text-2xl text-right text-primary leading-loose my-2">{k.arabic}</p>
              <p className="text-sm text-foreground">{k.english}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
