/* =====================================================
   PARTY GUIDE  –  app.js (UPDATED: AUTO-GROUPS & PHOTO PROOF)
   =====================================================
   Reads config + data from data/spots.js (loaded first).
   Controls three views:
     1. Login screen   – password gate
     2. Main menu      – 3 zone tiles (Trigger Auto-Group)
     3. Spot list      – accordion for a region + route + Photo Proof
   Plus two overlays:
     4. Route dropdown – bottom sheet
     5. Chat panel     – Telegram message sender
===================================================== */

"use strict";

/* ─────────────────────────────────────────────────────
   ELEMENT REFERENCES
───────────────────────────────────────────────────── */
// Login
const loginScreen   = document.getElementById("loginScreen");
const passwordInput = document.getElementById("passwordInput");
const verifyBtn     = document.getElementById("verifyBtn");
const loginError    = document.getElementById("loginError");

// Header
const actionBtn     = document.getElementById("actionBtn");

// Main menu
const mainMenu      = document.getElementById("mainMenu");
const zoneBtns      = document.querySelectorAll(".zone-btn");

// Route dropdown
const dropdownBackdrop = document.getElementById("dropdownBackdrop");
const dropdownSheet    = document.getElementById("dropdownSheet");
const dropdownLabel    = document.getElementById("dropdownLabel");
const dropdownGrid     = document.getElementById("dropdownGrid");

// Chat panel
const chatBackdrop    = document.getElementById("chatBackdrop");
const chatSheet       = document.getElementById("chatSheet");
const chatCloseBtn    = document.getElementById("chatCloseBtn");
const chatInputState  = document.getElementById("chatInputState");
const chatTextarea    = document.getElementById("chatTextarea");
const chatSendBtn     = document.getElementById("chatSendBtn");
const chatConfirmState = document.getElementById("chatConfirmState");
const chatDoneBtn     = document.getElementById("chatDoneBtn");

// Spot list
const spotListWrapper = document.getElementById("spotListWrapper");
const listContext     = document.getElementById("listContext");
const spotList        = document.getElementById("spotList");

/* ─────────────────────────────────────────────────────
   APP STATE
───────────────────────────────────────────────────── */
let currentRegion = null;
let currentRoute  = null;
let currentSpots  = [];
let currentIndex  = 0;
let photoUploadedForCurrentSpot = false; // Foto-Sperre Status

/* ─────────────────────────────────────────────────────
   AUTOMATIC GROUP & EMOJI MAPPING
───────────────────────────────────────────────────── */
const REGION_LABELS = {
  haadRin:   "Haad Rin",
  haadYao:   "Haad Yao",
  mixedTour: "Mixed Tour"
};

// Automatische Zuweisung der Gruppennamen
const REGION_GROUPS = {
  haadRin:   "Gruppe A",
  haadYao:   "Gruppe B",
  mixedTour: "Gruppe C"
};

// Automatische Farb-Emojis für den Chef
const REGION_EMOJIS = {
  haadRin:   "🟠🟠",
  haadYao:   "🔵🔵",
  mixedTour: "🔴🔴"
};

/* =====================================================
   1. PASSWORD GATE
===================================================== */
(function initPasswordGate() {
  function attempt() {
    if (passwordInput.value === APP_PASSWORD) {
      loginScreen.style.transition = "opacity 0.3s ease";
      loginScreen.style.opacity = "0";
      setTimeout(() => { loginScreen.hidden = true; }, 320);
    } else {
      loginError.hidden = false;
      passwordInput.value = "";
      passwordInput.classList.remove("shake");
      void passwordInput.offsetWidth;
      passwordInput.classList.add("shake");
      passwordInput.focus();
    }
  }

  verifyBtn.addEventListener("click", attempt);
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") attempt();
  });
})();

/* =====================================================
   2. VIEW MANAGEMENT & DYNAMIC CSS THEMING
===================================================== */
function updateAppTheme(regionKey) {
  // Entfernt alte Klassen vom body, damit CSS umschalten kann
  document.body.classList.remove("route-haadRin", "route-haadYao", "route-mixedTour");
  if (regionKey) {
    document.body.classList.add(`route-${regionKey}`);
  }
}

function showMainMenu() {
  mainMenu.hidden        = false;
  spotListWrapper.hidden = true;
  setActionMode("chat");
  updateAppTheme(null); // Farb-Reset im Hauptmenü
}

function showSpotList() {
  mainMenu.hidden        = true;
  spotListWrapper.hidden = false;
  setActionMode("back");
  updateAppTheme(currentRegion); // CSS-Farbe aktivieren
}

function setActionMode(mode) {
  if (mode === "back") {
    actionBtn.textContent = "Back";
    actionBtn.classList.add("is-back");
  } else {
    actionBtn.textContent = "Chat";
    actionBtn.classList.remove("is-back");
  }
}

/* =====================================================
   3. HEADER ACTION BUTTON  (Chat ↔ Back)
===================================================== */
actionBtn.addEventListener("click", () => {
  if (actionBtn.classList.contains("is-back")) {
    currentRegion = null;
    currentRoute  = null;
    currentSpots  = [];
    currentIndex  = 0;
    spotList.innerHTML = "";
    showMainMenu();
  } else {
    openChat();
  }
});

/* =====================================================
   4. ZONE BUTTONS  →  open route dropdown
===================================================== */
zoneBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    openDropdown(btn.dataset.region);
  });
});

/* =====================================================
   5. ROUTE DROPDOWN  –  dynamically built per zone
===================================================== */
function openDropdown(regionKey) {
  currentRegion = regionKey;
  dropdownLabel.textContent = `Select your route  –  ${REGION_LABELS[regionKey]}`;
  dropdownGrid.innerHTML = "";
  
  const options = ROUTE_OPTIONS[regionKey] || [];

  options.forEach(({ key, label }) => {
    const btn = document.createElement("button");
    btn.className = "dropdown-route-btn";
    btn.dataset.route = key;
    btn.textContent = label;
    btn.addEventListener("click", () => {
      currentRoute = key;
      closeDropdown();
      loadRoute();
    });
    dropdownGrid.appendChild(btn);
  });

  dropdownBackdrop.hidden = false;
  dropdownSheet.hidden    = false;
}

function closeDropdown() {
  dropdownBackdrop.hidden = true;
  dropdownSheet.hidden = true;
}
dropdownBackdrop.addEventListener("click", closeDropdown);

/* =====================================================
   6. LOAD ROUTE  –  fetch spots + render list
===================================================== */
function loadRoute() {
  const regionData = spotsData[currentRegion];
  currentSpots = (regionData && regionData.routes[currentRoute]) || [];
  currentIndex = 0;
  photoUploadedForCurrentSpot = false; // Reset für neuen Routenstart

  const routeLabel = (ROUTE_OPTIONS[currentRegion] || [])
    .find((o) => o.key === currentRoute)?.label || currentRoute;
  
  // Zeigt dem Volunteer oben die automatische Gruppe an, z.B. "Haad Rin · Full Day (Gruppe A)"
  const currentGroup = REGION_GROUPS[currentRegion] || "";
  listContext.textContent = `${REGION_LABELS[currentRegion]} · ${routeLabel} (${currentGroup})`;

  renderList();
  showSpotList();
  spotListWrapper.scrollTop = 0;
}

/* =====================================================
   7. ACCORDION LIST  –  render all spots with Photo Proof
===================================================== */
function renderList() {
  spotList.innerHTML = "";

  if (currentSpots.length === 0) {
    spotList.innerHTML = `
      <li class="empty-state">
        No spots added yet for this route.<br>
        Open <code>data/spots.js</code> and fill in your spot objects.
      </li>`;
    return;
  }

  currentSpots.forEach((spot, index) => {
    const li = document.createElement("li");
    li.className = [
      "spot-item",
      spot.isBreak           ? "is-break"  : "",
      index === currentIndex ? "is-active" : ""
    ].join(" ").trim();
    li.dataset.index = index;

    li.innerHTML = index === currentIndex
      ? buildActiveHTML(spot, index)
      : buildCollapsedHTML(spot, index);

    spotList.appendChild(li);
  });

  attachListeners();
}

/* ── HTML builders ───────────────────────────────── */
function buildCollapsedHTML(spot, index) {
  return `
    <div class="spot-header" role="button" aria-label="Jump to spot ${index + 1}">
      <span class="spot-index">${index + 1}</span>
      <span class="spot-title">${escapeHTML(spot.name)}</span>
    </div>`;
}

function buildActiveHTML(spot, index) {
  const isFirst = index === 0;
  const isLast  = index === currentSpots.length - 1;
  const hasMap  = !spot.isBreak && spot.mapsLink && !spot.mapsLink.startsWith("PLACEHOLDER");

  const navigateBtn = hasMap ? `
    <a class="btn btn--accent btn--lg" href="${spot.mapsLink}" target="_blank" rel="noopener">
      📍 Navigate
    </a>` : "";

  const prevBtn = `
    <button class="btn btn--ghost" data-action="prev" ${isFirst ? "disabled" : ""}>
      ← Prev
    </button>`;

  // Foto-Sicherungssystem einbetten (Pausen überspringen das)
  let photoSection = "";
  let isNextDisabled = !photoUploadedForCurrentSpot;

  if (spot.isBreak) {
    isNextDisabled = false; 
  } else {
    photoSection = `
      <div class="photo-proof-container" style="margin: 4px 0 8px 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: var(--radius); border: 1px dashed var(--color-border);">
        <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display:none;">
        <button class="btn btn--camera ${photoUploadedForCurrentSpot ? 'has-photo' : ''}" id="cameraBtn">
          ${photoUploadedForCurrentSpot ? "✅ Proof Photo Uploaded" : "📸 Take Proof Photo (Flyer)"}
        </button>
      </div>
    `;
  }

  const nextBtn = isLast
    ? `<button class="btn btn--finish" data-action="finish" ${isNextDisabled ? "disabled" : ""}>Finish Route</button>`
    : `<button class="btn btn--muted"  data-action="next" ${isNextDisabled ? "disabled" : ""}>Next →</button>`;

  return `
    <div class="spot-header">
      <span class="spot-index">${index + 1}</span>
      <span class="spot-title">${escapeHTML(spot.name)}</span>
    </div>
    <div class="spot-body">
      ${spot.time    ? `<p class="spot-time-tag">${escapeHTML(spot.time)}</p>`        : ""}
      ${spot.comment ? `<p class="spot-comment-text">${escapeHTML(spot.comment)}</p>` : ""}
      
      ${photoSection}

      <div class="spot-actions">
        ${navigateBtn}
        <div class="spot-nav-row">
          ${prevBtn}
          ${nextBtn}
        </div>
      </div>
    </div>`;
}

/* ── Event delegation on the list ───────────────── */
function attachListeners() {
  spotList.querySelectorAll(".spot-header[role='button']").forEach((header) => {
    header.addEventListener("click", () => {
      // Direkter Sprung über Header nur, wenn Foto hochgeladen oder es eine Kaffeepause ist
      if (photoUploadedForCurrentSpot || currentSpots[currentIndex].isBreak) {
        jumpToSpot(parseInt(header.closest(".spot-item").dataset.index, 10));
      } else {
        alert("Please upload the required proof photo first!");
      }
    });
  });

  const activeItem = spotList.querySelector(".spot-item.is-active");
  if (!activeItem) return;

  activeItem.querySelector("[data-action='prev']")?.addEventListener("click", () => jumpToSpot(currentIndex - 1));
  activeItem.querySelector("[data-action='next']")?.addEventListener("click", () => jumpToSpot(currentIndex + 1));
  activeItem.querySelector("[data-action='finish']")?.addEventListener("click", () => {
    sendRouteFinishedNotification(currentRegion, currentRoute);
    showCompletion();
  });

  // Kamera-Button-Klick
  const cameraBtn = document.getElementById("cameraBtn");
  const cameraInput = document.getElementById("cameraInput");

  if (cameraBtn && cameraInput) {
    cameraBtn.addEventListener("click", () => cameraInput.click());
    cameraInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        processAndUploadPhoto(e.target.files[0], cameraBtn);
      }
    });
  }
}

function jumpToSpot(newIndex) {
  if (newIndex < 0 || newIndex >= currentSpots.length) return;
  currentIndex = newIndex;
  photoUploadedForCurrentSpot = false; // Für den neuen Spot sperren
  renderList();
  requestAnimationFrame(() => {
    spotList.querySelector(".spot-item.is-active")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* ── PHOTO SKALIERUNG & TELEGRAM PROOF UPLOAD ── */
function processAndUploadPhoto(file, buttonElement) {
  buttonElement.disabled = true;
  buttonElement.textContent = "⌛ Sending to Chef...";

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (event) {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 1024; // Komprimierung schont thailändisches Datenvolumen
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(async function (blob) {
        const success = await sendPhotoToTelegram(blob);
        if (success) {
          photoUploadedForCurrentSpot = true;
          buttonElement.className = "btn btn--camera has-photo";
          buttonElement.textContent = "✅ Proof Photo Uploaded";
          renderList(); // Schaltet den "Next"-Button frei
        } else {
          buttonElement.disabled = false;
          buttonElement.textContent = "❌ Failed. Try Again";
          alert("Upload failed. Please check your network connection.");
        }
      }, "image/jpeg", 0.7);
    };
  };
}

async function sendPhotoToTelegram(imageBlob) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + " Uhr";
  
  const routeLabel = (ROUTE_OPTIONS[currentRegion] || []).find((o) => o.key === currentRoute)?.label || currentRoute;
  const spot = currentSpots[currentIndex];
  
  // Automatische Ermittlung für die Bildbeschriftung
  const currentGroup = REGION_GROUPS[currentRegion] || "Unbekannt";
  const emojiMarker = REGION_EMOJIS[currentRegion] || "⚪⚪";
  
  const captionText = `${emojiMarker} *[${currentGroup.toUpperCase()}] - ${REGION_LABELS[currentRegion]} [${routeLabel}]* ${emojiMarker}\n\n` +
                      `📍 *Spot ${currentIndex + 1}:* ${spot.name}\n` +
                      `🕒 *Zeitstempel:* ${timeString}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CHAT_ID);
  formData.append("photo", imageBlob, "proof.jpg");
  formData.append("caption", captionText);
  formData.append("parse_mode", "Markdown");

  try {
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error("Telegram Upload Error:", err);
    return false;
  }
}

/* ── Completion screen ───────────────────────────── */
function showCompletion() {
  const regionData = spotsData[currentRegion];
  const bonus = regionData?.bonusMessage ? `<br><br>${regionData.bonusMessage}` : "";

  spotList.innerHTML = `
    <li>
      <div class="completion-card">
        <h2>🎉</h2>
        <p>
          Route completed.<br>
          <strong>${listContext.textContent}</strong><br><br>
          Thank you!${bonus}
        </p>
      </div>
    </li>`;
}

/* =====================================================
   7b. AUTOMATISCHE ABSCHLUSS-MELDUNG (MIT AUTOMATISCHEN FARB-EMOJIS)
===================================================== */
async function sendRouteFinishedNotification(regionKey, routeKey) {
  const now = new Date();
  const timeString = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " Uhr";
  const dateString = now.toLocaleDateString('de-DE');

  const routeLabels = { starter: "Starter Tour", halfDay: "Half Day Tour", fullDay: "Full Day Tour" };
  const finalRegion = REGION_LABELS[regionKey] || regionKey;
  const finalRoute = routeLabels[routeKey] || routeKey;
  
  // Automatische Bestimmung für die Abschlussmeldung
  const currentGroup = REGION_GROUPS[regionKey] || "Unbekannt";
  const emojiMarker = REGION_EMOJIS[regionKey] || "⚪⚪";

  const messageText = `🏁 *ROUTE ERFOLGREICH BEENDET!*\n\n` +
                      `${emojiMarker} *Team:* ${currentGroup}\n` +
                      `📍 *Region:* ${finalRegion}\n` +
                      `🗺️ *Tour:* ${finalRoute}\n` +
                      `🕒 *Uhrzeit:* ${timeString}\n` +
                      `📅 *Datum:* ${dateString}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: messageText, parse_mode: "Markdown" })
    });
  } catch (error) {
    console.error("Fehler beim automatischen Abschlussbericht:", error);
  }
}

/* =====================================================
   8. CHAT PANEL  –  Telegram Bot API (Manuelle Nachrichten)
===================================================== */
function openChat() {
  chatInputState.hidden   = false;
  chatConfirmState.hidden = true;
  chatTextarea.value      = "";
  chatBackdrop.hidden     = false;
  chatSheet.hidden        = false;
  setTimeout(() => chatTextarea.focus(), 300);
}

function closeChat() { chatBackdrop.hidden = true; chatSheet.hidden = true; }
chatBackdrop.addEventListener("click", closeChat);
chatCloseBtn.addEventListener("click", closeChat);
chatDoneBtn.addEventListener("click",  closeChat);

chatSendBtn.addEventListener("click", async () => {
  const text = chatTextarea.value.trim();
  if (!text) { chatTextarea.focus(); return; }

  chatSendBtn.disabled = true;
  chatSendBtn.textContent = "Sending…";

  const success = await sendTelegramMessage(text);
  chatSendBtn.disabled = false;
  chatSendBtn.textContent = "Send Message";

  if (success) {
    chatTextarea.value      = "";
    chatInputState.hidden   = true;
    chatConfirmState.hidden = false;
  } else {
    alert("Message couldn't be sent right now. Please try again.");
  }
});

document.getElementById("chatSendAnotherBtn").addEventListener("click", () => {
  chatConfirmState.hidden = false;
  chatInputState.hidden   = false;
  chatConfirmState.hidden = true;
  chatTextarea.focus();
});

async function sendTelegramMessage(text) {
  const routeLabel = currentRoute ? (ROUTE_OPTIONS[currentRegion] || []).find((o) => o.key === currentRoute)?.label || currentRoute : "";
  
  // Automatische Kontextbestimmung für das manuelle Chatfenster
  let context = "";
  if (currentRegion) {
    const currentGroup = REGION_GROUPS[currentRegion] || "";
    context = `[${currentGroup} · ${REGION_LABELS[currentRegion] ?? currentRegion}${routeLabel ? " · " + routeLabel : ""}]\n`;
  } else {
    context = `[Main Menu]\n`;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: context + text })
    });
    const data = await res.json();
    return data.ok === true;
  } catch {
    return false;
  }
}

/* =====================================================
   UTILITY & INIT
===================================================== */
function escapeHTML(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

showMainMenu();