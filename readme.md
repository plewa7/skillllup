# Design Patterns Frontend Learning Lab 🎓

Nowoczesne środowisko do nauki **Design Patterns** z silnym fokusem na **Frontend**.

Każdy wzorzec jest zaimplementowany jako **mini-aplikacja UI** z **testami Playwright**, które sprawdzają poprawność implementacji.

---

## 🏗️ Struktura Projektu

```
skillllup/
├── patterns/                          # Wzorce projektowe
│   ├── behavioral/                    # Wzorce behawioralne
│   │   └── observer-web-components/   # Observer Pattern
│   │       ├── index.html             # UI do wizualizacji wzorca
│   │       ├── solution.ts            # Miejsce na Twoją implementację
│   │       └── pattern.spec.ts        # Testy Playwright
│   └── (więcej kategorii i wzorców)
├── src/                               # Kod wspólny (utilities, helpers)
├── tests/                             # Konfiguracja testów
├── package.json                       # Skrypty i zależności
├── vite.config.ts                     # Konfiguracja Vite
├── playwright.config.ts               # Konfiguracja Playwright
└── tsconfig.json                      # Konfiguracja TypeScript
```

---

## 🚀 Quick Start

### 1. Instalacja Zależności

```bash
npm install
```

### 2. Uruchomienie Development Server'a

```bash
npm run dev
```

Server uruchomi się na `http://localhost:5173`

### 3. Uruchomienie Testów

```bash
npm run test
```

Testy będą **padały** (RED 🔴) dopóki nie zaimplementujesz wzorca.

#### Opcje uruchomienia testów:

```bash
npm run test              # Uruchom wszystkie testy
npm run test:ui          # Interaktywny UI Playwright
npm run test:debug       # Debug mode z krokowaniem
```

---

## 📚 Pierwszy Wzorzec: Observer Pattern

### 🎯 Zadanie

Zaimplementuj **Observer Pattern** z reaktywnością:

- **Pole input** jest `Observable` (źródłem danych)
- **Dwa komponenty** są `Observers` (nasłuchują zmian)
- Kiedy wpiszesz tekst → obserwatorzy się **automatycznie aktualizują**

### 📂 Lokalizacja

```
patterns/behavioral/observer-web-components/
├── index.html          ← Otwórz w przeglądarce
├── solution.ts         ← TU IMPLEMENTUJESZ WZORZEC
└── pattern.spec.ts     ← Testy Playwright
```

### 📝 Co Musisz Zrobić

Otwórz solution.ts i zaimplementuj:

1. **Klasa InputObservable**
   - Prywatne pole: lista obserwatorów
   - Metoda subscribe() - dodaj obserwatora do listy
   - Metoda unsubscribe() - usuń obserwatora z listy
   - Metoda notifyObservers() - powiadom wszystkich obserwatorów o zmianie
   - W konstruktorze: nasłuchuj 'input' event na inputElement

2. **Klasy ObserverComponent1 i ObserverComponent2**
   - Implementuj interfejs Observer
   - Metoda update(data: string) -> zaktualizuj element.textContent

3. **Inicjalizacja w DOMContentLoaded**
   - Stwórz instancję InputObservable
   - Stwórz instancje komponentów
   - Zarejestruj obserwatorów via subscribe()

### ✅ Jak Sprawdzić

```bash
npm run test
```

Powinno być 8 testów - wszystkie będą failować do czasu implementacji.

---

## 📦 Technologie

- **Vanilla TypeScript** - Czysty kod bez framework'ów
- **Vite** - Szybki development server
- **Playwright** - E2E testy interakcji DOM
- **HTML/CSS** - Styling i layout

---

## 🎓 Nauka Krok po Kroku

1. Czytaj solution.ts - instrukcje są tam
2. npm run dev - wizualizuj interfejs
3. Czytaj pattern.spec.ts - testy pokazują co się spodziewasz
4. Zaimplementuj wzorzec w solution.ts
5. npm run test - sprawdzaj czy testy przechodzą
6. Powtarzaj kroki 4-5 aż testy będą ✅ GREEN

Happy Learning! 🚀
