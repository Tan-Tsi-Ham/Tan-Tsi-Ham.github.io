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
        romazi:"tiâng",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"倎",
        descHanzi:"“底人”的合音",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tiang-sî",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"",
        descHanzi:"",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tī-kâi",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"底个",
        descHanzi:"",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tī-kò",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"底块",
        descHanzi:"",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tī-nâng",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"底人",
        descHanzi:"",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tī-tiâng",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"底倎",
        descHanzi:"",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tǒ-kò",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"在块",
        descHanzi:"疑问语气",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
    },
    {
        romazi:"tǒ-kōh",
        update:"2025.03.12",
        pos:"代词",
        hanzi:"在块",
        descHanzi:"肯定语气",
        exampleHanzi:"",
        descRomazi:"",
        exampleRomazi:""
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