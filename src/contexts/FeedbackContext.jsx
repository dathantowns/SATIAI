import React, { createContext, useContext, useState } from "react";

// Create the context
const FeedbackContext = createContext();

// Custom hook to use the context
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};

// Provider component
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateFeedback = (newFeedback) => {
    setFeedback(newFeedback);
  };

  const clearFeedback = () => {
    setFeedback(null);
  };

  const setFeedbackLoading = (loading) => {
    setIsLoading(loading);
  };

  const value = {
    feedback,
    isLoading,
    updateFeedback,
    clearFeedback,
    setFeedbackLoading,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
