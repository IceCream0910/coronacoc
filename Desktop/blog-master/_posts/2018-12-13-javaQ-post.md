---
layout: post
title: "JAVA 기초 문제"
description: "JAVA 기초 정리"
date: 2018-12-13
tags: [JAVA, 자바, 프로그래밍]
comments: true
share: true
---

### 변수 종류

    public static void main(String[] args) {
		// TODO Auto-generated method stub
		// double a = 3.14;
		/*
		 * //실수형 타입 double float
		 */
		// 참 거짓 타입
		// boolean
		// 데이터 : 정수, 자료형 타입
		/*
		 * int long short byte
		 */
		// + - * / %=나머지
		int a = 5000;
		int b = 6500;
		int c = 3000;
		// int a , b; a =10; b =20;
		int d = 2 * b + c;
		System.out.println(d);
	}
}
  1. 변수 2개 선언 후 4칙연산
		int a = 10;
		int b = 20;
		int c = a + b;
		int d = a - b;
		int e = a * b;
		int f = a / b;
		System.out.println(c);
		System.out.println(d);
		System.out.println(e);
		System.out.println(f);
        2. 구매 가격
		int a = 5000;
		int b = 6500;
		int c = 3000;
		// int a , b; a =10; b =20;
		int d = 2 * b + c;
		System.out.println(d);

--- 

### 문제 1

    public static void main(String[] args) {
		// TODO Auto-generated method stub
		int iphoneX = 1000;
		int iphone8 = 800;
		int iphone7 = 700;
		int airpod = 10;
		int ipad = 2000;
		double totalPrice = (iphoneX + 2 * airpod) + 0.1 * (iphoneX + 2 * airpod);
		System.out.println(totalPrice);
	}

--- 


### 문제 2

    	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*
		int carName = 10;
		// == 같다
		// != 같지 않다
		if (carName == 10) {
			System.out.print("내 자동차 이름은 10입니다");
		} else {
			System.out.print("nnnnnnnnnnn");
		}
		*/
		int math = 100;
		if(math>=100)
		{
			System.out.print("A+ 입니다");
		}
		else
		{
			System.out.print("재수강 입니다");
		}
	}

--- 


### 문제 3

    	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int bigmac = 5000;
		int bigset = 6500;
		int cheeze = 3000;
		int macple = 1500;
		int totalPrice = bigmac + (2 * bigset) + cheeze + (5 * macple);
		if (totalPrice > 20000) {
			System.out.print("현우는 너무 많이 먹는다");
		} else {
			System.out.print("현우는 배가 안 고프다");
		}
	}

--- 

이클립스 코드 정렬 = Ctrl + Shift + F
이 문서는 [한글 Lorem Ipsum](http://guny.kr/stuff/klorem/)으로 생성되었습니다.
