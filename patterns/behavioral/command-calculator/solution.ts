/**
 * WZORZEC COMMAND - Implementacja
 *
 * Zadanie:
 * Stwórz system kalkulatora z obsługą Undo/Redo:
 * 1. Interface Command definiuje operacje
 * 2. Calculator przechowuje Stan
 * 3. Konkretne komendy (Add, Subtract, itd.) implementują Command
 * 4. CommandHistory przechowuje historię i obsługuje Undo/Redo
 * 5. UI nakażuje Komendy poprzez HistoryManager
 */

// ============================================
// 1. COMMAND INTERFACE
// ============================================
interface Command {
  // ZAIMPLEMENTUJ: Metoda wywoła komendę
  execute(): void;

  // ZAIMPLEMENTUJ: Metoda cofa komendę
  undo(): void;

  // ZAIMPLEMENTUJ: Metoda zwraca opis komendy dla historii
  getDescription(): string;
}

// ============================================
// 2. CALCULATOR - STAN
// ============================================
class Calculator {
  // ZAIMPLEMENTUJ: Przechowuje bieżący wynik
  private result: number = 0;

  // ZAIMPLEMENTUJ: Przechowuje bieżącą operację
  private currentValue: string = '';

  // ZAIMPLEMENTUJ: Przechowuje poprzednią wartość
  private previousValue: number = 0;

  // ZAIMPLEMENTUJ: Przechowuje bieżący operator
  private operator: string | null = null;

  // ZAIMPLEMENTUJ: Getter na wynik
  getResult(): number {
    return this.result;
  }

  // ZAIMPLEMENTUJ: Setter na wynik
  setResult(value: number): void {
    this.result = value;
  }

  // ZAIMPLEMENTUJ: Getter na bieżący display
  getDisplay(): string {
    return this.currentValue || this.result.toString();
  }

  // ZAIMPLEMENTUJ: Setuj bieżącą wartość
  setCurrentValue(value: string): void {
    this.currentValue = value;
  }

  // ZAIMPLEMENTUJ: Getter na bieżącą wartość
  getCurrentValue(): string {
    return this.currentValue;
  }

  // ZAIMPLEMENTUJ: Operacje
  add(value: number): number {
    return this.result + value;
  }

  subtract(value: number): number {
    return this.result - value;
  }

  multiply(value: number): number {
    return this.result * value;
  }

  divide(value: number): number {
    if (value === 0) {
      throw new Error('Nie można dzielić przez zero!');
    }
    return this.result / value;
  }

  // ZAIMPLEMENTUJ: Reset kalkulatora
  reset(): void {
    this.result = 0;
    this.currentValue = '';
    this.previousValue = 0;
    this.operator = null;
  }
}

// ============================================
// 3. KONKRETNE KOMENDY
// ============================================

// ZAIMPLEMENTUJ: Command dla dodawania
class AddCommand implements Command {
  private originalValue: number;
  private valueToAdd: number;

  constructor(
    private calculator: Calculator,
    value: number
  ) {
    this.originalValue = calculator.getResult();
    this.valueToAdd = value;
  }

  execute(): void {
    this.calculator.setResult(this.calculator.add(this.valueToAdd));
  }

  undo(): void {
    this.calculator.setResult(this.originalValue);
  }

  getDescription(): string {
    return `${this.originalValue} + ${this.valueToAdd} = ${this.calculator.getResult()}`;
  }
}

// ZAIMPLEMENTUJ: Command dla odejmowania
class SubtractCommand implements Command {
  private originalValue: number;
  private valueToSubtract: number;

  constructor(
    private calculator: Calculator,
    value: number
  ) {
    this.originalValue = calculator.getResult();
    this.valueToSubtract = value;
  }

  execute(): void {
    this.calculator.setResult(this.calculator.subtract(this.valueToSubtract));
  }

  undo(): void {
    this.calculator.setResult(this.originalValue);
  }

  getDescription(): string {
    return `${this.originalValue} - ${this.valueToSubtract} = ${this.calculator.getResult()}`;
  }
}

// ZAIMPLEMENTUJ: Command dla mnożenia
class MultiplyCommand implements Command {
  private originalValue: number;
  private valueToMultiply: number;

  constructor(
    private calculator: Calculator,
    value: number
  ) {
    this.originalValue = calculator.getResult();
    this.valueToMultiply = value;
  }

  execute(): void {
    this.calculator.setResult(this.calculator.multiply(this.valueToMultiply));
  }

  undo(): void {
    this.calculator.setResult(this.originalValue);
  }

  getDescription(): string {
    return `${this.originalValue} × ${this.valueToMultiply} = ${this.calculator.getResult()}`;
  }
}

// ZAIMPLEMENTUJ: Command dla dzielenia
class DivideCommand implements Command {
  private originalValue: number;
  private valueToDivide: number;

  constructor(
    private calculator: Calculator,
    value: number
  ) {
    this.originalValue = calculator.getResult();
    this.valueToDivide = value;
  }

  execute(): void {
    this.calculator.setResult(this.calculator.divide(this.valueToDivide));
  }

  undo(): void {
    this.calculator.setResult(this.originalValue);
  }

  getDescription(): string {
    return `${this.originalValue} ÷ ${this.valueToDivide} = ${this.calculator.getResult()}`;
  }
}

// ZAIMPLEMENTUJ: Command dla resetowania
class ClearCommand implements Command {
  private previousState: number;

  constructor(private calculator: Calculator) {
    this.previousState = calculator.getResult();
  }

  execute(): void {
    this.calculator.reset();
  }

  undo(): void {
    this.calculator.setResult(this.previousState);
  }

  getDescription(): string {
    return `Resetuj (było: ${this.previousState})`;
  }
}

// ============================================
// 4. COMMAND HISTORY - MANAGER HISTORII
// ============================================
class CommandHistory {
  // ZAIMPLEMENTUJ: Stos do przechowywania wykonanych komend
  private history: Command[] = [];

  // ZAIMPLEMENTUJ: Stos do przechowywania cofniętych komend (dla Redo)
  private undoStack: Command[] = [];

  // ZAIMPLEMENTUJ: Wykonaj komendę i dodaj do historii
  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
    // ZAIMPLEMENTUJ: Wyczyść undo stack gdy wykonamy nową komendę
    this.undoStack = [];
  }

  // ZAIMPLEMENTUJ: Cofnij ostatnią komendę
  undo(): void {
    if (this.history.length > 0) {
      const command = this.history.pop();
      if (command) {
        command.undo();
        this.undoStack.push(command);
      }
    }
  }

  // ZAIMPLEMENTUJ: Powtórz ostatnio cofniętą komendę
  redo(): void {
    if (this.undoStack.length > 0) {
      const command = this.undoStack.pop();
      if (command) {
        command.execute();
        this.history.push(command);
      }
    }
  }

  // ZAIMPLEMENTUJ: Zwróć historię dla wyświetlenia
  getHistory(): Command[] {
    return this.history;
  }

  // ZAIMPLEMENTUJ: Sprawdź czy można zrobić Undo
  canUndo(): boolean {
    return this.history.length > 0;
  }

  // ZAIMPLEMENTUJ: Sprawdź czy można zrobić Redo
  canRedo(): boolean {
    return this.undoStack.length > 0;
  }

  // ZAIMPLEMENTUJ: Zwróć liczbę komend w historii
  getCommandCount(): number {
    return this.history.length;
  }
}

// ============================================
// 5. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ZAIMPLEMENTUJ: Pobierz elementy z DOM
  const display = document.getElementById('display') as HTMLElement;
  const history = document.getElementById('history') as HTMLElement;
  const undoBtn = document.getElementById('undoBtn') as HTMLButtonElement;
  const redoBtn = document.getElementById('redoBtn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
  const equalsBtn = document.getElementById('equalsBtn') as HTMLButtonElement;
  const commandCount = document.getElementById('commandCount') as HTMLElement;
  const operationCount = document.getElementById('operationCount') as HTMLElement;
  const historySize = document.getElementById('historySize') as HTMLElement;

  // ZAIMPLEMENTUJ: Stwórz instancje
  const calculator = new Calculator();
  const commandHistory = new CommandHistory();

  // ZAIMPLEMENTUJ: Zmienne stanu
  let pendingValue: number | null = null;
  let pendingOperator: string | null = null;

  // ZAIMPLEMENTUJ: Funkcja do aktualizacji UI
  const updateUI = (): void => {
    display.textContent = calculator.getDisplay();
    commandCount.textContent = `${commandHistory.getCommandCount()} cmd`;
    operationCount.textContent = commandHistory.getCommandCount().toString();
    historySize.textContent = commandHistory.getCommandCount().toString();

    // ZAIMPLEMENTUJ: Aktualizuj historię
    const commands = commandHistory.getHistory();
    if (commands.length === 0) {
      history.innerHTML = '<div class="history-empty">Historia operacji pokaże się tutaj...</div>';
    } else {
      history.innerHTML = commands
        .map((cmd) => `<div class="history-item">${cmd.getDescription()}</div>`)
        .join('');
    }

    // ZAIMPLEMENTUJ: Włącz/wyłącz przyciski Undo/Redo
    undoBtn.disabled = !commandHistory.canUndo();
    redoBtn.disabled = !commandHistory.canRedo();
  };

  // ZAIMPLEMENTUJ: Number buttons
  document.querySelectorAll('.numBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const value = (e.target as HTMLButtonElement).getAttribute('data-value');
      if (value) {
        calculator.setCurrentValue(calculator.getDisplay() + value);
        updateUI();
      }
    });
  });

  // ZAIMPLEMENTUJ: Operation buttons
  document.querySelectorAll('.opBtn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const op = (e.target as HTMLButtonElement).getAttribute('data-op');
      if (op && calculator.getDisplay() !== '') {
        pendingValue = parseFloat(calculator.getDisplay());
        pendingOperator = op;
        calculator.setCurrentValue('');
        updateUI();
      }
    });
  });

  // ZAIMPLEMENTUJ: Equals button
  equalsBtn.addEventListener('click', () => {
    if (pendingOperator !== null && pendingValue !== null && calculator.getDisplay() !== '') {
      const currentValue = parseFloat(calculator.getDisplay());
      let command: Command | null = null;

      // ZAIMPLEMENTUJ: Stwórz odpowiednią komendę
      calculator.setResult(pendingValue);
      if (pendingOperator === '+') {
        command = new AddCommand(calculator, currentValue);
      } else if (pendingOperator === '-') {
        command = new SubtractCommand(calculator, currentValue);
      } else if (pendingOperator === '*') {
        command = new MultiplyCommand(calculator, currentValue);
      } else if (pendingOperator === '/') {
        command = new DivideCommand(calculator, currentValue);
      }

      if (command) {
        commandHistory.executeCommand(command);
      }

      calculator.setCurrentValue('');
      pendingValue = null;
      pendingOperator = null;
      updateUI();
    }
  });

  // ZAIMPLEMENTUJ: Clear button
  clearBtn.addEventListener('click', () => {
    const command = new ClearCommand(calculator);
    commandHistory.executeCommand(command);
    pendingValue = null;
    pendingOperator = null;
    updateUI();
  });

  // ZAIMPLEMENTUJ: Undo button
  undoBtn.addEventListener('click', () => {
    commandHistory.undo();
    calculator.setCurrentValue('');
    updateUI();
  });

  // ZAIMPLEMENTUJ: Redo button
  redoBtn.addEventListener('click', () => {
    commandHistory.redo();
    calculator.setCurrentValue('');
    updateUI();
  });

  // ZAIMPLEMENTUJ: Inicjalizuj UI
  updateUI();
});
