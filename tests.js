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
               .equals().should.equal(3500);
      });

      it('Should be able to add a negative integer to a positive floating ' +
         'point number', function () {
        // -1 + 1.0000 = 0
        Start().press('-').press(1)
               .press('+')
               .press(1).press('.').press(0).press(0).press(0).press(0)
               .equals().should.equal(0);
      });

      it('Should be able to add a floating point number to an integer',
      function () {
        // 10.1 + 2 = 12.1
        Start().press(1).press(0).press('.').press(1)
               .press('+')
               .press(2)
               .equals().should.equal(12.1);
      })

      it('Should be able to add an integer to a floating point number',
      function () {
        // 10 + 9.9999 = 19.9999
        Start().press(1).press(0)
               .press('+')
               .press(9).press('.').press(9).press(9).press(9).press(9)
               .equals().should.equal(19.9999);
      });

      it('Should be able to add two floating point numbers', function () {
        // 34.999 + 1.0 = 35.999
        Start().press(3).press(4).press('.').press(9).press(9).press(9)
               .press('+')
               .press(1).press('.').press(0)
               .equals().should.equal(35.999);
      });

      it('Should be able to add a negative integer and zero', function () {
        // -5 + 0 = -5
        Start().press('-').press(5)
               .press('+')
               .press(0)
               .equals().should.equal(-5);
      });

      it('Should be able to add zero and a positive integer', function () {
        // 0 + 5 = 5
        Start().press(0)
               .press('+')
               .press(5)
               .equals().should.equal(5);
      });

      it('Should be able to add a negative integer with a positive number',
      function () {
        // -5 + 5 = 0
        Start().press('-').press(5)
               .press('+')
               .press(5)
               .equals().should.equal(0);
      });
    });

    describe('Subtraction', function () {
      it('Should be able to subtract two positive integers', function () {
        Start().press(1).press('-').press(1).equals().should.equal(0);
      });
    });

    describe('Multiplication', function () {
      it('Should be able to multiply two positive integers', function () {
        Start().press(1).press('*').press(9).press(9).equals().should.equal(99);
      });
    });

    describe('Division', function () {
      it('Should be able to divide two positive integers', function () {
        Start().press(1).press('/').press(5).equals().should.equal(0.2);
      });
    });
  });

  mocha.run();
});
