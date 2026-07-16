import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Upload,
  Cpu,
  BarChart3,
  History,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const STATS = [
  { label: 'Total Analyses', value: '1,248', icon: BarChart3, change: '+12%' },
  { label: 'Images Processed', value: '3,421', icon: Upload, change: '+8%' },
  { label: 'Avg. Inference', value: '52ms', icon: Zap, change: '-5%' },
  { label: 'Models Used', value: '5', icon: Cpu, change: 'All active' },
];

const RECENT_ANALYSES = [
  { id: 'a1', name: 'wbc-sample-042.png', model: 'EfficientNet-B0', confidence: '98.1%', time: '2h ago', status: 'completed' },
  { id: 'a2', name: 'blood-smear-118.png', model: 'ResNet-50', confidence: '97.3%', time: '5h ago', status: 'completed' },
  { id: 'a3', name: 'cell-cluster-007.png', model: 'Vision Transformer', confidence: '94.7%', time: '8h ago', status: 'completed' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white/90">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Overview of your AI classification activity.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link to="/upload">
          <Card hover className="flex items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06]">
              <Upload size={18} className="text-white/60" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white/80">New Analysis</h3>
              <p className="text-xs text-white/40">Upload an image and run all models</p>
            </div>
            <ArrowRight size={14} className="text-white/20" />
          </Card>
        </Link>
        <Link to="/history">
          <Card hover className="flex items-center gap-4 p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06]">
              <History size={18} className="text-white/60" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-white/80">View History</h3>
              <p className="text-xs text-white/40">Browse past analyses and results</p>
            </div>
            <ArrowRight size={14} className="text-white/20" />
          </Card>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04]">
                  <stat.icon size={14} className="text-white/40" strokeWidth={1.5} />
                </div>
                <Badge variant={stat.change.startsWith('+') ? 'success' : 'warning'}>
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-white/90">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Analyses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white/70">Recent Analyses</h2>
          <Link to="/history" className="text-xs text-white/40 hover:text-white/60 transition-colors flex items-center gap-1">
            View all <ArrowRight size={10} />
          </Link>
        </div>
        <div className="space-y-1">
          {RECENT_ANALYSES.map((analysis, i) => (
            <motion.div
              key={analysis.id}
              className="flex items-center gap-4 px-5 py-3 glass rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                <Upload size={14} className="text-white/30" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white/70 truncate">{analysis.name}</p>
                <p className="text-xs text-white/30">{analysis.model} • {analysis.confidence} confidence</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-2xs text-white/30">
                  <Clock size={10} />
                  {analysis.time}
                </span>
                <Badge variant="success">Complete</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Chart placeholder */}
      <div>
        <h2 className="text-sm font-semibold text-white/70 mb-4">Model Performance</h2>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-medium text-white/70">Accuracy by Model</p>
              <p className="text-xs text-white/30">Last 30 days</p>
            </div>
            <TrendingUp size={16} className="text-white/30" />
          </div>
          <div className="space-y-4">
            {[
              { name: 'EfficientNet-B0', value: 98.1 },
              { name: 'ResNet-50', value: 97.3 },
              { name: 'Vision Transformer', value: 95.8 },
              { name: 'DenseNet-121', value: 94.2 },
              { name: 'MobileNetV3', value: 91.7 },
            ].map((model, i) => (
              <motion.div
                key={model.name}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">{model.name}</span>
                  <span className="text-xs font-mono text-white/60">{model.value}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white/25 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${model.value}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
