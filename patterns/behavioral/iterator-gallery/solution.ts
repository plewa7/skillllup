/**
 * WZORZEC ITERATOR - Implementacja
 */

// ============================================
// 1. INTERFEJSY
// ============================================
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
  hasPrevious(): boolean;
  previous(): T;
}

interface Iterable<T> {
  createIterator(): Iterator<T>;
}

// ============================================
// 2. PHOTO CLASS
// ============================================
class Photo {
  constructor(
    public id: number,
    public url: string,
    public title: string
  ) {}
}

// ============================================
// 3. CONCRETE ITERATOR
// ============================================
class PhotoIterator implements Iterator<Photo> {
  private position: number = 0;

  constructor(private photos: Photo[]) {}

  hasNext(): boolean {
    return this.position < this.photos.length;
  }

  next(): Photo {
    if (!this.hasNext()) {
      throw new Error('No more photos');
    }
    return this.photos[this.position++];
  }

  hasPrevious(): boolean {
    return this.position > 0;
  }

  previous(): Photo {
    if (!this.hasPrevious()) {
      throw new Error('No previous photo');
    }
    return this.photos[--this.position];
  }

  reset(): void {
    this.position = 0;
  }

  getCurrentIndex(): number {
    return this.position;
  }

  getTotal(): number {
    return this.photos.length;
  }
}

// ============================================
// 4. CONCRETE COLLECTION
// ============================================
class PhotoGallery implements Iterable<Photo> {
  private photos: Photo[] = [];

  addPhoto(photo: Photo): void {
    this.photos.push(photo);
  }

  removePhoto(id: number): void {
    this.photos = this.photos.filter((p) => p.id !== id);
  }

  createIterator(): Iterator<Photo> {
    return new PhotoIterator(this.photos);
  }

  getPhotos(): Photo[] {
    return [...this.photos];
  }
}

// ============================================
// 5. UI HELPER
// ============================================
let iterator: PhotoIterator;
let gallery: PhotoGallery;

function displayPhoto(photo: Photo | null): void {
  const container = document.getElementById('photo-display');
  if (!container) return;

  if (!photo) {
    container.innerHTML = '<p style="text-align: center; color: #999;">No photo</p>';
    return;
  }

  container.innerHTML = `
    <div class="photo-item">
      <img src="${photo.url}" alt="${photo.title}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22><rect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2216%22 fill=%22%23999%22>Photo ${photo.id}</text></svg>'">
      <h3>${photo.title}</h3>
      <p class="counter">${iterator.getCurrentIndex()} / ${iterator.getTotal()}</p>
    </div>
  `;
}

function updateButtons(): void {
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;

  if (prevBtn) prevBtn.disabled = !iterator.hasPrevious();
  if (nextBtn) nextBtn.disabled = !iterator.hasNext();
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Create gallery
  gallery = new PhotoGallery();

  // Add sample photos
  const photos = [
    new Photo(1, 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e', 'Mountain View'),
    new Photo(2, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'Forest'),
    new Photo(3, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Ocean'),
    new Photo(4, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 'Sky'),
    new Photo(5, 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae', 'Sunset'),
  ];

  photos.forEach((photo) => gallery.addPhoto(photo));

  // Create iterator
  iterator = gallery.createIterator() as PhotoIterator;

  // Button handlers
  const prevBtn = document.getElementById('prev-btn') as HTMLButtonElement;
  const nextBtn = document.getElementById('next-btn') as HTMLButtonElement;
  const resetBtn = document.getElementById('reset-btn') as HTMLButtonElement;

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (iterator.hasNext()) {
        const photo = iterator.next();
        displayPhoto(photo);
        updateButtons();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (iterator.hasPrevious()) {
        const photo = iterator.previous();
        displayPhoto(photo);
        updateButtons();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      iterator.reset();
      if (iterator.hasNext()) {
        const photo = iterator.next();
        displayPhoto(photo);
        updateButtons();
      }
    });
  }

  // Display first photo
  if (iterator.hasNext()) {
    const photo = iterator.next();
    displayPhoto(photo);
  }
  updateButtons();
});
