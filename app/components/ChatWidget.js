"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Aarize logo SVG component (extracted from website)
const AarizeLogo = ({ size = 20, color = "#fff" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size * 4.87}
    height={size}
    viewBox="0 0 126.826 26.046"
  >
    <g transform="translate(-78.565 -4845.088)">
      <path
        d="M101.623,4863.912l3.1-.157v0C103.793,4863.8,102.843,4863.846,101.623,4863.912Z"
        fill={color}
      />
      <path
        d="M118.627,4845.088h-7.863q-3.877,7.683-7.637,15.427-3.785-7.682-7.438-15.427H87.826q-4.771,10.14-9.261,20.411c2.8-.237,4.2-.346,7-.557.571-1.427.855-2.14,1.427-3.553,3.7-.222,5.551-.324,9.257-.509.579,1.306.87,1.958,1.449,3.254,1.525-.087,2.639-.153,3.79-.215.047,0,.094,0,.138-.007,1.22-.066,2.17-.113,3.1-.16,1.139-.059,2.246-.109,3.764-.175.571-1.314.859-1.973,1.43-3.28,3.706-.127,5.559-.186,9.265-.277.583,1.249.87,1.872,1.453,3.117,2.814-.081,4.219-.113,7.036-.164Q123.108,4854.049,118.627,4845.088Zm-30.313,12.188c1.329-3.167,1.995-4.729,3.324-7.82h.051c1.307,3.051,1.958,4.558,3.265,7.547C92.3,4857.1,90.968,4857.159,88.314,4857.276Zm22.934-.794c1.329-2.938,1.995-4.4,3.327-7.292h.051c1.307,2.873,1.959,4.3,3.266,7.143C115.234,4856.384,113.906,4856.413,111.248,4856.482Z"
        fill={color}
      />
      <path
        d="M143.232,4860.333l-1.168-1.86a3.81,3.81,0,0,0-3.141-1.533c-1.589,0-2.383.008-3.972.018,0,2.364,0,3.546,0,5.91-2.71.026-4.066.044-6.776.094q0-8.937.01-17.874H143.8c4.982,0,7.837,2.064,7.838,5.646,0,2.662-1.971,4.51-5.371,5.119v.025a3.467,3.467,0,0,1,1.636,1.347l1.324,1.92a1.76,1.76,0,0,0,1.506.758,2.04,2.04,0,0,0,1.376-.558c.457,1.05.686,1.576,1.143,2.628a8.226,8.226,0,0,1-4.751,1.387A6.172,6.172,0,0,1,143.232,4860.333Zm-1.454-7.041c1.947,0,3.089-.815,3.089-2.179,0-1.389-1.142-2.208-3.089-2.208-2.73,0-4.1,0-6.825.007,0,1.758,0,2.637,0,4.4C137.682,4853.3,139.048,4853.293,141.778,4853.292Z"
        fill={color}
      />
      <path
        d="M154.67,4845.088h6.72q.006,9,.013,18c-2.689-.069-4.034-.1-6.724-.143Q154.674,4854.016,154.67,4845.088Z"
        fill={color}
      />
      <path
        d="M163.393,4858.223c5.043-3.446,7.564-5.178,12.6-8.765-4.94-.053-7.41-.074-12.351-.108.04-1.7.06-2.557.1-4.262H183.7c-.029,2.09-.044,3.136-.073,5.225-5.04,3.608-7.56,5.339-12.6,8.76,5.149.151,7.723.244,12.87.462l0,4.463q-10.243-.568-20.5-.859C163.4,4861.173,163.4,4860.189,163.393,4858.223Z"
        fill={color}
      />
      <path
        d="M185.543,4845.088h19.589v4.613c-5.208-.1-7.813-.143-13.022-.221l0,3.253c4.794.126,7.191.2,11.983.351v3.942c-4.791-.232-7.187-.337-11.98-.524l0,3.606c5.311.273,7.966.427,13.273.773v4.618q-9.906-.834-19.831-1.406Q185.551,4854.59,185.543,4845.088Z"
        fill={color}
      />
      <ellipse
        cx="40.63"
        cy="1.923"
        rx="40.63"
        ry="1.923"
        transform="translate(101.348 4867.289)"
        fill={color}
      />
    </g>
  </svg>
);

// Send icon
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.4 12H18.6M18.6 12L12 5.4M18.6 12L12 18.6"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Voice/Microphone icon
const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="18" style={{ color: "var(--color-text-secondary)" }}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor" opacity="0.15"/>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 19v4M8 23h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Chat icon for the floating button
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 11.5C21 16.75 16.75 21 11.5 21C10.12 21 8.81 20.72 7.62 20.21L3 21L3.79 16.38C3.28 15.19 3 13.88 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 21 6.25 21 11.5Z"
      fill="#fff"
      stroke="#fff"
      strokeWidth="1.5"
    />
    <circle cx="9" cy="12" r="1.2" fill="#b8944f" />
    <circle cx="12.5" cy="12" r="1.2" fill="#b8944f" />
    <circle cx="16" cy="12" r="1.2" fill="#b8944f" />
  </svg>
);

// Full screen/Expansion SVG icons
const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShrinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M4 14h6v6M20 10h-6V4M14 10l6-6M10 14l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinimizeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseHeaderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Quick suggestions config with exact requested questions
const SUGGESTIONS = [
  {
    text: "What are the residential projects by Aarize?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    text: "What commercial and office spaces does Aarize offer?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="10" x2="6.01" y2="10"/>
        <line x1="6" y1="14" x2="6.01" y2="14"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
        <line x1="10" y1="6" x2="10.01" y2="6"/>
        <line x1="10" y1="10" x2="10.01" y2="10"/>
        <line x1="10" y1="14" x2="10.01" y2="14"/>
        <line x1="10" y1="18" x2="10.01" y2="18"/>
        <line x1="14" y1="6" x2="14.01" y2="6"/>
        <line x1="14" y1="10" x2="14.01" y2="10"/>
        <line x1="18" y1="6" x2="18.01" y2="6"/>
        <line x1="18" y1="10" x2="18.01" y2="10"/>
      </svg>
    ),
  },
  {
    text: "How do I get in touch with Aarize for a sales enquiry?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    text: "What SCO plots does Aarize offer in Gurugram?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M21 12H3"/>
        <path d="M12 3v18"/>
      </svg>
    ),
  },
  {
    text: "What are the latest updates and news from Aarize?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1M19 12H11m8 4h-8m8-8h-8"/>
        <polyline points="23 7 19 11 15 7"/>
      </svg>
    ),
  },
  {
    text: "What are the upcoming Aarize projects?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    text: "What amenities do Aarize residential projects offer?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
  {
    text: "What township projects does Aarize offer?",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

// Format time
function formatTime(date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Simple markdown renderer
function renderMarkdown(text) {
  if (!text) return "";

  let html = text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Links
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Auto-link URLs not already in anchor tags
    .replace(
      /(?<!["'])(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Unordered lists
    .replace(/^[\-\*] (.+)$/gm, "<li>$1</li>")
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Line breaks
    .replace(/\n/g, "<br/>");

  // Wrap consecutive <li> tags in <ul>
  html = html.replace(/((?:<li>.*?<\/li><br\/>?)+)/g, "<ul>$1</ul>");
  html = html.replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
    return "<ul>" + content.replace(/<br\/>/g, "") + "</ul>";
  });

  return html;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !showOnboarding) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen, showOnboarding]);

  const openChat = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setIsExpanded(false);
    }, 300);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleOnboarding = (e) => {
    e.preventDefault();
    setShowOnboarding(false);
    addBotGreeting();
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
    addBotGreeting();
  };

  const addBotGreeting = () => {
    const greeting = userInfo.name
      ? `Hello! 🖐 Welcome to AVA. How can I help you today, ${userInfo.name}?`
      : `Hello! 🖐 Welcome to AVA. How can I help you today?`;

    setMessages([
      {
        role: "assistant",
        content: greeting,
        time: new Date(),
      },
    ]);
  };

  const handleBackToMenu = () => {
    setMessages([]);
    setShowOnboarding(true);
    setShowSuggestions(true);
    setUserInfo({ name: "", email: "", phone: "" });
  };

  const sendMessage = async (text) => {
    const userMessage = text || inputValue.trim();
    if (!userMessage || isLoading) return;

    setInputValue("");
    setShowSuggestions(false);

    const newUserMsg = {
      role: "user",
      content: userMessage,
      time: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Build message history for the API (without time field)
      const apiMessages = [...messages, newUserMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, userInfo }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      // Handle streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botContent = "";
      const botTime = new Date();

      // Add empty bot message to stream into
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", time: botTime },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.replace("data: ", "");
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              botContent += parsed.content;
              // Update the last message with streamed content
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: botContent,
                  time: botTime,
                };
                return updated;
              });
            }
            if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (parseErr) {
            // Skip malformed JSON chunks
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again or contact Aarize directly at **+91 9464 700 700** or **sales@aarize.in**.",
          time: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "38px";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="chat-button-container">
          <div className="chat-label">Chat with AVA →</div>
          <button
            className="chat-button"
            onClick={openChat}
            aria-label="Open chat"
            id="chat-open-btn"
          >
            <span className="chat-button-ping" />
            <div className="chat-button-inner">
              <img src="/avatar.png" alt="Aarize Avatar" className="chat-avatar-img" />
            </div>
          </button>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <>
          <div
            className={`chat-panel ${isClosing ? "chat-panel-closing" : ""} ${
              isExpanded ? "chat-panel-expanded" : ""
            }`}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-inner">
                {/* Header title text and avatar have been removed as requested */}
                <div className="chat-header-info" />
                
                {/* Header Action Buttons */}
                <div className="chat-header-actions">
                  {!showOnboarding && (
                    <button
                      className="chat-action-btn back-btn"
                      onClick={handleBackToMenu}
                      title="Back to Main Menu"
                      aria-label="Back to Main Menu"
                    >
                      <BackIcon />
                    </button>
                  )}
                  <button
                    className="chat-action-btn"
                    onClick={toggleExpand}
                    title={isExpanded ? "Exit Fullscreen" : "Fullscreen"}
                    aria-label="Toggle Fullscreen"
                  >
                    {isExpanded ? <ShrinkIcon /> : <ExpandIcon />}
                  </button>
                  <button
                    className="chat-action-btn"
                    onClick={closeChat}
                    title="Minimize"
                    aria-label="Minimize"
                  >
                    <MinimizeIcon />
                  </button>
                  <button
                    className="chat-action-btn close-btn"
                    onClick={closeChat}
                    title="Close"
                    aria-label="Close"
                  >
                    <CloseHeaderIcon />
                  </button>
                </div>
              </div>
            </div>

            {showOnboarding ? (
              /* Onboarding Form */
              <div className="onboarding">
                <div className="onboarding-title">Welcome to AVA</div>
                <div className="onboarding-subtitle">
                  Share your details so I can assist you better.
                </div>
                <form className="onboarding-form" onSubmit={handleOnboarding}>
                  <div>
                    <label className="form-label" htmlFor="onboard-name">
                      Your Full Name
                    </label>
                    <input
                      id="onboard-name"
                      className="form-input"
                      type="text"
                      placeholder="e.g. Rohan Sharma"
                      value={userInfo.name}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="onboard-email">
                      Email Address
                    </label>
                    <input
                      id="onboard-email"
                      className="form-input"
                      type="email"
                      placeholder="e.g. rohan@company.com"
                      value={userInfo.email}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="onboard-phone">
                      Contact Mobile (Optional)
                    </label>
                    <input
                      id="onboard-phone"
                      className="form-input"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={userInfo.phone}
                      onChange={(e) =>
                        setUserInfo((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    className="onboarding-submit"
                    id="onboard-submit"
                  >
                    Start Chatting →
                  </button>
                  <button
                    type="button"
                    className="onboarding-skip"
                    onClick={skipOnboarding}
                    id="onboard-skip"
                  >
                    Skip for now
                  </button>
                </form>
              </div>
            ) : (
              /* Chat Interface */
              <div className="chat-container">
                <div className="chat-content-wrapper">
                  <div className={`messages-area ${messages.length === 1 ? "no-scroll" : ""}`} id="messages-area">
                    {/* Central Welcome Card */}
                    {messages.length === 1 && (
                      <div className="central-welcome-card animate-fade-in">
                        <div className="central-logo-box">
                          <img src="/avatar.png" alt="Avatar" className="central-avatar-img" />
                        </div>
                        <div className="central-heading-logo">
                          <AarizeLogo size={14} color="#000" />
                        </div>
                        <div className="central-subtitle">Aarize Virtual Assistant</div>
                      </div>
                    )}

                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`message message-${msg.role === "user" ? "user" : "bot"} ${messages.length === 1 && i === 0 ? "welcome-message-row" : ""}`}
                      >
                        {msg.role === "assistant" && !(messages.length === 1 && i === 0) && (
                          <div className="message-avatar-agent">
                            <img src="/avatar.png" alt="Assistant avatar" className="agent-avatar-img" />
                          </div>
                        )}
                        <div className="message-content">
                          <div
                            className={`message-bubble ${messages.length === 1 && i === 0 ? "welcome-bubble" : ""}`}
                            dangerouslySetInnerHTML={{
                              __html: renderMarkdown(msg.content),
                            }}
                          />
                          {!(messages.length === 1 && i === 0) && (
                            <div className="message-time">
                              {formatTime(msg.time)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                      <div className="typing-indicator">
                        <div className="message-avatar-agent">
                          <img src="/avatar.png" alt="Assistant avatar" className="agent-avatar-img" />
                        </div>
                        <div className="typing-dots">
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                        </div>
                      </div>
                    )}

                    {/* Input area placed inline in welcome screen context if empty, or at bottom */}
                    {messages.length === 1 && (
                      <div className="inline-input-container">
                        <div className="input-wrapper">
                          <textarea
                            ref={inputRef}
                            className="chat-input"
                            placeholder="Ask AVA..."
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            id="chat-input"
                          />
                          <button
                            className="mic-button"
                            type="button"
                            aria-label="Voice input"
                          >
                            <MicIcon />
                          </button>
                          <button
                            className="send-button"
                            onClick={() => sendMessage()}
                            disabled={!inputValue.trim() || isLoading}
                            id="chat-send-btn"
                            aria-label="Send message"
                          >
                            <SendIcon />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quick suggestions section */}
                    {showSuggestions && messages.length === 1 && (
                      <div className="quick-suggestions-section">
                        <h3 className="section-title">QUICK SUGGESTIONS</h3>
                        <div className="suggestions-grid">
                          {SUGGESTIONS.map((s, i) => (
                            <button
                              key={i}
                              className="suggestion-card"
                              onClick={() => sendMessage(s.text)}
                            >
                              <span className="suggestion-icon">{s.icon}</span>
                              <span className="suggestion-text">{s.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Bottom Input Area - Only shown when conversation has proceeded past the first message */}
                  {messages.length > 1 && (
                    <div className="input-area">
                      <div className="input-wrapper">
                        <textarea
                          ref={inputRef}
                          className="chat-input"
                          placeholder="Ask AVA..."
                          value={inputValue}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
                          rows={1}
                          id="chat-input-bottom"
                        />
                        <button
                          className="mic-button"
                          type="button"
                          aria-label="Voice input"
                        >
                          <MicIcon />
                        </button>
                        <button
                          className="send-button"
                          onClick={() => sendMessage()}
                          disabled={!inputValue.trim() || isLoading}
                          id="chat-send-btn-bottom"
                          aria-label="Send message"
                        >
                          <SendIcon />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
