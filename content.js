//ポストテンプレートのデフォルト値
function gedDefaultTemplate(){
    return "【{title} {subtitle}】を視聴中\n{link}\n";
}

//コンテキストメニューのクリック
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "postPrimeVideo") {
            postPrimeVideo();
        }
    });


//プライムビデオで視聴中の動画をポスト
function postPrimeVideo(){
    //オプションのデータを利用する。
    chrome.storage.sync.get('userTemplate', function(data) {
        //ポストテンプレートの取得
        const template = data.userTemplate || gedDefaultTemplate();

        //動画情報の取得
        const link = window.location.href;
        const title = document.querySelector('h1.atvwebplayersdk-title-text').textContent;
        const subtitle = document.querySelector('h2.atvwebplayersdk-subtitle-text').textContent;
        if(title == ""){
            alert("動画情報を取得できませんでした。");
            return;
        }

        //ポストする文字列を生成
        const postText = createPostText(template, link, title, subtitle);

        //ポスト
        window.open(createTweetLink(postText));
    });
}

//オプションで指定されたフォーマットに従い、ポストする文字列を生成する
function createPostText(template, link, title, subtitle){
    return template
        .replace(/\{link\}/g, link)
        .replace(/\{title\}/g, title)
        .replace(/\{subtitle\}/g, subtitle);
}

//ポストするリンクの生成
function createTweetLink(text) {
    const baseURL = "https://twitter.com/intent/tweet?text=";
    const encodedText = encodeURIComponent(text);
    return baseURL + encodedText;
}

