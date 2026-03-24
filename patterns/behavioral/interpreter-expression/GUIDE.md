# 🔤 Interpreter - Wyrażenia Matematyczne

## Wzorzec Interpreter

Wzorzec Interpreter należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Używany do definiowania reprezentacji gramatyki i interpretera dla danego języka. Pozwala na parsowanie i ewaluację wyrażeń.

## Diagram Wzorca

```
Input: "2 + 3 * 4"
         ↓
    ┌─────────────┐
    │   Parser    │ → Expression Tree
    └─────────────┘
         ↓
    ┌─────────────────────┐
    │  Expression Tree:   │
         ┌─────┐
         │  +  │
        / \
       2   ┌─────┐
           │  *  │
          / \
         3   4
    └─────────────────────┘
         ↓
    ┌─────────────────────┐
    │   Interpreter       │ → Evaluate = 14
    │   (Visitor Pattern) │
    └─────────────────────┘
```

## Scenario: Kalkulator Wyrażeń

Wyobraź sobie parser, który:

- Parsuje wyrażenia: `"5 + 3"`, `"10 * 2 - 5"`
- Buduje abstrakcyjne drzewo składni (AST)
- Interpretuje drzewo i oblicza wynik

**Problemy bez Interpreter:**

```typescript
// Kod do parsowania każdej kombinacji! 😱
if (expr === '5 + 3') result = 8;
else if (expr === '5 - 3') result = 2;
else if (expr === '5 * 3') result = 15;
// ... nieskończenie wiele warunków
```

**Rozwiązanie z Interpreter:**

```typescript
// Uniwersalny parser! ✨
const parser = new ExpressionParser();
const tree = parser.parse("5 + 3 * 4");
const result = tree.interpret(); // = 17
```

## Komponenty

### 1. **Expression Interface**

Reprezentuje wyrażenie w drzewie:

```typescript
interface Expression {
  interpret(): number; // Oblicza wartość
}
```

### 2. **Terminal Expressions**

Liście drzewa (liczby):

```typescript
class Number implements Expression {
  constructor(private value: number) {}
  interpret(): number {
    return this.value;
  }
}
```

### 3. **Non-Terminal Expressions**

Węzły wewnętrzne (operacje):

```typescript
class Add implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class Multiply implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}
```

### 4. **Parser**

Buduje drzewo wyrażeń:

```typescript
class ExpressionParser {
  parse(expression: string): Expression {
    // Tokenize → Syntactic Analysis → Build Tree
  }
}
```

### 5. **Context**

Przechowuje zmienne:

```typescript
class Context {
  variables: Map<string, number> = new Map();
}
```

## Co Implementujesz

### Krok 1: Expression Interface

```typescript
interface Expression {
  interpret(context?: Context): number;
}
```

📋 **Dlaczego?** Definiuje kontrakt dla wszystkich wyrażeń

### Krok 2: Terminal i Non-Terminal Expression

```typescript
class NumberExpression implements Expression {
  interpret(): number { return this.value; }
}

class AddExpression implements Expression {
  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}
```

🌳 **Dlaczego?** Budują abstrakcyjne drzewo

### Krok 3: Parser

```typescript
class Parser {
  parse(input: string): Expression {
    // 1. Tokenize: "2 + 3" → [2, +, 3]
    // 2. Analyze: buduj drzewo
    // 3. Zwróć drzewo
  }
}
```

⚙️ **Dlaczego?** Konwertuje string na obiekty

### Krok 4: Interpreter

```typescript
const parser = new Parser();
const expr = parser.parse("2 + 3 * 4");
const result = expr.interpret(); // 14
```

🎯 **Dlaczego?** Oblicza wartość drzewa

## Praktyczne Zastosowania

1. **Kalkulatory** - Parsowanie i obliczanie wyrażeń
2. **Języki Programowania** - Kompilatory, interpretery
3. **Query Languages** - SQL, Elasticsearch queries
4. **Grammary** - Reguły i parsowanie
5. **Configuration Files** - INI, TOML, JSON parsing
6. **Regular Expressions** - Regex engines
7. **Template Engines** - Template language parsing

## Dlaczego Interpreter?

### ✅ Zalety

- **Elastyczność**: Łatwe dodawanie nowych operatorów
- **Separation**: Gramatyka oddzielona od implementacji
- **Reusability**: Parser do wielu przypadków
- **Simple Grammar**: Świetne dla prostych języków

### ⚠️ Wady

- **Performance**: Może być wolny dla złożonych wyrażeń
- **Klasy**: Dużo klas dla każdego operatora
- **Złożoność**: Dla złożonych gramatyk jest overkill

## Porównanie: Bez vs Z Interpreter

### ❌ Bez Interpreter

```typescript
function evaluate(expr: string): number {
  if (expr === '2+3') return 5;
  if (expr === '5*3') return 15;
  // ... każde wyrażenie osobno!
}
```

### ✅ Z Interpreter

```typescript
const parser = new Parser();
const tree = parser.parse(ANY_EXPRESSION);
const result = tree.interpret();
// Uniwersalne!
```

## Wniosek

Wzorzec Interpreter pozwala na:

- 🔤 Parsowanie i interpretację języków
- 📝 Budowanie abstrakcyjnych drzew
- 🧮 Obliczanie wyrażeń
- ♻️ Reuse parsera wielokrotnie

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Interpreter](https://refactoring.guru/design-patterns/interpreter)
- [AST - Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- [Parsing Techniques](https://en.wikipedia.org/wiki/Parsing)
