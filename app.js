/* =====================================================
   PARTY GUIDE  –  app.js (UPDATED)
   =====================================================
   Reads config + data from data/spots.js (loaded first).
   Controls three views:
     1. Login screen   – password gate
     2. Main menu      – 3 zone tiles
     3. Spot list      – accordion for a region + route + Photo Proof
   Plus overlays:
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

// PROGRESS RESTORE ELEMENTS
const restoreBackdrop     = document.getElementById("restoreBackdrop");
const restoreSheet        = document.getElementById("restoreSheet");
const restoreContinueBtn = document.getElementById("restoreContinueBtn");
const restoreRestartBtn  = document.getElementById("restoreRestartBtn");

const confirmRestartBackdrop = document.getElementById("confirmRestartBackdrop");
const confirmRestartSheet    = document.getElementById("confirmRestartSheet");
const finalRestartBtn        = document.getElementById("finalRestartBtn");
const cancelRestartBtn       = document.getElementById("cancelRestartBtn");

// FLEXIBLE NAVIGATION SKIP WARNING ELEMENTS
const skipWarningBackdrop = document.getElementById("skipWarningBackdrop");
const skipWarningSheet    = document.getElementById("skipWarningSheet");
const skipWarningMessage  = document.getElementById("skipWarningMessage");
const skipContinueBtn     = document.getElementById("skipContinueBtn");
const skipCancelBtn       = document.getElementById("skipCancelBtn");

// SKIP REASON ELEMENTS
const skipReasonBackdrop  = document.getElementById("skipReasonBackdrop");
const skipReasonSheet     = document.getElementById("skipReasonSheet");
const skipReasonCancelBtn = document.getElementById("skipReasonCancelBtn");

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
let photoUploadedForCurrentSpot = false; 

// Tracks detailed progress strings: "open", "completed", or "skipped"
let uploadedSpotsMap = []; 
// Map to store the string reason for skipped spots, ready for Telegram pipelines
let skipReasonsMap = [];

/* ─────────────────────────────────────────────────────
   AUTOMATIC REGION & EMOJI MAPPING
───────────────────────────────────────────────────── */
const REGION_LABELS = {
  haadRin:   "Haad Rin",
  haadYao:   "Haad Yao",
  mixedTour: "Mixed Tour"
};

/* PERSISTENCE SYSTEM (LOCAL STORAGE)
   Saves route progress for up to 4 hours per specific route.
───────────────────────────────────────────────────── */
const MAX_PROGRESS_AGE = 4 * 60 * 60 * 1000; 

// Hilfsfunktion zur Generierung des dynamischen, route-spezifischen Keys
function getRouteStorageKey(region, route) {
  return `party_guide_progress_${region}_${route}`;
}

function saveRouteProgress() {
  if (!currentRegion || !currentRoute) return;
  
  const progressData = {
    currentRegion,
    currentRoute,
    currentIndex,
    photoUploadedForCurrentSpot,
    uploadedSpotsMap, 
    skipReasonsMap, 
    timestamp: Date.now()
  };
  
  const storageKey = getRouteStorageKey(currentRegion, currentRoute);
  localStorage.setItem(storageKey, JSON.stringify(progressData));
}

function clearRouteProgress() {
  if (!currentRegion || !currentRoute) return;
  const storageKey = getRouteStorageKey(currentRegion, currentRoute);
  localStorage.removeItem(storageKey);
}

function checkAndPromptProgress() {
  if (!currentRegion || !currentRoute) return;
  
  const storageKey = getRouteStorageKey(currentRegion, currentRoute);
  const rawData = localStorage.getItem(storageKey);
  if (!rawData) return;

  try {
    const progress = JSON.parse(rawData);
    
    if (Date.now() - progress.timestamp > MAX_PROGRESS_AGE) {
      localStorage.removeItem(storageKey);
      return;
    }

    restoreBackdrop.hidden = false;
    restoreSheet.hidden = false;
  } catch (e) {
    console.error("Error parsing stored progress", e);
    localStorage.removeItem(storageKey);
  }
}

// Bind Persistence Dialog Listeners
(function initRestoreListeners() {
  restoreContinueBtn.addEventListener("click", () => {
    const storageKey = getRouteStorageKey(currentRegion, currentRoute);
    const progress = JSON.parse(localStorage.getItem(storageKey));
    if (progress) {
      currentRegion = progress.currentRegion;
      currentRoute = progress.currentRoute;
      currentIndex = progress.currentIndex;
      photoUploadedForCurrentSpot = progress.photoUploadedForCurrentSpot;
      uploadedSpotsMap = progress.uploadedSpotsMap || []; 
      skipReasonsMap = progress.skipReasonsMap || []; 

      const regionData = spotsData[currentRegion];
      currentSpots = (regionData && regionData.routes[currentRoute]) || [];
      
      const routeLabel = (ROUTE_OPTIONS[currentRegion] || [])
        .find((o) => o.key === currentRoute)?.label || currentRoute;
      
      listContext.textContent = `${REGION_LABELS[currentRegion]} · ${routeLabel}`;

      renderList();
      showSpotList();
      
      requestAnimationFrame(() => {
        spotList.querySelector(".spot-item.is-active")?.scrollIntoView({ block: "start" });
      });
    }
    restoreBackdrop.hidden = true;
    restoreSheet.hidden = true;
  });

  restoreRestartBtn.addEventListener("click", () => {
    confirmRestartBackdrop.hidden = false;
    confirmRestartSheet.hidden = false;
  });

  finalRestartBtn.addEventListener("click", () => {
    clearRouteProgress();
    confirmRestartBackdrop.hidden = true;
    confirmRestartSheet.hidden = true;
    restoreBackdrop.hidden = true;
    restoreSheet.hidden = true;

    // Nach dem Löschen des alten Fortschritts die Route frisch initialisieren
    const regionData = spotsData[currentRegion];
    currentSpots = (regionData && regionData.routes[currentRoute]) || [];
    currentIndex = 0;
    photoUploadedForCurrentSpot = false; 
    uploadedSpotsMap = new Array(currentSpots.length).fill("open");
    skipReasonsMap = new Array(currentSpots.length).fill("");
    const routeLabel = (ROUTE_OPTIONS[currentRegion] || []).find((o) => o.key === currentRoute)?.label || currentRoute;
    listContext.textContent = `${REGION_LABELS[currentRegion]} · ${routeLabel}`;
    
    saveRouteProgress();
    renderList();
    showSpotList();
    spotListWrapper.scrollTop = 0;
  });

  cancelRestartBtn.addEventListener("click", () => {
    confirmRestartBackdrop.hidden = true;
    confirmRestartSheet.hidden = true;
  });
})();
/* ───────────────────────────────────────────────────── */


/* =====================================================
   1. PASSWORD GATE
===================================================== */
(function initPasswordGate() {
  function attempt() {
    if (passwordInput.value === APP_PASSWORD) {
      loginScreen.style.transition = "opacity 0.3s ease";
      loginScreen.style.opacity = "0";
      setTimeout(() => { 
        loginScreen.hidden = true; 
      }, 320);
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
  document.body.classList.remove("route-haadRin", "route-haadYao", "route-mixedTour");
  if (regionKey) {
    document.body.classList.add(`route-${regionKey}`);
  }
}

function showMainMenu() {
  mainMenu.hidden        = false;
  spotListWrapper.hidden = true;
  setActionMode("chat");
  updateAppTheme(null); 
}

function showSpotList() {
  mainMenu.hidden        = true;
  spotListWrapper.hidden = false;
  setActionMode("back");
  updateAppTheme(currentRegion); 
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
    uploadedSpotsMap = [];
    skipReasonsMap = [];
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

/* =====================================================
   6. LOAD ROUTE  –  fetch spots + render list
===================================================== */
function loadRoute() {
  const storageKey = getRouteStorageKey(currentRegion, currentRoute);
  const rawData = localStorage.getItem(storageKey);

  if (rawData) {
    // Fehlerbehebung: Vor dem Prompt die Spot-Liste anzeigen, damit die App nicht im Hauptmenü hängen bleibt
    showSpotList();
    checkAndPromptProgress();
  } else {
    const regionData = spotsData[currentRegion];
    currentSpots = (regionData && regionData.routes[currentRoute]) || [];
    currentIndex = 0;
    photoUploadedForCurrentSpot = false; 
    
    uploadedSpotsMap = new Array(currentSpots.length).fill("open");
    skipReasonsMap = new Array(currentSpots.length).fill("");

    const routeLabel = (ROUTE_OPTIONS[currentRegion] || [])
      .find((o) => o.key === currentRoute)?.label || currentRoute;
    
    listContext.textContent = `${REGION_LABELS[currentRegion]} · ${routeLabel}`;

    saveRouteProgress(); 
    renderList();
    showSpotList();
    spotListWrapper.scrollTop = 0;
  }
}

function closeDropdown() {
  dropdownBackdrop.hidden = true;
  dropdownSheet.hidden = true;
}
dropdownBackdrop.addEventListener("click", closeDropdown);

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
    const isScooterInfo = !!spot.isScooterInfo;
    const li = document.createElement("li");
    li.className = [
      "spot-item",
      (spot.isBreak || isScooterInfo) ? "is-break"  : "",
      index === currentIndex          ? "is-active" : ""
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
  const isScooterInfo = !!spot.isScooterInfo;
  let statusIndicator = "";
  if (spot.isBreak || isScooterInfo) {
    statusIndicator = "";
  } else if (uploadedSpotsMap[index] === "completed") {
    statusIndicator = " ✓";
  } else if (uploadedSpotsMap[index] === "skipped") {
    statusIndicator = " [Skipped]";
  }
  
  return `
    <div class="spot-header" role="button" aria-label="Jump to spot ${index + 1}">
      <span class="spot-index">${index + 1}</span>
      <span class="spot-title">${escapeHTML(spot.name)}${statusIndicator}</span>
    </div>`;
}

function buildActiveHTML(spot, index) {
  const isFirst = index === 0;
  const isLast  = index === currentSpots.length - 1;
  const isScooterInfo = !!spot.isScooterInfo;
  const hasMap  = !spot.isBreak && !isScooterInfo && spot.mapsLink && !spot.mapsLink.startsWith("PLACEHOLDER");

  const navigateBtn = hasMap ? `
    <button class="btn btn--accent btn--lg" data-action="navigate-check" data-url="${spot.mapsLink}">
      📍 Navigate
    </button>` : "";

  const prevBtn = `
    <button class="btn btn--ghost" data-action="prev" ${isFirst ? "disabled" : ""}>
      ← Prev
    </button>`;

  let photoSection = "";
  const isSpotResolved = uploadedSpotsMap[index] === "completed" || uploadedSpotsMap[index] === "skipped" || spot.isBreak || isScooterInfo;
  let isNextDisabled = !isSpotResolved;

  if (spot.isBreak || isScooterInfo) {
    isNextDisabled = false; 
  } else {
    const isUploaded = uploadedSpotsMap[index] === "completed";
    const isSkipped = uploadedSpotsMap[index] === "skipped";
    
    const skippedBanner = isSkipped ? `
      <div style="margin-bottom: 8px; padding: 6px 10px; background: rgba(255, 159, 67, 0.15); border: 1px solid #ff9f43; color: #ff9f43; border-radius: var(--radius); font-size: 0.85rem; text-align: center;">
        ⚠️ This spot has been skipped (${escapeHTML(skipReasonsMap[index])})
      </div>
    ` : "";

    photoSection = `
      ${skippedBanner}
      <div class="photo-proof-container" style="margin: 4px 0 8px 0; padding: 12px; background: rgba(255,255,255,0.05); border-radius: var(--radius); border: 1px dashed var(--color-border);">
        <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display:none;">
        <button class="btn btn--camera ${isUploaded ? 'has-photo' : ''}" id="cameraBtn">
          ${isUploaded ? "✅ Proof Photo Uploaded" : "📸 Take Proof Photo (Flyer)"}
        </button>
        <button class="btn btn--ghost btn--lg" data-action="trigger-skip" style="margin-top: var(--space-s); width: 100%; border-color: rgba(255,255,255,0.15);">
          ⏭️ Skip Spot
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

/* HELPER TO COUNT UNFINISHED SPOTS PRECEDING THE TARGET INDEX */
function countUnfinishedSpotsBefore(targetIndex) {
  let count = 0;
  for (let i = 0; i < targetIndex; i++) {
    if (!currentSpots[i].isBreak && !currentSpots[i].isScooterInfo && uploadedSpotsMap[i] === "open") {
      count++;
    }
  }
  return count;
}

/* HELPER TO FIND THE LAST COMPLETED SPOT INDEX FOR THE WARNING MESSAGE */
function getLastCompletedSpotIndex() {
  for (let i = uploadedSpotsMap.length - 1; i >= 0; i--) {
    if (uploadedSpotsMap[i] === "completed" && !currentSpots[i].isBreak && !currentSpots[i].isScooterInfo) {
      return i;
    }
  }
  return -1; 
}

/* ASYNC WARNING PROCESSOR FOR FLEXIBLE OPERATIONS */
let pendingActionCallback = null;

function executeWithSkipWarning(targetIndex, actionCallback) {
  const unfinishedCount = countUnfinishedSpotsBefore(targetIndex);
  
  if (unfinishedCount > 0) {
    const lastCompletedIdx = getLastCompletedSpotIndex();
    const currentSpotDisplay = lastCompletedIdx !== -1 ? lastCompletedIdx + 1 : 0;

    skipWarningMessage.textContent = `You are currently at Spot ${currentSpotDisplay}. There are still ${unfinishedCount} unfinished spots before this location. Do you want to continue anyway?`;
    pendingActionCallback = actionCallback;
    
    skipWarningBackdrop.hidden = false;
    skipWarningSheet.hidden = false;
  } else {
    actionCallback();
  }
}

// Bind Skip Warning Listeners
(function initSkipWarningListeners() {
  document.getElementById("skipContinueBtn").addEventListener("click", () => {
    skipWarningBackdrop.hidden = true;
    skipWarningSheet.hidden = true;
    if (pendingActionCallback) {
      pendingActionCallback();
      pendingActionCallback = null;
    }
  });

  document.getElementById("skipCancelBtn").addEventListener("click", () => {
    skipWarningBackdrop.hidden = true;
    skipWarningSheet.hidden = true;
    pendingActionCallback = null;
  });
})();

/* AUTOMATIC TELEGRAM NOTIFICATION FOR SKIPPED SPOTS */
async function sendSkipNotificationToTelegram(skippedIndices, targetReason) {
  if (!skippedIndices || skippedIndices.length === 0) return;

  const regionLabel = REGION_LABELS[currentRegion] || currentRegion;
  let messageText = "";

  if (skippedIndices.length === 1) {
    const singleIdx = skippedIndices[0];
    const spotName = currentSpots[singleIdx]?.name || "Unknown Spot";
    messageText = `${regionLabel}\n` +
                  `${spotName}: Skipped\n` +
                  `Reason: ${targetReason}`;
  } else {
    messageText = `${regionLabel}\n`;
    skippedIndices.forEach(idx => {
      const spotName = currentSpots[idx]?.name || "Unknown Spot";
      const reasonText = idx === currentIndex ? targetReason : (skipReasonsMap[idx] || "Skipped in transition");
      messageText += `${spotName}: Skipped\nReason: ${reasonText}\n\n`;
    });
    messageText = messageText.trim();
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: messageText })
    });
  } catch (error) {
    console.error("Error sending skip notification to Telegram:", error);
  }
}

/* SKIP REASON OVERLAY LIFECYCLE LISTENERS */
let skipTargetIndex = null;
(function initSkipReasonOverlayListeners() {
  skipReasonSheet.querySelectorAll("[data-reason]").forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedReason = btn.dataset.reason;
      if (skipTargetIndex !== null) {
        
        const skippedIndicesBatch = [];
        for (let i = 0; i <= skipTargetIndex; i++) {
          if (!currentSpots[i].isBreak && !currentSpots[i].isScooterInfo && uploadedSpotsMap[i] === "open") {
            skippedIndicesBatch.push(i);
            uploadedSpotsMap[i] = "skipped";
            skipReasonsMap[i] = i === skipTargetIndex ? selectedReason : "Skipped in transition";
          }
        }

        if (uploadedSpotsMap[skipTargetIndex] !== "skipped") {
          uploadedSpotsMap[skipTargetIndex] = "skipped";
          skipReasonsMap[skipTargetIndex] = selectedReason;
          if (!skippedIndicesBatch.includes(skipTargetIndex)) {
            skippedIndicesBatch.push(skipTargetIndex);
          }
        }
        
        saveRouteProgress();
        renderList();

        sendSkipNotificationToTelegram(skippedIndicesBatch, selectedReason);

        const isLast = currentIndex === currentSpots.length - 1;
        if (isLast) {
          sendRouteFinishedNotification(currentRegion, currentRoute);
          clearRouteProgress(); 
          showCompletion();
        } else {
          jumpToSpot(currentIndex + 1);
        }
      }
      
      skipReasonBackdrop.hidden = true;
      skipReasonSheet.hidden = true;
      skipTargetIndex = null;
    });
  });

  skipReasonCancelBtn.addEventListener("click", () => {
    skipReasonBackdrop.hidden = true;
    skipReasonSheet.hidden = true;
    skipTargetIndex = null;
  });
  
  skipReasonBackdrop.addEventListener("click", () => {
    skipReasonBackdrop.hidden = true;
    skipReasonSheet.hidden = true;
    skipTargetIndex = null;
  });
})();


/* ── Event delegation on the list ───────────────── */
function attachListeners() {
  spotList.querySelectorAll(".spot-header[role='button']").forEach((header) => {
    header.addEventListener("click", () => {
      const targetIdx = parseInt(header.closest(".spot-item").dataset.index, 10);
      executeWithSkipWarning(targetIdx, () => {
        jumpToSpot(targetIdx);
      });
    });
  });

  const activeItem = spotList.querySelector(".spot-item.is-active");
  if (!activeItem) return;

  activeItem.querySelector("[data-action='prev']")?.addEventListener("click", () => jumpToSpot(currentIndex - 1));
  activeItem.querySelector("[data-action='next']")?.addEventListener("click", () => jumpToSpot(currentIndex + 1));
  activeItem.querySelector("[data-action='finish']")?.addEventListener("click", () => {
    if (currentSpots[currentIndex] && currentSpots[currentIndex].isScooterInfo) {
      uploadedSpotsMap[currentIndex] = "completed";
    }
    sendRouteFinishedNotification(currentRegion, currentRoute);
    clearRouteProgress(); 
    showCompletion();
  });

  activeItem.querySelector("[data-action='navigate-check']")?.addEventListener("click", (e) => {
    const url = e.currentTarget.dataset.url;
    executeWithSkipWarning(currentIndex, () => {
      window.open(url, "_blank", "noopener");
    });
  });

  activeItem.querySelector("[data-action='trigger-skip']")?.addEventListener("click", () => {
    skipTargetIndex = currentIndex;
    skipReasonBackdrop.hidden = false;
    skipReasonSheet.hidden = false;
  });

  const cameraBtn = document.getElementById("cameraBtn");
  const cameraInput = document.getElementById("cameraInput");

  if (cameraBtn && cameraInput) {
    cameraBtn.addEventListener("click", () => {
      executeWithSkipWarning(currentIndex, () => {
        cameraInput.click();
      });
    });
    
    cameraInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        processAndUploadPhoto(e.target.files[0], cameraBtn);
      }
    });
  }
}

function jumpToSpot(newIndex) {
  if (newIndex < 0 || newIndex >= currentSpots.length) return;
  
  if (currentSpots[currentIndex] && currentSpots[currentIndex].isScooterInfo) {
    uploadedSpotsMap[currentIndex] = "completed";
  }

  currentIndex = newIndex;
  photoUploadedForCurrentSpot = uploadedSpotsMap[currentIndex] === "completed"; 
  
  saveRouteProgress(); 
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
      const MAX_WIDTH = 1024; 
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
          uploadedSpotsMap[currentIndex] = "completed"; 
          skipReasonsMap[currentIndex] = ""; 
          
          saveRouteProgress(); 
          buttonElement.className = "btn btn--camera has-photo";
          buttonElement.textContent = "✅ Proof Photo Uploaded";
          renderList(); 

          setTimeout(() => {
            const isLast = currentIndex === currentSpots.length - 1;
            if (isLast) {
              sendRouteFinishedNotification(currentRegion, currentRoute);
              clearRouteProgress(); 
              showCompletion();
            } else {
              jumpToSpot(currentIndex + 1);
            }
          }, 600);
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
  const spot = currentSpots[currentIndex];
  const regionLabel = REGION_LABELS[currentRegion] || currentRegion;
  
  const captionText = `Route: ${regionLabel}\n` +
                      `Spot: ${spot.name}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CHAT_ID);
  formData.append("photo", imageBlob, "proof.jpg");
  formData.append("caption", captionText);

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
   7b. AUTOMATISCHE ABSCHLUSS-MELDUNG
===================================================== */
async function sendRouteFinishedNotification(regionKey, routeKey) {
  const finalRegion = REGION_LABELS[regionKey] || regionKey;

  let skippedCount = 0;
  let totalValidSpots = 0;

  currentSpots.forEach((spot, index) => {
    if (!spot.isScooterInfo && !spot.isBreak) {
      totalValidSpots++;
      const status = uploadedSpotsMap[index];
      if (status !== "completed") {
        skippedCount++;
      }
    }
  });

  const messageText = `🏁 Tour Completed\n\n` +
                      `Route: ${finalRegion}\n` +
                      `Skipped Spots: ${skippedCount}/${totalValidSpots}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: messageText })
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
  
  let context = "";
  if (currentRegion) {
    context = `[${REGION_LABELS[currentRegion] ?? currentRegion}${routeLabel ? " · " + routeLabel : ""}]\n`;
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
