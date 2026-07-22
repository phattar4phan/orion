const IMG_SIZE = 224
const MEAN = [0.485, 0.456, 0.406]
const STD = [0.229, 0.224, 0.225]

ort.env.wasm.numThreads = 1
ort.env.wasm.simd = true
ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/"

let session: any = null

async function getSession(): Promise<any> {
  if (session) return session

  session = await ort.InferenceSession.create("/scratch.onnx", {
    executionProviders: ["wasm"],
    graphOptimizationLevel: "all",
  })

  return session
}

function softmax(logits: number[]): number[] {
  const max = Math.max(...logits)
  const exps = logits.map((v) => Math.exp(v - max))
  const sum = exps.reduce((a, b) => a + b, 0)
  return exps.map((v) => v / sum)
}

export async function preprocessImage(file: File): Promise<Float32Array> {
  const img = await createImageBitmap(file, { resizeWidth: IMG_SIZE, resizeHeight: IMG_SIZE })

  const canvas = document.createElement("canvas")
  canvas.width = IMG_SIZE
  canvas.height = IMG_SIZE

  const ctx = canvas.getContext("2d")!
  ctx.drawImage(img, 0, 0)
  const imageData = ctx.getImageData(0, 0, IMG_SIZE, IMG_SIZE)
  const pixels = imageData.data

  const tensor = new Float32Array(3 * IMG_SIZE * IMG_SIZE)
  const size = IMG_SIZE * IMG_SIZE

  for (let i = 0; i < size; i++) {
    const r = pixels[i * 4] / 255.0
    const g = pixels[i * 4 + 1] / 255.0
    const b = pixels[i * 4 + 2] / 255.0

    tensor[i] = (r - MEAN[0]) / STD[0]
    tensor[size + i] = (g - MEAN[1]) / STD[1]
    tensor[2 * size + i] = (b - MEAN[2]) / STD[2]
  }

  return tensor
}

export interface ApiResponse {
  prediction: number
  label: string
  confidence: number
  inferenceTime: number
}

const LABELS = ["basophil", "eosinophil", "monocyte", "neutrophil"]

export async function runInference(tensor: Float32Array): Promise<ApiResponse> {
  const t0 = performance.now()

  const sess = await getSession()

  const feeds: Record<string, any> = {}
  feeds[sess.inputNames[0]] = new ort.Tensor("float32", tensor, [1, 3, 224, 224])

  const results = await sess.run(feeds)
  const t1 = performance.now()

  const outputName = sess.outputNames[0]
  const logits = Array.from(results[outputName].data as Float32Array)
  const probs = softmax(logits)

  let bestIdx = 0
  let bestProb = probs[0]
  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > bestProb) {
      bestProb = probs[i]
      bestIdx = i
    }
  }

  return {
    prediction: bestIdx,
    label: LABELS[bestIdx],
    confidence: Math.round(bestProb * 1000) / 10,
    inferenceTime: Math.round((t1 - t0) * 10) / 10,
  }
}
