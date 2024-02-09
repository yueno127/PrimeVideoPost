//ポストテンプレートのデフォルト値
function gedDefaultTemplate(){
    return "【{title} {subtitle}】を視聴中\n{link}\n";
}

// 保存された設定をロード
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);

function saveOptions() {
    const template = document.getElementById('template').value;
    chrome.storage.sync.set({userTemplate: template});
}

function loadOptions() {
    chrome.storage.sync.get('userTemplate', function(data) {
        document.getElementById('template').value = data.userTemplate || gedDefaultTemplate();
    });
}

function resetOptions() {
    // デフォルト（またはリセット後の状態）のテンプレート設定をここに指定
    const defaultTemplate = gedDefaultTemplate();
    document.getElementById('template').value = defaultTemplate;
    //storageにもリセットした値を保存
    chrome.storage.sync.set({userTemplate: defaultTemplate});
}

//フェードアウトアニメーション
document.getElementById('save').addEventListener('click', function() {
    // 保存完了メッセージを表示し、フェードアウト開始
    let saveMessage = document.getElementById('saveMessage');
    saveMessage.style.display = 'block'; // メッセージを表示
    saveMessage.classList.add('fade-in-out');

    // フェードアウトアニメーションが完了したら
    saveMessage.addEventListener('animationend', () => {
        saveMessage.classList.remove('fade-in-out'); // アニメーションクラスを削除
        saveMessage.style.display = 'none'; // メッセージを非表示にする行は不要になるため削除
    }, { once: true }); // リスナーが一度だけ実行されるようにする
});