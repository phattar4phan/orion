import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Cpu,
  Zap,
  Clock,
  Gauge,
  Check,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { MODELS, SPEED_LABELS, ACCURACY_LABELS, RESOURCE_LABELS } from '@/lib/models';

export default function ModelSelectionPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<'concurrent' | 'sequential'>('concurrent');
  const navigate = useNavigate();

  const toggleModel = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white/90">Select Models</h1>
          <p className="text-sm text-white/40 mt-1">Choose which models to run. {selected.length} of {MODELS.length} selected.</p>
        </div>
      </div>

      {/* Execution Mode */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/40 mr-2">Execution mode</span>
        <div className="flex glass rounded-lg p-0.5">
          {(['concurrent', 'sequential'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`relative px-4 py-1.5 text-xs font-medium rounded-md transition-colors duration-200
                ${mode === m ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
            >
              {mode === m && (
                <motion.div
                  className="absolute inset-0 bg-white/[0.08] rounded-md"
                  layoutId="execution-mode"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative z-10">{m === 'concurrent' ? 'Concurrent' : 'Sequential'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Model Cards */}
      <div className="grid gap-3">
        {MODELS.map((model, i) => {
          const isSelected = selected.includes(model.id);

          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => toggleModel(model.id)}
            >
              <div
                className={`relative glass-card-hover p-5 cursor-pointer transition-all duration-300
                  ${isSelected ? 'border-white/[0.15] bg-white/[0.05]' : ''}`}
              >
                {/* Selection indicator */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
                      ${isSelected
                        ? 'bg-white border-white text-black'
                        : 'border-white/[0.10] bg-transparent'}`}
                  >
                    {isSelected && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06] mt-0.5">
                    <Cpu size={18} className="text-white/50" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-sm font-semibold text-white/80">{model.name}</h3>
                      <Badge>{model.architecture}</Badge>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed mb-4 pr-10">
                      {model.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Zap size={12} className="text-white/30" />
                        <span className="text-2xs text-white/40">{SPEED_LABELS[model.speed]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Gauge size={12} className="text-white/30" />
                        <span className="text-2xs text-white/40">{ACCURACY_LABELS[model.accuracy]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-white/30" />
                        <span className="text-2xs text-white/40">{RESOURCE_LABELS[model.resourceUsage]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-2xs text-white/30 font-mono">{model.parameters} params</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
        <Button variant="ghost" onClick={() => navigate('/upload')}>
          <ArrowLeft size={14} />
          Back
        </Button>
        <Button
          variant="primary"
          disabled={selected.length === 0}
          onClick={() => navigate('/analysis')}
        >
          Run Analysis
          <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}
