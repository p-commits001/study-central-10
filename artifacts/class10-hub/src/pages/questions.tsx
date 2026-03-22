import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS, QUESTIONS } from "@/lib/mock-data";
import { useProgress } from "@/hooks/use-progress";
import { CheckCircle2, Circle, Target, Trophy, Filter } from "lucide-react";

export default function Questions() {
  const { toggleQuestion, isCompleted, getSubjectProgress, isLoaded } = useProgress();
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0].id);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const subjectData = SUBJECTS.find(s => s.id === activeSubject);
  const chapters = CHAPTERS[activeSubject] || [];

  // Get all question IDs for the active subject to calculate progress
  const allSubjectQuestionIds = useMemo(() => {
    return chapters.flatMap(c => (QUESTIONS[c.id] || []).map(q => q.id));
  }, [chapters]);

  const subjectProgress = getSubjectProgress(allSubjectQuestionIds);

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">
        
        {/* Header & Overall Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
              <Target size={16} /> Exam Prep
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-2">Important Questions</h1>
            <p className="text-muted-foreground">Most repeated board questions with progress tracking.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border shadow-md rounded-2xl p-4 flex items-center gap-4 min-w-[200px]"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Subject Progress</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">{isLoaded ? subjectProgress : 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full mt-1 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${subjectProgress}%` }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subject Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.id)}
              className={`
                whitespace-nowrap px-5 py-2.5 rounded-full font-semibold transition-all text-sm
                ${activeSubject === subject.id 
                  ? `bg-gradient-to-r ${subject.color} text-white shadow-md` 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'}
              `}
            >
              {subject.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 bg-card border border-border p-1.5 rounded-xl w-fit">
          <Filter size={16} className="text-muted-foreground ml-2 mr-1" />
          {(['all', 'pending', 'done'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === f ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {chapters.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-secondary/30 rounded-3xl border border-dashed border-border">
                  No chapters found for this subject.
                </div>
              ) : (
                chapters.map((chapter) => {
                  const questions = QUESTIONS[chapter.id] || [];
                  
                  // Apply filter
                  const filteredQuestions = questions.filter(q => {
                    if (filter === 'all') return true;
                    if (filter === 'done') return isCompleted(q.id);
                    return !isCompleted(q.id);
                  });

                  if (filteredQuestions.length === 0) return null;

                  return (
                    <div key={chapter.id} className="mb-10">
                      <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                        <div className="w-2 h-6 rounded-full bg-primary"></div>
                        {chapter.title}
                        <span className="text-sm font-normal text-muted-foreground ml-2 px-2 py-0.5 bg-secondary rounded-full">
                          {filteredQuestions.length} Q's
                        </span>
                      </h2>
                      
                      <div className="space-y-3">
                        {filteredQuestions.map((q, idx) => {
                          const done = isCompleted(q.id);
                          return (
                            <motion.div 
                              key={q.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`
                                group p-4 md:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer
                                ${done 
                                  ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200 dark:border-green-900/50' 
                                  : 'bg-card border-border hover:border-primary/40 hover:shadow-md'}
                              `}
                              onClick={() => toggleQuestion(q.id)}
                            >
                              <div className="mt-1 flex-shrink-0 transition-transform group-active:scale-90">
                                {done 
                                  ? <CheckCircle2 size={24} className="text-green-500" /> 
                                  : <Circle size={24} className="text-muted-foreground group-hover:text-primary/50" />}
                              </div>
                              
                              <div className="flex-1">
                                <p className={`text-base md:text-lg font-medium leading-snug transition-colors ${done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                                  {q.text}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                  <span className="px-2.5 py-1 rounded-md bg-secondary text-xs font-bold text-secondary-foreground">
                                    {q.marks} Marks
                                  </span>
                                  {q.year && (
                                    <span className="px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold border border-orange-200 dark:border-orange-800">
                                      CBSE {q.year}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
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
