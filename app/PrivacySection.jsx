"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Share2,
  UserX,
  Bell,
  Trash2,
  ChevronDown,
  ChevronUp,
  Cookie,
} from "lucide-react";

const privacySections = [
  {
    id: "collection",
    icon: Database,
    title: "Information We Collect",
    content:
      "User information is collected for registration, verification, payments, referrals, and account security. This includes your full name, phone number, email address, county location, and payment details necessary for M-Pesa transactions.",
  },
  {
    id: "usage",
    icon: Eye,
    title: "How We Use Your Information",
    content:
      "Your information is used to process transactions, verify submissions, manage referrals, communicate important updates, and ensure platform security. We analyze usage patterns to improve our services and user experience.",
  },
  {
    id: "storage",
    icon: Lock,
    title: "Data Storage & Security",
    content:
      "Uploaded images and screenshots are stored in secure cloud storage with validation and access controls. We implement industry-standard encryption and security measures to protect your data from unauthorized access.",
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Information Sharing",
    content:
      "We do not sell your personal data. Information is shared only with authorized administrators and payment processors as necessary for platform operation. Merchant phone numbers are never displayed to earners.",
  },
  {
    id: "retention",
    icon: Database,
    title: "Data Retention",
    content:
      "We retain your information for as long as your account is active or as needed to provide services. Transaction records are maintained for compliance and audit purposes. You may request account deletion at any time.",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & Tracking",
    content:
      "We use essential cookies for authentication and session management. Analytics cookies help us understand platform usage. You can manage cookie preferences through your browser settings.",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notifications",
    content:
      "The platform may use email, website, SMS, or WhatsApp notifications when integrations are configured. You can manage notification preferences in your account settings.",
  },
  {
    id: "privacy",
    icon: UserX,
    title: "Your Privacy Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may request data portability and object to certain processing. Contact our support team to exercise these rights.",
  },
  {
    id: "deletion",
    icon: Trash2,
    title: "Account Deletion",
    content:
      "You may request permanent deletion of your account and associated data. This action is irreversible and will remove all your information from our systems, except where retention is required by law.",
  },
  {
    id: "audit",
    icon: ShieldCheck,
    title: "Audit & Compliance",
    content:
      "Audit logs and backups support security, compliance, and dispute handling. We regularly review our privacy practices and update our policies to comply with applicable Kenyan data protection laws.",
  },
];

function PrivacyAccordionItem({ section, isOpen, onToggle }) {
  const Icon = section.icon;

  return (
    <div className={`privacy-accordion-item ${isOpen ? "open" : ""}`}>
      <button className="privacy-accordion-header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="privacy-accordion-title">
          <div className="privacy-accordion-icon">
            <Icon size={20} />
          </div>
          <h3>{section.title}</h3>
        </div>
        <div className="privacy-accordion-toggle">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div className="privacy-accordion-content" aria-hidden={!isOpen}>
        <p>{section.content}</p>
      </div>
    </div>
  );
}

export default function PrivacySection() {
  const [openSections, setOpenSections] = useState(new Set(["collection"]));

  const toggleSection = (id) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setOpenSections(new Set(privacySections.map((s) => s.id)));
  };

  const collapseAll = () => {
    setOpenSections(new Set());
  };

  return (
    <section className="privacy-glass-section">
      <div className="privacy-bg-blob privacy-bg-blob-1" />
      <div className="privacy-bg-blob privacy-bg-blob-2" />

      <div className="privacy-glass-wrapper">
        <div className="privacy-header">
          <span className="privacy-eyebrow">Your Privacy Matters</span>
          <h1>Privacy Policy</h1>
          <p className="privacy-subtitle">
            We are committed to protecting your personal data. This policy explains how we collect,
            use, and safeguard your information.
          </p>
          <div className="privacy-actions">
            <button className="privacy-action-btn" onClick={expandAll}>Expand All</button>
            <button className="privacy-action-btn" onClick={collapseAll}>Collapse All</button>
          </div>
        </div>

        <div className="privacy-accordion">
          {privacySections.map((section) => (
            <PrivacyAccordionItem
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>

        <div className="privacy-footer">
          <p>Last updated: September 2026</p>
          <p>
            Questions about our privacy practices? Contact us at{" "}
            <a href="mailto:support@amplifynet.co">support@amplifynet.co</a>
          </p>
        </div>
      </div>
    </section>
  );
}
