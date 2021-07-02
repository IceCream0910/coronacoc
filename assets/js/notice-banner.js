function randomItem(e) {
    return e[Math.floor(Math.random() * e.length)]
}
var e = new Array("수도권, 새 거리두기 적용 보류", "수도권, 새 거리두기 3단계 충족", "중대 위기...언제든 거리두기 상향", "경기, 델타변이 258명 감염 추정", "해외 유입 70% 이상 델타변이", "감염 재생산지수 1.2 초과");
$('#notice-news').html(randomItem(e));