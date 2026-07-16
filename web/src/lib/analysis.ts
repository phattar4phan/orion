import { AnalysisResult, HistoryItem } from '@/types';

export const MOCK_HISTORY: HistoryItem[] = [
  {
    id: 'h1',
    imageName: 'wbc-sample-001.png',
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=400&fit=crop',
    mode: 'concurrent',
    models: ['resnet50', 'efficientnet-b0', 'vit-base', 'densenet121', 'mobilenet-v3'],
    results: [
      { id: 'r1', modelName: 'ResNet-50', prediction: 'Neutrophil', confidence: 0.973, inferenceTimeMs: 45, rank: 2 },
      { id: 'r2', modelName: 'EfficientNet-B0', prediction: 'Neutrophil', confidence: 0.981, inferenceTimeMs: 32, rank: 1 },
    ],
    winner: { id: 'r2', modelName: 'EfficientNet-B0', prediction: 'Neutrophil', confidence: 0.981, inferenceTimeMs: 32, rank: 1 },
    createdAt: '2026-07-15T14:30:00Z',
    totalDurationMs: 320,
  },
];

export function simulateAnalysis(
  modelIds: string[],
  mode: 'concurrent' | 'sequential'
): Promise<AnalysisResult[]> {
  return new Promise((resolve) => {
    const baseDelay = mode === 'concurrent' ? 500 : 1500;
    const results: AnalysisResult[] = modelIds.map((id, index) => {
      const modelNames: Record<string, string> = {
        resnet50: 'ResNet-50',
        'efficientnet-b0': 'EfficientNet-B0',
        'vit-base': 'Vision Transformer',
        densenet121: 'DenseNet-121',
        'mobilenet-v3': 'MobileNetV3-Large',
      };
      const classes = ['Neutrophil', 'Lymphocyte', 'Monocyte', 'Eosinophil', 'Basophil'];
      const confidences = [0.97, 0.94, 0.91, 0.88, 0.85];
      const times = [32, 45, 78, 65, 28];

      return {
        id: `r-${id}-${Date.now()}`,
        modelName: modelNames[id] || id,
        prediction: classes[index % classes.length],
        confidence: confidences[index % confidences.length],
        inferenceTimeMs: times[index % times.length],
        rank: 0,
      };
    });

    results.sort((a, b) => b.confidence - a.confidence);
    results.forEach((r, i) => (r.rank = i + 1));

    setTimeout(() => resolve(results), baseDelay + modelIds.length * 200);
  });
}
