import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-card p-8 rounded-3xl border border-border shadow-xl mt-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Get in Touch</h1>
          <p className="text-muted-foreground font-medium">Koi sawal hai? Hame message bhejein!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <Mail size={26} />
              </div>
              <div>
                <p className="font-bold text-lg">Email Us</p>
                <p className="text-muted-foreground">bkon02980@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 group">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <MapPin size={26} />
              </div>
              <div>
                <p className="font-bold text-lg">Location</p>
                <p className="text-muted-foreground">Taraori, Haryana</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            action="https://formspree.io/f/xnjoarbk" 
            method="POST" 
            className="space-y-5"
          >
            <div className="space-y-2">
              <input 
                name="name" 
                type="text"
                placeholder="Aapka Naam" 
                required 
                className="w-full p-4 bg-secondary/50 rounded-2xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <input 
                name="email" 
                type="email" 
                placeholder="Aapki Email" 
                required 
                className="w-full p-4 bg-secondary/50 rounded-2xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <textarea 
                name="message" 
                placeholder="Aapka Message" 
                rows={4} 
                required 
                className="w-full p-4 bg-secondary/50 rounded-2xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Message Bhein <Send size={18} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
