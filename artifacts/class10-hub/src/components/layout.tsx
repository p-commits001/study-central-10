import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  Menu, X, GraduationCap, Instagram, User, Mail, Sparkles, 
  BookOpen, Brain, MessageSquare, Info, ShieldCheck, 
  AlertTriangle, Lightbulb, Download, ChevronRight, LogIn,
  ClipboardCheck // ListChecks ki jagah ClipboardCheck use kiya hai jo safe hai
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState("");

  const handleLoginAction = () => {
    if(step === 'email') {
      if(!email) return alert("Bhai, pehle email toh dalo!");
      setStep('otp');
    } else {
      alert("Login Successful! (Abhi ye demo hai)");
      setIsLoginOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* --- Login Modal --- */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-md rounded-[2rem] p-8 border shadow-2xl relative"
            >
              <button onClick={() => {setIsLoginOpen(false); setStep('email');}} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full"><X size={20} /></button>
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black">{step === 'email' ? 'Welcome Back!' : 'Enter OTP'}</h2>
                <p className="text-muted-foreground text-sm mt-2">{step === 'email' ? 'Login to Class 10 Hub' : `Sent to ${email}`}</p>
              </div>

              <div className="space-y-4">
                {step === 'email' ? (
                  <>
                    <button onClick={() => alert("Google Login ke liye Firebase/Supabase connect karna hoga.")} className="w-full flex items-center justify-center gap-3 p-4 border rounded-2xl hover:bg-secondary transition-all font-bold">
                      <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" /> Google Login
                    </button>
                    <div className="text-center text-xs opacity-50 font-bold">OR</div>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email dalo..." className="w-full p-4 rounded-2xl border bg-secondary/20 outline-none focus:ring-2 ring-primary" />
                  </>
                ) : (
                  <input type="text" maxLength={6} placeholder="OTP Bharo" className="w-full p-4 rounded-2xl border text-center text-xl font-bold bg-secondary/20" />
                )}
                <button onClick={handleLoginAction} className="w-full p-4 bg-primary text-white font-black rounded-2xl shadow-lg">
                  {step === 'email' ? 'Next' : 'Verify'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Navbar (Header) --- */}
      <header className="fixed top-0 w-full z-50 glass border-b h-20 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white"><GraduationCap size={24} /></div>
            <span className="font-black text-xl">Class 10 <span className="text-primary">Hub</span></span>
          </Link>

          <div className="flex items-center gap-3">
            {/* LOGIN BUTTON FIXED */}
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">
              <User size={18} /> Login
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-secondary rounded-xl">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Sidebar Menu (FIXED) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-y-0 right-0 w-72 bg-card z-[70] border-l p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-xl">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-secondary rounded-lg"><X size={20} /></button>
              </div>
              
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Home", icon: GraduationCap, href: "/" },
                  { label: "Notes", icon: BookOpen, href: "/notes" },
                  { label: "AI Tutor", icon: Sparkles, href: "/ai-tutor" },
                  { label: "Practice Quiz", icon: ClipboardCheck, href: "/quiz" },
                  { label: "Important Qs", icon: Brain, href: "/questions" },
                  { label: "Study Tips", icon: Lightbulb, href: "/tips" },
                  { label: "Resources", icon: Download, href: "/resources" },
                  { label: "About", icon: Info, href: "/about" },
                  { label: "Contact", icon: MessageSquare, href: "/contact" },
                  { label: "Privacy", icon: ShieldCheck, href: "/privacy-policy" },
                  { label: "Disclaimer", icon: AlertTriangle, href: "/disclaimer" },
                ].map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-3.5 rounded-xl hover:bg-primary/10 transition-all cursor-pointer">
                      <item.icon size={20} className="text-primary" />
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24">{children}</main>

      {/* --- Footer --- */}
      <footer className="bg-card border-t py-12 text-center">
        <div className="container mx-auto px-4">
          <p className="font-black italic mb-6">"Consistency is the key to Success."</p>
          <a href="https://www.instagram.com/class10toppper/" target="_blank" className="inline-block p-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full mb-8 shadow-lg">
            <Instagram size={28} />
          </a>
          <div className="flex justify-center gap-6 text-xs font-bold opacity-50 uppercase tracking-widest">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
