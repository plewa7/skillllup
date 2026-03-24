# 🔄 Adapter - Konwerter Danych

## Wzorzec Adapter

Wzorzec Adapter należy do grupy wzorców **strukturalnych** (Structural Patterns). Pozwala na konwersję interfejsu jednej klasy na inny interfejs, który klienci oczekują. Adapter pozwala na współpracę klas, które normalnie nie mogłyby współpracować z powodu niezgodnych interfejsów.

## Diagram Wzorca

```
┌────────────────────┐
│   Client           │
└────────┬───────────┘
         │ expects known interface
         ▼
    ┌─────────────┐
    │ Adapter     │ (converts interface)
    └────┬────────┘
         │
         ▼
    ┌─────────────────┐
    │ Incompatible    │ (legacy/different interface)
    │ Class/System    │
    └─────────────────┘
```

## Scenario: Konwersja Formatów Danych

Wyobraź sobie, że masz system, który:

- Otrzymuje dane w **JSON** z API
- Musi wysłać dane w **XML** do legacy'owego systemu
- Chce zapisać dane w **CSV** dla Excel'a

**Problemy bez Adapter:**

- Kod byłby pełen `if/switch` statements dla każdego formatu
- Zmiana na nowy format wymagałaby modyfikacji kodu
- Logika konwersji byłaby rozproszona

**Rozwiązanie z Adapter:**

- Każdy format ma swój Adapter implementujący wspólny interfejs
- Wszystkie adaptery konwertują `do/z` znormalizowanej struktury
- Nowy format = nowy Adapter, bez zmian w istniejącym kodzie

## Komponenty

### 1. **DataObject Interface**

Znormalizowana reprezentacja danych:

```typescript
interface DataObject {
  [key: string]: string | number | boolean | DataObject | DataObject[];
}
```

### 2. **DataAdapter Interface**

Definiuje kontrakt dla wszystkich adapterów:

```typescript
interface DataAdapter {
  toDataObject(data: string): DataObject; // Format → Normalized
  fromDataObject(obj: DataObject): string; // Normalized → Format
  getName(): string;
}
```

### 3. **Konkretne Adaptery**

Każdy format ma swoją implementację:

- **JSONAdapter**: Parsuje/Generuje JSON
- **XMLAdapter**: Parsuje/Generuje XML
- **CSVAdapter**: Parsuje/Generuje CSV

### 4. **DataConverter - Manager**

Zarządza konwersją przy użyciu adapterów:

- `convert(inputData, fromFormat, toFormat)`: Konwertuj dane
- `getConversionCount()`: Licznik operacji
- `getLastAdapter()`: Ostatnio użyty adapter

## Co Implementujesz

### Krok 1: DataObject i DataAdapter Interface

```typescript
interface DataObject {
  [key: string]: string | number | boolean | DataObject | DataObject[];
}

interface DataAdapter {
  toDataObject(data: string): DataObject;
  fromDataObject(obj: DataObject): string;
  getName(): string;
}
```

🎯 **Dlaczego?** Definiuje kontrakt dla wszystkich formatów

### Krok 2: JSONAdapter

```typescript
class JSONAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    return JSON.parse(data);
  }

  fromDataObject(obj: DataObject): string {
    return JSON.stringify(obj, null, 2);
  }

  getName(): string {
    return 'JSONAdapter';
  }
}
```

📝 **Dlaczego?** Adapta dla Format u JSON

### Krok 3: XMLAdapter

```typescript
class XMLAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    // Parsuj XML → DataObject
  }

  fromDataObject(obj: DataObject): string {
    // Buduj XML z DataObject
  }
}
```

📦 **Dlaczego?** Adapter dla formatu XML

### Krok 4: CSVAdapter

```typescript
class CSVAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    // Parsuj CSV → DataObject
  }

  fromDataObject(obj: DataObject): string {
    // Buduj CSV z DataObject
  }
}
```

📊 **Dlaczego?** Adapter dla formatu CSV

### Krok 5: DataConverter Manager

```typescript
class DataConverter {
  private adapters: Map<DataFormat, DataAdapter> = new Map([
    [DataFormat.JSON, new JSONAdapter()],
    [DataFormat.XML, new XMLAdapter()],
    [DataFormat.CSV, new CSVAdapter()],
  ]);

  convert(input: string, from: DataFormat, to: DataFormat): string {
    const normalized = this.adapters.get(from)?.toDataObject(input);
    return this.adapters.get(to)?.fromDataObject(normalized!);
  }
}
```

🔄 **Dlaczego?** Orchestruje konwersję między formatami

## Praktyczne Zastosowania

1. **Import/Export Systemów** - CSV → JSON → Database
2. **API Integracje** - REST JSON ↔ SOAP XML
3. **Legacy System Integration** - Nowy system ↔ Stary format
4. **Data Migration** - Konwersja między różnymi bazami danych
5. **File Format Conversion** - Excel, PDF, JSON konwertery
6. **Middleware** - Konwersja między protokołami

## Dlaczego Adapter?

### ✅ Zalety

- **Elastyczność**: Łatwe dodawanie nowych formatów
- **Separation of Concerns**: Każdy format w osobnej klasie
- **Reusability**: Adaptery mogą być ponownie użyte
- **SOLID**: Open/Closed Principle - otwarte na rozszerzenie
- **Single Responsibility**: Każdy adapter odpowiada za jeden format

### ⚠️ Wady

- **Więcej klas**: Każdy format = nowa klasa
- **Komplikacja**: Dla prostych konwersji może być overkill
- **Performance**: Dodatkowa abstrakcja = szybkość

## Porównanie: Bez Adapter vs Z Adapter

### ❌ Bez Adapter (Spaghetti Code)

```typescript
function convert(data: string, from: string, to: string) {
  if (from === 'json' && to === 'xml') {
    // Logika konwersji JSON → XML
  } else if (from === 'json' && to === 'csv') {
    // Logika konwersji JSON → CSV
  } else if (from === 'xml' && to === 'json') {
    // Logika konwersji XML → JSON
  }
  // ... 9 więcej kombinacji! 😱
}
```

### ✅ Z Adapter (Czysty kod)

```typescript
const converter = new DataConverter();
const result = converter.convert(data, 'json', 'xml');
// Nowy format? Dodaj nowy Adapter, bez zmian w DataConverter!
```

## Jak Uruchomić

```bash
npm install
npm run dev

# Przejdź do: http://localhost:5173/patterns/structural/data-converter-adapter/
```

## Wzorzec w Praktyce

1. ➡️ Wybierz format wejścia (JSON, XML, CSV)
2. ➡️ Wklej lub załaduj dane przykładowe
3. ➡️ Wybierz format wyjścia
4. ➡️ Kliknij "Konwertuj"
5. ➡️ Zobaczysz dane w nowym formacie
6. ➡️ Skopiuj do schowka lub wyczyść

## Wniosek

Wzorzec Adapter to eleganckie rozwiązanie dla:

- 🔄 Konwersji między formatami
- 🔌 Integracji niezgodnych interfejsów
- 🔐 Izolacji logiki konwersji
- 📈 Łatwego dodawania nowych formatów

Pozwala systemom współpracować bez znania o sobie.

---

📚 **Materiały Dodatkowe:**

- [Refactoring.Guru - Adapter](https://refactoring.guru/design-patterns/adapter)
- [MDN - Data Conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [SOLID - Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle)
