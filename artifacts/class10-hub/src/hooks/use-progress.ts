import { useState, useEffect } from 'react';

// Hook to manage completed questions using LocalStorage
export function useProgress() {
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('class10hub_progress');
      if (stored) {
        setCompletedQuestions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Toggle a question's completion status
  const toggleQuestion = (questionId: string) => {
    setCompletedQuestions((prev) => {
      const isCompleted = prev.includes(questionId);
      const newProgress = isCompleted
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId];
      
      // Save to local storage
      try {
        localStorage.setItem('class10hub_progress', JSON.stringify(newProgress));
      } catch (error) {
        console.error('Failed to save progress to localStorage', error);
      }
      
      return newProgress;
    });
  };

  const isCompleted = (questionId: string) => completedQuestions.includes(questionId);

  // Calculate stats
  const getSubjectProgress = (subjectQuestions: string[]) => {
    if (!subjectQuestions.length) return 0;
    const completed = subjectQuestions.filter(id => completedQuestions.includes(id)).length;
    return Math.round((completed / subjectQuestions.length) * 100);
  };

  const clearProgress = () => {
    setCompletedQuestions([]);
    localStorage.removeItem('class10hub_progress');
  };

  return {
    completedQuestions,
    isLoaded,
    toggleQuestion,
    isCompleted,
    getSubjectProgress,
    clearProgress,
    totalCompleted: completedQuestions.length
  };
}
