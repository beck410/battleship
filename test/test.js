/* global describe, it, assert */
;(function(){
  'use strict';
  describe('split ship name and orientation and return name',function(){
    it('should return ships name', function(){
      var ship1 = 'carrier-horizontal';
      var ship2 = 'carrier-vertical';
      var ship3 = 'battleship-horizontal';
      var ship4 = 'battleship-vertical';
      var ship5 = 'submarine-horizontal';
      var ship6 = 'submarine-vertical';
      var ship7 = 'cruiser-horizontal';
      var ship8 = 'cruiser-vertical';
      var ship9 = 'destroyer-horizontal';
      var ship10 = 'destroyer-vertical';
      assert.equal(splitShipType(ship1), 'carrier');
      assert.equal(splitShipType(ship2), 'carrier');
      assert.equal(splitShipType(ship3), 'battleship');
      assert.equal(splitShipType(ship4), 'battleship');
      assert.equal(splitShipType(ship5), 'submarine');
      assert.equal(splitShipType(ship6), 'submarine');
      assert.equal(splitShipType(ship7), 'cruiser');
      assert.equal(splitShipType(ship8), 'cruiser');
      assert.equal(splitShipType(ship9), 'destroyer');
      assert.equal(splitShipType(ship10), 'destroyer');
    });
  });

  describe('find ship sections',function(){ 
    it('should return carrier-horizontal neigbours', function(){
      assert.deepEqual(createShipSectionArray(5,'horizontal',1), [1,2,3,4,5]);
    });
    it('should return carrier-vertical neigbours', function(){
      assert.deepEqual(createShipSectionArray(5,'vertical', 1), [1,11,21,31,41,51]);
    })
  });
})();
