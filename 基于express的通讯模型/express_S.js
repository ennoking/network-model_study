//基于express框架第三方模块的应用层通讯
var express = require("express");
var path = require("path");

//创建http服务器
var app = express();
//配置我们的网址根目录，静态网页
//浏览器直接访问IP地址+port+文件名字就可打开
app.use(express.static(path.join(process.cwd(),"www_root")));//IP地址
app.listen(6080);//监听端口

//设置跨域访问，写死即可(允许从当前服务期跳到不同IP的服务期)
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//respones回复操作的对象
//request 请求的情况

//get  响应client 
app.get("/login",function(request,respones){
    console.log("/login coming...");
    //服务器收到请求后，获取用户端get操作参数
    console.log(request.query);

    //服务器回信息给客户端
    respones.send("Success");
})

//获取client上传的数据
app.post("/upload",function(request,respones){
    console.log("uplond coming");
    //获得url上传来的参数
    console.log(request.query);

    request.on("data",function(data){
        console.log(data.toString());
        respones.send("UPload ok");
    })

})
