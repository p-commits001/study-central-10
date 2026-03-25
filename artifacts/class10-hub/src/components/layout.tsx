import { CURRENT_SESSION } from "../constants";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./theme-provider";
import { 
  Sun, Moon, Menu, X, Share2, GraduationCap, ChevronRight, Sparkles, 
  BookOpen, Brain, Download, Lightbulb, MessageSquare, User, Search 
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
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass shadow-md py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <GraduationCap size={24} />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground">
              Class 10 <span className="text-gradient">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-secondary/50 backdrop-blur-md p-1.5 rounded-2xl border border-border/50">
            {navLinks.map((link) => {
              const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
              return (
                <Link key={link.name} href={link.path}>
                  <div className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center gap-2
                    ${isActive 
                      ? "bg-background text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"}
                  `}>
                    <link.icon size={16} />
                    {link.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
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
              onClick={handleShare}
              className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-primary text-white font-medium text-sm hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2.5 rounded-full text-foreground bg-secondary/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-4 pb-6 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = location === link.path || (link.path !== '/' && location.startsWith(link.path));
                return (
                  <Link key={link.name} href={link.path}>
                    <div 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        flex items-center justify-between p-4 rounded-2xl transition-colors cursor-pointer
                        ${isActive ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary/50 text-foreground border border-transparent"}
                      `}
                    >
                      <div className="flex items-center gap-3 font-medium text-lg">
                        <link.icon size={24} className={isActive ? "text-primary" : "text-muted-foreground"} />
                        {link.name}
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto pt-6">
              <button 
                onClick={() => {
                  handleShare();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-primary text-white font-bold text-lg shadow-lg shadow-primary/25"
              >
                <Share2 size={20} />
                Share Website
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Tutor Button */}
      <AnimatePresence>
        {location !== "/ai-tutor" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Link href="/ai-tutor">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-2xl shadow-purple-500/40 cursor-pointer"
              >
                <div className="relative">
                  <Sparkles size={22} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-medium opacity-80 leading-none mb-0.5">Ask anything</div>
                  <div className="text-sm font-bold leading-none">AI Tutor</div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16 relative">
        {/* Subtle background decorative blobs */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] pointer-events-none -z-10" />
        
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                  <GraduationCap size={18} />
                </div>
                <span className="font-display font-bold text-xl text-foreground">Class 10 Hub</span>
              </Link>
              <p className="text-muted-foreground max-w-sm">
                The ultimate all-in-one platform for CBSE Class 10 students. Get comprehensive notes, important questions, and study material completely free.
              </p>
              <div className="mt-4 text-xs text-muted-foreground leading-relaxed italic">
                Class 10 Hub is the best platform for <strong>CBSE Class 10 Important Questions {CURRENT_SESSION}</strong>. 
                We provide <strong>Science MCQ Quizzes</strong>, <strong>Maths Objective Questions</strong>, 
                and <strong>Handwritten Notes</strong>. Explore our <strong>NCERT Solutions</strong> 
                and <strong>Best Reference Books for Class 10</strong> to boost your board exam preparation for the 
                <strong> {CURRENT_SESSION}</strong> session.
              </div>


            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.slice(1).map(link => (
                  <li key={link.name}>
                    <Link href={link.path}>
                      <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-2">
                        <ChevronRight size={14} /> {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <li>
  <Link href="/about">
    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer inline-flex items-center gap-2">
      <ChevronRight size={14} />
      About Us
    </span>
  </Link>
</li>
            <div>
              <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>Email: priyanshupriyanshu7659</li>
                <li>Made with ❤️ in India</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Class 10 Hub. Session {CURRENT_SESSION}
            </p>

            <p className="text-xs text-muted-foreground/70">
              Disclaimer: This is an educational tool. Not affiliated with CBSE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
