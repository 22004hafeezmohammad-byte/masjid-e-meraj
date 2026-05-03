import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";
import { storage } from "@/lib/storage";

export function AppShell({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  const [name, setName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setName(storage.get("user_name", "") || null);
    if (storage.getBool("dark_mode")) document.documentElement.classList.add("dark");
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!name) return <Navigate to="/welcome" />;

  return (
    <div className="mx-auto max-w-md min-h-dvh h-auto pb-24 overflow-y-visible">
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}
