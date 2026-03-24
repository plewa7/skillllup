# 🏗️ Builder - Konstruktor Formularzy

## Wzorzec Builder

Wzorzec Builder należy do grupy wzorców **kreacyjnych** (Creational Patterns). Pozwala na step-by-step konstruowanie złożonych obiektów, separując proces budowania od reprezentacji obiektu. Szczególnie przydatny dla obiektów z wieloma opcjonalnymi parametrami.

## Diagram Wzorca

```
┌──────────────┐
│ Client       │
└──────┬───────┘
       │
       ▼
┌─────────────────────────────┐
│ Builder (fluent interface)  │
├─────────────────────────────┤
│ + addField()                │ (each returns this)
│ + setRequired()             │ (method chaining)
│ + build()                   │ (returns final object)
└────────┬────────────────────┘
         │
         ▼
    ┌─────────────┐
    │FormConfig   │(final product)
    └─────────────┘
```

## Scenario: Konstruktor Formularzy

Wyobraź sobie, że chcesz stworzyć:

- Formularz rejestracji z polami: imię, email, hasło
- Formularz kontaktowy z polami: nazwa, email, wiadomość
- Formularz ankiety ze zmiennymi polami

**Problemy bez Builder:**

```typescript
// Koszmar! 😱
const form = new FormConfig('Registration', [
  new FormField('name', 'Imię', 'text', true, 'Wpisz imię'),
  new FormField('email', 'Email', 'email', true),
  new FormField('password', 'Hasło', 'text', true),
]);

// Każde pole wymaga alla parametrów
// Trudno czytać i rozumieć
```

**Rozwiązanie z Builder (Fluent Interface):**

```typescript
// Czysty kod! ✨
const form = new FormBuilder('Registration')
  .addTextField('name', 'Imię', 'Wpisz imię')
  .setRequired()
  .addEmailField('email', 'Email')
  .setRequired()
  .addTextField('password', 'Hasło')
  .setRequired()
  .build();

// Czytane jak angielskie zdania!
```

## Komponenty

### 1. **FormField Interface**

Definicja pojedynczego pola:

```typescript
interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // dla select
  rows?: number; // dla textarea
}
```

### 2. **FormConfig Interface**

Końcowa konfiguracja formularza:

```typescript
interface FormConfig {
  name: string;
  fields: FormField[];
  submitButtonText: string;
}
```

### 3. **FormBuilder - Fluent Interface**

Klasa budująca formularz:

- `addTextField()`: Dodaj pole text
- `addEmailField()`: Dodaj pole email
- `addNumberField()`: Dodaj pole number
- `addSelectField()`: Dodaj pole select
- `addCheckboxField()`: Dodaj pole checkbox
- `addTextareaField()`: Dodaj pole textarea
- `setRequired()`: Ustaw ostatnie pole jako wymagane
- `build()`: Zwróć FormConfig

**Kluczowa cecha**: Każda metoda zwraca `this` dla **method chaining**

### 4. **FormRenderer**

Generuje HTML z FormConfig:

```typescript
class FormRenderer {
  static render(config: FormConfig): string {
    // Konwertuj FormConfig na HTML
  }
}
```

### 5. **FormManager**

Orchestruje builder i renderer:

- `getBuilder()`: Zwróć builder
- `build()`: Zbuduj formularz
- `renderForm()`: Renderuj do HTML
- `toJSON()`: Eksportuj do JSON
- `reset()`: Wyczyść builder

## Co Implementujesz

### Krok 1: FormField i FormConfig Interface

```typescript
interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
}

interface FormConfig {
  name: string;
  fields: FormField[];
}
```

📋 **Dlaczego?** Definiuje strukturę danych

### Krok 2: FormBuilder z Fluent Interface

```typescript
class FormBuilder {
  addTextField(name: string, label: string): FormBuilder {
    this.fields.push({...});
    return this;  // Fluent!
  }

  build(): FormConfig {
    return { name: this.formName, fields: this.fields };
  }
}
```

⛓️ **Dlaczego?** Method chaining = czytelny kod

### Krok 3: Konkretne metody add\*

```typescript
addEmailField(name: string, label: string): FormBuilder {
  this.fields.push({ type: 'email', ... });
  return this;
}

addSelectField(name: string, label: string, options): FormBuilder {
  this.fields.push({ type: 'select', options, ... });
  return this;
}
```

🔧 **Dlaczego?** Każde pole typu

### Krok 4: Modyfikatory postrzegane (setRequired, withValue)

```typescript
setRequired(required = true): FormBuilder {
  this.fields[this.fields.length - 1].required = required;
  return this;
}

withPlaceholder(placeholder: string): FormBuilder {
  this.fields[this.fields.length - 1].placeholder = placeholder;
  return this;
}
```

✏️ **Dlaczego?** Modyfikuj ostatnie pole w ciągu

### Krok 5: FormRenderer i build()

```typescript
build(): FormConfig {
  return {
    name: this.formName,
    fields: this.fields
  };
}

// Rendereruj
const html = FormRenderer.render(config);
```

🎨 **Dlaczego?** Konwertuj DO i Z struktury

## Praktyczne Zastosowania

1. **Form Builders** - Dynamiczne budowanie formularzy
2. **Query Builders** - SQL query construction
3. **Configuration Objects** - Budowanie skomplikowanych konfiguracji
4. **Document Builders** - Generowanie dokumentów
5. **API Request Builders** - Konstruowanie requestów
6. **UI Component Builders** - Tworzenie komponentów

## Porównanie: Bez Builder vs Z Builder

### ❌ Bez Builder (Problematyczne)

```typescript
const field1 = new FormField('name', 'Imię', 'text', true, '', 'Wpisz imię');
const field2 = new FormField('email', 'Email', 'email', true, '', '', ['opt1', 'opt2']);
const field3 = new FormField(...); // Co to jest?!

const form = new FormConfig('Registration', [field1, field2, field3]);
```

### ✅ Z Builder (Czysty)

```typescript
const form = new FormBuilder('Registration')
  .addTextField('name', 'Imię', 'Wpisz imię')
  .setRequired()
  .addEmailField('email', 'Email')
  .setRequired()
  .addSelectField('country', 'Kraj', ['PL', 'UK', 'DE'])
  .build();
```

## Fluent Interface - Magiczne Method Chaining

```typescript
// Każda metoda zwraca 'this'
addTextField(...): FormBuilder {
  this.fields.push(...);
  return this;  // ← Key to fluent!
}

// Pozwala na:
builder
  .addTextField(...)
  .setRequired()
  .addEmailField(...)
  .setRequired()
  .build();
```

## Dlaczego Builder?

### ✅ Zalety

- **Czytelność**: Kod czytany jak zdania naturalne
- **Elastyczność**: Opcjonalne pola, warunkowe dodawanie
- **Separation**: Oddział budowania od reprezentacji
- **Immutability**: Łatwo tworzyć różne warianty
- **Fluent**: Method chaining = piękny kod

### ⚠️ Wady

- **Więcej kodu**: Więcej klas niż alternatywy
- **Kompleksowość**: Dla prostych obiektów overkill
- **Performance**: Dodatkowa abstrakcja

## Dlaczego Method Chaining?

```typescript
// Bez chainingu - nudne
const builder = new FormBuilder('Contact');
builder.addTextField('subject', 'Temat');
builder.setRequired();
builder.addTextareaField('message', 'Wiadomość');
builder.setRequired();
const form = builder.build();

// Z chainingiem - piękne!
const form = new FormBuilder('Contact')
  .addTextField('subject', 'Temat')
  .setRequired()
  .addTextareaField('message', 'Wiadomość')
  .setRequired()
  .build();
```

## Jak Uruchomić

```bash
npm install
npm run dev

# Przejdź do: http://localhost:5173/patterns/creational/form-builder/
```

## Wzorzec w Praktyce

1. ➡️ Wpisz nazwę formularza
2. ➡️ Kliknij přycniki "Add" aby dodać pola
3. ➡️ Obserwuj podgląd aktualizujący się w real-time
4. ➡️ Kliknij ✕ aby usunąć pole
5. ➡️ Skopiuj JSON
6. ➡️ Kliknij Reset aby zacząć od nowa

## Wniosek

Wzorzec Builder to eleganckie rozwiązanie dla:

- 🏗️ Budowania złożonych obiektów
- ⛓️ Fluent interface'u
- 📖 Czytelnego kodu
- 🔧 Elastycznego konstruowania

Seperuje **budowanie** od **reprezentacji**.

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Builder](https://refactoring.guru/design-patterns/builder)
- [Method Chaining](https://en.wikipedia.org/wiki/Method_chaining)
- [Fluent Interface](https://www.martinfowler.com/bliki/FluentInterface.html)
