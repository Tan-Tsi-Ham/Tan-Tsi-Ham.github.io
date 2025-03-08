const dictData = [
    {
        romazi: "pa",
        update: "2025.02.07",
        pos: "名词",
        hanzi: "疤",
        descHanzi: "1.一撮受伤过的地方无便变到佮以前完全平样。此块𠀾平样的地方。",
        exampleHanzi: "我以前跛着，了tsín就留块疤按呢。",
        descRomazi: "1.Tseg choh siǔ-sye kuē kāi tī-hng bô-piàng pyì kàu kah yí-tsôy uân-chuân pêr-yē. Tsí kò bǒi pêr-yē kāi tī-hng.",
        exampleRomazi: "Uá yí-tsôi puax tieh, liáu tsín tsǔ lâu kò pa a-ne."
    },
    {
        romazi: "pa-pâ",
        update: "2025.02.06",
        pos: "名词",
        hanzi: "爸爸",
        descHanzi: "1.口语底叫父亲，也好简单叫做pa或pâ。",
        exampleHanzi: "恁爸",
        descRomazi: "1.Qáu-gír tói kiè pě-chin, iā hó kám-twa kiè tsò pa hog pâ.",
        exampleRomazi: "nńg pa"
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