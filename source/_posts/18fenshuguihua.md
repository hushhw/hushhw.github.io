---
title: 01分数规划
date: 2018-04-07 16:51:42
tags: [算法笔记, 01分数规划]
categories: 学习
---



> 链接：https://www.nowcoder.com/acm/contest/93/I
> 来源：牛客网
>
> 时间限制：C/C++ 5秒，其他语言10秒
> 空间限制：C/C++ 262144K，其他语言524288K
> 64bit IO Format: %lld
>
> 题目描述 
> wyh学长现在手里有n个物品，这n个物品的重量和价值都告诉你，然后现在让你从中选取k个，问你在所有可能选取的方案中，最大的单位价值为多少（单位价值为选取的k个物品的总价值和总重量的比值）
>
> 输入描述:
> 输入第一行一个整数T(1<=T<=10)
> 接下来有T组测试数据，对于每组测试数据，第一行输入两个数n和k(1<=k<=n<=100000)
> 接下来有n行，每行两个是a和b，代表这个物品的重量和价值
>
> 输出描述:
> 对于每组测试数据，输出对应答案，结果保留两位小数
>
> 示例1
> 输入
> 1
> 3 2
> 2 2
> 5 3
> 2 1
>
> 输出
> 0.75
>
> 说明
> 对于样例来说，我们选择第一个物品和第三个物品，达到最优目的



做法:
二分，对于每一个答案C，有 s[i] = w[i]-c*v[i]
排序，取最大前k个，如果大于等于0则可行，否则不可行



```c++
#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <algorithm>
using namespace std;

const int maxn=1000010;
int n,k; //n件物品取k件
int wi[maxn],vi[maxn];//物品的重量和价值
double y[maxn];

bool cmp(double x){
	for(int i=0; i<n; i++)
		y[i]=vi[i]-x*wi[i];
	sort(y,y+n);
	double sum=0;
	for(int i=0; i<k; i++){
		sum += y[n-i-1];
	}
	return sum>=0;
}


int main(){
	int T;
	scanf("%d",&T);
	while(T--){
		scanf("%d%d",&n,&k);
		for(int i=0; i<n; i++) {
			scanf("%d%d",&wi[i],&vi[i]);
		}
		double left=0, right=maxn;
		while(right-left>1e-6){
			double mid = (right+left)/2;
			if(cmp(mid)) left=mid;
			else right = mid;
		}
		printf("%.2lf\n", right);
	}
	return 0;
}
```

