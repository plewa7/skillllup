# 🏠 Facade - Smart Home

## Wzorzec Facade

Wzorzec Facade należy do grupy wzorców **strukturalnych** (Structural Patterns). Dostarcza uproszczonego, zunifikowanego interfejsu do złożonego zestawu interfejsów w podsystemie.

## Diagram Wzorca

```
Client
  │
  └──→ Facade (Simple interface)
        │
        ├─→ Lights (complex)
        ├─→ Thermostat (complex)
        ├─→ SecuritySystem (complex)
        └─→ Entertainment (complex)
```

## Scenario: Inteligentny Dom

Masz wiele urządzeń:

- Oświetlenie
- Grzanie
- Bezpieczeństwo
- Rozrywka

Bez Facade:

```typescript
// Klient musi znać każde urządzenie! 😱
lights.turnOn();
lights.setColor('white');
lights.setBrightness(100);
thermostat.setTemp(20);
security.arm();
```

Z Facade:

```typescript
// Prosty interfejs! ✨
smartHome.leaveHome();
// Facade obsługuje wszystko w tle
```

## Komponenty

### 1. **Complex Subsystems**

```typescript
class LightingSystem { ... }
class SecuritySystem { ... }
class ThermostatSystem { ... }
```

### 2. **Facade**

```typescript
class SmartHomeFacade {
  private lights = new LightingSystem();
  private security = new SecuritySystem();
  private thermostat = new ThermostatSystem();

  leaveHome(): void {
    this.lights.turnOff();
    this.security.arm();
    this.thermostat.adjustTemperature(18);
  }
}
```

## Wniosek

Wzorzec Facade pozwala:

- 🔧 Na simplify complex interfaces
- 📦 Na provide single entry point

---

📚 **Materiały:**

- [Refactoring.Guru - Facade](https://refactoring.guru/design-patterns/facade)
