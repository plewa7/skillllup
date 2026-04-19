/**
 * WZORZEC PROTOTYPE - Implementacja
 */

// ============================================
// 1. PROTOTYPE INTERFACE
// ============================================
interface Prototype {
  clone(): Prototype;
  getInfo(): string;
}

// ============================================
// 2. METADATA CLASS
// ============================================
class Metadata {
  constructor(
    public author: string,
    public tags: string[]
  ) {}

  clone(): Metadata {
    return new Metadata(this.author, [...this.tags]);
  }
}

// ============================================
// 3. CONCRETE PROTOTYPE (Document)
// ============================================
class Document implements Prototype {
  private title: string;
  private content: string;
  private metadata: Metadata;
  private createdAt: Date;
  private cloneCount: number = 0;

  constructor(title: string, content: string, author: string, tags: string[] = []) {
    this.title = title;
    this.content = content;
    this.metadata = new Metadata(author, tags);
    this.createdAt = new Date();
  }

  // Shallow copy
  cloneShallow(): Document {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    clone.cloneCount = this.cloneCount + 1;
    return clone;
  }

  // Deep copy
  clone(): Document {
    const clone = new Document(this.title, this.content, this.metadata.author, this.metadata.tags);
    clone.metadata = this.metadata.clone();
    clone.createdAt = new Date(this.createdAt);
    clone.cloneCount = this.cloneCount + 1;
    return clone;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }

  setContent(content: string): void {
    this.content = content;
  }

  getContent(): string {
    return this.content;
  }

  addTag(tag: string): void {
    this.metadata.tags.push(tag);
  }

  getTags(): string[] {
    return [...this.metadata.tags];
  }

  getAuthor(): string {
    return this.metadata.author;
  }

  getInfo(): string {
    return `Tytuł: ${this.title} | Autor: ${this.metadata.author} | Znaczniki: ${this.metadata.tags.join(', ')} | Klonów: ${this.cloneCount}`;
  }

  getDetailsHTML(): string {
    return `
      <div class="document-details">
        <h3>${this.title}</h3>
        <p><strong>Autor:</strong> ${this.metadata.author}</p>
        <p><strong>Zawartość:</strong> ${this.content}</p>
        <p><strong>Znaczniki:</strong> ${this.metadata.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</p>
        <p><strong>Liczba klonów:</strong> ${this.cloneCount}</p>
        <p><strong>Utworzony:</strong> ${this.createdAt.toLocaleString('pl-PL')}</p>
      </div>
    `;
  }
}

// ============================================
// 4. PROTOTYPE REGISTRY
// ============================================
class PrototypeRegistry {
  private prototypes: Map<string, Prototype> = new Map();

  register(name: string, prototype: Prototype): void {
    this.prototypes.set(name, prototype);
  }

  unregister(name: string): void {
    this.prototypes.delete(name);
  }

  getClone(name: string): Prototype | null {
    const prototype = this.prototypes.get(name);
    if (prototype instanceof Document) {
      return prototype.clone();
    }
    return prototype ? prototype.clone() : null;
  }

  listPrototypes(): string[] {
    return Array.from(this.prototypes.keys());
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
let registry: PrototypeRegistry;
let documents: Map<string, Document> = new Map();
let counter = 0;

function addDocument(doc: Document, name: string): void {
  const id = `doc-${counter++}`;
  documents.set(id, doc);
  displayDocument(doc, id);
}

function displayDocument(doc: Document, id: string): void {
  const listDiv = document.getElementById('documents-list');
  if (!listDiv) return;

  const docItem = document.createElement('div');
  docItem.className = 'document-item';
  docItem.innerHTML = `
    <div class="document-header">
      <strong>${doc.getTitle()}</strong>
      <small>${doc.getInfo()}</small>
    </div>
    <div class="document-actions">
      <button onclick="cloneDocument('${id}', 'deep')">Clone (Deep)</button>
      <button onclick="cloneDocument('${id}', 'shallow')">Clone (Shallow)</button>
      <button onclick="showDetails('${id}')">Szczegóły</button>
    </div>
  `;
  listDiv.appendChild(docItem);
}

function cloneDocument(id: string, type: string): void {
  const original = documents.get(id);
  if (!original) return;

  const cloned = type === 'deep' ? original.clone() : (original as any).cloneShallow();
  cloned.setTitle(`${original.getTitle()} (${type} klon)`);

  const newId = `doc-${counter++}`;
  documents.set(newId, cloned as Document);

  // Add to list
  const listDiv = document.getElementById('documents-list');
  if (listDiv) {
    const docItem = document.createElement('div');
    docItem.className = 'document-item cloned';
    docItem.innerHTML = `
      <div class="document-header">
        <strong>${cloned.getTitle()}</strong>
        <small>${cloned.getInfo()}</small>
      </div>
      <div class="document-actions">
        <button onclick="cloneDocument('${newId}', 'deep')">Clone (Deep)</button>
        <button onclick="cloneDocument('${newId}', 'shallow')">Clone (Shallow)</button>
        <button onclick="showDetails('${newId}')">Szczegóły</button>
      </div>
    `;
    listDiv.appendChild(docItem);
  }
}

function showDetails(id: string): void {
  const doc = documents.get(id);
  if (!doc) return;

  const detailsDiv = document.getElementById('details');
  if (detailsDiv) {
    detailsDiv.innerHTML = (doc as Document).getDetailsHTML();
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  registry = new PrototypeRegistry();

  // Create initial documents
  const doc1 = new Document('Document 1', 'Zawartość dokumentu 1', 'Jan Kowalski', [
    'projekt',
    'ważne',
  ]);
  const doc2 = new Document('Document 2', 'Zawartość dokumentu 2', 'Maria Nowak', [
    'raport',
    'statystyka',
  ]);

  registry.register('doc1', doc1);
  registry.register('doc2', doc2);

  addDocument(doc1, 'doc1');
  addDocument(doc2, 'doc2');

  const createBtn = document.getElementById('create-btn') as HTMLButtonElement;
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      const title = prompt('Tytuł dokumentu:', 'Nowy dokument');
      const author = prompt('Autor:', 'Nieznany');
      if (title && author) {
        const newDoc = new Document(title, 'Nowa zawartość', author, ['nowy']);
        registry.register(title, newDoc);
        addDocument(newDoc, title);
      }
    });
  }

  // Make functions global for onclick handlers
  (window as any).cloneDocument = cloneDocument;
  (window as any).showDetails = showDetails;
});
