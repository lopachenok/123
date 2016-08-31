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
  var dropdown = document.querySelectorAll(".dropdown");
  document.addEventListener("click", closeDropdown);
  document.addEventListener("touchstart", closeDropdown);
  
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
  
  elem.classList.toggle("dropdown--open");
  var options = elem.children[0].children;
  for(var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", selectOption);
  }
}

function closeDropdown(e) {
  var classList = Array.prototype.slice.call(e.target.classList, 0);
  var parentClassList = Array.prototype.slice.call(e.target.parentElement.parentNode.classList, 0);
  
  if(document.querySelector(".dropdown--open") && classList.indexOf("dropdown") == -1 && parentClassList.indexOf("dropdown") == -1) {
    document.querySelector(".dropdown--open").classList.remove("dropdown--open");
  }
  
}

function selectOption(e) {  
  var elem = e.target; 
  var option = elem.parentElement.querySelectorAll(".dropdown .dropdown__item--selected");
   
  option[0].classList.remove("dropdown__item--selected");
  elem.classList.add("dropdown__item--selected");
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
var popups;
var scrollButtonCount = 2;
var tabletSize = 768;
var desctopSize = 1280;  
var popupInner;
var heightArray;

document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById("carousel");
  var popupsEl = document.getElementById("popups");  
  var carouselContent = document.querySelectorAll("#carousel-container .carousel__content");
  var popupContentBlock = document.querySelectorAll("#popup-container .carousel__content");
  popupInner = document.querySelector("#popups .carousel__inner");
  
  var scrollButtonRight = document.querySelector(".carousel__scroll-button--right");
  var scrollButtonLeft = document.querySelector(".carousel__scroll-button--left");
 
  var scrollOffset, k;
  if(window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
    k = 2.5;
  } else {
    k = 3.2;
  }  
  
  scrollOffset = parseInt(window.getComputedStyle(document.querySelector(".medium-column5"), null).width) * k;
  
  scrollButtonRight.addEventListener("click", function(e) {    
    var currentContent = outer.currentIndex;
    var el = outer.panes[currentContent];
    smooth_scroll_to(el, el.scrollLeft + scrollOffset, 500);
  });
  
  scrollButtonLeft.addEventListener("click", function(e) {
    var currentContent = outer.currentIndex;
    var el = outer.panes[currentContent];
    smooth_scroll_to(el, el.scrollLeft - scrollOffset, 500);
  });
  
  for(var i = 0; i < carouselContent.length; i++) {
    carouselContent[i].addEventListener("scroll", contentScroll);
  }
  
  heightArray = [];
  Array.prototype.forEach.call(popupContentBlock, function(content) {
    heightArray.push(content.clientHeight);
  });

  if(window.innerWidth >= tabletSize) {
    var outer = new HammerCarousel(carousel);
    popups = new HammerCarousel(popupsEl);
  } else {
    var outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
    popups = new HammerCarousel(popupsEl, Hammer.DIRECTION_HORIZONTAL);
  } 
  
  var windowSize = {
    x: window.innerWidth,
    y: window.innerHeight
  };
  
  window.onresize = function () {
    
    if(windowSize.x !== window.innerWidth) {
      var i = outer.currentIndex;
      var j = popups.currentIndex;
      
      if(window.innerWidth >= tabletSize) {        
        outer = new HammerCarousel(carousel);
        popups = new HammerCarousel(popupsEl);
      } else {
        outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
        popups = new HammerCarousel(popupsEl, Hammer.DIRECTION_HORIZONTAL);
      }
      
      HammerCarousel.prototype.show.apply(outer, [i, 0, true]);
      document.getElementById("popups-overlay").classList.add("no-animate");
      HammerCarousel.prototype.show.apply(popups, [j, 0, true]);
      setTimeout(function() {
        document.getElementById("popups-overlay").classList.remove("no-animate");
      }, 0);
      
      heightArray = [];
      Array.prototype.forEach.call(popupContentBlock, function(content) {
        heightArray.push(content.clientHeight);
      });
      
    }
    windowSize.x = window.innerWidth;
  };
  
  function contentScroll(e) {    
    var elem = e.target;
    addRemoveScrollButton(elem, elem.parentElement);
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

function addRemoveScrollButton(elem, container) {
    if(elem.clientWidth + elem.scrollLeft === elem.scrollWidth) {
      container.classList.remove("carousel__container--start");
      container.classList.add("carousel__container--end");
    } else if(elem.scrollLeft === 0) {
      container.classList.add("carousel__container--start");
      container.classList.remove("carousel__container--end");
    } else {      
      container.classList.remove("carousel__container--start");
      container.classList.remove("carousel__container--end");
    }
    
    if(elem.clientWidth === elem.scrollWidth) {
      container.classList.add("carousel__container--start");
      container.classList.add("carousel__container--end");
    }
  }

 var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, "requestAnimationFrame")] || function (callback) {
      setTimeout(callback, 1000 / 60);
    };
  })();

 function dirProp(direction, hProp, vProp) {
    return (direction & Hammer.DIRECTION_HORIZONTAL) ? hProp : vProp;
  }


 function HammerCarousel(container, direction) {
    this.container = container.children[1].children[0];
    this.tabs = container.children[0].children[0];
    this.tabsContainer = container.children[0];
    this.direction = direction; 
    this.currentIndex = 0;
    
    if(this.container.id == "carousel-container") {      
      this.panes = Array.prototype.slice.apply(this.container.children, [0, length - scrollButtonCount]);      
    } else {      
      this.panes = Array.prototype.slice.call(this.container.children, 0);
    }
   
    this.tabsOffset = ((this.tabs.clientWidth - 16 - window.innerWidth)/2);

    var self = this;
    this.tabs.addEventListener("click", function(e) {
      
      carouselContent = self.panes;
      e.preventDefault();
      if (e.target.tagName !== "A") {
        return;
      }
    
      currentContent = e.target.getAttribute("data-tab");
    
      if(self.currentIndex == 0) {
        k = 1.75;
        scrollOffset = parseInt(window.getComputedStyle(document.querySelector(".medium-column5"), null).width) * k;
      }
    
      addRemoveScrollButton(carouselContent[currentContent], self.container);     
      HammerCarousel.prototype.show.apply(self, [currentContent, 0, true]);
    });    
    
    this.containerSize = this.container[dirProp(direction, "offsetWidth", "offsetHeight")];

    this.hammer = new Hammer.Manager(this.container);
    this.hammer.add(new Hammer.Pan({
      direction: this.direction,
      threshold: 10
    }));
    this.hammer.on("panstart panmove panend pancancel", Hammer.bindFn(this.onPan, this));

    this.show(this.currentIndex);
  }

  HammerCarousel.prototype = {
   
    show: function (showIndex, percent, animate) {
      showIndex = Math.max(0, Math.min(showIndex, this.panes.length - 1));
      percent = percent || 0;

      Array.prototype.forEach.call(this.tabs.children, function(tab) {
        if(tab.classList[1] == 'carousel__tab--active') {
          tab.classList.remove("carousel__tab--active");
        };
      });
      this.tabs.children[showIndex].classList.add("carousel__tab--active");
     
      var tabTransform, persentTab;
      
      var stopTabTransform;
      if(this.container.id == "popup-container") {
        stopTabTransform = 600;
      } else {
         stopTabTransform = 430;
      }    
            
      if (window.innerWidth < stopTabTransform) {        
        if (showIndex === 0) {
          this.tabsContainer.classList.remove("carousel__tabs-container--end");
          this.tabsContainer.classList.add("carousel__tabs-container--start");
          
          if(this.container.id == "popup-container") {
            persentTab =  this.tabsOffset + 45; 
          } else {
            persentTab = this.tabsOffset 
          }  
          
        } else if (showIndex === 1) {
          this.tabsContainer.classList.remove("carousel__tabs-container--end");
          this.tabsContainer.classList.remove("carousel__tabs-container--start");
          persentTab = 0;         
        } else if (showIndex === 2) {
          this.tabsContainer.classList.remove("carousel__tabs-container--start");
          this.tabsContainer.classList.add("carousel__tabs-container--end");           
          
          if(this.container.id == "popup-container") {
            persentTab = - (this.tabsOffset + 10); 
          } else {
            persentTab = - (this.tabsOffset + 20);
          }
          
        }
      } else {
        persentTab = 0;
      }
      
      tabTransform = 'translate3d('+persentTab+'px, 0, 0)';
      this.tabs.style.transform = tabTransform;
      this.tabs.style.mozTransform = tabTransform;
      this.tabs.style.webkitTransform = tabTransform;
      
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
      
      if(window.innerWidth < desctopSize) {
        if(this.container.id == "popup-container") {
          popupInner.style.height = heightArray[showIndex] + 50 + 'px';
        } 
      }
      
      if (window.innerWidth < tabletSize) {      
        for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
          pos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100) + percent);
          
          if (this.direction & Hammer.DIRECTION_HORIZONTAL) {
            translate = "translate3d(" + pos + "px, 0, 0)";
          } else {
            translate = "translate3d(0, " + pos + "px, 0)";
          }
          this.panes[paneIndex].style.transform = translate;
          this.panes[paneIndex].style.mozTransform = translate;
          this.panes[paneIndex].style.webkitTransform = translate;          
        }
        
      } else {
        for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
          translate = "translate3d(0, 0, 0)";
          this.panes[paneIndex].style.transform = translate;
          this.panes[paneIndex].style.mozTransform = translate;
          this.panes[paneIndex].style.webkitTransform = translate;
        }
        this.panes.forEach(function(pane) {
          if(pane.classList[1] == 'carousel__content--active') {
            pane.classList.remove("carousel__content--active");
          }
        });
        this.panes[showIndex].classList.add("carousel__content--active");
      }

      this.currentIndex = showIndex;
    },
    
    onPan: function (ev) {
      if(ev.pointers[0].type !== undefined) {
        return;
      }
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
        if(Math.abs(ev.deltaY) > 15) {
          percent = 0;
          animate = true;
        }
        this.show(this.currentIndex, percent, animate);
      }

    }
  };
document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("*[data-popups]");
  popupOverlay = document.getElementById("popups-overlay");
  
  Array.prototype.forEach.call(elements, function(el) {
    el.addEventListener("click", openPopup);
  });
  
  var closer = document.querySelector(".popups__closer");
  
  closer.addEventListener("click", function(e) {
    if(flag === false) {
      document.body.classList.remove("ov-hidden");
    }    
    document.body.scrollTop = scrollTopOffset;
    popupOverlay.classList.remove("popups-overlay--open");    
  });
  
});
var popupOverlay;
var scrollTopOffset;
var flag = false;

function openPopup(e) {
  if(e.target.offsetParent.id.indexOf("popup") !== -1) {
    flag = true;
  } else {
    flag = false;
  }
  var popupNumber = e.currentTarget.getAttribute("data-popups");
  popupOverlay.classList.add("no-animate");
  HammerCarousel.prototype.show.apply(popups, [popupNumber, 0, true]);
  var body = document.body;
  scrollTopOffset = body.scrollTop;
  body.classList.add("ov-hidden"); 
  popupOverlay.classList.add("popups-overlay--open");
  popupOverlay.classList.remove("no-animate");
}
document.addEventListener("DOMContentLoaded", function() {
  var cartNumberInput = document.getElementById("cc-number");
  cartNumberInput.addEventListener("keyup", function() {
    this.value = cc_format(this);
  });
  
  cartNumberInput.addEventListener("change", function() {
    this.value = cc_format(this);    
    if(validateEmpty(this.value, validateLengthInRange, 13, 19) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный номер карты.'); 
    } else {
      addRemoveErrorState('remove', this, ''); 
    }
    detectCard(this);
  });
  
  var summ = document.getElementById("cc-summ");
  var month = document.getElementById("cc-month");
  var year = document.getElementById("cc-year");
  var cvv = document.getElementById("cc-cvv");
  var name = document.getElementById("cc-name");
  var email = document.getElementById("cc-email");
  
  summ.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });
  
  summ.addEventListener("change", function() {
    this.value = sanitizeValue(this.value, true);    
  });
  
  month.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });
  
  month.addEventListener("change", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateInRange, 1, 12) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный месяц.'); 
    } else {
      addRemoveErrorState('remove', this, ''); 
    }
  });
  
  year.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });
  
  year.addEventListener("change", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 4) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный год.'); 
    } else {
      addRemoveErrorState('remove', this, ''); 
    }
  });  
  
  cvv.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });  
  
  cvv.addEventListener("change", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 3) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный код CVV.'); 
    } else {
      addRemoveErrorState('remove', this, ''); 
    }
  });
  
  name.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, false, true);
  });
  
  name.addEventListener("change", function() {
    this.value = sanitizeValue(this.value, false, true);
  });
  
  email.addEventListener("change", function() {
    if(validateEmpty(this.value, validateEmail) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный адрес электронной почты.'); 
    } else {
      addRemoveErrorState('remove', this, 'Мы вышлем квитанцию Вам на электронную почту. Никакого спама, обещаем.'); 
    }
  });
  
});

function cc_format(el) {
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "");  
    
  var parts = [];
  var k;
  if(v.length <= 16) {
    for (i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
  } else {
    parts.push(v.substring(0, 8));
    parts.push(v.substring(8, v.length));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
}

var cards = [
  {name: "AmericanExpress", firstNumber: [34, 37], numberLength: [15]},
  {name: "MasterCard", firstNumber: [51, 52, 53, 54, 55], numberLength: [16, 17, 18, 19]},
  {name: "Visa", firstNumber: [4], numberLength: [13, 14, 15, 16]},
  {name: "Maestro", firstNumber: [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763], numberLength: [16, 17, 18, 19]}
];

function detectCard(el) {
  value = el.value.replace(/\s+/g, "");
  
  if(value.length < 13 || value.length > 19) {   
    return;
  }
  el.classList.remove("input-block__input--error");
  var filtredLengthCards = [];
  cards.forEach(function(card) {    
    if(card.numberLength.indexOf(value.length) !== -1) {
      filtredLengthCards.push(card);
    }
  });
  
  var cardName;
  filtredLengthCards.forEach(function(card) {
    for(var i = 1; i <= 4; i++) {
      if(card.firstNumber.indexOf(value.substring(0, i)|0) !== -1) {
        cardName = card.name;
        break;
      }
    }
  });
  
  if(cardName) {
    document.querySelector(".donate-form__card[value='"+cardName+"']").setAttribute("checked", true);
    addRemoveErrorState('remove', el, ''); 
  } else {
    addRemoveErrorState('add', el, 'Пожалуйста, введите корректный номер карты.'); 
  }
  
}

function validateEmail(value) {
  if(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,10}$/.test(value) === false) {
    return false;
  } else {
    return true;
  }
}

function validateEmpty(value, validateFunction) {
  if(value === '') {
    return false;
  } else {
    var arg = Array.prototype.slice.call(arguments, 2);
    arg.unshift(value);    
    return validateFunction.apply(null, arg);
  }
}

function sanitizeValue(value, number, name) {
  var newValue = '';
  if(number) {
    newValue = value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "")
  } else if(name) {
    newValue = value.replace(/[^a-zA-Z.-]/g, '');
  }  
  return newValue;
}

function validateLength(value, length) {  
  if(value.length < length) {
    return false;
  } else {
    return true;
  }
}

function validateInRange(value, min, max) {
  value = value|0;
  if(value < min || value > max) {
    return false;
  } else {
    return true;
  }
}

function validateLengthInRange(value, min, max) {
  value = value.replace(/\s+/g, "");
  if(value.length < min || value.length > max) {
    return false;
  } else {
    return true;
  }
}
  
function addRemoveErrorState(flag, el, text) {
  if(flag == 'add') {
    el.classList.add("input-block__input--error");
  } else if(flag == 'remove') {
    el.classList.remove("input-block__input--error");
  }
  if(el.parentElement.nextElementSibling && el.parentElement.nextElementSibling.nodeName == 'P') {
    el.parentElement.nextElementSibling.innerHTML = text;
  } else {
    el.parentElement.parentElement.nextElementSibling.innerHTML = text;
  }
}
document.addEventListener("DOMContentLoaded", function() {
  var links = document.querySelectorAll("*[data-popup]");
  Array.prototype.forEach.call(links, function(link) {
    link.addEventListener("click", openRehabPopup.bind(null, link));
  });
  
  var backButtons = document.querySelectorAll(".rehub-popup__back");
  Array.prototype.forEach.call(backButtons, function(button) {
    button.addEventListener("click", closeRehabPopup);
  });
  
});

var scrollTopOffsetRehab;

function openRehabPopup(link, event) {
  event.preventDefault();  
  var body = document.body;
  scrollTopOffsetRehab = body.scrollTop;
  setTimeout( function() {
    body.classList.add("ov-hidden"); 
  }, 300);
  var popup = document.getElementById(link.getAttribute("href"));
  popup.classList.add("rehub-popup--open");
}

function closeRehabPopup(event) {
  event.preventDefault();
  var body = document.body;  
  body.classList.remove("ov-hidden");
  body.scrollTop = scrollTopOffsetRehab;  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("rehub-popup--open");
}
//# sourceMappingURL=main.js.map
