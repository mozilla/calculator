$(function () {
  function Evt (value, type) {
    this.target = {
      value: value,
      dataset: {
        type: type
      },
      classList: {
        remove: function remove () {},
        add: function add () {}
      }
    };
  }
  function translate (input) {
    if (typeof input === 'number' && input < 10 && input >= 0 || input === '.') {
      return new Evt(input, 'value');
    } else if ('+-/*'.split('').indexOf(input) > -1) {
      if (input === '/') {
        input = '÷';
      } else if (input === 'x') {
        input = '×';
      }
      return new Evt(input, 'operator');
    } else if ('C='.split('').indexOf(input) > -1) {
      return new Evt(input, 'command');
    } else {
      throw new Error('Bad input to translate: ' + input.toString());
    }
  }

  const VALID_INPUT_RE = /[^0-9\+-×÷]/;
  // DSL
  // Factory pattern
  function Start () {
    if (this === window) return new Start();
    this.input = '';
    Calculator.handleEvent(translate('C'));
  }

  Start.prototype = {
    press: function press (input) {
      this.input += input.toString() + ' ';
      Calculator.handleEvent(translate(input));
      return this;
    },
    valueOf: function valueOf () {
      console.log("VALUEOF CALLED");
      return this.input.toString();
    },
    toString: function toString () {
      return this.input.toString();
    },
    equals: function equals () {
      Calculator.handleEvent(translate('='));
      return parseFloat($('#display b').text(), 10);
    },
    clear: function clear () {
      Calculator.handleEvent(translate('C'));
    }
  };
  window.Start = Start;
});