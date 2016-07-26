document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById('carousel');
  var carouselContainer = document.getElementById('carousel-container');
  var detecting, touch, x, y, started, newX, newY, newTouch, delta;
  var screenWidth = parseInt(screen.width);

  carousel.addEventListener("touchstart", function (e) {
    if (e.touches.length != 1 || started) {
      return;
    }

    detecting = true;
    touch = e.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
  });

  carousel.addEventListener("touchmove", function (e) {
    if (!started && !detecting) {
      return;
    }

    if (detecting) {
      detect();
    }

    if (started) {
      draw();
    }
    
    newTouch = e.changedTouches[0];
    newX = newTouch.pageX;
    newY = newTouch.pageY;

    function detect() {
      var changesTouches = Array.prototype.slice.call(e.changedTouches);
     
//      if (changesTouches.indexOf(touch) == -1) {
//        console.log(1)
//        return;
//      }

      if (Math.abs(x - newX) >= Math.abs(y - newY)) {        
        e.preventDefault();
        started = true;
      }

      detecting = false;
    }

    function draw() {
      
      e.preventDefault();

//      if (e.changedTouches.indexOf(touch) == -1) {
//        return;
//      }

      
      delta = x - newX;      
      delta = -delta;
           
      if (delta < 0) {        
        carouselContainer.style.transform = 'translateX('+(delta)+'px)';         
      } else if (delta > 0) {
        carouselContainer.style.transform = 'translateX('+(delta)+'px)';   
      }

    }

  });
  
  carousel.addEventListener("touchend", function() {  
    var translate = carouselContainer.style.transform;
    if(translate !== '') {
      translate = translate.replace('translateX(', '').replace('px)', '');
      translate = parseInt(translate);
      console.log(translate)
      if (delta < 0) {  
         
        if((0 >= translate) && (translate >= -screenWidth)) {
          console.log(-screenWidth)
          carouselContainer.style.transform = 'translateX('+(-screenWidth)+'px)';
        }
        
        if((translate >= 0) && (translate < screenWidth)) { 
          carouselContainer.style.transform = 'translateX(0px)';
        }
      } else if (delta > 0) {
        
        if((0 <= translate) && (translate <= -screenWidth)) {
          carouselContainer.style.transform = 'translateX(0px)';
        }
        
        if((0 >= translate) && (translate >= -screenWidth)) {          
          carouselContainer.style.transform = 'translateX('+(screenWidth)+'px)';
        }
      }
      
    }
    
      
  });
});