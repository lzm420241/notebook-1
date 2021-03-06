## Fetch API

_上次修改时间: 2016-07-21_

---

## 目录：

- [基本用法](#基本用法)
- [Headers 类](#headers-类)
  - [Headers 实例的方法](#headers-实例的方法)
- [Request 类](#request-类)
  - [Request 实例的属性](#request-实例的属性)
- [Response 类](#response-类)
  - [Response 实例属性](#response-实例属性)
- [总结](#总结)

---


Fetch API 包含一组类和方法，用来简化 HTTP 请求。其中包含以下方法和类：

- fetch 方法：用于发起 HTTP 请求
- Request 类：用来描述请求
- Response 类：用来表示响应
- Headers 类：用来表示 HTTP 头部信息。

## 基本用法

fetch 接受一个 url 作为参数，发起 GET 请求，返回 Promise ,请求成功后将返回结果封装为一个 Response 对象，该对象上具有一些方法（比如 json 方法），调用 json 方法后同样返回一个 Promise 对象，并用解析 json 字符串得到的对象来 resolve。

``` javascript
fetch('https://api.github.com/repos/facebook/react').then(function(res){
    return res.json();
}).then(function(data){
    console.log(data)
});
```

fetch 方法有两种调用方法，第一个参数可以是一个 Request 对象，也可以是一个简单的 url，第二个参数是可选参数，包含一些配置信息。

```
Promise fetch(String url [, Object options]);
Promise fetch(Request req [, Object options]);
```

可选的配置信息可以一个简单对象，可以包含下列字段：

- method: 请求的方法, 比如： GET, POST
- headers：请求头部信息，可以是一个 Headers 对象的实例，也可以是一个简单对象
- body: 任何希望发送的信息，可以是 Blob, BufferSource, FormData, URLSearchParams, 或者 USVString。需要注意的是 GET 和 HEAD 方法不能包含 body。
- mode：请求的模式，可以取这几个值：cors, no-cors, same-origin, navigate
  - same-origin：只允许同源的请求，否则直接报错
  - cors：允许跨域，但也要要求响应中 Access-Control-Allow-Origin 这样的头部信息表示允许跨域，响应中只有部分头部信息可以读取，但响应内容可以不受限地读取。
  - no-cors：只允许使用 HEAD、 GET 和 POST 方法，且 JavaScript 不允许访问 response 中的内容。ServiceWorkers 拦截了这些请求，它不能随意添加或者改写任何headers。
  - navigate：用于支持页面导航。通常使用不到。
- credentials：表示是否发送 cookie，有三个可选值 omit, same-origin, include
  - omit：不发生 cookie
  - same-origin： 仅在同源时发生 cookie
  - include：发送 cookie
- cache：表示处理缓存的策略，关于此可以参考 [https://fetch.spec.whatwg.org](https://fetch.spec.whatwg.org/#concept-request-cache-mode)
- redirect：发生重定向时候的策略。有以下可选值：
  - follow：跟随
  - error：发生错误
  - manual：需要用户手动跟随
- referrer： 一个字符串，可以是 no-referrer, client, 或者是一个 URL。默认值是 client。
- integrity：包含一个用于验证子资源完整性的字符串。关于此，可以参看 [Subresource Integrity 介绍](https://imququ.com/post/subresource-integrity.html)

该函数返回一个 Promise 对象，若请求成功会用 Response 的实例作为参数调用 resolve ，若请求失败会用一个错误对象来调用 reject。

## Headers 类

Headers 类用来表示 HTTP 的头部信息，其构造函数可以接受一个表示 HTTP 头信息的对象，也可以接受一个 Headers 类的实例作为对象：

``` javascript
var header1 = new Headers({
  'Content-Type': 'image/jpeg',
  'Accept-Charset': 'utf-8'
});

var header2 = new Headers(header1);
```

### Headers 实例的方法

- append

对一个字段追加信息，如果该字段不存在，就创建一个。

``` javascript
var header = new Headers();
header.append('Accept-Encoding', 'deflate');
header.append('Accept-Encoding', 'gzip');
// Accept-Encoding: ['deflate', 'gzip']
```

- delete

删除某个字段

- get

获得某个字段的第一个值

``` javascript
var header = new Headers();
header.append('Accept-Encoding', 'deflate');
header.append('Accept-Encoding', 'gzip');

header.get('Accept-Encoding'); //=> 'deflate'
```

- getAll

获得某个字段所有的值

``` javascript
var header = new Headers();
header.append('Accept-Encoding', 'deflate');
header.append('Accept-Encoding', 'gzip');

header.getAll('Accept-Encoding'); //=> ['deflate', 'gzip']
```

- has

判断是否存在某个字段

- set

设置一个字段，如果该字段已经存在，那么会覆盖之前的。

- forEach

遍历所有的字段，接受一个回调函数，和可选的第二个参数。可选的第二个参数地值作为回调函数的 this 值。

``` javascript
var header = new Headers();
header.append('Accept-Encoding', 'deflate');

header.forEach(function(value, name, header){
  //...
},this);
```

## Request 类

Request 对象用于描述请求内容。构造函数接受的参数和 fetch 函数的参数形式一样，实际上 fetch 方法会使用传入的参数构造出一个 Request 对象来。

下面例子从 github 抓取到 react 的 star 数并打印出来。

``` javascript
var req = new Request('https://api.github.com/repos/facebook/react',{
  method:'GET'
});

fetch(req).then(function(res){
  return res.json()
}).then(function(data){
  console.log(data.stargazers_count)
});
```

### Request 实例的属性

_以下属性均为只读属性。这些属性的意义均在上面介绍 fetch 的参数的时候有过说明。_
- method
- url
- headers
- referrer
- referrerPolicy：处理来源信息的策略，关于此可以参见[Referrer Policy](https://w3c.github.io/webappsec-referrer-policy/)
- mode
- credentials
- redirect
- integrity
- cache

## Response 类

Response 用来表示 HTTP 请求的响应。其构造函数形式如下：

``` javascript
var res = new Response(body, init);
```

其中 body 可以是：
- Blob
- BufferSource
- FormData
- URLSearchParams
- USVString

init 是一个对象，其中包括以下字段：
- status：响应的状态码，比如 200，404
- statusText：状态信息，比如 OK
- headers: 头部信息，可以是一个对象，也可以是一个 Headers 实例

### Response 实例属性

_以下属性均为只读属性_
- bodyUsed：用于表示响应内容是否有被使用过
- headers：头部信息
- ok：表明请求是否成功，当响应的状态码是 200~299 时，该值为 true
- status：状态码
- statusText：状态信息
- type：表明了响应的类型，可能是下面几种值：
  - basic： 同源
  - cors：跨域
  - error：出错
  - opaque：Request 的 mode 设置为 “no-cors” 的响应
- url：响应的地址

#### Response 实例方法

- clone：复制一个响应对象

要想从 Response 的实例中拿到最终的数据需要调用下面这些方法，这些方法都返回一个 Promise 并且使用对应的数据类型来 resolve。

- arrayBuffer：把响应数据转化为 arrayBuffer 来 resolve
- blob：把响应数据转换为 Blob 来 resolve
- formData：把响应数据转化为 formData 来 resolve
- json：把响应数据解析为对象后 resolve
- text：把响应数据当做字符串来调用 resolve

## 总结

最后在把上面使用例子进行一个细致的说明：

``` javascript
// 构造出 Request 对象
var req = new Request('https://api.github.com/repos/facebook/react',{
  method:'GET'
});

// 发起请求，fetch 方法返回一个 Promise 对象
fetch(req).then(function(res){
  // 得到了 response，这里调用 response 的 json 方法
  // 该方法同样返回一个 Promise
  return res.json();
}).then(function(data){
  // 得到解析后的对象
  console.log(data.stargazers_count)
});
```

可以看出 fetch 方法使用起来比 XMLHttpRequest 要方便的多，关于其兼容性，可以参考 [这里](http://caniuse.com/#search=Fetch)，对于不兼容的浏览器，你可以使用 [polyfill](https://github.com/github/fetch)。
