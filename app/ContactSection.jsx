"use client";

import React, { useState } from "react";
import {
  Check,
  Copy,
  Mail,
  Phone,
  MessageCircle,
  Users,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";

function CopyButton({ text, className }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      className={`glass-copy-btn ${className || ""}`}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      disabled={copied}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export default function ContactSection({ settings }) {
  const email = settings?.email || "support@amplifynet.co";
  const phone = settings?.phone || "+254 700 000 000";
  const whatsapp = settings?.whatsapp || "+254 711 000 000";
  const whatsappGroup = settings?.whatsappGroup || "https://chat.whatsapp.com/example";

  const cleanPhone = (val) => val.replace(/[^\d+]/g, "");
  const whatsappNum = cleanPhone(whatsapp).replace(/^\+/, "");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b3e780ba-e16c-4910-ad4c-8def890b114c",
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          subject: `New Contact Form Submission - ${formData.topic || "General"}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", topic: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setFormStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="glass-contact-section">
      <div className="glass-bg-blob glass-bg-blob-1" />
      <div className="glass-bg-blob glass-bg-blob-2" />
      <div className="glass-bg-blob glass-bg-blob-3" />

      <div className="glass-contact-wrapper">
        <div className="glass-contact-header">
          <span className="glass-eyebrow">Get in Touch</span>
          <h2>Contact Us</h2>
          <p className="glass-subtitle">
            Have questions? We're here to help. Reach out through any of our official channels.
          </p>
        </div>

        <div className="glass-cards-grid">
          <div className="glass-card">
            <div className="glass-card-icon glass-icon-green">
              <MessageCircle size={24} />
            </div>
            <div className="glass-card-body">
              <h3>WhatsApp</h3>
              <div className="glass-card-row">
                <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer" className="glass-link">
                  {whatsapp}
                </a>
                <CopyButton text={cleanPhone(whatsapp)} />
              </div>
            </div>
            <span className="glass-card-badge">Instant reply</span>
          </div>

          <div className="glass-card">
            <div className="glass-card-icon glass-icon-dark">
              <Phone size={24} />
            </div>
            <div className="glass-card-body">
              <h3>Phone</h3>
              <div className="glass-card-row">
                <a href={`tel:${cleanPhone(phone)}`} className="glass-link">
                  {phone}
                </a>
                <CopyButton text={cleanPhone(phone)} />
              </div>
            </div>
            <span className="glass-card-badge">Mon-Fri, 9am-5pm</span>
          </div>

          <div className="glass-card">
            <div className="glass-card-icon glass-icon-gold">
              <Mail size={24} />
            </div>
            <div className="glass-card-body">
              <h3>Email</h3>
              <div className="glass-card-row">
                <a href={`mailto:${email}`} className="glass-link">
                  {email}
                </a>
                <CopyButton text={email} />
              </div>
            </div>
            <span className="glass-card-badge">24hr response</span>
          </div>

          <div className="glass-card">
            <div className="glass-card-icon glass-icon-green">
              <Users size={24} />
            </div>
            <div className="glass-card-body">
              <h3>Community</h3>
              <div className="glass-card-row">
                <a href={whatsappGroup} target="_blank" rel="noopener noreferrer" className="glass-link">
                  Join WhatsApp Group
                </a>
              </div>
            </div>
            <span className="glass-card-badge">500+ members</span>
          </div>
        </div>

        <div className="glass-form-container">
          <div className="glass-form-wrapper">
            <div className="glass-form-header">
              <Send size={20} />
              <h3>Send us a Message</h3>
            </div>
            {/* Success Message */}
            {formStatus === "success" && (
              <div className="form-success-message">
                <Check size={20} />
                <span>Message sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            {/* Error Message */}
            {formStatus === "error" && (
              <div className="form-error-message">
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="glass-form"
              onSubmit={handleSubmit}
            >
              {/* Web3Forms Access Key - Replace with your key */}
              <input type="hidden" name="access_key" value="b3e780ba-e16c-4910-ad4c-8def890b114c" />
              <input type="hidden" name="subject" value="New Contact Form Submission - AmplifyNet" />

              <div className="glass-form-row">
                <div className="glass-input-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={formStatus === "loading"}
                  />
                </div>
                <div className="glass-input-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formStatus === "loading"}
                  />
                </div>
              </div>
              <div className="glass-input-group">
                <label htmlFor="topic">Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  disabled={formStatus === "loading"}
                >
                  <option value="">Select a topic</option>
                  <option value="Registration">Registration</option>
                  <option value="Payments">Payments</option>
                  <option value="Advertising">Advertising</option>
                  <option value="Withdrawals">Withdrawals</option>
                  <option value="Account Issues">Account Issues</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="glass-input-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={formStatus === "loading"}
                />
              </div>
              <button
                type="submit"
                className="glass-submit-btn"
                disabled={formStatus === "loading"}
              >
                {formStatus === "loading" ? (
                  <>
                    <Loader2 size={18} className="spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
