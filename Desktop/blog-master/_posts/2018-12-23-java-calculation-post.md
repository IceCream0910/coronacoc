---
layout: post
title: "JAVA 산술연산자 예제"
description: "java 산술연산자를 사용한 예제 코드"
date: 2018-12-23
tags: [JAVA, 자바, 프로그래밍]
comments: true
share: true
---

### 합, 차, 곱, 나머지, 몫 구하는 코드

   	public static void main(String[] args) {
		/*
		  i와 j의 합
		  i + j;

		  i와 j의 차
		  i - j;

		  i와 j의 곱
		  i * j;

		  i를 j로 나눈 몫
		  i / j;

		  i를 j로 나눈 나머지
		  i % j;
		 */

		int a = 7;
		int b = 3;

		//c는 a와 b의 합
		int c = a+b;

		//d는 a와 b의 차
		int d = a-b;

		//e는 a와 b의 곱
		int e = a*b;

		//f는 a를 b로 나눈 나머지
		int f = a%b;

		System.out.printf("c는: %d\n", c);
		System.out.printf("d는: %d\n", d);
		System.out.printf("e는: %d\n", e);
		System.out.printf("f는: %d\n", f);
	}

--- 

