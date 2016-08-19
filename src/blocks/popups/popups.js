document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("*[data-popups]");
  popupOverlay = document.getElementById("popups-overlay");
  
  Array.prototype.forEach.call(elements, function(el) {
    el.addEventListener("click", openPopup);
  });
  
  var closer = document.querySelector(".popups__closer");
  
  closer.addEventListener("click", function(e) {
    document.body.classList.remove("ov-hidden");
    popupOverlay.classList.remove("popups-overlay--open");    
  });
  
});
var popupOverlay;
function openPopup(e) {
  var popupNumber = e.currentTarget.getAttribute("data-popups");
  document.body.classList.add("ov-hidden");
  popupOverlay.classList.add("popups-overlay--open");  
  HammerCarousel.prototype.show.apply(popups, [popupNumber, 0, true]);
}