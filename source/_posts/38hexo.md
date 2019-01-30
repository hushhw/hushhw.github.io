---
title: Hexo折腾笔记
comments: true
mathjax: true
abbrlink: 28187ef7
date: 2019-01-13 21:42:00
tags:
  - hexo
categories: tool
toc: true
---

> 当我开始打算搭建一个博客写总结时，就注定有一天我会入一个万劫不复的坑。
>
> 腾讯的学生服务器每个月都要续，而且Wordpress使用起来并不对我的胃口，于是转用Hexo和github pages 服务搭建个人博客。
>
> 对于门面功夫上的折腾，我从来都没有让自己失望过，根本停不下来，总是感觉不够完美。
>
> 时间跨度有点长，之前配置的一些东西又忘记了，所以这篇笔记很有必要写。

<!-- more -->

​            

{% qnimg Snipaste_2019-01-14_13-08-00.png %}



* 本文介绍的所有设置均在windows环境下进行
* 因为网上有很多教程，本篇是基于汇总的基础上进行补充




## 基础篇

1. [Hexo+Netlify快速搭建个人博客](https://segmentfault.com/a/1190000015756932)
2. [hexo常用命令笔记](https://segmentfault.com/a/1190000002632530)
3. [有哪些好看的Hexo主题](https://www.zhihu.com/question/24422335)




## 提高篇

因为很多配置很早以前就做过了，所以只能再遇到坑的时候再补充。。。

### 1. 博客文章链接优化

Hexo的永久链接的默认格式是 ` :year/:month/:day/:title/` ，比如访问站点下某一篇文章时，其路径是 `2018/04/12/xxxx/` ，如果我们的文章标题是中文的，那么该路径就会出现中文字符，之前使用 `gitment` 的同胞应该深受其害，在路径中出现了中文字符很容易引发各种问题，而且也不利于seo，因为路径包含了年月日三个层级，层级太深不利于搜索抓取。

网上的解决方案大致有两种，其一见 [Hexo 永久链接管理](https://clearsky.me/hexo-permalinks.html) 一文，通过在 `Front-matter` 自己添加变量 `urlname` 来做到，另一种方案则是安装使用插件 [hexo-abbrlink](https://link.jianshu.com/?t=https://github.com/rozbo/hexo-abbrlink) 可以做到自定义文章链接，安装：

```
$ npm install hexo-abbrlink --save
```

然后在Hexo的**根目录**的配置文件`_config.yml`中修改：

```
permalink: :abbrlink/
#abbrlink配置
abbrlink:
  alg: crc32  # 算法：crc16(default) and crc32
  rep: dec    # 进制：dec(default) and hex

```

之后再md文件的`Front-matter`就会加上`abbrlink：xxxxx`

这样就确保了博文链接的唯一化，只要不修改md文件的`abbrlink`的值，url就永久不会改变。如此md文件名和文件内容也可以随便改了。这样也有利于SEO优化。

最后附上我的配置，以及相关可以设定的参数

```
#我的配置，post为固定链接后面带":"的为变量
permalink: posts/:category/:abbrlink.html

#abbrlink
abbrink:
  alg: crc32
  rep: dec
```



### 2. 文章置顶及置顶标签

```
$ npm uninstall hexo-generator-index --save
$ npm install hexo-generator-index-pin-top --save
```

然后在需要置顶的文章的`Front-matter`中加上`top: true`即可。

搜索定位到`post-meta`类位置添加置顶标签，例如我使用的主题配置：

{% qnimg Snipaste_2019-01-14_21-11-50.png %}

最终效果

{% qnimg Snipaste_2019-01-14_21-12-58.png %}



### 3. Hexo主题maupassant博客搭建相册
[Hexo主题maupassant博客搭建相册](http://localhost:4000/posts/tool/6ff333ed.html)

​      

### 4. archive页面数量设置

当文章数量达到十几篇左右时，突然发觉archive归档页面仅显示10篇文章，并且出现了分页功能，对于我们这种个人博客，文章数量不会很多，所以更希望是在一页中完全展示出来，便于访问者查找感兴趣的文章。

在网上查找原因，发现此处的10条限制来自_config.yml文件中的配置，这个配置控制所有的分页配置，包括首页、归档页、tag分类页面。

```
per_page: 10
```

如果我们想对上面三个页面做独立的配置，需要安装插件进行功能支持。

- [hexo-generator-index](https://github.com/hexojs/hexo-generator-index)
- [hexo-generator-archive](https://github.com/hexojs/hexo-generator-archive)
- [hexo-generator-tag](https://github.com/hexojs/hexo-generator-tag)

使用如下命令进行安装需要的插件

```
$ npm install hexo-generator-archive --save
```

对应的`_config.yml`文件中添加如下配置

```
index_generator:
  per_page: 5

archive_generator:
  per_page: 20

tag_generator:
  per_page: 10
```

​     

### 5. maupassant主题添加推荐阅读功能

[maupassant主题添加推荐阅读功能](http://localhost:4000/posts/tool/f2c9bfb4.html)

