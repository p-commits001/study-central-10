import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, BellRing, GraduationCap, FileText, BookOpen } from "lucide-react";
import { requestNotificationPermission, sendTestNotification, listenForegroundMessages } from "@/lib/firebase";

const LS_INTERACTED = "notif-interacted";  // set permanently once Allow/Block chosen
const LS_SNOOZED_AT = "notif-snoozed-at"; // timestamp for "Maybe Later" 3-day cooldown
const SNOOZE_DAYS = 3;

function shouldShow(): boolean {
  if (!("Notification" in window)) return false;
  if (Notification.permission !== "default") return false;
  if (localStorage.getItem(LS_INTERACTED)) return false;
  const snoozed = localStorage.getItem(LS_SNOOZED_AT);
  if (snoozed) {
    const diff = Date.now() - parseInt(snoozed, 10);
    if (diff < SNOOZE_DAYS * 24 * 60 * 60 * 1000) return false;
  }
  return true;
}

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    // Delay slightly so install prompt (if any) loads first
    const t = setTimeout(() => {
      if (shouldShow()) setShow(true);
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    listenForegroundMessages((payload: unknown) => {
      const p = payload as { notification?: { title?: string; body?: string } };
      showToast(p?.notification?.body || "Naya update hai!");
    });
  }, []);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 5000);
  }

  async function handleTurnOn() {
    setLoading(true);
    const result = await requestNotificationPermission();
    localStorage.setItem(LS_INTERACTED, "1");
    setLoading(false);
    setShow(false);
    if (result === "granted") {
      setTimeout(() => sendTestNotification(), 1200);
    }
  }

  function handleSnooze() {
    localStorage.setItem(LS_SNOOZED_AT, String(Date.now()));
    setShow(false);
  }

  function handleNever() {
    localStorage.setItem(LS_INTERACTED, "1");
    setShow(false);
  }

  return (
    <>
      {/* ── Notification Prompt ───────────────────────────────── */}
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9996]"
              onClick={handleSnooze}
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-[9997] max-w-lg mx-auto"
            >
              <div className="bg-white dark:bg-zinc-900 rounded-t-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-600 px-5 pt-5 pb-7">
                  <button
                    onClick={handleSnooze}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mb-5" />

                  {/* Bell animation ring */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping scale-125" />
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center relative">
                        <BellRing className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-xl text-center leading-tight">
                    Notifications On Karo!
                  </h3>
                  <p className="text-purple-100 text-sm text-center mt-1.5">
                    Latest exam updates seedha aapke phone pe
                  </p>
                </div>

                {/* Alert types */}
                <div className="px-5 pt-5 pb-3 grid grid-cols-3 gap-3">
                  {[
                    { icon: FileText,    label: "Question\nPapers" },
                    { icon: BookOpen,    label: "New\nNotes" },
                    { icon: GraduationCap, label: "Exam\nAlerts" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-2xl py-3 px-2">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center whitespace-pre-line leading-tight">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="px-5 pt-2 pb-6 flex flex-col gap-2">
                  <button
                    onClick={handleTurnOn}
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm shadow-lg shadow-purple-200 dark:shadow-purple-900/40"
                  >
                    <Bell className="w-4 h-4" />
                    {loading ? "Setting up..." : "Turn On Notifications"}
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSnooze}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 font-medium py-3 rounded-2xl text-sm transition-colors"
                    >
                      Maybe Later
                    </button>
                    <button
                      onClick={handleNever}
                      className="flex-1 text-gray-400 dark:text-gray-500 font-medium py-3 rounded-2xl text-sm hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      Never
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Foreground push toast ─────────────────────────────── */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-sm"
          >
            <div className="bg-purple-700 text-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold opacity-80">Class 10 Hub</p>
                <p className="text-sm font-medium truncate">{toastMsg}</p>
              </div>
              <button onClick={() => setToastMsg(null)} className="opacity-70 hover:opacity-100 flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
