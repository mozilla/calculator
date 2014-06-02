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
      return new Evt(input.toString(), 'value');
    } else if ('+-/*'.split('').indexOf(input) > -1) {
      if (input === '/') {
        input = '÷';
      } else if (input === '*') {
        input = '×';
      }
      return new Evt(input, 'operator');
    } else if ('C='.split('').indexOf(input) > -1) {
      return new Evt(input, 'command');
    } else {
      throw new Error('Bad input to translate: ' + input.toString());
    }
  }

  // DSL
  // Factory pattern
  function Start () {
    if (this === window) return new Start();
    Calculator.handleEvent(translate('C'));
  }

  Start.prototype = {
    press: function press (input) {
      Calculator.handleEvent(translate(input));
      return this;
    },
    clear: function clear () {
      Calculator.handleEvent(translate('C'));
    }
  };

  Object.defineProperty(Start.prototype, 'end', {
    get: function end () {
      return $('#display div').text();
    }
  });
  window.Start = Start;
});
