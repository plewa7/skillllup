# 🔬 Prototype - Clone Obiektu

## Wzorzec Prototype

Wzorzec Prototype należy do grupy wzorców **kreacyjnych** (Creational Patterns). Określa rodzaje tworzyć obiekty poprzez klonowanie prototypu zamiast tworzenia ich od zera.

## Diagram Wzorca

```
              ┌─────────────┐
              │ Prototype   │ (template)
              └──────┬──────┘
                     │ clone()
         ┌───────────┼───────────┐
         ▼           ▼           ▼
      Clone1      Clone2      Clone3
      (unique)    (unique)    (unique)
```

## Scenario: Klonowanie Dokumentów

Masz dokument szablonu. Zamiast:

- Ręcznego tworzenia każdego dokumentu
- Kopiowania i wklejania

Łatwiej:

- Clone istniejący dokument
- Zmienić tylko różnice

**Problemy bez Prototype:**

```typescript
// Twórz każdy od zera! 😱
const doc1 = new Document('Title', 'Author', 'Content');
const doc2 = new Document('Title', 'Author', 'Content'); // Duplikacja!
```

**Rozwiązanie z Prototype:**

```typescript
// Klonuj & modyfikuj! ✨
const doc1 = new Document('Title', 'Author', 'Content');
const doc2 = doc1.clone();
doc2.setTitle('New Title'); // Change only what's different
```

## Komponenty

### 1. **Prototype Interface**

```typescript
interface Cloneable {
  clone(): Cloneable;
}
```

### 2. **Concrete Prototype**

```typescript
class Document implements Cloneable {
  constructor(
    public title: string,
    public author: string,
    public content: string
  ) {}

  clone(): Document {
    return new Document(this.title, this.author, this.content);
  }
}
```

### 3. **Prototype Registry (Optional)**

```typescript
class PrototypeRegistry {
  private prototypes = new Map<string, Cloneable>();

  register(name: string, prototype: Cloneable): void {
    this.prototypes.set(name, prototype);
  }

  getClone(name: string): Cloneable {
    return this.prototypes.get(name)?.clone()!;
  }
}
```

## Typy Klonowania

### Shallow Copy (Płytka kopia)
```typescript
// Only top level
const copy = {...original};
```

### Deep Copy (Głęboką kopia)
```typescript
// Rekursywnie kopij zagnieżdżone obiekty
const copy = JSON.parse(JSON.stringify(original));
```

## Co Implementujesz

### Krok 1: Cloneable Interface

```typescript
interface Prototype {
  clone(): Prototype;
}
```

🔬 **Dlaczego?** Define clone contract

### Krok 2: Concrete Prototype

```typescript
class Shape implements Prototype {
  clone(): Shape {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    return clone;
  }
}
```

🎯 **Dlaczego?** Implement cloning

### Krok 3: Deep vs Shallow Copy

```typescript
// Shallow
clone(): Document { return {...this}; }

// Deep
clone(): Document {
  return new Document(
    this.title, // primitives OK
    {...this.metadata}, // objects need deep copy
    this.content.slice() // arrays need copy
  );
}
```

⚙️ **Dlaczego?** Choose copy strategy

### Krok 4: Usage

```typescript
const original = new Document('Doc', 'Author', 'Content');
const clone = original.clone();
clone.setTitle('Clone');
```

✨ **Dlaczego?** Instance reuse!

## Praktyczne Zastosowania

1. **Document Cloning** - Copy with template
2. **Configuration Objects** - Clone and modify
3. **Cache** - Clone cached objects
4. **Undo/Redo** - Store prototype snapshots
5. **Database** - Deep copy data structures
6. **GUI** - Clone UI components
7. **Game Objects** - Clone enemies/items

## Porównanie: New vs Clone

### New (od zera)
```typescript
const doc = new Document('Title', 'Author', 'Content');
// Wszystko musi być initialized
```

### Clone (z szablonu)
```typescript
const doc = template.clone();
doc.setTitle('New Title');
// Większość jest już OK
```

## Wniosek

Wzorzec Prototype pozwala:

- 🔬 Na klonowanie obiektów zamiast tworzenia od zera
- ⚡ Na szybkie tworzenie podobnych objektów
- 🎯 Na reuse templates

---

📚 **Materiały:**

- [Refactoring.Guru - Prototype](https://refactoring.guru/design-patterns/prototype)
- [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Shallow vs Deep Copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)
