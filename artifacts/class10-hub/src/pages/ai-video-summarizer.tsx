import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Music, VolumeX, Download, Sparkles, Loader2, Wand2, RefreshCw, Video } from "lucide-react";

const POPULAR_TOPICS = [
  "Photosynthesis", "Ohm's Law", "Quadratic Equations", "French Revolution",
  "Carbon Compounds", "Magnetic Effects of Current", "Trigonometry", "Heredity and Evolution",
  "Acid Base Reactions", "Human Eye", "Polynomials", "Life Processes"
];

const GRADIENT_THEMES = [
  ["#667eea", "#764ba2"],
  ["#11998e", "#38ef7d"],
  ["#f7971e", "#ffd200"],
  ["#f953c6", "#b91d73"],
  ["#4776e6", "#8e54e9"],
  ["#00b4db", "#0083b0"],
];

async function fetchFacts(topic: string): Promise<string[]> {
  const prompt = `You are a CBSE Class 10 teacher. Give exactly 5 short, important key points about "${topic}" for board exams. 
Format: Return ONLY 5 numbered facts, each max 12 words. No intro, no conclusion. Just the 5 facts.
Example:
1. Mitochondria produce ATP energy through cellular respiration process.
2. Called powerhouse because it generates most cellular energy.`;

  const res = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      model: "openai",
      seed: Math.floor(Math.random() * 9999),
    }),
  });
  if (!res.ok) throw new Error("Failed to fetch facts");
  const text = await res.text();
  const lines = text.split("\n").map(l => l.trim()).filter(l => /^\d\./.test(l));
  if (lines.length >= 3) return lines.slice(0, 5).map(l => l.replace(/^\d\.\s*/, ""));
  const sentences = text.split(/[.\n]/).map(s => s.trim()).filter(s => s.length > 10 && s.length < 100);
  return sentences.slice(0, 5);
}

class MusicPlayer {
  private ctx: AudioContext | null = null;
  private nodes: OscillatorNode[] = [];
  private gainNode: GainNode | null = null;
  private running = false;

  start() {
    this.ctx = new AudioContext();
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.06, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);
    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    const melody = [0, 2, 4, 7, 4, 2, 0, 5, 3, 5, 7, 5, 3, 5];
    this.running = true;
    let time = this.ctx.currentTime;
    const beatDur = 0.35;
    const playNext = (idx: number) => {
      if (!this.running || !this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(notes[melody[idx % melody.length]], time);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, time);
      g.gain.linearRampToValueAtTime(0.12, time + 0.05);
      g.gain.linearRampToValueAtTime(0, time + beatDur * 0.8);
      osc.connect(g);
      g.connect(this.gainNode);
      osc.start(time);
      osc.stop(time + beatDur);
      time += beatDur;
      if (this.running) setTimeout(() => playNext(idx + 1), beatDur * 900);
    };
    playNext(0);
  }

  stop() {
    this.running = false;
    this.nodes.forEach(n => { try { n.stop(); } catch {} });
    this.nodes = [];
    if (this.ctx) { this.ctx.close(); this.ctx = null; }
  }
}

function AnimatedBackground({ theme }: { theme: [string, string] }) {
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 4,
    }))
  );
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `linear-gradient(135deg, ${theme[0]}, ${theme[1]})` }}>
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ y: [p.y + "%", (p.y - 20) + "%", p.y + "%"], x: [p.x + "%", (p.x + 5) + "%", p.x + "%"], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          className="absolute rounded-full bg-white"
          style={{ width: p.size, height: p.size, filter: "blur(8px)" }}
        />
      ))}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}

function VideoReel({ topic, facts, theme, isPlaying }: { topic: string; facts: string[]; theme: [string, string]; isPlaying: boolean }) {
  const [currentFact, setCurrentFact] = useState(0);
  const [scene, setScene] = useState<"title" | "fact" | "end">("title");
  const [sceneIdx, setSceneIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const SCENE_DURATION = 3000;

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setScene("title"); setCurrentFact(0); setSceneIdx(0);
      return;
    }
    setScene("title"); setSceneIdx(0); setCurrentFact(0);
    let step = 0;
    const total = 2 + facts.length;
    intervalRef.current = setInterval(() => {
      step++;
      if (step === 0) { setScene("title"); }
      else if (step <= facts.length) { setScene("fact"); setCurrentFact(step - 1); }
      else { setScene("end"); }
      if (step >= total) { clearInterval(intervalRef.current!); }
    }, SCENE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, facts]);

  const emojiFor = (i: number) => ["🔬", "📐", "💡", "🌿", "⚡", "🧪"][i % 6];

  return (
    <div className="relative w-full aspect-[9/16] max-w-xs mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
      <AnimatedBackground theme={theme} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-10">
        <AnimatePresence mode="wait">

          {scene === "title" && (
            <motion.div key="title" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }} className="text-center">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-4">📚</motion.div>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs font-bold tracking-widest uppercase mb-3 bg-white/20 px-3 py-1 rounded-full">Class 10 · Key Facts</motion.div>
              <h1 className="text-3xl font-black leading-tight">{topic}</h1>
              <p className="text-white/60 text-sm mt-2">{facts.length} Important Points</p>
            </motion.div>
          )}

          {scene === "fact" && (
            <motion.div key={`fact-${currentFact}`} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }} className="text-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-5">{emojiFor(currentFact)}</motion.div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-white/20">
                <div className="text-xs font-bold text-white/60 mb-2">Point {currentFact + 1}/{facts.length}</div>
                <p className="text-lg font-bold leading-snug">{facts[currentFact]}</p>
              </div>
              <div className="flex justify-center gap-1.5 mt-4">
                {facts.map((_, i) => (
                  <motion.div key={i}
                    animate={i === currentFact ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className={`h-1.5 rounded-full transition-all ${i === currentFact ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} />
                ))}
              </div>
            </motion.div>
          )}

          {scene === "end" && (
            <motion.div key="end" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }} className="text-center">
              <motion.div animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-4">🏆</motion.div>
              <h2 className="text-2xl font-black mb-2">You Got It! 🎉</h2>
              <p className="text-white/70 text-sm mb-4">Share this reel with your classmates</p>
              <div className="bg-white/20 rounded-xl px-4 py-2 text-xs font-bold">study-central-10.pages.dev</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">🎓</div>
          <span className="text-xs font-bold text-white/80">Class 10 Hub</span>
          <div className="ml-auto text-xs text-white/60">#BoardExam2026-27</div>
        </div>
      </div>

      {/* Frame counter */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
          <div className="text-white text-center">
            <Play size={48} className="mx-auto mb-2 opacity-80" />
            <p className="text-sm font-bold opacity-80">Press Play to Start Reel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AiVideoSummarizer() {
  const [topic, setTopic] = useState("");
  const [facts, setFacts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const [generated, setGenerated] = useState(false);
  const musicRef = useRef<MusicPlayer | null>(null);

  const toggleMusic = () => {
    if (musicOn) {
      musicRef.current?.stop(); musicRef.current = null; setMusicOn(false);
    } else {
      const player = new MusicPlayer(); player.start(); musicRef.current = player; setMusicOn(true);
    }
  };

  useEffect(() => { return () => { musicRef.current?.stop(); }; }, []);

  const generateReel = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(""); setIsPlaying(false); setGenerated(false);
    setThemeIdx(Math.floor(Math.random() * GRADIENT_THEMES.length));
    try {
      const result = await fetchFacts(topic.trim());
      setFacts(result);
      setGenerated(true);
    } catch (e) {
      setError("Facts fetch nahi hua. Dobara try karo!");
    } finally { setLoading(false); }
  };

  const handlePlay = () => { setIsPlaying(v => !v); };

  const downloadReel = () => {
    const text = `📚 ${topic} - Key Facts\n\n${facts.map((f, i) => `${i + 1}. ${f}`).join("\n")}\n\n🎓 Class 10 Hub · study-central-10.pages.dev`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${topic.replace(/\s+/g, "_")}_facts.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className="text-center mb-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
            <Video size={16} /> AI Reel Maker
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
            AI Video <span className="text-gradient">Summarizer</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Type any CBSE topic → AI generates key facts → Watch as an animated 9:16 reel with music 🎵
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: "spring" }}
          className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl mb-8">

          <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><Wand2 size={20} className="text-primary" /> Enter Your Topic</h2>

          <div className="relative mb-4">
            <input
              value={topic} onChange={e => setTopic(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") generateReel(); }}
              placeholder="e.g. Photosynthesis, Quadratic Equations, French Revolution..."
              className="w-full bg-secondary/50 rounded-2xl px-5 py-4 text-lg outline-none border-2 border-border focus:border-primary/50 transition-colors pr-14"
            />
            {topic && (
              <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setTopic("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">✕</motion.button>
            )}
          </div>

          {/* Popular topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {POPULAR_TOPICS.map(t => (
              <motion.button key={t} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setTopic(t)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${topic === t ? "bg-primary text-white border-primary" : "bg-secondary border-border hover:border-primary/40"}`}>
                {t}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
            whileTap={{ scale: 0.97 }}
            onClick={generateReel} disabled={loading || !topic.trim()}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
            {loading ? (
              <><Loader2 size={22} className="animate-spin" /> AI Facts Generate Ho Rahe Hain...</>
            ) : (
              <><Sparkles size={22} /> Generate Reel</>
            )}
          </motion.button>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-red-500 text-sm text-center">{error}</motion.p>
          )}
        </motion.div>

        {/* Video Reel Section */}
        <AnimatePresence>
          {generated && facts.length > 0 && (
            <motion.div key="reel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="grid md:grid-cols-2 gap-8 items-start">

              {/* Video Preview */}
              <div>
                <VideoReel topic={topic} facts={facts} theme={GRADIENT_THEMES[themeIdx] as [string, string]} isPlaying={isPlaying} />

                {/* Controls */}
                <div className="flex gap-3 mt-5 justify-center">
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={handlePlay}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg">
                    {isPlaying ? <><Square size={18} /> Stop</> : <><Play size={18} /> Play Reel</>}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={toggleMusic}
                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold border-2 transition-all ${musicOn ? "bg-green-100 dark:bg-green-950/30 border-green-400 text-green-700 dark:text-green-400" : "border-border bg-secondary"}`}>
                    {musicOn ? <><Music size={18} /> Music On</> : <><VolumeX size={18} /> Music</>}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={downloadReel}
                    className="p-3 rounded-2xl bg-secondary border border-border hover:border-primary/40 transition-all">
                    <Download size={20} />
                  </motion.button>
                </div>

                <div className="flex gap-2 mt-3 justify-center">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setThemeIdx(i => (i + 1) % GRADIENT_THEMES.length)}
                    className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <RefreshCw size={12} /> Change Color
                  </motion.button>
                  <span className="text-muted-foreground">·</span>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={generateReel}
                    className="text-xs font-bold text-primary flex items-center gap-1">
                    <Sparkles size={12} /> Regenerate Facts
                  </motion.button>
                </div>
              </div>

              {/* Facts List */}
              <div>
                <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-primary" /> Key Facts for {topic}
                </h3>
                <div className="space-y-3">
                  {facts.map((fact, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex gap-3 p-4 bg-card border border-border rounded-2xl shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                      <p className="text-sm leading-relaxed font-medium">{fact}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                  <p className="text-sm font-medium text-muted-foreground">📱 Screenshot the reel preview or</p>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={downloadReel}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-md">
                    <Download size={16} /> Download Facts as Text
                  </motion.button>
                </motion.div>

                <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-400 flex gap-2">
                  <span>💡</span>
                  <span><strong>Pro Tip:</strong> Play the reel and record your screen to share on Instagram/WhatsApp as a study reel!</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* How it works */}
        {!generated && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            {[
              { emoji: "✏️", step: "1", title: "Type a Topic", desc: "Enter any Class 10 CBSE topic — Photosynthesis, Newton's Laws, anything!" },
              { emoji: "🤖", step: "2", title: "AI Generates Facts", desc: "Our AI instantly creates 5 important board exam key points for your topic." },
              { emoji: "🎬", step: "3", title: "Watch & Download", desc: "See your animated 9:16 reel, toggle music, and download the facts." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <div className="text-xs font-bold text-primary mb-1">STEP {item.step}</div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
