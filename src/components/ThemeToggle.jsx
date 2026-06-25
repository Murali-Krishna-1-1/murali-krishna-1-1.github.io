import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle light/dark theme"
      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-accent hover:rotate-[20deg] shrink-0"
    >
      {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
