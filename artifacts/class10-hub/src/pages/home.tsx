import { useState, useEffect } from "react";
import { CURRENT_SESSION } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Brain, Download, Lightbulb, ArrowRight, Target, Flame, Sparkles, Clock, CheckCircle2, Trash2, Plus, Calculator, FlaskConical, Video } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, scaleIn, popIn, viewportOnce } from "@/lib/animations";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

const features = [
  { title: "Subject Notes", description: "Detailed, chapter-wise notes for all major subjects.", icon: BookOpen, path: "/notes", color: "from-blue-500 to-indigo-500", bgLight: "bg-blue-50 dark:bg-blue-950/30", emoji: "📚" },
  { title: "Important Q's", description: "Curated questions with a built-in progress tracker.", icon: Brain, path: "/questions", color: "from-violet-500 to-purple-500", bgLight: "bg-violet-50 dark:bg-violet-950/30", emoji: "🧠" },
  { title: "PDF Downloads", description: "Sample papers and NCERT solutions in PDF format.", icon: Download, path: "/pdfs", color: "from-emerald-500 to-teal-500", bgLight: "bg-emerald-50 dark:bg-emerald-950/30", emoji: "📥" },
  { title: "Study Tips", description: "Proven techniques to maximize your study efficiency.", icon: Lightbulb, path: "/tips", color: "from-orange-500 to-amber-500", bgLight: "bg-orange-50 dark:bg-orange-950/30", emoji: "💡" },
];

const BOARD_DATE = new Date("2027-02-15T00:00:00");

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = BOARD_DATE.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);
  return timeLeft;
}

const PLANNER_KEY = "class10hub_tasks";

interface Task { id: string; text: string; done: boolean; }

function loadTasks(): Task[] {
  try { return JSON.parse(localStorage.getItem(PLANNER_KEY) || "[]"); } catch { return []; }
}

function saveTasks(tasks: Task[]) {
  try { localStorage.setItem(PLANNER_KEY, JSON.stringify(tasks)); } catch { }
}

const MINI_QUIZ = [
  { q: "Ohm's Law formula is:", a: "V = IR", options: ["V = IR", "V = I/R", "V = R/I", "I = VR"] },
  { q: "Sum of angles in a triangle is:", a: "180°", options: ["90°", "180°", "270°", "360°"] },
  { q: "The process by which plants make food using sunlight is:", a: "Photosynthesis", options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"] },
];

export default function Home() {
  useSEO(SEO_DATA.home);
  const countdown = useCountdown();
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [newTask, setNewTask] = useState("");
  const [miniQ, setMiniQ] = useState(0);
  const [miniAns, setMiniAns] = useState<string | null>(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { id: Date.now().toString(), text: newTask.trim(), done: false }];
    setTasks(updated); saveTasks(updated); setNewTask("");
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setTasks(updated); saveTasks(updated);
  };

  const deleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated); saveTasks(updated);
  };

  const handleMiniSelect = (opt: string) => {
    setMiniAns(opt);
    setTimeout(() => {
      if (opt === MINI_QUIZ[miniQ].a) {
        setTimeout(() => { setMiniQ(q => (q + 1) % MINI_QUIZ.length); setMiniAns(null); }, 1200);
      } else {
        setTimeout(() => setMiniAns(null), 1500);
      }
    }, 300);
  };

  const q = MINI_QUIZ[miniQ];
  const done = tasks.filter(t => t.done).length;

  return (
    <div className="container mx-auto px-4 md:px-6">

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(249,115,22,0.25)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-2xl mb-6 mt-6 shadow-xl flex justify-between items-center cursor-pointer"
        onClick={() => window.location.href = '/recommended-books'}
      >
        <div className="flex items-center gap-3">
          <motion.span animate={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl">📚</motion.span>
          <div>
            <h3 className="font-bold text-sm md:text-base">Board Exam Special!</h3>
            <p className="text-xs opacity-90">Best Class 10 Books (40% OFF)</p>
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
          Check Price
        </motion.button>
      </motion.div>

      {/* ═══ BOARD EXAM 2026 COUNTDOWN ═══ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 22 }}
        className="mb-8"
      >
        <div className="relative bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 rounded-3xl p-6 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            {[...Array(6)].map((_, i) => (
              <motion.div key={i}
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                className="absolute text-lg"
                style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 2) * 40}%` }}>
                {["⏰", "📝", "🎯", "📐", "🔬", "📚"][i]}
              </motion.div>
            ))}
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-2xl">⏳</motion.div>
              <div>
                <h2 className="text-white font-black text-xl md:text-2xl">Board Exam 2027 Countdown</h2>
                <p className="text-white/80 text-xs">CBSE Class 10 · February 15, 2027 (Estimated)</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { val: countdown.days, label: "Days" },
                { val: countdown.hours, label: "Hours" },
                { val: countdown.minutes, label: "Minutes" },
                { val: countdown.seconds, label: "Seconds" },
              ].map(({ val, label }) => (
                <motion.div key={label} className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center border border-white/30">
                  <motion.div
                    key={val}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl md:text-4xl font-black text-white tabular-nums"
                  >
                    {String(val).padStart(2, "0")}
                  </motion.div>
                  <div className="text-white/70 text-[10px] font-bold uppercase mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ width: 0 }} animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.max(5, 100 - (countdown.days / 365) * 100)}%` }}
              />
            </motion.div>
            <p className="text-white/70 text-xs mt-2 text-center">
              {countdown.days > 0 ? `${countdown.days} din baaki — ab se padho!` : "Exam has arrived! Best of luck! 🎉"}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex-1 text-center lg:text-left space-y-6">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium text-sm mb-2">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Flame className="text-orange-500" size={16} />
            </motion.div>
            <span>Targeting {CURRENT_SESSION} Board Exams</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight text-foreground">
            The All-in-One <br />
            <span className="text-gradient-animated">Class 10</span> Study Platform
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Stop searching multiple sites. Get perfectly structured notes, most expected questions, and premium study materials—all in one beautiful place.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Link href="/notes">
              <motion.button whileHover={{ scale: 1.05, y: -2, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl cursor-pointer flex items-center justify-center gap-2">
                Start Studying
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}><ArrowRight size={20} /></motion.div>
              </motion.button>
            </Link>
            <Link href="/questions">
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border-2 border-border hover:border-primary/50 hover:bg-secondary transition-colors cursor-pointer flex items-center justify-center gap-2">
                <Target size={20} /> Practice Questions
              </motion.button>
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-2">
            {["✅ Free Forever", "📱 Mobile Friendly", "🎯 Board Focused", "🤖 AI Powered"].map((badge, i) => (
              <motion.span key={badge} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="text-xs font-semibold bg-secondary px-3 py-1.5 rounded-full border border-border">{badge}</motion.span>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-primary/10 animate-pulse-ring" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-accent/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            </div>
            <motion.img animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              alt="Class 10 Education Abstract" className="object-contain w-full h-full drop-shadow-2xl rounded-3xl relative z-10"
              src="/images/hero-abstract.png" />
            <motion.div animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-6 right-8 text-yellow-400"><Sparkles size={24} /></motion.div>
            <motion.div animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-8 text-primary"><Sparkles size={18} /></motion.div>
          </div>
        </motion.div>
      </section>

      {/* AdSense */}
      <div className="container mx-auto px-4 my-8 flex justify-center">
        <ins className="adsbygoogle" style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-1922010090842018" data-ad-slot="7029376227"
          data-ad-format="auto" data-full-width-responsive="true"></ins>
      </div>
      <script>{`(window.adsbygoogle = window.adsbygoogle || []).push({});`}</script>

      {/* Features Grid */}
      <section className="py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore Sections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need organized perfectly to save your time and boost your marks.</p>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.path}>
              <motion.div variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="group h-full bg-card rounded-3xl p-6 border border-border hover:border-primary/30 shadow-lg shadow-black/5 transition-colors duration-300 cursor-pointer relative overflow-hidden flex flex-col">
                <div className={`absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />
                <motion.div whileHover={{ scale: 1.15, rotate: 6 }} transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6`}>
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    <feature.icon size={28} className="text-current" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
                <motion.div initial={{ opacity: 0, x: -10 }} whileHover={{ opacity: 1, x: 0 }} className="mt-6 flex items-center font-semibold text-sm text-primary">
                  Explore <ArrowRight size={16} className="ml-1" />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* ═══ AI TOOLS SECTION ═══ */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">🤖 AI Powered Tools</h2>
          <p className="text-muted-foreground">Free AI tools designed specially for Class 10 students</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { href: "/ai-tutor", emoji: "🤖", title: "AI Study Tutor", desc: "Ask any CBSE question — instant step-by-step answers", color: "from-indigo-500 to-purple-600", tag: "Chat AI" },
            { href: "/ai-image", emoji: "🎨", title: "AI Diagram Maker", desc: "Generate educational diagrams for Science & Maths", color: "from-violet-500 to-pink-500", tag: "Image AI" },
            { href: "/ai-video", emoji: "🎬", title: "AI Reel Maker", desc: "Create animated study reels with cartoon characters", color: "from-pink-500 to-orange-500", tag: "Video AI" },
          ].map((tool, i) => (
            <Link key={tool.title} href={tool.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }} whileTap={{ scale: 0.97 }}
                className="group relative bg-card border border-border rounded-3xl p-6 cursor-pointer overflow-hidden h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} className="text-4xl">{tool.emoji}</motion.div>
                    <span className={`text-xs font-black px-2 py-1 rounded-full bg-gradient-to-r ${tool.color} text-white`}>{tool.tag}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 group-hover:text-primary transition-colors">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-primary font-semibold text-sm">Try Free <ArrowRight size={14} /></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ═══ DAILY QUIZ WIDGET ═══ */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="py-10">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Mini Quiz */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }} className="text-2xl">🎯</motion.div>
                <div>
                  <h3 className="font-black text-lg">Quick Quiz</h3>
                  <p className="text-white/70 text-xs">1-minute challenge</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <p className="font-semibold text-sm mb-3">{q.q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map(opt => {
                    const isCorrect = opt === q.a;
                    const isSelected = miniAns === opt;
                    return (
                      <motion.button key={opt} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        onClick={() => handleMiniSelect(opt)} disabled={miniAns !== null}
                        className={`p-2 rounded-xl text-xs font-bold text-left transition-all ${
                          miniAns ? isCorrect ? "bg-green-400 text-white" : isSelected ? "bg-red-400 text-white" : "bg-white/10" : "bg-white/20 hover:bg-white/30"
                        }`}>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
                <AnimatePresence>
                  {miniAns && (
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className={`mt-2 text-xs font-bold ${miniAns === q.a ? "text-green-300" : "text-red-300"}`}>
                      {miniAns === q.a ? "✅ Sahi jawab! Next question aa raha hai..." : `❌ Wrong! Sahi hai: ${q.a}`}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/quiz">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="w-full py-3 rounded-2xl bg-white text-indigo-600 font-black text-sm">
                  Full 10-Question Quiz →
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Daily Study Planner */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-2xl">📋</motion.div>
              <div>
                <h3 className="font-black text-lg">Daily Study Planner</h3>
                <p className="text-muted-foreground text-xs">{done}/{tasks.length} completed · Saved locally</p>
              </div>
            </div>

            {/* Progress bar */}
            {tasks.length > 0 && (
              <div className="h-2 bg-secondary rounded-full mb-4 overflow-hidden">
                <motion.div
                  animate={{ width: `${(done / tasks.length) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
              </div>
            )}

            {/* Task list */}
            <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
              <AnimatePresence>
                {tasks.length === 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-muted-foreground text-sm text-center py-4">
                    Aaj kya padhna hai? Add karo! 📝
                  </motion.p>
                )}
                {tasks.map(task => (
                  <motion.div key={task.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 15 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/50 group">
                    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.85 }} onClick={() => toggleTask(task.id)}
                      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${task.done ? "bg-primary border-primary" : "border-muted-foreground/40"}`}>
                      {task.done && <CheckCircle2 size={12} className="text-white" />}
                    </motion.button>
                    <span className={`text-sm flex-1 transition-all ${task.done ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
                    <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all">
                      <Trash2 size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add task */}
            <div className="flex gap-2">
              <input
                value={newTask} onChange={e => setNewTask(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") addTask(); }}
                placeholder="Task add karo... (e.g., Maths Ch.1)"
                className="flex-1 bg-secondary/50 rounded-xl px-3 py-2 text-sm outline-none border border-border focus:border-primary/50 transition-colors"
              />
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={addTask}
                className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Plus size={16} />
              </motion.button>
            </div>
            {tasks.length > 0 && done === tasks.length && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mt-3 p-2 bg-green-50 dark:bg-green-950/20 rounded-xl text-center text-xs font-bold text-green-600 dark:text-green-400">
                🎉 Sab tasks complete! Tu ek champion hai!
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="py-16 text-center">
        <motion.div whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-10 border border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-60px] left-[-60px] w-48 h-48 bg-primary/10 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute bottom-[-60px] right-[-60px] w-48 h-48 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-5xl mb-4">🚀</motion.div>
          <h2 className="text-3xl font-display font-bold mb-3">Ready to Score 95%+?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Join thousands of Class 10 students preparing smarter with Class 10 Hub.</p>
          <Link href="/quiz">
            <motion.button whileHover={{ scale: 1.06, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }} whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl">
              Take the Daily Quiz →
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
