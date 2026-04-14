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
    { id: "m7", title: "Triangles", description: "Similar triangles, Pythagoras theorem, criteria for similarity" },
    { id: "m8", title: "Coordinate Geometry", description: "Distance formula, Section formula, Area of triangle" },
    { id: "m9", title: "Circles", description: "Tangent to a circle, number of tangents from a point" },
    { id: "m10", title: "Areas Related to Circles", description: "Area of sector, segment, and combinations" },
    { id: "m11", title: "Surface Areas and Volumes", description: "Combinations of solids, frustum of a cone" },
    { id: "m12", title: "Statistics", description: "Mean, Median, Mode of grouped data, cumulative frequency" },
    { id: "m13", title: "Probability", description: "Classical definition, simple problems on single events" },
  ],
  science: [
    { id: "s1", title: "Chemical Reactions and Equations", description: "Types of chemical reactions, balancing equations" },
    { id: "s2", title: "Acids, Bases and Salts", description: "Properties of acids and bases, pH scale, salts" },
    { id: "s3", title: "Metals and Non-metals", description: "Physical and chemical properties, extraction of metals" },
    { id: "s4", title: "Carbon and its Compounds", description: "Covalent bonds, functional groups, homologous series" },
    { id: "s5", title: "Life Processes", description: "Nutrition, respiration, transportation, and excretion" },
    { id: "s6", title: "Control and Coordination", description: "Nervous system, hormones, reflex action" },
    { id: "s7", title: "How do Organisms Reproduce?", description: "Sexual and asexual reproduction in plants and animals" },
    { id: "s8", title: "Heredity and Evolution", description: "Mendel's laws, sex determination, evolution" },
    { id: "s9", title: "Light – Reflection and Refraction", description: "Spherical mirrors, lenses, refractive index" },
    { id: "s10", title: "🔥 Human Eye and Colourful World", description: "Eye anatomy, defects of vision, dispersion of light, rainbow" },
    { id: "s11", title: "Electricity", description: "Ohm's law, resistance, series & parallel circuits, heating effect" },
    { id: "s12", title: "Magnetic Effects of Electric Current", description: "Magnetic field, Fleming's rule, electric motor, generator" },
    { id: "s13", title: "Our Environment", description: "Ecosystem, food chain, ozone depletion" },
    { id: "s14", title: "Management of Natural Resources", description: "Conservation, water harvesting, coal and petroleum" },
  ],
  english: [
    { id: "e1", title: "A Letter to God", description: "Faith, hope, and the human spirit" },
    { id: "e2", title: "Nelson Mandela: Long Walk to Freedom", description: "Struggle for justice and equality" },
    { id: "e3", title: "Two Stories about Flying", description: "Overcoming fear and finding courage" },
    { id: "e4", title: "From the Diary of Anne Frank", description: "A young girl's perspective during WWII" },
    { id: "e5", title: "Glimpses of India", description: "Three-part story on Indian culture and heritage" },
    { id: "e6", title: "Mijbil the Otter", description: "Gavin Maxwell's pet otter — humour and compassion" },
    { id: "e7", title: "Madam Rides the Bus", description: "A little girl's first bus journey — wonder and reality" },
    { id: "e8", title: "The Sermon at Benares", description: "Lord Buddha's teachings on grief and acceptance" },
    { id: "e9", title: "The Proposal (Play)", description: "Anton Chekov's comic one-act play about marriage" },
    { id: "e10", title: "Dust of Snow (Poem)", description: "A crow and a hemlock tree change the poet's mood" },
    { id: "e11", title: "Fire and Ice (Poem)", description: "Frost's poem about the end of the world" },
    { id: "e12", title: "A Tiger in the Zoo (Poem)", description: "Contrast between wild freedom and cage life" },
    { id: "e_letter", title: "✉️ Letter Writing — Full Marks Strategy", description: "Formal & Informal letter format, Sample letters, Do's & Don'ts — 5 marks pakke!" },
  ],
  sst: [
    { id: "ss1", title: "The Rise of Nationalism in Europe", description: "French revolution, making of Germany and Italy" },
    { id: "ss2", title: "Nationalism in India", description: "Non-cooperation movement, Civil Disobedience" },
    { id: "ss3", title: "The Making of a Global World", description: "Silk routes, trade, Great Depression" },
    { id: "ss4", title: "The Age of Industrialisation", description: "Proto-industrialisation, factories, working conditions" },
    { id: "ss5", title: "Print Culture and the Modern World", description: "History of print, newspapers, impact on society" },
    { id: "ss6", title: "Resources and Development", description: "Types of resources, land and soil resources" },
    { id: "ss7", title: "Forest and Wildlife Resources", description: "Conservation, types of forests, biodiversity" },
    { id: "ss8", title: "Water Resources", description: "Dams, water scarcity, rainwater harvesting" },
    { id: "ss9", title: "Agriculture", description: "Types of farming, cropping patterns, food security" },
    { id: "ss10", title: "Power Sharing", description: "Case studies of Belgium and Sri Lanka" },
    { id: "ss11", title: "Federalism", description: "Types of federalism, linguistic states, decentralisation" },
    { id: "ss12", title: "Democracy and Diversity", description: "Social divisions, politics, examples from India & abroad" },
    { id: "ss13", title: "Money and Credit", description: "Formal and informal sources, credit, banks" },
    { id: "ss14", title: "Globalisation and the Indian Economy", description: "MNCs, WTO, impact on India" },
    { id: "ss_map", title: "🗺️ Map Work Complete Guide 2026-27", description: "History + Geography ke saare important map points — Nationalism, Industries, Dams, Nuclear Plants" },
  ],
  hindi: [
    { id: "h1", title: "Surdas ke Pad", description: "Devotional poetry by Surdas" },
    { id: "h2", title: "Ram-Lakshman-Parashuram Samvad", description: "Extract from Ramcharitmanas" },
    { id: "h3", title: "Utsah, Aat Nahi Rahi Hai", description: "Poems by Suryakant Tripathi Nirala" },
    { id: "h4", title: "Yeh Danturit Muskan", description: "Nagarjun's poem — a child's smile and its effect" },
    { id: "h5", title: "Manushyata", description: "Maithili Sharan Gupt — humanity and brotherhood" },
    { id: "h6", title: "Balgobin Bhagat", description: "Ramvriksh Benipuri — a simple saint's life" },
    { id: "h7", title: "Lakhnawi Andaaz", description: "Yashpal's humorous story — cultural pride vs reality" },
    { id: "h8", title: "Ek Kahani Yeh Bhi", description: "Mannu Bhandari — feminism and self-discovery" },
    { id: "h9", title: "Sangatkar", description: "Mangle Biswa's poem — the unsung supporters" },
  ]
};

export const NOTES_CONTENT: Record<string, string> = {
  m1: `
# Real Numbers

## Introduction
Real numbers constitute the union of all rational and irrational numbers. They can be represented on a number line.

## Euclid's Division Lemma
Given positive integers a and b, there exist unique integers q and r satisfying **a = bq + r**, where 0 ≤ r < b.
This lemma is essentially a restatement of the long division process.

**Algorithm (HCF nikalna):**
1. c = a × b + r likho
2. Ab c ki jagah a lo, a ki jagah r lo
3. Tab tak karo jab tak r = 0 na ho jaye
4. Jo b bacha wahi HCF hai

**Example:** HCF(135, 225)
> 225 = 135 × 1 + 90
> 135 = 90 × 1 + 45
> 90 = 45 × 2 + 0 → HCF = **45**

## The Fundamental Theorem of Arithmetic
Every composite number can be expressed (factorised) as a **product of primes**, and this factorisation is unique.

**Key Formula:**
> HCF(a,b) × LCM(a,b) = a × b

## Rational vs Irrational Numbers

| Type | Example | Decimal |
|------|---------|---------|
| Rational | 3/4 | 0.75 (terminating) |
| Rational | 1/3 | 0.333... (repeating) |
| Irrational | √2 | 1.41421... (non-terminating, non-repeating) |

**Denominator Rule:** p/q (lowest terms) terminates only if q = 2^m × 5^n.

## 📌 Board Exam Tips
- Euclid's Division Lemma aur HCF proof har saal aata hai
- √2, √3, √5 irrational hain — proof karna padhta hai (3 marks)
- LCM × HCF = Product of numbers (only for TWO numbers)
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
- **S**ome = **S**in, **P**eople = **P**erpendicular, **H**ave = **H**ypotenuse
- **C**urly = **C**os, **B**rown = **B**ase, **H**air = **H**ypotenuse

## ✅ Practice Questions (Board Exam Style)

**Q1.** sin²30° + cos²60° ka maan kya hoga? *(1 mark)*
> Answer: (1/2)² + (1/2)² = 1/4 + 1/4 = **1/2**

**Q2.** tan45° × sin90° − cos0° ka maan nikalo. *(2 marks)*
> Answer: 1 × 1 − 1 = **0**

**Q3.** 2sin30° + 3cos60° − tan45° ka maan gyat karo. *(2 marks)*
> Answer: 2(1/2) + 3(1/2) − 1 = 1 + 1.5 − 1 = **1.5**

> 💡 **Pro Tip:** Roz subah uthke table ko ek baar dekho. 7 din mein pakki ho jayegi!
  `,

  m7: `
# Triangles

## Similar Triangles kya hote hain?
Do triangles **similar** hote hain jab:
- Unke corresponding angles equal hon (AAA criterion)
- Unke corresponding sides same ratio mein hon (SSS criterion)
- Do sides same ratio mein hon aur included angle equal ho (SAS criterion)

## Basic Proportionality Theorem (Thales' Theorem)
Agar ek line ek triangle ki do sides ko same ratio mein divide kare, toh woh line teesri side ke parallel hoti hai.

> **Formula:** DE ∥ BC hai toh AD/DB = AE/EC

## Pythagoras Theorem
Right triangle mein:
> **c² = a² + b²** (c = hypotenuse)

**Converse:** Agar c² = a² + b² ho, toh triangle right-angled hai.

## Pythagorean Triplets (Yaad Karo!)
| Triplet |
|---------|
| 3, 4, 5 |
| 5, 12, 13 |
| 8, 15, 17 |
| 7, 24, 25 |

## 📌 Board Exam Important Points
- BPT ka proof 3 marks ka aata hai — zaroor padho
- Similar triangles ke ratio of areas = (ratio of sides)²
- Criteria: AA, SAS, SSS similarity
  `,

  s1: `
# Chemical Reactions and Equations

## Physical vs Chemical Changes
- **Physical Change**: State ya appearance change hoti hai, naya substance nahi banta (e.g., ice ka paani banana).
- **Chemical Change**: Bilkul naya substance banta hai (e.g., iron ka rusting, wood ka jalna).

## Chemical Equations
Reactants → Products (ke roop mein likhte hain)

**Balancing Rule:** Mass conservation ka niyam — dono sides par atoms ki sankhya equal honi chahiye.

### Balanced Equation Examples
1. 2H₂ + O₂ → 2H₂O (Hydrogen + Oxygen → Water)
2. Fe + CuSO₄ → FeSO₄ + Cu (Iron displaces Copper)
3. 2Mg + O₂ → 2MgO (Magnesium + Oxygen → Magnesium Oxide)
4. NaOH + HCl → NaCl + H₂O (Neutralization reaction)

## Types of Chemical Reactions

| Type | Definition | Example |
|------|-----------|---------|
| Combination | A + B → AB | 2H₂ + O₂ → 2H₂O |
| Decomposition | AB → A + B | 2H₂O → 2H₂ + O₂ |
| Displacement | A + BC → AC + B | Zn + H₂SO₄ → ZnSO₄ + H₂ |
| Double Displacement | AB + CD → AD + CB | NaCl + AgNO₃ → NaNO₃ + AgCl |
| Redox | Oxidation + Reduction saath mein | CuO + H₂ → Cu + H₂O |

## 🔥 EXPERIMENT: Magnesium Ribbon ka Jalna (Board Experiment!)

### Aim (Uddeshy)
Magnesium ribbon ko hawa mein jalane par hone wali chemical reaction observe karna.

### Required Materials (Samagri)
- Magnesium ribbon (Mg)
- Bunsen burner ya candle
- Sandpaper (ribbon saaf karne ke liye)
- China dish ya crucible
- Tongs (chimte)

### Procedure (Vidhi)
1. Pehle **Magnesium ribbon ko sandpaper se saaf karo** — uski surface pe oxide layer hoti hai jo reaction slow karti hai.
2. Mg ribbon ko tongs se pakdo aur bunsen burner ki flame ke paas le jao.
3. Observe karo ki ribbon jalti hai ya nahi.

### Observation (Avlokan)
- Magnesium ribbon **tej safed (dazzling white) roshni** ke saath jalti hai.
- Ek **safed powder** banta hai — yeh Magnesium Oxide (MgO) hai.
- Bahut **zyada heat** produce hoti hai (Exothermic reaction).

### Chemical Equation
> **2Mg (s) + O₂ (g) → 2MgO (s)**
> (Magnesium + Oxygen → Magnesium Oxide)

### Type of Reaction (Kis Type ki Reaction Hai?)
Yeh ek **Combination Reaction** hai — do substances (Mg + O₂) milakar ek naya substance (MgO) banate hain.
Yeh ek **Oxidation Reaction** bhi hai — Magnesium ka oxidation hota hai (oxygen gain karta hai).
Yeh ek **Exothermic Reaction** bhi hai — bahut zyada heat aur light release hoti hai.

### Conclusion (Nishkarsh)
Magnesium ribbon hawaai oxygen ke saath react karke Magnesium Oxide banata hai. Yeh combination + oxidation + exothermic reaction hai. Bright white light produce hoti hai.

### Why Clean the Ribbon? (Saaf Kyun Karte Hain?)
Magnesium ribbon ki surface pe pehle se **MgO ki layer** hoti hai (atmosphere ki oxygen se). Agar sandpaper se saaf nahi karenge toh reaction dhheere hogi ya hogi hi nahi.

---
> 💡 **Agar aapko iska full solution chahiye, diagram aur step-by-step explanation chahiye — toh hamari app install karein. App install karne par Magnesium Experiment ka full PDF aur video explanation milega!**

---

## Exothermic vs Endothermic
- **Exothermic:** Heat release hoti hai (e.g., combustion, respiration, Mg ka jalna)
- **Endothermic:** Heat absorb hoti hai (e.g., cooking, photosynthesis, dissolving NH₄Cl in water)

## Oxidation and Reduction (OIL RIG)
> **O**xidation **I**s **L**oss (of electrons)
> **R**eduction **I**s **G**ain (of electrons)

## 📌 Board Exam Tips
- Magnesium experiment CBSE board mein bar bar aata hai — steps yaad rakho!
- Decomposition reactions 3 types ki hoti hain: thermal, electrolytic, photolytic
- Rancidity = oxidation of fats — antioxidants se rokti hai
- Corrosion = surface ka oxidation (iron ka rust = Fe₂O₃.xH₂O)
- Balanced equations mein subscripts change mat karo — sirf coefficients change karo
  `,

  s10: `
# 🔥 Human Eye and the Colourful World

## 1. Human Eye ki Main Parts aur Unka Kaam

Hamaari aankhein ek natural camera ki tarah hain. Iske main parts neeche diye gaye hain:

- **Cornea:** Aankhon ka sabse baahri transparent layer hai jis par light pehle enter karti hai.
- **Iris & Pupil:** Iris is aankhon ka rang karney wala part hai aur Pupil control karta hai ki kitni light andar jayegi.
- **Ciliary Muscles:** Ye sabse zaruri hain! Lens ki focal length ko badhalti hain — **Accommodation** isi se hota hai.
- **Retina:** Ye aankhon ki "Screen" hai jahan image banti hai.
- **Optic Nerve:** Retina se brain tak image ka signal bhejta hai.
- **Blind Spot:** Jahan optic nerve retina se milti hai — wahan koi rod/cone cells nahi hote, isliye koi image nahi banti.

## 2. Accommodation (Aankhon ki Power)

**Accommodation** = Ciliary muscles aankhon ki focal length ko adjust karne ki power.

- **Near object dekhte waqt:** Ciliary muscles contract karti hain → Lens thick hota hai → focal length kam hoti hai
- **Far object dekhte waqt:** Ciliary muscles relax hoti hain → Lens thin hota hai → focal length zyada hoti hai

**Near Point (Nikatum Bindu):** = 25 cm (normal aankhon ke liye)
**Far Point (Duurasth Bindu):** = Infinity (normal aankhon ke liye)

## 3. Defects of Vision (Aankhon ki Bimariyan)

| Defect (Bimari) | Kya hota hai? | Kaise theek hoti hai? |
|-----------------|---------------|----------------------|
| **Myopia** (Near-sightedness) | Paas ka dikhta hai, door ka nahi | **Concave lens** |
| **Hypermetropia** (Far-sightedness) | Door ka dikhta hai, paas ka nahi | **Convex lens** |
| **Presbyopia** | Budhaape mein dono dikhai dena band | **Bi-focal lens** |
| **Astigmatism** | Aadha-aadha dhundhla | **Cylindrical lens** |

### Myopia (Nikatudrushti) — Kyu Hota Hai?
1. Eyeball ki length zyada lambi ho jaati hai, ya
2. Cornea/lens ki curvature zyada zyada ho jaati hai
→ Image retina ke AAGE ban jaati hai
→ **Fix:** Concave (Apasaari) lens use karo

### Hypermetropia (Duurdrushti) — Kyu Hota Hai?
1. Eyeball ki length chhoti ho jaati hai, ya
2. Focal length zyada lambi ho jaati hai
→ Image retina ke PEECHHEY banegi
→ **Fix:** Convex (Abhisaari) lens use karo

## 4. Atmospheric Refraction (Aisa Kyun Hota Hai?)

**Science ko luch:** Atmosphere mein alag-alag layers mein light baar-baar bend karti hai.

- **Twinkling of Stars (Taaron ka timmimana):** Aasman mein puri raat taare timmimate hain kyunki atmosphere ki alag-alag layers mein light bar-bar refract hoti rehti hai.
- **Planets do not twinkle:** Planets hamare zyada paas hain — extended source hote hain, isliye net deviation near zero hota hai.
- **Sun dikh jaata hai 2 minute pehle:** Atmosphere refracts karta hai — actually sun horizon ke neeche hota hai par hume dikh raha hota hai.
- **Tyndall Effect:** Jab dhool (dust particles) se takra ke light phailti hai (scattering) — yahi Rainbow, Blue Sky, Red Sunset ka reason hai.

## 5. Scattering of Light — Rainbow aur Rang

**Prism se Dispersion:** White light prism se VIBGYOR mein split hoti hai:
> **V**iolet, **I**ndigo, **B**lue, **G**reen, **Y**ellow, **O**range, **R**ed

**Rainbow kaise banta hai?**
1. Sun ki light water droplets mein enter karti hai
2. Refraction → Dispersion → Total Internal Reflection → Refraction phir
3. VIBGYOR rang dikhte hain (Violet andar, Red bahar)

**Blue Sky kyun hai?**
> Rayleigh Scattering: Blue light (chhota wavelength) zyada scatter hoti hai atmosphere mein.

**Red Sunset/Sunrise kyun hota hai?**
> Sun horizon par hota hai → light ko zyada atmosphere travel karna padta hai → Blue scatter ho jaata hai → Only Red/Orange bacha

## 📌 Board Exam ke Liye Super Important

- **Accommodation** = Ciliary muscles ki power — MUST KNOW
- Myopia → Concave, Hypermetropia → Convex — guaranteed question
- Tyndall Effect = scattering of light by colloidal particles
- Power of lens formula: **P = 1/f** (f meters mein, P Dioptre mein)
- Human eye ki least distance of distinct vision = **25 cm**
  `,

  s9: `
# Light – Reflection and Refraction

## Laws of Reflection
1. Angle of incidence = Angle of reflection (∠i = ∠r)
2. Incident ray, reflected ray, and normal — teeno ek hi plane mein hote hain.

## Types of Mirrors

| Mirror | Image Type | Uses |
|--------|-----------|------|
| Concave | Real + Inverted (mostly) | Dentist's mirror, torches, solar furnaces |
| Convex | Virtual + Erect + Diminished | Rear-view mirrors |
| Plane | Virtual + Erect + Same size | Dressing mirrors |

## Mirror Formula
> **1/v + 1/u = 1/f**

> **Magnification m = -v/u = h'/h**

**Sign Convention:** Object always on LEFT, distances left = negative, right = positive.

## Refraction of Light
Light ek medium se doosre medium mein jaate waqt bend hoti hai — ise **Refraction** kehte hain.

## Snell's Law
> **n₁ sin θ₁ = n₂ sin θ₂**

> **n = c/v** (refractive index = speed of light in vacuum / speed in medium)

## Lenses

| Lens | Image | Use |
|------|-------|-----|
| Convex (Converging) | Real + Inverted (mostly) | Magnifying glass, eye |
| Concave (Diverging) | Virtual + Erect + Small | Spectacles for myopia |

**Lens Formula:** 1/v - 1/u = 1/f

**Power of Lens:** P = 1/f (f in metres, P in Dioptre D)

## 📌 Board Tips
- Mirror formula same hai Lens formula se — dhyan se use karo signs
- Concave mirror uses: TEETH (solar furnace, shaving, headlights, dentist)
- Convex mirror uses: rear-view (wide field of view)
  `,

  ss1: `
# The Rise of Nationalism in Europe

## French Revolution (1789) — Seed of Nationalism
- France mein "La Patrie" (the fatherland) aur "Le Citoyen" (the citizen) ki concept aayi
- Tricolour flag, Marseillaise (national anthem) — nationalist symbols banaye gaye
- Revolutionary armies poore Europe mein nationalism ka idea phailayi

## Napoleon Bonaparte's Role
- Napoleon ne Europe ke laws unify kiye — **Napoleonic Code**
- Feudalism khatam kiya, peasants ko azaadi di
- BUT: Napoleon ne bhi baaki nations par raj kiya → Counter-nationalism jaaga

## The Conservative Order (1815 — Congress of Vienna)
- Napoleon ke haarne ke baad **conservative powers** (Britain, Prussia, Russia, Austria) ne Europe ki map phir se banayi
- **Metternich** (Austria ka diplomat) = liberalism ka dushman

## Romanticism — Ek Nationalist Idea
- Art, poetry, music ne nationalism ko feel karaya
- Painters ne battle scenes aur national heroes banaye
- **Johann Gottfried Herder** (Germany) ne "volk" (people) ki concept di

## Unification of Germany
1. **Otto von Bismarck** = Prussia ka chancellor — "Blood and Iron" policy
2. Teen wars (Denmark, Austria, France) jeetke Germany unify kiya
3. 1871 — **German Empire** proclaimed at Versailles

## Unification of Italy
1. **Mazzini** — Young Italy movement — Republican Italy ka sapna
2. **Garibaldi** — Red Shirts army ke saath south Italy jeeta
3. **Cavour** — Diplomatic mastermind
4. 1861 — Italy unified, **Victor Emmanuel II** pehle king

## Nationalism in the Balkans
- Ottoman Empire ka collapse → Balkan states mein independence movements
- Russia vs Austria-Hungary → **"Powder Keg of Europe"**
- Result: **World War I** ki buniyaad

## 📌 Board Exam Key Points
- Frederic Sorrieu ka 1848 ka utopian vision = Democratic and Social Republics
- Ernst Moritz Arndt = German nationalist poet
- Frankfurt Parliament 1848 = first liberal nationalist movement (failed)
- **Zollverein** = German custom union (economic nationalism)
  `,

  e1: `
# A Letter to God

## Summary
Lencho ek kisan hai jo apni crops ke liye God par bahut bharosa karta hai. Ek toofan se uski poori fasal barbad ho jaati hai. Woh God ko ek letter likhta hai 100 pesos maangne ke liye. Post office ke log letter padh ke hasdte hain, phir mil-julke 70 pesos collect karke bhejte hain. Lencho jab sirf 70 pesos milte hain toh woh phir se likhta hai ki "baaki paise mat bhejo — woh log bahut bure hain (post office workers)."

## Characters
- **Lencho** — Kisan, God par pure bharosa rakhne wala
- **Postmaster** — Insaan ki achhaai ka pratik

## Themes
1. **Faith / Vishwas** — Lencho ka God par complete trust
2. **Human Kindness** — Post office workers ki madad
3. **Irony** — Jo log madad karte hain unhe hi Lencho chor samajhta hai

## Important Quotes
> "Lencho showed not the slightest surprise on seeing the money; such was his confidence."

> "God could not have made a mistake, nor could He have denied Lencho what he had requested."

## Literary Devices
- **Irony:** Lencho God par trust karta hai par insanon par nahi
- **Personification:** Locusts described as "a plague of locusts"
- **Metaphor:** Coins = drops of new silver

## Grammar Focus
- Past Perfect Tense examples from the chapter
- Reported Speech: "He said that God could not..."

## 📌 Board Exam Important
- "What does Lencho mean by 'a plague of locusts'?" — 2 mark answer
- Character sketch of Postmaster (100 words) — 5 marks
- Theme of faith and irony — guaranteed question
  `,

  e_letter: `
# ✉️ Letter Writing — Full Marks Strategy (Class 10 English)

## Board Exam Mein Letter Kitna Important Hai?
Letter Writing = **5 marks** guaranteed aate hain! Agar format sahi hai toh 4-5 marks pakke hain.

---

## 📋 Types of Letters in Class 10

| Type | Kab likhte hain | Tone |
|------|-----------------|------|
| **Formal Letter** | Government/Company/Editor ko | Professional, polite |
| **Informal Letter** | Friend/Relative ko | Friendly, casual |

---

## 🏛️ Formal Letter Format (Full Marks Template)

\`\`\`
[Your Address]
[City, PIN]
[Date: DD Month YYYY]

The [Designation],
[Organization Name],
[Address]

Subject: [Brief subject in one line]

Sir/Madam,

[Opening Paragraph — State the purpose clearly]

[Main Body — Give details, reasons, or requests]

[Closing Paragraph — State what action you expect]

Yours faithfully,
[Your Name]
\`\`\`

### Types of Formal Letters:
1. **Letter to Editor** — Newspaper mein problem report karna
2. **Letter to Principal** — School se kuch maangna
3. **Letter of Complaint** — Product/Service ki complaint
4. **Letter of Enquiry** — Kisi cheez ke baare mein jaankari maangna
5. **Letter for Job Application** — Job ke liye apply karna

---

## 👫 Informal Letter Format

\`\`\`
[Your Address]
[City, PIN]
[Date]

Dear [Name/Dost ka naam],

[Opening — Kuch pyaari baatein, halchal]

[Main Content — Jo topic hai uske baare mein likho]

[Closing — Milne ki ichha, family ko pranam]

Yours lovingly/affectionately,
[Your Name]
\`\`\`

---

## ✅ Do's & Don'ts (Full Marks Tips)

### ✅ ZAROOR Karo:
- Subject line Formal letter mein likho (bold ya underline)
- Date sahi format mein: 8 April 2026 ✓ (8/4/2026 ✗)
- Signature ke upar "Yours faithfully" (Formal) ya "Yours lovingly" (Informal)
- Paragraphs alag karo — ek hi block mein mat likho
- Word limit follow karo: usually 120-150 words

### ❌ Galti Mat Karo:
- Formal letter mein "Dear Friend" mat likho
- Informal mein "Sir/Madam" mat likho  
- Subject Line informal mein zaroorat nahi
- Spelling mistakes = marks katenge
- Bahut choti ya bahut badi mat likho

---

## 📝 Sample Letter — Letter to Editor

**Q: Write a letter to the Editor of a newspaper about increasing pollution in your city.**

---

12-B, Gandhi Nagar  
Agra — 282001  
8 April 2026

The Editor,  
The Hindustan Times,  
New Delhi

**Subject: Alarming rise in air pollution in Agra**

Sir,

Through the columns of your esteemed newspaper, I wish to draw the attention of the concerned authorities towards the alarming rise in air pollution in our city.

The air quality in Agra has deteriorated significantly over the past few months. Factory emissions, construction dust, and vehicular smoke have made breathing difficult for residents. The situation is especially dangerous for senior citizens and children.

I request the authorities to take strict action against polluting industries and promote the use of public transport. Mandatory pollution checks for vehicles should be implemented immediately.

Yours faithfully,  
Rahul Sharma

---

## 🏆 95% Marks Strategy for Letter Writing

1. **Format = 1 mark** — Address, Date, Subject, Salutation, Closing
2. **Content = 2-3 marks** — Relevant points, clear language
3. **Language = 1 mark** — No grammatical errors
4. **Word Limit = 0.5 mark** — Stay within 100-150 words

**Pro Tip:** Examiner pehle format dekhta hai — agar format perfect ho toh marks guaranteed!
  `,

  ss_map: `
# 🗺️ Map Work Class 10 — Complete Guide 2026-27

## Map Work Kitne Marks Ka Hai?
SST board paper mein **3 marks** Map Work ke hote hain — aur yeh sabse easy marks hain!

---

## 📜 HISTORY MAP WORK — Important Locations

### Nationalism in India (Chapter 2)
| Location | Kyon Important |
|----------|----------------|
| **Champaran (Bihar)** | Indigo Plantation Movement — Gandhi ji ka pehla satyagraha |
| **Kheda (Gujarat)** | Peasant Satyagraha — tax maafi ki maang |
| **Ahmedabad (Gujarat)** | Mill Workers Satyagraha 1918 |
| **Amritsar (Punjab)** | Jallianwala Bagh Massacre 1919 |
| **Chauri Chaura (UP)** | Violent incident — NCM suspended |
| **Dandi (Gujarat)** | Salt March 1930 — Gandhi 241 mile walk |
| **Bardoli (Gujarat)** | No-Tax Campaign — Sardar Patel |

### The Rise of Nationalism in Europe
| Location | Event |
|----------|-------|
| **Sardinia-Piedmont** | Italian unification ka centre |
| **Frankfurt** | Frankfurt Parliament 1848 |
| **Vienna** | Congress of Vienna 1815 |

---

## 🌍 GEOGRAPHY MAP WORK — Important Points

### Agriculture (Chapter 4)
| Crop | Important States/Regions |
|------|--------------------------|
| **Rice** | West Bengal, Uttar Pradesh, Andhra Pradesh |
| **Wheat** | Punjab, Haryana, Uttar Pradesh |
| **Tea** | Assam, West Bengal (Darjeeling) |
| **Coffee** | Karnataka (Coorg), Kerala |
| **Cotton** | Maharashtra, Gujarat, Andhra Pradesh |
| **Jute** | West Bengal (major producer) |
| **Sugarcane** | Uttar Pradesh, Maharashtra |
| **Rubber** | Kerala |

### Industries (Chapter 6)
| Industry | Location |
|----------|----------|
| **Iron & Steel** | Jamshedpur (TISCO), Bhilai, Rourkela, Durgapur, Bokaro |
| **Cotton Textile** | Mumbai, Ahmedabad, Surat, Kanpur |
| **Jute** | Hooghly River — West Bengal |
| **Software (IT)** | Bengaluru, Hyderabad, Chennai, Pune, Delhi NCR |
| **Petrochemical** | Jamnagar, Vadodara, Mumbai |

### Water Resources (Chapter 3)
| Dam/River | State | River |
|-----------|-------|-------|
| **Bhakra Nangal** | Punjab/Himachal | Sutlej |
| **Hirakud** | Odisha | Mahanadi |
| **Nagarjunasagar** | Andhra Pradesh | Krishna |
| **Idukki** | Kerala | Periyar |
| **Tehri** | Uttarakhand | Bhagirathi |

### Power Plants (Chapter 7)
| Type | Examples |
|------|---------|
| **Thermal** | Ramagundam, Singrauli, Korba, Farakka |
| **Nuclear** | Narora (UP), Rawatbhata (Raj), Kalpakkam (TN), Tarapur (Mah), Kaiga (Kar), Kakrapar (Guj) |
| **Hydro** | Bhakra Nangal, Hirakud, Koyna |

---

## 🎯 Map Work Exam Tips

1. **Pencil se mark karo** — pen galat lag sakta hai
2. **Arrow aur naam clearly likho** — dots nahi
3. **State boundaries dhyan se dekho** — confusion hoti hai
4. **Roz ek state identify karo** — practice se aata hai
5. **Atlas saath rakho padhai mein** — NCERT map book

## 📌 Most Expected in Board Exam 2026-27
- Jallianwala Bagh, Dandi, Chauri Chaura (History)
- Jamshedpur/Bhilai (Steel), Mumbai/Ahmedabad (Cotton) (Industry)
- Bhakra Nangal, Hirakud (Dams)
- Nuclear Power Plants (all 6 locations)
- Major crop growing areas
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
  ],
  s10: [
    { id: "q_s10_1", text: "What is meant by 'power of accommodation' of an eye?", marks: 2, year: "2023" },
    { id: "q_s10_2", text: "A student cannot see clearly objects at a distance greater than 5 m. What is the defect of vision and how can it be corrected?", marks: 3, year: "2022" },
    { id: "q_s10_3", text: "Explain with a diagram why the sky appears blue during the day but the horizon appears red during sunset.", marks: 5, year: "2022" },
    { id: "q_s10_4", text: "Why do stars twinkle but planets do not?", marks: 2, year: "2021" },
    { id: "q_s10_5", text: "Draw a ray diagram to show the formation of a rainbow.", marks: 3, year: "2020" },
    { id: "q_s10_6", text: "What is Tyndall Effect? Give two examples from daily life.", marks: 2, year: "2023" },
    { id: "q_s10_7", text: "An elderly person can read a book only when it is held at 60 cm or more. What is the defect of vision? Which lens is used to correct it?", marks: 3, year: "2019" },
    { id: "q_s10_8", text: "List three differences between Myopia and Hypermetropia.", marks: 3, year: "2021" },
  ],
  s9: [
    { id: "q_s9_1", text: "A concave mirror produces three times magnified image on a screen. If object is placed 10 cm in front of mirror, how far is the screen from the mirror?", marks: 3, year: "2022" },
    { id: "q_s9_2", text: "Why does a ray of light bend when it travels from one medium to another?", marks: 2, year: "2021" },
    { id: "q_s9_3", text: "Find the focal length of a convex lens if it forms a real image at 30 cm with object at 15 cm.", marks: 3, year: "2020" },
    { id: "q_s9_4", text: "State the laws of reflection of light.", marks: 2, year: "2019" },
    { id: "q_s9_5", text: "Distinguish between real image and virtual image.", marks: 2, year: "2023" },
  ],
  ss1: [
    { id: "q_ss1_1", text: "Explain the role of Otto von Bismarck in the unification of Germany.", marks: 5, year: "2022" },
    { id: "q_ss1_2", text: "What was the significance of the French Revolution for the rise of nationalism in Europe?", marks: 3, year: "2021" },
    { id: "q_ss1_3", text: "What is Zollverein? How did it help in German unification?", marks: 2, year: "2020" },
    { id: "q_ss1_4", text: "Describe the role of Giuseppe Mazzini in Italian unification.", marks: 3, year: "2019" },
    { id: "q_ss1_5", text: "Who were 'Liberals', 'Radicals', and 'Conservatives'? How did they differ?", marks: 3, year: "2023" },
  ],
  e1: [
    { id: "q_e1_1", text: "What does Lencho mean when he says the rain was 'a plague of locusts'?", marks: 2, year: "2022" },
    { id: "q_e1_2", text: "Write a character sketch of the postmaster in 'A Letter to God'.", marks: 5, year: "2021" },
    { id: "q_e1_3", text: "What is the central theme of 'A Letter to God'? Explain with examples.", marks: 5, year: "2023" },
    { id: "q_e1_4", text: "Why did the post office employees call Lencho an 'ox of a man'?", marks: 1, year: "2020" },
    { id: "q_e1_5", text: "What was the irony in Lencho's second letter to God?", marks: 3, year: "2019" },
  ],
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
  { id: "t11", title: "NCERT Pehle, Baaki Baad", description: "95% board questions NCERT se hi aate hain. Pehle NCERT line-by-line padho, phir guides dekho.", icon: "BookOpen" },
  { id: "t12", title: "PYQs — Secret Weapon", description: "Last 5 saal ke previous year questions solve karo. Pattern samajh aayega aur same questions repeat hote hain.", icon: "FileText" },
  { id: "t13", title: "Revision Plan: 1-3-7-30", description: "Jo padha hai use 1 din baad revise karo, phir 3 din baad, phir 7 din baad, phir 30 din baad — pakka yaad rahega.", icon: "CalendarRange" },
  { id: "t14", title: "Mock Tests Zaroor Do", description: "Exam se 1 mahina pehle poore paper ko time mein solve karo. 3 ghante mein 80 marks — practice karo.", icon: "Clock" },
];
