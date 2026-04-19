/**
 * WZORZEC MEMENTO - Implementacja
 */

// ============================================
// 1. INTERFEJSY
// ============================================
interface Memento {
  getContent(): string;
  getTimestamp(): Date;
}

// ============================================
// 2. CONCRETE MEMENTO
// ============================================
class EditorMemento implements Memento {
  private readonly content: string;
  private readonly timestamp: Date;

  constructor(content: string) {
    this.content = content;
    this.timestamp = new Date();
  }

  getContent(): string {
    return this.content;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }
}

// ============================================
// 3. ORIGINATOR (TextEditor)
// ============================================
class TextEditor {
  private content: string = '';

  setContent(content: string): void {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }

  createMemento(): Memento {
    return new EditorMemento(this.content);
  }

  restoreFromMemento(memento: Memento): void {
    this.content = memento.getContent();
  }
}

// ============================================
// 4. CARETAKER (History Manager)
// ============================================
class EditorHistory {
  private history: Memento[] = [];
  private currentIndex: number = -1;

  save(memento: Memento): void {
    // Remove any redo history if we're saving from middle of history
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(memento);
    this.currentIndex++;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  undo(): Memento | null {
    if (this.canUndo()) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): Memento | null {
    if (this.canRedo()) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  getHistory(): Memento[] {
    return this.history;
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
let editor: TextEditor;
let history: EditorHistory;

function saveState(): void {
  const memento = editor.createMemento();
  history.save(memento);
  updateHistoryUI();
  updateButtonStates();
}

function undo(): void {
  const memento = history.undo();
  if (memento) {
    editor.restoreFromMemento(memento);
    const textArea = document.getElementById('editor') as HTMLTextAreaElement;
    if (textArea) {
      textArea.value = editor.getContent();
    }
    updateHistoryUI();
    updateButtonStates();
  }
}

function redo(): void {
  const memento = history.redo();
  if (memento) {
    editor.restoreFromMemento(memento);
    const textArea = document.getElementById('editor') as HTMLTextAreaElement;
    if (textArea) {
      textArea.value = editor.getContent();
    }
    updateHistoryUI();
    updateButtonStates();
  }
}

function updateHistoryUI(): void {
  const historyContainer = document.getElementById('history-list');
  if (!historyContainer) return;

  historyContainer.innerHTML = '';
  const mementos = history.getHistory();

  mementos.forEach((memento, index) => {
    const item = document.createElement('div');
    item.className = `history-item`;
    item.innerHTML = `
      <span class="history-time">${memento.getTimestamp().toLocaleTimeString()}</span>
      <span class="history-preview">${memento.getContent().substring(0, 30)}...</span>
    `;
    historyContainer.appendChild(item);
  });
}

function updateButtonStates(): void {
  const undoBtn = document.getElementById('undo-btn') as HTMLButtonElement;
  const redoBtn = document.getElementById('redo-btn') as HTMLButtonElement;

  if (undoBtn) undoBtn.disabled = !history.canUndo();
  if (redoBtn) redoBtn.disabled = !history.canRedo();
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  editor = new TextEditor();
  history = new EditorHistory();

  const textArea = document.getElementById('editor') as HTMLTextAreaElement;
  const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
  const undoBtn = document.getElementById('undo-btn') as HTMLButtonElement;
  const redoBtn = document.getElementById('redo-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  // Initial save
  editor.setContent('');
  saveState();

  if (textArea) {
    textArea.addEventListener('input', () => {
      editor.setContent(textArea.value);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', saveState);
  }

  if (undoBtn) {
    undoBtn.addEventListener('click', undo);
  }

  if (redoBtn) {
    redoBtn.addEventListener('click', redo);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      textArea.value = '';
      editor.setContent('');
      saveState();
    });
  }

  // Demo
  setTimeout(() => {
    const steps = [
      'Witaj! ',
      'Witaj! To jest ',
      'Witaj! To jest demo ',
      'Witaj! To jest demo wzorca Memento',
    ];
    steps.forEach((text, index) => {
      setTimeout(
        () => {
          textArea.value = text;
          editor.setContent(text);
          saveState();
        },
        (index + 1) * 1000
      );
    });
  }, 500);
});
