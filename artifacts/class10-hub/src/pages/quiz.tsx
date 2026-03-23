import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, CheckCircle2, XCircle, RotateCcw, Sparkles, Clock, BookOpen } from "lucide-react";

const questions = [
  {
    id: 1,
    subject: "Science",
    question: "Which of the following is NOT a base?",
    options: ["NaOH", "KOH", "HCl", "Ca(OH)₂"],
    answer: 2,
    explanation: "HCl (Hydrochloric acid) is an acid, not a base. NaOH, KOH, and Ca(OH)₂ are all bases.",
  },
  {
    id: 2,
    subject: "Maths",
    question: "What is the HCF of 36 and 84?",
    options: ["6", "12", "18", "4"],
    answer: 1,
    explanation: "36 = 2² × 3², 84 = 2² × 3 × 7. HCF = 2² × 3 = 12.",
  },
  {
    id: 3,
    subject: "Science",
    question: "The process by which green plants make their food is called:",
    options: ["Respiration", "Transpiration", "Photosynthesis", "Digestion"],
    answer: 2,
    explanation: "Photosynthesis is the process by which green plants use sunlight, water, and CO₂ to make glucose and oxygen.",
  },
  {
    id: 4,
    subject: "Maths",
    question: "If the discriminant (b² - 4ac) of a quadratic equation is zero, the roots are:",
    options: ["Real and distinct", "Real and equal", "Imaginary", "Irrational"],
    answer: 1,
    explanation: "When D = 0, the quadratic equation has two equal (repeated) real roots: x = -b/2a.",
  },
  {
    id: 5,
    subject: "Science",
    question: "Which mirror is used as a rear-view mirror in vehicles?",
    options: ["Concave mirror", "Plane mirror", "Convex mirror", "Cylindrical mirror"],
    answer: 2,
    explanation: "Convex mirrors are used as rear-view mirrors because they give a wider field of view and always form an erect, diminished image.",
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
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
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

  const q = questions[current];

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-2xl">
      <div className="py-6 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <Sparkles size={14} /> Daily Challenge
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">Daily Quiz</h1>
          <p className="text-muted-foreground">5 questions · Science & Maths · Get all right for the Topper badge!</p>
        </motion.div>

        <AnimatePresence mode="wait">

          {/* Intro Screen */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl p-8 text-center shadow-xl"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-display font-bold mb-3">Ready to Test Yourself?</h2>
              <p className="text-muted-foreground mb-6">Answer 5 questions on Science & Maths. You have 30 seconds per question. Score 5/5 to earn the <strong className="text-yellow-500">Class 10 Topper</strong> badge!</p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[["5", "Questions"], ["30s", "Per Question"], ["🏆", "Topper Badge"]].map(([val, label]) => (
                  <div key={label} className="bg-secondary rounded-2xl p-4">
                    <div className="text-2xl font-bold text-primary">{val}</div>
                    <div className="text-xs text-muted-foreground mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setPhase("quiz"); setTimeLeft(30); }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                Start Quiz →
              </button>
            </motion.div>
          )}

          {/* Quiz Screen */}
          {phase === "quiz" && (
            <motion.div
              key={`question-${current}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl"
            >
              {/* Progress + Timer */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all ${i < current ? "bg-primary w-6" : i === current ? "bg-primary/60 w-6" : "bg-secondary w-4"}`} />
                  ))}
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full ${timeLeft <= 10 ? "bg-red-100 text-red-600 dark:bg-red-900/30" : "bg-secondary text-foreground"}`}>
                  <Clock size={14} /> {timeLeft}s
                </div>
              </div>

              {/* Subject tag */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${q.subject === "Maths" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}>
                <BookOpen size={12} /> {q.subject} · Q{current + 1} of {questions.length}
              </div>

              <h2 className="text-xl font-display font-bold mb-6 leading-snug">{q.question}</h2>

              <div className="space-y-3 mb-6">
                {q.options.map((opt, idx) => {
                  const isCorrect = idx === q.answer;
                  const isSelected = idx === selected;
                  let style = "bg-secondary border-border text-foreground hover:border-primary/50";
                  if (selected !== null) {
                    if (isCorrect) style = "bg-green-50 border-green-400 text-green-800 dark:bg-green-900/20 dark:text-green-400";
                    else if (isSelected && !isCorrect) style = "bg-red-50 border-red-400 text-red-800 dark:bg-red-900/20 dark:text-red-400";
                    else style = "bg-secondary border-border text-muted-foreground opacity-60";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left font-medium transition-all ${style}`}
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-background/50 border flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle2 size={18} className="ml-auto text-green-500 shrink-0" />}
                      {isSelected && !isCorrect && <XCircle size={18} className="ml-auto text-red-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-sm text-foreground"
                  >
                    <strong className="text-primary">Explanation:</strong> {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                >
                  {current + 1 >= questions.length ? "See Results →" : "Next Question →"}
                </button>
              )}
            </motion.div>
          )}

          {/* Result Screen */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-3xl p-8 text-center shadow-xl"
            >
              {isTopper ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="text-7xl mb-4"
                  >
                    🏆
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg mb-4 shadow-lg shadow-yellow-400/30"
                  >
                    <Trophy size={20} /> Class 10 Topper!
                  </motion.div>
                  <h2 className="text-2xl font-display font-bold mb-2">Perfect Score! 🎉</h2>
                  <p className="text-muted-foreground mb-6">You answered all 5 questions correctly. You're on your way to a rank 1 in boards!</p>
                </>
              ) : (
                <>
                  <div className="text-7xl mb-4">{score >= 3 ? "😊" : "📖"}</div>
                  <h2 className="text-2xl font-display font-bold mb-2">You scored {score}/5</h2>
                  <p className="text-muted-foreground mb-6">
                    {score >= 4 ? "Almost there! One more revision and you'll ace it!" : score >= 3 ? "Good effort! Keep practising daily." : "Don't worry — revise the topics and try again!"}
                  </p>
                </>
              )}

              {/* Score breakdown */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {questions.map((q, i) => (
                  <div key={i} className={`rounded-xl py-3 flex flex-col items-center gap-1 text-xs font-semibold ${answers[i] === q.answer ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                    {answers[i] === q.answer ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    Q{i + 1}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-border font-bold hover:bg-secondary transition-colors"
                >
                  <RotateCcw size={18} /> Try Again
                </button>
                <a
                  href="/notes"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                >
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
