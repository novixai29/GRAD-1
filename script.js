/* =========================================================
   GRAD-001 — GRADUATE ID
   Change client information ONLY here.
========================================================= */

const GRADUATION = {

  /* =========================
     Graduate
  ========================= */

  graduateName: "Mohammed Ahmed",

  degree: "Bachelor of Medicine",

  faculty: "College of Medicine",

  department: "",

  university: "University of Mosul",

  classYear: "Class of 2027",

  honors: "Academic Excellence",


  /* =========================
     Graduate ID
  ========================= */

  academicId: "UOM-2027-001",


  /* =========================
     Host
  ========================= */

  hostType: "graduate",

  hostName: "Mohammed Ahmed",


  /* =========================
     Main Message
  ========================= */

  tagline:
    "One chapter ends. Another begins.",


  /* =========================
     Date & Time
  ========================= */

  startAt:
    "2027-07-15T18:00:00+03:00",

  endAt:
    "2027-07-15T21:00:00+03:00",

  timeZone:
    "Asia/Baghdad",


  /* =========================
     Venue
  ========================= */

  venue:
    "Grand Celebration Hall",

  address:
    "Mosul, Nineveh",

  city:
    "Mosul",

  country:
    "Iraq",


  /* =========================
     Links
  ========================= */

  mapsUrl: "",

  universityUrl: "",

  shareUrl: "",


  /* =========================
     Image
  ========================= */

  portrait:
    "graduate-portrait.jpg"
};


/* =========================================================
   ELEMENTS
========================================================= */

const body =
  document.body;

const idCard =
  document.getElementById("idCard");

const idCardWrap =
  document.getElementById("idCardWrap");

const scanner =
  document.getElementById("scanner");

const scanButton =
  document.getElementById("scanButton");

const scanMessage =
  document.getElementById("scanMessage");

const consoleLed =
  document.getElementById("consoleLed");

const roleLabel =
  document.getElementById("roleLabel");

const statusText =
  document.getElementById("statusText");

const verificationLayer =
  document.getElementById("verificationLayer");

const unlockMessage =
  document.getElementById("unlockMessage");

const portrait =
  document.getElementById("graduatePortrait");

const portraitInitials =
  document.getElementById("portraitInitials");

const themeToggle =
  document.getElementById("themeToggle");

const themeToggleText =
  themeToggle.querySelector(".theme-toggle__text");

const mapsButton =
  document.getElementById("mapsButton");

const calendarButton =
  document.getElementById("calendarButton");

const shareButton =
  document.getElementById("shareButton");

const shareFeedback =
  document.getElementById("shareFeedback");

const honorsCard =
  document.getElementById("honorsCard");

const tabs =
  [...document.querySelectorAll(".experience-tab")];

const panels =
  [...document.querySelectorAll(".experience-panel")];

const reducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


/* =========================================================
   STATE
========================================================= */

let hasGraduated = false;

let scanRunning = false;

let countdownTimer = null;


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initialize
);


function initialize() {

  applyGraduateData();

  setupPortrait();

  setupDate();

  setupMaps();

  setupTabs();

  setupTheme();

  setupScanButton();

  setupShare();

  setupCalendar();

  setupCardTilt();

  startCountdown();

  if (reducedMotion) {
    showGraduateStateImmediately();
  }
}


/* =========================================================
   DYNAMIC CONTENT
========================================================= */

function applyGraduateData() {

  const fieldMap = {
    graduateName: GRADUATION.graduateName,
    degree: GRADUATION.degree,
    faculty: GRADUATION.faculty,
    university: GRADUATION.university,
    classYear: GRADUATION.classYear,
    honors: GRADUATION.honors,
    tagline: GRADUATION.tagline,
    venue: GRADUATION.venue
  };

  Object.entries(fieldMap).forEach(
    ([field, value]) => {

      document
        .querySelectorAll(
          `[data-field="${field}"]`
        )
        .forEach((element) => {

          element.textContent =
            value || "—";
        });
    }
  );


  document.getElementById(
    "academicId"
  ).textContent =
    GRADUATION.academicId;


  if (!GRADUATION.honors.trim()) {
    honorsCard.hidden = true;
  }


  const title =
    `${GRADUATION.graduateName} — Graduation Invitation`;

  document.title =
    title;


  const ogTitle =
    document.querySelector(
      'meta[property="og:title"]'
    );

  const ogDescription =
    document.querySelector(
      'meta[property="og:description"]'
    );

  if (ogTitle) {
    ogTitle.setAttribute(
      "content",
      title
    );
  }

  if (ogDescription) {

    ogDescription.setAttribute(
      "content",
      `Celebrate the graduation of ${GRADUATION.graduateName} — ${GRADUATION.classYear}.`
    );
  }
}


/* =========================================================
   PORTRAIT
========================================================= */

function setupPortrait() {

  portrait.src =
    GRADUATION.portrait;

  portrait.alt =
    `Portrait of ${GRADUATION.graduateName}`;


  portraitInitials.textContent =
    getInitials(
      GRADUATION.graduateName
    );


  portrait.addEventListener(
    "error",
    () => {

      portrait.style.display =
        "none";
    }
  );
}


function getInitials(name) {

  const parts =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (!parts.length) {
    return "GR";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[parts.length - 1][0]
  ).toUpperCase();
}


/* =========================================================
   DATE
========================================================= */

function setupDate() {

  const date =
    new Date(
      GRADUATION.startAt
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    console.error(
      "Invalid startAt date."
    );

    return;
  }


  const monthFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        month: "short",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const dayFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        day: "2-digit",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const yearFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const fullDateFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "en",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          GRADUATION.timeZone
      }
    );


  document.getElementById(
    "ceremonyMonth"
  ).textContent =
    monthFormatter
      .format(date)
      .toUpperCase();


  document.getElementById(
    "ceremonyDay"
  ).textContent =
    dayFormatter.format(date);


  document.getElementById(
    "ceremonyYear"
  ).textContent =
    yearFormatter.format(date);


  document.getElementById(
    "formattedDate"
  ).textContent =
    fullDateFormatter.format(date);


  document.getElementById(
    "formattedTime"
  ).textContent =
    timeFormatter.format(date);


  document.getElementById(
    "fullAddress"
  ).textContent =
    [
      GRADUATION.address,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");
}


/* =========================================================
   GOOGLE MAPS
========================================================= */

function setupMaps() {

  mapsButton.href =
    getMapsUrl();
}


function getMapsUrl() {

  if (
    GRADUATION.mapsUrl &&
    GRADUATION.mapsUrl.trim()
  ) {

    return GRADUATION.mapsUrl;
  }


  const query =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );
}


/* =========================================================
   TABS
========================================================= */

function setupTabs() {

  tabs.forEach(
    (tab) => {

      tab.addEventListener(
        "click",
        () => {

          const target =
            tab.dataset.tab;

          activatePanel(
            target
          );
        }
      );
    }
  );
}


function activatePanel(name) {

  tabs.forEach(
    (tab) => {

      const active =
        tab.dataset.tab === name;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        String(active)
      );
    }
  );


  panels.forEach(
    (panel) => {

      panel.classList.toggle(
        "is-active",
        panel.dataset.panel === name
      );
    }
  );
}


/* =========================================================
   THEME
========================================================= */

function setupTheme() {

  const savedTheme =
    localStorage.getItem(
      "graduate-id-theme"
    );


  if (savedTheme === "light") {
    enableLightTheme();
  }


  themeToggle.addEventListener(
    "click",
    () => {

      const isLight =
        body.classList.contains(
          "light-theme"
        );

      if (isLight) {
        enableDarkTheme();
      } else {
        enableLightTheme();
      }
    }
  );
}


function enableLightTheme() {

  body.classList.add(
    "light-theme"
  );

  themeToggleText.textContent =
    "DARK";

  themeToggle.setAttribute(
    "aria-pressed",
    "true"
  );

  localStorage.setItem(
    "graduate-id-theme",
    "light"
  );
}


function enableDarkTheme() {

  body.classList.remove(
    "light-theme"
  );

  themeToggleText.textContent =
    "LIGHT";

  themeToggle.setAttribute(
    "aria-pressed",
    "false"
  );

  localStorage.setItem(
    "graduate-id-theme",
    "dark"
  );
}


/* =========================================================
   SCAN BUTTON
========================================================= */

function setupScanButton() {

  scanButton.addEventListener(
    "click",
    () => {

      if (scanRunning) {
        return;
      }


      if (hasGraduated) {
        replayScan();
        return;
      }


      runGraduateScan();
    }
  );
}


/* =========================================================
   SCAN ANIMATION
========================================================= */

function runGraduateScan() {

  if (
    reducedMotion ||
    typeof gsap === "undefined"
  ) {

    showGraduateStateImmediately();
    return;
  }


  scanRunning = true;

  scanButton.disabled = true;

  consoleLed.classList.remove(
    "is-success"
  );

  consoleLed.classList.add(
    "is-processing"
  );

  scanMessage.textContent =
    "Scanning academic identity...";


  const timeline =
    gsap.timeline({
      defaults: {
        ease: "power2.inOut"
      },

      onComplete: () => {

        scanRunning = false;

        hasGraduated = true;

        scanButton.disabled = false;

        scanButton
          .querySelector("span")
          .textContent =
            "REPLAY VERIFICATION";
      }
    });


  timeline

    .set(
      scanner,
      {
        xPercent: 0,
        opacity: 1
      }
    )

    .to(
      idCard,
      {
        rotateY: -3,
        rotateX: 1.5,
        duration: 0.5
      },
      0
    )

    .to(
      scanner,
      {
        x: () =>
          idCard.offsetWidth * 1.25,

        duration: 1.6,

        ease: "power1.inOut"
      },
      0.15
    )

    .to(
      ".portrait-scan",
      {
        y: "110%",
        duration: 1.3,
        ease: "power1.inOut"
      },
      0.28
    )

    .call(
      () => {

        scanMessage.textContent =
          "Academic record located...";
      },
      null,
      0.72
    )

    .call(
      () => {

        scanMessage.textContent =
          "Verifying graduation requirements...";
      },
      null,
      1.23
    )

    .to(
      scanner,
      {
        opacity: 0,
        duration: 0.18
      },
      1.68
    )

    .to(
      verificationLayer,
      {
        autoAlpha: 1,
        duration: 0.3
      },
      1.82
    )

    .fromTo(
      ".verification-check svg",
      {
        scale: 0.65,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.35,
        ease: "back.out(1.8)"
      },
      1.94
    )

    .call(
      () => {

        scanMessage.textContent =
          "Academic requirements verified.";
      },
      null,
      2.05
    )

    .to(
      verificationLayer,
      {
        autoAlpha: 0,
        duration: 0.35
      },
      2.55
    )

    .to(
      idCard,
      {
        rotateY: 8,
        scale: 0.97,
        duration: 0.32
      },
      2.57
    )

    .call(
      activateGraduateState,
      null,
      2.72
    )

    .to(
      idCard,
      {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.62,
        ease: "back.out(1.45)"
      },
      2.75
    )

    .fromTo(
      statusText,
      {
        opacity: 0,
        y: 8
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.34
      },
      2.82
    )

    .fromTo(
      roleLabel,
      {
        opacity: 0,
        y: 5
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.34
      },
      2.88
    )

    .call(
      () => {

        consoleLed.classList.remove(
          "is-processing"
        );

        consoleLed.classList.add(
          "is-success"
        );

        scanMessage.textContent =
          "Graduate identity verified.";
      },
      null,
      3.1
    )

    .fromTo(
      unlockMessage,
      {
        opacity: 0.38,
        y: 18
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.55
      },
      3.14
    );
}


/* =========================================================
   GRADUATE STATE
========================================================= */

function activateGraduateState() {

  idCard.classList.add(
    "is-graduate"
  );

  statusText.textContent =
    "GRADUATE";

  roleLabel.textContent =
    "GRADUATE";

  unlockMessage.classList.add(
    "is-unlocked"
  );
}


function showGraduateStateImmediately() {

  activateGraduateState();

  hasGraduated = true;

  scanMessage.textContent =
    "Graduate identity verified.";

  consoleLed.classList.add(
    "is-success"
  );

  scanButton
    .querySelector("span")
    .textContent =
      "GRADUATE ID VERIFIED";
}


/* =========================================================
   REPLAY SCAN
========================================================= */

function replayScan() {

  if (reducedMotion) {
    return;
  }


  hasGraduated = false;

  idCard.classList.remove(
    "is-graduate"
  );

  statusText.textContent =
    "STUDENT";

  roleLabel.textContent =
    "STUDENT";

  unlockMessage.classList.remove(
    "is-unlocked"
  );

  consoleLed.classList.remove(
    "is-success"
  );

  scanButton
    .querySelector("span")
    .textContent =
      "SCAN GRADUATE ID";


  gsap.set(
    ".portrait-scan",
    {
      y: "-110%"
    }
  );


  runGraduateScan();
}


/* =========================================================
   CARD TILT
========================================================= */

function setupCardTilt() {

  if (
    reducedMotion ||
    !window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {

    return;
  }


  idCardWrap.addEventListener(
    "mousemove",
    (event) => {

      if (scanRunning) {
        return;
      }


      const rect =
        idCardWrap.getBoundingClientRect();


      const x =
        (
          event.clientX -
          rect.left
        ) /
        rect.width;


      const y =
        (
          event.clientY -
          rect.top
        ) /
        rect.height;


      const rotateY =
        (x - 0.5) * 8;


      const rotateX =
        (0.5 - y) * 5;


      idCard.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  );


  idCardWrap.addEventListener(
    "mouseleave",
    () => {

      if (scanRunning) {
        return;
      }

      idCard.style.transform =
        "rotateX(0deg) rotateY(0deg)";
    }
  );
}


/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

  updateCountdown();

  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );
}


function updateCountdown() {

  const start =
    new Date(
      GRADUATION.startAt
    ).getTime();


  const end =
    new Date(
      GRADUATION.endAt
    ).getTime();


  const now =
    Date.now();


  const daysEl =
    document.getElementById("days");

  const hoursEl =
    document.getElementById("hours");

  const minutesEl =
    document.getElementById("minutes");

  const secondsEl =
    document.getElementById("seconds");

  const accessStatus =
    document.getElementById("accessStatus");

  const progressBar =
    document.getElementById(
      "statusProgressBar"
    );


  if (
    Number.isNaN(start) ||
    Number.isNaN(end)
  ) {

    return;
  }


  if (now >= end) {

    daysEl.textContent =
      "00";

    hoursEl.textContent =
      "00";

    minutesEl.textContent =
      "00";

    secondsEl.textContent =
      "00";

    accessStatus.textContent =
      "COMPLETED";

    progressBar.style.width =
      "100%";

    clearInterval(
      countdownTimer
    );

    return;
  }


  if (
    now >= start &&
    now < end
  ) {

    daysEl.textContent =
      "00";

    hoursEl.textContent =
      "00";

    minutesEl.textContent =
      "00";

    secondsEl.textContent =
      "00";

    accessStatus.textContent =
      "ACTIVE";

    progressBar.style.width =
      "100%";

    return;
  }


  const difference =
    start - now;


  const days =
    Math.floor(
      difference /
      86400000
    );


  const hours =
    Math.floor(
      (
        difference %
        86400000
      ) /
      3600000
    );


  const minutes =
    Math.floor(
      (
        difference %
        3600000
      ) /
      60000
    );


  const seconds =
    Math.floor(
      (
        difference %
        60000
      ) /
      1000
    );


  daysEl.textContent =
    pad(days);

  hoursEl.textContent =
    pad(hours);

  minutesEl.textContent =
    pad(minutes);

  secondsEl.textContent =
    pad(seconds);


  accessStatus.textContent =
    "SCHEDULED";


  /*
    Visual progress only.
    The last 30 days before the ceremony
    fill the progress bar progressively.
  */

  const thirtyDays =
    30 *
    86400000;


  const remainingRatio =
    Math.min(
      1,
      difference /
      thirtyDays
    );


  const progress =
    Math.max(
      8,
      (1 - remainingRatio) * 100
    );


  progressBar.style.width =
    `${progress}%`;
}


function pad(value) {

  return String(value)
    .padStart(2, "0");
}


/* =========================================================
   CALENDAR / ICS
========================================================= */

function setupCalendar() {

  calendarButton.addEventListener(
    "click",
    downloadICS
  );
}


function downloadICS() {

  const start =
    new Date(
      GRADUATION.startAt
    );

  const end =
    new Date(
      GRADUATION.endAt
    );


  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {

    return;
  }


  const title =
    `${GRADUATION.graduateName} Graduation Celebration`;


  const location =
    [
      GRADUATION.venue,
      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      `Graduation celebration for ${GRADUATION.graduateName}.`,
      GRADUATION.degree,
      GRADUATION.university,
      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//InviteUs//Graduate ID//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@inviteus.party
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${escapeICS(title)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [ics],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(blob);


  const anchor =
    document.createElement("a");


  anchor.href =
    url;

  anchor.download =
    `${slugify(
      GRADUATION.graduateName
    )}-graduation.ics`;


  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();


  URL.revokeObjectURL(
    url
  );
}


function formatICSDate(date) {

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}


function escapeICS(value = "") {

  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}


function slugify(value = "") {

  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    ) || "graduation";
}


/* =========================================================
   SHARE
========================================================= */

function setupShare() {

  shareButton.addEventListener(
    "click",
    shareInvitation
  );
}


async function shareInvitation() {

  const url =
    getShareUrl();


  const title =
    `${GRADUATION.graduateName} — Graduation Invitation`;


  const text =
    `You are invited to celebrate the graduation of ${GRADUATION.graduateName}, ${GRADUATION.classYear}.`;


  try {

    if (
      navigator.share
    ) {

      await navigator.share({
        title,
        text,
        url
      });

      showShareFeedback(
        "Invitation shared successfully."
      );

      return;
    }


    await navigator.clipboard.writeText(
      url
    );


    showShareFeedback(
      "Invitation link copied."
    );

  } catch (error) {

    if (
      error?.name ===
      "AbortError"
    ) {
      return;
    }


    try {

      fallbackCopy(url);

      showShareFeedback(
        "Invitation link copied."
      );

    } catch {

      showShareFeedback(
        "Copy the invitation link from your browser."
      );
    }
  }
}


function getShareUrl() {

  if (
    GRADUATION.shareUrl &&
    GRADUATION.shareUrl.trim()
  ) {

    return GRADUATION.shareUrl;
  }


  return window.location.href;
}


function fallbackCopy(text) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;

  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";

  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();

  document.execCommand(
    "copy"
  );


  textarea.remove();
}


function showShareFeedback(message) {

  shareFeedback.textContent =
    message;


  window.clearTimeout(
    showShareFeedback.timer
  );


  showShareFeedback.timer =
    window.setTimeout(
      () => {

        shareFeedback.textContent =
          "";
      },
      3500
    );
}
