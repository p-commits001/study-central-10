import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, Clock, BookOpen, Share2 } from "lucide-react";

const SITE_LINK = "https://study-central--bkon02980.replit.app";

const questions = [
  {
    id: 1,
    subject: "Science",
    question: "Which mirror is used by dentists to see a larger image of teeth?",
    options: ["Convex mirror", "Plane mirror", "Concave mirror", "Cylindrical mirror"],
    answer: 2,
    explanation: "Dentists use a Concave mirror. It forms a magnified, erect, virtual image when the object is placed between the focus and the pole — perfect for viewing teeth clearly.",
  },
  {
    id: 2,
    subject: "Maths",
    question: "If one zero of the polynomial 3x² + 8x + k is the reciprocal of the other, what is k?",
    options: ["3", "8", "1/3", "-3"],
    answer: 0,
    explanation: "If one zero is α and other is 1/α, then product of zeroes = α × (1/α) = 1. Product of zeroes = k/3 = 1, so k = 3.",
  },
  {
    id: 3,
    subject: "Science",
    question: "Which non-metal conducts electricity at room temperature?",
    options: ["Sulphur", "Phosphorus", "Graphite", "Iodine"],
    answer: 2,
    explanation: "Graphite (a form of Carbon) is the only non-metal that conducts electricity. It has free electrons in its layered structure. This is a very common board exam trap!",
  },
  {
    id: 4,
    subject: "Maths",
    question: "In an AP, if the first term is 5 and the common difference is -3, what is the 12th term?",
    options: ["-28", "-33", "38", "-30"],
    answer: 0,
    explanation: "a₁₂ = a + (n-1)d = 5 + (12-1)×(-3) = 5 + 11×(-3) = 5 - 33 = -28. Remember: aₙ = a + (n-1)d.",
  },
  {
    id: 5,
    subject: "Science",
    question: "Which part of the human brain controls posture and balance of the body?",
    options: ["Cerebrum", "Medulla", "Cerebellum", "Hypothalamus"],
    answer: 2,
    explanation: "The Cerebellum controls balance, posture and coordination of movements. The Cerebrum controls thinking, the Medulla controls involuntary actions. Classic board exam question!",
  },
];

type Phase = "intro" | "quiz" | "result";

export default function Quiz() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

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

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
      setTimeLeft(30);
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowExplanation(false);
    setTimeLeft(30);
  };

  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const isTopper = score === questions.length;

  const handleWhatsAppShare = () => {
    const msg = isTopper
      ? `🏆 Maine Class 10 Hub par Science & Maths Quiz mein *${score}/5* score kiya aur *"Class 10 Topper"* badge jeeta! 🎉\n\nKya tu mujhe hara sakta hai? 😏\n\nTry kar: ${SITE_LINK}/quiz`
      : `Bhai, maine Class 10 Hub par Science & Maths Quiz mein *${score}/5* score kiya!\n\nKya tu mujhse zyada score kar sakta hai? 🤔\n\nTry kar: ${SITE_LINK}/quiz`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const q = questions[current];

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-2xl">
      <div className="py-6 md:py-10">

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <Sparkles size={14} /> Daily Challenge
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Daily Quiz</h1>
          <p className="text-muted-foreground">5 tricky board exam questions · Science & Maths · Get all right for the Topper badge!</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Intro */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card border border-border rounded-3xl p-8 text-center shadow-xl">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-display font-bold mb-3">Ready to Test Yourself?</h2>
              <p className="text-muted-foreground mb-2">These are <strong>real board exam questions</strong> — the kind that confuse most students!</p>
              <p className="text-muted-foreground mb-6">Score <strong className="text-yellow-500">5/5</strong> to earn the <strong className="text-yellow-500">🏆 Class 10 Topper</strong> badge and share it on WhatsApp!</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[["5", "Questions"], ["30s", "Per Question"], ["🏆", "Topper Badge"]].map(([val, label]) => (
                  <div key={label} className="bg-secondary rounded-2xl p-4">
                    <div className="text-2xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => { setPhase("quiz"); setTimeLeft(30); }} className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Start Quiz →
              </button>
            </motion.div>
          )}

          {/* Quiz */}
          {phase === "quiz" && (
            <motion.div key={`question-${current}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all ${i < current ? "bg-primary w-6" : i === current ? "bg-primary/60 w-6" : "bg-secondary w-4"}`} />
                  ))}
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${timeLeft <= 10 ? "bg-red-100 text-red-600 dark:bg-red-900/30 animate-pulse" : "bg-secondary text-foreground"}`}>
                  <Clock size={14} /> {timeLeft}s
                </div>
              </div>

              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${q.subject === "Maths" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                <BookOpen size={12} /> {q.subject} · Q{current + 1} of {questions.length}
              </div>

              <h2 className="text-xl font-display font-bold mb-6 leading-snug">{q.question}</h2>

              <div className="space-y-3 mb-6">
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
                    <button key={idx} onClick={() => handleSelect(idx)} disabled={selected !== null} className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-medium transition-all ${style}`}>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-background/50 border flex items-center justify-center text-sm font-bold">{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle2 size={18} className="ml-auto text-green-500 shrink-0" />}
                      {isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-sm">
                    <strong className="text-primary">💡 Explanation:</strong> {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <button onClick={handleNext} className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity">
                  {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
                </button>
              )}
            </motion.div>
          )}

          {/* Result */}
          {phase === "result" && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-3xl p-8 text-center shadow-xl">

              {isTopper ? (
                <>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }} className="text-7xl mb-3">🏆</motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg mb-3 shadow-lg shadow-yellow-400/30">
                    <Trophy size={20} /> Class 10 Topper!
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold mb-2">Perfect Score! 🎉</h2>
                  <p className="text-muted-foreground mb-1">Waah! Saare 5 sahi! Board exams mein rank 1 pakki hai!</p>
                  <p className="text-sm text-muted-foreground mb-6">Share your result on WhatsApp and challenge your friends! 👇</p>
                </>
              ) : (
                <>
                  <div className="text-7xl mb-4">{score >= 3 ? "😊" : "📖"}</div>
                  <h2 className="text-2xl font-display font-bold mb-2">Score: {score}/5</h2>
                  <p className="text-muted-foreground mb-2">
                    {score >= 4 ? "Almost perfect! Ek aur baar try karo!" : score >= 3 ? "Achha kiya! Daily practice se topper bante hain!" : "Koi baat nahi — NCERT padho aur dobara try karo!"}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">Apne dosto ko challenge karo — kya wo tujhse zyada score kar sakte hain? 😏</p>
                </>
              )}

              {/* Score breakdown */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((q, i) => (
                  <div key={i} className={`rounded-xl py-3 flex flex-col items-center gap-1 text-xs font-semibold ${answers[i] === q.answer ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {answers[i] === q.answer ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    Q{i + 1}
                  </div>
                ))}
              </div>

              {/* WhatsApp Share Button */}
              <motion.button
                onClick={handleWhatsAppShare}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#25D366] text-white font-bold text-lg mb-3 shadow-lg shadow-green-500/30 hover:opacity-90 transition-opacity"
              >
                <Share2 size={20} />
                Share on WhatsApp & Challenge Friends!
              </motion.button>

              <div className="flex gap-3">
                <button onClick={handleRestart} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-border font-bold hover:bg-secondary transition-colors">
                  <RotateCcw size={18} /> Try Again
                </button>
                <a href="/notes" className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity">
                  <BookOpen size={18} /> Study Notes
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
