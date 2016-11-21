$(document).ready(function() {
  $(document).on("click", ".popup-menu__link", function (event) {
    $('.wrapper').removeClass('ov-hidden');
    $('#popups-overlay').removeClass('popups-overlay--open');
  });
});
