import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, Clock, BookOpen, Share2 } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn, popIn } from "@/lib/animations";

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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3"
          >
            <Sparkles size={14} /> Daily Challenge
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Daily Quiz</h1>
          <p className="text-muted-foreground">5 tricky board exam questions · Science & Maths · Get all right for the Topper badge!</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Intro */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card border border-border rounded-3xl p-8 text-center shadow-xl"
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎯
              </motion.div>
              <h2 className="text-2xl font-display font-bold mb-3">Ready to Test Yourself?</h2>
              <p className="text-muted-foreground mb-2">These are <strong>real board exam questions</strong> — the kind that confuse most students!</p>
              <p className="text-muted-foreground mb-8">Score <strong className="text-yellow-500">5/5</strong> to earn the <strong className="text-yellow-500">🏆 Class 10 Topper</strong> badge!</p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-3 gap-4 mb-8"
              >
                {[["5", "Questions"], ["30s", "Per Question"], ["🏆", "Topper Badge"]].map(([val, label]) => (
                  <motion.div
                    key={label}
                    variants={scaleIn}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="bg-secondary rounded-2xl p-4"
                  >
                    <div className="text-2xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setPhase("quiz"); setTimeLeft(30); }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-primary/25"
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  Start Quiz →
                </motion.span>
              </motion.button>
            </motion.div>
          )}

          {/* Quiz */}
          {phase === "quiz" && (
            <motion.div
              key={`question-${current}`}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`h-2 rounded-full transition-all ${i < current ? "bg-primary w-6" : i === current ? "bg-primary/60 w-6" : "bg-secondary w-4"}`}
                    />
                  ))}
                </div>
                <motion.div
                  animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${timeLeft <= 10 ? "bg-red-100 text-red-600 dark:bg-red-900/30 animate-pulse" : "bg-secondary text-foreground"}`}
                >
                  <Clock size={14} /> {timeLeft}s
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${q.subject === "Maths" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}
              >
                <BookOpen size={12} /> {q.subject} · Q{current + 1} of {questions.length}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-display font-bold mb-6 leading-snug"
              >
                {q.question}
              </motion.h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="space-y-3 mb-6"
              >
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
                    <motion.button
                      key={idx}
                      variants={fadeUp}
                      whileHover={selected === null ? { x: 4, scale: 1.01 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-medium transition-all ${style}`}
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-background/50 border flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      <AnimatePresence>
                        {selected !== null && isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                          </motion.div>
                        )}
                        {isSelected && !isCorrect && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
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
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-sm overflow-hidden"
                  >
                    <strong className="text-primary">💡 Explanation:</strong> {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(99,102,241,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold"
                >
                  {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Result */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="bg-card border border-border rounded-3xl p-8 shadow-2xl text-center"
            >
              <motion.div
                animate={isTopper
                  ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
                  : { y: [0, -8, 0] }
                }
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                {isTopper ? "🏆" : score >= 3 ? "😊" : "😅"}
              </motion.div>

              {isTopper && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-bold mb-4"
                >
                  <Sparkles size={14} /> Class 10 Topper!
                </motion.div>
              )}

              <h2 className="text-3xl font-display font-extrabold mb-2">
                {isTopper ? "Perfect Score! 🎉" : score >= 3 ? "Great Job!" : "Keep Practicing!"}
              </h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="text-6xl font-display font-black text-primary my-6"
              >
                {score}/{questions.length}
              </motion.div>

              {/* Answer breakdown */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-5 gap-2 mb-8"
              >
                {questions.map((q, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    className={`h-2.5 rounded-full ${answers[i] === q.answer ? "bg-green-500" : "bg-red-400"}`}
                  />
                ))}
              </motion.div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 12px 28px rgba(34,197,94,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleWhatsAppShare}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Share2 size={18} /> Share on WhatsApp
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleRestart}
                  className="w-full py-3.5 rounded-2xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
