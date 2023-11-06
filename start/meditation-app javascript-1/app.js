// DOM要素の取得
const song = document.querySelector(".song"); // audio要素を取得します
const play = document.querySelector(".play"); // 再生/一時停止ボタンを取得します
const replay = document.querySelector(".replay"); // 曲の再起動ボタンを取得します
const outline = document.querySelector(".moving-outline circle"); // SVGのcircle要素を取得します
const video = document.querySelector(".vid-container video"); // video要素を取得します

// 音源とビデオソースの選択
const sounds = document.querySelectorAll(".sound-picker button"); // すべての音源選択ボタンを取得します

// 時間表示
const timeDisplay = document.querySelector(".time-display"); // 時間表示要素を取得します
const outlineLength = outline.getTotalLength(); // SVGのcircleの長さを取得します

// 再生時間
const timeSelect = document.querySelectorAll(".time-select button"); // すべての再生時間選択ボタンを取得します
let fakeDuration = 600; // 初期の再生時間（秒）を設定します

// SVGのcircleのスタイルを設定します
outline.style.strokeDashoffset = outlineLength;//SVGのcircle要素の破線の開始位置を設定します。strokeDashoffsetは、破線のパターンが開始する位置を指定します
outline.style.strokeDasharray = outlineLength;//SVGのcircle要素の破線のパターンを設定します。strokeDasharrayは、破線のパターン（点と空白の長さ）を指定します2

// 初期の時間表示を設定します
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60//。fakeDurationは音楽の再生時間（秒）を表し、それを分と秒に変換して表示します。
)}`;

// 各音源選択ボタンにクリックイベントリスナーを設定します
sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound"); // 音源を選択します
    video.src = this.getAttribute("data-video"); // ビデオソースを選択します
    checkPlaying(song); // 曲の再生状態をチェックします
  });
});

// 再生/一時停止ボタンにクリックイベントリスナーを設定します
play.addEventListener("click", function() {
  checkPlaying(song); // 曲の再生状態をチェックします
});

// 曲の再起動ボタンにクリックイベントリスナーを設定します
replay.addEventListener("click", function() {
    restartSong(song); // 曲を再起動します
});

// 曲の再起動関数
const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0; // 曲の再生位置を初めに戻します
    console.log("ciao")
}

// 各再生時間選択ボタンにクリックイベントリスナーを設定します
timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time"); // 再生時間を選択します
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`; // 時間表示を更新します
  });
});

// 曲の再生状態をチェックする関数
const checkPlaying = song => {
  if (song.paused) {
    song.play(); // 曲が一時停止中なら再生します
    video.play(); // ビデオが一時停止中なら再生します
    play.src = "./svg/pause.svg"; // ボタンのアイコンを一時停止アイコンに変更します
  } else {//曲、ビデオ、ボタンを一回のクリックで変更する
    song.pause(); // 曲が再生中なら一時停止します
    video.pause(); // ビデオが再生中なら一時停止します
    play.src = "./svg/play.svg"; // ボタンのアイコンを再生アイコンに変更します
  }
};

// 曲の再生位置が更新されたときの処理
song.ontimeupdate = function() {
  let currentTime = song.currentTime; // 現在の再生位置を取得します
  let elapsed = fakeDuration - currentTime; // 残り時間を計算します
  let seconds = Math.floor(elapsed % 60); // 残り秒数を計算します
  let minutes = Math.floor(elapsed / 60); // 残り分数を計算します
  timeDisplay.textContent = `${minutes}:${seconds}`; // 時間表示を更新します
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength; // SVGのcircleの進行状況を計算します
  outline.style.strokeDashoffset = progress; // SVGのcircleの進行状況を更新します

  // 曲が終了したときの処理
  if (currentTime >= fakeDuration) {
    song.pause(); // 曲を一時停止します
    song.currentTime = 0; // 曲の再生位置を初めに戻します
    play.src = "./svg/play.svg"; // ボタンのアイコンを再生アイコンに変更します
    video.pause(); // ビデオを一時停止します
  }
};


// 初期の時間表示を設定します　自分でいれたやつ
let minutes = Math.floor(fakeDuration / 60);
let seconds = Math.floor(fakeDuration % 60);
timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;



/*
このJavaScriptコードは、HTMLドキュメントから特定の要素を選択し、それらを変数に保存しています。これにより、後続のコードでこれらの要素を操作できます。
具体的には、以下のような操作を行っています：

- `document.querySelector(".song")`：HTMLドキュメント内で`.song`というクラスを持つ最初の要素（この場合は音楽ファイルを再生するための`<audio>`要素）を選択し、それを`song`という変数に保存します。

- `document.querySelector(".play")`：HTMLドキュメント内で`.play`というクラスを持つ最初の要素（この場合は再生/一時停止ボタン）を選択し、それを`play`という変数に保存します。

- `document.querySelector(".replay")`：HTMLドキュメント内で`.replay`というクラスを持つ最初の要素（この場合は曲の再起動ボタン）を選択し、それを`replay`という変数に保存します。

- `document.querySelector(".moving-outline circle")`：HTMLドキュメント内で`.moving-outline`というクラスを持つ要素の中の`<circle>`要素（この場合はSVGの一部）を選択し、それを`outline`という変数に保存します。

- `document.querySelector(".vid-container video")`：HTMLドキュメント内で`.vid-container`というクラスを持つ要素の中の`<video>`要素（この場合はビデオファイルを再生するための要素）を選択し、それを`video`という変数に保存します。

これらの要素は、後続のコードで音楽の再生、一時停止、再起動などの操作を行うために使用されます。何か他に質問がありましたら、お気軽にどうぞ！




提供されたコードは、JavaScriptを使用してWebページ上の要素を操作するためのものです。以下はコードの詳細な説明です：

1. `const sounds` という変数は、 `document.querySelectorAll(".sound-picker button")` を代入します。これはDOM（Document Object Model）からHTML要素を取得し、それらを`sounds`変数に格納します。この行は次のことを行います：
   - `document` は現在のウェブページ全体を表すDOMオブジェクトを参照します。
   - `.querySelectorAll(".sound-picker button")` は、CSSセレクターを使用してDOM内の特定の要素を選択します。
   - このセレクタは、クラスが "sound-picker" である要素の内部にある `<button>` 要素を選択します。つまり、 `.sound-picker` クラス内のボタン要素全体を選択します。

2. `sounds` 変数には、クラスが "sound-picker" の要素内にあるすべてのボタン要素がNodeListとして格納されます。NodeListは要素のリストを表し、これらの要素にアクセスできます。

このコードは、ウェブページ上で "sound-picker" クラス内にあるボタン要素を取得し、それらの要素を操作するために使用できるようにします。一般的には、これらの要素にイベントリスナーを追加したり、クリックなどのアクションに応じて特定の処理を実行するために使用されます。




このコードは、音楽の再生時間を分と秒の形式で表示するためのものです。具体的には以下のような操作を行っています：

1. `Math.floor(fakeDuration / 60)`：`fakeDuration`（音楽の再生時間を秒単位で表したもの）を60で割ることで、再生時間を分単位で計算します。`Math.floor`関数は、引数として与えられた数値以下の最大の整数を返すため、この計算結果は分単位の整数値になります。

2. `Math.floor(fakeDuration % 60)`：`fakeDuration`を60で割った余りを計算することで、再生時間の秒数を計算します。ここでも`Math.floor`関数が使用されています。

3. `${...}:${...}`：バッククォート（`）で囲まれた文字列内の`${}`は、その中に書かれたJavaScriptの式を評価し、その結果を文字列に挿入します。この場合、先ほど計算した分と秒をコロン（:）でつなげた形式の文字列を作成します。

4. `timeDisplay.textContent = ...`：`textContent`プロパティは、指定した要素のテキスト内容を取得または設定するために使用します。このコードでは、計算した再生時間の文字列を`timeDisplay`要素（HTML内の`.time-display`クラスを持つ要素）のテキスト内容として設定しています。

以上がこのコードの主な機能です。何か他に質問がありましたら、お気軽にどうぞ！


*/