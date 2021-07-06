function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("6개월만 확진자 1000명 넘어", "3일 기준 델타변이 416명 확인", "수도권, 접종자도 마스크 의무", "서울시 역대 최다 확진", "폭증세, 방역 강화 불가피");
$('#notice-news').html(randomItem(e));
