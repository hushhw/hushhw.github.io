---
title: 使用virtualenv创建隔离环境
comments: true
mathjax: true
toc: true
tocnumber: false
music: false
image: false
date: 2019-10-20 15:05:18
tags:
  - Python
  - virtualenv
categories: 
  - 编程开发
  - 环境配置
  - Python
description: '如果你希望在一个隔离的环境里工作（强烈推荐，这样你可以在库版本不冲突的情况下处理不同的项目），可以通过运行以下 pip 命令来安装 `virtualenv`'
---



如果你希望在一个隔离的环境里工作（强烈推荐，这样你可以在库版本不冲突的情况下处理不同的项目），可以通过运行以下 pip 命令来安装 `virtualenv`：

```
$ pip3 install --user --upgrade virtualenv
Collecting virtualenv
[...]
Successfully installed virtualenv
```

输入以下命令创建一个隔离的 Python 环境：

```
$ cd $ML_PATH
$ virtualenv env
Using base prefix '[...]'
New Python executable in [...]/ml/env/bin/python3.5
Also creating executable in [...]/ml/env/bin/python
Installing setuptools, pip, wheel...done.
```

现在开始，每当要激活这个环境时，只需要打开终端并输入：

```
$ cd $ML_PATH
$ source env/bin/activate
```

当这个环境处于激活状态时，你使用 pip 安装的任何软件包都将被安装在这个隔离的环境中，Python 只拥有这些包的访问权限（如果你还希望访问系统站点的软件包，则需要使用 `virtualenv` 的 ``--system-site-packages` 命令选项）。更多详情可以参考 [virtualenv文档](https://virtualenv.pypa.io/en/latest/)。