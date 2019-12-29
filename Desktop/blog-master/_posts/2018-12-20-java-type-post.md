---
layout: post
title: "JAVA 변수 타입 별 사용"
description: "java의 변수 기본형 타입 별 사용방법 정리"
date: 2018-12-20
tags: [JAVA, 자바, 프로그래밍]
comments: true
share: true
---

### 코드

   public static void main(String[] args) {
		/*
		 * boolean isFun = true;
		 * char c ='f';
		 * int x = 59;
		 *
		 * //long 타입 값에는 소문자 l이나 대문자 L을 붙여야 합니다.
		 * long big= 3456789L;
		 *
		 * // float 타입 값에는 소문자 f나 대문자 F를 붙여야 합니다.
	     float f = 32.5f;

		 double d = 23.34;
		 */

		boolean isFun = false;

		char charValue = 'a';

		int intValue = 20;

		long longValue = 2147483648L;

		System.out.println(isFun);
		System.out.println(charValue);
		System.out.println(intValue);
		System.out.println(longValue);
	}

--- 


### 예제

	public static void main(String[] args) {
		// 정수를 담는 변수 count 선언
		int count = 1;
		// 실수를 담는 변수, average 선언
		double average = 2;
		// 두 수를 출력하시오.
        System.out.println(count);
        System.out.println(average);
	}


	

--- 


### 활용 예제

public static void main(String[] args) {
		int number; //정수형 변수 number 선언
		number = 20; //number값에 20 넣기

		System.out.println(number); //number값 출력
		System.out.println(number+10); //number값에 10 더한 값 출력

		double a = 4.14; // 실수형 변수 a 선언하고 4.14 값 넣기
		System.out.println(a); // a 값 출력
		System.out.println((int)a); // 실수형 a를 정수형으로 형변환해서 출력

		int num1, num2; //정수형 변수 num1과 num2 선언
		num1 = 4; //num1에 4넣기
		num2 = 14; //num2에 14 넣기

		System.out.println(num1+num2); //num1값과 num2값을 더한 값 출력
		System.out.println(num1*num2); //num1값과 num2값을 곱한 값 출력
	}

	

--- 