import { expect } from 'chai';

import {
  flatten
} from '../lib/array.js';


describe('array', function() {

  describe('flatten', function() {

    it('should flatten, one level deep', function() {

      // given
      let arr = [
        [ 'A', 1 ],
        [ 'B' ],
        [ 'C', [ 1, 2, 3 ] ],
        [ 'D' ]
      ];

      // then
      expect(flatten(arr)).to.eql([
        'A', 1, 'B', 'C', [ 1, 2, 3 ], 'D'
      ]);
    });

  });

});