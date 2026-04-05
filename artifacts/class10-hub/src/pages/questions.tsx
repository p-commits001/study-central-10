import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS, QUESTIONS } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, Circle, Target, Trophy, Filter } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, scaleIn, viewportOnce } from "@/lib/animations";

export default function Questions() {
  const { toggleQuestion, isCompleted, getSubjectProgress, isLoaded } = useProgress();
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0].id);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const subjectData = SUBJECTS.find(s => s.id === activeSubject);
  const chapters = CHAPTERS[activeSubject] || [];

  const allSubjectQuestionIds = useMemo(() => {
    return chapters.flatMap(c => (QUESTIONS[c.id] || []).map(q => q.id));
  }, [chapters]);

  const subjectProgress = getSubjectProgress(allSubjectQuestionIds);

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">

        {/* Header & Overall Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Target size={16} />
              </motion.div>
              Exam Prep
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-4xl md:text-5xl font-display font-extrabold mb-2"
            >
              Important Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-muted-foreground"
            >
              Most repeated board questions with progress tracking.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.15 }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}
            className="bg-card border border-border shadow-md rounded-2xl p-4 flex items-center gap-4 min-w-[200px]"
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <Trophy size={24} className="text-primary" />
            </motion.div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Subject Progress</p>
              <div className="flex items-end gap-2">
                <motion.span
                  key={subjectProgress}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl font-bold"
                >
                  {isLoaded ? subjectProgress : 0}%
                </motion.span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${isLoaded ? subjectProgress : 0}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subject Tabs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2"
        >
          {SUBJECTS.map((subject, i) => (
            <motion.button
              key={subject.id}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSubject(subject.id)}
              className={`
                relative whitespace-nowrap px-5 py-2.5 rounded-full font-semibold transition-colors text-sm overflow-hidden
                ${activeSubject === subject.id
                  ? `bg-gradient-to-r ${subject.color} text-white shadow-md`
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}
              `}
            >
              {activeSubject === subject.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{subject.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-8 bg-card border border-border p-1.5 rounded-xl w-fit"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            <Filter size={16} className="text-muted-foreground ml-2 mr-1" />
          </motion.div>
          {(['all', 'pending', 'done'] as const).map((f, i) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Questions List */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {chapters.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 text-muted-foreground bg-secondary/30 rounded-3xl border border-dashed border-border"
                >
                  No chapters found for this subject.
                </motion.div>
              ) : (
                chapters.map((chapter, chapterIdx) => {
                  const questions = QUESTIONS[chapter.id] || [];

                  const filteredQuestions = questions.filter(q => {
                    if (filter === 'all') return true;
                    if (filter === 'done') return isCompleted(q.id);
                    return !isCompleted(q.id);
                  });

                  if (filteredQuestions.length === 0) return null;

                  return (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: chapterIdx * 0.07, type: "spring", stiffness: 280, damping: 24 }}
                      className="mb-10"
                    >
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: chapterIdx * 0.07 + 0.1 }}
                        className="text-2xl font-display font-bold mb-4 flex items-center gap-3"
                      >
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: chapterIdx * 0.07 + 0.15, type: "spring" }}
                          className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-accent"
                        />
                        {chapter.title}
                        <motion.span
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: chapterIdx * 0.07 + 0.2, type: "spring" }}
                          className="text-sm font-normal text-muted-foreground ml-2 px-2 py-0.5 bg-secondary rounded-full"
                        >
                          {filteredQuestions.length} Q's
                        </motion.span>
                      </motion.h2>

                      <div className="space-y-3">
                        {filteredQuestions.map((q, idx) => {
                          const done = isCompleted(q.id);
                          return (
                            <motion.div
                              key={q.id}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05, type: "spring", stiffness: 300, damping: 26 }}
                              whileHover={{
                                x: 4,
                                scale: 1.01,
                                boxShadow: done
                                  ? "0 8px 20px rgba(34,197,94,0.1)"
                                  : "0 8px 20px rgba(99,102,241,0.08)"
                              }}
                              whileTap={{ scale: 0.99 }}
                              className={`
                                group p-4 md:p-5 rounded-2xl border transition-colors duration-300 flex items-start gap-4 cursor-pointer
                                ${done
                                  ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900/50'
                                  : 'bg-card border-border hover:border-primary/40'}
                              `}
                              onClick={() => toggleQuestion(q.id)}
                            >
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={done ? "done" : "pending"}
                                  initial={{ scale: 0, rotate: -30 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  exit={{ scale: 0, rotate: 30 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  className="mt-1 flex-shrink-0"
                                >
                                  {done
                                    ? <CheckCircle2 size={24} className="text-green-500" />
                                    : <Circle size={24} className="text-muted-foreground group-hover:text-primary/50 transition-colors" />}
                                </motion.div>
                              </AnimatePresence>

                              <div className="flex-1">
                                <p className={`text-base md:text-lg font-medium leading-snug transition-colors ${done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                  {q.text}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                  <motion.span
                                    whileHover={{ scale: 1.08 }}
                                    className="px-2.5 py-1 rounded-md bg-secondary text-xs font-bold text-secondary-foreground"
                                  >
                                    {q.marks} Marks
                                  </motion.span>
                                  {q.year && (
                                    <motion.span
                                      whileHover={{ scale: 1.08 }}
                                      className="px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-800"
                                    >
                                      CBSE {q.year}
                                    </motion.span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
