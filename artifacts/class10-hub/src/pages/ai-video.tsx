import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Pause, Square, Download, Sparkles, Volume2, VolumeX, RefreshCw, Smartphone, Monitor, Loader2 } from "lucide-react";

/* ─── TYPES ─── */
type SceneType = "intro" | "fact" | "outro";
type Lang = "hindi" | "english" | "hinglish";
interface Scene { type: SceneType; icon?: string; heading: string; body: string; accentWord?: string }
interface TopicData {
  id: string; title: string; emoji: string;
  bg: [string, string]; accent: string; textColor: string;
  scenes: Scene[];
  narration: Record<Lang, string[]>;
}

/* ─── SCENE DATA ─── */
const TOPICS: TopicData[] = [
  {
    id: "human-eye", title: "Human Eye", emoji: "👁️",
    bg: ["#0f0c29", "#302b63"], accent: "#e94560", textColor: "#ffffff",
    scenes: [
      { type: "intro", icon: "👁️", heading: "Human Eye\n& Colourful World", body: "Class 10 Science · Must Know!" },
      { type: "fact", icon: "🔬", heading: "5 Main Parts", body: "Cornea · Iris · Pupil · Lens · Retina\n\"CIPLR\" se yaad karo!" },
      { type: "fact", icon: "🥸", heading: "Myopia", body: "Door ka NAHI dikhta\n→ Concave (Diverging) Lens", accentWord: "Concave Lens" },
      { type: "fact", icon: "👀", heading: "Hypermetropia", body: "Paas ka NAHI dikhta\n→ Convex (Converging) Lens", accentWord: "Convex Lens" },
      { type: "fact", icon: "🌈", heading: "Tyndall Effect", body: "Sky NEELA hai · Sunset LAAL\n→ Scattering of Light!", accentWord: "Scattering" },
      { type: "outro", icon: "⭐", heading: "5 marks pakke!", body: "class10hubs.netlify.app\nComplete Notes & Questions" },
    ],
    narration: {
      hindi: ["Human eye aur colorful world — class 10 science ka important chapter!", "Aankhon ke 5 main parts — Cornea, Iris, Pupil, Lens aur Retina", "Myopia mein door ka nahi dikhta — Concave lens se theek hota hai", "Hypermetropia mein paas ka blur hota hai — Convex lens lagao", "Tyndall effect se aasman neela hai aur sunset laal hota hai!", "Follow karo aur Class 10 Hub par complete notes paao!"],
      english: ["Human eye and the colourful world — crucial for Class 10 boards!", "Five main parts: Cornea, Iris, Pupil, Lens, and Retina", "Myopia: far objects blur — corrected by Concave lens", "Hypermetropia: near objects blur — fixed by Convex lens", "Tyndall effect makes sky blue and sunsets red!", "Visit Class 10 Hub for complete notes and board questions!"],
      hinglish: ["Human eye aur colorful world — Class 10 ka super important chapter!", "5 parts yaad karo — Cornea Iris Pupil Lens Retina", "Myopia mein door ka nahi dikhta — Concave lens fix karta hai", "Hypermetropia mein paas ka nahi dikhta — Convex lens lagao", "Tyndall effect se sky blue hai aur sunset red hota hai!", "Class 10 Hub par complete notes aur questions paao!"],
    }
  },
  {
    id: "electricity", title: "Electricity", emoji: "⚡",
    bg: ["#1a1a2e", "#16213e"], accent: "#f5a623", textColor: "#ffffff",
    scenes: [
      { type: "intro", icon: "⚡", heading: "Electricity\nClass 10 Science", body: "Bohot Important Chapter!" },
      { type: "fact", icon: "🔋", heading: "Ohm's Law", body: "V = I × R\nVoltage = Current × Resistance", accentWord: "V = I × R" },
      { type: "fact", icon: "💡", heading: "Series Circuit", body: "Ek bulb jale toh SABB off!\nSame current, different voltage", accentWord: "Same current" },
      { type: "fact", icon: "🔌", heading: "Parallel Circuit", body: "Ghar mein YAHI use hota hai!\nSame voltage, different current", accentWord: "Ghar mein" },
      { type: "fact", icon: "🌡️", heading: "Heating Effect", body: "H = I²Rt\n→ Heater, Toaster, Bulb sab isi se!", accentWord: "H = I²Rt" },
      { type: "outro", icon: "⭐", heading: "Board mein zaroor aata hai!", body: "class10hubs.netlify.app\nPYQ + Notes + Quiz" },
    ],
    narration: {
      hindi: ["Electricity — class 10 science ka sabse zyada marks wala chapter!", "Ohm ka niyam: V barabar I guna R", "Series circuit mein ek bulb jale toh sab off ho jaate hain", "Ghar mein parallel circuit use hota hai", "Heating effect ka formula: H barabar I squared R t", "Board exam mein zaroor aata hai — Class 10 Hub visit karo!"],
      english: ["Electricity — highest scoring chapter in Class 10 Science!", "Ohm's Law: Voltage equals Current times Resistance", "In series circuit, one bulb fails and all go off", "Homes use parallel circuits for independence", "Heating effect formula: H equals I squared R t", "Must come in boards — visit Class 10 Hub for complete prep!"],
      hinglish: ["Electricity — Class 10 ka highest marks wala chapter!", "Ohm's Law: V equal to I times R", "Series mein ek bulb fail hoto sab off ho jaate hain", "Ghar mein parallel circuit use hota hai", "Heating effect: H equal to I squared R t", "Board mein zaroor aata hai — Class 10 Hub check karo!"],
    }
  },
  {
    id: "photosynthesis", title: "Photosynthesis", emoji: "🌿",
    bg: ["#1a2a1a", "#0d3b0d"], accent: "#4caf50", textColor: "#ffffff",
    scenes: [
      { type: "intro", icon: "🌿", heading: "Photosynthesis\nLife Processes", body: "Class 10 Biology · Chapter 6" },
      { type: "fact", icon: "☀️", heading: "The Equation", body: "CO₂ + H₂O → Glucose + O₂\n(Sunlight + Chlorophyll)", accentWord: "CO₂ + H₂O" },
      { type: "fact", icon: "🍃", heading: "Chloroplast", body: "Green rung = Chlorophyll\nYahan photosynthesis hoti hai!", accentWord: "Chloroplast" },
      { type: "fact", icon: "🌱", heading: "Light Reaction", body: "Sunlight + Water → O₂ + ATP\nThylakoid mein hota hai", accentWord: "Light Reaction" },
      { type: "fact", icon: "⚗️", heading: "Dark Reaction", body: "CO₂ → Glucose\nCalvin Cycle — Stroma mein", accentWord: "Calvin Cycle" },
      { type: "outro", icon: "⭐", heading: "3 marks pakke!", body: "class10hubs.netlify.app\nNotes + MCQs Free!" },
    ],
    narration: {
      hindi: ["Photosynthesis — life processes chapter mein sabse important topic!", "Equation: Carbon dioxide aur paani, sunlight mein glucose aur oxygen banta hai", "Chloroplast green hai kyunki chlorophyll hota hai", "Light reaction mein oxygen nikalta hai aur ATP banta hai", "Dark reaction mein Calvin cycle mein glucose banta hai", "Teeno marks pakke — Class 10 Hub par notes paao!"],
      english: ["Photosynthesis — the most important topic in Life Processes!", "Equation: CO2 plus water gives glucose and oxygen in sunlight", "Chloroplasts are green due to chlorophyll pigment", "Light reactions produce oxygen and ATP in thylakoids", "Dark reactions or Calvin cycle produces glucose in stroma", "Three marks guaranteed — notes free at Class 10 Hub!"],
      hinglish: ["Photosynthesis — Life Processes ka most important topic!", "Equation: CO2 aur paani se glucose aur oxygen banta hai", "Chloroplast green hai because chlorophyll hai usme", "Light reaction mein O2 aur ATP banta hai", "Dark reaction ya Calvin cycle mein glucose banta hai", "3 marks pakke — Class 10 Hub par free notes paao!"],
    }
  },
  {
    id: "water-cycle", title: "Water Cycle", emoji: "💧",
    bg: ["#0a192f", "#112240"], accent: "#64ffda", textColor: "#ffffff",
    scenes: [
      { type: "intro", icon: "💧", heading: "Water Cycle\nGeography Chapter", body: "Class 10 SST · Important!" },
      { type: "fact", icon: "☀️", heading: "Evaporation", body: "Sun ki garmi → Paani bhap banta hai\nSamudr + Nadi → Vapor", accentWord: "Evaporation" },
      { type: "fact", icon: "☁️", heading: "Condensation", body: "Upar jaake thanda hota hai\nBhap → Pani ki bundhein → Baadal!", accentWord: "Condensation" },
      { type: "fact", icon: "🌧️", heading: "Precipitation", body: "Baarish · Baraf · Ole\nDharti par wapas aata hai!", accentWord: "Precipitation" },
      { type: "fact", icon: "🏞️", heading: "Collection", body: "Nadi · Jheel · Bhumigatjal\nPhir se Evaporation!", accentWord: "Collection" },
      { type: "outro", icon: "⭐", heading: "2 marks guaranteed!", body: "class10hubs.netlify.app\nSST Notes Free!" },
    ],
    narration: {
      hindi: ["Water cycle — geography mein 2 marks ka guaranteed question!", "Evaporation: Suraj ki garmi se paani bhap ban jaata hai", "Condensation: Upar thanda hota hai aur baadal banta hai", "Precipitation: Baarish, baraf, ole — sab dharti par girte hain", "Collection: Nadi, jheel aur bhumigatjal mein ikatha hota hai", "Dono marks pakke — Class 10 Hub par complete notes!"],
      english: ["Water cycle — guaranteed 2 marks in Geography!", "Evaporation: Sun's heat turns water into vapor", "Condensation: Vapor cools up and forms clouds", "Precipitation: Rain, snow, hail falls back to earth", "Collection: Rivers, lakes, groundwater collect the water", "Both marks guaranteed — free notes at Class 10 Hub!"],
      hinglish: ["Water cycle — Geography mein 2 marks pakka!", "Evaporation: Sun se paani bhap ban jaata hai", "Condensation: Upar cool hota hai aur clouds bante hain", "Precipitation: Rain, snow, hail earth pe aata hai", "Collection: Rivers, lakes, groundwater mein collect hota hai", "2 marks pakke — Class 10 Hub par notes free hain!"],
    }
  },
  {
    id: "real-numbers", title: "Real Numbers", emoji: "🔢",
    bg: ["#1a0533", "#2d0a5e"], accent: "#a78bfa", textColor: "#ffffff",
    scenes: [
      { type: "intro", icon: "🔢", heading: "Real Numbers\nMaths Chapter 1", body: "Euclid se shuru karo!" },
      { type: "fact", icon: "📐", heading: "Euclid's Division", body: "a = bq + r\nHCF nikalne ka best way!", accentWord: "a = bq + r" },
      { type: "fact", icon: "🔑", heading: "HCF Trick", body: "HCF(a,b) × LCM(a,b) = a × b\nSirf 2 numbers ke liye!", accentWord: "HCF × LCM = a×b" },
      { type: "fact", icon: "🚫", heading: "Irrational Numbers", body: "√2, √3, √5 — sab irrational!\nProof: Contradiction method", accentWord: "√2, √3, √5" },
      { type: "fact", icon: "💡", heading: "Terminating Decimal", body: "p/q terminates only if\nq = 2^m × 5^n !", accentWord: "2^m × 5^n" },
      { type: "outro", icon: "⭐", heading: "Full chapter notes free!", body: "class10hubs.netlify.app\nMaths Tricks + PYQ!" },
    ],
    narration: {
      hindi: ["Real Numbers — Maths chapter 1, bahut important chapter!", "Euclid division lemma: a barabar b q plus r — HCF nikalne ka formula", "HCF aur LCM ka product do sankhyaon ke product ke barabar hota hai", "Root 2, root 3, root 5 — ye sab irrational numbers hain", "Terminating decimal tab hota hai jab q sirf 2 aur 5 ke powers ka product ho", "Poore chapter ke notes aur PYQ class 10 hub par free mein paao!"],
      english: ["Real Numbers — Chapter 1 of Class 10 Maths, very important!", "Euclid's division lemma: a equals b q plus r — formula for HCF", "HCF times LCM equals product of the two numbers", "Square root 2, 3, 5 are all irrational numbers", "A decimal terminates only if denominator is of form 2 to the m times 5 to the n", "Free notes and PYQ at Class 10 Hub!"],
      hinglish: ["Real Numbers — Class 10 Maths chapter 1, super important!", "Euclid division: a equal to bq plus r — HCF nikalne ka formula", "HCF times LCM equals product of two numbers", "Root 2 root 3 root 5 — sab irrational hain", "Terminating decimal sirf tab hota hai jab q = 2^m × 5^n", "Free notes aur PYQ Class 10 Hub par paao!"],
    }
  },
];

/* ─── CANVAS ENGINE ─── */
const SCENE_DURATIONS: Record<SceneType, number> = { intro: 3.5, fact: 3.8, outro: 3.2 };

function lerp(a: number, b: number, t: number) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return { r, g, b };
}

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const paragraphs = text.split("\n");
  const result: string[] = [];
  for (const para of paragraphs) {
    const words = para.split(" ");
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxW && line) { result.push(line); line = w; }
      else line = test;
    }
    if (line) result.push(line);
  }
  return result;
}

function drawScene(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  scene: Scene, topic: TopicData, sceneProgress: number, // 0→1
  totalProgress: number
) {
  const p = easeOut(sceneProgress);
  const pIn = Math.min(1, sceneProgress / 0.35);
  const pOut = Math.max(0, (sceneProgress - 0.7) / 0.3);

  // ── Background gradient (animated) ──
  const bgShift = Math.sin(totalProgress * Math.PI * 2) * 0.04;
  const grad = ctx.createLinearGradient(0, 0, W * (0.6 + bgShift), H);
  const c1 = hexToRgb(topic.bg[0]), c2 = hexToRgb(topic.bg[1]);
  grad.addColorStop(0, `rgb(${c1.r},${c1.g},${c1.b})`);
  grad.addColorStop(1, `rgb(${c2.r},${c2.g},${c2.b})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // ── Decorative blobs ──
  ctx.save();
  const acc = hexToRgb(topic.accent);
  ctx.fillStyle = `rgba(${acc.r},${acc.g},${acc.b},0.07)`;
  ctx.beginPath(); ctx.arc(W*0.85, H*0.15 + Math.sin(totalProgress*4)*10, W*0.35, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = `rgba(${acc.r},${acc.g},${acc.b},0.05)`;
  ctx.beginPath(); ctx.arc(W*0.1, H*0.8 + Math.sin(totalProgress*3+1)*8, W*0.28, 0, Math.PI*2); ctx.fill();
  // Grid dots
  ctx.fillStyle = `rgba(255,255,255,0.04)`;
  for (let xi = 0; xi < W; xi += W*0.09) for (let yi = 0; yi < H; yi += W*0.09) {
    ctx.beginPath(); ctx.arc(xi, yi, 1.5, 0, Math.PI*2); ctx.fill();
  }
  ctx.restore();

  // ── Slide alpha ──
  const slideAlpha = easeOut(Math.min(1, pIn * 2));
  const slideY = (1 - easeOut(pIn)) * H * 0.06;
  const fadeAlpha = Math.max(0, 1 - pOut * 3);

  ctx.save();
  ctx.globalAlpha = slideAlpha * fadeAlpha;
  ctx.translate(0, slideY);

  if (scene.type === "intro") {
    // Large emoji
    const emojiSize = Math.round(W * 0.18);
    ctx.font = `${emojiSize}px serif`;
    ctx.textAlign = "center";
    ctx.fillText(scene.icon || "📚", W/2, H*0.32 - (1-p)*20);

    // Main heading with line breaks
    ctx.shadowColor = `rgba(${acc.r},${acc.g},${acc.b},0.8)`;
    ctx.shadowBlur = 30;
    const lines = scene.heading.split("\n");
    const fs = Math.round(W * 0.1);
    ctx.font = `900 ${fs}px Inter, Arial Black, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    lines.forEach((ln, i) => {
      ctx.fillText(ln, W/2, H*0.5 + i * (fs*1.25) - (lines.length-1)*fs*0.6);
    });

    // Sub badge
    ctx.shadowBlur = 0;
    const badge = scene.body;
    const badgeFs = Math.round(W * 0.045);
    ctx.font = `700 ${badgeFs}px Inter, sans-serif`;
    const bw = ctx.measureText(badge).width + W*0.07;
    drawRoundRect(ctx, W/2 - bw/2, H*0.74, bw, H*0.065, 30);
    ctx.fillStyle = `rgba(${acc.r},${acc.g},${acc.b},0.25)`;
    ctx.fill();
    ctx.fillStyle = topic.accent;
    ctx.fillText(badge, W/2, H*0.785);

  } else if (scene.type === "fact") {
    // Icon circle
    const iconSize = Math.round(W * 0.14);
    const iconY = H * 0.22;
    ctx.beginPath();
    ctx.arc(W/2, iconY, iconSize*0.68, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${acc.r},${acc.g},${acc.b},0.18)`;
    ctx.fill();
    ctx.strokeStyle = `rgba(${acc.r},${acc.g},${acc.b},0.5)`;
    ctx.lineWidth = W*0.008;
    ctx.stroke();
    ctx.font = `${iconSize}px serif`;
    ctx.textAlign = "center";
    ctx.fillText(scene.icon || "💡", W/2, iconY + iconSize*0.38);

    // Heading
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowBlur = 16;
    const hfs = Math.round(W * 0.085);
    ctx.font = `900 ${hfs}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = topic.accent;
    ctx.fillText(scene.heading, W/2, H*0.46);

    // Body text (line-wrapped)
    ctx.shadowBlur = 8;
    const bfs = Math.round(W * 0.054);
    ctx.font = `700 ${bfs}px Inter, sans-serif`;
    ctx.fillStyle = "#ffffff";
    const bodyLines = wrapLines(ctx, scene.body, W*0.82);
    const lineH = bfs * 1.5;
    const startY = H*0.56;
    bodyLines.forEach((ln, i) => {
      // Highlight accent word
      if (scene.accentWord && ln.includes(scene.accentWord)) {
        ctx.fillStyle = "#ffffff";
        ctx.fillText(ln.replace(scene.accentWord, ""), W/2, startY + i*lineH);
        // Draw accent in color
        const beforeW = ctx.measureText(ln.split(scene.accentWord)[0]).width;
        const accW = ctx.measureText(scene.accentWord).width;
        const totalW = ctx.measureText(ln).width;
        const startX = W/2 - totalW/2 + beforeW;
        ctx.fillStyle = topic.accent;
        ctx.textAlign = "left";
        ctx.fillText(scene.accentWord, startX, startY + i*lineH);
        ctx.textAlign = "center";
      } else {
        ctx.fillText(ln, W/2, startY + i*lineH);
      }
    });

    // Accent pill at bottom
    const tag = scene.accentWord || scene.heading;
    ctx.shadowBlur = 0;
    const tfs = Math.round(W * 0.038);
    ctx.font = `800 ${tfs}px Inter, sans-serif`;
    const tw = ctx.measureText(tag).width + W*0.06;
    drawRoundRect(ctx, W/2 - tw/2, H*0.84, tw, H*0.058, 28);
    ctx.fillStyle = topic.accent;
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillText(tag, W/2, H*0.877);

  } else if (scene.type === "outro") {
    // Stars rain simulation
    ctx.shadowBlur = 0;
    for (let s = 0; s < 12; s++) {
      const sx = W * ((s * 0.13 + totalProgress * 0.3) % 1);
      const sy = H * ((s * 0.17 + totalProgress * 0.5) % 1);
      ctx.font = `${Math.round(W*0.04)}px serif`;
      ctx.globalAlpha = (slideAlpha * fadeAlpha * 0.35);
      ctx.fillText("⭐", sx, sy);
    }
    ctx.globalAlpha = slideAlpha * fadeAlpha;

    ctx.font = `${Math.round(W*0.18)}px serif`;
    ctx.textAlign = "center";
    ctx.fillText(scene.icon || "🎯", W/2, H*0.32);

    ctx.shadowColor = `rgba(${acc.r},${acc.g},${acc.b},0.9)`;
    ctx.shadowBlur = 24;
    const hfs = Math.round(W * 0.088);
    ctx.font = `900 ${hfs}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = topic.accent;
    ctx.fillText(scene.heading, W/2, H*0.52);

    ctx.shadowBlur = 8;
    const bfs = Math.round(W * 0.046);
    ctx.font = `600 ${bfs}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    scene.body.split("\n").forEach((ln, i) => ctx.fillText(ln, W/2, H*0.63 + i * bfs*1.6));

    // Big CTA button
    ctx.shadowBlur = 0;
    const ctaW = W * 0.7, ctaH = H * 0.085;
    drawRoundRect(ctx, W/2 - ctaW/2, H*0.77, ctaW, ctaH, 40);
    ctx.fillStyle = topic.accent;
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = `900 ${Math.round(W*0.048)}px Inter, sans-serif`;
    ctx.fillText("Follow for More! 🔔", W/2, H*0.821);
  }

  ctx.restore();

  // ── Progress bar ──
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(0, H-4, W, 4);
  ctx.fillStyle = topic.accent;
  ctx.fillRect(0, H-4, W * totalProgress, 4);
  ctx.restore();

  // ── Top branding ──
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(0, 0, W, H*0.07);
  ctx.font = `700 ${Math.round(W*0.038)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillText(`${topic.emoji} ${topic.title.toUpperCase()}`, W/2, H*0.048);
  ctx.restore();
}

/* ─── COMPONENT ─── */
const RATIOS = [
  { id: "9:16", icon: "📱", w: 360, h: 640 },
  { id: "16:9", icon: "🖥️", w: 640, h: 360 },
  { id: "1:1", icon: "⬛", w: 480, h: 480 },
  { id: "4:5", icon: "📷", w: 480, h: 600 },
];

export default function AiVideo() {
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [ratio, setRatio] = useState(RATIOS[0]);
  const [lang, setLang] = useState<Lang>("hinglish");
  const [voiceOn, setVoiceOn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordBlob, setRecordBlob] = useState<Blob | null>(null);
  const [currentScene, setCurrentScene] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const playingRef = useRef(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const voiceTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  playingRef.current = playing;

  const getTotalDur = (t: TopicData) => t.scenes.reduce((s, sc) => s + SCENE_DURATIONS[sc.type], 0);

  const clearVoiceTimers = () => {
    voiceTimersRef.current.forEach(t => clearTimeout(t));
    voiceTimersRef.current = [];
    window.speechSynthesis?.cancel();
  };

  const scheduleVoice = useCallback((topic: TopicData) => {
    if (!voiceOn) return;
    clearVoiceTimers();
    let cumTime = 0;
    topic.scenes.forEach((sc, i) => {
      const delay = cumTime * 1000;
      const timer = setTimeout(() => {
        if (!playingRef.current) return;
        window.speechSynthesis?.cancel();
        const utt = new SpeechSynthesisUtterance(topic.narration[lang][i] ?? "");
        utt.lang = lang === "hindi" ? "hi-IN" : lang === "english" ? "en-US" : "en-IN";
        utt.rate = 1.05;
        window.speechSynthesis?.speak(utt);
      }, delay);
      voiceTimersRef.current.push(timer);
      cumTime += SCENE_DURATIONS[sc.type];
    });
  }, [voiceOn, lang]);

  const startAnimation = useCallback((topic: TopicData) => {
    startRef.current = performance.now();
    setCurrentScene(0);
    setPlaying(true);
    if (voiceOn) scheduleVoice(topic);
  }, [voiceOn, scheduleVoice]);

  useEffect(() => {
    if (!playing || !selectedTopic) return;
    const topic = selectedTopic;
    const totalDur = getTotalDur(topic);

    const loop = (ts: number) => {
      const elapsed = (ts - startRef.current) / 1000;
      if (elapsed >= totalDur) {
        setPlaying(false);
        clearVoiceTimers();
        if (recorderRef.current?.state === "recording") recorderRef.current.stop();
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) { animRef.current = requestAnimationFrame(loop); return; }

      // Find current scene
      let acc = 0, scIdx = 0, scProgress = 0;
      for (let i = 0; i < topic.scenes.length; i++) {
        const dur = SCENE_DURATIONS[topic.scenes[i].type];
        if (elapsed < acc + dur) { scIdx = i; scProgress = (elapsed - acc) / dur; break; }
        acc += dur;
      }
      setCurrentScene(scIdx);

      const W = canvas.width, H = canvas.height;
      drawScene(ctx, W, H, topic.scenes[scIdx], topic, scProgress, elapsed / totalDur);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [playing, selectedTopic]);

  const stopAll = () => {
    setPlaying(false);
    clearVoiceTimers();
    if (animRef.current) cancelAnimationFrame(animRef.current);
    if (recorderRef.current?.state === "recording") { recorderRef.current.stop(); }
  };

  const handleRecord = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTopic) return;
    chunksRef.current = [];
    const stream = canvas.captureStream(30);
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? "video/webm;codecs=vp9" : "video/webm";
    const rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 5_000_000 });
    rec.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    rec.onstop = () => { setRecordBlob(new Blob(chunksRef.current, { type: "video/webm" })); setRecording(false); };
    recorderRef.current = rec;
    rec.start();
    setRecording(true);
    setRecordBlob(null);
    startAnimation(selectedTopic);
  };

  const downloadVideo = () => {
    if (!recordBlob) return;
    const url = URL.createObjectURL(recordBlob);
    const a = document.createElement("a");
    a.href = url; a.download = `class10hub-reel-${Date.now()}.webm`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="py-8 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }} className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 text-rose-500 mb-3 font-medium text-sm">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}><Film size={16} /></motion.div>
            AI Video Reel Generator
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-2">
            Viral Study Reels{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Banao!</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Full motion animated · Text effects · Voice in Hindi/English/Hinglish · Download karo!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr,300px] gap-6">
          {/* Left: Canvas */}
          <div className="space-y-4">
            {/* Topic picker */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Topic Choose Karo</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPICS.map(t => (
                  <motion.button key={t.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}
                    onClick={() => { setSelectedTopic(t); stopAll(); setRecordBlob(null); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${selectedTopic?.id === t.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary/50 hover:border-primary/40"}`}>
                    <span>{t.emoji}</span> {t.title}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Canvas preview */}
            <div className="flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black"
                style={{ width: "100%", maxWidth: ratio.w, aspectRatio: `${ratio.w}/${ratio.h}` }}>
                <canvas ref={canvasRef} width={ratio.w} height={ratio.h} className="w-full h-full" />

                {!selectedTopic && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                      className="text-6xl mb-4">🎬</motion.div>
                    <p className="text-white font-bold text-lg">Topic choose karo!</p>
                    <p className="text-white/50 text-sm mt-1">Upar se koi bhi topic select karo</p>
                  </div>
                )}

                {selectedTopic && !playing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                      onClick={() => startAnimation(selectedTopic!)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                      <Play size={32} className="text-rose-500 ml-1" />
                    </motion.button>
                  </motion.div>
                )}

                {/* Live badge */}
                {playing && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-rose-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2 h-2 bg-white rounded-full" />
                    LIVE
                  </div>
                )}
              </div>
            </div>

            {/* Scene indicators */}
            {selectedTopic && (
              <div className="flex items-center justify-center gap-1.5">
                {selectedTopic.scenes.map((sc, i) => (
                  <motion.div key={i}
                    animate={{ width: currentScene === i && playing ? 28 : 8, opacity: i <= currentScene ? 1 : 0.3 }}
                    className="h-2 rounded-full transition-all"
                    style={{ backgroundColor: i <= currentScene ? selectedTopic.accent : "#666" }}
                  />
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-2 flex-wrap">
              {playing ? (
                <motion.button whileTap={{ scale: 0.94 }} onClick={stopAll}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-bold text-sm">
                  <Pause size={16} /> Pause
                </motion.button>
              ) : (
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}
                  onClick={() => selectedTopic && startAnimation(selectedTopic)}
                  disabled={!selectedTopic}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-2xl font-bold text-sm disabled:opacity-40">
                  <Play size={16} /> Play Preview
                </motion.button>
              )}

              <motion.button whileTap={{ scale: 0.94 }} onClick={stopAll}
                className="flex items-center gap-2 px-4 py-2.5 bg-secondary rounded-2xl font-bold text-sm">
                <Square size={14} /> Reset
              </motion.button>

              <motion.button whileTap={{ scale: 0.94 }}
                onClick={() => { setVoiceOn(!voiceOn); if (voiceOn) clearVoiceTimers(); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm border-2 transition-all ${voiceOn ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" : "border-border bg-secondary"}`}>
                {voiceOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                {voiceOn ? "Voice ON" : "Voice OFF"}
              </motion.button>
            </div>
          </div>

          {/* Right: Settings + Record */}
          <div className="space-y-3">
            {/* Record */}
            <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <p className="font-bold flex items-center gap-2"><Film size={16} className="text-rose-500" /> Download Reel</p>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                onClick={handleRecord}
                disabled={!selectedTopic || recording}
                className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 ${recording ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg disabled:opacity-40"}`}>
                {recording ? (
                  <><motion.div animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2.5 h-2.5 bg-white rounded-full" />
                  Recording...</>
                ) : (
                  <><Sparkles size={15} /> Record & Download</>
                )}
              </motion.button>

              <AnimatePresence>
                {recordBlob && (
                  <motion.button initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    onClick={downloadVideo}
                    className="w-full py-3 bg-green-500 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                    <Download size={15} /> Save Video (.webm)
                  </motion.button>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-muted-foreground text-center">WebM → MP4 ke liye online converter use karo</p>
            </div>

            {/* Ratio */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Video Ratio</p>
              <div className="grid grid-cols-2 gap-2">
                {RATIOS.map(r => (
                  <motion.button key={r.id} whileTap={{ scale: 0.94 }}
                    onClick={() => setRatio(r)}
                    className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${ratio.id === r.id ? "bg-primary text-white" : "bg-secondary"}`}>
                    <span>{r.icon}</span> {r.id}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Voice Language</p>
              <div className="grid grid-cols-3 gap-2">
                {(["hindi", "english", "hinglish"] as Lang[]).map(l => (
                  <motion.button key={l} whileTap={{ scale: 0.94 }}
                    onClick={() => setLang(l)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${lang === l ? "bg-primary text-white" : "bg-secondary"}`}>
                    {l}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Topic Preview */}
            {selectedTopic && (
              <div className="bg-card border border-border rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Scenes</p>
                <div className="space-y-1.5">
                  {selectedTopic.scenes.map((sc, i) => (
                    <div key={i}
                      className={`flex items-center gap-2 p-2 rounded-xl text-xs transition-all ${currentScene === i && playing ? "bg-primary/15 border border-primary/30" : ""}`}>
                      <span>{sc.icon}</span>
                      <span className="font-bold truncate">{sc.heading.split("\n")[0]}</span>
                      <span className="ml-auto text-muted-foreground">{SCENE_DURATIONS[sc.type]}s</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  Total: {getTotalDur(selectedTopic)}s
                </p>
              </div>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-2xl text-sm text-rose-700 dark:text-rose-400 flex gap-3">
          <span className="text-xl">🎬</span>
          <div>
            <strong>Best Reel download kaise karo:</strong> Topic choose karo → Language set karo → "Record & Download" dabaao → Reel automatically play hogi aur record hogi → "Save Video" se download karo. Screen record se voice bhi capture hogi!
          </div>
        </motion.div>
      </div>
    </div>
  );
}
