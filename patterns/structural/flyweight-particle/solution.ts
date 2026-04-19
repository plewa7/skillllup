/**
 * WZORZEC FLYWEIGHT - Implementacja
 */

// ============================================
// 1. PARTICLE TYPE (Intrinsic state - shared)
// ============================================
interface ParticleType {
  color: string;
  size: number;
  texture: string;
}

// ============================================
// 2. CONCRETE PARTICLE TYPE
// ============================================
class ConcreteParticleType implements ParticleType {
  constructor(
    public color: string,
    public size: number,
    public texture: string
  ) {}
}

// ============================================
// 3. PARTICLE (Extrinsic state - unique)
// ============================================
class Particle {
  private vx: number;
  private vy: number;
  private lifetime: number;
  private maxLifetime: number;

  constructor(
    public x: number,
    public y: number,
    public type: ParticleType
  ) {
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.maxLifetime = 3000 + Math.random() * 2000; // 3-5 seconds
    this.lifetime = this.maxLifetime;
  }

  update(deltaTime: number): void {
    this.x += this.vx * deltaTime;
    this.y += this.vy * deltaTime;
    this.lifetime -= deltaTime;
  }

  isAlive(): boolean {
    return this.lifetime > 0;
  }

  getOpacity(): number {
    return this.lifetime / this.maxLifetime;
  }
}

// ============================================
// 4. FLYWEIGHT FACTORY
// ============================================
class ParticleTypeFactory {
  private types: Map<string, ParticleType> = new Map();

  getType(color: string, size: number, texture: string): ParticleType {
    const key = `${color}-${size}-${texture}`;

    if (!this.types.has(key)) {
      this.types.set(key, new ConcreteParticleType(color, size, texture));
    }

    return this.types.get(key)!;
  }

  getTypeCount(): number {
    return this.types.size;
  }
}

// ============================================
// 5. PARTICLE SYSTEM
// ============================================
class ParticleSystem {
  private particles: Particle[] = [];
  private factory: ParticleTypeFactory;
  private particleTypes = [
    { color: '#FF0000', size: 3, texture: 'circle' },
    { color: '#00FF00', size: 2, texture: 'circle' },
    { color: '#0000FF', size: 4, texture: 'circle' },
    { color: '#FFFF00', size: 2, texture: 'circle' },
    { color: '#FF00FF', size: 3, texture: 'circle' },
  ];

  constructor(private canvas: HTMLCanvasElement) {
    this.factory = new ParticleTypeFactory();
  }

  addParticles(x: number, y: number, count: number = 10): void {
    for (let i = 0; i < count; i++) {
      const typeData = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
      const type = this.factory.getType(typeData.color, typeData.size, typeData.texture);
      this.particles.push(new Particle(x, y, type));
    }
  }

  update(deltaTime: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(deltaTime);
      if (!this.particles[i].isAlive()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    for (const particle of this.particles) {
      ctx.fillStyle = particle.type.color;
      ctx.globalAlpha = particle.getOpacity();
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.type.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  getParticleCount(): number {
    return this.particles.length;
  }

  getTypeCount(): number {
    return this.factory.getTypeCount();
  }

  getMemoryUsage(): number {
    // Approximate memory usage
    // Each particle: x, y, vx, vy, lifetime, maxLifetime, type (reference)
    const particleMemory = this.particles.length * 8 * 8; // 8 numbers, 8 bytes each
    const typeMemory = this.getTypeCount() * 3 * 8; // 3 strings/values per type
    return particleMemory + typeMemory;
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
let particleSystem: ParticleSystem;
let lastTime = Date.now();
let animationId: number;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const statsDiv = document.getElementById('stats');

  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  particleSystem = new ParticleSystem(canvas);

  function animate() {
    const now = Date.now();
    const deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    particleSystem.update(deltaTime);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particleSystem.render(ctx);

    if (statsDiv) {
      const memoryKB = (particleSystem.getMemoryUsage() / 1024).toFixed(2);
      statsDiv.innerHTML = `
        🎯 Cząsteczek: ${particleSystem.getParticleCount()} |
        🎨 Typów: ${particleSystem.getTypeCount()} |
        💾 Pamięć: ~${memoryKB} KB
      `;
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Mouse events to spawn particles
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    particleSystem.addParticles(x, y, 3);
  });

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    particleSystem.addParticles(x, y, 20);
  });

  // Cleanup
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
  });
});
