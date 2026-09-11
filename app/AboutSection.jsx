"use client";

import React from "react";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  Lock,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const stats = [
  { icon: Users, value: "2,500+", label: "Registered Earners" },
  { icon: TrendingUp, value: "150+", label: "Active Merchants" },
  { icon: ShieldCheck, value: "99%", label: "Verification Rate" },
  { icon: Zap, value: "24hr", label: "Avg. Payout" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "Every transaction, commission, and verification is documented and auditable.",
  },
  {
    icon: Lock,
    title: "Privacy",
    description: "Merchant details remain hidden. No direct contact between parties.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "Verified submissions only. Duplicate claims are automatically flagged.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a trusted network of earners and businesses across Kenya.",
  },
];

const milestones = [
  { year: "2024", title: "Platform Founded", description: "AmplifyNet.co launched to connect businesses with digital advertising opportunities." },
  { year: "2025", title: "1000+ Earners", description: "Reached our first thousand registered earners across Kenya." },
  { year: "2026", title: "M-Pesa Integration", description: "Seamless payment processing with Daraja API integration." },
];

export default function AboutSection({ settings }) {
  return (
    <section className="about-glass-section">
      {/* Background elements */}
      <div className="about-bg-blob about-bg-blob-1" />
      <div className="about-bg-blob about-bg-blob-2" />

      <div className="about-glass-wrapper">
        {/* Hero */}
        <div className="about-glass-hero">
          <span className="about-eyebrow">About Us</span>
          <h1>{settings?.name || "AmplifyNet.co"}</h1>
          <p className="about-hero-subtitle">
            A Kenyan marketplace built to help businesses distribute approved product campaigns
            through registered WhatsApp Status earners while keeping payments, verification, and
            privacy under one accountable platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="about-stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat-card">
              <div className="about-stat-icon">
                <stat.icon size={24} />
              </div>
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Mission Card */}
        <div className="about-mission-card">
          <div className="about-mission-content">
            <h2>Our Mission</h2>
            <p>
              We connect merchants with compliant, measurable status advertising opportunities.
              The platform is designed around verified submissions, configurable commission rules,
              documented payment records, and clear boundaries between merchants and earners.
            </p>
            <div className="about-mission-points">
              <div className="about-mission-point">
                <CheckCircle2 size={18} />
                <span>No guaranteed-income language or misleading claims</span>
              </div>
              <div className="about-mission-point">
                <CheckCircle2 size={18} />
                <span>No direct merchant contact exposure</span>
              </div>
              <div className="about-mission-point">
                <CheckCircle2 size={18} />
                <span>No hidden payment credentials in the frontend</span>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="about-values-section">
          <h2>Our Values</h2>
          <div className="about-values-grid">
            {values.map((value) => (
              <div key={value.title} className="about-value-card">
                <div className="about-value-icon">
                  <value.icon size={22} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="about-timeline-section">
          <h2>Our Journey</h2>
          <div className="about-timeline">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="about-timeline-item">
                <div className="about-timeline-marker" />
                <div className="about-timeline-card">
                  <span className="about-timeline-year">{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta-card">
          <h2>Ready to Join?</h2>
          <p>Become part of Kenya's fastest growing WhatsApp advertising marketplace.</p>
          <button className="about-cta-btn">
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
