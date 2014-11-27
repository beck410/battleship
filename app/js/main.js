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
        shipSections(cell,shipPosition,ship,5);
        break;
      case 'carrier-vertical':
        shipSections();
       break;
      case 'battleship-horizontal':
       shipSections();
      case 'battleship-vertical':
        shipSections();
        break;
      case 'cruiser-horizontal':
        shipSections();
        break;
      case 'cruiser-vertical':
       shipSections();
        break;
      case 'submarine-horizontal':
       shipSections();
       break;
      case 'submarine-vertical':
       shipSections();
       break;
      case 'destroyer-horizontal':
       shipSections();
       break;
      case 'destroyer-vertical':
       shipSections();
        break;
    }
  }

  
  function shipSections(shipFront, position,shipType,sectionLength){
    position = +(position);
    var shipName = splitShipType(shipType);
    if(shipType.indexOf('vertical') === -1){
     $('td').removeClass(shipName + '-horizontal');
     $('td').removeClass(shipName + '-vertical');
     createShipSectionArray(sectionLength,'horizontal','position');
     //var neighborCells = [position, position + 1,position + 2,position + 3,position + 4];
     //  neighborCells.forEach(function(dataPosition){
     //    var n = 1;
     //    var neighbor = $('td[data-position="' + dataPosition + '"]'); 
     //    console.log(neighbor[0]);
     //    neighbor.addClass('carrier-horizonal');
     //    n++;
     //   }//);
     //  return;
    } else {      
      console.log('vertical');
      // $('td').removeClass('carrier-horizontal')
      // $('td').removeClass('carrier-vertical');
      // var neighborCells = [position, position + 10,position + 20,position + 30,position + 40];     
      //       neighborCells.forEach(function(dataPosition){
      //    var n = 1;
      //    var neighbor = $('td[data-position="' + dataPosition + '"]'); 
      //    console.log(neighbor[0]);
      //    neighbor.addClass('carrier-vertical');
      //    n++;
      //    return;
      // }//);
    }
  }

  function splitShipType(shipType){
    var shipTypeArray = shipType.split('-');
    var shipName = shipTypeArray[0];
    return shipName;
  }

  function createShipSectionArray(shipLength, orientation, cell){
    var sectionArray = [];
    var counter = 0;
    if(orientation === 'horizontal'){
      while(sectionArray.length <=  shipLength ){
        var neighbor = cell + counter;
        counter ++;
        sectionArray.push(neighbor);
      }
    } else {
      while(sectionArray.length <= shipLength) {
        var neighbor = cell + counter;
          counter += 10;
        sectionArray.push(neighbor);
      }
    }
    return sectionArray;
  }

//})();
