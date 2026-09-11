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
            <form className="glass-form" onSubmit={(e) => e.preventDefault()}>
              <div className="glass-form-row">
                <div className="glass-input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>
                <div className="glass-input-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="glass-input-group">
                <label>Topic</label>
                <select>
                  <option value="">Select a topic</option>
                  <option>Registration</option>
                  <option>Payments</option>
                  <option>Advertising</option>
                  <option>Withdrawals</option>
                  <option>Account Issues</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="glass-input-group">
                <label>Message</label>
                <textarea placeholder="How can we help you?" rows={5} />
              </div>
              <button type="submit" className="glass-submit-btn">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
