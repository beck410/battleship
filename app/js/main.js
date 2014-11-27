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
      var shipsCell = $('.dropped');
      var dataShip = clickedShip.attr('data-ship');
      clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      shipsCell.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      var shipType = findShipType(clickedShip)
      setShipSections(shipType);
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
        $('.player-grid td').removeClass(shipType + ' dropped');
        $(this).addClass(shipType + ' dropped');
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
    shipClasses.forEach(function(ship){
      if(draggable.hasClass(ship)){
        shipClass = ship;
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
        shipSections(cell,shipPosition,ship,5);
        break;
      case 'battleship-horizontal':
      case 'battleship-vertical':
        shipSections(cell,shipPosition,ship,4);
        break;
      case 'cruiser-horizontal':
      case 'cruiser-vertical':
       shipSections(cell,shipPosition,ship,3);
        break;
      case 'submarine-horizontal':
      case 'submarine-vertical':
       shipSections(cell,shipPosition,ship,3);
       break;
      case 'destroyer-horizontal':
      case 'destroyer-vertical':
       shipSections(cell,shipPosition,ship,2);
        break;
    }
  }

  //adds classes to ship's tds
  function shipSections(shipFront, position,shipType,sectionLength){
    position = +(position);
    var shipName = splitShipType(shipType);
    if(shipType.indexOf('vertical') === -1){
      var neighborCells = createShipSectionArray(sectionLength,'horizontal', position);
      removeShipClass(shipName);
      addClassToNeighbors(neighborCells,shipType);
      return;
    } else {      
      var neighborCells = createShipSectionArray(sectionLength, 'vertical', position); 
      removeShipClass(shipName);
      addClassToNeighbors(neighborCells,shipType);
      }
  }
  
  //removes ship class from td when dropped again
  function removeShipClass(ship){
    $('td').removeClass(ship + '-horizontal');
    $('td').removeClass(ship + '-vertical');
  }
  //adds ship class to ship's sections
  function addClassToNeighbors(neighbors,ship){
    var n=1;
    neighbors.forEach(function(dataPosition){
      var neighbor = $('td[data-position="' + dataPosition + '"]'); 
      neighbor.addClass(ship);
      n++;
    });
  }

  //splits ship class into type and orientation
  function splitShipType(shipType){
    var shipTypeArray = shipType.split('-');
    var shipName = shipTypeArray[0];
    return shipName;
  }
  
  //finds ship's sections
  function createShipSectionArray(shipLength, orientation, cell){
    var sectionArray = [];
    var counter = 0;
    if(orientation === 'horizontal'){
      while(sectionArray.length <  shipLength ){
        var neighbor = cell + counter;
        counter ++;
        sectionArray.push(neighbor);
      }
    } else {
      while(sectionArray.length < shipLength) {
        var neighbor = cell + counter;
          counter += 10;
        sectionArray.push(neighbor);
      }
    }
    return sectionArray;
  }

//})();
