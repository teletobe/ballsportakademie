// Ballsport Akademie – scroll-based fade-in animations, accordion toggles for Angebot sections, and flip-card interactions

const elements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
elements.forEach((el) => observer.observe(el));

const toggles = document.querySelectorAll('[id^="angebot-toggle"]');

toggles.forEach((toggle) => {
  const num = toggle.id.split("-").pop();
  const content = document.getElementById(`angebot-content-${num}`);
  const extraText = document.getElementById("aufnahme-text");

  toggle.addEventListener("click", () => {
    const isVisible = content.classList.contains("visible");

    // Hide all other sections first
    document
      .querySelectorAll(
        ".angebot-cards:not(#termine-content), #aufnahme-text",
      )
      .forEach((el) => {
        el.classList.remove("visible");
      });

    // Toggle this one
    if (!isVisible) {
      content.classList.add("visible");
      if (num === "4" && extraText) extraText.classList.add("visible");
    } else {
      content.classList.remove("visible");
      if (num === "4" && extraText) extraText.classList.remove("visible");
    }
  });
});

document.querySelectorAll(".illus-wrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", () => {
    wrapper.querySelector(".flip-card").classList.toggle("flipped");
  });
});
