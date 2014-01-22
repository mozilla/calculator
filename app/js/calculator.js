'use strict';

var Calculator = {

  display: document.querySelector('#display b'),
  indicator: document.querySelector('#display span'),
  significantDigits: 9,

  currentOperationEle: null,
  result: 0,
  localStorage: false,
  memory: 0,

  currentInput: '',
  operationToBeApplied: '',
  previousOperation: '',
  previousInput: '',

  inputDigits: 0,
  decimalMark: false,

  updateDisplay: function updateDisplay() {
    var value = this.currentInput || this.result.toString();

    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = value.replace(infinite, '∞').replace(NaN, '---');
    this.display.textContent = outval;

    // Update indicator status to show error, memory usage, or nothing
    this.updateIndicator(outval === '---' ? 'E' : this.memory != 0 ? 'M' : ' ');

    var valWidth = this.display.offsetWidth;
    var screenWidth = this.display.parentNode.offsetWidth;
    var scaleFactor = Math.min(1, (screenWidth - 16) / valWidth);
    this.display.style.MozTransform = 'scale(' + scaleFactor + ')';

  },

  // Valid input: M (memory in use), E (error ocurred), something else deletes indicator
  updateIndicator: function updateIndicator(ind) {
    switch (ind) {
      case "M":
      case "E":
        this.indicator.textContent = ind;
        break;

      default:
        this.indicator.textContent = '';
    }
  },

  appendDigit: function appendDigit(value) {
    if (this.inputDigits + 1 > this.significantDigits ||
        this.currentInput === '0' && value === '0') {
      return;
    }
    if (value === '.') {
      if (this.decimalMark) {
        return;
      } else {
        this.decimalMark = true;
      }
      if (!this.currentInput) {
        this.currentInput += '0';
      }
    } else {
      if (this.currentInput === '0' && value !== '0') {
        this.currentInput = '';
      }
      ++this.inputDigits;
    }
    if (!this.operationToBeApplied) {
      this.result = '';
    }
    this.currentInput += value;
    this.updateDisplay();
  },

  // Real backspace behaviour
  removeDigit: function removeDigit() {
    if ((!this.decimalMark && this.inputDigits < 1) || this.currentInput === '0') {
      return;
    }

    this.currentInput = this.currentInput.substr(0, this.currentInput.length - 1);
    --this.inputDigits;

    if (this.decimalMark && this.currentInput.indexOf('.') === -1) {
      this.decimalMark = false;
      ++this.inputDigits;
    }

    if (!this.currentInput) {
      this.currentInput += '0';
    }

    this.updateDisplay();
  },

  appendOperator: function appendOperator(value) {
    this.decimalMark = false;
    if (this.operationToBeApplied) {
      if (this.currentInput) {
        this.calculate();
      }
    } else if (!this.result) {
      this.result = this.currentInput;
      this.currentInput = '';
    }
    switch (value) {
      case '+':
        this.operationToBeApplied = '+';
        break;
      case '-':
        if (this.currentInput || this.result) {
          this.operationToBeApplied = '-';
        } else {
          this.currentInput += '-';
        }
        break;
      case '×':
        this.operationToBeApplied = '*';
        break;
      case '÷':
        this.operationToBeApplied = '/';
        break;
    }
    this.inputDigits = 0;
    this.updateDisplay();
  },

  backSpace: function backSpace() {
    this.currentInput = '';
    this.previousInput = '';
    this.operationToBeApplied = '';
    this.previousOperation = '';
    this.result = 0;
    this.inputDigits = 0;
    this.decimalMark = false;
    this.updateDisplay();
  },

  calculate: function calculate() {
    var tempResult = 0,
        result = parseFloat(this.result),
        currentInput = parseFloat(this.currentInput);
    // Can't use eval here since this will be a packaged app.
    switch (this.operationToBeApplied) {
      case '+':
        tempResult = result + currentInput;
        break;
      case '-':
        tempResult = result - currentInput;
        break;
      case '*':
        tempResult = result * currentInput;
        break;
      case '/':
        if (currentInput == 0) {
            tempResult = NaN;
        } else {
            tempResult = result / currentInput;
        }
        break;
    }
    this.result = parseFloat(tempResult.toPrecision(this.significantDigits));
    if (tempResult >  this.maxDisplayableValue ||
        tempResult < -this.maxDisplayableValue) {
      this.result = this.result.toExponential();
    }

    this.currentInput = '';
    this.operationToBeApplied = '';
    this.inputDigits = 0;
    this.decimalMark = false;
    this.updateDisplay();
  },

  retrieveMemory: function retrieveMemory() {
    var value = parseFloat(window.localStorage.getItem('memory')) || 0;

    if (this.localStorage) {
      if (value !== 0) {
        this.memory = value;
        this.updateIndicator('M');
      } else {
        this.memory = 0;
        this.updateIndicator(' ');
      }
    }
  },

  saveMemoryValue: function saveMemoryValue() {
    if (this.localStorage) {
      window.localStorage.setItem('memory', this.memory + '');
      this.retrieveMemory();
    }
  },

  init: function init() {
    document.addEventListener('mousedown', this);
    this.localStorage = 'localStorage' in window;
    this.retrieveMemory();
    this.updateDisplay();
  },

  // handles the operator highlight
  removeCurrentOperationEle: function removeCurrentOperationEle() {
    if (this.currentOperationEle) {
      this.currentOperationEle.classList.remove('active');
      this.currentOperationEle = null;
    }
  },

  handleEvent: function handleEvent(evt) {
    var target = evt.target;
    var value = target.value;
    switch (target.dataset.type) {
      case 'value':
        this.appendDigit(value);
        break;
      case 'operator':
        this.removeCurrentOperationEle();
        if (this.currentInput || this.operationToBeApplied || this.result) {
          target.classList.add('active');
        }
        this.currentOperationEle = target;
        if (this.currentInput || this.result || value === '-') {
          this.appendOperator(value);
        }
        break;
      case 'command':
        switch (value) {
          case '=':
            if (this.currentInput && this.operationToBeApplied && this.result) {
              this.previousOperation = this.operationToBeApplied;
              this.previousInput = this.currentInput;

              this.removeCurrentOperationEle();
              this.calculate();
            }

            // Issue 13: Press equals to reapply previous operation
            // Not checking for result here allows keep doing operations even if zero is reached.
            // Previous operation is cleared when command C is called, so conventional behaviour isn't affected.
            else if (/*this.result && */this.operationToBeApplied) {
              this.currentInput = this.previousInput = this.result.toString();
              this.previousOperation = this.operationToBeApplied;

              this.removeCurrentOperationEle();
              this.calculate();
            }
            else if (/*this.result && */this.previousOperation) {
              this.operationToBeApplied = this.previousOperation;
              this.currentInput = this.previousInput;
              this.calculate();
            }

            break;

          case '\u232B':
            this.removeDigit();
            break;

          case 'C':
            this.removeCurrentOperationEle();
            this.backSpace();
            break;

          case 'M+':
            if (!this.result) {
              this.result = parseFloat(this.currentInput);
              this.currentInput = '';
            }
            this.memory += this.result;
            this.saveMemoryValue();
            break;

          case 'MR':
            this.retrieveMemory();
            if (this.result && this.operationToBeApplied) {
              this.currentInput = this.memory + '';
            } else {
              this.result = this.memory;
            }
            this.updateDisplay();
            break;
        }
        break;

      case 'indicator':
        if (target.textContent == 'M') {
          // PENDING: Some feedback to avoid unintentional memory clear
          this.memory = 0;
          this.saveMemoryValue();
        }
        break;
    }
  }
};

// String concatenation then number subtraction
Calculator.maxDisplayableValue = '1e' + Calculator.significantDigits - 1;

window.addEventListener('load', function load(evt) {
  window.removeEventListener('load', load);
  Calculator.init();
});
