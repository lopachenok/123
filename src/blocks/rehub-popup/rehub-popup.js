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
  var body = document.body;
  scrollTopOffsetRehab = body.scrollTop;
  setTimeout( function() {
    body.classList.add("ov-hidden"); 
  }, 300);
  var popup = document.getElementById(link.getAttribute("href"));
  popup.classList.add("rehub-popup--open");
}

function closeRehabPopup(event) {
  event.preventDefault();
  var body = document.body;  
  body.classList.remove("ov-hidden");
  body.scrollTop = scrollTopOffsetRehab;  event.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("rehub-popup--open");
}