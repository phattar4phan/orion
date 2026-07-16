import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, X, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useUpload } from '@/hooks/useUpload';

export default function UploadPage() {
  const { file, previewUrl, isDragging, handleFile, handleDrop, handleDragOver, handleDragLeave, reset } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith('image/')) handleFile(f);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white/90">Upload Image</h1>
        <p className="text-sm text-white/40 mt-1">Select an image to classify with all five models.</p>
      </div>

      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <div
              className={`relative glass-card p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
                ${isDragging ? 'border-white/[0.15] bg-white/[0.06] scale-[1.01]' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <motion.div
                className="w-20 h-20 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-6"
                animate={{ scale: isDragging ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {isDragging ? (
                  <Upload size={28} className="text-white/60" strokeWidth={1.5} />
                ) : (
                  <Image size={28} className="text-white/30" strokeWidth={1.5} />
                )}
              </motion.div>

              <h3 className="text-base font-medium text-white/70 mb-2">
                {isDragging ? 'Drop your image here' : 'Drag and drop your image'}
              </h3>
              <p className="text-xs text-white/30 mb-4">PNG, JPG, or TIFF up to 50MB</p>

              <div className="flex items-center gap-2 text-xs text-white/20">
                <div className="h-px w-8 bg-white/[0.06]" />
                <span>or</span>
                <div className="h-px w-8 bg-white/[0.06]" />
              </div>

              <button
                className="mt-4 px-6 py-2.5 glass text-white/60 text-sm font-medium rounded-lg hover:bg-white/[0.06] hover:text-white/80 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Browse Files
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Image Preview */}
            <div className="glass-card overflow-hidden">
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-96 object-contain bg-black/40"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reset();
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white/90 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">{file?.name}</p>
                  <p className="text-xs text-white/30 mt-0.5">
                    {(file!.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Check size={16} className="text-white/30" />
              </div>
            </div>

            {/* Continue button */}
            <div className="flex items-center justify-end gap-3">
              <Button variant="ghost" onClick={reset}>
                Remove
              </Button>
              <Button variant="primary" onClick={() => navigate('/models')}>
                Continue to Model Selection
                <ArrowRight size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
