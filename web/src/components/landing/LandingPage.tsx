import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gauge,
  Brain,
  TrendingUp,
  Activity,
  Shield,
  Upload,
  Image,
  X,
  Check,
  CheckCircle2,
  Loader2,
  ArrowRight,
  FileImage,
  AlertTriangle,
} from "lucide-react"
import { Button } from "../ui/Button"
import { Card } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { ProgressBar } from "../ui/ProgressBar"
import { preprocessImage, runInference, type ApiResponse } from "../../lib/inference"
import { WBC_CLASSES } from "../../lib/models"

const trainingData = {
  epochs: 20,
  trainAcc: [61.48, 87.38, 92.04, 94.32, 95.18, 95.49, 96.43, 96.71, 96.69, 97.14, 97.43, 97.62, 97.73, 97.68, 97.80, 98.12, 98.07, 98.18, 98.09, 98.30],
  validAcc: [92.25, 95.82, 96.74, 97.72, 97.93, 93.79, 98.14, 98.67, 98.63, 98.46, 98.60, 98.81, 98.07, 98.84, 99.19, 99.12, 99.05, 99.16, 99.16, 98.39],
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
}

const classPalette: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  basophil: { border: "border-slate-blue/30", bg: "bg-slate-blue/[0.05]", text: "text-slate-blue", dot: "bg-slate-blue" },
  eosinophil: { border: "border-pale-steel/30", bg: "bg-pale-steel/[0.05]", text: "text-pale-steel", dot: "bg-pale-steel" },
  neutrophil: { border: "border-cool-gray/25", bg: "bg-cool-gray/[0.05]", text: "text-cool-gray", dot: "bg-cool-gray" },
  monocyte: { border: "border-ice-blue/25", bg: "bg-ice-blue/[0.04]", text: "text-ice-blue", dot: "bg-ice-blue" },
}

function polylinePoints(values: number[], min: number, max: number, w: number, h: number, padY: number): string {
  const range = max - min || 1
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = padY + (1 - (v - min) / range) * (h - padY * 2)
      return `${x},${y}`
    })
    .join(" ")
}

type Phase = "upload" | "analyzing" | "result"

export function LandingPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [phase, setPhase] = useState<Phase>("upload")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<ApiResponse | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
    setPhase("upload")
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const clearFile = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview)
    setFile(null)
    setPreview(null)
    setPhase("upload")
    setProgress(0)
  }, [preview])

  const handleAnalyze = useCallback(async () => {
    if (!file) return
    setPhase("analyzing")
    setProgress(0)

    let intervalId: ReturnType<typeof setInterval> | undefined

    try {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev
          return prev + Math.random() * 15 + 5
        })
      }, 200)

      const tensor = await preprocessImage(file)
      setProgress(95)

      const apiResult = await runInference(tensor)
      setProgress(100)

      clearInterval(intervalId)
      setResult(apiResult)
      setPhase("result")
    } catch (err: any) {
      clearInterval(intervalId)
      setPhase("upload")
      console.error(err.message || err)
    }
  }, [file])

  const { trainAcc, validAcc } = trainingData
  const allValues = [...trainAcc, ...validAcc]
  const yMin = Math.floor(Math.min(...allValues) / 5) * 5
  const yMax = Math.ceil(Math.max(...allValues) / 5) * 5
  const nTicks = Math.ceil((yMax - yMin) / 5)
  const svgW = 800
  const svgH = 320
  const padY = 48
  const chartW = svgW - 70
  const chartH = svgH

  const trainLine = polylinePoints(trainAcc, yMin, yMax, chartW, chartH, padY)
  const validLine = polylinePoints(validAcc, yMin, yMax, chartW, chartH, padY)

  return (
    <div className="relative min-h-screen bg-black-950 text-white">
      <div className="pointer-events-none fixed inset-0 z-0 page-texture" aria-hidden="true" />

      <main className="relative z-10">
        <section className="relative pt-20 pb-16 px-6">
          <div className="absolute inset-0 hero-dot-grid" />
          <div className="absolute inset-0" style={{
            background: [
              "radial-gradient(ellipse 30% 40% at 20% 30%, rgba(149,167,176,0.12) 0%, transparent 60%)",
              "radial-gradient(ellipse 25% 35% at 75% 20%, rgba(222,234,244,0.1) 0%, transparent 55%)",
              "radial-gradient(ellipse 20% 30% at 50% 60%, rgba(149,167,176,0.07) 0%, transparent 55%)",
              "radial-gradient(ellipse 35% 50% at 40% 50%, rgba(197,197,201,0.05) 0%, transparent 65%)",
            ].join(", ")
          }} />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-slate-blue/15 rounded-full text-[11px] text-slate-blue font-medium mb-6"
              style={{ backdropFilter: "blur(24px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-blue animate-pulse" />
              White Blood Cell Classification
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-balance bg-gradient-to-br from-ice-blue via-white to-pale-steel bg-clip-text text-transparent">
              Classify white blood cells
              <br />
              with a custom CNN.
            </h1>

            <p className="mt-5 text-base text-white/35 leading-relaxed max-w-lg mx-auto text-balance">
              runs a customized CNN model trained entirely from scratch to classify 4 types of white blood cell with confident score
            </p>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              {phase === "upload" && (
                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {!file ? (
                    <Card
                      padding="lg"
                      className={`text-center cursor-pointer transition-colors border-dashed ${dragging ? "border-slate-blue/30 bg-slate-blue/[0.04]" : ""}`}
                      onDrop={handleDrop}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                      onDragLeave={() => setDragging(false)}
                      onClick={() => inputRef.current?.click()}
                    >
                      <div className={`mx-auto h-16 w-16 mb-5 bg-white/[0.04] border ${dragging ? "border-slate-blue/30" : "border-white/[0.06]"} rounded-2xl flex items-center justify-center transition-colors`}>
                        {dragging ? <Upload className="h-7 w-7 text-slate-blue" /> : <Image className="h-7 w-7 text-white/15" />}
                      </div>
                      <p className="text-base font-medium text-white/70">
                        {dragging ? "Drop image here" : "Try the model — drop an image here"}
                      </p>
                      <p className="text-sm text-white/25 mt-1.5">or click to browse files</p>
                      <p className="text-[11px] text-white/15 mt-3">Supports .jpeg, .png, .webp</p>
                      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className="hidden" aria-label="Upload image" />
                    </Card>
                  ) : (
                    <Card padding="lg">
                      <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="relative group shrink-0">
                          <img src={preview!} alt="Preview" className="h-44 w-44 object-cover rounded-xl border border-white/[0.06]" />
                          <button onClick={clearFile} className="absolute -top-2 -right-2 h-6 w-6 bg-black/90 border border-white/[0.1] rounded-full flex items-center justify-center text-white/50 hover:text-white/80 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-slate-blue/50" aria-label="Remove image">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-3">
                            <FileImage className="h-4 w-4 text-white/30" />
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <Badge>{(file.size / 1024 / 1024).toFixed(1)} MB</Badge>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-white/30 mb-5">
                            <Check className="h-3.5 w-3.5 text-emerald-400" />
                            Ready for analysis
                          </div>
                          <div className="flex gap-2">
                            <Button size="md" onClick={handleAnalyze}>
                              Analyze
                              <ArrowRight className="h-3.5 w-3.5 ml-1" />
                            </Button>
                            <Button size="md" variant="ghost" onClick={clearFile}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}

              {phase === "analyzing" && (
                <motion.div key="analyzing" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card padding="md">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-semibold">Running Inference</h2>
                      <Badge variant="accent">Running</Badge>
                    </div>
                    <ProgressBar value={progress} size="lg" showPercentage label="Inference Progress" />
                    <div className="flex items-center gap-3 mt-4">
                      <Loader2 className="h-4 w-4 text-slate-blue animate-spin" />
                      <span className="text-sm text-white/30">Processing image...</span>
                    </div>
                  </Card>
                </motion.div>
              )}

              {phase === "result" && result && (
                <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  {result.isOod ? (
                    <Card padding="md" className="border-amber-500/20">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img src={preview!} alt="Analyzed" className="h-32 w-32 object-cover rounded-xl border border-white/[0.06] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-amber-400" />
                            <span className="text-sm font-semibold text-amber-400">Not a white blood cell</span>
                            <Badge variant="warning">{result.inferenceTime}ms</Badge>
                          </div>
                          <p className="text-sm text-white/25 mt-2 leading-relaxed">
                            This image doesn't appear to be a white blood cell. The model detected patterns outside its training distribution (energy {result.energyScore}).
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" onClick={() => { clearFile() }}>Try Another</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card padding="md">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img src={preview!} alt="Analyzed" className="h-32 w-32 object-cover rounded-xl border border-white/[0.06] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            <span className="text-sm font-semibold">Analysis Complete</span>
                            <Badge variant="accent">{result.inferenceTime}ms</Badge>
                          </div>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className={`inline-block w-2.5 h-2.5 rounded-full ${classPalette[result.label.toLowerCase()]?.dot ?? "bg-white/40"} mr-1`} />
                            <span className="text-3xl font-semibold tracking-tight capitalize">{result.label}</span>
                          </div>
                          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] rounded-lg">
                            <span className="text-sm text-white/35">Confidence</span>
                            <span className="text-lg font-semibold text-white/80 tabular-nums">{result.confidence}%</span>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" onClick={() => { clearFile() }}>Try Another</Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card padding="lg" hover>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-5 w-5 text-slate-blue/60" />
                <h2 className="text-lg font-semibold">Training Accuracy</h2>
              </div>
              <p className="text-sm text-white/30 mb-6">{trainingData.epochs} epochs on white blood cell dataset</p>

              <div className="overflow-x-auto">
                <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" role="img" aria-label="Training accuracy chart">
                  {Array.from({ length: nTicks + 1 }).map((_, i) => {
                    const val = yMin + i * 5
                    const y = padY + (1 - (val - yMin) / (yMax - yMin)) * (chartH - padY * 2)
                    return (
                      <g key={i}>
                        <line x1={60} x2={svgW - 10} y1={y} y2={y} stroke="rgba(149,167,176,0.06)" strokeWidth={1} />
                        <text x={52} y={y + 5} textAnchor="end" className="select-none" fill="rgba(255,255,255,0.25)" fontSize={13} fontWeight={500}>{val}%</text>
                      </g>
                    )
                  })}
                  {Array.from({ length: trainingData.epochs }).map((_, i) => {
                    const x = 60 + (i / (trainingData.epochs - 1)) * chartW
                    return i % 4 === 0 ? (
                      <text key={i} x={x} y={chartH - 10} textAnchor="middle" className="select-none" fill="rgba(255,255,255,0.2)" fontSize={13} fontWeight={500}>{i + 1}</text>
                    ) : null
                  })}
                  <text x={60 + chartW / 2} y={chartH - 2} textAnchor="middle" className="select-none" fill="rgba(255,255,255,0.15)" fontSize={12}>Epoch</text>

                  <defs>
                    <linearGradient id="trainFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(149,167,176,0.18)" />
                      <stop offset="100%" stopColor="rgba(149,167,176,0)" />
                    </linearGradient>
                    <linearGradient id="validFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(149,167,176,0.06)" />
                      <stop offset="100%" stopColor="rgba(149,167,176,0)" />
                    </linearGradient>
                  </defs>

                  <motion.polygon
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    fill="url(#trainFill)"
                    points={`0,${chartH - padY} ${trainLine} ${chartW},${chartH - padY}`}
                    transform={`translate(${60}, 0)`}
                  />

                  <motion.polyline
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
                    fill="none" stroke="rgba(149,167,176,0.8)" strokeWidth={2.5}
                    strokeLinecap="round" strokeLinejoin="round"
                    points={trainLine} transform={`translate(${60}, 0)`}
                  />

                  <motion.polygon
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    fill="url(#validFill)"
                    points={`0,${chartH - padY} ${validLine} ${chartW},${chartH - padY}`}
                    transform={`translate(${60}, 0)`}
                  />

                  <motion.polyline
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                    fill="none" stroke="rgba(149,167,176,0.25)" strokeWidth={2}
                    strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round"
                    points={validLine} transform={`translate(${60}, 0)`}
                  />
                </svg>
              </div>

              <div className="flex items-center justify-center gap-8 mt-4">
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-slate-blue/70 rounded-full" />
                  <span className="text-sm text-white/35">Training Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-0.5 w-6 border-t-2 border-dashed border-slate-blue/25" />
                  <span className="text-sm text-white/35">Validation Accuracy</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-semibold tracking-tight">Model Highlights</h2>
            <p className="mt-2 text-sm text-white/35">Everything you need to trust the classification.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
            <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-2">
              <Card hover padding="md" className="h-full flex flex-col justify-between">
                <div>
                  <div className="h-9 w-9 mb-3 bg-slate-blue/[0.06] border border-slate-blue/15 rounded-xl flex items-center justify-center">
                    <Brain className="h-4 w-4 text-slate-blue/60" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">Custom Architecture</h3>
                  <p className="text-xs text-white/35 leading-relaxed">
                    3 convolutional blocks with batch normalization, dropout regularization, global average pooling, and dense classification head. Trained from scratch — no pretrained weights, no transfer learning.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-4 text-[11px] text-white/20">
                  <span>3 Conv Blocks</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-blue/15" />
                  <span>BatchNorm + Dropout</span>
                  <span className="w-0.5 h-0.5 rounded-full bg-slate-blue/15" />
                  <span>2.1M Params</span>
                </div>
              </Card>
            </motion.div>

            <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:row-span-2">
              <Card hover padding="md" className="h-full flex flex-col justify-between">
                <div>
                  <div className="h-9 w-9 mb-3 bg-slate-blue/[0.06] border border-slate-blue/15 rounded-xl flex items-center justify-center">
                    <Activity className="h-4 w-4 text-slate-blue/60" />
                  </div>
                  <h3 className="text-sm font-semibold mb-1">Performance</h3>
                  <p className="text-xs text-white/35 leading-relaxed mb-4">
                    Converges rapidly within first 5 epochs. Peak validation accuracy at epoch 15.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] text-white/30 mb-1">
                      <span>Training Accuracy</span>
                      <span className="tabular-nums">98.30%</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "98.3%" }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} className="h-full bg-slate-blue/70 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-white/30 mb-1">
                      <span>Validation Accuracy</span>
                      <span className="tabular-nums">99.19%</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "99.19%" }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 0.8 }} className="h-full bg-slate-blue/35 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-white/30 mb-1">
                      <span>Final Loss</span>
                      <span className="tabular-nums">0.0632</span>
                    </div>
                    <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "93.7%" }} viewport={{ once: true }} transition={{ delay: 1, duration: 0.8 }} className="h-full bg-slate-blue/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card hover padding="md" className="h-full">
                <div className="h-9 w-9 mb-3 bg-slate-blue/[0.06] border border-slate-blue/15 rounded-xl flex items-center justify-center">
                  <Gauge className="h-4 w-4 text-slate-blue/60" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Fast Inference</h3>
                <p className="text-xs text-white/35 leading-relaxed">
                  Lightweight 6.04M parameter model. Runs inference in milliseconds on CPU or GPU.
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xl font-semibold tabular-nums">~14ms</span>
                  <span className="text-[10px] text-white/25">per image</span>
                </div>
              </Card>
            </motion.div>

            <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card hover padding="md" className="h-full">
                <div className="h-9 w-9 mb-3 bg-slate-blue/[0.06] border border-slate-blue/15 rounded-xl flex items-center justify-center">
                  <Shield className="h-4 w-4 text-slate-blue/60" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Confidence Scoring</h3>
                <p className="text-xs text-white/35 leading-relaxed">
                  Softmax output layer provides calibrated probability distribution across all 4 cell types.
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-xl font-semibold">4</span>
                  <span className="text-[10px] text-white/25">class outputs</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-semibold tracking-tight">Built for hematology</h2>
            <p className="mt-2 text-sm text-white/35">Single custom CNN. Four cell types. Fast, interpretable results.</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-0.5 bg-white/[0.04] border border-white/[0.06] overflow-hidden hover:border-slate-blue/20 hover:shadow-[0_0_28px_4px_rgba(149,167,176,0.08)] transition-all duration-200"
            style={{ borderRadius: "var(--radius-glass)" }}
          >
            <div className="bg-black/80 backdrop-blur-2xl p-6" style={{ borderRadius: "calc(var(--radius-glass) - 2px)" }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WBC_CLASSES.map((cls) => {
                  const palette = classPalette[cls.id]
                  return (
                    <div key={cls.id} className={`text-center space-y-2 p-5 ${palette.bg} border ${palette.border} rounded-xl`}>
                      <p className={`text-sm font-semibold ${palette.text}`}>{cls.label}</p>
                      <p className="text-[11px] text-white/25 leading-relaxed line-clamp-3">{cls.description}</p>
                    </div>
                  )
                })}
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-slate-blue/15 to-transparent" />
              <div className="mt-6 flex items-center justify-center text-xs text-white/25 gap-6">
                <span>6.04M Parameters</span>
                <span className="w-1 h-1 rounded-full bg-slate-blue/25" />
                <span>Trained from Scratch</span>
                <span className="w-1 h-1 rounded-full bg-slate-blue/25" />
                <span>99.19% Peak Accuracy</span>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-slate-blue/8 py-8 px-6 text-center text-sm text-white/20">
        Orion — White Blood Cell Classification
      </footer>
    </div>
  )
}
