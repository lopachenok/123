document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelectorAll(".dropdown");
  document.addEventListener("click", closeDropdown);
  document.addEventListener("touchstart", closeDropdown);
  
  for(var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", toggleDropdown);    
  }
  
});

function toggleDropdown(e) {
  var elem;  
  var classList = Array.prototype.slice.call(e.target.classList, 0);
  
  if(classList.indexOf("dropdown") !== -1) {
    elem = e.target;    
  } else {
    elem = e.target.parentElement.parentNode;
  }
  
  elem.classList.toggle("dropdown--open");
  var options = elem.children[0].children;
  for(var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", selectOption.bind(null, options[i]));
  }
}

function closeDropdown(e) {
  var classList = Array.prototype.slice.call(e.target.classList, 0);
  var parentClassList = Array.prototype.slice.call(e.target.parentElement.parentNode.classList, 0);
  
  if(document.querySelector(".dropdown--open") && classList.indexOf("dropdown") == -1 && parentClassList.indexOf("dropdown") == -1) {
    document.querySelector(".dropdown--open").classList.remove("dropdown--open");
  }
  
}

function selectOption(elem) {  
  var option = elem.parentElement.querySelectorAll(".dropdown .dropdown__item--selected");
   
  option[0].classList.remove("dropdown__item--selected");
  elem.classList.add("dropdown__item--selected");
  
  var event = new CustomEvent("choose", {"detail": elem});
  elem.parentElement.parentElement.dispatchEvent(event);
}