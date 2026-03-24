/**
 * WZORZEC DECORATOR - Implementacja
 *
 * Zadanie:
 * Stwórz system formatowania tekstu z użyciem dekoratorów:
 * 1. Interface TextComponent definiuje operacje na tekście
 * 2. PlainText implementuje komponent bazowy
 * 3. Abstract TextDecorator implementuje interfejs i opakowuje komponent
 * 4. Konkretne dekoratory dodają specjalne formatowanie
 * 5. Każdy dekorator może być łączony z innymi (composition)
 */

// ============================================
// 1. INTERFACE - KOMPONENTY TEKSTU
// ============================================
interface TextComponent {
  // ZAIMPLEMENTUJ: Metoda zwraca sformatowany tekst
  render(): string;
}

// ============================================
// 2. KOMPONENT BAZOWY
// ============================================
class PlainText implements TextComponent {
  // ZAIMPLEMENTUJ: Przechowuje oryginalny tekst
  constructor(private text: string) {}

  // ZAIMPLEMENTUJ: Zwraca tekst bez żadnego formatowania
  render(): string {
    return this.text;
  }
}

// ============================================
// 3. ABSTRACT DEKORATOR
// ============================================
abstract class TextDecorator implements TextComponent {
  // ZAIMPLEMENTUJ: Przechowuje referencję do dekorowanego komponentu
  protected component: TextComponent;

  // ZAIMPLEMENTUJ: Konstruktor przyjmuje komponent do dekoracji
  constructor(component: TextComponent) {
    this.component = component;
  }

  // ZAIMPLEMENTUJ: Abstract metoda render - musi być zaimplementowana w podklasach
  abstract render(): string;
}

// ============================================
// 4. KONKRETNE DEKORATORY
// ============================================

// ZAIMPLEMENTUJ: BoldDecorator - dodaje pogrubienie
class BoldDecorator extends TextDecorator {
  render(): string {
    // ZAIMPLEMENTUJ: Opakowuje tekst w tagi <strong>
    return `<strong>${this.component.render()}</strong>`;
  }
}

// ZAIMPLEMENTUJ: ItalicDecorator - dodaje kursywę
class ItalicDecorator extends TextDecorator {
  render(): string {
    // ZAIMPLEMENTUJ: Opakowuje tekst w tagi <em>
    return `<em>${this.component.render()}</em>`;
  }
}

// ZAIMPLEMENTUJ: UnderlineDecorator - dodaje podkreślenie
class UnderlineDecorator extends TextDecorator {
  render(): string {
    // ZAIMPLEMENTUJ: Opakowuje tekst w tagi <u>
    return `<u>${this.component.render()}</u>`;
  }
}

// ZAIMPLEMENTUJ: UppercaseDecorator - zmienia na wielkie litery
class UppercaseDecorator extends TextDecorator {
  render(): string {
    // ZAIMPLEMENTUJ: Konwertuje tekst na wielkie litery
    return this.component.render().toUpperCase();
  }
}

// ZAIMPLEMENTUJ: ColorDecorator - dodaje kolor
class ColorDecorator extends TextDecorator {
  render(): string {
    // ZAIMPLEMENTUJ: Opakowuje tekst w span z kolorem
    return `<span style="color: #f5576c; background: #ffe0e6; padding: 2px 6px; border-radius: 3px;">${this.component.render()}</span>`;
  }
}

// ============================================
// 5. FORMATTER - MANAGER TEKSTÓW
// ============================================
class TextFormatter {
  // ZAIMPLEMENTUJ: Baza tekstowa
  private baseText: TextComponent;

  // ZAIMPLEMENTUJ: Lista aktywnych dekoratorów
  private decorators: TextDecorator[] = [];

  // ZAIMPLEMENTUJ: Konstruktor z tekstem
  constructor(text: string) {
    this.baseText = new PlainText(text);
  }

  // ZAIMPLEMENTUJ: Aktualizacja tekstu bazowego
  updateText(text: string): void {
    this.baseText = new PlainText(text);
  }

  // ZAIMPLEMENTUJ: Dodaj dekorator
  addDecorator(decorator: TextDecorator): void {
    this.decorators.push(decorator);
  }

  // ZAIMPLEMENTUJ: Wyczyść dekoratory
  clearDecorators(): void {
    this.decorators = [];
  }

  // ZAIMPLEMENTUJ: Zwróć liczbę aktywnych dekoratorów
  getDecoratorCount(): number {
    return this.decorators.length;
  }

  // ZAIMPLEMENTUJ: Zbuduj finalny komponent z wszystkimi dekoratorami
  buildComponent(): TextComponent {
    // ZAIMPLEMENTUJ: Zacznij od tekstu bazowego
    let component: TextComponent = this.baseText;

    // ZAIMPLEMENTUJ: Aplikuj każdy dekorator po kolei
    for (const decorator of this.decorators) {
      // Każdy dekorator opakowuje poprzedni komponent
      component = this.applyDecoratorToComponent(decorator, component);
    }

    return component;
  }

  // ZAIMPLEMENTUJ: Helper do aplikacji dekoratora
  private applyDecoratorToComponent(
    decoratorType: TextDecorator,
    component: TextComponent
  ): TextComponent {
    // ZAIMPLEMENTUJ: Dynamicznie aplikuj dekorator
    if (decoratorType instanceof BoldDecorator) {
      return new BoldDecorator(component);
    } else if (decoratorType instanceof ItalicDecorator) {
      return new ItalicDecorator(component);
    } else if (decoratorType instanceof UnderlineDecorator) {
      return new UnderlineDecorator(component);
    } else if (decoratorType instanceof UppercaseDecorator) {
      return new UppercaseDecorator(component);
    } else if (decoratorType instanceof ColorDecorator) {
      return new ColorDecorator(component);
    }
    return component;
  }

  // ZAIMPLEMENTUJ: Renderuj finalny tekst
  render(): string {
    return this.buildComponent().render();
  }
}

// ============================================
// 6. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ZAIMPLEMENTUJ: Pobierz elementy z DOM
  const textInput = document.getElementById('textInput') as HTMLTextAreaElement;
  const preview = document.getElementById('preview') as HTMLElement;
  const boldCheck = document.getElementById('boldCheck') as HTMLInputElement;
  const italicCheck = document.getElementById('italicCheck') as HTMLInputElement;
  const underlineCheck = document.getElementById('underlineCheck') as HTMLInputElement;
  const uppercaseCheck = document.getElementById('uppercaseCheck') as HTMLInputElement;
  const colorCheck = document.getElementById('colorCheck') as HTMLInputElement;
  const decoratorCount = document.getElementById('decoratorCount') as HTMLElement;
  const charCount = document.getElementById('charCount') as HTMLElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

  // ZAIMPLEMENTUJ: Stwórz formatter
  let formatter = new TextFormatter('');

  // ZAIMPLEMENTUJ: Funkcja do aktualizacji podglądu
  const updatePreview = (): void => {
    // ZAIMPLEMENTUJ: Pobierz tekst z input'a
    const text = textInput.value;

    if (text.trim() === '') {
      // ZAIMPLEMENTUJ: Jeśli tekst pusty, pokaż placeholder
      preview.textContent = '[Podgląd pokaże się tutaj]';
      preview.classList.add('empty');
      decoratorCount.textContent = '0';
      charCount.textContent = '0';
      return;
    }

    preview.classList.remove('empty');

    // ZAIMPLEMENTUJ: Aktualizuj formatter z nowym tekstem
    formatter.updateText(text);
    formatter.clearDecorators();

    // ZAIMPLEMENTUJ: Dodaj dekoratory na podstawie checkboxów
    if (boldCheck.checked) {
      formatter.addDecorator(new BoldDecorator(new PlainText('')));
    }
    if (italicCheck.checked) {
      formatter.addDecorator(new ItalicDecorator(new PlainText('')));
    }
    if (underlineCheck.checked) {
      formatter.addDecorator(new UnderlineDecorator(new PlainText('')));
    }
    if (uppercaseCheck.checked) {
      formatter.addDecorator(new UppercaseDecorator(new PlainText('')));
    }
    if (colorCheck.checked) {
      formatter.addDecorator(new ColorDecorator(new PlainText('')));
    }

    // ZAIMPLEMENTUJ: Renderuj i pokaż tekst
    preview.innerHTML = formatter.render();

    // ZAIMPLEMENTUJ: Aktualizuj liczniki
    decoratorCount.textContent = formatter.getDecoratorCount().toString();
    charCount.textContent = text.length.toString();
  };

  // ZAIMPLEMENTUJ: Event listener na zmianę tekstu
  textInput.addEventListener('input', updatePreview);

  // ZAIMPLEMENTUJ: Event listenery na checkboxy
  boldCheck.addEventListener('change', updatePreview);
  italicCheck.addEventListener('change', updatePreview);
  underlineCheck.addEventListener('change', updatePreview);
  uppercaseCheck.addEventListener('change', updatePreview);
  colorCheck.addEventListener('change', updatePreview);

  // ZAIMPLEMENTUJ: Reset button
  resetBtn.addEventListener('click', () => {
    textInput.value = '';
    boldCheck.checked = false;
    italicCheck.checked = false;
    underlineCheck.checked = false;
    uppercaseCheck.checked = false;
    colorCheck.checked = false;
    updatePreview();
  });

  // ZAIMPLEMENTUJ: Inicjalizuj podgląd
  updatePreview();
});
