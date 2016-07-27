document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById("carousel");
  var carouselContainer = document.getElementById("carousel-container");
  var tabs = document.getElementById("tabs");
  
  tabs.addEventListener("click", function(e) {
    e.preventDefault();
    if(e.target.tagName !== "A") {
      return;
    }

    HammerCarousel.prototype.show.apply(outer, [e.target.getAttribute("data-tab"), 0, true]);
  });

  var reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, "requestAnimationFrame")] || function (callback) {
      setTimeout(callback, 1000 / 60);
    }
  })();

  function dirProp(direction, hProp, vProp) {
    return (direction & Hammer.DIRECTION_HORIZONTAL) ? hProp : vProp
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

    this.panes = Array.prototype.slice.call(this.container.children, 0);
    this.containerSize = this.container[dirProp(direction, "offsetWidth", "offsetHeight")];

    this.currentIndex = 1;

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
      
      if(showIndex === 0) {
          tabs.style.transform = 'translate3d(9.5%, 0, 0)';
      } else if(showIndex === 1) {
        tabs.style.transform = 'translate3d(0, 0, 0)';  
      } else if(showIndex === 2) {
        tabs.style.transform = 'translate3d(-9.5%, 0, 0)';   
      }
     

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
      for (paneIndex = 0; paneIndex < this.panes.length; paneIndex++) {
        pos = (this.containerSize / 100) * (((paneIndex - showIndex) * 100) + percent);
        if (this.direction & Hammer.DIRECTION_HORIZONTAL) {
          translate = "translate3d(" + pos + "px, 0, 0)";
        } else {
          translate = "translate3d(0, " + pos + "px, 0)"
        }
        this.panes[paneIndex].style.transform = translate;
        this.panes[paneIndex].style.mozTransform = translate;
        this.panes[paneIndex].style.webkitTransform = translate;
      }

      this.currentIndex = showIndex;
    },

    /**
     * handle pan
     * @param {Object} ev
     */
    onPan: function (ev) {
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
  };

  // the horizontal pane scroller
  var outer = new HammerCarousel(carouselContainer, Hammer.DIRECTION_HORIZONTAL);
});