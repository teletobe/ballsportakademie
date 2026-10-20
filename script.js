// Ballsport Akademie – scroll reveal, accordion (one open at a time), news toggle, flip cards, topbar state

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

const newsList = document.getElementById("news-list");
const newsToggle = document.getElementById("news-toggle");

if (newsList && newsToggle) {
  // Hide the button when there is nothing beyond the first two
  if (newsList.children.length <= 2) newsToggle.hidden = true;

  newsToggle.addEventListener("click", () => {
    const expanded = newsList.classList.toggle("expanded");
    newsToggle.setAttribute("aria-expanded", String(expanded));
    newsToggle.textContent = expanded
      ? "Weniger anzeigen"
      : "Alle Meldungen anzeigen";
    if (!expanded) newsList.scrollIntoView({ block: "start" });
  });
}

document.querySelectorAll(".sport").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("flipped"));
});

const topbar = document.getElementById("topbar");
const onScroll = () => topbar.classList.toggle("scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
