import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { storage } from "@/lib/storage";
import { RotateCcw } from "lucide-react";

export const Route = createFileRoute("/tasbeeh")({
  head: () => ({
    meta: [
      { title: "Tasbeeh Counter — Masjid-E-Maraj" },
      { name: "description", content: "Digital Tasbeeh counter for daily dhikr." },
    ],
  }),
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

const DHIKRS = [
  { ar: "سُبْحَانَ ٱللَّٰه", en: "SubhanAllah" },
  { ar: "ٱلْحَمْدُ لِلَّٰه", en: "Alhamdulillah" },
  { ar: "ٱللَّٰهُ أَكْبَر", en: "Allahu Akbar" },
];

function Page() {
  const [count, setCount] = useState(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setCount(Number(storage.get("tasbeeh_count", "0")) || 0);
    setIdx(Number(storage.get("tasbeeh_idx", "0")) || 0);
  }, []);

  useEffect(() => { storage.set("tasbeeh_count", String(count)); }, [count]);
  useEffect(() => { storage.set("tasbeeh_idx", String(idx)); }, [idx]);

  const d = DHIKRS[idx];

  return (
    <div className="px-5 pt-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-primary mb-1">Tasbeeh</h1>
      <p className="text-xs text-muted-foreground mb-6">Tap to count your dhikr</p>

      <div className="bg-card rounded-3xl p-6 w-full text-center shadow-card border border-border/50 mb-6">
        <p className="font-arabic text-4xl text-primary leading-loose">{d.ar}</p>
        <p className="text-sm text-muted-foreground mt-1">{d.en}</p>
        <div className="flex justify-center gap-2 mt-4">
          {DHIKRS.map((x, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); setCount(0); }}
              className={`px-3 py-1 rounded-full text-xs font-medium ${i === idx ? "bg-gradient-coral text-coral-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              {x.en}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setCount(c => c + 1)}
        className="h-56 w-56 rounded-full bg-gradient-brown text-brown-foreground shadow-card active:scale-95 transition-transform grid place-items-center"
      >
        <span className="text-6xl font-bold">{count}</span>
      </button>

      <button
        onClick={() => setCount(0)}
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-card border border-border shadow-soft text-foreground"
      >
        <RotateCcw className="h-4 w-4" /> Reset
      </button>

      <p className="mt-4 text-xs text-muted-foreground">Goal: 33 · 99 · 100</p>
    </div>
  );
}
