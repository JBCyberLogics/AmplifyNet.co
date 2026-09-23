"use client";

import {
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Download,
  Eye,
  HelpCircle,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Sun,
  Upload,
  Users,
  Wallet,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ContactSection from "./ContactSection";
import AboutSection from "./AboutSection";
import Footer from "./Footer";
import TermsSection from "./TermsSection";
import PrivacySection from "./PrivacySection";
import Chatbot from "./Chatbot";

const companyDefaults = {
  name: "AmplifyNet.co",
  legalName: "AmplifyNet Limited",
  ceo: "Peter Maina",
  tillNumber: "amplifynet78@gmail.com",
  phone: "+254 758 787 703",
  whatsapp: "+254 758 787 703",
  whatsappGroup: "https://chat.whatsapp.com/HV4KA2n7geKGouOyx08LnS",
  tagline: "Connecting Businesses With Digital Advertising Opportunities."
};

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["how", "How It Works"],
  ["pricing", "Pricing"],
  ["marketplace", "Marketplace"],
  ["register", "Register"],
  ["contact", "Contact"],
  ["terms", "Terms"],
  ["privacy", "Privacy"]
];

const earnerTiers = [
  {
    name: "Bronze",
    fee: "KSh 1,000",
    commission: "KSh 10",
    status: "Starter membership",
    benefits: ["Access approved ads", "Submit view evidence", "Referral dashboard"]
  },
  {
    name: "Silver",
    fee: "KSh 2,000",
    commission: "KSh 25",
    status: "Growth membership",
    benefits: ["Higher commission rate", "Priority notification queue", "Enhanced reporting"]
  },
  {
    name: "Gold League",
    fee: "KSh 4,000",
    commission: "KSh 50",
    status: "Premium membership",
    benefits: ["Top commission rate", "Expanded history view", "Priority review support"]
  }
];

const merchantPlans = [
  {
    name: "Diamond Merchant",
    price: "KSh 5,000",
    limit: "1 image per day",
    features: [
      "24-hour advertisement window",
      "30-day subscription expiry",
      "Merchant dashboard",
      "Advertising history",
      "Renewal controls"
    ]
  },
  {
    name: "Gold Merchant",
    price: "KSh 10,000",
    limit: "5 images per day",
    features: [
      "Five active product images daily",
      "Automatic expiry checks",
      "Upload limit enforcement",
      "Merchant dashboard",
      "Renewal controls"
    ]
  }
];

const ads = [
  {
    id: "AD-1028",
    product: "Organic Skincare Launch",
    category: "Beauty",
    reward: "Tier based",
    expires: "7h 42m",
    views: 1860,
    status: "Active",
    instructions: "Post image to WhatsApp Status and keep it live for the active window.",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop"
  },
  {
    id: "AD-1031",
    product: "Nairobi Meal Combo",
    category: "Food",
    reward: "Tier based",
    expires: "13h 08m",
    views: 2480,
    status: "Active",
    instructions: "Use the approved image only. Do not edit the merchant content.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
  },
  {
    id: "AD-1035",
    product: "Back-to-School Bundle",
    category: "Retail",
    reward: "Tier based",
    expires: "22h 15m",
    views: 1130,
    status: "Pending review",
    instructions: "Download is enabled after admin approval.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
  }
];

const notifications = [
  "Membership activation pending payment confirmation.",
  "AD-1028 evidence review is under admin verification.",
  "Saturday withdrawal window opens at 9:00 AM.",
  "Merchant contact details are hidden from earners."
];

const assistantAnswers = {
  registration:
    "Choose Earner or Business registration, complete the required fields, accept the terms, then follow the configured M-Pesa payment instructions.",
  membership:
    "Bronze, Silver, and Gold League rates are administrator-configurable. Membership does not guarantee earnings.",
  withdrawal:
    "Withdrawals are submitted from the dashboard and processed on Tuesday or Saturday after admin approval and provider availability.",
  adverts:
    "Approved earners can download active advertisements, follow instructions, and submit evidence before the 24-hour expiry.",
  support:
    "Use the contact form, WhatsApp support number, or official group link. Direct merchant-earner contact is not enabled."
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PlatformPage() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState("earner");
  const [settings, setSettings] = useState(companyDefaults);
  const [submission, setSubmission] = useState({
    adId: "AD-1028",
    views: "320",
    capturedAt: "",
    note: ""
  });
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const currentPage = useMemo(() => {
    switch (page) {
      case "about":
        return <AboutSection settings={settings} setPage={setPage} />;
      case "how":
        return <HowItWorks />;
      case "pricing":
        return <Pricing />;
      case "marketplace":
        return (
          <Marketplace
            submission={submission}
            setSubmission={setSubmission}
            submissionStatus={submissionStatus}
            onSubmit={(event) => {
              event.preventDefault();
              const selected = ads.find((ad) => ad.id === submission.adId);
              if (!selected || selected.status !== "Active") {
                setSubmissionStatus("Submission blocked: the advertisement is not currently active.");
                return;
              }
              if (!submission.capturedAt) {
                setSubmissionStatus("Add the screenshot date and time before submitting evidence.");
                return;
              }
              setSubmissionStatus("Evidence received for admin review. Duplicate checks will run before approval.");
            }}
          />
        );
      case "register":
        return <Register role={role} setRole={setRole} />;
      case "contact":
        return <Contact settings={settings} />;
      case "terms":
        return <Terms />;
      case "privacy":
        return <Privacy />;
      default:
        return <Home settings={settings} setPage={setPage} />;
    }
  }, [page, role, settings, submission, submissionStatus]);

  return (
    <div className="platform-shell">
      <header className="site-header">
        <button className="brand-button" onClick={() => setPage("home")} aria-label="Go to home">
          <img src="/logo.png" alt="AmplifyNet.co Logo" className="brand-logo" />
          <span>
            <strong>{settings.name}</strong>
            <small>{settings.legalName}</small>
          </span>
        </button>

        <nav className={cx("site-nav", menuOpen && "open")} aria-label="Main navigation">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              className={cx(page === key && "active")}
              onClick={() => {
                setPage(key);
                setMenuOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="primary small" onClick={() => setPage("login")}>
            Login
          </button>
          <button className="icon-button menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {page === "login" ? <Login setPage={setPage} /> : currentPage}

      <Chatbot />
    </div>
  );
}

function Home({ settings, setPage }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><ShieldCheck size={16} /> Kenyan advertising marketplace</p>
          <h1>{settings.name}</h1>
          <p className="lead">{settings.tagline}</p>
          <p className="sublead">
            Businesses subscribe to publish approved WhatsApp Status advertisements. Registered earners access active
            opportunities, submit verifiable evidence, and receive commissions after admin approval.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={() => setPage("register")}>
              Create Account <ChevronRight size={18} />
            </button>
            <button className="secondary" onClick={() => setPage("pricing")}>
              View Pricing
            </button>
          </div>
          <div className="trust-strip">
            <span><LockKeyhole size={16} /> Merchant privacy protected</span>
            <span><Clock3 size={16} /> 24-hour ad expiry</span>
            <span><ReceiptText size={16} /> Admin-verified payments</span>
          </div>
        </div>
        <div className="hero-art" aria-label="AmplifyNet product interface preview">
          <img src="/logo.png" alt="Marketplace dashboard and phone status preview" />
        </div>
      </section>

      <section className="metrics-band">
        <Metric label="Daily upload limits" value="1 or 5" />
        <Metric label="Withdrawal days" value="Tue / Sat" />
        <Metric label="Ad lifetime" value="24 hrs" />
        <Metric label="Subscription expiry" value="30 days" />
      </section>

      <section className="section-grid">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>One marketplace, three controlled workflows.</h2>
        </div>
        <div className="workflow-grid">
          <WorkflowCard icon={<BriefcaseBusiness />} title="Businesses" text="Register, get approved, subscribe, upload products, and track advertising history." />
          <WorkflowCard icon={<Users />} title="Earners" text="Choose a configurable tier, download approved ads, submit screenshots, and track earnings." />
          <WorkflowCard icon={<CircleDollarSign />} title="Referrals" text="Earn qualifying commissions only after referred users complete required actions." />
          <WorkflowCard icon={<Wallet />} title="Withdrawals" text="Request eligible balances for Tuesday or Saturday review through approved M-Pesa settings." />
        </div>
      </section>

      <Pricing compact />

      <section className="market-preview">
        <div>
          <p className="eyebrow">Available advertisements</p>
          <h2>Privacy-first campaign access for approved earners.</h2>
          <p>
            Earners can view product details, download active creatives, follow instructions, and submit evidence before
            expiry. Merchant phone numbers and personal contacts are never displayed.
          </p>
        </div>
        <AdList compact />
      </section>

      <FAQ />
      <Contact settings={settings} embedded />
      <Footer setPage={setPage} />
    </main>
  );
}

function HowItWorks() {
  const groups = [
    ["Businesses", ["Register a business account", "Complete verification", "Subscribe to Diamond or Gold Merchant", "Upload approved product images", "Track expiry and history"]],
    ["Earners", ["Register and choose a tier", "Pay the configured registration fee", "Download active ads", "Post to WhatsApp Status", "Submit evidence before expiry"]],
    ["Referrals", ["Share unique referral link", "Referred account completes qualifying action", "Admin verifies eligibility", "Commission moves from pending to approved"]],
    ["Withdrawals", ["Submit request", "Eligibility and balance checks run", "Admin approves or rejects", "M-Pesa provider processes payment", "Transaction status updates"]]
  ];
  return (
    <main className="page-stack">
      <PageHero title="How It Works" kicker="Controlled marketplace workflows" text="Every action is designed for verification, privacy, and complete transaction records." />
      <section className="step-matrix">
        {groups.map(([title, steps]) => (
          <article key={title} className="step-panel">
            <h3>{title}</h3>
            {steps.map((step, index) => (
              <div key={step} className="step-row">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}

function Pricing({ compact = false }) {
  return (
    <main className={compact ? "pricing-embed" : "page-stack"}>
      {!compact && <PageHero title="Pricing" kicker="Configurable plans" text="Membership fees, commission rates, referral bonuses, and merchant package prices are editable by administrators." />}
      <section className="pricing-columns">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Earners</p>
            <h2>Membership Categories</h2>
          </div>
          <div className="card-grid three">
            {earnerTiers.map((tier) => (
              <article className="price-card" key={tier.name}>
                <span className="tier-badge">{tier.status}</span>
                <h3>{tier.name}</h3>
                <p className="price">{tier.fee}</p>
                <p>{tier.commission} per verified view</p>
                <ul>
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}><Check size={16} /> {benefit}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div>
          <div className="section-heading">
            <p className="eyebrow">Businesses</p>
            <h2>Merchant Subscriptions</h2>
          </div>
          <div className="card-grid two">
            {merchantPlans.map((plan) => (
              <article className="price-card merchant" key={plan.name}>
                <span className="tier-badge">{plan.limit}</span>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}<small>/month</small></p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><Check size={16} /> {feature}</li>
                  ))}
                </ul>
                <button className="primary">Subscribe</button>
              </article>
            ))}
          </div>
        </div>
        <p className="notice">
          Earnings depend on approved advertising activity. Views must be genuine and verifiable. Registration does not
          guarantee earnings, and rates may change according to company terms.
        </p>
      </section>
    </main>
  );
}

function Marketplace({ submission, setSubmission, submissionStatus, onSubmit }) {
  return (
    <main className="page-stack">
      <PageHero title="Products / Available Advertisements" kicker="Active campaign board" text="Approved earners can access campaign content without seeing merchant phone numbers or personal contact details." />
      <section className="marketplace-layout">
        <AdList />
        <form className="form-panel evidence-panel" onSubmit={onSubmit}>
          <p className="eyebrow"><Upload size={15} /> View evidence</p>
          <h2>Submit Screenshot Evidence</h2>
          <label>
            Advertisement ID
            <select value={submission.adId} onChange={(event) => setSubmission({ ...submission, adId: event.target.value })}>
              {ads.map((ad) => <option key={ad.id}>{ad.id}</option>)}
            </select>
          </label>
          <label>
            Screenshot upload
            <input type="file" accept="image/png,image/jpeg" />
          </label>
          <label>
            Date and time
            <input type="datetime-local" value={submission.capturedAt} onChange={(event) => setSubmission({ ...submission, capturedAt: event.target.value })} />
          </label>
          <label>
            Number of views
            <input value={submission.views} onChange={(event) => setSubmission({ ...submission, views: event.target.value })} inputMode="numeric" />
          </label>
          <label>
            Clarification note
            <textarea value={submission.note} onChange={(event) => setSubmission({ ...submission, note: event.target.value })} placeholder="Optional context for admin review" />
          </label>
          <button className="primary" type="submit">Send for verification</button>
          {submissionStatus && <p className="form-status">{submissionStatus}</p>}
        </form>
      </section>
    </main>
  );
}

function Register({ role, setRole }) {
  return (
    <main className="page-stack">
      <PageHero title="Create Account" kicker="Separate onboarding paths" text="Earner and business accounts collect different information and apply the correct approval workflow." />
      <section className="auth-layout">
        <div className="role-switch" role="tablist" aria-label="Registration role">
          <button className={cx(role === "earner" && "active")} onClick={() => setRole("earner")}>Earner</button>
          <button className={cx(role === "business" && "active")} onClick={() => setRole("business")}>Business</button>
        </div>
        {role === "earner" ? <EarnerForm /> : <BusinessForm />}
      </section>
    </main>
  );
}

function EarnerForm() {
  return (
    <form className="form-panel">
      <h2>Earner Registration</h2>
      <div className="form-grid">
        <Input label="Full name" />
        <Input label="Phone number" />
        <Input label="Email address" type="email" />
        <Input label="Password" type="password" />
        <Input label="County" />
        <Input label="Referral code" />
        <label>Preferred payment method<select><option>M-Pesa</option><option>Bank transfer</option></select></label>
        <label>Membership category<select>{earnerTiers.map((tier) => <option key={tier.name}>{tier.name}</option>)}</select></label>
      </div>
      <label className="checkline"><input type="checkbox" /> I agree to the terms and conditions.</label>
      <button className="primary" type="button">Continue to payment instructions</button>
    </form>
  );
}

function BusinessForm() {
  return (
    <form className="form-panel">
      <h2>Business Registration</h2>
      <div className="form-grid">
        <Input label="Business name" />
        <Input label="Owner / representative name" />
        <Input label="Phone number" />
        <Input label="Email address" type="email" />
        <Input label="Business category" />
        <Input label="Location" />
        <Input label="Password" type="password" />
        <Input label="Referral code" />
      </div>
      <label className="checkline"><input type="checkbox" /> I agree to verification requirements and platform terms.</label>
      <button className="primary" type="button">Submit for business approval</button>
    </form>
  );
}

function Login({ setPage }) {
  return (
    <main className="page-stack">
      <section className="login-shell">
        <form className="form-panel login-panel">
          <p className="eyebrow"><LockKeyhole size={15} /> Secure access</p>
          <h1>Login</h1>
          <Input label="Email address" type="email" />
          <Input label="Password" type="password" />
          <label>Account role<select><option>Earner</option><option>Merchant</option><option>Admin</option></select></label>
          <button className="primary" type="button" onClick={() => setPage("dashboards")}>Open dashboard</button>
          <button className="text-button" type="button" onClick={() => setPage("register")}>Create a new account</button>
        </form>
      </section>
    </main>
  );
}

function Contact({ settings, embedded = false }) {
  if (embedded) {
    return (
      <main className="contact-embed">
        <ContactSection settings={settings} />
      </main>
    );
  }

  return (
    <main className="page-stack">
      <ContactSection settings={settings} />
    </main>
  );
}

function Terms() {
  return <TermsSection />;
}

function Privacy() {
  return <PrivacySection />;
}

function PolicyPage({ title, kicker, rules }) {
  return (
    <main className="page-stack">
      <PageHero title={title} kicker={kicker} text="Clear operating policies help keep the marketplace professional, fair, and auditable." />
      <section className="policy-list">
        {rules.map((rule, index) => (
          <article key={rule}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{rule}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

function FAQ() {
  const faqs = [
    ["Are earnings guaranteed?", "No. Earnings depend on approved advertising activity and verifiable views."],
    ["Can earners contact merchants?", "No. Merchant contact details stay private and the platform acts as the intermediary."],
    ["When do ads expire?", "Each advertisement remains active for 24 hours after approval or upload activation."],
    ["When are withdrawals processed?", "Withdrawals are scheduled for Tuesday and Saturday, subject to admin approval and provider availability."]
  ];
  return (
    <section className="faq-section">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Clear answers before users commit.</h2>
      </div>
      <div className="faq-grid">
        {faqs.map(([question, answer]) => (
          <article key={question}>
            <h3>{question}</h3>
            <p>{answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdList({ compact = false }) {
  return (
    <div className={cx("ad-list", compact && "compact")}>
      {ads.map((ad) => (
        <article key={ad.id} className="ad-card">
          <div className="ad-art">
            <img src={ad.image} alt={ad.product} loading="lazy" />
            <span className="ad-category-badge">{ad.category}</span>
          </div>
          <div>
            <div className="ad-topline">
              <strong>{ad.id}</strong>
              <span className={cx("status-pill", ad.status !== "Active" && "muted")}>{ad.status}</span>
            </div>
            <h3>{ad.product}</h3>
            <p>{ad.instructions}</p>
            <div className="ad-actions">
              <span><Clock3 size={15} /> {ad.expires}</span>
              <span><Eye size={15} /> {ad.views.toLocaleString()} views</span>
              <button className="icon-action" aria-label={`Download ${ad.id}`}><Download size={16} /></button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <article>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function WorkflowCard({ icon, title, text }) {
  return (
    <article className="workflow-card">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function DashboardCard({ icon, title, items }) {
  return (
    <article className="dashboard-card">
      <div className="dashboard-title">{icon}<h3>{title}</h3></div>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </article>
  );
}

function NotificationPanel() {
  return (
    <article className="dashboard-card notification-card">
      <div className="dashboard-title"><Bell /><h3>Notifications</h3></div>
      {notifications.map((note) => <p key={note}>{note}</p>)}
    </article>
  );
}

function cleanPhone(value) {
  if (!value) return "";
  return value.replace(/[^\d+]/g, "");
}

function ContactRow({ icon, label, value }) {
  if (!value) return null;

  const cleaned = cleanPhone(value);
  let href = "#";
  let target = undefined;

  if (label === "WhatsApp") {
    const num = cleaned.replace(/^\+/, "");
    href = `https://wa.me/${num}`;
    target = "_blank";
  } else if (label === "Phone") {
    href = `tel:${cleaned}`;
  } else if (label === "Email") {
    href = `mailto:${value}`;
  } else if (label === "WhatsApp Group") {
    href = value;
    target = "_blank";
  }

  return (
    <a
      className="contact-row"
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      aria-label={label}
      title={value}
    >
      {icon}
    </a>
  );
}

function PageHero({ title, kicker, text }) {
  return (
    <section className="page-hero">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <label>
      {label}
      <input type={type} placeholder={props.readOnly ? undefined : label} {...props} />
    </label>
  );
}
