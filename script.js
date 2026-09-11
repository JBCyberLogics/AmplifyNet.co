const companyDefaults = {
  name: "AmplifyNet.co",
  legalName: "Trusted By Thousands",
  ceo: "Editable CEO Name",
  tillNumber: "Editable Till Number",
  email: "support@amplifynet.co",
  phone: "+254 758 686 515 / +254 741 222 877",
  whatsapp: "+254 758 787 703",
  whatsappGroup: "https://chat.whatsapp.com/HV4KA2n7geKGouOyx08LnS",
  tagline: "Connecting Businesses With Digital Advertising Opportunities."
};

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
    "Use official support channels only. Direct merchant-earner contact is not enabled."
};

const state = { ...companyDefaults };

function cleanPhone(value) {
  return value.split("/")[0].replace(/[^\d+]/g, "");
}

function toWaLink(value) {
  const phone = cleanPhone(value).replace(/^\+/, "");
  return phone ? `https://wa.me/${phone}` : "#";
}

function updateContactLinks() {
  const links = {
    whatsapp: toWaLink(state.whatsapp),
    phone: `tel:${cleanPhone(state.phone)}`,
    email: `mailto:${state.email}`,
    whatsappGroup: state.whatsappGroup
  };

  Object.entries(links).forEach(([key, href]) => {
    const link = document.querySelector(`[data-contact-link="${key}"]`);
    if (link) link.href = href;
  });
}

function selectRole(role) {
  const tab = document.querySelector(`[data-role-tab="${role}"]`);
  if (!tab) return;

  document.querySelectorAll("[data-role-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.roleTab === role);
  });
  document.querySelectorAll("[data-role-form]").forEach((form) => {
    form.hidden = form.dataset.roleForm !== role;
  });
}

function showToast(message) {
  const toast = document.querySelector("#prototype-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

function showPage(page, options = {}) {
  document.querySelectorAll(".view").forEach((view) => {
    view.hidden = view.dataset.view !== page;
  });
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });
  document.querySelector(".site-nav")?.classList.remove("open");
  if (!options.fromHash) {
    const url = new URL(window.location);
    url.hash = page;
    history.pushState(null, "", url);
  }
  window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
}

function syncCompanyText() {
  document.querySelectorAll("[data-company]").forEach((node) => {
    node.textContent = state[node.dataset.company];
  });
  document.querySelectorAll("[data-company-value]").forEach((node) => {
    node.textContent = state[node.dataset.companyValue];
  });
  updateContactLinks();
}

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest("[data-menu-toggle]");
  if (menuButton) {
    document.querySelector(".site-nav")?.classList.toggle("open");
    return;
  }

  const themeButton = event.target.closest("[data-theme-toggle]");
  if (themeButton) {
    const root = document.documentElement;
    const isDark = root.dataset.theme === "dark";
    root.dataset.theme = isDark ? "light" : "dark";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#f7f4ed" : "#07111f");
    showToast(isDark ? "Light mode active." : "Dark mode active.");
    return;
  }

  const assistantButton = event.target.closest("[data-assistant-toggle]");
  if (assistantButton) {
    const panel = document.querySelector(".assistant-panel");
    panel.hidden = !panel.hidden;
    return;
  }

  const target = event.target.closest("[data-page]");
  if (target) {
    showPage(target.dataset.page);
    if (target.dataset.selectRole) selectRole(target.dataset.selectRole);
    return;
  }

  const action = event.target.closest("[data-prototype-action]");
  if (action) {
    showToast(action.dataset.prototypeAction);
  }
});

document.querySelectorAll("[data-role-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    selectRole(button.dataset.roleTab);
  });
});

document.querySelectorAll("[data-dashboard-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-dashboard-tab]").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-dashboard]").forEach((panel) => {
      panel.hidden = panel.dataset.dashboard !== button.dataset.dashboardTab;
    });
  });
});

document.querySelector("#evidence-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const adId = document.querySelector("#submission-ad").value;
  const capturedAt = document.querySelector("#submission-time").value;
  const status = document.querySelector(`[data-ad-status="${adId}"]`)?.textContent.trim();
  const message = document.querySelector("#submission-status");

  if (status !== "Active") {
    message.textContent = "Submission blocked: choose an active advertisement before sending evidence.";
    showToast("Submission blocked. Select an active advertisement.");
    return;
  }

  if (!capturedAt) {
    message.textContent = "Add the screenshot date and time before submitting evidence.";
    showToast("Add screenshot date and time.");
    return;
  }

  message.textContent = "Evidence received for admin review. Duplicate checks will run before approval.";
  showToast("Evidence sent for admin review.");
});

document.querySelector("#assistant-topic")?.addEventListener("change", (event) => {
  document.querySelector("#assistant-answer").textContent = assistantAnswers[event.target.value];
});

document.querySelectorAll("[data-setting]").forEach((input) => {
  input.addEventListener("input", () => {
    state[input.dataset.setting] = input.value;
    syncCompanyText();
    document.querySelector("#settings-note").textContent = "Settings preview updated locally.";
  });
});

function readInitialStateFromPage() {
  document.querySelectorAll("[data-company]").forEach((node) => {
    const key = node.dataset.company;
    if (node.textContent.trim()) state[key] = node.textContent.trim();
  });

  document.querySelectorAll("[data-company-value]").forEach((node) => {
    const key = node.dataset.companyValue;
    if (node.textContent.trim()) state[key] = node.textContent.trim();
  });

  document.querySelectorAll("[data-setting]").forEach((input) => {
    const key = input.dataset.setting;
    if (state[key]) input.value = state[key];
  });
}

window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "") || "home";
  if (document.querySelector(`[data-view="${page}"]`)) {
    showPage(page, { fromHash: true });
  }
});

document.documentElement.dataset.theme = "light";
readInitialStateFromPage();
syncCompanyText();
showPage(window.location.hash.replace("#", "") || "home", { fromHash: true, instant: true });
