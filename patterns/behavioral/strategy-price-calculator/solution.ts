/**
 * WZORZEC STRATEGY - Implementacja
 *
 * Zadanie:
 * Stwórz system strategii obliczania ceny, gdzie:
 * 1. Interface Strategy definiuje metodę calculate()
 * 2. Konkretne strategie implementują różne algorytmy
 * 3. PriceCalculator zmienia strategię w runtime'ie
 * 4. Użytkownik wybiera strategię klikając na karty
 *
 * Struktura:
 * - Strategy = interfejs ze wspólną metodą
 * - ConcreteStrategy = konkretne implementacje (Regular, Discount, Tax, Premium)
 * - Context = PriceCalculator, który używa strategii
 * - Client = kod DOM, który zmienia strategię
 */

// ============================================
// 1. INTERFEJS STRATEGY
// ============================================
interface PricingStrategy {
  // ZAIMPLEMENTUJ: Metoda calculate przyjmuje cenę bazową
  // ZAIMPLEMENTUJ: Zwraca obliczoną cenę
  calculate(basePrice: number): number;

  // ZAIMPLEMENTUJ: Zwraca nazwę strategii (do wyświetlenia)
  getName(): string;
}

// ============================================
// 2. KONKRETNE STRATEGIE
// ============================================
// ZAIMPLEMENTUJ: RegularPricingStrategy
// Powinna zwracać cenę bez zmian: basePrice
class RegularPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
    return basePrice;
  }

  getName(): string {
    // ZAIMPLEMENTUJ
    return 'Zwykła Cena';
  }
}

// ZAIMPLEMENTUJ: DiscountPricingStrategy
// Powinna zwracać cenę ze zniżką 20%: basePrice * 0.8
class DiscountPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
    return basePrice * 0.8;
  }

  getName(): string {
    // ZAIMPLEMENTUJ
    return 'Ze Zniżką 20%';
  }
}

// ZAIMPLEMENTUJ: TaxPricingStrategy
// Powinna zwracać cenę z VAT 23%: basePrice * 1.23
class TaxPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
    return basePrice * 1.23;
  }

  getName(): string {
    // ZAIMPLEMENTUJ
    return 'Cena z VAT 23%';
  }
}

// ZAIMPLEMENTUJ: PremiumPricingStrategy
// Powinna zwracać cenę premium +50%: basePrice * 1.5
class PremiumPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
    return basePrice * 1.5;
  }

  getName(): string {
    // ZAIMPLEMENTUJ
    return 'Cena Premium +50%';
  }
}

// ============================================
// 3. CONTEXT - KALKULATOR CEN
// ============================================
class PriceCalculator {
  // ZAIMPLEMENTUJ: Prywatne pole na aktualną strategię
  // private strategy: PricingStrategy;

  private strategy: PricingStrategy;

  constructor(
    private basePrice: number,
    private resultElement: HTMLElement,
    private breakdownElement: HTMLElement
  ) {
    // ZAIMPLEMENTUJ: Ustaw domyślną strategię na RegularPricingStrategy
    this.strategy = new RegularPricingStrategy();
  }

  // ZAIMPLEMENTUJ: Metoda setStrategy
  // Zmienia strategię i przelicza wynik
  setStrategy(strategy: PricingStrategy): void {
    // ZAIMPLEMENTUJ:
    // 1. Ustaw nową strategię
    // 2. Przelicz wynik via calculate()
    this.strategy = strategy;
    this.calculate();
  }

  // ZAIMPLEMENTUJ: Metoda setBasePrice
  // Zmienia cenę bazową i przelicza wynik
  setBasePrice(price: number): void {
    // ZAIMPLEMENTUJ:
    // 1. Ustaw nową cenę
    // 2. Przelicz wynik
    this.basePrice = price;
    this.calculate();
  }

  // ZAIMPLEMENTUJ: Metoda calculate
  // Oblicza cenę za pomocą aktualnej strategii
  private calculate(): void {
    // ZAIMPLEMENTUJ:
    // Formatowanie: (123.456).toFixed(2) = "123.46"
    // Wynik powinien być: "123,46 zł" (zł zamiast .)
    // 1. Oblicz nową cenę: this.strategy.calculate(this.basePrice)
    const calculatedPrice = this.strategy.calculate(this.basePrice);

    // 2. Sformatuj do 2 miejsc po przecinku
    const formattedPrice = calculatedPrice.toFixed(2).replace('.', ',') + ' zł';
    // 3. Zaktualizuj resultElement.textContent
    this.resultElement.textContent = formattedPrice;
    // Zaktualizuj breakdownElement - znajdź inner element z current-strategy
    const strategyElement = this.breakdownElement.querySelector('[data-testid="current-strategy"]');
    if (strategyElement) {
      strategyElement.textContent = this.strategy.getName();
    }
  }
}

// ============================================
// 4. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz elementy z DOM
  const basePriceInput = document.getElementById('basePrice') as HTMLInputElement;
  const resultElement = document.querySelector('[data-testid="result-value"]') as HTMLElement;
  const breakdownElement = document.querySelector(
    '[data-testid="result-breakdown"]'
  ) as HTMLElement;
  const strategyCards = document.querySelectorAll('.strategy-card') as NodeListOf<HTMLElement>;

  const calculator = new PriceCalculator(
    parseFloat(basePriceInput.value) || 0,
    resultElement,
    breakdownElement
  );
  const stragiesMap: { [key: string]: PricingStrategy } = {
    regular: new RegularPricingStrategy(),
    discount: new DiscountPricingStrategy(),
    tax: new TaxPricingStrategy(),
    premium: new PremiumPricingStrategy(),
  };

  strategyCards.forEach((card) => {
    card.addEventListener('click', () => {
      const strategyKey = card.getAttribute('data-strategy');
      if (strategyKey && stragiesMap[strategyKey]) {
        calculator.setStrategy(stragiesMap[strategyKey]);

        // Aktualizuj klasę active na kartach
        strategyCards.forEach((c) => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });

  basePriceInput.addEventListener('input', () => {
    const price = parseFloat(basePriceInput.value) || 0;
    calculator.setBasePrice(price);
  });

  // Inicjalna kalkulacja
  calculator.setBasePrice(parseFloat(basePriceInput.value) || 0);
});
