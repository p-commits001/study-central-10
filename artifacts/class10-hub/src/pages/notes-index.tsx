import { motion } from "framer-motion";
import { Link } from "wouter";
import { SUBJECTS, CHAPTERS } from "@/lib/mock-data";
import { Calculator, FlaskConical, BookOpen, Globe, Languages, ChevronRight, BookText } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  Calculator, FlaskConical, BookOpen, Globe, Languages
};

export default function NotesIndex() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm"
          >
            <BookText size={16} /> Read & Learn
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
            Subject <span className="text-gradient">Notes</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive, strictly syllabus-aligned notes to help you understand concepts deeply.
          </motion.p>
        </motion.div>

        {/* Subject Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {SUBJECTS.map((subject) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const chapterCount = CHAPTERS[subject.id]?.length || 0;

            return (
              <motion.div
                key={subject.id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 24px 48px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/notes/${subject.id}`}>
                  <div className="group bg-card rounded-3xl p-6 md:p-8 border border-border hover:border-primary/40 shadow-sm transition-colors duration-300 cursor-pointer h-full relative overflow-hidden flex flex-col">

                    {/* Animated gradient blob */}
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${subject.color} opacity-0 group-hover:opacity-15 rounded-full blur-[50px] transition-opacity duration-700`} />

                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg`}
                      >
                        <Icon size={32} />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-secondary px-3 py-1 rounded-full text-xs font-semibold text-secondary-foreground"
                      >
                        {chapterCount} Chapters
                      </motion.div>
                    </div>

                    <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors relative z-10">
                      {subject.name}
                    </h2>
                    <p className="text-muted-foreground text-sm flex-1 relative z-10 mb-6">
                      Master {subject.name} with our simplified, easy-to-understand notes covering the entire NCERT syllabus.
                    </p>

                    <div className="flex items-center text-primary font-semibold text-sm mt-auto relative z-10">
                      View Chapters
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight size={18} className="ml-1" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
