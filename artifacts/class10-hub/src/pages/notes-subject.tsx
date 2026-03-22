import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS } from "@/lib/mock-data";
import { ChevronLeft, FileText, ChevronDown } from "lucide-react";

export default function NotesSubject() {
  const [, params] = useRoute("/notes/:subject");
  const subjectId = params?.subject;
  
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const chapters = subjectId ? CHAPTERS[subjectId] || [] : [];
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!subject) {
    return <div className="text-center py-20 text-2xl font-bold">Subject not found</div>;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <div className="py-8">
        <Link href="/notes">
          <div className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 cursor-pointer bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors">
            <ChevronLeft size={16} /> Back to Subjects
          </div>
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg`}>
            <FileText size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-extrabold">{subject.name}</h1>
            <p className="text-muted-foreground text-lg">{chapters.length} Chapters Available</p>
          </div>
        </motion.div>

        <div className="space-y-4">
          {chapters.map((chapter, idx) => {
            const isExpanded = expandedId === chapter.id;
            
            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? 'border-primary shadow-md' : 'border-border hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div 
                  className="p-5 md:p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : chapter.id)}
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className={`text-lg md:text-xl font-bold font-display transition-colors ${isExpanded ? 'text-primary' : ''}`}>
                        {chapter.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{chapter.description}</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border bg-secondary/20"
                    >
                      <div className="p-5 md:p-6 pl-19 md:pl-20">
                        <p className="text-foreground mb-6 leading-relaxed">
                          Dive deep into {chapter.title}. This chapter covers all crucial concepts required for the board exams, carefully structured for easy retention.
                        </p>
                        <Link href={`/notes/${subject.id}/${chapter.id}`}>
                          <button className="px-6 py-2.5 bg-gradient-primary text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center cursor-pointer flex items-center justify-center gap-2">
                            <FileText size={18} /> Read Full Notes
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
