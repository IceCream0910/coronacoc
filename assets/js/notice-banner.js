function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("수도권 4단계 격상 준비 중", "서울 단독 4단계 격상 논의 중", "상황 지속 시 최고 단계 검토", "신규확진 코로나19 사태 이후 최다", "주말 지켜본 후 거리두기 결정", "수도권, 접종자도 마스크 의무", "방역수칙 최초 위반에도 영업제한", "폭증세, 방역 강화 불가피");
$('#notice-news').html(randomItem(e));