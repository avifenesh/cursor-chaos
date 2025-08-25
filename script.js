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

  if(delta > 0){
    messageEl.innerText = ['Yay! 🎉','Woohoo! 😎','Nice! 😺','Great! 🌟'][Math.floor(Math.random()*4)];
    messageEl.style.color = '#4CAF50';
    // Happy confetti effect
    spawnConfetti();
  } else {
    messageEl.innerText = ['Ouch! 🤡','Try again 😹','Haha 😈','Miss! 💥'][Math.floor(Math.random()*4)];
    messageEl.style.color = '#f44336';
    // Screen shake for negative feedback
    screenShake();
  }

  // Clear message after 2 seconds
  updateScore.messageTimeout = setTimeout(() => {
    messageEl.innerText = 'Click the chaotic cursor! 🎯';
    messageEl.style.color = '#444';
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
 * Screen shake effect for negative feedback
 */
function screenShake() {
  const intensity = random(5,15);
  container.style.transform = `translate(${random(-intensity,intensity)}px, ${random(-intensity,intensity)}px)`;
  setTimeout(()=> container.style.transform='translate(0,0)',200);
}

/**
 * Teleport the chaotic cursor to a random position with random size
 */
function teleportChaoticCursor() {
  if (!chaoticCursorVisible) return;
  
  // Random position (keeping some margin from edges)
  const margin = 60;
  const newX = random(margin, window.innerWidth - margin);
  const newY = random(margin, window.innerHeight - margin);
  
  // Random size
  const newSize = random(30, 60);
  
  // Random emoji
  const emojis = ['🎯', '🐭', '🍪', '⭐', '💎', '🎈'];
  const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Apply changes
  chaoticCursor.style.left = `${newX}px`;
  chaoticCursor.style.top = `${newY}px`;
  chaoticCursor.style.width = `${newSize}px`;
  chaoticCursor.style.height = `${newSize}px`;
  chaoticCursor.style.fontSize = `${newSize * 0.5}px`;
  chaoticCursor.innerHTML = newEmoji;
  chaoticCursor.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
  
  // Add a little spin effect
  chaoticCursor.style.transform = `rotate(${random(-180, 180)}deg)`;
  setTimeout(() => {
    chaoticCursor.style.transform = 'rotate(0deg)';
  }, 300);
}

/**
 * Make chaotic cursor disappear and reappear
 */
function chaoticCursorDisappear() {
  if (Math.random() < 0.3) { // 30% chance to disappear
    chaoticCursorVisible = false;
    chaoticCursor.style.opacity = '0';
    chaoticCursor.style.pointerEvents = 'none';
    
    // Reappear after 1-2 seconds
    setTimeout(() => {
      chaoticCursorVisible = true;
      chaoticCursor.style.opacity = '1';
      chaoticCursor.style.pointerEvents = 'auto';
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
  catEl.style.display = 'flex';
  catEl.style.opacity = '0';
  catEl.style.left = `${random(0, window.innerWidth-80)}px`;
  catEl.style.top = `${random(0, window.innerHeight-80)}px`;
  
  // Fade in
  setTimeout(() => {
    catEl.style.opacity = '0.8';
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
  catEl.style.opacity = '0';
  setTimeout(() => {
    catEl.style.display = 'none';
  }, 300);
}

// Event Listeners

// Clicking the chaotic cursor (main game mechanic)
chaoticCursor.addEventListener('click', (e) => {
  e.stopPropagation();
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
  messageEl.innerText = 'Click the chaotic cursor! 🎯';
  
  // Start main game loop - cursor teleports every 4-6 seconds (slower for better playability)
  setInterval(() => {
    teleportChaoticCursor();
    chaoticCursorDisappear();
  }, random(4000, 6000));
  
  // Cheshire Cat appears every 20-40 seconds
  setInterval(() => {
    if (!catVisible) {
      spawnCheshireCat();
    }
  }, random(20000, 40000));
  
  // Random screen effects every 5-10 seconds
  setInterval(() => {
    if (Math.random() < 0.3) {
      screenShake();
    }
  }, random(5000, 10000));
}

// Start the game
initGame();