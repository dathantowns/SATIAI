import { useState, useEffect, useRef, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { sendMessage as sendMessageAPI } from "../../../utils/api";
import "./Chat.css";
import ChatBubble from "../../components/ChatBubble/ChatBubble";

function Chat() {
  const currentUser = useContext(CurrentUserContext);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Parse message content for better formatting
  const parseMessage = (text) => {
    if (!text) return text;

    const paragraphs = text.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      if (paragraph.match(/^\*\*\d+\./)) {
        return {
          type: "numbered-item",
          content: paragraph.replace(/^\*\*(\d+\..+?)\*\*/, "$1"),
          key: `numbered-${index}`,
        };
      }

      if (paragraph.startsWith("- ")) {
        return {
          type: "bullet",
          content: paragraph.replace(/^- /, ""),
          key: `bullet-${index}`,
        };
      }

      if (paragraph.startsWith("- [ ]")) {
        return {
          type: "checklist",
          content: paragraph.replace(/^- \[ \] /, ""),
          key: `check-${index}`,
        };
      }

      if (paragraph.match(/^\*\*[^*]+\*\*$/)) {
        return {
          type: "header",
          content: paragraph.replace(/\*\*/g, ""),
          key: `header-${index}`,
        };
      }

      return {
        type: "paragraph",
        content: paragraph,
        key: `para-${index}`,
      };
    });
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  // Send message function with session-based context
  const sendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      message,
      type: "sent",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: currentUser?.name || "You",
    };

    // Add user message locally
    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Send the full conversation to the backend
    sendMessageAPI([...messages, newMessage])
      .then((response) => {
        setIsTyping(false);

        const aiResponseText =
          response.response || response.message || "I received your message!";
        const aiResponse = {
          id: Date.now() + 1,
          message: aiResponseText,
          parsedContent: parseMessage(aiResponseText),
          type: "received",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: "SATI Assistant",
        };

        setMessages((prev) => [...prev, aiResponse]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setIsTyping(false);

        const errorResponse = {
          id: Date.now() + 1,
          message:
            "Sorry, I'm having trouble responding right now. Please try again later.",
          type: "received",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: "SATI Assistant",
        };

        setMessages((prev) => [...prev, errorResponse]);
      });
  };

  return (
    <div className="chat">
      {/* Left Sidebar */}
      <div className="chat__sidebar">
        <div className="chat__info">
          <h3 className="chat__info-title">SATI Assistant</h3>
          <p className="chat__info-description">
            Ask me questions about your lectures, get feedback suggestions, or
            discuss SATI principles for improving instruction.
          </p>
        </div>
      </div>

      {/* Right Content Area - Chat Interface */}
      <div className="chat__content">
        <div className="chat__header">
          <h1 className="chat__title">Chat</h1>
        </div>

        {/* Messages Container */}
        <div className="chat__messages">
          {messages.length === 0 ? (
            <div className="chat__welcome">
              <p className="chat__welcome-text">
                Welcome! Start a conversation with the SATI Assistant.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg.message}
                type={msg.type}
                timestamp={msg.timestamp}
                parsedContent={msg.parsedContent}
              />
            ))
          )}

          {/* Typing indicator */}
          {isTyping && <ChatBubble type="received" isTyping={true} />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="chat__input-section">
          <form onSubmit={handleSubmit} className="chat__form">
            <div className="chat__input-container">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="chat__input"
                rows="1"
                maxLength={1000}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="chat__send-btn"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
