document.addEventListener("DOMContentLoaded", function () {
  var player = document.getElementById('video-player');
  var control = document.querySelector('.video__controls-play');
  var video = document.querySelector('.video__item');
  var flag = false;
  
  player.addEventListener("click", function() {
    player.classList.toggle('video--played');
    flag = !flag;
    
    if(flag) {
      video.play();
    } else {
      video.pause();
    }
    
  });
});
