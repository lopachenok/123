document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelectorAll('.dropdown');
  for(var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", toggleDropdown);
  }
});

function toggleDropdown(e) {
  var elem = e.target.closest('.dropdown');
  elem.classList.toggle('dropdown--open');
  var options = document.querySelectorAll('.dropdown--open .dropdown__item');
  
  for(var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", selectOption);
  }
}

function selectOption(e) {
  var elem = e.target;
  var option = document.querySelectorAll('.dropdown .dropdown__item--selected');
  option[0].classList.remove('dropdown__item--selected');
  elem.classList.add('dropdown__item--selected');
}
document.addEventListener("DOMContentLoaded", function () {
  var player = document.getElementById('video-player');
  var control = document.querySelector('.video__controls-play');
  var video = document.querySelector('.video__item');
  var flag = false;
 
  video.addEventListener("loadedmetadata", function() {
    var duration = Math.round(video.duration)/100;
    document.querySelector('.video-section__duration').innerHTML = duration;
  });
  
  player.addEventListener("click", function() {
    player.classList.add('video--played');
    flag = !flag;
    
    if(flag) {
      video.play();
    } else {
      video.pause();
    }
    
  });
});
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
//# sourceMappingURL=main.js.map
