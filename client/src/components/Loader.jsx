import { useState, useEffect } from "react";

export default function Loader() {
  const messages = [
    "Reading your resume data...",
    "Extracting key skills and experience...",
    "Analyzing your professional summary...",
    "Understanding job description details...",
    "Comparing your skills with job requirements...",
    "Identifying matching qualifications...",
    "Evaluating gaps and improvement areas...",
    "Scoring your profile alignment...",
    "Generating detailed recommendations...",
    "Finalizing your analysis report..."
  ];

  const [currentMsg, setCurrentMsg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsg((prev) => (prev + 1) % messages.length);
    }, 3000); // change message every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
      <p className="mt-4 text-sky-600 font-medium text-sm transition-all duration-500">
        {messages[currentMsg]}
      </p>
    </div>
  );
}
