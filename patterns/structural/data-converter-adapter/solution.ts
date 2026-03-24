/**
 * WZORZEC ADAPTER - Implementacja
 *
 * Zadanie:
 * Stwórz konwerter danych między formatami (JSON, XML, CSV):
 * 1. Interface DataAdapter definiuje konwersję
 * 2. Każdy format (JSON, XML, CSV) implementuje DataAdapter
 * 3. Klasa DataConverter używa adapterów do konwersji
 * 4. Aplikacja dynamicznie wybiera adapter na podstawie formatu
 */

// ============================================
// 1. INTERFEJSY I TYPY
// ============================================

// ZAIMPLEMENTUJ: Interface definiujący strukturę znormalizowanych danych
interface DataObject {
  [key: string]: string | number | boolean | DataObject | DataObject[];
}

// ZAIMPLEMENTUJ: Enum dla wspieranych formatów
enum DataFormat {
  JSON = 'json',
  XML = 'xml',
  CSV = 'csv',
}

// ============================================
// 2. ADAPTER INTERFACE
// ============================================
interface DataAdapter {
  // ZAIMPLEMENTUJ: Konwertuj z formatu do znormalizowanego obiektu
  toDataObject(data: string): DataObject;

  // ZAIMPLEMENTUJ: Konwertuj ze znormalizowanego obiektu do formatu
  fromDataObject(obj: DataObject): string;

  // ZAIMPLEMENTUJ: Zwróć nazwę adaptera
  getName(): string;
}

// ============================================
// 3. KONKRETNE ADAPTERY
// ============================================

// ZAIMPLEMENTUJ: JSONAdapter - konwersja JSON
class JSONAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    // ZAIMPLEMENTUJ: Parsuj JSON string
    return JSON.parse(data);
  }

  fromDataObject(obj: DataObject): string {
    // ZAIMPLEMENTUJ: Konwertuj obiekt na pretty-printed JSON
    return JSON.stringify(obj, null, 2);
  }

  getName(): string {
    return 'JSONAdapter';
  }
}

// ZAIMPLEMENTUJ: XMLAdapter - konwersja XML
class XMLAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    // ZAIMPLEMENTUJ: Parsuj XML string do obiektu
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'text/xml');

    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Invalid XML format');
    }

    return this.xmlNodeToObject(xmlDoc.documentElement);
  }

  fromDataObject(obj: DataObject): string {
    // ZAIMPLEMENTUJ: Konwertuj obiekt do XML string'a
    const xml = this.objectToXmlNode(obj, 'data');
    return this.formatXml(xml.outerHTML);
  }

  getName(): string {
    return 'XMLAdapter';
  }

  // Helper do konwersji XML na obiekt
  private xmlNodeToObject(node: Element): DataObject {
    const obj: DataObject = {};

    if (node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        obj[`@${attr.name}`] = attr.value;
      }
    }

    const children: { [key: string]: Element[] } = {};
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (!children[child.tagName]) {
        children[child.tagName] = [];
      }
      children[child.tagName].push(child);
    }

    for (const [tagName, elements] of Object.entries(children)) {
      if (elements.length === 1) {
        obj[tagName] = this.xmlNodeToObject(elements[0]);
      } else {
        obj[tagName] = elements.map((el) => this.xmlNodeToObject(el));
      }
    }

    const text = node.textContent?.trim();
    if (Object.keys(obj).length === 0 && text) {
      return text;
    }

    return obj;
  }

  // Helper do konwersji obiektu na XML
  private objectToXmlNode(obj: DataObject, tagName: string): Element {
    const element = document.createElement(tagName);

    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith('@')) {
        element.setAttribute(key.substring(1), String(value));
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          for (const item of value) {
            element.appendChild(this.objectToXmlNode(item as DataObject, key));
          }
        } else {
          element.appendChild(this.objectToXmlNode(value as DataObject, key));
        }
      } else {
        const child = document.createElement(key);
        child.textContent = String(value);
        element.appendChild(child);
      }
    }

    return element;
  }

  // Pretty-format XML
  private formatXml(xml: string): string {
    let formatted = '';
    let indent = 0;
    const tab = '  ';

    for (let i = 0; i < xml.length; i++) {
      const char = xml[i];

      if (char === '<') {
        const endTag = i + 1 < xml.length && xml[i + 1] === '/';
        if (!endTag && formatted.endsWith('>') && formatted.trim()) {
          formatted += '\n' + tab.repeat(indent);
        } else if (endTag) {
          indent = Math.max(0, indent - 1);
          formatted += '\n' + tab.repeat(indent);
        } else if (formatted.endsWith('>')) {
          formatted += '\n' + tab.repeat(indent);
        }
        formatted += char;
        if (!endTag && !xml.substring(i).startsWith('<?')) {
          indent++;
        }
      } else if (char === '>' && i + 1 < xml.length && xml[i + 1] !== '<') {
        formatted += char;
      } else {
        formatted += char;
      }
    }

    return formatted.trim();
  }
}

// ZAIMPLEMENTUJ: CSVAdapter - konwersja CSV
class CSVAdapter implements DataAdapter {
  toDataObject(data: string): DataObject {
    // ZAIMPLEMENTUJ: Parsuj CSV do obiektu
    const lines = data.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('Invalid CSV format: need at least header and one data row');
    }

    const headers = this.parseCsvLine(lines[0]);
    const rows: DataObject[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCsvLine(lines[i]);
      const row: DataObject = {};
      for (let j = 0; j < headers.length; j++) {
        row[headers[j]] = values[j] || '';
      }
      rows.push(row);
    }

    return { rows };
  }

  fromDataObject(obj: DataObject): string {
    // ZAIMPLEMENTUJ: Konwertuj obiekt do CSV string'a
    if (!obj.rows || !Array.isArray(obj.rows) || obj.rows.length === 0) {
      throw new Error('Invalid data object for CSV conversion');
    }

    const rows = obj.rows as DataObject[];
    const headers = Object.keys(rows[0]);

    let csv = this.escapeCsvLine(headers) + '\n';

    for (const row of rows) {
      const values = headers.map((header) => String(row[header] || ''));
      csv += this.escapeCsvLine(values) + '\n';
    }

    return csv.trim();
  }

  getName(): string {
    return 'CSVAdapter';
  }

  // Helper do parsowania linii CSV
  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  }

  // Helper do escapowania linii CSV
  private escapeCsvLine(values: string[]): string {
    return values
      .map((value) => {
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(',');
  }
}

// ============================================
// 4. DATA CONVERTER - MANAGER KONWERSJI
// ============================================
class DataConverter {
  // ZAIMPLEMENTUJ: Mapa adapterów dostępnych dla każdego formatu
  private adapters: Map<DataFormat, DataAdapter> = new Map([
    [DataFormat.JSON, new JSONAdapter()],
    [DataFormat.XML, new XMLAdapter()],
    [DataFormat.CSV, new CSVAdapter()],
  ]);

  // ZAIMPLEMENTUJ: Licznik konwersji
  private conversionCount: number = 0;

  // ZAIMPLEMENTUJ: Ostatnio użyty adapter
  private lastAdapter: DataAdapter | null = null;

  // ZAIMPLEMENTUJ: Konwertuj dane z jednego formatu na drugi
  convert(inputData: string, fromFormat: DataFormat, toFormat: DataFormat): string {
    // ZAIMPLEMENTUJ: Pobierz adaptery
    const fromAdapter = this.adapters.get(fromFormat);
    const toAdapter = this.adapters.get(toFormat);

    if (!fromAdapter || !toAdapter) {
      throw new Error(`Unsupported format conversion`);
    }

    // ZAIMPLEMENTUJ: Konwertuj na normalną strukturę
    const normalized = fromAdapter.toDataObject(inputData);

    // ZAIMPLEMENTUJ: Konwertuj ze struktury na docelowy format
    const result = toAdapter.fromDataObject(normalized);

    // ZAIMPLEMENTUJ: Zaktualizuj licznik
    this.conversionCount++;
    this.lastAdapter = toAdapter;

    return result;
  }

  // ZAIMPLEMENTUJ: Getter na liczbę konwersji
  getConversionCount(): number {
    return this.conversionCount;
  }

  // ZAIMPLEMENTUJ: Getter na ostatnio użyty adapter
  getLastAdapter(): DataAdapter | null {
    return this.lastAdapter;
  }

  // ZAIMPLEMENTUJ: Reset licznika
  resetCount(): void {
    this.conversionCount = 0;
    this.lastAdapter = null;
  }
}

// ============================================
// 5. SAMPLE DANE
// ============================================
const SAMPLE_JSON = JSON.stringify(
  {
    employees: [
      { id: 1, name: 'John Doe', email: 'john@example.com', salary: 50000 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', salary: 60000 },
    ],
  },
  null,
  2
);

const SAMPLE_XML = `<?xml version="1.0"?>
<data>
  <employees>
    <employee>
      <id>1</id>
      <name>John Doe</name>
      <email>john@example.com</email>
      <salary>50000</salary>
    </employee>
    <employee>
      <id>2</id>
      <name>Jane Smith</name>
      <email>jane@example.com</email>
      <salary>60000</salary>
    </employee>
  </employees>
</data>`;

const SAMPLE_CSV = `id,name,email,salary
1,John Doe,john@example.com,50000
2,Jane Smith,jane@example.com,60000`;

// ============================================
// 6. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ZAIMPLEMENTUJ: Pobierz elementy z DOM
  const dataInput = document.getElementById('dataInput') as HTMLTextAreaElement;
  const dataOutput = document.getElementById('dataOutput') as HTMLTextAreaElement;
  const inputFormat = document.getElementById('inputFormat') as HTMLSelectElement;
  const outputFormat = document.getElementById('outputFormat') as HTMLSelectElement;
  const convertBtn = document.getElementById('convertBtn') as HTMLButtonElement;
  const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
  const conversionCount = document.getElementById('conversionCount') as HTMLElement;
  const adapterUsed = document.getElementById('adapterUsed') as HTMLElement;
  const errorMsg = document.getElementById('errorMsg') as HTMLElement;
  const successMsg = document.getElementById('successMsg') as HTMLElement;
  const sampleJsonBtn = document.getElementById('sampleJsonBtn') as HTMLButtonElement;
  const sampleXmlBtn = document.getElementById('sampleXmlBtn') as HTMLButtonElement;
  const sampleCsvBtn = document.getElementById('sampleCsvBtn') as HTMLButtonElement;

  // ZAIMPLEMENTUJ: Stwórz konwerter
  const converter = new DataConverter();

  // ZAIMPLEMENTUJ: Funkcja do wyświetlenia komunikatu
  const showMessage = (message: string, isError: boolean = false) => {
    const msgElement = isError ? errorMsg : successMsg;
    const otherElement = isError ? successMsg : errorMsg;

    msgElement.textContent = message;
    msgElement.style.display = 'block';
    otherElement.style.display = 'none';

    setTimeout(() => {
      msgElement.style.display = 'none';
    }, 3000);
  };

  // ZAIMPLEMENTUJ: Funkcja do aktualizacji liczników
  const updateStats = () => {
    conversionCount.textContent = converter.getConversionCount().toString();
    const adapter = converter.getLastAdapter();
    adapterUsed.textContent = adapter ? adapter.getName() : '-';
  };

  // ZAIMPLEMENTUJ: Convert button
  convertBtn.addEventListener('click', () => {
    try {
      if (!dataInput.value.trim()) {
        showMessage('Wklej dane przed konwersją!', true);
        return;
      }

      const result = converter.convert(
        dataInput.value,
        inputFormat.value as DataFormat,
        outputFormat.value as DataFormat
      );

      dataOutput.value = result;
      updateStats();
      showMessage('✅ Konwersja udana!');
    } catch (error) {
      showMessage(`❌ Błąd: ${error instanceof Error ? error.message : 'Unknown error'}`, true);
    }
  });

  // ZAIMPLEMENTUJ: Copy button
  copyBtn.addEventListener('click', () => {
    if (!dataOutput.value) {
      showMessage('Brak danych do skopiowania!', true);
      return;
    }

    navigator.clipboard.writeText(dataOutput.value).then(() => {
      showMessage('📋 Skopiowano do schowka!');
    });
  });

  // ZAIMPLEMENTUJ: Clear button
  clearBtn.addEventListener('click', () => {
    dataInput.value = '';
    dataOutput.value = '';
    converter.resetCount();
    updateStats();
    showMessage('🗑️ Wyczyszczono!');
  });

  // ZAIMPLEMENTUJ: Sample data buttons
  sampleJsonBtn.addEventListener('click', () => {
    dataInput.value = SAMPLE_JSON;
    inputFormat.value = DataFormat.JSON;
  });

  sampleXmlBtn.addEventListener('click', () => {
    dataInput.value = SAMPLE_XML;
    inputFormat.value = DataFormat.XML;
  });

  sampleCsvBtn.addEventListener('click', () => {
    dataInput.value = SAMPLE_CSV;
    inputFormat.value = DataFormat.CSV;
  });

  // ZAIMPLEMENTUJ: Inicjalizuj liczniki
  updateStats();
});
