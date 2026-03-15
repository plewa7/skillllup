# State Pattern - Traffic Light

## 📖 Wzorzec State

State Pattern pozwala obiektowi zmienić swoje zachowanie na podstawie stanu wewnętrznego.

### Scenario

```
Red Light (5s) → Yellow Light (2s) → Green Light (5s) → Red Light...
   🔴              🟡              🟢
```

### Components

1. **TrafficLightState** - Interfejs dla stanu
2. **RedLightState, YellowLightState, GreenLightState** - Konkretne stany
3. **TrafficLight** - Context (obiekt ze stanem)

## 🎯 Co Implementujesz

### Kroki

1. **Zaimplementuj 3 klasy stanów:**
   - `RedLightState: getColor() = "red", getText() = "🔴 Czerwone", getDuration() = 5000`
   - `YellowLightState: getColor() = "yellow", getText() = "🟡 Żółte", getDuration() = 2000`
   - `GreenLightState: getColor() = "green", getText() = "🟢 Zielone", getDuration() = 5000`

2. **Metoda handle() dla każdego stanu:**
   - Zwraca instancję następnego stanu

3. **Klasa TrafficLight:**
   - Przechowuje `currentState`
   - Metoda `setState()` - ustawia nowy stan i aktualizuje UI
   - Metoda `nextState()` - przechodzi do następnego stanu
   - Metoda `updateUI()` - wyświetla aktualny stan

4. **Event listenery:**
   - Kliknięcie "Następny stan" - zmienia stan
   - Kliknięcie "Reset" - wraca do Red

✅ **Testy: 8 testów**

Happy coding! 🚀
