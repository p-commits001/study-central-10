import { motion } from "framer-motion";
import { STUDY_TIPS } from "@/lib/mock-data";
import {
  Clock, BrainCircuit, CalendarRange, Users, Network,
  FileText, Moon, Highlighter, Target, Droplets, Sparkles, Lightbulb
} from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, scaleIn, viewportOnce } from "@/lib/animations";

const iconMap: Record<string, React.ElementType> = {
  Clock, BrainCircuit, CalendarRange, Users, Network,
  FileText, Moon, Highlighter, Target, Droplets
};

export default function Tips() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-8 md:py-12">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 font-medium text-sm"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles size={16} />
              </motion.div>
              Maximize Efficiency
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight"
            >
              Study Smarter,<br />
              <span className="text-gradient">Not Harder.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-lg text-muted-foreground"
            >
              Discover proven, science-backed study techniques that will help you absorb information
              faster, retain it longer, and ace your Class 10 board exams with less stress.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-6 mt-8"
            >
              {[["10+", "Tips"], ["95%+", "Success Rate"], ["100%", "Free"]].map(([val, label]) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.06 }}
                  className="text-center"
                >
                  <div className="text-2xl font-display font-extrabold text-primary">{val}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            <div className="aspect-video w-full rounded-3xl overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay z-10" />
              <motion.img
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                src={`${import.meta.env.BASE_URL}images/study-illustration.png`}
                alt="Student Studying Illustration"
                className="w-full h-full object-cover"
              />
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-gray-900/90 rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2 text-sm font-bold"
              >
                <Lightbulb size={16} className="text-amber-500" />
                Science-Backed Tips
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tips Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {STUDY_TIPS.map((tip, idx) => {
            const Icon = iconMap[tip.icon] || Lightbulb;

            return (
              <motion.div
                key={tip.id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-card border border-border rounded-3xl p-6 md:p-8 hover:border-primary/40 shadow-sm transition-colors duration-300 relative overflow-hidden group cursor-default"
              >
                {/* Number watermark */}
                <div className="absolute -right-4 -top-8 text-9xl font-display font-black text-secondary/40 select-none pointer-events-none group-hover:text-primary/8 transition-colors duration-500">
                  {idx + 1}
                </div>

                {/* Animated gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/3 group-hover:to-accent/3 transition-all duration-500 rounded-3xl" />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-foreground mb-6 shadow-inner relative z-10 group-hover:text-primary transition-colors duration-300"
                >
                  <Icon size={28} />
                </motion.div>

                <h3 className="text-xl font-display font-bold mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">{tip.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{tip.description}</p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06, duration: 0.5 }}
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary/40 to-accent/40 origin-left"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom motivational banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          whileHover={{ scale: 1.01 }}
          className="mt-16 text-center bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 rounded-3xl p-10 border border-amber-500/20"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl mb-4"
          >
            🎯
          </motion.div>
          <h3 className="text-2xl font-display font-bold mb-2">Consistency is Key!</h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Even 2–3 hours of focused study daily with these techniques can make you a
            Class 10 board topper. Start today!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
