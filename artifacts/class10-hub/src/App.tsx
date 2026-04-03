import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout";
import { AnimatePresence, motion } from "framer-motion";

// Pages Imports
import Home from "./pages/home";
import NotesIndex from "./pages/notes-index";
import NotesSubject from "./pages/notes-subject";
import NotesDetail from "./pages/notes-detail";
import Questions from "./pages/questions";
import Pdfs from "./pages/pdfs";
import Tips from "./pages/tips";
import SearchPage from "./pages/search";
import AiTutor from "./pages/ai-tutor";
import About from "./pages/about";
import Books from "./pages/books";
import RecommendedBooks from "./pages/recommended-books";
import Quiz from "./pages/quiz";
import Resources from "./pages/resources";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/contact";

const queryClient = new QueryClient();

            
            function Router() {
  return (
    <Layout>
      <AnimatePresence mode="wait">

        <Route path="/">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Home />
          </motion.div>
        </Route>

        <Route path="/notes">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <NotesIndex />
          </motion.div>
        </Route>

        <Route path="/notes/:subject">
          <NotesSubject />
        </Route>

        <Route path="/notes/:subject/:chapter">
          <NotesDetail />
        </Route>

        <Route path="/ai-tutor">
          <AiTutor />
        </Route>

        <Route path="/quiz">
          <Quiz />
        </Route>

        <Route path="/questions">
          <Questions />
        </Route>

        <Route path="/pdfs">
          <Pdfs />
        </Route>

        <Route path="/tips">
          <Tips />
        </Route>

        <Route path="/resources">
          <Resources />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/privacy-policy">
          <PrivacyPolicy />
        </Route>

        <Route path="/disclaimer">
          <Disclaimer />
        </Route>

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
