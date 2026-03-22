import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Brain, Download, Lightbulb, ArrowRight, Target, Flame, Trophy } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

const features = [
  {
    title: "Subject Notes",
    description: "Detailed, chapter-wise notes for all major subjects.",
    icon: BookOpen,
    path: "/notes",
    color: "from-blue-500 to-indigo-500",
    bgLight: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Important Q's",
    description: "Curated questions with a built-in progress tracker.",
    icon: Brain,
    path: "/questions",
    color: "from-violet-500 to-purple-500",
    bgLight: "bg-violet-50 dark:bg-violet-950/30",
  },
  {
    title: "PDF Downloads",
    description: "Sample papers and NCERT solutions in PDF format.",
    icon: Download,
    path: "/pdfs",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Study Tips",
    description: "Proven techniques to maximize your study efficiency.",
    icon: Lightbulb,
    path: "/tips",
    color: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50 dark:bg-orange-950/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Home() {
  const { totalCompleted, isLoaded } = useProgress();

  return (
    <div className="container mx-auto px-4 md:px-6">
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-28 flex flex-col-reverse lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium text-sm mb-2">
            <Flame size={16} className="text-orange-500" />
            <span>Targeting 95%+ in Board Exams</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight text-foreground">
            The All-in-One <br/>
            <span className="text-gradient">Class 10</span> Study Platform
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Stop searching multiple sites. Get perfectly structured notes, most expected questions, and premium study materials—all in one beautiful place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Link href="/notes">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-primary text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2">
                Start Studying <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/questions">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border-2 border-border hover:border-primary/50 hover:bg-secondary transition-all cursor-pointer flex items-center justify-center gap-2">
                <Target size={20} /> Practice Questions
              </button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full max-w-lg lg:max-w-none"
        >
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
            {/* Using the generated image */}
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-abstract.png`} 
              alt="Class 10 Education Abstract" 
              className="object-contain w-full h-full drop-shadow-2xl rounded-3xl"
            />
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-5%] glass-card p-4 rounded-2xl flex items-center gap-3 hidden md:flex"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">New Notes</p>
                <p className="text-xs text-muted-foreground">Science added</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[15%] right-[-5%] glass-card p-4 rounded-2xl flex items-center gap-3 hidden md:flex"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Questions Solved</p>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-8 mb-12"
      >
        <div className="glass-card rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white shadow-lg">
              <Trophy size={32} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold">Your Progress</h3>
              <p className="text-muted-foreground">Questions mastered so far</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-5xl font-extrabold font-display text-gradient mb-1">
              {isLoaded ? totalCompleted : "..."}
            </div>
            <p className="font-medium text-foreground">Questions Done</p>
          </div>
          
          <Link href="/questions">
            <button className="px-6 py-3 rounded-xl bg-card border border-border hover:border-primary/50 font-semibold transition-all cursor-pointer w-full md:w-auto shadow-sm">
              Continue Practice
            </button>
          </Link>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore Sections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need organized perfectly to save your time and boost your marks.</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <Link key={i} href={feature.path}>
              <motion.div 
                variants={itemVariants}
                className="group h-full bg-card rounded-3xl p-6 border border-border hover:border-primary/30 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    <feature.icon size={28} className="text-current drop-shadow-sm" style={{ stroke: 'url(#gradient-' + i + ')' }} />
                  </div>
                </div>
                
                {/* SVG Gradient definition for icon stroke hack */}
                <svg width="0" height="0">
                  <linearGradient id={`gradient-${i}`} x1="100%" y1="100%" x2="0%" y2="0%">
                    <stop stopColor={`var(--color-${feature.color.split('-')[1]})`} offset="0%" />
                    <stop stopColor={`var(--color-${feature.color.split('-')[3]})`} offset="100%" />
                  </linearGradient>
                </svg>

                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
                
                <div className="mt-6 flex items-center font-semibold text-sm text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowRight size={16} className="ml-1" />
                </div>
                
                {/* Decorative background glow on hover */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full blur-[50px] opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
