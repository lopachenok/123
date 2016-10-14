var summ,
    formDropdown,
    finalCount,
    btnPeriod;
var allError = {
  month: '',
  year: '',
  cvv: ''
};

document.addEventListener("DOMContentLoaded", function() {
  var cartNumberInput = document.getElementById("cc-number");

  summ = document.getElementById("cc-summ");
  var month = document.getElementById("cc-month");
  var year = document.getElementById("cc-year");
  var cvv = document.getElementById("cc-cvv");
  var name = document.getElementById("cc-name");
  var email = document.getElementById("cc-email");
  formDropdown = document.getElementById("cc-dropdown");
  finalCount = document.getElementById("final-count");
  var checkbox = document.getElementById("cc-monthly");

  summ.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
  });

  summ.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    changeBtnInnerText(this.value);
  });

  cartNumberInput.addEventListener("keyup", function() {
    this.value = cc_format(this);
    if(validateEmpty(this.value, validateLengthInRange, 13, 19) === false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  cartNumberInput.addEventListener("blur", function() {
    this.value = cc_format(this);
    if(validateEmpty(this.value, validateLengthInRange, 13, 19) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный номер карты.');
    } else {
      addRemoveErrorState('remove', this, 'Информация передается по защищенному соединению');
    }
    detectCard(this);
  });

  month.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateInRange, 1, 12) === false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  month.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    this.value = formatMonth(this.value);
    if(validateEmpty(this.value, validateInRange, 1, 12) === false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный месяц.');
      allError.month = 'Пожалуйста, введите корректный месяц.';
    } else {
      allError.month = '';
      if(allError.year !== '') {
        addRemoveErrorState('remove', this, allError.year);
      } else if(allError.cvv !== '') {
        addRemoveErrorState('remove', this, allError.cvv);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  year.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateYear) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  year.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateYear) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный год.');
      allError.year = 'Пожалуйста, введите корректный год.';
    } else {
      allError.year = '';
      if(allError.month !== '') {
        addRemoveErrorState('remove', this, allError.month);
      } else if(allError.cvv !== '') {
        addRemoveErrorState('remove', this, allError.cvv);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  cvv.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 3) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  cvv.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, true);
    if(validateEmpty(this.value, validateLength, 3) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный код CVV.');
      allError.cvv = 'Пожалуйста, введите корректный код CVV.';
    } else {
      allError.cvv = '';
      if(allError.month !== '') {
        addRemoveErrorState('remove', this, allError.month);
      } else if(allError.year !== '') {
        addRemoveErrorState('remove', this, allError.year);
      } else {
        addRemoveErrorState('remove', this, '');
      }
    }
  });

  name.addEventListener("keyup", function() {
    this.value = sanitizeValue(this.value, false, true);
  });

  name.addEventListener("blur", function() {
    this.value = sanitizeValue(this.value, false, true);
  });

  email.addEventListener("keyup", function() {
    if(validateEmpty(this.value, validateEmail) == false) {
      addRemoveErrorState('keyup-add', this, '');
    } else {
      addRemoveErrorState('keyup-remove', this, '');
    }
  });

  email.addEventListener("blur", function() {
    if(validateEmpty(this.value, validateEmail) == false) {
      addRemoveErrorState('add', this, 'Пожалуйста, введите корректный адрес электронной почты.');
    } else {
      addRemoveErrorState('remove', this, 'Мы вышлем квитанцию Вам на электронную почту. Никакого спама, обещаем.');
    }
  });

  formDropdown.addEventListener("choose", function(e) {
    btnPeriod = e.detail.getAttribute("data-value");
    changeBtnInnerText(summ.value, e.detail.getAttribute("data-value"));
    if(btnPeriod == 'once') {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }

  });

  checkbox.addEventListener("change", function() {
    if(this.checked) {
      changeBtnInnerText(summ.value, 'monthly');
      selectOption(formDropdown.querySelector("*[data-value='monthly']"));
    } else {
      changeBtnInnerText(summ.value, 'once');
      selectOption(formDropdown.querySelector("*[data-value='once']"));
    }
  });

});

function cc_format(el) {
  var v = el.value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "");

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

function detectCard(el) {
  value = el.value.replace(/\s+/g, "");

  if(value.length < 13 || value.length > 19) {
    return;
  }
  el.classList.remove("input-block__input--error");
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
    addRemoveErrorState('remove', el, '');
  } else {
    addRemoveErrorState('add', el, 'Пожалуйста, введите корректный номер карты.');
  }

}

function validateEmail(value) {
  if(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,10}$/.test(value) === false) {
    return false;
  } else {
    return true;
  }
}

function validateEmpty(value, validateFunction) {
  if(value === '') {
    return false;
  } else {
    var arg = Array.prototype.slice.call(arguments, 2);
    arg.unshift(value);
    return validateFunction.apply(null, arg);
  }
}

function formatMonth(value) {
  if(value.length === 1) {
    return '0'+value;
  }
  return value;
}

function sanitizeValue(value, number, name) {
  var newValue = '';
  if(number) {
    newValue = value.replace(/\s+/g, '').replace(/[^-0-9]/gim,'').replace("-", "")
  } else if(name) {
    newValue = value.replace(/[^a-zA-Z.-\s]/g, '');
  }
  return newValue;
}

function validateLength(value, length) {
  if(value.length < length) {
    return false;
  } else {
    return true;
  }
}

function validateYear(value) {
  if(value.length < 4) {
    return false;
  } else {
    var now = new Date();
    if(value < now.getFullYear() ) {
      return false;
    } else {
      return true;
    }
  }
}

function validateInRange(value, min, max) {
  value = value|0;
  if(value < min || value > max) {
    return false;
  } else {
    return true;
  }
}

function validateLengthInRange(value, min, max) {
  value = value.replace(/\s+/g, "");
  if(value.length < min || value.length > max) {
    return false;
  } else {
    return true;
  }
}

function addRemoveErrorState(flag, el, text) {
  switch(flag) {
    case 'add':
      el.classList.add("input-block__input--error"); break;
    case 'remove':
      el.classList.remove("input-block__input--error"); break;
    case 'keyup-add':
      el.classList.add("input-block__input--only-error"); break;
    case 'keyup-remove':
      el.classList.remove("input-block__input--only-error"); break;
  }

  if(flag == 'add' || flag == 'remove') {
    if(el.parentElement.nextElementSibling && el.parentElement.nextElementSibling.nodeName == 'P') {
      el.parentElement.nextElementSibling.innerHTML = text;
    } else {
      document.getElementById("own-error-text").innerHTML = text;
    }
  }

}

function changeBtnInnerText(count, period) {
  count = count;
  period = period;

  var substr;
  if(window.innerWidth < tabletSize) {
    substr = "/мес";
  } else {
    substr = " в месяц";
  }
  finalCount.innerHTML = count+'&#8381;'+(period == 'monthly'?substr:'');
}
