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
      assert.deepEqual(createShipSectionArray(5,'vertical', 1), [1,11,21,31,41]);
    })
  });

  describe('check if ship is outside boundaries',function(){
    it('should return true',function(){
      var shipSection1 = [1,2,3,4,5];
      var shipSection2 = [1,11,21,31,41];
      var shipSection3 = [40.41,42,43];
      var shipSection4 = [97,98,99,100];
      assert.equal(checkGridBoundaries(shipSection1),true);
      assert.equal(checkGridBoundaries(shipSection2),true);
      assert.equal(checkGridBoundaries(shipSection3),true);
      assert.equal(checkGridBoundaries(shipSection4),true);
    });
    it('should return false', function(){
      var shipSection5 = [-1,0,1,2];
      var shipSection6 = [-3,-2,-1,0,1];
      var shipSection7 = [98.99,100,101];
      var shipSection8 = [-11,-1,11];
      assert.equal(checkGridBoundaries(shipSection5),false);
      assert.equal(checkGridBoundaries(shipSection6),false);
      assert.equal(checkGridBoundaries(shipSection7),false);
      assert.equal(checkGridBoundaries(shipSection8),false);
    });
  });
})();
