import React, { useState } from "react";
import { Link, useLocation } from "wouter";
// Agar file src/lib/supabase.ts mein hai toh ye try karo:
import { supabase } from "./supabase";

import { 
  Menu, X, GraduationCap, Instagram, User, Mail, Sparkles, 
  BookOpen, Brain, MessageSquare, Info, ShieldCheck, 
  AlertTriangle, Lightbulb, Download, ChevronRight, LogIn,
  ClipboardCheck, 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState("");
 
  // --- Functions ---

  const handleLoginAction = async () => {
  if (step === 'email') {
    // 1. Email par OTP bhejo
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: { shouldCreateUser: true } // Ye numeric OTP bhejega agar dashboard set hai
    });
    
    if (error) alert(error.message);
    else {
      setStep('otp');
      alert("6-digit OTP sent to " + email);
    }
  } else {
    // 2. OTP Verify karo (Maan lo otpValue aapne input se liya hai)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otpValue, // Jo bache ne type kiya
      type: 'signup' // Ya 'magiclink' depend karta hai dashboard settings par
    });

    if (error) alert("Invalid OTP!");
    else {
      alert("Login Success!");
      setIsLoginOpen(false);
    }
  }
};

  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // window.location.origin ka matlab hai ki jahan se login kiya wahi wapas jao
      redirectTo: window.location.origin 
    }
  });
  if (error) alert("Error: " + error.message);
};
  // 1. Pehle user state banao
const [user, setUser] = useState<any>(null);

// 2. Site khulte hi check karo ki koi login hai ya nahi
React.useEffect(() => {
  // Current session check karo
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
  });

  // Agar login/logout ho toh update karo
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
    if (session) setIsLoginOpen(false); // Login hote hi modal band kar do
  });

  return () => subscription.unsubscribe();
}, []);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      
      {/* Login Modal with Animations */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 50, opacity: 0 }}
              className="bg-card w-full max-w-md rounded-[2.5rem] p-8 border shadow-2xl relative overflow-hidden"
            >
              <button onClick={() => {setIsLoginOpen(false); setStep('email');}} className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-full transition-transform hover:rotate-90">
                <X size={20} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary rotate-3">
                  <LogIn size={32} />
                </div>
                <h2 className="text-2xl font-black">{step === 'email' ? 'Welcome Back!' : 'Check Email'}</h2>
                <p className="text-muted-foreground text-sm mt-2">{step === 'email' ? 'Login to save your progress' : `Enter OTP sent to ${email}`}</p>
              </div>

              <div className="space-y-4">
                {step === 'email' ? (
                  <>
                    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 p-4 border-2 rounded-2xl hover:bg-secondary transition-all font-bold group">
                      <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 group-hover:scale-110" /> 
                      Continue with Google
                    </button>
                    <div className="text-center text-xs opacity-50 font-bold tracking-widest">OR EMAIL</div>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full p-4 rounded-2xl border bg-secondary/20 outline-none focus:ring-2 ring-primary" />
                  </>
                ) : (
                  <input type="text" maxLength={6} placeholder="000000" className="w-full p-4 rounded-2xl border text-center text-2xl font-black tracking-widest bg-secondary/20 outline-none" />
                )}
                <button onClick={handleLoginAction} className="w-full p-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  {step === 'email' ? 'Send OTP' : 'Verify & Enter'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header / Navbar */}
      <header className="fixed top-0 w-full z-50 glass border-b h-20 flex items-center">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <GraduationCap size={24} />
            </div>
            <span className="font-black text-xl tracking-tight">Class 10 <span className="text-primary">Hub</span></span>
          </Link>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all active:scale-95">
              <User size={18} /> Login
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-secondary rounded-xl hover:bg-primary/10 transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
  {user ? (
    // Agar user login hai toh ye dikhao
    <div className="flex items-center gap-3">
      <span className="text-sm font-bold hidden md:block text-primary">Hi, {user.email.split('@')[0]}</span>
      <button 
        onClick={() => supabase.auth.signOut()} 
        className="px-4 py-2 bg-secondary rounded-xl font-bold text-xs hover:bg-destructive hover:text-white transition-colors"
      >
        Logout
      </button>
    </div>
  ) : (
    // Agar login nahi hai toh purana Login button
    <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md">
      <User size={18} /> Login
    </button>
  )}
  <button onClick={() => setIsMobileMenuOpen(true)} className="p-2.5 bg-secondary rounded-xl"><Menu size={24} /></button>
</div>

      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed inset-y-0 right-0 w-72 bg-card z-[70] border-l p-8 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-black text-xl italic text-primary underline underline-offset-4">Menu</h3>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-secondary rounded-lg hover:rotate-90 transition-transform"><X size={20} /></button>
              </div>
              <nav className="flex flex-col gap-2">
                {[
                  { label: "Home", icon: GraduationCap, href: "/" },
                  { label: "AI Tutor", icon: Sparkles, href: "/ai-tutor" },
                  { label: "Notes", icon: BookOpen, href: "/notes" },
                  { label: "Practice Quiz", icon: ClipboardCheck, href: "/quiz" },
                  { label: "About Us", icon: Info, href: "/about" },
                  { label: "Contact", icon: MessageSquare, href: "/contact" },
                ].map((item) => (
                  <Link key={item.label} href={item.href}>
                    <div onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/10 transition-all group">
                      <div className="flex items-center gap-4">
                        <item.icon size={20} className="text-primary group-hover:scale-110 transition-transform" />
                        <span className="font-bold">{item.label}</span>
                      </div>
                      <ChevronRight size={14} className="opacity-30" />
                    </div>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24">{children}</main>

      <footer className="bg-card border-t py-12 text-center">
        <div className="container mx-auto px-4">
          <p className="font-black italic mb-6 text-lg">"Consistent effort leads to the Top."</p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://www.instagram.com/class10toppper/" target="_blank" className="p-4 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform">
              <Instagram size={28} />
            </a>
          </div>
          <div className="flex justify-center gap-6 text-xs font-bold opacity-50 uppercase tracking-widest">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
