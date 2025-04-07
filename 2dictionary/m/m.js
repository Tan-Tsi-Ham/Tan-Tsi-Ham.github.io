
// 初始化列表
function initList() {
    // 注意dict.js可能着复制多份，分予每个选项！
    // 使用 fetch 加载 JSON 文件
    fetch('m.json') // 运行网页的相对路径指向 data.json 文件。不是以js文件为起点！
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // 解析 JSON 数据
    })
    .then(dictionaryData => {
        // 两个方案，不知道哪个快一点

        // 方案一：直接设置超链接跳转（可直接复制粘贴为无JavaScript）
        let htmlContent='';
        Object.keys(dictionaryData).forEach(entry => {
            htmlContent+=`
                <a href="../item.html?word=${encodeURIComponent(entry)}">
                   <li class="entry-item"> ${dictionaryData[entry].text}</li>
                </a>
            `;
        });
        document.getElementById('entryList').innerHTML = htmlContent;

        // 方案二：用JavaScript执行跳转
        // const list = document.getElementById('entryList');
        // Object.keys(dictionaryData).forEach(entry => {
        //     const li = document.createElement('li');
        //     li.className = 'entry-item';
        //     // li.textContent = entry;
        //     const text=dictionaryData[entry].text;
        //     li.onclick = () => {
        //         // 通过URL参数传递条目名称
        //         window.open(`../item.html?word=${encodeURIComponent(entry)}`,"_blank");
        //     };
        //     const span = document.createElement('span');
        //     span.textContent = `${text}`;
        //     li.appendChild(span);
        //     list.appendChild(li);
        // });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
window.onload = initList;
