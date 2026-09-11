"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Bot,
  Minimize2,
  Maximize2,
  Send,
  User,
} from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [botpressLoaded, setBotpressLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load Botpress scripts when chat opens
  useEffect(() => {
    if (isOpen && !botpressLoaded) {
      // Botpress Webchat v5.0 inject.js
      const script1 = document.createElement("script");
      script1.src = "https://cdn.botpress.cloud/webchat/v5.0/inject.js";
      script1.async = true;
      document.head.appendChild(script1);

      // Botpress configuration script
      const script2 = document.createElement("script");
      script2.src = "https://files.bpcontent.cloud/2025/07/15/10/20250715104501-9PBAKE9H.js";
      script2.defer = true;
      document.head.appendChild(script2);

      setBotpressLoaded(true);
    }
  }, [isOpen, botpressLoaded]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const sentMessage = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response (replace with actual Botpress API call)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(sentMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes("price") || input.includes("pricing") || input.includes("cost")) {
      return "Our Bronze tier is KSh 1,000 (KSh 10/view), Silver is KSh 2,000 (KSh 25/view), and Gold League is KSh 4,000 (KSh 50/view).";
    }
    if (input.includes("register") || input.includes("sign up") || input.includes("join")) {
      return "To register, click the 'Register' button and choose either Earner or Business. Complete the form and follow the M-Pesa payment instructions.";
    }
    if (input.includes("withdraw") || input.includes("payment") || input.includes("pay")) {
      return "Withdrawals are processed on Tuesday and Saturday. Submit your request from your dashboard after admin approval.";
    }
    if (input.includes("ad") || input.includes("advert") || input.includes("campaign")) {
      return "Approved earners can download active advertisements, post to WhatsApp Status, and submit screenshot evidence within 24 hours.";
    }
    if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello! Welcome to AmplifyNet. How can I help you today?";
    }
    if (input.includes("thank")) {
      return "You're welcome! Feel free to ask if you have more questions.";
    }
    return "Thank you for your message! For detailed assistance, please contact us via WhatsApp at +254 758 787 703.";
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? "open" : ""} ${isMinimized ? "minimized" : ""}`}>
      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div className="chatbot-header-info">
                <h4>AmplifyNet Assistant</h4>
                <span className="chatbot-online">Online</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button
                className="chatbot-action-btn"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label={isMinimized ? "Maximize" : "Minimize"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button
                className="chatbot-action-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          {!isMinimized && (
            <>
              <div className="chatbot-messages">
                {/* Welcome message when no messages */}
                {messages.length === 0 && (
                  <div className="chatbot-welcome">
                    <div className="chatbot-welcome-icon">
                      <Bot size={32} />
                    </div>
                    <h4>Welcome to AmplifyNet!</h4>
                    <p>I'm your AI assistant. Ask me about pricing, registration, withdrawals, or advertising.</p>
                  </div>
                )}
                {/* Chat messages */}
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.isBot ? "bot" : "user"}`}>
                    <div className="chat-message-avatar">
                      {msg.isBot ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className="chat-message-bubble">
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {/* Typing indicator */}
                {isTyping && (
                  <div className="chat-message bot">
                    <div className="chat-message-avatar">
                      <Bot size={16} />
                    </div>
                    <div className="chat-message-bubble">
                      <div className="chat-typing">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area with Send Button */}
              <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="chatbot-send-btn" aria-label="Send message">
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        className="chatbot-fab"
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="chatbot-notification">1</span>}
      </button>
    </div>
  );
}
