import React from "react";
import "./FeedbackCard.css";

function FeedbackCard({
  title,
  content,
  color = "default",
  className = "",
  ...props
}) {
  const cardClasses =
    `feedback-card feedback-card--${color} ${className}`.trim();

  return (
    <div className={cardClasses} {...props}>
      {title && (
        <div className="feedback-card__header">
          <h3 className="feedback-card__title">{title}</h3>
        </div>
      )}
      <div className="feedback-card__content">
        {typeof content === "string" ? (
          <p className="feedback-card__text">{content}</p>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default FeedbackCard;
