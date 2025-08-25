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

// Create the chaotic cursor that players need to click
const chaoticCursor = document.createElement('div');
chaoticCursor.id = 'cursor-chaos';
chaoticCursor.style.width = '40px';
chaoticCursor.style.height = '40px';
chaoticCursor.style.borderRadius = '50%';
chaoticCursor.style.background = 'hotpink';
chaoticCursor.style.position = 'absolute';
chaoticCursor.style.cursor = 'pointer';
chaoticCursor.style.transition = 'all 0.3s ease';
chaoticCursor.style.border = '3px solid #ff69b4';
chaoticCursor.style.boxShadow = '0 0 10px rgba(255, 105, 180, 0.5)';
chaoticCursor.innerHTML = '🎯';
chaoticCursor.style.display = 'flex';
chaoticCursor.style.alignItems = 'center';
chaoticCursor.style.justifyContent = 'center';
chaoticCursor.style.fontSize = '20px';
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
 * Update score and show appropriate feedback
 * @param {number} delta - Score change
 */
function updateScore(delta) {
  score += delta;
  scoreEl.innerText = `Score: ${score}`;

  // Clear previous message timeout
  clearTimeout(updateScore.messageTimeout);

  if (delta > 0) {
    messageEl.innerText = [
      "Yay! 🎉",
      "Woohoo! 😎",
      "Nice! 😺",
      "Great! 🌟",
      "Awesome! ✨",
    ][Math.floor(Math.random() * 5)];
    messageEl.style.color = "#4CAF50";
    messageEl.style.fontWeight = "bold";
    messageEl.style.textShadow = "0 0 10px rgba(76, 175, 80, 0.5)";

    // Multiple positive effects
    spawnConfetti();
    rainbowFlash();

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
      "Ouch! 🤡",
      "Try again 😹",
      "Haha 😈",
      "Miss! 💥",
      "Oops! 😵",
    ][Math.floor(Math.random() * 5)];
    messageEl.style.color = "#f44336";
    messageEl.style.fontWeight = "bold";
    messageEl.style.textShadow = "0 0 10px rgba(244, 67, 54, 0.5)";

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

  // Clear message after 2 seconds
  updateScore.messageTimeout = setTimeout(() => {
    messageEl.innerText = "Click the chaotic cursor! 🎯";
    messageEl.style.color = "#444";
    messageEl.style.textShadow = "none";
  }, 2000);
}

/**
 * Create confetti effect for positive score
 */
function spawnConfetti() {
  for(let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.position = 'absolute';
    confetti.style.width = `${random(8, 15)}px`;
    confetti.style.height = `${random(8, 15)}px`;
    confetti.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
    confetti.style.top = `${Math.random() * window.innerHeight}px`;
    confetti.style.pointerEvents = 'none';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.zIndex = '1000';
    confetti.style.opacity = '1';
    
    // Random shapes
    if (Math.random() > 0.7) {
      confetti.innerHTML = ['✨', '⭐', '🎉', '💫', '🌟'][Math.floor(Math.random() * 5)];
      confetti.style.fontSize = '12px';
      confetti.style.background = 'transparent';
    }
    
    container.appendChild(confetti);
    
    // Animate confetti falling and spinning
    const startY = parseFloat(confetti.style.top);
    const endY = startY + random(100, 300);
    const startX = parseFloat(confetti.style.left);
    const endX = startX + random(-50, 50);
    const duration = random(1000, 2000);
    
    confetti.animate([
      { 
        transform: 'translate(0, 0) rotate(0deg)',
        opacity: 1
      },
      { 
        transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${random(180, 720)}deg)`,
        opacity: 0
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
      if(confetti.parentNode) {
        confetti.parentNode.removeChild(confetti);
      }
    };
  }
}

/**
 * Create rainbow flash effect for positive score
 */
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
  const intensity = random(8, 25);
  const duration = 300;
  const shakeCount = 6;

  // Add screen flash effect
  document.body.style.background = "#ff6b6b";
  setTimeout(() => {
    document.body.style.background = "";
  }, 100);

  // Perform multiple shakes
  for (let i = 0; i < shakeCount; i++) {
    setTimeout(() => {
      container.style.transform = `translate(${random(
        -intensity,
        intensity
      )}px, ${random(-intensity, intensity)}px) rotate(${random(-2, 2)}deg)`;
      container.style.filter = "hue-rotate(180deg) saturate(0.5)";
    }, i * (duration / shakeCount));
  }

  // Reset after shake
  setTimeout(() => {
    container.style.transform = "translate(0,0) rotate(0deg)";
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
 * Screen vibration effect
 */
function vibrateScreen() {
  const intensity = 3;
  const duration = 800;
  const vibrateCount = 20;

  for (let i = 0; i < vibrateCount; i++) {
    setTimeout(() => {
      container.style.transform = `translate(${random(
        -intensity,
        intensity
      )}px, ${random(-intensity, intensity)}px)`;
    }, i * (duration / vibrateCount));
  }

  setTimeout(() => {
    container.style.transform = "translate(0,0)";
  }, duration);
}

/**
 * Dizzy/spin screen effect
 */
function dizzyScreen() {
  container.style.transition = "transform 1s ease-in-out";
  container.style.transform = `rotate(${random(-10, 10)}deg) scale(${random(
    0.95,
    1.05
  )})`;

  // Add blur effect
  container.style.filter = "blur(2px) hue-rotate(180deg)";

  setTimeout(() => {
    container.style.transform = "rotate(0deg) scale(1)";
    container.style.filter = "none";
    container.style.transition = "transform 0.3s ease";
  }, 1500);
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

  // Random emoji
  const emojis = ["🎯", "🐭", "🍪", "⭐", "💎", "🎈", "🎀", "🍎", "🎉"];
  const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  // Apply changes
  chaoticCursor.style.left = `${newX}px`;
  chaoticCursor.style.top = `${newY}px`;
  chaoticCursor.style.width = `${newSize}px`;
  chaoticCursor.style.height = `${newSize}px`;
  chaoticCursor.style.fontSize = `${newSize * 0.5}px`;
  chaoticCursor.innerHTML = newEmoji;
  chaoticCursor.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;

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

  particleExplosion(clickX, clickY);
  updateScore(10); // +10 points per spec
  teleportChaoticCursor(); // Immediately teleport after being clicked
});

// Clicking the Cheshire Cat (gambling mechanic)
catEl.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!catVisible) return;
  
  // Random score change: -50 to +50 points
  const delta = Math.floor(random(-50, 51));
  updateScore(delta);
  
  // Special message for cat gambling
  if (delta > 0) {
    messageEl.innerText = `Cheshire Cat blessed you! +${delta} 😸`;
  } else {
    messageEl.innerText = `Cheshire Cat tricked you! ${delta} 😈`;
  }
  
  catEl.style.transform = `rotate(${random(-360,360)}deg)`;
  hideCheshireCat();
});

// Clicking background (missing the target)
container.addEventListener('click', (e) => {
  if (e.target === chaoticCursor || e.target === catEl) return;
  
  updateScore(-5); // -5 points for missing per spec
});

// Initialize game
function initGame() {
  // Position chaotic cursor initially
  teleportChaoticCursor();

  // Set initial message
  messageEl.innerText = "Click the chaotic cursor! 🎯";

  // Start main game loop - cursor teleports every 1-4 seconds (more frequent teleportation)
  setInterval(() => {
    teleportChaoticCursor();
    chaoticCursorDisappear();
  }, random(1000, 4000));

  // Additional random teleportation triggers for extra chaos
  setInterval(() => {
    if (Math.random() < 0.3) {
      teleportChaoticCursor(); // 30% chance for extra teleport
    }
  }, random(2000, 3000));

  // Occasional burst teleportation (multiple quick teleports)
  setInterval(() => {
    if (Math.random() < 0.2) {
      // Burst of 3 quick teleports
      setTimeout(() => teleportChaoticCursor(), 0);
      setTimeout(() => teleportChaoticCursor(), 500);
      setTimeout(() => teleportChaoticCursor(), 1000);
    }
  }, random(8000, 15000));

  // Cheshire Cat appears every 20-40 seconds
  setInterval(() => {
    if (!catVisible) {
      spawnCheshireCat();
    }
  }, random(20000, 40000));

  // Random screen effects every 5-10 seconds - now with more variety!
  setInterval(() => {
    const rand = Math.random();
    if (rand < 0.2) {
      screenShake();
    } else if (rand < 0.4) {
      vibrateScreen();
    } else if (rand < 0.6) {
      dizzyScreen();
    } else if (rand < 0.8) {
      psychedelicBackground();
    }

    // Sometimes combine effects for extra chaos
    if (rand > 0.85) {
      setTimeout(() => psychedelicBackground(), 500);
    }
    if (rand > 0.95) {
      setTimeout(() => vibrateScreen(), 1000);
    }
  }, random(5000, 10000));
}

// Start the game
initGame();