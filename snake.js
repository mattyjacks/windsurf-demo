class SnakeGame {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        document.getElementById('game-container').appendChild(this.renderer.domElement);

        // Game state
        this.snake = [];
        this.direction = new THREE.Vector3(1, 0, 0);
        this.nextDirection = this.direction.clone();
        this.food = null;
        this.score = 0;
        this.gameOver = false;
        this.gridSize = 20;
        this.speed = 200; // ms per move

        // Initialize game
        this.setupLighting();
        this.createEnvironment();
        this.initSnake();
        this.spawnFood();
        this.setupControls();
        
        // Start game loop
        this.lastTime = performance.now();
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);

        // Add point lights for dramatic effect
        const colors = [0x00ff87, 0x60efff, 0xff3860];
        colors.forEach((color, i) => {
            const light = new THREE.PointLight(color, 1, 20);
            light.position.set(
                Math.sin(i * Math.PI * 2 / 3) * 10,
                5,
                Math.cos(i * Math.PI * 2 / 3) * 10
            );
            this.scene.add(light);
        });
    }

    createEnvironment() {
        // Create a reflective ground plane
        const groundGeometry = new THREE.PlaneGeometry(30, 30);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.8,
            roughness: 0.2,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.5;
        this.scene.add(ground);

        // Add a subtle grid
        const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
        gridHelper.position.y = -0.49;
        this.scene.add(gridHelper);

        // Position camera
        this.camera.position.set(15, 15, 15);
        this.camera.lookAt(0, 0, 0);
    }

    createSnakeSegment() {
        const geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ff87,
            metalness: 0.7,
            roughness: 0.2,
            emissive: 0x00ff87,
            emissiveIntensity: 0.2
        });
        return new THREE.Mesh(geometry, material);
    }

    initSnake() {
        // Create initial snake
        for (let i = 0; i < 3; i++) {
            const segment = this.createSnakeSegment();
            segment.position.x = -i;
            this.snake.push(segment);
            this.scene.add(segment);
        }
    }

    createFood() {
        const geometry = new THREE.SphereGeometry(0.4, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xff3860,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0xff3860,
            emissiveIntensity: 0.5
        });
        return new THREE.Mesh(geometry, material);
    }

    spawnFood() {
        if (!this.food) {
            this.food = this.createFood();
            this.scene.add(this.food);
        }

        // Random position excluding snake positions
        let position;
        do {
            position = new THREE.Vector3(
                Math.floor(Math.random() * (this.gridSize - 2)) - Math.floor((this.gridSize - 2) / 2),
                0,
                Math.floor(Math.random() * (this.gridSize - 2)) - Math.floor((this.gridSize - 2) / 2)
            );
        } while (this.snake.some(segment => 
            segment.position.x === position.x && 
            segment.position.z === position.z
        ));

        this.food.position.set(position.x, 0, position.z);
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            if (this.gameOver) {
                if (event.code === 'Space') {
                    this.resetGame();
                }
                return;
            }

            const key = event.key.toLowerCase();
            if (['arrowup', 'w'].includes(key) && this.direction.z === 0) {
                this.nextDirection.set(0, 0, -1);
            } else if (['arrowdown', 's'].includes(key) && this.direction.z === 0) {
                this.nextDirection.set(0, 0, 1);
            } else if (['arrowleft', 'a'].includes(key) && this.direction.x === 0) {
                this.nextDirection.set(-1, 0, 0);
            } else if (['arrowright', 'd'].includes(key) && this.direction.x === 0) {
                this.nextDirection.set(1, 0, 0);
            }
        });
    }

    moveSnake() {
        // Update direction
        this.direction.copy(this.nextDirection);

        // Get new head position
        const head = this.snake[0];
        const newHead = this.createSnakeSegment();
        newHead.position.copy(head.position).add(this.direction);

        // Check collision with walls
        if (Math.abs(newHead.position.x) > this.gridSize/2 || 
            Math.abs(newHead.position.z) > this.gridSize/2) {
            this.gameOver = true;
            return;
        }

        // Check collision with self
        if (this.snake.some(segment => 
            segment.position.x === newHead.position.x && 
            segment.position.z === newHead.position.z
        )) {
            this.gameOver = true;
            return;
        }

        // Add new head
        this.snake.unshift(newHead);
        this.scene.add(newHead);

        // Check if food is eaten
        if (this.food.position.x === newHead.position.x && 
            this.food.position.z === newHead.position.z) {
            this.score += 10;
            document.getElementById('score').textContent = `Score: ${this.score}`;
            this.spawnFood();
        } else {
            // Remove tail
            const tail = this.snake.pop();
            this.scene.remove(tail);
        }
    }

    resetGame() {
        // Remove all snake segments and food
        this.snake.forEach(segment => this.scene.remove(segment));
        if (this.food) this.scene.remove(this.food);

        // Reset game state
        this.snake = [];
        this.direction = new THREE.Vector3(1, 0, 0);
        this.nextDirection = this.direction.clone();
        this.score = 0;
        this.gameOver = false;
        document.getElementById('score').textContent = `Score: ${this.score}`;

        // Reinitialize game
        this.initSnake();
        this.spawnFood();
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const currentTime = performance.now();
        if (currentTime - this.lastTime >= this.speed && !this.gameOver) {
            this.moveSnake();
            this.lastTime = currentTime;
        }

        // Rotate food for visual effect
        if (this.food) {
            this.food.rotation.y += 0.02;
        }

        // Subtle camera movement
        this.camera.position.x = 15 * Math.cos(currentTime * 0.0001);
        this.camera.position.z = 15 * Math.sin(currentTime * 0.0001);
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game when the page loads
window.onload = () => {
    new SnakeGame();
};
