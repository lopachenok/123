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
    var k = 2.1;
  } else {
    k = 1.83;
  }

  var scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;

  if(sliderLeftBtn) {
    sliderLeftBtn.addEventListener('click', function(e) {
      var el = e.target.parentElement.parentElement.firstElementChild;
      smooth_scroll_to(el, el.scrollLeft - scrollOffset, 500);
    });
  }

  if(sliderRightBtn) {
    sliderRightBtn.addEventListener('click', function(e) {
      var el = e.target.parentElement.parentElement.firstElementChild;
      smooth_scroll_to(el, el.scrollLeft + scrollOffset, 500);
    });
  }

  if(slider) {
    slider.addEventListener("scroll", contentScroll);
  }

  window.addEventListener("resize", function() {
    if(window.innerWidth < desctopSize) {
      var k = 2.1;
    } else {
      k = 1.83;
    }
    scrollOffset = parseInt(window.innerWidth / 12 * 5) * k;
  });

});

function openFullScreen(e) {

}
