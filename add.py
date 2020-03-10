def add_fun(keyword):
    """

    :param keyword: 网页搜索的问题
    :return: status 'OK'
    """

    path = 'D:/PycharmWorkspace/search2/static/ques.txt'  # 问题语料库路径

    data = keyword

    file_obj = open(path, 'a', encoding='utf-8')

    file_obj.write(data + '\n')

    file_obj.close()

    return 'OK'
