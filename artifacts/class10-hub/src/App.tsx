import Contact from "./pages/contact";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import { Layout } from "./components/layout";

import Home from "./pages/home";
import NotesIndex from "./pages/notes-index";
import NotesSubject from "./pages/notes-subject";
import NotesDetail from "./pages/notes-detail";
import Questions from "./pages/questions";
import Pdfs from "./pages/pdfs";
import Tips from "./pages/tips";
import SearchPage from "./pages/search";
import AiTutor from "./pages/ai-tutor";
// @ts-ignore 
import About from "./pages/about";
import Books from "./pages/books";
import RecommendedBooks from "./pages/recommended-books";
import Quiz from "./pages/quiz";
import Resources from "./pages/resources";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/notes" component={NotesIndex} />
        <Route path="/notes/:subject" component={NotesSubject} />
        <Route path="/notes/:subject/:chapter" component={NotesDetail} />
        <Route path="/questions" component={Questions} />
        <Route path="/pdfs" component={Pdfs} />
        <Route path="/tips" component={Tips} />
        <Route path="/search" component={SearchPage} />
        <Route path="/ai-tutor" component={AiTutor} />
        <Route path="/books" component={Books} />
        <Route path="/recommended-books" component={RecommendedBooks} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/resources" component={Resources} />
        <Route path="/about" component={About} />
        <div className="flex gap-4 justify-center text-sm text-gray-500 mt-4">
  <a href="/privacy-policy">Privacy Policy</a>
  <a href="/disclaimer">Disclaimer</a>
  <a href="/contact">Contact Us</a>
</div>

        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="class10hub-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
