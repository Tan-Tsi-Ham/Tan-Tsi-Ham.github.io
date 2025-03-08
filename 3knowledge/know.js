const techData = [
    {
        era: "数学",
        technologies: [
            { 
                name: "calculus",
                hanzi: "微积分",
                desc: "",
                scr: "Calculus"
            },
            {
                name: "linear algebra",
                hanzi: "线性代数",
                desc: "",
                scr: "LinearAlgebra"
            },
            {
                name: "概率论",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "数理统计",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "微分方程",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "数论",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "图论",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "运筹学",
                hanzi: "",
                desc: "",
                scr: ""
            },
        ]
    },
    {
        era: "物理",
        technologies: [
            {
                name: "力学",
                hanzi: "",
                desc: "",
                scr: ""
            },{
                name: "热学",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "电磁学",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "几何光学",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "物理光学",
                hanzi: "",
                desc: "",
                scr: ""
            },
            {
                name: "量子理论",
                hanzi: "",
                desc: "",
                scr: ""
            }
        ]
    },
    {
        era:"语言",
        technologies: [
            {
                name: "English",
                hanzi: "英语",
                desc: "",
                scr: ""
            },
            {
                name: "",
                hanzi: "法语",
                desc: "",
                scr: ""
            }
        ]
    },
    // 更多数据可以在此添加...
];

function createTechTree() {
    const container = document.getElementById('tech-tree');//最外层
    
    techData.forEach(era => {
        const eraDiv = document.createElement('div');//1层
        eraDiv.className = 'era frame';
        
        const title = document.createElement('h2');//2层+内容era
        title.className = 'era-title';
        title.textContent = era.era;
        
        const timeline = document.createElement('div');//2层
        timeline.className = 'conlist';
        
        era.technologies.forEach(tech => {
            const node = document.createElement('a');//3层
            node.className = 'tech-node';
            node.href = "https://example.com/" + encodeURIComponent(tech.scr); // 设置链接
            node.target = "_blank"; // 新标签页打开
            node.rel = "noopener noreferrer"; // 安全设置
//以下是4层内的内容
            node.innerHTML = `
                <div class="node-title">${tech.name}</div>
                <div class="node-hanzi">${tech.hanzi}</div>
                <div class="node-desc">${tech.desc}</div>
            `;
            
            node.addEventListener('mouseover', showTooltip);
            node.addEventListener('mousemove', moveTooltip);
            node.addEventListener('mouseout', hideTooltip);
            
            timeline.appendChild(node);
        });

        eraDiv.appendChild(title);//eraDiv里面加title
        eraDiv.appendChild(timeline);//eraDiv里面加timeline
        container.appendChild(eraDiv);//container里面加eraDiv
    });
}

// 工具提示功能
let tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

function showTooltip(e) {
    const tech = e.currentTarget;
    const title = tech.querySelector('.node-title').textContent;
    const hanzi = tech.querySelector('.node-hanzi').textContent;
    const desc = tech.querySelector('.node-desc').textContent;
    
    tooltip.innerHTML = `<strong>${title}</strong><br>${hanzi}<br>${desc}`;
    tooltip.style.display = 'block';
}

function moveTooltip(e) {
    tooltip.style.left = e.clientX + 15 + 'px';
    tooltip.style.top = e.clientY + 15 + 'px';
}

function hideTooltip() {
    tooltip.style.display = 'none';
}

// 初始化
window.onload = createTechTree;