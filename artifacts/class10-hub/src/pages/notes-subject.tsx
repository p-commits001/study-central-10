import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS } from "@/lib/mock-data";
import { ChevronLeft, FileText, ChevronDown, Sparkles } from "lucide-react";

export default function NotesSubject() {
  const [, params] = useRoute("/notes/:subject");
  const subjectId = params?.subject;

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const chapters = subjectId ? CHAPTERS[subjectId] || [] : [];

  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!subject) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-2xl font-bold"
      >
        Subject not found
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <div className="py-8">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <Link href="/notes">
            <motion.div
              whileHover={{ x: -4, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 cursor-pointer bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ChevronLeft size={16} /> Back to Subjects
            </motion.div>
          </Link>
        </motion.div>

        {/* Subject Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
          className="flex items-center gap-4 mb-10"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.15, rotate: 10 }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg shadow-black/20`}
          >
            <FileText size={32} />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-3xl md:text-5xl font-display font-extrabold"
            >
              {subject.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              className="text-muted-foreground text-lg flex items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-primary font-bold"
              >
                {chapters.length}
              </motion.span>
              Chapters Available
            </motion.p>
          </div>
        </motion.div>

        {/* Chapters list */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
          className="space-y-4"
        >
          {chapters.map((chapter, idx) => {
            const isExpanded = expandedId === chapter.id;

            return (
              <motion.div
                key={chapter.id}
                variants={{ hidden: { opacity: 0, y: 22, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 24 } } }}
                whileHover={!isExpanded ? { x: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" } : {}}
                className={`bg-card border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isExpanded ? 'border-primary shadow-md shadow-primary/10' : 'border-border hover:border-primary/50'
                }`}
              >
                <motion.div
                  className="p-5 md:p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : chapter.id)}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex gap-4 items-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      animate={isExpanded ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors ${isExpanded ? 'bg-primary text-white shadow-md shadow-primary/30' : 'bg-secondary text-muted-foreground'}`}
                    >
                      {idx + 1}
                    </motion.div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-bold font-display transition-colors ${isExpanded ? 'text-primary' : ''}`}>
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{chapter.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`p-2 rounded-full ${isExpanded ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="border-t border-border bg-secondary/20 overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ delay: 0.05 }}
                        className="p-5 md:p-6 pl-19 md:pl-20"
                      >
                        <p className="text-foreground mb-6 leading-relaxed">
                          Dive deep into <strong>{chapter.title}</strong>. This chapter covers all crucial concepts required for the board exams, carefully structured for easy retention.
                        </p>
                        <Link href={`/notes/${subject.id}/${chapter.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 28px rgba(99,102,241,0.25)" }}
                            whileTap={{ scale: 0.96 }}
                            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-xl shadow-md w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-2"
                          >
                            <FileText size={18} />
                            Read Full Notes
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            >
                              <Sparkles size={14} />
                            </motion.div>
                          </motion.button>
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
