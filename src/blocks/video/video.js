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
      document.querySelector('.video-section__duration').innerHTML = duration;
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
