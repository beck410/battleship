/* global describe, it, assert */
;(function(){
  'use strict';
   describe('find ship type(class)',function(){
     var draggable1 = [<div data-ship="carrier "class="cruiser-horizontal ship ui-draggable ui-draggable-dragging"></div>];
     var draggable2= '<td class="battleship-horizontal"></td>';
     var draggable3 = '<td class="destroyer-vertical"></td>';
     var draggable4 = '<td class="submarine-vertical"></td>';
     it('should print cruiser-horizontal', function(){
       assert.equal(findShipType(draggable1[0]), 'cruiser-horizontal');
     });
   });
  })();

