import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { SUBJECTS, CHAPTERS, NOTES_CONTENT } from "@/lib/mock-data";
import { ChevronLeft, Share2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { useToast } from "@/hooks/use-toast";

// Markdown to HTML renderer with table, blockquote, and list support
const renderMarkdown = (content: string) => {
  let html = content;

  // Tables — convert markdown tables to HTML
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

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-foreground/80">$1</blockquote>');

  // H1
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl md:text-4xl font-display font-bold mt-8 mb-6 text-primary">$1</h1>');
  // H2
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-display font-bold mt-8 mb-4 border-b border-border pb-2">$1</h2>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-foreground">$1</strong>');
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');
  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc mb-2">$1</li>');
  // Paragraphs (anything that isn't a tag and isn't empty)
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
    return <div className="text-center py-20 text-2xl font-bold">Content not found</div>;
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
        <div className="flex items-center justify-between mb-8">
          <Link href={`/notes/${subject.id}`}>
            <div className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors">
              <ChevronLeft size={16} /> Back to {subject.name}
            </div>
          </Link>
          
          <button 
            onClick={handleShare}
            className="p-2 bg-secondary text-muted-foreground hover:text-foreground rounded-full transition-colors cursor-pointer"
            title="Share Notes"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 bg-gradient-to-r ${subject.color} text-white`}>
            {subject.name}
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-4">{chapter.title}</h1>
          <p className="text-lg text-muted-foreground">{chapter.description}</p>
        </motion.div>

        {/* Content Body */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border shadow-xl shadow-black/5 rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none font-sans"
               dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} 
          />
          
          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <p className="text-sm text-muted-foreground">End of Chapter</p>
            <Link href="/questions">
              <button className="px-5 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-colors cursor-pointer">
                Practice Questions
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
