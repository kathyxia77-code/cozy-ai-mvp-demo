function lottieMedia(name) {
  return {
    type: "lottie",
    src: `./assets/${name}.json`,
    width: 1206,
    height: 1380,
    poster: "./assets/momcozy-phone.png",
    fallback: "./assets/momcozy-phone.png",
  };
}

const guides = [
  {
    title: "Home: Your Daily Hub",
    updates: "3 New Updates",
    tagTint: "pink",
    cover: "./assets/momcozy-cover-pink.png",
    detailTitle: "What's on Home?",
    detailText:
      "Everything you use most lives right on Home. Your records, reminders, and personalized Tips are always within reach. Check your current stage, upcoming activities, explore AI Lactation Plan and AI Sleep Prediction, and discover curated articles and products—all from one place.",
    detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
    slides: [
      {
        detailTitle: "What's on Home?",
        detailText:
          "Everything you use most lives right on Home. Your records, reminders, and personalized Tips are always within reach. Check your current stage, upcoming activities, explore AI Lactation Plan and AI Sleep Prediction, and discover curated articles and products—all from one place.",
        detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
        media: {
          ...lottieMedia("1.1"),
        },
      },
      {
        detailTitle: "AI Tips",
        detailText:
          "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
        detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
        media: {
          ...lottieMedia("1.2"),
        },
      },
      {
        detailTitle: "Quick Logging",
        detailText:
          "The things you track most—pumping, feeding, sleep, and more—are now right on Home. Simply tap a card to quickly add a new record.",
        media: {
          ...lottieMedia("1.3"),
        },
      },
    ],
  },
  {
    title: "Daily Check-ins: All Your Records in One Place",
    updates: "2 New Updates",
    tagTint: "yellow",
    cover: "./assets/momcozy-cover-purple.png",
    detailTitle: "AI Tips",
    detailText:
      "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
    detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
    slides: [
      {
        detailTitle: "Daily Check-ins",
        detailText:
          "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
        detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
        media: {
          ...lottieMedia("2.1"),
        },
      },
      {
        detailTitle: "All Your Records in One Place",
        detailText:
          "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
        detailNote: "For informational purposes only. Always follow your healthcare provider's advice.",
        media: {
          ...lottieMedia("2.2"),
        },
      },
    ],
  },
  {
    title: "Reminder: Stay on Top of Everyday Tasks",
    updates: "1 New Updates",
    tagTint: "pink",
    cover: "./assets/momcozy-cover-pink.png",
    detailTitle: "Quick Logging",
    detailText:
      "The things you track most—pumping, feeding, sleep, and more—are now right on Home. Simply tap a card to quickly add a new record.",
    slides: [
      {
        detailTitle: "Quick Logging",
        detailText:
          "The things you track most—pumping, feeding, sleep, and more—are now right on Home. Simply tap a card to quickly add a new record.",
        media: {
          ...lottieMedia("3.1"),
        },
      },
    ],
  },
  {
    title: "Personalized Support: AI Lactation Plan &AI Sleep Prediction",
    updates: "2 New Updates",
    tagTint: "yellow",
    cover: "./assets/momcozy-cover-purple.png",
    detailTitle: "AI Tips",
    detailText:
      "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
    slides: [
      {
        detailTitle: "AI Lactation Plan",
        detailText:
          "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
        media: {
          ...lottieMedia("4.1"),
        },
      },
      {
        detailTitle: "AI Sleep Prediction",
        detailText:
          "AI Tips are personalized to your current stage and updated daily with content that's relevant to you right now.\n\nTap FOR YOU, BABY CARE, or BREASTFEEDING to switch categories. From TTC to pregnancy to postpartum, your Tips evolve along with your journey.",
        media: {
          ...lottieMedia("4.2"),
        },
      },
    ],
  },
  {
    title: "Devices: Everything Connected in One Place",
    updates: "1 New Updates",
    tagTint: "pink",
    cover: "./assets/momcozy-cover-pink.png",
    detailTitle: "Quick Logging",
    detailText:
      "The things you track most—pumping, feeding, sleep, and more—are now right on Home. Simply tap a card to quickly add a new record.",
    slides: [
      {
        detailTitle: "Quick Logging",
        detailText:
          "The things you track most—pumping, feeding, sleep, and more—are now right on Home. Simply tap a card to quickly add a new record.",
        media: {
          ...lottieMedia("5.1"),
        },
      },
    ],
  },
];

const faqs = [
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title This is a chapter title This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
  {
    title: "This is a chapter title",
    text:
      "The weeks after birth are a full-body reset — physical, emotional, hormonal. Some changes are expected and healthy; others are signals to reach out for support.",
  },
];

const app = document.querySelector(".app");
const listScreen = document.querySelector("#listScreen");
const listTopbar = document.querySelector("#listTopbar");
const detailScreen = document.querySelector("#detailScreen");
const guideList = document.querySelector("#guideList");
const faqList = document.querySelector("#faqList");
const slides = document.querySelector("#slides");
const dots = document.querySelector("#progressDots");
const detailFooter = document.querySelector(".detail-footer");
const carousel = document.querySelector("#carousel");
const backButton = document.querySelector("#backButton");
const detailNavTitle = document.querySelector(".detail-nav h2");
const detailBackground = document.querySelector("#detailBackground");
const themeToggle = document.querySelector("#themeToggle");

const SHARED_TRANSITION_MS = 500;
const SHARED_LAYER_FADE_MS = 200;
const SHARED_CARD_RADIUS = "var(--radius-2xl)";
const THEME_STORAGE_KEY = "momcozy-theme";
const LIST_TOPBAR_FADE_START = 0;
const LIST_TOPBAR_FADE_END = 402;
const FAQ_INITIAL_COUNT = 4;
const FAQ_LOAD_DELAY_MS = 650;

let activeIndex = 0;
let startX = 0;
let currentX = 0;
let dragging = false;
let transitionLocked = false;
let lastOpenedThumb = null;
let lockedBackgroundCover = guides[0].cover;
let currentDetailSlides = [];
let faqShowAll = false;
let faqLoadMoreButton = null;
const lottieAnimations = new WeakMap();
const expandedFaqIndexes = new Set();

function getCurrentTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function updateThemeToggle(theme = getCurrentTheme()) {
  const isDark = theme === "dark";
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function setMomcozyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  updateThemeToggle(theme);
  updateListTopbarBackground();
}

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) return;
  if (event.data?.type !== "momcozy-theme") return;

  setMomcozyTheme(event.data.theme === "dark" ? "dark" : "light");
});

function waitForFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function waitForImageReady(image) {
  if (!image) return Promise.resolve();
  if (image.complete && image.naturalWidth > 0) {
    return image.decode?.().catch(() => undefined) || Promise.resolve();
  }

  return new Promise((resolve) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  }).then(() => image.decode?.().catch(() => undefined));
}

function updateListTopbarBackground() {
  const progress = (listScreen.scrollTop - LIST_TOPBAR_FADE_START) / (LIST_TOPBAR_FADE_END - LIST_TOPBAR_FADE_START);
  const opacity = Math.max(0, Math.min(1, progress));
  const buttonOpacity = 0.4 + (1 - 0.4) * opacity;
  const iconInvert = getCurrentTheme() === "dark" ? 1 : 1 - opacity;
  listTopbar.style.setProperty("--list-nav-bg-opacity", opacity.toFixed(3));
  listTopbar.style.setProperty("--list-nav-button-opacity-percent", `${(buttonOpacity * 100).toFixed(1)}%`);
  listTopbar.style.setProperty("--list-nav-icon-invert", iconInvert.toFixed(3));
}

function getRelativeRect(element) {
  const appRect = app.getBoundingClientRect();
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left - appRect.left,
    top: rect.top - appRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getSlidePageRect(slide) {
  return getRelativeRect(slide);
}

function setRect(element, rect) {
  element.style.left = `${rect.left}px`;
  element.style.top = `${rect.top}px`;
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;
}

function getRectWithin(containerRect, rect) {
  return {
    left: rect.left - containerRect.left,
    top: rect.top - containerRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function getActiveSlide() {
  return slides.children[activeIndex];
}

function getActiveStageMedia() {
  return getActiveSlide()?.querySelector(".stage-phone");
}

function getThumbForSlide(index) {
  const rows = guideList.querySelectorAll(".guide-row");
  const row = rows[index] || rows[0];
  return row?.querySelector("[data-cover-thumb]") || lastOpenedThumb;
}

function setTransitionLocked(locked) {
  transitionLocked = locked;
  app.classList.toggle("is-transition-locked", locked);
  carousel.toggleAttribute("inert", locked);
  backButton.disabled = locked;
}

function setDetailBackground(cover) {
  lockedBackgroundCover = cover || lockedBackgroundCover;
  detailBackground.src = lockedBackgroundCover;
}

function getUpdateCount(item) {
  const match = item?.updates?.match(/\d+/);
  return Math.max(1, Number(match?.[0]) || 1);
}

function chevronIconTemplate() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M7.5 4.5 12.5 10 7.5 15.5"></path>
    </svg>
  `;
}

function getDetailSlidesForGuide(index) {
  const guideIndex = Math.max(0, Math.min(guides.length - 1, index));
  const guide = guides[guideIndex];
  if (Array.isArray(guide?.slides) && guide.slides.length > 0) return guide.slides;

  const count = getUpdateCount(guide);
  return Array.from({ length: count }, () => guide);
}

function renderDetailPages(index) {
  currentDetailSlides = getDetailSlidesForGuide(index);
  slides.replaceChildren(...currentDetailSlides.map((item) => slideTemplate(item)));
  bindStageVideoFallbacks();
  initStageLotties();

  const shouldShowPagination = currentDetailSlides.length > 1;
  detailFooter.hidden = !shouldShowPagination;
  if (!shouldShowPagination) {
    dots.replaceChildren();
    return;
  }

  dots.replaceChildren(
    ...currentDetailSlides.map((_, dotIndex) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `Go to page ${dotIndex + 1}`);
      dot.addEventListener("click", () => setActive(dotIndex));
      return dot;
    }),
  );
}

function makeSharedElement({ className, rect, radius, src }) {
  const element = src ? document.createElement("img") : document.createElement("div");
  element.className = className;
  if (src) {
    element.src = src;
    element.alt = "";
  }
  element.setAttribute("aria-hidden", "true");
  element.style.borderRadius = radius;
  setRect(element, rect);
  return element;
}

function animateOpacity(element, fromOpacity, toOpacity, duration = SHARED_TRANSITION_MS) {
  if (!element.animate) {
    element.style.opacity = toOpacity;
    return Promise.resolve();
  }

  const animation = element.animate([{ opacity: fromOpacity }, { opacity: toOpacity }], {
    duration,
    easing: "cubic-bezier(0.22, 0.74, 0.22, 1)",
    fill: "forwards",
  });

  return animation.finished.catch(() => undefined);
}

async function fadeOutSharedLayer(layer) {
  layer.style.opacity = "1";
  layer.style.transition = `opacity ${SHARED_LAYER_FADE_MS}ms cubic-bezier(0.22, 0.74, 0.22, 1)`;
  layer.getBoundingClientRect();
  layer.style.opacity = "0";
  await wait(SHARED_LAYER_FADE_MS);
}

function animateSharedElement(element, from, to, options = {}) {
  if (!element.animate) {
    setRect(element, to);
    element.style.opacity = options.toOpacity ?? 1;
    return Promise.resolve();
  }

  const animation = element.animate(
    [
      {
        left: `${from.left}px`,
        top: `${from.top}px`,
        width: `${from.width}px`,
        height: `${from.height}px`,
        borderRadius: options.fromRadius,
        opacity: options.fromOpacity ?? 1,
      },
      {
        left: `${to.left}px`,
        top: `${to.top}px`,
        width: `${to.width}px`,
        height: `${to.height}px`,
        borderRadius: options.toRadius,
        opacity: options.toOpacity ?? 1,
      },
    ],
    {
      duration: SHARED_TRANSITION_MS,
      easing: "cubic-bezier(0.22, 0.74, 0.22, 1)",
      fill: "forwards",
    },
  );

  return animation.finished.catch(() => undefined);
}

async function runSharedTransition(sourceThumb, direction) {
  const slide = getActiveSlide();
  const sourceCover = sourceThumb?.querySelector(".thumb-bg");
  const sourcePhone = sourceThumb?.querySelector(".thumb-phone");
  const targetPhone = getActiveStageMedia();

  if (!sourceCover || !sourcePhone || !targetPhone) return;

  const layer = document.createElement("div");
  layer.className = "shared-transition-layer";
  app.appendChild(layer);

  const detailPageRect = getSlidePageRect(slide);
  const coverFrom = direction === "open" ? getRelativeRect(sourceCover) : detailPageRect;
  const coverTo = direction === "open" ? detailPageRect : getRelativeRect(sourceCover);
  const phoneFrom = direction === "open" ? getRelativeRect(sourcePhone) : getRelativeRect(targetPhone);
  const phoneTo = direction === "open" ? getRelativeRect(targetPhone) : getRelativeRect(sourcePhone);
  const phoneFromInCard = getRectWithin(coverFrom, phoneFrom);
  const phoneToInCard = getRectWithin(coverTo, phoneTo);
  const cardClone = makeSharedElement({
    className: "shared-transition-card",
    rect: coverFrom,
    radius: SHARED_CARD_RADIUS,
  });
  const coverClone = makeSharedElement({
    className: "shared-transition-cover",
    src: lockedBackgroundCover,
    rect: { left: 0, top: 0, width: coverFrom.width, height: coverFrom.height },
    radius: "0px",
  });
  const maskClone = makeSharedElement({
    className: "shared-transition-mask",
    rect: { left: 0, top: 0, width: coverFrom.width, height: coverFrom.height },
    radius: "0px",
  });
  const phoneClone = makeSharedElement({
    className: "shared-transition-phone",
    src: targetPhone.dataset.transitionSrc || targetPhone.currentSrc || targetPhone.src || "./assets/momcozy-phone.png",
    rect: phoneFromInCard,
    radius: "0px",
  });

  cardClone.append(coverClone, maskClone, phoneClone);
  layer.append(cardClone);
  await Promise.all([waitForImageReady(coverClone), waitForImageReady(phoneClone)]);
  sourceThumb.classList.add("is-shared-source");
  detailScreen.classList.add("is-shared-transition");
  await waitForFrame();

  await Promise.all([
    animateSharedElement(cardClone, coverFrom, coverTo, {
      fromRadius: SHARED_CARD_RADIUS,
      toRadius: SHARED_CARD_RADIUS,
    }),
    animateSharedElement(
      coverClone,
      { left: 0, top: 0, width: coverFrom.width, height: coverFrom.height },
      { left: 0, top: 0, width: coverTo.width, height: coverTo.height },
      {
        fromRadius: "0px",
        toRadius: "0px",
      },
    ),
    animateSharedElement(
      maskClone,
      { left: 0, top: 0, width: coverFrom.width, height: coverFrom.height },
      { left: 0, top: 0, width: coverTo.width, height: coverTo.height },
      {
        fromRadius: "0px",
        toRadius: "0px",
      },
    ),
    animateOpacity(maskClone, direction === "open" ? 0 : 1, direction === "open" ? 1 : 0),
    animateSharedElement(phoneClone, phoneFromInCard, phoneToInCard, {
      fromRadius: "0px",
      toRadius: "0px",
    }),
  ]);

  sourceThumb.classList.remove("is-shared-source");
  if (direction === "open") {
    detailScreen.classList.remove("is-content-hidden");
    await waitForFrame();
    await fadeOutSharedLayer(layer);
    detailScreen.classList.remove("is-shared-transition");
  }
  layer.remove();
}

function bindGuideRowOpen(button, index) {
  let pressPointerId = null;
  let pressStartX = 0;
  let pressStartY = 0;
  let pressCancelled = false;

  const clearPress = () => {
    pressPointerId = null;
    pressCancelled = false;
  };

  button.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button > 0 || transitionLocked) return;

    pressPointerId = event.pointerId;
    pressStartX = event.clientX;
    pressStartY = event.clientY;
    pressCancelled = false;
    button.setPointerCapture?.(event.pointerId);
  });

  button.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pressPointerId) return;

    const movedX = Math.abs(event.clientX - pressStartX);
    const movedY = Math.abs(event.clientY - pressStartY);
    if (movedX > 8 || movedY > 8) pressCancelled = true;
  });

  button.addEventListener("pointerup", (event) => {
    if (event.pointerId !== pressPointerId) return;

    const rect = button.getBoundingClientRect();
    const releasedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    const shouldOpen = !pressCancelled && releasedInside;
    button.releasePointerCapture?.(event.pointerId);
    clearPress();

    if (shouldOpen) openDetail(index, button.querySelector("[data-cover-thumb]"));
  });

  button.addEventListener("pointercancel", clearPress);

  button.addEventListener("keyup", (event) => {
    if (transitionLocked || (event.key !== "Enter" && event.key !== " ")) return;
    openDetail(index, button.querySelector("[data-cover-thumb]"));
  });
}

function rowTemplate(item, index) {
  const button = document.createElement("button");
  const tagTint = item.tagTint || "pink";
  button.className = "guide-row";
  button.type = "button";
  button.setAttribute("aria-label", `${item.title}, open details`);
  button.innerHTML = `
    <span class="thumb" data-cover-thumb>
      <img class="thumb-bg" src="${item.cover}" alt="">
      <img class="thumb-phone" src="./assets/momcozy-phone.png" alt="">
    </span>
    <span class="guide-copy">
      <h3>${item.title}</h3>
      <span class="update-tag update-tag--${tagTint}">${item.updates}</span>
    </span>
    <span class="chevron" aria-hidden="true">
      ${chevronIconTemplate()}
    </span>
  `;
  bindGuideRowOpen(button, index);
  return button;
}

function getSlideMedia(item) {
  return item.media || {
    type: "image",
    src: "./assets/momcozy-phone.png",
    fallback: "./assets/momcozy-phone.png",
  };
}

function getMediaFallback(media) {
  return media.fallback || media.poster || media.src || "./assets/momcozy-phone.png";
}

function stageMediaTemplate(item) {
  const media = getSlideMedia(item);
  const fallback = getMediaFallback(media);

  if (media.type === "video" && media.src) {
    return `
      <video class="stage-phone stage-video" muted playsinline loop preload="metadata" poster="${media.poster || fallback}" data-transition-src="${fallback}" data-fallback-src="${fallback}">
        <source src="${media.src}" type="video/mp4">
      </video>
    `;
  }

  if (media.type === "lottie" && media.src) {
    const ratio = media.width && media.height ? ` style="aspect-ratio: ${media.width} / ${media.height};"` : "";
    return `<div class="stage-phone stage-lottie" data-lottie-src="${media.src}" data-transition-src="${fallback}" data-fallback-src="${fallback}" aria-hidden="true"${ratio}></div>`;
  }

  return `<img class="stage-phone" src="${fallback}" alt="" data-transition-src="${fallback}">`;
}

function replaceVideoWithFallback(video) {
  const fallback = video.dataset.fallbackSrc;
  if (!fallback || video.dataset.fallbackApplied === "true") return;

  const image = document.createElement("img");
  image.className = "stage-phone";
  image.src = fallback;
  image.alt = "";
  image.dataset.transitionSrc = fallback;
  video.dataset.fallbackApplied = "true";
  video.replaceWith(image);
}

function bindStageVideoFallbacks(scope = slides) {
  scope.querySelectorAll(".stage-video").forEach((video) => {
    video.addEventListener("error", () => undefined);
  });
}

function initStageLotties(scope = slides) {
  const lottiePlayer = window.lottie || window.bodymovin;
  if (!lottiePlayer) return;

  scope.querySelectorAll(".stage-lottie").forEach((container) => {
    if (container.dataset.lottieReady === "true") return;

    const animation = lottiePlayer.loadAnimation({
      container,
      renderer: "canvas",
      loop: true,
      autoplay: false,
      path: container.dataset.lottieSrc,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    });

    lottieAnimations.set(container, animation);
    container.dataset.lottieReady = "true";

    animation.addEventListener("DOMLoaded", () => {
      if (container.closest(".slide") === getActiveSlide() && detailScreen.classList.contains("is-active")) {
        animation.goToAndPlay(0, true);
        container.dataset.motionState = "playing";
        return;
      }

      animation.stop();
      container.dataset.motionState = "stopped";
    });
  });
}

function getSlideMotion(slide) {
  return slide?.querySelector(".stage-video, .stage-lottie");
}

function pauseInactiveSlideMedia() {
  [...slides.children].forEach((slide, index) => {
    const video = slide.querySelector(".stage-video");
    const lottieContainer = slide.querySelector(".stage-lottie");
    if (index === activeIndex) return;

    if (video) {
      video.pause();
      if (Number.isFinite(video.duration) && video.duration > 0) video.currentTime = 0;
    }

    const inactiveLottie = lottieContainer ? lottieAnimations.get(lottieContainer) : null;
    inactiveLottie?.stop();
    if (lottieContainer && inactiveLottie) lottieContainer.dataset.motionState = "stopped";
  });
}

function playActiveSlideMedia({ restart = true } = {}) {
  initStageLotties();

  const activeSlide = getActiveSlide();
  const activeVideo = activeSlide?.querySelector(".stage-video");
  const activeLottieContainer = activeSlide?.querySelector(".stage-lottie");
  const activeLottie = activeLottieContainer ? lottieAnimations.get(activeLottieContainer) : null;
  pauseInactiveSlideMedia();

  if (activeLottie) {
    if (restart) activeLottie.goToAndPlay(0, true);
    else activeLottie.play();
    activeLottieContainer.dataset.motionState = "playing";
    return;
  }

  if (!activeVideo) return;

  const play = () => {
    if (restart) activeVideo.currentTime = 0;
    activeVideo.play().catch(() => undefined);
  };

  if (activeVideo.readyState >= 1) {
    play();
    return;
  }

  activeVideo.addEventListener("loadedmetadata", play, { once: true });
  activeVideo.load();
}

function slideTemplate(item) {
  const media = getSlideMedia(item);
  const hasMotionMedia = (media.type === "video" || media.type === "lottie") && Boolean(media.src);
  const slide = document.createElement("article");
  slide.className = "slide";
  slide.classList.toggle("slide--motion", hasMotionMedia);
  slide.innerHTML = `
    <div class="phone-stage">
      <figure class="phone-shot">
        ${stageMediaTemplate(item)}
      </figure>
    </div>
    <div class="slide-copy">
      <h3>${item.detailTitle}</h3>
      ${item.detailText
        .split("\n\n")
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("")}
      ${item.detailNote ? `<p class="slide-note">${item.detailNote}</p>` : ""}
    </div>
  `;
  return slide;
}

function faqTemplate(item, index, options = {}) {
  const faq = document.createElement("article");
  const contentId = `faq-panel-${index}`;
  faq.className = "faq-item";
  const expanded = expandedFaqIndexes.has(index);
  faq.classList.toggle("is-expanded", expanded);
  if (options.reveal) {
    faq.classList.add("is-revealing");
    faq.style.setProperty("--faq-reveal-delay", `${options.revealDelay || 0}ms`);
  }
  faq.innerHTML = `
    <button class="faq-row" type="button" aria-expanded="${expanded ? "true" : "false"}" aria-controls="${contentId}">
      <span>${item.title}</span>
      ${chevronIconTemplate()}
    </button>
    <div class="faq-panel" id="${contentId}">
      <p>${item.text}</p>
    </div>
  `;

  const button = faq.querySelector(".faq-row");
  button.addEventListener("click", () => {
    const nextExpanded = faq.classList.toggle("is-expanded");
    if (nextExpanded) {
      expandedFaqIndexes.add(index);
    } else {
      expandedFaqIndexes.delete(index);
    }
    button.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
  });

  return faq;
}

function setFaqLoadMoreLoading(isLoading) {
  if (!faqLoadMoreButton) return;
  faqLoadMoreButton.disabled = isLoading;
  faqLoadMoreButton.setAttribute("aria-busy", isLoading ? "true" : "false");
  faqLoadMoreButton.innerHTML = isLoading
    ? `<span class="faq-load-spinner" aria-hidden="true"></span>`
    : `<span>View More</span>`;
}

function ensureFaqLoadMoreButton() {
  if (faqLoadMoreButton || faqs.length <= FAQ_INITIAL_COUNT) return;

  faqLoadMoreButton = document.createElement("button");
  faqLoadMoreButton.className = "faq-load-more";
  faqLoadMoreButton.type = "button";
  faqLoadMoreButton.innerHTML = `<span>View More</span>`;
  faqLoadMoreButton.addEventListener("click", async () => {
    if (faqShowAll) return;

    setFaqLoadMoreLoading(true);
    await wait(FAQ_LOAD_DELAY_MS);
    faqShowAll = true;
    renderFaqs({ revealFromIndex: FAQ_INITIAL_COUNT });
  });
  faqList.after(faqLoadMoreButton);
}

function renderFaqs(options = {}) {
  const visibleFaqs = faqShowAll ? faqs : faqs.slice(0, FAQ_INITIAL_COUNT);
  const faqRows = document.createDocumentFragment();
  visibleFaqs.forEach((item, index) => {
    const shouldReveal = Number.isFinite(options.revealFromIndex) && index >= options.revealFromIndex;
    faqRows.appendChild(
      faqTemplate(item, index, {
        reveal: shouldReveal,
        revealDelay: shouldReveal ? (index - options.revealFromIndex) * 90 : 0,
      }),
    );
  });
  faqList.classList.toggle("is-preview", !faqShowAll);
  faqList.replaceChildren(faqRows);

  if (faqShowAll) {
    faqLoadMoreButton?.remove();
    faqLoadMoreButton = null;
    return;
  }

  ensureFaqLoadMoreButton();
  setFaqLoadMoreLoading(false);
}

function render() {
  const rows = document.createDocumentFragment();
  guides.forEach((item, index) => rows.appendChild(rowTemplate(item, index)));
  guideList.appendChild(rows);

  renderFaqs();
}

async function openDetail(index, sourceEl) {
  if (transitionLocked) return;

  const guideIndex = Math.max(0, Math.min(guides.length - 1, index));
  renderDetailPages(guideIndex);
  setActive(0, false, { playMedia: false });
  detailNavTitle.textContent = guides[guideIndex]?.title || "New Update";
  lastOpenedThumb = sourceEl || getThumbForSlide(guideIndex);
  setDetailBackground(guides[guideIndex]?.cover);
  setTransitionLocked(Boolean(sourceEl));

  detailScreen.classList.toggle("is-shared-transition", Boolean(sourceEl));
  detailScreen.classList.add("is-active", "is-content-hidden");
  detailScreen.removeAttribute("aria-hidden");

  if (!sourceEl) {
    listScreen.classList.add("is-leaving");
    listScreen.classList.remove("is-active");
    detailScreen.classList.remove("is-content-hidden");
    setTransitionLocked(false);
    playActiveSlideMedia({ restart: true });
    return;
  }

  await waitForFrame();
  await runSharedTransition(sourceEl, "open");
  listScreen.classList.add("is-leaving");
  listScreen.classList.remove("is-active");
  setTransitionLocked(false);
  playActiveSlideMedia({ restart: true });
}

async function closeDetail() {
  if (transitionLocked) return;

  pauseInactiveSlideMedia();
  getActiveSlide()?.querySelector(".stage-video")?.pause();
  const currentLottie = getActiveSlide()?.querySelector(".stage-lottie");
  if (currentLottie) {
    lottieAnimations.get(currentLottie)?.pause();
    currentLottie.dataset.motionState = "paused";
  }
  const sourceThumb = lastOpenedThumb || getThumbForSlide(activeIndex);
  setTransitionLocked(Boolean(sourceThumb));
  detailScreen.classList.add("is-content-hidden");

  if (!sourceThumb) {
    detailScreen.classList.add("is-closing");
    window.setTimeout(() => {
      detailScreen.classList.remove("is-active", "is-closing");
      detailScreen.setAttribute("aria-hidden", "true");
      listScreen.classList.add("is-active");
      listScreen.classList.remove("is-leaving");
      setTransitionLocked(false);
    }, 300);
    return;
  }

  listScreen.classList.add("is-active", "is-return-target");
  listScreen.classList.remove("is-leaving");
  await waitForFrame();
  await runSharedTransition(sourceThumb, "close");
  detailScreen.classList.remove("is-active");
  detailScreen.setAttribute("aria-hidden", "true");
  detailScreen.classList.remove("is-shared-transition");
  listScreen.classList.remove("is-return-target");
  setTransitionLocked(false);

  if (location.hash.startsWith("#detail")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
}

function setActive(index, animate = true, options = {}) {
  const previousIndex = activeIndex;
  activeIndex = Math.max(0, Math.min(currentDetailSlides.length - 1, index));
  slides.style.transitionDuration = animate ? "520ms" : "0ms";
  slides.style.transform = `translate3d(${-activeIndex * 100}%, 0, 0)`;
  [...dots.children].forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeIndex);
    dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
  });

  if (options.playMedia !== false) {
    playActiveSlideMedia({ restart: previousIndex !== activeIndex });
  }
}

function pointerDown(event) {
  if (transitionLocked) return;
  dragging = true;
  startX = event.clientX ?? event.touches?.[0]?.clientX ?? 0;
  currentX = startX;
  slides.style.transitionDuration = "0ms";
}

function pointerMove(event) {
  if (!dragging || transitionLocked) return;
  currentX = event.clientX ?? event.touches?.[0]?.clientX ?? currentX;
  const delta = currentX - startX;
  const resistance =
    (activeIndex === 0 && delta > 0) || (activeIndex === currentDetailSlides.length - 1 && delta < 0)
      ? 0.28
      : 1;
  slides.style.transform = `translate3d(calc(${-activeIndex * 100}% + ${delta * resistance}px), 0, 0)`;
}

function pointerUp() {
  if (!dragging || transitionLocked) return;
  dragging = false;
  const delta = currentX - startX;
  const threshold = Math.min(76, carousel.clientWidth * 0.2);

  if (delta < -threshold) {
    setActive(activeIndex + 1);
  } else if (delta > threshold) {
    setActive(activeIndex - 1);
  } else {
    setActive(activeIndex);
  }
}

backButton.addEventListener("click", closeDetail);
themeToggle?.addEventListener("click", () => {
  setMomcozyTheme(getCurrentTheme() === "dark" ? "light" : "dark");
});
listScreen.addEventListener("scroll", updateListTopbarBackground, { passive: true });
carousel.addEventListener("pointerdown", pointerDown);
carousel.addEventListener("pointermove", pointerMove);
carousel.addEventListener("pointerup", pointerUp);
carousel.addEventListener("pointercancel", pointerUp);
carousel.addEventListener("keydown", (event) => {
  if (transitionLocked) return;
  if (event.key === "ArrowRight") setActive(activeIndex + 1);
  if (event.key === "ArrowLeft") setActive(activeIndex - 1);
  if (event.key === "Escape") closeDetail();
});

render();
updateThemeToggle();
updateListTopbarBackground();

const detailMatch = location.hash.match(/^#detail-(\d+)$/);
if (detailMatch) {
  openDetail(Number(detailMatch[1]) || 0);
}
