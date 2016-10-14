document.addEventListener("DOMContentLoaded", function() {
  var elements = document.querySelectorAll("*[data-popups]");
  popupOverlay = document.getElementById("popups-overlay");
  popupContact = document.getElementById("contact-popup");
  var overlays = document.querySelectorAll(".popups-overlay");

  Array.prototype.forEach.call(elements, function(el) {
    if(el.getAttribute("data-popup-contact")) {
      el.addEventListener("click", openContactsPopup);
    } else {
      el.addEventListener("click", openPopup);
    }

  });

  Array.prototype.forEach.call(overlays, function(overlay) {
    overlay.addEventListener("click", closePopup);
  });

  popupOverlay.children[0].addEventListener("scroll", function(e) {
    scrollPosition = this.scrollTop;
  });

  var closers = document.querySelectorAll(".popups__closer");

  Array.prototype.forEach.call(closers, function(closer){
    closer.addEventListener("click", closeOnClick);
  });

  if(window.innerWidth < desctopSize) {
    mainElem = document.getElementById("wrapper");
  } else {
    mainElem = document.body || document.documentElement;
  }

  var windowSizePopup = {
    x: window.innerWidth,
    y: window.innerHeight
  };

  window.addEventListener("resize", function () {
    if (windowSizePopup.x !== window.innerWidth) {
      mainElem.classList.remove("ov-hidden");
      if (window.innerWidth < desctopSize) {
        mainElem = document.getElementById("wrapper");
      } else {
        mainElem = document.body || document.documentElement;
      }
    }
    mainElem.classList.add("ov-hidden");

    if(windowSizePopup.x < tabletSize && window.innerWidth >= tabletSize && popups.currentIndex === 2) {
      closeOnClick();
    }

    if(windowSizePopup.x < desctopSize && window.innerWidth >= desctopSize && popups.currentIndex === 0) {
      closeOnClick();
    }

    windowSizePopup.x = window.innerWidth;
  });

});
var popupOverlay;
var scrollTopOffset;
var flag = false;
var donateCount, donatePeriod, scrollPosition;
var mainElem;
var popupContact;

function closePopup(e) {
  if(e.target !== this) {
    return false;
  }
  closeOnClick();
}

function closeOnClick() {
  if(flag === false) {
    mainElem.classList.remove("ov-hidden");
  }
  document.documentElement.scrollTop = scrollTopOffset;
  document.body.scrollTop = scrollTopOffset;
  popupOverlay.classList.remove("popups-overlay--open");
  popupContact.classList.remove("popups-overlay--open");
}

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

  scrollTopOffset = document.body.scrollTop || document.documentElement.scrollTop;
  mainElem.classList.add("ov-hidden");
  popupOverlay.classList.add("popups-overlay--open");
  popupOverlay.classList.remove("no-animate");
}

function openContactsPopup(e) {
  if(window.innerWidth < desctopSize) {
    openPopup(e);
  } else {
    popupContact.classList.add("popups-overlay--open");
    mainElem.classList.add("ov-hidden");
    scrollTopOffset = document.body.scrollTop || document.documentElement.scrollTop;
  }
}
