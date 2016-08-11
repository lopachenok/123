function is_touch_device() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || navigator.msMaxTouchPoints > 0);
}

var mobileGlobal, touchGlobal;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 document.body.classList.add("mobile");
 mobileGlobal = true; 
}

if(is_touch_device()) {
  document.body.classList.add("touch");
  touchGlobal = true;
}
if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}
document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelectorAll('.dropdown');
  for(var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", toggleDropdown);
  }
  
});

function toggleDropdown(e) {
  var elem;  
  var classList = Array.prototype.slice.call(e.target.classList, 0);
  
  if(classList.indexOf("dropdown") !== -1) {
    elem = e.target;    
  } else {
    elem = e.target.parentElement.parentNode;
  }
  
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
  
  if(!mobileGlobal) {
    video.setAttribute("preload", "true");
  }
 
  video.addEventListener("loadedmetadata", function() {
    var duration = Math.round(video.duration)/100;
    document.querySelector('.video-section__duration').innerHTML = duration;
  });
  
  player.addEventListener("click", function() {
    player.classList.add('video--played');
    
    flag = true;
        
    if(flag) {
      video.play();
    } 
    
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var carouselContainer = document.getElementById("carousel-container");
  var tabs = document.getElementById("tabs");
  var tabsContainer = document.querySelector(".carousel__tabs-container");
  var tabletSize = 768;
  var desctopSize = 1280;
  var scrollButtonCount = 2;
  var carouselContent = document.querySelectorAll(".carousel__content");
  var currentContent = 0;
  var scrollButtonRight = document.querySelector(".carousel__scroll-button--right");
  var scrollButtonLeft = document.querySelector(".carousel__scroll-button--left");
  console.log(scrollButtonRight)
  tabs.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName !== "A") {
      return;
    }
    
    currentContent = e.target.getAttribute("data-tab");
//    
//    if(currentContent == 0) {
//      k = 1.75;
//      scrollOffset = parseInt(window.getComputedStyle(document.querySelector(".medium-column5"), null).width) * k;
//    }
    
    addRemoveScrollButton(carouselContent[currentContent]);
    
    HammerCarousel.prototype.show.apply(outer, [currentContent, 0, true]);
  });
  
  var scrollOffset, k;
  if(window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
    k = 2.15;
  } else {
    k = 3.1;
  }
  
  
  scrollOffset = parseInt(window.getComputedStyle(document.querySelector(".medium-column5"), null).width) * k;
  
  scrollButtonRight.addEventListener("click", function(e) {    
    
    var el = carouselContent[currentContent];
    console.log(currentContent)
    smooth_scroll_to(el, el.scrollLeft + scrollOffset, 500);
  });
  
  scrollButtonLeft.addEventListener("click", function(e) {
    var el = carouselContent[currentContent];
    smooth_scroll_to(el, el.scrollLeft - scrollOffset, 500);
  });
  
  for(var i = 0; i < carouselContent.length; i++) {
    carouselContent[i].addEventListener("scroll", contentScroll);
  }

  var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, "requestAnimationFrame")] || function (callback) {
      setTimeout(callback, 1000 / 60);
    };
  })();

  function dirProp(direction, hProp, vProp) {
    return (direction & Hammer.DIRECTION_HORIZONTAL) ? hProp : vProp;
  }


  /**
   * Carousel
   * @param container
   * @param direction
   * @constructor
   */
  function HammerCarousel(container, direction) {
    this.container = container;
    this.direction = direction;

    this.panes = Array.prototype.slice.apply(this.container.children, [0, length - scrollButtonCount]);
    this.containerSize = this.container[dirProp(direction, "offsetWidth", "offsetHeight")];

    this.currentIndex = 0;

    this.hammer = new Hammer.Manager(this.container);
    this.hammer.add(new Hammer.Pan({
      direction: this.direction,
      threshold: 10
    }));
    this.hammer.on("panstart panmove panend pancancel", Hammer.bindFn(this.onPan, this));

    this.show(this.currentIndex);
  }

  HammerCarousel.prototype = {
    /**
     * show a pane
     * @param {Number} showIndex
     * @param {Number} [percent] percentage visible
     * @param {Boolean} [animate]
     */
    show: function (showIndex, percent, animate) {
      showIndex = Math.max(0, Math.min(showIndex, this.panes.length - 1));
      percent = percent || 0;

      document.querySelector(".carousel__tab--active").classList.remove("carousel__tab--active");
      tabs.children[showIndex].classList.add("carousel__tab--active");
     
      var tabTransform;
      if (window.innerWidth < 430) {        
        if (showIndex === 0) {
          tabsContainer.classList.remove("carousel__tabs-container--end");
          tabsContainer.classList.add("carousel__tabs-container--start");
          tabTransform = 'translate3d(14%, 0, 0)';
        } else if (showIndex === 1) {
          tabsContainer.classList.remove("carousel__tabs-container--end");
          tabsContainer.classList.remove("carousel__tabs-container--start");
          tabTransform = 'translate3d(0, 0, 0)';          
        } else if (showIndex === 2) {
          tabsContainer.classList.remove("carousel__tabs-container--start");
          tabsContainer.classList.add("carousel__tabs-container--end");       
          tabTransform = 'translate3d(-20%, 0, 0)';
        }
      } else {
        tabTransform = 'translate3d(0, 0, 0)';
      }
      
      tabs.style.transform = tabTransform;
      tabs.style.mozTransform = tabTransform;
      tabs.style.webkitTransform = tabTransform;
      
      var className = this.container.className;
        if (animate) {
          if (className.indexOf("animate") === -1) {
            this.container.className += " animate";
          }
        } else {
          if (className.indexOf("animate") !== -1) {
            this.container.className = className.replace("animate", "").trim();
          }
        }
      
      var paneIndex, pos, translate;
      if (window.innerWidth < tabletSize) {      
        for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
          pos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100) + percent);
        
         // if(Math.abs(percent) > 10 || Math.abs(percent) == 0) {
             if (this.direction & Hammer.DIRECTION_HORIZONTAL) {
            translate = "translate3d(" + pos + "px, 0, 0)";
          } else {
            translate = "translate3d(0, " + pos + "px, 0)";
          }
          this.panes[paneIndex].style.transform = translate;
          this.panes[paneIndex].style.mozTransform = translate;
          this.panes[paneIndex].style.webkitTransform = translate;
         // }
          
        }

      } else {
        for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
          translate = "translate3d(0, 0, 0)";
          this.panes[paneIndex].style.transform = translate;
          this.panes[paneIndex].style.mozTransform = translate;
          this.panes[paneIndex].style.webkitTransform = translate;
        }
        document.querySelector(".carousel__content--active").classList.remove("carousel__content--active");
        this.panes[showIndex].classList.add("carousel__content--active");
      }

      this.currentIndex = showIndex;
    },

    /**
     * handle pan
     * @param {Object} ev
     */
    onPan: function (ev) {

      if (window.innerWidth < tabletSize) {
        var delta = dirProp(this.direction, ev.deltaX, ev.deltaY);
        var percent = (100 / this.containerSize) * delta;
        var animate = false;

        if (ev.type == "panend" || ev.type == "pancancel") {
          if (Math.abs(percent) > 20 && ev.type == "panend") {
            this.currentIndex += (percent < 0) ? 1 : -1;
          }
          percent = 0;
          animate = true;
        }

        this.show(this.currentIndex, percent, animate);
      }

    }
  };
  
  if(window.innerWidth >= tabletSize) {
    var outer = new HammerCarousel(carouselContainer);
  } else {
    var outer = new HammerCarousel(carouselContainer, Hammer.DIRECTION_HORIZONTAL);
  } 
  
  var windowSize = {
    x: window.innerWidth,
    y: screen.height
  };
  
  window.onresize = function () {
    
    if(windowSize.x !== window.innerWidth) {
      if(window.innerWidth >= tabletSize) {
        outer = new HammerCarousel(carouselContainer);
      } else {
        outer = new HammerCarousel(carouselContainer, Hammer.DIRECTION_HORIZONTAL);
      } 
    }
    windowSize.x = window.innerWidth;
  };
  
  function contentScroll(e) {    
    var elem = e.target;
    addRemoveScrollButton(elem);
  }
  
  function addRemoveScrollButton(elem) {
    if(elem.clientWidth + elem.scrollLeft === elem.scrollWidth) {
      carouselContainer.classList.remove("carousel__container--start");
      carouselContainer.classList.add("carousel__container--end");
    } else if(elem.scrollLeft === 0) {
      carouselContainer.classList.add("carousel__container--start");
      carouselContainer.classList.remove("carousel__container--end");
    } else {      
      carouselContainer.classList.remove("carousel__container--start");
      carouselContainer.classList.remove("carousel__container--end");
    }
    
    if(elem.clientWidth === elem.scrollWidth) {
      carouselContainer.classList.add("carousel__container--start");
      carouselContainer.classList.add("carousel__container--end");
    }
  }
  
  var smooth_scroll_to = function(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return;
    }
    if (duration === 0) {
        element.scrollLeft = target;
        return scroll();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollLeft;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    }
    
    function scroll() {
        // This is to keep track of where the element's scrollLeft is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollLeft;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if(element.scrollLeft != previous_top) {
                return;
            }

            // set the scrollLeft for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollLeft = frameTop;

            // check if we're done!
            if(now >= end_time) {
                scroll();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollLeft === previous_top
                && element.scrollLeft !== frameTop) {
                scroll();
                return;
            }
            previous_top = element.scrollLeft;

            // schedule next frame for execution
            setTimeout(scroll_frame, 0);
        }

        // boostrap the animation process
        setTimeout(scroll_frame, 0);
    }

    return scroll();
}
  
});
//# sourceMappingURL=main.js.map
