import type { WbcClass, ClassProbability } from "../types"

export const MODEL_NAME = "Orion CNN"
export const MODEL_VERSION = "1.0.0"
export const MODEL_PARAMS = "2.1M"
export const MODEL_DESCRIPTION = "Custom convolutional neural network trained from scratch on white blood cell images. Classifies cells into 4 types: basophil, eosinophil, neutrophil, and monocyte."

export const WBC_CLASSES: { id: WbcClass; label: string; description: string }[] = [
  { id: "basophil", label: "Basophil", description: "Rarest type of white blood cell, making up less than 1% of your total white blood cell count. Despite their low numbers, they are a vital component of the immune system and play an active role in surveilling for invaders and regulating inflammatory responses." },
  { id: "eosinophil", label: "Eosinophil", description: "A type of specialized white blood cell (leukocyte) produced in the bone marrow." },
  { id: "neutrophil", label: "Neutrophil", description: "The most abundant type of white blood cell in the human body, acting as the primary first responders of the innate immune system." },
  { id: "monocyte", label: "Monocyte", description: "The largest type of white blood cell and serve as a crucial pillar of the innate immune system." },
]

export function getClassLabel(id: WbcClass): string {
  return WBC_CLASSES.find((c) => c.id === id)?.label ?? id
}

export function getClassInfo(id: WbcClass) {
  return WBC_CLASSES.find((c) => c.id === id)
}

export const DEMO_ACCURACY = 87.3
export const DEMO_AVG_LATENCY = 14.2
export const DEMO_TOTAL_RUNS = 1247

export function generateDemoProbabilities(topClass?: WbcClass): ClassProbability[] {
  const baseProbs: Record<WbcClass, number> = {
    basophil: 3 + Math.random() * 5,
    eosinophil: 5 + Math.random() * 8,
    neutrophil: 40 + Math.random() * 30,
    monocyte: 10 + Math.random() * 15,
  }

  if (topClass) {
    baseProbs[topClass] = 75 + Math.random() * 20
  }

  const total = Object.values(baseProbs).reduce((a, b) => a + b, 0)
  return WBC_CLASSES.map((c) => ({
    className: c.id,
    label: c.label,
    probability: Math.round((baseProbs[c.id] / total) * 1000) / 10,
  }))
}
