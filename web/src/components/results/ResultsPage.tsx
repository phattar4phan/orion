import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Zap,
  Clock,
  BarChart3,
  Download,
  ArrowRight,
  RotateCcw,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { AnalysisResult } from '@/types';

interface ResultsPageProps {
  results?: AnalysisResult[];
}

const MOCK_RESULTS: AnalysisResult[] = [
  { id: 'r1', modelName: 'EfficientNet-B0', prediction: 'Neutrophil', confidence: 98.1, inferenceTimeMs: 32, rank: 1 },
  { id: 'r2', modelName: 'ResNet-50', prediction: 'Neutrophil', confidence: 97.3, inferenceTimeMs: 45, rank: 2 },
  { id: 'r3', modelName: 'DenseNet-121', prediction: 'Lymphocyte', confidence: 95.8, inferenceTimeMs: 65, rank: 3 },
  { id: 'r4', modelName: 'Vision Transformer', prediction: 'Neutrophil', confidence: 94.2, inferenceTimeMs: 78, rank: 4 },
  { id: 'r5', modelName: 'MobileNetV3-Large', prediction: 'Monocyte', confidence: 91.7, inferenceTimeMs: 28, rank: 5 },
];

export default function ResultsPage({ results }: ResultsPageProps) {
  const data = results || MOCK_RESULTS;
  const winner = data[0];
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white/90">Results</h1>
          <p className="text-sm text-white/40 mt-1">Analysis complete. {winner.modelName} performed best.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="glass" onClick={() => navigate('/analysis')}>
            <RotateCcw size={14} />
            Re-run
          </Button>
          <Button variant="ghost">
            <Share2 size={14} />
            Share
          </Button>
          <Button variant="primary">
            <Download size={14} />
            Export
          </Button>
        </div>
      </div>

      {/* Winner Card */}
      <motion.div
        className="glass-card p-8 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.08]">
            <Trophy size={18} className="text-white/80" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-white/40">Best Performing Model</p>
            <h2 className="text-xl font-bold text-white">{winner.modelName}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-xs text-white/30 mb-1">Prediction</p>
            <p className="text-2xl font-bold text-white/90">{winner.prediction}</p>
          </div>
          <div>
            <p className="text-xs text-white/30 mb-1">Confidence</p>
            <p className="text-2xl font-bold text-white/90">{(winner.confidence * 100).toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-xs text-white/30 mb-1">Inference Time</p>
            <p className="text-2xl font-bold text-white/90">{winner.inferenceTimeMs}ms</p>
          </div>
        </div>
      </motion.div>

      {/* Comparison Table */}
      <Card className="p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/[0.04]">
          <h3 className="text-sm font-semibold text-white/70">Model Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.04]">
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Rank</th>
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Model</th>
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Prediction</th>
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Confidence</th>
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Speed</th>
                <th className="text-left text-2xs text-white/30 font-medium px-6 py-3">Confidence Bar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((result, i) => (
                <motion.tr
                  key={result.id}
                  className={`border-b border-white/[0.02] transition-colors
                    ${i === 0 ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {i === 0 && <Trophy size={12} className="text-white/60" />}
                      <span className={`text-sm font-mono ${i === 0 ? 'text-white/80' : 'text-white/40'}`}>
                        #{result.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${i === 0 ? 'text-white/90' : 'text-white/60'}`}>
                      {result.modelName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={i === 0 ? 'success' : 'default'}>{result.prediction}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-mono ${i === 0 ? 'text-white/80' : 'text-white/50'}`}>
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-white/40">{result.inferenceTimeMs}ms</span>
                  </td>
                  <td className="px-6 py-4 w-40">
                    <ProgressBar value={result.confidence * 100} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Agreement Rate', value: '80%', sub: '4/5 models agree', icon: CheckCircle2 },
          { label: 'Avg Inference', value: '49.6ms', sub: 'Across all models', icon: Clock },
          { label: 'Best Speed', value: 'MobileNetV3', sub: '28ms inference', icon: Zap },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon size={14} className="text-white/40" strokeWidth={1.5} />
                <span className="text-xs text-white/40">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-white/80">{stat.value}</p>
              <p className="text-2xs text-white/30 mt-1">{stat.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
