# 🎨 Singleton - Menedżer Motywu

## Wzorzec Singleton

Wzorzec Singleton należy do grupy wzorców **kreacyjnych** (Creational Patterns). Gwarantuje, że klasa ma dokładnie _jedną_ instancję w całej aplikacji i zapewnia globalny punkt dostępu do tej instancji.

## Diagram Wzorca

```
┌─────────────────────────────────────────┐
│       CLIENT CODE                       │
└────────────────┬────────────────────────┘
                 │
                 │ getInstance()
                 ▼
        ┌────────────────────┐
        │  ThemeManager      │
        ├────────────────────┤
        │ - instance: static │◄──── Only one!
        ├────────────────────┤
        │ - constructor()    │ (private)
        │ + getInstance()    │ (static)
        │ + applyTheme()     │
        │ + toggleTheme()    │
        └────────────────────┘
                 ▲
                 │
         Singleton instance
         returned every time
```

## Scenario: Zarządzanie Motywem Aplikacji

Wyobraź sobie aplikację, która powinna mieć jeden, **globalnie dostępny menedżer motywu** (Light/Dark). Wszystkie komponenty w aplikacji powinny:

1. Korzystać z **jednej, tej samej instancji** menedżera
2. Zmienić motyw natychmiast dla całej aplikacji
3. Być pewne, że stan motywu jest zawsze spójny

Bez Singletona moglibyśmy mieć wiele instancji menedżera, co mogłoby prowadzić do niedopatrywania i niespójności. Singleton gwarantuje, że istnieje **dokładnie jedna instancja**.

## Komponenty

### 1. **ThemeConfig Interface**

Definiuje strukturę konfiguracji motywu:

- `name`: nazwa motywu (Light/Dark)
- `backgroundColor`: kolor tła
- `textColor`: kolor tekstu
- `primaryColor`: kolor podstawowy
- `secondaryColor`: kolor dodatkowy

### 2. **ThemeManager - Singleton Class**

Główna klasa implementująca wzorzec:

- `private constructor()`: Uniemożliwia tworzenie instancji poprzez `new`
- `private static instance`: Przechowuje jedyną instancję
- `getInstance()`: Publiczna metoda statyczna zwracająca jedyną instancję
- `applyTheme()`: Zmienia motyw aplikacji
- `toggleTheme()`: Przełącza między motywami

### 3. **LIGHT_THEME i DARK_THEME**

Konfiguracje dwóch dostępnych motywów

### 4. **DOM Elements**

- `themeToggle`: Przycisk do przełączania motywów
- `resetBtn`: Przycisk do resetu do domyślnego motywu
- `currentTheme`: Wyświetlacz obecnego motywu
- `instanceCount`: Wyświetlacz liczby instancji (dla weryfikacji Singletona)

## Co Implementujesz

Poniżej kroki implementacji wzorca:

### Krok 1: Prywatny Konstruktor

```typescript
private constructor() {
  this.currentTheme = LIGHT_THEME;
}
```

🔒 **Dlaczego?** Uniemożliwia komuś utworzenie nowej instancji poprzez `new ThemeManager()`

### Krok 2: Statyczna Instancja i getInstance()

```typescript
private static instance: ThemeManager | null = null;

public static getInstance(): ThemeManager {
  if (ThemeManager.instance === null) {
    ThemeManager.instance = new ThemeManager();
  }
  return ThemeManager.instance;
}
```

⚡ **Dlaczego?** Gwarantuje, że niezależnie ile razy jest wywoływane, zawsze zwraca tę samą instancję

### Krok 3: Konfiguracje Motywów

```typescript
const LIGHT_THEME: ThemeConfig = {
  name: 'Light',
  backgroundColor: 'linear-gradient(...)',
  textColor: '#333',
  // ...
};
```

🎨 **Dlaczego?** W jednym miejscu można zdefiniować wszystkie motywy

### Krok 4: Metoda applyTheme()

```typescript
public applyTheme(themeName: string): void {
  this.currentTheme = themeName === 'dark' ? DARK_THEME : LIGHT_THEME;
  this.updateUI();
}
```

🎯 **Dlaczego?** Zmienia motyw i aktualizuje interfejs użytkownika

### Krok 5: Event Listenery w DOMContentLoaded

```typescript
const themeManager = ThemeManager.getInstance();

toggleBtn.addEventListener('click', () => {
  themeManager.toggleTheme();
});
```

👂 **Dlaczego?** Połącza UI z logiką Singletona

## Liczba Testów

Całkowicie **12 testów** pokrywających:

1. ✅ Inicjalizacja z domyślnym motywem
2. ✅ Zmiana motywu z jasnego na ciemny
3. ✅ Zmiana motywu z ciemnego na jasny
4. ✅ Sprawdzenie liczby instancji (powinno być 1)
5. ✅ Liczba instancji po wielu przełączeniach
6. ✅ Reset do domyślnego motywu
7. ✅ Zmiana ikony w przyciku toggle
8. ✅ Prawidłowe dodawanie klas CSS
9. ✅ Obsługa szybkiego klikania
10. ✅ Reset po zmianach
11. ✅ Liczba instancji po reset
12. ✅ Widoczność wszystkich elementów UI

## Dlaczego Singleton?

### ✅ Zalety

- **Jeden punkt dostępu**: Cała aplikacja korzysta z jednego menedżera
- **Kontrol instancji**: Pewność, że istnieje dokładnie jedna instancja
- **Bezpieczeństwo**: Private constructor uniemożliwia tworzenie wielu instancji
- **Wydajność**: Brak duplikowania stanu między instancjami

### ⚠️ Wady

- **Trudny do testowania**: Singleton trzyma stan między testami
- **Ukryty związek**: Klient musi wiedzieć o Singletonie
- **Możliwe problemy z wielowątkowością** (w JavaScript mniej istotne)

## Praktyczne Zastosowania

1. **Menedżer Motywu** (jak w tym przykładzie)
2. **Konfiguracja aplikacji** - jeden punkt dostępu do ustawień
3. **Logger** - jeden logger dla całej aplikacji
4. **Połączenie z bazą danych** - jedna instancja połączenia
5. **Manager Zasobów** - centralne zarządzanie zasobami

## Jak Uruchomić

```bash
# Zainstaluj zależności
npm install

# Uruchom dev server
npm run dev

# Nawiguj do: http://localhost:5173/patterns/creational/singleton-theme-manager/

# Uruchom testy
npm run test
```

## Wzorzec w Praktyce

Wykonaj poniższe kroki, aby zobaczyć Singleton w akcji:

1. ➡️ Otwórz stronę - zobaczysz domyślny motyw _Light_
2. ➡️ Kliknij przycisk "Przełącz motyw" - motyw zmieni się na _Dark_
3. ➡️ Zwróć uwagę na licznik instancji - **zawsze pokazuje 1**
4. ➡️ Kliknij Reset - motyw powróci do _Light_
5. ➡️ Licznik instancji dalej pokazuje **1** - bo cały czas używamy tej samej instancji!

## Wniosek

Wzorzec Singleton gwarantuje kontrolę nad instancją klasy. W przypadku menedżera motywu, mamy pewność, że:

- 🔒 Istnieje dokładnie jedna instancja
- 🌍 Jest globalnie dostępna
- ⚡ Stan motywu jest zawsze spójny
- 🎯 Każdy komponent zamiany motywu będzie wyglądał identycznie

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Singleton](https://refactoring.guru/design-patterns/singleton)
- [MDN - Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [TS Documentation - Static Members](https://www.typescriptlang.org/docs/handbook/2/classes.html#static-members)
