---
layout: post
title: "JAVA for/if문 예제"
description: "for문과 if문을 활용한 간단한 예제"
date: 2018-12-17
tags: [JAVA, 자바, 프로그래밍]
comments: true
share: true
---

### for문 예제
    public static void main(String[] args) {
		// TODO Auto-generated method stub

		/*
		 * 조건식 수행 결과가 false라면 for문을 빠져나갑니다.
		 * for(초기화식; 조건식; 증감식)
		 * {
		 *  //조건식 수행 결과가 true라면 실행문을 수행합니다.
		 *  실행문1;
		 *  실행문2;
		 *  }
		 */

		/*
		for(int i = 1; i<=10; i++)
		{
			//if문을 추가해 i가 3의 배수일 때만 실행문을 수행합니다.
			if(i % 3 == 0)
			   System.out.println(i);
		}
		/*
		 *
		 */
		//for문을 사용해서 1부터 10까지 출력하시오.
		/*
		 for(int a = 1; a<=10; a++) {
			System.out.println(a);
		}
		 */

		//for문을 사용햐여 1부터 10까지 중 짝수를 출력
		for(int a = 1; a<=10; a++) {
			if(a%2 ==0)
			System.out.println(a);
		}
	}

--- 


### for문을 이용한 구구단 출력

public static void main(String[] args) {
		// TODO Auto-generated method stub
		for(int i = 2; i<=9; i++)
		{
			for(int j = 1; j<=9; j++)
			{
				int result = i*j;

				//System.out.print(i,"*" j, "=", result);
				System.out.print(i);
				System.out.print("x");
				System.out.print(j);
				System.out.print("=");
				System.out.println(result);
			}
			System.out.println();
		}

	}

--- 

### if문 예제
   public static void main(String[] args) {
		// TODO Auto-generated method stub

		int value = 3;
		if( value % 3 == 0)
		{
			System.out.println("value는 3의 배수입니다.");
		}


	}

--- 



### if문 예제
  
public static void main(String[] args) {
	    int num = 60; //정수형 num에 60으로 초기화

	    if(num>=100) { //만약 num이 100 이상이면
	    	System.out.println("A++"); //"A++"출력
	    }
	    else if(num>=90) { //아니고 만약 num이 90 이상이면
	    	System.out.println("사람"); //"사람"출력
	    }
	    else if(num>=80) { //아니고 만약 num이 80 이상이면
	    	System.out.println("원숭이"); //"원숭이"출력
	    }
	    else if(num>=70) {  //아니고 만약 num이 70 이상이면
	    	System.out.println("공부에 소질 없음"); //"공부에 소질 없음"출력
	    }
	    else if(num<=60) { //아니고 만약 num이 60 이하이면
	    	System.out.println("공장 ㄱㄱ"); //"공장 ㄱㄱ"출력
	    }
	}

--- 

