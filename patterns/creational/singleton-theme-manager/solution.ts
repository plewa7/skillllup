/**
 * WZORZEC SINGLETON - Implementacja
 *
 * Zadanie:
 * Stwórz menedżer motywu jako singleton z kontrolą dostępu:
 * 1. Interface ThemeConfig definiuje strukturę motywu
 * 2. ThemeManager implementuje Singleton pattern
 * 3. Private constructor uniemożliwia bezpośrednie tworzenie instancji
 * 4. getInstance() zwraca zawsze tę samą instancję
 * 5. Aplikacja zarządza motywem poprzez Singleton
 */

// ============================================
// 1. INTERFEJS I TYPY
// ============================================
interface ThemeConfig {
  // ZAIMPLEMENTUJ: Struktura konfiguracji motywu
  name: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
}

// ============================================
// 2. KONFIGURACJE MOTYWÓW
// ============================================
const LIGHT_THEME: ThemeConfig = {
  // ZAIMPLEMENTUJ: Ustawienia motywu jasnego
  name: 'Light',
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  textColor: '#333',
  primaryColor: '#667eea',
  secondaryColor: '#764ba2',
};

const DARK_THEME: ThemeConfig = {
  // ZAIMPLEMENTUJ: Ustawienia motywu ciemnego
  name: 'Dark',
  backgroundColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  textColor: '#e0e0e0',
  primaryColor: '#764ba2',
  secondaryColor: '#667eea',
};

// ============================================
// 3. SINGLETON - MENEDŻER MOTYWU
// ============================================
class ThemeManager {
  // ZAIMPLEMENTUJ: Prywatna statyczna instancja
  // Przechowuje jedyną instancję klasy
  private static instance: ThemeManager | null = null;

  // ZAIMPLEMENTUJ: Licznik instancji dla testów
  // Pokazuje ile razy próbowano utworzyć nową instancję
  private static instanceCount: number = 0;

  // ZAIMPLEMENTUJ: Prywatne pole na obecny motyw
  private currentTheme: ThemeConfig;

  // ============================================
  // KONSTRUKTOR PRYWATNY
  // ============================================
  // ZAIMPLEMENTUJ: Private constructor
  // Uniemożliwia tworzenie instancji poprzez new ThemeManager()
  // Instancję można uzyskać tylko poprzez getInstance()
  private constructor() {
    this.currentTheme = LIGHT_THEME;
  }

  // ============================================
  // PUBLICZNE METODY STATICZE
  // ============================================

  // ZAIMPLEMENTUJ: getInstance() - Główna metoda Singleton pattern
  // Zwraca jedyną instancję klasy
  // Jeśli instancja nie istnieje, tworzy ją
  // Jeśli istnieje, zwraca tę samą instancję
  public static getInstance(): ThemeManager {
    // ZAIMPLEMENTUJ: Sprawdź czy instancja już istnieje
    if (ThemeManager.instance === null) {
      // ZAIMPLEMENTUJ: Jeśli nie, utwórz nową
      ThemeManager.instance = new ThemeManager();
      ThemeManager.instanceCount++;
    }
    // ZAIMPLEMENTUJ: Zwróć istniejącą instancję
    return ThemeManager.instance;
  }

  // ZAIMPLEMENTUJ: Metoda dla testów
  // Zwraca liczbę utworzonych instancji
  public static getInstanceCount(): number {
    return ThemeManager.instanceCount;
  }

  // ============================================
  // PUBLICZNE METODY INSTANCJI
  // ============================================

  // ZAIMPLEMENTUJ: Metoda applyTheme
  // Zmienia motyw i aktualizuje UI
  public applyTheme(themeName: string): void {
    // ZAIMPLEMENTUJ: Wybierz motyw
    let theme: ThemeConfig = LIGHT_THEME;

    if (themeName === 'dark') {
      theme = DARK_THEME;
    } else if (themeName === 'light') {
      theme = LIGHT_THEME;
    }

    // ZAIMPLEMENTUJ: Ustaw nowy motyw
    this.currentTheme = theme;

    // ZAIMPLEMENTUJ: Zastosuj do dokumentu
    this.updateUI();
  }

  // ZAIMPLEMENTUJ: Metoda toggleTheme
  // Przełącza między motywami
  public toggleTheme(): void {
    // ZAIMPLEMENTUJ: Sprawdź obecny motyw i zmień na przeciwny
    if (this.currentTheme.name === 'Light') {
      this.applyTheme('dark');
    } else {
      this.applyTheme('light');
    }
  }

  // ZAIMPLEMENTUJ: Getter na obecny motyw
  public getCurrentTheme(): ThemeConfig {
    // ZAIMPLEMENTUJ: Zwróć obecną konfigurację motywu
    return this.currentTheme;
  }

  // ZAIMPLEMENTUJ: Getter na nazwę motywu
  public getThemeName(): string {
    // ZAIMPLEMENTUJ: Zwróć nazwę motywu
    return this.currentTheme.name;
  }

  // ============================================
  // PRYWATNE METODY
  // ============================================

  // ZAIMPLEMENTUJ: Metoda updateUI
  // Aktualizuje CSS i DOM na podstawie motywu
  private updateUI(): void {
    // ZAIMPLEMENTUJ: Pobierz element body
    const body = document.body;

    // ZAIMPLEMENTUJ: Usuń stare klasy motywu
    body.classList.remove('light-theme', 'dark-theme');

    // ZAIMPLEMENTUJ: Dodaj nową klasę motywu
    const themeClass = this.currentTheme.name === 'Light' ? 'light-theme' : 'dark-theme';
    body.classList.add(themeClass);

    // ZAIMPLEMENTUJ: Zaktualizuj wyświetlacz motywu
    const themeDisplay = document.getElementById('currentTheme');
    if (themeDisplay) {
      themeDisplay.textContent = this.currentTheme.name;
    }

    // ZAIMPLEMENTUJ: Zaktualizuj ikonkę toggle'a
    const toggleIcon = document.getElementById('toggleIcon');
    if (toggleIcon) {
      toggleIcon.textContent = this.currentTheme.name === 'Light' ? '🌙' : '☀️';
    }
  }
}

// ============================================
// 4. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ZAIMPLEMENTUJ: Pobierz elementy z DOM
  const themeToggleBtn = document.getElementById('themeToggle') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;
  const instanceCountEl = document.getElementById('instanceCount') as HTMLElement;

  // ZAIMPLEMENTUJ: Pobierz instancję Singleton'a
  const themeManager = ThemeManager.getInstance();

  // ZAIMPLEMENTUJ: Wyświetl liczbę instancji (powinno być zawsze 1)
  if (instanceCountEl) {
    instanceCountEl.textContent = ThemeManager.getInstanceCount().toString();
  }

  // ZAIMPLEMENTUJ: Event listener dla przycisku toggle
  // Przełącza między motywami
  themeToggleBtn.addEventListener('click', () => {
    themeManager.toggleTheme();

    // Wyświetl nową liczbę instancji (powinno być wciąż 1!)
    if (instanceCountEl) {
      instanceCountEl.textContent = ThemeManager.getInstanceCount().toString();
    }
  });

  // ZAIMPLEMENTUJ: Event listener dla przycisku reset
  // Resetuje do motywu domyślnego (jaśniejszego)
  resetBtn.addEventListener('click', () => {
    themeManager.applyTheme('light');

    // Wyświetl liczbę instancji
    if (instanceCountEl) {
      instanceCountEl.textContent = ThemeManager.getInstanceCount().toString();
    }
  });
});
