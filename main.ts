import { CapacitorUpdater } from '@capacitor/updater';
import { App } from '@capacitor/app';

// Initialize Capacitor
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Calculator app initialized');
  
  // Handle app lifecycle
  App.addListener('backButton', () => {
    console.log('Back button pressed');
  });

  App.addListener('pause', () => {
    console.log('App paused');
  });

  App.addListener('resume', () => {
    console.log('App resumed');
  });
});

// Simple calculator implementation
const display = document.getElementById('display') as HTMLInputElement;
let currentInput = '';
let operation: string | null = null;
let previousValue = '';
let shouldResetDisplay = false;

function updateDisplay(value: string) {
  if (display) {
    display.value = value;
  }
}

function calculateResult() {
  if (!operation || !previousValue) return;
  
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentInput);
  let result: number;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = current !== 0 ? prev / current : 0;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operation = null;
  previousValue = '';
  shouldResetDisplay = true;
  updateDisplay(currentInput);
}

// Expose global calculator functions
(window as any).appendNumber = (num: string) => {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  currentInput += num;
  updateDisplay(currentInput);
};

(window as any).appendOperation = (op: string) => {
  if (currentInput === '') return;
  if (previousValue !== '') {
    calculateResult();
  } else {
    previousValue = currentInput;
    currentInput = '';
  }
  operation = op;
  shouldResetDisplay = false;
};

(window as any).clearDisplay = () => {
  currentInput = '';
  operation = null;
  previousValue = '';
  shouldResetDisplay = false;
  updateDisplay('0');
};

(window as any).calculateEquals = () => {
  if (currentInput === '' || operation === null) return;
  previousValue = previousValue || '0';
  calculateResult();
};