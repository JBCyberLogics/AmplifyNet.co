"use client";

import React from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Marketplace", href: "#marketplace" },
  ],
  company: [
    { label: "Register", href: "#register" },
    { label: "Contact Us", href: "#contact" },
    { label: "Terms & Conditions", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ],
  support: [
    { label: "Help Center", href: "#faq" },
    { label: "WhatsApp Support", href: "https://wa.me/254758787703" },
    { label: "Email Support", href: "mailto:support@amplifynet.co" },
    { label: "Community Group", href: "https://chat.whatsapp.com/HV4KA2n7geKGouOyx08LnS" },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/254758787703", label: "WhatsApp" },
  { icon: Phone, href: "tel:+254758787703", label: "Phone" },
  { icon: Mail, href: "mailto:support@amplifynet.co", label: "Email" },
];

export default function Footer({ setPage }) {
  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const page = href.replace("#", "");
      setPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer-glass">
      <div className="footer-bg-gradient" />
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="AmplifyNet.co Logo" className="footer-logo-img" />
              <div>
                <h3>AmplifyNet.co</h3>
                <p>Kenyan WhatsApp Status Advertising Marketplace</p>
              </div>
            </div>
            <p className="footer-tagline">
              Connecting businesses with digital advertising opportunities through
              verified WhatsApp Status earners across Kenya.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4>Platform</h4>
              <ul>
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      <ChevronRight size={14} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-group">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                    >
                      <ChevronRight size={14} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-group">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <ChevronRight size={14} />
                      {link.label}
                      {link.href.startsWith("http") && <ExternalLink size={12} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="footer-contact-bar">
          <div className="footer-contact-item">
            <Phone size={16} />
            <span>+254 758 787 703</span>
          </div>
          <div className="footer-contact-item">
            <Mail size={16} />
            <span>support@amplifynet.co</span>
          </div>
          <div className="footer-contact-item">
            <MessageCircle size={16} />
            <span>WhatsApp Available</span>
          </div>
          <div className="footer-contact-item">
            <MapPin size={16} />
            <span>Nairobi, Kenya</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AmplifyNet Limited. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#terms" onClick={(e) => { e.preventDefault(); handleNavClick("#terms"); }}>Terms</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavClick("#privacy"); }}>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
