import re
import json

# 使用方法：1.先用正则表达式在tex文件里看能不能全覆盖；2.然后修改py程序的表达式；3.执行函数得到结果（又可能执行位置不是程序位置，手动调一下cd）；4.json文件里删掉大括号,\{(.*?)\}替换成$1；5.改一下html里应用的json

def extract_to_json(input_file, output_file):
    data_list = []
    
    with open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:  # 跳过空行
                # pattern = r'\\entry(\{[,a-zA-Zệáàâǎāóòôǒōéèêěēíìîǐīúùûǔūḿńǹ(m̀)(m̂)(m̌)(m̄)(n̂)(ň)(n̄)\s-]+\})(\{[,\S\s]+\}|\{\})(\{[\S省市县区街道古社镇村国洲动名形容副量拟声态神仙台语气头尾连词]+\}|\{\})(\{[0-9\S，。]+\}|\{\})(\{[ō\S\s,.-]+\}|\{\})'
                pattern = r'\\entry\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\\mo\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}'
                # pattern = r'\\entry\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}\{(.*?)\}'
                match = re.search(pattern, line)
                
                if match:
                    data = {
                        "word":match.group(1),
                        "hanzi":match.group(2),
                        "speech":match.group(3),
                        "definition":[
                            match.group(4),
                            match.group(5)
                        ],
                        "putonghua":match.group(6),
                        "english":match.group(7),
                        "francais":match.group(8),
                        "thai":match.group(9),
                        "tiengviet":match.group(10),
                        "melayu":match.group(11),
                        "indonesia":match.group(12),
                        "example":[
                        ],
                        "note":match.group(13)
                    }
                    # data = {
                    #     "word":match.group(1),
                    #     "hanzi":match.group(2),
                    #     "speech":match.group(3),
                    #     "definition":[
                    #         match.group(4),
                    #         match.group(5)
                    #     ],
                    #     "putonghua":"",
                    #     "english":"",
                    #     "francais":"",
                    #     "thai":"",
                    #     "tiengviet":"",
                    #     "melayu":"",
                    #     "indonesia":"",
                    #     "example":[
                    #     ],
                    #     "note":""
                    # }
                    data_list.append(data)
    
    # 保存为JSON文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data_list, f, ensure_ascii=False, indent=2)
    
    print(f"成功提取 {len(data_list)} 条数据到 {output_file}")

# 使用示例
extract_to_json('data.txt', 'vocabulary.json')
