import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video, Sparkles, Download, Play, Pause, RefreshCw,
  Loader2, Smartphone, Monitor, Square, RectangleHorizontal,
  Film, ChevronRight, Layers
} from "lucide-react";

// Aspect ratios
const RATIOS = [
  { id: "9:16", label: "Reel / Story", icon: Smartphone, w: 360, h: 640, desc: "Instagram, TikTok, YouTube Shorts" },
  { id: "16:9", label: "YouTube", icon: Monitor, w: 640, h: 360, desc: "YouTube, Presentations" },
  { id: "1:1", label: "Square", icon: Square, w: 480, h: 480, desc: "Instagram Post, LinkedIn" },
  { id: "4:5", label: "Portrait", icon: RectangleHorizontal, w: 480, h: 600, desc: "Instagram Portrait" },
];

// Quick topic presets
const TOPICS = [
  { label: "Human Eye", prompts: ["human eye anatomy diagram labeled educational", "myopia hypermetropia defects of vision corrective lenses diagram", "light dispersion rainbow VIBGYOR prism physics", "retina cornea iris pupil close up illustration", "tyndall effect blue sky red sunset scattering light"], color: "from-emerald-500 to-teal-500" },
  { label: "Water Cycle", prompts: ["water cycle evaporation condensation precipitation diagram", "clouds rain formation weather cycle illustration", "river ocean mountain water cycle landscape", "underground water aquifer groundwater diagram", "rainwater harvesting water conservation educational"], color: "from-sky-500 to-blue-500" },
  { label: "Photosynthesis", prompts: ["photosynthesis process chloroplast diagram labeled", "sun light chlorophyll glucose oxygen reaction illustration", "leaf cross section mesophyll stomata chloroplast diagram", "food chain grass herbivore carnivore ecosystem diagram", "carbon dioxide water sunlight glucose plant illustration"], color: "from-green-500 to-emerald-500" },
  { label: "Pythagoras", prompts: ["pythagoras theorem right triangle squares colored diagram", "a squared plus b squared equals c squared visual proof", "pythagorean triplets 3 4 5 triangle diagram colorful", "hypotenuse perpendicular base right angle triangle labeled", "coordinate geometry distance formula maths diagram"], color: "from-blue-500 to-indigo-500" },
  { label: "Nationalism", prompts: ["Europe 1815 map nationalism movements historical illustration", "French revolution liberty equality fraternity painting", "Germany unification Bismarck blood iron historical map", "Italy unification Garibaldi red shirts historical painting", "nationalist symbols flags tricolour historical illustration"], color: "from-orange-500 to-amber-500" },
  { label: "Electricity", prompts: ["electric circuit diagram battery bulb switch wire labeled", "ohms law voltage current resistance diagram educational", "series parallel circuit diagram class 10 science", "electromagnetic induction motor generator diagram labeled", "magnetic field current carrying conductor right hand rule"], color: "from-yellow-500 to-orange-500" },
];

function buildImageUrl(prompt: string, seed: number) {
  const encoded = encodeURIComponent(prompt + " educational illustration high quality detailed clean");
  return `https://image.pollinations.ai/prompt/${encoded}?width=768&height=512&seed=${seed}&nologo=true&enhance=true&model=flux`;
}

type GeneratedFrame = { url: string; loaded: boolean; error: boolean };

export default function AiVideo() {
  const [topic, setTopic] = useState("");
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [frames, setFrames] = useState<GeneratedFrame[]>([]);
  const [generating, setGenerating] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(3); // seconds per frame
  const [recording, setRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Auto-advance frames when playing
  useEffect(() => {
    if (!playing || frames.length === 0) return;
    const loadedFrames = frames.filter(f => f.loaded);
    if (loadedFrames.length === 0) return;
    intervalRef.current = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, duration * 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, frames, duration]);

  // Draw current frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;
    const frame = frames[currentFrame];
    if (!frame || !frame.loaded || frame.error) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Cover fill
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      const sx = (canvas.width - sw) / 2;
      const sy = (canvas.height - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh);
    };
    img.src = frame.url;
  }, [currentFrame, frames, ratio]);

  const generateFrames = useCallback(async (customTopic?: string) => {
    const finalTopic = (customTopic || topic).trim();
    if (!finalTopic) return;
    setGenerating(true);
    setPlaying(false);
    setCurrentFrame(0);
    setRecordingBlob(null);

    // Generate prompts for topic
    const preset = TOPICS.find(t => t.label.toLowerCase() === finalTopic.toLowerCase());
    const prompts = preset?.prompts ?? [
      `${finalTopic} educational diagram labeled white background`,
      `${finalTopic} detailed illustration science textbook style`,
      `${finalTopic} colorful infographic educational poster`,
      `${finalTopic} process diagram step by step illustration`,
      `${finalTopic} concept map mind map educational colorful`,
    ];

    const seeds = prompts.map(() => Math.floor(Math.random() * 99999) + 1);
    const initial: GeneratedFrame[] = prompts.map((p, i) => ({
      url: buildImageUrl(p, seeds[i]),
      loaded: false,
      error: false
    }));
    setFrames(initial);
    setGenerating(false);

    // Load images progressively
    initial.forEach((frame, idx) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setFrames(prev => {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], loaded: true };
          return copy;
        });
      };
      img.onerror = () => {
        // Try without crossOrigin (fallback for display)
        setFrames(prev => {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], loaded: true }; // treat as loaded for display
          return copy;
        });
      };
      img.src = frame.url;
    });
  }, [topic]);

  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    chunksRef.current = [];
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordingBlob(blob);
      setRecording(false);
    };
    recorderRef.current = recorder;
    recorder.start();
    setRecording(true);
    setPlaying(true);
    // Auto-stop after all frames play once
    const totalDuration = frames.length * duration * 1000 + 500;
    setTimeout(() => {
      recorder.stop();
      setPlaying(false);
    }, totalDuration);
  };

  const downloadVideo = () => {
    if (!recordingBlob) return;
    const url = URL.createObjectURL(recordingBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `class10hub-reel-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadedCount = frames.filter(f => f.loaded).length;
  const allLoaded = frames.length > 0 && loadedCount === frames.length;

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }} className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.06 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-4 font-medium text-sm">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Film size={16} />
            </motion.div>
            AI Video Reel Generator
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-3">
            AI se Video Reels{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Banao!</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Koi bhi topic daalo — AI multiple educational frames generate karega aur animated reel banayega. Download karo!
          </p>
        </motion.div>

        {/* Quick Topic Buttons */}
        <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
          initial="hidden" animate="show" className="flex flex-wrap gap-3 mb-6 justify-center">
          {TOPICS.map((t) => (
            <motion.button key={t.label}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 340, damping: 26 } } }}
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
              onClick={() => { setTopic(t.label); generateFrames(t.label); }}
              className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${t.color} text-white font-bold text-sm shadow-md`}>
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Controls */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Topic Input */}
          <div className="bg-card border border-border rounded-3xl p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Topic / Subject</p>
            <div className="flex gap-2">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") generateFrames(); }}
                placeholder="e.g. Human Eye, Water Cycle, Electricity..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => generateFrames()}
                disabled={generating || !topic.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-bold text-sm disabled:opacity-50">
                {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                Generate
              </motion.button>
            </div>
          </div>

          {/* Ratio Selector */}
          <div className="bg-card border border-border rounded-3xl p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Video Ratio</p>
            <div className="grid grid-cols-4 gap-2">
              {RATIOS.map((r) => (
                <motion.button key={r.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setRatio(r)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-semibold transition-all ${ratio.id === r.id ? "bg-primary text-white" : "bg-secondary hover:bg-secondary/70"}`}>
                  <r.icon size={14} />
                  <span>{r.id}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Preview Area */}
        <AnimatePresence mode="wait">
          {frames.length === 0 && !generating ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-card border-2 border-dashed border-border rounded-3xl p-16 text-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                <Video size={36} className="text-rose-500" />
              </motion.div>
              <h3 className="text-xl font-display font-bold mb-2">Video Reel Banao!</h3>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Upar se topic choose karo ya apna daalo — AI 5 educational frames generate karega aur animated reel banayega.
              </p>
            </motion.div>
          ) : (
            <motion.div key="preview" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="grid lg:grid-cols-[1fr,auto] gap-6">

              {/* Frame strip + main preview */}
              <div className="space-y-4">
                {/* Loading progress */}
                {!allLoaded && (
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold">Frames generate ho rahe hain...</p>
                      <p className="text-sm font-bold text-primary">{loadedCount}/{frames.length}</p>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        animate={{ width: `${(loadedCount / Math.max(frames.length, 1)) * 100}%` }}
                        className="h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                )}

                {/* Frame thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {frames.map((frame, i) => (
                    <motion.button key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: frame.loaded ? 1 : 0.4, scale: 1 }}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => { setCurrentFrame(i); setPlaying(false); }}
                      className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${currentFrame === i ? "border-primary shadow-lg shadow-primary/25" : "border-border"}`}>
                      {frame.loaded ? (
                        <img src={frame.url} alt={`Frame ${i + 1}`}
                          className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-secondary animate-pulse flex items-center justify-center">
                          <Loader2 size={12} className="animate-spin text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute bottom-0.5 right-0.5 bg-black/60 text-white text-[9px] font-bold px-1 rounded">
                        {i + 1}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Main Frame Display */}
                {frames[currentFrame] && (
                  <div className="relative bg-black rounded-3xl overflow-hidden" style={{ aspectRatio: ratio.w / ratio.h }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentFrame + frames[currentFrame]?.url}
                        src={frames[currentFrame].loaded ? frames[currentFrame].url : undefined}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                        alt={`Frame ${currentFrame + 1}`}
                      />
                    </AnimatePresence>
                    {!frames[currentFrame].loaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-secondary animate-pulse">
                        <Loader2 className="animate-spin text-muted-foreground" />
                      </div>
                    )}
                    {/* Frame indicator */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {frames.map((_, i) => (
                        <motion.div key={i}
                          animate={{ width: currentFrame === i ? 24 : 6, opacity: currentFrame === i ? 1 : 0.5 }}
                          className="h-1.5 bg-white rounded-full"
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                    {/* Ratio badge */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg">
                      {ratio.id}
                    </div>
                    {playing && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute top-3 right-3 flex items-center gap-1 bg-rose-500/80 text-white text-xs font-bold px-2 py-1 rounded-lg">
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                          className="w-1.5 h-1.5 bg-white rounded-full" />
                        LIVE
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Playback controls */}
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Speed control */}
                  <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-3 py-2">
                    <span className="text-xs font-bold text-muted-foreground">Speed:</span>
                    {[2, 3, 5].map((s) => (
                      <motion.button key={s} whileTap={{ scale: 0.9 }}
                        onClick={() => setDuration(s)}
                        className={`text-xs font-bold px-2 py-1 rounded-lg transition-all ${duration === s ? "bg-primary text-white" : "hover:bg-secondary"}`}>
                        {s}s
                      </motion.button>
                    ))}
                  </div>

                  {/* Play/Pause */}
                  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    onClick={() => setPlaying(!playing)}
                    disabled={!allLoaded}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-bold text-sm disabled:opacity-50">
                    {playing ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play Reel</>}
                  </motion.button>

                  {/* Regenerate */}
                  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    onClick={() => generateFrames()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-2xl font-bold text-sm">
                    <RefreshCw size={14} /> Naya Reel
                  </motion.button>
                </div>
              </div>

              {/* Canvas + Download panel */}
              <div className="flex flex-col gap-4">
                {/* Hidden canvas for recording */}
                <canvas ref={canvasRef} width={ratio.w} height={ratio.h} className="hidden" />

                {/* Download section */}
                <div className="bg-card border border-border rounded-3xl p-5 space-y-3 min-w-52">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Download size={16} className="text-rose-500" /> Download
                  </p>

                  {/* Record & Download as video */}
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={recording ? undefined : startRecording}
                    disabled={!allLoaded || recording}
                    className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                      ${recording ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg disabled:opacity-50"}`}>
                    {recording ? (
                      <><motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.7, repeat: Infinity }}
                        className="w-3 h-3 bg-white rounded-full" /> Recording...</>
                    ) : (
                      <><Film size={16} /> Record & Download</>
                    )}
                  </motion.button>

                  {recordingBlob && (
                    <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={downloadVideo}
                      className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                      <Download size={16} /> Save Video (.webm)
                    </motion.button>
                  )}

                  {/* Download individual frames */}
                  <p className="text-xs font-bold text-muted-foreground pt-2 border-t">Frames download karo:</p>
                  {frames.map((frame, i) => frame.loaded && (
                    <a key={i} href={frame.url} download={`frame-${i + 1}.jpg`} target="_blank" rel="noopener noreferrer">
                      <motion.div whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground py-1.5 transition-all">
                        <div className="w-8 h-6 rounded overflow-hidden flex-shrink-0">
                          <img src={frame.url} alt="" className="w-full h-full object-cover" />
                        </div>
                        Frame {i + 1}
                        <ChevronRight size={12} className="ml-auto" />
                      </motion.div>
                    </a>
                  ))}
                </div>

                {/* Ratio info */}
                <div className="bg-card border border-border rounded-2xl p-4 text-xs text-muted-foreground space-y-1">
                  <p className="font-bold text-foreground flex items-center gap-1"><Layers size={12} /> {ratio.id} — {ratio.label}</p>
                  <p>{ratio.desc}</p>
                  <p className="pt-1">{ratio.w} × {ratio.h} px</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm text-rose-700 dark:text-rose-400 flex items-start gap-3">
          <span className="text-xl">🎬</span>
          <div>
            <strong>Tips:</strong> Play karo aur screen record karo — best quality ke liye. "Record & Download" canvas ko WebM mein save karta hai jo MP4 mein convert ho sakta hai. Har reel mein 5 unique AI frames hote hain — "Naya Reel" se naye frames aayenge!
          </div>
        </motion.div>
      </div>
    </div>
  );
}
