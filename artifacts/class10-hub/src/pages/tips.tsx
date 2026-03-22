import { motion } from "framer-motion";
import { STUDY_TIPS } from "@/lib/mock-data";
import { 
  Clock, BrainCircuit, CalendarRange, Users, Network, 
  FileText, Moon, Highlighter, Target, Droplets, Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Clock, BrainCircuit, CalendarRange, Users, Network, 
  FileText, Moon, Highlighter, Target, Droplets
};

export default function Tips() {
  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-8 md:py-12">
        
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4 font-medium text-sm">
              <Sparkles size={16} /> Maximize Efficiency
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-6 leading-tight">
              Study Smarter,<br/> Not Harder.
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover proven, science-backed study techniques that will help you absorb information faster, retain it longer, and ace your Class 10 board exams with less stress.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="aspect-video w-full rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 mix-blend-overlay z-10" />
              <img 
                src={`${import.meta.env.BASE_URL}images/study-illustration.png`} 
                alt="Student Studying Illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDY_TIPS.map((tip, idx) => {
            const Icon = iconMap[tip.icon] || Lightbulb;
            
            return (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 3) * 0.1 }}
                className="bg-card border border-border rounded-3xl p-6 md:p-8 hover:border-primary/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Number watermark */}
                <div className="absolute -right-4 -top-8 text-9xl font-display font-black text-secondary/40 select-none pointer-events-none group-hover:text-primary/5 transition-colors duration-500">
                  {idx + 1}
                </div>
                
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-foreground mb-6 shadow-inner relative z-10 group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 relative z-10">{tip.title}</h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">{tip.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
