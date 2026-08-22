import * as THREE from 'three';

/**
 * Custom Shader for the Celestial Energy Spark / Seed of Impact
 */
export const SeedGlowShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#fbe0be') },
    uGlowColor: { value: new THREE.Color('#e5a968') },
    uIntensity: { value: 1.0 },
    uPulseSpeed: { value: 2.0 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;
    uniform float uPulseSpeed;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vUv = uv;

      // Subtle organic surface deformation
      float displacement = sin(position.x * 4.0 + uTime * uPulseSpeed) * 
                           cos(position.y * 4.0 + uTime * uPulseSpeed) * 0.08;
      vec3 newPosition = position + normal * displacement;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    uniform float uIntensity;
    uniform float uTime;

    void main() {
      // Fresnel rim glow
      vec3 viewDir = normalize(-vPosition);
      float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
      fresnel = clamp(1.0 - abs(fresnel), 0.0, 1.0);
      float rim = pow(fresnel, 2.2);

      // Core luminance
      vec3 finalColor = mix(uColor, uGlowColor, rim);
      float alpha = clamp(rim * 1.5 + 0.4, 0.0, 1.0) * uIntensity;

      gl_FragColor = vec4(finalColor * (1.2 + rim * 0.8), alpha);
    }
  `
};

/**
 * Custom Shader for Ground Impact Shockwave Ripples
 */
export const ShockwaveShader = {
  uniforms: {
    uRadius: { value: 0.0 },
    uMaxRadius: { value: 65.0 },
    uThickness: { value: 2.2 },
    uColor: { value: new THREE.Color('#e5a968') },
    uEdgeColor: { value: new THREE.Color('#ffffff') },
    uOpacity: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;

    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    uniform float uRadius;
    uniform float uMaxRadius;
    uniform float uThickness;
    uniform vec3 uColor;
    uniform vec3 uEdgeColor;
    uniform float uOpacity;

    void main() {
      // Calculate distance from center (0, 0) on plane
      float dist = length(vWorldPosition.xz);
      
      // Ring wave calculation
      float delta = abs(dist - uRadius);
      float ring = smoothstep(uThickness, 0.0, delta);

      // Secondary outer subtle ring
      float delta2 = abs(dist - (uRadius * 0.7));
      float ring2 = smoothstep(uThickness * 1.5, 0.0, delta2) * 0.4;

      float totalRing = ring + ring2;

      // Attenuate with distance
      float fade = 1.0 - clamp(uRadius / uMaxRadius, 0.0, 1.0);
      fade = pow(fade, 1.4);

      vec3 col = mix(uColor, uEdgeColor, ring * 0.7);
      float alpha = totalRing * fade * uOpacity;

      if (alpha < 0.005) discard;

      gl_FragColor = vec4(col, alpha);
    }
  `
};

/**
 * Helper to generate circular particle texture for point clouds
 */
export function createParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(251, 224, 190, 0.9)');
  gradient.addColorStop(0.6, 'rgba(229, 169, 104, 0.25)');
  gradient.addColorStop(1, 'rgba(229, 169, 104, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}
