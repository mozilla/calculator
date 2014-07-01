$(function () {
  mocha.setup('bdd');
  chai.should();

  describe('Unit Tests', function () {
    describe('Addition', function () {
      it('Should be able to add two positive integers numbers', function () {
        // 1500 + 2000 = 3500
        Start().press(1).press(5).press(0).press(0)
               .press('+')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('3500');

        // 1 + 2 = 3
        Start().press(1).press('+').press(2).press('=').end.should.equal('3');
      });

      it('Should be able to add a negative integer to a positive floating ' +
         'point number', function () {
        // -1 + 1.0000 = 0
        Start().press('-').press(1)
               .press('+')
               .press(1).press('.').press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('0');
      });

      it('Should be able to add a floating point number to an integer',
      function () {
        // 10.1 + 2 = 12.1
        Start().press(1).press(0).press('.').press(1)
               .press('+')
               .press(2)
               .press('=')
               .end.should.equal('12.1');
      })

      it('Should be able to add an integer to a floating point number',
      function () {
        // 10 + 9.9999 = 19.9999
        Start().press(1).press(0)
               .press('+')
               .press(9).press('.').press(9).press(9).press(9).press(9)
               .press('=')
               .end.should.equal('19.9999');
      });

      it('Should be able to add two floating point numbers', function () {
        // 34.999 + 1.0 = 35.999
        Start().press(3).press(4).press('.').press(9).press(9).press(9)
               .press('+')
               .press(1).press('.').press(0)
               .press('=')
               .end.should.equal('35.999');
      });

      it('Should be able to add a negative integer and zero', function () {
        // -5 + 0 = -5
        Start().press('-').press(5)
               .press('+')
               .press(0)
               .press('=')
               .end.should.equal('-5');
      });

      it('Should be able to add zero and a positive integer', function () {
        // 0 + 5 = 5
        Start().press(0)
               .press('+')
               .press(5)
               .press('=')
               .end.should.equal('5');
      });

      it('Should be able to add a negative integer with a positive number',
      function () {
        // -5 + 5 = 0
        Start().press('-').press(5)
               .press('+')
               .press(5)
               .press('=')
               .end.should.equal('0');
      });

      it('Should be able to add two large positive integers', function () {
        // 300000000 + 900000000 = 1.2e+9
        Start().press(3).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('+')
               .press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('1.2e+9');

        // 900000000 + 900000000 = 1.8e+9
        Start().press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('+')
               .press(9).press(0).press(0).press(0).press(0).press(0).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('1.8e+9');

        // 999999999 + 1 = 1.0e+9
        Start().press(9).press(9).press(9).press(9).press(9).press(9).press(9).press(9).press(9)
               .press('+')
               .press(1)
               .press('=')
               .end.should.equal('1e+9');
      });

      it('Should be able to add a negative floating point and a positive ' +
         'integer', function () {
        // -1987.50 + 1987 = -0.5
        Start().press('-').press(1).press(9).press(8).press(7).press('.').press(5).press(0)
               .press('+')
               .press(1).press(9).press(8).press(7)
               .press('=')
               .end.should.equal('-0.5');
      });

      it('Should be able to add a positive integer to the results of a ' +
         'previous operation', function () {
        // 1500 - 2000 = -500 + 500 = 0
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(5).press(0).press(0)
              .press('=')
              .end.should.equal('0');

        // 6 * 2 + 8 = 20
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('+')
              .press(8)
              .press('=')
              .end.should.equal('20');
      });

      it('Should be able to add a positive floating point number to the ' +
         'results of a previous operation', function () {
        // 1500 - 2000 = -500 + 0.25 = -499.75
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(0).press('.').press(2).press(5)
              .press('=')
              .end.should.equal('-499.75');
      });

      it('Should be able to add a floating point number with many decimal ' +
         'places to a previous result', function () {
        // 1500 - 2000 = -500 + 1.23456789 = -498.765432
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-498.765432');
      });

      it('Should be able to add a large integer to a previous result',
      function () {
        // 1500 - 2000 = -500 + 123456789 = 123456289
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('+')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('123456289');
      });
    });

    describe('Subtraction', function () {
      it('Should be able to subtract two positive integers', function () {
        // 1500 - 2000 = -500
        Start().press(1).press(5).press(0).press(0)
               .press('-')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-500');

        // 9 - 3 = 6
        Start().press(9).press('-').press(6).press('=').end.should.equal('3');
      });

      it('Should be able to subtract zero from a negative integer',
      function () {
        // -3 - 0 = -3
        Start().press('-').press(3)
               .press('-')
               .press(0)
               .press('=')
               .end.should.equal('-3');
      });

      it('Should be able to subtract 0 from a positive integer', function () {
        // 3 - 0 = 3
        Start().press(3).press('-').press(0).press('=').end.should.equal('3');
      });

      it('Should be able to subtract a floating point number from a negative ' +
         'integer', function () {
        // -1 - 2.25 = -3.25
        Start().press('-').press(1)
             .press('-')
             .press(2).press('.').press(2).press(5)
             .press('=')
             .end.should.equal('-3.25');
      });

      it('Should be able to subtract an integer from the results of a ' +
         'previous operation', function () {
        // 1500 - 2000 = -500 - 500 = -1000
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(5).press(0).press(0)
              .press('=')
              .end.should.equal('-1000');

        // 6 * 2 = 12 - 8 = 4
        var result = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result.end.should.equal('12');
        result.press('-')
              .press(8)
              .press('=')
              .end.should.equal('4');
      });

      it('Should be able to subtract an integer from a floating point number',
      function () {
        // 9.35 - 1 = 8.35
        Start().press(9).press('.').press(3).press(5)
               .press('-')
               .press(1)
               .press('=')
               .end.should.equal('8.35');
      });

      it('Should be able to subtract a floating point number from an integer',
      function () {
        // 9 - 1.35 = 7.65
        Start().press(9)
               .press('-')
               .press(1).press('.').press(3).press(5)
               .press('=')
               .end.should.equal('7.65');
      })

      it('Should be able to subtract two floating point numbers', function () {
        // 0.29 - 1.35 = -1.06
        Start().press(0).press('.').press(2).press(9)
               .press('-')
               .press(1).press('.').press(3).press(5)
               .press('=')
               .end.should.equal('-1.06');
      });

      it('Should be able to subtract two max-input floating point numbers',
      function () {
        // 7.1234567 - 2.2109876 = 4.9124691
        Start().press(7).press('.').press(1).press(2).press(3).press(4).press(5).press(6).press(7)
               .press('-')
               .press(2).press('.').press(2).press(1).press(0).press(9).press(8).press(7).press(6)
               .press('=')
               .end.should.equal('4.9124691');
      });

      it('An addition of a negative floating point addend, to an integer ' +
         'addend should be treated as a subtraction of a positive integer ' +
         'subtrahend', function () {
        // 1000 + - 10.99 = 989.01
        Start().press(1).press(0).press(0).press(0)
               .press('+')
               .press('-')
               .press(1).press(0).press('.').press(9).press(9)
               .press('=')
               .end.should.equal('989.01');
      });

      it('An addition of a negative floating point addend should be treated ' +
         'as a subtraction of a positive floating point subtrahend',
      function () {
        // -1.0 + - 989.99
        Start().press('-').press(1).press('.').press(0)
               .press('+')
               .press('-')
               .press(9).press(8).press(9).press('.').press(9).press(9)
               .press('=')
               .end.should.equal('-990.99');
      });

      it('An addition of a negative integer addend should be treated as a ' +
         'subtraction of a poisitive integer subtrahend', function () {
        // 50 + - 60 = -10
        Start().press(5).press(0)
               .press('+')
               .press('-')
               .press(6).press(0)
               .press('=')
               .end.should.equal('-10');
      });

      it('An addition of a negative integer addend to another negative ' +
         'integer addend should be treated as a ' +
         'subtraction of a poisitive integer subtrahend', function () {
        // -5 + - 20 = -25
        Start().press('-').press(5)
               .press('+')
               .press('-')
               .press(2).press(0)
               .press('=')
               .end.should.equal('-25');
      });

      it('Should be able to subtract a floating point number from the result ' +
         'of a previous operation', function () {
        // 1500 - 2000 = -500 - 33.12 = -533.12
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(3).press(3).press('.').press(1).press(2)
              .press('=')
              .end.should.equal('-533.12');
      });

      it('Should be able to subtract an integer from a negative floating ' +
         'point number', function () {
        // -1.33 - 2 = -3.33
        Start().press('-').press(1).press('.').press(3).press(3)
               .press('-')
               .press(2)
               .press('=')
               .end.should.equal('-3.33');
      });

      it('Should be able to subtract two large integers', function () {
        // 123456789 - 210987654 = -87530865
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('-')
               .press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('-87530865');
      });

      it('Should be able to subtract two floating point numbers with many ' +
         'digits', function () {
        // 7.12345678 - 2.21098765 = 4.91246913
        Start().press(7).press('.').press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8)
               .press('-')
               .press(2).press('.').press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5)
               .press('=')
               .end.should.equal('4.91246913');
      });

      it('Should be able to subtract a large decimal number from the results ' +
         'of a previous result', function () {
        // 1500 - 2000 = -500 - 12.3456789 = -512.3456789
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(1).press(2).press('.').press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-512.345679');
      });

      it('Should be able to subtract a large integer from the results of a ' +
         'previous result', function () {
        // 1500 - 2000 = -500 - 123456789 = -123457289
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('-')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-123457289');
      });
    });

    describe('Multiplication', function () {
      it('Should be able to multiply two positive integers', function () {
        // 1500 * 2000 = 3000000
        Start().press(1).press(5).press(0).press(0)
               .press('*')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('3000000');

        // 6 * 2 = 12
        Start().press(6).press('*').press(2).press('=').end.should.equal('12');
      });

      it('Should be able to multiply a floating point multiplicand with an ' +
         'integer multipliplier', function () {
        // 1.212 * 8 = 9696
        Start().press(1).press('.').press(2).press(1).press(2)
               .press('*')
               .press(8)
               .press('=')
               .end.should.equal('9.696');
      });

      it('Should be able to multiply an integer multiplicand with a floating ' +
         ' point multiplier', function () {
        // 3 * 1.212 = 3.636
        Start().press(3)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('3.636');
      });

      it('Should be able to multiply two floating point numbers', function () {
        // 0.133 * 1.212 = 0.161196
        Start().press(0).press('.').press(1).press(3).press(3)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('0.161196');
      });

      it('Should be able to multiply a integer multiplicand with zero',
      function () {
        // 1500 * 0 = 0
        Start().press(1).press(5).press(0).press(0)
               .press('*')
               .press(0)
               .press('=')
               .end.should.equal('0');
      });

      it('Should be able to multiply a negative integer multiplicand with a ' +
         'positive intger multiplier', function () {
        // -1500 * 2000 = -3000000
        Start().press('-').press(1).press(5).press(0).press(0)
               .press('*')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-3000000');
      });

      it('Should be able to multiply a negative floating point multiplicand ' +
         'with a positive integer multiplier', function () {
        // -1.212 * 8 = -9.696
        Start().press('-').press(1).press('.').press(2).press(1).press(2)
               .press('*')
               .press(8)
               .press('=')
               .end.should.equal('-9.696');
      });

      it('Should be able to multiply a negative integer multiplicand with a ' +
         'positive floating point multiplier', function () {
        // -8 * 1.212 = -9.696
        Start().press('-').press(8)
               .press('*')
               .press(1).press('.').press(2).press(1).press(2)
               .press('=')
               .end.should.equal('-9.696');
      });

      it('Should be able to multiply the result of a previous operation by a ' +
         'positive floating point number', function () {
        // 1500 - 2000 = -500 * 1.23 = -615
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press('.').press(2).press(3)
              .press('=')
              .end.should.equal('-615');
      });
      it('Should be able to multiply the result of a previous operation by a ' +
         'positive integer', function () {
        // 1500 - 2000 = -500 * 123 = -61500
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3)
              .press('=')
              .end.should.equal('-61500');

        // 6 * 2 = 12 * 8 = 96
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('*')
              .press(8)
              .press('=')
              .end.should.equal('96');
      });
      it('Should be able to multiply two many digit floating point numbers',
      function () {
        // 1.23456789 * 2.10987654 = 2.60478583
        Start().press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('*')
               .press(2).press('.').press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('2.60478583');
      });
      it('Should be able to multiply two large integers', function () {
        // 123456789 * 210987654 = 2.60478583e+16
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('*')
               .press(2).press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('2.60478583e+16');
      });

      it('Should be able to multiply the result of a previous operation by ' +
         'large integer', function () {
        // 1500 - 2000 = -500 * 123456789 = -6.17283945e+10
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-6.17283945e+10');
      });

      it('Should be able to multiply the result of a previous operation by a ' +
         'many digit floating point number', function () {
        // 1500 - 2000 = -500 * 123.456789 = -61728.3945
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('*')
              .press(1).press(2).press(3).press('.').press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-61728.3945');
      });

      it('Should be able to result of a previous operation when the previous ' +
         'result is zero', function () {
        // 0 * 6 * 6 = 0
        Start().press(0).press('*').press(6).press('*').press(6).press('=')
               .end.should.equal('0');
      });
    });

    describe('Division', function () {
      it('Should be able to divide two positive integers', function () {
        // 1500 / 2000 = 0.75
        Start().press(1).press(5).press(0).press(0)
               .press('/')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('0.75');

        // 6 / 2 = 3
        Start().press(6).press('/').press(2).press('=').end.should.equal('3');
      });

      it('Should be able to divide 0 by a integer divisor', function () {
        // 0 / 2000 = 0
        Start().press(0)
             .press('/')
             .press(2).press(0).press(0).press(0)
             .press('=')
             .end.should.equal('0');
      });

      it('Should be able to divide a negative dividend by a positive divisor',
      function () {
        // -1500 / 2000 = -0.75
        Start().press('-').press(1).press(5).press(0).press(0)
               .press('/')
               .press(2).press(0).press(0).press(0)
               .press('=')
               .end.should.equal('-0.75');
      });

      it('Should be able to divide a negative floating point dividend by a ' +
         'positive divisor', function () {
        // -3.123 / 5 = -0.6246
        Start().press('-').press(3).press('.').press(1).press(2).press(3)
               .press('/')
               .press(5)
               .press('=')
               .end.should.equal('-0.6246');
      });

      it('Should be able to divide a negative integer dividend by a positive ' +
         'floating point divisor to nine significiant figures', function () {
        // -5 / 3.123 = -1.60102466
        Start().press('-').press(5)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('-1.60102466');
      });

      it('Should be able to divide an floating point dividend by an integer ' +
         'divisor', function () {
        // 4.21 / 3 = 1.40333333
        Start().press(4).press('.').press(2).press(1)
               .press('/')
               .press(3)
               .press('=')
               .end.should.equal('1.40333333');
      });

      it('Should be able to divide an integer dividend by a floating point ' +
         'divisor', function () {
        // 10 / 3.123 = 3.20204931
        Start().press(1).press(0)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('3.20204931');
      });

      it('Should be able to divide two floating point numbers', function () {
        // 0.234 / 3.123 = 0.0749279539
        Start().press(0).press('.').press(2).press(3).press(4)
               .press('/')
               .press(3).press('.').press(1).press(2).press(3)
               .press('=')
               .end.should.equal('0.0749279539');
      });

      it('Should be able to divide the result of a previous operation by a ' +
         'positive floating point number', function () {
        // 1500 - 2000 = 500 / 3.12 = -160.25641
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(3).press('.').press(1).press(2)
              .press('=')
              .end.should.equal('-160.25641');
      });

      it('Should be able to divide the result of a previous operation by a ' +
         'positive integer', function () {
        // 1500 - 2000 = 500 / 312 = -1.6025641
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(3).press(1).press(2)
              .press('=')
              .end.should.equal('-1.6025641');

        // 6 * 2 = 12 / 8 = 1.5
        var result2 = Start().press(6)
                            .press('*')
                            .press(2)
                            .press('=');
        result2.end.should.equal('12');
        result2.press('/')
              .press(8)
              .press('=')
              .end.should.equal('1.5');
      });

      it('Should report error for division by 0', function () {
        // 1500 / 0 = Error
        Start().press(1).press(5).press(0).press(0)
             .press('/')
             .press(0)
             .press('=')
             .end.should.equal('Error');
        // 6 / 0 = Error
        Start().press(6).press('/').press(0).press('=').end.should.equal('Error');
      });

      it('Should be able to divide two many digit floating point numbers',
      function () {
        // 1.23456789 / 2.10987654 = 0.585137503
        Start().press(1).press('.').press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('/')
               .press(2).press('.').press(1).press(0).press(9).press(8).press(7).press(6).press(5).press(4)
               .press('=')
               .end.should.equal('0.585137503');
      });

      it('Should be able to divide the result of a previous operation by a ' +
         'many digit floating point number', function () {
        // 1500 - 2000 = -500 / 1234.56789 = -0.405000004
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-0.405000004');
      });

      it('Should be able to divide the result of a previous operation by a ' +
         'large integer', function () {
        // 1500 - 2000 = -500 / 123456789 = -0.00000405000004
        var result = Start().press(1).press(5).press(0).press(0)
                            .press('-')
                            .press(2).press(0).press(0).press(0)
                            .press('=');
        result.end.should.equal('-500');
        result.press('/')
              .press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
              .press('=')
              .end.should.equal('-0.00000405000004');
      });
    });

    describe('Clear', function () {
      it('Should be able to clear the screen after inserting a negative ' +
         'floating point number', function () {
        // -12.3 C -> 0
        Start().press('-').press(1).press(2).press('.').press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear the screen after inserting an positive ' +
         'floating point number', function () {
        // 12.3 C -> 0
        Start().press(1).press(2).press('.').press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear the screen after inserting a negative ' +
         'integer', function () {
        // -123 C -> 0
        Start().press('-').press(1).press(2).press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear the screen after inserting a positive ' +
         'integer', function () {
        // 123 C -> 0
        Start().press(1).press(2).press(3)
               .press('C')
               .end.should.equal('0');
      });

      it('Should allow clear to be pressed multiple times', function () {
        // 123456789 C C C -> 0
        var result = Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
                            .press('C');
        result.end.should.equal('0');
        result = result.press('C');
        result.end.should.equal('0');
        result = result.press('C');
        result.end.should.equal('0');
      });

      it('Should be able to clear after inserting a many digit ' +
         'floating point number', function () {
        // 1234.56789 C -> 0
        Start().press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear after inserting a negative many digit ' +
         'floating point number', function () {
        // -1234.56789 C -> 0
        Start().press('-').press(1).press(2).press(3).press(4).press('.').press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear after inserting a large negative intgeger',
      function () {
        // -123456789 C -> 0
        Start().press('-').press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });

      it('Should be able to clear after inserting a large integer', function () {
        // 123456789 C -> 0
        Start().press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .press('C')
               .end.should.equal('0');
      });
    });

    describe('Bad Input', function () {
      it('Should treat an initial press of the decimal mark as "0."',
      function () {
        // .11111 -> 0.11111
        Start().press('.').press(1).press(1).press(1).press(1).press(1)
               .end.should.equal('0.11111');
      });

      it('Should not allow multiple zeros as input', function () {
        // 0000 -> 0
        Start().press(0).press(0).press(0).press(0).end.should.equal('0');
      });

      it('Should not allow multiple zeros before a decimal mark', function () {
        // 000.11111 -> 0.11111
        Start().press(0).press(0).press(0).press('.').press(1).press(1).press(1).press(1).press(1)
               .end.should.equal('0.11111');
      });

      it('Should not allow a zero before another digit of input', function () {
        // 06 -> 6
        Start().press(0).press(6).end.should.equal('6');
      });

      it('Should not allow a zero before another digit of input for a second ' +
         'operand', function () {
        // 6 * 06 -> 6
        Start().press(6).press('*').press(0).press(6).end.should.equal('6');
      });

      it('Should allow floating point input with multiple digits before and ' +
         'after the decimal mark', function () {
        // 1111.11111 -> 1111.11111
        Start().press(1).press(1).press(1).press(1).press('.').press(1).press(1).press(1).press(1).press(1)
             .end.should.equal('1111.11111');
        // 123.567 -> 123.567
        Start().press(1).press(2).press(3).press('.').press(5).press(6).press(7)
               .end.should.equal('123.567');
      });

      it('Should allow a first decimal operand to display a leading zero',
      function () {
        // 0.6 -> 0.6
        Start().press(0).press('.').press(6).end.should.equal('0.6');
        // .6 -> 0.6
        Start().press('.').press(6).end.should.equal('0.6');
      });

      it('Should allow the second decimal operand to display a leading zero',
      function () {
        // 6 * 0.6 -> 0.6
        Start().press(6)
               .press('*')
               .press(0).press('.').press(6)
               .end.should.equal('0.6');
        // 6 * .6 -> 0.6
        Start().press(6)
               .press('*')
               .press('.').press(6)
               .end.should.equal('0.6');
      });

      it('Should allow floating point input with a single digit before and ' +
         'after the decimal mark', function () {
        // 1.1 -> 1.1
        Start().press(1).press('.').press(1).end.should.equal('1.1');
      });

      it('Should not count a decimal mark against max input', function () {
        // 12.3456789 -> 12.3456789
        Start().press(1).press(2).press('.').press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .end.should.equal('12.3456789');
      });

      it('Should not allow a double negation', function () {
        // - - 21 =
        Start().press('-').press('-').press(2).press(1).press('=')
               .end.should.equal('-21');
      });

      it('Should allow the maximum input when the first digit is zero', function () {
        // 0123456789 -> 123456789
        Start().press(0).press(1).press(2).press(3).press(4).press(5).press(6).press(7).press(8).press(9)
               .end.should.equal('123456789');
      });
    });
  });

  mocha.run();
});
