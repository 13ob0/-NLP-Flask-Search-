# -*- coding: utf-8 -*-
from datetime import timedelta


from flask import Flask, render_template, json, request
from flask_bootstrap import Bootstrap

from flask import jsonify

from add import add_fun
from association import association_fun
from mostview import mostview_fun
from search import search_fun

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
bootstrap = Bootstrap(app)


@app.route('/')
def hello_world():
    return render_template("search.html")


@app.route('/search', methods=['GET', 'POST'])
def search():
    data = json.loads(request.form.get('data'))
    keyword = data['value']

    resources_item_list = search_fun(keyword)

    return jsonify(resources_item_list)


@app.route('/add', methods=['GET', 'POST'])
def add():
    data = json.loads(request.form.get('data'))
    keyword = data['value']

    status = add_fun(keyword)

    return jsonify(status)


@app.route('/most', methods=['GET', 'POST'])
def most():

    sen_freq_item_list = mostview_fun()

    return jsonify(sen_freq_item_list)

@app.route('/association', methods=['GET', 'POST'])
def association():
    data = json.loads(request.form.get('data'))
    que = data['term']
    print(que)

    associative_ques_item_list = association_fun(que)

    return jsonify(associative_ques_item_list)

if __name__ == '__main__':
    app.run()
