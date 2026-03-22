import { motion } from "framer-motion";
import { Link } from "wouter";
import { SUBJECTS, CHAPTERS } from "@/lib/mock-data";
import { 
  Calculator, FlaskConical, BookOpen, Globe, Languages, ChevronRight, BookText
} from "lucide-react";

// Icon map helper
const iconMap: Record<string, React.ElementType> = {
  Calculator, FlaskConical, BookOpen, Globe, Languages
};

export default function NotesIndex() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl">
      <div className="py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
            <BookText size={16} /> Read & Learn
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">Subject Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive, strictly strictly syllabus-aligned notes to help you understand concepts deeply.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SUBJECTS.map((subject, idx) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            const chapterCount = CHAPTERS[subject.id]?.length || 0;
            
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link href={`/notes/${subject.id}`}>
                  <div className="group bg-card rounded-3xl p-6 md:p-8 border border-border hover:border-primary/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative overflow-hidden flex flex-col">
                    
                    {/* Decorative gradient blob */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${subject.color} opacity-5 rounded-full blur-[40px] group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={32} />
                      </div>
                      <div className="bg-secondary px-3 py-1 rounded-full text-xs font-semibold text-secondary-foreground">
                        {chapterCount} Chapters
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors relative z-10">{subject.name}</h2>
                    <p className="text-muted-foreground text-sm flex-1 relative z-10 mb-6">
                      Master {subject.name} with our simplified, easy-to-understand notes covering the entire NCERT syllabus.
                    </p>
                    
                    <div className="flex items-center text-primary font-semibold text-sm mt-auto relative z-10">
                      View Chapters 
                      <ChevronRight size={18} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
