import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS } from "@/lib/mock-data";
import { ChevronLeft, FileText, ChevronDown, Sparkles, Eye, Download, Calculator, FlaskConical, BookOpen, Globe, Languages } from "lucide-react";

const SUBJECT_ICONS: Record<string, React.ElementType> = {
  Calculator, FlaskConical, BookOpen, Globe, Languages
};

const NCERT_PDFS: Record<string, Record<string, { view: string; download: string }>> = {
  maths: {
    m1:  { view: "https://ncert.nic.in/textbook/pdf/jemh101.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh101.pdf" },
    m2:  { view: "https://ncert.nic.in/textbook/pdf/jemh102.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh102.pdf" },
    m3:  { view: "https://ncert.nic.in/textbook/pdf/jemh103.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh103.pdf" },
    m4:  { view: "https://ncert.nic.in/textbook/pdf/jemh104.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh104.pdf" },
    m5:  { view: "https://ncert.nic.in/textbook/pdf/jemh105.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh105.pdf" },
    m6:  { view: "https://ncert.nic.in/textbook/pdf/jemh106.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh106.pdf" },
    m7:  { view: "https://ncert.nic.in/textbook/pdf/jemh106.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh106.pdf" },
    m8:  { view: "https://ncert.nic.in/textbook/pdf/jemh107.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh107.pdf" },
    m9:  { view: "https://ncert.nic.in/textbook/pdf/jemh108.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh108.pdf" },
    m10: { view: "https://ncert.nic.in/textbook/pdf/jemh112.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh112.pdf" },
    m11: { view: "https://ncert.nic.in/textbook/pdf/jemh113.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh113.pdf" },
    m12: { view: "https://ncert.nic.in/textbook/pdf/jemh114.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh114.pdf" },
    m13: { view: "https://ncert.nic.in/textbook/pdf/jemh115.pdf", download: "https://ncert.nic.in/textbook/pdf/jemh115.pdf" },
  },
  science: {
    s1:  { view: "https://ncert.nic.in/textbook/pdf/jesc101.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc101.pdf" },
    s2:  { view: "https://ncert.nic.in/textbook/pdf/jesc102.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc102.pdf" },
    s3:  { view: "https://ncert.nic.in/textbook/pdf/jesc103.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc103.pdf" },
    s4:  { view: "https://ncert.nic.in/textbook/pdf/jesc104.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc104.pdf" },
    s5:  { view: "https://ncert.nic.in/textbook/pdf/jesc106.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc106.pdf" },
    s6:  { view: "https://ncert.nic.in/textbook/pdf/jesc107.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc107.pdf" },
    s7:  { view: "https://ncert.nic.in/textbook/pdf/jesc108.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc108.pdf" },
    s8:  { view: "https://ncert.nic.in/textbook/pdf/jesc109.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc109.pdf" },
    s9:  { view: "https://ncert.nic.in/textbook/pdf/jesc110.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc110.pdf" },
    s10: { view: "https://ncert.nic.in/textbook/pdf/jesc111.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc111.pdf" },
    s11: { view: "https://ncert.nic.in/textbook/pdf/jesc112.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc112.pdf" },
    s12: { view: "https://ncert.nic.in/textbook/pdf/jesc113.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc113.pdf" },
    s13: { view: "https://ncert.nic.in/textbook/pdf/jesc115.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc115.pdf" },
    s14: { view: "https://ncert.nic.in/textbook/pdf/jesc116.pdf", download: "https://ncert.nic.in/textbook/pdf/jesc116.pdf" },
  },
  english: {
    e1:  { view: "https://ncert.nic.in/textbook/pdf/jefr101.pdf", download: "https://ncert.nic.in/textbook/pdf/jefr101.pdf" },
    e2:  { view: "https://ncert.nic.in/textbook/pdf/jefr102.pdf", download: "https://ncert.nic.in/textbook/pdf/jefr102.pdf" },
    e3:  { view: "https://ncert.nic.in/textbook/pdf/jefr103.pdf", download: "https://ncert.nic.in/textbook/pdf/jefr103.pdf" },
    e4:  { view: "https://ncert.nic.in/textbook/pdf/jefr104.pdf", download: "https://ncert.nic.in/textbook/pdf/jefr104.pdf" },
    e5:  { view: "https://ncert.nic.in/textbook/pdf/jefr105.pdf", download: "https://ncert.nic.in/textbook/pdf/jefr105.pdf" },
  },
  sst: {
    ss1: { view: "https://ncert.nic.in/textbook/pdf/jehc101.pdf", download: "https://ncert.nic.in/textbook/pdf/jehc101.pdf" },
    ss2: { view: "https://ncert.nic.in/textbook/pdf/jehc102.pdf", download: "https://ncert.nic.in/textbook/pdf/jehc102.pdf" },
    ss3: { view: "https://ncert.nic.in/textbook/pdf/jehc103.pdf", download: "https://ncert.nic.in/textbook/pdf/jehc103.pdf" },
    ss4: { view: "https://ncert.nic.in/textbook/pdf/jehc104.pdf", download: "https://ncert.nic.in/textbook/pdf/jehc104.pdf" },
    ss5: { view: "https://ncert.nic.in/textbook/pdf/jess101.pdf", download: "https://ncert.nic.in/textbook/pdf/jess101.pdf" },
    ss6: { view: "https://ncert.nic.in/textbook/pdf/jess102.pdf", download: "https://ncert.nic.in/textbook/pdf/jess102.pdf" },
    ss7: { view: "https://ncert.nic.in/textbook/pdf/jess103.pdf", download: "https://ncert.nic.in/textbook/pdf/jess103.pdf" },
  },
  hindi: {
    h1: { view: "https://ncert.nic.in/textbook/pdf/jhkd101.pdf", download: "https://ncert.nic.in/textbook/pdf/jhkd101.pdf" },
    h2: { view: "https://ncert.nic.in/textbook/pdf/jhkd102.pdf", download: "https://ncert.nic.in/textbook/pdf/jhkd102.pdf" },
    h3: { view: "https://ncert.nic.in/textbook/pdf/jhkd103.pdf", download: "https://ncert.nic.in/textbook/pdf/jhkd103.pdf" },
  },
};

function getFallbackPdf(subjectId: string) {
  const fallbacks: Record<string, string> = {
    maths: "https://ncert.nic.in/textbook.php?jemh1=0-15",
    science: "https://ncert.nic.in/textbook.php?jesc1=0-16",
    english: "https://ncert.nic.in/textbook.php?jefr1=0-7",
    sst: "https://ncert.nic.in/textbook.php?jehc1=0-5",
    hindi: "https://ncert.nic.in/textbook.php?jhkd1=0-5",
  };
  return fallbacks[subjectId] || "https://ncert.nic.in/";
}

export default function NotesSubject() {
  const [, params] = useRoute("/notes/:subject");
  const subjectId = params?.subject;

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const chapters = subjectId ? CHAPTERS[subjectId] || [] : [];
  const SubjectIcon = SUBJECT_ICONS[subject?.icon || "BookOpen"] || BookOpen;

  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!subject) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-2xl font-bold">
        Subject not found
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
      <div className="py-8">

        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
          <Link href="/notes">
            <motion.div whileHover={{ x: -4, scale: 1.03 }} whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-8 cursor-pointer bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors">
              <ChevronLeft size={16} /> Back to Digital Library
            </motion.div>
          </Link>
        </motion.div>

        {/* Subject Header — library style */}
        <motion.div initial={{ opacity: 0, y: -25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.05 }}
          className="relative bg-card border border-border rounded-3xl p-6 md:p-8 mb-8 overflow-hidden shadow-xl">

          <div className={`absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br ${subject.color} opacity-10 rounded-full blur-2xl`} />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.15, rotate: 10 }}
              className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-xl`}>
              <SubjectIcon size={40} />
            </motion.div>
            <div>
              <motion.h1 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: "spring" }}
                className="text-3xl md:text-4xl font-display font-extrabold">{subject.name}</motion.h1>
              <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
                className="text-muted-foreground flex items-center gap-2 mt-1">
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-primary font-bold">{chapters.length}</motion.span>
                Chapters · NCERT CBSE Class 10
              </motion.p>
            </div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mt-5 relative z-10">
            {["📖 Board Exam Focused", "⚡ Fast Loading", "📥 NCERT PDFs", "🎯 Easy to Understand"].map(tag => (
              <span key={tag} className="text-xs font-semibold bg-secondary px-3 py-1 rounded-full border border-border">{tag}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Chapters list */}
        <motion.div initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }}
          className="space-y-4">

          {chapters.map((chapter, idx) => {
            const isExpanded = expandedId === chapter.id;
            const pdfLinks = NCERT_PDFS[subjectId!]?.[chapter.id];
            const pdfUrl = pdfLinks?.view || getFallbackPdf(subjectId!);
            const downloadUrl = pdfLinks?.download || getFallbackPdf(subjectId!);

            return (
              <motion.div key={chapter.id}
                variants={{ hidden: { opacity: 0, y: 22, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 280, damping: 24 } } }}
                whileHover={!isExpanded ? { x: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" } : {}}
                className={`bg-card border rounded-2xl overflow-hidden transition-colors duration-300 ${isExpanded ? "border-primary shadow-md shadow-primary/10" : "border-border hover:border-primary/50"}`}>

                <motion.div className="p-5 md:p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : chapter.id)} whileTap={{ scale: 0.99 }}>

                  <div className="flex gap-4 items-center flex-1 min-w-0">
                    <motion.div whileHover={{ scale: 1.15 }}
                      animate={isExpanded ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 transition-colors ${isExpanded ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-secondary text-muted-foreground"}`}>
                      {idx + 1}
                    </motion.div>
                    <div className="min-w-0">
                      <h3 className={`text-base md:text-lg font-bold font-display transition-colors truncate ${isExpanded ? "text-primary" : ""}`}>
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{chapter.description}</p>
                    </div>
                  </div>

                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`p-2 rounded-full ml-3 shrink-0 ${isExpanded ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    <ChevronDown size={20} />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="border-t border-border bg-secondary/20 overflow-hidden">
                      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }}
                        transition={{ delay: 0.05 }} className="p-5 md:p-6">

                        <p className="text-foreground mb-5 leading-relaxed text-sm">
                          Dive deep into <strong>{chapter.title}</strong>. This chapter covers all crucial concepts required for Board Exam 2026-27, carefully structured for easy understanding and retention.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          {/* Read Full Notes */}
                          <Link href={`/notes/${subject.id}/${chapter.id}`}>
                            <motion.button whileHover={{ scale: 1.04, y: -2, boxShadow: "0 12px 28px rgba(99,102,241,0.25)" }} whileTap={{ scale: 0.96 }}
                              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-md text-sm">
                              <FileText size={16} /> Read Notes
                              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                                <Sparkles size={12} />
                              </motion.div>
                            </motion.button>
                          </Link>

                          {/* View PDF */}
                          <motion.a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 8px 20px rgba(59,130,246,0.3)" }} whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-md text-sm">
                            <Eye size={16} /> View PDF
                          </motion.a>

                          {/* Download PDF */}
                          <motion.a href={downloadUrl} target="_blank" rel="noopener noreferrer" download
                            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 8px 20px rgba(16,185,129,0.3)" }} whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-md text-sm">
                            <Download size={16} /> Download
                          </motion.a>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Official NCERT PDF · Free download · No sign-up required
                        </div>
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
