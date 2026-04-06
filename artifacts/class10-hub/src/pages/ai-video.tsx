import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Pause, Download, Sparkles, Volume2, VolumeX, RefreshCw, RotateCcw, Loader2 } from "lucide-react";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

type Lang = "hindi" | "english" | "hinglish";

interface TopicData {
  id: string; title: string; emoji: string;
  colors: { bg1: string; bg2: string; accent: string; card: string; text: string };
  scenes: SceneData[];
  narration: Record<Lang, string[]>;
}

interface SceneData {
  duration: number;
  type: "intro" | "fact" | "formula" | "character" | "outro";
  character?: "think" | "jump" | "run" | "read" | "celebrate";
  heading: string;
  subtext: string;
  highlight?: string;
  particles?: "stars" | "math" | "hearts" | "leaves";
}

const TOPICS: TopicData[] = [
  {
    id: "human-eye", title: "Human Eye", emoji: "👁️",
    colors: { bg1: "#0f0c29", bg2: "#24243e", accent: "#e94560", card: "rgba(233,69,96,0.15)", text: "#ffffff" },
    scenes: [
      { duration: 3.5, type: "intro", character: "jump", heading: "Human Eye", subtext: "Class 10 Science · Chapter 11", particles: "stars" },
      { duration: 4, type: "character", character: "think", heading: "5 Main Parts", subtext: "Cornea · Iris · Pupil · Lens · Retina", highlight: "CIPLR yaad karo!", particles: "stars" },
      { duration: 3.8, type: "formula", character: "read", heading: "Myopia", subtext: "Door ka nahi dikhta", highlight: "→ Concave Lens", particles: "math" },
      { duration: 3.8, type: "formula", character: "read", heading: "Hypermetropia", subtext: "Paas ka nahi dikhta", highlight: "→ Convex Lens", particles: "math" },
      { duration: 4, type: "fact", character: "run", heading: "Tyndall Effect", subtext: "Sky NEELA · Sunset LAAL", highlight: "Scattering of Light!", particles: "stars" },
      { duration: 3.5, type: "outro", character: "celebrate", heading: "5 marks pakke!", subtext: "class10hubs.netlify.app", particles: "hearts" },
    ],
    narration: {
      hindi: ["Human eye aur colorful world — super important chapter!", "5 main parts: Cornea, Iris, Pupil, Lens, Retina", "Myopia mein door ka blur hota hai — Concave lens", "Hypermetropia mein paas ka blur — Convex lens", "Tyndall effect se aasman neela aur sunset laal!", "Class 10 Hub par complete notes paao!"],
      english: ["Human eye — crucial for Class 10 boards!", "Five parts: Cornea, Iris, Pupil, Lens, Retina", "Myopia: far blur — Concave lens corrects it", "Hypermetropia: near blur — Convex lens fixes it", "Tyndall effect: blue sky and red sunsets!", "Visit Class 10 Hub for complete notes!"],
      hinglish: ["Human Eye — Class 10 ka super important chapter!", "5 parts: Cornea Iris Pupil Lens Retina — CIPLR!", "Myopia mein door blur — Concave Lens lagao", "Hypermetropia mein paas blur — Convex Lens", "Tyndall effect se sky blue aur sunset red!", "Class 10 Hub par free notes paao!"],
    }
  },
  {
    id: "electricity", title: "Electricity", emoji: "⚡",
    colors: { bg1: "#1a1a2e", bg2: "#16213e", accent: "#f5a623", card: "rgba(245,166,35,0.15)", text: "#ffffff" },
    scenes: [
      { duration: 3.5, type: "intro", character: "jump", heading: "Electricity", subtext: "Class 10 Science · Highest Marks!", particles: "stars" },
      { duration: 4, type: "formula", character: "read", heading: "Ohm's Law", subtext: "Voltage = Current × Resistance", highlight: "V = I × R", particles: "math" },
      { duration: 3.8, type: "character", character: "think", heading: "Series Circuit", subtext: "Ek fail → Sab off!", highlight: "Same Current", particles: "math" },
      { duration: 3.8, type: "character", character: "run", heading: "Parallel Circuit", subtext: "Ghar mein yahi use hota hai", highlight: "Same Voltage", particles: "stars" },
      { duration: 4, type: "formula", character: "read", heading: "Heating Effect", subtext: "Heater · Toaster · Bulb", highlight: "H = I²Rt", particles: "math" },
      { duration: 3.5, type: "outro", character: "celebrate", heading: "Board mein aata hai!", subtext: "class10hubs.netlify.app", particles: "hearts" },
    ],
    narration: {
      hindi: ["Electricity — highest marks wala chapter!", "Ohm's law: V = IR — voltage current resistance", "Series mein ek bulb fail toh sab off", "Ghar mein parallel circuit use hota hai", "Heating formula: H = I squared R t", "Board exam mein zaroor aata hai!"],
      english: ["Electricity — highest scoring chapter!", "Ohm's Law: V equals I times R", "Series: one bulb fails, all off", "Homes use parallel circuits", "Heating effect: H equals I squared Rt", "Must in boards — Class 10 Hub!"],
      hinglish: ["Electricity — max marks wala chapter!", "Ohm's Law: V = I times R", "Series mein ek fail toh sab off", "Ghar mein parallel use hota hai", "H = I squared Rt — heating formula", "Board mein zaroor — Class 10 Hub!"],
    }
  },
  {
    id: "photosynthesis", title: "Photosynthesis", emoji: "🌿",
    colors: { bg1: "#0d2b0d", bg2: "#1a3a1a", accent: "#4caf50", card: "rgba(76,175,80,0.15)", text: "#ffffff" },
    scenes: [
      { duration: 3.5, type: "intro", character: "jump", heading: "Photosynthesis", subtext: "Life Processes · Biology", particles: "leaves" },
      { duration: 4, type: "formula", character: "read", heading: "The Equation", subtext: "CO₂ + H₂O → Glucose + O₂", highlight: "(Sunlight + Chlorophyll)", particles: "leaves" },
      { duration: 3.8, type: "character", character: "think", heading: "Chloroplast", subtext: "Green rung = Chlorophyll", highlight: "Yahan hoti hai!", particles: "leaves" },
      { duration: 3.8, type: "formula", character: "read", heading: "Light Reaction", subtext: "Sunlight + Water → O₂ + ATP", highlight: "Thylakoid mein", particles: "stars" },
      { duration: 4, type: "fact", character: "run", heading: "Calvin Cycle", subtext: "CO₂ → Glucose banta hai", highlight: "Stroma mein!", particles: "leaves" },
      { duration: 3.5, type: "outro", character: "celebrate", heading: "3 marks pakke!", subtext: "class10hubs.netlify.app", particles: "hearts" },
    ],
    narration: {
      hindi: ["Photosynthesis — Life Processes ka important topic!", "Equation: CO2 + paani se glucose aur oxygen", "Chloroplast green hai — chlorophyll wahan hai", "Light reaction mein O2 aur ATP banta hai", "Calvin cycle mein glucose banta hai", "3 marks pakke — Class 10 Hub!"],
      english: ["Photosynthesis — most important in Life Processes!", "Equation: CO2 and water gives glucose and oxygen", "Chloroplasts green due to chlorophyll", "Light reactions produce O2 and ATP", "Calvin cycle produces glucose in stroma", "Three marks guaranteed — Class 10 Hub!"],
      hinglish: ["Photosynthesis — Life Processes ka top topic!", "CO2 aur paani se glucose aur O2 banta hai", "Chloroplast green kyunki chlorophyll hai", "Light reaction mein O2 aur ATP", "Calvin cycle mein glucose banta hai", "3 marks pakke — Class 10 Hub!"],
    }
  },
  {
    id: "water-cycle", title: "Water Cycle", emoji: "💧",
    colors: { bg1: "#0a192f", bg2: "#112240", accent: "#64ffda", card: "rgba(100,255,218,0.12)", text: "#ffffff" },
    scenes: [
      { duration: 3.5, type: "intro", character: "jump", heading: "Water Cycle", subtext: "Geography · SST · Easy 2 Marks!", particles: "stars" },
      { duration: 3.8, type: "fact", character: "run", heading: "Evaporation", subtext: "Sun ki garmi → Bhap banta hai", highlight: "Samudr + Nadi", particles: "stars" },
      { duration: 3.8, type: "character", character: "think", heading: "Condensation", subtext: "Upar thanda → Baadal banta hai", highlight: "Bhap → Baadal!", particles: "stars" },
      { duration: 3.8, type: "fact", character: "run", heading: "Precipitation", subtext: "Baarish · Baraf · Ole", highlight: "Dharti pe aata hai!", particles: "stars" },
      { duration: 3.8, type: "character", character: "read", heading: "Collection", subtext: "Nadi · Jheel · Bhumigatjal", highlight: "Cycle complete!", particles: "stars" },
      { duration: 3.5, type: "outro", character: "celebrate", heading: "2 marks guaranteed!", subtext: "class10hubs.netlify.app", particles: "hearts" },
    ],
    narration: {
      hindi: ["Water cycle — Geography mein 2 marks pakka!", "Evaporation: Suraj se paani bhap banta hai", "Condensation: Thanda hokar baadal banta hai", "Precipitation: Baarish, baraf dharti pe girta hai", "Collection: Nadi, jheel mein ikatha hota hai", "Dono marks pakke — Class 10 Hub!"],
      english: ["Water cycle — guaranteed 2 marks in Geography!", "Evaporation: Sun's heat turns water to vapor", "Condensation: Vapor cools, forms clouds", "Precipitation: Rain, snow falls to earth", "Collection: Rivers, lakes collect water", "Both marks guaranteed — Class 10 Hub!"],
      hinglish: ["Water cycle — 2 marks pakka Geography mein!", "Evaporation: Sun se bhap banta hai", "Condensation: Cool hokar baadal banta hai", "Precipitation: Baarish aur baraf girta hai", "Collection: Nadi jheel mein paani", "2 marks pakke — Class 10 Hub!"],
    }
  },
  {
    id: "real-numbers", title: "Real Numbers", emoji: "🔢",
    colors: { bg1: "#1a0533", bg2: "#2d0a5e", accent: "#a78bfa", card: "rgba(167,139,250,0.15)", text: "#ffffff" },
    scenes: [
      { duration: 3.5, type: "intro", character: "jump", heading: "Real Numbers", subtext: "Maths Chapter 1 · Board Fav!", particles: "math" },
      { duration: 4, type: "formula", character: "read", heading: "Euclid's Lemma", subtext: "a = bq + r", highlight: "HCF nikalne ka formula!", particles: "math" },
      { duration: 3.8, type: "formula", character: "think", heading: "HCF × LCM", subtext: "= a × b", highlight: "Sirf 2 numbers ke liye!", particles: "math" },
      { duration: 3.8, type: "fact", character: "run", heading: "Irrational Numbers", subtext: "√2, √3, √5 — sab irrational!", highlight: "Contradiction method", particles: "math" },
      { duration: 4, type: "formula", character: "read", heading: "Terminating Decimal", subtext: "p/q terminates if", highlight: "q = 2ᵐ × 5ⁿ", particles: "math" },
      { duration: 3.5, type: "outro", character: "celebrate", heading: "Full marks possible!", subtext: "class10hubs.netlify.app", particles: "hearts" },
    ],
    narration: {
      hindi: ["Real Numbers — Chapter 1 Maths, bohot important!", "Euclid division: a = bq + r — HCF formula", "HCF times LCM = product of numbers", "Root 2, 3, 5 — sab irrational hain", "Terminating decimal: q = 2^m × 5^n", "Poore notes Class 10 Hub par free!"],
      english: ["Real Numbers — Chapter 1, very important!", "Euclid's lemma: a equals bq plus r", "HCF times LCM equals product of numbers", "Square roots 2, 3, 5 are irrational", "Terminating decimal when q is 2^m times 5^n", "Free notes at Class 10 Hub!"],
      hinglish: ["Real Numbers — Maths ka chapter 1, super important!", "Euclid division: a = bq + r", "HCF × LCM = a × b", "Root 2, 3, 5 — sab irrational hain", "Terminating: q = 2^m × 5^n hona chahiye", "Free notes Class 10 Hub par!"],
    }
  },
];

/* ═══════════════════════════════════════════
   CANVAS RENDERER — Full Motion Animation
═══════════════════════════════════════════ */

function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeInOut(t: number) { return t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * Math.max(0, Math.min(1, t)); }

interface Particle { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; char: string; size: number; color: string; spin: number; }

class ParticleSystem {
  particles: Particle[] = [];
  private chars: Record<string, string[]> = {
    stars: ["⭐","✨","🌟","💫","⚡"],
    math: ["×","÷","+","=","∑","π","√","∞","²","³"],
    hearts: ["❤️","💚","💙","💜","🎉","🎊","🏆","✅"],
    leaves: ["🌿","🍃","🌱","☀️","💧","🌤️","⚗️"],
  };

  emit(x: number, y: number, type: string, count = 1) {
    const chars = this.chars[type] || this.chars.stars;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 3 - 1,
        life: 1,
        maxLife: 1.5 + Math.random(),
        char: chars[Math.floor(Math.random() * chars.length)],
        size: 14 + Math.random() * 10,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        spin: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  update(dt: number) {
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= dt / p.maxLife;
    }
    this.particles = this.particles.filter(p => p.life > 0);
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life) * 0.9;
      ctx.font = `${p.size}px serif`;
      ctx.textAlign = "center";
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin * (1 - p.life));
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }
  }
}

/* ─── Cartoon Character Drawer ─── */
function drawCartoonCharacter(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  scale: number,
  animation: string,
  t: number, // animation time 0→∞
  accent: string
) {
  const s = scale;
  const bounce = Math.sin(t * 8) * 3 * s;
  const sway = Math.sin(t * 4) * 2 * s;

  ctx.save();
  ctx.translate(cx, cy);

  if (animation === "jump") {
    const jumpY = -Math.abs(Math.sin(t * 3)) * 20 * s;
    ctx.translate(sway, jumpY);
  } else if (animation === "run") {
    ctx.translate(Math.sin(t * 5) * 4 * s, bounce * 0.5);
  } else if (animation === "celebrate") {
    ctx.translate(Math.sin(t * 6) * 5 * s, bounce);
  } else {
    ctx.translate(sway * 0.5, bounce * 0.3);
  }

  // Shadow
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.beginPath();
  ctx.ellipse(0, 38*s, 14*s, 4*s, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  // Body (torso)
  const bodyColor = accent;
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.roundRect(-10*s, -8*s, 20*s, 28*s, 6*s);
  ctx.fill();

  // Collar/shirt detail
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.beginPath();
  ctx.moveTo(-4*s, -8*s); ctx.lineTo(0, -2*s); ctx.lineTo(4*s, -8*s);
  ctx.fill();

  // Legs
  const legSwing = animation === "run" ? Math.sin(t * 8) * 0.4 : 0;
  ctx.save();
  ctx.translate(-5*s, 20*s);
  ctx.rotate(legSwing);
  ctx.fillStyle = "#4a4a8a";
  ctx.beginPath();
  ctx.roundRect(-3.5*s, 0, 7*s, 18*s, 3*s);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(-4*s, 14*s, 8*s, 5*s, 2*s);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(5*s, 20*s);
  ctx.rotate(-legSwing);
  ctx.fillStyle = "#4a4a8a";
  ctx.beginPath();
  ctx.roundRect(-3.5*s, 0, 7*s, 18*s, 3*s);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(-4*s, 14*s, 8*s, 5*s, 2*s);
  ctx.fill();
  ctx.restore();

  // Arms
  const armSwing = animation === "run" ? Math.sin(t * 8) * 0.5 : 
                   animation === "celebrate" ? Math.sin(t * 5) * 0.6 + 0.4 :
                   animation === "think" ? -0.5 : 0.15;
  const armSwing2 = animation === "run" ? -armSwing : armSwing;

  ctx.save();
  ctx.translate(-10*s, -2*s);
  ctx.rotate(-0.3 - armSwing);
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.roundRect(-3*s, 0, 6*s, 20*s, 3*s);
  ctx.fill();
  // Hand
  ctx.fillStyle = "#FDBCB4";
  ctx.beginPath();
  ctx.arc(0, 20*s, 4*s, 0, Math.PI*2);
  ctx.fill();
  if (animation === "celebrate") {
    ctx.font = `${10*s}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("🎉", 0, 15*s);
  }
  ctx.restore();

  ctx.save();
  ctx.translate(10*s, -2*s);
  ctx.rotate(0.3 + armSwing2);
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.roundRect(-3*s, 0, 6*s, 20*s, 3*s);
  ctx.fill();
  ctx.fillStyle = "#FDBCB4";
  ctx.beginPath();
  ctx.arc(0, 20*s, 4*s, 0, Math.PI*2);
  ctx.fill();
  if (animation === "read") {
    ctx.fillStyle = "#fff8dc";
    ctx.beginPath();
    ctx.roundRect(-6*s, 18*s, 14*s, 10*s, 2*s);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.font = `${3*s}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText("≡ ≡ ≡", 1*s, 25*s);
  }
  ctx.restore();

  // Neck
  ctx.fillStyle = "#FDBCB4";
  ctx.beginPath();
  ctx.roundRect(-4*s, -14*s, 8*s, 8*s, 2*s);
  ctx.fill();

  // Head
  ctx.fillStyle = "#FDBCB4";
  ctx.beginPath();
  ctx.ellipse(0, -24*s, 14*s, 14*s, 0, 0, Math.PI*2);
  ctx.fill();

  // Hair
  ctx.fillStyle = "#3d2b1f";
  ctx.beginPath();
  ctx.ellipse(0, -34*s, 14*s, 8*s, 0, 0, Math.PI);
  ctx.fill();
  // Hair spikes
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i*6*s - 3*s, -34*s);
    ctx.quadraticCurveTo(i*6*s, -44*s, i*6*s + 3*s, -34*s);
    ctx.fill();
  }

  // Eyes
  const blink = Math.sin(t * 0.7) > 0.95 ? 0.1 : 1;
  ctx.fillStyle = "#222";
  ctx.beginPath();
  ctx.ellipse(-5*s, -24*s, 3*s, 3.5*s * blink, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(5*s, -24*s, 3*s, 3.5*s * blink, 0, 0, Math.PI*2);
  ctx.fill();
  // Eye shine
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(-4*s, -25*s, 1.2*s, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(6*s, -25*s, 1.2*s, 0, Math.PI*2);
  ctx.fill();

  // Expression
  if (animation === "celebrate") {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5*s;
    ctx.beginPath();
    ctx.arc(0, -20*s, 5*s, 0.1, Math.PI - 0.1);
    ctx.stroke();
  } else if (animation === "think") {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5*s;
    ctx.beginPath();
    ctx.arc(-2*s, -20*s, 3*s, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // Thought bubble
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    for (let i = 0; i < 3; i++) {
      const bx = 18*s + i*4*s, by = -32*s - i*4*s;
      const bs = (i+1)*2.5*s;
      ctx.beginPath();
      ctx.arc(bx, by, bs, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.roundRect(26*s, -52*s, 24*s, 16*s, 5*s);
    ctx.fill();
    ctx.fillStyle = "#555";
    ctx.font = `${6*s}px serif`;
    ctx.textAlign = "center";
    ctx.fillText("💡", 38*s, -42*s);
  } else {
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1.5*s;
    ctx.beginPath();
    ctx.arc(0, -21*s, 4*s, 0.3, Math.PI - 0.3);
    ctx.stroke();
  }

  // Cap / graduation hat for "read"
  if (animation === "read" || animation === "think") {
    ctx.fillStyle = "#2c3e50";
    ctx.beginPath();
    ctx.ellipse(0, -36*s, 13*s, 3*s, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(-7*s, -43*s, 14*s, 8*s, 2*s);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillRect(-7*s, -43*s, 14*s, 1.5*s);
  }

  ctx.restore();
}

function drawBackground(ctx: CanvasRenderingContext2D, W: number, H: number, colors: TopicData["colors"], t: number) {
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, colors.bg1);
  grad.addColorStop(1, colors.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Animated circle blobs
  const accentRgb = hexToRgba(colors.accent, 0.06);
  ctx.fillStyle = accentRgb;
  ctx.beginPath();
  ctx.arc(W * 0.85 + Math.sin(t * 0.5) * 15, H * 0.15 + Math.cos(t * 0.4) * 12, W * 0.3, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = hexToRgba(colors.accent, 0.04);
  ctx.beginPath();
  ctx.arc(W * 0.1 + Math.sin(t * 0.7) * 10, H * 0.8 + Math.cos(t * 0.5) * 8, W * 0.22, 0, Math.PI*2);
  ctx.fill();

  // Dot grid
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  for (let xi = 0; xi < W; xi += W*0.1) {
    for (let yi = 0; yi < H; yi += W*0.1) {
      ctx.beginPath();
      ctx.arc(xi, yi, 1.5, 0, Math.PI*2);
      ctx.fill();
    }
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y, x+w,y+r, r);
  ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w,y+h, x+w-r,y+h, r);
  ctx.lineTo(x+r, y+h); ctx.arcTo(x,y+h, x,y+h-r, r);
  ctx.lineTo(x, y+r); ctx.arcTo(x,y, x+r,y, r);
  ctx.closePath();
}

function drawScene(
  ctx: CanvasRenderingContext2D, W: number, H: number,
  scene: SceneData, topic: TopicData,
  sceneP: number, totalP: number,
  globalT: number, particles: ParticleSystem
) {
  const inP = Math.min(1, sceneP / 0.25);
  const outP = Math.max(0, (sceneP - 0.75) / 0.25);
  const alpha = easeOut(inP) * (1 - easeOut(outP));

  drawBackground(ctx, W, H, topic.colors, globalT);

  const charScale = W / 200;
  const charX = W * 0.78;
  const charY = H * 0.72;

  if (scene.character) {
    ctx.save();
    ctx.globalAlpha = alpha;
    drawCartoonCharacter(ctx, charX, charY, charScale, scene.character, globalT, topic.colors.accent);
    ctx.restore();
  }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(0, (1 - easeOut(inP)) * 30);

  const textW = W * 0.6;
  const textX = W * 0.05;

  if (scene.type === "intro") {
    // Big emoji
    ctx.font = `${W*0.14}px serif`;
    ctx.textAlign = "left";
    ctx.fillText(topic.emoji, textX, H * 0.35);

    // Big title
    ctx.font = `900 ${Math.round(W*0.1)}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = topic.colors.accent;
    ctx.shadowBlur = 20;
    ctx.fillText(scene.heading, textX, H * 0.52);
    ctx.shadowBlur = 0;

    // Subtitle badge
    const fs = Math.round(W * 0.04);
    ctx.font = `700 ${fs}px Inter, sans-serif`;
    const tw = ctx.measureText(scene.subtext).width + 24;
    drawRoundRect(ctx, textX - 4, H*0.57, tw, fs*1.8, 10);
    ctx.fillStyle = hexToRgba(topic.colors.accent, 0.3);
    ctx.fill();
    ctx.fillStyle = topic.colors.accent;
    ctx.fillText(scene.subtext, textX + 8, H * 0.57 + fs * 1.3);

  } else if (scene.type === "formula") {
    // Heading
    ctx.font = `800 ${Math.round(W*0.072)}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = topic.colors.accent;
    ctx.textAlign = "left";
    ctx.fillText(scene.heading, textX, H * 0.32);

    // Subtext
    ctx.font = `600 ${Math.round(W*0.052)}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText(scene.subtext, textX, H * 0.45);

    // Highlight formula box
    if (scene.highlight) {
      const hfs = Math.round(W*0.065);
      ctx.font = `900 ${hfs}px Inter, monospace`;
      const hw = ctx.measureText(scene.highlight).width + 32;
      drawRoundRect(ctx, textX - 4, H*0.54, Math.min(hw, textW + 8), hfs*1.9, 12);
      ctx.fillStyle = topic.colors.accent;
      ctx.fill();
      ctx.fillStyle = "#000000";
      ctx.fillText(scene.highlight, textX + 12, H*0.54 + hfs*1.4);
    }

  } else if (scene.type === "fact" || scene.type === "character") {
    ctx.font = `800 ${Math.round(W*0.072)}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.shadowColor = topic.colors.accent;
    ctx.shadowBlur = 12;
    ctx.fillText(scene.heading, textX, H * 0.32);
    ctx.shadowBlur = 0;

    ctx.font = `600 ${Math.round(W*0.048)}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    const subLines = scene.subtext.split(" · ");
    subLines.forEach((ln, i) => ctx.fillText(ln, textX, H * 0.44 + i * Math.round(W*0.058)));

    if (scene.highlight) {
      const hfs = Math.round(W*0.052);
      ctx.font = `800 ${hfs}px Inter, sans-serif`;
      ctx.fillStyle = topic.colors.accent;
      ctx.fillText("→ " + scene.highlight, textX, H * 0.62);
    }

  } else if (scene.type === "outro") {
    // Celebration confetti
    if (sceneP > 0.1 && Math.random() < 0.3) {
      particles.emit(Math.random() * W * 0.7, Math.random() * H * 0.4, scene.particles || "hearts", 1);
    }

    ctx.font = `${Math.round(W*0.14)}px serif`;
    ctx.textAlign = "left";
    ctx.fillText("🏆", textX, H * 0.35);

    ctx.font = `900 ${Math.round(W*0.085)}px Inter, Arial Black, sans-serif`;
    ctx.fillStyle = topic.colors.accent;
    ctx.shadowColor = topic.colors.accent;
    ctx.shadowBlur = 20;
    ctx.fillText(scene.heading, textX, H * 0.52);
    ctx.shadowBlur = 0;

    ctx.font = `600 ${Math.round(W*0.042)}px Inter, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(scene.subtext, textX, H * 0.61);

    // Big CTA
    const ctaFs = Math.round(W*0.045);
    ctx.font = `900 ${ctaFs}px Inter, sans-serif`;
    const ctaW = Math.min(ctx.measureText("Follow for More! 🔔").width + 40, textW);
    drawRoundRect(ctx, textX - 4, H*0.68, ctaW, ctaFs*2.2, 14);
    ctx.fillStyle = topic.colors.accent;
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.fillText("Follow for More! 🔔", textX + 16, H*0.68 + ctaFs*1.6);
  }

  ctx.restore();

  // Particles
  particles.draw(ctx);

  // Emit ambient particles
  if (scene.particles && Math.random() < 0.08) {
    particles.emit(
      Math.random() * W * 0.65,
      Math.random() * H * 0.3 + H * 0.05,
      scene.particles, 1
    );
  }

  // Progress bar
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(0, H-5, W, 5);
  ctx.fillStyle = topic.colors.accent;
  ctx.fillRect(0, H-5, W * totalP, 5);

  // Top branding bar
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(0, 0, W, H*0.07);
  ctx.font = `700 ${Math.round(W*0.038)}px Inter, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText(`${topic.emoji} ${topic.title.toUpperCase()} · Class 10 Hub`, W/2, H*0.05);
}

/* ─── MAIN COMPONENT ─── */
export default function AiVideo() {
  useSEO(SEO_DATA.aiVideo);
  const [selectedTopic, setSelectedTopic] = useState<TopicData | null>(null);
  const [lang, setLang] = useState<Lang>("hinglish");
  const [voiceOn, setVoiceOn] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const playingRef = useRef(false);
  const particlesRef = useRef(new ParticleSystem());
  const voiceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastFrameRef = useRef<number>(0);

  playingRef.current = playing;

  const getTotalDur = (t: TopicData) => t.scenes.reduce((s, sc) => s + sc.duration, 0);

  const clearVoice = () => {
    voiceTimers.current.forEach(t => clearTimeout(t));
    voiceTimers.current = [];
    window.speechSynthesis?.cancel();
  };

  const scheduleVoice = useCallback((topic: TopicData) => {
    if (!voiceOn) return;
    clearVoice();
    let cum = 0;
    topic.scenes.forEach((sc, i) => {
      const timer = setTimeout(() => {
        if (!playingRef.current) return;
        window.speechSynthesis?.cancel();
        const utt = new SpeechSynthesisUtterance(topic.narration[lang][i] ?? "");
        utt.lang = lang === "hindi" ? "hi-IN" : lang === "english" ? "en-US" : "en-IN";
        utt.rate = 1.05;
        window.speechSynthesis?.speak(utt);
      }, cum * 1000);
      voiceTimers.current.push(timer);
      cum += sc.duration;
    });
  }, [voiceOn, lang]);

  const stopAll = useCallback(() => {
    setPlaying(false);
    clearVoice();
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const generateAndPlay = useCallback(async (topic: TopicData) => {
    setGenerating(true);
    stopAll();
    particlesRef.current = new ParticleSystem();
    setCurrentScene(0);
    await new Promise(r => setTimeout(r, 500));
    setGenerating(false);
    setGenerated(true);
    setSelectedTopic(topic);
    setPlaying(true);
    startRef.current = performance.now();
    lastFrameRef.current = performance.now();
    if (voiceOn) scheduleVoice(topic);
  }, [voiceOn, scheduleVoice, stopAll]);

  useEffect(() => {
    if (!playing || !selectedTopic) return;
    const topic = selectedTopic;
    const totalDur = getTotalDur(topic);

    const loop = (ts: number) => {
      const dt = (ts - lastFrameRef.current) / 1000;
      lastFrameRef.current = ts;
      particlesRef.current.update(dt);

      const elapsed = (ts - startRef.current) / 1000;
      if (elapsed >= totalDur) {
        setPlaying(false);
        clearVoice();
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) { animRef.current = requestAnimationFrame(loop); return; }

      let acc = 0, scIdx = 0, scProgress = 0;
      for (let i = 0; i < topic.scenes.length; i++) {
        const dur = topic.scenes[i].duration;
        if (elapsed < acc + dur) { scIdx = i; scProgress = (elapsed - acc) / dur; break; }
        acc += dur;
      }
      setCurrentScene(scIdx);

      drawScene(ctx, canvas.width, canvas.height, topic.scenes[scIdx], topic, scProgress, elapsed / totalDur, elapsed, particlesRef.current);
      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [playing, selectedTopic]);

  const handleReplay = () => {
    if (!selectedTopic) return;
    stopAll();
    particlesRef.current = new ParticleSystem();
    setTimeout(() => {
      setPlaying(true);
      startRef.current = performance.now();
      lastFrameRef.current = performance.now();
      if (voiceOn) scheduleVoice(selectedTopic);
    }, 100);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `class10hub-${selectedTopic?.id || "reel"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 360, damping: 22, delay: 0.06 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 mb-4 font-medium text-sm">
            <motion.div animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
              <Film size={16} />
            </motion.div>
            AI Video Reel Generator
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-3">
            Viral Study Reels{" "}
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">Banao!</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Full motion animated · Cartoon characters · Text effects · Voice in Hindi/English/Hinglish · Download karo!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">

          {/* Controls */}
          <div className="lg:col-span-2 space-y-5">

            {/* Topic Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-3xl p-5">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Topic Choose Karo</p>
              <div className="grid grid-cols-1 gap-2">
                {TOPICS.map((topic, i) => (
                  <motion.button key={topic.id}
                    initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.97 }}
                    onClick={() => generateAndPlay(topic)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left text-sm font-semibold border-2 transition-all ${
                      selectedTopic?.id === topic.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/40 bg-secondary/50"
                    }`}>
                    <span className="text-xl">{topic.emoji}</span>
                    <span>{topic.title}</span>
                    {generating && selectedTopic?.id === topic.id && (
                      <Loader2 size={14} className="ml-auto animate-spin text-primary" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Settings */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-3xl p-5 space-y-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Settings</p>

              {/* Language */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Voice Language</p>
                <div className="flex gap-2">
                  {(["hinglish", "hindi", "english"] as Lang[]).map(l => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        lang === l ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}>
                      {l === "hinglish" ? "Hinglish" : l === "hindi" ? "Hindi" : "English"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Voice Narration</p>
                  <p className="text-xs text-muted-foreground">Browser TTS se</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setVoiceOn(v => !v)}
                  className={`w-12 h-6 rounded-full transition-all ${voiceOn ? "bg-primary" : "bg-secondary"}`}>
                  <motion.div animate={{ x: voiceOn ? 24 : 2 }} transition={{ type: "spring", stiffness: 400 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md" />
                </motion.button>
              </div>

              {/* Scene indicator */}
              {selectedTopic && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Scene Progress</p>
                  <div className="flex gap-1.5">
                    {selectedTopic.scenes.map((_, i) => (
                      <motion.div key={i}
                        animate={{ scale: i === currentScene && playing ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5, repeat: playing && i === currentScene ? Infinity : 0 }}
                        className={`flex-1 h-1.5 rounded-full transition-all ${
                          i < currentScene ? "bg-primary" : i === currentScene ? "bg-primary/70" : "bg-secondary"
                        }`} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Canvas Preview */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3">
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative bg-black" style={{ aspectRatio: "9/16", maxHeight: "70vh" }}>
                <canvas
                  ref={canvasRef}
                  width={360} height={640}
                  className="w-full h-full object-contain"
                  style={{ display: generated ? "block" : "none" }}
                />

                {/* Empty state */}
                {!generated && !generating && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                    <motion.div
                      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-6xl">🎬</motion.div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg mb-2">Koi topic choose karo!</p>
                      <p className="text-gray-400 text-sm">AI cartoon animation bana dega turant</p>
                    </div>
                    {/* Preview characters */}
                    <div className="flex gap-4 text-3xl">
                      {["🧑‍🎓", "📚", "✨", "🏆"].map((e, i) => (
                        <motion.span key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}>
                          {e}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Generating overlay */}
                {generating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-5xl">🎬</motion.div>
                    <div className="text-center">
                      <p className="text-white font-bold mb-1">Reel Generate Ho Raha Hai...</p>
                      <p className="text-gray-400 text-sm">Animations load ho rahi hain</p>
                    </div>
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <motion.div key={i}
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-pink-500 rounded-full" />
                      ))}
                    </div>
                  </div>
                )}

                {/* Play button overlay when paused */}
                {!playing && generated && !generating && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <motion.button
                      whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255,255,255,0.3)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleReplay}
                      className="w-16 h-16 rounded-full bg-white/20 backdrop-blur border border-white/40 flex items-center justify-center">
                      <Play size={28} className="text-white ml-1" />
                    </motion.button>
                  </motion.div>
                )}
              </div>

              {/* Controls bar */}
              <div className="p-4 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex gap-2">
                  {generated && (
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                      onClick={playing ? stopAll : handleReplay}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm">
                      {playing ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
                    </motion.button>
                  )}
                  {generated && (
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                      onClick={handleReplay}
                      className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl text-sm">
                      <RotateCcw size={14} /> Replay
                    </motion.button>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    onClick={() => setVoiceOn(v => !v)}
                    className="p-2 rounded-xl bg-secondary">
                    {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </motion.button>
                  {generated && (
                    <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-4 py-2 bg-secondary rounded-xl text-sm font-semibold">
                      <Download size={14} /> Save Frame
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {["🎨 Cartoon Characters", "✨ Particle Effects", "📱 9:16 Reel Format", "🔊 AI Voice", "⚡ Instant"].map(t => (
                <span key={t} className="px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
