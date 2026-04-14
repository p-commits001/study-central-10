import { motion } from "framer-motion";
import { Link } from "wouter";
import { AlertTriangle, CheckCircle2, BookOpen, ArrowRight, Lightbulb, ExternalLink, Calendar, Target } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const COMMON_MISTAKES = [
  {
    number: "01",
    title: "NCERT ko ignore karna",
    emoji: "📖",
    problem: "Bahut saare bacche guide books aur coaching notes pe depend karte hain aur NCERT ko 'boring' samajhte hain.",
    solution: "CBSE board exam mein 80-90% questions seedhe NCERT se aate hain. Pehle NCERT complete karo — PHIR guide books use karo sirf practice ke liye.",
    color: "border-red-500/30 bg-red-50 dark:bg-red-950/20",
    badgeColor: "bg-red-500",
  },
  {
    number: "02",
    title: "Shuru mein bahut zyada chapters chhodna",
    emoji: "⏭️",
    problem: "Class 9 se topic samajh nahi aaya toh Class 10 mein aake woh chapter skip kar dete hain — 'baad mein padhunga' soch ke.",
    solution: "Board mein har chapter se questions aate hain. Ek bhi chapter skip karna risky hai. Weak chapters list banao aur unhe pehle clear karo.",
    color: "border-orange-500/30 bg-orange-50 dark:bg-orange-950/20",
    badgeColor: "bg-orange-500",
  },
  {
    number: "03",
    title: "Sirf padhna, practice nahi karna",
    emoji: "📝",
    problem: "Ek baat jaante hain toh likhna alag baat hai. Bahut bacche padhte bahut hain par likhte kam hain.",
    solution: "Har chapter ke baad important questions haath se likho. Board mein likhna hoga toh practice zaruri hai. Roz kam se kam 30 min writing practice karo.",
    color: "border-yellow-500/30 bg-yellow-50 dark:bg-yellow-950/20",
    badgeColor: "bg-yellow-500",
  },
  {
    number: "04",
    title: "Social media aur phone distraction",
    emoji: "📱",
    problem: "Instagram Reels, YouTube Shorts — bachon ka sabse bada dushman. 1 minute dekhne ki soch ke ghante nikal jaate hain.",
    solution: "Study ke waqt phone doosre kamre mein rakho. Screen time apps use karo. Ek rule: Padhai complete, THEN phone. Sirf 1-2 ghante daily.",
    color: "border-pink-500/30 bg-pink-50 dark:bg-pink-950/20",
    badgeColor: "bg-pink-500",
  },
  {
    number: "05",
    title: "Revision nahi karna",
    emoji: "🔄",
    problem: "Ek baar padh ke sochte hain sab yaad rahega. Board ke waqt tak sab bhool jaate hain.",
    solution: "Spaced repetition use karo: Aaj padha → kal revise → 1 week baad revise → 1 month baad revise. Revision se hi marks milte hain!",
    color: "border-purple-500/30 bg-purple-50 dark:bg-purple-950/20",
    badgeColor: "bg-purple-500",
  },
];

const FIRST_WEEK_PLAN = [
  { day: "Day 1-2", action: "NCERT textbooks collect karo (saare 5 subjects)", icon: BookOpen },
  { day: "Day 3-4", action: "Har subject ka syllabus dekho — chapters list banao", icon: Target },
  { day: "Day 5", action: "Study timetable banao (realistic — 4-6 hours daily)", icon: Calendar },
  { day: "Day 6-7", action: "Har subject ka Chapter 1 start karo — slowly, clearly", icon: CheckCircle2 },
];

const NCERT_ORDER = [
  { subject: "Mathematics", order: "Real Numbers → Polynomials → Linear Equations → Quadratic Eq. → AP → Triangles → Coord. Geometry → Trig → Circles → Surface Areas → Stats → Probability", emoji: "📐" },
  { subject: "Science", order: "Chemical Reactions → Acids & Bases → Metals → Carbon → Life Processes → Control & Coordination → Reproduction → Heredity → Light → Human Eye → Electricity → Magnetic Effects → Environment", emoji: "🔬" },
  { subject: "Social Science", order: "History (Ch1-5) → Geography (Ch1-7) → Political Science (Ch1-8) → Economics (Ch1-5) — Do in parallel, not one at a time", emoji: "🌍" },
  { subject: "English", order: "First Flights (all chapters) → Footprints Without Feet → Grammar (tenses, voice, narration, editing)", emoji: "📚" },
  { subject: "Hindi", order: "Sparsh/Kshitiz → Sanchayan/Kritika → Grammar (rachna, anuched, patra)", emoji: "🖊️" },
];

export default function StartClass10() {
  useSEO({
    title: "Class 10 Mein Kaise Shuruat Karein — 5 Galtiyan Jo Avoid Karein 2026-27",
    description: "9th se 10th mein aaye ho? In 5 galtiyon se bacho jo bache karte hain. NCERT kaise padhni hai, timetable kaise banaye, aur board exam 2027 ki perfect shuruat kaise karein.",
    keywords: "class 10 kaise shuru kare, class 10 preparation tips hindi, 9th to 10th tips, class 10 shuruat kaise kare, CBSE class 10 beginner guide 2026-27",
    canonical: "/start-class-10",
  });

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-5xl py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 font-bold text-sm mb-4">
          <AlertTriangle className="w-4 h-4" /> April Special Guide
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-extrabold mb-4">
          🚀 Class 10 Kaise Start Karein?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          9th se 10th mein aaye ho? Congratulations! Ab serious hone ka waqt hai. Yeh 5 galtiyan sabse zyada bacche karte hain — inse bacho!
        </p>
      </motion.div>

      <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <AlertTriangle className="text-red-500" /> 5 Common Galtiyan — Bilkul Mat Karna
        </h2>
        <div className="space-y-5">
          {COMMON_MISTAKES.map((mistake) => (
            <motion.div key={mistake.number} variants={fadeUp}
              className={`border rounded-2xl p-6 ${mistake.color}`}>
              <div className="flex items-start gap-4">
                <div className={`${mistake.badgeColor} text-white font-bold text-sm px-3 py-1 rounded-full flex-shrink-0`}>{mistake.number}</div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                    <span>{mistake.emoji}</span> {mistake.title}
                  </h3>
                  <div className="mb-3">
                    <p className="text-sm text-muted-foreground mb-1"><strong className="text-red-500 dark:text-red-400">Problem:</strong> {mistake.problem}</p>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 border border-border">
                    <p className="text-sm"><strong className="text-emerald-600 dark:text-emerald-400">Solution:</strong> {mistake.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <Calendar className="text-primary" /> Pehla Hafte Ka Plan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIRST_WEEK_PLAN.map((item) => (
            <div key={item.day} className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-primary mb-1">{item.day}</p>
                <p className="text-sm font-medium">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
          <BookOpen className="text-primary" /> NCERT Padhne ka Sahi Order
        </h2>
        <div className="space-y-4">
          {NCERT_ORDER.map((item) => (
            <div key={item.subject} className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold mb-2 flex items-center gap-2"><span className="text-xl">{item.emoji}</span>{item.subject}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.order}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-3xl p-7">
          <div className="flex items-start gap-3 mb-4">
            <ExternalLink className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-bold text-lg mb-1">Padhai ke saath Scholarship ki jaankari bhi lo!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Class 10 ke baad aage ki padhai ke liye government scholarships milti hain. Inki jaankari abhi se rakho taaki koi deadline miss na ho.
              </p>
              <a href="https://www.jansevakendrataraori.in/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm">
                JanSevaHub pe scholarship ki jaankari ke liye click karo <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-xs text-muted-foreground mt-2">Padhai ke saath scholarship ki jankari ke liye JanSevaHub dekhein</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
        className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">💪</div>
        <h3 className="text-2xl font-display font-bold mb-3">Shuruat karo aaj se!</h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          Sabse bada topper woh nahi jo sabse smart hai — woh hai jo sabse consistent hai. Roz thoda padhte raho, sab possible hai!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/syllabus-strategy">
            <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
              Study Planner dekho <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/notes">
            <button className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-2xl hover:bg-primary/5 transition-colors">
              <BookOpen className="w-4 h-4" /> Notes padhna shuru karo
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
