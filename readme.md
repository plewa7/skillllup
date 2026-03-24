# Design Patterns Frontend Learning Lab 🎓

Nowoczesne środowisko do nauki **Design Patterns** z silnym fokusem na **Frontend**.

Każdy wzorzec jest zaimplementowany jako **mini-aplikacja UI** z możliwością **testowania Playwright** (dla wybranych wzorców).

Struktura zawiera **23 Design Patterns** podzielonych na:

- **11 Behawioralnych** (Behavioral)
- **7 Strukturalnych** (Structural)
- **5 Kreacyjnych** (Creational)

---

## 🏗️ Struktura Projektu

```
skillllup/
├── patterns/                                # Wzorce projektowe (23 wzorców!)
│   ├── behavioral/                          # Wzorce behawioralne (11)
│   │   ├── observer-web-components/         # Observer Pattern ✅
│   │   ├── strategy-price-calculator/       # Strategy Pattern ✅
│   │   ├── state-traffic-light/             # State Pattern ✅
│   │   ├── command-calculator/              # Command Pattern ✅
│   │   ├── chain-of-responsibility-logger/  # Chain of Responsibility
│   │   ├── interpreter-expression/          # Interpreter
│   │   ├── iterator-gallery/                # Iterator
│   │   ├── mediator-chat/                   # Mediator
│   │   ├── memento-text-editor/             # Memento
│   │   ├── template-method-report/          # Template Method
│   │   └── visitor-shape-analyzer/          # Visitor
│   ├── structural/                          # Wzorce strukturalne (7)
│   │   ├── text-formatter-decorator/        # Decorator Pattern ✅
│   │   ├── data-converter-adapter/          # Adapter Pattern ✅
│   │   ├── bridge-device-driver/            # Bridge
│   │   ├── composite-organization/          # Composite
│   │   ├── facade-smart-home/               # Facade
│   │   ├── flyweight-particle/              # Flyweight
│   │   └── proxy-lazy-image/                # Proxy
│   └── creational/                          # Wzorce kreacyjne (5)
│       ├── factory-shape-generator/         # Factory Pattern ✅
│       ├── singleton-theme-manager/         # Singleton Pattern ✅
│       ├── form-builder/                    # Builder Pattern ✅
│       ├── abstract-factory-ui/             # Abstract Factory
│       └── prototype-clone/                 # Prototype
├── src/                                     # Kod wspólny (utilities, helpers)
├── tests/                                   # Konfiguracja testów
├── package.json                             # Skrypty i zależności
├── vite.config.ts                           # Konfiguracja Vite
├── playwright.config.ts                     # Konfiguracja Playwright
└── tsconfig.json                            # Konfiguracja TypeScript
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

## 📚 Wzorce Dostępne (23 wzorców)

### ✅ ZAIMPLEMENTOWANE (9)

#### 1️⃣ **Observer Pattern** - Reaktywność

**📂 Lokalizacja:** `patterns/behavioral/observer-web-components/`

- Pole input wysyła powiadomienia
- Dwa komponenty nasłuchują zmian
- Automatyczna aktualizacja DOM
- **Testy:** 8 testów Playwright ✅

#### 2️⃣ **Strategy Pattern** - Kalkulatory

**📂 Lokalizacja:** `patterns/behavioral/strategy-price-calculator/`

- Kalkulator ceny z 4 strategiami
- Użytkownik wybiera strategię klikając
- Dynamiczne przełączanie bez restartowania
- **Testy:** 10 testów Playwright ✅

#### 3️⃣ **State Pattern** - Sygnalizacja Świetlna

**📂 Lokalizacja:** `patterns/behavioral/state-traffic-light/`

- Sygnalizacja świetlna ze stanami (Red → Yellow → Green)
- Każdy stan ma własną logikę i czas trwania
- Automatyczne przechodzenie między stanami
- **Testy:** 8 testów Playwright ✅

#### 4️⃣ **Factory Pattern** - Generatory Kształtów

**📂 Lokalizacja:** `patterns/creational/factory-shape-generator/`

- Fabryka do tworzenia kształtów (Circle, Square, Triangle)
- Dynamiczne liczniki dla każdego typu
- Zarządzanie kolekcją obiektów
- **Testy:** 13 testów Playwright ✅

#### 5️⃣ **Singleton Pattern** - Menedżer Motywu

**📂 Lokalizacja:** `patterns/creational/singleton-theme-manager/`

- Menedżer motywu (Light/Dark) jako Singleton
- Prywatny konstruktor i getInstance()
- Centralne zarządzanie motywem aplikacji
- Gwarantowana spójność stanu globalnego
- **Testy:** 12 testów Playwright ✅

#### 6️⃣ **Decorator Pattern** - Formatter Tekstu

**📂 Lokalizacja:** `patterns/structural/text-formatter-decorator/`

- Wielokrotne dekoratory tekstu (Bold, Italic, Underline, itd.)
- Kombinowanie dekoratorów w dowolnej kolejności
- Live preview sformatowanego tekstu
- Elastyczne komponowanie bez zmiany kodu

#### 7️⃣ **Command Pattern** - Kalkulator z Historią

**📂 Lokalizacja:** `patterns/behavioral/command-calculator/`

- Kalkulator z pełną funkcjonalnością
- Historia wszystkich operacji (Command objects)
- Undo/Redo z dwoma stosami
- Logging każdej komendy

#### 8️⃣ **Adapter Pattern** - Konwerter Danych

**📂 Lokalizacja:** `patterns/structural/data-converter-adapter/`

- Adapter dla JSON, XML, CSV formatów
- Znormalizowana reprezentacja danych (DataObject)
- Dynamiczny wybór adaptera na podstawie formatu
- Export między formatami (JSON ↔ XML ↔ CSV)

#### 9️⃣ **Builder Pattern** - Konstruktor Formularzy

**📂 Lokalizacja:** `patterns/creational/form-builder/`

- FormBuilder z method chaining (fluent pattern)
- Dodawanie pól: text, email, number, select, checkbox, textarea
- Live preview sformatowanego formularza
- Export FormConfig do JSON
- Step-by-step konstruowanie złożonych obiektów

---

### 🟡 W REALIZACJI - Teoria Gotowa (14)

#### 10️⃣ **Chain of Responsibility** - Logger

**📂 Lokalizacja:** `patterns/behavioral/chain-of-responsibility-logger/`

System logowania z wieloma poziomami (INFO, DEBUG, WARNING, ERROR, CRITICAL). Łańcuch handler'ów przekazujących żądania, gdzie każdy handler obsługuje swój typ wiadomości.

#### 1️⃣1️⃣ **Interpreter** - Wyrażenia Matematyczne

**📂 Lokalizacja:** `patterns/behavioral/interpreter-expression/`

Parser i interpreter wyrażeń matematycznych. Abstrakcyjne drzewo składni (AST) z obsługą operatorów: +, -, \*, /.

#### 1️⃣2️⃣ **Iterator** - Galeria Obrazów

**📂 Lokalizacja:** `patterns/behavioral/iterator-gallery/`

Kolekcja obrazów z dostępem sekwencyjnym. Iterator do przechodzenia w przód i tył, ukrywający wewnętrzną strukturę.

#### 1️⃣3️⃣ **Mediator** - System Czatu

**📂 Lokalizacja:** `patterns/behavioral/mediator-chat/`

Czat z wieloma użytkownikami. Mediator koordynuje komunikację i zapewnia loose coupling między użytkownikami.

#### 1️⃣4️⃣ **Memento** - Edytor Tekstu

**📂 Lokalizacja:** `patterns/behavioral/memento-text-editor/`

Edytor z historią zmian. Snapshoty stanu bez naruszania enkapsulacji. Undo/Redo przechowywania mementos.

#### 1️⃣5️⃣ **Template Method** - Generator Raportów

**📂 Lokalizacja:** `patterns/behavioral/template-method-report/`

Generowanie raportów w HTML, PDF, CSV. Szkielet algorytmu w klasie bazowej, implementacja szczegółów w podklasach.

#### 1️⃣6️⃣ **Visitor** - Shape Analyzer

**📂 Lokalizacja:** `patterns/behavioral/visitor-shape-analyzer/`

Analiza kształtów (Circle, Rectangle, Triangle). Operacje: calculateArea, calculatePerimeter, exportJSON. Visitor pattern dla rozszerzalności.

#### 1️⃣7️⃣ **Bridge** - Device Driver

**📂 Lokalizacja:** `patterns/structural/bridge-device-driver/`

Pilot zdalny i urządzenia (TV, Radio, Lights). Oddzielenie abstrakacji od implementacji.

#### 1️⃣8️⃣ **Composite** - Organizacja Firmy

**📂 Lokalizacja:** `patterns/structural/composite-organization/`

Struktura hierarchiczna Departamentów i Pracowników. Obsługa agregowania wynagrodzeń. Drzewo z liśćmi i węzłami.

#### 1️⃣9️⃣ **Facade** - Smart Home

**📂 Lokalizacja:** `patterns/structural/facade-smart-home/`

System inteligentnego domu (Lights, Security, Thermostat, Entertainment). Uproszczony interfejs dla złożonych podsystemów. Sceny: leaveHome, comeHome, sleepMode.

#### 2️⃣0️⃣ **Flyweight** - Particle System

**📂 Lokalizacja:** `patterns/structural/flyweight-particle/`

System cząstek (1,000,000+ cząsteczek). Dzielenie danych wewnętrznych między cząstkami. Drastyczne zmniejszenie użycia pamięci.

#### 2️⃣1️⃣ **Proxy** - Lazy Loading Obrazu

**📂 Lokalizacja:** `patterns/structural/proxy-lazy-image/`

Galeria obrazów z lazy loadingiem. Proxy wygląda jak RealImage bez latency. Ładowanie na żądanie zamiast na starcie.

#### 2️⃣2️⃣ **Abstract Factory** - UI Themes

**📂 Lokalizacja:** `patterns/creational/abstract-factory-ui/`

Factory dla całych famili UI komponentów. Light Theme i Dark Theme. Komponenty: Button, Input, Label.

#### 2️⃣3️⃣ **Prototype** - Clone Obiektu

**📂 Lokalizacja:** `patterns/creational/prototype-clone/`

Klonowanie obiektów zamiast tworzenia od zera. Shallow copy i deep copy strategie. PrototypeRegistry dla zarządzania prototypami.

---

## 📦 Technologie

- **Vanilla TypeScript** - Czysty kod bez framework'ów
- **Vite** - Szybki development server
- **Playwright** - E2E testy interakcji DOM
- **HTML/CSS** - Styling i layout

---

## 🎓 Nauka Krok po Kroku

Dla wzorców z GUIDE.md:

1. 📖 Przeczytaj GUIDE.md - pełna teoria i wyjaśnienie wzorca
2. 🚀 `npm run dev` - wizualizuj interfejs
3. 💻 Edytuj solution.ts - zaimplementuj wzorzec
4. ✅ `npm run test` - sprawdzaj czy testy przechodzą (dla wybranych)
5. 🔄 Powtarzaj kroki 3-4 aż będą gotowe

Happy Learning! 🚀
