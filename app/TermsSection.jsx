"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  Scale,
  UserCheck,
  AlertTriangle,
  CreditCard,
  Lock,
  Ban,
  RefreshCw,
} from "lucide-react";

const termsSections = [
  {
    id: "acceptance",
    icon: UserCheck,
    title: "Acceptance of Terms",
    content:
      "By accessing or using AmplifyNet.co, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform. Your continued use of the platform constitutes acceptance of any modifications to these terms.",
  },
  {
    id: "registration",
    icon: FileText,
    title: "Registration & Accounts",
    content:
      "Membership registration requires accurate account details and acceptance of platform terms. You must provide valid identification, accurate contact information, and maintain the security of your account credentials. We reserve the right to suspend accounts with false information.",
  },
  {
    id: "membership",
    icon: ShieldCheck,
    title: "Membership & Subscriptions",
    content:
      "Business subscriptions are subject to approval, active payment records, and upload limits. Membership fees are non-refundable once activated. Subscription periods, renewal terms, and cancellation policies are governed by the specific plan selected.",
  },
  {
    id: "advertising",
    icon: Scale,
    title: "Advertising Content",
    content:
      "Advertising content must be lawful, truthful, and approved before distribution. Misleading claims, prohibited content, and unauthorized use of intellectual property are strictly prohibited. We reserve the right to reject or remove any advertisement.",
  },
  {
    id: "earnings",
    icon: CreditCard,
    title: "Commissions & Payments",
    content:
      "View verification depends on genuine screenshots submitted before advertisement expiry. Commissions are calculated based on your current tier and are subject to admin approval. Payment processing occurs through approved M-Pesa channels.",
  },
  {
    id: "referrals",
    icon: UserCheck,
    title: "Referral Program",
    content:
      "Referral commissions are credited only after qualifying actions and admin approval. Self-referrals, duplicate referral claims, and fraudulent referral activity are strictly prohibited and will result in account suspension.",
  },
  {
    id: "withdrawals",
    icon: CreditCard,
    title: "Withdrawals",
    content:
      "Withdrawals require eligible balances, configured minimums, scheduled processing days, and admin approval. Processing occurs on Tuesday and Saturday. We are not responsible for delays caused by third-party payment providers.",
  },
  {
    id: "privacy",
    icon: Lock,
    title: "Privacy & Data",
    content:
      "Personal data, payment records, and merchant contact details are handled privately. We implement appropriate security measures to protect your information. Merchant phone numbers are never displayed to earners.",
  },
  {
    id: "prohibited",
    icon: Ban,
    title: "Prohibited Activities",
    content:
      "Accounts may be suspended for fraud, duplicate claims, prohibited content, self-referrals, unauthorized withdrawals, or any activity that violates these terms. We reserve the right to investigate and take appropriate action.",
  },
  {
    id: "liability",
    icon: AlertTriangle,
    title: "Limitation of Liability",
    content:
      "The platform does not guarantee earnings and may adjust rates or rules with proper notice. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "Changes to Terms",
    content:
      "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms. Material changes will be communicated through official channels.",
  },
];

function AccordionItem({ section, isOpen, onToggle }) {
  const Icon = section.icon;

  return (
    <div className={`terms-accordion-item ${isOpen ? "open" : ""}`}>
      <button className="terms-accordion-header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="terms-accordion-title">
          <div className="terms-accordion-icon">
            <Icon size={20} />
          </div>
          <h3>{section.title}</h3>
        </div>
        <div className="terms-accordion-toggle">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div className="terms-accordion-content" aria-hidden={!isOpen}>
        <p>{section.content}</p>
      </div>
    </div>
  );
}

export default function TermsSection() {
  const [openSections, setOpenSections] = useState(new Set(["acceptance"]));

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
    setOpenSections(new Set(termsSections.map((s) => s.id)));
  };

  const collapseAll = () => {
    setOpenSections(new Set());
  };

  return (
    <section className="terms-glass-section">
      <div className="terms-bg-blob terms-bg-blob-1" />
      <div className="terms-bg-blob terms-bg-blob-2" />

      <div className="terms-glass-wrapper">
        <div className="terms-header">
          <span className="terms-eyebrow">Legal</span>
          <h1>Terms & Conditions</h1>
          <p className="terms-subtitle">
            Please read these terms carefully before using AmplifyNet.co. By using our platform,
            you agree to these terms.
          </p>
          <div className="terms-actions">
            <button className="terms-action-btn" onClick={expandAll}>Expand All</button>
            <button className="terms-action-btn" onClick={collapseAll}>Collapse All</button>
          </div>
        </div>

        <div className="terms-accordion">
          {termsSections.map((section) => (
            <AccordionItem
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>

        <div className="terms-footer">
          <p>Last updated: September 2026</p>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:support@amplifynet.co">support@amplifynet.co</a>
          </p>
        </div>
      </div>
    </section>
  );
}
