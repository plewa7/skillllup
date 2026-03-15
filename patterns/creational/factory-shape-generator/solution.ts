/**
 * WZORZEC FACTORY - Implementacja
 *
 * Zadanie:
 * Stwórz fabrykę do tworzenia kształtów (Shape factory pattern):
 * 1. Interface Shape definiuje typ kształtu
 * 2. Konkretne klasy kształtów (Circle, Square, Triangle, Rectangle)
 * 3. ShapeFactory enkapsuluje tworzenie
 * 4. Aplikacja używa factory do tworzenia nowych kształtów
 */

// ============================================
// 1. INTERFEJS SHAPE
// ============================================
interface Shape {
  // ZAIMPLEMENTUJ: Zwraca typ kształtu jako string
  getType(): string;

  // ZAIMPLEMENTUJ: Zwraca klasę CSS dla tego kształtu
  getCssClass(): string;

  // ZAIMPLEMENTUJ: Zwraca rzeczywisty kształt (HTML element lub string)
  render(): HTMLElement;
}

// ============================================
// 2. KONKRETNE KSZTAŁTY
// ============================================
class Circle implements Shape {
  getType(): string {
    // ZAIMPLEMENTUJ
  }

  getCssClass(): string {
    // ZAIMPLEMENTUJ: Powinna być 'circle'
  }

  render(): HTMLElement {
    // ZAIMPLEMENTUJ: Stwórz i zwróć HTMLElement z klasą CSS
    // Powinien zawierać data-testid="shape-item"
  }
}

class Square implements Shape {
  getType(): string {
    // ZAIMPLEMENTUJ
  }

  getCssClass(): string {
    // ZAIMPLEMENTUJ: Powinna być 'square'
  }

  render(): HTMLElement {
    // ZAIMPLEMENTUJ
  }
}

class Triangle implements Shape {
  getType(): string {
    // ZAIMPLEMENTUJ
  }

  getCssClass(): string {
    // ZAIMPLEMENTUJ: Powinna być 'triangle'
  }

  render(): HTMLElement {
    // ZAIMPLEMENTUJ
  }
}

class Rectangle implements Shape {
  getType(): string {
    // ZAIMPLEMENTUJ
  }

  getCssClass(): string {
    // ZAIMPLEMENTUJ: Powinna być 'rect'
  }

  render(): HTMLElement {
    // ZAIMPLEMENTUJ
  }
}

// ============================================
// 3. SHAPE FACTORY
// ============================================
class ShapeFactory {
  // ZAIMPLEMENTUJ: Factory method
  // Zwraca Shape na podstawie string'a
  static create(type: string): Shape {
    // ZAIMPLEMENTUJ:
    // switch (type) {
    //   case 'circle': return new Circle();
    //   case 'square': return new Square();
    //   case 'triangle': return new Triangle();
    //   case 'rect': return new Rectangle();
    //   default: throw new Error(`Unknown shape type: ${type}`);
    // }
  }
}

// ============================================
// 4. SHAPE MANAGER - Zarządzanie kształtami
// ============================================
class ShapeManager {
  // ZAIMPLEMENTUJ: Tablica przechowująca wszystkie kształty
  private shapes: Shape[] = [];

  // ZAIMPLEMENTUJ: Liczniki dla każdego typu
  private counts = {
    circle: 0,
    square: 0,
    triangle: 0,
    rect: 0,
  };

  constructor(
    private canvas: HTMLElement,
    private totalCountEl: HTMLElement,
    private circleCountEl: HTMLElement,
    private squareCountEl: HTMLElement,
    private triangleCountEl: HTMLElement,
    private rectCountEl: HTMLElement
  ) {}

  // ZAIMPLEMENTUJ: Dodaj nowy kształt
  addShape(type: string): void {
    // ZAIMPLEMENTUJ:
    // 1. Użyj ShapeFactory.create(type)
    // 2. Dodaj do tablicy shapes
    // 3. Pobrania renderowanie do canvas
    // 4. Zaktualizuj liczniki
    // 5. Zaktualizuj UI
  }

  // ZAIMPLEMENTUJ: Wyczyść wszystkie kształty
  clear(): void {
    // ZAIMPLEMENTUJ:
    // 1. Wyczyść shapes array
    // 2. Wyczyść counts
    // 3. Wyczyść canvas HTML
    // 4. Zaktualizuj UI
  }

  // ZAIMPLEMENTUJ: Prywatna metoda do aktualizacji UI liczników
  private updateUI(): void {
    // ZAIMPLEMENTUJ:
    // 1. Oblicz totalCount
    // 2. Zaktualizuj textContent elementów z licznikami
  }

  // ZAIMPLEMENTUJ: Getter dla liczby kształtów
  getCount(type: string): number {
    // ZAIMPLEMENTUJ: Zwróć liczbę dla danego typu
  }

  // ZAIMPLEMENTUJ: Getter dla całkowitej liczby
  getTotalCount(): number {
    // ZAIMPLEMENTUJ: Zwróć sumę wszystkich kształtów
  }
}

// ============================================
// 5. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz elementy z DOM
  const canvas = document.getElementById('canvas') as HTMLElement;
  const totalCountEl = document.getElementById('totalCount') as HTMLElement;
  const circleCountEl = document.getElementById('circleCount') as HTMLElement;
  const squareCountEl = document.getElementById('squareCount') as HTMLElement;
  const triangleCountEl = document.getElementById('triangleCount') as HTMLElement;
  const rectCountEl = document.getElementById('rectCount') as HTMLElement;

  const circleBtn = document.getElementById('circleBtn') as HTMLButtonElement;
  const squareBtn = document.getElementById('squareBtn') as HTMLButtonElement;
  const triangleBtn = document.getElementById('triangleBtn') as HTMLButtonElement;
  const rectBtn = document.getElementById('rectBtn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;

  // ZAIMPLEMENTUJ:
  // 1. Stwórz instancję ShapeManager
  // 2. Nasłuchuj kliknięcia każdego przycisku:
  //    - circleBtn -> shapeManager.addShape('circle')
  //    - squareBtn -> shapeManager.addShape('square')
  //    - triangleBtn -> shapeManager.addShape('triangle')
  //    - rectBtn -> shapeManager.addShape('rect')
  // 3. Nasłuchuj clearBtn -> shapeManager.clear()
});
