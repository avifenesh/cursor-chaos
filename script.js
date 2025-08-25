/**
 * Cursor Chaos Game
 * Player chases and clicks on a chaotic cursor to gain points
 * Based on the spec: separate chaotic cursor that teleports randomly
 */

/** @type {HTMLElement} */
const container = document.getElementById('game-container');
/** @type {HTMLElement} */
const scoreEl = document.getElementById('score');
/** @type {HTMLElement} */
const messageEl = document.getElementById('message');
/** @type {HTMLElement} */
const catEl = document.getElementById('alice-cat');

let score = 0;
let catVisible = false;
let chaoticCursorVisible = true;
let isCurrentCursorBad = false; // Track if current cursor is a "bad" one

// Create the chaotic cursor that players need to click
const chaoticCursor = document.createElement("div");
chaoticCursor.id = "cursor-chaos";
chaoticCursor.style.width = "40px";
chaoticCursor.style.height = "40px";
chaoticCursor.style.borderRadius = "50%";
chaoticCursor.style.background = "hotpink";
chaoticCursor.style.position = "absolute";
chaoticCursor.style.cursor = "pointer";
chaoticCursor.style.transition = "all 0.3s ease";
chaoticCursor.style.border = "3px solid #ff69b4";
chaoticCursor.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.5)";
chaoticCursor.innerHTML = "🎯";
chaoticCursor.style.display = "flex";
chaoticCursor.style.alignItems = "center";
chaoticCursor.style.justifyContent = "center";
chaoticCursor.style.fontSize = "20px";
container.appendChild(chaoticCursor);

/**
 * Generate random number between min and max
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function random(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Update score and show appropriate feedback with modern UI enhancements
 * @param {number} delta - Score change
 */
function updateScore(delta) {
  const oldScore = score;
  score += delta;
  scoreEl.innerText = `Score: ${score}`;

  // Clear previous message timeout
  clearTimeout(updateScore.messageTimeout);

  // Remove existing message classes
  messageEl.classList.remove("show", "success", "error", "milestone");

  // Check for score milestones and add special celebrations
  const scoreMilestone = Math.floor(score / 50) > Math.floor(oldScore / 50);
  const bigMilestone = Math.floor(score / 100) > Math.floor(oldScore / 100);

  if (delta > 0) {
    messageEl.innerText = [
      "Yay! 🎉",
      "Woohoo! 😎",
      "Nice! 😺",
      "Great! 🌟",
      "Awesome! ✨",
      "Fantastic! 🎊",
      "Amazing! 🚀",
      "Perfect! 💎",
      "Brilliant! ⭐",
      "Excellent! 🎯",
      "Superb! 🎆",
      "Wonderful! 🌈",
      "Spectacular! 🎇",
      "Magnificent! 👑",
      "Outstanding! 🏆",
    ][Math.floor(Math.random() * 15)];

    messageEl.classList.add("show", "success");

    if (bigMilestone) {
      messageEl.innerText = `🏆 ${score} POINTS MILESTONE! 🏆`;
      messageEl.classList.add("milestone");
    } else if (scoreMilestone) {
      messageEl.innerText = `✨ ${score} Points! ✨`;
      messageEl.classList.add("milestone");
    }

    // Multiple happy effects - randomly choose combination
    const effectRand = Math.random();

    if (effectRand < 0.15) {
      // Confetti + Rainbow (15%)
      spawnConfetti();
      rainbowFlash();
    } else if (effectRand < 0.3) {
      // Star burst + Sparkles (15%)
      starBurst(
        random(window.innerWidth * 0.3, window.innerWidth * 0.7),
        random(window.innerHeight * 0.3, window.innerHeight * 0.7)
      );
      magicalSparkles();
    } else if (effectRand < 0.45) {
      // Heart explosion + Confetti (15%)
      heartExplosion(
        random(window.innerWidth * 0.3, window.innerWidth * 0.7),
        random(window.innerHeight * 0.3, window.innerHeight * 0.7)
      );
      spawnConfetti();
    } else if (effectRand < 0.6) {
      // Fireworks + Rainbow (15%)
      fireworks();
      rainbowFlash();
    } else if (effectRand < 0.75) {
      // Bubble pop + Sparkles (15%)
      bubblePop(
        random(window.innerWidth * 0.3, window.innerWidth * 0.7),
        random(window.innerHeight * 0.3, window.innerHeight * 0.7)
      );
      magicalSparkles();
    } else if (effectRand < 0.9) {
      // Double effect combo (15%)
      spawnConfetti();
      starBurst(
        random(window.innerWidth * 0.2, window.innerWidth * 0.8),
        random(window.innerHeight * 0.2, window.innerHeight * 0.8)
      );
    } else {
      // Triple effect extravaganza! (10%)
      spawnConfetti();
      fireworks();
      magicalSparkles();
      rainbowFlash();
    }

    // Score popup effect
    const scorePopup = document.createElement("div");
    scorePopup.innerHTML = `+${delta}`;
    scorePopup.style.position = "absolute";
    scorePopup.style.left = `${random(
      window.innerWidth * 0.2,
      window.innerWidth * 0.8
    )}px`;
    scorePopup.style.top = `${random(
      window.innerHeight * 0.2,
      window.innerHeight * 0.8
    )}px`;
    scorePopup.style.color = "#4CAF50";
    scorePopup.style.fontSize = "32px";
    scorePopup.style.fontWeight = "bold";
    scorePopup.style.pointerEvents = "none";
    scorePopup.style.zIndex = "1001";
    scorePopup.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";

    container.appendChild(scorePopup);

    scorePopup.animate(
      [
        { transform: "scale(0) translateY(0)", opacity: 0 },
        { transform: "scale(1.2) translateY(-20px)", opacity: 1, offset: 0.3 },
        { transform: "scale(1) translateY(-60px)", opacity: 0 },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      }
    ).onfinish = () => {
      if (scorePopup.parentNode) {
        scorePopup.parentNode.removeChild(scorePopup);
      }
    };
  } else {
    messageEl.innerText = [
      "Oops! 😅",
      "Try again! 🎯",
      "Almost! 😉",
      "So close! 😌",
      "Keep going! 💪",
      "Nice try! 😊",
      "Don't give up! ✨",
    ][Math.floor(Math.random() * 7)];
    messageEl.classList.add("show", "error");

    // Enhanced negative effects - more noticeable mocking
    screenShake();
    mockPlayer(); // Add the big mocking overlay

    // Negative score popup
    const scorePopup = document.createElement("div");
    scorePopup.innerHTML = `${delta}`;
    scorePopup.style.position = "absolute";
    scorePopup.style.left = `${random(
      window.innerWidth * 0.2,
      window.innerWidth * 0.8
    )}px`;
    scorePopup.style.top = `${random(
      window.innerHeight * 0.2,
      window.innerHeight * 0.8
    )}px`;
    scorePopup.style.color = "#f44336";
    scorePopup.style.fontSize = "28px";
    scorePopup.style.fontWeight = "bold";
    scorePopup.style.pointerEvents = "none";
    scorePopup.style.zIndex = "1001";
    scorePopup.style.textShadow = "2px 2px 4px rgba(0,0,0,0.5)";

    container.appendChild(scorePopup);

    scorePopup.animate(
      [
        { transform: "scale(0) translateY(0)", opacity: 0 },
        { transform: "scale(1.1) translateY(10px)", opacity: 1, offset: 0.3 },
        { transform: "scale(1) translateY(50px)", opacity: 0 },
      ],
      {
        duration: 1200,
        easing: "ease-out",
      }
    ).onfinish = () => {
      if (scorePopup.parentNode) {
        scorePopup.parentNode.removeChild(scorePopup);
      }
    };
  }

  // Auto-hide message after delay
  updateScore.messageTimeout = setTimeout(() => {
    messageEl.classList.remove("show");
    messageEl.innerText = "Click the chaotic cursor! 🎯";
    messageEl.classList.add("show");
  }, 3000);

  // Special milestone celebrations
  if (delta > 0) {
    if (bigMilestone) {
      // Big milestone (every 100 points) - ultimate celebration!
      setTimeout(() => {
        fireworks();
        magicalSparkles();
        spawnConfetti();
        rainbowFlash();

        // Special milestone message
        const milestoneMsg = document.createElement("div");
        milestoneMsg.innerHTML = `🏆 ${score} POINTS MILESTONE! 🏆`;
        milestoneMsg.style.position = "fixed";
        milestoneMsg.style.top = "30%";
        milestoneMsg.style.left = "50%";
        milestoneMsg.style.transform = "translate(-50%, -50%)";
        milestoneMsg.style.fontSize = "36px";
        milestoneMsg.style.fontWeight = "bold";
        milestoneMsg.style.color = "#ffd700";
        milestoneMsg.style.textShadow = "4px 4px 8px rgba(0,0,0,0.8)";
        milestoneMsg.style.zIndex = "9999";
        milestoneMsg.style.pointerEvents = "none";
        milestoneMsg.style.textAlign = "center";
        milestoneMsg.style.background =
          "linear-gradient(45deg, #ffd700, #ffed4e)";
        milestoneMsg.style.padding = "20px";
        milestoneMsg.style.borderRadius = "20px";
        milestoneMsg.style.border = "4px solid #ffd700";

        document.body.appendChild(milestoneMsg);

        milestoneMsg.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
            {
              transform: "translate(-50%, -50%) scale(1.2)",
              opacity: 1,
              offset: 0.3,
            },
            {
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 1,
              offset: 0.8,
            },
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
          ],
          {
            duration: 3000,
            easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
          }
        ).onfinish = () => {
          if (milestoneMsg.parentNode) {
            milestoneMsg.parentNode.removeChild(milestoneMsg);
          }
        };
      }, 500);
    } else if (scoreMilestone) {
      // Regular milestone (every 50 points) - mini celebration
      setTimeout(() => {
        starBurst(window.innerWidth / 2, window.innerHeight / 2);
        heartExplosion(window.innerWidth / 2, window.innerHeight / 2);

        const miniMsg = document.createElement("div");
        miniMsg.innerHTML = `✨ ${score} Points! ✨`;
        miniMsg.style.position = "fixed";
        miniMsg.style.top = "25%";
        miniMsg.style.left = "50%";
        miniMsg.style.transform = "translate(-50%, -50%)";
        miniMsg.style.fontSize = "28px";
        miniMsg.style.fontWeight = "bold";
        miniMsg.style.color = "#ff69b4";
        miniMsg.style.textShadow = "2px 2px 4px rgba(0,0,0,0.6)";
        miniMsg.style.zIndex = "9998";
        miniMsg.style.pointerEvents = "none";

        document.body.appendChild(miniMsg);

        miniMsg.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
            {
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 1,
              offset: 0.5,
            },
            { transform: "translate(-50%, -50%) scale(0)", opacity: 0 },
          ],
          {
            duration: 1500,
            easing: "ease-out",
          }
        ).onfinish = () => {
          if (miniMsg.parentNode) {
            miniMsg.parentNode.removeChild(miniMsg);
          }
        };
      }, 300);
    }
  }
}

/**
 * Create confetti effect for positive score
 */
function spawnConfetti() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.position = "absolute";
    confetti.style.width = `${random(8, 15)}px`;
    confetti.style.height = `${random(8, 15)}px`;
    confetti.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.top = `${Math.random() * window.innerHeight}px`;
    confetti.style.pointerEvents = "none";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.zIndex = "1000";
    confetti.style.opacity = "1";

    // Random shapes
    if (Math.random() > 0.7) {
      confetti.innerHTML = ["✨", "⭐", "🎉", "💫", "🌟"][
        Math.floor(Math.random() * 5)
      ];
      confetti.style.fontSize = "12px";
      confetti.style.background = "transparent";
    }

    container.appendChild(confetti);

    // Animate confetti falling and spinning
    const startY = parseFloat(confetti.style.top);
    const endY = startY + random(100, 300);
    const startX = parseFloat(confetti.style.left);
    const endX = startX + random(-50, 50);
    const duration = random(1000, 2000);

    confetti.animate(
      [
        {
          transform: "translate(0, 0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(${endX - startX}px, ${
            endY - startY
          }px) rotate(${random(180, 720)}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      if (confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    };
  }
}

/**
 * Create star burst effect for happy moments
 */
function starBurst(x, y) {
  for (let i = 0; i < 12; i++) {
    const star = document.createElement("div");
    star.innerHTML = ["⭐", "✨", "💫", "🌟"][Math.floor(Math.random() * 4)];
    star.style.position = "absolute";
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.fontSize = "20px";
    star.style.pointerEvents = "none";
    star.style.zIndex = "1000";

    container.appendChild(star);

    const angle = (i / 12) * Math.PI * 2;
    const distance = random(80, 200);
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;

    star.animate(
      [
        {
          transform: "translate(0, 0) scale(0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: `translate(${endX - x}px, ${
            endY - y
          }px) scale(1.5) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: random(1000, 1500),
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    };
  }
}

/**
 * Create heart explosion effect
 */
function heartExplosion(x, y) {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = ["💖", "💝", "💕", "💗", "💓"][
      Math.floor(Math.random() * 5)
    ];
    heart.style.position = "absolute";
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${random(16, 24)}px`;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";

    container.appendChild(heart);

    const endX = x + random(-150, 150);
    const endY = y + random(-150, 150);

    heart.animate(
      [
        {
          transform: "translate(0, 0) scale(0)",
          opacity: 1,
        },
        {
          transform: `translate(${endX - x}px, ${endY - y}px) scale(1.2)`,
          opacity: 0.8,
          offset: 0.7,
        },
        {
          transform: `translate(${endX - x}px, ${endY - y + 50}px) scale(0.5)`,
          opacity: 0,
        },
      ],
      {
        duration: random(1200, 1800),
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    };
  }
}

/**
 * Create fireworks effect
 */
function fireworks() {
  const centerX = random(window.innerWidth * 0.2, window.innerWidth * 0.8);
  const centerY = random(window.innerHeight * 0.2, window.innerHeight * 0.6);

  // Main explosion
  for (let i = 0; i < 20; i++) {
    const spark = document.createElement("div");
    spark.style.position = "absolute";
    spark.style.width = "4px";
    spark.style.height = "4px";
    spark.style.background = `hsl(${random(0, 360)}, 100%, 60%)`;
    spark.style.borderRadius = "50%";
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.pointerEvents = "none";
    spark.style.zIndex = "1000";

    container.appendChild(spark);

    const angle = (i / 20) * Math.PI * 2;
    const distance = random(100, 200);
    const endX = centerX + Math.cos(angle) * distance;
    const endY = centerY + Math.sin(angle) * distance + random(-50, 50);

    spark.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${endX - centerX}px, ${
            endY - centerY
          }px) scale(1.5)`,
          opacity: 0.8,
          offset: 0.3,
        },
        {
          transform: `translate(${endX - centerX}px, ${
            endY - centerY + 100
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: random(1500, 2000),
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      if (spark.parentNode) {
        spark.parentNode.removeChild(spark);
      }
    };
  }
}

/**
 * Create bubble pop effect
 */
function bubblePop(x, y) {
  for (let i = 0; i < 15; i++) {
    const bubble = document.createElement("div");
    bubble.style.position = "absolute";
    bubble.style.width = `${random(20, 40)}px`;
    bubble.style.height = bubble.style.width;
    bubble.style.background = `hsla(${random(0, 360)}, 70%, 80%, 0.6)`;
    bubble.style.borderRadius = "50%";
    bubble.style.border = "2px solid rgba(255, 255, 255, 0.8)";
    bubble.style.left = `${x + random(-30, 30)}px`;
    bubble.style.top = `${y + random(-30, 30)}px`;
    bubble.style.pointerEvents = "none";
    bubble.style.zIndex = "1000";

    container.appendChild(bubble);

    const endY = y + random(-200, -100);
    const endX = x + random(-50, 50);

    bubble.animate(
      [
        {
          transform: "translate(0, 0) scale(0)",
          opacity: 0.8,
        },
        {
          transform: `translate(${endX - x}px, ${endY - y}px) scale(1.2)`,
          opacity: 0.4,
          offset: 0.8,
        },
        {
          transform: `translate(${endX - x}px, ${endY - y}px) scale(1.5)`,
          opacity: 0,
        },
      ],
      {
        duration: random(2000, 3000),
        easing: "ease-out",
      }
    ).onfinish = () => {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    };
  }
}

/**
 * Create magical sparkle trail effect
 */
function magicalSparkles() {
  for (let i = 0; i < 25; i++) {
    const sparkle = document.createElement("div");
    sparkle.innerHTML = ["✨", "⭐", "💫", "🌟", "⚡"][
      Math.floor(Math.random() * 5)
    ];
    sparkle.style.position = "absolute";
    sparkle.style.left = `${random(0, window.innerWidth)}px`;
    sparkle.style.top = `${random(0, window.innerHeight)}px`;
    sparkle.style.fontSize = `${random(12, 20)}px`;
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "999";
    sparkle.style.filter = `hue-rotate(${random(0, 360)}deg)`;

    container.appendChild(sparkle);

    sparkle.animate(
      [
        {
          transform: "scale(0) rotate(0deg)",
          opacity: 0,
        },
        {
          transform: "scale(1.5) rotate(180deg)",
          opacity: 1,
          offset: 0.3,
        },
        {
          transform: "scale(1) rotate(360deg)",
          opacity: 0.8,
          offset: 0.7,
        },
        {
          transform: "scale(0) rotate(720deg)",
          opacity: 0,
        },
      ],
      {
        duration: random(1500, 2500),
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }
    ).onfinish = () => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    };
  }
}
function rainbowFlash() {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "999";
  overlay.style.background =
    "linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)";
  overlay.style.opacity = "0";
  overlay.style.mixBlendMode = "multiply";

  document.body.appendChild(overlay);

  // Flash effect
  overlay.animate([{ opacity: 0 }, { opacity: 0.3 }, { opacity: 0 }], {
    duration: 400,
    easing: "ease-in-out",
  }).onfinish = () => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  };
}

/**
 * Create particle explosion at click location
 */
function particleExplosion(x, y) {
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.background = `hsl(${random(0, 360)}, 80%, 60%)`;
    particle.style.borderRadius = "50%";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";

    container.appendChild(particle);

    // Explode outward
    const angle = (i / 15) * Math.PI * 2;
    const distance = random(50, 150);
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;

    particle.animate(
      [
        {
          transform: "translate(0, 0) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: random(800, 1200),
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    };
  }
}
function screenShake() {
  const intensity = random(15, 40); // Much higher intensity
  const duration = 600; // Longer duration
  const shakeCount = 12; // More shakes

  // Add stronger screen flash effect
  document.body.style.background = "#ff0000"; // Bright red
  document.body.style.filter = "contrast(200%) brightness(150%)"; // Enhanced flash
  setTimeout(() => {
    document.body.style.background = "";
    document.body.style.filter = "";
  }, 200);

  // Perform multiple stronger shakes
  for (let i = 0; i < shakeCount; i++) {
    setTimeout(() => {
      container.style.transform = `translate(${random(
        -intensity,
        intensity
      )}px, ${random(-intensity, intensity)}px) rotate(${random(
        -5,
        5
      )}deg) scale(${random(0.95, 1.05)})`;
      container.style.filter =
        "hue-rotate(180deg) saturate(200%) contrast(150%)";
    }, i * (duration / shakeCount));
  }

  // Reset after shake
  setTimeout(() => {
    container.style.transform = "translate(0,0) rotate(0deg) scale(1)";
    container.style.filter = "none";
  }, duration);
}

/**
 * Enhanced mocking effect for negative feedback
 */
function mockPlayer() {
  // Create large mocking text overlay
  const mockText = document.createElement("div");
  const mockMessages = [
    "LOL YOU MISSED! 😂",
    "HAHA NICE TRY! 🤣",
    "OOPS! TRY HARDER! 😜",
    "MISS! GET GOOD! 😏",
    "WOMP WOMP! 📢",
    "EPIC FAIL! 💀",
    "SO CLOSE... NOT! 😈",
  ];

  mockText.innerHTML =
    mockMessages[Math.floor(Math.random() * mockMessages.length)];
  mockText.style.position = "fixed";
  mockText.style.top = "50%";
  mockText.style.left = "50%";
  mockText.style.transform = "translate(-50%, -50%)";
  mockText.style.fontSize = "48px";
  mockText.style.fontWeight = "bold";
  mockText.style.color = "#ff4444";
  mockText.style.textShadow = "4px 4px 8px rgba(0,0,0,0.8)";
  mockText.style.zIndex = "9999";
  mockText.style.pointerEvents = "none";
  mockText.style.textAlign = "center";
  mockText.style.background = "rgba(255, 68, 68, 0.1)";
  mockText.style.padding = "20px";
  mockText.style.borderRadius = "20px";
  mockText.style.border = "3px solid #ff4444";

  document.body.appendChild(mockText);

  // Bouncing animation
  mockText.animate(
    [
      {
        transform: "translate(-50%, -50%) scale(0) rotate(-15deg)",
        opacity: 0,
      },
      {
        transform: "translate(-50%, -50%) scale(1.2) rotate(5deg)",
        opacity: 1,
        offset: 0.3,
      },
      {
        transform: "translate(-50%, -50%) scale(1) rotate(-2deg)",
        opacity: 1,
        offset: 0.6,
      },
      {
        transform: "translate(-50%, -50%) scale(0.8) rotate(0deg)",
        opacity: 0,
      },
    ],
    {
      duration: 2000,
      easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    }
  ).onfinish = () => {
    if (mockText.parentNode) {
      mockText.parentNode.removeChild(mockText);
    }
  };
}

/**
 * Screen vibration effect - enhanced for visibility
 */
function vibrateScreen() {
  const intensity = 8; // Much higher intensity
  const duration = 1200; // Longer duration
  const vibrateCount = 40; // More vibrations

  // Add visual indicator for vibration
  document.body.style.filter = "sepia(100%) saturate(200%) brightness(120%)";

  for (let i = 0; i < vibrateCount; i++) {
    setTimeout(() => {
      container.style.transform = `translate(${random(
        -intensity,
        intensity
      )}px, ${random(-intensity, intensity)}px) scale(${random(0.98, 1.02)})`;
      // Add slight color shift during vibration
      container.style.filter = `hue-rotate(${random(
        -30,
        30
      )}deg) saturate(150%)`;
    }, i * (duration / vibrateCount));
  }

  setTimeout(() => {
    container.style.transform = "translate(0,0) scale(1)";
    container.style.filter = "none";
    document.body.style.filter = "";
  }, duration);
}

/**
 * Dizzy/spin screen effect - enhanced for visibility
 */
function dizzyScreen() {
  container.style.transition = "transform 1.5s ease-in-out";
  container.style.transform = `rotate(${random(-25, 25)}deg) scale(${random(
    0.85,
    1.15
  )}) skew(${random(-5, 5)}deg)`;

  // Add stronger blur and distortion effects
  container.style.filter =
    "blur(4px) hue-rotate(180deg) contrast(150%) saturate(200%)";

  // Add body background flash during dizzy effect
  document.body.style.background =
    "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff0000)";
  document.body.style.backgroundSize = "400% 400%";
  document.body.style.animation = "gradient-shift 0.5s ease-in-out infinite";

  setTimeout(() => {
    container.style.transform = "rotate(0deg) scale(1) skew(0deg)";
    container.style.filter = "none";
    container.style.transition = "transform 0.5s ease";
    document.body.style.background = "";
    document.body.style.backgroundSize = "";
    document.body.style.animation = "";
  }, 2000); // Longer duration
}

/**
 * Create puff of smoke effect for teleportation
 */
function puffOfSmoke(x, y) {
  for (let i = 0; i < 8; i++) {
    const smoke = document.createElement("div");
    smoke.style.position = "absolute";
    smoke.style.width = "20px";
    smoke.style.height = "20px";
    smoke.style.background = "rgba(200, 200, 200, 0.7)";
    smoke.style.borderRadius = "50%";
    smoke.style.left = `${x}px`;
    smoke.style.top = `${y}px`;
    smoke.style.pointerEvents = "none";
    smoke.style.zIndex = "999";

    container.appendChild(smoke);

    smoke.animate(
      [
        {
          transform: `scale(0.5) translate(${random(-10, 10)}px, ${random(
            -10,
            10
          )}px)`,
          opacity: 0.7,
        },
        {
          transform: `scale(2) translate(${random(-30, 30)}px, ${random(
            -30,
            30
          )}px)`,
          opacity: 0,
        },
      ],
      {
        duration: 600,
        easing: "ease-out",
      }
    ).onfinish = () => {
      if (smoke.parentNode) {
        smoke.parentNode.removeChild(smoke);
      }
    };
  }
}

/**
 * Random background color shift effect
 */
function psychedelicBackground() {
  const colors = [
    "linear-gradient(135deg, #ffe29f, #ffa99f)",
    "linear-gradient(135deg, #a8edea, #fed6e3)",
    "linear-gradient(135deg, #ff9a9e, #fecfef)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
    "linear-gradient(135deg, #fad0c4, #ffd1ff)",
    "linear-gradient(135deg, #ffecd2, #fcb69f)",
  ];

  const newBg = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = newBg;
}
function teleportChaoticCursor() {
  if (!chaoticCursorVisible) return;

  // Create puff of smoke at current position
  const currentRect = chaoticCursor.getBoundingClientRect();
  puffOfSmoke(
    currentRect.left + currentRect.width / 2,
    currentRect.top + currentRect.height / 2
  );

  // Random position (keeping some margin from edges)
  const margin = 60;
  const newX = random(margin, window.innerWidth - margin);
  const newY = random(margin, window.innerHeight - margin);

  // Random size
  const newSize = random(30, 60);

  // Decide if this should be a bad emoji (25% chance)
  isCurrentCursorBad = Math.random() < 0.25;

  let newEmoji, backgroundColor;

  if (isCurrentCursorBad) {
    // Bad emojis - clearly dangerous looking
    const badEmojis = ["💀", "☠️", "🔥", "💣", "⚡", "🗲", "☢️", "⚠️", "🚫"];
    newEmoji = badEmojis[Math.floor(Math.random() * badEmojis.length)];
    backgroundColor = "#ff4444"; // Red background for bad emojis

    // Add warning visual effects
    chaoticCursor.style.border = "4px solid #ff0000";
    chaoticCursor.style.boxShadow =
      "0 0 20px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 0, 0.3)";

    // Add pulsing danger animation
    chaoticCursor.style.animation = "danger-pulse 0.5s infinite alternate";
  } else {
    // Good emojis
    const goodEmojis = [
      "🎯",
      "🐭",
      "🍪",
      "⭐",
      "💎",
      "🎈",
      "🎀",
      "🍎",
      "🎉",
      "🌟",
      "✨",
      "🎊",
    ];
    newEmoji = goodEmojis[Math.floor(Math.random() * goodEmojis.length)];
    backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;

    // Normal visual effects
    chaoticCursor.style.border = "3px solid #ff69b4";
    chaoticCursor.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.5)";
    chaoticCursor.style.animation = "pulse 2s infinite";
  }

  // Apply changes
  chaoticCursor.style.left = `${newX}px`;
  chaoticCursor.style.top = `${newY}px`;
  chaoticCursor.style.width = `${newSize}px`;
  chaoticCursor.style.height = `${newSize}px`;
  chaoticCursor.style.fontSize = `${newSize * 0.5}px`;
  chaoticCursor.innerHTML = newEmoji;
  chaoticCursor.style.background = backgroundColor;

  // Add a little spin effect
  chaoticCursor.style.transform = `rotate(${random(-180, 180)}deg) scale(0.8)`;

  // Pop in effect
  setTimeout(() => {
    chaoticCursor.style.transform = "rotate(0deg) scale(1)";
  }, 100);

  // Create puff of smoke at new position
  setTimeout(() => {
    puffOfSmoke(newX + newSize / 2, newY + newSize / 2);
  }, 50);
}

/**
 * Make chaotic cursor disappear and reappear
 */
function chaoticCursorDisappear() {
  if (Math.random() < 0.3) {
    // 30% chance to disappear
    chaoticCursorVisible = false;
    chaoticCursor.style.opacity = "0";
    chaoticCursor.style.pointerEvents = "none";

    // Reappear after 1-2 seconds
    setTimeout(() => {
      chaoticCursorVisible = true;
      chaoticCursor.style.opacity = "1";
      chaoticCursor.style.pointerEvents = "auto";
      teleportChaoticCursor();
    }, random(1000, 2000));
  }
}

/**
 * Spawn the Cheshire Cat for gambling
 */
function spawnCheshireCat() {
  if (catVisible) return; // Don't spawn if already visible

  catVisible = true;
  catEl.style.display = "flex";
  catEl.style.opacity = "0";
  catEl.style.left = `${random(0, window.innerWidth - 80)}px`;
  catEl.style.top = `${random(0, window.innerHeight - 80)}px`;

  // Fade in
  setTimeout(() => {
    catEl.style.opacity = "0.8";
  }, 100);

  // Auto-hide after 5 seconds if not clicked
  setTimeout(() => {
    if (catVisible) {
      hideCheshireCat();
    }
  }, 5000);
}

/**
 * Hide the Cheshire Cat
 */
function hideCheshireCat() {
  catVisible = false;
  catEl.style.opacity = "0";
  setTimeout(() => {
    catEl.style.display = "none";
  }, 300);
}

// Event Listeners

// Clicking the chaotic cursor (main game mechanic)
chaoticCursor.addEventListener("click", (e) => {
  e.stopPropagation();

  // Get click position for particle explosion
  const rect = chaoticCursor.getBoundingClientRect();
  const clickX = rect.left + rect.width / 2;
  const clickY = rect.top + rect.height / 2;

  if (isCurrentCursorBad) {
    // Clicked a bad emoji - lose points!
    particleExplosion(clickX, clickY);
    const penalty = Math.floor(random(10, 21)); // Random penalty 10-20 points
    updateScore(-penalty); // Lose random points for clicking bad emoji

    // Special message for bad emoji
    messageEl.innerText = "DANGER! You clicked a bad one! 💀";
    messageEl.style.color = "#ff0000";
  } else {
    // Clicked a good emoji - gain points!
    particleExplosion(clickX, clickY);

    // Add location-based happy effects at click position
    const clickEffectRand = Math.random();
    if (clickEffectRand < 0.4) {
      starBurst(clickX, clickY);
    } else if (clickEffectRand < 0.7) {
      heartExplosion(clickX, clickY);
    } else {
      bubblePop(clickX, clickY);
    }

    updateScore(10); // +10 points per spec
  }

  teleportChaoticCursor(); // Immediately teleport after being clicked
});

// Clicking the Cheshire Cat (gambling mechanic)
catEl.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!catVisible) return;

  // Random gambling: either bonus (+40 to +50) or penalty (-10 to -20)
  const isBonus = Math.random() > 0.5; // 50/50 chance
  const delta = isBonus
    ? Math.floor(random(40, 51)) // Bonus: +40 to +50 points
    : -Math.floor(random(10, 21)); // Penalty: -10 to -20 points
  updateScore(delta);

  // Special message for cat gambling
  if (delta > 0) {
    messageEl.innerText = `Cheshire Cat blessed you! +${delta} 😸`;
  } else {
    messageEl.innerText = `Cheshire Cat tricked you! ${delta} 😈`;
  }

  catEl.style.transform = `rotate(${random(-360, 360)}deg)`;
  hideCheshireCat();
});

// Clicking background (missing the target)
container.addEventListener("click", (e) => {
  if (e.target === chaoticCursor || e.target === catEl) return;

  updateScore(-5); // -5 points for missing per spec
});

// Initialize game
function initGame() {
  // Position chaotic cursor initially
  teleportChaoticCursor();

  // Set initial message
  messageEl.innerText = "Click the chaotic cursor! 🎯";
  messageEl.classList.add("show");

  // Start main game loop - cursor teleports every 2-5 seconds (reduced frequency)
  setInterval(() => {
    teleportChaoticCursor();
    chaoticCursorDisappear();
  }, random(2000, 5000));

  // Additional random teleportation triggers for extra chaos (reduced)
  setInterval(() => {
    if (Math.random() < 0.2) {
      teleportChaoticCursor(); // 20% chance for extra teleport (reduced from 30%)
    }
  }, random(3000, 5000));

  // Occasional burst teleportation (less frequent)
  setInterval(() => {
    if (Math.random() < 0.15) {
      // Burst of 2 quick teleports (reduced from 3)
      setTimeout(() => teleportChaoticCursor(), 0);
      setTimeout(() => teleportChaoticCursor(), 800);
    }
  }, random(12000, 20000));

  // Cheshire Cat appears every 20-40 seconds
  setInterval(() => {
    if (!catVisible) {
      spawnCheshireCat();
    }
  }, random(20000, 40000));

  // Enhanced random screen effects every 3-6 seconds - much more frequent and intense!
  setInterval(() => {
    const rand = Math.random();
    if (rand < 0.25) {
      screenShake();
    } else if (rand < 0.5) {
      vibrateScreen();
    } else if (rand < 0.75) {
      dizzyScreen();
    } else {
      psychedelicBackground();
    }

    // Higher chance for combination effects
    if (rand > 0.7) {
      setTimeout(() => psychedelicBackground(), 800);
    }
    if (rand > 0.85) {
      setTimeout(() => vibrateScreen(), 1500);
    }
    if (rand > 0.95) {
      // Triple chaos effect!
      setTimeout(() => screenShake(), 500);
      setTimeout(() => dizzyScreen(), 1000);
      setTimeout(() => psychedelicBackground(), 1500);
    }
  }, random(3000, 6000)); // Much more frequent
}

// Start the game
initGame();