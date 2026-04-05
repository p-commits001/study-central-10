import { motion } from "framer-motion";
import { Send, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { staggerContainer, fadeUp, fadeLeft, fadeRight, scaleIn, viewportOnce } from "@/lib/animations";

const contactItems = [
  {
    icon: Mail,
    label: "Email Us",
    value: "priyanshupriyanshu7659@gmail.com",
    color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    href: "mailto:priyanshupriyanshu7659@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Taraori, Haryana",
    color: "text-green-500 bg-green-100 dark:bg-green-900/30",
    href: null,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@class10toppper",
    color: "text-pink-500 bg-pink-100 dark:bg-pink-900/30",
    href: "https://instagram.com/class10toppper",
  },
];

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto mt-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="text-5xl mb-4"
          >
            💬
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Get in Touch</h1>
          <p className="text-muted-foreground font-medium text-lg">Koi sawal hai? Hame message bhejein!</p>
        </motion.div>

        <div className="bg-card p-8 rounded-3xl border border-border shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Contact Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.h2 variants={fadeLeft} className="text-xl font-display font-bold text-foreground mb-6">
                Reach Us Here
              </motion.h2>

              {contactItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeLeft}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-center gap-5 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all ${item.color}`}
                  >
                    <item.icon size={24} />
                  </motion.div>
                  <div>
                    <p className="font-bold text-base">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Response time info */}
              <motion.div
                variants={scaleIn}
                className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20"
              >
                <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
                  <MessageCircle size={16} />
                  Quick Response
                </div>
                <p className="text-muted-foreground text-xs">
                  Usually reply within 24 hours on weekdays.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              action="https://formspree.io/f/xnjoarbk"
              method="POST"
              className="space-y-5"
            >
              <motion.h2 variants={fadeRight} className="text-xl font-display font-bold text-foreground mb-6">
                Send a Message
              </motion.h2>

              {[
                { name: "name", type: "text", placeholder: "Aapka Naam" },
                { name: "email", type: "email", placeholder: "Aapki Email" },
              ].map((field, i) => (
                <motion.div key={field.name} variants={fadeRight}>
                  <motion.input
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(99,102,241,0.15)" }}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    required
                    className="w-full p-4 bg-secondary/50 rounded-2xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </motion.div>
              ))}

              <motion.div variants={fadeRight}>
                <motion.textarea
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 0 3px rgba(99,102,241,0.15)" }}
                  name="message"
                  placeholder="Aapka Message"
                  rows={4}
                  required
                  className="w-full p-4 bg-secondary/50 rounded-2xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: "0 12px 28px rgba(99,102,241,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                >
                  Message Bhejein
                  <motion.div
                    animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send size={18} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
