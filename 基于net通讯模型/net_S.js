//以下是基于node.js中net模块建立的C/S架构模型中的S
//net.server

//获取net模块（node 自带）
var net = require("net");

//通过调用net类中createServer()API创建一个Server用来进行监听端口，当有访问连接如来是发出回调函数
//详细参考node文档net.server类  主要针对服务器
//回调函数参数c_sock就是C/S配对的sock，通过该sock进行数据链接操作
//详细参数node文档net.socket类  主要针对客户端
var server = net.createServer(function(c_sock){
    console.log("client came!" + c_sock.remoteAddress,c_sock.remotePort);
    //可设定转换接收的数据的格式
    c_sock.setEncoding("utf8");//返回s_cock本身
   
    //sock.on监听client
    c_sock.on("close",function(){
        console.log("client out!");
    })
    // data 默认是Buffer对象，如果你强制设置为utf8,那么底层会先转换成utf8的字符串，传给你
    c_sock.on("data",function(data){
        console.log(data);
        c_sock.write("server:I get u data!");
        c_sock.end();
    });

})

//编写代码 确定服务器监听哪一个端口上
server.listen({
    port:6080,
    host:"127.0.0.1",
})

//当开始监听的时候就会调用这个回掉函数
server.on("listening",function(){
    console.log("server listening");
})

//服务器状态监听
server.on("close",function(){
    //c_sock.write("server out");
    console.log("server out");
})

server.on("error",function(err){
    console.log(err);
})




// 停止node对server的监听事件处理，那么node就没有其他的事件要处理，所以就退出了。
// server.unref(); // 取消node,对server的事件的监听；
// server.close(); // 主动的掉这个server.close才会触发这个net.Server的close事件