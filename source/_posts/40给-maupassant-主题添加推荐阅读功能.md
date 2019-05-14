---
title: Hexo主题maupassant添加推荐阅读功能
comments: true
mathjax: true
toc: false
abbrlink: f2c9bfb4
date: 2019-01-18 20:17:17
tags:
  - hexo
categories: tool
---

推荐阅读是通过插件 [hexo-recommended-posts](https://github.com/huiwang/hexo-recommended-posts) 来实现的, 它不仅可以推荐你自己的博客, 还可以推荐别人的相关博客. 如果有比较多人使用这个插件的话, 不仅能帮读者快速找到感兴趣的内容, 同时也能增加自己博客的流量。



先安装 hexo-recommended-posts :

```
npm install hexo-recommended-posts --save
```



首先我们还是需要在主题的 `_config.yml` 文件中添加一些配置信息:

```
recommended_posts:
  enable: true
```

然后同样也是在 `layout/post.pug` 文件中添加相关的代码:

```
if theme.recommended_posts.enable == true
  div.recommended_posts
    h3() 推荐阅读
    - var post_list = recommended_posts(page, site)
    - for (var i in post_list)
        li
          a(href=post_list[i].permalink, target='_blank')= post_list[i].title
```

再在 `source/css/style.scss` 中添加样式配置:

```
.recommended_posts {
    padding: 0.5em 1em;
    border-left: 3px solid #6f42c1;
    background-color: #f5f0fa;
    li { margin: 5px 0; }
    a:link { color: blue; }
    a:hover { text-decoration:underline;color: red}
    a:visited { color: green; }
}
```

最后我们还需要在博客的 `_config.yml` 文件中添加插件相关的配置信息:

```
recommended_posts:
  autoDisplay: false
```

现在当我们执行下列命令后便可以在博客中看到推荐文章相关的信息:

```
hexo recommend
hexo generate
hexo server
```

具体配置过程也可以参见：https://github.com/hiberabyss/maupassant-hexo/commit/499d5ef3f73b6735cd5cf848438055501208a59b



### 参考链接

* [hexo-recommended-posts](https://github.com/huiwang/hexo-recommended-posts)

