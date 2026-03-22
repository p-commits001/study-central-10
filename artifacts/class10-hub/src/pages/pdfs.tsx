import { useState } from "react";
import { motion } from "framer-motion";
import { PDFS } from "@/lib/mock-data";
import { Download, FileIcon, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Pdfs() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Get unique types for filter
  const types = ["All", ...Array.from(new Set(PDFS.map(pdf => pdf.type)))];

  const filteredPdfs = PDFS.filter(pdf => {
    const matchesSearch = pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pdf.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || pdf.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (title: string) => {
    // Mock download action
    toast({
      title: "Download Started",
      description: `Downloading ${title}...`,
    });
    
    // Simulate slight delay then success
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "File saved to your device.",
        variant: "default",
        className: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900 text-green-800 dark:text-green-300"
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 font-medium text-sm">
            <Download size={16} /> Free Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">Study Material PDFs</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download sample papers, NCERT solutions, and quick revision notes directly to your device.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-card p-4 rounded-3xl shadow-sm border border-border">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search papers, subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
            />
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === type 
                    ? "bg-foreground text-background shadow-md" 
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* PDF Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPdfs.length === 0 ? (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No PDFs found matching your criteria.
            </div>
          ) : (
            filteredPdfs.map((pdf, idx) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <FileIcon size={24} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                    {pdf.size}
                  </span>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2 line-clamp-2" title={pdf.title}>
                  {pdf.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                    {pdf.subject}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground border border-border px-2 py-1 rounded-md">
                    {pdf.type}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleDownload(pdf.title)}
                  className="mt-auto w-full py-3 rounded-xl bg-secondary text-foreground font-semibold flex items-center justify-center gap-2 group-hover:bg-gradient-primary group-hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Download size={18} className="group-hover:animate-bounce" /> 
                  Download PDF
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
