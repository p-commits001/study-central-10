import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS, QUESTIONS } from "@/lib/mock-data";
import { Search as SearchIcon, BookOpen, Brain, FileText, ChevronRight, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/lib/animations";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = () => {
    if (!query.trim()) return { chapters: [], questions: [] };

    const lowerQuery = query.toLowerCase();

    const foundChapters: any[] = [];
    for (const [subjectId, chapters] of Object.entries(CHAPTERS)) {
      const subject = SUBJECTS.find(s => s.id === subjectId);
      for (const ch of chapters) {
        if (ch.title.toLowerCase().includes(lowerQuery) || ch.description.toLowerCase().includes(lowerQuery)) {
          foundChapters.push({ ...ch, subject });
        }
      }
    }

    const foundQuestions: any[] = [];
    for (const [chapterId, questions] of Object.entries(QUESTIONS)) {
      let foundSubjectId = "";
      for (const [subId, chaps] of Object.entries(CHAPTERS)) {
        if (chaps.some(c => c.id === chapterId)) {
          foundSubjectId = subId;
          break;
        }
      }
      const subject = SUBJECTS.find(s => s.id === foundSubjectId);
      for (const q of questions) {
        if (q.text.toLowerCase().includes(lowerQuery)) {
          foundQuestions.push({ ...q, subject, chapterId });
        }
      }
    }

    return { chapters: foundChapters, questions: foundQuestions };
  };

  const { chapters, questions } = results();
  const hasResults = query.trim().length > 0 && (chapters.length > 0 || questions.length > 0);
  const noResults = query.trim().length > 0 && chapters.length === 0 && questions.length === 0;

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
          className="text-4xl mb-4"
        >
          🔍
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Global Search</h1>
        <p className="text-muted-foreground">Notes, chapters, and questions — all in one search.</p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="relative mb-12 max-w-2xl mx-auto"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <motion.div
            animate={{ scale: query ? 1.2 : 1 }}
            transition={{ type: "spring" }}
          >
            <SearchIcon className="h-6 w-6 text-primary" />
          </motion.div>
        </div>
        <motion.input
          whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
          type="text"
          placeholder="Search chapters, questions, subjects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-5 text-lg bg-card border-2 border-border rounded-2xl focus:border-primary outline-none transition-colors font-medium shadow-sm"
          autoFocus
        />
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors text-lg font-bold"
            >
              ×
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">

        {/* Empty State - No Query */}
        {!query.trim() && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📚
            </motion.div>
            <p className="text-muted-foreground text-lg">Start typing to search across all content</p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {["Real Numbers", "Acids & Bases", "Nationalism", "Photosynthesis"].map((hint) => (
                <motion.button
                  key={hint}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQuery(hint)}
                  className="px-4 py-2 bg-secondary rounded-xl text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {hint}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {noResults && (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-muted-foreground">Try a different keyword or browse the notes section.</p>
          </motion.div>
        )}

        {/* Results */}
        {hasResults && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Count */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-muted-foreground font-medium mb-6 flex items-center gap-2"
            >
              <Sparkles size={14} className="text-primary" />
              Found <strong>{chapters.length + questions.length}</strong> results for "{query}"
            </motion.p>

            {/* Chapters */}
            {chapters.length > 0 && (
              <div className="mb-10">
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xl font-display font-bold mb-4"
                >
                  <BookOpen size={20} className="text-primary" /> Chapters ({chapters.length})
                </motion.h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  {chapters.map((chapter: any) => (
                    <motion.div
                      key={chapter.id}
                      variants={fadeUp}
                      whileHover={{ x: 4, scale: 1.01 }}
                    >
                      <Link href={`/notes/${chapter.subject?.id}/${chapter.id}`}>
                        <div className="group flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${chapter.subject?.color || "from-primary to-accent"} flex items-center justify-center text-white shadow-sm`}>
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="font-semibold group-hover:text-primary transition-colors">{chapter.title}</p>
                              <p className="text-xs text-muted-foreground">{chapter.subject?.name}</p>
                            </div>
                          </div>
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Questions */}
            {questions.length > 0 && (
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 text-xl font-display font-bold mb-4"
                >
                  <Brain size={20} className="text-violet-500" /> Questions ({questions.length})
                </motion.h2>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-3"
                >
                  {questions.slice(0, 10).map((q: any) => (
                    <motion.div
                      key={q.id}
                      variants={fadeUp}
                      whileHover={{ x: 4, scale: 1.01 }}
                    >
                      <Link href={`/questions`}>
                        <div className="group flex items-center justify-between p-4 bg-card border border-border rounded-2xl hover:border-violet-400/40 hover:shadow-md transition-all cursor-pointer">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-sm shrink-0 mt-0.5">
                              <Brain size={18} />
                            </div>
                            <div>
                              <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">{q.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">{q.subject?.name}</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-muted-foreground group-hover:text-violet-500 transition-colors shrink-0 ml-2" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  {questions.length > 10 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-sm text-muted-foreground pt-2"
                    >
                      +{questions.length - 10} more results — refine your search
                    </motion.p>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
