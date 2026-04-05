import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Brain, CheckCircle, Target, Users, Zap, Award } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, scaleIn, popIn, viewportOnce } from "@/lib/animations";

const stats = [
  { value: "10+", label: "Subjects Covered", icon: BookOpen, color: "text-blue-500" },
  { value: "500+", label: "Practice Questions", icon: Brain, color: "text-purple-500" },
  { value: "95%+", label: "Target Score", icon: Target, color: "text-green-500" },
  { value: "Free", label: "Always Free", icon: Award, color: "text-orange-500" },
];

const offers = [
  "Latest CBSE Class 10 Notes 2026",
  "Chapter-wise Important Questions",
  "NCERT Solutions & Sample Papers",
  "AI-Powered Study Assistant",
  "Previous Year Question Papers",
  "Daily Practice Quiz",
];

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-14"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30 animate-float"
        >
          <GraduationCap size={44} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-6xl font-display font-extrabold mb-4"
        >
          About <span className="text-gradient">Class 10 Hub</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          A dedicated educational platform designed specifically for{" "}
          <strong>CBSE Class 10 students (2026-2027 Session)</strong>. Our mission is to
          provide high-quality, simplified study material to help every student score{" "}
          <strong className="text-primary">95%+</strong> in their Board Exams.
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={scaleIn}
            whileHover={{ scale: 1.06, y: -4 }}
            className="bg-card border border-border rounded-2xl p-5 text-center shadow-sm cursor-default"
          >
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 10 }}
              className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3 ${stat.color}`}
            >
              <stat.icon size={22} />
            </motion.div>
            <div className="text-2xl font-display font-extrabold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* What We Offer + Our Aim */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="bg-card p-8 rounded-2xl border border-border shadow-sm"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
            >
              <BookOpen size={22} className="text-blue-600 dark:text-blue-400" />
            </motion.div>
            What We Offer
          </h2>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-3"
          >
            {offers.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeLeft}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <motion.div whileHover={{ scale: 1.3, rotate: 5 }}>
                  <CheckCircle size={17} className="text-green-500 shrink-0" />
                </motion.div>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="bg-card p-8 rounded-2xl border border-border shadow-sm"
        >
          <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
            >
              <GraduationCap size={22} className="text-purple-600 dark:text-purple-400" />
            </motion.div>
            Our Aim
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground leading-relaxed mb-4"
          >
            We understand the pressure of <strong>Class 10 Board Exams</strong>.
            That's why Class 10 Hub focuses on the most repeated questions and
            simplified NCERT concepts.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground leading-relaxed"
          >
            Based in <strong>Taraori, Haryana</strong>, we aim to reach every student
            across India who dreams of topping their exams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5 }}
            className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Users size={16} />
            <span>Serving students across all of India</span>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        whileHover={{ scale: 1.01 }}
        className="text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-10 rounded-3xl border-2 border-dashed border-primary/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-4"
        >
          🎯
        </motion.div>
        <h3 className="text-2xl font-display font-bold mb-2">Focusing on CBSE 2026-27 Success</h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          All our content is updated according to the latest{" "}
          <strong>CBSE Syllabus 2026</strong>. Start your preparation today with the best
          resources available online.
        </p>
        <motion.div
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(99,102,241,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          <Zap size={16} />
          Start Studying Now — It's Free!
        </motion.div>
      </motion.div>
    </div>
  );
}
