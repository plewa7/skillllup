# 💬 Mediator - System Czatu

## Wzorzec Mediator

Wzorzec Mediator należy do grupy wzorców **behawioralnych** (Behavioral Patterns). Definiuje obiekt, który enkapsuluje como kolekcja obiektów wchodzi w interakcje. Zmniejsza sprzężenie poprzez zapobieganiu obiektom bezpośredniego odwoływania się do siebie.

## Diagram Wzorca

```
┌─ User1
│    ↓
│    ↓ sendMessage
├─ User2  ←→ Mediator (ChatRoom) ←→ broadcasts
│    ↑                    ↑
│    ↑ receiveMessage     │
└─ User3                  │
     ↑──────────────────┘
```

## Scenario: System Czatu

Wyobraź sobie aplikację czatu z wieloma użytkownikami. Bez Mediator:

- User1 musi znać User2, User3...
- User1 wysyła wiadomość do każdego osobno
- Zmiana na nowego User wymaga modyfikacji wszystkich

Z Mediator:

- Użytkownicy mają referencję tylko do ChatRoom
- ChatRoom zarządza distribuowaniem wiadomości
- Łatwo dodać nowych użytkowników

**Problemy bez Mediator:**

```typescript
// User musi znać wszystkich! 😱
user1.sendMessageTo(user2, msg);
user1.sendMessageTo(user3, msg);
```

**Rozwiązanie z Mediator:**

```typescript
// Mediator robi dystrybucję! ✨
chatRoom.sendMessage(user1, msg);
// chatRoom notyfikuje user2, user3...
```

## Komponenty

### 1. **Mediator Interface**

```typescript
interface ChatRoom {
  sendMessage(sender: User, message: string): void;
  registerUser(user: User): void;
}
```

### 2. **Colleague Interface**

```typescript
interface User {
  send(message: string): void;
  receive(message: string): void;
}
```

### 3. **Concrete Mediator**

```typescript
class ChatRoomImpl implements ChatRoom {
  private users: User[] = [];

  sendMessage(sender: User, message: string): void {
    for (const user of this.users) {
      if (user !== sender) {
        user.receive(message);
      }
    }
  }
}
```

### 4. **Concrete Colleague**

```typescript
class ChatUser implements User {
  constructor(
    private chatRoom: ChatRoom,
    private name: string
  ) {}

  send(message: string): void {
    this.chatRoom.sendMessage(this, message);
  }

  receive(message: string): void {
    console.log(`${this.name} received: ${message}`);
  }
}
```

## Co Implementujesz

### Krok 1: Mediator Interface

```typescript
interface Mediator {
  notify(sender: Colleague, event: string): void;
}
```

📋 **Dlaczego?** Definiuje komunikację

### Krok 2: Colleague Interface

```typescript
interface Colleague {
  setMediator(mediator: Mediator): void;
}
```

👥 **Dlaczego?** Zna Mediator, nie innych

### Krok 3: Concrete Mediator

```typescript
class ConcreteMediator implements Mediator {
  private colleague1: Colleague;
  private colleague2: Colleague;

  notify(sender: Colleague, event: string): void {
    if (sender === this.colleague1) {
      this.colleague2.doSomething();
    }
  }
}
```

🔄 **Dlaczego?** Zarządza interakcjami

### Krok 4: Użycie

```typescript
const chatRoom = new ChatRoomImpl();
const user1 = new ChatUser(chatRoom, 'John');
const user2 = new ChatUser(chatRoom, 'Jane');

chatRoom.registerUser(user1);
chatRoom.registerUser(user2);

user1.send('Hello all!');
// Jane receives message
```

💬 **Dlaczego?** Loose coupling!

## Praktyczne Zastosowania

1. **Chat Systems** - Message broadcasting
2. **Dialog Boxes** - UI components coordination
3. **Air Traffic Control** - Planes coordination
4. **Workflow Engines** - Process orchestration
5. **Game Systems** - NPC interactions
6. **Redux/Flux** - State management patterns
7. **Observer Pattern** - Event aggregation

## Wniosek

Wzorzec Mediator pozwala:

- 💬 Na Loose Coupling między obiektami
- 🔄 Na Centralized communication logic
- 📊 Na Easier maintenance

---

📚 **Materiały:**

- [Refactoring.Guru - Mediator](https://refactoring.guru/design-patterns/mediator)
