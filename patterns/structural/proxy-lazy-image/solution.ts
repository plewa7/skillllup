/**
 * WZORZEC PROXY - Implementacja
 */

// ============================================
// 1. IMAGE SUBJECT INTERFACE
// ============================================
interface Image {
  display(): void;
  getUrl(): string;
  isLoaded(): boolean;
}

// ============================================
// 2. REAL IMAGE (Heavyweight - loads on creation)
// ============================================
class RealImage implements Image {
  private data: string = '';
  private isLoadedFlag: boolean = false;

  constructor(private url: string) {
    this.loadImage();
  }

  private loadImage(): void {
    // Simulate expensive loading
    console.log(`Loading ${this.url}...`);
    // In real scenario, this would fetch the image from network
    setTimeout(() => {
      this.data = `Loaded: ${this.url}`;
      this.isLoadedFlag = true;
      console.log(`Image loaded: ${this.url}`);
    }, 1000);
  }

  display(): void {
    if (this.isLoadedFlag) {
      console.log(`Displaying ${this.url}`);
    } else {
      console.log(`Loading... ${this.url}`);
    }
  }

  getUrl(): string {
    return this.url;
  }

  isLoaded(): boolean {
    return this.isLoadedFlag;
  }
}

// ============================================
// 3. IMAGE PROXY (Lightweight - lazy loads)
// ============================================
class ImageProxy implements Image {
  private realImage: RealImage | null = null;
  private requestCount: number = 0;

  constructor(private url: string) {}

  display(): void {
    this.requestCount++;

    // Create RealImage only on first access
    if (!this.realImage) {
      console.log(`Proxy: Creating RealImage for ${this.url}`);
      this.realImage = new RealImage(this.url);
    }

    this.realImage.display();
  }

  getUrl(): string {
    return this.url;
  }

  isLoaded(): boolean {
    return this.realImage ? this.realImage.isLoaded() : false;
  }

  getRequestCount(): number {
    return this.requestCount;
  }
}

// ============================================
// 4. IMAGE GALLERY
// ============================================
class ImageGallery {
  private images: Image[] = [];

  addImage(url: string, usProxy: boolean = true): void {
    if (usProxy) {
      this.images.push(new ImageProxy(url));
    } else {
      this.images.push(new RealImage(url));
    }
  }

  displayAll(): void {
    for (const image of this.images) {
      image.display();
    }
  }

  getImages(): Image[] {
    return [...this.images];
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
function displayGallery(gallery: Image[], useProxy: boolean): void {
  const galleryDiv = document.getElementById('gallery');
  if (!galleryDiv) return;

  galleryDiv.innerHTML = '';

  gallery.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = image.getUrl();
    img.alt = `Image ${index + 1}`;
    img.className = 'gallery-image';

    const info = document.createElement('div');
    info.className = 'image-info';
    if (image instanceof ImageProxy) {
      info.textContent = `Proxy (Requests: ${image.getRequestCount()}, Loaded: ${image.isLoaded()})`;
    } else {
      info.textContent = `Direct (Loaded: ${image.isLoaded()})`;
    }

    item.appendChild(img);
    item.appendChild(info);
    galleryDiv.appendChild(item);
  });
}

function addLog(message: string): void {
  const logDiv = document.getElementById('log');
  if (logDiv) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${message}`;
    logDiv.insertBefore(entry, logDiv.firstChild);

    // Keep only last 10 logs
    while (logDiv.children.length > 10) {
      logDiv.removeChild(logDiv.lastChild!);
    }
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const proxyGallery = new ImageGallery();
  const directGallery = new ImageGallery();

  const imageUrls = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e',
    'https://images.unsplash.com/photo-1507208773393-40461cea1410',
    'https://images.unsplash.com/photo-1506434304b2-aba73f6f547f',
  ];

  // Create galleries
  imageUrls.forEach((url) => {
    proxyGallery.addImage(url, true);
    directGallery.addImage(url, false);
  });

  const proxyBtn = document.getElementById('proxy-btn') as HTMLButtonElement;
  const directBtn = document.getElementById('direct-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  if (proxyBtn) {
    proxyBtn.addEventListener('click', () => {
      addLog('📱 Ładowanie galerii z Proxy (Lazy Loading)');
      displayGallery(proxyGallery.getImages(), true);
    });
  }

  if (directBtn) {
    directBtn.addEventListener('click', () => {
      addLog('⚡ Ładowanie galerii bezpośrednio (Eager Loading)');
      displayGallery(directGallery.getImages(), false);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const logDiv = document.getElementById('log');
      if (logDiv) logDiv.innerHTML = '';
    });
  }

  // Display proxy by default
  proxyBtn?.click();
});
