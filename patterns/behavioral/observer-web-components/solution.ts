/**
 * WZORZEC OBSERVER - Implementacja
 *
 * Zadanie:
 * Stwórz system reaktywności, gdzie:
 * 1. Pole input (Observable) wysyła powiadomienia o zmianach
 * 2. Dwa komponenty (Observers) nasłuchują zmian i sich aktualizują
 *
 * Struktura:
 * - Observable = źródło danych (input field)
 * - Observer = komponenty nasłuchujące zmian
 * - update() = metoda wywoływana na każdego observera po zmianie
 */

// ============================================
// 1. INTERFEJS OBSERVERA
// ============================================
interface Observer {
  update(
    data: string,
  ): void;
}

// ============================================
// 2. KLASA OBSERVABLE (Źródło Danych)
// ============================================
class InputObservable {
  // Tutaj przechowuj referencje do obserwatorów
  // ZAIMPLEMENTUJ: Dodaj private pole do przechowywania obserwatorów

  private obserwators: Observer[] =
    [];

  constructor(
    private inputElement: HTMLInputElement,
  ) {
    // ZAIMPLEMENTUJ:
    // 1. Nasłuchuj zmian na inputElement (event 'input')
    // 2. Na każdą zmianę, powiadom wszystkich obserwatorów
    this.inputElement.addEventListener(
      "input",
      () => {
        const value =
          this.getValue();
        this.notifyObservers(
          value,
        );
      },
    );
  }

  // ZAIMPLEMENTUJ: Metoda subscribe
  // Powinna dodać obserwatora do listy
  subscribe(
    observer: Observer,
  ): void {
    this.obserwators.push(
      observer,
    );
  }

  // ZAIMPLEMENTUJ: Metoda unsubscribe
  // Powinna usunąć obserwatora z listy
  unsubscribe(
    observer: Observer,
  ): void {
    this.obserwators =
      this.obserwators.filter(
        (
          obs,
        ) =>
          obs !==
          observer,
      );
  }

  // ZAIMPLEMENTUJ: Metoda notifyObservers
  // Powinna wywołać update() na każdego obserwatora
  private notifyObservers(
    data: string,
  ): void {
    this.obserwators.forEach(
      (
        obs,
      ) =>
        obs.update(
          data,
        ),
    );
  }

  // Helper do pobrania bieżącej wartości inputu
  getValue(): string {
    return this
      .inputElement
      .value;
  }
}

// ============================================
// 3. KONKRETNE KOMPONENTY - OBSERVERZY
// ============================================
class ObserverComponent1 implements Observer {
  constructor(
    private element: HTMLElement,
  ) {
    this.element.textContent =
      "oczekuje danych...";
  }

  // ZAIMPLEMENTUJ: Metoda update
  // Powinna zaktualizować zawartość element.textContent
  update(
    data: string,
  ): void {
    this.element.textContent =
      data;
  }
}

class ObserverComponent2 implements Observer {
  constructor(
    private element: HTMLElement,
  ) { 
    this.element.textContent =
      "oczekuje danych...";
  }

  // ZAIMPLEMENTUJ: Metoda update
  // Powinna zaktualizować zawartość element.textContent
  update(
    data: string,
  ): void {
    this.element.textContent = data;
  }
}

// ============================================
// 4. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener(
  "DOMContentLoaded",
  () => {
    // Pobierz elementy z DOM
    const inputElement =
      document.getElementById(
        "observableInput",
      ) as HTMLInputElement;
    const observer1Element =
      document.querySelector(
        '[data-testid="observer-1-value"]',
      ) as HTMLElement;
    const observer2Element =
      document.querySelector(
        '[data-testid="observer-2-value"]',
      ) as HTMLElement;

    // ZAIMPLEMENTUJ:
    // 1. Stwórz instancję InputObservable
    // 2. Stwórz instancje ObserverComponent1 i ObserverComponent2
    // 3. Zarejestruj obserwatorów Subscribe

    // Przykład struktury (zastąp polami):
    const observable =
      new InputObservable(
        inputElement,
      );
    const component1 =
      new ObserverComponent1(
        observer1Element,
      );
    const component2 =
      new ObserverComponent2(
        observer2Element,
      );
    observable.subscribe(
      component1,
    );
    observable.subscribe(
      component2,
    );
  },
);
