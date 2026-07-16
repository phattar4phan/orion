import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BarChart3, Shield, Cpu } from 'lucide-react';

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="glow-orb w-[800px] h-[800px] -top-40 left-1/2 -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }}
      />
      <div
        className="glow-orb w-[500px] h-[500px] top-1/2 -left-20"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />
      <div
        className="glow-orb w-[600px] h-[600px] -bottom-40 right-0"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}

function FloatingCards() {
  return (
    <div className="relative h-96">
      {[
        { x: '10%', y: '10%', rotate: -6, delay: 0 },
        { x: '60%', y: '5%', rotate: 3, delay: 0.2 },
        { x: '75%', y: '60%', rotate: -2, delay: 0.4 },
        { x: '20%', y: '65%', rotate: 4, delay: 0.6 },
        { x: '45%', y: '40%', rotate: -5, delay: 0.3 },
      ].map((card, i) => (
        <motion.div
          key={i}
          className="absolute w-48 h-32 glass rounded-xl p-4"
          style={{ left: card.x, top: card.y }}
          animate={{
            y: [0, -12, 0],
            rotate: [card.rotate, card.rotate + 1, card.rotate],
          }}
          transition={{
            duration: 5,
            delay: card.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="h-2 w-3/4 bg-white/[0.08] rounded-full mb-3" />
          <div className="h-2 w-1/2 bg-white/[0.05] rounded-full mb-2" />
          <div className="h-2 w-2/3 bg-white/[0.05] rounded-full mb-4" />
          <div className="flex gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const FEATURES = [
  { icon: Zap, title: 'Parallel Execution', description: 'Run all five models simultaneously for instant comparison.' },
  { icon: BarChart3, title: 'Smart Comparison', description: 'Confidence scores, speed metrics, and ranked results.' },
  { icon: Shield, title: 'Production Ready', description: 'Battle-tested architecture. Deploy with confidence.' },
  { icon: Cpu, title: 'Five Architectures', description: 'Compare ResNet, EfficientNet, ViT, DenseNet, and MobileNet.' },
];

const MODELS_PREVIEW = ['ResNet-50', 'EfficientNet-B0', 'Vision Transformer', 'DenseNet-121', 'MobileNetV3'];

export default function LandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={ref} className="min-h-screen bg-pure-black noise-bg overflow-hidden">
      <HeroBackground />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
            <Sparkles size={16} className="text-black" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-semibold text-white">Orion</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-sm text-white/50 hover:text-white/80 transition-colors">
            Dashboard
          </Link>
          <Link
            to="/upload"
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-all duration-200"
          >
            Get Started
            <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <motion.section className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40" style={{ opacity, scale }}>
        <motion.div
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-white/30" />
          <span className="text-xs text-white/60">AI Image Classification Platform</span>
        </motion.div>

        <motion.h1
          className="text-hero font-extrabold text-gradient max-w-4xl mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Compare five AI models. Find the best one.
        </motion.h1>

        <motion.p
          className="text-lg text-white/40 max-w-xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Run ResNet, EfficientNet, Vision Transformer, DenseNet, and MobileNet
          against your images. Compare predictions, speed, and accuracy — all in one place.
        </motion.p>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            to="/upload"
            className="flex items-center gap-2 px-8 py-3.5 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-all duration-200 shadow-glow"
          >
            Start Analyzing
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-3.5 glass text-white/70 text-sm font-medium rounded-xl hover:bg-white/[0.06] hover:text-white transition-all duration-200"
          >
            View Dashboard
          </Link>
        </motion.div>
      </motion.section>

      {/* Model Cards Row */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-6 pb-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white/90 mb-3">Five State-of-the-Art Models</h2>
          <p className="text-white/40">Built-in. Ready to compare. No setup required.</p>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {MODELS_PREVIEW.map((name, i) => (
            <motion.div
              key={name}
              className="glass-card p-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center mx-auto mb-3">
                <Cpu size={18} className="text-white/50" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-medium text-white/70 leading-tight">{name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        className="relative z-10 max-w-6xl mx-auto px-6 pb-48"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-white/90 mb-3">Built for speed and clarity</h2>
          <p className="text-white/40">Everything you need to compare and choose the right model.</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-card-hover p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4">
                <feature.icon size={16} className="text-white/60" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-white/80 mb-2">{feature.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Floating cards demo */}
      <motion.section
        className="relative z-10 max-w-4xl mx-auto px-6 pb-48"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
          <h2 className="relative text-xl font-bold text-white/90 mb-2">See it in action</h2>
          <p className="relative text-sm text-white/40 mb-8">Upload an image and watch all five models run in parallel.</p>
          <FloatingCards />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white/[0.06]">
              <Sparkles size={12} className="text-white/40" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-white/30">Orion</span>
          </div>
          <p className="text-xs text-white/20">Precision. Intelligence. Speed.</p>
        </div>
      </footer>
    </div>
  );
}
