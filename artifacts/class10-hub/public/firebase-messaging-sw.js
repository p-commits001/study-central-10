importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCPPN0tonKENmtOlgnE2J0lASJih0glLeY",
  authDomain: "class10hub-10e19.firebaseapp.com",
  projectId: "class10hub-10e19",
  storageBucket: "class10hub-10e19.firebasestorage.app",
  messagingSenderId: "837581270952",
  appId: "1:837581270952:web:0eb8f412ae4599abac379d",
  measurementId: "G-9Z5XH2MJWW",
});

const messaging = firebase.messaging();

// ── Background push notifications ──────────────────────────────────────
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received:", payload);
  const title = payload.notification?.title || "📚 Class 10 Hub";
  const body  = payload.notification?.body  || "Kuch naya update hai!";
  const icon  = payload.notification?.icon  || "/icon-192.png";

  self.registration.showNotification(title, {
    body,
    icon,
    badge: "/icon-192.png",
    tag: "class10hub-push",
    data: payload.data || {},
    actions: [
      { action: "open",    title: "Dekho Abhi" },
      { action: "dismiss", title: "Bad Mein"   },
    ],
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url.includes(self.location.origin) && "focus" in w) return w.focus();
      }
      return clients.openWindow(url);
    })
  );
});

// ── Cache-first strategy for static assets ─────────────────────────────
const CACHE_NAME = "class10hub-v2";
const STATIC = ["/", "/manifest.json", "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (!res || res.status !== 200 || res.type !== "basic") return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        return res;
      }).catch(() => cached);
    })
  );
});
