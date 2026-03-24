# 🎯 Flyweight - Particle System

## Wzorzec Flyweight

Wzorzec Flyweight należy do grupy wzorców **strukturalnych** (Structural Patterns). Dzieli dane między wiele obiektów o wspólnych danych. Zmniejsza użycie pamięci dla dużych ilości podobnych obiektów.

## Diagram Wzorca

```
Particle System (1,000,000 particles)
        │
        ├─ Intrinsic State (shared):
        │  - texture
        │  - color
        │  - size
        │
        └─ Extrinsic State (unique):
           - position
           - velocity
           - lifetime
```

## Scenario: System Cząstek

Gra renderuje 1,000,000 cząstek. Bez Flyweight:

- 1,000,000 × (texture + color + size) = ogromna pamięć!

Z Flyweight:

- Dziel teksturę, kolor, rozmiar między cząstkami
- Tylko pozycja, prędkość, żywotność na cząstkę

**Problemy bez Flyweight:**

```typescript
// Pamięć! Pamięć! Pamięć! 😱
const particles = new Array(1000000);
for (let i = 0; i < 1000000; i++) {
  particles[i] = {
    x,
    y,
    vx,
    vy,
    lifetime,
    texture,
    color,
    size, // Duplikat!
  };
}
```

**Rozwiązanie z Flyweight:**

```typescript
// Dziel state! ✨
const particleType = { text, color, size };
for (let i = 0; i < 1000000; i++) {
  particles[i] = { x, y, vx, vy, lifetime, type: particleType };
}
```

## Komponenty

### 1. **Flyweight Interface**

```typescript
interface ParticleType {
  texture: string;
  color: string;
  size: number;
}
```

### 2. **Concrete Flyweight**

```typescript
class ParticleTypeImpl implements ParticleType {
  texture: string;
  color: string;
  size: number;
}
```

### 3. **Flyweight Factory**

```typescript
class ParticleFactory {
  private types = new Map<string, ParticleType>();

  getType(key: string): ParticleType {
    if (!this.types.has(key)) {
      this.types.set(key, new ParticleTypeImpl(...));
    }
    return this.types.get(key)!;
  }
}
```

### 4. **Context (Particle)**

```typescript
class Particle {
  constructor(
    public type: ParticleType,
    public x: number,
    public y: number
  ) {}
}
```

## Wniosek

Wzorzec Flyweight pozwala:

- 💾 Na drastyczne zmniejszenie pamięci
- 🔄 Na dzielenie wspólnych danych
- ⚡ Na obsługę milionów obiektów

---

📚 **Materiały:**

- [Refactoring.Guru - Flyweight](https://refactoring.guru/design-patterns/flyweight)
