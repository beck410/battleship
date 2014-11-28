;(function(){
  'use strict';
  //jshint jquery: true
  $().ready(function(){

    //click events
    //shows player one grids
    $('#player-one').click(function(){
      var playerOneGrids = '.player-one-grids';
      $(playerOneGrids).css('display','block');
      playerStart(playerOneGrids);
      rotateShips(playerOneGrids);
    });

    //shows player two grids
    $('#player-two').click(function(){
      var playerTwoGrids = '.player-two-grids';
      $(playerTwoGrids).css('display','block');
      playerStart(playerTwoGrids);
      rotateShips(playerTwoGrids);
    });
  });

  //HELPER FUNCTIONS
  //sets ships on grid
  function playerStart(playerGrid){
    $(playerGrid + ' .ship').click(function(){
      $(playerGrid + ' .ship').removeClass('selected');
      $(this).addClass('selected');
    });
  }

  function rotateShips(playerGrid){
    $(playerGrid + ' #rotate').click(function(){
       var clickedShip = $(playerGrid + ' .selected');
       var shipsCell = $('.dropped');
       var dataShip = clickedShip.attr('data-ship');
       clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
       //shipsCell.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
       //console.log(clickedShip)
       var shipType = findShipType(clickedShip);
       console.log(shipType);
       //setShipSections(shipType);
    });
 };
  
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
