from sen_vector import get_word_vector, cos_dist


def association_fun(que):
    """

    :param que: 网页搜索框已输入的文字
    :return: 问题语料库中相关的问题
    """
    path = './static/ques.txt'  # 问题语料库路径

    ques = []

    f = open(path, encoding="utf8")

    for line in f.readlines():
        line = line.strip('\n')
        ques.append(line)

    associative_ques = []

    ques_less = []

    for n in ques:
        if n not in ques_less:
            ques_less.append(n)

    for n in ques_less:  # 问题去重
        vec1, vec2 = get_word_vector(que, n)
        dist = cos_dist(vec1, vec2)

        if dist >= 0.3:
            associative_ques.append(n)

    print(associative_ques)

    associative_ques_item = ['question']
    associative_ques_item_list = []

    for n in range(0, len(associative_ques)):
        associative_ques_item_list.append(dict(zip(associative_ques_item, associative_ques[n:n + 1])))

    print(associative_ques_item_list)

    return associative_ques_item_list