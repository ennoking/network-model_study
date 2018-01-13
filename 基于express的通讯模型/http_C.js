//基于express框架第三方模块的应用层通讯

var http = require("http");

/*链接状态码说明
	[100] = "Continue",
		[101] = "Switching Protocols",
		[200] = "OK",
		[201] = "Created",
		[202] = "Accepted",
		[203] = "Non-Authoritative Information",
		[204] = "No Content",
		[205] = "Reset Content",
		[206] = "Partial Content",
		[300] = "Multiple Choices",
		[301] = "Moved Permanently",
		[302] = "Found",
		[303] = "See Other",
		[304] = "Not Modified",
		[305] = "Use Proxy",
		[307] = "Temporary Redirect",
		[400] = "Bad Request",
		[401] = "Unauthorized",
		[402] = "Payment Required",
		[403] = "Forbidden",
		[404] = "Not Found",
		[405] = "Method Not Allowed",
		[406] = "Not Acceptable",
		[407] = "Proxy Authentication Required",
		[408] = "Request Time-out",
		[409] = "Conflict",
		[410] = "Gone",
		[411] = "Length Required",
		[412] = "Precondition Failed",
		[413] = "Request Entity Too Large",
		[414] = "Request-URI Too Large",
		[415] = "Unsupported Media Type",
		[416] = "Requested range not satisfiable",
		[417] = "Expectation Failed",
		[500] = "Internal Server Error",
		[501] = "Not Implemented",
		[502] = "Bad Gateway",
		[503] = "Service Unavailable",
		[504] = "Gateway Time-out",
		[505] = "HTTP Version not supported",
}
*/

//get 发送请求至服务器
// 编写求情API  get请求的参数，是带在URL的地址上面的
function http_get(ip,port,url,params,callback){
    //step 1 创建一个http.ClientRequest
    var options = {
        host:ip,
        port:port,
        path:url + "?" + params, //请求参数
        method:"GET"
    };
    //当有请求返回的时候，参数就会被传递为http.IncomingMessage
    var req = http.request(options,function(incomin_msg){
        console.log("respones status " + incomin_msg.statusCode);//输出状体码

        //监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
        incomin_msg.on("data", function(data) {
			if (incomin_msg.statusCode === 200) {
				callback(true, data);
			}
		});
    })
    
    //调用end()后该请求即被发送
    req.end(); 
}
/*
http_get("127.0.0.1",6080,"/login","enno=100",function(is_ok,data){
    if (is_ok) {
		console.log(data.toString());
	}
})
*/

//post上传数据至服务器
//post可以带body数据传到服务器  
function http_post(ip, port, url, params, body, callback) {
	// step1,创建一个 http.ClientRequest
	var options = {
		host: "127.0.0.1",
		port: port,
		path: url + "?" + params,
		method: "POST",

		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": body.length
		}
	};

	var req = http.request(options, function(incoming_msg) {
		console.log("respones status " + incoming_msg.statusCode);

		// 监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
		incoming_msg.on("data", function(data) {
			if (incoming_msg.statusCode === 200) {
				callback(true, data);
			}
		});
		 
	});

	// step2 写入body数据
	req.write(body);

	// 发送请求
	req.end();
}

http_post("127.0.0.1",6080,"/upload","filename=my_file.txt","Hello http Post",function(is_ok,data){
    if (is_ok) {
		console.log("upload_success",data.toString());
	}
})

