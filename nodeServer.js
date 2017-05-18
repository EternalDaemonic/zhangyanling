/**
 * Created by qingyun on 17/4/24.
 */
var http = require("http");
var url = require("url");
var qs = require("querystring");

http.createServer(function (req , res) {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    //对请求对象的url进行解析 , 拿到?后面的查询参数 字符串
    var query = url.parse(req.url).query;
    var queryObj = qs.parse(query);
    //接收数据的变量
    var result = "";
    http.get(queryObj.myUrl , function (request) {
       request.on("data" , function (data) {
            result += data;
       }) ;
        request.on("end" , function () {
            if (queryObj.callback){
                var fn = queryObj.callback;
                var resultStr = JSON.stringify(result);
                var str = fn + "(" +  resultStr + ")";
                 res.end(str);
            }else {
                res.end(result);
            }

        });
        request.on("error" , function (err) {
            res.end(err);
        })
    });


})
    .listen("3000" , function () {
    console.log("正在监听3000...")
});