const display = document.querySelector('#display');
const number = document.querySelector('#number');
const start = document.querySelector('#start');
const answer = document.querySelector('#answer');
let total, count, prev, timer;
let speed = 500;

start.onclick = function () {
  number.value = '';
  total = count = prev = 0;
  clearInterval(timer);

  timer = setInterval(function () {
    const i = Math.ceil(Math.random() * 99);
    if (prev === i) {
      i++;
    }
    prev = i;

    if (count === 5) {
      clearInterval(timer);
      display.innerHTML = '';
    } else {
      total += i;
      display.innerHTML = i;
    }
    count++;
  }, 500 / speed);
};

answer.onclick = function () {
  if (number.value == total) {
    display.innerHTML = '正解！';
  } else {
    display.innerHTML = total;
  }
};

// スピード調整用の入力フィールドを追加
const speedInput = document.querySelector('#speed');

speedInput.addEventListener('input', function () {
  speed = parseInt(speedInput.value);
  clearInterval(timer);
  timer = setInterval(function () {
    const i = Math.ceil(Math.random() * 99);
    if (prev === i) {
      i++;
    }
    prev = i;

    if (count === 5) {
      clearInterval(timer);
      display.innerHTML = '';
    } else {
      total += i;
      display.innerHTML = i;
    }
    count++;
  }, 500 / speed);
});
