'use strict';

var Calculator = {

  display: document.querySelector('#display b'),
  significantDigits: 9,
  currentOperationEle: null,
  result: '',
  currentInput: '',
  operationToBeApplied: null,
  negateCurrentInput: false,

  updateDisplay: function updateDisplay() {
    var value = this.currentInput || this.result || '0';

    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = value.replace(infinite, '∞');
    this.display.innerHTML = outval;

    var valWidth = this.display.offsetWidth;
    var screenWidth = this.display.parentNode.offsetWidth;
    var scaleFactor = Math.min(1, (screenWidth - 16) / valWidth);
    this.display.style.MozTransform = 'scale(' + scaleFactor + ')';
  },

  appendDigit: function appendDigit(value) {
    if (this.negateCurrentInput) {
      this.negateCurrentInput = false;
      this.currentInput += '-' + value.toString();
    } else {
      this.currentInput += value.toString();
    }
    this.updateDisplay();
  },

  appendOperator: function appendOperator(value) {
    this.negateCurrentInput = false;
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
        this.operationToBeApplied = '+'
        break;
      case '-':
        if (this.currentInput || this.result) {
          this.operationToBeApplied = '-';
        } else {
          this.negateCurrentInput = true;
        }
        break;
      case '×':
        this.operationToBeApplied = '*';
        break;
      case '÷':
        this.operationToBeApplied = '/';
        break;
    }
    this.updateDisplay();
  },

  backSpace: function backSpace() {
    this.currentInput = '';
    this.operationToBeApplied = '';
    this.result = '';
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
    if (tempResult > this.maxDisplayableValue) {
      this.result = tempResult.toExponential(0).toString();
    } else {
      this.result = parseFloat(tempResult.toPrecision(this.significantDigits)).toString();
    }

    this.currentInput = '';
    this.operationToBeApplied = '';
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