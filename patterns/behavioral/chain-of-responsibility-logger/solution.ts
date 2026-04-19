/**
 * WZORZEC CHAIN OF RESPONSIBILITY - Implementacja
 *
 * Zadanie:
 * Stwórz system logowania wiadomości z wieloma poziomami:
 * 1. Handler interface definiuje kontrakt dla handler'ów
 * 2. Konkretnymi handlery: INFO, DEBUG, ERROR, CRITICAL
 * 3. Każdy handler może przetwarzać lub przekazywać dalej
 * 4. Aplikacja loguje wiadomości o różnych poziomach
 */

// ============================================
// 1. INTERFEJSY
// ============================================
interface LogRequest {
  level: string;
  message: string;
  timestamp?: Date;
}

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: LogRequest): void;
}

// ============================================
// 2. ABSTRACT BASE HANDLER
// ============================================
abstract class BaseHandler implements Handler {
  protected nextHandler: Handler | null = null;
  protected level: string = '';

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: LogRequest): void {
    if (this.canHandle(request)) {
      this.process(request);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  protected abstract canHandle(request: LogRequest): boolean;
  protected abstract process(request: LogRequest): void;
}

// ============================================
// 3. KONKRETNE HANDLERY
// ============================================
class InfoHandler extends BaseHandler {
  protected level = 'INFO';

  protected canHandle(request: LogRequest): boolean {
    return request.level === 'INFO';
  }

  protected process(request: LogRequest): void {
    const entry = `[${request.level}] ${request.message} - ${new Date().toLocaleTimeString()}`;
    console.log('%c' + entry, 'color: blue; font-weight: bold;');
    addLogEntry(entry, 'info');
  }
}

class DebugHandler extends BaseHandler {
  protected level = 'DEBUG';

  protected canHandle(request: LogRequest): boolean {
    return request.level === 'DEBUG';
  }

  protected process(request: LogRequest): void {
    const entry = `[${request.level}] ${request.message} - ${new Date().toLocaleTimeString()}`;
    console.log('%c' + entry, 'color: green;');
    addLogEntry(entry, 'debug');
  }
}

class WarningHandler extends BaseHandler {
  protected level = 'WARNING';

  protected canHandle(request: LogRequest): boolean {
    return request.level === 'WARNING';
  }

  protected process(request: LogRequest): void {
    const entry = `[${request.level}] ${request.message} - ${new Date().toLocaleTimeString()}`;
    console.warn(entry);
    addLogEntry(entry, 'warning');
  }
}

class ErrorHandler extends BaseHandler {
  protected level = 'ERROR';

  protected canHandle(request: LogRequest): boolean {
    return request.level === 'ERROR';
  }

  protected process(request: LogRequest): void {
    const entry = `[${request.level}] ${request.message} - ${new Date().toLocaleTimeString()}`;
    console.error(entry);
    addLogEntry(entry, 'error');
  }
}

class CriticalHandler extends BaseHandler {
  protected level = 'CRITICAL';

  protected canHandle(request: LogRequest): boolean {
    return request.level === 'CRITICAL';
  }

  protected process(request: LogRequest): void {
    const entry = `[${request.level}] ${request.message} - ${new Date().toLocaleTimeString()}`;
    console.error('%c' + entry, 'color: red; font-weight: bold; background: yellow;');
    addLogEntry(entry, 'critical');
  }
}

// ============================================
// 4. LOGGER MANAGER
// ============================================
class LoggerChain {
  private chain: Handler;

  constructor() {
    this.chain = this.buildChain();
  }

  private buildChain(): Handler {
    const info = new InfoHandler();
    const debug = new DebugHandler();
    const warning = new WarningHandler();
    const error = new ErrorHandler();
    const critical = new CriticalHandler();

    info.setNext(debug).setNext(warning).setNext(error).setNext(critical);
    return info;
  }

  log(level: string, message: string): void {
    this.chain.handle({ level, message });
  }
}

// ============================================
// 5. UI HELPER
// ============================================
function addLogEntry(entry: string, type: string): void {
  const logContainer = document.getElementById('log-list');
  if (logContainer) {
    const li = document.createElement('li');
    li.className = `log-entry ${type}`;
    li.textContent = entry;
    logContainer.appendChild(li);
    logContainer.scrollTop = logContainer.scrollHeight;
  }
}

// ============================================
// 6. INICJALIZACJA APLIKACJI
// ============================================
let logger: LoggerChain;

document.addEventListener('DOMContentLoaded', () => {
  logger = new LoggerChain();

  const levelSelect = document.getElementById('level-select') as HTMLSelectElement;
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  submitBtn?.addEventListener('click', () => {
    if (messageInput && messageInput.value.trim()) {
      logger.log(levelSelect.value, messageInput.value);
      messageInput.value = '';
      messageInput.focus();
    }
  });

  clearBtn?.addEventListener('click', () => {
    const logContainer = document.getElementById('log-list');
    if (logContainer) {
      logContainer.innerHTML = '';
    }
  });

  messageInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitBtn?.click();
    }
  });

  // Demo logs
  setTimeout(() => {
    logger.log('INFO', 'Aplikacja uruchomiona');
    logger.log('DEBUG', 'Debugowanie włączone');
    logger.log('WARNING', 'Ostrzeżenie: niska pamięć');
    logger.log('ERROR', 'Błąd: nie można nawiązać połączenia');
    logger.log('CRITICAL', 'Błąd krytyczny: awaria bazy danych');
  }, 500);
});
