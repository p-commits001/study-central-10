import { initializeApp, getApps } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCPPN0tonKENmtOlgnE2J0lASJih0glLeY",
  authDomain: "class10hub-10e19.firebaseapp.com",
  projectId: "class10hub-10e19",
  storageBucket: "class10hub-10e19.firebasestorage.app",
  messagingSenderId: "837581270952",
  appId: "1:837581270952:web:0eb8f412ae4599abac379d",
  measurementId: "G-9Z5XH2MJWW",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

let messaging: Messaging | null = null;
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  try {
    messaging = getMessaging(app);
  } catch {
    console.warn("[FCM] Messaging init failed");
  }
}

export { messaging };

export async function requestNotificationPermission(): Promise<"granted" | "denied" | "default"> {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission === "granted") return "granted";
  const permission = await Notification.requestPermission();
  return permission;
}

export async function getFCMToken(): Promise<string | null> {
  if (!messaging) return null;
  const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
  if (!vapidKey) {
    console.warn("[FCM] VITE_FIREBASE_VAPID_KEY not set — token skipped");
    return null;
  }
  try {
    const token = await getToken(messaging, { vapidKey });
    console.log("[FCM] Token:", token);
    return token;
  } catch (err) {
    console.error("[FCM] getToken error:", err);
    return null;
  }
}

export function listenForegroundMessages(callback: (payload: unknown) => void) {
  if (!messaging) return;
  onMessage(messaging, callback);
}

export async function sendTestNotification() {
  if (Notification.permission !== "granted") {
    console.warn("[Notification] Permission not granted");
    return;
  }
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready;
    reg.showNotification("📚 Class 10 Hub", {
      body: "Important Question Paper uploaded! Abhi dekho!",
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "class10hub-alert",
      data: { url: "/" },
    } as NotificationOptions);
  } else {
    new Notification("📚 Class 10 Hub", {
      body: "Important Question Paper uploaded! Abhi dekho!",
      icon: "/icon-192.png",
    });
  }
}
