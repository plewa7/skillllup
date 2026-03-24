/**
 * WZORZEC BUILDER - Implementacja
 *
 * Zadanie:
 * Stwórz konstruktor formularzy z fluent interface:
 * 1. Interface FormField definiuje pole formularza
 * 2. FormBuilder implementuje fluent pattern
 * 3. Każda metoda dodająca pole zwraca this (chaining)
 * 4. build() metoda zwraca ostateczny FormConfig
 * 5. FormRenderer generuje HTML z FormConfig
 */

// ============================================
// 1. INTERFEJSY I TYPY
// ============================================

// ZAIMPLEMENTUJ: Type dla typów pól
type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'textarea';

// ZAIMPLEMENTUJ: Interface dla pojedynczego pola
interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  value?: string;
  options?: string[]; // Dla select pól
  rows?: number; // Dla textarea
}

// ZAIMPLEMENTUJ: Interface dla konfiguracji formularza
interface FormConfig {
  name: string;
  fields: FormField[];
  submitButtonText: string;
}

// ============================================
// 2. FORM BUILDER - FLUENT INTERFACE
// ============================================
class FormBuilder {
  // ZAIMPLEMENTUJ: Przechowuj pola formularza
  private fields: FormField[] = [];

  // ZAIMPLEMENTUJ: Przechowuj nazwę formularza
  private formName: string;

  // ZAIMPLEMENTUJ: Counter dla ID pól
  private fieldCounter: number = 0;

  // ZAIMPLEMENTUJ: Konstruktor z nazwą formularza
  constructor(formName: string) {
    this.formName = formName;
  }

  // ZAIMPLEMENTUJ: Dodaj pole text
  addTextField(name: string, label: string, placeholder?: string): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'text',
      required: false,
      placeholder,
    });
    return this; // Fluent: zwróć this dla chainingu
  }

  // ZAIMPLEMENTUJ: Dodaj pole email
  addEmailField(name: string, label: string): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'email',
      required: false,
    });
    return this;
  }

  // ZAIMPLEMENTUJ: Dodaj pole number
  addNumberField(name: string, label: string): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'number',
      required: false,
    });
    return this;
  }

  // ZAIMPLEMENTUJ: Dodaj pole select
  addSelectField(name: string, label: string, options: string[]): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'select',
      required: false,
      options,
    });
    return this;
  }

  // ZAIMPLEMENTUJ: Dodaj pole checkbox
  addCheckboxField(name: string, label: string): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'checkbox',
      required: false,
    });
    return this;
  }

  // ZAIMPLEMENTUJ: Dodaj pole textarea
  addTextareaField(name: string, label: string, rows?: number): FormBuilder {
    this.fields.push({
      id: `field_${++this.fieldCounter}`,
      name,
      label,
      type: 'textarea',
      required: false,
      rows: rows || 4,
    });
    return this;
  }

  // ZAIMPLEMENTUJ: Ustaw ostatnie pole jako required
  setRequired(required: boolean = true): FormBuilder {
    if (this.fields.length > 0) {
      this.fields[this.fields.length - 1].required = required;
    }
    return this;
  }

  // ZAIMPLEMENTUJ: Ustaw wartość ostatniego pola
  withValue(value: string): FormBuilder {
    if (this.fields.length > 0) {
      this.fields[this.fields.length - 1].value = value;
    }
    return this;
  }

  // ZAIMPLEMENTUJ: Ustaw placeholder dla ostatniego pola
  withPlaceholder(placeholder: string): FormBuilder {
    if (this.fields.length > 0) {
      this.fields[this.fields.length - 1].placeholder = placeholder;
    }
    return this;
  }

  // ZAIMPLEMENTUJ: Usuń pole po ID
  removeField(fieldId: string): FormBuilder {
    this.fields = this.fields.filter((f) => f.id !== fieldId);
    return this;
  }

  // ZAIMPLEMENTUJ: Wyczyść wszystkie pola
  clear(): FormBuilder {
    this.fields = [];
    this.fieldCounter = 0;
    return this;
  }

  // ZAIMPLEMENTUJ: Zwróć liczbę pól
  getFieldCount(): number {
    return this.fields.length;
  }

  // ZAIMPLEMENTUJ: Zwróć liczbę wymaganych pól
  getRequiredCount(): number {
    return this.fields.filter((f) => f.required).length;
  }

  // ZAIMPLEMENTUJ: Zbuduj ostateczny FormConfig (budowanie obiektu)
  build(): FormConfig {
    return {
      name: this.formName,
      fields: this.fields,
      submitButtonText: 'Wyślij',
    };
  }

  // ZAIMPLEMENTUJ: Zwróć bieżące pola
  getFields(): FormField[] {
    return this.fields;
  }
}

// ============================================
// 3. FORM RENDERER - GENEROWANIE HTML
// ============================================
class FormRenderer {
  // ZAIMPLEMENTUJ: Renderuj FormConfig do HTML
  static render(config: FormConfig): string {
    let html = `<div class="preview-form" data-form-name="${config.name}">`;

    for (const field of config.fields) {
      html += FormRenderer.renderField(field);
    }

    html += `<button class="submit-btn">${config.submitButtonText}</button></div>`;
    return html;
  }

  // ZAIMPLEMENTUJ: Renderuj Individual Field
  private static renderField(field: FormField): string {
    const requiredAttr = field.required ? 'required' : '';
    const requiredClass = field.required ? 'required' : '';

    switch (field.type) {
      case 'text':
        return `<div class="preview-field ${requiredClass}">
          <label for="${field.id}">${field.label}</label>
          <input
            type="text"
            id="${field.id}"
            name="${field.name}"
            placeholder="${field.placeholder || ''}"
            ${requiredAttr}
          />
        </div>`;

      case 'email':
        return `<div class="preview-field ${requiredClass}">
          <label for="${field.id}">${field.label}</label>
          <input
            type="email"
            id="${field.id}"
            name="${field.name}"
            ${requiredAttr}
          />
        </div>`;

      case 'number':
        return `<div class="preview-field ${requiredClass}">
          <label for="${field.id}">${field.label}</label>
          <input
            type="number"
            id="${field.id}"
            name="${field.name}"
            ${requiredAttr}
          />
        </div>`;

      case 'select':
        const options = (field.options || [])
          .map((opt) => `<option value="${opt}">${opt}</option>`)
          .join('');
        return `<div class="preview-field ${requiredClass}">
          <label for="${field.id}">${field.label}</label>
          <select id="${field.id}" name="${field.name}" ${requiredAttr}>
            <option value="">-- Wybierz --</option>
            ${options}
          </select>
        </div>`;

      case 'checkbox':
        return `<div class="preview-field">
          <label for="${field.id}">
            <input
              type="checkbox"
              id="${field.id}"
              name="${field.name}"
              ${requiredAttr}
            />
            ${field.label}
          </label>
        </div>`;

      case 'textarea':
        return `<div class="preview-field ${requiredClass}">
          <label for="${field.id}">${field.label}</label>
          <textarea
            id="${field.id}"
            name="${field.name}"
            rows="${field.rows || 4}"
            ${requiredAttr}
          ></textarea>
        </div>`;

      default:
        return '';
    }
  }
}

// ============================================
// 4. FORM MANAGER - ORCHESTRATOR
// ============================================
class FormManager {
  // ZAIMPLEMENTUJ: Przechowuj builder
  private builder: FormBuilder;

  // ZAIMPLEMENTUJ: Przechowuj liczbę build operacji
  private buildCount: number = 0;

  // ZAIMPLEMENTUJ: Przechowuj ostatnią konfigurację
  private lastConfig: FormConfig | null = null;

  // ZAIMPLEMENTUJ: Konstruktor
  constructor(formName: string = 'Mój formularz') {
    this.builder = new FormBuilder(formName);
  }

  // ZAIMPLEMENTUJ: Zwróć builder dla chainingu
  getBuilder(): FormBuilder {
    return this.builder;
  }

  // ZAIMPLEMENTUJ: Zbuduj i zwróć config
  build(): FormConfig {
    this.lastConfig = this.builder.build();
    this.buildCount++;
    return this.lastConfig;
  }

  // ZAIMPLEMENTUJ: Zrenuruj formularz do HTML
  renderForm(): string {
    const config = this.build();
    return FormRenderer.render(config);
  }

  // ZAIMPLEMENTUJ: Zwróć JSON konfiguracji
  toJSON(): string {
    const config = this.lastConfig || this.build();
    return JSON.stringify(config, null, 2);
  }

  // ZAIMPLEMENTUJ: Zresetuj builder
  reset(newFormName?: string): void {
    this.builder.clear();
    if (newFormName) {
      this.builder = new FormBuilder(newFormName);
    } else {
      this.builder = new FormBuilder('Mój formularz');
    }
    this.lastConfig = null;
  }

  // ZAIMPLEMENTUJ: Zwróć liczbę build operacji
  getBuildCount(): number {
    return this.buildCount;
  }
}

// ============================================
// 5. INICJALIZACJA APLIKACJI
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // ZAIMPLEMENTUJ: Pobierz elementy z DOM
  const formName = document.getElementById('formName') as HTMLInputElement;
  const fieldsList = document.getElementById('fieldsList') as HTMLElement;
  const preview = document.getElementById('preview') as HTMLElement;
  const jsonOutput = document.getElementById('jsonOutput') as HTMLElement;
  const fieldCount = document.getElementById('fieldCount') as HTMLElement;
  const requiredCount = document.getElementById('requiredCount') as HTMLElement;
  const buildCount = document.getElementById('buildCount') as HTMLElement;
  const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
  const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

  // ZAIMPLEMENTUJ: Stwórz FormManager
  const formManager = new FormManager('Mój formularz');

  // ZAIMPLEMENTUJ: Funkcja do aktualizacji UI
  const update = (): void => {
    const builder = formManager.getBuilder();
    const fields = builder.getFields();

    // ZAIMPLEMENTUJ: Aktualizuj listę pól
    if (fields.length === 0) {
      fieldsList.innerHTML = '<div class="empty-state">Brak pól - rozpocznij dodawaniem!</div>';
    } else {
      fieldsList.innerHTML = fields
        .map(
          (field) =>
            `<div class="field-item">
          <div class="field-item-info">
            <div class="field-item-name">${field.label}</div>
            <div class="field-item-type">${field.type}</div>
          </div>
          ${field.required ? '<div class="field-item-required">wymagane</div>' : ''}
          <button class="remove-btn" onclick="window.removeField('${field.id}')">✕</button>
        </div>`
        )
        .join('');
    }

    // ZAIMPLEMENTUJ: Aktualizuj podgląd
    if (fields.length === 0) {
      preview.innerHTML = '<div class="empty-state">Podgląd formularza pojawi się tutaj</div>';
    } else {
      const config = {
        name: formName.value || 'Mój formularz',
        fields: fields,
        submitButtonText: 'Wyślij',
      };
      preview.innerHTML = FormRenderer.render(config);
    }

    // ZAIMPLEMENTUJ: Aktualizuj JSON
    const config = formManager.build();
    jsonOutput.textContent = JSON.stringify(config, null, 2);

    // ZAIMPLEMENTUJ: Aktualizuj statystyki
    fieldCount.textContent = builder.getFieldCount().toString();
    requiredCount.textContent = builder.getRequiredCount().toString();
    buildCount.textContent = formManager.getBuildCount().toString();
  };

  // ZAIMPLEMENTUJ: Globalna funkcja do usuwania pola
  (window as any).removeField = (fieldId: string) => {
    formManager.getBuilder().removeField(fieldId);
    update();
  };

  // ZAIMPLEMENTUJ: Add field buttons
  document.getElementById('addTextBtn')?.addEventListener('click', () => {
    formManager
      .getBuilder()
      .addTextField('field', 'Pole tekstowe', 'Wpisz tekst')
      .setRequired(false);
    update();
  });

  document.getElementById('addEmailBtn')?.addEventListener('click', () => {
    formManager.getBuilder().addEmailField('email', 'Email').setRequired(false);
    update();
  });

  document.getElementById('addNumberBtn')?.addEventListener('click', () => {
    formManager.getBuilder().addNumberField('number', 'Liczba').setRequired(false);
    update();
  });

  document.getElementById('addSelectBtn')?.addEventListener('click', () => {
    formManager
      .getBuilder()
      .addSelectField('select', 'Wybierz opcję', ['Opcja 1', 'Opcja 2', 'Opcja 3'])
      .setRequired(false);
    update();
  });

  document.getElementById('addCheckboxBtn')?.addEventListener('click', () => {
    formManager.getBuilder().addCheckboxField('checkbox', 'Wyrażam zgodę').setRequired(false);
    update();
  });

  document.getElementById('addTextareaBtn')?.addEventListener('click', () => {
    formManager.getBuilder().addTextareaField('textarea', 'Wiadomość', 4).setRequired(false);
    update();
  });

  // ZAIMPLEMENTUJ: Copy button
  copyBtn.addEventListener('click', () => {
    const json = JSON.stringify(formManager.build(), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert('✅ JSON skopiowano do schowka!');
    });
  });

  // ZAIMPLEMENTUJ: Reset button
  resetBtn.addEventListener('click', () => {
    formManager.reset(formName.value || 'Mój formularz');
    update();
  });

  // ZAIMPLEMENTUJ: Form name change listener
  formName.addEventListener('change', update);

  // ZAIMPLEMENTUJ: Inicjalizuj UI
  update();
});
