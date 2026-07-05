(function () {
  const CONSENT_KEY = "analytics-consent";
  const ACCEPTED = "accepted";
  const REJECTED = "rejected";
  const GA_ID = "G-EZ9VY5E3EE";
  const CLARITY_ID = "xhnoyjsnpn";

  const ANALYTICS_COOKIE_NAMES = [
    "_ga",
    "_gid",
    "_gat",
    "_clck",
    "_clsk",
    "CLID",
    "ANONCHK",
    "MR",
    "MUID",
    "SM",
  ];

  const ANALYTICS_COOKIE_PREFIXES = ["_ga_", "_gat_gtag_"];

  function getConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      // If storage is unavailable, keep the current-page behavior only.
    }
  }

  function injectScript(id, src) {
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  function loadGoogleAnalytics() {
    if (window.__analyticsConsentGaLoaded) return;
    window.__analyticsConsentGaLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };

    injectScript(
      "google-analytics-tag",
      "https://www.googletagmanager.com/gtag/js?id=" + GA_ID,
    );
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  function loadClarity() {
    if (window.__analyticsConsentClarityLoaded) return;
    window.__analyticsConsentClarityLoaded = true;

    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.id = "microsoft-clarity-tag";
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);

    window.clarity("consent", true);
  }

  function loadAnalytics() {
    loadGoogleAnalytics();
    loadClarity();
  }

  function expireCookie(name, domain) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    const domainPart = domain ? "; domain=" + domain : "";
    document.cookie =
      name + "=; Max-Age=0; path=/" + domainPart + "; SameSite=Lax" + secure;
    document.cookie =
      name +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" +
      domainPart +
      secure;
  }

  function getCookieNamesToClear() {
    const names = document.cookie
      .split(";")
      .map((cookie) => cookie.split("=")[0].trim())
      .filter(Boolean);

    return names.filter((name) => {
      return (
        ANALYTICS_COOKIE_NAMES.includes(name) ||
        ANALYTICS_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))
      );
    });
  }

  function clearAnalyticsCookies() {
    const host = window.location.hostname;
    const domainParts = host.split(".");
    const domains = [null, host];

    if (domainParts.length > 1) {
      domains.push("." + domainParts.slice(-2).join("."));
    }

    getCookieNamesToClear().forEach((name) => {
      domains.forEach((domain) => expireCookie(name, domain));
    });
  }

  function buildStyles() {
    if (document.getElementById("analytics-consent-styles")) return;

    const style = document.createElement("style");
    style.id = "analytics-consent-styles";
    style.textContent = `
      .analytics-consent-banner {
        position: fixed;
        inset: auto 1rem 1rem 1rem;
        z-index: 9999;
        max-width: 760px;
        margin: 0 auto;
        padding: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 16px;
        background: rgba(34, 35, 38, 0.98);
        color: #f7f1e4;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
      }

      .analytics-consent-banner[hidden] {
        display: none;
      }

      .analytics-consent-content {
        display: grid;
        gap: 0.9rem;
      }

      .analytics-consent-title {
        margin: 0;
        font: 700 1rem/1.35 Lexend, system-ui, sans-serif;
      }

      .analytics-consent-text {
        margin: 0;
        color: rgba(247, 241, 228, 0.76);
        font: 400 0.9rem/1.55 Lexend, system-ui, sans-serif;
      }

      .analytics-consent-actions {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.75rem;
      }

      .analytics-consent-button {
        min-height: 44px;
        border-radius: 999px;
        border: 1px solid rgba(246, 209, 134, 0.52);
        cursor: pointer;
        font: 700 0.9rem/1 Lexend, system-ui, sans-serif;
      }

      .analytics-consent-accept {
        background: rgba(255, 255, 255, 0.06);
        color: #f7f1e4;
      }

      .analytics-consent-reject {
        background: rgba(255, 255, 255, 0.06);
        color: #f7f1e4;
      }

      .analytics-consent-button:focus-visible {
        outline: 3px solid #91b7ff;
        outline-offset: 3px;
      }

      @media (max-width: 520px) {
        .analytics-consent-actions {
          grid-template-columns: 1fr;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function removeBanner() {
    document.getElementById("analytics-consent-banner")?.remove();
  }

  function showBanner() {
    buildStyles();

    if (document.getElementById("analytics-consent-banner")) return;

    const banner = document.createElement("section");
    banner.id = "analytics-consent-banner";
    banner.className = "analytics-consent-banner";
    banner.setAttribute("aria-labelledby", "analytics-consent-title");
    banner.innerHTML = `
      <div class="analytics-consent-content">
        <div>
          <h2 class="analytics-consent-title" id="analytics-consent-title">Cookies analiticas</h2>
          <p class="analytics-consent-text">
            Me ayuda saber qué partes del portfolio se visitan más para mejorarlo. Si rechazas, no se hará seguimiento.
          </p>
        </div>
        <div class="analytics-consent-actions">
          <button class="analytics-consent-button analytics-consent-accept" type="button" data-analytics-consent="accept">
            Aceptar analiticas
          </button>
          <button class="analytics-consent-button analytics-consent-reject" type="button" data-analytics-consent="reject">
            Rechazar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
  }

  function acceptAnalytics() {
    setConsent(ACCEPTED);
    removeBanner();
    loadAnalytics();
  }

  function rejectAnalytics() {
    setConsent(REJECTED);
    if (typeof window.clarity === "function") {
      window.clarity("consent", false);
    }
    clearAnalyticsCookies();
    removeBanner();
  }

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-analytics-consent]")?.dataset
      .analyticsConsent;

    if (action === "accept") {
      acceptAnalytics();
    }

    if (action === "reject") {
      rejectAnalytics();
    }
  });

  function initConsent() {
    const consent = getConsent();

    if (consent === ACCEPTED) {
      loadAnalytics();
      return;
    }

    if (consent === REJECTED) {
      return;
    }

    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initConsent);
  } else {
    initConsent();
  }
})();
