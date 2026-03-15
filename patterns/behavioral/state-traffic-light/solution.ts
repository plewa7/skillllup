/**
 * WZORZEC STATE - Implementacja
 *
 * Zadanie:
 * Stwórz system sygnalizacji świetlnej ze zmianą stanów:
 * 1. Interface State definiuje metodę handle()
 * 2. Konkretne stany implementują logikę (Red, Yellow, Green)
 * 3. Context (TrafficLight) zmienia stany automatycznie
 * 4. Każdy stan powiadamia UI o zmianie klasy CSS i tekstu
 */

// ============================================
// 1. INTERFEJS STATE
// ============================================
interface TrafficLightState {
  // ZAIMPLEMENTUJ: Metoda handle zwraca następny stan
  handle(): TrafficLightState;

  // ZAIMPLEMENTUJ: Zwraca kolor/klasę CSS
  getColor(): string;

  // ZAIMPLEMENTUJ: Zwraca tekst stanu
  getText(): string;

  // ZAIMPLEMENTUJ: Zwraca ilość sekund dla tego stanu
  getDuration(): number;
}

// ============================================
// 2. KONKRETNE STANY
// ============================================
class RedLightState implements TrafficLightState {
  handle(): TrafficLightState {
    // ZAIMPLEMENTUJ: Zwróć następny stan (żółty)
  }

  getColor(): string {
    // ZAIMPLEMENTUJ
  }

  getText(): string {
    // ZAIMPLEMENTUJ
  }

  getDuration(): number {
    // ZAIMPLEMENTUJ: Czerwone świda się 5 sekund
  }
}

class YellowLightState implements TrafficLightState {
  handle(): TrafficLightState {
    // ZAIMPLEMENTUJ: Zwróć następny stan (zielony)
  }

  getColor(): string {
    // ZAIMPLEMENTUJ
  }

  getText(): string {
    // ZAIMPLEMENTUJ
  }

  getDuration(): number {
    // ZAIMPLEMENTUJ: Żółte świata się 2 sekundy
  }
}

class GreenLightState implements TrafficLightState {
  handle(): TrafficLightState {
    // ZAIMPLEMENTUJ: Zwróć następny stan (czerwony)
  }

  getColor(): string {
    // ZAIMPLEMENTUJ
  }

  getText(): string {
    // ZAIMPLEMENTUJ
  }

  getDuration(): number {
    // ZAIMPLEMENTUJ: Zielone świata się 5 sekund
  }
}

// ============================================
// 3. CONTEXT - SYGNALIZACJA ŚWIETLNA
// ============================================
class TrafficLight {
  // ZAIMPLEMENTUJ: Prywatne pole na obecny stan
  // private currentState: TrafficLightState;

  constructor(
    private redLight: HTMLElement,
    private yellowLight: HTMLElement,
    private greenLight: HTMLElement,
    private stateDisplay: HTMLElement
  ) {
    // ZAIMPLEMENTUJ: Ustaw domyślny stan (RedLightState)
  }

  // ZAIMPLEMENTUJ: Metoda changeState
  // Zmienia stan i aktualizuje UI
  setState(state: TrafficLightState): void {
    // ZAIMPLEMENTUJ:
    // 1. Ustaw nowy stan
    // 2. Zaktualizuj UI
  }

  // ZAIMPLEMENTUJ: Metoda nextState
  // Przechodzi do następnego stanu
  nextState(): void {
    // ZAIMPLEMENTUJ:
    // 1. Pobierz następny stan z currentState.handle()
    // 2. Ustaw go via setState()
  }

  // ZAIMPLEMENTUJ: Metoda updateUI
  // Aktualizuje wygląd świateł
  private updateUI(): void {
    // ZAIMPLEMENTUJ:
    // 1. Usuń wszystkie klasy (red, yellow, green) ze wszystkich świateł
    // 2. Dodaj odpowiednią klasę do właściwego światła
    // 3. Zaktualizuj tekst stanu
  }
}

// ============================================
// 4. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Pobierz elementy z DOM
  const redLight = document.getElementById('redLight') as HTMLElement;
  const yellowLight = document.getElementById('yellowLight') as HTMLElement;
  const greenLight = document.getElementById('greenLight') as HTMLElement;
  const stateDisplay = document.querySelector('[data-testid="current-state"]') as HTMLElement;
  const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

  // ZAIMPLEMENTUJ:
  // 1. Stwórz instancję TrafficLight
  // 2. Nasłuchuj kliknięcia nextBtn -> trafficLight.nextState()
  // 3. Nasłuchuj kliknięcia resetBtn -> trafficLight.setState(new RedLightState())
});
