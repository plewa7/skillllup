/**
 * WZORZEC VISITOR - Implementacja
 */

// ============================================
// 1. VISITOR INTERFACE
// ============================================
interface ShapeVisitor {
  visitCircle(circle: Circle): void;
  visitRectangle(rectangle: Rectangle): void;
  visitTriangle(triangle: Triangle): void;
}

// ============================================
// 2. SHAPE INTERFACE
// ============================================
interface Shape {
  accept(visitor: ShapeVisitor): void;
  getName(): string;
}

// ============================================
// 3. CONCRETE SHAPES
// ============================================
class Circle implements Shape {
  constructor(public radius: number) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitCircle(this);
  }

  getName(): string {
    return 'Okrąg';
  }
}

class Rectangle implements Shape {
  constructor(
    public width: number,
    public height: number
  ) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitRectangle(this);
  }

  getName(): string {
    return 'Prostokąt';
  }
}

class Triangle implements Shape {
  constructor(
    public a: number,
    public b: number,
    public c: number
  ) {}

  accept(visitor: ShapeVisitor): void {
    visitor.visitTriangle(this);
  }

  getName(): string {
    return 'Trójkąt';
  }
}

// ============================================
// 4. CONCRETE VISITORS
// ============================================
class AreaCalculator implements ShapeVisitor {
  private area: number = 0;

  visitCircle(circle: Circle): void {
    this.area = Math.PI * circle.radius * circle.radius;
    addResult(`${circle.getName()}: Pole = ${this.area.toFixed(2)}`);
  }

  visitRectangle(rectangle: Rectangle): void {
    this.area = rectangle.width * rectangle.height;
    addResult(`${rectangle.getName()}: Pole = ${this.area}`);
  }

  visitTriangle(triangle: Triangle): void {
    // Heron's formula
    const s = (triangle.a + triangle.b + triangle.c) / 2;
    this.area = Math.sqrt(s * (s - triangle.a) * (s - triangle.b) * (s - triangle.c));
    addResult(`${triangle.getName()}: Pole = ${this.area.toFixed(2)}`);
  }

  getArea(): number {
    return this.area;
  }
}

class PerimeterCalculator implements ShapeVisitor {
  private perimeter: number = 0;

  visitCircle(circle: Circle): void {
    this.perimeter = 2 * Math.PI * circle.radius;
    addResult(`${circle.getName()}: Obwód = ${this.perimeter.toFixed(2)}`);
  }

  visitRectangle(rectangle: Rectangle): void {
    this.perimeter = 2 * (rectangle.width + rectangle.height);
    addResult(`${rectangle.getName()}: Obwód = ${this.perimeter}`);
  }

  visitTriangle(triangle: Triangle): void {
    this.perimeter = triangle.a + triangle.b + triangle.c;
    addResult(`${triangle.getName()}: Obwód = ${this.perimeter}`);
  }

  getPerimeter(): number {
    return this.perimeter;
  }
}

class ShapeAnalyzer implements ShapeVisitor {
  private analysis: string = '';

  visitCircle(circle: Circle): void {
    const area = Math.PI * circle.radius * circle.radius;
    const circumference = 2 * Math.PI * circle.radius;
    this.analysis = `${circle.getName()}: Promień=${circle.radius}, Pole=${area.toFixed(2)}, Obwód=${circumference.toFixed(2)}`;
    addResult(this.analysis);
  }

  visitRectangle(rectangle: Rectangle): void {
    const area = rectangle.width * rectangle.height;
    const perimeter = 2 * (rectangle.width + rectangle.height);
    this.analysis = `${rectangle.getName()}: Szerokość=${rectangle.width}, Wysokość=${rectangle.height}, Pole=${area}, Obwód=${perimeter}`;
    addResult(this.analysis);
  }

  visitTriangle(triangle: Triangle): void {
    const s = (triangle.a + triangle.b + triangle.c) / 2;
    const area = Math.sqrt(s * (s - triangle.a) * (s - triangle.b) * (s - triangle.c));
    const perimeter = triangle.a + triangle.b + triangle.c;
    this.analysis = `${triangle.getName()}: Boki=${triangle.a},${triangle.b},${triangle.c}, Pole=${area.toFixed(2)}, Obwód=${perimeter}`;
    addResult(this.analysis);
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
function addResult(text: string): void {
  const output = document.getElementById('output');
  if (output) {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.textContent = text;
    output.appendChild(div);
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6), new Triangle(3, 4, 5)];

  const areaBtn = document.getElementById('area-btn') as HTMLButtonElement;
  const perimeterBtn = document.getElementById('perimeter-btn') as HTMLButtonElement;
  const analyzeBtn = document.getElementById('analyze-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  function clearOutput(): void {
    const output = document.getElementById('output');
    if (output) output.innerHTML = '';
  }

  if (areaBtn) {
    areaBtn.addEventListener('click', () => {
      clearOutput();
      const calculator = new AreaCalculator();
      shapes.forEach((shape) => shape.accept(calculator));
    });
  }

  if (perimeterBtn) {
    perimeterBtn.addEventListener('click', () => {
      clearOutput();
      const calculator = new PerimeterCalculator();
      shapes.forEach((shape) => shape.accept(calculator));
    });
  }

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', () => {
      clearOutput();
      const analyzer = new ShapeAnalyzer();
      shapes.forEach((shape) => shape.accept(analyzer));
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearOutput);
  }

  // Show analysis by default
  analyzeBtn?.click();
});
