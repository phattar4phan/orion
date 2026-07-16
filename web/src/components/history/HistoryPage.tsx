import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Clock,
  RotateCcw,
  Star,
  Trash2,
  ArrowUpDown,
  Filter,
  Cpu,
  ChevronRight,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { HistoryItem } from '@/types';

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 'h1', imageName: 'wbc-sample-042.png', imageUrl: '',
    mode: 'concurrent',
    models: ['resnet50', 'efficientnet-b0', 'vit-base', 'densenet121', 'mobilenet-v3'],
    results: [],
    winner: { id: 'w1', modelName: 'EfficientNet-B0', prediction: 'Neutrophil', confidence: 0.981, inferenceTimeMs: 32, rank: 1 },
    createdAt: '2026-07-15T14:30:00Z', totalDurationMs: 320,
  },
  {
    id: 'h2', imageName: 'blood-smear-118.png', imageUrl: '',
    mode: 'sequential',
    models: ['resnet50', 'efficientnet-b0', 'vit-base'],
    results: [],
    winner: { id: 'w2', modelName: 'ResNet-50', prediction: 'Lymphocyte', confidence: 0.973, inferenceTimeMs: 45, rank: 1 },
    createdAt: '2026-07-15T10:15:00Z', totalDurationMs: 580,
  },
  {
    id: 'h3', imageName: 'cell-cluster-007.png', imageUrl: '',
    mode: 'concurrent',
    models: ['densenet121', 'mobilenet-v3', 'efficientnet-b0'],
    results: [],
    winner: { id: 'w3', modelName: 'DenseNet-121', prediction: 'Monocyte', confidence: 0.958, inferenceTimeMs: 65, rank: 1 },
    createdAt: '2026-07-14T16:45:00Z', totalDurationMs: 290,
  },
  {
    id: 'h4', imageName: 'wbc-batch-003.png', imageUrl: '',
    mode: 'concurrent',
    models: ['vit-base', 'resnet50', 'densenet121'],
    results: [],
    winner: { id: 'w4', modelName: 'Vision Transformer', prediction: 'Eosinophil', confidence: 0.947, inferenceTimeMs: 78, rank: 1 },
    createdAt: '2026-07-14T09:20:00Z', totalDurationMs: 410,
  },
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = MOCK_HISTORY.filter((item) =>
    item.imageName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white/90">History</h1>
          <p className="text-sm text-white/40 mt-1">{MOCK_HISTORY.length} past analyses</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            className="w-full glass-input pl-9 text-xs"
            placeholder="Search by filename..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="glass" size="sm">
          <Filter size={12} />
          Filter
        </Button>
        <Button variant="glass" size="sm">
          <ArrowUpDown size={12} />
          Sort
        </Button>
      </div>

      {/* History List */}
      <div className="space-y-2">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.25 }}
          >
            <Card hover className="flex items-center gap-4 p-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.04]">
                <Cpu size={16} className="text-white/30" strokeWidth={1.5} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-white/70 truncate">{item.imageName}</p>
                  <Badge variant={item.winner.confidence > 0.95 ? 'success' : 'default'}>
                    {(item.winner.confidence * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xs text-white/30">
                    Winner: {item.winner.modelName} — {item.winner.prediction}
                  </span>
                  <span className="text-2xs text-white/20">{item.mode}</span>
                  <span className="text-2xs text-white/20">{item.models.length} models</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-2xs text-white/25 flex items-center gap-1 mr-2">
                  <Clock size={10} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-1.5 rounded-md transition-colors
                    ${favorites.has(item.id) ? 'text-white/60' : 'text-white/15 hover:text-white/40'}`}
                >
                  <Star size={14} />
                </button>
                <button className="p-1.5 rounded-md text-white/15 hover:text-white/40 transition-colors">
                  <RotateCcw size={14} />
                </button>
                <button className="p-1.5 rounded-md text-white/15 hover:text-white/40 transition-colors">
                  <Trash2 size={14} />
                </button>
                <button className="p-1.5 rounded-md text-white/15 hover:text-white/40 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
