document.addEventListener("DOMContentLoaded", function () {
  var heroBtn = document.getElementById("hero-btn");
  document.getElementById("hero-dropdown").addEventListener("choose", function(e) {
    heroBtn.setAttribute("data-period", e.detail.getAttribute("data-value"));
  })
  
  var heroInput = document.getElementById("hero-input");
  heroInput.addEventListener("change", function(e){
    heroBtn.setAttribute("data-count", e.target.value);
  });
  
  heroInput.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);   
  });
  
});