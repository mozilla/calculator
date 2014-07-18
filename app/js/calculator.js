'use strict';

var Calculator = {

  display: document.querySelector('#display div'),
  significantDigits: 9,
  currentOperationEle: null,
  result: 0,
  currentInput: '',
  operationToBeApplied: '',
  inputDigits: 0,
  decimalMark: false,
  calcDigitWidth: true,

  updateDisplay: function updateDisplay() {
    var value = this.currentInput || this.result.toString();
    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = value.replace(infinite, '∞').replace(NaN, 'Error');
    this.display.textContent = outval;
    var screenWidth = this.display.parentNode.offsetWidth;
    var valWidth = this.display.offsetWidth;
    if(parseInt(this.display.textContent.length, 10) === 1) {
      this.display.style.fontSize = "8.2rem";
    }
    if(screenWidth - valWidth <= (60 * window.devicePixelRatio)) {
      if(this.calcDigitWidth){
        /*
         * 2.7 is the difference between the initial font size value 8.2 and
         * the smallest possible font size, 5.5.
         * 9 is the maximum number of digits.
         * We look for how many digits we are allowed to add until we reach 9
         * and then we divide that number by 2.7.
         * This way we know exactly how much we can decrease in the font size
         * With every new added digit until we reach the 5.5 value.
         */
        window.fontDecreaseValue = parseFloat((9 - this.display.textContent.length) / 2.7);
        this.calcDigitWidth = false;
      }
      var currentFontSize = parseFloat(this.display.style.fontSize);
      var fontNewValue = currentFontSize - fontDecreaseValue;
      this.display.style.fontSize = fontNewValue + "rem";
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

  appendOperator: function appendOperator(value) {
    this.decimalMark = false;
    if (this.operationToBeApplied && this.currentInput) {
      this.calculate();
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
          this.updateDisplay();
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
  },

  backSpace: function backSpace() {
    this.currentInput = '';
    this.operationToBeApplied = '';
    this.result = 0;
    this.inputDigits = 0;
    this.decimalMark = false;
    this.updateDisplay();
    this.calcDigitWidth = false;
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
    if (tempResult > this.maxDisplayableValue ||
        tempResult < -this.maxDisplayableValue) {
      this.result = this.result.toExponential();
    }

    this.currentInput = '';
    this.operationToBeApplied = '';
    this.inputDigits = 0;
    this.decimalMark = false;
    this.updateDisplay();
  },

  init: function init() {
    this.display.style.lineHeight = this.display.offsetHeight + "px";
    document.addEventListener('mousedown', this);
    document.addEventListener('touchstart', function(evt){
      var target = evt.target;
      if ((target.dataset.type == "value") || (target.value == "C") || (target.value == "=")) {
        target.classList.add("active");
      }
    });
    document.addEventListener('touchend', function(evt){
      var target = evt.target;
      if ((target.dataset.type == "value") || (target.value == "C") || (target.value == "=")) {
        target.classList.remove("active");
      }
    });
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
        if (value === '-' && this.currentInput === '-') {
          return;
        }
        this.removeCurrentOperationEle();
        if (this.currentInput || this.result) {
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
