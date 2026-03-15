# Factory Pattern - Shape Generator

## 📖 Wzorzec Factory (Factory Method)

Factory Pattern EnkApsuluje tworzenie instancji obiektów, pozwalając kodowi pracować z interfejsem zamiast konkretnych klas.

### Scenario

```
Klient chce stworzyć kształty, ale nie chce wiedzieć,
jak dokładnie się je tworzy. Fabryka zajmuje się:

Button "Koło" ──→ ShapeFactory.create('circle') ──→ Circle
Button "Kwadrat" ──→ ShapeFactory.create('square') ──→ Square
Button "Trójkąt" ──→ ShapeFactory.create('triangle') ──→ Triangle
```

### Components

1. **Shape** - Interfejs dla wszystkich kształtów
2. **Circle, Square, Triangle, Rectangle** - Konkretne implementacje
3. **ShapeFactory** - Enkapsuluje logikę tworzenia
4. **ShapeManager** - Zarządza kolekcją kształtów

## 🎯 Co Implementujesz

### Kroki

1. **Shape Interface:**
   - `getType(): string` - Zwraca "circle", "square", etc.
   - `getCssClass(): string` - Zwraca klasę CSS
   - `render(): HTMLElement` - Zwraca element DOM

2. **Konkretne Klasy (4 kształty):**
   - Implementują Shape interface
   - render() zwraca `<div class="shape circle">` z `data-testid="shape-item"`

3. **ShapeFactory:**
   - Metoda statyczna `create(type: string): Shape`
   - Switch-case zwraca odpowiednią klasę
   - Throw Error jeśli nieznany typ

4. **ShapeManager:**
   - Przechowuje tablicę shapes
   - addShape(type) - użyj factory, dodaj do canvas, aktualizuj liczniki
   - clear() - wyczyść wszystko
   - updateUI() - aktualizuj liczniki w DOM

5. **Event Listenery:**
   - Każdy przycisk → shapeManager.addShape(type)
   - Clear button → shapeManager.clear()

✅ **Testy: 13 testów**

Happy coding! 🚀
