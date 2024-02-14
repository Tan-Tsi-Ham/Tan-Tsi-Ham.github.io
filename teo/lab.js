//尽量尝试在新页面打开
//字和词或许或许可以用不同的数组，但是在同一个函数search里先后执行系统的代码（复制粘贴）
//后期可能可能可能面临数据溢出的问题。
var data=[{hanzi:'亚',name:'iahAsia'},{hanzi:'阿',name:'eAt'},{hanzi:'鸦',name:'iaCraw'}];

function search()
{
    var searchTerm=document.getElementById('searchInput').value;
    var searchResults=document.getElementById('searchResults');

    //清楚上次搜索结果
    searchResults.innerHTML='';

    //遍历仓库
    var tdArray=[];

    data.forEach
    (
        function(item)
        {
            if(item.hanzi.includes(searchTerm))
            {
                var resultElement=document.createElement('a');
                resultElement.textContent=item.hanzi;
                resultElement.href='dict/romaji/a/'+item.name+'.html';

                tdArray.push(resultElement);

                //searchResults.appendChild(resultElement);
            }//
        }
    );
    //每个元素都匹配完成之后，才生成表格
    var table=document.createElement('table');

    var thead=document.createElement('thead');
    var tr=document.createElement('tr');
    var th1=document.createElement('th');
    th1.textContent='罗马字';
    var th2=document.createElement('th');
    th2.textContent='汉字';
    var th3=document.createElement('th');
    th3.textContent='漢字';
    var th4=document.createElement('th');
    th4.textContent='含义';
    var th5=document.createElement('th');
    th5.textContent='备注';
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    thead.appendChild(tr);
    table.appendChild(thead);

    var tbody=document.createElement('tbody');
    for(var i=0;i<tdArray.length;i++)
    {
        var tr=document.createElement('tr');
        var td1=document.createElement('td');
        var td2=document.createElement('td');
        // td2.textContent=tdArray[i].textContent;
        td2.appendChild(tdArray[i]);
        var td3=document.createElement('td');
        var td4=document.createElement('td');
        var td5=document.createElement('td');

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    searchResults.appendChild(table);
    tdArray=[];
}