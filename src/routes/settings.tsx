import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { storage } from "@/lib/storage";
import { Bell, Moon, Volume2, Globe, LogOut } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Masjid-E-Maraj" },
      { name: "description", content: "Personalize notifications, language and theme." },
    ],
  }),
  component: () => (
    <AppShell>
      <Page />
    </AppShell>
  ),
});

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full transition ${on ? "bg-gradient-coral" : "bg-muted"}`}
      aria-pressed={on}
    >
      <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

function Row({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between bg-card rounded-2xl px-4 py-3 shadow-soft border border-border/50">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-secondary grid place-items-center text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {children}
    </div>
  );
}

function Page() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [lang, setLang] = useState("en");
  const [adhan, setAdhan] = useState(true);
  const [notif, setNotif] = useState(true);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setName(storage.get("user_name", ""));
    setLang(storage.get("lang", "en"));
    setAdhan(storage.getBool("adhan", true));
    setNotif(storage.getBool("notif", true));
    setDark(storage.getBool("dark_mode", false));
  }, []);

  useEffect(() => {
    storage.setBool("dark_mode", dark);
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="px-5 pt-8 space-y-4">
      <h1 className="text-2xl font-bold text-primary">Settings</h1>

      <div className="bg-gradient-brown text-brown-foreground rounded-3xl p-5 shadow-card">
        <p className="text-xs opacity-80">Signed in as</p>
        <p className="text-xl font-bold">{name || "Guest"}</p>
      </div>

      <div className="space-y-3">
        <Row icon={Globe} label="Language">
          <select
            value={lang}
            onChange={(e) => { setLang(e.target.value); storage.set("lang", e.target.value); }}
            className="bg-secondary rounded-xl px-3 py-1.5 text-sm text-foreground border border-border"
          >
            <option value="en">English</option>
            <option value="ur">Urdu</option>
          </select>
        </Row>

        <Row icon={Volume2} label="Adhan Alert">
          <Toggle on={adhan} onChange={(v) => { setAdhan(v); storage.setBool("adhan", v); }} />
        </Row>

        <Row icon={Bell} label="Prayer Notifications">
          <Toggle on={notif} onChange={(v) => { setNotif(v); storage.setBool("notif", v); }} />
        </Row>

        <Row icon={Moon} label="Dark Mode">
          <Toggle on={dark} onChange={setDark} />
        </Row>

        {adhan && (
          <button className="w-full bg-gradient-coral text-coral-foreground rounded-2xl py-3 font-semibold shadow-coral">
            🔊 Tap to hear Adhan
          </button>
        )}
      </div>

      <button
        onClick={() => { storage.set("user_name", ""); nav({ to: "/welcome" }); }}
        className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-card border border-border text-destructive rounded-2xl py-3 shadow-soft"
      >
        <LogOut className="h-4 w-4" /> Change User
      </button>

      <p className="text-center text-xs text-muted-foreground pt-4">Masjid-E-Maraj · Siddipet, Telangana</p>
    </div>
  );
}
