;(function(){
 'use strict'; 

  $().ready(function(){
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

    $('.ship').draggable({ 
      grid: [50,50],
      revert: 'invalid',
      snap: 'td',
      handle: '#arrow'
    });

    $('.player-grid table td').droppable({
      greedy: true,
      drop: function(event, ui){
        var shipType = findShipType(ui.draggable);
        console.log(shipType);
        console.log(ui.draggable)
        $(this).addClass('hasShip');
      },
      out: function(){
        $(this).removeClass('hasShip');
      }
    });

  //main function

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
