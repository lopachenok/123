document.addEventListener("DOMContentLoaded", function() {
  var sliderImgs = document.querySelectorAll(".img-slider__slide");

  if(sliderImgs) {
    Array.prototype.forEach.call(sliderImgs, function(slide) {
      slide.addEventListener("click", openFullScreen)
    });
  }
});

function openFullScreen(e) {
  var element = e.target;
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}
