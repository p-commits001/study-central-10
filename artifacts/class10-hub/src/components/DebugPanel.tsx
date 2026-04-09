import { useState } from "react";
import { Bug, Smartphone, Bell, BellOff, ChevronUp, ChevronDown, SendHorizonal } from "lucide-react";
import { sendTestNotification, requestNotificationPermission } from "@/lib/firebase";

function DebugPanelInner() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  function addLog(msg: string) {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 6));
  }

  function triggerInstall() {
    window.dispatchEvent(new Event("debug-show-install"));
    addLog("🟣 PWA Install popup triggered");
  }

  function triggerNotification() {
    window.dispatchEvent(new Event("debug-show-notif"));
    addLog("🔔 Notification popup triggered");
  }

  async function testFirebaseNotif() {
    const perm = "Notification" in window ? Notification.permission : "not-supported";
    if (perm === "default") {
      addLog("⏳ Requesting permission...");
      const result = await requestNotificationPermission();
      addLog(`✅ Permission: ${result}`);
      if (result === "granted") {
        await sendTestNotification();
        addLog("🚀 Test notification sent!");
      }
    } else if (perm === "granted") {
      await sendTestNotification();
      addLog("🚀 Test notification sent!");
    } else {
      addLog(`❌ Blocked — permission: ${perm}`);
    }
  }

  function checkStatus() {
    const swStatus = "serviceWorker" in navigator
      ? (navigator.serviceWorker.controller ? "Active ✅" : "Registered but no controller ⚠️")
      : "Not supported ❌";
    const notifStatus = "Notification" in window ? Notification.permission : "Not supported";
    const pwaInstalled = window.matchMedia("(display-mode: standalone)").matches ? "Yes ✅" : "No (browser)";
    addLog(`SW: ${swStatus}`);
    addLog(`Notif permission: ${notifStatus}`);
    addLog(`Standalone/Installed: ${pwaInstalled}`);
  }

  return (
    <div className="fixed bottom-4 left-4 z-[9990] font-mono text-xs">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 bg-zinc-900 text-yellow-400 border border-yellow-500/40 rounded-full px-3 py-2 shadow-lg hover:bg-zinc-800 transition-colors"
      >
        <Bug className="w-3.5 h-3.5" />
        <span className="font-bold">DEBUG</span>
        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>

      {open && (
        <div className="mt-2 w-72 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-zinc-800 px-3 py-2 flex items-center gap-2 border-b border-zinc-700">
            <Bug className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-yellow-400 font-bold">PWA Debug Panel</span>
          </div>

          <div className="p-3 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={triggerInstall}
                className="flex items-center justify-center gap-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl px-2 py-2 transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Install Popup</span>
              </button>
              <button
                onClick={triggerNotification}
                className="flex items-center justify-center gap-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl px-2 py-2 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notif Popup</span>
              </button>
            </div>

            <button
              onClick={testFirebaseNotif}
              className="flex items-center justify-center gap-1.5 bg-green-700 hover:bg-green-600 text-white rounded-xl px-2 py-2 transition-colors"
            >
              <SendHorizonal className="w-3.5 h-3.5" />
              <span>Send Test Notification</span>
            </button>

            <button
              onClick={checkStatus}
              className="flex items-center justify-center gap-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 rounded-xl px-2 py-2 transition-colors"
            >
              <BellOff className="w-3.5 h-3.5" />
              <span>Check PWA Status</span>
            </button>

            {log.length > 0 && (
              <div className="mt-1 bg-zinc-950 rounded-xl p-2 space-y-1 max-h-28 overflow-y-auto">
                {log.map((l, i) => (
                  <p key={i} className="text-zinc-300 leading-tight">{l}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function DebugPanel() {
  if (import.meta.env.PROD) return null;
  return <DebugPanelInner />;
}
