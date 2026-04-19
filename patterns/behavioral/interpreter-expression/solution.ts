/**
 * WZORZEC INTERPRETER - Implementacja
 */

// ============================================
// 1. INTERFEJSY
// ============================================
interface Expression {
  interpret(): number;
}

// ============================================
// 2. TERMINAL EXPRESSIONS (Liście drzewa)
// ============================================
class Number implements Expression {
  constructor(private value: number) {}

  interpret(): number {
    return this.value;
  }
}

class Variable implements Expression {
  constructor(
    private name: string,
    private context: Map<string, number>
  ) {}

  interpret(): number {
    return this.context.get(this.name) || 0;
  }
}

// ============================================
// 3. NON-TERMINAL EXPRESSIONS (Operacje)
// ============================================
class Add implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() + this.right.interpret();
  }
}

class Subtract implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() - this.right.interpret();
  }
}

class Multiply implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    return this.left.interpret() * this.right.interpret();
  }
}

class Divide implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  interpret(): number {
    const right = this.right.interpret();
    if (right === 0) throw new Error('Division by zero');
    return this.left.interpret() / right;
  }
}

// ============================================
// 4. PARSER
// ============================================
class ExpressionParser {
  private tokens: string[] = [];
  private position: number = 0;
  private context: Map<string, number> = new Map();

  setVariable(name: string, value: number): void {
    this.context.set(name, value);
  }

  parse(expression: string): Expression {
    // Remove spaces and tokenize
    this.tokens = expression.replace(/\s+/g, '').match(/(\d+\.?\d*|[+\-*/()]|[a-zA-Z]\w*)/g) || [];
    this.position = 0;
    return this.parseExpression();
  }

  private parseExpression(): Expression {
    let result = this.parseTerm();

    while (
      this.position < this.tokens.length &&
      (this.tokens[this.position] === '+' || this.tokens[this.position] === '-')
    ) {
      const operator = this.tokens[this.position++];
      const right = this.parseTerm();
      result = operator === '+' ? new Add(result, right) : new Subtract(result, right);
    }

    return result;
  }

  private parseTerm(): Expression {
    let result = this.parseFactor();

    while (
      this.position < this.tokens.length &&
      (this.tokens[this.position] === '*' || this.tokens[this.position] === '/')
    ) {
      const operator = this.tokens[this.position++];
      const right = this.parseFactor();
      result = operator === '*' ? new Multiply(result, right) : new Divide(result, right);
    }

    return result;
  }

  private parseFactor(): Expression {
    const token = this.tokens[this.position];

    if (token === '(') {
      this.position++; // skip (
      const expr = this.parseExpression();
      this.position++; // skip )
      return expr;
    }

    if (!isNaN(Number(token))) {
      this.position++;
      return new Number(Number(token));
    }

    // Variable
    this.position++;
    return new Variable(token, this.context);
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
function displayResult(result: string, value: number): void {
  const resultContainer = document.getElementById('result');
  if (resultContainer) {
    resultContainer.innerHTML = `<strong>${result}</strong> = <span style="color: #667eea; font-size: 24px;">${value}</span>`;
  }
}

function displayHistory(expression: string, result: number): void {
  const historyContainer = document.getElementById('history');
  if (historyContainer) {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `<span>${expression}</span> = <strong>${result}</strong>`;
    historyContainer.insertBefore(item, historyContainer.firstChild);

    // Keep only last 10
    while (historyContainer.children.length > 10) {
      historyContainer.removeChild(historyContainer.lastChild!);
    }
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
let parser: ExpressionParser;

document.addEventListener('DOMContentLoaded', () => {
  parser = new ExpressionParser();

  const input = document.getElementById('expression-input') as HTMLInputElement;
  const submitBtn = document.getElementById('parse-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  submitBtn?.addEventListener('click', () => {
    if (input && input.value.trim()) {
      try {
        const expr = parser.parse(input.value);
        const result = expr.interpret();
        displayResult(input.value, result);
        displayHistory(input.value, result);
      } catch (error: any) {
        displayResult(input.value, NaN);
        alert('Błąd: ' + error.message);
      }
    }
  });

  clearBtn?.addEventListener('click', () => {
    input.value = '';
    const resultContainer = document.getElementById('result');
    if (resultContainer) resultContainer.innerHTML = '';
    const historyContainer = document.getElementById('history');
    if (historyContainer) historyContainer.innerHTML = '';
  });

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitBtn?.click();
    }
  });

  // Demo
  setTimeout(() => {
    const expressions = ['2 + 3', '10 * 2 - 5', '100 / 4 + 5', '(3 + 5) * 2'];
    expressions.forEach((expr, index) => {
      setTimeout(() => {
        input.value = expr;
        submitBtn?.click();
      }, index * 500);
    });
  }, 500);
});
