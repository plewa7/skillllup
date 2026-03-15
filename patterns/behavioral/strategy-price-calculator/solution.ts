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
  }

  getName(): string {
    // ZAIMPLEMENTUJ
  }
}

// ZAIMPLEMENTUJ: DiscountPricingStrategy
// Powinna zwracać cenę ze zniżką 20%: basePrice * 0.8
class DiscountPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
  }

  getName(): string {
    // ZAIMPLEMENTUJ
  }
}

// ZAIMPLEMENTUJ: TaxPricingStrategy
// Powinna zwracać cenę z VAT 23%: basePrice * 1.23
class TaxPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
  }

  getName(): string {
    // ZAIMPLEMENTUJ
  }
}

// ZAIMPLEMENTUJ: PremiumPricingStrategy
// Powinna zwracać cenę premium +50%: basePrice * 1.5
class PremiumPricingStrategy implements PricingStrategy {
  calculate(basePrice: number): number {
    // ZAIMPLEMENTUJ
  }

  getName(): string {
    // ZAIMPLEMENTUJ
  }
}

// ============================================
// 3. CONTEXT - KALKULATOR CEN
// ============================================
class PriceCalculator {
  // ZAIMPLEMENTUJ: Prywatne pole na aktualną strategię
  // private strategy: PricingStrategy;

  constructor(
    private basePrice: number,
    private resultElement: HTMLElement,
    private breakdownElement: HTMLElement,
  ) {
    // ZAIMPLEMENTUJ: Ustaw domyślną strategię na RegularPricingStrategy
  }

  // ZAIMPLEMENTUJ: Metoda setStrategy
  // Zmienia strategię i przelicza wynik
  setStrategy(strategy: PricingStrategy): void {
    // ZAIMPLEMENTUJ:
    // 1. Ustaw nową strategię
    // 2. Przelicz wynik via calculate()
  }

  // ZAIMPLEMENTUJ: Metoda setBasePrice
  // Zmienia cenę bazową i przelicza wynik
  setBasePrice(price: number): void {
    // ZAIMPLEMENTUJ:
    // 1. Ustaw nową cenę
    // 2. Przelicz wynik
  }

  // ZAIMPLEMENTUJ: Metoda calculate
  // Oblicza cenę za pomocą aktualnej strategii
  private calculate(): void {
    // ZAIMPLEMENTUJ:
    // 1. Oblicz nową cenę: this.strategy.calculate(this.basePrice)
    // 2. Sformatuj do 2 miejsc po przecinku
    // 3. Zaktualizuj resultElement.textContent

    // Formatowanie: (123.456).toFixed(2) = "123.46"
    // Wynik powinien być: "123,46 zł" (zł zamiast .)

    // Zaktualizuj breakdownElement z nazwą strategii
  }
}

// ============================================
// 4. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Pobierz elementy z DOM
  const basePriceInput = document.getElementById(
    "basePrice",
  ) as HTMLInputElement;
  const resultElement = document.querySelector(
    '[data-testid="result-value"]',
  ) as HTMLElement;
  const breakdownElement = document.querySelector(
    '[data-testid="result-breakdown"]',
  ) as HTMLElement;
  const strategyCards = document.querySelectorAll(
    ".strategy-card",
  ) as NodeListOf<HTMLElement>;

  // ZAIMPLEMENTUJ:
  // 1. Stwórz instancję PriceCalculator z wartością z input'u
  // 2. Stwórz mapy strategii: { regular: new Regular..., discount: new Discount..., itd }
  // 3. Nasłuchuj kliknięć na karty strategii
  // 4. Nasłuchuj zmian w input'ie (zmiana ceny bazowej)
  // 5. Zaktualizuj UI
});
