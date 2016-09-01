function is_touch_device() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || navigator.msMaxTouchPoints > 0);
}

var mobileGlobal, touchGlobal;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 document.body.classList.add("mobile");
 mobileGlobal = true; 
}

if(is_touch_device()) {
  document.body.classList.add("touch");
  touchGlobal = true;
}

Hyphenator_Loader.init({
    "ru": "automatically"
  },
  "js/Hyphenator.js"
);