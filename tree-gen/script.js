// Global variables
let scene, camera, renderer, controls;
let tree, pedestal;
let barkTexture, leafTexture;
let defaultBarkTexture, defaultLeafTexture;

// Parameters with default values
const params = {
    branchLength: 1,
    branchThickness: 1,
    leafDensity: 1,
    branchAngle: 0.7
};

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth - 300, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 20;

    // Add lights
    addLights();

    // Load default textures
    loadDefaultTextures();

    // Create environment
    createEnvironment();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Add event listeners
    document.getElementById('randomize-btn').addEventListener('click', generateRandomTree);
    document.getElementById('bark-texture').addEventListener('change', handleBarkTextureUpload);
    document.getElementById('leaf-texture').addEventListener('change', handleLeafTextureUpload);
    
    // Add parameter event listeners
    document.getElementById('branch-length').addEventListener('input', updateBranchLength);
    document.getElementById('branch-thickness').addEventListener('input', updateBranchThickness);
    document.getElementById('leaf-density').addEventListener('input', updateLeafDensity);
    document.getElementById('branch-angle').addEventListener('input', updateBranchAngle);

    // Start animation loop
    animate();
}

// Load default textures
function loadDefaultTextures() {
    const textureLoader = new THREE.TextureLoader();
    
    // Load default bark texture
    defaultBarkTexture = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg', function(texture) {
        barkTexture = texture;
        barkTexture.wrapS = THREE.RepeatWrapping;
        barkTexture.wrapT = THREE.RepeatWrapping;
        barkTexture.repeat.set(1, 1);
        
        // Set preview
        document.getElementById('bark-preview').style.backgroundImage = `url(https://threejs.org/examples/textures/hardwood2_diffuse.jpg)`;
        
        // Generate initial tree after texture is loaded
        generateRandomTree();
    });
    
    // Load default leaf texture
    defaultLeafTexture = textureLoader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg', function(texture) {
        leafTexture = texture;
        leafTexture.wrapS = THREE.RepeatWrapping;
        leafTexture.wrapT = THREE.RepeatWrapping;
        leafTexture.repeat.set(1, 1);
        
        // Set preview
        document.getElementById('leaf-preview').style.backgroundImage = `url(https://threejs.org/examples/textures/terrain/grasslight-big.jpg)`;
    });
}

// Add lights to the scene
function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    
    // Configure shadow properties
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    
    scene.add(directionalLight);
    
    // Add a soft fill light
    const fillLight = new THREE.DirectionalLight(0x9090ff, 0.4);
    fillLight.position.set(-5, 3, -5);
    scene.add(fillLight);
}

// Create environment (floor, etc.)
function createEnvironment() {
    // Create a pedestal for the tree
    const pedestalGeometry = new THREE.CylinderGeometry(2, 2.5, 0.5, 32);
    const pedestalMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.7,
        metalness: 0.2
    });
    pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.y = -0.25;
    pedestal.receiveShadow = true;
    scene.add(pedestal);
    
    // Add a subtle ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);
}

// Generate a random tree
function generateRandomTree() {
    // Remove existing tree if present
    if (tree) {
        scene.remove(tree);
    }
    
    // Create a new group for the tree
    tree = new THREE.Group();
    
    // Generate random parameters
    const randomParams = {
        trunkHeight: 1 + Math.random() * 2 * params.branchLength,
        trunkRadius: 0.2 + Math.random() * 0.3 * params.branchThickness,
        branchFactor: 0.6 + Math.random() * 0.3,
        iterations: 3 + Math.floor(Math.random() * 2),
        xBias: -0.1 + Math.random() * 0.2,
        zBias: -0.1 + Math.random() * 0.2,
        leafSize: 0.3 + Math.random() * 0.3 * params.leafDensity,
        branchAngleMax: 0.3 + Math.random() * 0.5 * params.branchAngle
    };
    
    // Create trunk material with bark texture
    const trunkMaterial = new THREE.MeshStandardMaterial({
        map: barkTexture,
        roughness: 0.8,
        metalness: 0.1
    });
    
    // Create leaf material with leaf texture
    const leafMaterial = new THREE.MeshStandardMaterial({
        map: leafTexture,
        roughness: 0.7,
        metalness: 0.0,
        side: THREE.DoubleSide
    });
    
    // Create the trunk
    const trunkGeometry = new THREE.CylinderGeometry(
        randomParams.trunkRadius * 0.7, 
        randomParams.trunkRadius, 
        randomParams.trunkHeight, 
        8
    );
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = randomParams.trunkHeight / 2;
    trunk.castShadow = true;
    tree.add(trunk);
    
    // Generate branches recursively
    generateBranches(
        trunk.position.clone().add(new THREE.Vector3(0, randomParams.trunkHeight / 2, 0)),
        new THREE.Vector3(0, 1, 0),
        randomParams.trunkHeight * 0.8,
        randomParams.trunkRadius * 0.7,
        0,
        randomParams,
        trunkMaterial,
        leafMaterial
    );
    
    // Add the tree to the scene
    scene.add(tree);
    
    // Position the tree on the pedestal
    tree.position.y = 0;
}

// Recursively generate branches
function generateBranches(startPosition, direction, length, radius, iteration, params, branchMaterial, leafMaterial) {
    if (iteration >= params.iterations) {
        // Add leaves at the end of branches
        addLeaves(startPosition, params.leafSize, leafMaterial);
        return;
    }
    
    // Number of child branches
    const numBranches = 2 + Math.floor(Math.random() * 2);
    
    for (let i = 0; i < numBranches; i++) {
        // Calculate new direction with some randomness
        const newDirection = direction.clone();
        
        // Apply random rotation
        const rotationAxis = new THREE.Vector3(
            Math.random() - 0.5,
            (Math.random() - 0.5) * 0.5,
            Math.random() - 0.5
        ).normalize();
        
        const rotationAngle = Math.random() * params.branchAngleMax * Math.PI;
        newDirection.applyAxisAngle(rotationAxis, rotationAngle);
        
        // Apply bias
        newDirection.x += params.xBias * (Math.random() - 0.5) * 0.1;
        newDirection.z += params.zBias * (Math.random() - 0.5) * 0.1;
        newDirection.normalize();
        
        // Calculate new branch parameters
        const newLength = length * (params.branchFactor + (Math.random() - 0.5) * 0.2);
        const newRadius = radius * (params.branchFactor + (Math.random() - 0.5) * 0.1);
        
        // Calculate end position
        const endPosition = startPosition.clone().add(
            newDirection.clone().multiplyScalar(newLength)
        );
        
        // Create branch geometry
        const branchGeometry = createBranchGeometry(startPosition, endPosition, radius, newRadius);
        const branch = new THREE.Mesh(branchGeometry, branchMaterial);
        branch.castShadow = true;
        tree.add(branch);
        
        // Recursively create more branches
        generateBranches(
            endPosition,
            newDirection,
            newLength,
            newRadius,
            iteration + 1,
            params,
            branchMaterial,
            leafMaterial
        );
    }
    
    // Add some leaves along the branches for more fullness
    if (iteration > 0 && Math.random() > 0.5) {
        addLeaves(startPosition, params.leafSize * 0.7, leafMaterial);
    }
}

// Create a geometry for a branch between two points
function createBranchGeometry(startPoint, endPoint, startRadius, endRadius) {
    // Direction from start to end
    const direction = new THREE.Vector3().subVectors(endPoint, startPoint);
    const length = direction.length();
    
    // Create a cylinder geometry
    const geometry = new THREE.CylinderGeometry(endRadius, startRadius, length, 8);
    
    // Position and rotate the geometry
    geometry.translate(0, length / 2, 0);
    
    // Create a mesh to manipulate the geometry
    const mesh = new THREE.Mesh(geometry);
    
    // Orient the cylinder to point in the direction
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    
    // Position the cylinder at the start point
    mesh.position.copy(startPoint);
    
    // Update the geometry
    mesh.updateMatrix();
    geometry.applyMatrix4(mesh.matrix);
    
    return geometry;
}

// Add leaves around a point
function addLeaves(position, size, material) {
    const numLeaves = 3 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < numLeaves; i++) {
        // Random direction for leaf
        const direction = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() * 0.5,
            Math.random() - 0.5
        ).normalize();
        
        // Random leaf size variation
        const leafSize = size * (0.7 + Math.random() * 0.6);
        
        // Create leaf geometry
        const leafGeometry = new THREE.PlaneGeometry(leafSize, leafSize);
        const leaf = new THREE.Mesh(leafGeometry, material);
        
        // Position leaf
        const leafPosition = position.clone().add(
            direction.clone().multiplyScalar(size * 0.5)
        );
        leaf.position.copy(leafPosition);
        
        // Orient leaf to face random direction
        leaf.lookAt(leafPosition.clone().add(direction));
        
        // Add some random rotation
        leaf.rotation.z = Math.random() * Math.PI * 2;
        
        leaf.castShadow = true;
        tree.add(leaf);
    }
}

// Handle bark texture upload
function handleBarkTextureUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update preview
            document.getElementById('bark-preview').style.backgroundImage = `url(${e.target.result})`;
            
            // Create texture from uploaded image
            const textureLoader = new THREE.TextureLoader();
            barkTexture = textureLoader.load(e.target.result);
            barkTexture.wrapS = THREE.RepeatWrapping;
            barkTexture.wrapT = THREE.RepeatWrapping;
            
            // Regenerate tree with new texture
            generateRandomTree();
        };
        reader.readAsDataURL(file);
    }
}

// Handle leaf texture upload
function handleLeafTextureUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update preview
            document.getElementById('leaf-preview').style.backgroundImage = `url(${e.target.result})`;
            
            // Create texture from uploaded image
            const textureLoader = new THREE.TextureLoader();
            leafTexture = textureLoader.load(e.target.result);
            leafTexture.wrapS = THREE.RepeatWrapping;
            leafTexture.wrapT = THREE.RepeatWrapping;
            
            // Regenerate tree with new texture
            generateRandomTree();
        };
        reader.readAsDataURL(file);
    }
}

// Parameter update functions
function updateBranchLength(event) {
    params.branchLength = parseFloat(event.target.value);
    generateRandomTree();
}

function updateBranchThickness(event) {
    params.branchThickness = parseFloat(event.target.value);
    generateRandomTree();
}

function updateLeafDensity(event) {
    params.leafDensity = parseFloat(event.target.value);
    generateRandomTree();
}

function updateBranchAngle(event) {
    params.branchAngle = parseFloat(event.target.value);
    generateRandomTree();
}

// Handle window resize
function onWindowResize() {
    camera.aspect = (window.innerWidth - 300) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 300, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize the application
window.addEventListener('DOMContentLoaded', init);
