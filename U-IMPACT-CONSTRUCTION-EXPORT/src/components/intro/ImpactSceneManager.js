import * as THREE from 'three';
import { SeedGlowShader, ShockwaveShader, createParticleTexture } from './ImpactShaders';

/**
 * Community Node Data for Scene 4 (One Becomes Many)
 */
export const COMMUNITY_NODES = [
  { id: 1, name: "Youth Leadership Labs", x: -14, z: 8, y: 0.8, category: "Youth & Future", impact: "420+ Scholars" },
  { id: 2, name: "Community Food Pantry", x: 12, z: 12, y: 0.8, category: "Sustenance", impact: "18,500 Meals" },
  { id: 3, name: "Shelter & Dignity Housing", x: -8, z: -16, y: 1.2, category: "Housing", impact: "48 Families Housed" },
  { id: 4, name: "Civic Arts & Gathering Space", x: 18, z: -10, y: 0.9, category: "Civic Life", impact: "120+ Events" },
  { id: 5, name: "Elder Care & Wellness Network", x: -22, z: -6, y: 0.7, category: "Health", impact: "850+ Seniors" },
  { id: 6, name: "Urban Green & Tree Planting", x: 6, z: -24, y: 0.6, category: "Environment", impact: "1,200 Trees" },
  { id: 7, name: "Rapid Volunteer Dispatch", x: -16, z: -30, y: 1.0, category: "Outreach", impact: "1,400 Volunteers" },
  { id: 8, name: "Digital Literacy for All", x: 22, z: 4, y: 0.9, category: "Education", impact: "640 Laptops Deployed" },
  { id: 9, name: "Mental Health Hope Sanctuary", x: -4, z: 20, y: 0.8, category: "Wellness", impact: "3,100 Sessions" },
  { id: 10, name: "Micro-Grant Seed Fund", x: 14, z: -28, y: 1.1, category: "Economic Uplift", impact: "36 Small Businesses" },
  { id: 11, name: "Neighborhood Tool Library", x: -26, z: 14, y: 0.6, category: "Mutual Aid", impact: "980 Tools Shared" },
  { id: 12, name: "Safe Routes Youth Walking Bus", x: 26, z: 20, y: 0.7, category: "Safety", impact: "15 Schools Connected" }
];

export class ImpactSceneManager {
  constructor(canvasContainer, onHoverNode) {
    this.container = canvasContainer;
    this.onHoverNode = onHoverNode;

    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.progress = 0.0;
    this.targetProgress = 0.0;
    this.mouse = new THREE.Vector2(0, 0);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.isReducedMotion = false;

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.hoveredNodeId = null;

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLights();
    this.initEnvironment();
    this.initEnergySeed();
    this.initCommunityLandscape();
    this.initImpactShockwave();
    this.initLivingNetwork();
    this.initEventListeners();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050608, 0.012);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 2.5, 30);
    this.cameraTarget = new THREE.Vector3(0, 0, -220);
    this.camera.lookAt(this.cameraTarget);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0x1a202c, 0.6);
    this.scene.add(this.ambientLight);

    // Warm directional light simulating sunrise/enlightenment
    this.dirLight = new THREE.DirectionalLight(0xfbe0be, 0.5);
    this.dirLight.position.set(20, 40, 20);
    this.scene.add(this.dirLight);

    // Dynamic point light attached to the energy spark
    this.sparkPointLight = new THREE.PointLight(0xe5a968, 2.0, 50, 1.8);
    this.sparkPointLight.position.set(0, 0, -220);
    this.scene.add(this.sparkPointLight);

    // Ground illumination burst light
    this.groundBurstLight = new THREE.PointLight(0xffeedd, 0.0, 100, 1.5);
    this.groundBurstLight.position.set(0, 2, 0);
    this.scene.add(this.groundBurstLight);
  }

  initEnvironment() {
    // 1. Ambient Stardust Particle Field (1200 particles)
    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 1] = (Math.random() - 0.2) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 350 - 50;
      scales[i] = Math.random() * 2.0 + 0.5;
      opacities[i] = Math.random() * 0.7 + 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));

    const particleTex = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xfbe0be,
      opacity: 0.6
    });

    this.spaceDust = new THREE.Points(geometry, material);
    this.scene.add(this.spaceDust);

    // 2. Horizon Glow Plane
    const horizonGeo = new THREE.PlaneGeometry(300, 100);
    const horizonMat = new THREE.MeshBasicMaterial({
      color: 0x1f140e,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide
    });
    this.horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    this.horizonMesh.position.set(0, 10, -260);
    this.scene.add(this.horizonMesh);
  }

  initEnergySeed() {
    this.seedGroup = new THREE.Group();

    // 1. Core Sphere with Shader
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    this.seedShaderMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(SeedGlowShader.uniforms),
      vertexShader: SeedGlowShader.vertexShader,
      fragmentShader: SeedGlowShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    this.seedCore = new THREE.Mesh(coreGeo, this.seedShaderMat);
    this.seedGroup.add(this.seedCore);

    // 2. Outer Corona Halo
    const haloGeo = new THREE.PlaneGeometry(8, 8);
    const haloTex = createParticleTexture();
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTex,
      transparent: true,
      color: 0xe5a968,
      blending: THREE.AdditiveBlending,
      opacity: 0.85,
      depthWrite: false
    });
    this.seedHalo = new THREE.Mesh(haloGeo, haloMat);
    this.seedGroup.add(this.seedHalo);

    // 3. Trailing Stardust Particles
    const trailCount = 180;
    const trailGeo = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3 + 0] = (Math.random() - 0.5) * 1.5;
      trailPositions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
      trailPositions[i * 3 + 2] = Math.random() * 12; // extends behind
    }
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    this.seedTrail = new THREE.Points(
      trailGeo,
      new THREE.PointsMaterial({
        size: 1.2,
        map: haloTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        color: 0xfbe0be,
        opacity: 0.0
      })
    );
    this.seedGroup.add(this.seedTrail);

    this.seedGroup.position.set(0, 0, -220);
    this.scene.add(this.seedGroup);
  }

  initCommunityLandscape() {
    this.landscapeGroup = new THREE.Group();
    this.buildingMeshes = [];

    // 1. Stylized Architectural Silhouettes / Community Buildings
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x0c0f14,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: false
    });

    const edgeLineMat = new THREE.LineBasicMaterial({
      color: 0x484f5e,
      transparent: true,
      opacity: 0.4
    });

    // Create 35 community buildings with diverse scales
    const buildingConfigs = [
      // Left cluster (Residential & Community Centers)
      { x: -18, z: -10, w: 4, h: 7, d: 4 },
      { x: -24, z: -5, w: 5, h: 9, d: 5 },
      { x: -14, z: 5, w: 3.5, h: 5, d: 4 },
      { x: -28, z: 12, w: 4.5, h: 6.5, d: 4.5 },
      { x: -20, z: -25, w: 6, h: 11, d: 6 },
      { x: -10, z: -35, w: 5, h: 8, d: 5 },
      { x: -32, z: -18, w: 4, h: 6, d: 4 },

      // Right cluster (Workshops, Schools, Civic Labs)
      { x: 16, z: -12, w: 5, h: 8.5, d: 5 },
      { x: 24, z: -6, w: 4.5, h: 10, d: 4.5 },
      { x: 12, z: 8, w: 3.8, h: 6, d: 4 },
      { x: 26, z: 15, w: 5, h: 7, d: 5 },
      { x: 22, z: -28, w: 6.5, h: 12, d: 6 },
      { x: 14, z: -38, w: 4.5, h: 8, d: 4.5 },
      { x: 34, z: -15, w: 4, h: 5.5, d: 4 },

      // Center background monuments & halls
      { x: -6, z: -50, w: 7, h: 14, d: 7 },
      { x: 6, z: -52, w: 8, h: 16, d: 8 },
      { x: 0, z: -65, w: 10, h: 20, d: 9 }
    ];

    buildingConfigs.forEach((cfg) => {
      const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d);
      const mesh = new THREE.Mesh(geo, buildingMat.clone());
      mesh.position.set(cfg.x, cfg.h / 2, cfg.z);

      // Subtle wireframe edges
      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, edgeLineMat.clone());
      mesh.add(line);

      this.landscapeGroup.add(mesh);
      this.buildingMeshes.push({
        mesh,
        baseColor: new THREE.Color(0x0c0f14),
        litColor: new THREE.Color(0x2a241f),
        line: line,
        baseLineColor: new THREE.Color(0x383e4c),
        litLineColor: new THREE.Color(0xe5a968)
      });
    });

    // 2. Ground Topography Grid
    const groundGeo = new THREE.PlaneGeometry(160, 160, 48, 48);
    groundGeo.rotateX(-Math.PI / 2);
    
    // Deform ground vertices slightly for organic rolling terrain
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const distFromCenter = Math.sqrt(x * x + z * z);
      // Keep center plaza flat for impact
      if (distFromCenter > 15) {
        const y = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 1.2;
        posAttr.setY(i, y);
      }
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x080a0d,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: true,
      wireframeLinewidth: 1
    });

    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.position.y = 0.0;
    this.landscapeGroup.add(this.groundMesh);

    // Initial opacity state for Scene 1
    this.landscapeGroup.position.y = -12; // starts hidden underneath fog
    this.scene.add(this.landscapeGroup);
  }

  initImpactShockwave() {
    this.impactGroup = new THREE.Group();

    // 1. Expanding Ground Shader Shockwave Mesh
    const planeGeo = new THREE.PlaneGeometry(120, 120);
    planeGeo.rotateX(-Math.PI / 2);
    this.shockwaveMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(ShockwaveShader.uniforms),
      vertexShader: ShockwaveShader.vertexShader,
      fragmentShader: ShockwaveShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    this.shockwaveMesh = new THREE.Mesh(planeGeo, this.shockwaveMat);
    this.shockwaveMesh.position.y = 0.1;
    this.impactGroup.add(this.shockwaveMesh);

    // 2. Radiant Rising Embers Fountain (300 particles)
    const emberCount = 300;
    const emberGeo = new THREE.BufferGeometry();
    const emberPos = new Float32Array(emberCount * 3);
    const emberVelocities = new Float32Array(emberCount * 3);

    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3 + 0] = 0;
      emberPos[i * 3 + 1] = 0.1;
      emberPos[i * 3 + 2] = 0;

      // Random radial velocity outward and upward
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 3;
      emberVelocities[i * 3 + 0] = Math.cos(angle) * speed;
      emberVelocities[i * 3 + 1] = Math.random() * 14 + 6;
      emberVelocities[i * 3 + 2] = Math.sin(angle) * speed;
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPos, 3));
    this.emberVelocities = emberVelocities;

    this.emberMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: createParticleTexture(),
      transparent: true,
      color: 0xfbe0be,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.0
    });

    this.emberPoints = new THREE.Points(emberGeo, this.emberMaterial);
    this.impactGroup.add(this.emberPoints);

    this.scene.add(this.impactGroup);
  }

  initLivingNetwork() {
    this.networkGroup = new THREE.Group();
    this.nodeMeshes = [];
    this.filamentLines = [];

    const nodeGeo = new THREE.SphereGeometry(0.55, 24, 24);
    const ringGeo = new THREE.RingGeometry(0.8, 1.1, 24);
    ringGeo.rotateX(-Math.PI / 2);

    COMMUNITY_NODES.forEach((data) => {
      const nodeSubGroup = new THREE.Group();
      nodeSubGroup.position.set(data.x, data.y, data.z);

      // Core luminous sphere
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0xfbe0be,
        transparent: true,
        opacity: 0.0
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = data;
      nodeSubGroup.add(nodeMesh);

      // Pulsing outer halo ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe5a968,
        transparent: true,
        opacity: 0.0,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.y = -0.2;
      nodeSubGroup.add(ringMesh);

      this.networkGroup.add(nodeSubGroup);
      this.nodeMeshes.push({
        group: nodeSubGroup,
        core: nodeMesh,
        ring: ringMesh,
        data: data,
        baseScale: 1.0,
        currentScale: 0.001
      });
    });

    // Dynamic Bezier Filaments connecting nearest nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xe5a968,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < COMMUNITY_NODES.length; i++) {
      for (let j = i + 1; j < COMMUNITY_NODES.length; j++) {
        const n1 = COMMUNITY_NODES[i];
        const n2 = COMMUNITY_NODES[j];
        const dist = Math.hypot(n1.x - n2.x, n1.z - n2.z);

        // Connect if within proximity threshold
        if (dist < 28) {
          const curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(n1.x, n1.y, n1.z),
            new THREE.Vector3((n1.x + n2.x) / 2, Math.max(n1.y, n2.y) + dist * 0.18, (n1.z + n2.z) / 2),
            new THREE.Vector3(n2.x, n2.y, n2.z)
          );
          const points = curve.getPoints(24);
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMesh = new THREE.Line(lineGeo, lineMat.clone());
          this.networkGroup.add(lineMesh);
          this.filamentLines.push(lineMesh);
        }
      }
    }

    this.scene.add(this.networkGroup);
  }

  initEventListeners() {
    this.onResize = () => {
      this.width = this.container.clientWidth || window.innerWidth;
      this.height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', this.onResize);

    this.onMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      this.targetMouse.x = ((e.clientX - rect.left) / this.width) * 2 - 1;
      this.targetMouse.y = -(((e.clientY - rect.top) / this.height) * 2 - 1);
    };
    window.addEventListener('mousemove', this.onMouseMove);
  }

  setProgress(p) {
    this.targetProgress = Math.max(0, Math.min(1, p));
  }

  setReducedMotion(reduced) {
    this.isReducedMotion = reduced;
  }

  updateScene(delta, time) {
    // Smooth progress interpolation
    const lerpFactor = this.isReducedMotion ? 0.3 : 0.08;
    this.progress += (this.targetProgress - this.progress) * lerpFactor;
    const p = this.progress;

    // Smooth mouse parallax
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Shader uniform updates
    if (this.seedShaderMat) {
      this.seedShaderMat.uniforms.uTime.value = time;
    }

    // Billboard the seed halo toward camera
    if (this.seedHalo) {
      this.seedHalo.lookAt(this.camera.position);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // SCENE CHOREOGRAPHY BY NORMALIZED PROGRESS
    // ─────────────────────────────────────────────────────────────────────────

    // ==========================================
    // 1. SCENE 1 — THE BEGINNING (0.00 -> 0.18)
    // ==========================================
    if (p <= 0.18) {
      const localP = p / 0.18; // 0 -> 1

      // Seed sits quietly in the far distance
      this.seedGroup.position.set(0, 0, -220 + localP * 10);
      this.seedGroup.scale.setScalar(0.7 + localP * 0.4);
      this.sparkPointLight.position.copy(this.seedGroup.position);
      this.sparkPointLight.intensity = 1.0 + Math.sin(time * 3.0) * 0.3;

      // Camera far distant observation
      this.camera.position.set(this.mouse.x * 2.0, 2.0 + this.mouse.y * 1.5, 25);
      this.cameraTarget.set(0, 0, -220);
      this.camera.lookAt(this.cameraTarget);

      // Landscape remains hidden beneath fog
      this.landscapeGroup.position.y = -14;
      this.shockwaveMat.uniforms.uOpacity.value = 0.0;
      this.emberMaterial.opacity = 0.0;
      this.seedTrail.material.opacity = 0.0;
    }

    // ==========================================
    // 2. SCENE 2 — THE APPROACH (0.18 -> 0.45)
    // ==========================================
    else if (p <= 0.45) {
      const localP = (p - 0.18) / (0.45 - 0.18); // 0 -> 1
      const smoothCurve = localP * localP * (3 - 2 * localP);

      // Spark travels along spline towards camera and community
      const seedZ = -210 + smoothCurve * 150; // -210 -> -60
      const seedY = 1.0 + Math.sin(smoothCurve * Math.PI) * 4.0;
      const seedX = Math.sin(smoothCurve * Math.PI * 1.5) * 4.0;

      this.seedGroup.position.set(seedX, seedY, seedZ);
      this.seedGroup.scale.setScalar(1.1 + smoothCurve * 0.8);
      this.sparkPointLight.position.copy(this.seedGroup.position);
      this.sparkPointLight.intensity = 2.5;

      // Reveal stardust trail
      this.seedTrail.material.opacity = smoothCurve * 0.75;

      // Landscape rises smoothly from the atmospheric mist
      this.landscapeGroup.position.y = -14 + smoothCurve * 14; // rises to 0
      this.horizonMesh.material.opacity = 0.15 + smoothCurve * 0.25;

      // Camera smoothly swoops and tracks
      const camY = 2.0 + smoothCurve * 5.0 + this.mouse.y * 2.0;
      const camZ = 25 - smoothCurve * 8.0;
      this.camera.position.set(this.mouse.x * 3.0, camY, camZ);
      this.cameraTarget.set(seedX * 0.3, seedY * 0.4, seedZ * 0.5);
      this.camera.lookAt(this.cameraTarget);

      this.shockwaveMat.uniforms.uOpacity.value = 0.0;
      this.emberMaterial.opacity = 0.0;
    }

    // ==========================================
    // 3. SCENE 3 — THE IMPACT (0.45 -> 0.72)
    // ==========================================
    else if (p <= 0.72) {
      const localP = (p - 0.45) / (0.72 - 0.45); // 0 -> 1

      // Sub-phase 3A: Descent (0.0 -> 0.55)
      // Sub-phase 3B: Impact & Pulse (0.55 -> 1.0)
      if (localP < 0.55) {
        const descentP = localP / 0.55;
        const seedZ = -60 + descentP * 60; // -60 -> 0
        const seedY = 4.0 * (1 - descentP) + 0.2;
        const seedX = 4.0 * (1 - descentP);

        this.seedGroup.position.set(seedX, seedY, seedZ);
        this.seedGroup.scale.setScalar(1.8 + descentP * 0.6);
        this.sparkPointLight.position.copy(this.seedGroup.position);
        this.sparkPointLight.intensity = 3.0 + descentP * 3.0;

        this.landscapeGroup.position.y = 0;
        this.shockwaveMat.uniforms.uOpacity.value = 0.0;
        this.emberMaterial.opacity = 0.0;

        // Camera anticipation
        this.camera.position.set(this.mouse.x * 4.0, 7.0 - descentP * 3.0, 17 - descentP * 4.0);
        this.cameraTarget.set(0, 1.0, 0);
        this.camera.lookAt(this.cameraTarget);
      } else {
        // IMPACT CLIMAX!
        const impactP = (localP - 0.55) / 0.45; // 0 -> 1

        // Seed merges with ground and flares
        this.seedGroup.position.set(0, 0.1, 0);
        const flareScale = 2.4 * Math.max(0.1, 1.0 - impactP * 0.8);
        this.seedGroup.scale.setScalar(flareScale);

        // Shockwave expands outward
        const shockRadius = impactP * 65.0;
        this.shockwaveMat.uniforms.uRadius.value = shockRadius;
        this.shockwaveMat.uniforms.uOpacity.value = Math.max(0, 1.0 - impactP * 0.6);

        // Ground burst light flash
        this.groundBurstLight.intensity = Math.sin(impactP * Math.PI) * 8.0;

        // Animate rising glowing embers
        const emberAttr = this.emberPoints.geometry.attributes.position;
        for (let i = 0; i < 300; i++) {
          const vy = this.emberVelocities[i * 3 + 1];
          const vx = this.emberVelocities[i * 3 + 0];
          const vz = this.emberVelocities[i * 3 + 2];
          emberAttr.setXYZ(i, vx * impactP * 0.8, vy * impactP * 0.9, vz * impactP * 0.8);
        }
        emberAttr.needsUpdate = true;
        this.emberMaterial.opacity = Math.sin(impactP * Math.PI) * 0.9;

        // Buildings catch warm illumination
        this.buildingMeshes.forEach((b) => {
          const dist = Math.hypot(b.mesh.position.x, b.mesh.position.z);
          if (dist <= shockRadius + 5) {
            const ill = Math.min(1.0, (shockRadius - dist + 5) / 10);
            b.mesh.material.color.lerpColors(b.baseColor, b.litColor, ill);
            b.line.material.color.lerpColors(b.baseLineColor, b.litLineColor, ill * 0.8);
          }
        });

        // Dynamic camera recoil & elevation
        const camY = 4.0 + impactP * 6.0 + this.mouse.y * 2.0;
        const camZ = 13 + impactP * 9.0;
        this.camera.position.set(this.mouse.x * 5.0, camY, camZ);
        this.cameraTarget.set(0, 1.5, -4.0);
        this.camera.lookAt(this.cameraTarget);
      }
    }

    // ==========================================
    // 4. SCENE 4 — ONE BECOMES MANY (0.72 -> 0.88)
    // ==========================================
    else if (p <= 0.88) {
      const localP = (p - 0.72) / (0.88 - 0.72); // 0 -> 1

      this.landscapeGroup.position.y = 0;
      this.groundBurstLight.intensity = 1.2;

      // Spawn community nodes radially
      this.nodeMeshes.forEach((node, idx) => {
        const delay = (idx / this.nodeMeshes.length) * 0.4;
        const nodeP = Math.max(0, Math.min(1, (localP - delay) / 0.6));
        
        node.currentScale = nodeP * node.baseScale;
        node.group.scale.setScalar(node.currentScale);
        node.core.material.opacity = nodeP;
        node.ring.material.opacity = nodeP * 0.65;
        node.ring.rotation.z = time * 0.8 + idx;
      });

      // Luminous connecting filaments fade in
      this.filamentLines.forEach((line, idx) => {
        const lineDelay = 0.3 + (idx / this.filamentLines.length) * 0.4;
        const lineP = Math.max(0, Math.min(1, (localP - lineDelay) / 0.3));
        line.material.opacity = lineP * (0.45 + Math.sin(time * 3.0 + idx) * 0.2);
      });

      // Camera panoramic overhead tilt
      const camY = 10.0 + localP * 4.0 + this.mouse.y * 3.0;
      const camZ = 22 + localP * 6.0;
      this.camera.position.set(this.mouse.x * 6.0, camY, camZ);
      this.cameraTarget.set(0, 1.0, -6.0);
      this.camera.lookAt(this.cameraTarget);
    }

    // ==========================================
    // 5. SCENE 5 — REVEAL U IMPACT (0.88 -> 1.00)
    // ==========================================
    else {
      const localP = (p - 0.88) / (1.00 - 0.88); // 0 -> 1

      this.landscapeGroup.position.y = 0;
      this.groundBurstLight.intensity = 1.5 + Math.sin(time * 2.0) * 0.4;

      // Ambient breathing living network
      this.nodeMeshes.forEach((node, idx) => {
        const pulse = 1.0 + Math.sin(time * 2.5 + idx) * 0.15;
        node.group.scale.setScalar(node.baseScale * pulse);
        node.core.material.opacity = 0.95;
        node.ring.material.opacity = 0.5 + Math.sin(time * 2.0 + idx) * 0.25;
        node.ring.rotation.z = time * 0.5 + idx;
      });

      this.filamentLines.forEach((line, idx) => {
        line.material.opacity = 0.4 + Math.sin(time * 2.0 + idx * 0.5) * 0.2;
      });

      // Majestic panoramic framing for U IMPACT branding
      const camY = 14.0 + localP * 3.0 + this.mouse.y * 3.0;
      const camZ = 28 + localP * 4.0;
      this.camera.position.set(this.mouse.x * 7.0, camY, camZ);
      this.cameraTarget.set(0, 2.0, -10.0);
      this.camera.lookAt(this.cameraTarget);
    }

    // Raycast check on interactive nodes (Active in Scene 4 & 5)
    if (p >= 0.72) {
      this.checkRaycast();
    }
  }

  checkRaycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const cores = this.nodeMeshes.map((n) => n.core);
    const intersects = this.raycaster.intersectObjects(cores);

    if (intersects.length > 0) {
      const hitCore = intersects[0].object;
      const nodeData = hitCore.userData;
      if (this.hoveredNodeId !== nodeData.id) {
        this.hoveredNodeId = nodeData.id;
        if (this.onHoverNode) this.onHoverNode(nodeData);
      }
    } else {
      if (this.hoveredNodeId !== null) {
        this.hoveredNodeId = null;
        if (this.onHoverNode) this.onHoverNode(null);
      }
    }
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Rotate background ambient stardust
    if (this.spaceDust) {
      this.spaceDust.rotation.y = time * 0.015;
      this.spaceDust.rotation.x = time * 0.008;
    }

    this.updateScene(delta, time);
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
