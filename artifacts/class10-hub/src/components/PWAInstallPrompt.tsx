import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Zap, BookOpen, Wifi, Share2 } from "lucide-react";

const LS_KEY = "pwa-install-dismissed-at";
const COOLDOWN_DAYS = 7;

function isDismissedRecently(): boolean {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return false;
  const diff = Date.now() - parseInt(raw, 10);
  return diff < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIOS(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as Window & { MSStream?: unknown }).MSStream;
}

export function PWAInstallPrompt() {
  const [show, setShow] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [iosMode, setIosMode] = useState(false);
  const deferredPromptRef = useRef<Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> } | null>(null);

  useEffect(() => {
    if (isStandalone()) return;
    if (isDismissedRecently()) return;

    const ios = isIOS();
    setIosMode(ios);

    if (ios) {
      setTimeout(() => setShow(true), 6000);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e as typeof deferredPromptRef.current;
      if (!isDismissedRecently()) {
        setTimeout(() => setShow(true), 1500);
      }
    };
    window.addEventListener("beforeinstallprompt", handler);

    const fallbackTimer = setTimeout(() => {
      if (!deferredPromptRef.current && !isDismissedRecently() && !isStandalone()) {
        setIosMode(false);
        setShow(true);
      }
    }, 10000);

    const debugHandler = () => {
      setShow(true);
    };
    window.addEventListener("debug-show-install", debugHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("debug-show-install", debugHandler);
      clearTimeout(fallbackTimer);
    };
  }, []);

  async function handleInstall() {
    const prompt = deferredPromptRef.current;
    if (!prompt) {
      handleDismiss();
      return;
    }
    setInstalling(true);
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem(LS_KEY, String(Date.now() * 10));
    }
    deferredPromptRef.current = null;
    setInstalling(false);
    setShow(false);
  }

  function handleDismiss() {
    localStorage.setItem(LS_KEY, String(Date.now()));
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-0 left-0 right-0 z-[9999] max-w-lg mx-auto"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-700 to-purple-500 px-5 pt-5 pb-6 relative">
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">App Install Karo!</h3>
                    <p className="text-purple-100 text-sm mt-0.5">Class 10 Hub — bilkul free</p>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 space-y-3">
                {[
                  { icon: Zap,      text: "Super fast — offline bhi kaam karta hai" },
                  { icon: BookOpen, text: "Notes & Quiz — ek tap mein open" },
                  { icon: Wifi,     text: "Background notifications — exam alerts seedha" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
                  </div>
                ))}
              </div>

              {iosMode ? (
                <div className="px-5 pb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-2xl p-4 mb-3">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">iPhone/iPad pe install karne ke liye:</p>
                    <ol className="space-y-2">
                      {[
                        { icon: Share2, text: 'Neeche Share button tap karo (□↑)' },
                        { icon: Download, text: '"Add to Home Screen" select karo' },
                        { icon: Smartphone, text: '"Add" tap karo — bas ho gaya! 🎉' },
                      ].map(({ icon: Icon, text }, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <span className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {i + 1}
                          </span>
                          <Icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="w-full text-gray-500 dark:text-gray-400 font-medium py-2.5 rounded-2xl text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    Abhi Nahi
                  </button>
                </div>
              ) : (
                <div className="px-5 pb-6 flex flex-col gap-2.5">
                  <button
                    onClick={handleInstall}
                    disabled={installing}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
                  >
                    <Download className="w-4 h-4" />
                    {installing ? "Installing..." : "App Download Karo — Free"}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="w-full text-gray-500 dark:text-gray-400 font-medium py-2.5 rounded-2xl text-sm hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  >
                    Abhi Nahi
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
