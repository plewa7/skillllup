/**
 * WZORZEC BRIDGE - Implementacja
 */

// ============================================
// 1. BRIDGE INTERFACE (Device Implementation)
// ============================================
interface Device {
  on(): void;
  off(): void;
  setVolume(volume: number): void;
  getVolume(): number;
  getStatus(): string;
}

// ============================================
// 2. CONCRETE IMPLEMENTATIONS (Devices)
// ============================================
class TV implements Device {
  private isOn: boolean = false;
  private volume: number = 50;

  on(): void {
    this.isOn = true;
    displayStatus('TV: Włączony', 'success');
  }

  off(): void {
    this.isOn = false;
    displayStatus('TV: Wyłączony', 'success');
  }

  setVolume(volume: number): void {
    if (this.isOn) {
      this.volume = Math.max(0, Math.min(100, volume));
      displayStatus(`TV: Głośność = ${this.volume}%`, 'info');
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getStatus(): string {
    return `TV ${this.isOn ? '(Włączony)' : '(Wyłączony)'} - Głośność: ${this.volume}%`;
  }
}

class Radio implements Device {
  private isOn: boolean = false;
  private volume: number = 30;
  private frequency: number = 98.5;

  on(): void {
    this.isOn = true;
    displayStatus('Radio: Włączone', 'success');
  }

  off(): void {
    this.isOn = false;
    displayStatus('Radio: Wyłączone', 'success');
  }

  setVolume(volume: number): void {
    if (this.isOn) {
      this.volume = Math.max(0, Math.min(100, volume));
      displayStatus(`Radio: Głośność = ${this.volume}%`, 'info');
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getStatus(): string {
    return `Radio ${this.isOn ? '(Włączone)' : '(Wyłączone)'} - ${this.frequency} FM - Głośność: ${this.volume}%`;
  }
}

class Lights implements Device {
  private isOn: boolean = false;
  private brightness: number = 100;

  on(): void {
    this.isOn = true;
    displayStatus('Światła: Włączone', 'success');
  }

  off(): void {
    this.isOn = false;
    displayStatus('Światła: Wyłączone', 'success');
  }

  setVolume(brightness: number): void {
    if (this.isOn) {
      this.brightness = Math.max(0, Math.min(100, brightness));
      displayStatus(`Światła: Jasność = ${this.brightness}%`, 'info');
    }
  }

  getVolume(): number {
    return this.brightness;
  }

  getStatus(): string {
    return `Światła ${this.isOn ? '(Włączone)' : '(Wyłączone)'} - Jasność: ${this.brightness}%`;
  }
}

// ============================================
// 3. ABSTRACTION (Remote Control)
// ============================================
abstract class Remote {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  abstract powerOn(): void;
  abstract powerOff(): void;
  abstract volumeUp(): void;
  abstract volumeDown(): void;
}

// ============================================
// 4. CONCRETE ABSTRACTIONS (Remote Types)
// ============================================
class BasicRemote extends Remote {
  powerOn(): void {
    this.device.on();
  }

  powerOff(): void {
    this.device.off();
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }
}

class AdvancedRemote extends Remote {
  powerOn(): void {
    this.device.on();
  }

  powerOff(): void {
    this.device.off();
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 5);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 5);
  }

  setVolume(volume: number): void {
    this.device.setVolume(volume);
  }
}

// ============================================
// 5. UI HELPERS
// ============================================
let currentDevice: Device;
let currentRemote: Remote;

function displayStatus(message: string, type: string = 'info'): void {
  const statusDiv = document.getElementById('status');
  if (statusDiv) {
    const div = document.createElement('div');
    div.className = `status-message ${type}`;
    div.textContent = message;
    statusDiv.appendChild(div);

    setTimeout(() => div.remove(), 3000);
  }
  updateDeviceInfo();
}

function updateDeviceInfo(): void {
  const info = document.getElementById('device-info');
  if (info && currentDevice) {
    info.textContent = currentDevice.getStatus();
  }
}

// ============================================
// 6. INICJALIZACJA
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with TV and Basic Remote
  currentDevice = new TV();
  currentRemote = new BasicRemote(currentDevice);

  const deviceSelect = document.getElementById('device-select') as HTMLSelectElement;
  const remoteSelect = document.getElementById('remote-select') as HTMLSelectElement;
  const powerOnBtn = document.getElementById('power-on') as HTMLButtonElement;
  const powerOffBtn = document.getElementById('power-off') as HTMLButtonElement;
  const volUpBtn = document.getElementById('vol-up') as HTMLButtonElement;
  const volDownBtn = document.getElementById('vol-down') as HTMLButtonElement;

  if (deviceSelect) {
    deviceSelect.addEventListener('change', () => {
      const device = deviceSelect.value;
      if (device === 'tv') currentDevice = new TV();
      else if (device === 'radio') currentDevice = new Radio();
      else if (device === 'lights') currentDevice = new Lights();

      currentRemote = new BasicRemote(currentDevice);
      if (remoteSelect.value === 'advanced') {
        currentRemote = new AdvancedRemote(currentDevice);
      }
      updateDeviceInfo();
    });
  }

  if (remoteSelect) {
    remoteSelect.addEventListener('change', () => {
      const remote = remoteSelect.value;
      if (remote === 'basic') {
        currentRemote = new BasicRemote(currentDevice);
      } else {
        currentRemote = new AdvancedRemote(currentDevice);
      }
      displayStatus(
        `Pilot zmieniony na ${remote === 'basic' ? 'Podstawowy' : 'Zaawansowany'}`,
        'info'
      );
    });
  }

  if (powerOnBtn) powerOnBtn.addEventListener('click', () => currentRemote.powerOn());
  if (powerOffBtn) powerOffBtn.addEventListener('click', () => currentRemote.powerOff());
  if (volUpBtn) volUpBtn.addEventListener('click', () => currentRemote.volumeUp());
  if (volDownBtn) volDownBtn.addEventListener('click', () => currentRemote.volumeDown());

  updateDeviceInfo();
});
