import { CURRENT_SESSION } from "../constants";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Brain, Download, Lightbulb, ArrowRight, Target, Flame } from "lucide-react";

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
  return (
    <div className="container mx-auto px-4 md:px-6">
      
      {/* Promo Banner */}
      <div 
        className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-2xl mb-6 mt-6 shadow-xl flex justify-between items-center cursor-pointer hover:scale-105 transition-transform" 
        onClick={() => window.location.href='/recommended-books'}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📚</span>
          <div>
            <h3 className="font-bold text-sm md:text-base">Board Exam Special!</h3>
            <p className="text-xs opacity-90">Best Class 10 Books (40% OFF)</p>
          </div>
        </div>
        <button className="bg-white text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">Check Price</button>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium text-sm mb-2">
            <Flame className="text-orange-500" size={16} />
            <span>Targeting {CURRENT_SESSION} Board Exams</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-tight text-foreground">
            The All-in-One <br /><span className="text-gradient">Class 10</span> Study Platform
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Stop searching multiple sites. Get perfectly structured notes, most expected questions, and premium study materials—all in one beautiful place.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <Link href="/notes">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2">
                Start Studying <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/questions">
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-card text-foreground font-bold text-lg border-2 border-border hover:border-primary/50 hover:bg-secondary transition-all cursor-pointer flex items-center justify-center gap-2">
                <Target size={20} /> Practice Questions
              </button>
            </Link>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
            <img alt="Class 10 Education Abstract" className="object-contain w-full h-full drop-shadow-2xl rounded-3xl" src="/images/hero-abstract.png" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Explore Sections</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need organized perfectly to save your time and boost your marks.
          </p>
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
                variants={itemVariants as any}
                className="group h-full bg-card rounded-3xl p-6 border border-border hover:border-primary/30 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <div className={`bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`}>
                    <feature.icon size={28} className="text-current" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm flex-1">{feature.description}</p>
                <div className="mt-6 flex items-center font-semibold text-sm text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowRight size={16} className="ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

    </div>
  );
}
