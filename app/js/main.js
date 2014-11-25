;(function(){
 'use strict'; 
  //jshint jquery: true
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
      handle: '#arrow',
    });

    $('.player-grid table td').droppable({
      greedy: true,
      drop: function(event, ui){
        var shipType = findShipType(ui.draggable);
        var td = $(this)
        $('.player-grid td').removeClass(shipType);
        td.addClass(shipType);
        setShipSections(shipType,td);
      },
      out: function(){
        $(this).removeClass('hasShip');
      },
      tolerance: 'pointer'
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

  function setShipSections(ship){
    //switch statement testing if ship equals shipname-orientation run ship's neighbour fn and add has class to them
    switch (ship, frontOfShip){
      case 'carrier-horizontal':
      case 'carrier-vertical':
        carrierSections(frontOfShip);
       break;
      case 'battleship-horizontal':
      case 'battleship-vertical':
        battleshipSections(frontOfShip);
        break;
      case 'cruiser-horizontal':
      case 'cruiser-vertical':
       cruiserSections(frontOfShip);
        break;
      case 'submarine-horizontal':
      case 'submarine-vertical':
       submarineSections(frontOfShip);
       break;
      case 'destroyer-horizontal':
      case 'destroyer-vertical':
       submarineSections(frontOfShip);
        break;
    }
  }
})();
