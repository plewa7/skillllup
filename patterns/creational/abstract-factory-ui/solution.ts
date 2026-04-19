/**
 * WZORZEC ABSTRACT FACTORY - Implementacja
 */

// ============================================
// 1. ABSTRACT PRODUCTS
// ============================================
interface UIComponent {
  render(): HTMLElement;
  getType(): string;
}

interface Button extends UIComponent {
  setText(text: string): void;
  getText(): string;
  setEnabled(enabled: boolean): void;
}

interface Input extends UIComponent {
  setValue(value: string): void;
  getValue(): string;
  setPlaceholder(placeholder: string): void;
}

interface Label extends UIComponent {
  setText(text: string): void;
  getText(): string;
}

// ============================================
// 2. CONCRETE PRODUCTS - LIGHT THEME
// ============================================
class LightButton implements Button {
  private text: string = 'Button';
  private enabled: boolean = true;

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  render(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.disabled = !this.enabled;
    button.className = 'light-button';
    button.style.cssText = `
      background: white;
      color: #333;
      border: 1px solid #ddd;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    `;
    return button;
  }

  getType(): string {
    return 'Light Button';
  }
}

class LightInput implements Input {
  private value: string = '';
  private placeholder: string = '';

  setValue(value: string): void {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  render(): HTMLElement {
    const input = document.createElement('input');
    input.value = this.value;
    input.placeholder = this.placeholder;
    input.className = 'light-input';
    input.style.cssText = `
      background: white;
      color: #333;
      border: 1px solid #ddd;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: inherit;
    `;
    return input;
  }

  getType(): string {
    return 'Light Input';
  }
}

class LightLabel implements Label {
  private text: string = 'Label';

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  render(): HTMLElement {
    const label = document.createElement('label');
    label.textContent = this.text;
    label.className = 'light-label';
    label.style.cssText = `
      color: #333;
      font-weight: 500;
      font-size: 14px;
    `;
    return label;
  }

  getType(): string {
    return 'Light Label';
  }
}

// ============================================
// 3. CONCRETE PRODUCTS - DARK THEME
// ============================================
class DarkButton implements Button {
  private text: string = 'Button';
  private enabled: boolean = true;

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  render(): HTMLElement {
    const button = document.createElement('button');
    button.textContent = this.text;
    button.disabled = !this.enabled;
    button.className = 'dark-button';
    button.style.cssText = `
      background: #333;
      color: #fff;
      border: 1px solid #555;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    `;
    return button;
  }

  getType(): string {
    return 'Dark Button';
  }
}

class DarkInput implements Input {
  private value: string = '';
  private placeholder: string = '';

  setValue(value: string): void {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  setPlaceholder(placeholder: string): void {
    this.placeholder = placeholder;
  }

  render(): HTMLElement {
    const input = document.createElement('input');
    input.value = this.value;
    input.placeholder = this.placeholder;
    input.className = 'dark-input';
    input.style.cssText = `
      background: #444;
      color: #fff;
      border: 1px solid #666;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: inherit;
    `;
    return input;
  }

  getType(): string {
    return 'Dark Input';
  }
}

class DarkLabel implements Label {
  private text: string = 'Label';

  setText(text: string): void {
    this.text = text;
  }

  getText(): string {
    return this.text;
  }

  render(): HTMLElement {
    const label = document.createElement('label');
    label.textContent = this.text;
    label.className = 'dark-label';
    label.style.cssText = `
      color: #ccc;
      font-weight: 500;
      font-size: 14px;
    `;
    return label;
  }

  getType(): string {
    return 'Dark Label';
  }
}

// ============================================
// 4. ABSTRACT FACTORY
// ============================================
interface UIFactory {
  createButton(): Button;
  createInput(): Input;
  createLabel(): Label;
}

// ============================================
// 5. CONCRETE FACTORIES
// ============================================
class LightThemeFactory implements UIFactory {
  createButton(): Button {
    return new LightButton();
  }

  createInput(): Input {
    return new LightInput();
  }

  createLabel(): Label {
    return new LightLabel();
  }
}

class DarkThemeFactory implements UIFactory {
  createButton(): Button {
    return new DarkButton();
  }

  createInput(): Input {
    return new DarkInput();
  }

  createLabel(): Label {
    return new DarkLabel();
  }
}

// ============================================
// 6. UI APPLICATION
// ============================================
class UIApplication {
  private factory: UIFactory;
  private container: HTMLElement;

  constructor(factory: UIFactory, container: HTMLElement) {
    this.factory = factory;
    this.container = container;
  }

  render(): void {
    this.container.innerHTML = '';

    // Create components using factory
    const label = this.factory.createLabel();
    label.setText('Witaj w aplikacji!');
    this.container.appendChild(label.render());

    this.container.appendChild(document.createElement('br'));
    this.container.appendChild(document.createElement('br'));

    const input = this.factory.createInput();
    input.setPlaceholder('Wpisz swoją nazwę');
    this.container.appendChild(input.render());

    this.container.appendChild(document.createElement('br'));
    this.container.appendChild(document.createElement('br'));

    const button = this.factory.createButton();
    button.setText('Wyślij');
    this.container.appendChild(button.render());
  }

  setTheme(factory: UIFactory): void {
    this.factory = factory;
    this.render();
  }
}

// ============================================
// 7. INICJALIZACJA
// ============================================
let app: UIApplication;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ui-container');
  if (!container) return;

  app = new UIApplication(new LightThemeFactory(), container);
  app.render();

  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      const factory =
        themeSelect.value === 'light' ? new LightThemeFactory() : new DarkThemeFactory();
      app.setTheme(factory);
    });
  }
});
