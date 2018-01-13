//基于node第三方模块ws的C/S架构底层TCP通讯模型，解决了TCP的粘包问题
//npm 安装ws模块
var ws = require("ws");
//url：ws：服务器IP及端口
//使用ws模块创建客户端socket，然后用该socket连接到服务器的socket
var sock = new ws("ws://127.0.0.1:6080");

//客户端开始监听
//监听是否连接成功事件
sock.on("open",function(){
    console.log("connect to server successly!");
    sock.send("hello1")
    sock.send("hello2")
    sock.send("hello3")
    sock.send("hello4")

});
//客户端连接出错
sock.on("error", function(err) {
	console.log("error: ", err);
});
//服务器关闭
sock.on("close", function() {
	console.log("close");
});
//接收来自服务期的消息
sock.on("message", function(data) {
	console.log(data);
});