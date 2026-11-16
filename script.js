// Ballsport Akademie – news from news.js, scroll reveal, accordion (one open at a time), news toggle, sport spin, topbar state

const newsList = document.getElementById("news-list");
const newsToggle = document.getElementById("news-toggle");
const news = Array.isArray(window.NEWS) ? window.NEWS : [];

// Pause between photos in a news gallery (milliseconds)
const GALLERY_INTERVAL = 4000;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const newsImages = (entry) =>
  Array.isArray(entry.images) ? entry.images : entry.image ? [entry.image] : [];

const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

// Several photos/videos: crossfade automatically, tap/click shows the next one.
// A video plays muted to its end, then the gallery moves on.
function buildGallery(sources, alt, lazy) {
  const gallery = document.createElement("button");
  gallery.type = "button";
  gallery.className = "news-gallery";
  gallery.setAttribute("aria-label", "Nächstes Foto anzeigen");

  // Each slide: the photo/video itself plus a blurred copy behind it that
  // fills the frame when the shapes don't match (see "mixed" below)
  const slides = sources.map((src, n) => {
    const slide = document.createElement("span");
    slide.className = "gallery-slide";
    if (n === 0) slide.classList.add("active");

    let media, bg;
    if (isVideo(src)) {
      const video = () => {
        const v = document.createElement("video");
        v.muted = true;
        v.playsInline = true;
        v.src = src;
        return v;
      };
      media = video();
      media.preload = "metadata"; // needed for its shape, see below
      media.setAttribute("aria-label", `${alt} (Video)`);
      media.addEventListener("ended", () => {
        if (slide.classList.contains("active")) {
          show(current + 1);
          start();
        }
      });
      bg = video();
      bg.preload = "none";
    } else {
      media = document.createElement("img");
      media.src = src;
      media.alt = `${alt} (Foto ${n + 1} von ${sources.length})`;
      if (lazy) media.loading = "lazy";
      bg = document.createElement("span");
      bg.style.backgroundImage = `url("${src}")`;
    }
    bg.className = "gallery-bg";
    bg.setAttribute("aria-hidden", "true");
    media.className = "gallery-media";

    slide.append(bg, media);
    gallery.append(slide);
    return { slide, media, bg };
  });
  const imgs = slides.map((s) => s.media);

  const dots = document.createElement("span");
  dots.className = "gallery-dots";
  dots.setAttribute("aria-hidden", "true");
  const dotEls = sources.map((_, n) => {
    const dot = document.createElement("span");
    if (n === 0) dot.classList.add("active");
    dots.append(dot);
    return dot;
  });
  gallery.append(dots);

  // Similar shapes: box takes their average shape, photos fill it.
  // Very different shapes (portrait + landscape): 4:3 box, each shown
  // whole and centred on a blurred copy of itself.
  Promise.all(
    imgs.map((img) =>
      img.tagName === "VIDEO"
        ? new Promise((resolve) => {
            const ratio = () => img.videoWidth / img.videoHeight || null;
            if (img.readyState >= 1) resolve(ratio());
            img.addEventListener("loadedmetadata", () => resolve(ratio()));
            img.addEventListener("error", () => resolve(null));
          })
        : img.decode().then(
            () => img.naturalWidth / img.naturalHeight,
            () => null,
          ),
    ),
  ).then((ratios) => {
    const ok = ratios.filter(Boolean);
    if (ok.length && Math.max(...ok) / Math.min(...ok) > 1.2) {
      gallery.classList.add("mixed");
      gallery.style.aspectRatio = "4 / 3";
      start(); // a video already playing gets its backdrop going too
    } else if (ok.length) {
      gallery.style.aspectRatio = String(
        ok.reduce((a, b) => a + b, 0) / ok.length,
      );
    }
  });

  let current = 0;
  let timer = null;
  let onScreen = false;
  let hovering = false;

  // Video slides: the blurred backdrop copy runs along with the video
  const videoDo = (s, fn) => {
    if (s.media.tagName !== "VIDEO") return;
    fn(s.media);
    if (gallery.classList.contains("mixed")) fn(s.bg);
  };

  const show = (next) => {
    slides[current].slide.classList.remove("active");
    dotEls[current].classList.remove("active");
    videoDo(slides[current], (v) => v.pause());
    current = (next + slides.length) % slides.length;
    slides[current].slide.classList.add("active");
    dotEls[current].classList.add("active");
    videoDo(slides[current], (v) => (v.currentTime = 0));
  };

  const stop = () => {
    clearTimeout(timer);
    timer = null;
  };
  const start = () => {
    stop();
    const active = slides[current];
    if (!onScreen || document.hidden) {
      videoDo(active, (v) => v.pause());
      return;
    }
    // Videos play even on hover; only the photo countdown pauses
    if (active.media.tagName === "VIDEO") {
      if (!reduceMotion.matches) videoDo(active, (v) => v.play().catch(() => {}));
      return;
    }
    if (hovering || reduceMotion.matches) return;
    timer = setTimeout(() => {
      show(current + 1);
      start();
    }, GALLERY_INTERVAL);
  };

  gallery.addEventListener("click", () => {
    show(current + 1);
    start(); // restart the countdown after a manual switch
  });
  gallery.addEventListener("mouseenter", () => {
    hovering = true;
    stop();
  });
  gallery.addEventListener("mouseleave", () => {
    hovering = false;
    start();
  });
  document.addEventListener("visibilitychange", start);
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    start();
  }).observe(gallery);

  return gallery;
}

// Build the news items; DOM nodes + textContent so text from news.js is never parsed as HTML
news.forEach((entry, i) => {
  const article = document.createElement("article");
  article.className = "news-item";
  article.id = `meldung-${i + 1}`;
  if (i === 0) article.classList.add("reveal");

  const images = newsImages(entry);
  if (images.length > 1) {
    article.append(buildGallery(images, entry.imageAlt || "", i > 0));
  } else if (images.length === 1) {
    const img = document.createElement("img");
    img.src = images[0];
    img.alt = entry.imageAlt || "";
    if (i > 0) img.loading = "lazy";
    article.append(img);
  } else {
    article.classList.add("no-image");
  }

  const body = document.createElement("div");
  body.className = "news-body";
  const title = document.createElement("h3");
  title.textContent = entry.title || "";
  body.append(title);

  // Blank line in news.js = new paragraph, single line breaks are just wrapping
  String(entry.text || "")
    .split(/\n\s*\n/)
    .map((para) => para.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .forEach((para) => {
      const p = document.createElement("p");
      p.textContent = para;
      body.append(p);
    });

  article.append(body);
  newsList.append(article);
});

if (news.length === 0) document.getElementById("aktuelles").hidden = true;

// Only the newest is shown until expanded; teasers preview the next few
const newsTeasers = document.getElementById("news-teasers");
const teaserGrid = newsTeasers.querySelector(".teaser-grid");
const collapsedLabel = `Alle ${news.length} Meldungen anzeigen`;

const setNewsExpanded = (expanded) => {
  newsList.classList.toggle("expanded", expanded);
  newsTeasers.hidden = expanded || news.length <= 1;
  newsToggle.setAttribute("aria-expanded", String(expanded));
  newsToggle.textContent = expanded ? "Weniger anzeigen" : collapsedLabel;
};

news.slice(1, 4).forEach((entry, i) => {
  const teaser = document.createElement("button");
  teaser.type = "button";
  teaser.className = "teaser";

  const images = newsImages(entry);
  if (images.length) {
    const frame = document.createElement("span");
    frame.className = "teaser-img";
    const img = document.createElement("img");
    img.src = images[0];
    img.alt = "";
    img.loading = "lazy";
    frame.append(img);
    teaser.append(frame);
  }

  const title = document.createElement("span");
  title.className = "teaser-title";
  title.textContent = entry.title || "";
  const more = document.createElement("span");
  more.className = "teaser-more";
  more.textContent = "Weiterlesen";
  teaser.append(title, more);

  teaser.addEventListener("click", () => {
    setNewsExpanded(true);
    document
      .getElementById(`meldung-${i + 2}`)
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });

  teaserGrid.append(teaser);
});

setNewsExpanded(false);
if (news.length <= 1) newsToggle.parentElement.hidden = true;

newsToggle.addEventListener("click", () => {
  const expanded = !newsList.classList.contains("expanded");
  setNewsExpanded(expanded);
  if (!expanded) newsList.scrollIntoView({ block: "start" });
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => revealObserver.observe(el));

// Accordion: like the original page, opening one section closes the others
const triggers = document.querySelectorAll(".acc-trigger");

triggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    triggers.forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      document
        .getElementById(other.getAttribute("aria-controls"))
        .classList.remove("open");
    });

    if (!isOpen) {
      trigger.setAttribute("aria-expanded", "true");
      document
        .getElementById(trigger.getAttribute("aria-controls"))
        .classList.add("open");
    }
  });
});

document.querySelectorAll(".sport").forEach((card) => {
  const spin = card.querySelector(".spin");
  let turns = 0;
  card.addEventListener("click", () => {
    turns += 1;
    spin.style.setProperty("--turn", `${turns * 360}deg`);
  });
});

const topbar = document.getElementById("topbar");
const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
