const dictData = [
    // {
    //     romazi:"",
    //     update:"",
    //     pos:"",
    //     hanzi:"",
    //     descHanzi:"",
    //     exampleHanzi:"",
    //     descRomazi:"",
    //     exampleRomazi:""
    // },
    {
        romazi: "uá",
        update: "2025.03.12",
        pos: "代词",
        hanzi: "我",
        descHanzi: "",
        exampleHanzi: "",
        descRomazi: "",
        exampleRomazi: ""
    },
    // 更多数据可以在此添加...
];

function createDict() {
    const container = document.getElementById('dict');//外层
    
    dictData.forEach(romazi => {
        const romaziDiv = document.createElement('article');//1层
        romaziDiv.className = 'card';
        
        const head = document.createElement('header');//2层
        head.className = 'card-head';
        
            head.innerHTML=`
                <h1 class="romazi">${romazi.romazi}</h1>
                <div class="update">${romazi.update}</div>
            `;
        
        const content = document.createElement('section');//2层
        content.className = 'card-body';

            content.innerHTML=`
                <h2 class="part-of-speech">${romazi.pos}</h2>
                <span class="hanzi">${romazi.hanzi}</span>
                <div class="dingyi">
                    <p>${romazi.descHanzi}</p>
                    <p class="example">${romazi.exampleHanzi}</p>
                </div>
                <div class="tyangi">
                    <p>${romazi.descRomazi}</p>
                    <p class="example">${romazi.exampleRomazi}</p>
                </div>
            `;

        romaziDiv.appendChild(head);
        romaziDiv.appendChild(content);
        container.appendChild(romaziDiv);
    });
}

// 初始化
window.onload = createDict;