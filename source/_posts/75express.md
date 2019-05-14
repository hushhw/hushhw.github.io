---
title: Express 学习笔记
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
tags:
  - express
  - node.js
categories: learn
abbrlink: 1f901b6d
date: 2019-03-12 16:13:07
description: '本着所学必有所记的原则，学习一样新东西之后必须要做好笔记，即使现在时间似乎有点赶，但还是记录下来我的学习笔记，不然过不了多久就忘了。<br>Express 是基于 Node.js 平台，快速、开放、极简的 web 开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。'
---




> 本着所学必有所记的原则，学习一样新东西之后必须要做好笔记，即使现在时间似乎有点赶，但还是记录下来我的学习笔记，不然过不了多久就忘了。
>
> Express 是这次我毕设要用到的后台，第一次用到 Express，所以笔记内容可能有些许纰漏，或不完整的地方，网上相关资料很多，官网也有非常清晰的文档，可以参看更加有价值的资料。



## Express 简介

Express 是基于 Node.js 平台，快速、开放、极简的 web 开发框架，它提供一系列强大的特性，帮助你创建各种 Web 和移动设备应用。

Express 不对 Node.js 已有的特性进行二次抽象，我们只是在它之上扩展了 Web 应用所需的基本功能。

**Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。**

​        

## 入门

### 安装及 Hello World

假设你已经装好了 `Node.js`，你就可以开始下面这些操作了：

```
# 工作目录
$ mkdir myapp
$ cd myapp

# 通过 npm init 命令为你的应用创建一个 package.json 文件
$ npm init
```

执行 `npm init` 后会有很多信息需要填写，一般都是默认回车即可（默认启动文件为`index.js`），但是想要一步完成可以执行 `npm init -y` 。

这时候你得文件夹中创建好了一个 `package.json` 文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。

需要注意的点：如果 npm 使用起来非常慢，建议使用`cnpm`，可以自行百度安装。

现在在`myapp`目录中安装Express并将其保存在依赖项列表中，例如：

```
$ npm install express --save
```

`--save`：安装模块时，如果指定了 --save 参数，那么此模块将被添加到 package.json 文件中 dependencies 依赖列表中。 然后通过 npm install 命令即可自动安装依赖列表中所列出的所有模块。如果只是临时安装，不想将它添加到依赖列表中，只需略去 --save 参数即可。

再文件夹中新建 `app.js` 作为入口，故前面默认执行 npm init 后启动文件 `index.js` 需要我们修改一下，打开 package.json 文件，修改 `main: app.js`。

在 `app.js`中写入：

```js
const express = require('express');

let app = express();

app.get('/',function (req,res) {
    res.send('hello world');
});

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`app listening at port: ${port}`);
});
```

应用程序启动服务器并监听端口`3000`上的连接，对于根URL（`/`）或**路由**的请求，应用程序以**“Hello World!”**响应，对于其他所有路径，它将以 **404 Not Found** 响应，使用 `127.0.0.1:3000` 即可访问。

> 还可以使用『Express应用生成器』来创建，但是对于初学者我来说有种一步登天的感觉，我入门是跟着视频教程『[Node js Web Apps with Express](https://www.bilibili.com/video/av9570082/)』走的，所以还是一步一步往上爬的好。

​        

### 基本路由

路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。

路由（Routing）是由一个 URI（路径）和一个特定的 HTTP 方法（get、post、put、delete 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

路由定义采用以下结构：

```
app.METHOD(PATH, HANDLER)
```

* `app`是express的一个实例。
* `METHOD`是某个的HTTP请求方法，Express 定义了很多 HTTP 请求对应的路由方法，如 get, post, put等。
* `PATH`是服务器上的路径。
* `HANDLER`是匹配到路由时执行的函数。



以下示例说明了定义简单路由。

在主页上响应**Hello World!**：

```
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

响应应用程序主页的根路由（`/`）上的`POST`请求：

```
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```

响应对`/user`路由的`PUT`请求：

```
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```

响应对`/user`路由的`DELETE`请求：

```
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

​         

   

