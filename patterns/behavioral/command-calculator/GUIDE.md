# 📜 Command - Kalkulator z Historią

## Wzorzec Command

Wzorzec Command należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Enkapsuluje żądanie jako obiekt, pozwalając na:

- Parametryzowanie klientów z różnymi żądaniami
- Kolejkowanie żądań
- Rejestrowanie żądań
- **Undo/Redo** - główne zastosowanie

## Diagram Wzorca

```
┌──────────────┐
│   Client     │
└──────┬───────┘
       │ (sends command)
       ▼
┌──────────────────┐
│   Command        │ (interface)
└──────┬───────────┘
       │ implements
       │
   ┌───┴──────────────────┐
   │                      │
   ▼                      ▼
┌────────────┐      ┌──────────────┐
│AddCommand  │      │CommandHistory│
└────────────┘      └──────────────┘
   ▲                    ▲
   │            ┌───────┘
   │            ▼
┌──┴────────────────────┐
│ (Execute, Undo, Redo) │
└───────────────────────┘
```

## Scenario: Kalkulator z Undo/Redo

Wyobraź sobie kalkulator, gdzie użytkownik chce:

1. Wykonać operacje: `5 + 3 = 8`
2. Cofnąć i spróbować innego: Undo → `5`
3. Zrobić inną operację: `5 × 2 = 10`
4. Wrócić do poprzedniej: Redo

**Problemy bez Command:**

- Każda operacja bezpośrednio modyfikuje kalkulator - trudno cofać
- Nie ma historii operacji
- Undo/Redo wymagają przechowywania stanu (zły wzorzec)

**Rozwiązanie z Command:**

- Każda operacja to obiekt `Command`
- Command przechowuje oryginalny stan i wie jak się cofnąć
- Historia przechowuje obiekty Command, nie stany
- Undo/Redo to po prostu pop/push z stosów

## Komponenty

### 1. **Command Interface**

Definiuje kontrakt dla wszystkich komend:

```typescript
interface Command {
  execute(): void; // Wykonaj operację
  undo(): void; // Cofnij operację
  getDescription(): string; // Opis dla historii
}
```

### 2. **Calculator - Executor**

Przechowuje logikę obliczeń:

- `getResult()`: Zwróć wynik
- `add(value)`: Dodawanie
- `subtract(value)`: Odejmowanie
- `multiply(value)`: Mnożenie
- `divide(value)`: Dzielenie
- `reset()`: Reset

### 3. **Konkretne Command'y**

Każda operacja jako klasa:

- **AddCommand**: Wykonuje dodawanie, wie jak cofnąć
- **SubtractCommand**: Wykonuje odejmowanie, wie jak cofnąć
- **MultiplyCommand**: Wykonuje mnożenie, wie jak cofnąć
- **DivideCommand**: Wykonuje dzielenie, wie jak cofnąć
- **ClearCommand**: Resetuje kalkulator, wie jak cofnąć

### 4. **CommandHistory - Manager**

Zarządza historią i Undo/Redo:

- `executeCommand()`: Wykonaj komendę i dodaj do historii
- `undo()`: Cofnij ostatnią komendę
- `redo()`: Powtórz ostatnio cofniętą komendę
- `getHistory()`: Zwróć listę komend dla wyświetlenia

### 5. **UI Layer**

- Przyciski liczb i operatorów
- Przycisk Equals - tworzy i wykonuje Command
- Przyciski Undo/Redo
- Historia pokazuje wszystkie Commands

## Co Implementujesz

### Krok 1: Command Interface

```typescript
interface Command {
  execute(): void;
  undo(): void;
  getDescription(): string;
}
```

📋 **Dlaczego?** Standaryzuje wszystkie komendy

### Krok 2: Calculator z State Management

```typescript
class Calculator {
  private result: number = 0;
  add(value: number): number {
    return this.result + value;
  }
  // ... inne operacje
}
```

🧮 **Dlaczego?** Enkapsuluje logikę obliczeniową

### Krok 3: Konkretne Command'y

```typescript
class AddCommand implements Command {
  private originalValue: number;

  execute(): void {
    this.calculator.setResult(this.calculator.add(this.valueToAdd));
  }

  undo(): void {
    this.calculator.setResult(this.originalValue);
  }
}
```

⚙️ **Dlaczego?** Każda operacja zna jak się cofnąć

### Krok 4: CommandHistory - Stoki Undo/Redo

```typescript
class CommandHistory {
  private history: Command[] = []; // Wykonane komendy
  private undoStack: Command[] = []; // Cofnięte komendy

  executeCommand(cmd): void {
    cmd.execute();
    this.history.push(cmd);
    this.undoStack = []; // Wyczyść Redo
  }

  undo(): void {
    const cmd = this.history.pop();
    cmd?.undo();
    this.undoStack.push(cmd);
  }
}
```

🔄 **Dlaczego?** Zarządza historią z dwoma stosami

### Krok 5: Event Listenery

```typescript
equalsBtn.addEventListener('click', () => {
  const command = new AddCommand(calculator, currentValue);
  commandHistory.executeCommand(command);
});

undoBtn.addEventListener('click', () => {
  commandHistory.undo();
});
```

👂 **Dlaczego?** Tworzy komendy i zarządza historią

## Jak to Działa - Przykład

```
KROK 1: Użytkownik wkłada 5
  Display: 5

KROK 2: Użytkownik klika +
  Pending value: 5, Operator: +
  Display: 5

KROK 3: Użytkownik wkłada 3
  Display: 3

KROK 4: Użytkownik klika =
  ✓ CreateCommand: AddCommand(5, 3)
  ✓ executeCommand(AddCommand)
    - Calculator.setResult(5)
    - AddCommand.execute() → Result = 8
    - History.push(AddCommand)
  Display: 8
  History: [AddCommand: 5 + 3 = 8]

KROK 5: Użytkownik klika Undo
  ✓ CommandHistory.undo()
    - AddCommand.undo() → Result = 5
    - History.pop() → History: []
    - UndoStack.push(AddCommand)
  Display: 5
  Undo History: [AddCommand]

KROK 6: Użytkownik klika Redo
  ✓ CommandHistory.redo()
    - AddCommand.execute() → Result = 8
    - History.push(AddCommand)
    - UndoStack.pop()
  Display: 8
  History: [AddCommand: 5 + 3 = 8]
```

## Praktyczne Zastosowania

1. **Rich Text Editors** - Bold, Italic, Underline (z Undo/Redo)
2. **Graphic Design Tools** - Draw, Move, Resize (z Undo/Redo)
3. **Game Engines** - Player actions (Move, Jump, Attack)
4. **Transaction Systems** - Banking operations (Debit, Credit)
5. **Macro Systems** - Recording sequences of commands
6. **Job Scheduling** - Queue operations for later execution
7. **Networking** - Queue requests when offline, execute when online

## Dlaczego Command?

### ✅ Zalety

- **Undo/Redo**: Naturalne, każda komenda zna jak się cofnąć
- **Historia**: Rejestruj wszystkie operacje
- **Parametryzacja**: Klienci nie znają szczegółów operacji
- **Kolejkowanie**: Operacje mogą być planowane
- **Transakcje**: Grupy operacji (Execute All lub Rollback All)
- **Loose Coupling**: Klienci nie zależy od detali implementacji

### ⚠️ Wady

- **Więcej klas**: Każda operacja = nowa klasa
- **Pamięć**: Historia przechowuje wszystkie komendy
- **Kompleksowość**: Overkill dla prostych operacji

## Porównanie: Prosty Undo vs Command Pattern

### ❌ Zły Sposób (Snapshot State)

```typescript
// Przechowuj całe stany!
const stateHistory = [
  { result: 0, display: '0' },
  { result: 5, display: '5' },
  { result: 8, display: '8' },
];
// Problem: Dużo pamięci, trudne do debugowania
```

### ✅ Dobry Sposób (Command Pattern)

```typescript
// Przechowuj tylko komendy!
const commandHistory = [new InputCommand('5'), new AddCommand(5, 3)];
// Zaleta: Mała pamięć, naturalny Undo/Redo
```

## Jak Uruchomić

```bash
npm install
npm run dev

# Przejdź do: http://localhost:5173/patterns/behavioral/command-calculator/
```

## Wzorzec w Praktyce

1. ➡️ Wpisz liczby: `5 + 3`
2. ➡️ Kliknij `=` - zobaczysz wynik `8`
3. ➡️ Historia pokazuje: `5 + 3 = 8`
4. ➡️ Kliknij `Undo` - wróć do `5`
5. ➡️ Wpisz nową operację: `5 × 2`
6. ➡️ Kliknij `=` - zobaczysz `10`
7. ➡️ Historia teraz pokazuje tylko nową operację
8. ➡️ Kliknij `Redo` - ale będzie niedostępny (bo wykonaliśmy nową operację)

## Wniosek

Wzorzec Command to eleganckie rozwiązanie dla:

- 📝 Rejestrowania operacji
- ↩️ Undo/Redo mechanizmów
- 📋 Historii akcji użytkownika
- 🔄 Transakcji i rollback'u

Pozwala oddzielić **co chcemy zrobić** od **kto to będzie robić**.

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Command](https://refactoring.guru/design-patterns/command)
- [MDN - About Queues](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Design Patterns by Gang of Four - Chapter 5](https://en.wikipedia.org/wiki/Design_Patterns)
