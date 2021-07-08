function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("수도권 4단계 격상 논의 중", "서울, 4단계 격상 조건 넘어서", "9일, 수도권 거리두기안 발표", "신규확진 코로나 사태 이후 최다", "폭증세, 방역 강화 불가피");
$('#notice-news').html(randomItem(e));
