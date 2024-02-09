//拡張機能インストール時に、コンテキストメニューを作成
chrome.runtime.onInstalled.addListener(() => {
        chrome.contextMenus.create({
            id: "postPrimeVideo",
            title: "Xにポスト",
            contexts: ["all"],
            documentUrlPatterns: ["https://www.amazon.co.jp/gp/video/detail/*"]
        });
    });
  
//コンテキストメニューがクリックされたとき、
chrome.contextMenus.onClicked.addListener((info, tab) => {
        if (info.menuItemId === "postPrimeVideo") {
            chrome.tabs.sendMessage(tab.id, {action: "postPrimeVideo"});
        }
    });