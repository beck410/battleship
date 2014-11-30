//;(function(){
  'use strict';
  //jshint jquery: true
  //global vars
  var readyCounter = 0;
  var turnCounter = 0;
  $().ready(function(){
    //click events
    //shows player one grids & runs start functions
    $('#player-one').click(function(){
      $('#player-one').css('display','none');
      var playerOneGrids = '.player-one-grids';
      $(playerOneGrids).css('display','block');
      selectClickedShip(playerOneGrids);
      shipsDraggable(playerOneGrids);
      rotateShips(playerOneGrids);
      shipsReady(playerOneGrids);
    });

    //shows player two grids & runs start Functions
    $('#player-two').click(function(){
      $('#player-two').css('display','none');
      var playerTwoGrids = '.player-two-grids';
      $(playerTwoGrids).css('display','block');
      selectClickedShip(playerTwoGrids);
      shipsDraggable(playerTwoGrids);
      rotateShips(playerTwoGrids);
      shipsReady(playerTwoGrids);
    });

    
  });

  
  //HELPER FUNCTIONS
  function shipsReady(playerGrid){
    //ships not draggable when 'Fleet ready' clicked
    $(playerGrid + ' #shipsReady').click(function(){
      $(playerGrid + ' .ship').draggable('destroy');
      $(playerGrid + ' .start-buttons').css('display','none');
      readyCounter ++;
      beginGame(playerGrid);
    });
  }

  //set up game play
  function beginGame(playerGrid){
    beginGameMessages(playerGrid);
    if(readyCounter === 2){
      
      var turn = playerTurn(); 
    } 
  }

  function playerTurn(){
    if(turnCounter%2 === 0){
      $('.turn').text('Player One\'s Turn');
      return 'playerOne';
    } else {
      $('.turn').text('Player Two\'s Turn')
      return 'playerTwo';
    }
  }

  function beginGameMessages(playerGrid){
      if(readyCounter === 1){
      $(playerGrid + ' .waiting').css('display','block');
      return;
    } else if(readyCounter === 2){
      $('.waiting').css('display','none');
    }

  }

  //sets ships on grid
  function selectClickedShip(playerGrid){
    $(playerGrid + ' .ship').click(function(){
      $(playerGrid + ' .ship').removeClass('selected');
      $(this).addClass('selected');
    });
  }

  //ships become draggable and grids are droppable
  function shipsDraggable(playerGrid){

    //adds ui.draggable to ships
    $(playerGrid + ' .ship').draggable({
      grid: [40,40],
      revert: 'invalid',
      snap: 'td',
      handle: '#arrow'
    });

    //adds ui.droppable to table's td
    $(playerGrid + ' table td').droppable({
      greedy: true,
      drop: function(event, ui){
        var shipType = findShipType(ui.draggable);
        $(playerGrid + ' td').removeClass(shipType + ' dropped');
        $(this).addClass(shipType + ' dropped');
        setShipSections(playerGrid,shipType);
      },
      out: function(){
        $(this).removeClass('hasShip');
      },
      tolerance: 'pointer'
    });
  }

  //rotate ships horiz. and vertical
  function rotateShips(playerGrid){
    $(playerGrid + ' #rotate').click(function(){
      var clickedShip = $(playerGrid + ' .selected');
      var shipsCell = $(playerGrid + ' .dropped');
      var dataShip = clickedShip.attr('data-ship');
      clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      shipsCell.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      var shipType = findShipType(clickedShip);
      setShipSections(playerGrid, shipType);
    });
  }

  //finds ship type class for selected ship
  function findShipType(clickedShip){
    var shipClasses = ['carrier-horizontal','battleship-horizontal', 'cruiser-horizontal', 'submarine-horizontal', 'destroyer-horizontal', 'carrier-vertical', 'battleship-vertical', 'cruiser-vertical','submarine-vertical', 'destroyer-vertical'];
    var shipClass;
    shipClasses.forEach(function(ship){
      if(clickedShip.hasClass(ship)){
        shipClass = ship;
        return;
      }
    });
    return shipClass;
  }

  //checks ship's type class and runs its function to add all parts of ship
  function setShipSections(playerGrid, ship){
    var cell = $(playerGrid + ' td.' + ship);
    var shipPosition = cell.attr('data-position');
    switch (ship){
      case 'carrier-horizontal':
      case 'carrier-vertical':
        shipSections(cell,shipPosition,ship,5, playerGrid);
        break;
      case 'battleship-horizontal':
      case 'battleship-vertical':
        shipSections(cell,shipPosition,ship,4, playerGrid);
        break;
      case 'cruiser-horizontal':
      case 'cruiser-vertical':
        shipSections(cell,shipPosition,ship, 3,playerGrid);
        break;
      case 'submarine-horizontal':
      case 'submarine-vertical':
        shipSections(cell,shipPosition,ship,3, playerGrid);
        break;
      case 'destroyer-horizontal':
      case 'destroyer-vertical':
        shipSections(cell,shipPosition,ship,2,playerGrid);
        break;
    }
  }

  //adds classes to ship's tds
  function shipSections(shipFront, position,shipType,sectionLength, playerGrid){
    position = +(position);
    var shipName = splitShipType(shipType);
    if(shipType.indexOf('vertical') === -1){
      var neighborCells = createShipSectionArray(sectionLength,'horizontal', position);
      removeShipClass(shipName, playerGrid);
      addClassToNeighbors(neighborCells,shipType, playerGrid);
      return;
    } else {
      var neighborCells = createShipSectionArray(sectionLength, 'vertical', position);
      removeShipClass(shipName, playerGrid);
      addClassToNeighbors(neighborCells,shipType, playerGrid);
    }
  }

  //removes ship class from td when dropped again
  function removeShipClass(ship, playerGrid){
    $(playerGrid + ' td').removeClass(ship + '-horizontal');
    $(playerGrid + ' td').removeClass(ship + '-vertical');
  }

  //adds ship class to ship's sections
  function addClassToNeighbors(neighbors,ship, playerGrid){
    var n=1;
    neighbors.forEach(function(dataPosition){
      var neighbor = $(playerGrid + ' td[data-position="' + dataPosition + '"]');
      neighbor.addClass(ship);
      n++;
    });
  }

  //find ship's sections
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

  //splits ship class into type and orientation
  function splitShipType(shipType){
    var shipTypeArray = shipType.split('-');
    var shipName = shipTypeArray[0];
    return shipName;
  }

  //check if any ship sections are outside boundary - only works for those with neighbors below 1 and above 100
  function checkGridBoundaries(shipSections){
    var outsideGrid = true;
    var n = 0;
    while(outsideGrid === true && n<shipSections.length){
      if(!(shipSections[n] > 0 && shipSections[n] < 101)){
        outsideGrid = false;
      }
      n++;
    }
    return outsideGrid;
  }

//})();
