import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, CheckCircle2, Download, BookOpen, Target, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const MONTHLY_PLAN = [
  { month: "April 2026", focus: "Foundation", tasks: ["NCERT Chapter 1-2 padho (har subject)", "Basic concepts clear karo", "Revision notes banana shuru karo", "Daily 2-3 hours study habit banao"], color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", emoji: "🌱" },
  { month: "May 2026", focus: "Build Concepts", tasks: ["Maths: Real Numbers, Polynomials, Linear Equations", "Science: Chemical Reactions, Acids & Bases", "SST: Nationalism in Europe & India", "Weekly 1 MCQ test do"], color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-950/30", emoji: "📘" },
  { month: "June 2026", focus: "Core Chapters", tasks: ["Maths: Quadratic Equations, AP, Trigonometry", "Science: Metals, Carbon, Life Processes", "English: Footprints without feet complete karo", "Flashcards banana shuru karo"], color: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-950/30", emoji: "🔬" },
  { month: "July 2026", focus: "Hard Chapters", tasks: ["Triangles, Coordinate Geometry, Circles", "Electricity, Magnetic Effects, Optics", "History + Economics complete karo", "PYQ 2024 solve karo (1 paper)"], color: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-950/30", emoji: "💡" },
  { month: "Aug 2026", focus: "Complete Syllabus", tasks: ["Surface Areas, Statistics, Probability", "Environment & Natural Resources", "Geography + Political Science", "PYQ 2023 solve karo (1 paper)"], color: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-950/30", emoji: "📚" },
  { month: "Sep 2026", focus: "Half-Yearly Prep", tasks: ["Half-yearly exam ke liye practice", "Weak chapters identify karo", "Mock test do (full syllabus)", "Notes revise karo"], color: "from-yellow-500 to-amber-500", bg: "bg-yellow-50 dark:bg-yellow-950/30", emoji: "📝" },
  { month: "Oct 2026", focus: "Revision 1", tasks: ["Complete 1st revision — all subjects", "Formula sheet complete karo", "NCERT examples practice karo", "2-3 full mock tests do"], color: "from-teal-500 to-green-500", bg: "bg-teal-50 dark:bg-teal-950/30", emoji: "🔄" },
  { month: "Nov 2026", focus: "Revision 2 + PYQs", tasks: ["2019-2024 ke saare PYQs solve karo", "Weak areas pe focus karo", "Pre-board ke liye tayari", "Sample papers solve karo"], color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50 dark:bg-indigo-950/30", emoji: "🎯" },
  { month: "Dec 2026", focus: "Pre-Board Prep", tasks: ["Pre-board exams do", "Mistakes analyze karo", "Time management practice karo", "Important formulas/facts revise karo"], color: "from-purple-500 to-violet-500", bg: "bg-purple-50 dark:bg-purple-950/30", emoji: "⚡" },
  { month: "Jan 2027", focus: "Final Revision", tasks: ["Full syllabus 3rd revision", "High-weightage topics pe focus", "Presentation practice karo", "Past 5 years ke questions revise karo"], color: "from-red-500 to-rose-500", bg: "bg-red-50 dark:bg-red-950/30", emoji: "🚀" },
  { month: "Feb 2027", focus: "Board Exam! 🎉", tasks: ["Calm raho, panic mat karo", "Previous day notes hi revise karo", "Proper sleep aur breakfast lo", "Pehle easy questions solve karo"], color: "from-emerald-600 to-green-500", bg: "bg-green-50 dark:bg-green-950/30", emoji: "🏆" },
];

const SUBJECTS_MARKS = [
  { sub: "Mathematics", total: 80, theory: 80, practical: 0, imp: "Real Numbers, Trig, Circles, Probability", color: "text-blue-600" },
  { sub: "Science", total: 80, theory: 60, practical: 20, imp: "Chemical Reactions, Electricity, Human Eye, Life Processes", color: "text-emerald-600" },
  { sub: "Social Science", total: 80, theory: 80, practical: 0, imp: "Nationalism, Resources, Democracy, Money & Credit", color: "text-orange-600" },
  { sub: "English", total: 80, theory: 80, practical: 0, imp: "Letter Writing, Grammar, Literature passages", color: "text-violet-600" },
  { sub: "Hindi", total: 80, theory: 80, practical: 0, imp: "Sparsh + Sanchayan + Grammar + Rachna", color: "text-pink-600" },
];

const CHECKLIST = [
  "NCERT textbook complete padhna",
  "Har chapter ke important questions solve karna",
  "Previous year papers 2019-2025 solve karna",
  "Formula sheet banana (Maths + Science)",
  "Map work complete karna (SST)",
  "Grammar rules revise karna (English)",
  "Sample papers — CBSE official — solve karna",
  "Mock test mein 80%+ score karna",
  "Weak chapters pe extra time dena",
  "Roz notes revise karna — kum se kum 30 min",
];

export default function SyllabusStrategy() {
  useSEO({
    title: "Class 10 Syllabus & Strategy 2026-27 — Month-wise Study Planner",
    description: "CBSE Class 10 complete syllabus 2026-27 with month-by-month study planner. Score 95+ with our board exam strategy, subject-wise tips, and downloadable PDF checklist.",
    keywords: "class 10 syllabus 2026-27, CBSE class 10 study plan, month wise study planner class 10, board exam strategy 2027, class 10 preparation guide",
    canonical: "/syllabus-strategy",
  });

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold text-sm mb-4">
          <Calendar className="w-4 h-4" /> Class 10 Strategy 2026-27
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
          📅 Month-wise Study Planner
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          CBSE Class 10 Board Exam 2026-27 ke liye complete strategy. April se February tak — har mahine kya padhna hai, sab kuch plan mein!
        </p>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Target className="text-primary" /> Subject-wise Marks Distribution</h2>
        <div className="overflow-x-auto rounded-2xl border border-border shadow">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary/10">
                <th className="text-left px-4 py-3 font-bold">Subject</th>
                <th className="text-center px-4 py-3 font-bold">Total Marks</th>
                <th className="text-center px-4 py-3 font-bold">Theory</th>
                <th className="text-center px-4 py-3 font-bold">Practical/Internal</th>
                <th className="text-left px-4 py-3 font-bold">Most Important Topics</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECTS_MARKS.map((s, i) => (
                <tr key={s.sub} className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                  <td className={`px-4 py-3 font-semibold ${s.color}`}>{s.sub}</td>
                  <td className="px-4 py-3 text-center font-bold">{s.total}</td>
                  <td className="px-4 py-3 text-center">{s.theory}</td>
                  <td className="px-4 py-3 text-center">{s.practical || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{s.imp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Clock className="text-primary" /> Month-wise Study Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MONTHLY_PLAN.map((plan, i) => (
            <motion.div key={plan.month} variants={fadeUp}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{plan.emoji}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${plan.color} text-white`}>{plan.focus}</span>
              </div>
              <h3 className="font-display font-bold text-base mb-3">{plan.month}</h3>
              <ul className="space-y-2">
                {plan.tasks.map((task, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {task}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">📋 Board Exam Checklist — Download karo!</h2>
              <p className="text-sm text-muted-foreground">Yeh checklist print karke apni study table pe lagao</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-xl px-4 py-2.5 border border-border">
                <div className="w-5 h-5 rounded border-2 border-primary/40 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <a href="https://cbseacademic.nic.in/web_material/CurriculumMain23/SeniorCurriculum2324/Science_Senior.pdf"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" /> Official CBSE Syllabus PDF Download karo
          </a>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}>
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-8 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="text-2xl font-display font-bold mb-3">Aab Padhna Shuru Karo!</h3>
          <p className="text-muted-foreground mb-6">Sahi planning se 95%+ score karna bilkul possible hai. Shuru karo aaj se!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/notes">
              <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
                <BookOpen className="w-4 h-4" /> Notes Padhna Shuru Karo <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/quiz">
              <button className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-6 py-3 rounded-2xl hover:bg-primary/5 transition-colors">
                Daily Quiz Practice Karo
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
