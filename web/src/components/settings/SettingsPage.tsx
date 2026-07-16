import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Play,
  Gauge,
  Accessibility as AccessIcon,
  Info,
} from 'lucide-react';
import Card from '@/components/ui/Card';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm text-white/70">{label}</p>
        <p className="text-xs text-white/30 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200
          ${checked ? 'bg-white/20' : 'bg-white/[0.06]'}`}
      >
        <motion.div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-colors
            ${checked ? 'bg-white' : 'bg-white/40'}`}
          animate={{ left: checked ? 18 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        />
      </button>
    </div>
  );
}

const THEME_ITEM = { label: 'Theme', value: 'Dark', description: 'Orion uses a dark theme optimized for clarity.' } as const;

const REDUCED_MOTION_ITEM = { label: 'Reduced Motion', checked: false, description: 'Minimize animation and transition effects.' } as const;

const DEFAULT_MODE_ITEM = { label: 'Default Mode', options: ['Concurrent', 'Sequential'] as string[], description: 'Execution mode for new analyses.' } as const;

const LARGE_TEXT_ITEM = { label: 'Large Text', checked: false, description: 'Increase font size throughout the interface.' } as const;

const HIGH_CONTRAST_ITEM = { label: 'High Contrast', checked: false, description: 'Enhance contrast for better readability.' } as const;

const SECTIONS = [
  { icon: Monitor, title: 'Appearance', items: [THEME_ITEM] },
  { icon: Play, title: 'Animation', items: [REDUCED_MOTION_ITEM] },
  { icon: Gauge, title: 'Performance', items: [DEFAULT_MODE_ITEM] },
  { icon: AccessIcon, title: 'Accessibility', items: [LARGE_TEXT_ITEM, HIGH_CONTRAST_ITEM] },
];

export default function SettingsPage() {
  const [animations, setAnimations] = useState(true);
  const [defaultMode, setDefaultMode] = useState<'Concurrent' | 'Sequential'>('Concurrent');

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white/90">Settings</h1>
        <p className="text-sm text-white/40 mt-1">Configure your Orion experience.</p>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
          >
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04]">
                  <section.icon size={14} className="text-white/40" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white/70">{section.title}</h3>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {section.items.map((item: Record<string, any>) => {
                  if ('options' in item) {
                    return (
                      <div key={item.label} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm text-white/70">{item.label}</p>
                          <p className="text-xs text-white/30 mt-0.5">{item.description}</p>
                        </div>
                        <div className="flex glass rounded-lg p-0.5">
                          {(item.options as string[]).map((opt: string) => (
                            <button
                              key={opt}
                              onClick={() => setDefaultMode(opt as 'Concurrent' | 'Sequential')}
                              className={`relative px-3 py-1 text-xs font-medium rounded-md transition-colors
                                ${defaultMode === opt ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                            >
                              {defaultMode === opt && (
                                <motion.div
                                  className="absolute inset-0 bg-white/[0.08] rounded-md"
                                  layoutId="settings-mode"
                                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                />
                              )}
                              <span className="relative z-10">{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  if ('value' in item && item.value) {
                    return (
                      <div key={item.label} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm text-white/70">{item.label}</p>
                          <p className="text-xs text-white/30 mt-0.5">{item.description}</p>
                        </div>
                        <span className="text-xs font-mono text-white/40">{item.value as string}</span>
                      </div>
                    );
                  }

                  return (
                    <Toggle
                      key={item.label}
                      checked={item.label === 'Reduced Motion' ? !animations : (item.checked as boolean) || false}
                      onChange={(v) => {
                        if (item.label === 'Reduced Motion') setAnimations(!v);
                      }}
                      label={item.label as string}
                      description={item.description as string}
                    />
                  );
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04]">
              <Info size={14} className="text-white/40" strokeWidth={1.5} />
            </div>
            <h3 className="text-sm font-semibold text-white/70">About Orion</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-white/40">Version</span>
              <span className="text-xs font-mono text-white/50">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-white/40">Build</span>
              <span className="text-xs font-mono text-white/50">2026.07.15</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
