document.addEventListener("DOMContentLoaded", function() {
  var cartNumberInput = document.getElementById("cc-number");
  cartNumberInput.addEventListener("keyup", function() {
    this.value = cc_format(this.value);
    detectCard(this.value);
  });
  cartNumberInput.addEventListener("change", function() {
    this.value = cc_format(this.value);
    detectCard(this.value);
  });
  
  document.getElementById("cc-summ").addEventListener("keyup", function() {
    this.value = validateNumber(this);
  });
  
  document.getElementById("cc-summ").addEventListener("change", function() {
    this.value = validateNumber(this);
  });
  
  document.getElementById("cc-month").addEventListener("keyup", function() {
    this.value = validateNumber(this, 1, 12);
  });
  
  document.getElementById("cc-month").addEventListener("change", function() {
    this.value = validateMonth(this, 1, 12);
  });
  
  document.getElementById("cc-year").addEventListener("keyup", function() {
    this.value = validateNumber(this);
  });
  
  document.getElementById("cc-year").addEventListener("change", function() {
    this.value = validateYear(this);
  });  
  
  document.getElementById("cc-cvv").addEventListener("keyup", function() {
    this.value = validateNumber(this);
  });  
  
  document.getElementById("cc-cvv").addEventListener("change", function() {
    this.value = validateCVV(this);
  });
  
  document.getElementById("cc-name").addEventListener("keyup", function() {
    this.value = validateCardName(this);
  });
  
  document.getElementById("cc-name").addEventListener("change", function() {
    this.value = validateCardName(this);
  });
  
  document.getElementById("cc-email").addEventListener("change", function() {
    validateEmail(this);
  });
  
});

function cc_format(value) {
  var v = value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "");  
  var parts = [];
  var k;
  if(v.length <= 16) {
    for (i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
  } else {
    parts.push(v.substring(0, 8));
    parts.push(v.substring(8, v.length));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
}

var cards = [
  {name: "AmericanExpress", firstNumber: [34, 37], numberLength: [15]},
  {name: "MasterCard", firstNumber: [51, 52, 53, 54, 55], numberLength: [16, 17, 18, 19]},
  {name: "Visa", firstNumber: [4], numberLength: [13, 14, 15, 16]},
  {name: "Maestro", firstNumber: [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763], numberLength: [16, 17, 18, 19]}
];

function detectCard(value) {
  value = value.replace(/\s+/g, "");
  if(value.length < 13 && value.length > 19) {
    return;
  }
  var filtredLengthCards = [];
  cards.forEach(function(card) {    
    if(card.numberLength.indexOf(value.length) !== -1) {
      filtredLengthCards.push(card);
    }
  });
  
  var cardName;
  filtredLengthCards.forEach(function(card) {
    for(var i = 1; i <= 4; i++) {
      if(card.firstNumber.indexOf(value.substring(0, i)|0) !== -1) {
        cardName = card.name;
        break;
      }
    }
  });
  
  if(cardName) {
    document.querySelector(".donate-form__card[value='"+cardName+"']").setAttribute("checked", true);
  }
  
}

function validateNumber(el, min, max) {
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "");  
  if(max && min) {
    if(v < min || v > max) { 
      el.classList.add("input-block__input--error");
    }
  } else {
    el.classList.remove("input-block__input--error");
  }
  return v;
}

function validateMonth(el, min, max) {  
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", ""); 
  if(v < min || v > max) { 
    el.classList.add("input-block__input--error");
  }
  if(v.length == 1) {
    return '0'+v;
  } else {
    return v;
  }
}

function validateCVV(el) {
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "");
  if(v.length < 3) {
    el.classList.add("input-block__input--error");
  } else {
    el.classList.remove("input-block__input--error");
  }
  return v;
}

function validateYear(el) {
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", ""); 
  if(v.length < 4) {
    el.classList.add("input-block__input--error");
  } else {
    el.classList.remove("input-block__input--error");
  }
  return v;
}

function validateCardName(el) {
  var v = el.value.replace(/[^a-zA-Z.-]/g, '');
  return v;
}

function validateEmail(el) {
  if(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,10}$/.test(el.value) === false) {
    el.classList.add("input-block__input--error");
  } else {
    el.classList.remove("input-block__input--error");
  }
}