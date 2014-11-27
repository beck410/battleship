//;(function(){
 'use strict'; 
  //jshint jquery: true
  $().ready(function(){
    //click events
    //class of selected added to ship when clicked
    $('.ship').click(function(){
      $('.ship').removeClass('selected');
      $(this).addClass('selected');
    });
    
    //.selected is rotated when button clicked
    $('#rotate').click(function(){
    var clickedShip = $('.selected');
    var dataShip = clickedShip.attr('data-ship');
    clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');

    });
     
      //ui.draggable removed from ships when 'Fleet Ready' button clicked
     $('#shipsReady').click(function(){
       $('.ship').draggable('destroy');
     });
    
     //adds ui.draggable to ships
    $('.ship').draggable({ 
      grid: [50,50],
      revert: 'invalid',
      snap: 'td',
      handle: '#arrow',
    });
    
    //adds ui.droppable to table's td
    $('.player-grid table td').droppable({
      greedy: true,
      drop: function(event, ui){
        var shipType = findShipType(ui.draggable);
        $('.player-grid td').removeClass(shipType);
        $(this).addClass(shipType);
        setShipSections(shipType);
      },
      out: function(){
        $(this).removeClass('hasShip');
      },
      tolerance: 'pointer'
    });
  });
  
  //helper functions
  //finds ship type class for selected ship
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

  //checks ship's type class and runs its function to add all parts of ship
  function setShipSections(ship){
    var cell = $('td.' + ship);
    var shipPosition = cell.attr('data-position');
    switch (ship){
      case 'carrier-horizontal':
      case 'carrier-vertical':
        carrierSections(cell, shipPosition);
       break;
      case 'battleship-horizontal':
      case 'battleship-vertical':
        battleshipSections(cell, shipPosition);
        break;
      case 'cruiser-horizontal':
      case 'cruiser-vertical':
       cruiserSections(cell, shipPosition);
        break;
      case 'submarine-horizontal':
      case 'submarine-vertical':
       submarineSections(cell, shipPosition);
       break;
      case 'destroyer-horizontal':
      case 'destroyer-vertical':
       destroyerSections(cell, shipPosition);
        break;
    }
  }

  
  function carrierSections(shipFront, position){
    position = +(position);
    if(shipFront.hasClass('carrier-horizontal')){
     $('td').removeClass('carrier-horizontal');
      $('td').removeClass('carrier-vertical');
      var neighborCells = [position, position + 1,position + 2,position + 3,position + 4];
      neighborCells.forEach(function(dataPosition){
        var n = 1;
        var neighbor = $('td[data-position="' + dataPosition + '"]'); 
        console.log(neighbor[0]);
        neighbor.addClass('carrier-horizonal');
        n++;
       });
      return;
    } else if(shipFront.hasClass('carrier-vertical')){
      $('td').removeClass('carrier-horizontal');
      $('td').removeClass('carrier-vertical');
      var neighborCells = [position, position + 10,position + 20,position + 30,position + 40];     
            neighborCells.forEach(function(dataPosition){
         var n = 1;
         var neighbor = $('td[data-position="' + dataPosition + '"]'); 
         console.log(neighbor[0]);
         neighbor.addClass('carrier-vertical');
         n++;
         return;
      });
    }
  }
  function battleshipSections(shipFront, position){
    console.log(shipFront, position);
  }
  function cruiserSections(shipFront, position){
    console.log(shipFront, position);
  }
  function submarineSections(shipFront, position){
    console.log(shipFront, position);
  }
  function destroyerSections(shipFront, position){
    console.log(shipFront, position);
  }
//})();
