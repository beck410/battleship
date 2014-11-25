;(function(){
 'use strict'; 
//click events
 $('.ship').click(function(){
    $('.ship').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#rotate').click(function(){
  var clickedShip = $('.selected');
  var dataShip = clickedShip.attr('data-ship');

  clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
  });

   $('#shipsReady').click(function(){
     $('.ship').draggable('destroy');
   });

   //main functions
  $('.ship').draggable({ 
    grid: [50,50],
    revert: 'invalid',
    snap: 'td',
  });
  $('.player-grid table td').droppable({
    greedy: true,
    drop: function(event, ui){
      var shipType = findShipType(ui.draggable);
      console.log(shipType);
      $(this).addClass('hasShip');
    },
    out: function(){
      $(this).removeClass('hasShip');
    }
  });

  //helper functions
  function findShipType(draggable){
    var shipClasses = ['carrier-horizontal','battleship-horizontal', 'cruiser-horizontal', 'submarine-horizontal', 'destroyer-horizontal', 'carrier-vertical', 'battleship-vertical', 'cruiser-vertical','submarine-vertical', 'destroyer-vertical'];
    var shipClass;
    shipClasses.forEach(function(className){
      if(draggable.hasClass(className)){
        shipClass = className;
        return;
      }
    });
    return shipClass;
  }
})();
