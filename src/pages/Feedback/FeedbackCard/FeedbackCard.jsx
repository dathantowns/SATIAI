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

  // Function to render structured content
  const renderStructuredContent = (content) => {
    if (!content || typeof content !== "object") {
      return <p className="feedback-card__text">No data available.</p>;
    }

    return Object.entries(content).map(([subsectionName, items]) => (
      <div key={subsectionName} className="feedback-card__subsection">
        <h4 className="feedback-card__subsection-title">{subsectionName}</h4>
        {Array.isArray(items) && items.length > 0 ? (
          <ul className="feedback-card__list">
            {items.map((item, index) => (
              <li key={index} className="feedback-card__list-item">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="feedback-card__text">No items available.</p>
        )}
      </div>
    ));
  };

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
        ) : typeof content === "object" ? (
          renderStructuredContent(content)
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default FeedbackCard;
