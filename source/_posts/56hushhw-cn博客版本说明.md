---
title: hushhw.cn版本更新说明
comments: true
toc: true
tocnumber: true
top: true
tags:
  - hexo
categories: tool
abbrlink: de9b6457
date: 2019-01-28 22:48:45
description: 我一直对学习保持着一种仪式感，只有做好了规划，建设好一砖一瓦，才能够保持更积极的态度去面对困难，希望我能够永远保持着这一份仪式感去对待未知的事物，充满好奇，充满感激。
---



hushhw.cn一直都在优化更新，本文记录各版本更新记录。

​       

 * 当前版本 2019.01 `hushhw.cn 2.0版` 
 * 历史版本 2018.01 `hushhw.cn 1.0版`

​         

## 2.0 版本

随着`hexo-next`主题更新到`6.0`版本，之前告一段落的博客折腾之路又重新开始了。

我一直对学习保持着一种仪式感，只有做好了规划，建设好一砖一瓦，才能够保持更积极的态度去面对困难，希望我能够永远保持着这一份仪式感去对待未知的事物，充满好奇，充满感激。

在这一次版本更新中，推翻了原先的所有设计重新开始，加入了更多人文元素让博客不再是技术小白的技术小站，变成了一个表达心境，记录生活的地方，主要体现在菜单栏更新上：

![](https://qn.hushhw.cn/images/Snipaste_2019-01-28_23-19-12.png)

各板块介绍：

* **技术**：汇总我的学习笔记
* **随笔**：汇总我的生活记录，也是其它分类的入口
* **相册**：爬取`instagram`上的相册
* **书房**：放在第一分类，督促自己多读书

​        

### 2.0 版本更新注释

* 更换主题 `hexo-maupassant` 及基本配置
* 更新不蒜子域名及配置
* 博客文章链接优化为永久链接
* 文章置顶及置顶标签
* 侧栏标签样式重置
* 侧栏添加归档及篇数
* maupassant 博客搭建相册
* archive 页面文章数目设置
* 推荐阅读功能
* 豆瓣插件引用及拓展
* 音乐及视频播放器功能
* 七牛云图床域名更新
* 底部版权信息添加时间
* 侧栏 `about` 栏添加 
* 博客配色更新
* 全新评论系统 `valine` 
* 优化目录显示
* 注脚优化 `hexo-footnotes` 
* 自定义 `tag` 页面

​              

### 2.0 版本上线流程

```json
"build": 
"hexo clean && hexo recommend && hexo g && hexo douban && gulp build&& hexo deploy",

"test": 
"hexo clean && hexo g && hexo douban && gulp build&& hexo s"
```








