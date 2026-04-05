import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/home";
import NotesIndex from "./pages/notes-index";
import NotesSubject from "./pages/notes-subject";
import NotesDetail from "./pages/notes-detail";
import Questions from "./pages/questions";
import Pdfs from "./pages/pdfs";
import Tips from "./pages/tips";
import SearchPage from "./pages/search";
import AiTutor from "./pages/ai-tutor";
import AiImage from "./pages/ai-image";
import About from "./pages/about";
import Books from "./pages/books";
import RecommendedBooks from "./pages/recommended-books";
import Quiz from "./pages/quiz";
import Resources from "./pages/resources";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/contact";

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: "easeIn" } }
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Switch key={location} location={location}>

          <Route path="/">
            <AnimatedPage><Home /></AnimatedPage>
          </Route>

          <Route path="/notes">
            <AnimatedPage><NotesIndex /></AnimatedPage>
          </Route>

          <Route path="/notes/:subject/:chapter">
            <AnimatedPage><NotesDetail /></AnimatedPage>
          </Route>

          <Route path="/notes/:subject">
            <AnimatedPage><NotesSubject /></AnimatedPage>
          </Route>

          <Route path="/ai-tutor">
            <AnimatedPage><AiTutor /></AnimatedPage>
          </Route>

          <Route path="/ai-image">
            <AnimatedPage><AiImage /></AnimatedPage>
          </Route>

          <Route path="/quiz">
            <AnimatedPage><Quiz /></AnimatedPage>
          </Route>

          <Route path="/questions">
            <AnimatedPage><Questions /></AnimatedPage>
          </Route>

          <Route path="/pdfs">
            <AnimatedPage><Pdfs /></AnimatedPage>
          </Route>

          <Route path="/tips">
            <AnimatedPage><Tips /></AnimatedPage>
          </Route>

          <Route path="/books">
            <AnimatedPage><Books /></AnimatedPage>
          </Route>

          <Route path="/recommended-books">
            <AnimatedPage><RecommendedBooks /></AnimatedPage>
          </Route>

          <Route path="/resources">
            <AnimatedPage><Resources /></AnimatedPage>
          </Route>

          <Route path="/about">
            <AnimatedPage><About /></AnimatedPage>
          </Route>

          <Route path="/contact">
            <AnimatedPage><Contact /></AnimatedPage>
          </Route>

          <Route path="/privacy-policy">
            <AnimatedPage><PrivacyPolicy /></AnimatedPage>
          </Route>

          <Route path="/disclaimer">
            <AnimatedPage><Disclaimer /></AnimatedPage>
          </Route>

          <Route path="/search">
            <AnimatedPage><SearchPage /></AnimatedPage>
          </Route>

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
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
