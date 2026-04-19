/**
 * WZORZEC FACADE - Implementacja
 */

// ============================================
// 1. SUBSYSTEM CLASSES (Complex systems)
// ============================================
class LightingSystem {
  private lights: { [key: string]: boolean } = {
    bedroom: false,
    living_room: false,
    kitchen: false,
  };

  turnOn(room: string): void {
    this.lights[room] = true;
    logEvent(`💡 Światła w ${this.getRoomName(room)} włączone`);
  }

  turnOff(room: string): void {
    this.lights[room] = false;
    logEvent(`💡 Światła w ${this.getRoomName(room)} wyłączone`);
  }

  allOff(): void {
    Object.keys(this.lights).forEach((room) => {
      this.lights[room] = false;
    });
    logEvent('💡 Wszystkie światła wyłączone');
  }

  private getRoomName(room: string): string {
    const names: { [key: string]: string } = {
      bedroom: 'sypialni',
      living_room: 'salonie',
      kitchen: 'kuchni',
    };
    return names[room] || room;
  }
}

class SecuritySystem {
  private isArmed: boolean = false;
  private doors: { [key: string]: boolean } = {
    front_door: true,
    back_door: true,
    garage: true,
  };

  arm(): void {
    this.isArmed = true;
    logEvent('🔒 System bezpieczeństwa AKTYWNY');
  }

  disarm(): void {
    this.isArmed = false;
    logEvent('🔓 System bezpieczeństwa NIEAKTYWNY');
  }

  lockAllDoors(): void {
    Object.keys(this.doors).forEach((door) => {
      this.doors[door] = true;
    });
    logEvent('🔒 Wszystkie drzwi zamknięte');
  }

  unlockAllDoors(): void {
    Object.keys(this.doors).forEach((door) => {
      this.doors[door] = false;
    });
    logEvent('🔓 Wszystkie drzwi otwarte');
  }

  getStatus(): string {
    return `Bezpieczeństwo: ${this.isArmed ? 'AKTYWNY' : 'NIEAKTYWNY'}`;
  }
}

class ThermostatSystem {
  private temperature: number = 21;
  private mode: 'heat' | 'cool' | 'off' = 'off';

  setTemperature(temp: number): void {
    this.temperature = temp;
    logEvent(`🌡️ Temperatura ustawiona na ${temp}°C`);
  }

  setMode(mode: 'heat' | 'cool' | 'off'): void {
    this.mode = mode;
    const modeNames = { heat: 'GRZANIE', cool: 'CHŁODZENIE', off: 'WYŁ' };
    logEvent(`🌡️ Termostat: ${modeNames[mode]}`);
  }

  getStatus(): string {
    return `Temperatura: ${this.temperature}°C (${this.mode})`;
  }
}

class EntertainmentSystem {
  private tv: boolean = false;
  private speakers: boolean = false;
  private volume: number = 30;

  turnOnTV(): void {
    this.tv = true;
    logEvent('📺 Telewizor włączony');
  }

  turnOffTV(): void {
    this.tv = false;
    logEvent('📺 Telewizor wyłączony');
  }

  turnOnSpeakers(): void {
    this.speakers = true;
    logEvent('🔊 Głośniki włączone');
  }

  turnOffSpeakers(): void {
    this.speakers = false;
    logEvent('🔊 Głośniki wyłączone');
  }

  setVolume(vol: number): void {
    this.volume = vol;
    logEvent(`🔊 Głośność: ${vol}%`);
  }
}

// ============================================
// 2. FACADE (Smart Home Manager)
// ============================================
class SmartHomeFacade {
  private lights: LightingSystem;
  private security: SecuritySystem;
  private thermostat: ThermostatSystem;
  private entertainment: EntertainmentSystem;

  constructor() {
    this.lights = new LightingSystem();
    this.security = new SecuritySystem();
    this.thermostat = new ThermostatSystem();
    this.entertainment = new EntertainmentSystem();
  }

  // Scenariusze
  leaveHome(): void {
    logEvent('🏃 Wychodzę z domu...');
    this.lights.allOff();
    this.security.arm();
    this.security.lockAllDoors();
    this.entertainment.turnOffTV();
    this.entertainment.turnOffSpeakers();
    this.thermostat.setMode('off');
  }

  comeHome(): void {
    logEvent('🏠 Wracam do domu...');
    this.security.disarm();
    this.security.unlockAllDoors();
    this.lights.turnOn('living_room');
    this.thermostat.setTemperature(21);
    this.thermostat.setMode('heat');
  }

  sleepMode(): void {
    logEvent('😴 Tryb snu...');
    this.lights.allOff();
    this.security.arm();
    this.security.lockAllDoors();
    this.entertainment.turnOffTV();
    this.entertainment.turnOffSpeakers();
    this.thermostat.setTemperature(18);
    this.thermostat.setMode('heat');
  }

  movieMode(): void {
    logEvent('🍿 Tryb filmowy...');
    this.lights.turnOff('living_room');
    this.entertainment.turnOnTV();
    this.entertainment.turnOnSpeakers();
    this.entertainment.setVolume(40);
    this.thermostat.setTemperature(22);
  }

  partyMode(): void {
    logEvent('🎉 Tryb imprezy...');
    this.lights.turnOn('living_room');
    this.entertainment.turnOnSpeakers();
    this.entertainment.setVolume(70);
    this.thermostat.setTemperature(24);
  }
}

// ============================================
// 3. UI HELPERS
// ============================================
function logEvent(message: string): void {
  const log = document.getElementById('event-log');
  if (log) {
    const item = document.createElement('div');
    item.className = 'event-item';
    const time = new Date().toLocaleTimeString();
    item.innerHTML = `<span class="time">${time}</span> ${message}`;
    log.insertBefore(item, log.firstChild);

    // Keep only last 20 events
    while (log.children.length > 20) {
      log.removeChild(log.lastChild!);
    }
  }
}

// ============================================
// 4. INICJALIZACJA
// ============================================
let smartHome: SmartHomeFacade;

document.addEventListener('DOMContentLoaded', () => {
  smartHome = new SmartHomeFacade();

  const leaveBtn = document.getElementById('leave-btn') as HTMLButtonElement;
  const comeBtn = document.getElementById('come-btn') as HTMLButtonElement;
  const sleepBtn = document.getElementById('sleep-btn') as HTMLButtonElement;
  const movieBtn = document.getElementById('movie-btn') as HTMLButtonElement;
  const partyBtn = document.getElementById('party-btn') as HTMLButtonElement;
  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;

  if (leaveBtn) leaveBtn.addEventListener('click', () => smartHome.leaveHome());
  if (comeBtn) comeBtn.addEventListener('click', () => smartHome.comeHome());
  if (sleepBtn) sleepBtn.addEventListener('click', () => smartHome.sleepMode());
  if (movieBtn) movieBtn.addEventListener('click', () => smartHome.movieMode());
  if (partyBtn) partyBtn.addEventListener('click', () => smartHome.partyMode());

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const log = document.getElementById('event-log');
      if (log) log.innerHTML = '';
    });
  }

  logEvent('🏠 System domu inteligentnego uruchomiony');
});
