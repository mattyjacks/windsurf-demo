class ParticleSystem {
    constructor(scene) {
        this.particles = [];
        this.scene = scene;
    }

    createParticle(position) {
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: this.getRandomRainbowColor(),
            transparent: true,
            opacity: 1
        });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.copy(position);
        particle.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            Math.random() * 0.5,
            (Math.random() - 0.5) * 0.3
        );
        particle.life = 1.0;
        this.particles.push(particle);
        this.scene.add(particle);
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.position.add(particle.velocity);
            particle.life -= 0.02;
            particle.material.opacity = particle.life;

            if (particle.life <= 0) {
                this.scene.remove(particle);
                this.particles.splice(i, 1);
            }
        }
    }

    getRandomRainbowColor() {
        const hue = Math.random();
        return new THREE.Color().setHSL(hue, 1, 0.5);
    }
}

class Projectile {
    constructor(scene, position, direction) {
        const geometry = new THREE.SphereGeometry(0.2, 8, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);
        this.direction = direction.normalize();
        this.speed = 0.5;
        this.scene = scene;
        scene.add(this.mesh);
    }

    update() {
        this.mesh.position.add(this.direction.multiplyScalar(this.speed));
    }

    remove() {
        this.scene.remove(this.mesh);
    }
}

class Enemy {
    constructor(scene, snakeRef) {
        const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene = scene;
        this.snakeRef = snakeRef;
        this.speed = 0.08;
        this.health = 3;
        
        // Random starting position away from snake
        do {
            this.mesh.position.set(
                Math.random() * 18 - 9,
                0,
                Math.random() * 18 - 9
            );
        } while (this.mesh.position.distanceTo(snakeRef[0].position) < 5);
        
        scene.add(this.mesh);
    }

    update() {
        const direction = new THREE.Vector3()
            .subVectors(this.snakeRef[0].position, this.mesh.position)
            .normalize();
        this.mesh.position.add(direction.multiplyScalar(this.speed));
        
        // Make enemy glow red
        this.mesh.material.emissive.setRGB(
            0.5 + Math.sin(Date.now() * 0.005) * 0.5,
            0,
            0
        );
    }

    hit() {
        this.health--;
        this.mesh.scale.multiplyScalar(0.8);
        return this.health <= 0;
    }

    remove() {
        this.scene.remove(this.mesh);
    }
}

class Game {
    constructor() {
        this.setup();
        this.createScene();
        this.createSnake();
        this.createFood();
        this.setupControls();
        this.projectiles = [];
        this.enemies = [];
        this.lastShot = 0;
        this.animate();
    }

    setup() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('game-container').appendChild(this.renderer.domElement);
        
        this.camera.position.set(0, 15, 15);
        this.camera.lookAt(0, 0, 0);
        
        this.particleSystem = new ParticleSystem(this.scene);
        this.score = 0;
        this.direction = new THREE.Vector3(1, 0, 0);
        this.gameOver = false;
    }

    createScene() {
        // Grid
        const gridHelper = new THREE.GridHelper(20, 20);
        this.scene.add(gridHelper);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);
    }

    createSnake() {
        this.snake = [];
        
        // Create head with cannon
        const headGeometry = new THREE.BoxGeometry(1, 1, 1);
        const headMaterial = new THREE.MeshPhongMaterial({
            color: this.getRainbowColor(0),
            shininess: 100
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        
        // Add cannon
        const cannonGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.5, 8);
        const cannonMaterial = new THREE.MeshPhongMaterial({ color: 0x444444 });
        this.cannon = new THREE.Mesh(cannonGeometry, cannonMaterial);
        this.cannon.rotation.z = Math.PI / 2;
        this.cannon.position.x = 0.5;
        head.add(this.cannon);
        
        this.snake.push(head);
        this.scene.add(head);
        
        // Create body segments
        const snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
        for (let i = 1; i < 3; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: this.getRainbowColor(i / 3),
                shininess: 100
            });
            const segment = new THREE.Mesh(snakeGeometry, material);
            segment.position.x = -i;
            this.snake.push(segment);
            this.scene.add(segment);
        }
    }

    createFood() {
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: this.getRainbowColor(Math.random()),
            shininess: 100
        });
        this.food = new THREE.Mesh(geometry, material);
        this.repositionFood();
        this.scene.add(this.food);
    }

    repositionFood() {
        this.food.position.x = Math.floor(Math.random() * 19 - 9);
        this.food.position.z = Math.floor(Math.random() * 19 - 9);
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
                    if (this.direction.z !== 1) this.direction.set(0, 0, -1);
                    break;
                case 'ArrowDown':
                    if (this.direction.z !== -1) this.direction.set(0, 0, 1);
                    break;
                case 'ArrowLeft':
                    if (this.direction.x !== 1) this.direction.set(-1, 0, 0);
                    break;
                case 'ArrowRight':
                    if (this.direction.x !== -1) this.direction.set(1, 0, 0);
                    break;
                case 'Space':
                    this.shoot();
                    break;
            }
        });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    shoot() {
        const now = Date.now();
        if (now - this.lastShot < 500) return; // Cooldown of 500ms
        
        this.lastShot = now;
        const head = this.snake[0];
        const projectile = new Projectile(
            this.scene,
            head.position.clone().add(new THREE.Vector3(this.direction.x, 0, this.direction.z).multiplyScalar(1)),
            new THREE.Vector3(this.direction.x, 0, this.direction.z)
        );
        this.projectiles.push(projectile);
        
        // Recoil animation
        this.cannon.position.x = 0.3;
        setTimeout(() => {
            this.cannon.position.x = 0.5;
        }, 100);
    }

    spawnEnemy() {
        if (this.enemies.length < 3) {
            this.enemies.push(new Enemy(this.scene, this.snake));
        }
    }

    update() {
        if (this.gameOver) return;

        // Spawn enemies periodically
        if (Math.random() < 0.005) {
            this.spawnEnemy();
        }

        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update();
            
            // Remove projectiles that are out of bounds
            if (Math.abs(projectile.mesh.position.x) > 10 || 
                Math.abs(projectile.mesh.position.z) > 10) {
                projectile.remove();
                this.projectiles.splice(i, 1);
                continue;
            }
            
            // Check projectile collisions with enemies
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                if (projectile.mesh.position.distanceTo(enemy.mesh.position) < 1) {
                    if (enemy.hit()) {
                        enemy.remove();
                        this.enemies.splice(j, 1);
                        this.score += 50;
                        document.getElementById('score-value').textContent = this.score;
                    }
                    projectile.remove();
                    this.projectiles.splice(i, 1);
                    break;
                }
            }
        }

        // Update enemies
        for (const enemy of this.enemies) {
            enemy.update();
            
            // Check if enemy touches snake
            if (enemy.mesh.position.distanceTo(this.snake[0].position) < 1) {
                this.endGame();
                return;
            }
        }

        // Move snake with smooth animation
        const head = this.snake[0];
        const newHead = new THREE.Mesh(
            head.geometry,
            new THREE.MeshPhongMaterial({
                color: this.getRainbowColor(Math.random()),
                shininess: 100
            })
        );

        // Copy cannon from old head to new head
        if (head.children.length > 0) {
            newHead.add(head.children[0]);
        }

        newHead.position.copy(head.position);
        newHead.position.add(this.direction);

        // Check collision with walls
        if (Math.abs(newHead.position.x) > 10 || Math.abs(newHead.position.z) > 10) {
            this.endGame();
            return;
        }

        // Check collision with self
        for (const segment of this.snake) {
            if (newHead.position.distanceTo(segment.position) < 0.5) {
                this.endGame();
                return;
            }
        }

        // Check if food is eaten
        if (newHead.position.distanceTo(this.food.position) < 1) {
            this.score += 10;
            document.getElementById('score-value').textContent = this.score;
            this.repositionFood();
            
            // Create particle effect at food position
            for (let i = 0; i < 10; i++) {
                this.particleSystem.createParticle(this.food.position.clone());
            }
        } else {
            const tail = this.snake.pop();
            this.scene.remove(tail);
        }

        this.snake.unshift(newHead);
        this.scene.add(newHead);
    }

    getRainbowColor(t) {
        return new THREE.Color().setHSL(t, 1, 0.5);
    }

    endGame() {
        this.gameOver = true;
        document.getElementById('game-over').classList.remove('hidden');
    }

    restart() {
        // Clear existing game objects
        this.snake.forEach(segment => this.scene.remove(segment));
        this.scene.remove(this.food);
        
        // Clear projectiles
        this.projectiles.forEach(p => p.remove());
        this.projectiles = [];
        
        // Clear enemies
        this.enemies.forEach(e => e.remove());
        this.enemies = [];
        
        // Reset game state
        this.snake = [];
        this.score = 0;
        document.getElementById('score-value').textContent = '0';
        this.direction.set(1, 0, 0);
        this.gameOver = false;
        document.getElementById('game-over').classList.add('hidden');
        this.lastShot = 0;
        
        // Create new game objects
        this.createSnake();
        this.createFood();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;
        
        if (this.frameCount % 10 === 0) {
            this.update();
        }
        
        this.particleSystem.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game
new Game();
