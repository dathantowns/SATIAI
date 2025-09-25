import React, { useEffect, useState } from "react";
import "./Feedback.css";
import feedbackBg from "../../assets/feedbackBg.avif";
import FeedbackCard from "./FeedbackCard/FeedbackCard";
import { useFeedback } from "../../contexts/FeedbackContext";

function Feedback() {
  const { feedback, isLoading } = useFeedback();
  const [parsedFeedback, setParsedFeedback] = useState(null);

  function parseFeedback(text) {
    const sections = {};

    // Find headings like **Strengths:**
    const pattern = /\*\*(.*?)\:\*\*/g;
    const matches = [...text.matchAll(pattern)];

    // Add a sentinel to mark the end of the text
    matches.push({ 1: "END", index: text.length });

    for (let i = 0; i < matches.length - 1; i++) {
      const sectionName = matches[i][1].trim();
      const start = matches[i].index;
      const end = matches[i + 1].index;

      const sectionText = text.slice(start, end).trim();

      // Extract numbered items like "1. ..."
      const items = [
        ...sectionText.matchAll(/\d+\.\s+(.*?)(?=\n\d+\.|\Z)/gs),
      ].map((m) => m[1].replace(/\n/g, " ").trim());

      sections[sectionName] = items;
    }

    return sections;
  }

  useEffect(() => {
    console.log("useEffect triggered - feedback:", feedback);
    console.log("feedback type:", typeof feedback);
    console.log("feedback truthy:", !!feedback);

    if (feedback && typeof feedback === "string") {
      console.log("Parsing feedback string...");
      const parsed = parseFeedback(feedback);
      console.log("Parsed feedback:", parsed);
      setParsedFeedback(parsed);
    } else if (feedback) {
      console.log("Feedback is not a string, it's:", typeof feedback);
      console.log("Feedback value:", feedback);
      setParsedFeedback(feedback); // If it's already an object, use it directly
    } else {
      console.log("No feedback available yet");
      setParsedFeedback(null);
    }
  }, [feedback]); // Show loading state while feedback is being processed
  if (isLoading) {
    return (
      <div className="feedback">
        <img src={feedbackBg} alt="Background" className="feedback__bg" />
        <h1 className="feedback__title">Analyzing...</h1>
        <div className="feedback__loading">
          <p>Processing your feedback...</p>
        </div>
      </div>
    );
  }

  // Show placeholder content if no feedback is available
  if (!feedback) {
    return (
      <div className="feedback">
        <img src={feedbackBg} alt="Background" className="feedback__bg" />
        <h1 className="feedback__title">Feedback</h1>
        <div className="feedback__placeholder">
          <p>Upload a file to see your feedback here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback">
      <img src={feedbackBg} alt="Background" className="feedback__bg" />
      <h1 className="feedback__title">Feedback</h1>

      <div className="feedback__cards">
        <FeedbackCard
          title="Strengths"
          content={
            parsedFeedback?.Strengths?.join("\n• ")
              ? `• ${parsedFeedback.Strengths.join("\n• ")}`
              : parsedFeedback?.strengths ||
                feedback?.strengths ||
                "No strengths data available."
          }
          color="success"
        />

        <FeedbackCard
          title="Areas For Improvement"
          content={
            parsedFeedback?.["Areas for Improvement"]?.join("\n• ")
              ? `• ${parsedFeedback["Areas for Improvement"].join("\n• ")}`
              : parsedFeedback?.improvements ||
                feedback?.improvements ||
                "No improvement suggestions available."
          }
          color="info"
        />

        <FeedbackCard
          title="Summary"
          content={
            parsedFeedback?.Summary?.join("\n• ")
              ? `• ${parsedFeedback.Summary.join("\n• ")}`
              : parsedFeedback?.summary ||
                feedback?.summary ||
                "No summary available."
          }
          color="warning"
        />
      </div>
    </div>
  );
}

export default Feedback;
