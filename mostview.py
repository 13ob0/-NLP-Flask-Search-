

def mostview_fun():
    """

    :return: 最常搜索问题
    """
    path = './static/ques.txt'  # 问题语料库路径

    ques = []

    f = open(path, encoding="utf8")

    for line in f.readlines():
        line = line.strip('\n')
        ques.append(line)

    sen_freq = {}
    count = 0

    for n in ques:
        if n in sen_freq:
            count = sen_freq[str(n)]
            sen_freq[str(n)] = count + 1
        else:
            sen_freq[str(n)] = 1

    sen_freq_list = []

    for key, value in sen_freq.items():
        sen_freq_list.append(key)
        sen_freq_list.append(value)

    sen_freq_item = ['question', 'freq']
    sen_freq_item_list = []

    for n in range(0, len(sen_freq_list), 2):
        sen_freq_item_list.append(dict(zip(sen_freq_item, sen_freq_list[n:n + 2])))

    return sen_freq_item_list