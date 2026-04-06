import { CURRENT_SESSION } from "../constants";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Brain, Download, Lightbulb, ArrowRight, Target, Flame, Sparkles } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, scaleIn, popIn, viewportOnce } from "@/lib/animations";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

const features = [
  {
    title: "Subject Notes",
    description: "Detailed, chapter-wise notes for all major subjects.",
    icon: BookOpen,
    path: "/notes",
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
    emoji: "📚",
  },
  {
    title: "Important Q's",
    description: "Curated questions with a built-in progress tracker.",
    icon: Brain,
    path: "/questions",
    color: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
    emoji: "🧠",
  },
  {
    title: "PDF Downloads",
    description: "Sample papers and NCERT solutions in PDF format.",
    icon: Download,
    path: "/pdfs",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
    emoji: "📥",
  },
  {
    title: "Study Tips",
    description: "Proven techniques to maximize your study efficiency.",
    icon: Lightbulb,
    path: "/tips",
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
    emoji: "💡",
  },
];

export default function Home() {
  useSEO(SEO_DATA.home);
  return (
    <div className="container mx-auto px-4 md:px-6">

      {/* Promo Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(249,115,22,0.25)" }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-2xl mb-6 mt-6 shadow-xl flex justify-between items-center cursor-pointer"
        onClick={() => window.location.href = '/recommended-books'}
      >
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="text-2xl"
          >
            📚
          </motion.span>
          <div>
            <h3 className="font-bold text-sm md:text-base">Board Exam Special!</h3>
            <p className="text-xs opacity-90">Best Class 10 Books (40% OFF)</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
        >
          Check Price
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">

        {/* Text Side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium text-sm mb-2"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="text-orange-500" size={16} />
            </motion.div>
            <span>Targeting {CURRENT_SESSION} Board Exams</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight text-foreground"
          >
            The All-in-One <br />
            <span className="text-gradient-animated">Class 10</span> Study Platform
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
          >
            Stop searching multiple sites. Get perfectly structured notes, most expected
            questions, and premium study materials—all in one beautiful place.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
          >
            <Link href="/notes">
              <motion.button
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                Start Studying
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </Link>
            <Link href="/questions">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border-2 border-border hover:border-primary/50 hover:bg-secondary transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Target size={20} /> Practice Questions
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-3 justify-center lg:justify-start pt-2"
          >
            {["✅ Free Forever", "📱 Mobile Friendly", "🎯 Board Focused"].map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className="text-xs font-semibold bg-secondary px-3 py-1.5 rounded-full border border-border"
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none"
        >
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-primary/10 animate-pulse-ring" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-accent/10 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
            </div>
            <motion.img
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              alt="Class 10 Education Abstract"
              className="object-contain w-full h-full drop-shadow-2xl rounded-3xl relative z-10"
              src="/images/hero-abstract.png"
            />

            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-6 right-8 text-yellow-400"
            >
              <Sparkles size={24} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-10 left-8 text-primary"
            >
              <Sparkles size={18} />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AdSense */}
      <div className="container mx-auto px-4 my-8 flex justify-center">
        <ins className="adsbygoogle"
          style={{ display: 'block', width: '100%', textAlign: 'center' }}
          data-ad-client="ca-pub-1922010090842018"
          data-ad-slot="7029376227"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
      <script>
        {`(window.adsbygoogle = window.adsbygoogle || []).push({});`}
      </script>

      {/* Features Grid */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore Sections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need organized perfectly to save your time and boost your marks.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <Link key={feature.title} href={feature.path}>
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="group h-full bg-card rounded-3xl p-6 border border-border hover:border-primary/30 shadow-lg shadow-black/5 transition-colors duration-300 cursor-pointer relative overflow-hidden flex flex-col"
              >
                {/* Animated background blob */}
                <div className={`absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500`} />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6`}
                >
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    <feature.icon size={28} className="text-current" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="mt-6 flex items-center font-semibold text-sm text-primary"
                >
                  Explore <ArrowRight size={16} className="ml-1" />
                </motion.div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        className="py-16 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-10 border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-60px] left-[-60px] w-48 h-48 bg-primary/10 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute bottom-[-60px] right-[-60px] w-48 h-48 bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-4"
          >
            🚀
          </motion.div>
          <h2 className="text-3xl font-display font-bold mb-3">Ready to Score 95%+?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of Class 10 students preparing smarter with Class 10 Hub.
          </p>
          <Link href="/quiz">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: "0 16px 32px rgba(99,102,241,0.3)" }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl"
            >
              Take the Daily Quiz →
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}
