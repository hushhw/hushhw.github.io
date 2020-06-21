---
title: HTTPS协议 & TLS协议
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
date: 2019-10-11 19:22:47
tags: 
  - TLS
  - Encrypted Traffic Analytics
categories:
  - 笔记整理
  - 流量分析
description: '为了解决 HTTP 存在的这些漏洞使数据传输更加安全，引入了另一种协议 HTTPS，HTTPS 协议是在 HTTP 协议的基础上加入了加密处理和认证机制和完整性保护，只是 HTTP 通信接口部分用 SSL/TLS 协议代替而已，简单讲就是 HTTP 的安全版，通常 HTTP 直接和 TCP 通信，当使用 SSL 时，就演变成先与 SSL 通信，再由 SSL 和 TCP 通信。'
---



## 1. HTTPS协议

### 1.1 HTTP 和 HTTPS 协议的区别

HTTP 协议存在一定的缺点：

* 通信使用明文，不提供任何方式的数据加密，内容可能被窃听（重要密码泄露）
* 不验证通信方身份，有可能遭遇伪装（跨站点请求伪造）
* 无法证明报文的完整性，有可能已遭篡改（运营商劫持）

为了解决 HTTP 存在的这些漏洞使数据传输更加安全，引入了另一种协议 HTTPS，HTTPS 协议是在 HTTP 协议的基础上加入了加密处理和认证机制和完整性保护，只是 HTTP 通信接口部分用 SSL/TLS 协议代替而已，简单讲就是 HTTP 的安全版，通常 HTTP 直接和 TCP 通信，当使用 SSL 时，就演变成先与 SSL 通信，再由 SSL 和 TCP 通信。

![](https://photo.hushhw.cn/20190923193436.png)

HTTP 和 HTTPS 的区别：

* HTTPS 协议需要到 CA 申请证书，一般免费证书较少，因而需要一定费用；
* HTTP 是超文本传输协议，信息是明文传输，HTTPS 则是安全性的 SSL 加密传输协议；
* HTTP 和 HTTPS 使用的是完全不同的连接方式，用的端口不一样，前者是 80，后者是 443；
* HTTP 的连接很简单，是无状态的，HTTPS 协议是由 SSL + HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。

  ​        

### 1.2 HTTPS 的工作原理

* 客户用 HTTPS 的 URL 访问 Web 服务器，要求与 Web 服务器建立 SSL 连接；

* Web 服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端；

* 客户端的浏览器与 Web 服务器开始协商 SSL 连接的安全等级，也就是信息加密的等级；

* 客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站；

* Web 服务器利用自己的私钥解密出会话密钥；

* Web 服务器利用会话密钥加密与客户端之间的通信；

  ​           

## 2. TLS 协议

> SSL/TLS 是保护计算机网络通讯安全的一类加密协议，它们在传输层上给原先非安全的应用层协议提供加密保护，如非安全的 HTTP 协议即可被 SSL/TLS 保护形成安全的 HTTPS 协议。
>
> TLS 可以理解为 SSL（Secure Socket Layer）安全套接字层的后续版本，TLS 协议是继承了 SSL 协议并写入 RFC 标准化后的产物。

**SSL (Secure Socket Layer)安全套接字层协议**

* SSL通过互相认证、使用数字签名确保完整性、使用加密确保私密性，以实现客户端和服务器之间的安全通讯。

* 分为SSL记录协议和SSL握手协议。

**TLS(Transport Layer Security)传输层安全协议**

* 用于两个应用程序之间提供保密性和数据完整性。
* 分为TLS记录协议和TLS握手协议。 

  ​       

### 2.1 TLS 通信握手过程

* 客户端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法列表；
* 服务器从算法列表中选择一种加密算法确认双方使用的加密方法，并给出包含服务器公钥的数字证书、以及一个服务器生成的随机数（Server random）；
* 客户端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥加密这个随机数，将加密后的信息发给服务器；
* 服务器使用自己的私钥，获取客户端发来的随机数（即Premaster secret）；
* 客户端和服务器根据约定的加密方法，使用前面的三个随机数，生成「对话密钥」（session key），用来加密接下来的整个对话过程。

![](https://photo.hushhw.cn/20190924150109.png)

握手阶段有三点需要注意：

* 「对话密钥」由前面提到的三个随机数一起组成。
* 握手之后的对话使用「对话密钥」加密，属于对称加密；服务器的公钥和私钥只用于加密和解密「对话密钥」，为非对称加密。
* 服务器的公钥放在服务器的数字证书之中，只要证书是可信的公钥就是可信的，保证了公钥不被篡改。
* 每一次对话（session），客户端和服务器端都生成一个「对话密钥」（session key），用它来加密信息。由于"对话密钥"是对称加密，所以运算速度非常快，而服务器公钥只用于加密"对话密钥"本身，这样就减少了加密运算的消耗时间。



​           

## 参考

> [我是这样理解HTTP和HTTPS区别的](https://www.cnblogs.com/jesse131/p/9080925.html)
>
> [传输层安全协议抓包分析之SSL/TLS](https://www.freebuf.com/articles/network/116497.html)
>
> [图解SSL/TLS协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)
>
> [HTTPS协议、TLS协议、证书认证过程解析](https://www.cnblogs.com/snowater/p/7804889.html) 