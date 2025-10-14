import React from "react";
import "./ChatBubble.css";

function ChatBubble({
  message,
  type = "received",
  timestamp,
  isTyping = false,
  parsedContent = null,
}) {
  // Function to render inline formatting (bold, etc.)
  const renderInlineFormatting = (text) => {
    if (!text) return text;

    // Handle bold text **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Render parsed content sections
  const renderParsedContent = (sections) => {
    return sections.map((section) => {
      switch (section.type) {
        case "header":
          return (
            <h4 key={section.key} className="chat-bubble__header">
              {section.content}
            </h4>
          );
        case "numbered-item":
          return (
            <div key={section.key} className="chat-bubble__numbered-item">
              {renderInlineFormatting(section.content)}
            </div>
          );
        case "bullet":
          return (
            <div key={section.key} className="chat-bubble__bullet">
              • {renderInlineFormatting(section.content)}
            </div>
          );
        case "checklist":
          return (
            <div key={section.key} className="chat-bubble__checklist">
              <span className="chat-bubble__checkbox">☐</span>
              {renderInlineFormatting(section.content)}
            </div>
          );
        case "paragraph":
        default:
          return (
            <p key={section.key} className="chat-bubble__paragraph">
              {renderInlineFormatting(section.content)}
            </p>
          );
      }
    });
  };
  return (
    <div
      className={`chat-bubble ${
        type === "sent" ? "chat-bubble--sent" : "chat-bubble--received"
      }`}
    >
      <div className="chat-bubble__container">
        {isTyping ? (
          <div className="chat-bubble__typing">
            <span className="chat-bubble__typing-dot"></span>
            <span className="chat-bubble__typing-dot"></span>
            <span className="chat-bubble__typing-dot"></span>
          </div>
        ) : (
          <div className="chat-bubble__content">
            {parsedContent ? (
              renderParsedContent(parsedContent)
            ) : (
              <p className="chat-bubble__message">{message}</p>
            )}
          </div>
        )}
        {timestamp && !isTyping && (
          <span className="chat-bubble__timestamp">{timestamp}</span>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
