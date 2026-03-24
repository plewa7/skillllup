# 🔧 Abstract Factory - UI Theme Factory

## Wzorzec Abstract Factory

Wzorzec Abstract Factory należy do grupy wzorców **kreacyjnych** (Creational Patterns). Dostarcza interfejs do tworzenia rodzin powiązanych lub zależnych obiektów bez określania ich konkretnych klas.

## Diagram Wzorca

```
         ┌────────────────────┐
         │ Theme Factory      │
         └────────┬───────────┘
                  │
         ┌────────┴──────────┐
         │                   │
    LightTheme          DarkTheme
    ├── Button           ├── Button
    ├── Input            ├── Input
    └── Label            └── Label
    (white bg)           (dark bg)
```

## Scenario: UI Themes (Light/Dark)

Aplikacja obsługuje:

- Light Theme (białe tło, ciemny tekst)
- Dark Theme (ciemne tło, jasny tekst)

Bez Abstract Factory:

```typescript
// Zarządzaj każdy komponencie! 😱
if (isDarkMode) {
  const button = new DarkButton();
  const input = new DarkInput();
} else {
  const button = new LightButton();
  const input = new LightInput();
}
```

Z Abstract Factory:

```typescript
// Factory robi wszystko! ✨
const factory = isDarkMode ? new DarkThemeFactory() : new LightThemeFactory();
const button = factory.createButton();
const input = factory.createInput();
```

## Komponenty

### 1. **Abstract Factory**

```typescript
interface ThemeFactory {
  createButton(): Button;
  createInput(): Input;
  createLabel(): Label;
}
```

### 2. **Concrete Factories**

```typescript
class LightThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new LightButton();
  }
  createInput(): Input {
    return new LightInput();
  }
}

class DarkThemeFactory implements ThemeFactory {
  createButton(): Button {
    return new DarkButton();
  }
  createInput(): Input {
    return new DarkInput();
  }
}
```

### 3. **Abstract Products**

```typescript
interface Button {
  render(): void;
}
interface Input {
  render(): void;
}
interface Label {
  render(): void;
}
```

### 4. **Concrete Products**

```typescript
class LightButton implements Button {
  render(): void {
    console.log('Light button');
  }
}

class DarkButton implements Button {
  render(): void {
    console.log('Dark button');
  }
}
```

## Co Implementujesz

### Krok 1: Abstract Products

```typescript
interface UIComponent {
  render(): string;
}
```

🎨 **Dlaczego?** Define product contracts

### Krok 2: Concrete Products

```typescript
class LightButton implements UIComponent { ... }
class DarkButton implements UIComponent { ... }
```

🔨 **Dlaczego?** Specific implementations

### Krok 3: Abstract Factory

```typescript
interface UIFactory {
  createButton(): UIComponent;
  createInput(): UIComponent;
}
```

🏭 **Dlaczego?** Factory contract

### Krok 4: Concrete Factories

```typescript
class LightFactory implements UIFactory { ... }
class DarkFactory implements UIFactory { ... }
```

⚙️ **Dlaczego?** Specific factories

### Krok 5: Usage

```typescript
const factory = isDarkMode ? new DarkFactory() : new LightFactory();
const button = factory.createButton();
```

✨ **Dlaczego?** Famiglia di prodotti!

## Praktyczne Zastosowania

1. **UI Themes** - Light, Dark, High Contrast
2. **Database Drivers** - MySQL, PostgreSQL, SQLite
3. **Graphics** - Different rendering engines
4. **Payment Methods** - Credit Card, PayPal, Bitcoin
5. **Cloud Providers** - AWS, Azure, Google Cloud
6. **Cross-platform** - iOS, Android, Web

## Porównanie: Factory vs Abstract Factory

### Factory

```typescript
// Single product
const button = ButtonFactory.create('light');
```

### Abstract Factory

```typescript
// Família of products
const factory = ThemeFactory.get('light');
const button = factory.createButton();
const input = factory.createInput();
```

## Wniosek

Wzorzec Abstract Factory pozwala:

- 🏭 Na tworzenie famili powiązanych produktów
- 🔄 Na swobodną zmianę całych famili
- 📦 Na ensure consistency między produktami

---

📚 **Materiały:**

- [Refactoring.Guru - Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
