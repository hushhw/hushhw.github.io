---
title: 欧几里得算法与拓展欧几里得算法
comments: true
mathjax: true
toc: true
tocnumber: true
music: false
image: false
tags:
  - gcd
  - 算法笔记
categories: 
  - 编程开发
  - 算法学习
abbrlink: cd2c8225
date: 2019-03-17 10:45:36
description: '正整数 a 与 b 的最大公约数指的是 a 与 b 的所有公约数中最大的那个公约数，如 4 和 6 的最大公约数是 2。一般用 gcd(a,b) 来表示 a 和 b 的最大公约数，而求解最大公约数常用的欧几里得算法（即辗转相除法）。'
---



## 欧几里得算法 (gcd)

> 正整数 a 与 b 的最大公约数指的是 a 与 b 的所有公约数中最大的那个公约数，如 4 和 6 的最大公约数是 2。
>
> 一般用 `gcd(a,b)` 来表示 a 和 b 的最大公约数，而求解最大公约数常用的**欧几里得算法**（即辗转相除法）。



欧几里得算法基于定理：**设 a、b 均为正整数，则 gcd(a, b) = gcd(b, a%b)。**

* 如果 a<b，那么定理的结构就是将 a 和 b 交换；

* 如果 a>b，那么通过这个定理总可以将数据规模变小，并且减小的非常快。

这样似乎可以很快就得到结果，只要还需要一个东西：**递归边界**，即数据规模减小到什么程度使得可以算出结果来。我们知道 0 和任意一个整数 a 的最大公约数都是 a（注意：不是 0），这个结论就可以当作递归的边界。

由此很容易想到将其写为递归的形式，因为递归的两个关键已经得到：

**1.递归式：gcd(a, b) = gcd(b, a%b).**

**2.递归边界：gcd(a, 0) = a.**

于是可以得到下面的求解最大公约数的代码：

```cpp
int gcd(int a, int b){
  if(b == 0) return a;
  else return gcd(b, a%b);
}
```

更简洁的写法是：

```cpp
int gcd(int a, int b){
  return !b ? a : gcd(b, a%b);
}
```

​            

## 拓展欧几里得算法 (extend_gcd)

> 欧几里得算法是为了解决这样一个问题：给定两个非零的整数 a 和 b，求一组正整数 (x, y)，使得 ax+ by = gcd(a, b) 成立，其中 gcd(a, b) 表示 a 和 b 的最大公约数。



由前面用到的欧几里得算法求最大公约数的方法可知，它总是把 gcd(a, b) 转化为求解 gcd(b, a%b)，当 b 变为 0 的时候返回 a，此时 a 就等于gcd。

也就是说欧几里得算法结束的时候变量 a 中存放的是 gcd，变量 b 中存放的是 0，因此此时显然有 `a*1 + b*0 = gcd(a, b)` 成立，此时有 x = 1, y = 0 成立。

```cpp
int gcd(int a, int b){
  if(b == 0) return a;
  else return gcd(b, a%b);
}
```


所以，不妨我们用上面的欧几里得算法的过程来计算 x 和 y。



当计算 gcd(a, b) 时，有 $ax_1 + by_1 = gcd​$ 成立；

而在下一步计算 gcd(b, a%b) 时，又有 $bx_2 + (a\%b)y_2 = gcd​$ 成立。

由此 $ax_1 + by_1 = bx_2 + (a\%b)y_2$ 成立。

又考虑到有关系 $a\%b = a - (a/b)* b$ 成立，

因此 $ax_1 + by_1 = bx_2 + (a - (a/b)*b)y_2$ 成立。

整理式子之后得到 $ax_1 + by_1 = ay_2 + b(x_2 - (a/b)y_2)​$。

因此，对比等号左右两边可以马上得到下面的推到公式：

$x1 = y2​$

$y_1 = x_2 - (a /b)y_2​$

由此便可以通过 $x_2$ 和 ​$y_2$ 来反推 $x_1$ 和 $y_1$ 了。于是只需要到达递归边界、不断退出的过程中根据上面的公式计算 x 和 y，就可以得到一组解。代码如下：

```cpp
int exGcd(int a, int b, int &x, int &y){
  if(b == 0){ x = 1; y = 0; return a;}
  int g = exGcd(b, a%b, x, y);  //递归计算exGcd(b,a%b)
  int temp = x;  //存放x的数值
  x = y;
  y = temp - (a/b)*y;
  return g;
}
```



> 首发在：
>
> https://blog.csdn.net/hushhw/article/details/76165522
>
> https://blog.csdn.net/hushhw/article/details/76216286