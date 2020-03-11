# -NLP-Flask-Search-

## 技术栈

* Flask, numpy, jieba, synonyms
* html, js, css, bootstrap, jquery

## 程序结构

* 基于Flask的后端服务器
* 基于html, js, css, bootstrap, jquery的前端网页

### 后端服务器

* app: Flask主程序
* search: 接收前端参数，使用jieba分词并使用synonyms在素材库里搜索近似素材，并发送至前端
* add: 接收前端参数，将语料加入语料库中
* most: 对语料库中的语料计数，并递减排列，发送至前端
* association：接收前端数据，计算接收语料与语料库中每条语料的词向量与余弦相似度，发送一定相似度的语料至前端
* sen_vector: 基于jieba和numpy的词向量和余弦相似度算法实现