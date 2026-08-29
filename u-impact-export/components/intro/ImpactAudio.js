/**
 * Procedural Web Audio Synthesizer for U IMPACT Cinematic Experience
 * Generates rich, atmospheric audio in real-time without requiring external MP3 files.
 */
class ImpactAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isInitialized = false;
    this.lastTriggeredProgress = 0;
    this.masterGain = null;
    this.droneGain = null;
    this.oscillators = [];
  }

  init() {
    if (this.isInitialized) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.initAmbientDrone();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported or blocked", e);
    }
  }

  initAmbientDrone() {
    if (!this.ctx) return;

    // Create 3 subtle detuned sine/triangle oscillators for warm cinematic pad
    const frequencies = [65.41, 130.81, 196.00]; // C2, C3, G3 warm fifth chord
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    // Lowpass filter for deep warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime((idx - 1) * 4, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start();
      this.oscillators.push(osc);
    });

    filter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);
  }

  toggleAudio() {
    if (!this.isInitialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0.001 : 0.45;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return !this.isMuted;
  }

  updateProgress(progress) {
    if (this.isMuted || !this.ctx || !this.isInitialized) return;

    // Detect impact moment crossing (0.60 to 0.68)
    if (progress >= 0.60 && progress <= 0.68 && this.lastTriggeredProgress < 0.60) {
      this.playImpactSound();
    }

    // Detect network expansion (0.75)
    if (progress >= 0.75 && progress <= 0.82 && this.lastTriggeredProgress < 0.75) {
      this.playHarmonicChime();
    }

    this.lastTriggeredProgress = progress;
  }

  playImpactSound() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Sub-bass impact swell
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

    subGain.gain.setValueAtTime(0.7, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + 2.0);

    // Resonant harmonic shimmer bell
    const bellOsc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(523.25, now); // C5
    bellGain.gain.setValueAtTime(0.25, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    bellOsc.connect(bellGain);
    bellGain.connect(this.masterGain);
    bellOsc.start(now);
    bellOsc.stop(now + 2.6);
  }

  playHarmonicChime() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major pentatonic constellation

    notes.forEach((freq, idx) => {
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now + idx * 0.12);

      chimeGain.gain.setValueAtTime(0.001, now + idx * 0.12);
      chimeGain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.04);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 1.8);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeOsc.start(now + idx * 0.12);
      chimeOsc.stop(now + idx * 0.12 + 2.0);
    });
  }
}

export const impactAudio = new ImpactAudioEngine();
