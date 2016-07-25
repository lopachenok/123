document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.querySelectorAll('.dropdown');
  for(var i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", toggleDropdown);
  }
});

function toggleDropdown(e) {
  var elem = e.target.closest('.dropdown');
  elem.classList.toggle('dropdown--open');
  var options = document.querySelectorAll('.dropdown--open .dropdown__item');
  
  for(var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", selectOption);
  }
}

function selectOption(e) {
  var elem = e.target;
  var option = document.querySelectorAll('.dropdown .dropdown__item--selected');
  option[0].classList.remove('dropdown__item--selected');
  elem.classList.add('dropdown__item--selected');
}