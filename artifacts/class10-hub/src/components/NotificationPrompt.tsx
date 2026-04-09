import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, BellOff } from "lucide-react";
import { requestNotificationPermission, sendTestNotification, listenForegroundMessages } from "@/lib/firebase";

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "granted" | "denied">("idle");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;

    const alreadyAsked = sessionStorage.getItem("notif-asked");
    if (alreadyAsked) return;

    const timer = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    listenForegroundMessages((payload: unknown) => {
      const p = payload as { notification?: { title?: string; body?: string } };
      const body = p?.notification?.body || "Naya update hai!";
      showToast(body);
    });
  }, []);

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 5000);
  }

  async function handleAllow() {
    sessionStorage.setItem("notif-asked", "1");
    const result = await requestNotificationPermission();
    setStatus(result === "granted" ? "granted" : "denied");
    setShow(false);
    if (result === "granted") {
      setTimeout(() => sendTestNotification(), 1500);
    }
  }

  function handleDismiss() {
    sessionStorage.setItem("notif-asked", "1");
    setShow(false);
  }

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-md"
          >
            <div className="bg-white dark:bg-zinc-900 border border-purple-200 dark:border-purple-800 rounded-2xl shadow-2xl p-4 flex gap-3 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                  Notifications allow karo! 🔔
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">
                  New question papers, notes & exam alerts — bilkul free!
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleAllow}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    Allow karo
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-gray-300 text-xs font-semibold py-2 px-3 rounded-lg transition-colors"
                  >
                    Bad mein
                  </button>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mt-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-sm"
          >
            <div className="bg-purple-700 text-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3">
              <Bell className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm font-medium flex-1">{toastMsg}</p>
              <button onClick={() => setToastMsg(null)}>
                <X className="w-4 h-4 opacity-70 hover:opacity-100" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
