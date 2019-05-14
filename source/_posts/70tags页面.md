---
title: maupassant主题创建Tags页面
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
tags:
  - hexo
categories: tool
description: >-
  日常折腾博客的我又上线了，这次改造的是『Tags页面』，之前使用next主题时默认是有tags页面的，但是现在用的主题没有，前段时间做右侧about模块时要点击标签跳转到/tags页面就做了个很简陋的tagcloud，今天花时间优化一下。
abbrlink: 5e14d0e
date: 2019-03-05 14:51:57
---



### 起因

日常折腾博客的我又上线了，这次改造的是『Tags页面』，之前使用`next`主题时默认是有`tags`页面的，但是现在用的主题没有，前段时间做右侧`about`模块时要点击标签跳转到`/tags`页面就做了个很简陋的`tagcloud`，今天花时间优化一下。

​      

### 开始操作

#### 第一步

在本地`source`下创建`tags`文件夹，继续创建`index.md`文件，填写`front-matter`如下：

```
layout: tagcloud
title: 标签
date: 2018-02-05 00:43:22
type: tags
comments: true
```

* `layout` 对应待会创建的页面模板名，如果取了其他名字后面跟着一起修改。

​          

#### 第二步

找到主题目录下的`layout`文件夹后，在里面创建文件`tagcloud.pug`，最重要的内容就是这里的代码啦，如下：

```jade
extends base
block title
  title= page.title + ' | ' + config.title
block content
  .post
    .post-content
      .tagcloud
        for tag in site.tags.toArray()
          a( href='/tags/#' + tag.name title=tag.name rel= tag.length ) #{tag.name}

      for tag in site.tags.toArray()
        .one-tag-list
          span(class='fa fa-tag tag-name' id=tag.name) 
            span(class="tag-text") #{tag.name}
          for post in tag.posts.toArray()
            .post-preview
              a( href=config.root + post.path title=post.title ) #{post.title}

  if page.donate
      iframe(src='/donate/?AliPayQR=' + theme.donate.alipay_qr + '&WeChatQR=' + theme.donate.wechat_qr + '&GitHub=' + theme.donate.github + '&BTCQR=' + theme.donate.btc_qr + '&BTCKEY='+ theme.donate.btc_key + '&PayPal=' + theme.donate.paypal_url, style='overflow-x:hidden; overflow-y:hidden; border:0xp none #fff; min-height:240px; width:100%;', frameborder='0', scrolling='no')
  if page.comments
    include _partial/comments.pug

```

喜欢折腾的同学可以研究一下这段代码，很好理解，有什么问题可以在评论区告诉我。

​          

#### 第三步

继续编写样式，在`style.scss`中，定位到`.post-content`的括号内写入：

```scss
.tagcloud {
	margin: 0 0 30px 0;
	a {
		padding:0px 5px;
		margin:3px;
		display: inline-block;
		border: 1px solid rgba(99, 96, 96, 0.8);
         border-radius: 999em;
         color: #aaa;
         &:hover {
			color: #fff;
             border: 1px solid #1a8d76;
             background: #1a8a76;
		}
	}
}
.one-tag-list {
    margin: 30px 0;
    .tag-name {
		.tag-text{
			margin-left: 5px;
             font-size: 16px;
             font-weight: bold;
          }
    }
}
```



#### 第四步

验收成果：

{% qnimg Snipaste_2019-03-05_15-10-51.png %}

​       

### 遇到的坑

前面提到在`front-matter`中给`layout`取名可以自定义，后面对应的文件也取相应的名字即可，但是不要取名为`tags`，这样会和主题冲突，导致所有的`tag`点击后都被改成现在的样式，而不是`archive.pug`中的样式。

​          

