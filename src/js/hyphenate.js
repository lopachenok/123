Hyphenator_Loader.init({
    "ru": "automatically"
  },
  "assets/templates/js/Hyphenator.js"
);

document.addEventListener("DOMContentLoaded", function () {
  var blogContent = document.querySelectorAll(".content p");
  var blogQuote = document.querySelectorAll(".content blogQuote");
  Array.prototype.forEach.call(blogContent, function(content) {
    content.classList.add("hyphenate");
    content.setAttribute('lang', 'ru');
  });
  Array.prototype.forEach.call(blogQuote, function(content) {
    content.classList.add("hyphenate");
    content.setAttribute('lang', 'ru');
  });
});
