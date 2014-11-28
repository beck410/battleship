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
    });

    //shows player two grids
    $('#player-two').click(function(){
      var playerTwoGrids = '.player-two-grids';
      $(playerTwoGrids).css('display','block');
      playerStart(playerTwoGrids);
    });
  });

  //HELPER FUNCTIONS
  //sets ships on grid
  function playerStart(playerGrid){
    $(playerGrid + ' .ship').click(function(){
      console.log("1");
      $(playerGrid + ' .ship').removeClass('selected');
      $(this).addClass('selected');
    });
  } 
})();
