import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, BookOpen, Download, Sparkles, ArrowRight, Pencil } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const TOPPER_NOTES = [
  {
    subject: "Science", emoji: "🔬", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-950/40",
    topperName: "Ananya S. — 98/100",
    tips: [
      "Chemical reactions: Har reaction ek box mein likhti thi — reactants LEFT, products RIGHT",
      "Diagrams ke liye alag color pencil use karti thi (blue = structure, red = labeling)",
      "Har formula ke saath ek real-life example likhti thi",
      "Chapter end mein 5 'most likely exam questions' khud likhti thi",
      "Electricity: series aur parallel circuits ke real diagrams draw kiye — har component label kiya",
    ],
    keyNotes: [
      "2Mg + O₂ → 2MgO (Magnesium burns with bright white light — combustion + oxidation)",
      "Ohm's Law: V = IR | Power = VI = I²R = V²/R",
      "Focal length formula: 1/f = 1/v - 1/u (New Cartesian Sign Convention yaad rakho!)",
      "Reflex arc: Stimulus → Receptor → Afferent nerve → CNS → Efferent nerve → Effector",
      "Mendel's Law: Dominant allele ALWAYS expressed when present with recessive",
    ],
    pdfUrl: "https://ncert.nic.in/textbook/pdf/jesc1.pdf",
    badge: "🏆 Board Topper"
  },
  {
    subject: "Social Science", emoji: "🌍", color: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-950/40",
    topperName: "Rohan M. — 97/100",
    tips: [
      "History: Timeline banana bahut important hai — events ko chronological order mein yaad karo",
      "Geography: Maps pe seedha pencil se mark karo, pen se kabhi nahi",
      "Political Science: Real-life examples dene se marks milte hain — India ke examples use karo",
      "Economics: Tables banao — formal credit vs informal credit, development indicators",
      "Roz ek chapter ka 'summary in 5 points' banata tha",
    ],
    keyNotes: [
      "Zollverein (1834): German customs union jo nationalist feeling le aaya — ECONOMIC unity se POLITICAL unity",
      "Jallianwala Bagh (April 13, 1919): General Dyer ka order — Non-Cooperation movement ki spark",
      "Bhakra Nangal Dam: Punjab ki Sutlej river pe — India ka sabse bada dam",
      "Belgium model: Power sharing at central + regional + community level — BEST example for federalism",
      "Formal credit: Banks, MFIs — collateral needed. Informal: Moneylenders — high interest",
    ],
    pdfUrl: "https://ncert.nic.in/textbook/pdf/jhis101.pdf",
    badge: "⭐ District Topper"
  },
  {
    subject: "Mathematics", emoji: "📐", color: "from-blue-500 to-indigo-500", bg: "bg-blue-50 dark:bg-blue-950/40",
    topperName: "Priya K. — 100/100",
    tips: [
      "Har formula ek 'cheat card' pe likhti thi — roz subah padh ke school jaati thi",
      "Steps clearly likhna — CBSE examiner ko process dikhta hai, sirf answer nahi",
      "Diagram ke liye scale mention karna mat bhulo (e.g., 1 cm = 2 units)",
      "Construction: Compass aur ruler ka use clearly dikho — rough work mat karo",
      "PYQ 2019-2024: Har question type analyze kiya, similar patterns dhunde",
    ],
    keyNotes: [
      "Discriminant trick: 4ac > b² → no real roots, 4ac = b² → equal roots, 4ac < b² → 2 distinct real",
      "AP shortcut: If sum S and 1st term a known: d = 2(S/n - a)/(n-1)",
      "Coordinate: Midpoint of hypotenuse = circumcenter of right triangle!",
      "Trigonometry: sin(90-θ) = cosθ, cos(90-θ) = sinθ — use this to simplify complex expressions",
      "Statistics: Modal class = class with HIGHEST frequency (not highest value!)",
    ],
    pdfUrl: "https://ncert.nic.in/textbook/pdf/jemh101.pdf",
    badge: "💯 Perfect Score"
  },
];

const TIPS_GENERAL = [
  { tip: "Haath se likhne ki practice karo", detail: "Print karna ya type karna board exam mein nahi chalega. Haath se likhne se memory better hoti hai.", emoji: "✍️" },
  { tip: "Colors use karo", detail: "Alag subjects ke notes ke liye alag colors. Blue pen main text, red pen important points.", emoji: "🎨" },
  { tip: "Diagrams banao", detail: "Science mein labeled diagrams ke extra marks milte hain. Practice karo speed se banana.", emoji: "📊" },
  { tip: "Margins mein shortcuts likho", detail: "Formula ke aage shortcut ya example likhna yaad dilaata hai.", emoji: "📝" },
];

export default function ToppersNotes() {
  useSEO({
    title: "Topper's Handwritten Notes Class 10 — Science, SST, Maths 2026-27",
    description: "Class 10 board toppers ke notes aur tips. Science, Social Science, Maths ke important notes jo 95%+ score karwaaenge. CBSE Board Exam 2026-27.",
    keywords: "class 10 topper notes, CBSE board topper tips, class 10 handwritten notes, board exam topper strategy 2026-27, class 10 science topper notes",
    canonical: "/toppers-notes",
  });

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold text-sm mb-4">
          <Star className="w-4 h-4" /> Topper's Notes
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
          ✍️ Topper's Notes & Tips
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Board exam mein 95%+ laane wale toppers ke notes aur secrets. Unke tarike siikho, khud notes banao!
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
        className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-10 flex items-start gap-3">
        <Pencil className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">Yeh notes kyun kaam karte hain?</p>
          <p className="text-sm text-muted-foreground mt-1">
            Topper ke haath se likhe notes mein woh cheezein hoti hain jo textbook mein clearly nahi hoti — shortcuts, mnemonics, exam-specific tips. Inhe padhkar khud apne notes banao — woh aapke liye best honge.
          </p>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce} className="space-y-8 mb-14">
        {TOPPER_NOTES.map((note) => (
          <motion.div key={note.subject} variants={fadeUp}
            className={`${note.bg} border border-border rounded-3xl p-6 md:p-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{note.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className={`font-display font-bold text-xl bg-gradient-to-r ${note.color} bg-clip-text text-transparent`}>{note.subject}</h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400">{note.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{note.topperName}</p>
                </div>
              </div>
              <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors w-fit">
                <Download className="w-4 h-4" /> NCERT Book Download karo
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Topper ke Study Tips</h3>
                <ul className="space-y-2">
                  {note.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-amber-500 font-bold text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-3 flex items-center gap-2"><Star className="w-4 h-4 text-primary" /> Key Notes (Board mein aate hain!)</h3>
                <ul className="space-y-2">
                  {note.keyNotes.map((kn, i) => (
                    <li key={i} className="bg-white dark:bg-zinc-900 rounded-xl px-3 py-2 text-xs font-mono border border-border">
                      {kn}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce} className="mb-14">
        <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2"><Pencil className="text-primary" /> Notes Banane ke General Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TIPS_GENERAL.map((t) => (
            <div key={t.tip} className="bg-card border border-border rounded-2xl p-5">
              <div className="text-2xl mb-2">{t.emoji}</div>
              <h3 className="font-bold text-base mb-1">{t.tip}</h3>
              <p className="text-sm text-muted-foreground">{t.detail}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
        className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="text-xl font-display font-bold mb-2">Ab khud notes banao!</h3>
        <p className="text-muted-foreground text-sm mb-6">Hamari site pe padho, fir apne haath se likho. Yahi topper ka formula hai.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/notes">
            <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm">
              <BookOpen className="w-4 h-4" /> Notes Padhna Shuru Karo <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/maths-cheat-sheet">
            <button className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors text-sm">
              Maths Cheat Sheet dekho
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
