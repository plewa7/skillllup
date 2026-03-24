# 📋 Template Method - Generowanie Raportów

## Wzorzec Template Method

Wzorzec Template Method należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Definiuje szkielet algorytmu w klasie bazowej, ale pozwala podklasą na zastąpienie poszczególnych kroków bez zmiany struktury algorytmu.

## Diagram Wzorca

```
     ┌──────────────────────┐
     │  ReportGenerator     │
     │  (abstract)          │
     │  ┌────────────────┐  │
     │  │ generateReport │  │
     │  │ - header()     │  │
     │  │ - body()  ◄─── ovverride
     │  │ - footer()     │  │
     │  └────────────────┘  │
     └──────┬───────────────┘
            △
       ┌────┴────┐
       │          │
    HTMLReport  PDFReport
    - body()    - body()
```

## Scenario: Generowanie Raportów

Aplikacja tworzy raporty:

- HTML Report
- PDF Report
- CSV Report

Wszystkie mają tą samą strukturę, ale różne implementacje.

**Problemy bez Template Method:**

```typescript
// Duplikacja kodu! 😱
function generateHTMLReport() {
  const header = createHTMLHeader();
  const body = createHTMLBody();
  const footer = createHTMLFooter();
  return header + body + footer;
}

function generatePDFReport() {
  const header = createPDFHeader();
  const body = createPDFBody();
  const footer = createPDFFooter();
  return header + body + footer;
}
```

**Rozwiązanie z Template Method:**

```typescript
// Struktura raz, implementacja wiele razy! ✨
abstract class ReportGenerator {
  generateReport(): string {
    return this.header() + this.body() + this.footer();
  }
  abstract header(): string;
  abstract body(): string;
  abstract footer(): string;
}

class HTMLReport extends ReportGenerator { ... }
class PDFReport extends ReportGenerator { ... }
```

## Komponenty

### 1. **Abstract Class (Template)**

```typescript
abstract class Algorithm {
  execute(): void {
    this.step1();
    this.step2();
    this.step3();
  }
  abstract step1(): void;
  abstract step2(): void;
  abstract step3(): void;
}
```

### 2. **Concrete Classes**

```typescript
class ConcreteAlgorithmA extends Algorithm {
  step1(): void {
    /* impl A */
  }
  step2(): void {
    /* impl A */
  }
  step3(): void {
    /* impl A */
  }
}

class ConcreteAlgorithmB extends Algorithm {
  step1(): void {
    /* impl B */
  }
  step2(): void {
    /* impl B */
  }
  step3(): void {
    /* impl B */
  }
}
```

## Co Implementujesz

### Krok 1: Abstract Template

```typescript
abstract class ReportGenerator {
  generateReport(): string {
    return this.header() + this.body() + this.footer();
  }
  protected abstract header(): string;
  protected abstract body(): string;
  protected abstract footer(): string;
}
```

📋 **Dlaczego?** Definiuje strukturę

### Krok 2: Concrete Implementations

```typescript
class HTMLReport extends ReportGenerator {
  protected header(): string {
    return '<html>';
  }
  protected body(): string {
    return '<body>';
  }
  protected footer(): string {
    return '</html>';
  }
}
```

🔨 **Dlaczego?** Implementacja dla HTML

### Krok 3: Użycie

```typescript
const report: ReportGenerator = new HTMLReport();
const html = report.generateReport();
```

✨ **Dlaczego?** Zamienialne implementacje

## Praktyczne Zastosowania

1. **Report Generation** - HTML, PDF, CSV
2. **Data Processing** - Parse, transform, export
3. **Algorithms** - Sorting, searching with variations
4. **UI Rendering** - Different themes
5. **Testing** - Setup, test, teardown
6. **Game Loops** - Input, update, render

## Wniosek

Wzorzec Template Method pozwala:

- 📋 Na DRY - struktura raz, implementation wiele razy
- 🔄 Na Consistency across implementations
- 🎯 Na Open/Closed Principle

---

📚 **Materiały:**

- [Refactoring.Guru - Template Method](https://refactoring.guru/design-patterns/template-method)
