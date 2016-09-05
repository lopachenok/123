document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("*[data-popups]");
  popupOverlay = document.getElementById("popups-overlay");
  
  Array.prototype.forEach.call(elements, function(el) {
    el.addEventListener("click", openPopup);
  });
  
  popupOverlay.children[0].addEventListener("scroll", function(e) {
    scrollPosition = this.scrollTop;
  });
  
  var closer = document.querySelector(".popups__closer");
  
  closer.addEventListener("click", function(e) {
    if(flag === false) {
      document.getElementById("wrapper").classList.remove("ov-hidden");
    }    
    document.documentElement.scrollTop = scrollTopOffset;
    document.body.scrollTop = scrollTopOffset;
    popupOverlay.classList.remove("popups-overlay--open");    
  });
  
});
var popupOverlay;
var scrollTopOffset;
var flag = false;
var donateCount, donatePeriod, scrollPosition;

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
  
  scrollTopOffset = document.documentElement.scrollTop !== 0 || document.body.scrollTop;
  document.getElementById("wrapper").classList.add("ov-hidden"); 
  popupOverlay.classList.add("popups-overlay--open");
  popupOverlay.classList.remove("no-animate");
}

Array.prototype.forEach.call(document.querySelectorAll("input"), function(input){
 input.addEventListener("focus", function() {
  
 }); 
})
