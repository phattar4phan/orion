import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, CheckCircle2, Loader2, ArrowRight, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { simulateAnalysis } from '@/lib/analysis';
import { MODELS } from '@/lib/models';
import { AnalysisResult } from '@/types';

const STAGES = ['Initializing models', 'Loading weights', 'Preprocessing image', 'Running inference', 'Aggregating results'];

export default function AnalysisPage() {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modelStatuses, setModelStatuses] = useState<Record<string, 'pending' | 'running' | 'done'>>({});
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const ids = MODELS.map((m) => m.id);
    setModelStatuses(Object.fromEntries(ids.map((id) => [id, 'pending'])));

    const totalDuration = 4000;
    const tick = 50;
    const steps = totalDuration / tick;
    let step = 0;

    timerRef.current = setInterval(() => {
      step++;
      setElapsed((step * tick) / 1000);
      setProgress(Math.min((step / steps) * 100, 99));

      const stageIdx = Math.min(
        Math.floor((step / steps) * STAGES.length),
        STAGES.length - 1
      );
      setStage(stageIdx);
    }, tick);

    simulateAnalysis(ids, 'concurrent').then((res) => {
      clearInterval(timerRef.current);
      setProgress(100);
      setStage(STAGES.length - 1);
      setResults(res);

      ids.forEach((id, i) => {
        setTimeout(() => {
          setModelStatuses((prev) => ({ ...prev, [id]: 'running' }));
          setTimeout(() => {
            setModelStatuses((prev) => ({ ...prev, [id]: 'done' }));
          }, 300 + Math.random() * 300);
        }, i * 150);
      });
    });

    return () => clearInterval(timerRef.current);
  }, []);

  const allDone = Object.values(modelStatuses).every((s) => s === 'done');

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white/90">Running Analysis</h1>
        <p className="text-sm text-white/40 mt-1">{STAGES[stage]}</p>
      </div>

      {/* Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-white/50">Progress</span>
          <span className="text-xs font-mono text-white/60">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} />

        <div className="flex items-center gap-2 mt-4">
          <Clock size={12} className="text-white/30" />
          <span className="text-2xs font-mono text-white/40">{elapsed.toFixed(1)}s</span>
        </div>
      </Card>

      {/* Model Status */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 mb-3">Model Status</p>
        {MODELS.map((model, i) => {
          const status = modelStatuses[model.id] || 'pending';
          return (
            <motion.div
              key={model.id}
              className="flex items-center gap-4 px-4 py-3 glass rounded-lg"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04]">
                <Cpu size={14} className="text-white/40" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white/70">{model.name}</p>
                <p className="text-2xs text-white/30">
                  {status === 'pending' && 'Queued'}
                  {status === 'running' && 'Running inference...'}
                  {status === 'done' && 'Complete'}
                </p>
              </div>
              <div>
                {status === 'pending' && (
                  <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                )}
                {status === 'running' && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white/40"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
                {status === 'done' && (
                  <CheckCircle2 size={14} className="text-white/60" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Done state */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <Button
              variant="primary"
              onClick={() => navigate('/results', { state: { results } })}
            >
              View Results
              <ArrowRight size={14} />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
