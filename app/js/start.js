;(function(){
  'use strict';
  //jshint jquery: true
  $().ready(function(){

    //click events
    //shows player one grids & runs start functions
    $('#player-one').click(function(){
      var playerOneGrids = '.player-one-grids';
      $(playerOneGrids).css('display','block');
      selectClickedShip(playerOneGrids);
      shipsDraggable(playerOneGrids);
      rotateShips(playerOneGrids);
    });

    //shows player two grids & runs start Functions
    $('#player-two').click(function(){
      var playerTwoGrids = '.player-two-grids';
      $(playerTwoGrids).css('display','block');
      selectClickedShip(playerTwoGrids);
      shipsDraggable(playerTwoGrids);
      rotateShips(playerTwoGrids);
    });
  });

  //HELPER FUNCTIONS
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
      grid: [20,20],
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
        //setShipSections(shipType);
      },
      out: function(){
        $(this).removeClass('hasShip');
      },
      tolerance: 'pointer'
    });

    //ships not draggable when 'Fleet ready' clicked
    $(playerGrid + ' #shipsReady').click(function(){
      $(playerGrid + ' .ship').draggable('destroy');
    });
  }

  //rotate ships horiz. and vertical
  function rotateShips(playerGrid){
    $(playerGrid + ' #rotate').click(function(){
      var clickedShip = $(playerGrid + ' .selected');
      var shipsCell = $('.dropped');
      var dataShip = clickedShip.attr('data-ship');
      clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      shipsCell.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
      //console.log(clickedShip)
      var shipType = findShipType(clickedShip);
      console.log(shipType);
      //setShipSections(shipType);
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

})();
