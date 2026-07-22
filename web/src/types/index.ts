export type WbcClass = "basophil" | "eosinophil" | "neutrophil" | "monocyte"

export interface ClassProbability {
  className: WbcClass
  label: string
  probability: number
}

export interface InferenceResult {
  topPrediction: WbcClass
  topLabel: string
  confidence: number
  probabilities: ClassProbability[]
  inferenceTime: number
  timestamp: number
  status: "idle" | "running" | "completed" | "error"
}

export interface AnalysisJob {
  id: string
  imageName: string
  imageUrl: string
  result: InferenceResult
  createdAt: number
  completedAt: number | null
  status: "preparing" | "running" | "completed" | "error"
  progress: number
}

export interface HistoryEntry {
  id: string
  imageName: string
  imageUrl: string
  topPrediction: WbcClass
  topLabel: string
  confidence: number
  inferenceTime: number
  createdAt: number
}

export interface SortConfig {
  key: string
  direction: "asc" | "desc"
}
