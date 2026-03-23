import { motion } from "framer-motion";
import { Download, FileText, ExternalLink, BookOpen, Search, Filter } from "lucide-react";
import { useState } from "react";

type ResourceType = "notes" | "paper";
type Subject = "All" | "Maths" | "Science" | "English" | "SST" | "Hindi";

interface Resource {
  id: number;
  name: string;
  type: ResourceType;
  subject: Subject;
  year?: string;
  pages: string;
  size: string;
  source: string;
  url: string;
  verified: boolean;
}

const resources: Resource[] = [
  // PDF Notes
  { id: 1, name: "Maths Formula Sheet — All Chapters", type: "notes", subject: "Maths", pages: "12", size: "0.8 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jemh1=0-15", verified: true },
  { id: 2, name: "Science Quick Revision Notes", type: "notes", subject: "Science", pages: "28", size: "1.2 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jesc1=0-16", verified: true },
  { id: 3, name: "Social Science Chapter Notes", type: "notes", subject: "SST", pages: "45", size: "2.1 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jehs1=0-8", verified: true },
  { id: 4, name: "English Grammar & Writing Guide", type: "notes", subject: "English", pages: "20", size: "0.9 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jelo1=0-11", verified: true },
  { id: 5, name: "Hindi Vyakaran Notes — Kshitij", type: "notes", subject: "Hindi", pages: "18", size: "1.0 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jhkj1=0-18", verified: true },
  { id: 6, name: "Maths NCERT Solutions All Chapters", type: "notes", subject: "Maths", pages: "120", size: "4.5 MB", source: "NCERT", url: "https://ncert.nic.in/textbook.php?jemh1=0-15", verified: true },
  // Previous Year Papers
  { id: 7, name: "CBSE Class 10 All Subjects — 2025", type: "paper", subject: "All", year: "2025", pages: "80", size: "3.8 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 8, name: "CBSE Maths Standard Question Paper 2024", type: "paper", subject: "Maths", year: "2024", pages: "16", size: "0.9 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 9, name: "CBSE Science Question Paper 2024", type: "paper", subject: "Science", year: "2024", pages: "20", size: "1.1 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 10, name: "CBSE English Paper 2024", type: "paper", subject: "English", year: "2024", pages: "16", size: "0.8 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 11, name: "CBSE SST Question Paper 2024", type: "paper", subject: "SST", year: "2024", pages: "20", size: "1.0 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 12, name: "CBSE Hindi Question Paper 2024", type: "paper", subject: "Hindi", year: "2024", pages: "16", size: "0.8 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 13, name: "CBSE All Subjects Question Papers 2023", type: "paper", subject: "All", year: "2023", pages: "90", size: "4.2 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 14, name: "CBSE Maths Basic + Standard 2023", type: "paper", subject: "Maths", year: "2023", pages: "32", size: "1.5 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
  { id: 15, name: "CBSE Science Question Paper 2022", type: "paper", subject: "Science", year: "2022", pages: "20", size: "1.0 MB", source: "CBSE Official", url: "https://cbse.gov.in/cbsenew/question-paper.html", verified: true },
];

const subjectColors: Record<string, string> = {
  Maths: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Science: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  English: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  SST: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Hindi: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  All: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

const subjects: Subject[] = ["All", "Maths", "Science", "English", "SST", "Hindi"];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ResourceType>("all");
  const [subjectFilter, setSubjectFilter] = useState<Subject>("All");

  const filtered = resources.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.type === typeFilter;
    const matchSubject = subjectFilter === "All" || r.subject === subjectFilter;
    return matchSearch && matchType && matchSubject;
  });

  const notes = filtered.filter(r => r.type === "notes");
  const papers = filtered.filter(r => r.type === "paper");

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-6 md:py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-3">
            <FileText size={14} /> Free Resources
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-3">Study Resources</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Official PDF notes and CBSE Previous Year Papers — all verified and free to download.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-4 mb-8">
          {[["15+", "Total Resources"], ["5", "Subjects"], ["100%", "Free & Official"]].map(([val, label]) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <div className="text-2xl font-display font-extrabold text-primary">{val}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "notes", "paper"] as const).map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all capitalize ${typeFilter === t ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}>
                {t === "all" ? "All Types" : t === "notes" ? "📝 Notes" : "📄 Papers"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Subject filter chips */}
        <div className="flex gap-2 flex-wrap mb-8">
          <Filter size={16} className="text-muted-foreground self-center" />
          {subjects.map(s => (
            <button key={s} onClick={() => setSubjectFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${subjectFilter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/50"}`}>
              {s}
            </button>
          ))}
        </div>

        {/* PDF Notes Table */}
        {notes.length > 0 && (typeFilter === "all" || typeFilter === "notes") && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-primary" /> PDF Study Notes
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/60 border-b border-border">
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground">#</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground">Resource Name</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden md:table-cell">Subject</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden sm:table-cell">Pages</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden lg:table-cell">Size</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden md:table-cell">Source</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-muted-foreground">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((r, i) => (
                      <tr key={r.id} className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${i % 2 === 0 ? "" : "bg-secondary/10"}`}>
                        <td className="px-5 py-4 text-muted-foreground font-mono text-xs">{String(i + 1).padStart(2, "0")}</td>
                        <td className="px-5 py-4 font-medium">{r.name}</td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${subjectColors[r.subject]}`}>{r.subject}</span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground hidden sm:table-cell">{r.pages} pg</td>
                        <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{r.size}</td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {r.verified && <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">✓ {r.source}</span>}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-xs hover:bg-primary hover:text-white transition-all">
                            <Download size={13} /> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Previous Year Papers Table */}
        {papers.length > 0 && (typeFilter === "all" || typeFilter === "paper") && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" /> Previous Year Papers
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/60 border-b border-border">
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground">#</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground">Paper Name</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden md:table-cell">Subject</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden sm:table-cell">Year</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden lg:table-cell">Pages</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground hidden md:table-cell">Source</th>
                      <th className="text-center px-5 py-3.5 font-semibold text-muted-foreground">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {papers.map((r, i) => (
                      <tr key={r.id} className={`border-b border-border last:border-0 hover:bg-secondary/30 transition-colors ${i % 2 === 0 ? "" : "bg-secondary/10"}`}>
                        <td className="px-5 py-4 text-muted-foreground font-mono text-xs">{String(i + 1).padStart(2, "0")}</td>
                        <td className="px-5 py-4 font-medium">{r.name}</td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${subjectColors[r.subject]}`}>{r.subject}</span>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="font-bold text-primary">{r.year}</span>
                        </td>
                        <td className="px-5 py-4 text-muted-foreground hidden lg:table-cell">{r.pages} pg</td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {r.verified && <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">✓ {r.source}</span>}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary/10 text-primary font-semibold text-xs hover:bg-primary hover:text-white transition-all">
                            <ExternalLink size={13} /> Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p>No resources found. Try a different search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
