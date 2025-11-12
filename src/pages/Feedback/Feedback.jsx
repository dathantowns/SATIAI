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

    // Find main headings like **Object Lesson:**
    const mainPattern = /\*\*(.*?):\*\*/g;
    const mainMatches = [...text.matchAll(mainPattern)];

    // Add a sentinel to mark the end of the text
    mainMatches.push({ 1: "END", index: text.length });

    for (let i = 0; i < mainMatches.length - 1; i++) {
      const mainSectionName = mainMatches[i][1].trim();
      const start = mainMatches[i].index;
      const end = mainMatches[i + 1].index;

      const mainSectionText = text.slice(start, end).trim();

      // Initialize the main section
      sections[mainSectionName] = {};

      // Find subsections like "Strengths:" and "Areas for Improvement:"
      const subPattern = /^([A-Za-z\s]+):\s*$/gm;
      const subMatches = [...mainSectionText.matchAll(subPattern)];

      // Add a sentinel for the last subsection
      subMatches.push({ 1: "END", index: mainSectionText.length });

      for (let j = 0; j < subMatches.length - 1; j++) {
        const subSectionName = subMatches[j][1].trim();
        const subStart = subMatches[j].index;
        const subEnd = subMatches[j + 1].index;

        const subSectionText = mainSectionText.slice(subStart, subEnd).trim();

        // Extract numbered items like "1. ..."
        const items = [
          ...subSectionText.matchAll(
            /^\d+\.\s+(.*?)(?=\n\d+\.|\n[A-Za-z]|$)/gms
          ),
        ].map((m) => m[1].replace(/\n/g, " ").trim());

        if (items.length > 0) {
          sections[mainSectionName][subSectionName] = items;
        }
      }
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
          title="Object Lesson"
          content={parsedFeedback?.["Object Lesson"]}
          color="success"
        />

        <FeedbackCard
          title="Concept Lesson"
          content={parsedFeedback?.["Concept Lesson"]}
          color="info"
        />

        <FeedbackCard
          title="Teacher as Catalyst"
          content={parsedFeedback?.["Teacher as Catalyst"]}
          color="warning"
        />
      </div>
    </div>
  );
}

export default Feedback;
