export interface AnalysisResult {
  id: string;
  modelName: string;
  prediction: string;
  confidence: number;
  inferenceTimeMs: number;
  rank: number;
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  imageName: string;
  mode: 'concurrent' | 'sequential';
  models: string[];
  results: AnalysisResult[];
  winner: AnalysisResult;
  createdAt: string;
  totalDurationMs: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  architecture: string;
  speed: 'fast' | 'medium' | 'slow';
  accuracy: 'high' | 'medium' | 'low';
  resourceUsage: 'low' | 'medium' | 'high';
  parameters: string;
}

export interface UserSettings {
  appearance: 'dark';
  animationsEnabled: boolean;
  defaultExecutionMode: 'concurrent' | 'sequential';
  defaultModels: string[];
  resultsPerPage: number;
}

export type ExecutionMode = 'concurrent' | 'sequential';

export interface UploadState {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
}
