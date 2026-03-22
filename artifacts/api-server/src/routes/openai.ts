import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db/schema";
import { CreateOpenaiConversationBody, SendOpenaiMessageBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.get("/openai/conversations", async (_req, res) => {
  const rows = await db.select().from(conversations).orderBy(conversations.createdAt);
  res.json(rows);
});

router.post("/openai/conversations", async (req, res) => {
  const body = CreateOpenaiConversationBody.parse(req.body);
  const [row] = await db.insert(conversations).values({ title: body.title }).returning();
  res.status(201).json(row);
});

router.get("/openai/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json({ ...conv, messages: msgs });
});

router.delete("/openai/conversations/:id", async (req, res) => {
  const id = Number(req.params.id);
  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  await db.delete(messages).where(eq(messages.conversationId, id));
  await db.delete(conversations).where(eq(conversations.id, id));
  res.status(204).end();
});

router.get("/openai/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const msgs = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);
  res.json(msgs);
});

router.post("/openai/conversations/:id/messages", async (req, res) => {
  const id = Number(req.params.id);
  const body = SendOpenaiMessageBody.parse(req.body);

  const [conv] = await db.select().from(conversations).where(eq(conversations.id, id));
  if (!conv) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  await db.insert(messages).values({ conversationId: id, role: "user", content: body.content });

  const history = await db.select().from(messages).where(eq(messages.conversationId, id)).orderBy(messages.createdAt);

  const chatMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    {
      role: "system",
      content: `You are an expert Class 10 CBSE tutor and study assistant. You are highly knowledgeable about all CBSE Class 10 subjects: Mathematics, Science (Physics, Chemistry, Biology), English, Social Science (History, Geography, Civics, Economics), and Hindi.

Your role is to:
1. Explain concepts clearly and simply in a way a 10th standard student can understand
2. Solve problems step-by-step, showing all working
3. Help with NCERT exercises and CBSE board exam questions
4. Provide mnemonics, shortcuts, and tips to remember formulas
5. Answer both Hindi and English questions fluently
6. For maths, always show complete step-by-step solutions
7. For science, explain the reasoning and real-world connections
8. Motivate students and make learning fun

Always be encouraging, patient, and thorough. If a question is unclear, ask for clarification. Format your responses clearly using headings, bullet points, and numbered steps where appropriate.`
    },
    ...history.map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullResponse = "";

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: chatMessages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    await db.insert(messages).values({ conversationId: id, role: "assistant", content: fullResponse });

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: "AI error occurred. Please try again." })}\n\n`);
    res.end();
  }
});

export default router;
