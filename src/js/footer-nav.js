$(document).ready(function(){
    $(document).on("click", ".detiled-menu__sublink, .main-menu__link--project", function (event) {
        event.preventDefault();
          var navitem  = $(this).attr('href').split('#');
          var activeLink = document.location.origin + document.location.pathname;
          if(activeLink === navitem[0]) {
            var top = $('#'+navitem[1]).offset().top;
            $('body,html').animate({scrollTop: top}, 1000);
          } else {
            document.location.href = $(this).attr('href');
          }
    });
});
