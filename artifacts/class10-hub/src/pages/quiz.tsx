import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, Clock, BookOpen, Share2, FlaskConical, Calculator, Languages } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

const SITE_LINK = "https://study-central-10.pages.dev";

type Category = "maths" | "science" | "english";

interface Question {
  id: number; subject: string; question: string;
  options: string[]; answer: number; explanation: string;
}

const QUESTION_BANK: Record<Category, Question[]> = {
  maths: [
    { id: 1, subject: "Maths", question: "If one zero of the polynomial 3x² + 8x + k is the reciprocal of the other, what is k?", options: ["3", "8", "1/3", "-3"], answer: 0, explanation: "Product of zeroes = k/3. If zeroes are α and 1/α, product = 1. So k/3 = 1 → k = 3." },
    { id: 2, subject: "Maths", question: "In an AP, if a = 5 and d = -3, what is the 12th term?", options: ["-28", "-33", "38", "-30"], answer: 0, explanation: "a₁₂ = a + (12-1)d = 5 + 11×(-3) = 5 - 33 = -28. Formula: aₙ = a + (n-1)d" },
    { id: 3, subject: "Maths", question: "The sum of first 20 terms of an AP with a = 3 and d = 2 is:", options: ["440", "420", "460", "480"], answer: 0, explanation: "S₂₀ = 20/2 × [2×3 + (20-1)×2] = 10 × [6 + 38] = 10 × 44 = 440" },
    { id: 4, subject: "Maths", question: "If HCF(26, 169) = 13, then LCM(26, 169) is:", options: ["338", "169", "52", "2197"], answer: 0, explanation: "HCF × LCM = a × b → 13 × LCM = 26 × 169 → LCM = 4394/13 = 338" },
    { id: 5, subject: "Maths", question: "The distance between points (2, 3) and (-2, 0) is:", options: ["5", "4", "3", "√7"], answer: 0, explanation: "d = √[(2-(-2))² + (3-0)²] = √[16+9] = √25 = 5" },
    { id: 6, subject: "Maths", question: "If tan θ = 4/3, then sin θ is:", options: ["4/5", "3/5", "4/3", "5/4"], answer: 0, explanation: "hypotenuse = √(4²+3²) = 5. sin θ = opposite/hypotenuse = 4/5" },
    { id: 7, subject: "Maths", question: "The zeroes of the polynomial x² - 3x - 4 are:", options: ["4, -1", "-4, 1", "4, 1", "-4, -1"], answer: 0, explanation: "x² - 3x - 4 = (x-4)(x+1) = 0. So x = 4 or x = -1" },
    { id: 8, subject: "Maths", question: "A ladder 10m long reaches 8m up a wall. Distance of its foot from wall is:", options: ["6m", "4m", "8m", "10m"], answer: 0, explanation: "By Pythagoras: d² = 10² - 8² = 100 - 64 = 36. d = 6m" },
    { id: 9, subject: "Maths", question: "How many tangents can be drawn from a point outside a circle?", options: ["2", "1", "3", "Infinite"], answer: 0, explanation: "From any external point, exactly 2 tangents can be drawn to a circle. Both tangents from same point are equal in length." },
    { id: 10, subject: "Maths", question: "If P(E) = 0.3, then P(not E) is:", options: ["0.7", "0.3", "1", "0"], answer: 0, explanation: "P(E) + P(not E) = 1. So P(not E) = 1 - 0.3 = 0.7. This is the complementary event rule." },
  ],
  science: [
    { id: 11, subject: "Science", question: "Which mirror is used by dentists to see a larger image of teeth?", options: ["Concave mirror", "Convex mirror", "Plane mirror", "Cylindrical mirror"], answer: 0, explanation: "Concave mirror forms a magnified, erect, virtual image when object is between focus and pole — perfect for examining teeth!" },
    { id: 12, subject: "Science", question: "Which non-metal conducts electricity at room temperature?", options: ["Graphite", "Sulphur", "Phosphorus", "Iodine"], answer: 0, explanation: "Graphite (a form of Carbon) is the only non-metal that conducts electricity due to free electrons in its layered structure." },
    { id: 13, subject: "Science", question: "Which part of the brain controls posture and balance?", options: ["Cerebellum", "Cerebrum", "Medulla", "Hypothalamus"], answer: 0, explanation: "Cerebellum controls balance and coordination. Cerebrum — thinking; Medulla — involuntary actions. Classic board trap!" },
    { id: 14, subject: "Science", question: "The pH of human blood is approximately:", options: ["7.4", "7.0", "6.8", "8.0"], answer: 0, explanation: "Blood pH is maintained at 7.35–7.45 (slightly alkaline). Values outside this range can be life-threatening." },
    { id: 15, subject: "Science", question: "In Ohm's Law, if V = 12V and R = 4Ω, then I = ?", options: ["3A", "4A", "48A", "0.33A"], answer: 0, explanation: "I = V/R = 12/4 = 3 Amperes. Remember: V = IR is Ohm's Law." },
    { id: 16, subject: "Science", question: "Which hormone controls the blood sugar level?", options: ["Insulin", "Adrenaline", "Thyroxine", "Testosterone"], answer: 0, explanation: "Insulin (from pancreas) lowers blood glucose. Adrenaline is the 'fight or flight' hormone. Classic NCERT question!" },
    { id: 17, subject: "Science", question: "The chemical formula for baking soda is:", options: ["NaHCO₃", "Na₂CO₃", "NaCl", "NaOH"], answer: 0, explanation: "Baking soda = Sodium Hydrogen Carbonate = NaHCO₃. Washing soda = Na₂CO₃. Don't confuse them!" },
    { id: 18, subject: "Science", question: "Which type of lens is used to correct Myopia (short-sightedness)?", options: ["Concave lens", "Convex lens", "Bifocal lens", "Cylindrical lens"], answer: 0, explanation: "Myopia (near-sightedness) — image forms in front of retina. Concave (diverging) lens corrects it by diverging rays." },
    { id: 19, subject: "Science", question: "The powerhouse of the cell is:", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi body"], answer: 0, explanation: "Mitochondria produce ATP (energy) through cellular respiration. Hence called the 'powerhouse of the cell'." },
    { id: 20, subject: "Science", question: "Fleming's Right Hand Rule is used for:", options: ["Electric generators", "Electric motors", "Solenoids", "Transformers"], answer: 0, explanation: "Fleming's Right Hand Rule → Generators (mechanical to electrical). Left Hand Rule → Motors (electrical to mechanical)." },
  ],
  english: [
    { id: 21, subject: "English", question: "In 'A Letter to God', why did Lencho write to God?", options: ["He needed money after hailstorm destroyed crops", "He was lonely", "His family was ill", "He wanted blessings"], answer: 0, explanation: "Lencho's crops were completely destroyed by hail. He had immense faith in God and wrote asking for 100 pesos." },
    { id: 22, subject: "English", question: "Who is the author of 'Two Gentlemen of Verona'?", options: ["A.J. Cronin", "Anton Chekhov", "Guy de Maupassant", "John Galsworthy"], answer: 0, explanation: "A.J. Cronin wrote 'Two Gentlemen of Verona' about two Italian boys, Nicola and Jacopo, helping their sister." },
    { id: 23, subject: "English", question: "In 'Nelson Mandela: Long Walk to Freedom', what does 'apartheid' mean?", options: ["Racial segregation policy in South Africa", "A type of freedom movement", "A political party", "A prison name"], answer: 0, explanation: "Apartheid was the official South African policy of racial segregation from 1948–1991 that Mandela fought against." },
    { id: 24, subject: "English", question: "The poet of 'Fire and Ice' is:", options: ["Robert Frost", "William Blake", "Walt Whitman", "John Keats"], answer: 0, explanation: "Robert Frost wrote 'Fire and Ice' (1920). Fire = desire, Ice = hatred. Both can destroy the world." },
    { id: 25, subject: "English", question: "In 'The Necklace', why did Matilda borrow a necklace?", options: ["To wear to a party", "To sell it", "To gift her husband", "To show off to neighbors"], answer: 0, explanation: "Matilda borrowed the necklace from Mme Forestier to wear at a grand ball hosted by her husband's minister." },
    { id: 26, subject: "English", question: "What is the figure of speech in 'The wind was a torrent of darkness'?", options: ["Metaphor", "Simile", "Personification", "Alliteration"], answer: 0, explanation: "It's a metaphor — directly comparing wind to a torrent (without using 'like' or 'as'). Simile would use 'like/as'." },
    { id: 27, subject: "English", question: "In 'Mijbil the Otter', who is the author?", options: ["Gavin Maxwell", "James Herriot", "Gerald Durrell", "David Attenborough"], answer: 0, explanation: "Gavin Maxwell wrote about his pet otter Mijbil in 'Ring of Bright Water'. The chapter is from this book." },
    { id: 28, subject: "English", question: "The passive voice of 'She sings a song' is:", options: ["A song is sung by her", "A song was sung by her", "A song has been sung by her", "A song will be sung by her"], answer: 0, explanation: "Simple Present: Subject + is/am/are + V3 + by + object. 'She sings' → 'is sung by her'." },
    { id: 29, subject: "English", question: "'The Gift of the Magi' is written by:", options: ["O. Henry", "Mark Twain", "H.G. Wells", "Jack London"], answer: 0, explanation: "O. Henry (pen name of William Sydney Porter) wrote this famous story about selfless love. Published in 1905." },
    { id: 30, subject: "English", question: "What is an 'adverb clause'?", options: ["A clause modifying a verb, adj, or adverb", "A clause acting as noun", "A clause modifying only nouns", "A clause with no verb"], answer: 0, explanation: "Adverb clause modifies a verb/adjective/adverb and answers When? Where? Why? How? e.g., 'when he arrived'." },
  ],
};

const CATEGORIES = [
  { id: "maths" as Category, label: "Maths", icon: Calculator, color: "from-blue-500 to-indigo-500", bg: "bg-blue-50 dark:bg-blue-950/30", textColor: "text-blue-700 dark:text-blue-400", emoji: "📐" },
  { id: "science" as Category, label: "Science", icon: FlaskConical, color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", textColor: "text-emerald-700 dark:text-emerald-400", emoji: "🔬" },
  { id: "english" as Category, label: "English", icon: Languages, color: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-950/30", textColor: "text-violet-700 dark:text-violet-400", emoji: "📚" },
];

type Phase = "intro" | "quiz" | "result";

export default function Quiz() {
  useSEO(SEO_DATA.quiz);
  const [phase, setPhase] = useState<Phase>("intro");
  const [category, setCategory] = useState<Category>("maths");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = QUESTION_BANK[category];
  const cat = CATEGORIES.find(c => c.id === category)!;

  useEffect(() => {
    if (phase !== "quiz" || showExplanation) return;
    if (timeLeft <= 0) { handleNext(); return; }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, showExplanation]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  }, [current, questions.length]);

  const handleRestart = () => {
    setPhase("intro");
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(10).fill(null));
    setShowExplanation(false);
    setTimeLeft(30);
  };

  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const isTopper = score === questions.length;

  const getResultEmoji = () => {
    if (isTopper) return "🏆";
    if (score >= 8) return "🌟";
    if (score >= 6) return "😊";
    if (score >= 4) return "📚";
    return "😅";
  };

  const getResultMessage = () => {
    if (isTopper) return "Perfect Score! 🎉";
    if (score >= 8) return "Excellent! Almost Perfect!";
    if (score >= 6) return "Great Job! Keep It Up!";
    if (score >= 4) return "Good Effort! Practice More!";
    return "Keep Practicing — You Got This!";
  };

  const handleWhatsAppShare = () => {
    const msgs = {
      maths: isTopper ? `🏆 Maine Class 10 Hub par *Maths Quiz* mein ${score}/10 PERFECT score kiya! 📐 Kya tu mujhe hara sakta hai? Try kar: ${SITE_LINK}/quiz` : `Maine Maths Quiz mein ${score}/10 kiya! 📐 Tu zyada kar sakta hai? ${SITE_LINK}/quiz`,
      science: isTopper ? `🔬 Maine Class 10 Hub par *Science Quiz* mein ${score}/10 PERFECT score kiya! 🏆 Try kar: ${SITE_LINK}/quiz` : `Science Quiz mein ${score}/10! 🔬 Compare kar apna score: ${SITE_LINK}/quiz`,
      english: isTopper ? `📚 Maine Class 10 Hub par *English Quiz* mein ${score}/10 PERFECT score kiya! 🏆 Try kar: ${SITE_LINK}/quiz` : `English Quiz mein ${score}/10! 📚 Tu zyada kar sakta hai? ${SITE_LINK}/quiz`,
    };
    window.open(`https://wa.me/?text=${encodeURIComponent(msgs[category])}`, "_blank");
  };

  const q = questions[current];

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-2xl">
      <div className="py-6 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-8">
          <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <Sparkles size={14} /> Board Exam Practice Quiz
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Daily Quiz</h1>
          <p className="text-muted-foreground">10 board-level questions · Maths, Science, English · Instant feedback!</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Intro - Category Selection */}
          {phase === "intro" && (
            <motion.div key="intro"
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-xl">

              <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-6xl text-center mb-4">🎯</motion.div>

              <h2 className="text-2xl font-display font-bold mb-2 text-center">Choose Your Subject!</h2>
              <p className="text-muted-foreground text-center mb-8">10 real board exam questions · 30 seconds each · Score 10/10 for the Topper badge!</p>

              {/* Category Cards */}
              <div className="grid grid-cols-1 gap-3 mb-8">
                {CATEGORIES.map((c, i) => (
                  <motion.button key={c.id}
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setCategory(c.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${
                      category === c.id
                        ? `border-primary bg-primary/5 shadow-md`
                        : "border-border hover:border-primary/40 bg-secondary/30"
                    }`}>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg`}>
                      <span className="text-2xl">{c.emoji}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-lg">{c.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {c.id === "maths" && "Polynomials · AP · Geometry · Probability"}
                        {c.id === "science" && "Physics · Chemistry · Biology · Reactions"}
                        {c.id === "english" && "Prose · Poetry · Grammar · Literature"}
                      </div>
                    </div>
                    {category === c.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary text-xl">✓</motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-3 gap-4 mb-8">
                {[["10", "Questions"], ["30s", "Per Question"], ["🏆", "Topper Badge"]].map(([val, label]) => (
                  <motion.div key={label} variants={scaleIn} whileHover={{ scale: 1.08, y: -3 }} className="bg-secondary rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setPhase("quiz"); setTimeLeft(30); setAnswers(Array(10).fill(null)); setCurrent(0); }}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${cat.color} text-white font-bold text-lg shadow-lg`}>
                Start {cat.emoji} {cat.label} Quiz →
              </motion.button>
            </motion.div>
          )}

          {/* Quiz */}
          {phase === "quiz" && (
            <motion.div key={`question-${current}`}
              initial={{ opacity: 0, x: 60, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl">

              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5 flex-1">
                  {questions.map((_, i) => (
                    <motion.div key={i}
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: i * 0.03 }}
                      className={`h-2 rounded-full flex-1 transition-all ${i < current ? "bg-primary" : i === current ? "bg-primary/50" : "bg-secondary"}`}
                    />
                  ))}
                </div>
                <motion.div
                  animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className={`ml-3 flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full whitespace-nowrap ${timeLeft <= 10 ? "bg-red-100 text-red-600 dark:bg-red-900/30 animate-pulse" : "bg-secondary text-foreground"}`}>
                  <Clock size={14} /> {timeLeft}s
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${cat.bg} ${cat.textColor}`}>
                {cat.emoji} {cat.label} · Q{current + 1} of {questions.length}
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-xl font-display font-bold mb-6 leading-snug">{q.question}</motion.h2>

              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3 mb-6">
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.answer;
                  const isSelected = idx === selected;
                  let style = "bg-secondary border-border text-foreground hover:border-primary/50 cursor-pointer";
                  if (selected !== null) {
                    if (isCorrect) style = "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-400";
                    else if (isSelected && !isCorrect) style = "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-400";
                    else style = "bg-secondary border-border text-muted-foreground opacity-50";
                  }
                  return (
                    <motion.button key={idx} variants={fadeUp}
                      whileHover={selected === null ? { x: 4, scale: 1.01 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)} disabled={selected !== null}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-medium transition-all ${style}`}>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-background/50 border flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      <AnimatePresence>
                        {selected !== null && isCorrect && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          </motion.div>
                        )}
                        {isSelected && !isCorrect && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                            <XCircle size={18} className="text-red-500 shrink-0" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </motion.div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-sm overflow-hidden">
                    <strong className="text-primary">💡 Explanation:</strong> {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(99,102,241,0.25)" }}
                  whileTap={{ scale: 0.97 }} onClick={handleNext}
                  className={`w-full py-3.5 rounded-2xl bg-gradient-to-r ${cat.color} text-white font-bold`}>
                  {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Result */}
          {phase === "result" && (
            <motion.div key="result"
              initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl text-center">

              <motion.div
                animate={isTopper ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] } : { y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-4">{getResultEmoji()}</motion.div>

              {isTopper && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-bold mb-4">
                  <Sparkles size={14} /> Class 10 Topper — {cat.label}!
                </motion.div>
              )}

              <h2 className="text-3xl font-display font-extrabold mb-2">{getResultMessage()}</h2>

              {/* Score Ring */}
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="relative mx-auto w-32 h-32 my-6">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="12" className="text-secondary" />
                  <motion.circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="12" className="text-primary"
                    strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 50}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - score / questions.length) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-primary">{score}/{questions.length}</span>
                </div>
              </motion.div>

              {/* Answer breakdown */}
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-10 gap-1.5 mb-6">
                {questions.map((q, i) => (
                  <motion.div key={i} variants={scaleIn}
                    className={`h-3 rounded-full ${answers[i] === q.answer ? "bg-green-500" : "bg-red-400"}`}
                    title={`Q${i+1}: ${answers[i] === q.answer ? "Correct" : "Wrong"}`}
                  />
                ))}
              </motion.div>

              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-xs text-muted-foreground">Correct ✓</div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
                  <div className="text-xs text-muted-foreground">Wrong ✗</div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-primary">{Math.round(score / questions.length * 100)}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button whileHover={{ scale: 1.03, boxShadow: "0 12px 28px rgba(34,197,94,0.3)" }} whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppShare}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                  <Share2 size={18} /> Share on WhatsApp
                </motion.button>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleRestart}
                    className="py-3 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2">
                    <RotateCcw size={16} /> Try Again
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setCategory(CATEGORIES.find(c => c.id !== category)?.id || "maths"); handleRestart(); }}
                    className="py-3 rounded-2xl bg-primary/10 text-primary font-semibold flex items-center justify-center gap-2">
                    <BookOpen size={16} /> Other Subject
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
