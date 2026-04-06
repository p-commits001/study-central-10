import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "./supabase"; 
import { 
  Menu, X, GraduationCap, Instagram, User, Sparkles, 
  BookOpen, Brain, MessageSquare, Info, ShieldCheck, 
  AlertTriangle, Lightbulb, Download, ChevronRight, LogIn,
  ClipboardCheck, LogOut, Mail, Image, Video
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const sidebarVariants: Variants = {
  closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
  open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

const modalVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", duration: 0.5 } },
  exit: { y: 50, opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) setIsLoginOpen(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    if (!supabase) return alert("Login abhi available nahi hai.");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) alert(error.message);
  };

  const handleEmailLogin = async () => {
    if (!supabase) return alert("Login abhi available nahi hai.");
    if (!email) return alert("Email dalo bhai!");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else {
      setStep('otp');
      alert("Magic link sent to your email!");
    }
    setLoading(false);
  };

  const menuItems = [
    { label: "Home", icon: GraduationCap, href: "/" },
    { label: "AI Study Tutor", icon: Sparkles, href: "/ai-tutor", pro: true },
    { label: "AI Image Generator", icon: Image, href: "/ai-image", pro: true },
    { label: "AI Video Reel", icon: Video, href: "/ai-video", pro: true },
    { label: "Class 10 Notes", icon: BookOpen, href: "/notes" },
    { label: "Practice Quiz", icon: ClipboardCheck, href: "/quiz" },
    { label: "Imp Questions", icon: Brain, href: "/questions" },
    { label: "Study Tips", icon: Lightbulb, href: "/tips" },
    { label: "About Us", icon: Info, href: "/about" },
    { label: "Contact", icon: MessageSquare, href: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Animated Login Modal */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsLoginOpen(false)} className="absolute inset-0" />
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="bg-card w-full max-w-md rounded-[2.5rem] p-8 border shadow-2xl relative z-10">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-6 right-6 p-2 bg-secondary rounded-full transition-transform"
              >
                <X size={18} />
              </motion.button>

              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary rotate-3"
                >
                  <LogIn size={32} />
                </motion.div>
                <h2 className="text-2xl font-black">{step === 'email' ? 'Welcome!' : 'Check Email'}</h2>
                <p className="text-muted-foreground text-sm mt-2">Login to save your board exam progress</p>
              </div>

              <div className="space-y-4">
                {step === 'email' ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGoogleLogin}
                      className="w-full flex items-center justify-center gap-3 p-4 border-2 rounded-2xl bg-white text-black font-bold"
                    >
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="G" /> Google Login
                    </motion.button>
                    <div className="text-center text-[10px] font-bold opacity-30 tracking-widest uppercase">OR</div>
                    <motion.input
                      whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email dalo..."
                      className="w-full p-4 rounded-2xl border bg-secondary/30 outline-none focus:ring-2 ring-primary"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleEmailLogin}
                      disabled={loading}
                      className="w-full p-4 bg-primary text-white font-black rounded-2xl shadow-lg"
                    >
                      {loading ? 'Bheja ja raha hai...' : 'Next'}
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-4 bg-primary/5 rounded-2xl border border-primary/20"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Mail className="mx-auto mb-2 text-primary" />
                    </motion.div>
                    <p className="text-sm font-bold">Link sent to {email}. Email check karo aur click karo!</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Header */}
      <motion.header
        animate={{
          backdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none"
        }}
        className="fixed top-0 w-full z-50 glass border-b h-20 flex items-center bg-background/80 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg"
            >
              <GraduationCap size={24} />
            </motion.div>
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="font-black text-xl"
            >
              Class 10 <span className="text-primary">Hub</span>
            </motion.span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => supabase?.auth.signOut()}
                className="flex items-center gap-2 p-2 px-4 bg-secondary rounded-xl font-bold text-xs"
              >
                <LogOut size={16} /> Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-md"
              >
                <User size={18} /> Login
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92, rotate: 5 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 bg-secondary rounded-xl"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Menu size={24} />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 w-72 bg-card z-[70] border-l p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-black text-xl italic"
                >
                  Menu
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-secondary rounded-lg"
                >
                  <X size={20} />
                </motion.button>
              </div>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Link href={item.href}>
                      <motion.div
                        whileHover={{ x: 6, backgroundColor: location === item.href ? undefined : "rgba(99,102,241,0.05)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${location === item.href ? 'bg-primary text-white shadow-md shadow-primary/25' : 'hover:bg-primary/10'}`}
                      >
                        <motion.div
                          animate={location === item.href ? { rotate: [0, -10, 10, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <item.icon size={20} />
                        </motion.div>
                        <span className="font-bold text-sm">{item.label}</span>
                        {item.pro && (
                          <motion.span
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                          >
                            AI
                          </motion.span>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t space-y-4">
                <div className="flex justify-center gap-4">
                  <motion.a
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    href="https://instagram.com/class10toppper"
                    target="_blank"
                    className="p-3 bg-secondary rounded-full text-pink-500 hover:bg-primary hover:text-white transition-all"
                  >
                    <Instagram size={24} />
                  </motion.a>
                </div>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold opacity-40 uppercase">
                  <Link href="/privacy-policy">Privacy</Link>
                  <Link href="/disclaimer">Disclaimer</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-20">{children}</main>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 bg-card/50 border-t text-center"
      >
        <div className="container mx-auto px-4">
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
          >
            <AlertTriangle className="mx-auto mb-4 text-yellow-500 opacity-50" size={20} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold opacity-30 uppercase tracking-widest"
          >
            Target 2026 Board Exams
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex justify-center gap-4 items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            >
              <ShieldCheck size={16} className="text-primary opacity-50" />
            </motion.div>
            <span className="text-[10px] font-bold opacity-30">100% Safe & Secure Learning</span>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
