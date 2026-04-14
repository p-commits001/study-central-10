import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout";
import { NotificationPrompt } from "./components/NotificationPrompt";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { DebugPanel } from "./components/DebugPanel";
import { AnimatePresence, motion } from "framer-motion";

const Home            = lazy(() => import("./pages/home"));
const NotesIndex      = lazy(() => import("./pages/notes-index"));
const NotesSubject    = lazy(() => import("./pages/notes-subject"));
const NotesDetail     = lazy(() => import("./pages/notes-detail"));
const Questions       = lazy(() => import("./pages/questions"));
const Pdfs            = lazy(() => import("./pages/pdfs"));
const Tips            = lazy(() => import("./pages/tips"));
const SearchPage      = lazy(() => import("./pages/search"));
const AiTutor         = lazy(() => import("./pages/ai-tutor"));
const AiImage         = lazy(() => import("./pages/ai-image"));
const AiVideo         = lazy(() => import("./pages/ai-video"));
const AiVideoSummarizer = lazy(() => import("./pages/ai-video-summarizer"));
const About           = lazy(() => import("./pages/about"));
const Books           = lazy(() => import("./pages/books"));
const RecommendedBooks = lazy(() => import("./pages/recommended-books"));
const Quiz            = lazy(() => import("./pages/quiz"));
const Resources       = lazy(() => import("./pages/resources"));
const Disclaimer      = lazy(() => import("./pages/Disclaimer"));
const PrivacyPolicy   = lazy(() => import("./pages/PrivacyPolicy"));
const Contact         = lazy(() => import("./pages/contact"));
const SyllabusStrategy = lazy(() => import("./pages/syllabus-strategy"));
const MathsCheatSheet  = lazy(() => import("./pages/maths-cheat-sheet"));
const ToppersNotes     = lazy(() => import("./pages/toppers-notes"));
const StartClass10     = lazy(() => import("./pages/start-class-10"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000, retry: 1, refetchOnWindowFocus: false },
  },
});

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
};

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Switch key={location} location={location}>
          <Route path="/"><AnimatedPage><Home /></AnimatedPage></Route>
          <Route path="/notes"><AnimatedPage><NotesIndex /></AnimatedPage></Route>
          <Route path="/notes/:subject/:chapter"><AnimatedPage><NotesDetail /></AnimatedPage></Route>
          <Route path="/notes/:subject"><AnimatedPage><NotesSubject /></AnimatedPage></Route>
          <Route path="/ai-tutor"><AnimatedPage><AiTutor /></AnimatedPage></Route>
          <Route path="/ai-image"><AnimatedPage><AiImage /></AnimatedPage></Route>
          <Route path="/ai-video"><AnimatedPage><AiVideo /></AnimatedPage></Route>
          <Route path="/ai-video-summarizer"><AnimatedPage><AiVideoSummarizer /></AnimatedPage></Route>
          <Route path="/quiz"><AnimatedPage><Quiz /></AnimatedPage></Route>
          <Route path="/questions"><AnimatedPage><Questions /></AnimatedPage></Route>
          <Route path="/pdfs"><AnimatedPage><Pdfs /></AnimatedPage></Route>
          <Route path="/tips"><AnimatedPage><Tips /></AnimatedPage></Route>
          <Route path="/books"><AnimatedPage><Books /></AnimatedPage></Route>
          <Route path="/recommended-books"><AnimatedPage><RecommendedBooks /></AnimatedPage></Route>
          <Route path="/resources"><AnimatedPage><Resources /></AnimatedPage></Route>
          <Route path="/about"><AnimatedPage><About /></AnimatedPage></Route>
          <Route path="/contact"><AnimatedPage><Contact /></AnimatedPage></Route>
          <Route path="/privacy-policy"><AnimatedPage><PrivacyPolicy /></AnimatedPage></Route>
          <Route path="/disclaimer"><AnimatedPage><Disclaimer /></AnimatedPage></Route>
          <Route path="/search"><AnimatedPage><SearchPage /></AnimatedPage></Route>
          <Route path="/syllabus-strategy"><AnimatedPage><SyllabusStrategy /></AnimatedPage></Route>
          <Route path="/maths-cheat-sheet"><AnimatedPage><MathsCheatSheet /></AnimatedPage></Route>
          <Route path="/toppers-notes"><AnimatedPage><ToppersNotes /></AnimatedPage></Route>
          <Route path="/start-class-10"><AnimatedPage><StartClass10 /></AnimatedPage></Route>
        </Switch>
      </AnimatePresence>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="class10hub-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <PWAInstallPrompt />
          <NotificationPrompt />
          <DebugPanel />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
