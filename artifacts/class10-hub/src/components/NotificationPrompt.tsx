import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, BellRing, BellOff, GraduationCap, FileText, BookOpen, ChevronRight } from "lucide-react";
import { requestNotificationPermission, sendTestNotification, listenForegroundMessages } from "@/lib/firebase";

const LS_INTERACTED = "notif-interacted";
const LS_SNOOZED_AT = "notif-snoozed-at";
const LS_BLOCKED_DISMISSED = "notif-blocked-dismissed";
const SNOOZE_DAYS = 3;

function shouldShowPrompt(): boolean {
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

function isBlocked(): boolean {
  if (!("Notification" in window)) return false;
  return Notification.permission === "denied";
}

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBlockedBanner, setShowBlockedBanner] = useState(false);
  const [showBlockedTip, setShowBlockedTip] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-trigger logic
    const t = setTimeout(() => {
      if (shouldShowPrompt()) setShow(true);
    }, 4500);

    // Show blocked banner if permission is denied
    if (isBlocked() && !localStorage.getItem(LS_BLOCKED_DISMISSED)) {
      setTimeout(() => setShowBlockedBanner(true), 2000);
    }

    // Listen for debug trigger
    const debugHandler = () => setShow(true);
    window.addEventListener("debug-show-notif", debugHandler);

    return () => {
      clearTimeout(t);
      window.removeEventListener("debug-show-notif", debugHandler);
    };
  }, []);

  useEffect(() => {
    listenForegroundMessages((payload: unknown) => {
      const p = payload as { notification?: { title?: string; body?: string } };
      showToast(p?.notification?.body || "Naya update hai!");
    });
  }, []);

  // Close tip on outside click
  useEffect(() => {
    if (!showBlockedTip) return;
    function handler(e: MouseEvent) {
      if (tipRef.current && !tipRef.current.contains(e.target as Node)) {
        setShowBlockedTip(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showBlockedTip]);

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
    if (result === "denied") {
      setShowBlockedBanner(true);
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

  function handleDismissBlockedBanner() {
    localStorage.setItem(LS_BLOCKED_DISMISSED, "1");
    setShowBlockedBanner(false);
    setShowBlockedTip(false);
  }

  // Browser-specific instructions
  const browserSteps = (() => {
    const ua = navigator.userAgent;
    if (/Chrome/.test(ua) && !/Edge/.test(ua)) {
      return [
        'Click the 🔒 lock icon in the address bar',
        'Select "Site settings"',
        'Find "Notifications" and set to "Allow"',
      ];
    }
    if (/Firefox/.test(ua)) {
      return [
        'Click the 🔒 icon in the address bar',
        'Click the ">" next to "Connection Secure"',
        'Click "More Information" → Permissions',
        'Set Notifications to "Allow"',
      ];
    }
    if (/Safari/.test(ua)) {
      return [
        'Go to Safari → Settings for This Website',
        'Find "Notifications" and set to "Allow"',
      ];
    }
    return [
      'Click the lock / info icon in the address bar',
      'Find "Notifications" in site settings',
      'Change it from "Blocked" to "Allow"',
    ];
  })();

  return (
    <>
      {/* ── Notification Prompt ─────────────────────────── */}
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

                {/* Alert type tiles */}
                <div className="px-5 pt-5 pb-3 grid grid-cols-3 gap-3">
                  {[
                    { icon: FileText,       label: "Question\nPapers" },
                    { icon: BookOpen,       label: "New\nNotes" },
                    { icon: GraduationCap,  label: "Exam\nAlerts" },
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

      {/* ── Blocked Notifications Banner ─────────────────── */}
      <AnimatePresence>
        {showBlockedBanner && !show && (
          <motion.div
            ref={tipRef}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-20 right-4 z-[9995] max-w-xs"
          >
            {/* Tip panel */}
            <AnimatePresence>
              {showBlockedTip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="mb-2 bg-white dark:bg-zinc-800 rounded-2xl shadow-2xl border border-purple-100 dark:border-purple-800 p-4 w-72"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BellOff className="w-4 h-4 text-red-500" />
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Notifications Blocked
                      </p>
                    </div>
                    <button onClick={() => setShowBlockedTip(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    Enable karne ke liye yeh steps follow karo:
                  </p>
                  <ol className="space-y-2">
                    {browserSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">{step}</p>
                      </li>
                    ))}
                  </ol>
                  <button
                    onClick={handleDismissBlockedBanner}
                    className="mt-3 w-full text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-center transition-colors"
                  >
                    Samajh gaya, dismiss karo
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bell icon chip */}
            <button
              onClick={() => setShowBlockedTip((p) => !p)}
              className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-purple-200 dark:border-purple-700 rounded-full shadow-lg px-3 py-2 hover:border-purple-400 transition-all group"
            >
              <div className="w-7 h-7 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                <BellOff className="w-3.5 h-3.5 text-red-500" />
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap pr-0.5">
                Notifications blocked
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Foreground push toast ─────────────────────────── */}
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
