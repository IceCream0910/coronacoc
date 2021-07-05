function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("수도권, 7일 거리두기 단계 발표", "4일까지 델타변이 416명 확인", "수도권, 접종자도 마스크 의무", "유흥시설·학원 종사자 일제검사", "감염 재생산지수 1.2 넘어서");
$('#notice-news').html(randomItem(e));
