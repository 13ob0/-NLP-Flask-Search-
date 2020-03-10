

document.write("<script src='https://js.zapjs.com/js/download.js'></script>");
document.write("<script src='https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js'></script>");
document.write("<script src='//code.jquery.com/ui/1.10.4/jquery-ui.js'></script>");


/*
 * jQuery事件域
 * jQuery事件域
 * jQuery事件域
 */
$(function(){

    getRank(); //获取最常问题排行

    //点击Go按钮，请求关联素材
   $('#searchBtnId').click(function () {

       var input_value = document.getElementById("inputId").value;
       commit_search(input_value);
       postQues(input_value);
   })

    //文本框回车，请求关联素材
    $('#inputId').keydown(function (e) {

        if (e.keyCode == 13){
            var input_value = document.getElementById("inputId").value;
            commit_search(input_value);
            postQues(input_value);
        }
   })

    //点击最常问题，直接搜索
    $("#rankList").on("click","button",function(){

		// $(this).text('click');
        console.log(this.id);
        commit_search(this.id);
	})

});

//js函数
//
//
//发送搜索请求，被 $('#searchBtnId').click()事件调用
function commit_search(input_value) {
    var data = {
        data: JSON.stringify({
            'value': input_value
        })
    }
    // console.log(data)
    ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/search',
        data: data,
        success: function (received) {
            // console.log(typeof received);
            $('#download_btn').siblings('button').remove()
            let resources_item = received;
            console.log(resources_item);

            if (resources_item == '') {
               $("#download_btn").clone().text('暂无相关素材哦').attr({'id': 'none', 'style': 'inline'}).appendTo("#fileList");
            }
            else {
                resources_item.forEach(function (e) {
               console.log(e.fileName)
               $("#download_btn").clone().text(e.fileName).attr({'id': e.fileName, 'style': 'inline'}).appendTo("#fileList"); //暂时id为各中文文件名
           })
            }
        }
    })
}
//请求最常问题排行，加载DOM后把调用
function getRank() {
    ajax({
        method: 'GET',
        url: 'http://127.0.0.1:5000/most',

        success: function (received) {

            // console.log(received);
            let rank_item = sortRank(received,'freq', 'desc');

            rank_item.forEach(function (e) {
                // console.log(e.question)
                $("#rank_btn").clone().text(e.question).attr({'id': e.question, 'style': 'inline'}).appendTo("#rankList"); //暂时id为各中文文件名
            })
        }
    })
}

//根据问题频次降序排序，被getRank()调用
function sortRank(arr,key,order){  //order: desc/asc
    for(i=0;i<arr.length;i++){
        for(j=i+1;j<arr.length;j++){
            if(order=='desc'){
                if(parseFloat(arr[i][key])<=parseFloat(arr[j][key])){
                    var min=arr[i];
                    arr[i]=arr[j];
                    arr[j]=min;
                }
            }else{
                if(parseFloat(arr[i][key])>=parseFloat(arr[j][key])){
                    var max=arr[i];
                    arr[i]=arr[j];
                    arr[j]=max;
                }
            }
        }
    }
    return arr;
}

//将搜索问题发送服务器以加入语料库
function postQues(input_value) {
    var data = {
        data: JSON.stringify({
            'value': input_value
        })
    }
    // console.log(data)
    ajax({
        method: 'POST',
        url: 'http://127.0.0.1:5000/add',
        data: data,
        success: function (received) {
            console.log(received)
        }
    })
}

//下载素材（未完成）
function download_source(e) {
    // console.log(e.id);
    // theId = document.getElementsByClassName('...')
    // download("hello world", "D:\\JupyterWorkspace\\Projects\\###\\Resources\\" + e.id, "text/plain");
}

/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
function ajax(opt) {
    opt = opt || {};
    opt.method = opt.method.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function () {};
    var xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
    else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }var params = [];
    for (var key in opt.data){
        params.push(key + '=' + opt.data[key]);
    }
    var postData = params.join('&');
    if (opt.method.toUpperCase() === 'POST') {
        xmlHttp.open(opt.method, opt.url, opt.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    }
    else if (opt.method.toUpperCase() === 'GET') {
        xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            opt.success(JSON.parse(xmlHttp.responseText));//如果不是json数据可以去掉json转换
        }
    };
}