/* ============================================================
   ✏️  EDIT THESE VARIABLES TO PERSONALIZE THE WEBSITE
   ============================================================ */
const girlfriendName = "MY little Dove Juthii";
const yourName = "Apnarr gulumuluu Naim";
const loveLetter = `I Love youuu! Last Day, Today, Tomorrow and Forever, InshaAllah ❤️`;

/* ============================================================
   1) FLOATING HEARTS BACKGROUND (Hero)
   Creates hearts at random positions/sizes that float upward.
   ============================================================ */
(function createFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  if (!container) return;

  const HEART_COUNT = 22;
  const symbols = ["❤", "💕", "💖", "🌸"];

  for (let i = 0; i < HEART_COUNT; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Randomize horizontal position, size, speed and delay for variety
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = 14 + Math.random() * 26 + "px";

    const duration = 7 + Math.random() * 8; // 7s - 15s float
    const delay = Math.random() * 8; // staggered start
    // First value = float-up, second = heartbeat pulse
    heart.style.animationDuration = `${duration}s, 1.2s`;
    heart.style.animationDelay = `${delay}s, ${delay}s`;

    container.appendChild(heart);
  }
})();

/* ============================================================
   2) "START OUR STORY" BUTTON — smooth scroll to letter
   ============================================================ */
document.getElementById("startBtn")?.addEventListener("click", () => {
  document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
});

/* ============================================================
   3) SIGNATURE — fill in your name from the variable
   ============================================================ */
const signatureEl = document.getElementById("signature");
if (signatureEl) signatureEl.textContent = yourName;

/* ============================================================
   4) TYPING ANIMATION FOR THE LOVE LETTER
   Runs once, the first time the letter card scrolls into view.
   ============================================================ */
function typeLetter(text, element, cursorEl, speed = 45) {
  let index = 0;

  function type() {
    if (index <= text.length) {
      element.textContent = text.slice(0, index);
      index++;
      setTimeout(type, speed);
    } else if (cursorEl) {
      // Keep a gentle blinking cursor after finishing
      cursorEl.style.opacity = "1";
    }
  }
  type();
}

/* ============================================================
   5) SCROLL FADE-IN + trigger typing when letter appears
   Uses IntersectionObserver for smooth, performant reveals.
   ============================================================ */
(function setupReveals() {
  const letterTextEl = document.getElementById("letterText");
  const cursorEl = document.getElementById("cursor");
  let typedOnce = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");

        // Start typing the letter the first time the card is visible
        if (entry.target.id === "letterCard" && !typedOnce && letterTextEl) {
          typedOnce = true;
          typeLetter(loveLetter, letterTextEl, cursorEl);
        }

        observer.unobserve(entry.target); // reveal only once
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();

/* ============================================================
   6) FINAL SURPRISE — YES button
   Triggers confetti + romantic popup.
   ============================================================ */
const yesBtn = document.getElementById("yesBtn");
const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");

yesBtn?.addEventListener("click", () => {
  launchConfetti();
  popupOverlay?.classList.add("is-open");
  popupOverlay?.setAttribute("aria-hidden", "false");
});

popupClose?.addEventListener("click", () => {
  popupOverlay?.classList.remove("is-open");
  popupOverlay?.setAttribute("aria-hidden", "true");
});

// Close popup when clicking outside the card
popupOverlay?.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("is-open");
    popupOverlay.setAttribute("aria-hidden", "true");
  }
});

/* ============================================================
   7) FINAL SURPRISE — playful NO button that runs away
   Moves to a random spot whenever hovered or tapped.
   ============================================================ */
const noBtn = document.getElementById("noBtn");

function dodge() {
  // Switch to fixed positioning so it can roam the whole screen
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const maxX = window.innerWidth - btnW - 20;
  const maxY = window.innerHeight - btnH - 20;

  const randX = Math.max(20, Math.random() * maxX);
  const randY = Math.max(20, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randX + "px";
  noBtn.style.top = randY + "px";
}

noBtn?.addEventListener("mouseenter", dodge);
noBtn?.addEventListener("click", (e) => {
  // On touch devices there's no hover, so dodge on tap instead
  e.preventDefault();
  dodge();
});

/* ============================================================
   8) LIGHTWEIGHT CONFETTI (vanilla canvas — no libraries)
   ============================================================ */
function launchConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#ffb6c9", "#f78ca0", "#e8607d", "#b76e79", "#ffe3ec", "#ffffff"];
  const pieces = [];
  const PIECE_COUNT = 160;

  for (let i = 0; i < PIECE_COUNT; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      speedY: 2 + Math.random() * 4,
      speedX: -1.5 + Math.random() * 3,
      spin: -6 + Math.random() * 12,
    });
  }

  let frame = 0;
  const MAX_FRAMES = 260; // stop after a few seconds

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      // Recycle pieces that fall off the bottom
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    });

    frame++;
    if (frame < MAX_FRAMES) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}

// Keep confetti canvas sized to the window
window.addEventListener("resize", () => {
  const canvas = document.getElementById("confettiCanvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
