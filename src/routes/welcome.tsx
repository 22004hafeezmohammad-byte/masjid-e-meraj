import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { storage } from "@/lib/storage";
import { MosqueIcon } from "@/components/MosqueIcon";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Welcome — Masjid-E-Maraj" },
      { name: "description", content: "Welcome to Masjid-E-Maraj, Kallakunta Colony, Siddipet." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const [name, setName] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    storage.set("user_name", name.trim());
    nav({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full bg-card rounded-3xl shadow-card p-8 text-center border border-border/50">
        <div className="mx-auto mb-4 inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-brown text-brown-foreground shadow-coral">
          <MosqueIcon className="h-12 w-12" />
        </div>
        <p className="font-arabic text-2xl text-primary mb-1">السلام عليكم</p>
        <h1 className="text-2xl font-bold text-foreground">Welcome to Masjid-E-Maraj</h1>
        <p className="text-sm text-muted-foreground mt-2">Kallakunta Colony, Siddipet, Telangana</p>

        <form onSubmit={submit} className="mt-8 space-y-4 text-left">
          <label className="block text-sm font-medium text-foreground">What is your name?</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-2xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-coral text-coral-foreground font-semibold shadow-coral hover:opacity-95 transition"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
