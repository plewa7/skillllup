# 🔗 Chain of Responsibility - Logger

## Wzorzec Chain of Responsibility

Wzorzec Chain of Responsibility należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Pozwala na przekazywanie żądań wzdłuż łańcucha handler'ów, gdzie każdy handler decyduje, czy obsługi żądanie, czy przekaże je dalej.

## Diagram Wzorca

```
┌──────────────┐
│  Client      │
└──────┬───────┘
       │ requests handler
       ▼
┌────────────────────┐
│ Handler 1 (INFO)   │ Can handle?
└────────┬───────────┘ YES → Process
         │ NO
         ▼
┌────────────────────┐
│ Handler 2 (DEBUG)  │ Can handle?
└────────┬───────────┘ YES → Process
         │ NO
         ▼
┌────────────────────┐
│ Handler 3 (ERROR)  │ Can handle?
└────────┬───────────┘ YES → Process
         │ NO
         ▼
┌────────────────────┐
│ Handler 4 (END)    │ Default handler
└────────────────────┘
```

## Scenario: System Logowania

Wyobraź sobie aplikację, która loguje wiadomości o różnych poziomach:

- `INFO` - ogólne informacje
- `DEBUG` - szczegóły debugowania
- `WARNING` - ostrzeżenia
- `ERROR` - błędy
- `CRITICAL` - krytyczne problemy

**Problemy bez Chain of Responsibility:**

```typescript
// Koszmar! 😱
function logMessage(level: string, message: string) {
  if (level === 'INFO') {
    console.log('[INFO]', message);
  } else if (level === 'DEBUG') {
    console.debug('[DEBUG]', message);
  } else if (level === 'ERROR') {
    console.error('[ERROR]', message);
  }
  // ... więcej warunków!
}
```

**Rozwiązanie z Chain of Responsibility:**

```typescript
// Eleganckie! ✨
const logger = infoHandler
  .setNext(debugHandler)
  .setNext(warningHandler)
  .setNext(errorHandler)
  .setNext(criticalHandler);

logger.handle(new LogRequest('INFO', 'User logged in'));
logger.handle(new LogRequest('ERROR', 'Database connection failed'));
```

## Komponenty

### 1. **Handler Interface**

Definiuje kontrakt dla wszystkich handler'ów:

```typescript
interface Handler {
  setNext(handler: Handler): Handler; // Ustaw następny handler
  handle(request: Request): void; // Obsługi żądanie
}
```

### 2. **Request Interface**

Zawiera dane żądania:

```typescript
interface LogRequest {
  level: string; // INFO, DEBUG, WARNING, ERROR, CRITICAL
  message: string;
  timestamp?: Date;
}
```

### 3. **Konkretnymi Handlery**

Każdy handler odpowiada za konkretny poziom logowania:

- **InfoHandler**: Obsługuje INFO
- **DebugHandler**: Obsługuje DEBUG
- **WarningHandler**: Obsługuje WARNING
- **ErrorHandler**: Obsługuje ERROR
- **CriticalHandler**: Obsługuje CRITICAL

### 4. **Logger Manager**

Łańcuch handler'ów:

```typescript
class LoggerChain {
  private chain: Handler;

  constructor() {
    this.chain = this.buildChain();
  }

  private buildChain(): Handler {
    const info = new InfoHandler();
    const debug = new DebugHandler();
    const warning = new WarningHandler();
    const error = new ErrorHandler();
    const critical = new CriticalHandler();

    info.setNext(debug).setNext(warning).setNext(error).setNext(critical);
    return info;
  }

  log(level: string, message: string): void {
    this.chain.handle({ level, message });
  }
}
```

## Co Implementujesz

### Krok 1: Handler Interface

```typescript
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: LogRequest): void;
}
```

📋 **Dlaczego?** Definiuje kontrakt dla łańcucha

### Krok 2: Konkretnymi Handlery

```typescript
abstract class BaseHandler implements Handler {
  protected nextHandler: Handler | null = null;
  protected level: string;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: LogRequest): void {
    if (this.canHandle(request)) {
      this.process(request);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  protected abstract canHandle(request: LogRequest): boolean;
  protected abstract process(request: LogRequest): void;
}

class InfoHandler extends BaseHandler {
  protected level = 'INFO';
  protected canHandle(request: LogRequest): boolean {
    return request.level === 'INFO';
  }
  protected process(request: LogRequest): void {
    console.log(`[INFO] ${request.message}`);
  }
}
```

⛓️ **Dlaczego?** Każdy handler wie jak obsługi swój typ

### Krok 3: Chain Building

```typescript
const infoHandler = new InfoHandler();
const debugHandler = new DebugHandler();
const errorHandler = new ErrorHandler();

// Zbuduj łańcuch
infoHandler.setNext(debugHandler).setNext(errorHandler);

// Użyj
infoHandler.handle({ level: 'DEBUG', message: 'Start' });
```

🔗 **Dlaczego?** Żądanie przechodzi wzdłuż łańcucha

### Krok 4: Aplikacja

```typescript
const logger = new LoggerChain();
logger.log('INFO', 'User logged in');
logger.log('ERROR', 'Connection failed');
logger.log('DEBUG', 'Debug info');
```

🎯 **Dlaczego?** Aplikacja nie zna detali handler'ów

## Praktyczne Zastosowania

1. **Systemy Logowania** - INFO, DEBUG, ERROR, CRITICAL
2. **Event Handling** - Przeglądarki (event bubbling)
3. **Middleware** - Express.js request processing
4. **Workflow Approval** - Manager → Director → CEO
5. **Support Tickets** - Level 1 → Level 2 → Manager
6. **Command Processing** - GUI commands, undo/redo
7. **Exception Handling** - Try/catch chains

## Dlaczego Chain of Responsibility?

### ✅ Zalety

- **Elastyczność**: Łatwe dodawanie nowych handler'ów
- **Loose Coupling**: Klient nie zna handler'ów
- **Separation**: Każdy handler odpowiada za jedną rzecz
- **Runtime Configuration**: Łańcuch budowany w runtime'ie
- **Single Responsibility**: Jedno zadania na handler

### ⚠️ Wady

- **Niewykonanie**: Żądanie może nie pasować żadnemu handler'owi
- **Performance**: Może przejść przez wiele handler'ów
- **Debugowanie**: Trudno śledzić która handler obsługuje żądanie

## Porównanie: Bez Chain vs Z Chain

### ❌ Bez Chain (Koszmar Code)

```typescript
function handleLog(level: string, message: string) {
  if (level === 'INFO') {
    // ... log info
  } else if (level === 'DEBUG') {
    // ... log debug
  } else if (level === 'WARNING') {
    // ... log warning
  } else if (level === 'ERROR') {
    // ... log error
  } else if (level === 'CRITICAL') {
    // ... log critical
  }
  // Problem: if/else hell!
}
```

### ✅ Z Chain (Czysty)

```typescript
const chain = infoHandler
  .setNext(debugHandler)
  .setNext(warningHandler)
  .setNext(errorHandler)
  .setNext(criticalHandler);

chain.handle({ level: 'ERROR', message: 'Something failed' });
// Handler będzie znaleziony w łańcuchu
```

## Jak Uruchomić

```bash
npm install
npm run dev

# Przejdź do: http://localhost:5173/patterns/behavioral/chain-of-responsibility-logger/
```

## Wzorzec w Praktyce

1. ➡️ Wpisz wiadomość
2. ➡️ Wybierz poziom logowania (INFO, DEBUG, WARNING, ERROR, CRITICAL)
3. ➡️ Kliknij "Log"
4. ➡️ Obserwuj przekazywanie żądania wzdłuż łańcucha
5. ➡️ Historia pokazuje które handler obsługi wiadomość

## Wniosek

Wzorzec Chain of Responsibility to eleganckie rozwiązanie dla:

- 🔗 Łańcuchów przetwarzających żądania
- 🎯 Systemów gdziehandler jest znany w runtime'ie
- 📝 Systemów logowania o wiele poziomach
- 🔀 Middleware'u i przetwarzania event'ów

Pozwala **oddzielić przetwarzanie od struktury łańcucha**.

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)
- [MDN - Event Bubbling](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase)
- [Design Patterns by Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns)
