// Comprehensive Mock Data for the application

export const SUBJECTS = [
  { id: "maths", name: "Mathematics", color: "from-blue-500 to-cyan-500", icon: "Calculator" },
  { id: "science", name: "Science", color: "from-emerald-500 to-teal-500", icon: "FlaskConical" },
  { id: "english", name: "English", color: "from-violet-500 to-purple-500", icon: "BookOpen" },
  { id: "sst", name: "Social Science", color: "from-orange-500 to-amber-500", icon: "Globe" },
  { id: "hindi", name: "Hindi", color: "from-pink-500 to-rose-500", icon: "Languages" },
];

export const CHAPTERS: Record<string, { id: string; title: string; description: string }[]> = {
  maths: [
    { id: "m1", title: "Real Numbers", description: "Euclid's Division Lemma, Fundamental Theorem of Arithmetic" },
    { id: "m2", title: "Polynomials", description: "Zeroes of a polynomial, Relationship between zeroes and coefficients" },
    { id: "m3", title: "Pair of Linear Equations", description: "Graphical method of solution, Algebraic methods" },
    { id: "m4", title: "Quadratic Equations", description: "Standard form, Solution by factorization and quadratic formula" },
    { id: "m5", title: "Arithmetic Progressions", description: "nth term and sum of first n terms of an AP" },
    { id: "m6", title: "🔥 Trigonometry Table — Hand Trick (Viral)", description: "Sin, Cos, Tan values yaad karo sirf 1 minute mein — Left Hand Rule se!" },
  ],
  science: [
    { id: "s1", title: "Chemical Reactions and Equations", description: "Types of chemical reactions, balancing equations" },
    { id: "s2", title: "Acids, Bases and Salts", description: "Properties of acids and bases, pH scale, salts" },
    { id: "s3", title: "Metals and Non-metals", description: "Physical and chemical properties, extraction of metals" },
    { id: "s4", title: "Life Processes", description: "Nutrition, respiration, transportation, and excretion" },
    { id: "s5", title: "Light - Reflection and Refraction", description: "Spherical mirrors, lenses, refractive index" },
  ],
  english: [
    { id: "e1", title: "A Letter to God", description: "Faith, hope, and the human spirit" },
    { id: "e2", title: "Nelson Mandela: Long Walk to Freedom", description: "Struggle for justice and equality" },
    { id: "e3", title: "Two Stories about Flying", description: "Overcoming fear and finding courage" },
    { id: "e4", title: "From the Diary of Anne Frank", description: "A young girl's perspective during WWII" },
  ],
  sst: [
    { id: "ss1", title: "The Rise of Nationalism in Europe", description: "French revolution, making of Germany and Italy" },
    { id: "ss2", title: "Nationalism in India", description: "Non-cooperation movement, Civil Disobedience" },
    { id: "ss3", title: "Resources and Development", description: "Types of resources, land and soil resources" },
    { id: "ss4", title: "Power Sharing", description: "Case studies of Belgium and Sri Lanka" },
  ],
  hindi: [
    { id: "h1", title: "Surdas ke Pad", description: "Devotional poetry by Surdas" },
    { id: "h2", title: "Ram-Lakshman-Parashuram Samvad", description: "Extract from Ramcharitmanas" },
    { id: "h3", title: "Utsah, Aat Nahi Rahi Hai", description: "Poems by Suryakant Tripathi Nirala" },
  ]
};

export const NOTES_CONTENT: Record<string, string> = {
  m1: `
# Real Numbers

## Introduction
Real numbers constitute the union of all rational and irrational numbers. They can be represented on a number line.

## Euclid's Division Lemma
Given positive integers a and b, there exist unique integers q and r satisfying a = bq + r, 0 ≤ r < b.
This lemma is essentially a restatement of the long division process.

## The Fundamental Theorem of Arithmetic
Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique, apart from the order in which the prime factors occur.

**Key Formula:**
For any two positive integers a and b, HCF(a,b) × LCM(a,b) = a × b.
  `,
  m6: `
# 🔥 Trigonometry Table Yaad Karne ki Short Trick (1 Minute Mein!)

## Doston, Problem Kya Hai?

Trigonometry ki values — sin 30°, cos 60°, tan 45° — exam mein bhool jaate ho? Tension mat lo! Bas ek **Left Hand Trick** seekh lo, aur poori table hamesha yaad rahegi.

## ✋ Left Hand Rule — Kaise Kaam Karta Hai?

Apna **baaya haath** saamne rakho. Ab fingers ko angles assign karo:

- **Chhoti ungli (Pinky)** = 0°
- **Ring finger** = 30°
- **Beech ki ungli (Middle)** = 45°
- **Index finger (Tarjani)** = 60°
- **Angutha (Thumb)** = 90°

**Sin ka formula:** Jo angle dhundhna ho, us finger ko ginna chahte ho — usse *gino aur upar ki fingers count karo*.

> **Rule:** sin θ = √(count of fingers at or below that angle) / 2

| Angle | Fingers neeche | sin θ = √n/2 |
|-------|----------------|--------------|
| 0°    | 0              | √0/2 = **0** |
| 30°   | 1              | √1/2 = **1/2** |
| 45°   | 2              | √2/2 = **√2/2** |
| 60°   | 3              | √3/2 = **√3/2** |
| 90°   | 4              | √4/2 = **1** |

## 📊 Poori Trigonometry Table

| Angle | sin θ | cos θ | tan θ |
|-------|-------|-------|-------|
| 0°    | 0     | 1     | 0     |
| 30°   | 1/2   | √3/2  | 1/√3  |
| 45°   | √2/2  | √2/2  | 1     |
| 60°   | √3/2  | 1/2   | √3    |
| 90°   | 1     | 0     | ∞ (undefined) |

## 🧠 Yaad Rakhne ki Super Tips

**Tip 1 — cos ke liye:** cos bhi same hai, bas *ulti order* mein! (0° se 90° tak sin = 90° se 0° tak cos)

**Tip 2 — tan ke liye:** tan θ = sin θ / cos θ — bas divide karo, ho gaya!

**Tip 3 — "Some People Have Curly Brown Hair"**
- **S**ome = **S**in
- **P**eople = **P**erpendicular (opposite side)
- **H**ave = **H**ypotenuse
- **C**urly = **C**os
- **B**rown = **B**ase
- **H**air = **H**ypotenuse

## ✅ Practice Questions (Board Exam Style)

**Q1.** sin²30° + cos²60° ka maan kya hoga? *(1 mark)*
> Answer: (1/2)² + (1/2)² = 1/4 + 1/4 = **1/2**

**Q2.** tan45° × sin90° − cos0° ka maan nikalo. *(2 marks)*
> Answer: 1 × 1 − 1 = **0**

**Q3.** 2sin30° + 3cos60° − tan45° ka maan gyat karo. *(2 marks)*
> Answer: 2(1/2) + 3(1/2) − 1 = 1 + 1.5 − 1 = **1.5**

## 📥 Full Table PDF Download Karo

Neeche Resources section mein jaake **Trigonometry Table PDF** download karo — printout lo aur room mein chipka do!

> 💡 **Pro Tip:** Roz subah uthke table ko ek baar dekho. 7 din mein pakki ho jayegi!
  `,
  s1: `
# Chemical Reactions and Equations

## Physical vs Chemical Changes
- **Physical Change**: A change in state or appearance without forming a new substance (e.g., melting of ice).
- **Chemical Change**: A change where one or more new substances are formed with entirely different properties (e.g., rusting of iron, burning of wood).

## Chemical Equations
A chemical equation is the symbolic representation of a chemical reaction in the form of symbols and formulae.
*Reactants* are written on the left side, and *Products* on the right side.

## Balancing Chemical Equations
The law of conservation of mass states that mass can neither be created nor destroyed in a chemical reaction. Therefore, the number of atoms of each element must be the same on both sides of the equation.
  `,
};

export const QUESTIONS: Record<string, { id: string; text: string; marks: number; year: string }[]> = {
  m6: [
    { id: "q_m6_1", text: "sin²45° + cos²45° ka maan gyat karo.", marks: 1, year: "2023" },
    { id: "q_m6_2", text: "2tan²45° + cos²30° - sin²60° ka maan kya hoga?", marks: 2, year: "2022" },
    { id: "q_m6_3", text: "Evaluate: (sin30° + tan45° - cosec60°) / (sec30° + cos60° + cot45°)", marks: 3, year: "2021" },
    { id: "q_m6_4", text: "Prove that: sin²A + cos²A = 1 (for A = 30° verify karke dikhayen)", marks: 2, year: "2020" },
    { id: "q_m6_5", text: "If tan(A+B) = √3 aur tan(A-B) = 1/√3, toh A aur B ke maan gyat karo.", marks: 3, year: "2019" },
  ],
  m1: [
    { id: "q_m1_1", text: "Use Euclid's division algorithm to find the HCF of 135 and 225.", marks: 2, year: "2019" },
    { id: "q_m1_2", text: "Prove that √5 is irrational.", marks: 3, year: "2020, 2022" },
    { id: "q_m1_3", text: "Check whether 6^n can end with the digit 0 for any natural number n.", marks: 2, year: "2018" },
    { id: "q_m1_4", text: "Given that HCF (306, 657) = 9, find LCM (306, 657).", marks: 2, year: "2021" },
    { id: "q_m1_5", text: "Explain why 7 × 11 × 13 + 13 is a composite number.", marks: 3, year: "NCERT" },
  ],
  s1: [
    { id: "q_s1_1", text: "Why should a magnesium ribbon be cleaned before burning in air?", marks: 1, year: "2019" },
    { id: "q_s1_2", text: "Translate the following statement into chemical equation and then balance it: Hydrogen gas combines with nitrogen to form ammonia.", marks: 2, year: "2020" },
    { id: "q_s1_3", text: "What is a balanced chemical equation? Why should chemical equations be balanced?", marks: 3, year: "2018" },
    { id: "q_s1_4", text: "Why is respiration considered an exothermic reaction? Explain.", marks: 2, year: "2021" },
    { id: "q_s1_5", text: "Write the balanced chemical equation for the reaction of Barium chloride with Aluminium sulphate.", marks: 2, year: "NCERT" },
  ]
};

export const PDFS = [
  {
    id: "pdf_trig",
    title: "🔥 Trigonometry Table (Sin, Cos, Tan) — Printable PDF",
    subject: "Maths",
    size: "Free",
    type: "Quick Reference",
    url: "https://ncert.nic.in/textbook/pdf/jemh108.pdf",
    source: "NCERT Official",
  },
  {
    id: "pdf1",
    title: "Class X Question Papers 2025 (All Subjects)",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2025",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf2",
    title: "Class X Compartment Question Papers 2025",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2025",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf3",
    title: "Class X Question Papers 2024 — Science",
    subject: "Science",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf4",
    title: "Class X Question Papers 2024 — Mathematics Standard & Basic",
    subject: "Maths",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf5",
    title: "Class X Question Papers 2024 — Social Science",
    subject: "SST",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf6",
    title: "Class X Question Papers 2024 — English (Communicative & Literature)",
    subject: "English",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf7",
    title: "Class X Question Papers 2024 — Hindi A & B",
    subject: "Hindi",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf8",
    title: "Class X Question Papers 2024 — Sanskrit",
    subject: "Sanskrit",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf9",
    title: "Class X Compartment Question Papers 2024",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf10",
    title: "Class X Question Papers 2023 (All Subjects)",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2023",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf11",
    title: "Class X Compartment Question Papers 2023",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2023",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf12",
    title: "Class X Question Papers 2022 (All Subjects)",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2022",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf13",
    title: "Class X Compartment Question Papers 2022",
    subject: "All Subjects",
    size: "Official",
    type: "PYQs 2022",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf14",
    title: "Class X Question Papers 2024 — Information Technology (Skill)",
    subject: "IT / Skill",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
  {
    id: "pdf15",
    title: "Class X Question Papers 2024 — Artificial Intelligence (Skill)",
    subject: "IT / Skill",
    size: "Official",
    type: "PYQs 2024",
    url: "https://www.cbse.gov.in/cbsenew/question-paper.html",
    source: "CBSE Official",
  },
];

export const STUDY_TIPS = [
  { id: "t1", title: "Pomodoro Technique", description: "Study for 25 minutes, then take a 5-minute break. This keeps your mind fresh and maintains focus.", icon: "Clock" },
  { id: "t2", title: "Active Recall", description: "Don't just re-read notes. Close the book and try to explain the concept out loud to test true understanding.", icon: "BrainCircuit" },
  { id: "t3", title: "Spaced Repetition", description: "Review material at gradually increasing intervals. Review after 1 day, then 3 days, then a week.", icon: "CalendarRange" },
  { id: "t4", title: "Teach Someone Else", description: "The Feynman Technique: If you can explain it simply to a 10-year-old, you've mastered the subject.", icon: "Users" },
  { id: "t5", title: "Create Mind Maps", description: "Connect concepts visually. Especially useful for Social Science and Biology to see the big picture.", icon: "Network" },
  { id: "t6", title: "Practice PYQs", description: "Solve Previous Year Questions (PYQs) within a time limit to understand exam patterns and manage time.", icon: "FileText" },
  { id: "t7", title: "Healthy Sleep Cycle", description: "Never pull all-nighters before an exam. 7-8 hours of sleep is crucial for memory consolidation.", icon: "Moon" },
  { id: "t8", title: "Highlight Sparingly", description: "If you highlight everything, you've highlighted nothing. Only mark key terms and formulas.", icon: "Highlighter" },
  { id: "t9", title: "Eat the Frog", description: "Tackle your hardest or least favorite subject first thing in the morning when willpower is highest.", icon: "Target" },
  { id: "t10", title: "Stay Hydrated", description: "Your brain needs water to function optimally. Keep a water bottle on your desk while studying.", icon: "Droplets" },
];
