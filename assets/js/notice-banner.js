function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("수도권, 7일 거리두기 단계 발표", "수도권, 3단계 격상 논의중", "수도권 백신 접종자도 마스크 의무", "수도권 밤 10시 이후 야외음주 금지", "유흥시설·학원 종사자 일제검사", "감염 재생산지수 1.2 넘어서");
$('#notice-news').html(randomItem(e));
