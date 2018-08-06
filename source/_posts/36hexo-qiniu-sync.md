---
title: 使用七牛插件自动上传图片
date: 2018-07-21 19:20:38
tags: [工具, hexo, 七牛云]
categories: 工具
---



{% qnimg qiniu.png alt:图片来源网络 %}

之前使用七牛云都是手动打开网页传图片，

复制图片网址来用，

最近才发现这个插件可以直接本地上传，

记录一下备之后使用。

<!-- more -->

​     

### 设置`hexo-qiniu-sync`插件

1. 安装插件：在hexo主目录下运行以下命令：

  ```
  npm install hexo-qiniu-sync --save
  ```

2. 添加插件配置信息到`_config.yml`文件中：

   ```
   plugins:
     - hexo-qiniu-sync

   #七牛云存储设置
   ##offline       是否离线. 离线状态将使用本地地址渲染
   ##sync          是否同步
   ##bucket        空间名称.
   ##access_key    上传密钥AccessKey
   ##secret_key    上传密钥SecretKey
   ##secret_file   秘钥文件路径，可以将上述两个属性配置到文件内，防止泄露，json格式。绝对路径相对路径均可
   ##dirPrefix     上传的资源子目录前缀.如设置，需与urlPrefix同步 
   ##urlPrefix     外链前缀.
   ##local_dir     本地目录.
   ##update_exist  是否更新已经上传过的文件(仅文件大小不同或在上次上传后进行更新的才会重新上传)
   ##image/js/css  子参数folder为不同静态资源种类的目录名称，一般不需要改动
   ##image.extend  这是个特殊参数，用于生成缩略图或加水印等操作。具体请参考http://developer.qiniu.com/docs/v6/api/reference/fop/image/ 
   ##              可使用基本图片处理、高级图片处理、图片水印处理这3个接口。例如 ?imageView2/2/w/500 即生成宽度最多500px的缩略图

   qiniu:
     offline: false
     sync: true
     bucket: bucket_name
     secret_file: sec/qn.json or C:
     access_key: AccessKey
     secret_key: SecretKey
     dirPrefix: static
     urlPrefix: http://bucket_name.qiniudn.com/static
     local_dir: static
     update_exist: true
     image: 
       folder: images
       extend: 
     js:
       folder: js
     css:
       folder: css
   ```

   几个需要注意修改的地方：

   - `bucket`：修改为你申请的七牛空间名称

   - `access_key`、`secret_key`：上传密钥AK和SK，可以在七牛个人空间找到。

     {% qnimg qiniu_ak_sk.png %}

   - `urlPrefix` : 七牛空间地址的前缀。上面的示例是复制的github文档写的，还是使用的二级域名表示的，但现在七牛已经取消了二级域名，而需要自己建的空间中找分配的七牛测试域名然后填写在这里，也可以查看一个已上传的文件外链地址，确认前缀无误。例如我的是`http://p86wg7kc2.bkt.clouddn.com`。

   - `dirPrefix`：资源将上传到七牛空间的此目录下，也可以设置为空，该参数会影响外链地址，如设置为非空值，例如默认的`static`，则 `urlPrefix` 为保持一致需加上目录后缀 `/static` ，改为 `http://p86wg7kc2.bkt.clouddn.com/static` 。

   - `local_dir` ：本地资源储存目录。在本例中，待上传的资源都储存在hexo主目录中的 `cdn` 文件夹（也就是与 `source` 目录平级）中。

   - `update_exist` ：设置为 `true` ，则会在文件更新之后重新上传并更新七牛空间上中的原有文件。

   - `image` : `extend` 参数：这是个特殊参数，是文章内使用 `qnimg` 标签引用图片的默认图片处理操作。可以使用 基本图片处理（imageView2）、高级图片处理（imageMogr2）、图片水印处理（watermark） 这三个图片处理接口，多个接口内容之间用 `|` 间隔。例如 `?imageView2/2/w/500` 即生成宽度最多500px的缩略图。

​      



### 配置本地目录

本地目录名需要与`local_dir`参数的值一致，本例中在hexo主目录下新建与source平级的目录cdn，用于存放需要上传到七牛的资源。

在 `cdn` 目录下创建子目录： `css` 、 `images` 、 `js` ，与 `image/js/css` 子参数 `folder` 保持一致，待上传的css、图片、js文件应该存储到相应子目录。我的Hexo主目录结构如下：

 >├─.deploy_git
 >├─cdn
 >│ ├─css
 >│ ├─images
 >│ └─js
 >├─node_modules
 >├─public
 >├─scaffolds
 >├─source
 >└─theme

​     

### 引用七牛资源

在文中需要放图片的地方插入：

```
{% qnimg ImgFile %}
```

其中`ImgFile`为放在本地images文件下的图片名称，例如我这里插入：

```
{% qnimg xiaoanphoto.jpg %}
```

就会显示图片：

{% qnimg xiaoanphoto.jpg %}

这里生成的图片外链被自动转为 `urlPrefix` + `/` + `image.folder` + `/` + `ImgFile` ，这里我插入的这张图片的链接为：`http://p86wg7kc2.bkt.clouddn.com/images/xiaoanphoto.jpg`。

​    

高级用法的通用模板：

```
{% qnimg imageFile attr1:value1 attr2:value2 'attr3:value31 value32 value3n' [extend:... | normal:yes] %}
```

- `[]` 表示可选项，按需添加，也可以不写
- `|` 表示二选一
  - `extend:...` 图片处理参数，表示对图片进行某种特定处理，可以使用 基本图片处理（imageView2）、高级图片处理（imageMogr2）、图片水印处理（watermark） 这三个图片处理接口，多个处理之间用 `|` 间隔。
  - `normal:yes` 表示使用原图，忽略 `_config.yml` 文件中的 `image.extend` 设置

比如下面这个例子：

```
{% qnimg xiaoanphoto.jpg title:图片来源@小安 alt:@小安 'class:class1 class2' extend:?imageView2/2/w/600 %}
```

将被渲染成：

```
<img title="图片来源@小安" alt="@小安" class="class1 class2" src="http://p86wg7kc2.bkt.clouddn.com/images/xiaoanphoto.jpg?imageView2/2/w/600">
```

如果你在 `_config.yml` 文件中配置了 `extend` 字段，则默认会对插入的图片进行对应的处理。
如果不想对一个图片进行处理，则可在 `qnimg` 标签内增加 `normal:yes` 参数，则使用原图，不进行图片处理。
如果只对当前图片进行处理，则可在 `qnimg` 标签内增加 `extend:?imageView2/2/w/600` 样式的配置参数。
当 `_config.yml` 文件中和 `qnimg` 标签内都定义了 `extend` 参数，则只会使用 `qnimg` 标签的 `extend` 参数。


### 同步

**作为一个带命令行功能的插件，漏掉了命令行的使用说明不是好习惯。** 本插件命令行为 `hexo qiniu` ，所支持的子命令有：

- `info` (简写 `i` )

> 功能：显示插件版本，作者及Github地址信息等

- `sync` (简写 `s` )

> 功能：同步静态资源到七牛空间

- `sync2` (简写 `s2` )

> 功能：同步静态资源到七牛空间，且会同步上传那些本地与七牛空间有差异的文件。
> **这个命令会无视 update_exist 配置**。
> 对比规则请看 `update_exist` 配置参数说明。



### 参考文档

> https://github.com/gyk001/hexo-qiniu-sync `hexo-qiniu-sync` 的官方说明文档部分内容已过时
>
> https://yuchen-lea.github.io/2016-01-21-use-qiniu-store-file-for-hexo