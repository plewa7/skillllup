# 👁️ Visitor - Shape Analyzer

## Wzorzec Visitor

Wzorzec Visitor należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Reprezentuje operację do wykonania na elementach struktury obiektu. Pozwala na definiowanie nowych operacji bez zmiany klas elementów.

## Diagram Wzorca

```
         ┌─────────┐
         │ Visitor │
         │ analyze │
         └────┬────┘
              │
         ┌────┴─────────┬────────────┐
         ▼              ▼            ▼
      Circle        Rectangle     Triangle
      visit()       visit()       visit()
      analyse()     analyse()     analyse()
```

## Scenario: Analiza Kształtów

Aplikacja ma kształty (Circle, Rectangle, Triangle) i chce:

- Calculate area
- Calculate perimeter
- Export to JSON
- Validate geometry

**Problemy bez Visitor:**

```typescript
// Każda operacja wymaga zmian we wszystkich klasach! 😱
class Circle { getArea() {...} getPerimeter() {...} exportJSON() {...} }
class Rectangle { getArea() {...} getPerimeter() {...} exportJSON() {...} }
// A jak dodać CSV export? Zmiana w każdej klasie!
```

**Rozwiązanie z Visitor:**

```typescript
// Nowa operacja = nowa klasa Visitor, bez zmian w Shape! ✨
class AreaCalculator implements Visitor { visit(c: Circle) {...} }
class ExportJSON implements Visitor { visit(c: Circle) {...} }
class ExportCSV implements Visitor { visit(c: Circle) {...} }
```

## Komponenty

### 1. **Element Interface**

```typescript
interface Shape {
  accept(visitor: Visitor): void;
}
```

### 2. **Visitor Interface**

```typescript
interface Visitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
  visitTriangle(triangle: Triangle): void;
}
```

### 3. **Concrete Elements**

```typescript
class Circle implements Shape {
  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}
```

### 4. **Concrete Visitors**

```typescript
class AreaCalculator implements Visitor {
  visitCircle(circle: Circle): void {
    console.log(`Circle area: ${Math.PI * circle.radius²}`);
  }
  visitRectangle(rect: Rectangle): void {
    console.log(`Rectangle area: ${rect.width * rect.height}`);
  }
}
```

## Co Implementujesz

### Krok 1: Element Interface

```typescript
interface Shape {
  accept(visitor: Visitor): void;
}
```

🎯 **Dlaczego?** Akceptuje visitor

### Krok 2: Visitor Interface

```typescript
interface Visitor {
  visitCircle(c: Circle): void;
  visitRectangle(r: Rectangle): void;
}
```

👁️ **Dlaczego?** Definiuje operacje

### Krok 3: Concrete Elements

```typescript
class Circle implements Shape {
  accept(v: Visitor): void { v.visitCircle(this); }
  constructor(public radius: number) {}
}
```

⭕ **Dlaczego?** Zna jak przyjąć visitor

### Krok 4: Concrete Visitors

```typescript
class AreaCalc implements Visitor {
  visitCircle(c: Circle): number {
    return Math.PI * c.radius * c.radius;
  }
}
```

📊 **Dlaczego?** Implementuje operację

### Krok 5: Użycie

```typescript
const shapes: Shape[] = [new Circle(5), new Rectangle(3, 4)];
const calculator = new AreaCalculator();

for (const shape of shapes) {
  shape.accept(calculator);
}
```

✨ **Dlaczego?** Operacja na wielu typach bez if/switch!

## Praktyczne Zastosowania

1. **Graph Analysis** - Computing statistics
2. **Compilers** - AST traversal and generation
3. **Rendering** - Different format exports
4. **Reporting** - Different output formats
5. **Validation** - Multiple validation rules
6. **Serialization** - Different serialization formats
7. **Testing** - Multiple test scenarios

## Wniosek

Wzorzec Visitor pozwala:

- 👁️ Na dodawanie operacji bez zmiany elementów
- 🔄 Na Double dispatch (polymorphic calls)
- 📊 Na separation of concerns

---

📚 **Materiały:**

- [Refactoring.Guru - Visitor](https://refactoring.guru/design-patterns/visitor)
