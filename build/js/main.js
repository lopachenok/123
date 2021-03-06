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

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

(function () {
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();
Hyphenator_Loader.init({
    "ru": "automatically"
  },
  "assets/templates/js/Hyphenator.js"
);

document.addEventListener("DOMContentLoaded", function () {
  var blogContent = document.querySelectorAll(".content p");
  var blogQuote = document.querySelectorAll(".content blogQuote");
  Array.prototype.forEach.call(blogContent, function(content) {
    content.classList.add("hyphenate");
    content.setAttribute('lang', 'ru');
  });
  Array.prototype.forEach.call(blogQuote, function(content) {
    content.classList.add("hyphenate");
    content.setAttribute('lang', 'ru');
  });
});
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
    options[i].addEventListener("click", selectOption.bind(null, options[i]));
  }
}

function closeDropdown(e) {
  var classList = Array.prototype.slice.call(e.target.classList, 0);
  var parentClassList = Array.prototype.slice.call(e.target.parentElement.parentNode.classList, 0);
  
  if(document.querySelector(".dropdown--open") && classList.indexOf("dropdown") == -1 && parentClassList.indexOf("dropdown") == -1) {
    document.querySelector(".dropdown--open").classList.remove("dropdown--open");
  }
  
}

function selectOption(elem) {  
  var option = elem.parentElement.querySelectorAll(".dropdown .dropdown__item--selected");
   
  option[0].classList.remove("dropdown__item--selected");
  elem.classList.add("dropdown__item--selected");
  
  var event = new CustomEvent("choose", {"detail": elem});
  elem.parentElement.parentElement.dispatchEvent(event);
}
document.addEventListener("DOMContentLoaded", function () {
  var player = document.getElementById('video-player');
  var control = document.querySelector('.video__controls-play');
  var video = document.querySelector('.video__item');
  var flag = false;

  if(!mobileGlobal && video) {
    video.setAttribute("preload", "true");
  }
  if(video) {
    video.addEventListener("loadedmetadata", function() {
      var duration = Math.round(video.duration)/100;
      var durationEl = document.querySelector('.video-section__duration');
      if(durationEl)
        durationEl.innerHTML = duration;
    });
  }

  if(player) {
    player.addEventListener("click", function() {
      player.classList.add('video--played');

      flag = true;

      if(flag) {
        video.play();
      }
    });
  }

});
var popups;
var scrollButtonCount = 2;
var tabletSize = 768;
var desctopSize = 1280;
var popupInner;
var docsInner;
var heightArray;
var heightArrayDocs;
var heightArrayMain;
var doc;
var mainInner;

document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById("carousel");
  var popupsEl = document.getElementById("popups");
  var docs = document.getElementById('docs');
  var carouselContent = document.querySelectorAll("#carousel-container .carousel__content");
  var popupContentBlock = document.querySelectorAll("#popup-container .carousel__content");
  var docsContentBlock = document.querySelectorAll("#docs-container .carousel__content");
  popupInner = document.querySelector("#popups .carousel__inner");
  docsInner = document.querySelector("#docs .carousel__inner");
  mainInner = document.querySelector("#carousel .carousel__inner");
  var carouselArticleContent = document.getElementById("carousel-article-content");

  var scrollButtonRight = document.querySelector(".carousel__scroll-button--right");
  var scrollButtonLeft = document.querySelector(".carousel__scroll-button--left");

  var scrollOffset, k;
  if (window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
    k = 2.5;
  } else {
    k = 2;
  }

  scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;
  if(scrollButtonRight) {
    scrollButtonRight.addEventListener("click", function(e) {
      var el;
      if(outer) {
        var currentContent = outer.currentIndex;
        el = outer.panes[currentContent];
      } else {
        el = e.target.parentElement.parentElement.firstElementChild;
      }
      smooth_scroll_to(el, el.scrollLeft + scrollOffset, 500);
    });
  }

  if(scrollButtonLeft) {
    scrollButtonLeft.addEventListener("click", function(e) {
      if(outer) {
        var currentContent = outer.currentIndex;
        var el = outer.panes[currentContent];
      } else {
        el = e.target.parentElement.parentElement.firstElementChild;
      }
      smooth_scroll_to(el, el.scrollLeft - scrollOffset, 500);
    });
  }

  if(carouselContent) {
    for(var i = 0; i < carouselContent.length; i++) {
      carouselContent[i].addEventListener("scroll", contentScroll);
    }
  }

  if(carouselArticleContent) {
    addRemoveScrollButton(carouselArticleContent, carouselArticleContent.parentElement);
    carouselArticleContent.addEventListener("scroll", contentScroll);
  }

  heightArray = [];
  Array.prototype.forEach.call(popupContentBlock, function(content) {
    heightArray.push(content.clientHeight);
  });

  heightArrayDocs = [];
  Array.prototype.forEach.call(docsContentBlock, function(content) {
    heightArrayDocs.push(content.clientHeight);
  });

  heightArrayMain = [];
  Array.prototype.forEach.call(carouselContent, function(content) {
    heightArrayMain.push(content.clientHeight);
  });

  if(window.innerWidth >= tabletSize) {
    if(carousel) {
      var outer = new HammerCarousel(carousel);
    }
    if(docs) {
      doc = new HammerCarousel(docs);
    }
    popups = new HammerCarousel(popupsEl);
  } else {
    if(carousel) {
      var outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
    }
    if(docs) {
      doc = new HammerCarousel(docs, Hammer.DIRECTION_HORIZONTAL);
    }
    popups = new HammerCarousel(popupsEl, Hammer.DIRECTION_HORIZONTAL);
  }

  var windowSize = {
    x: window.innerWidth,
    y: window.innerHeight
  };

  window.addEventListener("resize", function() {
    if(windowSize.x !== window.innerWidth) {
      if(outer) {
        var i = outer.currentIndex;
      }
      var j = popups.currentIndex;

      heightArray = [];
      Array.prototype.forEach.call(popupContentBlock, function(content) {
        heightArray.push(content.clientHeight);
      });

      heightArrayDocs = [];
      Array.prototype.forEach.call(docsContentBlock, function(content) {
        heightArrayDocs.push(content.clientHeight);
      });

      heightArrayMain = [];
      Array.prototype.forEach.call(carouselContent, function(content) {
        heightArrayMain.push(content.clientHeight);
      });

      if(window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
        k = 2.5;
      } else {
        k = 2;
      }

      scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;

      if (window.innerWidth >= tabletSize) {
        if(carousel) {
          outer = new HammerCarousel(carousel);
        }
        if(docs) {
          doc = new HammerCarousel(docs);
        }
        popups = new HammerCarousel(popupsEl);
      } else {
        if(carousel) {
          outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
        }
        if(docs) {
          doc = new HammerCarousel(docs, Hammer.DIRECTION_HORIZONTAL);
        }
        popups = new HammerCarousel(popupsEl, Hammer.DIRECTION_HORIZONTAL);
      }

      if(outer) {
        HammerCarousel.prototype.show.apply(outer, [i, 0, true]);
      }

      document.getElementById("popups-overlay").classList.add("no-animate");
      HammerCarousel.prototype.show.apply(popups, [j, 0, true]);
      setTimeout(function() {
        document.getElementById("popups-overlay").classList.remove("no-animate");
      }, 0);
    }

    if(carouselArticleContent) {
      addRemoveScrollButton(carouselArticleContent, carouselArticleContent.parentElement);
    }

    windowSize.x = window.innerWidth;
  });

});

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
      var previous_top = element.scrollLeft;

      var scroll_frame = function() {
          if(element.scrollLeft != previous_top) {
              return;
          }

          var now = Date.now();
          var point = smooth_step(start_time, end_time, now);
          var frameTop = Math.round(start_top + (distance * point));
          element.scrollLeft = frameTop;

          if(now >= end_time) {
              scroll();
              return;
          }

          if(element.scrollLeft === previous_top
              && element.scrollLeft !== frameTop) {
              scroll();
              return;
          }
          previous_top = element.scrollLeft;
          setTimeout(scroll_frame, 0);
      }

      setTimeout(scroll_frame, 0);
  }

  return scroll();
}

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
      var el;

      if(e.target.tagName !== "A") {
        el = e.target.parentElement;
      } else {
        el = e.target;
      }
      if (el.tagName !== "A") {
        return;
      }
      currentContent = el.getAttribute("data-tab");

      if(self.currentIndex == 0) {
        k = 1.75;
        scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;
      }

      HammerCarousel.prototype.show.apply(self, [currentContent, 0, true]);
    });

    if(self.currentIndex == 0) {
      k = 1;
      scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;
    }

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

      var stopTabTransform = this.tabs.clientWidth;

      if (window.innerWidth < stopTabTransform) {
        if (showIndex === 0) {
          this.tabsContainer.classList.remove("carousel__tabs-container--end");
          this.tabsContainer.classList.add("carousel__tabs-container--start");

          if(this.container.id == "popup-container") {
            persentTab = this.tabsOffset + 45;
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

      if(window.innerWidth < 1024) {
        tabTransform = 'translate3d('+(persentTab - this.tabs.clientWidth/2)+'px, 0, 0)';
      } else {
        tabTransform = 'translate3d(0px, 0, 0)';
      }

      if(this.container.id == "docs-container") {
        var tabsObj = [];
        var dividier = this.tabs.children[this.tabs.children.length - 1];
        var self = this;

        //setTimeout(function() {
          Array.prototype.forEach.call(self.tabs.children, function(tab) {
            tabsObj.push(tab.clientWidth);
          });
          var padding = window.getComputedStyle(self.tabs.children[showIndex]).paddingRight;
          dividier.style.width = tabsObj[showIndex] - parseInt(padding) + 'px';
          dividier.style.left = self.tabs.children[showIndex].offsetLeft + 1 + 'px';
        //}, 1000);


        var summ = 0;
        for(var i = 0; i < showIndex; i++) {
          summ += tabsObj[i]
        }

        var tabsScroll =  summ - ((window.innerWidth - tabsObj[showIndex])/2);
        smooth_scroll_to(this.tabs, tabsScroll, 500);
      }

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

      if(this.container.id == "popup-container") {
        popupInner.style.height = heightArray[showIndex] + 50 + 'px';
      }

      if(this.container.id == "docs-container") {
        docsInner.style.height = heightArrayDocs[showIndex] + 3 + 'px';
      }

      if(this.container.id == "carousel-container") {
        mainInner.style.height = heightArrayMain[showIndex] + 'px';
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
        addRemoveScrollButton(this.panes[showIndex], this.container);
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
  popupContact = document.getElementById("contact-popup");
  var overlays = document.querySelectorAll(".popups-overlay");

  Array.prototype.forEach.call(elements, function(el) {
    if(el.getAttribute("data-popup-contact")) {
      el.addEventListener("click", openContactsPopup);
    } else {
      el.addEventListener("click", openPopup);
    }

  });

  Array.prototype.forEach.call(overlays, function(overlay) {
    overlay.addEventListener("click", closePopup);
  });

  popupOverlay.children[0].addEventListener("scroll", function(e) {
    scrollPosition = this.scrollTop;
  });

  var closers = document.querySelectorAll(".popups__closer");

  Array.prototype.forEach.call(closers, function(closer){
    closer.addEventListener("click", closeOnClick);
  });

  if(window.innerWidth < desctopSize) {
    mainElem = document.getElementById("wrapper");
  } else {
    mainElem = document.body || document.documentElement;
  }

  var windowSizePopup = {
    x: window.innerWidth,
    y: window.innerHeight
  };

  window.addEventListener("resize", function () {
    if (windowSizePopup.x !== window.innerWidth) {
      if (window.innerWidth < desctopSize) {
        mainElem = document.getElementById("wrapper");
      } else {
        mainElem = document.body || document.documentElement;
      }

      if(popupOverlay.classList[1] === 'popups-overlay--open') {
        mainElem.classList.remove("ov-hidden");
        mainElem.classList.add("ov-hidden");
      }

      if(windowSizePopup.x < tabletSize && window.innerWidth >= tabletSize && popups.currentIndex === 2) {
        closeOnClick();
      }

      if(windowSizePopup.x < desctopSize && window.innerWidth >= desctopSize && popups.currentIndex === 0) {
        closeOnClick();
      }
    }

    windowSizePopup.x = window.innerWidth;
  });

});
var popupOverlay;
var scrollTopOffset;
var flag = false;
var donateCount, donatePeriod, scrollPosition;
var mainElem;
var popupContact;

function closePopup(e) {
  if(e.target !== this) {
    return false;
  }
  closeOnClick();
}

function closeOnClick() {
  if(flag === false) {
    mainElem.classList.remove("ov-hidden");
  }
  document.documentElement.scrollTop = scrollTopOffset;
  document.body.scrollTop = scrollTopOffset;
  popupOverlay.classList.remove("popups-overlay--open");
  popupContact.classList.remove("popups-overlay--open");
}

function openPopup(e) {
  if(e.target.offsetParent.id.indexOf("popup") !== -1) {
    flag = true;
  } else {
    flag = false;
  }
  var btn = e.currentTarget;
  var popupNumber = btn.getAttribute("data-popups");
  popupOverlay.classList.add("no-animate");
  HammerCarousel.prototype.show.apply(popups, [popupNumber, 0, true]);

  if(popupNumber == 1) {
    donateCount = btn.getAttribute("data-count");
    donatePeriod = btn.getAttribute("data-period");

    if(donateCount) {
      summ.value = donateCount;
    }

    if(donatePeriod) {
      selectOption(formDropdown.querySelector("*[data-value='"+donatePeriod+"']"));
    }

    var substr;
    if(window.innerWidth < tabletSize) {
      substr = "/мес";
    } else {
      substr = " в месяц";
    }

    if(donatePeriod && donateCount) {
      finalCount.innerHTML = donateCount+'&#8381;'+(donatePeriod == 'monthly'?substr:'');
    }

  }

  scrollTopOffset = document.body.scrollTop || document.documentElement.scrollTop;
  mainElem.classList.add("ov-hidden");
  popupOverlay.classList.add("popups-overlay--open");
  popupOverlay.classList.remove("no-animate");
}

function openContactsPopup(e) {
  if(window.innerWidth < desctopSize) {
    openPopup(e);
  } else {
    popupContact.classList.add("popups-overlay--open");
    mainElem.classList.add("ov-hidden");
    scrollTopOffset = document.body.scrollTop || document.documentElement.scrollTop;
  }
}
var summ,
    formDropdown,
    finalCount,
    btnPeriod;
var allError = {
  month: '',
  year: '',
  cvv: ''
};

document.addEventListener("DOMContentLoaded", function() {
  var cartNumberInput = document.getElementById("cc-number");

  summ = document.getElementById("cc-summ");
  var month = document.getElementById("cc-month");
  var year = document.getElementById("cc-year");
  var cvv = document.getElementById("cc-cvv");
  var name = document.getElementById("cc-name");
  var email = document.getElementById("cc-email");
  formDropdown = document.getElementById("cc-dropdown");
  finalCount = document.getElementById("final-count");
  var checkbox = document.getElementById("cc-monthly");

  summ.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });

  summ.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    changeBtnInnerText(this.value);
  });

  cartNumberInput.addEventListener("keyup", function() {
    this.value = cc_format(this);
    if(validateEmpty(this.value, validateLengthInRange, 13, 19) === false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  cartNumberInput.addEventListener("blur", function() {
    this.value = cc_format(this);
    if(validateEmpty(this.value, validateLengthInRange, 13, 19) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный номер карты.');
    } else {
      addRemoveErrorState('remove', this, 'Информация передается по защищенному соединению');
    }
    detectCard(this);
  });

  month.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateInRange, 1, 12) === false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  month.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    this.value = formatMonth(this.value);
    if(validateEmpty(this.value, validateInRange, 1, 12) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный месяц.');
      allError.month = 'Пожалуйста, введите корректный месяц.';
    } else {
      allError.month = '';
      if(allError.year !== '') {
        addRemoveErrorState('remove', this, allError.year);
      } else if(allError.cvv !== '') {
        addRemoveErrorState('remove', this, allError.cvv);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  year.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateYear) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  year.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateYear) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный год.');
      allError.year = 'Пожалуйста, введите корректный год.';
    } else {
      allError.year = '';
      if(allError.month !== '') {
        addRemoveErrorState('remove', this, allError.month);
      } else if(allError.cvv !== '') {
        addRemoveErrorState('remove', this, allError.cvv);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  cvv.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 3) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  cvv.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 3) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный код CVV.');
      allError.cvv = 'Пожалуйста, введите корректный код CVV.';
    } else {
      allError.cvv = '';
      if(allError.month !== '') {
        addRemoveErrorState('remove', this, allError.month);
      } else if(allError.year !== '') {
        addRemoveErrorState('remove', this, allError.year);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  name.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, false, true);
  });

  name.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, false, true);
  });

  email.addEventListener("keyup", function() {
    if(validateEmpty(this.value, validateEmail) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  email.addEventListener("blur", function() {
    if(validateEmpty(this.value, validateEmail) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный адрес электронной почты.');
    } else {
      addRemoveErrorState('remove', this, 'Мы вышлем квитанцию Вам на электронную почту. Никакого спама, обещаем.');
    }
  });

  formDropdown.addEventListener("choose", function(e) {
    btnPeriod = e.detail.getAttribute("data-value");
    changeBtnInnerText(summ.value, e.detail.getAttribute("data-value"));
    if(btnPeriod == 'once') {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }

  });

  checkbox.addEventListener("change", function() {
    if(this.checked) {
      changeBtnInnerText(summ.value, 'monthly');
      selectOption(formDropdown.querySelector("*[data-value='monthly']"));
    } else {
      changeBtnInnerText(summ.value, 'once');
      selectOption(formDropdown.querySelector("*[data-value='once']"));
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

function formatMonth(value) {
  if(value.length === 1) {
    return '0'+value;
  }
  return value;
}

function sanitizeValue(value, number, name) {
  var newValue = '';
  if(number) {
    newValue = value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "")
  } else if(name) {
    newValue = value.replace(/[^a-zA-Z.-\s]/g, '');
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

function validateYear(value) {
  if(value.length < 4) {
    return false;
  } else {
    var now = new Date();
    if(value < now.getFullYear() ) {
      return false;
    } else {
      return true;
    }
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
  switch(flag) {
    case 'add':
      el.classList.add("input-block__input--error"); break;
    case 'remove':
      el.classList.remove("input-block__input--error"); break;
    case 'keyup-add':
      el.classList.add("input-block__input--only-error"); break;
    case 'keyup-remove':
      el.classList.remove("input-block__input--only-error"); break;
  }

  if(flag == 'add' || flag == 'remove') {
    if(el.parentElement.nextElementSibling && el.parentElement.nextElementSibling.nodeName == 'P') {
      el.parentElement.nextElementSibling.innerHTML = text;
    } else {
      document.getElementById("own-error-text").innerHTML = text;
    }
  }

}

function changeBtnInnerText(count, period) {
  count = count;
  period = period;

  var substr;
  if(window.innerWidth < tabletSize) {
    substr = "/мес";
  } else {
    substr = " в месяц";
  }
  finalCount.innerHTML = count+'&#8381;'+(period == 'monthly'?substr:'');
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
  scrollTopOffsetRehab = document.body.scrollTop || document.documentElement.scrollTop;
  setTimeout( function() {
    document.getElementById("wrapper").classList.add("ov-hidden"); 
  }, 300);
  var popup = document.getElementById(link.getAttribute("href"));
  popup.classList.add("rehub-popup--open");
}

function closeRehabPopup(event) {
  event.preventDefault();
  document.getElementById("wrapper").classList.remove("ov-hidden");
  document.body.scrollTop = scrollTopOffsetRehab; 
  document.documentElement.scrollTop = scrollTopOffsetRehab;
  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("rehub-popup--open");
}
document.addEventListener("DOMContentLoaded", function () {
  var heroBtn = document.getElementById("hero-btn");
  if(heroBtn) {
    document.getElementById("hero-dropdown").addEventListener("choose", function(e) {
      heroBtn.setAttribute("data-period", e.detail.getAttribute("data-value"));
    });
  }

  var heroInput = document.getElementById("hero-input");
  if(heroInput) {
    heroInput.addEventListener("change", function(e){
      heroBtn.setAttribute("data-count", e.target.value);
    });

    heroInput.addEventListener("keyup", function() {
      this.value = sanitizeValue(this.value, true);
    });
  }

});
// document.addEventListener("DOMContentLoaded", function () {
//   var blogContentImg = document.querySelectorAll('.blog-content img');
//   var wrapEl = document.createElement('div');
//   wrapEl.classList.add('img-slider');
//   wrapEl.classList.add('carousel__container--start');
//   var imgs = [];
//
//   Array.prototype.forEach.call(blogContentImg, function(img) {
//     if(img.nextElementSibling.tagName === 'IMG' || img.previousElementSibling.tagName === 'IMG') {
//       img.classList.add('img-slider__slide');
//       imgs.push(img);
//     }
//   });
//
//   if(imgs.length > 0) {
//     var html = '<div class="img-slider__inner"></div>'+
//     '<div class="img-slider__scroll-button-wrap  img-slider__scroll-button-wrap--left">'+
//     '<span class="img-slider__scroll-button  img-slider__scroll-button--left"></span>'+
//     '</div>'+
//     '<div class="img-slider__scroll-button-wrap  img-slider__scroll-button-wrap--right">'+
//     '<span class="img-slider__scroll-button  img-slider__scroll-button--right"></span>'+
//     '</div>';
//     wrapEl.innerHTML = html;
//     insertAfter(wrapEl, imgs[imgs.length - 1]);
//     var slider = document.querySelector('.img-slider__inner');
//     imgs.forEach(function(img) {
//       slider.appendChild(img);
//     });
//     var divivier = document.createElement('div');
//     divivier.classList.add('img-slider__divider');
//     slider.appendChild(divivier);
//   }
// });
//
// function insertAfter(elem, refElem) {
//   return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
// }
document.addEventListener("DOMContentLoaded", function() {
  var sliderImgs = document.querySelectorAll(".img-slider__slide");
  var sliderLeftBtn = document.querySelector(".img-slider__scroll-button--left");
  var sliderRightBtn = document.querySelector(".img-slider__scroll-button--right");
  var slider = document.querySelector(".img-slider__inner");

  if(sliderImgs) {
    Array.prototype.forEach.call(sliderImgs, function(slide) {
      slide.addEventListener("click", openFullScreen)
    });
  }

  if(window.innerWidth < desctopSize) {
    var t = 2.1;
  } else {
    t = 1.83;
  }

  var scrollOff = parseInt(window.innerWidth / 12 * 5) * t;

  if(sliderLeftBtn) {
    sliderLeftBtn.addEventListener('click', function(e) {
      var el = e.target.parentElement.parentElement.firstElementChild;
      smooth_scroll_to(el, el.scrollLeft - scrollOff, 500);
    });
  }

  if(sliderRightBtn) {
    sliderRightBtn.addEventListener('click', function(e) {
      var el = e.target.parentElement.parentElement.firstElementChild;
      smooth_scroll_to(el, el.scrollLeft + scrollOff, 500);
    });
  }

  if(slider) {
    slider.addEventListener("scroll", contentScroll);
  }

  window.addEventListener("resize", function() {
    if(window.innerWidth < desctopSize) {
      var t = 2.1;
    } else {
      t = 1.83;
    }
    scrollOff = parseInt(window.innerWidth / 12 * 5) * t;
  });

});

function openFullScreen(e) {

}
$(document).ready(function(){
    $(document).on("click", ".detiled-menu__sublink, .main-menu__link--project", function (event) {
        event.preventDefault();
          var navitem  = $(this).attr('href').split('#');
          var activeLink = document.location.origin + document.location.pathname;
          if(activeLink === navitem[0]) {
            var top = $('#'+navitem[1]).offset().top;
            $('body,html').animate({scrollTop: top}, 1000);
          } else {
            document.location.href = $(this).attr('href');
          }
    });
});
$(document).ready(function() {
  $(document).on("click", ".popup-menu__link", function (event) {
    $('.wrapper').removeClass('ov-hidden');
    $('#popups-overlay').removeClass('popups-overlay--open');
  });
});
//# sourceMappingURL=main.js.map
