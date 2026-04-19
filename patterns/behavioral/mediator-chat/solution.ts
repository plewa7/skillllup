/**
 * WZORZEC MEDIATOR - Implementacja
 */

// ============================================
// 1. INTERFEJSY
// ============================================
interface Mediator {
  sendMessage(sender: User, message: string): void;
  registerUser(user: User): void;
}

interface User {
  send(message: string): void;
  receive(senderName: string, message: string): void;
  getName(): string;
}

// ============================================
// 2. CONCRETE MEDIATOR (ChatRoom)
// ============================================
class ChatRoom implements Mediator {
  private users: User[] = [];

  registerUser(user: User): void {
    this.users.push(user);
    this.broadcast(`[System] ${user.getName()} dołączył do czatu`, user);
  }

  sendMessage(sender: User, message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    this.broadcast(`[${timestamp}] ${sender.getName()}: ${message}`, sender);
  }

  private broadcast(message: string, sender: User): void {
    for (const user of this.users) {
      if (user !== sender) {
        user.receive(sender.getName(), message);
      }
    }
  }

  getUsers(): User[] {
    return [...this.users];
  }
}

// ============================================
// 3. CONCRETE COLLEAGUE (ChatUser)
// ============================================
class ChatUser implements User {
  private name: string;
  private mediator: Mediator;
  private messages: string[] = [];

  constructor(name: string, mediator: Mediator) {
    this.name = name;
    this.mediator = mediator;
    this.mediator.registerUser(this);
  }

  getName(): string {
    return this.name;
  }

  send(message: string): void {
    if (message.trim()) {
      this.messages.push(`[Ja]: ${message}`);
      this.mediator.sendMessage(this, message);
    }
  }

  receive(senderName: string, message: string): void {
    this.messages.push(`[${senderName}]: ${message}`);
    addMessageToUI(senderName, message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }
}

// ============================================
// 4. UI HELPERS
// ============================================
let chatRoom: ChatRoom;
let currentUser: ChatUser;

function addMessageToUI(sender: string, message: string): void {
  const chatLog = document.getElementById('chat-log');
  if (chatLog) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === '[System]' ? 'system-message' : 'received-message';
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

function sendMessage(): void {
  const input = document.getElementById('message-input') as HTMLInputElement;
  if (input && input.value.trim()) {
    const chatLog = document.getElementById('chat-log');
    if (chatLog) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'sent-message';
      messageDiv.innerHTML = `<strong>Ty:</strong> ${input.value}`;
      chatLog.appendChild(messageDiv);
      chatLog.scrollTop = chatLog.scrollHeight;
    }

    currentUser.send(input.value);
    input.value = '';
    input.focus();
  }
}

// ============================================
// 5. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Create chat room
  chatRoom = new ChatRoom();

  // Create users
  const users = [
    new ChatUser('Alice', chatRoom),
    new ChatUser('Bob', chatRoom),
    new ChatUser('Charlie', chatRoom),
  ];

  // Set current user
  currentUser = users[0];

  const userSelect = document.getElementById('user-select') as HTMLSelectElement;
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;

  // Populate user select
  if (userSelect) {
    users.forEach((user, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = user.getName();
      if (index === 0) option.selected = true;
      userSelect.appendChild(option);
    });

    userSelect.addEventListener('change', () => {
      currentUser = users[parseInt(userSelect.value)];
      const chatLog = document.getElementById('chat-log');
      if (chatLog) {
        chatLog.innerHTML = '';
      }
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Demo messages
  setTimeout(() => {
    addMessageToUI('[System]', 'Aplikacja uruchomiona');
    addMessageToUI('[System]', 'Alice, Bob i Charlie dołączyli do czatu');

    setTimeout(() => users[1].send('Cześć! Jak się masz?'), 1000);
    setTimeout(() => users[2].send('Cześć wszystkim!'), 2000);
    setTimeout(() => users[0].send('Witajcie! Dobrze się mieć tutaj.'), 3000);
  }, 500);
});
