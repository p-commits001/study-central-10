import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { SUBJECTS, CHAPTERS, QUESTIONS } from "@/lib/mock-data";
import { Search as SearchIcon, BookOpen, Brain, FileText, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = () => {
    if (!query.trim()) return { chapters: [], questions: [] };

    const lowerQuery = query.toLowerCase();
    
    // Search chapters
    const foundChapters = [];
    for (const [subjectId, chapters] of Object.entries(CHAPTERS)) {
      const subject = SUBJECTS.find(s => s.id === subjectId);
      for (const ch of chapters) {
        if (ch.title.toLowerCase().includes(lowerQuery) || ch.description.toLowerCase().includes(lowerQuery)) {
          foundChapters.push({ ...ch, subject });
        }
      }
    }

    // Search questions
    const foundQuestions = [];
    for (const [chapterId, questions] of Object.entries(QUESTIONS)) {
      // Find which subject this chapter belongs to
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

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-6 text-center">Global Search</h1>
        
        <div className="relative mb-12 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-primary" />
          </div>
          <input
            type="text"
            autoFocus
            className="w-full pl-14 pr-4 py-4 md:py-5 text-lg rounded-2xl bg-card border-2 border-primary/20 focus:border-primary shadow-lg shadow-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground"
            placeholder="Search for subjects, chapters, or specific questions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {query.trim().length > 0 && !hasResults && (
        <div className="text-center py-20 text-muted-foreground">
          <SearchIcon size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-xl">No results found for "{query}"</p>
          <p className="text-sm mt-2">Try different keywords or check spelling.</p>
        </div>
      )}

      {hasResults && (
        <div className="space-y-10">
          {/* Chapter Results */}
          {chapters.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                <BookOpen size={20} className="text-primary" /> Chapters
              </h2>
              <div className="grid gap-4">
                {chapters.map(ch => (
                  <Link key={ch.id} href={`/notes/${ch.subject?.id}/${ch.id}`}>
                    <div className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r ${ch.subject?.color}`}>
                            {ch.subject?.name}
                          </span>
                        </div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{ch.title}</h3>
                        <p className="text-sm text-muted-foreground">{ch.description}</p>
                      </div>
                      <ChevronRight className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Question Results */}
          {questions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b border-border pb-2">
                <Brain size={20} className="text-accent" /> Questions
              </h2>
              <div className="grid gap-4">
                {questions.map(q => (
                  <Link key={q.id} href={`/questions`}>
                    <div className="bg-card p-4 rounded-xl border border-border hover:border-accent/50 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded text-white bg-gradient-to-r ${q.subject?.color}`}>
                          {q.subject?.name}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                          {q.marks} Marks
                        </span>
                      </div>
                      <p className="font-medium group-hover:text-accent transition-colors">{q.text}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
