import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { supabase } from "./supabase";
import {
  Menu, X, GraduationCap, Instagram, User, Sparkles,
  BookOpen, Brain, MessageSquare, Info, ShieldCheck,
  AlertTriangle, Lightbulb, Download, ChevronRight, LogIn,
  ClipboardCheck, LogOut, Mail, Image, Video, Phone, Smartphone
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

type LoginTab = "google" | "email" | "phone";
type LoginStep = "input" | "otp" | "success";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [tab, setTab] = useState<LoginTab>("google");
  const [step, setStep] = useState<LoginStep>("input");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      if (session) { setIsLoginOpen(false); setStep("input"); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const resetModal = () => {
    setTab("google"); setStep("input");
    setEmail(""); setPhone(""); setOtp(""); setError("");
  };

  const handleGoogleLogin = async () => {
    if (!supabase) return setError("Login setup nahi hai. Admin se contact karo.");
    setLoading(true); setError("");
    const redirectTo = window.location.href.includes("netlify")
      ? "https://study-central-10.pages.dev"
      : window.location.origin;
    const { error: e } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { access_type: "offline", prompt: "consent" }
      }
    });
    if (e) setError("Google login mein dikkat aayi: " + e.message);
    setLoading(false);
  };

  const handleEmailOTP = async () => {
    if (!supabase) return setError("Login setup nahi hai.");
    if (!email.trim()) return setError("Email dalo please!");
    if (!/\S+@\S+\.\S+/.test(email.trim())) return setError("Sahi email format dalo (ex: abc@gmail.com)");
    setLoading(true); setError("");
    const { error: e } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.href.includes("netlify")
          ? "https://study-central-10.pages.dev"
          : window.location.origin,
        shouldCreateUser: true
      }
    });
    if (e) setError("Email bhejne mein dikkat: " + e.message);
    else setStep("otp");
    setLoading(false);
  };

  const handleVerifyEmailOTP = async () => {
    if (!supabase) return setError("Login setup nahi hai.");
    if (!otp.trim() || otp.length < 4) return setError("OTP ya code dalo please!");
    setLoading(true); setError("");
    const { error: e } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: otp.trim(),
      type: "email"
    });
    if (e) setError("OTP galat hai ya expire ho gaya. Dobara try karo.");
    else setStep("success");
    setLoading(false);
  };

  const handlePhoneOTP = async () => {
    if (!supabase) return setError("Login setup nahi hai.");
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) return setError("10 digit ka valid mobile number dalo!");
    setLoading(true); setError("");
    const formatted = `+91${cleaned.slice(-10)}`;
    const { error: e } = await supabase.auth.signInWithOtp({ phone: formatted });
    if (e) {
      setError("OTP bhejne mein dikkat: " + e.message);
    } else setStep("otp");
    setLoading(false);
  };

  const handleVerifyPhoneOTP = async () => {
    if (!supabase) return setError("Login setup nahi hai.");
    if (!otp.trim() || otp.length < 4) return setError("OTP dalo please!");
    setLoading(true); setError("");
    const formatted = `+91${phone.replace(/\D/g, "").slice(-10)}`;
    const { error: e } = await supabase.auth.verifyOtp({ phone: formatted, token: otp.trim(), type: "sms" });
    if (e) setError("OTP galat hai ya expire ho gaya. " + e.message);
    else setStep("success");
    setLoading(false);
  };

  const menuItems = [
    { label: "Home", icon: GraduationCap, href: "/" },
    { label: "AI Study Tutor", icon: Sparkles, href: "/ai-tutor", pro: true },
    { label: "AI Image Generator", icon: Image, href: "/ai-image", pro: true },
    { label: "AI Reel Maker", icon: Video, href: "/ai-video-summarizer", pro: true },
    { label: "Class 10 Notes", icon: BookOpen, href: "/notes" },
    { label: "Practice Quiz", icon: ClipboardCheck, href: "/quiz" },
    { label: "Imp Questions", icon: Brain, href: "/questions" },
    { label: "Study Tips", icon: Lightbulb, href: "/tips" },
    { label: "About Us", icon: Info, href: "/about" },
    { label: "Contact", icon: MessageSquare, href: "/contact" },
  ];

  const TABS: { id: LoginTab; label: string; icon: React.ElementType }[] = [
    { id: "google", label: "Google", icon: User },
    { id: "email", label: "Email", icon: Mail },
    { id: "phone", label: "Mobile", icon: Smartphone },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ══ Login Modal ══ */}
      <AnimatePresence>
        {isLoginOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setIsLoginOpen(false); resetModal(); }} className="absolute inset-0" />
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
              className="bg-card w-full max-w-sm rounded-[2rem] p-6 border shadow-2xl relative z-10">

              {/* Close */}
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                onClick={() => { setIsLoginOpen(false); resetModal(); }}
                className="absolute top-5 right-5 p-2 bg-secondary rounded-full">
                <X size={16} />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-5">
                <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-primary">
                  <LogIn size={28} />
                </motion.div>
                <h2 className="text-xl font-black">
                  {step === "success" ? "🎉 Login Ho Gaya!" : "Welcome to Class 10 Hub"}
                </h2>
                <p className="text-muted-foreground text-xs mt-1">Board exam progress save karo</p>
              </div>

              <AnimatePresence mode="wait">

                {/* Success */}
                {step === "success" && (
                  <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-6">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-5xl mb-3">🏆</motion.div>
                    <p className="font-bold text-green-600 dark:text-green-400">Tu ab logged in hai!</p>
                    <p className="text-sm text-muted-foreground mt-1">Padhai shuru karo 📚</p>
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      onClick={() => { setIsLoginOpen(false); resetModal(); }}
                      className="mt-4 w-full py-3 rounded-2xl bg-primary text-white font-bold">Close</motion.button>
                  </motion.div>
                )}

                {/* Tab input */}
                {step === "input" && (
                  <motion.div key="input" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

                    {/* Tabs */}
                    <div className="flex gap-1 bg-secondary rounded-2xl p-1 mb-5">
                      {TABS.map(t => (
                        <motion.button key={t.id} whileTap={{ scale: 0.95 }} onClick={() => { setTab(t.id); setError(""); }}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${tab === t.id ? "bg-card shadow-md text-primary" : "text-muted-foreground"}`}>
                          <t.icon size={13} /> {t.label}
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">

                      {/* Google tab */}
                      {tab === "google" && (
                        <motion.div key="google-tab" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                          <motion.button whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }} whileTap={{ scale: 0.97 }}
                            onClick={handleGoogleLogin} disabled={loading}
                            className="w-full flex items-center justify-center gap-3 p-4 border-2 rounded-2xl bg-white text-black font-bold hover:bg-gray-50 transition-colors disabled:opacity-50">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />
                            {loading ? "Logging in..." : "Continue with Google"}
                          </motion.button>
                          <p className="text-center text-xs text-muted-foreground">
                            Ya Email ya Mobile se login karo 👇
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab("email")}
                              className="py-3 rounded-2xl border-2 border-primary/30 bg-primary/5 text-primary font-bold text-sm flex items-center justify-center gap-2">
                              <Mail size={15} /> Email
                            </motion.button>
                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setTab("phone")}
                              className="py-3 rounded-2xl border-2 border-violet-300 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 font-bold text-sm flex items-center justify-center gap-2">
                              <Smartphone size={15} /> Mobile
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {/* Email tab */}
                      {tab === "email" && (
                        <motion.div key="email-tab" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                          <div className="text-center text-sm text-muted-foreground mb-2">
                            Email par magic link bhejenge ✉️
                          </div>
                          <motion.input whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                            type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                            onKeyDown={e => e.key === "Enter" && handleEmailOTP()}
                            placeholder="apna@email.com"
                            className="w-full p-3.5 rounded-2xl border bg-secondary/30 outline-none focus:ring-2 ring-primary text-sm" />
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={handleEmailOTP} disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50">
                            {loading ? "Bheja ja raha hai..." : "Magic Link Bhejo ✨"}
                          </motion.button>
                        </motion.div>
                      )}

                      {/* Phone tab */}
                      {tab === "phone" && (
                        <motion.div key="phone-tab" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-3">
                          <div className="text-center text-sm text-muted-foreground mb-2">
                            Mobile par OTP bhejenge 📱
                          </div>
                          <div className="flex gap-2">
                            <div className="bg-secondary rounded-2xl px-3 py-3.5 text-sm font-bold border border-border shrink-0 flex items-center gap-1">
                              🇮🇳 +91
                            </div>
                            <motion.input whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                              type="tel" value={phone} onChange={e => { setPhone(e.target.value.replace(/\D/g, "")); setError(""); }}
                              onKeyDown={e => e.key === "Enter" && handlePhoneOTP()}
                              placeholder="10 digit number"
                              maxLength={10}
                              className="flex-1 p-3.5 rounded-2xl border bg-secondary/30 outline-none focus:ring-2 ring-primary text-sm" />
                          </div>
                          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            onClick={handlePhoneOTP} disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50">
                            {loading ? "OTP bheja ja raha hai..." : "OTP Bhejo 📲"}
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Error */}
                    {error && (
                      <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        className="mt-3 text-red-500 text-xs text-center font-medium bg-red-50 dark:bg-red-950/20 rounded-xl p-2">{error}</motion.p>
                    )}
                  </motion.div>
                )}

                {/* OTP Verification step */}
                {step === "otp" && (
                  <motion.div key="otp-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">

                    {tab === "email" ? (
                      <>
                        <div className="text-center">
                          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1, repeat: Infinity }}><Mail className="mx-auto mb-2 text-primary" size={32} /></motion.div>
                          <p className="text-sm font-bold">Email bheja gaya! ✉️</p>
                          <p className="text-xs text-muted-foreground mt-1">{email} par OTP ya magic link check karo</p>
                        </div>
                        <motion.input whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                          type="number" value={otp} onChange={e => { setOtp(e.target.value); setError(""); }}
                          onKeyDown={e => e.key === "Enter" && handleVerifyEmailOTP()}
                          placeholder="6-digit OTP dalo"
                          className="w-full p-3.5 rounded-2xl border bg-secondary/30 outline-none focus:ring-2 ring-primary text-center text-xl font-bold tracking-widest" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handleVerifyEmailOTP} disabled={loading}
                          className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50">
                          {loading ? "Verify ho raha hai..." : "Verify OTP ✅"}
                        </motion.button>
                        <p className="text-center text-xs text-muted-foreground">Ya email mein aaye magic link pe click karo</p>
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-3xl mb-2">📱</motion.div>
                          <p className="text-sm font-bold">OTP aaya hoga</p>
                          <p className="text-xs text-muted-foreground">+91 {phone.slice(-10)} pe SMS check karo</p>
                        </div>
                        <motion.input whileFocus={{ boxShadow: "0 0 0 3px rgba(99,102,241,0.2)" }}
                          type="number" value={otp} onChange={e => { setOtp(e.target.value); setError(""); }}
                          onKeyDown={e => e.key === "Enter" && handleVerifyPhoneOTP()}
                          placeholder="6-digit OTP dalo"
                          className="w-full p-3.5 rounded-2xl border bg-secondary/30 outline-none focus:ring-2 ring-primary text-center text-xl font-bold tracking-widest" />
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handleVerifyPhoneOTP} disabled={loading}
                          className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50">
                          {loading ? "Verify ho raha hai..." : "Verify OTP ✅"}
                        </motion.button>
                      </>
                    )}

                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-red-500 text-xs text-center font-medium bg-red-50 dark:bg-red-950/20 rounded-xl p-2">{error}</motion.p>
                    )}

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => { setStep("input"); setOtp(""); setError(""); }}
                      className="w-full py-2.5 rounded-2xl bg-secondary text-muted-foreground text-sm font-medium">
                      ← Wapas jao
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Privacy note */}
              {step === "input" && (
                <p className="text-center text-[10px] text-muted-foreground mt-4 opacity-60">
                  🔒 Tera data safe hai · No spam · Free forever
                </p>
              )}
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
            <motion.div whileHover={{ rotate: 12, scale: 1.1 }} whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={24} />
            </motion.div>
            <motion.span whileHover={{ scale: 1.02 }} className="font-black text-xl">
              Class 10 <span className="text-primary">Hub</span>
            </motion.span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => supabase?.auth.signOut()}
                className="flex items-center gap-2 p-2 px-4 bg-secondary rounded-xl font-bold text-xs">
                <LogOut size={16} /> Logout
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(99,102,241,0.3)" }} whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-md">
                <User size={18} /> Login
              </motion.button>
            )}
            <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92, rotate: 5 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 bg-secondary rounded-xl">
              <motion.div animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }} transition={{ type: "spring", stiffness: 300 }}>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-[60]" />
            <motion.div variants={sidebarVariants} initial="closed" animate="open" exit="closed"
              className="fixed inset-y-0 right-0 w-72 bg-card z-[70] border-l p-8 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <motion.h3 initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                  className="font-black text-xl italic">Menu</motion.h3>
                <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-secondary rounded-lg">
                  <X size={20} />
                </motion.button>
              </div>
              <nav className="flex flex-col gap-1">
                {menuItems.map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, type: "spring", stiffness: 300, damping: 25 }}>
                    <Link href={item.href}>
                      <motion.div whileHover={{ x: 6, backgroundColor: location === item.href ? undefined : "rgba(99,102,241,0.05)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${location === item.href ? "bg-primary text-white shadow-md shadow-primary/25" : "hover:bg-primary/10"}`}>
                        <motion.div animate={location === item.href ? { rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5 }}>
                          <item.icon size={20} />
                        </motion.div>
                        <span className="font-bold text-sm">{item.label}</span>
                        {item.pro && (
                          <motion.span animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            className="ml-auto text-[9px] font-black px-1.5 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
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
                  <motion.a whileHover={{ scale: 1.15, rotate: 5 }} whileTap={{ scale: 0.9 }}
                    href="https://instagram.com/class10toppper" target="_blank"
                    className="p-3 bg-secondary rounded-full text-pink-500 hover:bg-primary hover:text-white transition-all">
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

      <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="py-12 bg-card/50 border-t text-center">
        <div className="container mx-auto px-4">
          <motion.div animate={{ rotate: [0, -5, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}>
            <AlertTriangle className="mx-auto mb-4 text-yellow-500 opacity-50" size={20} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-xs font-bold opacity-30 uppercase tracking-widest">
            Target 2026-2027 Board Exams
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="mt-4 flex justify-center gap-4 items-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}>
              <ShieldCheck size={16} className="text-primary opacity-50" />
            </motion.div>
            <span className="text-[10px] font-bold opacity-30">100% Safe & Secure Learning</span>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
