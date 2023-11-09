const Keyboard = {
    elements: {//elements オブジェクトは、仮想キーボードの主要な要素と関連するプロパティを格納するためのオブジェクトです。これらのプロパティは、仮想キーボードの構築と操作に使用されます。以下は各プロパティの詳細です：
        main: null,//main: これは仮想キーボード全体を包括するメイン要素を表すプロパティです。通常、仮想キーボード全体のコンテナとして使用され、キーボード全体の表示と非表示を制御するために使用されます。
        keysContainer: null,//これはキー要素（キーボードの各キー）をまとめるコンテナ要素を表すプロパティです。キー要素はこのコンテナ内に配置され、コンテナごとにスタイルや操作を適用できます。
        keys: []/*これらの要素は仮想キーボードの構築と操作に使用されます。 */
    },

    eventHandlers: {/*これらのイベントハンドラは、キーボードの動作に関連するアクションを処理します。 */
        oninput: null,
        onclose: null
    },

    properties: {/*これはキーボードの状態とプロパティを管理するためのオブジェクトです。具体的には、現在の入力値（value）とCaps Lockの状態（capsLock）が含まれています。 */
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements 「新しい div」という表現は、HTML文書内に存在しない、新しく生成された <div> 要素を指しています。HTML文書内に要素を追加する場合、JavaScriptの document.createElement メソッドを使用して新しい要素をメモリ内で作成します。
        this.elements.main = document.createElement("div");//仮想キーボードのメイン要素を表すプロパティです。この行のコードは、新しい div 要素を作成し、その要素を this.elements.main に代入しています。
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");//"keyboard" クラスと "keyboard--hidden" クラスが追加されます。これにより、この要素にスタイルが適用され、キーボードが非表示になります
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);//簡単に言えば、このコードは仮想キーボードの要素を文書に挿入し、それによって仮想キーボードがウェブページ上に表示されるようになります。これにより、ユーザーが仮想キーボードを利用できるようになります。

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });//簡単に言えば、このコードは特定のクラスを持つ入力要素（テキストボックスなど）にフォーカスが当たったときに、仮想キーボードを開いて、キーボードの入力結果を入力要素に反映させるための処理を設定しています。
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");//4つ改行させる
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {//DOMContentLoaded イベントは、ウェブページのDOMが構築され、読み込みが完了したときに発生します。
    Keyboard.init();
});//簡単に言えば、このコードはウェブページが完全に読み込まれ、DOMが構築された後に、仮想キーボードの初期化処理を開始するように設定されています。これにより、仮想キーボードが正しく機能するために必要な初期化が適切なタイミングで行われます。



/*
.appendChild メソッドは、DOM（Document Object Model）内の要素に対して、指定した子要素を追加するためのメソッドです。以下はこのメソッドが行う主な役割です：

親要素に子要素を追加： .appendChild メソッドは、指定した要素（子要素）を、別の要素（親要素）に追加します。親要素は子要素を包含するコンテナのようなものです。

階層構造を作成： このメソッドを使用して、要素を階層的に配置し、DOMツリー内に親子関係を作成します。子要素は親要素の内部に配置され、親要素の下に階層的に配置されます。

複数回使用可能： .appendChild メソッドは、同じ子要素を複数回追加することができます。子要素を別の親要素に移動させたり、コンテナ内で再配置する際に便利です。

具体的な例として、次のコードは新しい段落要素（<p>）を作成し、それを既存の <div> 要素内に追加する例です：




javascript
Copy code
// 新しい段落要素を作成
var newParagraph = document.createElement("p");
newParagraph.textContent = "新しい段落です。";

// 既存の <div> 要素に新しい段落を追加
var divElement = document.getElementById("myDiv"); // 既存の <div> 要素を取得
divElement.appendChild(newParagraph);
このコードでは、新しい段落要素が既存の <div> 要素に追加され、新しい段落が表示されるようになります。.appendChild メソッドは、要素の階層的な構造を作成し、DOM内で要素を配置するために広く使用されます。



*/





/**    this.elements.main = document.createElement("div");
何をしていますか？
ChatGPT
this.elements.main は仮想キーボードのメイン要素を表すプロパティです。この行のコードは、新しい div 要素を作成し、その要素を this.elements.main に代入しています。

具体的には、document.createElement("div") は新しい div 要素をメモリ内で生成します。
そして、生成された要素を this.elements.main プロパティに代入することで、この要素を仮想キーボードのメイン要素として使用できるようになります。

このようにして、JavaScriptコードで新しいHTML要素を動的に生成し、ページに追加することができます。
仮想キーボードのメイン要素はこの方法で作成され、その後スタイリングや他の操作が行われます。 */