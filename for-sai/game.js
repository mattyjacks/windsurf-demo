/* Mini HTML MOBA – game.js
------------------------------------------------------------
Author: Cascade AI (for Matt)
A very lightweight MOBA-style demo that uses only
 plain JavaScript and simple shapes on an HTML canvas.
*/

// ================== CONFIG ==================
const CONFIG = {
  canvasW: 900,
  canvasH: 550,
  playerSpeed: 3.0,
  bulletSpeed: 6.0,
  enemySpeed: 1.5,
  enemySpawnInterval: 2500, // ms
  baseSize: 60,
  baseHealth: 100,
  playerRadius: 15,
  enemyRadius: 12,
  bulletRadius: 4,
};

// ================== EMOJI SETS ==================
const PLAYER_EMOJIS = ["😊","😂","😘","😒","😁","🤣","💀"]; // last is dead
const ENEMY_EMOJIS = ["😺","😸","😹","😻","😼","🐱","😾","😿","🙀","😽","☠️"]; // last is dead
const BULLET_EMOJI = "🔥";


// ================== GLOBALS ==================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let lastTimestamp = 0;

// Input state
const keys = {};
window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

// Game state
const player = {
  x: CONFIG.baseSize + 80,
  y: CONFIG.canvasH / 2,
  r: CONFIG.playerRadius,
  hp: 100,
  emoji: PLAYER_EMOJIS[Math.floor(Math.random()* (PLAYER_EMOJIS.length-1))], // exclude dead emoji
};

const bullets = [];
const enemies = [];

const bases = {
  friendly: {
    emoji: "🏠",
    x: 0,
    y: CONFIG.canvasH / 2 - CONFIG.baseSize / 2,
    w: CONFIG.baseSize,
    h: CONFIG.baseSize,
    hp: CONFIG.baseHealth,
    color: "#4caf50",
  },
  enemy: {
    x: CONFIG.canvasW - CONFIG.baseSize,
    y: CONFIG.canvasH / 2 - CONFIG.baseSize / 2,
    w: CONFIG.baseSize,
    h: CONFIG.baseSize,
    hp: CONFIG.baseHealth,
    color: "#e53935",
  },
};

let lastEnemySpawn = 0;
let gameOver = false;

// ================== HELPERS ==================
function distanceSq(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return dx * dx + dy * dy;
}

function spawnEnemy() {
  enemies.push({
    x: bases.enemy.x - CONFIG.enemyRadius - 2,
    y: bases.enemy.y + bases.enemy.h / 2,
    r: CONFIG.enemyRadius,
    hp: 10,
    emoji: ENEMY_EMOJIS[Math.floor(Math.random()* (ENEMY_EMOJIS.length-1))],
  });
}

function shootBullet() {
  bullets.push({
    x: player.x + player.r + 2,
    y: player.y,
    dx: 1,
    dy: 0,
    r: CONFIG.bulletRadius,
    emoji: BULLET_EMOJI,
  });
}

// ================== GAME LOOP ==================
function update(dt) {
  if (gameOver) return;

  // Player movement
  if (keys["w"]) player.y -= CONFIG.playerSpeed;
  if (keys["s"]) player.y += CONFIG.playerSpeed;
  if (keys["a"]) player.x -= CONFIG.playerSpeed;
  if (keys["d"]) player.x += CONFIG.playerSpeed;

  // Clamp player inside canvas
  player.x = Math.max(player.r, Math.min(CONFIG.canvasW - player.r, player.x));
  player.y = Math.max(player.r, Math.min(CONFIG.canvasH - player.r, player.y));

  // Shooting bullet
  if (keys[" "] || keys["space"]) {
    // simple rate limit: only allow every 200ms
    if (!player.lastShot || performance.now() - player.lastShot > 200) {
      shootBullet();
      player.lastShot = performance.now();
    }
  }

  // Update bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.dx * CONFIG.bulletSpeed;
    b.y += b.dy * CONFIG.bulletSpeed;

    // Remove if off-screen
    if (b.x - b.r > CONFIG.canvasW) bullets.splice(i, 1);
  }

  // Spawn enemies
  if (performance.now() - lastEnemySpawn > CONFIG.enemySpawnInterval) {
    spawnEnemy();
    lastEnemySpawn = performance.now();
  }

  // Update enemies
  enemies.forEach((e) => {
    // Move toward friendly base
    const angle = Math.atan2(
      bases.friendly.y + bases.friendly.h / 2 - e.y,
      bases.friendly.x + bases.friendly.w / 2 - e.x
    );
    e.x += Math.cos(angle) * CONFIG.enemySpeed;
    e.y += Math.sin(angle) * CONFIG.enemySpeed;
  });

  // Bullet-enemy collisions
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    for (let j = bullets.length - 1; j >= 0; j--) {
      const b = bullets[j];
      if (distanceSq(e.x, e.y, b.x, b.y) < (e.r + b.r) ** 2) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        break;
      }
    }
  }

  // Enemy reaching base
  for (let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    if (
      e.x - e.r < bases.friendly.x + bases.friendly.w &&
      e.y + e.r > bases.friendly.y &&
      e.y - e.r < bases.friendly.y + bases.friendly.h
    ) {
      bases.friendly.hp -= 5;
      enemies.splice(i, 1);
    }
  }

  // Check win/lose
  if (bases.friendly.hp <= 0) {
    gameOver = true;
    setTimeout(() => alert("Defeat! Your base was destroyed."), 10);
  } else if (bases.enemy.hp <= 0) {
    gameOver = true;
    setTimeout(() => alert("Victory! You destroyed the enemy base."), 10);
  }
}

function draw() {
  // Clear
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, CONFIG.canvasW, CONFIG.canvasH);
  // Set common text settings for emojis
  ctx.font = "28px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw bases
  [bases.friendly, bases.enemy].forEach((b) => {
    ctx.fillStyle = b.color;
    ctx.fillRect(b.x, b.y, b.w, b.h);
    if (b === bases.friendly) {
      // Draw house emoji at center of base
      ctx.fillText(b.emoji, b.x + b.w / 2, b.y + b.h / 2);
    }

    // HP bar
    ctx.fillStyle = "#000";
    ctx.fillRect(b.x, b.y - 12, b.w, 8);
    ctx.fillStyle = "#fff";
    const hpPct = Math.max(0, b.hp) / CONFIG.baseHealth;
    ctx.fillRect(b.x, b.y - 12, b.w * hpPct, 8);
  });

  // Draw player as emoji
  ctx.fillText(player.emoji, player.x, player.y);

  // Draw bullets as fire emoji
  bullets.forEach((b) => {
    ctx.fillText(b.emoji, b.x, b.y);
  });

  // Draw enemies as cat emoji
  enemies.forEach((e) => {
    ctx.fillText(e.emoji, e.x, e.y);
  });

  // UI text
  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.fillText(`Base HP: ${bases.friendly.hp}`, 10, 20);
}

function gameLoop(timestamp) {
  const dt = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
