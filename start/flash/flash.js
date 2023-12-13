const display = document.querySelector('#display');
const number = document.querySelector('#number');
const start = document.querySelector('#start');
const answer = document.querySelector('#answer');
const reset = document.querySelector('#reset');
const speedInput = document.querySelector('#speed');

let total, count, prev, timer;
let speed = 8;
//display, number, start, answerはHTML要素を参照しています。これらはそれぞれ、数値を表示する場所、ユーザーが答えを入力する場所、ゲームを開始するボタン、答えを提出するボタンを指しています。
start.onclick = function () {
  document.getElementById('instructions').innerHTML = '';
  number.value = '';
  total = count = prev = 0;//total = count = prev = 0; は、3つの変数 total、count、および prev をすべて0に初期化するコードです。この行のコードは、これらの3つの変数を同時に初期化しています。
  clearInterval(timer);//clearInterval(timer) は、指定されたタイマーをクリア（停止）するためのJavaScriptのメソッドです。この行のコードは、変数 timer に保存されているタイマーを停止します。

  timer = setInterval(function () {
    let i = Math.ceil(Math.random() * 10);//ここは桁数　10を掛けてからMath.ceilを使って切り上げています。この結果、1から10の整数が得られます。
    if (prev === i) {
      i++;//同じ値になってもいいけど避けておく
    }
    prev = i;

    if (count === 5) {
      clearInterval(timer);//clearInterval(timer): ゲームが終了した場合、clearInterval 関数が呼び出されて、タイマーを停止します。これにより、ゲームのタイマーが停止し、新しいゲームの開始が妨げられます。
      display.innerHTML = '';//
    } else {
      total += i;
      display.innerHTML = i;
    }
    count++;
  }, 1000 / speed);
};
//answer.onclick関数は、答えを提出するボタンがクリックされたときに実行されます。この関数は、ユーザーが入力した答えが合計と一致するかどうかを確認し、結果を表示します。
answer.onclick = function () {
  if (number.value == total) {
    display.innerHTML = '正解！';
  } else {
    display.innerHTML = 'おしい!! 合計は ' + total + ' でした。';
  }
};

// スピード調整用の入力フィールドを追加

speedInput.addEventListener('input', function () {
  let inputValue = parseFloat(speedInput.value);
  if (inputValue <= 0) {
    alert('スピードは0より大きい値を入力してください。');
    speedInput.value = 1; // デフォルトの値を設定
    speed = 1;
  } else {
    speed = inputValue;
  }
});


reset.onclick = function () {
  // RESETボタンがクリックされたときに実行する処理
  clearInterval(timer); // タイマーを停止
  display.innerHTML = ''; // 表示をクリア
  number.value = ''; // 入力フィールドをクリア
  total = count = prev = 0; // 変数をリセット
  document.getElementById('instructions').innerHTML = 'スピードを調整してstartを押してください';
};



//----------------------------------------------------------

document.getElementById('openModal').addEventListener('click', function() {
  document.getElementById('overlay').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('overlay').classList.add('hidden');
});






/*
Math.random(): この部分は、0以上1未満の浮動小数点数を返すJavaScriptの組み込み関数です。Math.random() を呼び出すと、0以上1未満のランダムな小数が得られます。例えば、0.237、0.891、0.502などの値が得られます。

Math.random() * 99: この部分は、0から99までの乱数を生成するために、Math.random() の結果を99倍しています。このことにより、0以上99未満の乱数が得られます。

Math.ceil(): Math.ceil() は、与えられた数値を切り上げて整数に変換する関数です。これにより、小数点以下の値を切り上げて、0以上99以下の整数が得られます。例えば、0.1は1に切り上げられ、1.9は2に切り上げられます。

const i = ...: 最終的に、得られた乱数を i という定数（const）に格納しています。const を使用すると、変数は再代入できず、一度値が設定されると変更できません。つまり、i の値は後で変更できないため、乱数が一度生成されると変更されることはありません。

*/
