var popups;
var scrollButtonCount = 2;
var tabletSize = 768;
var desctopSize = 1280;
var popupInner;
var docsInner;
var heightArray;
var heightArrayDocs;

document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById("carousel");
  var popupsEl = document.getElementById("popups");
  var docs = document.getElementById('docs');
  var carouselContent = document.querySelectorAll("#carousel-container .carousel__content");
  var popupContentBlock = document.querySelectorAll("#popup-container .carousel__content");
  var docsContentBlock = document.querySelectorAll("#docs-container .carousel__content");
  popupInner = document.querySelector("#popups .carousel__inner");
  docsInner = document.querySelector("#docs .carousel__inner");
  var carouselArticleContent = document.getElementById("carousel-article-content");

  var scrollButtonRight = document.querySelector(".carousel__scroll-button--right");
  var scrollButtonLeft = document.querySelector(".carousel__scroll-button--left");

  var scrollOffset, k;
  if (window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
    k = 2.5;
  } else {
    k = 3.2;
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

  if(window.innerWidth >= tabletSize) {
    if(carousel) {
      var outer = new HammerCarousel(carousel);
    }
    if(docs) {
      var doc = new HammerCarousel(docs);
    }
    popups = new HammerCarousel(popupsEl);
  } else {
    if(carousel) {
      var outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
    }
    if(docs) {
      var doc = new HammerCarousel(docs, Hammer.DIRECTION_HORIZONTAL);
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

      if (window.innerWidth >= tabletSize) {
        if(carousel) {
          outer = new HammerCarousel(carousel);
        }
        if(docs) {
          var doc = new HammerCarousel(docs);
        }
        popups = new HammerCarousel(popupsEl);
      } else {
        if(carousel) {
          outer = new HammerCarousel(carousel, Hammer.DIRECTION_HORIZONTAL);
        }
        if(docs) {
          var doc = new HammerCarousel(docs, Hammer.DIRECTION_HORIZONTAL);
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

    if(window.innerWidth >= tabletSize && window.innerWidth < desctopSize) {
      k = 2.5;
    } else {
      k = 3.2;
    }

    scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;

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
      if (e.target.tagName !== "A") {
        return;
      }

      currentContent = e.target.getAttribute("data-tab");

      if(self.currentIndex == 0) {
        k = 1.75;
        scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;
      }

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
        Array.prototype.forEach.call(this.tabs.children, function(tab) {
          tabsObj.push(tab.clientWidth);
        });
        var padding = window.getComputedStyle(this.tabs.children[0]).paddingRight;

        dividier.style.width = tabsObj[showIndex] - parseInt(padding) + 2 + 'px';
        console.dir(this.tabs.children[showIndex].offsetLeft)
        dividier.style.left = this.tabs.children[showIndex].offsetLeft + 1 + 'px';

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
