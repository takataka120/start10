

var display = document.querySelector('#display');
var number = document.querySelector('#number');
var start = document.querySelector('#start');
var answer = document.querySelector('#answer');
var total, count, prev, timer;

start.onclick = function () {
  number.value = '';
  total = count = prev = 0;
  timer = setInterval(function () {
    var i = Math.ceil(Math.random() * 99);
    if (prev == i) {
      i++;
    }
    prev = i;
    if (count == 5) {
      clearInterval(timer);
      display.innerHTML = '';
    } else {
      total += i;
      display.innerHTML = i;
    }
    count++;
  }, 500)
}

answer.onclick = function () {
  if (number.value == total) {
    display.innerHTML = '正解！';
  } else {
    display.innerHTML = total;
  }
}
