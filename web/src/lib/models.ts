import { ModelInfo } from '@/types';

export const MODELS: ModelInfo[] = [
  {
    id: 'resnet50',
    name: 'ResNet-50',
    description: 'Deep residual learning with 50 layers. Excellent balance of speed and accuracy for general image classification.',
    architecture: 'Residual Network',
    speed: 'fast',
    accuracy: 'high',
    resourceUsage: 'medium',
    parameters: '25.6M',
  },
  {
    id: 'efficientnet-b0',
    name: 'EfficientNet-B0',
    description: 'State-of-the-art efficient architecture using compound scaling. Optimized for both accuracy and efficiency.',
    architecture: 'EfficientNet',
    speed: 'fast',
    accuracy: 'high',
    resourceUsage: 'low',
    parameters: '5.3M',
  },
  {
    id: 'vit-base',
    name: 'Vision Transformer',
    description: 'Transformer-based architecture treating images as sequences of patches. Strong at capturing global context.',
    architecture: 'ViT-B/16',
    speed: 'medium',
    accuracy: 'high',
    resourceUsage: 'high',
    parameters: '86M',
  },
  {
    id: 'densenet121',
    name: 'DenseNet-121',
    description: 'Densely connected convolutional network. Feature reuse leads to strong performance with fewer parameters.',
    architecture: 'DenseNet',
    speed: 'medium',
    accuracy: 'high',
    resourceUsage: 'medium',
    parameters: '8M',
  },
  {
    id: 'mobilenet-v3',
    name: 'MobileNetV3-Large',
    description: 'Mobile-optimized architecture using neural architecture search. Ultra-fast inference on edge devices.',
    architecture: 'MobileNetV3',
    speed: 'fast',
    accuracy: 'medium',
    resourceUsage: 'low',
    parameters: '5.4M',
  },
];

export const SPEED_LABELS: Record<string, string> = {
  fast: '< 100ms',
  medium: '100-300ms',
  slow: '> 300ms',
};

export const ACCURACY_LABELS: Record<string, string> = {
  high: '≥ 90%',
  medium: '75-89%',
  low: '< 75%',
};

export const RESOURCE_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Moderate',
  high: 'High',
};
