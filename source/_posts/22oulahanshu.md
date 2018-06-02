---
title: 欧拉函数（Euler's totient function）
date: 2018-05-05 20:12:35
tags: [算法笔记, 图论]
categories: 学习
mathjax: true
---



### 欧拉函数的定义：

​	**对正整数n，欧拉函数是小于n且和n互质的正整数(包括1)的个数**。

​	例如Euler(8)=4，因为1,3,5,7均和8互质,下面用E(n)表示欧拉函数的值。

 <!--more-->

​	在数论中，对于正整数N,少于或等于N ([1,N]),且与N互质的正整数(包括1)的个数，记作φ(n)。

​	φ函数的值：​
$$
φ(x)=x(1- \frac 1{p(1)})(1- \frac1{p(2)})(1-\frac1{p(3)})(1-\frac1{p(4)})…..(1-\frac1{p(n)})
$$
​	其中p(1),p(2)…p(n)为x的所有质因数;

​	φ(1)=1(唯一和1互质的数，且小于等于1)。注意：每种质因数只有一个。

​     例如:

​         φ(10)=10×(1-1/2)×(1-1/5)=4; 分别为：1 3 7 9

​         φ(30)=30×(1-1/2)×(1-1/3)×(1-1/5)=8;

​         φ(49)=49×(1-1/7)=42;



### 欧拉函数的性质：

1. 对于素数p，φ(p) = p-1，对于两个素数p,q，φ(pq) = pq-1。

   欧拉函数是积性函数，但不是完全积性函数。即φ(mn)=φ(m)*φ(n)，只有(n,m)=1时成立。

2. 对于一个正整数N的素数幂分解$N = {P_1}^{q^1}*{P_2}^{q^2}*...*{P_n}^{q^n}$。

   $φ(x)=x(1- \frac 1{p(1)})(1- \frac1{p(2)})(1-\frac1{p(3)})(1-\frac1{p(4)})…..(1-\frac1{p(n)})$

3. 除了N=2，φ(N)都是偶数。

4. 设N为正整数，$\sumφ(d) = N(d|N)$。

根据性质2，我们可以在(sqrt(n))的时间内求一个数的欧拉函数值。

延伸：一个数的所有质因子之和是euler(n)*n/2。



欧拉函数模板

```c++
//直接求小于或等于n,且与n互质的个数:

  int Euler(int x){
    int ret=x;
    int n=(int)sqrt(x*1.0);
    //如果判断条件改为i*i<=n,这里的i*i就会做sqrt(n)次,每次循环都要算一次，养成好习惯 
    for(int i=2;i<=n;i++)
     if(n%i==0){
        ret=ret/i*(i-1);//先进行除法防止溢出(ret=ret*(1-1/p(i)))
        while(n%i==0)
          n/=i;
     }
    if(n>1)
          ret=ret/n*(n-1);
    return ret;
}

 

//筛选模板:求[1,n]之间每个数的质因数的个数

#define size 1000001
int euler[size];

void Init(){
     memset(euler,0,sizeof(euler));
     euler[1]=1;
     for(int i=2;i<size;i++)
       if(!euler[i])
       for(int j=i;j<size;j+=i){
              if(!euler[j])
               euler[j]=j;
               euler[j]=euler[j]/i*(i-1);//先进行除法是为了防止中间数据的溢出
         }
}
```



> 找新朋友
>
> Time Limit: 2000/1000 MS (Java/Others) Memory Limit: 65536/32768 K (Java/Others)
>
> Total Submission(s): 4409 Accepted Submission(s): 1999
>
> Problem Description
>
> 新年快到了，“猪头帮协会”准备搞一个聚会，已经知道现有会员N人，把会员从1到N编号，
>
> 其中会长的号码是N号，凡是和会长是老朋友的，那么该会员的号码肯定和N有大于1的公约数，否则都是新朋友，
>
> 现在会长想知道究竟有几个新朋友？请你编程序帮会长计算出来。
>
>  
>
> Input
>
> 第一行是测试数据的组数CN（Case number，1<CN<10000），接着有CN行正整数N（1<n<32768），表示会员人数。
>
>  
>
> Output
>
> 对于每一个N，输出一行新朋友的人数，这样共有CN行输出。
>
>  
>
> Sample Input
>
> 2
>
> 25608
>
> 24027
>
>  
>
> Sample Output
>
> 7680
>
> 16016
>
>  
>
> Author
>
> SmallBeer(CML)
>
>  
>
> Source
>
> 杭电ACM集训队训练赛（VII）
>
>  
>
> Recommend
>
> lcy



```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;


int n;  

int euler( int x )  {  
    int res = x;  
    for( int i = 2; i*i <= x; i ++ )  
        if( x%i == 0 )  {  
            res =res/i*(i-1);  
            while(x%i==0) x/=i;  
        }  
    if( x > 1 ) res = res/x*(x-1);  
    return res;  
}  

int main()  {  
    int T;  
    scanf ( "%d", &T );  
    while( T-- )  {  
        int n;  
        scanf ( "%d", &n );  
        printf( "%d\n", euler(n) );  
    }  
    return 0;  
}  



```