# Observer Pattern Implementation Guide

## 📖 Co to jest Observer Pattern?

Observer Pattern jest wzorcem behawioralnym, który definiuje **zależność jeden-do-wiele** między obiektami.
Gdy jeden obiekt zmienia stan, wszystkie obiekty zależne od niego są automatycznie powiadamiane i aktualizują się.

### Składniki Wzorca

```
┌─────────────────────────────────────────┐
│        Observable (Subject)             │
│ ┌─────────────────────────────────────┐ │
│ │ - observers: Observer[]             │ │
│ │ - subscribe(observer)               │ │
│ │ - unsubscribe(observer)             │ │
│ │ - notifyObservers(data)             │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
         ↓ powiadamia
┌─────────────────────────────────────────┐
│          Observer Interface             │
│ ┌─────────────────────────────────────┐ │
│ │ + update(data)                      │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
    ↑              ↑
    │              │
    │ implementuje │
    │              │
  Observer1     Observer2
```

## 🎯 Zadanie dla Ciebie

### Część 1: Zdefiniuj Interface Observer

```typescript
interface Observer {
  update(data: string): void;
}
```

### Część 2: Zaimplementuj Klasę InputObservable

```typescript
class InputObservable {
  // TODO: Dodaj prywatne pole do przechowywania obserwatorów
  // private observers: Observer[] = [];

  constructor(private inputElement: HTMLInputElement) {
    // TODO: Nasłuchuj zmian na inputElement
    // this.inputElement.addEventListener('input', () => {
    //   this.notifyObservers(this.getValue());
    // });
  }

  // TODO: Dodaj metodę subscribe
  subscribe(observer: Observer): void {
    // Dodaj obserwatora do listy
  }

  // TODO: Dodaj metodę unsubscribe
  unsubscribe(observer: Observer): void {
    // Usuń obserwatora z listy
  }

  // TODO: Dodaj metodę notifyObservers
  private notifyObservers(data: string): void {
    // Iteruj przez obserwatorów i wywołaj update() na każdym
  }

  getValue(): string {
    return this.inputElement.value;
  }
}
```

### Część 3: Zaimplementuj Konkretne Komponenty

```typescript
class ObserverComponent1 implements Observer {
  constructor(private element: HTMLElement) {}

  update(data: string): void {
    // TODO: Zaktualizuj this.element.textContent = data;
  }
}

class ObserverComponent2 implements Observer {
  constructor(private element: HTMLElement) {}

  update(data: string): void {
    // TODO: Zaktualizuj this.element.textContent = data;
  }
}
```

### Część 4: Inicjalizacja w DOM

```typescript
document.addEventListener('DOMContentLoaded', () => {
  // TODO:
  // 1. Pobierz elementy z DOM
  // 2. Stwórz instancję InputObservable
  // 3. Stwórz instancje ObserverComponent1 i ObserverComponent2
  // 4. Zarejestruj obserwatorów via subscribe()
});
```

## ✅ Jak Testować

### Uruchomienie Testów Automatycznych

```bash
npm run test
```

Obejrzyj wyniki - powinny być 8 testów. Wszystkie będą **RED** 🔴 do czasu implementacji.

### Uruchomienie HTML UI

```bash
npm run dev
```

Przejdź na: `http://localhost:5173/patterns/behavioral/observer-web-components/index.html`

Ręcznie testuj - wpisz tekst w pole input, obserwatorzy powinni się **natychmiast** zaktualizować.

### Debug Mode

```bash
npm run test:debug
```

Uruchomi interaktywny debug z krok-po-kroku przechodzeniem przez testy.

## 🔍 Czek Lista Implementacji

- [ ] Utworzono interfejs Observer z metodą update()
- [ ] Utworzono klasę InputObservable
- [ ] InputObservable ma prywatne pole observers: Observer[]
- [ ] InputObservable ma metodę subscribe(observer)
- [ ] InputObservable ma metodę unsubscribe(observer)
- [ ] InputObservable ma prywatną metodę notifyObservers(data)
- [ ] W konstruktorze InputObservable nasłuchuję 'input' event
- [ ] Na 'input' event wywoływam notifyObservers()
- [ ] Utworzono klasę ObserverComponent1 implementującą Observer
- [ ] Utworzono klasę ObserverComponent2 implementującą Observer
- [ ] Metody update() w komponentach zaktualizowują DOM
- [ ] W DOMContentLoaded inicjalizuję wszystkie komponenty
- [ ] Rejestruję obserwatorów via subscribe()
- [ ] npm run test pokazuje wszystkie 8 testów jako GREEN ✅

## 🎓 Lekcja do Zapamiętania

Observer Pattern jest **fundamentalny** dla Frontend Development:

- Vue.js, React i Angular używają tego wzorca dla reaktywności
- Jest to podstawa **event-driven programming**
- Pozwala na **loose coupling** między komponentami
- Umożliwia **scalability** - dodawanie nowych obserwatorów bez zmiany Observable

## 📚 Referencje

- [Observer Pattern - Refactoring.Guru](https://refactoring.guru/design-patterns/observer)
- [Event Emitter Pattern - Node.js](https://nodejs.org/api/events.html)
- [RxJS - Reactive Extensions](https://rxjs.dev/)

Happy coding! 🚀
