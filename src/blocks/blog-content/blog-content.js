document.addEventListener("DOMContentLoaded", function () {
  var blogContentImg = document.querySelectorAll('.blog-content img');
  var wrapEl = document.createElement('div');
  wrapEl.classList.add('img-slider');
  wrapEl.classList.add('carousel__container--start');
  var imgs = [];

  Array.prototype.forEach.call(blogContentImg, function(img) {
    if(img.nextElementSibling.tagName === 'IMG' || img.previousElementSibling.tagName === 'IMG') {
      img.classList.add('img-slider__slide');
      imgs.push(img);
    }
  });

  if(imgs.length > 0) {
    var html = '<div class="img-slider__inner"></div>'+
    '<div class="img-slider__scroll-button-wrap  img-slider__scroll-button-wrap--left">'+
    '<span class="img-slider__scroll-button  img-slider__scroll-button--left"></span>'+
    '</div>'+
    '<div class="img-slider__scroll-button-wrap  img-slider__scroll-button-wrap--right">'+
    '<span class="img-slider__scroll-button  img-slider__scroll-button--right"></span>'+
    '</div>';
    wrapEl.innerHTML = html;
    insertAfter(wrapEl, imgs[imgs.length - 1]);
    var slider = document.querySelector('.img-slider__inner');
    imgs.forEach(function(img) {
      slider.appendChild(img);
    });
    var divivier = document.createElement('div');
    divivier.classList.add('img-slider__divider');
    slider.appendChild(divivier);
  }
});

function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}
