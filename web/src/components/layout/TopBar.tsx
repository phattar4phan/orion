import { Search, Command } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex items-center h-16 px-8 border-b border-white/[0.04] bg-off-black/30 backdrop-blur-xl">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            placeholder="Search analyses..."
            className="w-full h-9 glass-input text-xs pl-9 pr-16"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-2xs text-white/20 bg-white/[0.04] border border-white/[0.04]">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>
      </div>
    </header>
  );
}
