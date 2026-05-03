import { Link, useLocation } from "@tanstack/react-router";
import { Home, BookOpen, Sparkles, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/quran", label: "Quran", icon: BookOpen },
  { to: "/ayah", label: "Ayah", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 mx-auto max-w-md border-t border-border/60 bg-card/95 backdrop-blur-md shadow-card">
      <ul className="flex justify-around items-center px-2 py-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                  active ? "bg-gradient-coral text-coral-foreground shadow-coral scale-105" : "text-muted-foreground hover:text-foreground hover:scale-105 active:scale-95"
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} strokeWidth={active ? 2.4 : 2} />
                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
