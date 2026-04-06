import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Send, Plus, Trash2, ChevronLeft, Sparkles,
  BookOpen, FlaskConical, Calculator, Globe, Languages, Loader2, X,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSEO, SEO_DATA } from "@/lib/useSEO";

interface Message { id: number; role: "user" | "assistant"; content: string; }
interface Conversation { id: string; title: string; createdAt: string; messages: Message[]; }

const QUICK_PROMPTS = [
  { icon: Calculator, label: "Maths", text: "Prove that √2 is irrational.", color: "from-blue-500 to-indigo-500" },
  { icon: FlaskConical, label: "Science", text: "Explain the difference between acids and bases with examples.", color: "from-green-500 to-emerald-500" },
  { icon: BookOpen, label: "English", text: "Summarise the chapter 'A Letter to God'.", color: "from-violet-500 to-purple-500" },
  { icon: Globe, label: "SST", text: "What were the main causes of the rise of nationalism in Europe?", color: "from-orange-500 to-amber-500" },
  { icon: Languages, label: "Hindi", text: "Surdas ke pad ka arth aur visheshataen samjhaiye.", color: "from-pink-500 to-rose-500" },
  { icon: Sparkles, label: "Tips", text: "Give me top 5 tips to score 95+ in CBSE board exams.", color: "from-yellow-500 to-orange-500" },
];

const SYSTEM_PROMPT = `You are an expert CBSE Class 10 tutor for Indian students. You help with Science (Physics, Chemistry, Biology), Mathematics, Social Science (History, Geography, Economics, Political Science), English, and Hindi.

Rules:
- Give clear, step-by-step answers
- Use simple language suitable for Class 10 students
- Include formulas, diagrams described in text, and examples
- Reference NCERT syllabus
- Mix Hindi/English (Hinglish) when explaining concepts to make it relatable
- Keep answers concise but complete
- For math problems, show all steps
- For science, include key terms and definitions`;

const STORAGE_KEY = "class10hub_conversations";

function loadConversations(): Conversation[] {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
}
function saveConversations(convs: Conversation[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(convs)); } catch { }
}

function renderMarkdown(text: string): string {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, '<code class="bg-muted px-1 rounded text-sm font-mono">$1</code>');

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false, inOl = false;

  for (const line of lines) {
    if (/^#{1,3}\s/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      const level = line.match(/^#+/)![0].length;
      const content = line.replace(/^#+\s/, "");
      const cls = level === 1 ? "text-xl font-bold mt-4 mb-2 text-primary" : "text-lg font-semibold mt-3 mb-1";
      result.push(`<h${level} class="${cls}">${content}</h${level}>`);
    } else if (/^\d+\.\s/.test(line)) {
      if (inList) { result.push("</ul>"); inList = false; }
      if (!inOl) { result.push('<ol class="list-decimal ml-5 space-y-1 my-2">'); inOl = true; }
      result.push(`<li>${line.replace(/^\d+\.\s/, "")}</li>`);
    } else if (/^[-*]\s/.test(line)) {
      if (inOl) { result.push("</ol>"); inOl = false; }
      if (!inList) { result.push('<ul class="list-disc ml-5 space-y-1 my-2">'); inList = true; }
      result.push(`<li>${line.replace(/^[-*]\s/, "")}</li>`);
    } else if (line.trim() === "") {
      if (inList) { result.push("</ul>"); inList = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push("<br/>");
    } else {
      if (inList) { result.push("</ul>"); inList = false; }
      if (inOl) { result.push("</ol>"); inOl = false; }
      result.push(`<p class="mb-1 leading-relaxed">${line}</p>`);
    }
  }
  if (inList) result.push("</ul>");
  if (inOl) result.push("</ol>");
  return result.join("\n");
}

async function callAI(messages: { role: string; content: string }[]): Promise<string> {
  const payload = {
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    model: "openai",
    seed: Math.floor(Math.random() * 9999),
  };

  const res = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`AI error: ${res.status}`);
  const text = await res.text();
  return text.trim();
}

export default function AiTutor() {
  useSEO(SEO_DATA.aiTutor);
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const { toast } = useToast();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streamText]);

  const activeConv = conversations.find(c => c.id === activeConvId) || null;

  const createConversation = useCallback((firstMessage: string): Conversation => {
    const conv: Conversation = {
      id: Date.now().toString(),
      title: firstMessage.slice(0, 50),
      createdAt: new Date().toISOString(),
      messages: [],
    };
    const updated = [conv, ...conversations];
    setConversations(updated);
    saveConversations(updated);
    return conv;
  }, [conversations]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    setInput("");

    let conv = activeConv;
    let convId = activeConvId;
    if (!conv) {
      conv = createConversation(content);
      convId = conv.id;
      setActiveConvId(conv.id);
    }

    const userMsg: Message = { id: Date.now(), role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);
    setStreamText("");

    const historyForAI = newMessages.map(m => ({ role: m.role, content: m.content }));

    try {
      const reply = await callAI(historyForAI);
      const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", content: reply };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      setStreamText("");

      const updatedConvs = conversations.map(c =>
        c.id === convId ? { ...c, messages: finalMessages } : c
      );
      if (!conversations.find(c => c.id === convId) && conv) {
        updatedConvs.unshift({ ...conv, messages: finalMessages });
      }
      setConversations(updatedConvs);
      saveConversations(updatedConvs);
    } catch (e) {
      toast({ title: "Connection Error", description: "AI se connect nahi hua. Internet check karo aur dobara try karo.", variant: "destructive" });
    } finally {
      setLoading(false);
      setStreamText("");
    }
  }, [input, loading, activeConv, activeConvId, messages, conversations, createConversation, toast]);

  const loadConversation = (conv: Conversation) => {
    setActiveConvId(conv.id);
    setMessages(conv.messages);
    setShowSidebar(false);
  };

  const deleteConversation = (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = conversations.filter(c => c.id !== convId);
    setConversations(updated);
    saveConversations(updated);
    if (activeConvId === convId) { setActiveConvId(null); setMessages([]); }
  };

  const newChat = () => { setActiveConvId(null); setMessages([]); setShowSidebar(false); };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-6xl">
      <div className="py-4 md:py-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-2 font-medium text-sm"
            >
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                <Sparkles size={14} />
              </motion.div>
              Powered by AI
            </motion.div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
              className="text-3xl md:text-4xl font-display font-extrabold">
              AI Study Tutor
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-1">
              Ask any Class 10 CBSE question — get instant, step-by-step answers
            </motion.p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden px-3 py-2 rounded-xl bg-secondary text-sm font-medium flex items-center gap-2">
            <BookOpen size={16} /> History
          </motion.button>
        </motion.div>

        <div className="flex gap-4 h-[70vh]">

          {/* Sidebar */}
          <AnimatePresence>
            {(showSidebar || true) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`${showSidebar ? "fixed inset-0 z-50 bg-background p-4 pt-20 flex flex-col" : "hidden md:flex"} md:relative md:w-64 flex-col gap-2`}
              >
                {showSidebar && (
                  <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSidebar(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-secondary">
                    <X size={20} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99,102,241,0.3)" }}
                  whileTap={{ scale: 0.97 }} onClick={newChat}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Plus size={18} /> New Chat
                </motion.button>

                <div className="flex-1 overflow-y-auto space-y-1 mt-2">
                  {conversations.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center pt-4">No chats yet. Start asking!</p>
                  ) : (
                    conversations.map((conv, i) => (
                      <motion.div
                        key={conv.id}
                        initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 26 }}
                        whileHover={{ x: 3 }}
                        onClick={() => loadConversation(conv)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm ${
                          activeConvId === conv.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="truncate flex-1">{conv.title}</span>
                        <motion.button
                          whileHover={{ scale: 1.2, color: "#ef4444" }} whileTap={{ scale: 0.85 }}
                          onClick={(e) => deleteConversation(conv.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/20 hover:text-destructive transition-all">
                          <Trash2 size={14} />
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
            className="flex-1 flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-xl"
          >
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.length === 0 && !loading && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="h-full flex flex-col items-center justify-center gap-6 py-8">
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-primary/20">
                    <Bot size={40} className="text-white" />
                  </motion.div>
                  <div className="text-center">
                    <h2 className="text-2xl font-display font-bold mb-2">Your AI Tutor is Ready!</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Ask me anything — Maths problems, Science concepts, Essay help, or exam tips. I'm here 24/7!
                    </p>
                  </div>
                  <motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                    initial="hidden" animate="show"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl">
                    {QUICK_PROMPTS.map((p) => (
                      <motion.button
                        key={p.label}
                        variants={{ hidden: { opacity: 0, y: 15, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
                        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => sendMessage(p.text)}
                        className="group flex items-center gap-2 p-3 rounded-2xl bg-secondary hover:bg-primary hover:text-white transition-all text-left text-sm font-medium border border-border hover:border-primary">
                        <p.icon size={16} className="shrink-0 text-primary group-hover:text-white" />
                        <div>
                          <div className="font-semibold text-xs text-muted-foreground group-hover:text-white/80 mb-0.5">{p.label}</div>
                          <div className="line-clamp-2 text-xs leading-tight">{p.text}</div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26, delay: idx * 0.02 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${
                    msg.role === "user" ? "bg-gradient-to-br from-blue-500 to-indigo-600" : "bg-gradient-to-br from-violet-500 to-purple-600"
                  }`}>
                    {msg.role === "user" ? "U" : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  }`}>
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="flex gap-3">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                    className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <Bot size={16} />
                  </motion.div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-secondary text-foreground shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div key={i}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-2 h-2 bg-primary/60 rounded-full" />
                        ))}
                      </div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="border-t border-border p-3 md:p-4 bg-background/50">
              <div className="flex items-end gap-3 bg-secondary/60 rounded-2xl p-2 border border-border transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any Class 10 question... (Press Enter to send, Shift+Enter for new line)"
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-sm px-2 py-1.5 max-h-32 placeholder:text-muted-foreground"
                  style={{ minHeight: "36px" }}
                />
                <motion.button
                  whileHover={input.trim() && !loading ? { scale: 1.12, boxShadow: "0 6px 18px rgba(99,102,241,0.4)" } : {}}
                  whileTap={input.trim() && !loading ? { scale: 0.9 } : {}}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div key="loading" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Loader2 size={16} className="animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div key="send" initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
                        <Send size={16} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 text-center">
                AI answers based on CBSE Class 10 syllabus · Always verify important answers with your textbook
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
