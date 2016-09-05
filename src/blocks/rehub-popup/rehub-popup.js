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