import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calculator, Share2, BookOpen, Download } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

const FORMULA_SECTIONS = [
  {
    title: "1. Real Numbers", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50 dark:bg-blue-950/40", emoji: "🔢",
    formulas: [
      { name: "Euclid's Division Lemma", formula: "a = bq + r, where 0 ≤ r < b" },
      { name: "HCF × LCM", formula: "HCF(a,b) × LCM(a,b) = a × b" },
      { name: "Irrational number", formula: "√p is irrational if p is prime" },
    ]
  },
  {
    title: "2. Polynomials", color: "from-violet-500 to-purple-500", bg: "bg-violet-50 dark:bg-violet-950/40", emoji: "📊",
    formulas: [
      { name: "Sum of zeroes (quadratic)", formula: "α + β = −b/a" },
      { name: "Product of zeroes", formula: "α × β = c/a" },
      { name: "Sum of zeroes (cubic)", formula: "α+β+γ = −b/a" },
      { name: "Product of zeroes (cubic)", formula: "αβγ = −d/a" },
    ]
  },
  {
    title: "3. Quadratic Equations", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50 dark:bg-emerald-950/40", emoji: "➗",
    formulas: [
      { name: "Quadratic Formula", formula: "x = [−b ± √(b²−4ac)] / 2a" },
      { name: "Discriminant", formula: "D = b² − 4ac" },
      { name: "Nature of roots", formula: "D > 0: 2 real, D = 0: equal, D < 0: no real" },
    ]
  },
  {
    title: "4. Arithmetic Progressions", color: "from-orange-500 to-amber-500", bg: "bg-orange-50 dark:bg-orange-950/40", emoji: "📈",
    formulas: [
      { name: "nth term (aₙ)", formula: "aₙ = a + (n−1)d" },
      { name: "Sum of n terms (Sₙ)", formula: "Sₙ = n/2 [2a + (n−1)d]" },
      { name: "Sum (last term known)", formula: "Sₙ = n/2 (a + l)" },
    ]
  },
  {
    title: "5. Triangles", color: "from-rose-500 to-pink-500", bg: "bg-rose-50 dark:bg-rose-950/40", emoji: "△",
    formulas: [
      { name: "Pythagoras Theorem", formula: "h² = p² + b² (right angle at p)" },
      { name: "Basic Proportionality", formula: "AD/DB = AE/EC" },
      { name: "Area of Similar Triangles", formula: "Ar(△ABC)/Ar(△DEF) = (AB/DE)²" },
    ]
  },
  {
    title: "6. Coordinate Geometry", color: "from-teal-500 to-green-500", bg: "bg-teal-50 dark:bg-teal-950/40", emoji: "📍",
    formulas: [
      { name: "Distance Formula", formula: "d = √[(x₂−x₁)² + (y₂−y₁)²]" },
      { name: "Section Formula", formula: "P = [(mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n)]" },
      { name: "Midpoint Formula", formula: "M = [(x₁+x₂)/2, (y₁+y₂)/2]" },
      { name: "Area of Triangle", formula: "½|x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|" },
    ]
  },
  {
    title: "7. Trigonometry", color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50 dark:bg-indigo-950/40", emoji: "📐",
    formulas: [
      { name: "Basic Ratios", formula: "sin θ = P/H, cos θ = B/H, tan θ = P/B" },
      { name: "Reciprocal", formula: "cosec = 1/sin, sec = 1/cos, cot = 1/tan" },
      { name: "Identity 1", formula: "sin²θ + cos²θ = 1" },
      { name: "Identity 2", formula: "1 + tan²θ = sec²θ" },
      { name: "Identity 3", formula: "1 + cot²θ = cosec²θ" },
    ]
  },
  {
    title: "8. Circles", color: "from-pink-500 to-rose-500", bg: "bg-pink-50 dark:bg-pink-950/40", emoji: "⭕",
    formulas: [
      { name: "Tangent length (external)", formula: "PT² = d² − r²" },
      { name: "Equal tangents", formula: "PA = PB (from external point P)" },
      { name: "Angle in semicircle", formula: "90° (angle in semicircle)" },
    ]
  },
  {
    title: "9. Areas Related to Circles", color: "from-amber-500 to-yellow-500", bg: "bg-amber-50 dark:bg-amber-950/40", emoji: "🔵",
    formulas: [
      { name: "Area of Circle", formula: "A = πr²" },
      { name: "Circumference", formula: "C = 2πr" },
      { name: "Area of Sector", formula: "θ/360 × πr²" },
      { name: "Length of Arc", formula: "θ/360 × 2πr" },
      { name: "Area of Segment", formula: "Area of sector − Area of triangle" },
    ]
  },
  {
    title: "10. Surface Areas & Volumes", color: "from-green-500 to-emerald-500", bg: "bg-green-50 dark:bg-green-950/40", emoji: "📦",
    formulas: [
      { name: "Cube", formula: "TSA = 6a², Vol = a³" },
      { name: "Cuboid", formula: "TSA = 2(lb+bh+lh), Vol = l×b×h" },
      { name: "Cylinder", formula: "CSA = 2πrh, TSA = 2πr(h+r), Vol = πr²h" },
      { name: "Cone", formula: "CSA = πrl, TSA = πr(l+r), Vol = ⅓πr²h" },
      { name: "Sphere", formula: "SA = 4πr², Vol = 4/3 πr³" },
      { name: "Hemisphere", formula: "CSA = 2πr², TSA = 3πr²" },
    ]
  },
  {
    title: "11. Statistics", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50 dark:bg-cyan-950/40", emoji: "📊",
    formulas: [
      { name: "Mean (Direct)", formula: "x̄ = Σfᵢxᵢ / Σfᵢ" },
      { name: "Mean (Assumed)", formula: "x̄ = a + (Σfᵢdᵢ / Σfᵢ)" },
      { name: "Median", formula: "l + [(n/2 − cf)/f] × h" },
      { name: "Mode", formula: "l + [(f₁−f₀)/(2f₁−f₀−f₂)] × h" },
    ]
  },
  {
    title: "12. Probability", color: "from-purple-500 to-indigo-500", bg: "bg-purple-50 dark:bg-purple-950/40", emoji: "🎲",
    formulas: [
      { name: "Probability", formula: "P(E) = Favourable outcomes / Total outcomes" },
      { name: "Complement", formula: "P(E) + P(E') = 1" },
      { name: "Range", formula: "0 ≤ P(E) ≤ 1" },
    ]
  },
];

export default function MathsCheatSheet() {
  useSEO({
    title: "Class 10 Maths Formula Cheat Sheet — All Chapters 2026-27",
    description: "Complete Class 10 Maths formula sheet — Real Numbers to Probability. All important formulas in one place. Save, print and share for CBSE Board Exam 2026-27.",
    keywords: "class 10 maths formula sheet, CBSE maths all formulas, class 10 maths cheat sheet 2026-27, maths formula list class 10, board exam maths formulas",
    canonical: "/maths-cheat-sheet",
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Class 10 Maths Cheat Sheet",
          text: "Saare Maths formulas ek jagah! CBSE Class 10 Board Exam 2026-27",
          url: "https://study-central-10.pages.dev/maths-cheat-sheet",
        });
      } catch {}
    } else {
      navigator.clipboard.writeText("https://study-central-10.pages.dev/maths-cheat-sheet");
      alert("Link copy ho gaya! Dosto ke saath share karo.");
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl py-8 md:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-bold text-sm mb-4">
          <Calculator className="w-4 h-4" /> Maths Formula Sheet
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-4">
          📐 Maths Cheat Sheet
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Class 10 ke saare chapters ke important formulas ek hi page mein! Print karo ya save karo — board exam mein kaam aayega.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={handleShare}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm">
            <Share2 className="w-4 h-4" /> Doston ke saath Share Karo
          </button>
          <a href="https://ncert.nic.in/textbook.php?femh1=0-15" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors text-sm">
            <Download className="w-4 h-4" /> NCERT Maths PDF
          </a>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {FORMULA_SECTIONS.map((section) => (
          <motion.div key={section.title} variants={fadeUp}
            className={`${section.bg} border border-border rounded-2xl p-5`}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className={`font-display font-bold text-base bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                {section.title}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {section.formulas.map((f, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white/50 dark:bg-white/5" : ""}>
                      <td className="px-3 py-2 text-muted-foreground text-xs font-medium w-1/3">{f.name}</td>
                      <td className="px-3 py-2 font-mono font-semibold text-foreground">{f.formula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOnce}
        className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">💡</div>
        <h3 className="text-xl font-display font-bold mb-2">Formulas yaad karne ka tip!</h3>
        <p className="text-muted-foreground text-sm mb-4">Roz subah sirf 10 minute yeh sheet dekho. 1 week mein saare formulas pakke ho jaayenge.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/quiz">
            <button className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm">
              <BookOpen className="w-4 h-4" /> Formulas Practice karo Quiz mein
            </button>
          </Link>
          <Link href="/notes/maths">
            <button className="inline-flex items-center gap-2 border border-primary text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors text-sm">
              Maths Notes Padhna Shuru Karo
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
