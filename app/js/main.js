;(function(){ 
  $('.ship').click(function(){
    $('.ship').removeClass('selected');
    $(this).addClass('selected');
  })

  $('#rotate').click(function(){
  var clickedShip = $('.selected');
  var dataShip = clickedShip.attr('data-ship');
  
  clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
  })

  $('.ship').draggable({ grid: [50,50], revert: "invalid"});
  $('.player-grid').droppable();

  //remove draggable when readyFire clicked
  $('#shipsReady').click(function(){
    $('.ship').draggable( "destroy" );
  });
})();


