/* ============================================
   DATA (this is your "model" — swap these facts
   for real ones about your chosen celebrity)
   ============================================ */
const randomFacts = [
  "Grew up rebounding for his dad, Dell Curry, during Charlotte Hornets shootarounds.",
  "Played college ball at Davidson, a small school with almost no NBA pedigree before him.",
  "His deep-range threes became so common broadcasters started calling them 'from the logo.'",
  "Is left-eye dominant but shoots right-handed — a quirk coaches only spotted years into his career.",
  "Known for an elaborate pregame tunnel routine involving trick shots from the locker room.",
  "THE GOAT"
];

/* ============================================
   1. THEME TOGGLE ("stage lights")
   Reads/writes a data-theme attribute on <body>,
   which is what the CSS variables in style.css hook into.
   ============================================ */
const body = document.body;
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");

function applyTheme(theme) {
  body.setAttribute("data-theme", theme);
  if (theme === "day") {
    themeIcon.textContent = "☀️";
    themeLabel.textContent = "Lights: Full";
  } else {
    themeIcon.textContent = "🌙";
    themeLabel.textContent = "Lights: Low";
  }
}

themeToggleBtn.addEventListener("click", () => {
  const current = body.getAttribute("data-theme");
  const next = current === "night" ? "day" : "night";
  applyTheme(next);
});

/* ============================================
   2. CURSOR-FOLLOWING SPOTLIGHT
   Updates CSS custom properties --x / --y, which the
   .spotlight radial-gradient in style.css reads from.
   ============================================ */
const hero = document.getElementById("hero");
const spotlight = document.getElementById("spotlight");

hero.addEventListener("mousemove", (event) => {
  const bounds = hero.getBoundingClientRect();
  const x = event.clientX - bounds.left;
  const y = event.clientY - bounds.top;
  spotlight.style.setProperty("--x", `${x}px`);
  spotlight.style.setProperty("--y", `${y}px`);
});

/* ============================================
   3. FLIP-CARD FACT GENERATOR (interactive feature)
   Clicking the card OR the button flips it and
   swaps in a new random fact from the array above.
   ============================================ */
const flipCard = document.getElementById("flip-card");
const randomFactEl = document.getElementById("random-fact");
const newFactBtn = document.getElementById("new-fact-btn");

let lastFactIndex = -1;

function pickNewFact() {
  let index;
  // avoid showing the same fact twice in a row
  do {
    index = Math.floor(Math.random() * randomFacts.length);
  } while (index === lastFactIndex && randomFacts.length > 1);

  lastFactIndex = index;
  randomFactEl.textContent = randomFacts[index];
}

function revealFact() {
  pickNewFact();
  flipCard.classList.add("is-flipped");
}

flipCard.addEventListener("click", () => {
  if (flipCard.classList.contains("is-flipped")) {
    // if already flipped, flip back to front on a second click
    flipCard.classList.remove("is-flipped");
  } else {
    revealFact();
  }
});

newFactBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // don't also trigger the card's own click handler
  revealFact();
});