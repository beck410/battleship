/* global describe, it */

;(function(){
  'use strict';

  describe('base test',function(){
    var x = 'foo';
    it('should print out foo', function(){
      assert.equal(x, 'foo');
    })
  })
  describe('test main.js',function(){
    it('should be bar', function(){
      assert.equal(bar(), 'bar');
    })
  })
})();

