const display = document.querySelector('#display');
const number = document.querySelector('#number');
const start = document.querySelector('#start');
const answer = document.querySelector('#answer');
let total, count, prev, timer;
let speed = 8;
//display, number, start, answerはHTML要素を参照しています。これらはそれぞれ、数値を表示する場所、ユーザーが答えを入力する場所、ゲームを開始するボタン、答えを提出するボタンを指しています。
start.onclick = function () {
  number.value = '';//number.value = ''; は、指定されたHTML要素である number というIDを持つ要素（おそらく <input> 要素）の値を空文字列に設定しています。このコードは、ユーザーが <input> 要素に入力した値をクリアし、空の状態にリセットするために使用されます。一般的な使用ケースとして、ゲームやアプリケーションなどで、新しいゲームやタスクを開始する前に入力フィールドをリセットする必要がある場合に、このようなコードが使用されます。入力フィールドを空にすることで、ユーザーは新しい入力を開始できます
  total = count = prev = 0;//total = count = prev = 0; は、3つの変数 total、count、および prev をすべて0に初期化するコードです。この行のコードは、これらの3つの変数を同時に初期化しています。
  clearInterval(timer);//clearInterval(timer) は、指定されたタイマーをクリア（停止）するためのJavaScriptのメソッドです。この行のコードは、変数 timer に保存されているタイマーを停止します。

  timer = setInterval(function () {
    let i = Math.ceil(Math.random() * 99);
    if (prev === i) {
      i++;
    }
    prev = i;

    if (count === 5) {
      clearInterval(timer);//clearInterval(timer): ゲームが終了した場合、clearInterval 関数が呼び出されて、タイマーを停止します。これにより、ゲームのタイマーが停止し、新しいゲームの開始が妨げられます。
      display.innerHTML = '';//display.innerHTML = '';: ゲームの終了時に、display というIDを持つ要素（おそらくHTML内のテキスト表示用の要素）の innerHTML プロパティを空に設定して、表示領域をクリアします。
    } else {
      total += i;
      display.innerHTML = i;
    }
    count++;
  }, speed * 1000);
};
//answer.onclick関数は、答えを提出するボタンがクリックされたときに実行されます。この関数は、ユーザーが入力した答えが合計と一致するかどうかを確認し、結果を表示します。
answer.onclick = function () {
  if (number.value == total) {
    display.innerHTML = '正解！';
  } else {
    display.innerHTML = 'ざんねん!! 合計は ' + total + ' でした。';
  }
};

// スピード調整用の入力フィールドを追加
const speedInput = document.querySelector('#speed');

speedInput.addEventListener('input', function () {
  speed = parseFloat(speedInput.value); // parseIntをparseFloatに変更
});



/*
Math.random(): この部分は、0以上1未満の浮動小数点数を返すJavaScriptの組み込み関数です。Math.random() を呼び出すと、0以上1未満のランダムな小数が得られます。例えば、0.237、0.891、0.502などの値が得られます。

Math.random() * 99: この部分は、0から99までの乱数を生成するために、Math.random() の結果を99倍しています。このことにより、0以上99未満の乱数が得られます。

Math.ceil(): Math.ceil() は、与えられた数値を切り上げて整数に変換する関数です。これにより、小数点以下の値を切り上げて、0以上99以下の整数が得られます。例えば、0.1は1に切り上げられ、1.9は2に切り上げられます。

const i = ...: 最終的に、得られた乱数を i という定数（const）に格納しています。const を使用すると、変数は再代入できず、一度値が設定されると変更できません。つまり、i の値は後で変更できないため、乱数が一度生成されると変更されることはありません。

*/
