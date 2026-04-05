import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { SUBJECTS, CHAPTERS, NOTES_CONTENT } from "@/lib/mock-data";
import { ChevronLeft, Share2, BookOpen, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const renderMarkdown = (content: string) => {
  let html = content;

  html = html.replace(/((?:^\|.+\|\n?)+)/gm, (tableBlock) => {
    const rows = tableBlock.trim().split('\n').filter(r => r.trim());
    if (rows.length < 2) return tableBlock;
    const isHeaderSep = (row: string) => /^\|[\s\-:|]+\|$/.test(row.trim());
    let headerRow = rows[0];
    let bodyRows = rows.filter((_, i) => i > 0 && !isHeaderSep(rows[i]));

    const parseRow = (row: string, tag: string) =>
      '<tr>' + row.trim().replace(/^\||\|$/g, '').split('|')
        .map(cell => `<${tag} class="${tag === 'th' ? 'px-4 py-2 bg-primary/10 font-bold text-foreground text-left' : 'px-4 py-2 border-t border-border text-foreground/80'}">${cell.trim()}</${tag}>`)
        .join('') + '</tr>';

    return `<div class="overflow-x-auto my-6 rounded-xl border border-border"><table class="w-full text-sm border-collapse">
      <thead>${parseRow(headerRow, 'th')}</thead>
      <tbody>${bodyRows.map(r => parseRow(r, 'td')).join('')}</tbody>
    </table></div>`;
  });

  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-foreground/80">$1</blockquote>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-display font-bold mt-8 mb-6 text-primary">$1</h1>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-display font-bold mt-8 mb-4 border-b border-border pb-2">$1</h2>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-foreground">$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc mb-2">$1</li>');
  html = html.replace(/^(?!<[a-z])(.+)$/gim, '<p class="mb-4 leading-relaxed text-foreground/90">$1</p>');

  return html;
};

export default function NotesDetail() {
  const [, params] = useRoute("/notes/:subject/:chapter");
  const { toast } = useToast();

  const subjectId = params?.subject;
  const chapterId = params?.chapter;

  const subject = SUBJECTS.find(s => s.id === subjectId);
  const chapter = subjectId ? CHAPTERS[subjectId]?.find(c => c.id === chapterId) : null;
  const content = chapterId ? NOTES_CONTENT[chapterId] || "# Content Coming Soon\n\nWe are actively working on notes for this chapter. Check back later!" : "";

  if (!subject || !chapter) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 text-2xl font-bold"
      >
        Content not found
      </motion.div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Notes link copied to clipboard.",
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
      <div className="py-8">

        {/* Breadcrumb Nav */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href={`/notes/${subject.id}`}>
            <motion.div
              whileHover={{ x: -4, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ChevronLeft size={16} /> Back to {subject.name}
            </motion.div>
          </Link>

          <motion.button
            whileHover={{ scale: 1.12, rotate: 15, backgroundColor: "rgba(99,102,241,0.15)" }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleShare}
            className="p-2 bg-secondary text-muted-foreground hover:text-primary rounded-full transition-colors cursor-pointer"
            title="Share Notes"
          >
            <Share2 size={18} />
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.08 }}
          className="mb-10 text-center"
        >
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.15 }}
            className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 bg-gradient-to-r ${subject.color} text-white shadow-md`}
          >
            {subject.name}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 24 }}
            className="text-3xl md:text-5xl font-display font-extrabold mb-4"
          >
            {chapter.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="text-lg text-muted-foreground"
          >
            {chapter.description}
          </motion.p>

          {/* Reading time badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 bg-secondary rounded-full text-xs font-medium text-muted-foreground"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <BookOpen size={12} />
            </motion.div>
            Full Chapter Notes
          </motion.div>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 260, damping: 24 }}
          className="bg-card border border-border shadow-xl shadow-black/5 rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden"
        >
          {/* Decorative gradient in top right */}
          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${subject.color} opacity-5 rounded-full blur-[60px] pointer-events-none`} />

          <div
            className="prose prose-lg dark:prose-invert max-w-none font-sans relative z-10"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 pt-8 border-t border-border flex justify-between items-center"
          >
            <p className="text-sm text-muted-foreground">End of Chapter</p>
            <Link href="/questions">
              <motion.button
                whileHover={{ scale: 1.05, x: 3, boxShadow: "0 8px 20px rgba(99,102,241,0.2)" }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-colors cursor-pointer flex items-center gap-2"
              >
                Practice Questions
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
