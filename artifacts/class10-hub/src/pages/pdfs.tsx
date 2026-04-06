import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PDFS } from "@/lib/mock-data";
import { Download, FileText, Search, ExternalLink, ShieldCheck } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn, viewportOnce } from "@/lib/animations";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

const SUBJECT_COLORS: Record<string, string> = {
  "Maths": "text-blue-600 bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400",
  "Science": "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400",
  "English": "text-violet-600 bg-violet-100 dark:bg-violet-950/40 dark:text-violet-400",
  "SST": "text-orange-600 bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400",
  "Hindi": "text-pink-600 bg-pink-100 dark:bg-pink-950/40 dark:text-pink-400",
  "Sanskrit": "text-yellow-600 bg-yellow-100 dark:bg-yellow-950/40 dark:text-yellow-400",
  "IT / Skill": "text-cyan-600 bg-cyan-100 dark:bg-cyan-950/40 dark:text-cyan-400",
  "All Subjects": "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300",
};

export default function Pdfs() {
  useSEO(SEO_DATA.pdfs);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const years = ["All", "PYQs 2025", "PYQs 2024", "PYQs 2023", "PYQs 2022"];

  const filteredPdfs = PDFS.filter(pdf => {
    const matchesSearch =
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pdf.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || pdf.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-8 md:py-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-4xl mb-4"
          >
            📄
          </motion.div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
            <Download size={16} /> Official CBSE Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
            CBSE Question Papers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Official previous year question papers (2022–2025) sourced directly from the CBSE website.
            Click any card to download from the official source.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-medium"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShieldCheck size={16} />
            </motion.div>
            All papers sourced from cbse.gov.in — India's official CBSE portal
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-card p-4 rounded-3xl shadow-sm border border-border"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.2)" }}
              type="text"
              placeholder="Search subject or paper..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex overflow-x-auto w-full md:w-auto pb-1 md:pb-0 gap-2">
            {years.map((year, i) => (
              <motion.button
                key={year}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(year)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === year
                    ? "bg-foreground text-background shadow-md"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* PDF Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${searchTerm}`}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPdfs.length === 0 ? (
              <motion.div
                variants={scaleIn}
                className="col-span-full text-center py-20 text-muted-foreground"
              >
                <div className="text-4xl mb-3">📭</div>
                <p className="font-medium">No papers found matching your criteria.</p>
              </motion.div>
            ) : (
              filteredPdfs.map((pdf) => (
                <motion.div
                  key={pdf.id}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  className="group bg-card border border-border rounded-3xl p-6 shadow-sm hover:border-primary/30 transition-colors flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 6, scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0"
                    >
                      <FileText size={24} />
                    </motion.div>
                    <span className="px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                      {pdf.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold mb-3 line-clamp-2 leading-snug group-hover:text-primary transition-colors" title={pdf.title}>
                    {pdf.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${SUBJECT_COLORS[pdf.subject] ?? "text-gray-600 bg-gray-100"}`}>
                      {pdf.subject}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground border border-border px-2 py-1 rounded-md flex items-center gap-1">
                      <ShieldCheck size={11} className="text-green-500" /> {pdf.source}
                    </span>
                  </div>

                  <motion.a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-auto w-full py-3 rounded-xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Open on CBSE Website
                  </motion.a>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All papers are hosted on{" "}
          <motion.a
            href="https://www.cbse.gov.in/cbsenew/question-paper.html"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="text-primary underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-1"
          >
            cbse.gov.in <ExternalLink size={11} />
          </motion.a>
          . Class 10 Hub does not host or redistribute any CBSE content.
        </motion.p>
      </div>
    </div>
  );
}
