document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("*[data-popups]");
  popupOverlay = document.getElementById("popups-overlay");
  
  Array.prototype.forEach.call(elements, function(el) {
    el.addEventListener("click", openPopup);
  });
  
  var closer = document.querySelector(".popups__closer");
  
  closer.addEventListener("click", function(e) {
    if(flag === false) {
      document.body.classList.remove("ov-hidden");
    }    
    document.body.scrollTop = scrollTopOffset;
    popupOverlay.classList.remove("popups-overlay--open");    
  });
  
});
var popupOverlay;
var scrollTopOffset;
var flag = false;
var donateCount, donatePeriod;

function openPopup(e) {
  if(e.target.offsetParent.id.indexOf("popup") !== -1) {
    flag = true;
  } else {
    flag = false;
  }
  var btn = e.currentTarget;
  var popupNumber = btn.getAttribute("data-popups");
  popupOverlay.classList.add("no-animate");
  HammerCarousel.prototype.show.apply(popups, [popupNumber, 0, true]);
  
  if(popupNumber == 1) {
    donateCount = btn.getAttribute("data-count");
    donatePeriod = btn.getAttribute("data-period");
    
    if(donateCount) {
      summ.value = donateCount;
    }
    
    if(donatePeriod) {
      selectOption(formDropdown.querySelector("*[data-value='"+donatePeriod+"']"));
    }
    
    var substr;
    if(window.innerWidth < tabletSize) {
      substr = "/мес";
    } else {
      substr = " в месяц";
    }
    
    if(donatePeriod && donateCount) {
      finalCount.innerHTML = donateCount+'&#8381;'+(donatePeriod == 'monthly'?substr:'');
    }
    
  }
  
  var body = document.body;
  scrollTopOffset = body.scrollTop;
  body.classList.add("ov-hidden"); 
  popupOverlay.classList.add("popups-overlay--open");
  popupOverlay.classList.remove("no-animate");
}