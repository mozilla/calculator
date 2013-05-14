'use strict';

var Calculator = {

  display: document.querySelector('#display b'),
  significantDigits: 9,
  currentOperationEle: null,
  result: 0,
  currentInput: '',
  operationToBeApplied: '',
  inputDigits: 0,
  decimalMark: false,

  updateDisplay: function updateDisplay() {
    var value = this.currentInput || this.result.toString();

    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = value.replace(infinite, '∞');
    this.display.textContent = outval;

    var valWidth = this.display.offsetWidth;
    var screenWidth = this.display.parentNode.offsetWidth;
    var scaleFactor = Math.min(1, (screenWidth - 16) / valWidth);
    this.display.style.MozTransform = 'scale(' + scaleFactor + ')';
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
    }
    if (!this.operationToBeApplied) {
      this.result = '';
    }
    this.currentInput += value;
    this.inputDigits++;
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
    this.operationToBeApplied = '';
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
        tempResult = result / currentInput;
        break;
    }
    this.result = parseFloat(tempResult.toPrecision(this.significantDigits));
    if (tempResult > this.maxDisplayableValue) {
      this.result = this.result.toExponential();
    }

    this.currentInput = '';
    this.operationToBeApplied = '';
    this.inputDigits = 0;
    this.decimalMark = false;
    this.updateDisplay();
  },

  init: function init() {
    document.addEventListener('mousedown', this);
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
              this.removeCurrentOperationEle();
              this.calculate();
            }
            break;
          case 'C':
            this.removeCurrentOperationEle();
            this.backSpace();
            break;
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