// 初始化应用
document.addEventListener('DOMContentLoaded', async () => {
    // 获取DOM元素
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsList = document.getElementById('results-list');
    const resultsCount = document.getElementById('results-count');
    const wordDetail = document.getElementById('word-detail');
    const backButton = document.querySelector('.back-button');
    const wordCountElement = document.getElementById('word-count');
    
    // 搜索选项
    const wordMatchCheckbox = document.getElementById('word-match');
    const hanziMatchCheckbox = document.getElementById('hanzi-match');
    const definitionMatchCheckbox = document.getElementById('definition-match');
    const exampleMatchCheckbox = document.getElementById('example-match');
    
    let dictionary = [];
    
    // 加载词典数据
    const loadDictionary = async () => {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('无便加载辞典数据');
            }
            dictionary = await response.json();
            wordCountElement.textContent = dictionary.length;
            
            // 初始显示提示
            displayResults([], '');
        } catch (error) {
            resultsList.innerHTML = `
                <div class="no-results">
                    ⚠️
                    <p>无便加载辞典数据</p>
                    <p>${error.message}</p>
                </div>
            `;
            console.error('加载辞典数据失败:', error);
        }
    };
    
    // 高亮匹配文本的函数
    const highlightMatch = (text, query, isCaseSensitive) => {
        if (!query || !text) return text;
        
        const flags = isCaseSensitive ? 'g' : 'gi';
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
        
        return text.replace(regex, match => 
            `<span class="match-highlight">${match}</span>`
        );
    };
    
    // 搜索功能 - 支持任意位置匹配
    const search = (query) => {
        query = query.trim();
        
        if (!query) {
            return [];
        }
        
        const results = [];
        
        dictionary.forEach(entry => {
            let matchType = null;
            
            // 检查单词匹配
            if (wordMatchCheckbox.checked && entry.word && 
                entry.word.toLowerCase().includes(query.toLowerCase())) {
                matchType = 'word';
            }
            
            // 检查汉字匹配
            if (!matchType && hanziMatchCheckbox.checked && entry.hanzi && 
                entry.hanzi.includes(query)) {
                matchType = 'hanzi';
            }
            
            // 检查释义匹配
            if (!matchType && definitionMatchCheckbox.checked && entry.definition) {
                const definitionMatch = entry.definition.some(def => 
                    def.toLowerCase().includes(query.toLowerCase()));
                
                if (definitionMatch) {
                    matchType = 'definition';
                }
            }

            if (!matchType && definitionMatchCheckbox.checked && ((entry.english && 
                entry.english.toLowerCase().includes(query.toLowerCase()))||
            (entry.francais && 
                entry.francais.toLowerCase().includes(query.toLowerCase()))||
            (entry.thai && 
                entry.thai.toLowerCase().includes(query.toLowerCase()))||
            (entry.tiengviet && 
                entry.tiengviet.toLowerCase().includes(query.toLowerCase()))||
            (entry.melayu && 
                entry.melayu.toLowerCase().includes(query.toLowerCase()))||
            (entry.indonesia && 
                entry.indonesia.toLowerCase().includes(query.toLowerCase()))
            )) {
                matchType = 'definition';
            }
            
            // 检查例句匹配
            if (!matchType && exampleMatchCheckbox.checked && entry.example) {
                const exampleMatch = entry.example.some(def => 
                    def.toLowerCase().includes(query.toLowerCase()));
                
                if (exampleMatch) {
                    matchType = 'example';
                }
            }
            
            // 如果有匹配，添加到结果
            if (matchType) {
                results.push({
                    ...entry,
                    matchType
                });
            }
        });
        
        return results;
    };
    
    // 显示搜索结果
    const displayResults = (results, query = '') => {
        resultsCount.textContent = results.length;
        
        if (results.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    🔍
                    <p>${query ? '揣无的词配会啱' : '准备开始查词'}</p>
                    <p>${query ? '重新拍个词试睇岂有用' : ''}</p>
                </div>
            `;
            return;
        }
        
        let html = '<ul class="word-list">';
        
        results.forEach(result => {
            const wordHighlight = highlightMatch(result.word, query, false);
            const hanziHighlight = highlightMatch(result.hanzi, query, false);
            //条件?值1:值2
            const matchTypeTag = result.matchType === 'word' ? 
                '<span class="match-type-tag word-match">单词匹配</span>' : 
                result.matchType === 'hanzi' ? 
                '<span class="match-type-tag hanzi-match">汉字匹配</span>' : 
                result.matchType === 'definition' ?
                '<span class="match-type-tag definition-match">含义匹配</span>':
                '<span class="match-type-tag example-match">例句匹配</span>';
            
            // 处理释义
            // let definitionHtml = '';
            // if (result.definition && result.definition.length > 0) {
            //     definitionHtml = '<div class="definition-list">';
            //     result.definition.slice(0, 9).forEach(def => {
            //         const defHighlight = highlightMatch(def, query, false);
            //         definitionHtml += `<div class="definition-item">${defHighlight}</div>`;
            //     });
            //     // if (result.definition.length > 2) {
            //     //     definitionHtml += `<div class="definition-item">+${result.definition.length - 2} 更多释义...</div>`;
            //     // }
            //     definitionHtml += '</div>';
            // }
            
            // 处理多语言
            let languagesHtml = '';
            const languages = [
                { key: 'putonghua', label: '普通话' },
                { key: 'english', label: 'English' },
                { key: 'francais', label: 'français' },
                { key: 'thai', label: 'ไทย' },
                { key: 'tiengviet', label: 'Tiếng Việt' },
                { key: 'melayu', label: 'Bahasa Melayu' },
                { key: 'indonesia', label: 'Bahasa Indonesia' }
            ];
            
            languages.forEach(lang => {
                if (result[lang.key]) {
                    const langContent = result[lang.key].length > 100 ? 
                        result[lang.key].substring(0, 100) + '...' : result[lang.key];
                        
                    languagesHtml += `
                        <div class="language-section language-${lang.key}">
                            <div class="language-title">${lang.label}</div>
                            <div class="language-content">${langContent}</div>
                        </div>
                    `;
                }
            });

            // 显示例句
            let exampleHtml = '';
            if (result.example && result.example.length > 0) {
                exampleHtml = '<div class="definition-list language-section">';
                result.example.slice(0, 9).forEach(def => {
                    const defHighlight = highlightMatch(def, query, false);
                    exampleHtml += `<div class="definition-item">${defHighlight}</div>`;
                });
                // if (result.definition.length > 2) {
                //     definitionHtml += `<div class="definition-item">+${result.definition.length - 2} 更多释义...</div>`;
                // }
                exampleHtml += '</div>';
            }
            
            html += `
                <li class="word-item" data-word="${result.word}" data-definition="${result.word}-${result.definition[0].substring(0, 20)}">
                    <div class="word-header">
                        <div class="word-title">
                            <div class="word-text">${wordHighlight}</div>
                            <div class="hanzi">${hanziHighlight}</div>
                        </div>
                        ${matchTypeTag}
                    </div>
                    
                    <div class="meta">
                        ${result.speech ? `<span class="speech">${result.speech}</span>` : ''}
                        ${result.definition ? `<p class="definition">${result.definition[0]}<br>${result.definition[1]}</p>` : ''}
                    </div>
                    
                    ${languagesHtml}

                    ${exampleHtml}
                    
                </li>
            `;
        });
        
        html += '</ul>';
        resultsList.innerHTML = html;
        
        // 添加点击事件：当用户点击含word-item样式的地方，就会顺便索取此处的data-word属性，给到word里
        document.querySelectorAll('.word-item').forEach(item => {
            item.addEventListener('click', () => {
                const word = item.dataset.word;
                const definitionKey = item.dataset.definition;
                showWordDetail(word, definitionKey);
            });
        });
    };
    
    // 显示单词详情。理论上应该先定义后使用，但使用的代码在上面，是异步执行的。
    const showWordDetail = (word, definitionKey) => {
        const entry = dictionary.find(item => item.word === word && 
        `${item.word}-${item.definition[0].substring(0, 20)}` === definitionKey);
        
        if (!entry) return;
        
        document.getElementById('detail-word').textContent = entry.word || '';
        document.getElementById('detail-hanzi').textContent = entry.hanzi || '';
        document.getElementById('detail-speech').textContent = entry.speech || '词性毋知';
        document.getElementById('detail-definition').innerHTML = `<p>${entry.definition[0]}<br>${entry.definition[1]}</p>`;
        
        // 处理释义
        // const definitionsList = document.getElementById('detail-definitions');
        // definitionsList.innerHTML = '';
        
        // if (entry.definition && entry.definition.length > 0) {
        //     entry.definition.forEach(def => {
        //         const li = document.createElement('li');
        //         li.className = 'definition-item-detail';
        //         li.textContent = def;
        //         definitionsList.appendChild(li);
        //     });
        // } else {
        //     const li = document.createElement('li');
        //     li.className = 'definition-item-detail';
        //     li.textContent = '无解释';
        //     definitionsList.appendChild(li);
        // }
        
        // 处理多语言
        const languagesGrid = document.getElementById('detail-languages');
        languagesGrid.innerHTML = '';
        
        const languages = [
            { key: 'putonghua', label: '普通话'},
            { key: 'english', label: 'English' },
            { key: 'francais', label: 'français' },
            { key: 'thai', label: 'ไทย' },
            { key: 'tiengviet', label: 'Tiếng Việt' },
            { key: 'melayu', label: 'Bahasa Melayu' },
            { key: 'indonesia', label: 'Bahasa Indonesia' }
        ];
        
        languages.forEach(lang => {
            if (entry[lang.key]) {
                const card = document.createElement('div');
                card.className = `language-card language-card-${lang.key}`;
                card.innerHTML = `
                    <div class="language-card-title">${lang.label}</div>
                    <div class="language-card-content">${entry[lang.key]}</div>
                `;
                languagesGrid.appendChild(card);
            }
        });
        
        // 处理例句
        const examplesList = document.getElementById('detail-examples');
        examplesList.innerHTML = '';

        if (entry.example && entry.example.length > 0) {
            entry.example.forEach(ex => {
                const li = document.createElement('li');
                li.className = 'example-item';
                li.textContent = ex;
                examplesList.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.className = 'example-item';
            li.textContent = '';
            examplesList.appendChild(li);
        }
        
        // 处理备注
        const noteContent = document.getElementById('note-content');
        if (entry.note) {
            noteContent.textContent = entry.note;
            document.getElementById('detail-note').style.display = 'block';
        } else {
            document.getElementById('detail-note').style.display = 'none';
        }
        
        // 显示详情视图，隐藏列表
        document.querySelector('.result-header').style.display = 'none';
        resultsList.style.display = 'none';
        wordDetail.style.display = 'block';
    };
    
    // 返回列表视图
    backButton.addEventListener('click', () => {
        document.querySelector('.result-header').style.display = 'flex';
        resultsList.style.display = 'block';
        wordDetail.style.display = 'none';
    });
    
    // 搜索事件处理
    const performSearch = () => {
        const query = searchInput.value.trim();
        const results = search(query);
        displayResults(results, query);
    };
    
    // 添加事件监听器
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    
    // 搜索选项变化时重新搜索
    wordMatchCheckbox.addEventListener('change', performSearch);
    hanziMatchCheckbox.addEventListener('change', performSearch);
    definitionMatchCheckbox.addEventListener('change', performSearch);
    exampleMatchCheckbox.addEventListener('change', performSearch);
    
    // 加载词典数据
    await loadDictionary();
});

// 添加点击交互菜单
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});
