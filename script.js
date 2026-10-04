/* =========================================================
   GRAD-001 — GRADUATE ID
   CONFIGURATION
========================================================= */

const GRADUATION = {

  graduateName: "عمر الكريم",

  degree: "بكالوريوس طب وجراحة عامة",

  faculty: "كلية الطب",

  department: "",

  university: "جامعة الموصل",

  classYear: "دفعة ٢٠٢٧",

  honors: "",

  hostType: "family",

  hostName: "عائلة الكريم",

  tagline: "فصل انتهى، وآخر يبدأ.",

  startAt: "2027-07-15T18:00:00+03:00",

  endAt: "2027-07-15T21:00:00+03:00",

  timeZone: "Asia/Baghdad",

  venue: "القاعة الكبرى للاحتفالات",

  address: "الموصل، نينوى",

  city: "الموصل",

  country: "العراق",

  mapsUrl: "",

  universityUrl: "",

  shareUrl: "",

  universityLogo: ""

};



/* =========================================================
   DOM
========================================================= */

const qs = (selector, parent = document) =>
  parent.querySelector(selector);

const qsa = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];


const cardInner =
  qs("#cardInner");

const scannerSvg =
  qs("#scannerSvg");

const scanLine =
  qs("#scanLine");

const verifyButton =
  qs("#verifyButton");

const verifyText =
  qs("#verifyText");

const verifyIcon =
  qs("#verifyIcon");

const scanMessage =
  qs("#scanMessage");

const invitationPanel =
  qs("#invitationPanel");

const mapsButton =
  qs("#mapsButton");

const calendarButton =
  qs("#calendarButton");

const shareButton =
  qs("#shareButton");

const shareFeedback =
  qs("#shareFeedback");


const countdownElements = {

  days:
    qs("#days"),

  hours:
    qs("#hours"),

  minutes:
    qs("#minutes"),

  seconds:
    qs("#seconds")

};


let verificationComplete = false;



/* =========================================================
   HELPERS
========================================================= */

function escapeICS(text = "") {

  return String(text)

    .replace(/\\/g, "\\\\")

    .replace(/\n/g, "\\n")

    .replace(/,/g, "\\,")

    .replace(/;/g, "\\;");

}



function formatArabicNumber(
  value,
  minimumIntegerDigits = 1
) {

  return new Intl.NumberFormat(
    "ar-IQ",
    {
      minimumIntegerDigits,
      useGrouping: false
    }
  ).format(value);

}



function parseDate(value) {

  const date =
    new Date(value);

  return Number.isNaN(
    date.getTime()
  )
    ? null
    : date;

}



function getInvitationUrl() {

  return (
    GRADUATION.shareUrl ||
    window.location.href
  );

}



/* =========================================================
   DYNAMIC CONTENT
========================================================= */

function applyGraduationData() {

  qsa(
    "[data-graduation]"
  ).forEach((element) => {

    const key =
      element.dataset.graduation;

    const value =
      GRADUATION[key];

    if (
      value !== undefined &&
      value !== null
    ) {

      element.textContent =
        value;

    }

  });


  handleOptionalFields();

  updateHostText();

  updateEventInformation();

  updateUniversityLogo();

  updateMapsLink();

  updateMetadata();

}



function handleOptionalFields() {

  qsa(
    "[data-optional]"
  ).forEach((element) => {

    const key =
      element.dataset.optional;

    const value =
      GRADUATION[key];

    element.hidden =
      !value;

  });

}



/* =========================================================
   HOST
========================================================= */

function updateHostText() {

  const hostLine =
    qs("#hostLine");

  if (!hostLine) {
    return;
  }


  let text =
    "يسرنا دعوتكم لمشاركتنا فرحة التخرج";


  switch (
    GRADUATION.hostType
  ) {

    case "graduate":

      text =
        `يسر ${GRADUATION.graduateName} دعوتكم لمشاركته فرحة التخرج`;

      break;


    case "family":

      text =
        `بكل الفخر والسرور تدعوكم ${GRADUATION.hostName || "العائلة"}`;

      break;


    case "parents":

      text =
        `بكل الفخر والسرور يدعوكم ${GRADUATION.hostName || "والدا الخريج"}`;

      break;


    case "institution":

      text =
        `يسر ${GRADUATION.hostName || GRADUATION.university} دعوتكم`;

      break;


    case "class":

      text =
        `تدعوكم ${GRADUATION.hostName || GRADUATION.classYear} لمشاركتها فرحة التخرج`;

      break;

  }


  hostLine.textContent =
    text;

}



/* =========================================================
   DATE / TIME
========================================================= */

function updateEventInformation() {

  const start =
    parseDate(
      GRADUATION.startAt
    );

  const end =
    parseDate(
      GRADUATION.endAt
    );


  if (!start) {
    return;
  }


  const dateFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ-u-ca-gregory",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone:
          GRADUATION.timeZone
      }
    );


  const timeFormatter =
    new Intl.DateTimeFormat(
      "ar-IQ",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone:
          GRADUATION.timeZone
      }
    );


  const dateElement =
    qs("#eventDate");

  const timeElement =
    qs("#eventTime");

  const addressElement =
    qs("#eventAddress");


  if (dateElement) {

    dateElement.textContent =
      dateFormatter.format(start);

  }


  if (timeElement) {

    let text =
      timeFormatter.format(start);

    if (end) {

      text +=
        ` — ${timeFormatter.format(end)}`;

    }

    timeElement.textContent =
      text;

  }


  if (addressElement) {

    const addressParts = [

      GRADUATION.address,
      GRADUATION.city,
      GRADUATION.country

    ].filter(Boolean);


    addressElement.textContent =
      [...new Set(addressParts)]
        .join("، ");

  }

}



/* =========================================================
   UNIVERSITY LOGO
========================================================= */

function updateUniversityLogo() {

  const image =
    qs("#universityLogoStudent");

  const fallback =
    qs(".seal-fallback");


  if (
    !image ||
    !fallback
  ) {
    return;
  }


  if (
    !GRADUATION.universityLogo
  ) {

    image.hidden = true;

    fallback.hidden = false;

    return;

  }


  image.src =
    GRADUATION.universityLogo;

  image.alt =
    `شعار ${GRADUATION.university}`;

  image.hidden = false;

  fallback.hidden = true;


  image.addEventListener(
    "error",
    () => {

      image.hidden = true;

      fallback.hidden = false;

    },
    {
      once: true
    }
  );

}



/* =========================================================
   GOOGLE MAPS
========================================================= */

function getMapsUrl() {

  if (
    GRADUATION.mapsUrl
  ) {

    return GRADUATION.mapsUrl;

  }


  const query = [

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



function updateMapsLink() {

  if (!mapsButton) {
    return;
  }


  mapsButton.href =
    getMapsUrl();

}



/* =========================================================
   META / SEO
========================================================= */

function setMeta(
  selector,
  content
) {

  const element =
    qs(selector);

  if (
    element &&
    content
  ) {

    element.setAttribute(
      "content",
      content
    );

  }

}



function updateMetadata() {

  const title =
    `دعوة تخرج ${GRADUATION.graduateName} | ${GRADUATION.classYear}`;


  const description =
    `يسرنا دعوتكم لمشاركة ${GRADUATION.graduateName} فرحة التخرج من ${GRADUATION.university}.`;


  document.title =
    title;


  setMeta(
    'meta[name="description"]',
    description
  );


  setMeta(
    'meta[property="og:title"]',
    title
  );


  setMeta(
    'meta[property="og:description"]',
    description
  );


  setMeta(
    'meta[name="twitter:title"]',
    title
  );


  setMeta(
    'meta[name="twitter:description"]',
    description
  );

}



/* =========================================================
   COUNTDOWN
========================================================= */

function updateCountdown() {

  const targetDate =
    parseDate(
      GRADUATION.startAt
    );


  if (!targetDate) {
    return;
  }


  const now =
    Date.now();

  const difference =
    targetDate.getTime() -
    now;


  if (
    difference <= 0
  ) {

    countdownElements.days.textContent =
      "٠٠";

    countdownElements.hours.textContent =
      "٠٠";

    countdownElements.minutes.textContent =
      "٠٠";

    countdownElements.seconds.textContent =
      "٠٠";

    return;

  }


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  const days =
    Math.floor(
      totalSeconds / 86400
    );


  const hours =
    Math.floor(
      (totalSeconds % 86400) /
      3600
    );


  const minutes =
    Math.floor(
      (totalSeconds % 3600) /
      60
    );


  const seconds =
    totalSeconds % 60;


  countdownElements.days.textContent =
    formatArabicNumber(
      days,
      2
    );


  countdownElements.hours.textContent =
    formatArabicNumber(
      hours,
      2
    );


  countdownElements.minutes.textContent =
    formatArabicNumber(
      minutes,
      2
    );


  countdownElements.seconds.textContent =
    formatArabicNumber(
      seconds,
      2
    );

}



function startCountdown() {

  updateCountdown();

  window.setInterval(
    updateCountdown,
    1000
  );

}



/* =========================================================
   CALENDAR / ICS
========================================================= */

function toICSDate(
  dateString
) {

  const date =
    parseDate(dateString);


  if (!date) {
    return "";
  }


  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

}



function createICS() {

  const start =
    toICSDate(
      GRADUATION.startAt
    );

  const end =
    toICSDate(
      GRADUATION.endAt
    );


  if (!start) {

    alert(
      "تعذر إنشاء ملف التقويم."
    );

    return;

  }


  const title =
    `حفل تخرج ${GRADUATION.graduateName}`;


  const location = [

    GRADUATION.venue,
    GRADUATION.address,
    GRADUATION.city,
    GRADUATION.country

  ]
    .filter(Boolean)
    .join("، ");


  const description =
    [
      `حفل تخرج ${GRADUATION.graduateName}`,
      GRADUATION.degree,
      GRADUATION.university,
      getInvitationUrl()
    ]
      .filter(Boolean)
      .join("\\n");


  const lines = [

    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteUs//Graduation Invitation//AR",
    "CALSCALE:GREGORIAN",

    "BEGIN:VEVENT",

    `UID:${Date.now()}@inviteus.party`,

    `DTSTAMP:${toICSDate(
      new Date().toISOString()
    )}`,

    `DTSTART:${start}`,

    end
      ? `DTEND:${end}`
      : "",

    `SUMMARY:${escapeICS(
      title
    )}`,

    `DESCRIPTION:${escapeICS(
      description
    )}`,

    `LOCATION:${escapeICS(
      location
    )}`,

    `URL:${escapeICS(
      getInvitationUrl()
    )}`,

    "END:VEVENT",
    "END:VCALENDAR"

  ].filter(Boolean);


  const blob =
    new Blob(
      [
        lines.join(
          "\r\n"
        )
      ],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const anchor =
    document.createElement(
      "a"
    );


  anchor.href =
    url;

  anchor.download =
    `graduation-${GRADUATION.graduateName}.ics`;

  document.body.appendChild(
    anchor
  );

  anchor.click();

  anchor.remove();


  window.setTimeout(
    () =>
      URL.revokeObjectURL(
        url
      ),
    1000
  );

}



/* =========================================================
   SHARE
========================================================= */

async function shareInvitation() {

  const shareData = {

    title:
      `دعوة تخرج ${GRADUATION.graduateName}`,

    text:
      `يسرنا دعوتكم لمشاركة ${GRADUATION.graduateName} فرحة التخرج.`,

    url:
      getInvitationUrl()

  };


  try {

    if (
      navigator.share
    ) {

      await navigator.share(
        shareData
      );

      return;

    }


    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        shareData.url
      );


      showShareFeedback(
        "تم نسخ رابط الدعوة."
      );

      return;

    }


    fallbackCopy(
      shareData.url
    );

  }
  catch (error) {

    if (
      error &&
      error.name === "AbortError"
    ) {
      return;
    }


    fallbackCopy(
      shareData.url
    );

  }

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


  try {

    document.execCommand(
      "copy"
    );

    showShareFeedback(
      "تم نسخ رابط الدعوة."
    );

  }
  catch {

    showShareFeedback(
      "انسخ رابط الصفحة من المتصفح لمشاركة الدعوة."
    );

  }


  textarea.remove();

}



function showShareFeedback(
  message
) {

  if (!shareFeedback) {
    return;
  }


  shareFeedback.textContent =
    message;


  window.setTimeout(
    () => {

      shareFeedback.textContent =
        "";

    },
    3500
  );

}



/* =========================================================
   REDUCED MOTION
========================================================= */

const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );



function shouldReduceMotion() {

  return reduceMotion.matches;

}



/* =========================================================
   VERIFICATION FALLBACK
========================================================= */

function completeWithoutAnimation() {

  if (
    verificationComplete
  ) {
    return;
  }


  verificationComplete = true;


  cardInner.style.transform =
    "rotateY(180deg)";


  scannerSvg.style.opacity =
    "0";


  verifyText.textContent =
    "تم اعتماد حالة الخريج";


  verifyIcon.textContent =
    "✓";


  verifyButton.disabled =
    true;


  verifyButton
    .querySelector("span")
    .textContent =
      "تم التحقق بنجاح";


  scanMessage.textContent =
    "تم تحديث الحالة الأكاديمية إلى خريج";


  invitationPanel.scrollIntoView({
    behavior:
      shouldReduceMotion()
        ? "auto"
        : "smooth",

    block: "start"
  });

}



/* =========================================================
   GSAP ID TRANSFORMATION
========================================================= */

function runVerificationAnimation() {

  if (
    verificationComplete
  ) {
    return;
  }


  if (
    shouldReduceMotion() ||
    typeof window.gsap === "undefined"
  ) {

    completeWithoutAnimation();

    return;

  }


  verificationComplete = true;


  const gsap =
    window.gsap;


  verifyButton.disabled =
    true;


  verifyText.textContent =
    "جارٍ التحقق من السجل الأكاديمي";


  scanMessage.textContent =
    "مطابقة بيانات الهوية...";


  const timeline =
    gsap.timeline({

      defaults: {
        ease:
          "power2.inOut"
      }

    });


  timeline

    .set(
      scannerSvg,
      {
        opacity: 1
      }
    )


    .set(
      scanLine,
      {
        attr: {
          y1: 10,
          y2: 10
        }
      }
    )


    .to(
      scanLine,
      {
        duration: 1.65,

        attr: {
          y1: 148,
          y2: 148
        },

        ease: "none"
      }
    )


    .to(
      ".student-face",
      {
        duration: 0.18,
        filter:
          "brightness(1.18)"
      },
      "-=0.15"
    )


    .to(
      ".student-face",
      {
        duration: 0.3,
        filter:
          "brightness(1)"
      }
    )


    .add(() => {

      scanMessage.textContent =
        "تم العثور على النتيجة النهائية";

      verifyText.textContent =
        "تم استيفاء جميع متطلبات التخرج";

    })


    .to(
      scannerSvg,
      {
        duration: 0.25,
        opacity: 0
      }
    )


    .to(
      "#idCard",
      {
        duration: 0.36,
        scale: 0.94,
        rotateZ: -1.2,

        ease:
          "power2.in"
      }
    )


    .to(
      cardInner,
      {
        duration: 0.9,

        rotateY: 180,

        ease:
          "power4.inOut"
      }
    )


    .to(
      "#idCard",
      {
        duration: 0.48,

        scale: 1,
        rotateZ: 0,

        ease:
          "back.out(1.25)"
      },
      "-=0.25"
    )


    .from(
      ".graduate-seal",
      {
        duration: 0.5,

        scale: 0.4,
        opacity: 0,

        ease:
          "back.out(1.8)"
      },
      "-=0.2"
    )


    .from(
      ".seal-check",
      {
        duration: 0.55,

        strokeDasharray: 80,
        strokeDashoffset: 80,

        ease:
          "power2.out"
      },
      "-=0.32"
    )


    .from(
      ".graduate-title > *",
      {
        duration: 0.48,

        y: 14,
        opacity: 0,

        stagger: 0.08
      },
      "-=0.22"
    )


    .from(
      ".graduate-data-grid > div",
      {
        duration: 0.38,

        y: 12,
        opacity: 0,

        stagger: 0.08
      },
      "-=0.28"
    )


    .add(() => {

      verifyText.textContent =
        "تم اعتماد حالة الخريج";

      verifyIcon.textContent =
        "✓";


      verifyButton
        .querySelector("span")
        .textContent =
          "تم التحقق بنجاح";


      scanMessage.textContent =
        "الحالة الأكاديمية الجديدة: خريج";

    })


    .to(
      "#verifyPanel",
      {
        duration: 0.45,

        borderColor:
          "rgba(97, 227, 167, 0.28)"
      }
    )


    .to(
      {},
      {
        duration: 0.55
      }
    )


    .add(() => {

      invitationPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

}



/* =========================================================
   SUBTLE CARD TILT
========================================================= */

function setupCardTilt() {

  if (
    shouldReduceMotion() ||
    typeof window.gsap === "undefined"
  ) {

    return;

  }


  const card =
    qs("#idCard");


  if (!card) {
    return;
  }


  const canHover =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (!canHover) {
    return;
  }


  card.addEventListener(
    "pointermove",
    (event) => {

      const rect =
        card.getBoundingClientRect();


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
        (x - 0.5) * 5;


      const rotateX =
        (0.5 - y) * 5;


      window.gsap.to(
        card,
        {
          rotateX,
          rotateY,

          duration: 0.35,

          transformPerspective:
            1200,

          ease:
            "power2.out"
        }
      );

    }
  );


  card.addEventListener(
    "pointerleave",
    () => {

      window.gsap.to(
        card,
        {
          rotateX: 0,
          rotateY: 0,

          duration: 0.55,

          ease:
            "power3.out"
        }
      );

    }
  );

}



/* =========================================================
   INTRO ANIMATION
========================================================= */

function runIntroAnimation() {

  if (
    shouldReduceMotion() ||
    typeof window.gsap === "undefined"
  ) {

    return;

  }


  const gsap =
    window.gsap;


  gsap
    .timeline({

      defaults: {
        ease:
          "power3.out"
      }

    })

    .from(
      ".hero-header",
      {
        y: 15,
        opacity: 0,
        duration: 0.6
      }
    )

    .from(
      "#idCard",
      {
        y: 30,
        opacity: 0,
        scale: 0.97,

        duration: 0.85
      },
      "-=0.3"
    )

    .from(
      "#verifyPanel",
      {
        y: 15,
        opacity: 0,

        duration: 0.5
      },
      "-=0.3"
    );

}



/* =========================================================
   INVITATION REVEAL
========================================================= */

function setupInvitationReveal() {

  if (
    shouldReduceMotion() ||
    typeof window.gsap === "undefined"
  ) {
    return;
  }


  const gsap =
    window.gsap;


  const observer =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            const element =
              entry.target;


            gsap.fromTo(
              element,
              {
                y: 28,
                opacity: 0
              },
              {
                y: 0,
                opacity: 1,

                duration: 0.7,

                ease:
                  "power3.out"
              }
            );


            observer.unobserve(
              element
            );

          }
        );

      },
      {
        threshold: 0.12
      }
    );


  qsa(
    [
      ".invitation-header",
      ".invitation-intro",
      ".credential-detail-card",
      ".event-section",
      ".countdown-section",
      ".actions-section",
      ".final-footer"
    ].join(",")
  ).forEach(
    (element) => {

      observer.observe(
        element
      );

    }
  );

}



/* =========================================================
   EVENTS
========================================================= */

function bindEvents() {

  verifyButton?.addEventListener(
    "click",
    runVerificationAnimation
  );


  calendarButton?.addEventListener(
    "click",
    createICS
  );


  shareButton?.addEventListener(
    "click",
    shareInvitation
  );

}



/* =========================================================
   INITIALIZE
========================================================= */

function initialize() {

  applyGraduationData();

  startCountdown();

  bindEvents();

  runIntroAnimation();

  setupCardTilt();

  setupInvitationReveal();

}



if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );

}
else {

  initialize();

}
