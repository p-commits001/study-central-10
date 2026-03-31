import { CURRENT_SESSION } from "../constants";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import {
  Sun,
  Moon,
  Menu,
  X,
  Share2,
  GraduationCap,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  BookOpen,
  Brain,
  Download,
  Lightbulb,
  MessageSquare,
  User,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { name: "Home", path: "/", icon: GraduationCap },
  { name: "Notes", path: "/notes", icon: BookOpen },
  { name: "Questions", path: "/questions", icon: Brain },
  { name: "Quiz", path: "/quiz", icon: Brain },
  { name: "Resources", path: "/resources", icon: Download },
  { name: "NCERT Books", path: "/books", icon: BookOpen },
  { name: "Best Books", path: "/recommended-books", icon: BookOpen },
  { name: "Tips", path: "/tips", icon: Lightbulb },
  { name: "AI Tutor", path: "/ai-tutor", icon: Sparkles },
  { name: "Contact", path: "/contact", icon: MessageSquare },
  { name: "About", path: "/about", icon: User },
  { name: "Privacy Policy", path: "/privacy-policy", icon: ShieldCheck },
  { name: "Disclaimer", path: "/disclaimer", icon: AlertTriangle },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Class 10 Hub',
          text: 'Check out this awesome all-in-one study platform for Class 10 students!',
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "Link Copied!",
        description: "Website link copied to clipboard.",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navbar Section */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={24} />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight">
              Class 10 <span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-secondary/50 backdrop-blur-md p-1.5 rounded-2xl border border-border/50">
            {navLinks.slice(0, 9).map((link) => {
              const isActive = location === link.path;
              return (
                <Link key={link.name} href={link.path}>
                  <div className={`px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                      isActive ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    <link.icon size={16} />
                    {link.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/search">
              <button className="p-2.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                <Search size={20} />
              </button>
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="lg:hidden p-2.5 rounded-full text-muted-foreground bg-secondary/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay (Scroll Fix Added) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background shadow-2xl z-[70] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                    <GraduationCap size={18} />
                  </div>
                  <span className="font-bold">Menu</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-secondary rounded-full">
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location === link.path;
                  return (
                    <Link key={link.name} href={link.path}>
                      <div 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-colors cursor-pointer ${
                          isActive ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary/30 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon size={20} />
                          <span className="font-medium text-base">{link.name}</span>
                        </div>
                        <ChevronRight size={16} />
                      </div>
                    </Link>
                  );
                })}
                <div className="pt-4 pb-10">
                  <button 
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-primary text-white font-bold shadow-lg"
                  >
                    <Share2 size={20} /> Share Website
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <main className="flex-1 pt-24 pb-16 relative">
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none -z-10" />
        {children}
      </main>

      {/* Footer Section - Essential for AdSense */}
      <footer className="bg-card border-t border-border py-12 relative z-10 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
             <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white mb-4 shadow-lg shadow-primary/20">
               <GraduationCap size={28} />
             </div>
             <h2 className="text-2xl font-bold tracking-tight">Class 10 Hub</h2>
             <p className="text-muted-foreground max-w-md mt-2 text-sm italic">Making CBSE Class 10 learning easy and fun.</p>
          </div>
          
          {/* AdSense Approval Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-sm font-medium text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>

          <div className="pt-8 border-t border-border/50 text-muted-foreground text-xs md:text-sm">
            <p>© {new Date().getFullYear()} Class 10 Hub. Session {CURRENT_SESSION}</p>
            <p className="mt-2 opacity-60">Educational purpose only. Not officially affiliated with CBSE.</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Button */}
      <AnimatePresence>
        {location !== "/ai-tutor" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link href="/ai-tutor">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl cursor-pointer border border-white/20"
              >
                <div className="relative">
                  <Sparkles size={22} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] opacity-80 mb-0.5 text-left">Ask AI</span>
                  <span className="font-bold text-sm text-left">AI Tutor</span>
                </div>
                {/* Mobile Viral Share Bar (WhatsApp + Insta/Copy) */}
<div className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden bg-background/80 backdrop-blur-lg border-t p-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
  
  {/* WhatsApp Button */}
  <a 
    href={`https://wa.me/?text=Bhai ye dekh! Class 10 ke saare Notes, Important Questions aur AI Tutor yahan free mein mil rahe hain 🚀🔥 %0A%0A ${window.location.href}`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
  >
    <Share2 size={18} />
    <span>WhatsApp Share</span>
  </a>

  {/* Instagram / Copy Link Button */}
  <button 
    onClick={() => {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Ab ise Insta Story ya doston ko bhejo! 🚀",
      });
    }}
    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
  >
    <Sparkles size={18} />
    <span>Insta Link</span>
  </button>

</div>

              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
