# 📊 Iterator - Galeria Obrazów

## Wzorzec Iterator

Wzorzec Iterator należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Disponuje sekwencyjnym dostępem do elementów kolekcji bez ujawniania jej podstawowej reprezentacji.

## Diagram Wzorca

```
┌──────────────┐
│  Collection  │ (Images array)
└──────┬───────┘
       │
       ├─ getIterator()
       │
       ▼
┌──────────────────┐
│  Iterator        │
├──────────────────┤
│ + hasNext()      │
│ + next()         │
│ + remove()       │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ 🖼️ 🖼️ 🖼️ │
    └──────────┘
```

## Scenario: Galeria Obrazów

Wyobraź sobie galerię z setkami obrazów. Chcesz:

- Iterate przez obrazy w przód
- Iterate w tył
- Przeskoczyć do konkretnego obrazu
- Nie ujawniać jak obrazy są przechowywane

**Problemy bez Iterator:**

```typescript
// Klient zna strukturę! 😱
const images = gallery.getImages(); // Array
for (let i = 0; i < images.length; i++) {
  console.log(images[i]);
}
```

**Rozwiązanie z Iterator:**

```typescript
// Struktura ukryma! ✨
const iterator = gallery.createIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

## Komponenty

### 1. **Collection Interface**

Definiuje tworzenie iteratora:

```typescript
interface Gallery {
  createIterator(): ImageIterator;
}
```

### 2. **Iterator Interface**

Dostęp do elementów:

```typescript
interface ImageIterator {
  hasNext(): boolean;
  next(): Image;
}
```

### 3. **Concrete Collection**

Przechowuje elementy:

```typescript
class ImageGallery implements Gallery {
  private images: Image[] = [];

  createIterator(): ImageIterator {
    return new ImageIteratorImpl(this.images);
  }
}
```

### 4. **Concrete Iterator**

Iteruje przez elementy:

```typescript
class ImageIteratorImpl implements ImageIterator {
  private current = 0;

  hasNext(): boolean {
    return this.current < this.images.length;
  }

  next(): Image {
    return this.images[this.current++];
  }
}
```

## Co Implementujesz

### Krok 1: Iterator Interface

```typescript
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
  reset(): void;
}
```

📋 **Dlaczego?** Standardowy interfejs dostępu

### Krok 2: Collection Interface

```typescript
interface Iterable<T> {
  createIterator(): Iterator<T>;
}
```

🎁 **Dlaczego?** Kolekcja tworzy iterator

### Krok 3: Concrete Iterator

```typescript
class ArrayIterator<T> implements Iterator<T> {
  private index = 0;

  hasNext(): boolean {
    return this.index < this.array.length;
  }

  next(): T {
    return this.array[this.index++];
  }
}
```

↔️ **Dlaczego?** Zna jak iterate przez array

### Krok 4: Gallery

```typescript
const gallery = new PhotoGallery();
gallery.add(image1);
gallery.add(image2);

const iterator = gallery.createIterator();
while (iterator.hasNext()) {
  display(iterator.next());
}
```

🖼️ **Dlaczego?** Sekwencyjny dostęp

## Praktyczne Zastosowania

1. **Kolekcje** - Array, List, Set, Map iterators
2. **Bazy Danych** - Cursors, ResultSet traversal
3. **Systemów Plików** - Directory traversal
4. **DOM** - NodeIterator, TreeWalker
5. **UI Components** - Table, List rendering
6. **Streaming** - Data stream processing
7. **Grafu** - BFS, DFS traversal

## Wniosek

Wzorzec Iterator pozwala:

- ↔️ Na sekwencyjny dostęp bez ujawniania struktury
- 📊 Na wiele iteratorów tej samej kolekcji
- 🔄 Na zmianę struktury bez zmian v kliencie

---

📚 **Materiały:**

- [Refactoring.Guru - Iterator](https://refactoring.guru/design-patterns/iterator)
