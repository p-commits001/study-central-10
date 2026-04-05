import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Sparkles, Download, RefreshCw, Wand2, BookOpen, FlaskConical, Globe, Calculator, Loader2, ZoomIn } from "lucide-react";
import { staggerContainer } from "@/lib/animations";

const QUICK_PROMPTS = [
  { icon: FlaskConical, label: "Human Eye Diagram", prompt: "Detailed diagram of human eye anatomy showing cornea, iris, pupil, lens, retina, optic nerve, labeled, educational science textbook style, white background, clear labels", color: "from-emerald-500 to-teal-500" },
  { icon: Calculator, label: "Pythagoras Theorem", prompt: "Pythagoras theorem visual proof diagram, right angled triangle with squares on each side showing a squared plus b squared equals c squared, colorful educational math diagram, clean white background", color: "from-blue-500 to-indigo-500" },
  { icon: FlaskConical, label: "Carbon Bonds", prompt: "Carbon covalent bonding diagram showing methane CH4 and ethane C2H6 molecules, Lewis dot structure, educational chemistry illustration, colorful, labeled", color: "from-green-500 to-emerald-500" },
  { icon: Globe, label: "Rise of Nationalism", prompt: "Historical map of Europe 1815 showing nationalistic movements, Germany and Italy unification map, colorful political map, educational history illustration", color: "from-orange-500 to-amber-500" },
  { icon: BookOpen, label: "Food Chain", prompt: "Simple food chain diagram in a forest ecosystem: grass, grasshopper, frog, snake, eagle, colorful educational biology illustration, labeled arrows, white background", color: "from-violet-500 to-purple-500" },
  { icon: FlaskConical, label: "Refraction of Light", prompt: "Light refraction through glass prism showing dispersion into VIBGYOR rainbow spectrum, physics diagram, labeled, educational illustration, clean white background", color: "from-yellow-500 to-orange-500" },
  { icon: Calculator, label: "Number Line", prompt: "Number line showing rational and irrational numbers, square root of 2 marked, educational maths diagram, colorful, labeled, clean style", color: "from-cyan-500 to-blue-500" },
  { icon: Globe, label: "Water Cycle", prompt: "Water cycle diagram showing evaporation, condensation, precipitation, collection, colorful educational geography illustration, labeled, clean background", color: "from-sky-500 to-cyan-500" },
];

export default function AiImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 99999));
  const [zoomOpen, setZoomOpen] = useState(false);

  const generateImage = async (customPrompt?: string) => {
    const finalPrompt = (customPrompt || prompt).trim();
    if (!finalPrompt) return;
    setLoading(true);
    setError("");
    setImageUrl(null);
    const newSeed = Math.floor(Math.random() * 99999);
    setSeed(newSeed);
    const encoded = encodeURIComponent(
      finalPrompt + ", educational illustration, high quality, detailed, sharp"
    );
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=512&seed=${newSeed}&nologo=true&enhance=true`;
    try {
      // Preload image
      await new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
        setTimeout(() => resolve(), 30000); // 30s max timeout
      });
      setImageUrl(url);
    } catch {
      setError("Image generate nahi hua. Dobara try karo!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `class10hub-ai-image-${seed}.jpg`;
    link.target = "_blank";
    link.click();
  };

  const handleRegenerate = () => {
    if (prompt.trim()) generateImage();
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.08 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4 font-medium text-sm"
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Wand2 size={16} />
            </motion.div>
            AI Image Generator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-extrabold mb-3"
          >
            AI se Diagrams{" "}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Banao!
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Class 10 ke liye koi bhi diagram ya illustration describe karo — AI turant bana dega! 
            Science, Maths, History — sab subjects ke liye.
          </motion.p>
        </motion.div>

        {/* Quick Prompts */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {QUICK_PROMPTS.map((p) => (
            <motion.button
              key={p.label}
              variants={{ hidden: { opacity: 0, y: 12, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 10px 24px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setPrompt(p.prompt); generateImage(p.prompt); }}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border hover:border-primary/40 text-sm font-medium transition-all text-center"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-md`}
              >
                <p.icon size={18} />
              </motion.div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{p.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Input Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-3xl p-4 shadow-lg">
            <motion.textarea
              whileFocus={{ boxShadow: "0 0 0 3px rgba(139,92,246,0.2)" }}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generateImage(); } }}
              placeholder='Diagram describe karo... e.g. "Human eye anatomy diagram labeled" ya "Photosynthesis process diagram"'
              rows={3}
              className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground mb-3"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Enter press karo ya Generate button dabaao</p>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(139,92,246,0.35)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => generateImage()}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="loading" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Loader2 size={16} className="animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div key="wand" initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                      <Sparkles size={16} />
                    </motion.div>
                  )}
                </AnimatePresence>
                {loading ? "Bana raha hai..." : "Generate"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Result Area */}
        <AnimatePresence mode="wait">

          {/* Loading State */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl p-12 text-center shadow-xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary mx-auto mb-6"
              />
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <p className="text-lg font-bold mb-2">AI Image bana raha hai...</p>
                <p className="text-muted-foreground text-sm">Thoda wait karo — 10-20 seconds lagte hain</p>
              </motion.div>
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 h-6 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-3xl p-8 text-center"
            >
              <div className="text-4xl mb-3">😕</div>
              <p className="font-bold text-red-600 dark:text-red-400">{error}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegenerate}
                className="mt-4 px-6 py-2.5 bg-red-500 text-white rounded-2xl font-bold text-sm"
              >
                Dobara Try Karo
              </motion.button>
            </motion.div>
          )}

          {/* Image Result */}
          {imageUrl && !loading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative group">
                <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={imageUrl}
                  alt="AI Generated diagram"
                  className="w-full h-auto max-h-[500px] object-contain bg-white dark:bg-gray-900"
                />
                {/* Zoom overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  onClick={() => setZoomOpen(true)}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-zoom-in"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="bg-white/90 rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-800"
                  >
                    <ZoomIn size={18} /> Click to Zoom
                  </motion.div>
                </motion.div>
              </div>

              {/* Action buttons */}
              <div className="p-4 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-muted-foreground flex-1 truncate">
                  🎨 AI Generated: "{(prompt).slice(0, 60)}{prompt.length > 60 ? "..." : ""}"
                </p>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleRegenerate}
                    className="flex items-center gap-1.5 px-4 py-2 bg-secondary rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <RefreshCw size={14} /> Regenerate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.08, boxShadow: "0 6px 16px rgba(139,92,246,0.3)" }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl text-sm font-bold"
                  >
                    <Download size={14} /> Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!imageUrl && !loading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card border-2 border-dashed border-border rounded-3xl p-16 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6"
              >
                <Image size={36} className="text-violet-500" />
              </motion.div>
              <h3 className="text-xl font-display font-bold mb-2">Apna Diagram Banao!</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Upar se koi quick prompt choose karo ya apna description type karo — AI bilkul free mein diagram bana dega!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Modal */}
        <AnimatePresence>
          {zoomOpen && imageUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setZoomOpen(false)}
              className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                src={imageUrl}
                alt="Zoomed AI diagram"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setZoomOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-xl font-bold"
              >
                ×
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl text-sm text-amber-700 dark:text-amber-400 flex items-start gap-3"
        >
          <span className="text-xl">💡</span>
          <div>
            <strong>Tips:</strong> Best results ke liye specific words use karo — "labeled diagram", "white background", "educational style", subject name zaroor daalo. Images free AI se generate hoti hain, quality thodi vary ho sakti hai.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
