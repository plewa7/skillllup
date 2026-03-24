# 🌉 Bridge - Driver Urządzenia

## Wzorzec Bridge

Wzorzec Bridge należy do grupy wzorców **strukturalnych** (Structural Patterns). Oddziela abstrakcję od implementacji, aby te dwa mogły się zmienia n niezależnie.

## Diagram Wzorca

```
        ┌──────────────┐
        │   Remote     │ (Abstraction)
        └────┬──────────┘
             │ uses
             ▼
        ┌──────────────┐
        │  Device API  │ (Bridge)
        └────┬──────────┘
          ┌──┴──┐
          ▼     ▼
        TV    Radio   (Implementation)
```

## Scenario: Pilot Zdalny

Chcesz obsługiwać:

- Różne pilot'y (SmartPhone, RemoteControl)
- Różne urządzenia (TV, Radio, Lights)

Bez Bridge: 3×3 = 9 klas!
Z Bridge: 3+3 = 6 klas!

**Problemy bez Bridge:**

```typescript
// Kombinatoryczna explozja! 😱
(PhoneTV, PhoneRadio, PhoneAC);
(RemoteTV, RemoteRadio, RemoteAC);
```

**Rozwiązanie z Bridge:**

```typescript
// Bridge oddziela interface od implementacji! ✨
class Remote { constructor(device: Device) {} }
class TV implements Device { on() {...} }
class Radio implements Device { on() {...} }
```

## Komponenty

### 1. **Abstraction (Remote)**

```typescript
class Remote {
  protected device: Device;
  constructor(device: Device) {
    this.device = device;
  }
  turnOn(): void {
    this.device.on();
  }
}
```

### 2. **Bridge Interface (Device)**

```typescript
interface Device {
  on(): void;
  off(): void;
  setVolume(v: number): void;
}
```

### 3. **Concrete Implementation**

```typescript
class TV implements Device {
  on(): void {
    console.log('TV on');
  }
  off(): void {
    console.log('TV off');
  }
}

class Radio implements Device {
  on(): void {
    console.log('Radio on');
  }
  off(): void {
    console.log('Radio off');
  }
}
```

## Co Implementujesz

### Krok 1: Device Interface (Bridge)

```typescript
interface Device {
  on(): void;
  off(): void;
  setVolume(v: number): void;
}
```

🌉 **Dlaczego?** Definiuje bridge

### Krok 2: Concrete Devices

```typescript
class SmartTV implements Device { ... }
class SmartRadio implements Device { ... }
```

📺 **Dlaczego?** Implementuja device API

### Krok 3: Abstraction

```typescript
abstract class Remote {
  protected device: Device;
  abstract operation(): void;
}
```

🎮 **Dlaczego?** Abstrakcja kontroli

### Krok 4: Refined Abstractions

```typescript
class BasicRemote extends Remote {
  operation(): void {
    this.device.on();
  }
}
```

🔧 **Dlaczego?** Rozszerza abstrakcję

## Praktyczne Zastosowania

1. **UI Frameworks** - Different platforms (Windows, Mac, Linux)
2. **Database** - Different backends (MySQL, PostgreSQL)
3. **Rendering** - Different graphics libraries
4. **Payment** - Different payment processors
5. **Logging** - Different log destinations
6. **Drivers** - Device drivers

## Wniosek

Wzorzec Bridge pozwala:

- 🌉 Na oddzielenie abstraction od implementation
- 🔄 Na zmianę implementacji bez zmiany kodu klienta

---

📚 **Materiały:**

- [Refactoring.Guru - Bridge](https://refactoring.guru/design-patterns/bridge)
