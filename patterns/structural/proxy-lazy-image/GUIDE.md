# 🔒 Proxy - Lazy Loading Obrazu

## Wzorzec Proxy

Wzorzec Proxy należy do grupy wzorców **strukturalnych** (Structural Patterns). Dostarcza substitute lub placeholder dla innego obiektu. Proxy kontroluje dostęp do oryginalnego obiektu.

## Diagram Wzorca

```
Client
  │
  ├─→ ImageProxy (lightweight)
        │
        └─→ RealImage (heavyweight, on demand)
             ├─── load image
             └─── decode...
```

## Scenario: Lazy Loading Obrazów

Galeria ma 1,000 obrazów. Bez Proxy:

- Wszystkie obrazy załadunkwane na start - WOLNE!

Z Proxy:

- Obrazy ładowane na żądanie
- Proxy wygląda jak RealImage bez latency

**Problemy bez Proxy:**

```typescript
// Ładuj wszystko! 😱
const images = [];
for (let i = 0; i < 1000; i++) {
  images[i] = new Image(hugeData);
}
```

**Rozwiązanie z Proxy:**

```typescript
// Ładuj na żądanie! ✨
const images = [];
for (let i = 0; i < 1000; i++) {
  images[i] = new ImageProxy(`url/${i}.jpg`);
}
// Prawdziwy obraz załadowany dopiero przy first use
```

## Komponenty

### 1. **Subject Interface**

```typescript
interface Image {
  display(): void;
}
```

### 2. **Real Subject**

```typescript
class RealImage implements Image {
  private data: Buffer;

  constructor(filename: string) {
    this.loadImage(filename); // Expensive!
  }

  display(): void {
    console.log('Displaying', this.data);
  }
}
```

### 3. **Proxy**

```typescript
class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  display(): void {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}
```

## Typy Proxy

1. **Virtual Proxy** - Lazy loading (nasz przykład)
2. **Protection Proxy** - Access control
3. **Remote Proxy** - Remote objects
4. **Logging Proxy** - Call logging

## Wniosek

Wzorzec Proxy pozwala:

- 🔒 Na kontrolowanie dostępu
- ⚡ Na lazy loading
- 🔍 Na logging/monitoring
- 🔐 Na protection

---

📚 **Materiały:**

- [Refactoring.Guru - Proxy](https://refactoring.guru/design-patterns/proxy)
