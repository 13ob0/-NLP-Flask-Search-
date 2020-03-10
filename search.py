import os
import synonyms
import jieba

def search_fun(keyword):
    """

    :param keyword: 网页搜索的问题
    :return: 素材文件名
    """
    resources_list = []

    def retrieval(file_dir):
        for filenames in os.walk(file_dir):
            resources_list.append(filenames[2])

    resources_dir = './static/images/' #素材库路径
    retrieval(resources_dir)

    seg_list = jieba.lcut_for_search(keyword)  # 搜索引擎模式

    synonyms_list = []

    for word in seg_list:
        if synonyms.nearby(word)[0]:
            synonyms_list.append(synonyms.nearby(word)[0])

    resources = []

    for i in synonyms_list:
        for j in i:
            for x in resources_list[0]:
                if j in x:
                    if x not in resources:  # 去重
                        resources.append(x)

    print(resources)

    resources_item = ['fileName']
    resources_item_list = []

    for n in range(0, len(resources)):
        resources_item_list.append(dict(zip(resources_item, resources[n:n + 1])))

    print(resources_item_list)

    return resources_item_list