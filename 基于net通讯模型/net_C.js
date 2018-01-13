//以下是基于node.js中net模块建立的C/S架构模型中的C
//net.socket

var net = require("net");

//链接到IP 127.0.0.1/6080 并创建sock，连接成功后调用回调
var sock = net.connect({
    port:6080,
    host:"127.0.0.1",
},function(){
    console.log("connect to server successly!");
    //设置传输格式
    sock.setEncoding("utf8");

    sock.on("data",function(data){
        console.log(data);
    });
    sock.on("error",function(err){
        console.log(err);
    });
    sock.on("close",function(){
        console.log("client out");
    });
    sock.on("end",function(){
        console.log("server shutdowm");
    });

    //sock.write 发送数据至服务器
    sock.write("hi i am C");

   // sock.end();
})
