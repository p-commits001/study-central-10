import { GraduationCap, BookOpen, Brain, CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 font-display">
        About Class 10 Hub
      </h1>
      
      <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
        Class 10 Hub is a dedicated educational platform designed specifically for 
        <strong> CBSE Class 10 students (2026-2027 Session)</strong>. Our mission is to 
        provide high-quality, simplified study material to help every student score 95%+ 
        in their Board Exams.
      </p>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="text-primary" /> What We Offer
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle size={16} /> Latest CBSE Class 10 Notes 2026</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} /> Chapter-wise Important Questions</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} /> NCERT Solutions & Sample Papers</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} /> AI-Powered Study Assistant</li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-xl border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="text-primary" /> Our Aim
          </h2>
          <p className="text-muted-foreground">
            We understand the pressure of <strong>Class 10 Board Exams</strong>. 
            That's why Class 10 Hub focuses on the most repeated questions and 
            simplified NCERT concepts. Based in <strong>Taraori, Haryana</strong>, 
            we aim to reach every student across India who dreams of topping their exams.
          </p>
        </div>
      </div>

      <div className="text-center bg-primary/5 p-8 rounded-2xl border-2 border-dashed">
        <h3 className="text-xl font-bold mb-2 font-display">Focusing on CBSE 2026-27 Success</h3>
        <p className="text-muted-foreground">
          All our content is updated according to the latest <strong>CBSE Syllabus 2026</strong>. 
          Start your preparation today with the best resources available online.
        </p>
      </div>
    </div>
  );
}
