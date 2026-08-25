import { CapacitorUpdater } from '@capacitor/updater';
import { App } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

// Initialize App
async function initializeApp() {
  try {
    // Configure Status Bar
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0B0E11' });
    
    // Hide Splash Screen after app loads
    await SplashScreen.hide();
    
    // Get device info
    const info = await Device.getInfo();
    console.log('Device:', info.platform, info.osVersion);
    
  } catch (error) {
    console.log('Error initializing app:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Handle App Lifecycle
App.addListener('appStateChange', (state) => {
  console.log('App state changed:', state.isActive);
});

App.addListener('backButton', async () => {
  // Exit app on back button (optional)
  console.log('Back button pressed');
});

// Calculator Engine
class Calculator {
  private display: string = '0';
  private previousValue: number | null = null;
  private operation: string | null = null;
  private shouldResetDisplay: boolean = false;
  private history: string[] = [];

  constructor() {
    this.renderDisplay();
  }

  private renderDisplay() {
    const displayElement = document.getElementById('calc-display');
    if (displayElement) {
      displayElement.value = this.display;
    }
  }

  appendNumber(num: string) {
    if (this.shouldResetDisplay) {
      this.display = '';
      this.shouldResetDisplay = false;
    }

    if (num === '.' && this.display.includes('.')) return;
    if (num === '0' && this.display === '0') return;

    this.display = this.display === '0' ? num : this.display + num;
    this.renderDisplay();
  }

  appendOperation(op: string) {
    if (this.display === '') return;

    if (this.previousValue === null) {
      this.previousValue = parseFloat(this.display);
    } else if (!this.shouldResetDisplay) {
      this.calculateResult();
    }

    this.operation = op;
    this.shouldResetDisplay = true;
  }

  calculateResult() {
    if (this.previousValue === null || !this.operation) return;

    const current = parseFloat(this.display);
    let result: number;

    switch (this.operation) {
      case '+':
        result = this.previousValue + current;
        break;
      case '-':
        result = this.previousValue - current;
        break;
      case '×':
        result = this.previousValue * current;
        break;
      case '÷':
        result = current !== 0 ? this.previousValue / current : 0;
        break;
      case '^':
        result = Math.pow(this.previousValue, current);
        break;
      default:
        return;
    }

    this.addToHistory(`${this.previousValue} ${this.operation} ${current} = ${result}`);
    this.display = result.toString();
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  equals() {
    if (this.operation && this.previousValue !== null) {
      this.calculateResult();
    }
  }

  clear() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.renderDisplay();
  }

  backspace() {
    this.display = this.display.slice(0, -1) || '0';
    this.renderDisplay();
  }

  // Advanced functions
  sqrt() {
    const value = parseFloat(this.display);
    this.display = Math.sqrt(value).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  square() {
    const value = parseFloat(this.display);
    this.display = (value * value).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  reciprocal() {
    const value = parseFloat(this.display);
    this.display = value !== 0 ? (1 / value).toString() : '0';
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  percentage() {
    const value = parseFloat(this.display);
    this.display = (value / 100).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  sin() {
    const value = parseFloat(this.display);
    this.display = Math.sin((value * Math.PI) / 180).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  cos() {
    const value = parseFloat(this.display);
    this.display = Math.cos((value * Math.PI) / 180).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  tan() {
    const value = parseFloat(this.display);
    this.display = Math.tan((value * Math.PI) / 180).toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  log() {
    const value = parseFloat(this.display);
    this.display = value > 0 ? Math.log10(value).toString() : '0';
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  ln() {
    const value = parseFloat(this.display);
    this.display = value > 0 ? Math.log(value).toString() : '0';
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  pi() {
    this.display = Math.PI.toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  euler() {
    this.display = Math.E.toString();
    this.shouldResetDisplay = true;
    this.renderDisplay();
  }

  addToHistory(entry: string) {
    this.history.unshift(entry);
    if (this.history.length > 50) {
      this.history.pop();
    }
  }

  getHistory(): string[] {
    return this.history;
  }
}

// Initialize calculator
const calculator = new Calculator();

// Expose to global scope
(window as any).calculator = calculator;
(window as any).appendNumber = (num: string) => calculator.appendNumber(num);
(window as any).appendOperation = (op: string) => calculator.appendOperation(op);
(window as any).equals = () => calculator.equals();
(window as any).clear = () => calculator.clear();
(window as any).backspace = () => calculator.backspace();
(window as any).sqrt = () => calculator.sqrt();
(window as any).square = () => calculator.square();
(window as any).reciprocal = () => calculator.reciprocal();
(window as any).percentage = () => calculator.percentage();
(window as any).sin = () => calculator.sin();
(window as any).cos = () => calculator.cos();
(window as any).tan = () => calculator.tan();
(window as any).log = () => calculator.log();
(window as any).ln = () => calculator.ln();
(window as any).pi = () => calculator.pi();
(window as any).euler = () => calculator.euler();
