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
    constructor(scene, position, direction, enemies) {
        const geometry = new THREE.SphereGeometry(0.2, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 0.5
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(position);
        this.direction = direction.normalize();
        this.speed = 0.5;
        this.scene = scene;
        this.enemies = enemies;
        this.target = null;
        this.trackingStrength = 0.15; // How strongly it tracks enemies
        
        scene.add(this.mesh);
    }

    update() {
        // Find closest enemy to track if we don't have a target
        if (!this.target && this.enemies.length > 0) {
            let closestDistance = Infinity;
            let closestEnemy = null;
            
            for (const enemy of this.enemies) {
                const distance = this.mesh.position.distanceTo(enemy.mesh.position);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
            
            this.target = closestEnemy;
        }
        
        // Track the target if we have one
        if (this.target) {
            // Calculate direction to target
            const targetDir = new THREE.Vector3()
                .subVectors(this.target.mesh.position, this.mesh.position)
                .normalize();
                
            // Blend current direction with target direction
            this.direction.lerp(targetDir, this.trackingStrength);
            this.direction.normalize();
        }
        
        // Move projectile
        this.mesh.position.add(this.direction.clone().multiplyScalar(this.speed));
    }

    remove() {
        this.scene.remove(this.mesh);
    }
}

class Enemy {
    constructor(scene, snakeRef, boardSize) {
        // Use a more alien-like geometry
        const geometry = new THREE.OctahedronGeometry(0.8, 1);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, // Green alien color
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene = scene;
        this.snakeRef = snakeRef;
        this.speed = 0.08;
        this.health = 1; // Only 1 health - dies in one hit
        
        const halfBoardSize = boardSize / 2;
        
        // Random starting position away from snake
        do {
            // Position near the edges of the board
            const edgeChoice = Math.floor(Math.random() * 4);
            
            switch(edgeChoice) {
                case 0: // North edge
                    this.mesh.position.set(
                        Math.random() * (boardSize - 20) - (halfBoardSize - 10),
                        0,
                        halfBoardSize - 10 - Math.random() * 20
                    );
                    break;
                case 1: // South edge
                    this.mesh.position.set(
                        Math.random() * (boardSize - 20) - (halfBoardSize - 10),
                        0,
                        -halfBoardSize + 10 + Math.random() * 20
                    );
                    break;
                case 2: // East edge
                    this.mesh.position.set(
                        halfBoardSize - 10 - Math.random() * 20,
                        0,
                        Math.random() * (boardSize - 20) - (halfBoardSize - 10)
                    );
                    break;
                case 3: // West edge
                    this.mesh.position.set(
                        -halfBoardSize + 10 + Math.random() * 20,
                        0,
                        Math.random() * (boardSize - 20) - (halfBoardSize - 10)
                    );
                    break;
            }
        } while (this.mesh.position.distanceTo(snakeRef[0].position) < 15);
        
        scene.add(this.mesh);
    }

    update() {
        const direction = new THREE.Vector3()
            .subVectors(this.snakeRef[0].position, this.mesh.position)
            .normalize();
        this.mesh.position.add(direction.multiplyScalar(this.speed));
        
        // Rotate the enemy for a more dynamic look
        this.mesh.rotation.x += 0.02;
        this.mesh.rotation.y += 0.03;
    }

    hit() {
        // Always return true since health is 1
        return true;
    }

    remove() {
        this.scene.remove(this.mesh);
    }
    
    explode(particleSystem) {
        // Create explosion effect
        for (let i = 0; i < 20; i++) {
            particleSystem.createParticle(this.mesh.position.clone());
        }
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
        
        // Zoom in camera (closer to the snake)
        this.camera.position.set(0, 25, 25);
        this.camera.lookAt(0, 0, 0);
        
        // Define game board size (200x200)
        this.boardSize = 200;
        this.halfBoardSize = this.boardSize / 2;
        
        this.particleSystem = new ParticleSystem(this.scene);
        this.score = 0;
        this.direction = new THREE.Vector3(1, 0, 0);
        this.gameOver = false;
        
        // Speed settings for sprint feature
        this.normalSpeed = 1;
        this.sprintSpeed = 2;
        this.currentSpeed = this.normalSpeed;
        this.isSprinting = false;
    }

    createScene() {
        // Set background to black for space
        this.scene.background = new THREE.Color(0x000000);
        
        // Create starfield
        this.createStarfield();
        
        // Create simplified walls
        this.createWalls();

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
        const headMaterial = new THREE.MeshBasicMaterial({
            color: this.getRainbowColor(0)
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        
        // Add cannon that can rotate
        const cannonGeometry = new THREE.CylinderGeometry(0.1, 0.2, 0.5, 8);
        const cannonMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
        this.cannon = new THREE.Mesh(cannonGeometry, cannonMaterial);
        
        // Create a container for the cannon so it can rotate properly
        this.cannonContainer = new THREE.Object3D();
        this.cannonContainer.add(this.cannon);
        this.cannon.position.set(0.25, 0, 0); // Position relative to container
        
        head.add(this.cannonContainer);
        
        this.snake.push(head);
        this.scene.add(head);
        
        // Create body segments
        const snakeGeometry = new THREE.BoxGeometry(1, 1, 1);
        for (let i = 1; i < 3; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: this.getRainbowColor(i / 3)
            });
            const segment = new THREE.Mesh(snakeGeometry, material);
            segment.position.x = -i;
            this.snake.push(segment);
            this.scene.add(segment);
        }
        
        // Create food indicators
        this.createFoodIndicators();
    }

    createFood() {
        const geometry = new THREE.SphereGeometry(0.5, 8, 8);
        const material = new THREE.MeshBasicMaterial({
            color: this.getRainbowColor(Math.random())
        });
        this.food = new THREE.Mesh(geometry, material);
        this.repositionFood();
        this.scene.add(this.food);
    }

    repositionFood() {
        this.food.position.x = Math.floor(Math.random() * (this.boardSize - 10) - this.halfBoardSize + 5);
        this.food.position.z = Math.floor(Math.random() * (this.boardSize - 10) - this.halfBoardSize + 5);
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
                case 'ShiftLeft':
                case 'ShiftRight':
                    this.isSprinting = true;
                    this.currentSpeed = this.sprintSpeed;
                    break;
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                this.isSprinting = false;
                this.currentSpeed = this.normalSpeed;
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
        
        // Get the current direction of the snake's head
        const shootDirection = new THREE.Vector3(this.direction.x, 0, this.direction.z).normalize();
        
        // Create projectile with tracking
        const projectile = new Projectile(
            this.scene,
            head.position.clone().add(shootDirection.clone().multiplyScalar(1)),
            shootDirection,
            this.enemies // Pass enemies array for tracking
        );
        this.projectiles.push(projectile);
        
        // Recoil animation
        if (this.cannon) {
            // Adjust cannon position based on direction
            const originalPos = this.cannon.position.clone();
            this.cannon.position.x -= shootDirection.x * 0.2;
            this.cannon.position.z -= shootDirection.z * 0.2;
            
            setTimeout(() => {
                this.cannon.position.copy(originalPos);
            }, 100);
        }
    }

    spawnEnemy() {
        if (this.enemies.length < 5) { // Increased max enemies for larger board
            this.enemies.push(new Enemy(this.scene, this.snake, this.boardSize));
        }
    }

    createFoodIndicators() {
        // Create arrow indicators to point to food when it's off-screen
        const arrowGeometry = new THREE.ConeGeometry(0.5, 1, 4);
        const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        
        this.foodIndicator = new THREE.Mesh(arrowGeometry, arrowMaterial);
        this.foodIndicator.rotation.x = Math.PI / 2; // Point forward by default
        this.foodIndicator.visible = false;
        
        // Add to scene but don't attach to camera yet
        this.scene.add(this.foodIndicator);
    }
    
    updateFoodIndicator() {
        if (!this.food || !this.snake || this.snake.length === 0) return;
        
        const head = this.snake[0];
        
        // Project food position to screen space
        const foodScreenPosition = this.food.position.clone().project(this.camera);
        
        // Check if food is off-screen
        const isOffScreen = Math.abs(foodScreenPosition.x) > 0.9 || 
                           Math.abs(foodScreenPosition.y) > 0.9 ||
                           foodScreenPosition.z > 1;
        
        if (isOffScreen) {
            // Position the indicator at the edge of the screen in the direction of the food
            this.foodIndicator.visible = true;
            
            // Calculate position at edge of screen
            const edgeX = Math.sign(foodScreenPosition.x) * 0.85;
            const edgeY = Math.sign(foodScreenPosition.y) * 0.85;
            
            // Clamp to screen edges
            const screenX = Math.abs(foodScreenPosition.x) > 0.9 ? edgeX : foodScreenPosition.x;
            const screenY = Math.abs(foodScreenPosition.y) > 0.9 ? edgeY : foodScreenPosition.y;
            
            // Convert screen position back to world coordinates at a fixed distance from camera
            const indicatorDistance = 10;
            const vector = new THREE.Vector3(screenX, screenY, 0.5);
            vector.unproject(this.camera);
            vector.sub(this.camera.position).normalize();
            
            const indicatorPos = this.camera.position.clone()
                .add(vector.multiplyScalar(indicatorDistance));
            
            this.foodIndicator.position.copy(indicatorPos);
            
            // Point the indicator toward the food
            this.foodIndicator.lookAt(this.food.position);
        } else {
            this.foodIndicator.visible = false;
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
            if (Math.abs(projectile.mesh.position.x) > this.halfBoardSize || 
                Math.abs(projectile.mesh.position.z) > this.halfBoardSize) {
                projectile.remove();
                this.projectiles.splice(i, 1);
                continue;
            }
            
            // Check projectile collisions with enemies
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                if (projectile.mesh.position.distanceTo(enemy.mesh.position) < 1) {
                    if (enemy.hit()) {
                        // Create explosion effect
                        enemy.explode(this.particleSystem);
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

        // Move snake with smooth animation (apply sprint speed)
        const head = this.snake[0];
        const newHead = new THREE.Mesh(
            head.geometry,
            new THREE.MeshBasicMaterial({
                color: this.getRainbowColor(Math.random())
            })
        );

        // Copy cannon from old head to new head
        if (head.children.length > 0) {
            newHead.add(head.children[0]);
        }
        
        // Rotate cannon to face direction of movement
        if (this.cannonContainer) {
            if (this.direction.x === 1) {
                this.cannonContainer.rotation.y = 0;
            } else if (this.direction.x === -1) {
                this.cannonContainer.rotation.y = Math.PI;
            } else if (this.direction.z === 1) {
                this.cannonContainer.rotation.y = Math.PI / 2;
            } else if (this.direction.z === -1) {
                this.cannonContainer.rotation.y = -Math.PI / 2;
            }
        }

        newHead.position.copy(head.position);
        // Apply current speed (normal or sprint)
        newHead.position.add(this.direction.clone().multiplyScalar(this.currentSpeed));

        // Check collision with walls
        if (Math.abs(newHead.position.x) > this.halfBoardSize || Math.abs(newHead.position.z) > this.halfBoardSize) {
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

    createStarfield() {
        // Create a simplified starfield with fewer stars
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            transparent: true
        });
        
        const starsVertices = [];
        // Reduced number of stars from 2000 to 500
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 200;
            const y = (Math.random() - 0.5) * 200;
            const z = (Math.random() - 0.5) * 200;
            starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        this.stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(this.stars);
    }
    
    createWalls() {
        // Create simplified walls around the game board
        const wallHeight = 5; // Reduced height
        const wallThickness = 2;
        
        // Simplified wall material
        const wallMaterial = new THREE.MeshBasicMaterial({
            color: 0x0088ff,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        
        // North wall (+Z)
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.boardSize, wallHeight, wallThickness),
            wallMaterial
        );
        northWall.position.set(0, wallHeight/2, this.halfBoardSize);
        this.scene.add(northWall);
        
        // South wall (-Z)
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(this.boardSize, wallHeight, wallThickness),
            wallMaterial
        );
        southWall.position.set(0, wallHeight/2, -this.halfBoardSize);
        this.scene.add(southWall);
        
        // East wall (+X)
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, this.boardSize),
            wallMaterial
        );
        eastWall.position.set(this.halfBoardSize, wallHeight/2, 0);
        this.scene.add(eastWall);
        
        // West wall (-X)
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(wallThickness, wallHeight, this.boardSize),
            wallMaterial
        );
        westWall.position.set(-this.halfBoardSize, wallHeight/2, 0);
        this.scene.add(westWall);
        
        // Create a simplified grid on the floor (fewer divisions)
        const gridSize = this.boardSize;
        const gridDivisions = 10; // Reduced from 20
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x0088ff, 0x004477);
        gridHelper.position.y = -0.1; // Slightly below the game plane
        this.scene.add(gridHelper);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.frameCount === undefined) this.frameCount = 0;
        this.frameCount++;
        
        // Update food indicator every frame
        this.updateFoodIndicator();
        
        // Update game state less frequently
        if (this.frameCount % 10 === 0) {
            this.update();
        }
        
        // Rotate stars slightly
        if (this.stars) {
            this.stars.rotation.y += 0.0001;
        }
        
        this.particleSystem.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game
new Game();
