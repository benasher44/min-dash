var chai = require('chai');

var expect = chai.expect;

var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

import {
  bind,
  debounce,
  throttle
} from '../lib/fn';


describe('fn', function() {

  describe('bind', function() {

    it('should bind fn', function() {

      // given
      var fn = function() {
        return this.foo;
      };

      var target = { foo: 'FOO' };

      // when
      var boundFn = bind(fn, target);

      var result = boundFn();

      // then
      expect(result).to.eql('FOO');
    });

  });


  describe('debounce', function() {

    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });


    it('should debounce fn', function() {

      var callback = sinon.spy();
      var debounced = debounce(callback, 100);

      // when
      debounced();

      // then
      expect(callback).not.to.have.been.called;

      // ticked...
      clock.tick(99);

      // then
      expect(callback).not.to.have.been.called;

      // when
      debounced();

      // then
      expect(callback).not.to.have.been.called;

      // debounce timer elapsed
      clock.tick(101);

      // then
      expect(callback).to.have.been.calledOnce;
    });

  });


  describe('throttle', function() {

    var clock;

    beforeEach(function() {
      clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      clock.restore();
    });


    it('should throttle fn', function() {

      var callback = sinon.spy();
      var throttled = throttle(callback, 100);

      // when
      throttled();

      // then
      expect(callback).to.have.been.calledOnce;

      // ticked...
      clock.tick(99);

      throttled();

      // then
      expect(callback).to.have.been.calledOnce;

      // throttle interval elapsed
      clock.tick(101);

      // when
      throttled();

      // then
      expect(callback).to.have.been.calledTwice;
    });

  });

});