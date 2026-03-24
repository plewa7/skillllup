# ✨ Decorator - Formatter Tekstu

## Wzorzec Decorator

Wzorzec Decorator należy do grupy wzorców **strukturalnych** (Structural Patterns). Pozwala dynamicznie dodawać nowe funkcjonalności do obiektów bez modyfikowania ich struktury. Używa **kompozycji zamiast dziedziczenia**.

## Diagram Wzorca

```
┌──────────────────────────────┐
│   TextComponent (interface)  │
└──────────────────────────────┘
              ▲
              │ implements
              │
    ┌─────────┴──────────┐
    │                    │
┌───────────┐    ┌──────────────┐
│ PlainText │    │ TextDecorator│
└───────────┘    └──────────────┘
                      ▲
                      │ extends
          ┌───────────┼───────────┬──────────────┬────────────┐
          │           │           │              │            │
    ┌──────────┐ ┌────────┐ ┌──────────┐ ┌────────────┐ ┌─────────┐
    │  Bold    │ │ Italic │ │ Underline│ │ Uppercase  │ │ Color   │
    └──────────┘ └────────┘ └──────────┘ └────────────┘ └─────────┘
```

## Scenario: Formatowanie Tekstu

Wyobraź sobie, że chcesz sformatować tekst na wiele sposobów:

- Pogrubienie (bold)
- Kursywa (italic)
- Podkreślenie
- Wielkie litery
- Kolorowanie

**Problemy bez Decorator:**

- Bez Decorator: Potrzebowałbyś klasy `BoldItalicText`, `BoldUnderlineText`, `BoldItalicUnderlineText` itd. - **eksplozja klas!**
- Z dziedziczeniem: Zmiana jednego dekoratora wymagałaby modyfikacji wielu klas

**Rozwiązanie z Decorator:**

- Jeden `TextComponent` (bazowy tekst)
- Każdy dekorator opakowuje istniejący komponent
- Możesz kombinować dekoratory w dowolnej kolejności
- Łatwe dodawanie nowych dekoratorów bez zmiany istniejącego kodu

## Komponenty

### 1. **TextComponent Interface**

Definiuje kontakt dla wszystkich komponentów:

```typescript
interface TextComponent {
  render(): string;
}
```

### 2. **PlainText - Komponent Bazowy**

Implementacja podstawowego tekstu:

- `render()`: Zwraca zwykły tekst

### 3. **TextDecorator - Abstract Decorator**

Klasa abstrakcyjna implementująca TextComponent:

- Przechowuje referencję do dekorowanego komponentu
- `component: TextComponent` - opakowywany obiekt
- Abstract metoda `render()` - musi być zaimplementowana w podklasach

### 4. **Konkretne Dekoratory**

Każdy dekorator rozszerza TextDecorator:

- **BoldDecorator**: Opakowuje w `<strong>`
- **ItalicDecorator**: Opakowuje w `<em>`
- **UnderlineDecorator**: Opakowuje w `<u>`
- **UppercaseDecorator**: Konwertuje na wielkie litery
- **ColorDecorator**: Dodaje kolor i highlighting

### 5. **TextFormatter - Manager**

Zarządza budowaniem tekstu z dekoratorami:

- `addDecorator()`: Dodaj dekorator do listy
- `clearDecorators()`: Wyczyść wszystkie dekoratory
- `buildComponent()`: Zbuduj stos dekoratorów
- `render()`: Zwróć sformatowany tekst

## Co Implementujesz

### Krok 1: Interface TextComponent

```typescript
interface TextComponent {
  render(): string;
}
```

🎯 **Dlaczego?** Definiuje kontrakt - co musi implementować każdy komponent

### Krok 2: Komponent Bazowy PlainText

```typescript
class PlainText implements TextComponent {
  constructor(private text: string) {}
  render(): string {
    return this.text;
  }
}
```

📝 **Dlaczego?** To "obiekt" który będziemy dekorować

### Krok 3: Abstract TextDecorator

```typescript
abstract class TextDecorator implements TextComponent {
  constructor(protected component: TextComponent) {}
  abstract render(): string;
}
```

🎁 **Dlaczego?** Klasa abstract definiuje strukturę dla wszystkich dekoratorów

### Krok 4: Konkretne Dekoratory

```typescript
class BoldDecorator extends TextDecorator {
  render(): string {
    return `<strong>${this.component.render()}</strong>`;
  }
}
```

✨ **Dlaczego?** Każdy dekorator opakowuje komponent i dodaje funkcjonalność

### Krok 5: Event Listenery i Kombinacje

```typescript
boldCheck.addEventListener('change', () => {
  if (boldCheck.checked) {
    formatter.addDecorator(new BoldDecorator(...));
  }
  updatePreview();
});
```

👂 **Dlaczego?** Łączy UI z logiką, pozwala na kombinowanie dekoratorów

## Praktyczne Zastosowania

1. **Rich Text Editors** - formatowanie tekstu (Word, Google Docs)
2. **Logging Systems** - dodawanie timestamp, level, context do logów
3. **HTTP Requests** - dodawanie auth, compression, retry logic
4. **UI Styling** - komponenty z opcjonalnymi stylami
5. **Image Processing** - filtry (blur, sepia, invert, itd.)

## Dlaczego Decorator?

### ✅ Zalety

- **Elastyczność**: Kombinuj dekoratory w dowolnej kolejności
- **Otwarte/Zamknięte**: Otwarte na rozszerzenie, zamknięte na modyfikację
- **Łatwa testowanie**: Każdy dekorator testujemy osobno
- **Runtime**: Dekoratory mogą być dodawane w runtime'ie

### ⚠️ Wady

- **Złożoność**: Wiele małych dekoratorów = skomplikowany kod
- **Porządek**: Kolejność dekoratorów może mieć znaczenie
- **Komponent opakowujący**: Zagnieżdżone dekoratory mogą być zagmatwane

## Porównanie: Dziedziczenie vs Decorator

### ❌ Z Dziedziczeniem (Problematyczne)

```
PlainText
├── BoldText
├── ItalicText
├── BoldItalicText       ← Kombinacje!
├── BoldUnderlineText
├── ItalicUnderlineText
└── BoldItalicUnderlineText  ← Eksplozja klas!
```

### ✅ Z Decorator (Eleganckie)

```
PlainText
  → BoldDecorator
    → ItalicDecorator
      → UnderlineDecorator
        → result
```

## Jak Uruchomić

```bash
npm install
npm run dev

# Przejdź do: http://localhost:5173/patterns/structural/text-formatter-decorator/
```

## Wzorzec w Praktyce

1. ➡️ Wpisz tekst w textarea
2. ➡️ Zaznacz checkboxy dekoratorów
3. ➡️ Obserwuj, jak tekst zmienia się w podglądzie
4. ➡️ Spróbuj kombinować wiele dekoratorów naraz
5. ➡️ Kliknij Reset - wszystkie dekoratory znikają

## Wniosek

Decorator to potężny wzorzec do **dynamicznego dodawania funkcjonalności** bez zmiany istniejącego kodu. Pozwala na:

- 🎁 Komponowanie funkcjonalności
- 🔄 Łatwe testowanie poszczególnych dekoratorów
- 📦 SOLID principles (Open/Closed Principle)
- ⚡ Runtime elastyczność

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Decorator](https://refactoring.guru/design-patterns/decorator)
- [MDN - Object Composition](https://developer.mozilla.org/en-US/docs/Glossary/Composition)
- [SOLID - Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
