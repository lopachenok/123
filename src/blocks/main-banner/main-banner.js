document.addEventListener("DOMContentLoaded", function () {
  var heroBtn = document.getElementById("hero-btn");
  document.getElementById("hero-dropdown").addEventListener("choose", function(e) {
    heroBtn.setAttribute("data-period", e.detail.getAttribute("data-value"));
  })
  
  document.getElementById("hero-input").addEventListener("change", function(e){
    heroBtn.setAttribute("data-count", e.target.value);
  });
  
});