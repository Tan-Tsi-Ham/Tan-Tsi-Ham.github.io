// 解析URL参数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 动态加载内容
function loadContent() {
    // 注意，item.js需要fetch的文件是全部！！！后期改文件名。
    // 使用 fetch 加载 JSON 文件
    fetch('p/p.json') // 运行网页的相对路径指向 data.json 文件。不是以js文件为起点！
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析 JSON 数据
    })
    .then(dictionaryData => {
        const word = getQueryParam('word');
        if (!word || !dictionaryData[word]) {
            document.getElementById('contentContainer').innerHTML = `
                <h1>条目不存在</h1>
                <p>您查找的词汇暂时没有收录</p>
            `;
            return;
        }

        const entry = dictionaryData[word];
        document.title = `${entry.romazi} 辞典-海墘网-HáiKyî`;
        document.getElementById('contentContainer').innerHTML = `
            <div>
                <span class="romazi">${entry.romazi}</span>
                <span class="hanzi-s">${entry.hanzis}</span>
                <span class="hanzi-t">${entry.hanzit}</span>
            </div>
            <div>
                <span class="variant">${entry.variant}</span>
            </div>
            <div class="etymology">${entry.etymology}<div>
            <div>
                <span class="partOfSpeech">${entry.partOfSpeech}</span>
                <span class="types">${entry.types}</span>
            </div>
            <p class="definition">
                ${entry.definition.join('<br>')}
            </p>
            <div class="example">
                例句：<br>${entry.example.join('<br>')}
            </div>
            <div class="note">
                ${entry.note}
            </div>
            <div class="update">更新时间：${entry.update}<div>
        `;
    });
}

// 页面初始化
window.onload = loadContent;
