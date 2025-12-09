import { useTheme } from "@/context/ThemeProvider"
import { MoonIcon, SunIcon } from "lucide-react";

export default function Header() {
    const {theme, toggleTheme} = useTheme();
  return (
    <header className="bg-card border-b border-border h-16 flex  items-center justify-between px-8">
        <h1 className="text-2xl font-bold text-foreground">Maintenance Dashboard</h1>
      <div>
        <button
        onClick={toggleTheme}
        className="p-2 rounded-lg border border-border hover:bg-muted transition"
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
      </div>
    </header>
  )
}
