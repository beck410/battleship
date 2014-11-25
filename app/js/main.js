;(function(){
 'use strict'; 
  $('.ship').click(function(){
    $('.ship').removeClass('selected');
    $(this).addClass('selected');
  })

  $('#rotate').click(function(){
  var clickedShip = $('.selected');
  var dataShip = clickedShip.attr('data-ship');

  clickedShip.toggleClass(dataShip + '-horizontal').toggleClass(dataShip + '-vertical');
  })

  $('.ship').draggable({ 
    grid: [50,50],
    revert: 'invalid',
    snap: 'td',
  });
  $('.player-grid table td').droppable({
    drop: function(event, ui){
      $(this).addClass('hasShip');
    },
    out: function(event, ui){
      $(this).removeClass('hasShip')
    }
  });

  //remove draggable when readyFire clicked
   $('#shipsReady').click(function(){
     shipArray();
     $('.ship').draggable('destroy');
   });
})();
