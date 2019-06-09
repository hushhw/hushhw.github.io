---
title: Hexo主题maupassant博客搭建相册
comments: true
mathjax: true
toc: true
tocnumber: true
tags:
  - hexo
categories: tool
abbrlink: 6ff333ed
date: 2019-01-18 01:20:14
---



之前一直想要在博客里加一个相册的功能，自己折腾无果后，转入使用主题 `yilia` ，该主题是将其在ins上的相册转过来，我也刚好也是想把ins上的照片转过来，太喜欢这个app了，所以这个主题真的是深得我心。可是，男人都是善变的，我现在又转入了新主题 `Manpassant` ，于是开始了我的漫漫迁移路。

本篇文章仅介绍如何在Manpassant主题上迁移yilia上的相册功能，如何获取ins上的照片，以后有时间再补充介绍。

<!-- more -->

​        

### 准备工作

首先你得搭建好你的相册库，无论是本地存储还是用github、七牛云都可以。

​          

### 生成相册页面

```
$ hexo new page "photos"
```

执行完毕后找到 `source/photos` 文件夹下 `index.md` 进行修改，`Manpassant` 支持是否显示侧栏两种 `page` 模式，设置layout为`layout: page`则显示双栏，若需要单栏页面，就将layout设置为 `layout: single-column`。

我的配置：

```
layout: single-column
type: "photos"
title: 相册
noDate: 'true'
comments: 'true'
copyright: false
```

正文代码部分如下：

* 前面三个`link`的文件都要一起放在`photos`文件夹中，点击之后可以下载
  * [ins.css](https://github.com/hushhw/nodejs-ins/blob/master/backup/ins.css)
  * [photoswipe.css](https://github.com/dimsemenov/PhotoSwipe/blob/master/dist/photoswipe.css)
  * [default-skin](https://github.com/dimsemenov/PhotoSwipe/tree/master/dist/default-skin) 
* 第8行超链接可以替换成你自己的ins网页

```javascript
<link rel="stylesheet" href="./ins.css">
<link rel="stylesheet" href="./photoswipe.css"> 
<link rel="stylesheet" href="./default-skin/default-skin.css"> 

<div class="instagram itemscope">
	<section class="archives album">
		<ul class="img-box-ul">
			<a href="https://www.instagram.com/hushhw/" target="_blank" class="open-ins">图片来自instagram，正在加载中…</a>
		</ul>
	</section>
</div>
<script>
	function add0(m){return m<10?'0'+m:m };
	function getDate(timeString) {
		var time = new Date(parseInt(timeString) * 1000);
		var y = time.getFullYear();
		var m = time.getMonth()+1;
		var d = time.getDate();
		return y+'-'+add0(m)+'-'+add0(d);
	};
</script>
<script>
	(function() {
		var loadScript = function(path) {
			var $script = document.createElement('script')
			document.getElementsByTagName('body')[0].appendChild($script)
			$script.setAttribute('src', path)
		}
		setTimeout(function() {
			loadScript('./ins.js')
		}, 0)
	})()
</script>
```

此时，页面的基本样式已经完成，完成图如下：

![](https://qn.hushhw.cn/images/Snipaste_2019-01-18_02-17-44.png)

此时若点击图片试图查看大图，浏览器将会报错

```
Uncaught ReferenceError: PhotoSwipe is not defined 
```

​      

### 引入JS文件

前面添加的`photoswipe.css`和`default-skin.css`是使用photoswipe来查看相册图片，具体可以参考网址 [photoswipe](http://photoswipe.com/)。其实Manpassant主题已经内置了`fancybox`来查看图片，那为什么还要使用`OpenSwipe`呢？因为我们想要实现显示在网页上的图片是压缩版本，点击之后图片显示未压缩版本~~（其实主要是因为yilia主题用的就是这个，我只会魔改。。。）~~。

现在继续添加js文件到主题文件夹中，找到`themes/maupassant/source/js`文件夹下面两个文件放入其中（可以从PhotoSwipe项目中下载）：

* [photoswipe.min.js](https://github.com/dimsemenov/PhotoSwipe/blob/master/dist/photoswipe.min.js)
* [photoswipe-ui-default.min.js](https://github.com/dimsemenov/PhotoSwipe/blob/master/dist/photoswipe-ui-default.min.js)

在主题目录`layout/_partial`下新建文件`openswipe.pug`写入：

```javascript
script(type='text/javascript', src=url_for(theme.js) + '/photoswipe.min.js' + '?v=' + theme.version)
script(type='text/javascript', src=url_for(theme.js) + '/photoswipe-ui-default.min.js' + '?v=' + theme.version)
```

之后，在`base-without-sidebar.pug`文件最后加上一句`include _partial/openswipe.pug`，如果你前面选的是双栏页面使用的是`layout: page`，那么你应该在`base.pug`文件中添加。

完成到这里，`OpenSwipe`的配置基本完成，当你点击图片时浏览器报错将是

```
Uncaught TypeError: Cannot read property 'firstChild' of undefined
```

​          

### 点击图片判断

找到文件`single-column.pug`，加入判断语句：

```
 if page.type == "photos"
     div(class="pswp" tabindex="-1" role="dialog" aria-hidden="true")
      div(class="pswp__bg")
      div(class="pswp__scroll-wrap")
       div(class="pswp__container")
        div(class="pswp__item")
        div(class="pswp__item")
        div(class="pswp__item")
       div(class="pswp__ui pswp__ui--hidden")
        div(class="pswp__top-bar")
         div(class="pswp__counter")
         button(class="pswp__button pswp__button--close" title="Close (Esc)")
         button(class="pswp__button pswp__button--share" title="Share")
         button(class="pswp__button pswp__button--fs" title="Toggle fullscreen")
         button(class="pswp__button pswp__button--zoom" title="Zoom in/out")
         div(class="pswp__preloader")
          div(class="pswp__preloader__icn")
           div(class="pswp__preloader__cut")
            div(class="pswp__preloader__donut")
        div(class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap")
         div(class="pswp__share-tooltip")
        button(class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)")
        button(class="pswp__button pswp__button--arrow--right" title="Next (arrow right)")
        div(class="pswp__caption")
         div(class="pswp__caption__center")
```

由于该主题文件都是`.pug`，而本人对jade并不熟悉，所以查了一下基本语法魔改了一下javascript代码。

添加完成之后，相册页面也就完结撒花啦！

​         

### 使用流程

* 使用[nodejs-ins](https://github.com/hushhw/nodejs-ins)工具生成图片及ins.json文件
* 正常使用`hexo g -d`更新博客

