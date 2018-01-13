//基于node第三方模块ws的C/S架构底层TCP通讯模型，解决了TCP的粘包问题

var ws = require("ws");

//启动基于ws(websocket)的服务器监听，监听接入的客户端主要使用server.on()即可
var server = new ws.Server({
    host:"127.0.0.1",
    port:6080,
})

//服务器进行监听客户端连接进来connecttion 
server.on("connection",function(c_sock){
    console.log("client came!");
    //客户端消息
    //客户端退出
    c_sock.on("close",function(){
        console.log("client out");
    });
    //客户端连接出错
    c_sock.on("error",function(err){
        console.log("client connect error: "+err);
    });
    //接收来自客户端的数据
    c_sock.on("message",function(data){
        console.log("sever got: " + data);
        //回复一个数据给客户端
        c_sock.send("I got it, bye");
        c_sock.end();
    });

});

//服务器监听出错
server.on("error",function(err){
    console.log("server err"+err);
});
//headers事件, 回给客户端的字符
server.on("headers",function(data){
    console.log(data)
});




