import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Sparkles, Download, RefreshCw, Wand2, BookOpen, FlaskConical, Globe, Calculator, Loader2, ZoomIn, X } from "lucide-react";

const QUICK_PROMPTS = [
  { icon: FlaskConical, label: "Human Eye Diagram", prompt: "human eye anatomy diagram labeled cornea iris pupil lens retina optic nerve educational science textbook style white background", color: "from-emerald-500 to-teal-500" },
  { icon: Calculator, label: "Pythagoras Theorem", prompt: "pythagoras theorem right angle triangle a squared plus b squared equals c squared colorful educational math diagram white background", color: "from-blue-500 to-indigo-500" },
  { icon: FlaskConical, label: "Carbon Bonds", prompt: "carbon covalent bonding methane CH4 molecule Lewis structure educational chemistry illustration colorful labeled", color: "from-green-500 to-emerald-500" },
  { icon: Globe, label: "Rise of Nationalism", prompt: "historical map Europe 1815 nationalism movements Germany Italy unification colorful political map educational illustration", color: "from-orange-500 to-amber-500" },
  { icon: BookOpen, label: "Food Chain", prompt: "simple food chain forest ecosystem grass grasshopper frog snake eagle colorful educational biology diagram labeled arrows white background", color: "from-violet-500 to-purple-500" },
  { icon: FlaskConical, label: "Refraction of Light", prompt: "light refraction glass prism dispersion VIBGYOR rainbow spectrum physics diagram labeled educational illustration white background", color: "from-yellow-500 to-orange-500" },
  { icon: Calculator, label: "Number Line", prompt: "number line rational irrational numbers square root 2 marked educational maths diagram colorful labeled clean style", color: "from-cyan-500 to-blue-500" },
  { icon: Globe, label: "Water Cycle", prompt: "water cycle diagram evaporation condensation precipitation collection colorful educational geography illustration labeled white background", color: "from-sky-500 to-cyan-500" },
];

function buildUrl(prompt: string, seed: number) {
  const clean = prompt.trim().replace(/[^\w\s,.-]/g, " ").trim();
  const encoded = encodeURIComponent(clean + " educational illustration high quality");
  return `https://image.pollinations.ai/prompt/${encoded}?width=768&height=512&seed=${seed}&nologo=true&enhance=true&model=flux`;
}

export default function AiImage() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [seed, setSeed] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  const generateImage = useCallback((customPrompt?: string) => {
    const finalPrompt = (customPrompt || prompt).trim();
    if (!finalPrompt) return;
    const newSeed = Math.floor(Math.random() * 99999) + 1;
    setSeed(newSeed);
    setImgLoaded(false);
    setImgError(false);
    setImageUrl(null);
    setLoading(true);
    // Small delay so React can re-render the loading state before the new img src triggers
    setTimeout(() => {
      setImageUrl(buildUrl(finalPrompt, newSeed));
    }, 100);
  }, [prompt]);

  const handleImgLoad = () => {
    setImgLoaded(true);
    setLoading(false);
  };

  const handleImgError = () => {
    setImgError(true);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `class10hub-${seed}.jpg`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRegenerate = () => {
    if (prompt.trim()) generateImage();
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.06 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4 font-medium text-sm"
          >
            <motion.div animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Wand2 size={16} />
            </motion.div>
            AI Image Generator
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-3">
            AI se Diagrams{" "}
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">Banao!</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Class 10 ke liye koi bhi diagram describe karo — AI bilkul free mein bana dega!
          </p>
        </motion.div>

        {/* Quick Prompts */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {QUICK_PROMPTS.map((p) => (
            <motion.button
              key={p.label}
              variants={{ hidden: { opacity: 0, y: 10, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 340, damping: 26 } } }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setPrompt(p.prompt); generateImage(p.prompt); }}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border hover:border-primary/40 text-sm font-medium transition-all text-center"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white shadow-md`}>
                <p.icon size={18} />
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-tight">{p.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Input Box */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} className="mb-8">
          <div className="bg-card border border-border rounded-3xl p-4 shadow-lg">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generateImage(); } }}
              placeholder='Diagram describe karo... e.g. "Human eye anatomy diagram labeled"'
              rows={3}
              className="w-full bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground mb-3"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Enter press karo ya Generate dabaao</p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => generateImage()}
                disabled={loading || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div key="load" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Loader2 size={16} className="animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div key="wand" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
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

          {/* Loading shimmer while image loads */}
          {loading && !imgLoaded && (
            <motion.div key="shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
              <div className="w-full h-72 bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-pulse" />
              <div className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary animate-pulse" />
                <div className="flex-1 h-4 bg-secondary rounded-full animate-pulse" />
              </div>
              <div className="pb-4 px-4 text-center">
                <p className="text-sm text-muted-foreground animate-pulse">AI image bana raha hai — 10-20 seconds lagte hain...</p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {imgError && !loading && (
            <motion.div key="error" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-3xl p-8 text-center">
              <div className="text-4xl mb-3">😕</div>
              <p className="font-bold text-red-600 dark:text-red-400 mb-1">Image load nahi hua!</p>
              <p className="text-sm text-muted-foreground mb-4">Pollinations server busy hai — dobara try karo</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRegenerate}
                className="px-6 py-2.5 bg-red-500 text-white rounded-2xl font-bold text-sm">
                Dobara Try Karo
              </motion.button>
            </motion.div>
          )}

          {/* Image Result (hidden img always present when url set, shown after load) */}
          {imageUrl && !imgError && (
            <motion.div key="result" initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: imgLoaded ? 1 : 0, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className={`bg-card border border-border rounded-3xl overflow-hidden shadow-2xl ${imgLoaded ? "" : "hidden"}`}>
              <div className="relative group cursor-zoom-in" onClick={() => setZoomOpen(true)}>
                <img
                  src={imageUrl}
                  alt="AI Generated diagram"
                  onLoad={handleImgLoad}
                  onError={handleImgError}
                  className="w-full h-auto max-h-[520px] object-contain bg-white dark:bg-gray-950"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-2xl px-4 py-2 flex items-center gap-2 text-sm font-bold text-gray-800">
                    <ZoomIn size={18} /> Zoom karo
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-muted-foreground flex-1 truncate">
                  AI Generated — "{prompt.slice(0, 55)}{prompt.length > 55 ? "..." : ""}"
                </p>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={handleRegenerate}
                    className="flex items-center gap-1.5 px-4 py-2 bg-secondary rounded-xl text-sm font-semibold">
                    <RefreshCw size={14} /> Regenerate
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 text-white rounded-xl text-sm font-bold">
                    <Download size={14} /> Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!imageUrl && !loading && !imgError && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-card border-2 border-dashed border-border rounded-3xl p-16 text-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-6">
                <Image size={36} className="text-violet-500" />
              </motion.div>
              <h3 className="text-xl font-display font-bold mb-2">Apna Diagram Banao!</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Upar se quick prompt choose karo ya apna description type karo — AI free mein diagram bana dega!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom Modal */}
        <AnimatePresence>
          {zoomOpen && imageUrl && imgLoaded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setZoomOpen(false)}
              className="fixed inset-0 z-[100] bg-black/88 flex items-center justify-center p-4 cursor-zoom-out">
              <motion.img
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.82, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                src={imageUrl} alt="Zoomed"
                className="max-w-full max-h-[92vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button onClick={() => setZoomOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center text-xl font-bold hover:bg-white/30">
                <X size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tips */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-8 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl text-sm text-amber-700 dark:text-amber-400 flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <strong>Best Results ke liye:</strong> English mein specific words use karo — "labeled diagram", "white background", "educational", subject name zaroor daalo. Agar image nahi aata toh Regenerate karo — free AI hai, kabhi kabhi busy hota hai!
          </div>
        </motion.div>
      </div>
    </div>
  );
}
