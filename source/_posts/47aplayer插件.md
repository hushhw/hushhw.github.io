---
title: aplayer 音乐播放器
comments: true
mathjax: true
toc: true
tags:
  - hexo
categories: tool
abbrlink: a84d1ef1
date: 2019-01-22 21:51:32
---



今天折腾的点是给博客中插入音乐，找到的具体可行的方案有：

* 使用音乐平台提供的插件 `体验很差`
* 使用[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer)插件 `排了坑后体验极佳`

<!-- more -->

​        

## 使用音乐平台提供插件

以网易云为例，网页端点击`生成外链播放器`即可生成外链代码，如我的某个歌单生成[外链](https://music.163.com/#/outchain/0/2205641361/)。

可以在自己博客页面中嵌入插件:

```javascript
<iframe 
 frameborder="no" border="0" 
 marginwidth="0" marginheight="0" 
 width=530 height=310 
 src="//music.163.com/outchain/player?type=0&id=2205641361&auto=0&height=430">
</iframe>
```

效果：

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=530 height=330 src="//music.163.com/outchain/player?type=0&id=2205641361&auto=0&height=430"></iframe>

缺点非常明显，而最不能忍得是网易音乐有些音乐因为版权保护，没办法生成外链：

{% qnimg Snipaste_2019-01-22_22-55-46.png %}

​         

## 使用 hexo-tag-aplayer 插件

[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 就是将 [APlayer](https://github.com/DIYgod/APlayer) 内嵌入博客页面的 Hexo 插件。

安装执行：

```
$ npm install --save hexo-tag-aplayer
```

原先 `hexo-tag-aplayer` 不支持 `MetingJS`，使得需要图片url，音乐url等等参数，操作起来都很麻烦，需要去音乐网站扒音乐播放链接或者下载下来存储在七牛云或本地，要了解具体参数和使用可以查看其[中文文档](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md)了解。

### MeingJS 支持 (3.0 新功能)

[MetingJS](https://github.com/metowolf/MetingJS) 是基于[Meting API](https://github.com/metowolf/Meting) 的 APlayer 衍生播放器，引入 MetingJS 后，播放器将支持对于 QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐播放。

如果想在本插件中使用 MetingJS，请在 Hexo 配置文件 `_config.yml` 中设置：

```
aplayer:
  meting: true
```

接着就可以 在文章中使用 MetingJS 播放器了，例如打开网易云音乐网站找到这首`coldplay`的《*Viva la Vida*》，从url中可以得到其`id`为`3986040`，按下面格式即可使用：

```
{% meting "3986040" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```
效果：

{% meting "3986040" "netease" "song" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}

​       

再来一个歌单模板：

```
{% meting "627070825" "netease" "playlist" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}
```

{% meting "627070825" "netease" "playlist" "theme:#555" "mutex:true" "listmaxheight:340px" "preload:auto" %}

​         

有关选项列表如下:

| 选项            | 默认值        | 描述                                       |
| ------------- | ---------- | ---------------------------------------- |
| id            | **必须值**    | 歌曲 id / 播放列表 id / 相册 id / 搜索关键字          |
| server        | **必须值**    | 音乐平台: `netease`, `tencent`, `kugou`, `xiami`, `baidu` |
| type          | **必须值**    | `song`, `playlist`, `album`, `search`, `artist` |
| fixed         | `false`    | 开启固定模式                                   |
| mini          | `false`    | 开启迷你模式                                   |
| loop          | `all`      | 列表循环模式：`all`, `one`,`none`               |
| order         | `list`     | 列表播放模式： `list`, `random`                 |
| volume        | 0.7        | 播放器音量                                    |
| lrctype       | 0          | 歌词格式类型                                   |
| listfolded    | `false`    | 指定音乐播放列表是否折叠                             |
| storagename   | `metingjs` | LocalStorage 中存储播放器设定的键名                 |
| autoplay      | `true`     | 自动播放，移动端浏览器暂时不支持此功能                      |
| mutex         | `true`     | 该选项开启时，如果同页面有其他 aplayer 播放，该播放器会暂停       |
| listmaxheight | `340px`    | 播放列表的最大长度                                |
| preload       | `auto`     | 音乐文件预载入模式，可选项： `none`, `metadata`, `auto` |
| theme         | `#ad7a86`  | 播放器风格色彩设置                                |

​         

### 遇到的坑

我原先是用的主题是`yilia`，非常喜欢它的相册功能，于是换到现在的主题后把该功能移植了过来，如果有小伙伴也想要实现可以参看我的这篇文章：『[Hexo主题maupassant博客搭建相册](https://hushhw.cn/posts/tool/6ff333ed.html)』。

当把[hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer) 配置好并且用几个页面测试后，发现相册功能失效了，查找问题后发现在`ins.js`中自动加了下面这些代码导致的失效。

```javascript
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js"></script>

```

经过一番在网上寻找后无果后，于是决定仔细研读官方文档，查看官方的[中文文档](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md)后发现，可能是插件的自动脚本插入功能导致的，使得`ins.js`中自动插入了代码，于是关闭该功能试试：

```
aplayer:
  asset_inject: false
```

关闭后确实解决了问题，相册功能恢复，下面的问题就是自己配置插件，在需要的地方引用代码了。

####1. 恢复post页面插件功能

我是使用的主题[maupassant-hexo](https://github.com/tufu9441/maupassant-hexo)都是用的是`.pug`格式，其他小伙伴根据自己的渲染文件进行修改。

主题配置页面写入：

```
# 播放器
aplayer:
 enable: true
```

新建文件`aplayer.pug`放在`/layout/_partial`文件夹下，写入：

```jade
link(rel="stylesheet" type='text/css', href="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.css")
script(type='text/javascript', src="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.js")
script(type='text/javascript', src="https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js")
```

最后在`post.pug`中引用即可：

```
if theme.aplayer.enable
  include _partial/aplayer.pug
```

这样在文章页面可以使用该插件了。

可以通过本地`hexo server`来检查一下文章页面`head`中有没有成功引入。

​       

#### 2. 在非post页面使用插件功能

我在`/source/`文件夹下自定义的页面`life`，我需要该页面使用插件，最简单的方式就是直接在`index.md`中引用：

```javascript
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10/dist/APlayer.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/meting@1.2/dist/Meting.min.js"></script>
```

{% qnimg Snipaste_2019-01-22_23-54-20.png %}

最终效果：

 {% qnimg Snipaste_2019-01-22_23-55-27.png %}





> 本文参考自：
>
> https://github.com/MoePlayer/hexo-tag-aplayer
>
> https://tianma.space/post/3998746934/index.html