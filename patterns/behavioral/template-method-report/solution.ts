/**
 * WZORZEC TEMPLATE METHOD - Implementacja
 */

// ============================================
// 1. ABSTRACT TEMPLATE CLASS
// ============================================
abstract class ReportGenerator {
  // Template method - określa strukturę
  generateReport(data: any): string {
    let result = '';
    result += this.header();
    result += this.body(data);
    result += this.footer();
    return result;
  }

  protected abstract header(): string;
  protected abstract body(data: any): string;
  protected abstract footer(): string;
}

// ============================================
// 2. CONCRETE IMPLEMENTATIONS
// ============================================
class HTMLReport extends ReportGenerator {
  protected header(): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Raport HTML</title>
        <style>
          body { font-family: Arial; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
        </style>
      </head>
      <body>
      <h1>Raport HTML</h1>
    `;
  }

  protected body(data: any): string {
    let result = '<table><tr><th>Produkt</th><th>Cena</th><th>Ilość</th><th>Razem</th></tr>';
    for (const item of data) {
      const total = item.price * item.quantity;
      result += `<tr><td>${item.name}</td><td>${item.price}</td><td>${item.quantity}</td><td>${total}</td></tr>`;
    }
    result += '</table>';
    return result;
  }

  protected footer(): string {
    return `
      </body>
      </html>
    `;
  }
}

class CSVReport extends ReportGenerator {
  protected header(): string {
    return 'Produkt,Cena,Ilość,Razem\n';
  }

  protected body(data: any): string {
    let result = '';
    for (const item of data) {
      const total = item.price * item.quantity;
      result += `${item.name},${item.price},${item.quantity},${total}\n`;
    }
    return result;
  }

  protected footer(): string {
    return '--- Koniec raportu ---\n';
  }
}

class JSONReport extends ReportGenerator {
  protected header(): string {
    return '{\n  "raport": {\n';
  }

  protected body(data: any): string {
    let result = '    "items": [\n';
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const total = item.price * item.quantity;
      result += `      { "name": "${item.name}", "price": ${item.price}, "quantity": ${item.quantity}, "total": ${total} }`;
      if (i < data.length - 1) result += ',\n';
      else result += '\n';
    }
    result += '    ]\n';
    return result;
  }

  protected footer(): string {
    return '  }\n}';
  }
}

// ============================================
// 3. UI HELPERS
// ============================================
const sampleData = [
  { name: 'Laptop', price: 5000, quantity: 2 },
  { name: 'Mysz', price: 100, quantity: 5 },
  { name: 'Klawiatura', price: 300, quantity: 3 },
];

function generateReport(format: string): string {
  let generator: ReportGenerator;

  switch (format) {
    case 'html':
      generator = new HTMLReport();
      break;
    case 'csv':
      generator = new CSVReport();
      break;
    case 'json':
      generator = new JSONReport();
      break;
    default:
      generator = new HTMLReport();
  }

  return generator.generateReport(sampleData);
}

function displayReport(format: string): void {
  const report = generateReport(format);
  const output = document.getElementById('output');

  if (!output) return;

  if (format === 'html') {
    output.innerHTML = report;
  } else {
    output.innerHTML = `<pre>${escapeHtml(report)}</pre>`;
  }
}

function escapeHtml(text: string): string {
  const map: {
    [key: string]: string;
  } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ============================================
// 4. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const htmlBtn = document.getElementById('html-btn') as HTMLButtonElement;
  const csvBtn = document.getElementById('csv-btn') as HTMLButtonElement;
  const jsonBtn = document.getElementById('json-btn') as HTMLButtonElement;

  if (htmlBtn) htmlBtn.addEventListener('click', () => displayReport('html'));
  if (csvBtn) csvBtn.addEventListener('click', () => displayReport('csv'));
  if (jsonBtn) jsonBtn.addEventListener('click', () => displayReport('json'));

  // Display HTML by default
  displayReport('html');
});
