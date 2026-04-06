import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video, Sparkles, Download, Play, Pause, Square,
  Loader2, Smartphone, Monitor, Film, RefreshCw,
  Volume2, VolumeX, Mic, Layers, Zap, Feather, Drama, Star
} from "lucide-react";

/* ─────────────── RATIOS ─────────────── */
const RATIOS = [
  { id: "9:16", label: "Reel", icon: Smartphone, w: 360, h: 640 },
  { id: "16:9", label: "YouTube", icon: Monitor, w: 640, h: 360 },
  { id: "1:1", label: "Square", icon: Square, w: 480, h: 480 },
  { id: "4:5", label: "Portrait", icon: Film, w: 480, h: 600 },
];

/* ─────────────── MOODS ─────────────── */
const MOODS = [
  { id: "energetic", label: "Energetic", icon: Zap, color: "#f97316", frameDur: 2.5, kenBurns: 0.18, transition: "zoom", textAnim: "bounce" },
  { id: "calm", label: "Calm", icon: Feather, color: "#06b6d4", frameDur: 5, kenBurns: 0.07, transition: "fade", textAnim: "fade" },
  { id: "dramatic", label: "Dramatic", icon: Drama, color: "#8b5cf6", frameDur: 4, kenBurns: 0.12, transition: "slide", textAnim: "typewriter" },
  { id: "cinematic", label: "Cinematic", icon: Star, color: "#f59e0b", frameDur: 6, kenBurns: 0.09, transition: "fade", textAnim: "slide" },
];

/* ─────────────── TOPICS ─────────────── */
const TOPICS = [
  {
    label: "Human Eye", color: "from-emerald-500 to-teal-500",
    frames: [
      { prompt: "human eye anatomy cross section labeled cornea iris pupil lens retina educational", text: "Human Eye", sub: "Prakriti ka Amazing Camera!" },
      { prompt: "myopia nearsightedness eye defect concave lens correction diagram educational white", text: "Myopia — Nikatudrushti", sub: "Concave Lens se theek hota hai" },
      { prompt: "hypermetropia farsightedness eye defect convex lens correction diagram educational", text: "Hypermetropia — Duurdrushti", sub: "Convex Lens lagao, theek ho jao!" },
      { prompt: "light prism dispersion VIBGYOR rainbow spectrum physics diagram clean educational", text: "VIBGYOR — Dispersion of Light", sub: "Violet Indigo Blue Green Yellow Orange Red" },
      { prompt: "blue sky red sunset tyndall effect scattering light atmosphere diagram educational", text: "Tyndall Effect", sub: "Blue Sky aur Red Sunset ka Raaz!" },
    ],
    narration: {
      hindi: ["Hamaari aankhen prakriti ka sabse adbhut camera hai", "Myopia mein door ka nahi dikhta — concave lens lagate hain", "Hypermetropia mein paas ka nahi dikhta — convex lens se theek hota hai", "Prakaash prism se VIBGYOR mein baat jaata hai", "Tyndall effect ki wajah se aasman neela aur sunset laal hota hai"],
      english: ["The human eye is nature's most amazing optical instrument", "Myopia — the far objects blur, corrected by concave lens", "Hypermetropia means near objects blur, fixed by convex lens", "White light splits into VIBGYOR through a prism", "Tyndall effect causes the blue sky and red sunsets we see"],
      hinglish: ["Hamaari aankhein nature ka most amazing camera hai", "Myopia mein door ka blurry dikhta hai, concave lens fix karta hai", "Hypermetropia mein paas ka blur hota hai, convex lens lagao", "Prism se light VIBGYOR colors mein split hoti hai", "Tyndall effect se sky blue dikhta hai aur sunset red"],
    }
  },
  {
    label: "Water Cycle", color: "from-sky-500 to-blue-500",
    frames: [
      { prompt: "water cycle evaporation condensation precipitation collection diagram colorful educational", text: "Water Cycle", sub: "Paani ka Safar" },
      { prompt: "sun ocean evaporation clouds water vapor rising diagram educational clean", text: "Evaporation — Vaashpan", sub: "Surya ki garmi se paani bhap banta hai" },
      { prompt: "clouds condensation rain formation water droplets atmosphere diagram", text: "Condensation — Sanghanan", sub: "Bhap thandi hokar boondon mein badal jaati hai" },
      { prompt: "heavy rain precipitation mountain river flowing diagram colorful educational", text: "Precipitation — Varsha", sub: "Baarish, baraf, ole — sab paani ke roop" },
      { prompt: "rainwater harvesting groundwater conservation dam reservoir diagram educational", text: "Jal Sanrakshan", sub: "Paani bachao, Jeevan bachao!" },
    ],
    narration: {
      hindi: ["Paani ka chakra kabhi nahi rukta — evaporation se shuru hota hai", "Suraj ki garmi se samudr ka paani bhap banta hai", "Bhap upar jaake thandi hoti hai aur baadal banta hai", "Fir baarish ke roop mein dharti par aata hai", "Jal sanrakshan zaroori hai — paani bachao"],
      english: ["The water cycle is a continuous process driven by the sun", "Evaporation: Sun heats water turning it into vapor", "Water vapor rises, cools, and forms clouds through condensation", "Precipitation brings rain, snow, and hail back to earth", "Water conservation is crucial for our survival"],
      hinglish: ["Water cycle kabhi nahi rukta — sun se start hota hai", "Sun ocean ka paani evaporate karta hai", "Vapor rise karta hai, cool hota hai, clouds banta hai", "Rain, snow precipitation ke roop mein aata hai", "Water conservation bohot zaroori hai"],
    }
  },
  {
    label: "Electricity", color: "from-yellow-500 to-orange-500",
    frames: [
      { prompt: "electric circuit diagram battery bulb switch wires labeled colorful educational", text: "Electric Circuit", sub: "Bijli ka Safar" },
      { prompt: "ohms law voltage current resistance triangle diagram educational", text: "Ohm's Law: V = IR", sub: "Voltage, Current, Resistance ka Rishta" },
      { prompt: "series parallel circuit comparison diagram labeled colorful educational science", text: "Series vs Parallel Circuit", sub: "Ghar mein parallel circuit kyun?" },
      { prompt: "electromagnetic induction coil magnet current electric generator diagram", text: "Electromagnetic Induction", sub: "Magnet se Bijli kaise banti hai?" },
      { prompt: "electric motor working diagram coil magnet field rotation educational", text: "Electric Motor", sub: "Bijli se Movement!" },
    ],
    narration: {
      hindi: ["Bijli hamaare jeevan ka ek ahm hissa hai — circuit se shuru karte hain", "Ohm ka niyam: Voltage barabar Current guna Resistance", "Series mein ek bulb jale toh sabka connection toot jaata hai", "Electromagnetic induction se bijli generate hoti hai", "Electric motor bijli ki energy ko movement mein badalta hai"],
      english: ["Electricity powers our modern world, let's explore its basics", "Ohm's Law: Voltage equals Current times Resistance, V equals IR", "Series circuits break when one component fails, parallel circuits don't", "Electromagnetic induction generates electricity from magnetic fields", "Electric motors convert electrical energy into mechanical motion"],
      hinglish: ["Electricity hamaari life ka important part hai", "Ohm's Law: V equals I R — voltage current resistance ka relation", "Series mein ek fail toh sab fail, parallel better hai", "Electromagnetic induction se electricity generate hoti hai", "Electric motor bijli ko motion mein convert karta hai"],
    }
  },
  {
    label: "Photosynthesis", color: "from-green-500 to-emerald-500",
    frames: [
      { prompt: "photosynthesis process plant leaves chloroplast sunlight water carbon dioxide glucose diagram", text: "Photosynthesis", sub: "Suraj ki Roshni se Khana!" },
      { prompt: "chloroplast structure thylakoid grana stroma diagram labeled educational science", text: "Chloroplast — Green Factory", sub: "Pauda ki energy factory" },
      { prompt: "light reaction dark reaction calvin cycle photosynthesis diagram educational", text: "Light & Dark Reactions", sub: "Do stages mein banta hai glucose" },
      { prompt: "food chain producers consumers decomposers ecosystem diagram colorful educational", text: "Food Chain", sub: "Energy ka Transfer" },
      { prompt: "carbon cycle forest trees CO2 oxygen atmosphere diagram educational colorful", text: "Carbon Cycle", sub: "Nature ka Balance System" },
    ],
    narration: {
      hindi: ["Photosynthesis mein paudhey suraj ki roshni se apna khana banate hain", "Chloroplast ek green factory hai jahan photosynthesis hoti hai", "Pehle light reaction hoti hai, phir dark reaction mein glucose banta hai", "Food chain mein energy producers se consumers tak jaati hai", "Carbon cycle prakriti ka balance system hai"],
      english: ["Photosynthesis is how plants make food using sunlight", "The chloroplast is the green powerhouse where photosynthesis occurs", "First the light reactions, then the Calvin cycle produces glucose", "The food chain shows energy transfer from producers to consumers", "The carbon cycle maintains nature's perfect balance"],
      hinglish: ["Photosynthesis mein plants sunlight se apna food banate hain", "Chloroplast ek green factory hai jahan sab hota hai", "Light reactions pehle, phir Calvin cycle mein glucose banta hai", "Food chain mein energy transfer hoti hai", "Carbon cycle nature ka balance rakhta hai"],
    }
  },
  {
    label: "Nationalism", color: "from-orange-500 to-amber-500",
    frames: [
      { prompt: "French revolution liberty equality fraternity 1789 painting historical illustration", text: "French Revolution 1789", sub: "Nationalism ki Shuruat" },
      { prompt: "Europe 1815 map nationalism movements historical political illustration colorful", text: "Europe 1815 — Congress of Vienna", sub: "Map ki Naye Tarike se Khichaan" },
      { prompt: "Otto von Bismarck Germany unification Blood Iron historical portrait painting", text: "Bismarck — Blood and Iron", sub: "Germany ka Ekikaran" },
      { prompt: "Italy unification Garibaldi red shirts soldiers historical painting illustration", text: "Garibaldi — Red Shirts", sub: "Italy ka Ekikaran" },
      { prompt: "nationalism India freedom movement Gandhi Nehru historical illustration", text: "Nationalism in India", sub: "Swadheenata Sangram" },
    ],
    narration: {
      hindi: ["1789 ki French Revolution ne nationalism ki neenv rakhi", "1815 mein Congress of Vienna ne Europe ka naqsha badal diya", "Bismarck ne khoon aur lohe ki neeti se Germany ko ek kiya", "Garibaldi ke lal kurte waale sipahiyon ne Italy ek kiya", "India mein bhi nationalism ki lahar aayi — swadheenata ka andolan"],
      english: ["The French Revolution of 1789 planted the seeds of nationalism", "The Congress of Vienna 1815 redrew the map of Europe", "Bismarck unified Germany through his policy of Blood and Iron", "Garibaldi's Red Shirts fought to unify the Italian peninsula", "Nationalism swept across India inspiring the freedom movement"],
      hinglish: ["French Revolution 1789 se nationalism start hua", "Congress of Vienna 1815 ne Europe ka map redesign kiya", "Bismarck ne Blood and Iron policy se Germany ek kiya", "Garibaldi ke Red Shirts ne Italy unify kiya", "India mein bhi nationalism ki wave aayi — freedom movement"],
    }
  },
];

/* ─────────────── HELPERS ─────────────── */
function buildImageUrl(prompt: string, seed: number) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " high quality detailed clean")}?width=800&height=600&seed=${seed}&nologo=true&model=flux`;
}

async function loadImgElement(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      // fallback without crossOrigin
      const img2 = new window.Image();
      img2.onload = () => resolve(img2);
      img2.onerror = reject;
      img2.src = url + "&t=" + Date.now();
    };
    img.src = url;
  });
}

function drawTextAnimated(
  ctx: CanvasRenderingContext2D,
  text: string,
  sub: string,
  progress: number,
  anim: string,
  w: number,
  h: number
) {
  ctx.save();

  // Dark gradient at bottom
  const grad = ctx.createLinearGradient(0, h * 0.55, 0, h);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.82)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, h * 0.55, w, h * 0.45);

  const eased = Math.min(1, progress * 2.5);
  const centerX = w / 2;

  // Main text
  const fontSize = Math.round(w * 0.072);
  ctx.font = `900 ${fontSize}px 'Inter', sans-serif`;
  ctx.textAlign = "center";

  let ty = h * 0.78;
  let alpha = eased;

  if (anim === "slide") {
    ty = h * 0.78 + (1 - eased) * 50;
  } else if (anim === "bounce") {
    const bounce = Math.sin(eased * Math.PI) * 12 * (1 - eased);
    ty = h * 0.78 - bounce;
  } else if (anim === "typewriter") {
    const chars = Math.floor(eased * text.length);
    text = text.slice(0, chars);
  }

  ctx.globalAlpha = alpha;

  // Shadow
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(text, centerX, ty);

  // Sub text
  ctx.shadowBlur = 8;
  ctx.font = `600 ${Math.round(fontSize * 0.5)}px 'Inter', sans-serif`;
  ctx.fillStyle = "rgba(255,220,80,1)";
  let sy = h * 0.88;
  if (anim === "slide") sy += (1 - eased) * 30;
  ctx.fillText(sub, centerX, sy);

  ctx.restore();
}

type Frame = { url: string; img: HTMLImageElement | null; loaded: boolean; error: boolean; text: string; sub: string };

export default function AiVideo() {
  const [topic, setTopic] = useState<typeof TOPICS[0] | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [language, setLanguage] = useState<"hindi" | "english" | "hinglish">("hinglish");
  const [voiceOn, setVoiceOn] = useState(true);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [generating, setGenerating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordBlob, setRecordBlob] = useState<Blob | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const framesRef = useRef<Frame[]>([]);
  const playingRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  framesRef.current = frames;

  /* ─── Canvas animation engine ─── */
  const renderFrame = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const frameDur = mood.frameDur;
    const totalDuration = framesRef.current.length * frameDur;
    const loopedElapsed = elapsed % totalDuration;
    const frameIdx = Math.floor(loopedElapsed / frameDur) % framesRef.current.length;
    const frameProgress = (loopedElapsed % frameDur) / frameDur;
    const nextFrameIdx = (frameIdx + 1) % framesRef.current.length;

    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Helper: draw image with Ken Burns
    const drawKenBurns = (img: HTMLImageElement, progress: number, reverse = false) => {
      const p = reverse ? 1 - progress : progress;
      const scale = 1 + mood.kenBurns * p;
      const scale0 = 1 + mood.kenBurns;
      const baseScale = Math.max(W / img.width, H / img.height);
      const s = baseScale * scale;

      const panX = (W * 0.04) * p;
      const panY = (H * 0.03) * p;

      const dw = img.width * s;
      const dh = img.height * s;
      const dx = (W - dw) / 2 - panX;
      const dy = (H - dh) / 2 - panY;

      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const cur = framesRef.current[frameIdx];
    const nxt = framesRef.current[nextFrameIdx];

    // Draw current frame
    if (cur?.img) {
      ctx.save();
      ctx.globalAlpha = 1;
      drawKenBurns(cur.img, frameProgress);
      ctx.restore();
    } else {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, W, H);
    }

    // Transition (last 30% of frame)
    const transZone = 0.28;
    if (frameProgress > 1 - transZone && nxt?.img) {
      const alpha = (frameProgress - (1 - transZone)) / transZone;
      if (mood.transition === "fade") {
        ctx.save();
        ctx.globalAlpha = alpha;
        drawKenBurns(nxt.img, 0);
        ctx.restore();
      } else if (mood.transition === "zoom") {
        ctx.save();
        ctx.globalAlpha = alpha;
        const s = 1 + (1 - alpha) * 0.15;
        ctx.translate(W / 2, H / 2);
        ctx.scale(s, s);
        ctx.translate(-W / 2, -H / 2);
        drawKenBurns(nxt.img, 0);
        ctx.restore();
      } else if (mood.transition === "slide") {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(W * (1 - alpha), 0);
        drawKenBurns(nxt.img, 0);
        ctx.restore();
      }
    }

    // Text overlay
    const textProgress = Math.min(1, frameProgress / 0.4);
    drawTextAnimated(ctx, cur?.text || "", cur?.sub || "", textProgress, mood.textAnim, W, H);

    // Recording indicator
    if (recording) {
      ctx.save();
      ctx.fillStyle = `rgba(239,68,68,${0.7 + 0.3 * Math.sin(timestamp / 300)})`;
      ctx.beginPath();
      ctx.arc(W - 20, 20, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `bold ${Math.round(W * 0.028)}px sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText("REC", W - 32, 26);
      ctx.restore();
    }

    if (playingRef.current) {
      animRef.current = requestAnimationFrame(renderFrame);
    }
  }, [mood, recording]);

  /* ─── Voice synthesis ─── */
  const speakFrame = useCallback((frameIdx: number, topicData: typeof TOPICS[0]) => {
    if (!voiceOn || !topicData) return;
    window.speechSynthesis.cancel();
    const texts = topicData.narration[language];
    const text = texts[frameIdx] ?? texts[0];
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = language === "hindi" ? "hi-IN" : language === "english" ? "en-US" : "en-IN";
    utt.rate = mood.id === "energetic" ? 1.25 : mood.id === "dramatic" ? 0.85 : 1.0;
    utt.pitch = mood.id === "energetic" ? 1.2 : mood.id === "calm" ? 0.9 : 1.0;
    synthRef.current = utt;
    window.speechSynthesis.speak(utt);
  }, [voiceOn, language, mood]);

  /* ─── Start/Stop animation ─── */
  useEffect(() => {
    playingRef.current = playing;
    if (playing && frames.some(f => f.loaded)) {
      if (!startTimeRef.current) startTimeRef.current = performance.now();
      animRef.current = requestAnimationFrame(renderFrame);

      // Voice: cycle through narrations based on frame timing
      if (topic && voiceOn) {
        let frameIdx = 0;
        speakFrame(0, topic);
        const interval = setInterval(() => {
          frameIdx = (frameIdx + 1) % frames.length;
          speakFrame(frameIdx, topic);
        }, mood.frameDur * 1000);
        return () => {
          clearInterval(interval);
          window.speechSynthesis.cancel();
        };
      }
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (!playing) window.speechSynthesis.cancel();
    }
  }, [playing, frames, renderFrame, speakFrame, topic, mood, voiceOn]);

  /* ─── Generate frames ─── */
  const generateFrames = useCallback(async (t: typeof TOPICS[0] | null, custom?: string) => {
    const topicData = t;
    if (!topicData && !custom?.trim()) return;

    setPlaying(false);
    setGenerating(true);
    setFrames([]);
    setLoadedCount(0);
    setRecordBlob(null);
    startTimeRef.current = 0;
    window.speechSynthesis.cancel();

    const frameSpecs = topicData?.frames ?? Array.from({ length: 5 }, (_, i) => ({
      prompt: `${custom} educational diagram illustration ${["overview", "detailed diagram", "process", "example", "summary"][i]}`,
      text: `${custom} ${["Introduction", "Main Concepts", "Key Process", "Examples", "Summary"][i]}`,
      sub: ["Board exam important!", "Samjho aur yaad karo", "Step by step dekho", "Real life examples", "Revision time!"][i],
    }));

    const seeds = frameSpecs.map(() => Math.floor(Math.random() * 99999) + 1);
    const initial: Frame[] = frameSpecs.map((f, i) => ({
      url: buildImageUrl(f.prompt, seeds[i]),
      img: null,
      loaded: false,
      error: false,
      text: f.text,
      sub: f.sub,
    }));

    setFrames(initial);
    setGenerating(false);

    // Load images concurrently
    initial.forEach((frame, idx) => {
      loadImgElement(frame.url)
        .then(img => {
          setFrames(prev => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], img, loaded: true };
            return copy;
          });
          setLoadedCount(prev => prev + 1);
        })
        .catch(() => {
          setFrames(prev => {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], loaded: true, error: true };
            return copy;
          });
          setLoadedCount(prev => prev + 1);
        });
    });
  }, []);

  /* ─── Recording ─── */
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas || recording) return;
    chunksRef.current = [];
    const stream = canvas.captureStream(30);
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 4_000_000 });
    rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => {
      setRecordBlob(new Blob(chunksRef.current, { type: "video/webm" }));
      setRecording(false);
    };
    recorderRef.current = rec;
    rec.start();
    setRecording(true);
    setPlaying(true);
    const totalDur = frames.length * mood.frameDur * 1000 + 800;
    setTimeout(() => { rec.stop(); setPlaying(false); }, totalDur);
  };

  const allLoaded = frames.length > 0 && loadedCount >= frames.length;
  const currentTopicData = topic;

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-8 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }} className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.06 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-3 font-medium text-sm">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              <Film size={16} />
            </motion.div>
            AI Video Reel Generator
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-2">
            AI se Video Reels{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Banao!</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            Koi bhi topic — full animated reel, voice narration, text effects aur download!
          </p>
        </motion.div>

        {/* Controls Row */}
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          {/* Topic */}
          <div className="md:col-span-1 bg-card border border-border rounded-2xl p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Quick Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {TOPICS.map(t => (
                <motion.button key={t.label} whileTap={{ scale: 0.94 }}
                  onClick={() => { setTopic(t); generateFrames(t); }}
                  className={`px-3 py-1.5 rounded-xl bg-gradient-to-r ${t.color} text-white font-bold text-xs shadow`}>
                  {t.label}
                </motion.button>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input value={customTopic} onChange={e => setCustomTopic(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { setTopic(null); generateFrames(null, customTopic); } }}
                placeholder="Custom topic..." className="flex-1 bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none" />
              <motion.button whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.04 }}
                disabled={!customTopic.trim() || generating}
                onClick={() => { setTopic(null); generateFrames(null, customTopic); }}
                className="px-3 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold text-sm disabled:opacity-50">
                {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              </motion.button>
            </div>
          </div>

          {/* Mood */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Animation Mood</p>
            <div className="grid grid-cols-2 gap-2">
              {MOODS.map(m => (
                <motion.button key={m.id} whileTap={{ scale: 0.94 }}
                  onClick={() => setMood(m)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold transition-all border-2 ${mood.id === m.id ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-secondary"}`}>
                  <m.icon size={14} style={{ color: m.color }} />
                  {m.label}
                  <span className="text-[9px] text-muted-foreground ml-auto">{m.frameDur}s</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
            {/* Ratio */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Video Ratio</p>
              <div className="grid grid-cols-4 gap-1.5">
                {RATIOS.map(r => (
                  <motion.button key={r.id} whileTap={{ scale: 0.94 }}
                    onClick={() => setRatio(r)}
                    className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-bold transition-all ${ratio.id === r.id ? "bg-primary text-white" : "bg-secondary"}`}>
                    <r.icon size={12} />
                    {r.id}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Language */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Voice Language</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(["hindi", "english", "hinglish"] as const).map(l => (
                  <motion.button key={l} whileTap={{ scale: 0.94 }}
                    onClick={() => setLanguage(l)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold capitalize transition-all ${language === l ? "bg-primary text-white" : "bg-secondary"}`}>
                    {l}
                  </motion.button>
                ))}
              </div>
            </div>
            {/* Voice Toggle */}
            <motion.button whileTap={{ scale: 0.94 }}
              onClick={() => { setVoiceOn(!voiceOn); if (voiceOn) window.speechSynthesis.cancel(); }}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${voiceOn ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30" : "bg-secondary text-muted-foreground"}`}>
              {voiceOn ? <><Volume2 size={13} /> Voice ON</> : <><VolumeX size={13} /> Voice OFF</>}
            </motion.button>
          </div>
        </div>

        {/* Main Area */}
        <AnimatePresence mode="wait">
          {frames.length === 0 && !generating ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-card border-2 border-dashed border-border rounded-3xl p-16 text-center">
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                <Video size={36} className="text-rose-500" />
              </motion.div>
              <h3 className="text-xl font-display font-bold mb-2">Topic choose karo!</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">Upar se topic select karo — AI full animated video reel banayega voice ke saath!</p>
            </motion.div>
          ) : (
            <motion.div key="main" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-[1fr,260px] gap-5">

              {/* Canvas Preview */}
              <div className="space-y-3">
                {/* Loading bar */}
                {!allLoaded && (
                  <div className="bg-card border border-border rounded-2xl p-3">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-bold">AI Images Generate ho rahe hain...</span>
                      <span className="text-xs font-bold text-primary">{loadedCount}/{frames.length}</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${(loadedCount / Math.max(frames.length, 1)) * 100}%` }}
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                        transition={{ duration: 0.4 }} />
                    </div>
                  </div>
                )}

                {/* Canvas */}
                <div className="relative flex justify-center">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black"
                    style={{ width: "100%", maxWidth: ratio.w, aspectRatio: `${ratio.w}/${ratio.h}` }}>
                    <canvas ref={canvasRef} width={ratio.w} height={ratio.h}
                      className="w-full h-full" />
                    {!playing && frames.length > 0 && allLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                          onClick={() => { startTimeRef.current = performance.now(); setPlaying(true); }}
                          className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl cursor-pointer">
                          <Play size={32} className="text-rose-500 ml-1" />
                        </motion.div>
                      </div>
                    )}
                    {!allLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-12 h-12 border-4 border-white/20 border-t-rose-500 rounded-full mb-4" />
                        <p className="text-white text-sm font-bold">Frames load ho rahe hain...</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Playback controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}
                    disabled={!allLoaded}
                    onClick={() => { if (!playing) { startTimeRef.current = performance.now(); } setPlaying(!playing); }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-bold text-sm disabled:opacity-50">
                    {playing ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Play</>}
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}
                    onClick={() => { setPlaying(false); startTimeRef.current = 0; }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-2xl font-bold text-sm">
                    <Square size={14} /> Stop
                  </motion.button>

                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.94 }}
                    onClick={() => { setTopic(topic); generateFrames(topic, customTopic); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-2xl font-bold text-sm">
                    <RefreshCw size={14} /> Naya Reel
                  </motion.button>

                  {voiceOn && (
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 rounded-xl text-xs font-bold text-emerald-600 border border-emerald-500/20">
                      <motion.div animate={{ scale: playing ? [1, 1.4, 1] : 1 }}
                        transition={{ duration: 0.6, repeat: Infinity }}>
                        <Mic size={13} />
                      </motion.div>
                      {language.charAt(0).toUpperCase() + language.slice(1)} Voice
                    </div>
                  )}
                </div>
              </div>

              {/* Side Panel */}
              <div className="space-y-3">
                {/* Record */}
                <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Film size={16} className="text-rose-500" /> Record & Download
                  </p>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={startRecording}
                    disabled={!allLoaded || recording}
                    className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2
                      ${recording ? "bg-red-500 text-white" : "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md disabled:opacity-50"}`}>
                    {recording ? (
                      <><motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2.5 h-2.5 bg-white rounded-full" />
                        Recording {frames.length * mood.frameDur}s...</>
                    ) : (
                      <><Film size={15} /> Record Video</>
                    )}
                  </motion.button>

                  {recordBlob && (
                    <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        const url = URL.createObjectURL(recordBlob);
                        const a = document.createElement("a");
                        a.href = url; a.download = `reel-${Date.now()}.webm`;
                        a.click(); URL.revokeObjectURL(url);
                      }}
                      className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                      <Download size={15} /> Save Video (.webm)
                    </motion.button>
                  )}
                </div>

                {/* Frame thumbnails */}
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wide">Frames</p>
                  <div className="space-y-2">
                    {frames.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-12 h-8 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          {f.loaded && f.img ? (
                            <img src={f.url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Loader2 size={10} className="animate-spin text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{f.text}</p>
                          <p className="text-[9px] text-muted-foreground truncate">{f.sub}</p>
                        </div>
                        {f.loaded && (
                          <a href={f.url} download={`frame-${i + 1}.jpg`} target="_blank" rel="noopener noreferrer">
                            <Download size={12} className="text-muted-foreground hover:text-foreground" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-card border border-border rounded-2xl p-4 text-xs text-muted-foreground space-y-1">
                  <p className="font-bold text-foreground flex items-center gap-1.5"><Layers size={12} /> {ratio.id} • {mood.label}</p>
                  <p>{ratio.w}×{ratio.h} • {frames.length * mood.frameDur}s total</p>
                  <p className="pt-1">Voice: {language === "hindi" ? "हिंदी" : language === "english" ? "English" : "Hinglish"}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm text-rose-700 dark:text-rose-400 flex gap-3">
          <span className="text-xl">🎬</span>
          <div>
            <strong>Tips:</strong> Play karo — voice automatically bolega. Record button se canvas ko WebM mein save karo. Best quality ke liye screen record karo — voice + video dono record hoga. WebM ko online MP4 converter se convert kar sakte ho!
          </div>
        </motion.div>
      </div>
    </div>
  );
}
