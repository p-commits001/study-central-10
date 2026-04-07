import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

const BASE_TITLE = "Class 10 Hub";
const BASE_URL = "https://class10hubs.netlify.app";

export function useSEO({ title, description, keywords, ogTitle, ogDescription, canonical }: SEOProps) {
  useEffect(() => {
    document.title = `${title} | ${BASE_TITLE}`;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", description);
    if (keywords) setMeta('meta[name="keywords"]', "content", keywords);

    setMeta('meta[property="og:title"]', "content", ogTitle || `${title} | ${BASE_TITLE}`);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:url"]', "content", canonical ? `${BASE_URL}${canonical}` : BASE_URL);

    setMeta('meta[name="twitter:title"]', "content", ogTitle || `${title} | ${BASE_TITLE}`);
    setMeta('meta[name="twitter:description"]', "content", ogDescription || description);

    const canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink && canonical) canonicalLink.href = `${BASE_URL}${canonical}`;

    return () => {
      document.title = `${BASE_TITLE} — Free CBSE Class 10 Notes, Quiz & AI Tutor 2026-27`;
    };
  }, [title, description, keywords, ogTitle, ogDescription, canonical]);
}

export const SEO_DATA = {
  home: {
    title: "Free CBSE Class 10 Notes, Quiz, AI Tutor & Video Reels 2026-27",
    description: "Class 10 Hub — India's best free CBSE Class 10 platform. Notes, MCQ Quiz, Important Questions, NCERT PDFs, AI Tutor, AI Image & Video Reel Generator. Board Exam 2026-2027.",
    keywords: "class 10 hub, CBSE class 10 free notes 2026-27, class 10 board exam preparation, CBSE 2026-2027 board exam, free class 10 study material, class 10 AI tutor, class 10 quiz, NCERT class 10, Priyanshu Taraori",
    canonical: "/",
  },
  notes: {
    title: "CBSE Class 10 Chapter Notes — Science, Maths, SST, English, Hindi 2026-27",
    description: "Free chapter-wise CBSE Class 10 notes for Science, Mathematics, Social Science, English and Hindi. Detailed, easy-to-understand notes for Board Exam 2026-2027.",
    keywords: "class 10 notes 2026-27, CBSE class 10 science notes, class 10 maths notes, class 10 SST notes, class 10 English notes, class 10 Hindi notes, NCERT class 10 notes, chapter wise notes class 10",
    canonical: "/notes",
  },
  quiz: {
    title: "CBSE Class 10 MCQ Quiz — Daily Practice for Board Exam 2026-27",
    description: "Practice 500+ MCQ questions for CBSE Class 10. Subject-wise daily quiz covering Science, Maths, SST, English & Hindi. Instant feedback with explanations. Board Exam 2026-2027.",
    keywords: "class 10 MCQ quiz 2026-27, CBSE class 10 objective questions, class 10 multiple choice questions, class 10 online quiz 2026, class 10 science MCQ, class 10 maths MCQ, CBSE board exam practice",
    canonical: "/quiz",
  },
  questions: {
    title: "CBSE Class 10 Important Questions 2026-27 — All Subjects with Answers",
    description: "Curated important questions for CBSE Class 10 Board Exam 2026-2027. Includes 3-mark, 5-mark questions for Science, Maths, SST, English & Hindi with model answers.",
    keywords: "class 10 important questions 2026-27, CBSE board exam important questions, class 10 science important questions, class 10 maths important questions, 5 mark questions class 10, board exam 2026-27 preparation",
    canonical: "/questions",
  },
  aiTutor: {
    title: "AI Study Tutor for Class 10 — Ask Any CBSE Doubt Instantly 2026-27",
    description: "Get instant answers to any CBSE Class 10 question. AI tutor explains Science, Maths, SST concepts with examples. Available 24/7 for board exam preparation 2026-2027.",
    keywords: "class 10 AI tutor 2026-27, CBSE doubt solver, class 10 question answer AI, AI study assistant class 10, class 10 science doubt, class 10 maths doubt, free AI tutor India",
    canonical: "/ai-tutor",
  },
  aiImage: {
    title: "AI Educational Image Generator — Class 10 Diagrams & Illustrations 2026-27",
    description: "Generate free educational diagrams and illustrations for CBSE Class 10. Human Eye, Water Cycle, Circuits, Photosynthesis, and more. Powered by AI.",
    keywords: "class 10 diagram generator, AI educational image, human eye diagram AI, class 10 science diagram, free educational illustration AI, CBSE class 10 image generator 2026-27",
    canonical: "/ai-image",
  },
  aiVideo: {
    title: "AI Reel Maker — Class 10 Study Reels & Video Summarizer 2026-27",
    description: "Create animated educational video reels for CBSE Class 10 topics. Type any topic and get a 9:16 animated reel with key facts and background music. Board Exam 2026-2027.",
    keywords: "class 10 video reel generator, educational video maker class 10, CBSE class 10 animated video, study reel generator AI, class 10 YouTube shorts maker, educational reel Hindi 2026-27",
    canonical: "/ai-video-summarizer",
  },
  pdfs: {
    title: "CBSE Class 10 PDF Downloads — NCERT Books, Sample Papers 2026-27",
    description: "Download free CBSE Class 10 PDFs: NCERT textbooks, previous year question papers 2022-2026, sample papers, and study guides for Board Exam 2026-2027.",
    keywords: "class 10 PDF download 2026-27, NCERT class 10 PDF, CBSE sample paper class 10, class 10 question paper 2025 2026, free PDF class 10 India, CBSE board paper download",
    canonical: "/pdfs",
  },
  tips: {
    title: "Class 10 Board Exam Study Tips & Strategies 2026-27 — Score 95+",
    description: "Expert study tips for CBSE Class 10 Board Exam 2026-2027. Time management, revision strategies, subject-wise tips to score 95+ in boards.",
    keywords: "class 10 board exam tips 2026-27, how to score 95 in class 10, class 10 study strategy, CBSE board exam preparation tips, class 10 topper tips, board exam 2026-27 India",
    canonical: "/tips",
  },
};
