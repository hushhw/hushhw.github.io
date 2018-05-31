---
title: 卡特兰数(catalan number)
date: 2018-05-18 14:28:22
tags: [算法笔记, 卡特兰数]
categories: 学习
mathjax: true
---



> **卡特兰数** 又称卡塔兰数，卡特兰数是组合数学中一个常出现在各种计数问题中的数列。以比利时的数学家欧仁·查理·卡塔兰 (1814–1894)的名字来命名。
>



### 原理

令h(0)=1, h(1)=1，catalan数满足递推式：
$$
h(n) = h(0)*h(n-1)+h(1)*h(n-2)+\dots+h(n-1)*h(0) (n>=2)
$$
例如：$h(2) = h(0)*h(1)+h(1)*h(0) = 1*1+1*1 = 2$

​	    $h(3) = h(0)*h(2)+h(1)*h(1)+h(2)*h(0) = 1*2+1*1+2*1 = 5$

另类推导式：
$$
h(n) = \frac{h(n-1)*(4*n-2)}{n+1};
$$
递推关系的解为：
$$
h(n) = \frac{C_{2n}^n}{n+1} (n=0,1,2,\dots)
$$
递推关系的另类解为：
$$
h(n) = C_{2n}^n - C_{2n}^{n-1} (n=0,1,2,\dots)
$$



其前几项为 : 1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, 16796, 58786, 208012, 742900, 2674440, 9694845, 35357670, 129644790, 477638700, 1767263190, 6564120420, 24466267020, 91482563640, 343059613650, 1289904147324, 4861946401452, ...





### 应用

**括号化** ：矩阵连乘： P=a1×a2×a3×……×an，依据乘法结合律，不改变其顺序，只用括号表示成对的乘积，试问有几种括号化的方案？

**出栈次序** ：一个栈(无穷大)的进栈序列为1，2，3，…，n，有多少个不同的出栈序列?

**凸多边形三角划分** ：在一个凸多边形中，通过若干条互不相交的对角线，把这个多边形划分成了若干个三角形。任务是键盘上输入凸多边形的边数n，求不同划分的方案数f（n）。比如当n=6时，f（6）=14。

更多应用见：https://blog.csdn.net/jiejinquanil/article/details/52153045



原始代码：

```c++
__int64 catalan[40];
void catalan(){
  memset(catalan, 0, sizeof(catalan));
  catalan[0] = catalan[1]=1;
  for(int i=2; i<=35; i++){
    for(int j=0; j<i; j++){
      catalan[i] += catalan[j]*catalan[i-j-1];
    }
  }
}
```



大数代码：

```c++
void catalan() //求卡特兰数
{
    int i, j, len, carry, temp;
    a[1][0] = b[1] = 1;
    len = 1;
    for(i = 2; i <= 100; i++)
    {
        for(j = 0; j < len; j++) //乘法
        a[i][j] = a[i-1][j]*(4*(i-1)+2);
        carry = 0;
        for(j = 0; j < len; j++) //处理相乘结果
        {
            temp = a[i][j] + carry;
            a[i][j] = temp % 10;
            carry = temp / 10;
        }
        while(carry) //进位处理
        {
            a[i][len++] = carry % 10;
            carry /= 10;
        }
        carry = 0;
        for(j = len-1; j >= 0; j--) //除法
        {
            temp = carry*10 + a[i][j];
            a[i][j] = temp/(i+1);
            carry = temp%(i+1);
        }
        while(!a[i][len-1]) //高位零处理
        len --;
        b[i] = len;
    }
}
```



### 例题

> http://acm.hdu.edu.cn/showproblem.php?pid=2067
>
> 小兔的棋盘
>
> Time Limit: 1000/1000 MS (Java/Others)    Memory Limit: 32768/32768 K (Java/Others)
>
> Total Submission(s): 12397    Accepted Submission(s): 6201
>
> Problem Description
>
> 小兔的叔叔从外面旅游回来给她带来了一个礼物，小兔高兴地跑回自己的房间，拆开一看是一个棋盘，小兔有所失望。
>
> 不过没过几天发现了棋盘的好玩之处。
>
> 从起点(0，0)走到终点(n,n)的最短路径数是C(2n,n),现在小兔又想如果不穿越对角线(但可接触对角线上的格点)，这样的路径数有多少?
>
> 小兔想了很长时间都没想出来，现在想请你帮助小兔解决这个问题，对于你来说应该不难吧!
>
>  
>
> Input
>
> 每次输入一个数n(1<=n<=35)，当n等于－1时结束输入。
>
> Output
>
> 对于每个输入数据输出路径数，具体格式看Sample。
>
> Sample Input
>
> 1
>
> 3
>
> 12
>
> -1
>
>  
>
> Sample Output
>
> 1 1 2
>
> 2 3 10
>
> 3 12 416024
>
>  
>
> Author
>
> Rabbit
>
>  
>
> Source
>
> RPG专场练习赛
>
>  
>
> Recommend
>
> lcy   |   We have carefully selected several similar problems for you:  1133 2068 1267 2069 1134 
>
> /*
>
> 题目分析：为什么这个题要用卡特兰数呢？因为它的过程可以抽象成前例的样子，
>
> ​         比如说先往下走，在往下走了一步的情况下，就可以往右走一步，这样向下走就等同于进栈，向右走就等同于出栈，有了卡特兰数的知识，这题就相当水了。（别忘了最后要乘2啊，因为只要满足不穿过对角线的话，先往下和先往右都可以的）
>
>  
>
> 输出: 第一个数字是数据的组数，第二个数是输入的数，第三个则是路径数。
>
> */



```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

typedef long long ll;
ll catalan[40];

void catalans(){
    memset(catalan, 0, sizeof(catalan));
    catalan[0] = catalan[1] = 1;
    for (int i = 2; i <= 35; i++){
        for (int j = 0; j<i; j++){
            catalan[i] += catalan[j] * catalan[i - j - 1];
        }
    }
}

int main(){
    int n;
    catalans();
    int t = 1;
    while(scanf("%d",&n)!=EOF && n!=-1){
        printf("%d %d %lld\n", t++, n, catalan[n] * 2);
    }
    return 0;
}
```

