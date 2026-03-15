# Strategy Pattern Implementation Guide

## 📖 Co to jest Strategy Pattern?

Strategy Pattern to wzorzec behawioralny, który **encapsulates** zestaw algorytmów i czyni je **interchangeable** (wymienialnymi).

Pozwala na zmianę algorytmu **w runtime'ie** bez zmiany kodu klienta.

### Przykład z Rzeczywistości

```
Kalkulator ceny - mamy różne sposoby liczenia:
  ├── Regular: cena = X
  ├── Discount: cena = X × 0.8 (zniżka 20%)
  ├── Tax: cena = X × 1.23 (VAT)
  └── Premium: cena = X × 1.5 (dla VIP)

Użytkownik wybiera strategię klikając kafel → cena się przelicza!
```

### Diagram

```
┌─────────────────────────────────────────┐
│      PricingStrategy (Interface)        │
│ ┌─────────────────────────────────────┐ │
│ │ + calculate(basePrice: number)      │ │
│ │ + getName(): string                 │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
    ↑            ↑           ↑          ↑
    │            │           │          │
 Regu...      Disco...     Tax...    Prem...
    │            │           │          │
└─────────────────────────────────────────┘

    Context (PriceCalculator)
    - strategy: PricingStrategy
    + setStrategy(strategy)
    + calculate()
```

## 🎯 Zadanie dla Ciebie

### Część 1: Implementuj Konkretne Strategie

```typescript
class RegularPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // TODO: return basePrice
  }

  getName(): string {
    // TODO: return "Zwykła Cena"
  }
}

class DiscountPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // TODO: return basePrice * 0.8
  }

  getName(): string {
    // TODO: return "Ze Zniżką 20%"
  }
}

class TaxPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // TODO: return basePrice * 1.23
  }

  getName(): string {
    // TODO: return "Z VAT 23%"
  }
}

class PremiumPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // TODO: return basePrice * 1.5
  }

  getName(): string {
    // TODO: return "Premium +50%"
  }
}
```

### Część 2: Implementuj Context (PriceCalculator)

```typescript
class PriceCalculator {
  private strategy: PricingStrategy;

  constructor(basePrice: number, resultElement: HTMLElement, breakdownElement: HTMLElement) {
    this.basePrice = basePrice;
    this.resultElement = resultElement;
    this.breakdownElement = breakdownElement;

    // Ustaw domyślną strategię
    this.strategy = new RegularPricingStrategy();
    this.calculate();
  }

  setStrategy(strategy: PricingStrategy): void {
    this.strategy = strategy;
    this.calculate();
  }

  setBasePrice(price: number): void {
    this.basePrice = price;
    this.calculate();
  }

  private calculate(): void {
    // Oblicz: this.strategy.calculate(this.basePrice)
    // Format do 2 miejsc: (123.456).toFixed(2) = "123.46"
    // Zamień "." na "," dla polskiego formatu
    // Aktualizuj DOM
  }
}
```

### Część 3: Inicjalizacja i Event Handlers

```typescript
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz elementy
  const basePriceInput = document.getElementById('basePrice') as HTMLInputElement;
  const resultElement = document.querySelector('[data-testid="result-value"]');
  const breakdownElement = document.querySelector('[data-testid="result-breakdown"]');
  const strategyCards = document.querySelectorAll('.strategy-card');

  // Stwórz kalkulator
  const calculator = new PriceCalculator(
    parseInt(basePriceInput.value),
    resultElement,
    breakdownElement
  );

  // Stwórz mapę strategii
  const strategies = {
    regular: new RegularPricingStrategy(),
    discount: new DiscountPricingStrategy(),
    tax: new TaxPricingStrategy(),
    premium: new PremiumPricingStrategy(),
  };

  // Nasłuchuj kliknięć na karty
  strategyCards.forEach((card) => {
    card.addEventListener('click', () => {
      const strategyKey = card.getAttribute('data-strategy');
      const strategy = strategies[strategyKey];

      // Zmień strategię
      calculator.setStrategy(strategy);

      // Aktualizuj UI (dodaj/usuń klasę active)
      strategyCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Nasłuchuj zmian ceny
  basePriceInput.addEventListener('input', () => {
    calculator.setBasePrice(parseInt(basePriceInput.value) || 0);
  });
});
```

## ✅ Jak Testować

### Uruchomienie Testów

```bash
npm run test
```

Powinno być **10 testów**, wszystkie będą failować do czasu implementacji.

### Uruchomienie HTML UI

```bash
npm run dev
```

Przejdź na: `http://localhost:5173/patterns/behavioral/strategy-price-calculator/index.html`

Ręcznie testuj:

1. Zmień cenę w input'ie
2. Kliknij na różne karty strategii
3. Obserwuj jak wynik się zmienia!

## 🔍 Czek Lista Implementacji

- [ ] Interfejs `PricingStrategy` definiuje `calculate()` i `getName()`
- [ ] Klasa `RegularPricingStrategy` - zwraca cenę bez zmian
- [ ] Klasa `DiscountPricingStrategy` - zwraca cenę × 0.8
- [ ] Klasa `TaxPricingStrategy` - zwraca cenę × 1.23
- [ ] Klasa `PremiumPricingStrategy` - zwraca cenę × 1.5
- [ ] Klasa `PriceCalculator` ma pole `strategy: PricingStrategy`
- [ ] Metoda `setStrategy()` zmienia strategię i przelicza
- [ ] Metoda `setBasePrice()` zmienia cenę i przelicza
- [ ] Metoda `calculate()` formuje liczbę z przecinkami
- [ ] W DOM-ie są event listenery na karty i input
- [ ] Kliknięcie na kartę zmienia klasę `active`
- [ ] npm run test pokazuje wszystkie 10 testów jako GREEN ✅

## 🎓 Lekcja do Zapamiętania

**Strategy Pattern jest super ważny bo:**

- ✅ **Open/Closed Principle** - otwarty na nowe strategie, zamknięty na modyfikacje
- ✅ **Eliminuje if/else** - zamiast `if (type === 'discount') { ... }` mamy obiekty
- ✅ **Runtime flexibility** - zmiana strategii bez restartowania aplikacji
- ✅ **Unit testability** - każda strategia testuje się osobno

## 📚 Różnica vs Observer Pattern

| Observer                                       | Strategy                                    |
| ---------------------------------------------- | ------------------------------------------- |
| **Notyfikacja** - Subject powiadamia Observers | **Enkapsulacja** - Context wybiera algorytm |
| One-to-many                                    | One-to-one (context ma jedną strategię)     |
| Asynchronous update                            | Synchronous compute                         |
| "Powiedz mi gdy coś się zmieni"                | "Oblicz to dla mnie tym sposobem"           |

---

Happy coding! 🚀
