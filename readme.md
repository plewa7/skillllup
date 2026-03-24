# Design Patterns Frontend Learning Lab 🎓

Nowoczesne środowisko do nauki **Design Patterns** z silnym fokusem na **Frontend**.

Każdy wzorzec jest zaimplementowany jako **mini-aplikacja UI** z **testami Playwright**, które sprawdzają poprawność implementacji.

---

## 🏗️ Struktura Projektu

```
skillllup/
├── patterns/                          # Wzorce projektowe
│   ├── behavioral/                    # Wzorce behawioralne
│   │   ├── observer-web-components/   # Observer Pattern
│   │   ├── strategy-price-calculator/ # Strategy Pattern
│   │   ├── state-traffic-light/       # State Pattern
│   │   └── command-calculator/        # Command Pattern
│   ├── structural/                    # Wzorce strukturalne
│   │   ├── text-formatter-decorator/  # Decorator Pattern
│   │   └── data-converter-adapter/    # Adapter Pattern
│   └── creational/                    # Wzorce kreacyjne
│       ├── factory-shape-generator/   # Factory Pattern
│       ├── singleton-theme-manager/   # Singleton Pattern
│       └── form-builder/              # Builder Pattern
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

## 📚 Wzorce Dostępne

### 1️⃣ **Observer Pattern** - Reaktywność

**📂 Lokalizacja:** `patterns/behavioral/observer-web-components/`

Zaimplementuj system notyfikacji jeden-do-wielu:

- Pole input wysyła powiadomienia
- Dwa komponenty nasłuchują zmian
- Automatyczna aktualizacja DOM

**Testy:** 8 testów Playwright

### 2️⃣ **Strategy Pattern** - Kalkulatory

**📂 Lokalizacja:** `patterns/behavioral/strategy-price-calculator/`

Zaimplementuj enkapsulację algorytmów:

- Kalkulator ceny z 4 strategiami
- Użytkownik wybiera strategię klikając
- Dynamiczne przełączanie bez restartowania

**Testy:** 10 testów Playwright

### 3️⃣ **State Pattern** - Sygnalizacja Świetlna

**📂 Lokalizacja:** `patterns/behavioral/state-traffic-light/`

Zaimplementuj zmianę zachowania w zależności od stanu:

- Sygnalizacja świetlna ze stanami (Red → Yellow → Green)
- Każdy stan ma własną logikę i czas trwania
- Automatyczne przechodzenie między stanami

**Testy:** 8 testów Playwright

### 4️⃣ **Factory Pattern** - Generatory Kształtów

**📂 Lokalizacja:** `patterns/creational/factory-shape-generator/`

Zaimplementuj enkapsulację tworzenia obiektów:

- Fabryka do tworzenia kształtów (Circle, Square, Triangle)
- Dynamiczne liczniki dla każdego typu
- Zarządzanie kolekcją obiektów

**Testy:** 13 testów Playwright

### 5️⃣ **Singleton Pattern** - Menedżer Motywu

**📂 Lokalizacja:** `patterns/creational/singleton-theme-manager/`

Zaimplementuj gwarantowaną jedną instancję klasy:

- Menedżer motywu (Light/Dark) jako Singleton
- Prywatny konstruktor i getInstance()
- Centralne zarządzanie motywem aplikacji
- Gwarantowana spójność stanu globalnego

**Testy:** 12 testów Playwright

### 6️⃣ **Decorator Pattern** - Formatter Tekstu

**📂 Lokalizacja:** `patterns/structural/text-formatter-decorator/`

Zaimplementuj dynamiczne dodawanie funkcjonalności:

- Wielokrotne dekoratory tekstu (Bold, Italic, Underline, itd.)
- Kombinowanie dekoratorów w dowolnej kolejności
- Live preview sformatowanego tekstu
- Elastyczne komponowanie bez zmiany kodu

**Notatka:** Nie zawiera testów Playwright (uproszczona wersja)

### 7️⃣ **Command Pattern** - Kalkulator z Historią

**📂 Lokalizacja:** `patterns/behavioral/command-calculator/`

Zaimplementuj enkapsulację operacji jako obiekty:

- Kalkulator z pełną funkcjonalnością
- Historia wszystkich operacji (Command objects)
- Undo/Redo z dwoma stosami
- Logging każdej komendy

**Notatka:** Nie zawiera testów Playwright (uproszczona wersja)

### 8️⃣ **Adapter Pattern** - Konwerter Danych

**📂 Lokalizacja:** `patterns/structural/data-converter-adapter/`

Zaimplementuj konwersję między formatami danych:

- Adapter dla JSON, XML, CSV formatów
- Znormalizowana reprezentacja danych (DataObject)
- Dynamiczny wybór adaptera na podstawie formatu
- Export między formatami (JSON ↔ XML ↔ CSV)

**Notatka:** Nie zawiera testów Playwright (uproszczona wersja)

### 9️⃣ **Builder Pattern** - Konstruktor Formularzy

**📂 Lokalizacja:** `patterns/creational/form-builder/`

Zaimplementuj fluent interface do budowania formularzy:

- FormBuilder z method chaining (fluent pattern)
- Dodawanie pól: text, email, number, select, checkbox, textarea
- Live preview sformatowanego formularza
- Export FormConfig do JSON
- Step-by-step konstruowanie złożonych obiektów

**Notatka:** Nie zawiera testów Playwright (uproszczona wersja)

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
