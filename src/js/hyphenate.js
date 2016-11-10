Hyphenator_Loader.init({
    "ru": "automatically"
  },
  "js/Hyphenator.js"
);

document.addEventListener("DOMContentLoaded", function () {
  var blogContent = document.querySelectorAll(".blog-content p");
  Array.prototype.forEach.call(blogContent, function(content) {
    content.classList.add("hyphenate");
    content.setAttribute('lang', 'ru');
  });
});
