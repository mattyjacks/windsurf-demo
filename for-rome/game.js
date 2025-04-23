class ParticleSystem {
    constructor(scene, position, color) {
        this.particles = [];
        this.scene = scene;
        this.alive = true;

        for (let i = 0; i < 50; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 8, 8);
            const material = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.5
            });
            const particle = new THREE.Mesh(geometry, material);
            particle.position.copy(position);
            
            // Random velocity
            particle.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                Math.random() * 0.5,
                (Math.random() - 0.5) * 0.3
            );
            
            this.particles.push(particle);
            this.scene.add(particle);
        }

        setTimeout(() => {
            this.particles.forEach(p => this.scene.remove(p));
            this.alive = false;
        }, 2000);
    }

    update() {
        if (!this.alive) return;
        
        this.particles.forEach(particle => {
            particle.position.add(particle.velocity);
            particle.velocity.y -= 0.02; // gravity
            particle.scale.multiplyScalar(0.98); // shrink
        });
    }
}

class SnakeGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x1a1a1a);
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // Game state
        this.snake = [];
        this.direction = new THREE.Vector3(1, 0, 0);
        this.food = null;
        this.score = 0;
        this.gameOver = false;
        this.gridSize = 20;
        this.speed = 200; // ms per move
        this.obstacles = [];
        this.corpses = [];
        this.particleSystems = [];
        this.canRestart = true;

        // Initialize game
        this.setupLights();
        this.setupGrid();
        this.initSnake();
        this.spawnFood();
        this.setupCamera();
        this.setupControls();

        // Start game loop
        this.lastTime = 0;
        this.animate();
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);
    }

    setupGrid() {
        const gridHelper = new THREE.GridHelper(this.gridSize, this.gridSize);
        gridHelper.position.set(0, -0.5, 0);
        this.scene.add(gridHelper);

        // Add a ground plane with a cool material
        const groundGeometry = new THREE.PlaneGeometry(this.gridSize, this.gridSize);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a0a,
            metalness: 0.5,
            roughness: 0.5
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        this.scene.add(ground);
    }

    setupCamera() {
        this.camera.position.set(0, 15, 20);
        this.camera.lookAt(0, 0, 0);
    }

    createSnakeSegment(position) {
        const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x002200
        });
        const segment = new THREE.Mesh(geometry, material);
        segment.position.copy(position);
        this.scene.add(segment);
        return segment;
    }

    initSnake() {
        const startPos = new THREE.Vector3(0, 0, 0);
        for (let i = 0; i < 3; i++) {
            const segment = this.createSnakeSegment(new THREE.Vector3(startPos.x - i, 0, 0));
            this.snake.push(segment);
        }
        this.spawnRandomObstacles(5);
    }

    spawnFood() {
        if (this.food) {
            this.scene.remove(this.food);
        }

        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x220000
        });
        this.food = new THREE.Mesh(geometry, material);

        // Random position
        const x = Math.floor(Math.random() * this.gridSize - this.gridSize/2);
        const z = Math.floor(Math.random() * this.gridSize - this.gridSize/2);
        this.food.position.set(x, 0, z);
        
        this.scene.add(this.food);
    }

    createObstacle(position) {
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b0000,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x200000
        });
        const obstacle = new THREE.Mesh(geometry, material);
        obstacle.position.copy(position);
        obstacle.position.y = 1; // Make it taller
        this.scene.add(obstacle);
        return obstacle;
    }

    spawnRandomObstacles(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * this.gridSize - this.gridSize/2);
            const z = Math.floor(Math.random() * this.gridSize - this.gridSize/2);
            
            // Don't spawn too close to snake start position
            if (Math.abs(x) < 3 && Math.abs(z) < 3) continue;
            
            const obstacle = this.createObstacle(new THREE.Vector3(x, 0, z));
            this.obstacles.push(obstacle);
        }
    }

    createCorpse(position) {
        const geometry = new THREE.BoxGeometry(0.9, 0.3, 0.9);
        const material = new THREE.MeshStandardMaterial({
            color: 0x8b0000,
            metalness: 0.6,
            roughness: 0.4,
            emissive: 0x110000
        });
        const corpse = new THREE.Mesh(geometry, material);
        corpse.position.copy(position);
        this.scene.add(corpse);
        return corpse;
    }

    createExplosion(position) {
        const bloodParticles = new ParticleSystem(this.scene, position, 0xff0000);
        this.particleSystems.push(bloodParticles);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver) {
                if (e.code === 'Space') {
                    this.restart();
                }
                return;
            }

            switch(e.code) {
                case 'ArrowUp':
                    if (this.direction.z === 0) this.direction.set(0, 0, -1);
                    break;
                case 'ArrowDown':
                    if (this.direction.z === 0) this.direction.set(0, 0, 1);
                    break;
                case 'ArrowLeft':
                    if (this.direction.x === 0) this.direction.set(-1, 0, 0);
                    break;
                case 'ArrowRight':
                    if (this.direction.x === 0) this.direction.set(1, 0, 0);
                    break;
            }
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    moveSnake() {
        const head = this.snake[0];
        const newHead = this.createSnakeSegment(
            new THREE.Vector3(
                head.position.x + this.direction.x,
                head.position.y,
                head.position.z + this.direction.z
            )
        );

        // Check collision with walls
        if (Math.abs(newHead.position.x) > this.gridSize/2 || 
            Math.abs(newHead.position.z) > this.gridSize/2) {
            this.createExplosion(newHead.position);
            this.endGame();
            return;
        }

        // Check collision with obstacles
        for (const obstacle of this.obstacles.concat(this.corpses)) {
            if (newHead.position.distanceTo(obstacle.position) < 1) {
                this.createExplosion(newHead.position);
                this.endGame();
                return;
            }
        }

        // Check self-collision
        for (const segment of this.snake) {
            if (newHead.position.distanceTo(segment.position) < 0.1) {
                this.endGame();
                return;
            }
        }

        this.snake.unshift(newHead);

        // Check food collision
        if (newHead.position.distanceTo(this.food.position) < 1) {
            this.score += 10;
            document.getElementById('score-value').textContent = this.score;
            this.spawnFood();
        } else {
            const tail = this.snake.pop();
            this.scene.remove(tail);
        }
    }

    endGame() {
        this.gameOver = true;
        document.getElementById('game-over').classList.remove('hidden');
        
        // Turn the entire snake into corpses
        this.snake.forEach(segment => {
            const corpse = this.createCorpse(segment.position);
            this.corpses.push(corpse);
            this.scene.remove(segment);
        });
        this.snake = [];
    }

    restart() {
        // Prevent multiple rapid restarts
        this.canRestart = false;
        setTimeout(() => this.canRestart = true, 500);

        // Clear existing game objects
        this.snake.forEach(segment => this.scene.remove(segment));
        this.scene.remove(this.food);
        this.obstacles.forEach(obstacle => this.scene.remove(obstacle));
        this.obstacles = [];
        
        // Reset game state
        this.snake = [];
        this.direction = new THREE.Vector3(1, 0, 0);
        this.score = 0;
        this.gameOver = false;
        
        // Reset UI
        document.getElementById('score-value').textContent = '0';
        document.getElementById('game-over').classList.add('hidden');
        
        // Initialize new game
        this.initSnake();
        this.spawnFood();
    }

    animate(currentTime) {
        requestAnimationFrame((time) => this.animate(time));

        if (!this.gameOver && currentTime - this.lastTime > this.speed) {
            this.moveSnake();
            this.lastTime = currentTime;
        }

        // Update particle systems
        this.particleSystems = this.particleSystems.filter(ps => {
            ps.update();
            return ps.alive;
        });

        // Rotate food and obstacles for visual effect
        if (this.food) {
            this.food.rotation.y += 0.05;
        }
        this.obstacles.forEach(obstacle => {
            obstacle.rotation.y += 0.02;
        });

        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game
new SnakeGame();
