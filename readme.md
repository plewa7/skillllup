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
