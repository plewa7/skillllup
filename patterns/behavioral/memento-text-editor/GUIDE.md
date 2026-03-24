# 💾 Memento - Edytor Tekstu

## Wzorzec Memento

Wzorzec Memento należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Przechwytuje i eksternalizuje stan obiektu bez naruszania enkapsulacji, pozwalając na przywrócenie obiektu do poprzedniego stanu.

## Diagram Wzorca

```
┌──────────┐
│  Editor  │ setContent("Hello")
└────┬─────┘
     │
     ├─ save() → Memento(state="Hello")
     │
     └─ setContent("World")

        undo() → restore(memento)

┌──────────┐
│  Editor  │ content="Hello"
└──────────┘
```

## Scenario: Undo/Redo w Edytorze

Edytor tekstu powinna umiać:

- Zapisać stan tekstu
- Zmienić tekst
- Przywrócić poprzedni stan

Bez Memento:

- Musisz śledzić wszystkie stany manualnie
- Pamiętaćhistorię gdzie indziej

Z Memento:

- Obiekt sam tworzy "snapshot" stanu
- Historia zarządza mementos

**Problemy bez Memento:**

```typescript
// Musisz śledzić wszystko! 😱
const history: string[] = [];
history.push(editor.getContent());
editor.setContent("New text");
// history.pop() to cofnięcie
```

**Rozwiązanie z Memento:**

```typescript
// Memento enkapsuluje stan! ✨
const memento = editor.createMemento();
editor.setContent("New");
editor.restoreMemento(memento);
```

## Komponenty

### 1. **Memento Interface**

```typescript
interface Memento {
  getState(): string; // readonly
}
```

### 2. **Originator (Editor)**

```typescript
class TextEditor {
  private content: string = '';

  createMemento(): Memento {
    return new EditorMemento(this.content);
  }

  restoreMemento(memento: Memento): void {
    this.content = memento.getState();
  }
}
```

### 3. **Caretaker (History Manager)**

```typescript
class EditorHistory {
  private history: Memento[] = [];

  save(memento: Memento): void {
    this.history.push(memento);
  }

  undo(): Memento | null {
    return this.history.pop() || null;
  }
}
```

## Co Implementujesz

### Krok 1: Memento Interface

```typescript
interface Memento {
  getState(): State;
}
```

📋 **Dlaczego?** Enkapsuluje snapshot

### Krok 2: Originator

```typescript
class Editor {
  createMemento(): Memento { ... }
  restoreMemento(m: Memento) { ... }
}
```

💾 **Dlaczego?** Tworzy i przywraca mementos

### Krok 3: Caretaker

```typescript
class EditorHistory {
  private mementos: Memento[] = [];
  save(m: Memento) { this.mementos.push(m); }
  undo(): Memento { return this.mementos.pop(); }
}
```

📚 **Dlaczego?** Zarządza historią

### Krok 4: Użycie

```typescript
const editor = new TextEditor();
const history = new EditorHistory();

editor.setContent("First");
history.save(editor.createMemento());

editor.setContent("Second");
editor.restoreMemento(history.undo());
// content = "First"
```

↩️ **Dlaczego?** Undo/Redo!

## Praktyczne Zastosowania

1. **Undo/Redo** - Text editors, graphics apps
2. **Version Control** - Git commits, snapshots
3. **Transaction Rollback** - Database systems
4. **Game Save/Load** - Player progress saving
5. **Configuration Backups** - System configuration
6. **Browser History** - Page state restoration

## Wniosek

Wzorzec Memento pozwala:

- 💾 Na Saving state bez naruszania enkapsulacji
- ↩️ Na Undo/Redo w aplikacjach
- 🔄 Na Transactional behavior

---

📚 **Materiały:**

- [Refactoring.Guru - Memento](https://refactoring.guru/design-patterns/memento)
