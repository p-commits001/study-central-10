import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Plus,
  Trash2,
  ChevronLeft,
  Sparkles,
  BookOpen,
  FlaskConical,
  Calculator,
  Globe,
  Languages,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  createdAt: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const QUICK_PROMPTS = [
  { icon: Calculator, label: "Maths", text: "Prove that √2 is irrational.", color: "from-blue-500 to-indigo-500" },
  { icon: FlaskConical, label: "Science", text: "Explain the difference between acids and bases with examples.", color: "from-green-500 to-emerald-500" },
  { icon: BookOpen, label: "English", text: "Summarise the chapter 'A Letter to God'.", color: "from-violet-500 to-purple-500" },
  { icon: Globe, label: "SST", text: "What were the main causes of the rise of nationalism in Europe?", color: "from-orange-500 to-amber-500" },
  { icon: Languages, label: "Hindi", text: "Surdas ke pad ka arth aur visheshataen samjhaiye.", color: "from-pink-500 to-rose-500" },
  { icon: Sparkles, label: "Tips", text: "Give me top 5 tips to score 95+ in CBSE board exams.", color: "from-yellow-500 to-orange-500" },
];

function renderMarkdown(text: string): string {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-muted px-1 rounded text-sm font-mono">$1</code>',
    );

  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;
  let inOl = false;

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

export default function AiTutor() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const { toast } = useToast();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { fetchConversations(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streamingContent]);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${BASE}/api/openai/conversations`);
      const data = await res.json();
      setConversations(data);
    } catch { }
  };

  const createConversation = async (firstMessage?: string) => {
    const title = firstMessage ? firstMessage.slice(0, 50) : "New Chat";
    try {
      const res = await fetch(`${BASE}/api/openai/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const conv: Conversation = await res.json();
      setConversations((prev) => [conv, ...prev]);
      setActiveConvId(conv.id);
      setMessages([]);
      return conv;
    } catch {
      toast({ title: "Error", description: "Could not start a new chat.", variant: "destructive" });
      return null;
    }
  };

  const loadConversation = async (convId: number) => {
    try {
      const res = await fetch(`${BASE}/api/openai/conversations/${convId}`);
      const data = await res.json();
      setActiveConvId(convId);
      setMessages(data.messages || []);
      setShowSidebar(false);
    } catch {
      toast({ title: "Error", description: "Could not load chat.", variant: "destructive" });
    }
  };

  const deleteConversation = async (convId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await fetch(`${BASE}/api/openai/conversations/${convId}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (activeConvId === convId) { setActiveConvId(null); setMessages([]); }
    } catch {
      toast({ title: "Error", description: "Could not delete chat.", variant: "destructive" });
    }
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;
    setInput("");

    let convId = activeConvId;
    if (!convId) {
      const conv = await createConversation(content);
      if (!conv) return;
      convId = conv.id;
    }

    const userMsg: Message = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);
    setStreamingContent("");

    try {
      const res = await fetch(`${BASE}/api/openai/conversations/${convId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.content) { accumulated += parsed.content; setStreamingContent(accumulated); }
              if (parsed.done) {
                const assistantMsg: Message = { id: Date.now() + 1, role: "assistant", content: accumulated };
                setMessages((prev) => [...prev, assistantMsg]);
                setStreamingContent("");
                setStreaming(false);
              }
            } catch (e) { }
          }
        }
      }
    } catch (error) {
      toast({ title: "Connection Error", description: "AI slow hai ya internet check karein.", variant: "destructive" });
      setStreaming(false);
    }
  };

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
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-2 font-medium text-sm"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles size={14} />
              </motion.div>
              Powered by AI
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              className="text-3xl md:text-4xl font-display font-extrabold"
            >
              AI Study Tutor
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-1"
            >
              Ask any Class 10 CBSE question — get instant, step-by-step answers
            </motion.p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden px-3 py-2 rounded-xl bg-secondary text-sm font-medium flex items-center gap-2"
          >
            <BookOpen size={16} /> History
          </motion.button>
        </motion.div>

        <div className="flex gap-4 h-[70vh]">

          {/* Sidebar */}
          <AnimatePresence>
            {(showSidebar || true) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`${showSidebar ? "fixed inset-0 z-50 bg-background p-4 pt-20 flex flex-col" : "hidden md:flex"} md:relative md:w-64 flex-col gap-2`}
              >
                {showSidebar && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSidebar(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-secondary"
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(99,102,241,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveConvId(null); setMessages([]); setShowSidebar(false); }}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <motion.div
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Plus size={18} />
                  </motion.div>
                  New Chat
                </motion.button>

                <div className="flex-1 overflow-y-auto space-y-1 mt-2">
                  {conversations.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-muted-foreground text-center pt-4"
                    >
                      No chats yet. Start asking!
                    </motion.p>
                  ) : (
                    conversations.map((conv, i) => (
                      <motion.div
                        key={conv.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 26 }}
                        whileHover={{ x: 3 }}
                        onClick={() => loadConversation(conv.id)}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm ${
                          activeConvId === conv.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="truncate flex-1">{conv.title}</span>
                        <motion.button
                          whileHover={{ scale: 1.2, color: "#ef4444" }}
                          whileTap={{ scale: 0.85 }}
                          onClick={(e) => deleteConversation(conv.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-destructive/20 hover:text-destructive transition-all"
                        >
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.1 }}
            className="flex-1 flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-xl"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {messages.length === 0 && !streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="h-full flex flex-col items-center justify-center gap-6 py-8"
                >
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-primary/20"
                  >
                    <Bot size={40} className="text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-display font-bold mb-2">Your AI Tutor is Ready!</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Ask me anything — Maths problems, Science concepts, Essay help, or exam tips. I'm here 24/7!
                    </p>
                  </motion.div>
                  <motion.div
                    variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl"
                  >
                    {QUICK_PROMPTS.map((p) => (
                      <motion.button
                        key={p.label}
                        variants={{ hidden: { opacity: 0, y: 15, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } } }}
                        whileHover={{ scale: 1.05, y: -3, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => sendMessage(p.text)}
                        className="group flex items-center gap-2 p-3 rounded-2xl bg-secondary hover:bg-primary hover:text-white transition-all text-left text-sm font-medium border border-border hover:border-primary"
                      >
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <p.icon size={16} className="shrink-0 text-primary group-hover:text-white" />
                        </motion.div>
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
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26, delay: idx * 0.02 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-violet-500 to-purple-600"
                    }`}
                  >
                    {msg.role === "user" ? "U" : <Bot size={16} />}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-tr-sm"
                        : "bg-secondary text-foreground rounded-tl-sm"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {streaming && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="flex gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shadow-md"
                  >
                    <Bot size={16} />
                  </motion.div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-secondary text-foreground shadow-sm">
                    {streamingContent ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingContent) }} />
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              className="w-2 h-2 bg-primary/60 rounded-full"
                            />
                          ))}
                        </div>
                        <span>Thinking...</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-t border-border p-3 md:p-4 bg-background/50"
            >
              <motion.div
                whileFocusWithin={{ boxShadow: "0 0 0 2px rgba(99,102,241,0.3)", borderColor: "rgba(99,102,241,0.5)" }}
                className="flex items-end gap-3 bg-secondary/60 rounded-2xl p-2 border border-border transition-colors"
              >
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
                  whileHover={input.trim() && !streaming ? { scale: 1.12, boxShadow: "0 6px 18px rgba(99,102,241,0.4)" } : {}}
                  whileTap={input.trim() && !streaming ? { scale: 0.9 } : {}}
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || streaming}
                  className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <AnimatePresence mode="wait">
                    {streaming ? (
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
              </motion.div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                AI can make mistakes. Always verify important answers with your textbook.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
